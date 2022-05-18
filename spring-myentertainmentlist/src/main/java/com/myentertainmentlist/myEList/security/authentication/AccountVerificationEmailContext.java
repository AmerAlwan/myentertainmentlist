package com.myentertainmentlist.myEList.security.authentication;

import com.myentertainmentlist.myEList.security.authentication.AbstractEmailContext;
import com.myentertainmentlist.myEList.models.User;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponentsBuilder;

public class AccountVerificationEmailContext extends AbstractEmailContext {

    private String token;


    @Override
    public  void init(User user) {
        put("firstName", user.getFirstName());
        setTemplateLocation("emails/email-verification");
        setSubject("Complete your registration");
        setFrom("myelistemailauthentication@gmail.com");
        setTo(user.getEmail());
    }

    public void setToken(String token) {
        this.token = token;
        put("token", token);
    }

    public void buildVerificationUrl(final String baseURL, final String token){
        final String url= UriComponentsBuilder.fromHttpUrl(baseURL)
                .path("/api/users/register/verify_token").queryParam("token", token).toUriString();
        put("verificationURL", url);
    }
}