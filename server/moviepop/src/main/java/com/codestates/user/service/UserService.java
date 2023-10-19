package com.codestates.user.service;

import com.codestates.comment.entity.Comment;
import com.codestates.comment.service.CommentService;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.helper.event.UserRegistrationApplicationEvent;
import com.codestates.image.service.StorageService;
import com.codestates.movie_party.entity.MovieParty;
import com.codestates.movie_party.service.MoviePartyService;
import com.codestates.review_board.entity.ReviewBoard;
import com.codestates.review_board.service.ReviewBoardService;
import com.codestates.security.entity.Authority;
import com.codestates.security.jwt.JwtTokenizer;
import com.codestates.security.redis.CacheKey;
import com.codestates.security.redis.repository.LogoutAccessTokenRedisRepository;
import com.codestates.security.redis.repository.RefreshTokenRedisRepository;
import com.codestates.security.redis.token.LogoutAccessToken;
import com.codestates.security.redis.token.RefreshToken;
import com.codestates.security.utils.CustomAuthorityUtils;
import com.codestates.security.utils.JwtExpirationEnums;
import com.codestates.security.vo.Login;
import com.codestates.security.vo.Token;
import com.codestates.user.entity.*;
import com.codestates.user.repository.FindPasswordVerificationTokenRepository;
import com.codestates.user.repository.MoviePartyUserRepository;
import com.codestates.user.repository.UserRepository;
import com.codestates.user.repository.VerificationCodeRepository;
import com.codestates.utils.CustomBeanUtils;
import com.codestates.utils.UserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.codestates.security.utils.JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME;

@Transactional
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CustomBeanUtils<User> beanUtils;
    private final ReviewBoardWishService reviewBoardWishService;
    private final ReviewBoardService reviewBoardService;
    private final CommentService commentService;
    private final CommentLikeService commentLikeService;
    private final MoviePartyService moviePartyService;
    private final MoviePartyUserRepository moviePartyUserRepository;
    private final JwtTokenizer jwtTokenizer;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final StorageService storageService;
    private final ApplicationEventPublisher publisher;
    private final VerificationCodeRepository verificationCodeRepository;
    private final FindPasswordVerificationTokenRepository findPasswordVerificationTokenRepository;

    public User createUser(User user, MultipartFile profileImage) {
        if(!verifyEmail(user))
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        verifyNickname(user.getNickname());

        //UserTag에 user를 넣어줘야한다.
        for(UserTag userTag : user.getUserTags()){
            userTag.setUser(user);
        }

        //비밀번호 암호화
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        //권한 부여
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        Set<Authority> authorities = roles.stream()
                .map(role -> Authority.builder()
                        .role("ROLE_" + role)
                        .user(user)
                        .build())
                .collect(Collectors.toSet());
        user.setAuthorities(authorities);

        if(profileImage != null) {
            String imageUrl = storageService.storeProfileImage(profileImage);
            user.setProfileImage(imageUrl);
        }

        User newUser = userRepository.save(user);

        Map<String, Object> variables = new HashMap<>();
        variables.put("title", "회원가입해주셔서 감사합니다!");
        variables.put("message", newUser.getName() + "님, MoviePop 회원가입이 완료되었습니다!<br>앞으로 저희 서비스 많이 사용해주세요!");
        publisher.publishEvent(new UserRegistrationApplicationEvent(this, newUser, "MoviePop 회원가입 완료", variables));

        return newUser;
    }

    private boolean verifyEmail(User user) {
        if(userRepository.findByEmail(user.getEmail()) == null)
            return true;
        return false;
    }

    private void verifyNickname(String nickname) {
        if(userRepository.existsByNickname(nickname))
            throw new BusinessLogicException(ExceptionCode.USER_NICKNAME_EXISTS);
    }

    public User findVerifiedUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if(user.getUserStatus() == User.UserStatus.USER_WITHDRAW)
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        if(user == null)
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);

        return user;
    }

    public User updateUser(User user, MultipartFile profileImage) {
        User findUser = findVerifiedUserByEmail(user.getEmail());
        if(user.getNickname() != null && !user.getNickname().equals(findUser.getNickname()))
            verifyNickname(user.getNickname());

        Optional.ofNullable(user.getNickname())
                .ifPresent(nickname -> findUser.setNickname(nickname));
        findUser.getUserTags().clear();

        findUser.getUserTags().addAll(user.getUserTags());

        for(UserTag userTag : findUser.getUserTags()) {
            userTag.setUser(findUser);
        }

        if(profileImage != null) {
            String imageUrl = storageService.updateProfileImage(profileImage, findUser);
            findUser.setProfileImage(imageUrl);

            for(MoviePartyUser moviePartyUser : findUser.getMoviePartyUsers())
                moviePartyUser.setProfileImage(imageUrl);
        }

        return userRepository.save(findUser);
    }

    public User updateUserPassword(String email, String currentPassword, String newPassword) {
        User findUser = findVerifiedUserByEmail(email);
        checkPassword(currentPassword, findUser.getPassword());

        String encryptedPassword = passwordEncoder.encode(newPassword);

        findUser.setPassword(encryptedPassword);
        return userRepository.save(findUser);
    }

    public String findId(String name, LocalDate birth) {
        User user = userRepository.findByNameAndBirth(name, birth);
//        if(user == null) throw new BusinessLogicException();
        if (user == null) throw new IllegalArgumentException();
        return user.getEmail();
    }

    public void sendVerificationCode(String name, String email) {
        User user = userRepository.findByEmailAndName(email, name);
        if(user == null) throw new IllegalArgumentException();

        String verificationCode = makeVerificationCode();

        Map<String, Object> variables = new HashMap<>();
        variables.put("title", "비밀번호 찾기");
        variables.put("message", name + "님, 비밀번호 변경을 위한 인증번호 입니다. 아래 인증번호 확인 후 이메일 인증을 완료해주세요.!<br>" +
                "<div style='text-align:center;'>인증번호 : " + verificationCode + "</div>");

        publisher.publishEvent(new UserRegistrationApplicationEvent(this, user, "MoviePop 인증번호 안내", variables));

        // redis 저장
        // key -> email, value -> 인증번호,일 만료시간 -> 3분
        VerificationCode verificationCodeObject = VerificationCode.of(email, verificationCode, 180);
        verificationCodeRepository.save(verificationCodeObject);
    }

    private String makeVerificationCode() {
        String verificationCode = "";
        Random random = new Random();
        for(int idx = 0; idx < 6; idx++)
            verificationCode += random.nextInt(10);

        return verificationCode;
    }

    public String verifyVerificationCode(String email, String verificationCode) {
        // Redis에서 email을 키로 하여 인증번호 갖고 오기
        String correctVerificationCode = verificationCodeRepository.findById(email).orElseThrow(() -> new IllegalArgumentException()).getVerificationCode();

        if(verificationCode.equals(correctVerificationCode)) {
            // 값을 내보냄(토큰값)
            String token = jwtTokenizer.generateAccessToken(email);

            // token값 -> key, 만료시간 -> ?분 Redis 저장(이후 새로운 비밀번호 설정 시에 사용하기 위함)
            findPasswordVerificationTokenRepository.save(FindPasswordVerificationToken.of(
                    token,
                    600
            ));

            return token;
        } else
            throw new IllegalArgumentException();
    }

    public void updateNewPassword(String token, String newPassword) {
        findPasswordVerificationTokenRepository.findById(resolveToken(token)).orElseThrow(() -> new IllegalArgumentException());

        // Redis에서 토큰이 있다면
        token = resolveToken(token);
        String email = jwtTokenizer.getEmail(token);

        User user = userRepository.findByEmail(email);

        user.setPassword(newPassword);

        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User findUser(long userId) {
        return verifyUserId(userId);
    }

    public void deleteUser(String email) {
        User findUser = findVerifiedUserByEmail(email);
        if(findUser.getUserStatus() == User.UserStatus.USER_WITHDRAW)
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);

        Set<MoviePartyUser> moviePartyUsers = findUser.getMoviePartyUsers();
        for(MoviePartyUser moviePartyUser : moviePartyUsers) {
            MovieParty movieParty = moviePartyUser.getMovieParty();
            movieParty.setCurrentParticipant(movieParty.getCurrentParticipant() - 1);
            movieParty.getMoviePartyUsers().remove(moviePartyUser);
        }
        moviePartyUsers.clear();

        List<MovieParty> parties = findUser.getParties();
        parties.clear();

        findUser.getReviewBoardRecentVisits().clear();
        if(findUser.getProfileImage() != null)
            storageService.deleteProfileImage(findUser);

        findUser.setProfileImage(null);
        findUser.setUserStatus(User.UserStatus.USER_WITHDRAW);
        User deleteUser = userRepository.save(findUser);

        Map<String, Object> variables = new HashMap<>();
        variables.put("title", "회원 탈퇴가 완료되었습니다.");
        variables.put("message", deleteUser.getName() + "님의 회원 탈퇴가 완료되었습니다.<br/>저희 서비스를 이용해주셔서 감사합니다.");
        publisher.publishEvent(new UserRegistrationApplicationEvent(this, deleteUser, "회원 탈퇴 알림 메일", variables));
    }

    private User verifyUserId(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        if(user.getUserStatus() == User.UserStatus.USER_WITHDRAW)
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);

        return userRepository.findById(userId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    public Map<String, String> login(Login login) {
        User user = userRepository.findByEmail(login.getEmail());
        if(user == null || user.getUserStatus().equals(User.UserStatus.USER_WITHDRAW))
            throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
        checkPassword(login.getPassword(), user.getPassword());

        String username = user.getEmail();
        String accessToken = jwtTokenizer.generateAccessToken(username);
        RefreshToken refreshToken = saveRefreshToken(username);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("Authorization", accessToken);
        tokens.put("Refresh", refreshToken.getRefreshToken());

        return tokens;
    }

    private void checkPassword(String password, String registeredPassword) {
        if(!passwordEncoder.matches(password, registeredPassword))
            throw new BusinessLogicException(ExceptionCode.PASSWORD_INCORRECT);
    }

    private RefreshToken saveRefreshToken(String username) {
        return refreshTokenRedisRepository.save(RefreshToken.createRefreshToken(
                username,
                jwtTokenizer.generateRefreshToken(username),
                REFRESH_TOKEN_EXPIRATION_TIME.getValue()
        ));
    }

    @CacheEvict(value = CacheKey.USER, key = "#username")
    public void logout(Token token, String username) {
        String accessToken = resolveToken(token.getAccessToken());
        long remainMilliSeconds = jwtTokenizer.getRemainMilliSeconds(accessToken);
        refreshTokenRedisRepository.deleteById(username);
        logoutAccessTokenRedisRepository.save(LogoutAccessToken.of(accessToken, username, remainMilliSeconds));
    }

    public Map<String, String> reissue(String refreshToken) {
        refreshToken = resolveToken(refreshToken);
        String username = getCurrentUsername();
        RefreshToken redisRefreshToken = refreshTokenRedisRepository.findById(username).orElseThrow(NoSuchElementException::new);

        if(refreshToken.equals(redisRefreshToken.getRefreshToken())) {
            return reissueRefreshToken(refreshToken, username);
        }

        throw new IllegalArgumentException("토큰이 일치하지 않습니다.");
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return principal.getUsername();
    }

    private Map<String, String> reissueRefreshToken(String refreshToken, String username) {
        Map<String, String> tokens = new HashMap<>();
        if(lessThanReissueExpirationTimesLeft(refreshToken)) {
            String accessToken = jwtTokenizer.generateRefreshToken(username);

            tokens.put("Authorization", accessToken);
            tokens.put("Refresh", saveRefreshToken(username).getRefreshToken());

            return tokens;
        }

        tokens.put("Authorization", jwtTokenizer.generateAccessToken(username));
        tokens.put("Refresh", refreshToken);
        return tokens;
    }

    private boolean lessThanReissueExpirationTimesLeft(String refreshToken) {
        return jwtTokenizer.getRemainMilliSeconds(refreshToken) < JwtExpirationEnums.REISSUE_EXPIRATION_TIME.getValue();
    }

    private String resolveToken(String token) {
        return token.substring(7);
    }

    public void createReviewBoardWish(String email, long reviewBoardId) {
        User user = findVerifiedUserByEmail(email);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(user, reviewBoardId);

        if(reviewBoardWishService.isExistReviewBoardWish(reviewBoard, user))
            throw new BusinessLogicException(ExceptionCode.ALREADY_WISH_EXIST);

        reviewBoard.setWish(reviewBoard.getWish() + 1);

        ReviewBoardWish reviewBoardWish = new ReviewBoardWish();
        reviewBoardWish.setUser(user);
        reviewBoardWish.setReviewBoard(reviewBoard);

        user.addReviewBoardWish(reviewBoardWish);

        userRepository.save(user);
    }

    public void deleteReviewBoardWish(String email, long reviewBoardId) {
        User user = findVerifiedUserByEmail(email);
        ReviewBoard reviewBoard = reviewBoardService.findReviewBoard(user, reviewBoardId);

        ReviewBoardWish reviewBoardWish = reviewBoardWishService.findReviewBoardAndUser(reviewBoard, user);
        if(reviewBoardWish == null)
            throw new BusinessLogicException(ExceptionCode.WISH_NOT_FOUND);

        reviewBoard.setWish(reviewBoard.getWish() - 1);
        user.deleteReviewBoardWish(reviewBoardWish);
//        reviewBoardWishService.deleteReviewBoardWish(reviewBoardWish.getReviewBoardWishId());

        userRepository.save(user);
    }

    public Comment createCommentLike(String email, long commentId) {
        User user = findVerifiedUserByEmail(email);
        Comment comment = commentService.findComment(commentId);

        if(commentLikeService.existsByCommentAndUser(comment,user))
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKE_EXIST);

        comment.setLikes(comment.getLikes() + 1);

        CommentLike commentLike = new CommentLike();
        commentLike.setUser(user);
        commentLike.setComment(comment);

        commentLike = commentLikeService.createCommentLike(commentLike);

        comment.addCommentLike(commentLike);
        user.addCommentLike(commentLike);

        userRepository.save(user);

        return comment;
    }

    public Comment deleteCommentLike(String email, long commentId) {
        User user = findVerifiedUserByEmail(email);
        Comment comment = commentService.findComment(commentId);

        CommentLike commentLike = commentLikeService.findByCommentAndUser(comment, user);
        if(commentLike == null)
            throw new BusinessLogicException(ExceptionCode.LIKE_NOT_FOUND);

        comment.setLikes(comment.getLikes() - 1);

        comment.getCommentLikes().remove(commentLike);
        user.getCommentLikes().remove(commentLike);

        return comment;
    }

    public MovieParty createUserParticipation(String email, long groupId) {
        User user = findVerifiedUserByEmail(email);
        MovieParty movieParty = moviePartyService.findMovieParty(groupId, user);

        int age = UserUtils.getAge(user).getYears();
        if(age < 19 && movieParty.getReviewBoard().isAdulted())
            throw new BusinessLogicException(ExceptionCode.CANNOT_PARTICIPATE_MOVIE_PARTY_SINCE_AGE);
        if(movieParty.getUser().getEmail().equals(email))
            throw new BusinessLogicException(ExceptionCode.CANNOT_PARTICIPATE_WRITER);
        if(movieParty.getMaxCapacity() <= movieParty.getCurrentParticipant())
            throw new BusinessLogicException(ExceptionCode.OVER_MAX_PARTICIPANT);

        MoviePartyUser moviePartyUser = new MoviePartyUser();
        moviePartyUser.setMovieParty(movieParty);
        moviePartyUser.setUser(user);
        moviePartyUser.setProfileImage(user.getProfileImage());

        if(user.getMoviePartyUsers().contains(moviePartyUser))
            throw new BusinessLogicException(ExceptionCode.CANNOT_PARTICIPATE_MOVIE_PARTY);

        user.addMoviePartyUser(moviePartyUser);

        movieParty.setCurrentParticipant(movieParty.getCurrentParticipant() + 1);

        userRepository.save(user);

        return movieParty;
    }

    public MovieParty deleteUserParticipation(String email, long groupId) {
        User user = findVerifiedUserByEmail(email);
        MovieParty movieParty = moviePartyService.findMovieParty(groupId, user);

        if(movieParty.getUser().getEmail().equals(email))
            throw new BusinessLogicException(ExceptionCode.CANNOT_CANCEL_WRITER);
        if(!moviePartyUserRepository.existsByUserAndMovieParty(user, movieParty))
            throw new BusinessLogicException(ExceptionCode.CANNOT_CANCEL_MOVIE_PARTY);

        MoviePartyUser moviePartyUser = new MoviePartyUser();
        moviePartyUser.setMovieParty(movieParty);
        moviePartyUser.setUser(user);

        user.getMoviePartyUsers().remove(moviePartyUser);

        movieParty.setCurrentParticipant(movieParty.getCurrentParticipant() - 1);

        userRepository.save(user);

        return movieParty;
    }
}