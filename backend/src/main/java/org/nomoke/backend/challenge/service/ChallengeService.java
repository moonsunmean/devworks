package org.nomoke.backend.challenge.service;

import lombok.RequiredArgsConstructor;
import org.nomoke.backend.challenge.constant.ChallengeStatus;
import org.nomoke.backend.challenge.constant.ChallengeType;
import org.nomoke.backend.challenge.dto.ChallengeDto;
import org.nomoke.backend.challenge.dto.CreateChallengeDto;
import org.nomoke.backend.challenge.entity.Challenge;
import org.nomoke.backend.challenge.entity.ChallengeUser;
import org.nomoke.backend.challenge.repository.ChallengeRepository;
import org.nomoke.backend.challenge.repository.ChallengeUserRepository;
import org.nomoke.backend.user.entity.User;
import org.nomoke.backend.user.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final UserService userService;
    private final ChallengeUserRepository challengeUserRepository;

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

    //생성
    public Challenge createChallenge(CreateChallengeDto createChallengeDto){
        Challenge challenge = new Challenge();

        challenge.setTitle(createChallengeDto.getTitle());
        challenge.setText(createChallengeDto.getText());
        challenge.setDeadline(createChallengeDto.getDeadline());
        challenge.setMainImageUrl(createChallengeDto.getMainImageUrl());
        challenge.setType(createChallengeDto.getType());
        challenge.setRecordType(createChallengeDto.getRecordType());
        challenge.setChallengeStatus(ChallengeStatus.ONGOING);      //생성시 상태는 진행중인챌린지
        challenge.setMaxParticipants(createChallengeDto.getMaxParticipants());

        Long userId = createChallengeDto.getUserId();
        User user = userService.getUserById(userId);

        ChallengeUser challengeUser = new ChallengeUser();
        challengeUser.setChallenge(challenge);
        challengeUser.setUser(user);
        challengeUser.setCreator(true);
        challengeUserRepository.save(challengeUser);

        return challengeRepository.save(challenge);
    }

    //그룹 챌린지 참가자 수
    @Transactional(readOnly = true)
    public long getParticipantCount(Long challengeId) {
        return challengeUserRepository.countByChallengeId(challengeId);
    }

    //챌린지 가입
    public ChallengeUser joinChallenge(Long challengeId, Long userId) {
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new NoSuchElementException("챌린지를 찾을 수 없습니다."));

        if (challenge.getChallengeStatus() != ChallengeStatus.ONGOING || challenge.getType() != ChallengeType.GROUP){
            throw new RuntimeException("진행 중인 그룹 챌린지만 가입할 수 있습니다.");
        }

        long participantCount = challengeUserRepository.countByChallengeId(challengeId);
        if (participantCount >= challenge.getMaxParticipants()) {
            throw new RuntimeException("참가 인원이 최대치에 도달했습니다.");
        }

        User user = userService.getUserById(userId);

        ChallengeUser challengeUser = new ChallengeUser();
        challengeUser.setChallenge(challenge);
        challengeUser.setUser(user);
        challengeUser.setCreator(false);
        return challengeUserRepository.save(challengeUser);
    }

    //전체 챌린지 조회
    @Transactional(readOnly = true)
    public List<Challenge> getAllChallenges(){
        return challengeRepository.findAll();
    }

    //내가만든 챌린지 조회
    @Transactional(readOnly = true)
    public List<Challenge> getMyCreatorChallenges(Long userId){
        List<ChallengeUser> challengeUsers = challengeUserRepository.findByUserIdAndIsCreator(userId, true);
        return challengeUsers.stream()
                .map(ChallengeUser::getChallenge)
                .collect(Collectors.toList());
    }

    //내 챌린지 조회(진행중인것만)
    @Transactional(readOnly = true)
    public List<Challenge> getMyChallenges(Long userId){
        List<ChallengeUser> challengeUsers = challengeUserRepository.findByUserId(userId);
        return challengeUsers.stream()
                .map(ChallengeUser::getChallenge)
                .filter(challenge -> challenge.getChallengeStatus() == ChallengeStatus.ONGOING)
                .collect(Collectors.toList());
    }

    //챌린지 관리 페이지에서 내 챌린지 조회(종료 포함)
    @Transactional(readOnly = true)
    public List<Challenge> getMyAllChallenges(Long userId){
        List<ChallengeUser> challengeUsers = challengeUserRepository.findByUserId(userId);
        return challengeUsers.stream()
                .map(ChallengeUser::getChallenge)
                .collect(Collectors.toList());
    }

    //특정 챌린지 조회
    @Transactional(readOnly = true)
    public Optional<Challenge> getChallengeById(Long id){
        return challengeRepository.findById(id);
    }

    //종료된 챌린지 조회
    @Transactional(readOnly = true)
    public List<Challenge> getFinishedGroupChallenges(){
        return challengeRepository.findByChallengeStatusAndType(ChallengeStatus.FINISHED, ChallengeType.GROUP);
    }

    //진행중인 챌린지 조회
    @Transactional(readOnly = true)
    public List<Challenge> getOngoingGroupChallenges(){
        return challengeRepository.findByChallengeStatusAndType(ChallengeStatus.ONGOING, ChallengeType.GROUP);
    }

    //수정
    public Challenge updateChallenge(Long id, ChallengeDto challengeDto){
        Challenge existingChallenge = challengeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("챌린지를 찾을 수 없습니다."));
        if (existingChallenge.getChallengeStatus() == ChallengeStatus.FINISHED){
            throw new RuntimeException("종료된 챌린지는 수정할 수 없습니다.");
        }
        BeanUtils.copyProperties(challengeDto, existingChallenge);
        return challengeRepository.save(existingChallenge);
    }

    //삭제
    public void deleteChallenge(Long id){
        Challenge existingChallenge = challengeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("챌린지를 찾을 수 없습니다."));
        if(existingChallenge.getChallengeStatus() == ChallengeStatus.FINISHED){
            throw new RuntimeException("종료된 챌린지는 삭제할 수 없습니다.");
        }

        challengeRepository.deleteById(id);
    }

}
