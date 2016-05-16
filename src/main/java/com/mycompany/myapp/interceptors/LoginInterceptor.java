package com.mycompany.myapp.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;


//拦截器用于处理登陆及用户权限验证

public class LoginInterceptor  implements HandlerInterceptor {


//该方法的返回值是布尔值Boolean 类型的，当它返回为false 时，
//表示请求结束，后续的Interceptor 和Controller 都不会再执行；
//当返回值为true 时就会继续调用下一个Interceptor 的preHandle 方法，
@Override
public boolean preHandle(HttpServletRequest request,
		HttpServletResponse response, Object handler) throws Exception {
	 System.out.println("login------" + System.nanoTime());
	  return true;
}

//是在当前所属的Interceptor 的preHandle 方法的返回值为true 时才能被调用。
//postHandle 方法，顾名思义就是在当前请求进行处理之后，也就是Controller 方法调用之后执行，
//但是它会在DispatcherServlet 进行视图返回渲染之前被调用，
@Override
public void postHandle(HttpServletRequest request,
		HttpServletResponse response, Object handler, ModelAndView modelAndView)
		throws Exception {
	System.out.println("postHandle------" + System.nanoTime());
//	  if ((request.getSession()).getAttribute("") == null) {
//	   modelAndView.setViewName("redirect:/login");
//	  }
}

@Override
public void afterCompletion(HttpServletRequest request,
		HttpServletResponse response, Object handler, Exception ex)
		throws Exception {
	// TODO Auto-generated method stub
	
}


}
