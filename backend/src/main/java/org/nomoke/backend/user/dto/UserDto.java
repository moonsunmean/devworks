package org.nomoke.backend.user.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserDto {

    private Long id;
    private String username;
    private String password;
    private String name;
    private String gender;
    private String email;
    private LocalDate birthDate;
    private LocalDate createdAt;
    private String role;
}
