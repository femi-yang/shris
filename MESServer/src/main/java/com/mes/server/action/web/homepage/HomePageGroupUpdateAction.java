package com.mes.server.action.web.homepage;
 
import java.util.Calendar;
import java.util.HashMap; 
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mes.server.bean.bfc.BFCHomePageGroup; 
import com.alibaba.fastjson.JSON;
import com.mes.server.action.dao.bfc.BFCHomePageGroupManager;
import com.mes.server.action.impl.BaseActionImpl;  
import com.mes.server.utils.CookieContants;
import com.mes.server.utils.RetCode;
import com.mes.server.utils.StringUtils; 

/**
 * 获取首页展示模块
 */
public class HomePageGroupUpdateAction extends BaseActionImpl {
	private static Logger logger = LoggerFactory.getLogger(HomePageGroupUpdateAction.class);
	//private BasicDealService basicDealService;

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
			
			BFCHomePageGroup wBFCHomePageGroup=JSON.parseObject(JSON.toJSONString(param.get("data")), BFCHomePageGroup.class);
			
			if(wBFCHomePageGroup.getID()<=0) {
				wBFCHomePageGroup.setCreateTime(Calendar.getInstance());
				wBFCHomePageGroup.setCreatorID(UserID); 
				wBFCHomePageGroup.setActive(0);
			}else if(wBFCHomePageGroup.getActive()>2||wBFCHomePageGroup.getActive()<0) {
				wBFCHomePageGroup.setActive(2);
			}
			wBFCHomePageGroup.setEditTime(Calendar.getInstance());
			wBFCHomePageGroup.setEditorID(UserID); 

			wBFCHomePageGroup.setID(BFCHomePageGroupManager.getInstance().Update(wBFCHomePageGroup)); ;
			
			resultMap.put(DATA_INFO, wBFCHomePageGroup);
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
