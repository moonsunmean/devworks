package org.nomoke.backend.user.service;

import org.nomoke.backend.user.dto.UserDto;
import org.nomoke.backend.user.entity.User;
import org.nomoke.backend.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    //회원 정보 조회
    public UserDto getUserDetails(String username) throws ChangeSetPersister.NotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ChangeSetPersister.NotFoundException();
        }
        return convertToDto(user);
    }

    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setGender(user.getGender());
        userDto.setBirthDate(user.getBirthDate());
        userDto.setUsername(user.getUsername());

        return userDto;
    }
}
