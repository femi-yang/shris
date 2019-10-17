package com.mes.server.action.web.homepage;
 
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mes.server.bean.bfc.BFCHomePageGroup;
import com.mes.server.action.dao.bfc.BFCHomePageGroupManager;
import com.mes.server.action.impl.BaseActionImpl; 
import com.mes.server.utils.RetCode;
import com.mes.server.utils.StringUtils; 

/**
 * 获取首页展示模块
 */
public class HomePageGroupAllAction extends BaseActionImpl {
	private static Logger logger = LoggerFactory.getLogger(HomePageGroupAllAction.class);
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

			int wType =StringUtils.parseInt(request.getParameter("Type"));
			
			
			
			
			List<BFCHomePageGroup> wHomePageGroupList = BFCHomePageGroupManager.getInstance().SelectAll(wType);

			resultMap.put(DATA_LIST, wHomePageGroupList);
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
