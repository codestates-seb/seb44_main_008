package com.codestates.movie.init.service;

import com.codestates.movie.entity.Movie;
import com.codestates.movie.service.MovieService;
import com.codestates.tag.entity.Tag;
import com.codestates.tag.service.TagService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
@Transactional
public class MovieApiService {
    private final MovieService movieService;
    private final TagService tagService;

    public MovieApiService(MovieService movieService, TagService tagService) {
        this.movieService = movieService;
        this.tagService = tagService;
    }

    // 영화 전체 정보 가져오기(주간 박스오피스 1달 단위로 약 9년치 가져오기)
    // 스레드 사용
    public Set<String> getMovieList() {
        HashMap<String, Object> result = new HashMap<String, Object>();
        Set<String> movieCodeSet = new HashSet<>();
        List<LinkedHashMap> lmList = new ArrayList<>();

//        ExecutorService executorService = Executors.newFixedThreadPool(5); // 동시 요청 수

        try {
            List<Future<ResponseEntity<Map>>> futures = new ArrayList<>();

            SimpleDateFormat formatter = new SimpleDateFormat();
            formatter.applyPattern("yyyyMMdd");
            Calendar calendar = Calendar.getInstance();
            calendar.set(2023, 7, 2);

            for(int count = 1; count <= 100; count++) {
                RestTemplate restTemplate = new RestTemplate();

                HttpHeaders header = new HttpHeaders();
                HttpEntity<?> entity = new HttpEntity<>(header);
                String url = "http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json";
                UriComponents uri = UriComponentsBuilder.fromHttpUrl(url+"?"+"targetDt="+formatter.format(calendar.getTime())+"&weekGb=0&"+"key=f5eef3421c602c6cb7ea224104795888").build();

                ResponseEntity<Map> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, Map.class);
                result.put("statusCode", resultMap.getStatusCodeValue());
                result.put("header", resultMap.getHeaders());
                result.put("body", resultMap.getBody());

                lmList.add((LinkedHashMap) resultMap.getBody().get("boxOfficeResult"));

//                LinkedHashMap lm = (LinkedHashMap) resultMap.getBody().get("boxOfficeResult");
//                ArrayList<Map> boxOfficeList = (ArrayList<Map>) lm.get("weeklyBoxOfficeList");
//
//                for(int idx = 0; idx < boxOfficeList.size(); idx++)
//                    movieCodeSet.add(boxOfficeList.get(idx).get("movieCd").toString());

//                Callable<ResponseEntity<Map>> resultMap = () -> restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, Map.class);
//                Future<ResponseEntity<Map>> future = executorService.submit(resultMap);
//                futures.add(future);
                calendar.add(Calendar.MONTH, -1);
            }

            for(LinkedHashMap lm : lmList) {
                ArrayList<Map> boxOfficeList = (ArrayList<Map>) lm.get("weeklyBoxOfficeList");

                for(int idx = 0; idx < boxOfficeList.size(); idx++)
                    movieCodeSet.add(boxOfficeList.get(idx).get("movieCd").toString());
            }
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            result.put("statusCode", e.getRawStatusCode());
            result.put("body", e.getStatusText());
            e.printStackTrace();
        } catch (Exception e) {
            result.put("statusCode", "999");
            result.put("body", "exception");
            e.printStackTrace();
        }

        return movieCodeSet;
    }

    // 영화 목록 조회를 통해 가져온 영화 코드들을 가지고 우리가 원하는 정보를 얻기 위해
    // 영화 상세정보 API 콜
    public Map<String, Object> getMovieDetail(Set<String> movieCodes) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        List<Movie> movieList = new ArrayList<>();
        Set<Tag> tagSet = new HashSet<>();

        Set<Movie> existsMovies = movieService.findMovies();
        Set<Tag> existsTags = tagService.findTags();
        List<LinkedHashMap> lmList = new ArrayList<>();

//        ExecutorService executorService = Executors.newFixedThreadPool(10); // 동시 요청 수

        try {
            List<Future<ResponseEntity<Map>>> futures = new ArrayList<>();

            SimpleDateFormat formatter = new SimpleDateFormat();
            formatter.applyPattern("yyyyMMdd");
            Calendar calendar = Calendar.getInstance();
            calendar.set(2023, 7, 2);

            for(String movieCode : movieCodes) {
                RestTemplate restTemplate = new RestTemplate();

                HttpHeaders header = new HttpHeaders();
                HttpEntity<?> entity = new HttpEntity<>(header);
                String url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json";
                UriComponents uri = UriComponentsBuilder.fromHttpUrl(url+"?"+"movieCd="+movieCode+"&key=f5eef3421c602c6cb7ea224104795888").build();

                ResponseEntity<Map> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, Map.class);
                result.put("statusCode", resultMap.getStatusCodeValue());
                result.put("header", resultMap.getHeaders());
                result.put("body", resultMap.getBody());

                lmList.add((LinkedHashMap) resultMap.getBody().get("movieInfoResult"));

//                Callable<ResponseEntity<Map>> resultMap = () -> restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, Map.class);
//                Future<ResponseEntity<Map>> future = executorService.submit(resultMap);
//                futures.add(future);
                calendar.add(Calendar.MONTH, -1);
            }

            for(LinkedHashMap lm : lmList) {
                Map movieInfo = (Map) lm.get("movieInfo");

                // 중복 제거한 태그 정보 가져오기
                ArrayList<LinkedHashMap> genres = (ArrayList<LinkedHashMap>)movieInfo.get("genres");
                for(int idx = 0; idx < genres.size(); idx++) {
                    Tag tag = new Tag(genres.get(0).get("genreNm").toString());
                    if(!existsTags.contains(tag) && !tagSet.contains(tag.getTagName()))
                        tagSet.add(tag);
                }
                ArrayList<LinkedHashMap> audits = (ArrayList<LinkedHashMap>)movieInfo.get("audits");

                // 청불 여부 확인
                boolean isAdulted = false;
                if(audits.size() != 0) {
                    String audit = audits.get(0).get("watchGradeNm").toString();
                    if(audit.contains("청소년") || audit.contains("18")) isAdulted = true;
                }

                Movie movie = new Movie(movieInfo.get("movieNm").toString(), isAdulted);
                if(!existsMovies.contains(movie))
                    movieList.add(movie);
            }

//            for(Future<ResponseEntity<Map>> future : futures) {
//                ResponseEntity<Map> resultMap = future.get();
//                LinkedHashMap lm = (LinkedHashMap) resultMap.getBody().get("movieInfoResult");
//                Map movieInfo = (Map) lm.get("movieInfo");
//
//                // 중복 제거한 태그 정보 가져오기
//                ArrayList<LinkedHashMap> genres = (ArrayList<LinkedHashMap>)movieInfo.get("genres");
//                for(int idx = 0; idx < genres.size(); idx++) {
//                    Tag tag = new Tag(genres.get(0).get("genreNm").toString());
//                    if(!existsTags.contains(tag) && !tagSet.contains(tag.getTagName()))
//                        tagSet.add(tag);
//                }
//                ArrayList<LinkedHashMap> audits = (ArrayList<LinkedHashMap>)movieInfo.get("audits");
//
//                // 청불 여부 확인
//                boolean isAdulted = false;
//                if(audits.size() != 0) {
//                    String audit = audits.get(0).get("watchGradeNm").toString();
//                    if(audit.contains("청소년") || audit.contains("18")) isAdulted = true;
//                }
//
//                Movie movie = new Movie(movieInfo.get("movieNm").toString(), isAdulted);
//                if(!existsMovies.contains(movie))
//                    movieList.add(movie);
//            }
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            result.put("statusCode", e.getRawStatusCode());
            result.put("body"  , e.getStatusText());
            System.out.println(e.toString());

        } catch (Exception e) {
            result.put("statusCode", "999");
            result.put("body", "exception");
            System.out.println(e.toString());
        }
//        finally {
//            executorService.shutdown();
//        }

        Map<String, Object> initData = new HashMap<>();
        initData.put("movie", movieList);
        initData.put("tag", tagSet);

        return initData;
    }

    public void makeInitMovieData(List<Movie> movieList) {
        movieService.makeInitData(movieList);
    }

    public void makeInitTagData(Set<Tag> tagList) {
        tagService.makeInitData(tagList);
    }

//    public static void main(String[] args) {
//        Set<String> movieCodes = getMovieList();
////        System.out.println("movieCodes.size() = " + movieCodes.size());
//        List<Movie> movies = getMovieDetail(movieCodes);
////        System.out.println("movies.size() = " + movies.size());
////        System.out.println(movies.get(0));
////        System.out.println("genresSet = " + genresSet);
////        System.out.println("auditsSet = " + auditsSet);
//
//    }
}