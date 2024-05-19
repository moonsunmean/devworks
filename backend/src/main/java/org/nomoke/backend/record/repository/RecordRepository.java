package org.nomoke.backend.record.repository;

import org.nomoke.backend.record.entity.RecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface RecordRepository extends JpaRepository<RecordEntity, Long> {
    List<RecordEntity> findByCreatedAtBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);

    // 특정 사용자와 특정 날짜의 레코드를 가져오는 메서드
    RecordEntity findByUserIdAndRecordDate(Long userId, Date recordDate);

    void deleteByRecordDate(Date recordDate);

    // 사용지 데이터 전부 받아옴
    List<RecordEntity> findByUserId(Long userId);

    // 마지막 날짜 데이터를 받아옴
    @Query("SELECT r FROM RecordEntity r WHERE r.userId = :userId ORDER BY r.createdAt DESC")
    Optional<RecordEntity> findTopByUserIdOrderByCreatedAtDesc(Long userId);

    List<RecordEntity> findByUserIdAndRecordDateBetweenOrderByRecordDateAsc
            (Long userId,LocalDate startDateTime, LocalDate endDateTime);
}
