package com.mycompany.myapp.controller;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;


public class SessionListener implements HttpSessionListener{

	@Override
	public void sessionCreated(HttpSessionEvent se) {
		System.out.println("sessionCreated"+se.getSession().getId());
		System.out.println("sessionCreated"+se.getSession().getMaxInactiveInterval());
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent se) {
		// TODO Auto-generated method stub
		System.out.println("sessionDestroyed"+se.getSession().getId());
		System.out.println("sessionDestroyed"+se.getSession().getMaxInactiveInterval());
	}

}
