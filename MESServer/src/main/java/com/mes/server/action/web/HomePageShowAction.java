package com.mes.server.action.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mes.server.bean.bfc.BFCHomePageGroup;
import com.mes.server.bean.bfc.BFCHomePageModule;
import com.mes.server.bean.bfc.BFCHomeUser;
import com.mes.server.bean.bms.BMSEmployee;
import com.mes.server.action.dao.bfc.BFCHomePageGroupManager;
import com.mes.server.action.dao.bfc.BFCHomePageModuleManager;
import com.mes.server.action.dao.bfc.BFCHomePageModuleManager.BFCClientType;
import com.mes.server.action.dao.bms.BMSEmployeeManager;
import com.mes.server.action.impl.BaseActionImpl;
import com.mes.server.utils.Constants;
import com.mes.server.utils.CookieContants;
import com.mes.server.utils.RetCode;
import com.mes.server.utils.StringUtils;

/**
 * 获取首页展示模块
 */
public class HomePageShowAction extends BaseActionImpl {
	private static Logger logger = LoggerFactory.getLogger(HomePageShowAction.class);
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
			String UserName = StringUtils.parseString(getCookieValue(CookieContants.iPlant_User_Name, request));
			int UserID = StringUtils.parseInt(getCookieValue(CookieContants.iPlant_User_ID, request));
			int wType = StringUtils.parseInt(request.getParameter("Type"));
			if (UserID <= 0) {
				UserID = StringUtils.parseInt(param.get("user_info"));
			}

			BMSEmployee wBMSEmployee = BMSEmployeeManager.getInstance().Select(UserID);

			BFCHomeUser wHomeUser = new BFCHomeUser();

			wHomeUser.setName(UserName);
			/**
			 * HomeUser的其他字段需要后续的xml补充
			 */
			wHomeUser.setCompanyName(Constants.CompanyNameTitle);
			wHomeUser.setCompanyFaces(Constants.CompanyFaceUrl);

			wHomeUser.setLoginName(wBMSEmployee.getLoginName());
			wHomeUser.setName(wBMSEmployee.getName());

			Map<String, Object> Rst = new HashMap<String, Object>();

			List<BFCHomePageGroup> wBFCHomePageGroupList = BFCHomePageGroupManager.getInstance().SelectAll(wType);

			List<BFCHomePageModule> wBFCHomePageModuleList = BFCHomePageModuleManager.getInstance().SelectAll(0,wType);

			List<BFCHomePageGroup> wServerRst = new ArrayList<BFCHomePageGroup>();

			for (BFCHomePageGroup wBFCHomePageGroup : wBFCHomePageGroupList) {
				if (wBFCHomePageGroup.getActive() != 1)
					continue;

				for (BFCHomePageModule wBFCHomePageModule : wBFCHomePageModuleList) {
					if (wBFCHomePageModule.getActive() != 1||wBFCHomePageModule.getGroupID()!=wBFCHomePageGroup.getID())
						continue;

					if (wType != BFCClientType.WEB) {
						// GetMessageCount获取消息数量
					}
					wBFCHomePageModule.setSecretKey(""); 
					wBFCHomePageGroup.getModuleList().add(wBFCHomePageModule);
				}
				 
				wServerRst.add(wBFCHomePageGroup);
			}

			Rst.put("module", wServerRst);
			Rst.put("user", wHomeUser);

			resultMap.put(DATA_INFO, Rst);
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
