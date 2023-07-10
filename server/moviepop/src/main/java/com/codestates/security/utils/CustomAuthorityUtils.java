package com.codestates.security.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomAuthorityUtils {
    @Value("${mail.address.admin}")
    private String adminEmailAddress;

    private final List<GrantedAuthority> ADMIN_ROLES = AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN");
    private final List<GrantedAuthority> USER = AuthorityUtils.createAuthorityList("ROLE_USER");

    private final List<String> ADMIN_ROLES_STRING = List.of("USER", "ADMIN");
    private final List<String> USER_ROLES_STRING = List.of("USER");

    public List<String> createRoles(String email) {
        if(email.equals(adminEmailAddress)) return ADMIN_ROLES_STRING;
        return USER_ROLES_STRING;
    }
}
