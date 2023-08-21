package com.codestates.security.interceptor;

import com.codestates.security.utils.ErrorResponder;
import com.codestates.security.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import reactor.util.annotation.Nullable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@Component
public class JwtParseInterceptor implements HandlerInterceptor {
    private final JwtUtils jwtUtils;
    private static final ThreadLocal<String> authenticatedUsername = new ThreadLocal<>();

    public JwtParseInterceptor(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }
    public static String getAuthenticatedUsername() {
        return authenticatedUsername.get();
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String method = request.getMethod(), uri = request.getRequestURI();

        if(method.equals("POST") && (uri.equals("/users") || uri.equals("/users/login") || uri.equals("/users/find-id") ||
                uri.equals("/users/verification-code") || uri.equals("/users//verification")))
            return true;
        if(method.equals("PATCH") && uri.equals("/users/new-password"))
            return true;

        try {
            Map<String, Object> claims = jwtUtils.getJwsClaimsFromRequest(request);
            authenticatedUsername.set(String.valueOf(claims.get("username").toString()));
            return true;
        } catch (Exception e) {
            ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
            return false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           @Nullable ModelAndView modelAndView) throws Exception {
        this.authenticatedUsername.remove();
    }
}
