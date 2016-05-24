package com.mycompany.myapp.core.user.facade;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.mycompany.myapp.api.user.UserFacade;
import com.mycompany.myapp.core.user.service.UserService;
import com.mycompany.myapp.entity.domain.user.User;

//接口层，在同一个模块内引用service处理业务，跨目录（模块）择要引用facade

@Component
public class UserFacadeImpl implements UserFacade {
	private static final Logger logger = LoggerFactory.getLogger(UserFacadeImpl.class);
	
	
	@Resource
    private UserService userService;
    
	@Override
    public User findById(int id){
		logger.info("selectById");
		return userService.findById(id);
	}
	
	@Override
	public int updateUser(User user){
		logger.info("updateUser");
		return userService.updatetUser(user);
	}
	
	@Override
	public int insertUser(User user){
		logger.info("updateUser");
		return userService.insertUser(user);
	}


}
