package com.mes.server.thread;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.mes.server.thread.home.HomePageImpl; 

public class GlobalListener implements ServletContextListener  {

	 
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		//ShiftIDImpl.getInstance().Start();
		HomePageImpl.getInstance().Start();
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		// TODO Auto-generated method stub
		//ShiftIDImpl.getInstance().End();
		HomePageImpl.getInstance().End();
	}

}
