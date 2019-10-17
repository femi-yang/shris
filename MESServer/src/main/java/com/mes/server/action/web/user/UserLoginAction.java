package com.mes.server.action.web.user;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.mes.server.action.dao.bms.BMSEmployeeManager;
import com.mes.server.action.impl.BaseActionImpl;
import com.mes.server.bean.bms.BMSEmployee;
import com.mes.server.utils.Constants;
import com.mes.server.utils.CookieContants;
import com.mes.server.utils.DesUtil;
import com.mes.server.utils.RetCode;
import com.mes.server.utils.StringUtils;

/**
 * 用户登录
 */
public class UserLoginAction extends BaseActionImpl {
	private static Logger logger = LoggerFactory.getLogger(UserLoginAction.class);

	@SuppressWarnings("unchecked")
	public Object execute(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			HttpServletResponse response = (HttpServletResponse) param.get("response");
			HttpServletRequest request = (HttpServletRequest) param.get("request");

			String UserAcc = StringUtils.parseString(param.get("user_id"));

			int UserID = StringUtils.parseInt(getCookieValue(CookieContants.iPlant_User_ID, request));

			String PassWord = StringUtils.parseString(param.get("passWord"));

			@SuppressWarnings("unused")
			long Mac = StringUtils.parseLong(param.get("PhoneMac"));

			BMSEmployee wBMSEmployee = BMSEmployeeManager.getInstance().Login(0, UserAcc, PassWord);

			// 同一个浏览器不能同时登陆两个账号
			if (UserID > 0 && UserID != wBMSEmployee.getID()) {
				resultMap.put(RESULT_KEY, RetCode.LOGIN_ERR_CODE_LOGIN_ONLY_FAIL);
				return resultMap;
			}

			if (wBMSEmployee.getID() <= 0) {
				resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_ERR);

				resultMap.put(RESULT_MSG, RetCode.SERVER_CODE_UNLOGIN_ALARM);

				return resultMap;
			}

			if (!Constants.Company_Shift_ID_All.containsKey(wBMSEmployee.getCompanyID())) {
				Constants.Company_Shift_ID_All.put(wBMSEmployee.getCompanyID(), new HashMap<Integer, Integer>());
			}

			SetCookies(response, wBMSEmployee);

			String wText=JSON.toJSONString(wBMSEmployee,false);
			resultMap = JSON.parseObject(wText, HashMap.class);

			if (resultMap != null && resultMap.size() > 0) {
				resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_SUC);

			} else {
				resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_ERR);
				resultMap.put(RESULT_MSG, RetCode.SERVER_RST_NULL);
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			resultMap.put(RESULT_KEY, RetCode.SERVER_CODE_ERR);
			resultMap.put(RESULT_MSG, e.getMessage());
		}

		return resultMap;
	}

	private void SetCookies(HttpServletResponse response, BMSEmployee wBMSEmployee) {
		Cookie co = new Cookie(CookieContants.iPlant_User_ID,
				DesUtil.encrypt(wBMSEmployee.getID() + "", CookieContants.Key));
		co.setPath("/");
		response.addCookie(co);

		Cookie con = new Cookie(CookieContants.iPlant_User_Name,
				DesUtil.encrypt(wBMSEmployee.getName(), CookieContants.Key));
		con.setPath("/");
		response.addCookie(con);

		Cookie coi = new Cookie(CookieContants.iplant_Company_ID,
				DesUtil.encrypt(wBMSEmployee.getCompanyID() + "", CookieContants.Key));
		coi.setPath("/");
		response.addCookie(coi);

		response.setHeader("P3P", "CP=CAO PSA OUR");
		response.setHeader("Access-Control-Allow-Origin", "*");
	}

}