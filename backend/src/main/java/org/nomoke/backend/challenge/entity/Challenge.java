package org.nomoke.backend.challenge.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.nomoke.backend.challenge.constant.ChallengeStatus;
import org.nomoke.backend.challenge.constant.ChallengeType;
import org.nomoke.backend.challenge.constant.RecordType;
import org.nomoke.backend.user.entity.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String title;

    @Lob
    @Column(nullable = false)
    private String text;

    @Column(nullable = false)
    private LocalDate deadline;

    @CreationTimestamp
    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_date")
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private ChallengeType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "record_type")
    private RecordType recordType;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ChallengeStatus challengeStatus;

    @Column(name = "main_image_url", length = 1000)
    private String mainImageUrl;

    @Column(name = "max_participants")
    private Integer maxParticipants; // 최대 참가자 수


}
