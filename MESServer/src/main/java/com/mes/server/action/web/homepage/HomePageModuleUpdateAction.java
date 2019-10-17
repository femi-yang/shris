package com.mes.server.action.web.homepage;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mes.server.bean.bfc.BFCHomePageModule; 
import com.alibaba.fastjson.JSON;
import com.mes.server.action.dao.bfc.BFCHomePageModuleManager;
import com.mes.server.action.impl.BaseActionImpl; 
import com.mes.server.utils.CookieContants;
import com.mes.server.utils.RetCode;
import com.mes.server.utils.StringUtils;

/**
 * 获取首页展示模块
 */
public class HomePageModuleUpdateAction extends BaseActionImpl {
	private static Logger logger = LoggerFactory.getLogger(HomePageModuleUpdateAction.class);
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
			//String UserName = StringUtils.parseString(getCookieValue(CookieContants.iPlant_User_Name, request));

			int UserID = StringUtils.parseInt(getCookieValue(CookieContants.iPlant_User_ID, request));

			BFCHomePageModule wBFCHomePageModule = JSON.parseObject(JSON.toJSONString(param.get("data")),
					BFCHomePageModule.class);

			if (wBFCHomePageModule.getID() <= 0) {
				wBFCHomePageModule.setCreateTime(Calendar.getInstance());
				wBFCHomePageModule.setCreatorID(UserID);
				wBFCHomePageModule.setActive(0);
			} else if (wBFCHomePageModule.getActive() > 2 || wBFCHomePageModule.getActive() < 0) {
				wBFCHomePageModule.setActive(2);
			}
			wBFCHomePageModule.setEditTime(Calendar.getInstance());
			wBFCHomePageModule.setEditorID(UserID);

			wBFCHomePageModule.setID(BFCHomePageModuleManager.getInstance().Update(wBFCHomePageModule));
			

			resultMap.put(DATA_INFO, wBFCHomePageModule);
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
