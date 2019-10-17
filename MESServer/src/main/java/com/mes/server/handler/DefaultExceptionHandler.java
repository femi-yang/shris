package com.mes.server.handler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.ModelAndView;
import org.summercool.util.StackTraceUtil;
import org.summercool.web.servlet.pipeline.ExceptionPipeline;
import org.summercool.web.views.string.StringView;

public class DefaultExceptionHandler implements ExceptionPipeline {
	Logger logger = LoggerFactory.getLogger(getClass());
	private int order;

	public void handleExceptionInternal(HttpServletRequest request, HttpServletResponse response,
			ModelAndView modelAndView, Throwable throwable) throws Exception {
		// 打印错误信息
		String stackTrace = StackTraceUtil.getStackTrace(throwable);
		System.err.println(stackTrace);
		// 记录错误信息
		logger.error(stackTrace);
		
		if(throwable instanceof org.springframework.web.multipart.MaxUploadSizeExceededException){
			modelAndView.setViewName("redirect:/index.html");
			return;
		}
		
		if (modelAndView != null) {
			modelAndView.setView(new StringView("500"));
		} else {
			throwable.printStackTrace();
		}
	}

	public void setOrder(int order) {
		this.order = order;
	}

	public int getOrder() {
		return order;
	}

}
