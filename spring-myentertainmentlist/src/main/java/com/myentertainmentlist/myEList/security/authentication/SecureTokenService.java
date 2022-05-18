package com.myentertainmentlist.myEList.security.authentication;

import com.myentertainmentlist.myEList.security.authentication.SecureToken;

public interface SecureTokenService {
    public SecureToken createSecureToken();
    public void saveSecureToken(SecureToken token);
    public SecureToken findByToken(String token);
    public void removeToken(SecureToken token);
    public void removeTokenByToken(String token);
    public int getTokenValidityInSeconds();
}