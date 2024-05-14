package org.nomoke.backend.user.mapper;

import org.nomoke.backend.user.dto.UserDto;
import org.nomoke.backend.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDto toDto(User user){
        UserDto userDto = new UserDto();

        userDto.setId( user.getId() );
        userDto.setUsername( user.getUsername() );
        userDto.setPassword( user.getPassword() );
        userDto.setName( user.getName() );
        userDto.setGender( user.getGender() );
        userDto.setEmail( user.getEmail() );
        userDto.setBirthDate( user.getBirthDate() );
        userDto.setCreatedAt( user.getCreatedAt() );
        userDto.setRole( user.getRole() );

        return userDto;
    }

    public User toEntity(UserDto userDto){

        User user = new User();

        user.setId( userDto.getId() );
        user.setUsername( userDto.getUsername() );
        user.setPassword( userDto.getPassword() );
        user.setRole( userDto.getRole() );
        user.setName( userDto.getName() );
        user.setGender( userDto.getGender() );
        user.setEmail( userDto.getEmail() );
        user.setBirthDate( userDto.getBirthDate() );
        user.setCreatedAt( userDto.getCreatedAt() );

        return user;
    }

    public void updateUserFromDto(UserDto userDto, User user) {

        user.setId( userDto.getId() );
        user.setUsername( userDto.getUsername() );
        user.setPassword( userDto.getPassword() );
        user.setRole( userDto.getRole() );
        user.setName( userDto.getName() );
        user.setGender( userDto.getGender() );
        user.setEmail( userDto.getEmail() );
        user.setBirthDate( userDto.getBirthDate() );
        user.setCreatedAt( userDto.getCreatedAt() );

    }
}
