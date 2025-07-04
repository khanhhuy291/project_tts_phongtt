package com.example.back_end.exception;

public enum ErrorCode {
    UNCATEGORIED_EXCEPTION(999, "Uncategoried exeption"),

    USER_EXISTED(1001, "User existed"),
    USERNAME_INVALID(1002, "Username must be at least 3 characters"),
    PASSWORD_INVALID(1003, "Password must be at least 8 characters"),
    USER_NOT_EXISTED(1004, "User not existed"),

    ;
    private int code;
    private String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
