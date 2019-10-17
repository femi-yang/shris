package com.mes.server.thread.home;
 
import java.util.Date; 

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
  
import com.mes.server.utils.Constants;
import com.mes.server.utils.XmlTool;

public class HomePageImpl {

	private static Logger logger = LoggerFactory.getLogger(HomePageImpl.class); 
	 
	private static HomePageImpl Instance=null;
	
	public static HomePageImpl getInstance() {
		if(Instance==null){
			Instance=new HomePageImpl();
			 
		}
		 
		return Instance;
	}
	  
	private Thread thread = null;

	private Boolean IsRun=true;
	
	public void Start() { 
		IsRun=true;
		thread = new Thread() {
			@Override
			public void run() {

				Date wDate = null;
				while (IsRun) {
					try {
						if (wDate == null) {
							Handle();
							wDate = new Date();
						} else {
							long sub = new Date().getTime() - wDate.getTime();

							if (sub >= 60000) {
								Handle();
								wDate = new Date();
							}
						} 
						Thread.sleep(3000);
					} catch (Exception e) {
						// TODO Auto-generated catch block
						logger.error(e.getMessage());
					}
					
					 
				}
			}

			public void Handle() { 
				try {
					Constants.Client_Manage=XmlTool.ReadXml(Constants.APP_CLIENT_FILE_PATH);
				} catch (Exception e) {
					logger.error(e.getMessage());
				}
				try {
					//Constants.Home_Page_Group_List=XmlTool.ReadXml(Constants.MODULE_APP_FILE_PATH);
				} catch (Exception e) {
					logger.error(e.getMessage());
				}
				
			}

		};
		thread.start();
	}

	public void End() {
		IsRun=false;
		if (thread != null && thread.isInterrupted()) {
			thread.interrupt();
			thread=null;
		}
	}
 

}
