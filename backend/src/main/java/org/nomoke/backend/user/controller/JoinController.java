package org.nomoke.backend.user.controller;

import org.nomoke.backend.user.dto.JoinDto;
import org.nomoke.backend.user.service.JoinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JoinController {

    private final JoinService joinService;

    public JoinController(JoinService joinService) {
        this.joinService = joinService;
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinProcess(@RequestBody JoinDto joinDto) {
        try {
            joinService.joinProcess(joinDto);
            return new ResponseEntity<>("회원가입이 성공적으로 처리되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("회원가입 처리 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/join")
    public String joinP() {
        return "hello";
    }
}
