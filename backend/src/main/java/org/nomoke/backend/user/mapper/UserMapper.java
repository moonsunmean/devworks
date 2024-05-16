package org.nomoke.backend.user.mapper;

import org.nomoke.backend.user.dto.UserDto;
import org.nomoke.backend.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(User user){
        UserDto userDto = new UserDto();

        userDto.setUsername( user.getUsername() );
        userDto.setName( user.getName() );
        userDto.setGender( user.getGender() );
        userDto.setEmail( user.getEmail() );
        userDto.setBirthDate( user.getBirthDate() );
        userDto.setRole(user.getRole());
        userDto.setCreatedAt(user.getCreatedAt());

        return userDto;
    }

    public void updateUserFromDto(UserDto userDto, User user) {

        if (!userDto.getUsername().isEmpty() && userDto.getUsername().matches("^(?=.*[a-z])[a-z0-9]{6,12}$")) {
            user.setUsername(userDto.getUsername());
        }
        if (!userDto.getName().isEmpty() && userDto.getName().matches("^[가-힣]*$")) {
            user.setName(userDto.getName());
        }
        if (!userDto.getGender().isEmpty() && (userDto.getGender().equals("f") || userDto.getGender().equals("m"))) {
            user.setGender(userDto.getGender());
        }
        if (!userDto.getEmail().isEmpty() && userDto.getEmail().matches("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$")) {
            user.setEmail(userDto.getEmail());
        }
        if (userDto.getBirthDate() != null) {
            user.setBirthDate(userDto.getBirthDate());
        }
    }
}
