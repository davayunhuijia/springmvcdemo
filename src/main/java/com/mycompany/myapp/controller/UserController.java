package com.mycompany.myapp.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mycompany.myapp.api.user.UserFacade;
import com.mycompany.myapp.entity.domain.user.User;
import com.mycompany.myapp.utils.JsonUtils;

//用户登陆，验证，注销控制类

@Controller
@RequestMapping(value = "/op/user")
public class UserController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Resource
	private UserFacade userFacade;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/query", method = RequestMethod.GET)
	public String query(Locale locale, Model model) {
		logger.info("query {}.", locale);
		User u = userFacade.selectById(1);
		
		model.addAttribute("username", "张三" +u.getName()+u.getPassword()+JsonUtils.beanToJson(u));
		
		return "login";
	}
	
	@RequestMapping(value = "/add", method = RequestMethod.GET)
	public String add(Locale locale, Model model) {
		logger.info("add {}.", locale);
		model.addAttribute("username", "张三" +"add");
		return "login";
	}
	
}
