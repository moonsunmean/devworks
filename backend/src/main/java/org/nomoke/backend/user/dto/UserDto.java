package org.nomoke.backend.user.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserDto {

    private String username;
    private String role;
    private String firstName;
    private String lastName;
    private String gender;
    private String email;
    private LocalDate birthDate;

}
