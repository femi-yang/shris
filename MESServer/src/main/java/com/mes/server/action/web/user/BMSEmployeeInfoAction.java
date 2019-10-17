package com.mes.server.action.web.user;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mes.server.action.dao.bms.BMSEmployeeManager;
import com.mes.server.action.impl.BaseActionImpl;
import com.mes.server.bean.bms.BMSEmployee; 
import com.mes.server.utils.RetCode;
import com.mes.server.utils.StringUtils;

/**
 * 获取首页展示模块
 */
public class BMSEmployeeInfoAction extends BaseActionImpl {
	private static Logger logger = LoggerFactory.getLogger(BMSEmployeeInfoAction.class);
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
			
			int wID = StringUtils.parseInt(request.getParameter("ID"));

			BMSEmployee wBMSEmployee = BMSEmployeeManager.getInstance().Select(wID);

			wBMSEmployee.setPassword("xxxxxx");

			resultMap.put(DATA_INFO, wBMSEmployee);
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
