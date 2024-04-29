package org.nomoke.backend.challenge.repository;

import org.nomoke.backend.challenge.constant.ChallengeStatus;
import org.nomoke.backend.challenge.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    List<Challenge> findByChallengeStatus(ChallengeStatus challengeStatus);

}
