package com.example.back_end.controller;

import com.example.back_end.dto.request.ApiResponse;
import com.example.back_end.dto.request.AuthenticationRequest;
import com.example.back_end.dto.response.AuthenticationResponse;
import com.example.back_end.service.AuthenticationService;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")


@Builder
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    @PostMapping("/log-in")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        boolean results = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .code(1000)
                .result(AuthenticationResponse.builder()
                        .authenticated(results)
                        .build())
                .build();
    }
}
