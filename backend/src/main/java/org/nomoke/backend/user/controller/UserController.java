package org.nomoke.backend.user.controller;

import org.nomoke.backend.user.dto.UserDto;
import org.nomoke.backend.user.entity.User;
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

    //회원정보조회
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    //회원정보수정
    @PutMapping("/{userId}")
    public ResponseEntity<UserDto> updateUserById(@PathVariable("userId") Long userId, @RequestBody UserDto userDto) {
        UserDto updatedUserDto = userService.updateUserById(userId, userDto);
        return ResponseEntity.ok(updatedUserDto);
    }

    //회원 탈퇴
    @DeleteMapping("/{userId}")
    public void deleteUserById(@PathVariable("userId") Long userId) {
        userService.deleteUserById(userId);
    }
}
