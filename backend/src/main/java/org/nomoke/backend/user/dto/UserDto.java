package org.nomoke.backend.user.dto;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserDto {

    @NotEmpty
    @Pattern(regexp = "^(?=.*[a-z])[a-z0-9]{6,12}$")
    @Pattern(regexp = "^(?!admin$)")
    private String username;

    @NotEmpty
    @Pattern(regexp = "^[가-힣]*$")
    private String name;

    @NotEmpty
    private String gender;

    @NotEmpty
    @Email
    private String email;

    @NotNull
    @Past
    private LocalDate birthDate;


    private String role;
    private LocalDate createdAt;

}
