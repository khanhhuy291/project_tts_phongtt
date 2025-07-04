package com.example.back_end.mapper;

import com.example.back_end.dto.request.UserCreationRequest;
import com.example.back_end.dto.request.UserUpdateRequest;
import com.example.back_end.dto.response.UserResponse;
import com.example.back_end.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
