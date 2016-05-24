package com.mycompany.myapp.controller;

import java.util.Date;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mycompany.myapp.annotation.Log;
import com.mycompany.myapp.api.user.UserFacade;
import com.mycompany.myapp.entity.domain.user.User;
//用户登陆处理
@Controller
public class LoginController {
	private static final Logger logger = LoggerFactory
			.getLogger(LoginController.class);

	@Resource
	private UserFacade userFacade;

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	@Log(value="aaa")
	public String login(HttpServletRequest request,
			HttpServletResponse response, Locale locale, Model model) {
		logger.info("Welcome login {}.", locale);
		User u = userFacade.findById(1);
		u.setCreateTime(new Date());
		userFacade.updateUser(u);
		HttpSession session = request.getSession();
		System.out.println("JSESSIONID:" + session.getAttribute("jessionid")
				+ "," + request.getAttributeNames().toString());

		// 获取当前客户端Ip
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}

		// System.out.println("session:"+JsonUtils.beanToJson(session));
		// 生成session

		request.getSession().setAttribute("token", "userid" + u.getId());
		request.getSession().setMaxInactiveInterval(100);
		model.addAttribute("username", "张三" + u.getName() + u.getPassword());

		return "login";
	}

	@RequestMapping(value = "/validate")
	@ResponseBody
	public String validateLogin(HttpServletRequest request,
			HttpServletResponse response, Locale locale, Model model) {
		// 验证登陆，查询菜单，重定向主页
		request.getSession().setAttribute("menu", "a");
		request.getSession().setAttribute("a", "b");
		User user = new User();
		user.setId(1);
		request.getSession().setAttribute("", user);

		// req.getSession().setAttribute(ConfigConstant.PS_USER_MEMU_LIST_KEY +
		// login.getUserName(), menus);
		return "home";
	}

	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(HttpSession session, HttpServletRequest request,
			HttpServletResponse response) {

		System.out.println(request.getSession().getAttribute("token"));
		if (session != null) {
			session.removeAttribute("U");
		}
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if ("userCookie".equals(cookie.getName())) {
					cookie.setValue("");
					cookie.setMaxAge(0);
					response.addCookie(cookie);
				}
			}
		}
		logger.info("注销成功！");
		return null;
	}
}
