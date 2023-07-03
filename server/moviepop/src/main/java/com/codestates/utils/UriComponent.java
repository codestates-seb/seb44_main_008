package com.codestates.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriComponent {
    public static URI createUri(String defaultUrl, long id) {
        return UriComponentsBuilder.newInstance()
                .path(defaultUrl + "/{id}")
                .buildAndExpand(id)
                .toUri();
    }
}
