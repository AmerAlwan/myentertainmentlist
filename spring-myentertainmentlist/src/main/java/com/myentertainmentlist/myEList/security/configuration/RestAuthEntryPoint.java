//package com.myentertainmentlist.myEList.security.configuration;
//
//import org.springframework.stereotype.Component;
//import org.springframework.security.web.AuthenticationEntryPoint;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import javax.naming.AuthenticationException;
//import java.io.IOException;
//import javax.servlet.ServletException;
//
//@Component
//public class RestAuthEntryPoint implements AuthenticationEntryPoint {
//
//    @Override
//    public void commence (HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
//        // send error response to the client (401 unauthorized)
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
//    }
//}