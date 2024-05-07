package org.nomoke.backend.challenge.controller;


import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.nomoke.backend.challenge.dto.ChallengeDto;
import org.nomoke.backend.challenge.entity.Challenge;
import org.nomoke.backend.challenge.service.ChallengeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

//    //생성
//    @PostMapping
//    public ResponseEntity<Challenge> createChallenge(@Valid @RequestBody ChallengeDto challengeDto) {
//        Challenge createdChallenge = challengeService.createChallenge(challengeDto);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdChallenge);
//    }

    //전체조회
    @GetMapping
    public ResponseEntity<List<Challenge>> getAllChallenges(){
        List<Challenge> challenges = challengeService.getAllChallenges();
        return ResponseEntity.ok(challenges);
    }

    //특정 챌린지 조회
    @GetMapping("/{id}")
    public ResponseEntity<Challenge> getChallengeById(@PathVariable Long id){
        Challenge challenge = challengeService.getChallengeById(id)
                .orElseThrow(() -> new NoSuchElementException("챌린지를 찾을 수 없습니다."));
        return ResponseEntity.ok(challenge);
    }

    //종료된 챌린지 조회
    @GetMapping("/finished")
    public ResponseEntity<List<Challenge>> getFinishedChallenges(){
        List<Challenge> finishedChallenges = challengeService.getFinishedChallenges();
        return ResponseEntity.ok(finishedChallenges);
    }

    //진행중 챌린지 조회
    @GetMapping("/ongoing")
    public ResponseEntity<List<Challenge>> getOngoingChallenges(){
        List<Challenge> ongoingChallenges = challengeService.getOngoingChallenges();
        return ResponseEntity.ok(ongoingChallenges);
    }

//    //수정
//    @PutMapping("/{id}")
//    public ResponseEntity<Challenge> updateChallenge(@PathVariable Long id, @Valid @RequestBody ChallengeDto challengeDto) {
//        Challenge updatedChallenge = challengeService.updateChallenge(id, challengeDto);
//        return ResponseEntity.ok(updatedChallenge);
//    }

    //삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long id){
        challengeService.deleteChallenge(id);
        return ResponseEntity.noContent().build();
    }
}
