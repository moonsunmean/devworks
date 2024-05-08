package org.nomoke.backend.user.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private String username;
    private String password;
    private String role;
    private String firstName;
    private String lastName;
    private String gender;
    private String email;
    private LocalDate birthDate;
    private LocalDate createdAt;

    @PrePersist
    public void prePersist() {

        this.createdAt = LocalDate.now();
    }
}
