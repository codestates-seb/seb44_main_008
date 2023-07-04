package com.codestates.utils;

import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

public class UriComponent {
    public static URI createUri(String defaultUri, long id) {
        return UriComponentsBuilder.newInstance()
                .path(defaultUri + "/{id}")
                .buildAndExpand(id)
                .toUri();
    }
}
