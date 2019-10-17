package com.mes.server.action;

import java.util.Map;

/**
 * @Title: BaseAction.java
 * @Package com.gexin.proxy.web.module.netdragonproxy.action
 * @Description: Action接口
 * @author Administrator
 * @date 2011-8-2 下午4:17:11
 * @version V1.0
 */
public interface BaseAction {
	public Object execute(Map<String, Object> param) ;
	 
	public void init() ;
}
 