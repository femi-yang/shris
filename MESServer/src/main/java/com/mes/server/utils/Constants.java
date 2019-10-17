package com.mes.server.utils;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.mes.server.bean.bfc.BFCClientManage;
import com.mes.server.bean.bfc.BFCHomePageGroup;

public class Constants {
	
	public static int SQL_TYPE = StringUtils
			.parseInt(Configuration.readConfigString("mes.server.sql.type", "config/config"));
  
	public static String APP_CLIENT_FILE_PATH = Configuration.readConfigString("app.client.file.path", "config/config");

  
	public static String PROJECT_NAME = Configuration.readConfigString("project.name", "config/config");

	public static String SERVER_URL = Configuration.readConfigString("server.url", "config/config");

	public static String POINTER_KEYSTORE_SAVE_PATH = Configuration.readConfigString("pointer.keystore.save.dir",
			"config/config");

	public static String CompanyNameTitle = Configuration.readConfigString("company.name.title", "config/config");
	
	public static String CompanyFaceUrl = Configuration.readConfigString("company.face.url", "config/config");
	
	public static String MENU_GROUP_ICON = Configuration.readConfigString("menu.group.icon", "config/config");
	
	public static String MENU_MODULE_ICON = Configuration.readConfigString("menu.module.icon", "config/config");
	

	public static String CHECK_AUTHOR_CER = "iPlant";

	public static String iPlant_resEncode_type = "UTF-8";

	public static int iPlant_timeout_seconds = 60;

 

	public static String IPLANT_RUN_TYPE_CLIENT = "client";
	public static String IPLANT_RUN_TYPE_WEB = "web";
	public static String IPLANT_RUN_TYPE_3TD = "3td";

	public static String UPLOAD_DOWN_FILE_DIR = Configuration.readConfigString("upload.down.file.dir", "config/config");

 

	public static String UPLOAD_BACK_DOWN_FILE_PATH = Configuration.readConfigString("upload.back.down.file.path",
			"config/config");
 
	public static String UPLOAD_DOWN_URL = Configuration.readConfigString("upload.down.url",
			"config/config");
 
	public static String Client_Upload_Save_Path = Configuration.readConfigString("client.upload.save.path",
			"config/config");


	//主页
	
	public static Map<Integer,Map<Integer,Integer>> Company_Shift_ID_All=new HashMap<Integer,Map<Integer,Integer>>();
	
	public static List<BFCHomePageGroup> Home_Page_Group_List=new ArrayList<BFCHomePageGroup>();
	
	public static BFCClientManage Client_Manage=new BFCClientManage();
	
	
	//邮件
	
	public static String EMAIL_SENDER= Configuration.readConfigString("mes.mail.sender",
			"config/config");

	public static String EMAIL_RECEIVER= Configuration.readConfigString("mes.mail.receiver",
			"config/config");
	public static String EMAIL_SENDER_PASSWORD= Configuration.readConfigString("mes.mail.sender.password",
			"config/config");
	public static String EMAIL_SERVER_HOST= Configuration.readConfigString("mes.mail.host",
			"config/config");
	public static String EMAIL_SERVER_PORT= Configuration.readConfigString("mes.mail.port",
			"config/config");
	
	
	
}
