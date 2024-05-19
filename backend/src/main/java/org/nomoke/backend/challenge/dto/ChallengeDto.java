package org.nomoke.backend.challenge.dto;

import lombok.Getter;
import lombok.Setter;
import org.nomoke.backend.challenge.constant.ChallengeType;
import org.nomoke.backend.challenge.constant.RecordType;

import java.time.LocalDate;

@Getter
@Setter
public class ChallengeDto {

    private String title;
    private String text;
    private LocalDate deadline;
    private String mainImageUrl;
    private ChallengeType type;
    private RecordType recordType;

}
