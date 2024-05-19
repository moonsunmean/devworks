package org.nomoke.backend.challenge.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.nomoke.backend.user.entity.User;

@Entity
@Table(name = "challenge_user")
@Getter
@Setter
public class ChallengeUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "is_creator", nullable = false)
    private boolean isCreator;

}
