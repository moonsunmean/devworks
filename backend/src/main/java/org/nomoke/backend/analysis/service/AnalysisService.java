package org.nomoke.backend.analysis.service;
import java.time.DayOfWeek;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.nomoke.backend.analysis.dto.AnalysisDto;
import org.nomoke.backend.record.dto.RecordDto;
import org.nomoke.backend.record.entity.RecordEntity;
import org.nomoke.backend.record.repository.RecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AnalysisService {
    private final RecordRepository recordRepository;



    // 이번주 데이터 가져오기
    public List<RecordEntity> getRecordsForUserInDateRange(Long userId) {
        LocalDate now = LocalDate.now(); // 현재 날짜
        LocalDate startOfWeek = now.with(DayOfWeek.MONDAY); // 이번 주의 월요일
        LocalDate endOfWeek = now.with(DayOfWeek.SUNDAY); // 이번 주의 일요일
        return recordRepository.findByUserIdAndCreatedAtBetween(userId, startOfWeek, endOfWeek);
    }

    public AnalysisDto AnalysisWeek(List<RecordEntity> records){
        int totalAmount = 0; // 총 담배개수
        int money = 0;
        int time = 0;
        for (RecordEntity record : records) {
            if (record.getRecordAmount() != null) { // Null 체크
                totalAmount += record.getRecordAmount();
            }
        }
        money = totalAmount*225;
        time = totalAmount*660;

        return new AnalysisDto(totalAmount,money,time);
    }
}
