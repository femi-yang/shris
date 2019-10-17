package com.mes.server.action.web.user;

import java.util.HashMap; 
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mes.server.action.dao.bfc.BFCHomePageModuleManager;
import com.mes.server.action.dao.bms.BMSEmployeeManager;
import com.mes.server.action.impl.BaseActionImpl;
import com.mes.server.bean.bfc.BFCHomePageModule;
import com.mes.server.bean.bms.BMSEmployee;
import com.mes.server.utils.CookieContants;
import com.mes.server.utils.DesUtil;
import com.mes.server.utils.RetCode;
import com.mes.server.utils.StringUtils;

/**
 * 获取首页展示模块
 */
public class BMSEmployeeSecretAction extends BaseActionImpl {
	private static Logger logger = LoggerFactory.getLogger(BMSEmployeeSecretAction.class);
	// private BasicDealService basicDealService;

	public Object execute(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			@SuppressWarnings("unused")
			HttpServletResponse response = (HttpServletResponse) param.get("response");
			HttpServletRequest request = (HttpServletRequest) param.get("request");

			if (CheckCookieNo(request)) {
				resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_UNLOGIN);
				return resultMap;
			} 
			int UserID = StringUtils.parseInt(getCookieValue(CookieContants.iPlant_User_ID, request));
			
			int wModuleID = StringUtils.parseInt(request.getParameter("ModuleID"));
			
			if(wModuleID<=0) {
				resultMap.put(RESULT_MSG, RetCode.SERVER_RST_ERROR_OUT);
				resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_ERR);
				return resultMap;
			}
			BFCHomePageModule wHomePageModule=BFCHomePageModuleManager.getInstance().Select(wModuleID);
			if(wHomePageModule.getID()!=wModuleID) {
				resultMap.put(RESULT_MSG, "Module Not Find!");
				resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_ERR);
				return resultMap;
			}
			
			BMSEmployee wBMSEmployee = BMSEmployeeManager.getInstance().Select(UserID);
			 
		 
			Map<String,Object> wRst=new HashMap<String,Object>();
			
			wRst.put("ID",   DesUtil.encrypt(wBMSEmployee.getID()+"", wHomePageModule.getSecretKey()));
			
			wRst.put("LoginName", DesUtil.encrypt(wBMSEmployee.getLoginName(), wHomePageModule.getSecretKey()));
			wRst.put("LoginID", DesUtil.encrypt(wBMSEmployee.getLoginID() +"", wHomePageModule.getSecretKey()));
			wRst.put("Password", DesUtil.encrypt(wBMSEmployee.getPassword(), wHomePageModule.getSecretKey()));
			wRst.put("ModuleID", wModuleID);
			 
			resultMap.put(DATA_INFO, wRst);
			resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_SUC);

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_ERR);
			resultMap.put(RESULT_MSG, e.getMessage());
		}

		return resultMap;
	}

}
