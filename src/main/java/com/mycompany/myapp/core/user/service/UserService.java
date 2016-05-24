package com.mycompany.myapp.core.user.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.mycompany.myapp.core.user.persistence.UserMapper;
import com.mycompany.myapp.entity.domain.user.User;

@Service
public class UserService {
	
	@Resource
	private UserMapper userMapper;
	   
	public User findById(int id){
		return userMapper.findById(id);
	}
	
	public int insertUser(User u){
		return userMapper.insertUser(u);
		
	}
	
	public int updatetUser(User u){
		return userMapper.updateUser(u);
		
	}
}
