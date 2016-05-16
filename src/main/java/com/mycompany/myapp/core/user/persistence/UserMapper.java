package com.mycompany.myapp.core.user.persistence;

import com.mycompany.myapp.entity.domain.user.User;

public interface UserMapper {
	public User selectById(int id);
}
