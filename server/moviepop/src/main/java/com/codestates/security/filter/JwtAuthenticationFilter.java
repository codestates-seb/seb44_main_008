package com.codestates.security.filter;

import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.security.jwt.JwtTokenizer;
import com.codestates.security.redis.repository.LogoutAccessTokenRedisRepository;
import com.codestates.security.userdetails.CustomUserDetailService;
import com.codestates.security.utils.JwtExpirationEnums;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomUserDetailService customUserDetailService;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String username = null, accessToken = getToken(request);
        if(request.getRequestURI().equals("/users/reissue") && getRefreshToken(request) == null)
            throw new JwtException("재발행시 리프레시 토큰이 없습니다.");
        else if(request.getRequestURI().equals("/users/reissue") && getRefreshToken(request) != null) {
            String refreshToken = getRefreshToken(request);

            username = jwtTokenizer.getEmail(refreshToken);
        } else {
            if(accessToken != null) {
                if(lessThanReissueExpirationTimesLeft(accessToken)) {
                    response.setHeader("exceptionCode", String.valueOf(498));
                    response.setHeader("exceptionMessage", "access token is expired!");
                    throw new BusinessLogicException(ExceptionCode.EXPIRED_ACCESS_TOKEN);
                }
                checkLogout(accessToken, response);
                username = jwtTokenizer.getEmail(accessToken);
            }
        }

        if(username != null) {
            UserDetails userDetails = customUserDetailService.loadUserByUsername(username);
            equalsUsernameFromTokenAndUserDetails(userDetails.getUsername(), username, response);
            validateAccessToken(accessToken, userDetails, response);
            processSecurity(request, userDetails);
        }

        filterChain.doFilter(request, response);
    }

    private boolean lessThanReissueExpirationTimesLeft(String accessToken) {
        return jwtTokenizer.getRemainMilliSeconds(accessToken) < JwtExpirationEnums.ACCESS_TOKEN_REISSUE_EXPIRATION_TIME.getValue();
    }

    private String getToken(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if(StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer "))
            return headerAuth.substring(7);

        return null;
    }

    private String getRefreshToken(HttpServletRequest request) {
        String headerAuth = request.getHeader("Refresh");
        if(StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer "))
            return headerAuth.substring(7);

        return null;
    }

    private void checkLogout(String accessToken, HttpServletResponse response) {
        if(logoutAccessTokenRedisRepository.existsById(accessToken)) {
            response.setHeader("exceptionCode", String.valueOf(400));
            response.setHeader("exceptionMessage", "you already logout!");
            throw new IllegalArgumentException("이미 로그아웃된 회원입니다.");
        }
    }

    private void equalsUsernameFromTokenAndUserDetails(String userDetailsUsername, String tokenUsername, HttpServletResponse response) {
        if(!userDetailsUsername.equals(tokenUsername)) {
            response.setHeader("exceptionCode", String.valueOf(401));
            response.setHeader("exceptionMessage", "invalid token!");
            throw new IllegalArgumentException("username이 토큰과 맞지 않습니다.");
        }
    }

    private void validateAccessToken(String accessToken, UserDetails userDetails, HttpServletResponse response) {
        if(!jwtTokenizer.validateToken(accessToken, userDetails)) {
            response.setHeader("exceptionCode", String.valueOf(401));
            response.setHeader("exceptionMessage", "invalid token!");
            throw new IllegalArgumentException("토큰 검증 실패!");
        }
    }

    private void processSecurity(HttpServletRequest request, UserDetails userDetails) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
}
