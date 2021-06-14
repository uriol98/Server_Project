package org.server.entity;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {

    ROLE_ADMIN, ROLE_USER, ROLE_EXTRAORDINARY, ROLE_NEW;

    public String getAuthority(){
        return name();
    }

}
