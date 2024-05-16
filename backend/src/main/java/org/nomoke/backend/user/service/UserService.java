package org.nomoke.backend.user.service;

import org.nomoke.backend.user.dto.UserDto;
import org.nomoke.backend.user.entity.User;
import org.nomoke.backend.user.mapper.UserMapper;
import org.nomoke.backend.user.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    //회원 정보 조회
    @Transactional(readOnly = true)
    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        return userMapper.toDto(user);
    }

    //회원 정보 수정
    public UserDto updateUserById(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        userMapper.updateUserFromDto(userDto, user);
        userRepository.save(user);
        return userMapper.toDto(user);
    }

    //회원 탈퇴
    public void deleteUserById(Long userId) {
        if(userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
        } else {
            throw new IllegalArgumentException("User not found with ID: " + userId);
        }
    }
}
