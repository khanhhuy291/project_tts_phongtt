package com.example.back_end.mapper;

import com.example.back_end.dto.request.UserCreationRequest;
import com.example.back_end.dto.request.UserUpdateRequest;
import com.example.back_end.dto.response.UserResponse;
import com.example.back_end.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(value = "org.mapstruct.ap.MappingProcessor", date = "2025-07-04T09:21:02+0700", comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.11 (Oracle Corporation)")
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserCreationRequest request) {
        if (request == null) {
            return null;
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setDob(request.getDob());

        return user;
    }

    @Override
    public UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }

        UserResponse.UserResponseBuilder userResponse = UserResponse.builder();

        userResponse.id(user.getId());
        userResponse.username(user.getUsername());
        userResponse.password(user.getPassword());
        userResponse.email(user.getEmail());
        userResponse.firstName(user.getFirstName());
        userResponse.lastName(user.getLastName());
        userResponse.dob(user.getDob());

        return userResponse.build();
    }

    @Override
    public void updateUser(User user, UserUpdateRequest request) {
        if (request == null) {
            return;
        }

        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setDob(request.getDob());
    }
}
