package com.mycompany.myapp.aop;

import org.aspectj.lang.ProceedingJoinPoint;

/**
 * <p>
 * 日志切入点接口类
 * </p>
 * 
 * @author hubin
 * @Date 2016-05-09
 */
public interface LogPoint {

	void saveLog(ProceedingJoinPoint joinPoint, String methodName, String operate);

}
