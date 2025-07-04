package com.example.back_end.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {
    @Size(min = 8, max = 20, message = "PASSWORD_INVALID")
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private LocalDate dob;
}
