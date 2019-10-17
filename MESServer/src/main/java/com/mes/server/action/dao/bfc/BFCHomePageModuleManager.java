package com.mes.server.action.dao.bfc;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.namedparam.BeanPropertySqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import com.mes.server.action.dao.BaseManager;
import com.mes.server.bean.bfc.BFCHomePageModule;
import com.mes.server.utils.Constants;

public class BFCHomePageModuleManager extends BaseManager {

	private static Logger logger = LoggerFactory.getLogger(BFCHomePageModuleManager.class);

	private static BFCHomePageModuleManager Instance = null;

	public List<BFCHomePageModule> SelectAll(int wID,int wType) {
		List<BFCHomePageModule> wResult = new ArrayList<BFCHomePageModule>();
		try {
			String wSQL = MessageFormat.format(
					"SELECT ID,   mbs_menu_item.Name, mbs_menu_item.GroupID, mbs_menu_item.Icon,  mbs_menu_item.Url,"
							+ "    mbs_menu_item.Type,mbs_menu_item.Active,  mbs_menu_item.CreateTime ,mbs_menu_item.SecretKey,"
							+ "    mbs_menu_item.EditTime,mbs_menu_item.CreatorID,mbs_menu_item.EditorID, mbs_menu_item.Default"
							+ "    FROM {0}.mbs_menu_item WHERE 1=1 and (:wType <= 0 or :wType=Type) and (:wID <= 0 or :wID=ID);",
					this.GetDateBaseName(DataBaseTypes.MES));
			Map<String, Object> wParamMap = new HashMap<String, Object>();
			wParamMap.put("wType", wType);
			wParamMap.put("wID", wID);
			wSQL = this.DMLChange(wSQL, Constants.SQL_TYPE);

			wResult = this.QueryForList(wSQL, wParamMap, BFCHomePageModule.class);

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
		return wResult;
	}

	public BFCHomePageModule Select(int wID) {
		BFCHomePageModule wResult = new BFCHomePageModule();
		try {
			if(wID<=0)
				return wResult;
			
			List<BFCHomePageModule> wBFCHomePageModuleList= SelectAll(wID,0);
			
			if(wBFCHomePageModuleList.size()==1) {
				wResult=wBFCHomePageModuleList.get(0);
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
		return wResult;
	}

	
	public int Update(BFCHomePageModule wBFCHomePageModule) {
		int wResult = 0;
		try {

			/// \"\s*\+[\s ]*\"
			/// \`([A-Za-z0-9_]+)\`
			/// \<\{([A-Za-z0-9_]+)\:[^\}]+\}\>

			String wSQL = "";
			
			if (wBFCHomePageModule.getID() <= 0) {
				wSQL = MessageFormat.format(
						"INSERT INTO {0}.mbs_menu_item(`Name`,GroupID,Icon,Url,`Type`,`Active`,CreateTime,EditTime,CreatorID,EditorID, `Default` ,SecretKey) "
								+ " VALUES (:Name,:GroupID,:Icon,:Url,:Type,:Active,now(),now(),:CreatorID,:EditorID,0,:SecretKey);",
						this.GetDateBaseName(DataBaseTypes.MES));
				wBFCHomePageModule.setIcon(Constants.SERVER_URL+Constants.MENU_MODULE_ICON);
			} else {
				wSQL = MessageFormat.format(
						"UPDATE  {0}.mbs_menu_item SET  Name = :Name, GroupID = :GroupID ,  Icon = :Icon, "
								+ "Url = :Url ,  Type = :Type,  SecretKey = :SecretKey,  "
								+ "Active = :Active,  EditTime = now(),  "
								+ "CreatorID = :CreatorID,  EditorID = :EditorID  WHERE ID = :ID; ",
						this.GetDateBaseName(DataBaseTypes.MES));
			}


			wSQL = this.DMLChange(wSQL, Constants.SQL_TYPE); 
			KeyHolder keyHolder = new GeneratedKeyHolder();
			
			SqlParameterSource wSqlParameterSource=new BeanPropertySqlParameterSource(wBFCHomePageModule) ;
			nameJdbcTemplate.update(wSQL,wSqlParameterSource, keyHolder);
			if(wBFCHomePageModule.getID()<=0)
				wResult=keyHolder.getKey().intValue();
			else {
				wResult=wBFCHomePageModule.getID();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
		return wResult;
	}

	private BFCHomePageModuleManager() {
		super();
	}

	public static BFCHomePageModuleManager getInstance() {
		if (Instance == null)
			Instance = new BFCHomePageModuleManager();
		return Instance;
	}

	public static class BFCClientType {
		public static final int WEB = 1;
		public static final int CLIENT = 2;
		public static final int APP = 3;
	}
}
