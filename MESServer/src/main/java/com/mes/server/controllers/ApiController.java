package com.mes.server.controllers;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;
import org.summercool.util.StackTraceUtil;
import org.summercool.web.util.RequestUtils;
import org.summercool.web.views.string.StringView;

import com.alibaba.fastjson.JSON;
import com.mes.server.action.BaseAction; 


public class ApiController extends AbstractController implements ApplicationContextAware {
	Logger logger = LoggerFactory.getLogger(ApiController.class);
	private ObjectMapper objectMapper = new ObjectMapper();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Cookie[] cos = request.getCookies();
		if(cos != null){
			for(Cookie co : cos){
				System.out.println(co.getName());
			}
		}
		
		logger.info("Controller {} handleRequestInternal is called by {}.", getClass(), request.getRemoteHost());
		byte[] bytes = RequestUtils.getRequestInputStream(request);
		String json = new String(bytes, getEncoding(request, response));

		Object resultMap = "{\"result\":\"error\"}";

		//String contentLength = request.getHeader("Content-Length");
		
		//logger.debug(" contentLength: {},md5:{}", contentLength,  MD5Util.getMD5Format(contentLength));

		if (StringUtils.isNotEmpty(json)) {

			try {
				//json = RC4Utils.RC4(json, MD5Util.getMD5Format(contentLength));
				json = json.replace("\\", "\\\\");
				Map<String, Object> params = JSON.parseObject(json, Map.class);
				params.put("request", request);
				params.put("response", response);

				String actionName = params.containsKey("action") ? (String) params.get("action") : "";
//				if(ACTION_NAME_CHAT.equalsIgnoreCase(actionName)){
//					logger.info("action_name:"+actionName);
//					resultMap = "{\"result\":\"actionError\"}";
//					return new ModelAndView(new StringView((String) resultMap));
//				}
				BaseAction baseAction = getApplicationContext().getBean(actionName.toLowerCase(), BaseAction.class);
				
				baseAction.init();
				resultMap = baseAction.execute(params);
				if (resultMap instanceof HashMap) {
					int resultCode = (Integer) ((HashMap) resultMap).get("result");
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("resultCode", resultCode);
					((HashMap) resultMap).remove("result");
					map.put("returnObject", resultMap);
					resultMap = objectMapper.writeValueAsString(map);
				}else if(resultMap instanceof ConcurrentHashMap){
					int resultCode = (Integer) ((ConcurrentHashMap) resultMap).get("result");
					Map<String, Object> map = new ConcurrentHashMap<String, Object>();
					map.put("resultCode", resultCode);
					((ConcurrentHashMap) resultMap).remove("result");
					map.put("returnObject", resultMap);
					resultMap = objectMapper.writeValueAsString(map);
				}
			} catch (Exception e) {
				logger.error(" received msg : {},e:{}", json, StackTraceUtil.getStackTrace(e));
			}
		} else {
			resultMap = "{\"result\":\"actionError\"}";
		}

		logger.debug("received msg:{},return:{}", json, resultMap);

		return new ModelAndView(new StringView((String) resultMap));
	}

	private String getEncoding(HttpServletRequest request, HttpServletResponse response) {
		String encoding = request.getCharacterEncoding();
		if (encoding != null) {
			return encoding;
		}

		encoding = response.getCharacterEncoding();
		if (encoding != null) {
			return encoding;
		}
		return "UTF-8";
	}
	
}
