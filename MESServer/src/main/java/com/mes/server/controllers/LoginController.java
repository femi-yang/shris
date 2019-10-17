package com.mes.server.controllers;
 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory; 
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;
import org.springframework.web.servlet.view.RedirectView; 

/**
 * 客户端用户上传文件,然后上传到核心服务上去
 */
public class LoginController
        extends
        AbstractController
{
	@SuppressWarnings("unused")
	private static Logger logger	   = LoggerFactory.getLogger(LoginController.class); 
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) {
		 
		return new ModelAndView(new RedirectView("/index.html"));
	}
	 	
}
