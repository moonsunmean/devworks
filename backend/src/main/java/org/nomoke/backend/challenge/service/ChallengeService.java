//package org.nomoke.backend.challenge.service;
//
//import lombok.RequiredArgsConstructor;
//import org.nomoke.backend.challenge.constant.ChallengeStatus;
//import org.nomoke.backend.challenge.dto.ChallengeDto;
//import org.nomoke.backend.challenge.entity.Challenge;
//import org.nomoke.backend.challenge.repository.ChallengeRepository;
//import org.springframework.beans.BeanUtils;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.NoSuchElementException;
//import java.util.Optional;
//
//@Service
//@Transactional
//@RequiredArgsConstructor
//public class ChallengeService {
//
//    private final ChallengeRepository challengeRepository;
//
//    //데드라인이 지난 챌린지의 상태 업데이트
//    @Scheduled(cron = "0 0 * * * *") //다음날로 넘어갈때 실행
//    public void updateChallengeStatus(){
//        List<Challenge> challenges = challengeRepository.findAll();
//        LocalDateTime now = LocalDateTime.now();
//        for (Challenge challenge : challenges){
//            if(challenge.getDeadline().isBefore(now)){
//                challenge.setChallengeStatus(ChallengeStatus.FINISHED);
//                challengeRepository.save(challenge);
//            }
//        }
//    }
//
//    //생성
//    public Challenge createChallenge(ChallengeDto challengeDto){
//        Challenge challenge = new Challenge();
//        BeanUtils.copyProperties(challengeDto, challenge);  //데이터를 엔티티로 복사
//        challenge.setChallengeStatus(ChallengeStatus.ONGOING);  //생성시 상태는 진행중인챌린지
//        return challengeRepository.save(challenge);
//    }
//
//    //전체 챌린지 조회
//    @Transactional(readOnly = true)
//    public List<Challenge> getAllChallenges(){
//        return challengeRepository.findAll();
//    }
//
//    //챌린지 id로 조회
//    @Transactional(readOnly = true)
//    public Optional<Challenge> getChallengeById(Long id){
//        return challengeRepository.findById(id);
//    }
//
//    //종료된 챌린지 조회
//    @Transactional(readOnly = true)
//    public List<Challenge> getFinishedChallenges(){
//        return challengeRepository.findByChallengeStatus(ChallengeStatus.FINISHED);
//    }
//
//    //진행중인 챌린지 조회
//    @Transactional(readOnly = true)
//    public List<Challenge> getOngoingChallenges(){
//        return challengeRepository.findByChallengeStatus(ChallengeStatus.ONGOING);
//    }
//
//    //수정
//    public Challenge updateChallenge(Long id, ChallengeDto challengeDto){
//        Challenge existingChallenge = challengeRepository.findById(id)
//                .orElseThrow(() -> new NoSuchElementException("챌린지를 찾을 수 없습니다."));
//        if (existingChallenge.getChallengeStatus() == ChallengeStatus.FINISHED){
//            throw new RuntimeException("종료된 챌린지는 수정할 수 없습니다.");
//        }
//        BeanUtils.copyProperties(challengeDto, existingChallenge);
//        return challengeRepository.save(existingChallenge);
//    }
//
//    //삭제
//    public void deleteChallenge(Long id){
//        Challenge existingChallenge = challengeRepository.findById(id)
//                .orElseThrow(() -> new NoSuchElementException("챌린지를 찾을 수 없습니다."));
//        if(existingChallenge.getChallengeStatus() == ChallengeStatus.FINISHED){
//            throw new RuntimeException("종료된 챌린지는 삭제할 수 없습니다.");
//        }
//
//        challengeRepository.deleteById(id);
//    }
//
//}
