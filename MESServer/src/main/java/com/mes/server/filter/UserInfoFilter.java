package com.mes.server.filter;

import java.io.IOException;
import java.util.HashMap;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import com.mes.server.action.dao.bfc.BFCHomePageModuleManager;
import com.mes.server.action.dao.bms.BMSEmployeeManager;
import com.mes.server.bean.bfc.BFCHomePageModule;
import com.mes.server.bean.bms.BMSEmployee;
import com.mes.server.utils.Constants;
import com.mes.server.utils.CookieContants;
import com.mes.server.utils.DesUtil;
import com.mes.server.utils.StringUtils;

@SuppressWarnings("serial")
public class UserInfoFilter extends HttpServlet implements Filter {

	public UserInfoFilter() {
		super();
	}

	/*
	 * （非 Javadoc）
	 * 
	 * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
	 */
	public void init(FilterConfig arg0) throws ServletException {
	}

	/*
	 * （非 Javadoc）
	 * 
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest,
	 * javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletResponse res = (HttpServletResponse) response;

		String user_info = request.getParameter(CookieContants.USER_INFO);
		String company_id = request.getParameter(CookieContants.Company_ID);
		String user_name = request.getParameter(CookieContants.USER_NAME);

 

		if (StringUtils.isNotEmpty(user_info)) {

			user_info = DesUtil.encrypt(user_info, CookieContants.Key);
			Cookie co = new Cookie(CookieContants.iPlant_User_ID, user_info);

			co.setPath("/");
			res.addCookie(co);
		}  
		
		if (StringUtils.isNotEmpty(user_name)) {
			user_name = DesUtil.encrypt(user_name, CookieContants.Key);
			Cookie co = new Cookie(CookieContants.iPlant_User_Name, user_name);
			co.setPath("/");
			res.addCookie(co);
		} 
		if (StringUtils.isNotEmpty(company_id)) {
			if (!Constants.Company_Shift_ID_All.containsKey(StringUtils.parseInt(company_id))) {
				Constants.Company_Shift_ID_All.put(StringUtils.parseInt(company_id), new HashMap<Integer, Integer>());
			}

			company_id = DesUtil.encrypt(company_id, CookieContants.Key);
			Cookie co = new Cookie(CookieContants.iplant_Company_ID, company_id);

			co.setPath("/");
			res.addCookie(co);
		} 
		

		int wModuleID = StringUtils.parseInt(request.getParameter(CookieContants.Extension_Module_ID));
		if (wModuleID > 0) {
			BFCHomePageModule wBFCHomePageModule = BFCHomePageModuleManager.getInstance().Select(wModuleID);
			if (wBFCHomePageModule.getID() == wModuleID) {
				
				user_info = request.getParameter(CookieContants.Extension_User_ID);
				String Password = request.getParameter(CookieContants.Extension_Password);  //DencodeURIComponent(request.getQueryString(),"User_Password");
				 
				String UserID =  DesUtil.decrypt(user_info, wBFCHomePageModule.getSecretKey());
				Password = DesUtil.decrypt(Password, wBFCHomePageModule.getSecretKey());
				BMSEmployee wBMSEmployee = BMSEmployeeManager.getInstance().Select(StringUtils.parseInt(UserID));
				
				if (!StringUtils.isNotEmpty(user_info)) {
					 
					Cookie co = new Cookie(CookieContants.iPlant_User_ID, DesUtil.encrypt(wBMSEmployee.getID()+"", CookieContants.Key)); 
					co.setPath("/");
					res.addCookie(co);
					Cookie co1 = new Cookie(CookieContants.iPlant_User_Name, DesUtil.encrypt(wBMSEmployee.getName(), CookieContants.Key)); 
					co1.setPath("/");
					res.addCookie(co1);
					Cookie co2 = new Cookie(CookieContants.iplant_Company_ID, DesUtil.encrypt(wBMSEmployee.getCompanyID()+"", CookieContants.Key)); 
					co2.setPath("/");
					res.addCookie(co2);
				}
			}
			  
		}
		

		// iframe引起的内部cookie丢失
		res.setHeader("P3P", "CP=CAO PSA OUR");
		res.setHeader("Access-Control-Allow-Origin", "*");
		if (chain != null)
			chain.doFilter(request, response);
	}

	/*
	 * （非 Javadoc）
	 * 
	 * @see javax.servlet.Filter#destroy()
	 */
	public void destroy() {
	}
}