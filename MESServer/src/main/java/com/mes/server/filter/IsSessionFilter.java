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
import javax.servlet.http.HttpServletRequest;
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
public class IsSessionFilter extends HttpServlet implements Filter {

	private String characterEncoding; // 编码方式配置在web.xml文件中
	private boolean enabled; // 是否启用此Filter，配置在web.xml中

	public IsSessionFilter() {
		super();
	}

	/*
	 * （非 Javadoc）
	 * 
	 * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
	 */
	@Override
	public void init(FilterConfig arg0) throws ServletException {
		characterEncoding = arg0.getInitParameter("characterEncoding");
		enabled = "true".equalsIgnoreCase(arg0.getInitParameter("enabled").trim());
	}

	/*
	 * （非 Javadoc）
	 * 
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest,
	 * javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		
		if (enabled || characterEncoding != null) {
			request.setCharacterEncoding(characterEncoding);
			response.setCharacterEncoding(characterEncoding);
		}
		HttpServletResponse res = (HttpServletResponse) response; 
		HttpServletRequest req = (HttpServletRequest) request; 
		
		String user_name = req.getParameter(CookieContants.USER_NAME);
		String user_info = req.getParameter(CookieContants.USER_INFO);
		String company_id= req.getParameter(CookieContants.Company_ID) ; 
		
		if (StringUtils.isNotEmpty(user_info)) {
			user_info= DesUtil.encrypt(user_info, CookieContants.Key);
			Cookie co = new Cookie(CookieContants.iPlant_User_ID, user_info);
		 
			co.setPath("/");
			res.addCookie(co);
		} 
		if (StringUtils.isNotEmpty(user_name)) {
			user_name= DesUtil.encrypt(user_name, CookieContants.Key);
			Cookie co = new Cookie(CookieContants.iPlant_User_Name, user_name); 
			co.setPath("/");
			res.addCookie(co);
		} 
		if(StringUtils.isNotEmpty(company_id)){
			if(!Constants.Company_Shift_ID_All.containsKey(StringUtils.parseInt(company_id))){
				Constants.Company_Shift_ID_All.put(StringUtils.parseInt(company_id), new HashMap<Integer,Integer>());
			}
			
			company_id=DesUtil.encrypt(company_id, CookieContants.Key); 
			Cookie co = new Cookie(CookieContants.iplant_Company_ID, company_id);
			 
			co.setPath("/");
			res.addCookie(co);
		} 
		
		int wModuleID = StringUtils.parseInt(request.getParameter(CookieContants.Extension_Module_ID));
		if (wModuleID > 0) {
			BFCHomePageModule wBFCHomePageModule = BFCHomePageModuleManager.getInstance().Select(wModuleID);
			if (wBFCHomePageModule.getID() == wModuleID) {
				 
				String UserID =StringUtils.DencodeURIComponent(req.getQueryString(),CookieContants.Extension_User_ID); 
				
				String Password = StringUtils.DencodeURIComponent(req.getQueryString(),CookieContants.Extension_Password);
			 
				UserID =  DesUtil.decrypt(user_info, wBFCHomePageModule.getSecretKey());
				Password = DesUtil.decrypt(Password, wBFCHomePageModule.getSecretKey());
				BMSEmployee wBMSEmployee = BMSEmployeeManager.getInstance().Select(StringUtils.parseInt(UserID));
				
				
				
				if (!StringUtils.isNotEmpty(user_info)) {
					 
					Cookie co = new Cookie(CookieContants.iPlant_User_ID, DesUtil.encrypt(wBMSEmployee.getID()+"", CookieContants.Key)); 
					co.setPath("/");
					res.addCookie(co);
					req.setAttribute(CookieContants.iPlant_User_ID, DesUtil.encrypt(wBMSEmployee.getID()+"", CookieContants.Key)); 
					
					Cookie co1 = new Cookie(CookieContants.iPlant_User_Name, DesUtil.encrypt(wBMSEmployee.getName(), CookieContants.Key)); 
					co1.setPath("/");
					res.addCookie(co1);
					req.setAttribute(CookieContants.iPlant_User_Name,  DesUtil.encrypt(wBMSEmployee.getName(), CookieContants.Key)); 
					
					Cookie co2 = new Cookie(CookieContants.iplant_Company_ID, DesUtil.encrypt(wBMSEmployee.getCompanyID()+"", CookieContants.Key)); 
					co2.setPath("/");
					res.addCookie(co2);
					req.setAttribute(CookieContants.iplant_Company_ID, DesUtil.encrypt(wBMSEmployee.getCompanyID()+"", CookieContants.Key)); 
				}
			}
			  
		}
		
		// iframe引起的内部cookie丢失
		res.setHeader("P3P", "CP=CAO PSA OUR");
		res.setHeader("Access-Control-Allow-Origin", "*");
		 
		res.setHeader("Access-Control-Allow-Credentials", "true");
		res.setHeader("Access-Control-Allow-Methods", "*");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
		res.setHeader("Access-Control-Expose-Headers", "*");

	        
		if (chain != null)
			chain.doFilter(request, response);
	}

	/*
	 * （非 Javadoc）
	 * 
	 * @see javax.servlet.Filter#destroy()
	 */
	public void destroy() {
		characterEncoding = null;
	}
}