package com.mycompany.myapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;

//全局异常处理
@Controller 
public class GlobalController {
	/**  
     * 用于处理异常的  
     * @return  
     */  
    @ExceptionHandler({Exception.class})   
    public String exception(Exception e) {   
        System.out.println(e.getMessage());   
        e.printStackTrace();   
        return "exception";   
    }   
}
