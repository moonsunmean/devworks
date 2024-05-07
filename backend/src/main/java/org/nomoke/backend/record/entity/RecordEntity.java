package org.nomoke.backend.record.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.nomoke.backend.user.entity.User;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name="Record")
public class RecordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long userId;

    @Column(name="smokeAmount")
    private Long recordAmount;

    @Column(name="date")
    @Temporal(TemporalType.DATE)
    private Date recordDate;

    @Column
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column
    @CreationTimestamp
    private LocalDateTime updatedAt;

}
