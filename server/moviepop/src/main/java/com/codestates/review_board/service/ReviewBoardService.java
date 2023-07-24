package com.codestates.review_board.service;


import com.codestates.comment.dto.CommentDto;
import com.codestates.comment.mapper.CommentMapper;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.image.service.StorageService;
import com.codestates.image.utils.ImageUtil;
import com.codestates.movie.dto.MovieDto;
import com.codestates.movie.entity.Movie;
import com.codestates.movie.entity.MovieScorePerAge;
import com.codestates.movie.service.MovieScorePerAgeService;
import com.codestates.movie.service.MovieService;
import com.codestates.movie_party.dto.MoviePartyDto;
import com.codestates.movie_party.mapper.MoviePartyMapper;
import com.codestates.movie_party.repository.MoviePartyRepository;
import com.codestates.review_board.dto.ReviewBoardDto;
import com.codestates.review_board.entity.*;
import com.codestates.review_board.repository.ReviewBoardRecentVisitRepository;
import com.codestates.tag.dto.TagDto;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.mapper.TagMapper;
import com.codestates.tag.service.TagService;
import com.codestates.user.dto.UserDto;
import com.codestates.user.entity.User;
import com.codestates.review_board.repository.ReviewBoardRepository;
import com.codestates.user.entity.UserTag;
import com.codestates.user.mapper.UserMapper;
import com.codestates.utils.UserUtils;
import com.codestates.user.repository.CommentLikeRepository;
import com.codestates.user.service.ReviewBoardWishService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewBoardService {

    private final ReviewBoardRepository reviewBoardRepository;
    private final TagService tagService;
    private final MovieService movieService;
    private final ReviewBoardWishService reviewBoardWishService;
    private final CommentMapper commentMapper;
    private final TagMapper tagMapper;
    private final CommentLikeRepository commentLikeRepository;
    private final MoviePartyMapper moviePartyMapper;
    private final UserMapper userMapper;
    private final StorageService storageService;
    private final ImageUtil imageUtil;
    private final MovieScorePerAgeService movieScorePerAgeService;
    private final ReviewBoardScoreService reviewBoardScoreService;
    private final RecommendReviewBoardService recommendReviewBoardService;
    private final ReviewBoardRecentVisitRepository reviewBoardRecentVisitRepository;
    private final MoviePartyRepository moviePartyRepository;

    public ReviewBoard createReviewBoard(User user, ReviewBoard reviewBoard, MultipartFile thumbnail) {
        Movie movie = movieService.findMovie(reviewBoard.getMovie().getMovieId());
        reviewBoard.setMovie(movie);
        reviewBoard.setAdulted(movie.isAdulted());

        for(ReviewBoardTag reviewBoardTag : reviewBoard.getReviewBoardTags())
            reviewBoardTag.setReviewBoard(reviewBoard);

        user.addReviewBoard(reviewBoard);

        reviewBoard.setUser(user);

        String imageUrl = null;
        if(thumbnail != null)
            imageUrl = storageService.storeThumbnailImage(thumbnail);
        else {
            Random random = new Random();
            int offset = random.nextInt(6) + 1;
            imageUrl = imageUtil.getDefaultThumbnail() + offset + ".jpg";
        }
        reviewBoard.setThumbnail(imageUrl);

        ReviewBoard newReviewBoard = reviewBoardRepository.save(reviewBoard);
        ReviewBoardScore reviewBoardScore = new ReviewBoardScore();
        reviewBoardScore.setReviewBoard(newReviewBoard);
//        reviewBoardScore = reviewBoardScoreService.createReviewBoardScore(reviewBoardScore);
        reviewBoard.setReviewBoardScore(reviewBoardScore);

        int age = UserUtils.getAge(user).getYears();
        int ageRange = age / 10;

//        MovieScorePerAge movieScorePerAge = movieScorePerAgeService.findMovieScorePerAgeByMovie(movie);
//        if(movieScorePerAge == null) movieScorePerAge = movieScorePerAgeService.createMovieScorePerAge(movie);
        movieScorePerAgeService.addMovieScorePerAge(movie, ageRange);

        return reviewBoardRepository.save(reviewBoard);
    }

    public ReviewBoardDto.DetailResponse updateReviewBoard(User user, ReviewBoard reviewBoard, MultipartFile thumbnail) {
        ReviewBoard getReviewboard = findReviewBoard(user, reviewBoard.getReviewBoardId());
        if(getReviewboard.getUser().getUserId() != user.getUserId())
            throw new BusinessLogicException(ExceptionCode.CANNOT_UPDATE_REVIEW_BOARD);

        Optional.ofNullable(reviewBoard.getTitle())
                .ifPresent(title -> getReviewboard.setTitle(title));
        Optional.ofNullable(reviewBoard.getReview())
                .ifPresent(review -> getReviewboard.setReview(review));

        for(ReviewBoardTag reviewBoardTag : reviewBoard.getReviewBoardTags()) {
            Tag tag = tagService.findTagById(reviewBoardTag.getTag().getTagId());
            reviewBoardTag.setTag(tag);
            reviewBoardTag.setReviewBoard(getReviewboard);
        }

        List<ReviewBoardTag> newTags = reviewBoard.getReviewBoardTags();
        getReviewboard.getReviewBoardTags().clear();
        getReviewboard.getReviewBoardTags().addAll(newTags);

        if(thumbnail != null) {
            String imageUrl = storageService.updateThumbnailImage(thumbnail, getReviewboard);
            getReviewboard.setThumbnail(imageUrl);
        }

        return findDetailReviewBoard(user, reviewBoard.getReviewBoardId());
    }

    public ReviewBoard findReviewBoard(User user, long reviewId) {
        ReviewBoard reviewBoard = findReviewBoardById(reviewId);

//        Period age = UserUtils.getAge(user);
//        if(age.getYears() < 19 && reviewBoard.isAdulted())
//            throw new BusinessLogicException(ExceptionCode.CANNOT_SHOW_REVIEW_BOARD);

        return reviewBoard;
    }

    public ReviewBoardDto.DetailResponse findDetailReviewBoard(User user, long reviewId) {
        ReviewBoard reviewBoard = findReviewBoard(user, reviewId);
        boolean isWished = reviewBoardWishService.isExistReviewBoardWish(reviewBoard, user);

        MovieDto.Response movieResponse = new MovieDto.Response(reviewBoard.getMovie().getMovieId(), reviewBoard.getMovie().getTitle());

        String profileImage = reviewBoard.getUser().getProfileImage();
        if(profileImage == null)
            profileImage = imageUtil.getUrl() + imageUtil.getDefaultProfileImage();
        else
            profileImage = imageUtil.getUrl() + profileImage;
        UserDto.ReviewBoardResponse userResponse = new UserDto.ReviewBoardResponse(reviewBoard.getUser().getUserId(), reviewBoard.getUser().getNickname(), profileImage);

        List<CommentDto.Response> commentResponse = reviewBoard.getComments().stream()
                .map(comment -> {
                    boolean isLiked = commentLikeRepository.existsByCommentAndUser(comment, user);
                    CommentDto.Response responseDto = commentMapper.commentToCommentResponseDto(comment, imageUtil);
                    responseDto.setLiked(isLiked);
                    return responseDto;
                })
                .collect(Collectors.toList());

        List<TagDto.Response> tagResponse = reviewBoard.getReviewBoardTags().stream()
                .map(reviewBoardTag -> tagMapper.tagToResponse(reviewBoardTag.getTag()))
                .collect(Collectors.toList());

        List<MoviePartyDto.EntireResponse> groups = moviePartyMapper.moviePartiesToEntireResponseDtos(moviePartyRepository.findAllByReviewBoardAndMeetingDateIsAfter(reviewBoard, LocalDateTime.now()), userMapper, imageUtil);

        String thumbnail = reviewBoard.getThumbnail();
        if(thumbnail == null)
            thumbnail = imageUtil.getUrl() + imageUtil.getDefaultThumbnail();
        else
            thumbnail = imageUtil.getUrl() + thumbnail;

        updateReviewBoardRecentVisitRepository(user, reviewBoard);

        ReviewBoardDto.DetailResponse detailResponse = ReviewBoardDto.DetailResponse.builder()
                .reviewBoardId(reviewBoard.getReviewBoardId())
                .title(reviewBoard.getTitle())
                .review(reviewBoard.getReview())
                .thumbnail(thumbnail)
                .wish(reviewBoard.getWish())
                .wished(isWished)
                .createdAt(reviewBoard.getCreatedAt())
                .movie(movieResponse)
                .user(userResponse)
                .comments(commentResponse)
                .tags(tagResponse)
                .groups(groups)
                .build();

        return detailResponse;
    }

    public void updateReviewBoardRecentVisitRepository(User user, ReviewBoard reviewBoard) {
        ReviewBoardRecentVisit visit = reviewBoardRecentVisitRepository.findByUserAndReviewBoard(user, reviewBoard);

        if(visit != null) {
            visit.setVisitedAt(LocalDateTime.now());
        } else {
            List<ReviewBoardRecentVisit> reviewBoardRecentVisits = reviewBoardRecentVisitRepository.findByUser(user);
            if(reviewBoardRecentVisits.size() >= 5) {
                //가장 오래된 기록 삭제
                ReviewBoardRecentVisit oldestVisitedAt = reviewBoardRecentVisitRepository.findFirstByUserOrderByVisitedAtAsc(user);
                if(oldestVisitedAt != null) {
                    reviewBoardRecentVisitRepository.deleteById(oldestVisitedAt.getReviewBoardRecentVisitId());
                    reviewBoard.getReviewBoardRecentVisits().remove(oldestVisitedAt);
                    user.getReviewBoardRecentVisits().remove(oldestVisitedAt);
                }
            }
            //가장 최근 기록
            visit = new ReviewBoardRecentVisit();
            visit.setUser(user);
            visit.setReviewBoard(reviewBoard);
            visit.setVisitedAt(LocalDateTime.now());
            reviewBoard.addReviewBoardRecentVisit(visit);
            user.addReviewBoardRecentVisit(visit);
        }

        //변경사항 저장
        reviewBoardRecentVisitRepository.save(visit);
    }

    public Page<ReviewBoard> findAllReviewBoards(User user, int page, int size) {
        return reviewBoardRepository.findAll(PageRequest.of(page-1, size,
                Sort.by("reviewBoardId").descending()));
//        Period age = UserUtils.getAge(user);
//        if(age.getYears() >= 19)
//            return reviewBoardRepository.findAll(PageRequest.of(page-1, size,
//                Sort.by("reviewBoardId").descending()));
//        else
//            return reviewBoardRepository.findAllByAdultedIsFalse(PageRequest.of(page-1, size,
//                    Sort.by("reviewBoardId").descending()));
    }

    public void deleteReviewBoard(User user, long reviewId) {
        ReviewBoard reviewBoard = findReviewBoard(user, reviewId);
        if(reviewBoard.getUser().getUserId() != user.getUserId())
            throw new BusinessLogicException(ExceptionCode.CANNOT_UPDATE_REVIEW_BOARD);

        if(reviewBoard.getThumbnail() != null && !reviewBoard.getThumbnail().startsWith(imageUtil.getDefaultThumbnail()))
            storageService.deleteThumbnailImage(reviewBoard);
        reviewBoard.setThumbnail(null);

        movieScorePerAgeService.subtractMovieScorePerAge(reviewBoard.getMovie(), UserUtils.getAge(user).getYears() / 10);

        ReviewBoardRecentVisit reviewBoardRecentVisit = reviewBoardRecentVisitRepository.findByUserAndReviewBoard(user, reviewBoard);
        reviewBoard.getReviewBoardRecentVisits().remove(reviewBoardRecentVisit);

        reviewBoardRepository.delete(reviewBoard);
    }

    public List<ReviewBoard> findReviewBoards(User user) {
        return reviewBoardRepository.findTop12ByOrderByReviewBoardIdDesc();
//        Period age = UserUtils.getAge(user);
//        if(age.getYears() >= 19)
//            return reviewBoardRepository.findTop12ByOrderByReviewBoardIdDesc();
//        else {
//            List<ReviewBoard> reviewBoards = reviewBoardRepository.findTop12ByAdultedIsFalseOrderByReviewBoardIdDesc();
//            return reviewBoards.subList(0, Math.min(reviewBoards.size(), 12));
//        }
    }

    public List<ReviewBoard> findPopularReviewBoards(User user) {
        return reviewBoardRepository.findTop8ByOrderByWishDescReviewBoardIdDesc();
//        Period age = UserUtils.getAge(user);
//        if(age.getYears() >= 19)
//            return reviewBoardRepository.findTop8ByOrderByWishDescReviewBoardIdDesc();
//        else {
//            List<ReviewBoard> reviewBoards = reviewBoardRepository.findTop8ByAdultedIsFalseOrderByWishDescReviewBoardIdDesc();
//            return reviewBoards.subList(0, Math.min(reviewBoards.size(), 8));
//        }
//        return reviewBoardRepository.findTop8ByOrderByWishDesc();
//            return reviewBoardRepository.findTop8ByOrderByWishDescByIsAdulted(false);
    }

    public List<ReviewBoard> findRecommendReviewBoards(User user, List<Tag> tags) {
        List<RecommendReviewBoard> recommendReviewBoards = recommendReviewBoardService.findRecommendReviewBoards();
//        int age = UserUtils.getAge(user).getYears();
//        if(age >= 19) recommendReviewBoards = recommendReviewBoardService.findRecommendReviewBoards();
//        else recommendReviewBoards = recommendReviewBoardService.findRecommendReviewBoardsNotAdulted();
        int size = recommendReviewBoards.size();

        AtomicInteger index = new AtomicInteger();
        if(recommendReviewBoards != null && !recommendReviewBoards.isEmpty()) {
            List<RecommendReviewBoard> personalScore = recommendReviewBoards.stream()
                    .map(recommendReviewBoard -> {
                        RecommendReviewBoard personalRecommendReviewBoard = new RecommendReviewBoard();
                        personalRecommendReviewBoard.setReviewBoard(recommendReviewBoard.getReviewBoard());
                        personalRecommendReviewBoard.setAge(recommendReviewBoard.getAge());

                        int ranking = index.getAndIncrement();
                        int initScore = (size - ranking) * 2;
                        personalRecommendReviewBoard.setScore(initScore);

                        // 1, ..., 6, 7, 8번째 게시글의 점수를 얻어옴
                        // 9번째부터 for문 돌면서 같은 점수 게시글 얻어옴
                        // 같은 점수 게시글을 reviewBoardScores에 있는 score 순으로 정렬
                        // 거기서 하나 뽑음
                        int totalScore = calculatePersonalScore(user, personalRecommendReviewBoard);
                        personalRecommendReviewBoard.setScore(personalRecommendReviewBoard.getScore() + totalScore);
                        return personalRecommendReviewBoard;
                    })
                    .collect(Collectors.toList());

            Collections.sort(personalScore, new Comparator<RecommendReviewBoard>() {
                @Override
                public int compare(RecommendReviewBoard o1, RecommendReviewBoard o2) {
                    return o2.getScore() - o1.getScore();
                }
            });

            List<RecommendReviewBoard> top8RecommendReviewBoards = personalScore.subList(0, Math.min(8, personalScore.size()));
            return top8RecommendReviewBoards.stream()
                    .map(recommendReviewBoard -> recommendReviewBoard.getReviewBoard())
                    .collect(Collectors.toList());
        }

        return new ArrayList<>();

//        List<RecommendReviewBoard> top8RecommendReviewBoards = personalScore.subList(0, Math.min(8, personalScore.size()));
//        return top8RecommendReviewBoards.stream()
//                .map(recommendReviewBoard -> recommendReviewBoard.getReviewBoard())
//                .collect(Collectors.toList());
//        Period age = UserUtils.getAge(user);
//        if(age.getYears() >= 19)
//            return reviewBoardRepository.findDistinctTop8ByReviewBoardTagsTagInOrderByWishDescReviewBoardIdDesc(tags);
//        else {
//            List<ReviewBoard> reviewBoards = reviewBoardRepository.findDistinctTop8ByAdultedIsFalseAndReviewBoardTagsTagInOrderByWishDescReviewBoardIdDesc(tags);
//            return reviewBoards.subList(0, Math.min(reviewBoards.size(), 8));
//        }
    }

    private int calculatePersonalScore(User user, RecommendReviewBoard recommendReviewBoard) {
        int totalScore = 0;

        int tagCnt = calculateSameTagCnt(user, recommendReviewBoard);
        if(tagCnt == 1) totalScore += 1000;
        else if(tagCnt == 2) totalScore += 2500;
        else if(tagCnt == 3) totalScore += 5000;

        // 최근 방문 게시글 태그
        int visitTagCnt = calculateRecentVisitSameTagCnt(user, recommendReviewBoard);
        if(visitTagCnt == 1) totalScore += 700;
        else if(visitTagCnt == 2) totalScore += 1500;
        else if(visitTagCnt == 3) totalScore += 3000;

        // 작성한 게시글 태그
        int myTagCnt = calculateReviewBoardScore(user, recommendReviewBoard);
        if(myTagCnt == 1) totalScore += 500;
        else if(myTagCnt == 2) totalScore += 1000;
        else if(myTagCnt == 3) totalScore += 2000;

        // 나이대별 인기있는 영화 점수
        totalScore += calculateScorePerAge(user, recommendReviewBoard);

        return totalScore;
    }

    private int calculateSameTagCnt(User user, RecommendReviewBoard recommendReviewBoard) {
        List<UserTag> userTags = user.getUserTags(); // 최대 3개

        int tagCnt = 0;
        for(ReviewBoardTag reviewBoardTag : recommendReviewBoard.getReviewBoard().getReviewBoardTags()) { // 최대 3개
            for (UserTag userTag : userTags) {
                if (userTag.getTag().getTagId() == reviewBoardTag.getTag().getTagId()) {
                    tagCnt++;
                    break;
                }
            }
        }

        return tagCnt;
    }

    private int calculateRecentVisitSameTagCnt(User user, RecommendReviewBoard recommendReviewBoard) {
        List<ReviewBoardRecentVisit> recentVisits = reviewBoardRecentVisitRepository.findByUser(user);
        ReviewBoard reviewBoard = recommendReviewBoard.getReviewBoard();
        Set<Tag> tags = new HashSet<>();
        for(ReviewBoardTag reviewBoardTag : reviewBoard.getReviewBoardTags())
            tags.add(reviewBoardTag.getTag());

        int visitTagCnt = 0;

        for(ReviewBoardRecentVisit reviewBoardRecentVisit : recentVisits) { // 최대 3개
            ReviewBoard recentlyReviewBoard = reviewBoardRecentVisit.getReviewBoard();

            for(ReviewBoardTag reviewBoardTag : recentlyReviewBoard.getReviewBoardTags()) {
                Tag tag = reviewBoardTag.getTag();
                if(tags.contains(tag)) visitTagCnt++;
            }
        }

        return visitTagCnt;
    }

    private int calculateReviewBoardScore(User user, RecommendReviewBoard recommendReviewBoard) {
        // 자기가 쓴 게시글에서 최신순 5개 갖고오기
        List<ReviewBoard> myReviewBoards = reviewBoardRepository.findTop5ByUserOrderByCreatedAtDesc(user);
        Set<Tag> tags = new HashSet<>();
        int myTagCnt = 0;

        if(myReviewBoards.size() != 0) {  // isEmpty() vs size()
            for (ReviewBoard reviewBoard : myReviewBoards) {
                for (ReviewBoardTag reviewBoardTag : reviewBoard.getReviewBoardTags())
                    tags.add(reviewBoardTag.getTag());
            }
            //내가 작성한 게시글 5개에 태그를 모조리 갖고와서 비교하면서 모든 게시글과 비교함
            for (ReviewBoardTag reviewBoardTag : recommendReviewBoard.getReviewBoard().getReviewBoardTags()) // 최대 3개
                if(tags.contains(reviewBoardTag.getTag())) myTagCnt++;
        }

        return myTagCnt;
    }

    //    나이대별 가점(작성자 나이) // 우선순위 4 -> 나이대별 인기있는 영화 개수(배율 : 1)                         10
    private int calculateScorePerAge(User user, RecommendReviewBoard recommendReviewBoard) {
        int age = UserUtils.getAge(user).getYears();
        int ageRange = age / 10;

        Movie movie = recommendReviewBoard.getReviewBoard().getMovie();

        return Math.min(movieScorePerAgeService.getMovieScorePerAge(movie, ageRange) * 100, 1000);
    }

    public Page<ReviewBoard> findSpecificTagReviewBoards(User user, Tag tag, int page, int size) {
        return reviewBoardRepository.findByReviewBoardTagsTag(tag,PageRequest.of(page-1,size,
                Sort.by("reviewBoardId").descending()));
//        Period age = UserUtils.getAge(user);

//        if(age.getYears() >= 19)
//            return reviewBoardRepository.findByReviewBoardTagsTag(tag,PageRequest.of(page-1,size,
//                    Sort.by("reviewBoardId").descending()));
//        else
//            return reviewBoardRepository.findByAdultedIsFalseAndReviewBoardTagsTag(tag,PageRequest.of(page-1,size,
//                    Sort.by("reviewBoardId").descending()));
    }

    public Page<ReviewBoard> findSearchedReviewBoards(String title, int page, int size) {
        List<Movie> movies = movieService.findSearchedMovies(title);
        List<Long> movieIds = movies.stream()
                .map(Movie::getMovieId)
                .collect(Collectors.toList());

        return reviewBoardRepository.findByMovieMovieIdIn(movieIds, PageRequest.of(page-1,size,
                Sort.by("reviewBoardId").descending()));
    }
    @Transactional(readOnly = true)
    public ReviewBoard findReviewBoardById(long reviewId) {
        Optional<ReviewBoard> optionalReviewBoard = reviewBoardRepository.findById(reviewId);
        ReviewBoard findReviewBoard =
                optionalReviewBoard.orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_BOARD_NOT_FOUND));
        return findReviewBoard;
    }

    @Transactional(readOnly = true)
    public List<ReviewBoard> findAllReviewBoardsAsList() {
        return reviewBoardRepository.findAll();
    }
}
