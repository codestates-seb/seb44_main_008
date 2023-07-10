package com.codestates.movie_party.controller;

import com.codestates.dto.ResponseDto;
import com.codestates.movie_party.dto.MoviePartyDto;
import com.codestates.movie_party.entity.MovieParty;
import com.codestates.movie_party.mapper.MoviePartyMapper;
import com.codestates.movie_party.service.MoviePartyService;
import com.codestates.user.entity.User;
import com.codestates.user.service.UserService;
import com.codestates.utils.UriComponent;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/groups")
@Validated
public class MoviePartyController {
    public static final String MOVIE_PARTY_DEFAULT_URI = "/groups";
    private final MoviePartyService moviePartyService;
    private final MoviePartyMapper mapper;
    private final UserService userService;

//    public MoviePartyController(MoviePartyService moviePartyService, MoviePartyMapper mapper) {
//        this.moviePartyService = moviePartyService;
//        this.mapper = mapper;
//    }

    public MoviePartyController(MoviePartyService moviePartyService, MoviePartyMapper mapper, UserService userService) {
        this.moviePartyService = moviePartyService;
        this.mapper = mapper;
        this.userService = userService;
    }


//    @PostMapping
//    public ResponseEntity postMovieParty(@RequestBody @Valid MoviePartyDto.Post requestBody) {
//        MovieParty movieParty = moviePartyService.createGroup(mapper.moviePartyPostDtoToMovieParty(requestBody));
//
//        URI location = UriComponent.createUri(MOVIE_PARTY_DEFAULT_URI, movieParty.getMoviePartyId());
//
//        return ResponseEntity.created(location).build();
//    }

    @PatchMapping("/{movie-party-id}/users/{user-id}")
    public ResponseEntity patchMovieParty(@PathVariable("movie-party-id") @Positive long moviePartyId,
                                     @PathVariable("user-id") @Positive long userId,
                                     @RequestBody @Valid MoviePartyDto.Patch requestBody) {
        requestBody.setMoviePartyId(moviePartyId);
        MovieParty group = moviePartyService.updateMovieParty(userId, mapper.moviePartyPatchDtoToMovieParty(requestBody));

        return new ResponseEntity(
                new ResponseDto.SingleResponseDto(mapper.moviePartyToMoviePartyResponseDto(group)),
                HttpStatus.OK
        );
    }

    @GetMapping("/{movie-party-id}/users/{user-id}")
    public ResponseEntity getGroup(@PathVariable("movie-party-id") @Positive long moviePartyId,
                                   @PathVariable("user-id") @Positive long userId) {
        User user = userService.findUser(userId);

        MovieParty group = moviePartyService.findMovieParty(moviePartyId, user);

        return new ResponseEntity(
                new ResponseDto.SingleResponseDto(mapper.moviePartyToMoviePartyResponseDto(group)),
                HttpStatus.OK
        );
    }

    @GetMapping("/users/{user-id}")
    public ResponseEntity getGroups(@PathVariable("user-id") @Positive long userId,
                                    @Positive int page,
                                    @Positive int size) {
        User user = userService.findUser(userId);
        Page<MovieParty> pageGroups = moviePartyService.findMovieParties(page, size, user);
        List<MovieParty> groups = pageGroups.getContent();

        return new ResponseEntity(
                new ResponseDto.MultipleResponseDto<>(mapper.moviePartiesToMoviePartyResponseDtos(groups), pageGroups),
                HttpStatus.OK
        );
    }

    @DeleteMapping("/{group-id}/users/{user-id}")
    public ResponseEntity deleteGroup(@PathVariable("group-id") @Positive long groupId,
                                      @PathVariable("user-id") @Positive long userId) {
        moviePartyService.deleteMovieParty(userId, groupId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
