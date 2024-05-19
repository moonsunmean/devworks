package org.nomoke.backend.user.service;

import org.nomoke.backend.user.dto.JoinDto;
import org.nomoke.backend.user.entity.User;
import org.nomoke.backend.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void joinProcess(JoinDto joinDto) {

        String username = joinDto.getUsername();
        String password = joinDto.getPassword();
        String name = joinDto.getName();
        String gender = joinDto.getGender();
        String email = joinDto.getEmail();
        LocalDate birthDate = joinDto.getBirthDate();
        String role = joinDto.getRole();

        Boolean isExist = userRepository.existsByUsername(username);

        if (isExist) {
            return;
        }

        User data = new User();

        data.setUsername(username);
        data.setPassword(bCryptPasswordEncoder.encode(password));     //비밀번호는 무조건 암호화해서 등록
        data.setRole(role);
        data.setName(name);
        data.setGender(gender);
        data.setEmail(email);
        data.setBirthDate(birthDate);

        userRepository.save(data);
    }
}
