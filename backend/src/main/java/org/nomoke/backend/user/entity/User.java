package org.nomoke.backend.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.nomoke.backend.challenge.entity.Challenge;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10, nullable = false)
    private String name;

    @Column(name = "login_id", length = 10, nullable = false)
    private String loginId;

    @ManyToMany(mappedBy = "users")
    private Set<Challenge> challenge = new HashSet<>();

}
