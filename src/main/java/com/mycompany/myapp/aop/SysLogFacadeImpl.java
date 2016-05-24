package com.mycompany.myapp.aop;

import javax.annotation.Resource;

import org.aspectj.lang.ProceedingJoinPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.mycompany.myapp.api.user.SysLogFacade;
import com.mycompany.myapp.core.user.service.UserService;
import com.mycompany.myapp.aop.LogPoint;

//接口层，在同一个模块内引用service处理业务，跨目录（模块）择要引用facade

@Component
public class SysLogFacadeImpl implements  LogPoint{
	private static final Logger logger = LoggerFactory.getLogger(SysLogFacadeImpl.class);
	
	
	@Resource
    private UserService userService;
    
	

	@Override
	public void saveLog(ProceedingJoinPoint joinPoint, String methodName,
			String operate) {
		System.out.println("save-------- log");
	}


}
