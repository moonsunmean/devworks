package org.nomoke.backend.analysis.dto;

import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.nomoke.backend.record.entity.RecordEntity;

import java.util.List;

@RequiredArgsConstructor
@Setter
@Getter
@Data
public class AnalysisDto {
    private int cigarette;
    private int money;
    private int life;
    private List<RecordEntity> thisWeekRecordEntity;
    private List<RecordEntity> lastWeekRecordEntity;
    public AnalysisDto(int totalAmount, int money, int time) {
        this.cigarette = totalAmount;
        this.money = money;
        this.life = time;
    }
}
