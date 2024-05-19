package org.nomoke.backend.challenge.controller;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.nomoke.backend.challenge.dto.CreateChallengeDto;
import org.nomoke.backend.challenge.entity.Challenge;
import org.nomoke.backend.challenge.entity.ChallengeUser;
import org.nomoke.backend.challenge.service.ChallengeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/challenge")
public class ChallengeController {

    private final ChallengeService challengeService;

    public ChallengeController(ChallengeService challengeService) {
        this.challengeService = challengeService;
    }

    //생성
    @PostMapping
    public ResponseEntity<Challenge> createChallenge(@Valid @RequestBody CreateChallengeDto createChallengeDto) {
        Challenge createdChallenge = challengeService.createChallenge(createChallengeDto);
        return ResponseEntity.ok(createdChallenge);
    }

    //그룹 챌린지 참가자 수
    @GetMapping("/participants/count/{challengeId}")
    public ResponseEntity<Long> getParticipantCount(@PathVariable("challengeId") Long challengeId) {
        long count = challengeService.getParticipantCount(challengeId);
        return ResponseEntity.ok(count);
    }

    //가입
    @PostMapping("/join/{challengeId}")
    public ResponseEntity<ChallengeUser> joinChallenge(@PathVariable("challengeId") Long challengeId, @RequestParam("userId") Long userId) {
        ChallengeUser challengeUser = challengeService.joinChallenge(challengeId, userId);
        return ResponseEntity.ok(challengeUser);
    }

    //전체조회
    @GetMapping
    public ResponseEntity<List<Challenge>> getAllChallenges(){
        List<Challenge> challenges = challengeService.getAllChallenges();
        return ResponseEntity.ok(challenges);
    }

    //내가 만든 챌린지 조회
    @GetMapping("/creator/{userId}")
    public ResponseEntity<List<Challenge>> getMyCreatorChallenges(@PathVariable("userId") Long userId){
        List<Challenge> challenge = challengeService.getMyCreatorChallenges(userId);
        return ResponseEntity.ok(challenge);
    }

    //내 챌린지 조회
    @GetMapping("/my/{userId}")
    public ResponseEntity<List<Challenge>> getMyChallenge(@PathVariable("userId") Long userId){
        List<Challenge> challenge = challengeService.getMyChallenges(userId);
        return ResponseEntity.ok(challenge);
    }

    //챌린지 관리 페이지에서 내 챌린지 조회(종료 포함)
    @GetMapping("/my-all/{userId}")
    public ResponseEntity<List<Challenge>> getMyAllChallenge(@PathVariable("userId") Long userId){
        List<Challenge> challenge = challengeService.getMyAllChallenges(userId);
        return ResponseEntity.ok(challenge);
    }

    //특정 챌린지 조회
    @GetMapping("/{challengeId}")
    public ResponseEntity<Challenge> getChallengeById(@PathVariable("challengeId") Long challengeId){
        Challenge challenge = challengeService.getChallengeById(challengeId)
                .orElseThrow(() -> new NoSuchElementException("챌린지를 찾을 수 없습니다."));
        return ResponseEntity.ok(challenge);
    }

    //종료된 챌린지 조회(그룹)
    @GetMapping("/finished")
    public ResponseEntity<List<Challenge>> getFinishedGroupChallenges(){
        List<Challenge> finishedGroupChallenges = challengeService.getFinishedGroupChallenges();
        return ResponseEntity.ok(finishedGroupChallenges);
    }

    //진행중 챌린지 조회(그룹)
    @GetMapping("/ongoing")
    public ResponseEntity<List<Challenge>> getOngoingGroupChallenges(){
        List<Challenge> ongoingGroupChallenges = challengeService.getOngoingGroupChallenges();
        return ResponseEntity.ok(ongoingGroupChallenges);
    }

//    //수정
//    @PutMapping("/{challengeId}")
//    public ResponseEntity<Challenge> updateChallenge(@PathVariable Long challengeId, @Valid @RequestBody ChallengeDto challengeDto) {
//        Challenge updatedChallenge = challengeService.updateChallenge(id, challengeDto);
//        return ResponseEntity.ok(updatedChallenge);
//    }

    //삭제
    @DeleteMapping("/{challengeId}")
    public ResponseEntity<Void> deleteChallenge(@PathVariable Long challengeId){
        challengeService.deleteChallenge(challengeId);
        return ResponseEntity.noContent().build();
    }
}
