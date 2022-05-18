package com.myentertainmentlist.myEList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.*;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.context.*;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

import com.myentertainmentlist.myEList.security.configuration.WebSecurityConfig;
import com.myentertainmentlist.myEList.security.configuration.MvcConfig;


@SpringBootApplication
public class MyEListApplication {

	public static void main(String[] args) {
		AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
		ctx.register(WebSecurityConfig.class);
		ctx.register(MvcConfig.class);
		SpringApplication.run(MyEListApplication.class, args);
	}
//
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurerAdapter() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**").allowedOrigins("http://localhost:3000");
//			}
//		};
//	}

}
