package com.mes.server.action.web;
 
import java.util.HashMap; 
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mes.server.bean.bfc.BFCClientManage; 
import com.mes.server.action.impl.BaseActionImpl;
import com.mes.server.service.DealService;
import com.mes.server.utils.Constants;
import com.mes.server.utils.RetCode;
import com.mes.server.utils.StringUtils; 
 


/** 
 * 获取最新的版本信息
 */
public class ClientVersionLastGetAction extends BaseActionImpl {
	private static Logger logger = LoggerFactory.getLogger(ClientVersionLastGetAction.class);
	private DealService dealService;
	
	public Object execute(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			@SuppressWarnings("unused")
			HttpServletResponse response = (HttpServletResponse) param.get("response");
			HttpServletRequest request = (HttpServletRequest) param.get("request");
			
			String client_info = StringUtils.parseString(request.getParameter("client_info"));
			
			if(client_info==null)
				client_info="";
			
			BFCClientManage wClientManage=Constants.Client_Manage;
		
			Map<String, Object> info = new HashMap<String, Object>();
			 
			if(!client_info.equalsIgnoreCase(wClientManage.getVersionID())){
				info.put("is_update", wClientManage.isIsUpdate());
				info.put("version_info", wClientManage.getVersionID());
				info.put("description", wClientManage.getDescription()); 
				info.put("url", Constants.SERVER_URL +  wClientManage.getUrl());
			} 
			
			resultMap.put(DATA_INFO, info);
			resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_SUC);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_ERR);

			resultMap.put(RESULT_MSG, e.getMessage());
		}
		
		return resultMap;
	}

	public DealService getDealService() {
		return dealService;
	}

	public void setDealService(DealService dealService) {
		this.dealService = dealService;
	}
}