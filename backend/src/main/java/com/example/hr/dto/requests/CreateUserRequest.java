package com.example.hr.dto.requests;


import com.example.hr.enums.Role;
import lombok.Builder;


import java.util.Set;


@Builder
public record CreateUserRequest(
        String name,
        String username,
        String password,
        Set<Role> authorities
){
}
