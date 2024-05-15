package org.nomoke.backend.analysis.entity;

import jakarta.persistence.Entity;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class HealthCenter {
    private String type;
    private String city;
    private String district;
    private String name;
    private int counselorCount;

}
