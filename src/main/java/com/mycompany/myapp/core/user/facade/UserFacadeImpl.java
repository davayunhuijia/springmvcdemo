package com.mycompany.myapp.core.user.facade;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.mycompany.myapp.api.user.UserFacade;
import com.mycompany.myapp.core.user.service.UserService;
import com.mycompany.myapp.entity.domain.user.User;

@Component
public class UserFacadeImpl implements UserFacade {
	private static final Logger logger = LoggerFactory.getLogger(UserFacadeImpl.class);
	
	
	@Resource
    private UserService userService;
    
	@Override
    public User selectById(int id){
		logger.info("selectById");
		return userService.selectById(id);
	}


}
