package org.nomoke.backend.challenge.dto;

import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import org.nomoke.backend.challenge.constant.ChallengeType;
import org.nomoke.backend.challenge.constant.RecordType;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChallengeDto {

    private String title;
    private String text;
    private LocalDateTime deadline;
    private String mainImageUrl;
    private ChallengeType type;
    private RecordType recordType;

}
