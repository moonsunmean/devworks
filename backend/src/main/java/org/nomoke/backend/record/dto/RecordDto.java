package org.nomoke.backend.record.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class RecordDto {
    private Long recordAmount;
    private Date recordDate;
}
