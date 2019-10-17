package com.mes.server.controllers.restful.bms;

import java.util.HashMap;
import java.util.Map;
 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.mes.server.action.BaseAction;
import com.mes.server.action.impl.BaseActionImpl; 
import com.mes.server.utils.MyApplicationContextUtil;
import com.mes.server.utils.StringUtils;

@Path("User")
public class UserManageDealResource
{
	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory.getLogger(UserManageDealResource.class);
	
	@SuppressWarnings ({
            "unchecked",
            "rawtypes"
    })
    @POST
	@Path("/Login")
	@Produces(MediaType.APPLICATION_JSON)
	public Response UserLogin(@Context HttpServletRequest request, @Context HttpServletResponse response, String post_content) {
		response.setCharacterEncoding("UTF-8"); 
		Map<String, Object> params = JSON.parseObject(post_content, Map.class);
		params.put("request", request);
		params.put("response", response);
		
		String actionName = "userLogin";
		BaseAction baseAction = MyApplicationContextUtil.getContext().getBean(actionName.toLowerCase(), BaseAction.class);
		baseAction.init();
		Object resultMap = baseAction.execute(params); 
		int resultCode = (Integer)( ((HashMap) resultMap).get(BaseActionImpl.RESULT_KEY));
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultCode", resultCode);
		((HashMap) resultMap).remove(BaseActionImpl.RESULT_KEY);
		map.put("returnObject", resultMap);
		ResponseBuilder res_builder = Response.status(200).entity(JSON.toJSONString(map));
		Response res = res_builder.build();
		return res;
	}
	
	 
	@SuppressWarnings ({
		"rawtypes"
	})
	@GET
	@Path("/Info")
	@Produces(MediaType.APPLICATION_JSON)
	public Response UserInfoGet(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8"); 
		String user_info = StringUtils.parseString(request.getParameter("user_info"));
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("request", request);
		params.put("response", response);
		params.put("user_info", user_info);
		
		String actionName = "userInfoGet";
		BaseAction baseAction = MyApplicationContextUtil.getContext().getBean(actionName.toLowerCase(), BaseAction.class);
		baseAction.init();
		Object resultMap = baseAction.execute(params);
		
		int resultCode = (Integer) ((HashMap) resultMap).get(BaseActionImpl.RESULT_KEY);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultCode", resultCode);
		((HashMap) resultMap).remove(BaseActionImpl.RESULT_KEY);
		map.put("returnObject", resultMap);
		ResponseBuilder res_builder = Response.status(200).entity(JSON.toJSONString(map));
		Response res = res_builder.build();
		return res;
	}
	
	@SuppressWarnings ({
		"rawtypes"
	})
	@GET
	@Path("/InfoSecret")
	@Produces(MediaType.APPLICATION_JSON)
	public Response UserInfoSecretGet(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8"); 
		String user_info = StringUtils.parseString(request.getParameter("user_info"));
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("request", request);
		params.put("response", response);
		params.put("user_info", user_info);
		
		String actionName = "userInfoSecretGet";
		BaseAction baseAction = MyApplicationContextUtil.getContext().getBean(actionName.toLowerCase(), BaseAction.class);
		baseAction.init();
		Object resultMap = baseAction.execute(params);
		
		int resultCode = (Integer) ((HashMap) resultMap).get(BaseActionImpl.RESULT_KEY);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultCode", resultCode);
		((HashMap) resultMap).remove(BaseActionImpl.RESULT_KEY);
		map.put("returnObject", resultMap);
		ResponseBuilder res_builder = Response.status(200).entity(JSON.toJSONString(map));
		Response res = res_builder.build();
		return res;
	}
	 
	 
	
	@SuppressWarnings ({
		"rawtypes"
	})
	@GET
	@Path("/All")
	@Produces(MediaType.APPLICATION_JSON)
	/**
	 * 获取全部用户列表
	 * @param request
	 * @param response
	 * @param post_content
	 * @return
	 */
	public Response UserAllInfos(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8"); 
		Map<String, Object> params = new HashMap<>();
		params.put("request", request);
		params.put("response", response);
		
		String actionName = "userAllInfos";
		BaseAction baseAction = MyApplicationContextUtil.getContext().getBean(actionName.toLowerCase(), BaseAction.class);
		baseAction.init();
		Object resultMap = baseAction.execute(params);
		
		int resultCode = (Integer) ((HashMap) resultMap).get(BaseActionImpl.RESULT_KEY);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultCode", resultCode);
		((HashMap) resultMap).remove(BaseActionImpl.RESULT_KEY);
		map.put("returnObject", resultMap);
		ResponseBuilder res_builder = Response.status(200).entity(JSON.toJSONString(map));
		Response res = res_builder.build();
		return res;
	}
	 
	
	 
}
