package com.mes.server.action.dao.bms;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mes.server.action.dao.BaseManager;
import com.mes.server.bean.bms.BMSEmployee;
import com.mes.server.utils.Constants; 

public class BMSEmployeeManager extends BaseManager {

	private static Logger logger = LoggerFactory.getLogger(BMSEmployeeManager.class);

	private static BMSEmployeeManager Instance = null;
	
	

	public List<BMSEmployee> SelectAll(int wCompanyID, int wID, String wLoginName, String wPassword, int wActive) {
		List<BMSEmployee> wResult = new ArrayList<BMSEmployee>();
		try {
			String wSQL = MessageFormat.format(
					"SELECT mbs_user.ID,  " + "    mbs_user.CompanyID,  " + "    mbs_user.Name,  "
							+ "    mbs_user.LoginName,  " + "    mbs_user.Password,  " + "    mbs_user.CreateDate,  "
							+ "    mbs_user.Operator,  " + "    mbs_user.Active,  " + "    mbs_user.DepartmentID,  "
							+ "    mbs_user.Grad,  " + "    mbs_user.Manager,  " + "    mbs_user.Phone,  "
							+ "    mbs_user.Email,  " + "    mbs_user.WeiXin,  " + "    mbs_user.Position,  "
							+ "    mbs_user.PhoneMAC,  " + "    mbs_user.Online,  " + "    mbs_user.OnLineTime,  "
							+ "    mbs_user.DepartureDate,  " + "    mbs_user.LastOnLineTime,  "
							+ "    mbs_user.DutyID  " + " FROM  {0}.mbs_user WHERE 1=1 "
							+ " AND (:wLoginName is null or :wLoginName = '''' or :wLoginName= LoginName) "
							+ " AND (:wPassword is null or :wPassword = '''' or :wPassword= Password) "
							+ " AND (:wCompanyID <=0 or :wCompanyID = CompanyID) "
							+ " AND (:wActive < 0 or  :wActive= Active) " + " AND (:wID <= 0 or  :wID= ID) " + ";",
					this.GetDateBaseName(DataBaseTypes.MES));
			Map<String, Object> wParamMap = new HashMap<String, Object>();

			wParamMap.put("wLoginName", wLoginName);
			wParamMap.put("wID", wID);
			wParamMap.put("wPassword", wPassword);
			wParamMap.put("wCompanyID", wCompanyID);
			wParamMap.put("wActive", wActive);

			wSQL = this.DMLChange(wSQL, Constants.SQL_TYPE);
 
			wResult = this.QueryForList(wSQL, wParamMap, BMSEmployee.class);

			//List<Map<String, Object>> wQueryResultList = nameJdbcTemplate.queryForList(wSQL, wParamMap);

			//for (Map<String, Object> wRow : wQueryResultList) {
				
				/*
				 * BMSEmployee wBMSEmployee = new BMSEmployee();
				 * wBMSEmployee.setActive(StringUtils.parseInt(GetMapObject(wRow, "Active")));
				 * wBMSEmployee.setCreateDate(StringUtils.parseCalendar(GetMapObject(wRow,
				 * "CreateTime")));
				 * wBMSEmployee.setCreatorID(StringUtils.parseInt(GetMapObject(wRow,
				 * "CreatorID")));
				 * wBMSEmployee.setEditorID(StringUtils.parseInt(GetMapObject(wRow,
				 * "EditorID")));
				 * wBMSEmployee.setEditTime(StringUtils.parseCalendar(GetMapObject(wRow,
				 * "EditTime")));
				 * wBMSEmployee.setIcon(StringUtils.parseString(GetMapObject(wRow, "Icon")));
				 * wBMSEmployee.setID(StringUtils.parseInt(GetMapObject(wRow, "ID")));
				 * wBMSEmployee.setName(StringUtils.parseString(GetMapObject(wRow, "Name")));
				 * wBMSEmployee.setType(StringUtils.parseInt(GetMapObject(wRow, "Type")));
				 * 
				 * wResult.add(wBMSEmployee);
				 */
				
			//}

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
		return wResult;
	}

	public BMSEmployee Select(int wID) {
		BMSEmployee wResult = new BMSEmployee();

		List<BMSEmployee> wBMSEmployeeList = this.SelectAll(0, wID, "", "", -1);
		if (wBMSEmployeeList != null && wBMSEmployeeList.size() > 0)
			wResult = wBMSEmployeeList.get(0);
		return wResult;
	}

	public BMSEmployee Login(int wCompanyID, String wLoginName, String wPassword) {

		BMSEmployee wResult = new BMSEmployee();

		List<BMSEmployee> wBMSEmployeeList = this.SelectAll(wCompanyID, 0, wLoginName, wPassword, 1);
		if (wBMSEmployeeList != null && wBMSEmployeeList.size() > 0)
			wResult = wBMSEmployeeList.get(0);
		return wResult;
	}

	private BMSEmployeeManager() {
		super();
	}

	public static BMSEmployeeManager getInstance() {
		if (Instance == null)
			Instance = new BMSEmployeeManager();
		return Instance;
	}

}
