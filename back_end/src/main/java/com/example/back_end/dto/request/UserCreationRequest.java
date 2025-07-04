package com.example.back_end.dto.request;

import com.example.back_end.exception.ErrorCode;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.FieldNameConstants;

import java.time.LocalDate;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 4, max = 50, message = "USERNAME_INVALID")
    private String username;
    @Size(min = 8, max = 20, message = "PASSWORD_INVALID")
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDate dob;
}
