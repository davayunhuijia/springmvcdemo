package com.mycompany.myapp.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;



//业务操作控制类：以/op/{模块}配置
//方法配置为：add ,delete ,update ,query ,query_xxx

@Controller
@RequestMapping(value = "/op/shop/")
public class ShopController {
	private static final Logger logger = LoggerFactory.getLogger(ShopController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/add")
	public String home(Locale locale, Model model) {
		logger.info("shop add.", locale);
		return "login";
	}
	
}
