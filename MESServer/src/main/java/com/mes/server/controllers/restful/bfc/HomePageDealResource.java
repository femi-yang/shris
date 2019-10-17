package com.mes.server.controllers.restful.bfc;

import java.net.URI;
import java.net.URISyntaxException;
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

@Path("HomePage")
public class HomePageDealResource {
	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory.getLogger(HomePageDealResource.class);

	@GET
	@Path("/Index")
	@Produces(MediaType.APPLICATION_JSON)
	public Response homePageIndex(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("request", request);
		params.put("response", response);

		URI wURI = null;
		try {
			wURI = new URI("../../index.html");
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		ResponseBuilder res_builder = Response.temporaryRedirect(wURI);
		

		Response res = res_builder.build();

		return res;
	}

	@SuppressWarnings({ "rawtypes" })
	@GET
	@Path("/Show")
	@Produces(MediaType.APPLICATION_JSON)
	public Response homePageInfoGet(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		String user_info = StringUtils.parseString(request.getParameter("user_info"));
		String company_id = StringUtils.parseString(request.getParameter("company_id"));
		int wType = StringUtils.parseInt(request.getParameter("type"));
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("request", request);
		params.put("response", response);
		params.put("user_info", user_info);
		params.put("company_id", company_id);
		params.put("type", wType);

		String actionName = "homepageshow";
		BaseAction baseAction = MyApplicationContextUtil.getContext().getBean(actionName.toLowerCase(),
				BaseAction.class);
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

	@SuppressWarnings({ "rawtypes" })
	@GET
	@Path("/VersionLast")
	@Produces(MediaType.APPLICATION_JSON)
	public Response GetClientVersionLast(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("request", request);
		params.put("response", response);
		String actionName = "clientversionlastget";
		BaseAction baseAction = MyApplicationContextUtil.getContext().getBean(actionName.toLowerCase(),
				BaseAction.class);
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

	@SuppressWarnings({ "rawtypes" })
	@GET
	@Path("/GroupAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Response HomePageGroupAll(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("request", request);
		params.put("response", response);

		int wRemote = StringUtils.parseInt(request.getParameter("Remote"));
		String wCallback = StringUtils.parseString(request.getParameter("callback"));

		String actionName = "homepagegroupall";
		BaseAction baseAction = MyApplicationContextUtil.getContext().getBean(actionName.toLowerCase(),
				BaseAction.class);
		baseAction.init();
		Object resultMap = baseAction.execute(params);

		int resultCode = (Integer) ((HashMap) resultMap).get(BaseActionImpl.RESULT_KEY);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultCode", resultCode);
		((HashMap) resultMap).remove(BaseActionImpl.RESULT_KEY);
		map.put("returnObject", resultMap);

		ResponseBuilder res_builder;
		if (wRemote > 0) {
			res_builder = Response.status(200).entity(wCallback + "(" + JSON.toJSONString(map) + ")");
		} else {
			res_builder = Response.status(200).entity(JSON.toJSONString(map));
		}

		Response res = res_builder.build();
		return res;
	}

	@SuppressWarnings({ "rawtypes" })
	@GET
	@Path("/ModuleAll")
	@Produces(MediaType.APPLICATION_JSON)
	public Response HomePageModuleAll(@Context HttpServletRequest request, @Context HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("request", request);
		params.put("response", response);

		String actionName = "homepagemoduleall";
		BaseAction baseAction = MyApplicationContextUtil.getContext().getBean(actionName.toLowerCase(),
				BaseAction.class);
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

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@POST
	@Path("/GroupUpdate")
	@Produces(MediaType.APPLICATION_JSON)
	public Response HomePageGroupUpdate(@Context HttpServletRequest request, @Context HttpServletResponse response,
			String post_content) {
		response.setCharacterEncoding("UTF-8");
		Map<String, Object> params = JSON.parseObject(post_content, Map.class);
		params.put("request", request);
		params.put("response", response);

		
		int wRemote = StringUtils.parseInt(request.getParameter("Remote"));//仅用于前端直接调用jsonp形式
		String wCallback = StringUtils.parseString(request.getParameter("callback"));
		
		String actionName = "homepagegroupupdate";
		BaseAction baseAction = MyApplicationContextUtil.getContext().getBean(actionName.toLowerCase(),
				BaseAction.class);
		baseAction.init();
		Object resultMap = baseAction.execute(params);
		int resultCode = (Integer) (((HashMap) resultMap).get(BaseActionImpl.RESULT_KEY));
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultCode", resultCode);
		((HashMap) resultMap).remove(BaseActionImpl.RESULT_KEY);
		map.put("returnObject", resultMap);
		ResponseBuilder res_builder;
		if (wRemote > 0) {
			res_builder = Response.status(200).entity(wCallback + "(" + JSON.toJSONString(map) + ")");
		} else {
			res_builder = Response.status(200).entity(JSON.toJSONString(map));
		}
		Response res = res_builder.build();
		return res;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@POST
	@Path("/ModuleUpdate")
	@Produces(MediaType.APPLICATION_JSON)
	public Response HomePageModuleUpdate(@Context HttpServletRequest request, @Context HttpServletResponse response,
			String post_content) {
		response.setCharacterEncoding("UTF-8");
		Map<String, Object> params = JSON.parseObject(post_content, Map.class);
		params.put("request", request);
		params.put("response", response);

		String actionName = "homepagemoduleupdate";
		BaseAction baseAction = MyApplicationContextUtil.getContext().getBean(actionName.toLowerCase(),
				BaseAction.class);
		baseAction.init();
		Object resultMap = baseAction.execute(params);
		int resultCode = (Integer) (((HashMap) resultMap).get(BaseActionImpl.RESULT_KEY));
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultCode", resultCode);
		((HashMap) resultMap).remove(BaseActionImpl.RESULT_KEY);
		map.put("returnObject", resultMap);
		ResponseBuilder res_builder = Response.status(200).entity(JSON.toJSONString(map));
		Response res = res_builder.build();
		return res;
	}

}
