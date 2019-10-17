package com.mes.server.controllers;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;  
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator; 
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;
import org.summercool.web.views.string.StringView;

import com.mes.server.utils.Constants;
import com.mes.server.utils.CookieContants;
import com.mes.server.utils.DesUtil;
import com.mes.server.utils.RetCode;
import com.mes.server.utils.StringUtils; 


/**
 * 客户端用户上传文件,然后上传到核心服务上去
 */
public class UploadController
        extends
        AbstractController
{
	private static Logger logger	   = LoggerFactory.getLogger(UploadController.class);
	private ObjectMapper  objectMapper = new ObjectMapper();
	
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request, HttpServletResponse response) {
		String result = "{\"resultCode\":9999}";
		Map<String, Object> map = new HashMap<String, Object>();
		try
		{
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			
			int UserID = StringUtils.parseInt( getCookieValue(CookieContants.iPlant_User_ID, request));
			
			Iterator<String> names = multipartRequest.getFileNames();
			String fileNetUrl = "";
			String fileName = "";
			if (names.hasNext())
			{
				byte[] fileBytes = null;
				String name = names.next();
				MultipartFile file = multipartRequest.getFile(name);
				fileName = file.getOriginalFilename();
				String[] file_infos = fileName.split("\\.");
				String suffix = file_infos[file_infos.length - 1];
				logger.info("客户端上传的原文件名：" + fileName);
				BufferedInputStream is = null;
				try
				{
					is = new BufferedInputStream(file.getInputStream());
				}
				catch (IOException e1)
				{
					e1.printStackTrace();
				}
				//int file_size = is.available();
				fileBytes = writeTempFile(is);
				
				Date cur=new Date();
				
				//文件名xx_20170101121211_2 
				String file_id ="xx_"+StringUtils.parseDateToString(cur,"HHmmss")+"_"+UserID;        
				 
				fileNetUrl = writeLogFile(fileBytes, suffix, file_id,cur); 
				 
				map.put("file_id", fileNetUrl);
				map.put("file_url", Constants.SERVER_URL+"\\upload\\"+fileNetUrl);
			}
			
			Map<String, Object> rst = new HashMap<String, Object>();
			rst.put("resultCode", RetCode.SERVER_CODE_SUC);
			rst.put("returnObject", map);
			result = objectMapper.writeValueAsString(rst); 
		}
		catch (Exception e)
		{
			logger.error(e.getMessage());
		}
		 
		return new ModelAndView(new StringView(result));
	}
	
	private byte[] writeTempFile(BufferedInputStream is) {
		
		byte[] bytes = null;
		
		try
		{
			bytes = new byte[is.available()];
			is.read(bytes);
		}
		catch (Exception e)
		{
		}
		return bytes;
	}
	
	public String getCookieValue(String cookie_key, HttpServletRequest request){
		
		String cookie_val = null;
		Cookie[] cos = request.getCookies();
		if(cos != null && cos.length > 0){
			for(Cookie co : cos){
				if(cookie_key.equalsIgnoreCase(co.getName())){
					cookie_val = co.getValue();
					break;
				}
			}
		}
		try {
			cookie_val = DesUtil.decrypt(cookie_val, CookieContants.Key);
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
			logger.error(e.getMessage());
		}

		return cookie_val;
	}
	 
	private String writeLogFile(byte[] fileBytes, String suffix, String file_name,Date cur) {
		Calendar now = Calendar.getInstance();
		now.setTime(cur);
		String wResult=now.get(Calendar.YEAR)+"/"+(now.get(Calendar.MONTH)+1)+"/"+now.get(Calendar.DAY_OF_MONTH)+"/";
		try{
			
			File path=new File(Constants.Client_Upload_Save_Path+wResult);	
		  
			if(!path.exists())
				path.mkdirs();
			
			wResult+=file_name + "." + suffix;
			File file = new File(Constants.Client_Upload_Save_Path+wResult);
			if (!file.exists())
			{
				OutputStream picStream = null;
				//
				try {
					picStream = new FileOutputStream(file);
					picStream.write(fileBytes);
				} catch (Exception e) {
					logger.error(e.getMessage());
				}finally{
					try {
						picStream.flush();
						picStream.close();
					} catch (Exception e) {
						logger.error(e.getMessage());
					}
				}
					
			}
		}catch (Exception e) {
			wResult="";
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		
		return wResult;
	}
	
	
}
