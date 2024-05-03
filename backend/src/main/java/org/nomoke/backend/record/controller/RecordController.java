package org.nomoke.backend.record.controller;

import org.nomoke.backend.record.dto.RecordDto;
import org.nomoke.backend.record.entity.RecordEntity;
import org.nomoke.backend.record.repository.RecordRepository;
import org.nomoke.backend.record.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/record")
public class RecordController {

    private final RecordService recordService;
    private final RecordRepository recordRepository;

    @Autowired
    public RecordController(RecordService recordService, RecordRepository recordRepository) {
        this.recordService = recordService;
        this.recordRepository = recordRepository;
    }


    @PostMapping
    public ResponseEntity<String> createRecord(@RequestBody RecordDto recordDto) {
        recordService.createRecord(recordDto);
        return ResponseEntity.ok("기록이 저장되었습니다.");
    }
}
