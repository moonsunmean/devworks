package org.nomoke.backend.record.controller;

import org.nomoke.backend.record.dto.RecordDto;
import org.nomoke.backend.record.entity.RecordEntity;
import org.nomoke.backend.record.repository.RecordRepository;
import org.nomoke.backend.record.service.RecordService;
import org.nomoke.backend.user.dto.UserDto;
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

    @Autowired
    public RecordController(RecordService recordService) {
        this.recordService = recordService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<RecordEntity>> getRecordsById(@PathVariable("userId") Long userId) {
        System.out.println(userId);
        List<RecordEntity> recordEntity = recordService.selectRecords(userId);
        return ResponseEntity.ok(recordEntity);
    }

    @PostMapping
    public ResponseEntity<String> saveRecord(@RequestBody RecordDto recordDto) {
        recordService.saveRecord(recordDto);
        return ResponseEntity.ok("기록이 저장되었습니다.");
    }

    @PutMapping
    public ResponseEntity<String> updateRecord(@RequestBody RecordDto recordDto) {
        recordService.updateRecord(recordDto);
        return ResponseEntity.ok("기록이 수정되었습니다.");
    }

    @DeleteMapping
    public ResponseEntity<String> deleteRecord(@RequestBody RecordDto recordDto) {
        recordService.deleteRecord(recordDto);
        return ResponseEntity.ok("기록이 삭제되었습니다.");
    }
}
