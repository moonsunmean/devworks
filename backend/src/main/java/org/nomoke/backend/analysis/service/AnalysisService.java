package org.nomoke.backend.analysis.service;
import java.io.InputStreamReader;
import java.time.DayOfWeek;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nomoke.backend.analysis.dto.AnalysisDto;
import org.nomoke.backend.analysis.entity.HealthCenter;
import org.nomoke.backend.record.entity.RecordEntity;
import org.nomoke.backend.record.repository.RecordRepository;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;



@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AnalysisService {
    private final RecordRepository recordRepository;



    // 이번주 데이터 가져오기
    public List<RecordEntity> getRecordsForUserInDateRange(Long userId) {
        LocalDate now = LocalDate.now(); // 현재 날짜
        LocalDate startOfWeek = now.with(DayOfWeek.MONDAY); // 이번 주의 월요일
        LocalDate endOfWeek = now.with(DayOfWeek.SUNDAY); // 이번 주의 일요일
        LocalDate startOfLastWeek = startOfWeek.minusDays(7);
        log.info("start: {}",startOfWeek);
        log.info("end: {}",endOfWeek);
        return recordRepository.findByUserIdAndRecordDateBetweenOrderByRecordDateAsc
                (userId, startOfWeek,endOfWeek);
    }
    // 저번주 데이터 가져오기
    public List<RecordEntity> getLastRecordsForUserInDateRange(Long userId) {
        LocalDate now = LocalDate.now(); // 현재 날짜
        LocalDate startOfWeek = now.with(DayOfWeek.MONDAY).minusDays(7);; // 이번 주의 월요일
        LocalDate endOfWeek = now.with(DayOfWeek.SUNDAY).minusDays(7);; // 이번 주의 일요일
        log.info("startLast: {}",startOfWeek);
        log.info("endLast: {}",endOfWeek);
        return recordRepository.findByUserIdAndRecordDateBetweenOrderByRecordDateAsc
                (userId, startOfWeek,endOfWeek);
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



    public List<HealthCenter> getAllHealthCenters() throws IOException, CsvException {
        List<HealthCenter> healthCenters = new ArrayList<>();
        try (CSVReader reader = new CSVReader(new InputStreamReader(new ClassPathResource("health_center.csv").getInputStream(), "UTF-8"))) {
            List<String[]> records = reader.readAll();
            for (int i = 1; i < records.size(); i++) { // Skip the header row
                String[] record = records.get(i);
                HealthCenter healthCenter = new HealthCenter(
                        record[0], // Type(보건소, 금연지원센터)
                        record[1], // City(시)
                        record[2], // District(구 등 지역구분)
                        record[3], // Name(주소 이름)
                        Integer.parseInt(record[4]) // Counselor Count

                );
                log.info("start: {}",healthCenter);
                healthCenters.add(healthCenter);
            }
        }
        return healthCenters;
    }


}
