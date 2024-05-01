package org.nomoke.backend.record.controller;

import org.nomoke.backend.record.dto.RecordDto;
import org.nomoke.backend.record.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/record")
public class RecordController {

    private final RecordService recordService;

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @PostMapping
    public ResponseEntity<String> createRecord(@RequestBody RecordDto recordDto) {
        recordService.createRecord(recordDto);
        return ResponseEntity.ok("기록이 저장되었습니다.");
    }
}
