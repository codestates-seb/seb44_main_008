package com.codestates.security.utils;

import com.codestates.security.jwt.JwtTokenizer;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Component
public class JwtUtils {
    private final JwtTokenizer jwtTokenizer;

    public JwtUtils(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    public Map<String, Object> getJwsClaimsFromRequest(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        return jwtTokenizer.extractAllClaims(jws);
    }
}
