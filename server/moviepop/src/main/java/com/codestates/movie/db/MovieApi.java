package com.codestates.movie.db;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.*;

public class MovieApi {
    public static List<String> getMovieList() {
        HashMap<String, Object> result = new HashMap<String, Object>();
        String jsonInString = "";
        List<String> movieCodes = new ArrayList<>();

        try {
            for(int page = 1; page <= 5; page++) {
                RestTemplate restTemplate = new RestTemplate();

                HttpHeaders header = new HttpHeaders();
                HttpEntity<?> entity = new HttpEntity<>(header);
                String url = "http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json";
                UriComponents uri = UriComponentsBuilder.fromHttpUrl(url+"?"+"curPage="+page+"&itemPerPage=100&"+"key=f5eef3421c602c6cb7ea224104795888&targetDt=20230704").build();

                //이 한줄의 코드로 API를 호출해 MAP타입으로 전달 받는다.
                ResponseEntity<Map> resultMap = restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, Map.class);
                result.put("statusCode", resultMap.getStatusCodeValue()); //http status code를 확인
                result.put("header", resultMap.getHeaders()); //헤더 정보 확인
                result.put("body", resultMap.getBody()); //실제 데이터 정보 확인

                LinkedHashMap lm = (LinkedHashMap) resultMap.getBody().get("movieListResult");
                ArrayList<Map> dboxoffList = (ArrayList<Map>) lm.get("movieList");
                for(int idx = 0; idx < dboxoffList.size(); idx++)
                    movieCodes.add(dboxoffList.get(idx).get("movieCd").toString());

                //데이터를 제대로 전달 받았는지 확인 string형태로 파싱해줌
                ObjectMapper mapper = new ObjectMapper();
                jsonInString = mapper.writeValueAsString(resultMap.getBody());
                System.out.println(jsonInString);
            }


        } catch (HttpClientErrorException | HttpServerErrorException e) {
            result.put("statusCode", e.getRawStatusCode());
            result.put("body"  , e.getStatusText());
            System.out.println(e.toString());

        } catch (Exception e) {
            result.put("statusCode", "999");
            result.put("body"  , "excpetion오류");
            System.out.println(e.toString());
        }
        return movieCodes;
    }

//    public static void

    public static void main(String[] args) {
        List<String> movieCodes = getMovieList();
        System.out.println("movieCodes.size() = " + movieCodes.size());
    }
}
