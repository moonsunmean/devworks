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
    public void saveRecord(RecordDto recordDto) {
        // 기존에 같은 recordDate가 존재하는지 확인
        RecordEntity existingRecord = recordRepository.findByUserIdAndRecordDate(recordDto.getRecordUserId(), recordDto.getRecordDate());

        if (existingRecord != null) {
            // 기존 레코드가 존재할 경우 RecordAmount를 더함
            existingRecord.setRecordAmount(existingRecord.getRecordAmount() + recordDto.getRecordAmount());
        } else {
            // 기존 레코드가 없을 경우 새로운 레코드 생성
            RecordEntity newRecord = new RecordEntity();
            newRecord.setRecordAmount(recordDto.getRecordAmount());
            newRecord.setRecordDate(recordDto.getRecordDate());
            newRecord.setUserId(recordDto.getRecordUserId());
            recordRepository.save(newRecord);
        }
    }

    public void updateRecord(RecordDto recordDto) {
        // 기존에 같은 recordDate가 존재하는지 확인
        RecordEntity existingRecord = recordRepository.findByUserIdAndRecordDate(recordDto.getRecordUserId(), recordDto.getRecordDate());

        if (existingRecord != null) {
            // 기존 레코드가 존재할 경우 RecordAmount를 업데이트
            existingRecord.setRecordAmount(recordDto.getRecordAmount());
            recordRepository.save(existingRecord);
        } else {
            // 기존 레코드가 없으면 업데이트할 레코드가 없음을 알림
            throw new RuntimeException("업데이트할 레코드가 없습니다.");
        }
    }

    public void deleteRecord(Long recordId) {
        recordRepository.deleteById(recordId);
    }
}
