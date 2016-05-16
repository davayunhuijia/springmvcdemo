package com.mycompany.myapp.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;



@Component  
@Aspect 
public class ControllerAop {

	private static final Logger logger = LoggerFactory.getLogger(ControllerAop.class);
	
	
	public ControllerAop() {  
        System.out.println("ControllerAop");  
    }  
	
	@Around("execution(* org.springframework.web.servlet.mvc.annotation.AnnotationMethodHandlerAdapter.handle(..))")  
	public Object authPermission(ProceedingJoinPoint pjp)  throws Throwable   
    {  
        try {  
        	logger.info("ControllerAop");
        	System.out.println("=======>ControllerAop");
            Object retVal = pjp.proceed();  
            System.out.println(retVal);  
            return retVal;  
        } catch (Exception e) {  
            System.out.println("异常");  
            return null;  
        }  
    }  
}
