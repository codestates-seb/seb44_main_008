package com.codestates.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import static com.codestates.security.utils.JwtExpirationEnums.ACCESS_TOKEN_EXPIRATION_TIME;
import static com.codestates.security.utils.JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME;

@Component
public class JwtTokenizer {
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    public String getUsername(String token) {
        return extractAllClaims(token).get("username", String.class);
    }

    public String generateAccessToken(String email) {
        return doGenerateToken(email, ACCESS_TOKEN_EXPIRATION_TIME.getValue());
    }

    public String generateRefreshToken(String email) {
        return doGenerateToken(email, REFRESH_TOKEN_EXPIRATION_TIME.getValue());
    }

    private String doGenerateToken(String email, long expireTime) {
        Claims claims = Jwts.claims();
        claims.put("username", email);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getSigningKey(SECRET_KEY), SignatureAlgorithm.HS256)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        long userId = getUserId(token);
        String email = getEmail(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private Key getSigningKey(String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey(SECRET_KEY))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String getEmail(String token) {
        return extractAllClaims(token).get("email", String.class);
    }

    public long getUserId(String token) {
        return extractAllClaims(token).get("userId", Long.class);
    }

    public Boolean isTokenExpired(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    public long getRemainMilliSeconds(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        Date now = new Date();
        return expiration.getTime() - now.getTime();
    }
}
