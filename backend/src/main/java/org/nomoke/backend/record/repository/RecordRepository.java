package org.nomoke.backend.record.repository;

import org.nomoke.backend.record.entity.RecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface RecordRepository extends JpaRepository<RecordEntity, Long> {
    List<RecordEntity> findByCreatedAtBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
}
