package org.nomoke.backend.record.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.nomoke.backend.record.dto.RecordDto;
import org.nomoke.backend.record.entity.RecordEntity;
import org.nomoke.backend.record.repository.RecordRepository;
import org.nomoke.backend.user.dto.UserDto;
import org.nomoke.backend.user.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRepository;

    public List<RecordEntity> selectRecords() {
        return recordRepository.findAll();
    }
    public List<RecordEntity> selectRecords(Long userId) {
        return recordRepository.findByUserId(userId);
    }
    public void createRecord(RecordDto recordDto) {
        RecordEntity recordEntity = new RecordEntity();
        recordEntity.setRecordAmount(recordDto.getRecordAmount());
        recordEntity.setRecordDate(recordDto.getRecordDate());
        recordEntity.setUserId(recordDto.getRecordUserId());

        recordRepository.save(recordEntity);
    }
}
