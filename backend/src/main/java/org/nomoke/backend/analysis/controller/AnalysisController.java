package org.nomoke.backend.analysis.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.nomoke.backend.analysis.dto.AnalysisDto;
import org.nomoke.backend.analysis.service.AnalysisService;
import org.nomoke.backend.record.entity.RecordEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AnalysisController {
    private final AnalysisService analysisService;

    @GetMapping("/analysis/{id}")
    public ResponseEntity<AnalysisDto> getWeeklyAnalysisByUserId(@PathVariable("id") Long id){
        log.info("id값1: {}",id);
        List<RecordEntity> thisWeekRecordEntity = analysisService.getRecordsForUserInDateRange(id);
        List<RecordEntity> lastWeekRecordEntity = analysisService.getLastRecordsForUserInDateRange(id);
        AnalysisDto analysisDto = analysisService.AnalysisWeek(thisWeekRecordEntity);
        analysisDto.setThisWeekRecordEntity(thisWeekRecordEntity);
        analysisDto.setLastWeekRecordEntity(lastWeekRecordEntity);
        return new ResponseEntity<>(analysisDto, HttpStatus.OK);
    }
}
