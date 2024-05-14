package org.nomoke.backend.user.controller;

import org.nomoke.backend.user.dto.UserDto;
import org.nomoke.backend.user.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //username을통해 userId조회
    @GetMapping("/getId")
    public ResponseEntity<Long> getUserIdByUsername(@RequestParam("username") String username) {
        Long userId = userService.getUserIdByUsername(username);
        return ResponseEntity.ok(userId);
    }

    //회원정보조회
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        UserDto userDto = userService.getUserById(userId);
        return ResponseEntity.ok(userDto);
    }

    //회원정보수정
    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUserById(@PathVariable Long userId, @RequestBody UserDto userDto) {
        UserDto updatedUserDto = userService.updateUserById(userId, userDto);
        return ResponseEntity.ok(updatedUserDto);
    }

    //회원 탈퇴
    @DeleteMapping("/{userId}")
    public void deleteUserById(@PathVariable Long userId) {
        userService.deleteUserById(userId);
    }
}
