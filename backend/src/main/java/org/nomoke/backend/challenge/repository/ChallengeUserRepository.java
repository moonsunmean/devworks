package org.nomoke.backend.challenge.repository;

import org.nomoke.backend.challenge.entity.ChallengeUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeUserRepository extends JpaRepository<ChallengeUser, Long> {

    List<ChallengeUser> findByUserIdAndIsCreator(Long userId, boolean isCreator);

    List<ChallengeUser> findByUserId(Long userId);

    long countByChallengeId(Long challengeId);
}
