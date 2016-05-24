package com.mycompany.myapp.core.user.persistence;

import com.mycompany.myapp.entity.domain.user.User;

public interface UserMapper {
	public User findById(int id);
	public int insertUser(User u);
	public int updateUser(User u);
}
