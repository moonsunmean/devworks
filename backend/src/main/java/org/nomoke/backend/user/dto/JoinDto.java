package org.nomoke.backend.user.dto;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class JoinDto {

    @NotEmpty
    @Pattern(regexp = "^(?=.*[a-z])[a-z0-9]{6,12}$")
    @Pattern(regexp = "^(?!admin$)")
    private String username;

    @NotEmpty
    @Size(min = 8, max = 16)
    @Pattern.List({
            @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$"),
            @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$"),
            @Pattern(regexp = "^(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$")
    })
    private String password;

    @NotEmpty
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

}
