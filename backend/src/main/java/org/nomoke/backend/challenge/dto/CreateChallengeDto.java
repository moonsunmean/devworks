package org.nomoke.backend.challenge.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import org.nomoke.backend.challenge.constant.ChallengeStatus;
import org.nomoke.backend.challenge.constant.ChallengeType;
import org.nomoke.backend.challenge.constant.RecordType;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class CreateChallengeDto {

    private Long userId;

    @NotBlank(message = "챌린지 제목을 입력하세요.")
    @Size(max = 20)
    private String title;

    @NotBlank
    private String text;

    @Future
    @NotNull
    private LocalDate deadline;

    private String mainImageUrl;

    @NotNull
    private ChallengeType type;

    @NotNull
    private RecordType recordType;

    @NotNull
    private ChallengeStatus challengeStatus;

    @NotNull
    @Max(value = 20)
    private Integer maxParticipants;

}
