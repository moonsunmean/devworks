package org.nomoke.backend.analysis.dto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AnalysisDto {
    private int cigarette;
    private int money;
    private int life;

    public AnalysisDto(int totalAmount, int money, int time) {
        this.cigarette = totalAmount;
        this.money = money;
        this.life = time;
    }
}
