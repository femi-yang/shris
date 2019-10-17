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
import com.mes.server.bean.bfc.BFCHomePageGroup;
import com.mes.server.utils.Constants;

public class BFCHomePageGroupManager extends BaseManager {

	private static Logger logger = LoggerFactory.getLogger(BFCHomePageGroupManager.class);

	private static BFCHomePageGroupManager Instance = null;

	public List<BFCHomePageGroup> SelectAll(int wType) {
		List<BFCHomePageGroup> wResult = new ArrayList<BFCHomePageGroup>();
		try {
			String wSQL = MessageFormat.format("SELECT ID, mbs_menu_group.Name,mbs_menu_group.Icon,"
					+ "    mbs_menu_group.Type, mbs_menu_group.Active, mbs_menu_group.CreateTime,"
					+ "    mbs_menu_group.EditTime,  mbs_menu_group.CreatorID, mbs_menu_group.EditorID, mbs_menu_group.Default"
					+ "    FROM {0}.mbs_menu_group WHERE 1=1  and (:wType <= 0 or :wType=Type );",
					this.GetDateBaseName(DataBaseTypes.MES));
			Map<String, Object> wParamMap = new HashMap<String, Object>();
			wParamMap.put("wType", wType);
			wSQL = this.DMLChange(wSQL, Constants.SQL_TYPE);

			wResult = this.QueryForList(wSQL, wParamMap, BFCHomePageGroup.class);

			// List<Map<String, Object>> wQueryResultList =
			// nameJdbcTemplate.queryForList(wSQL, wParamMap);

			/*
			 * for (Map<String, Object> wRow : wQueryResultList) { BFCHomePageGroup
			 * wBFCHomePageGroup = new BFCHomePageGroup();
			 * wBFCHomePageGroup.setActive(StringUtils.parseInt(GetMapObject(wRow,"Active"))
			 * );
			 * wBFCHomePageGroup.setCreateTime(StringUtils.parseCalendar(GetMapObject(wRow,
			 * "CreateTime")));
			 * wBFCHomePageGroup.setCreatorID(StringUtils.parseInt(GetMapObject(wRow,
			 * "CreatorID")));
			 * wBFCHomePageGroup.setEditorID(StringUtils.parseInt(GetMapObject(wRow,
			 * "EditorID")));
			 * wBFCHomePageGroup.setEditTime(StringUtils.parseCalendar(GetMapObject(wRow,
			 * "EditTime")));
			 * wBFCHomePageGroup.setIcon(StringUtils.parseString(GetMapObject(wRow,"Icon")))
			 * ; wBFCHomePageGroup.setID(StringUtils.parseInt(GetMapObject(wRow,"ID")));
			 * wBFCHomePageGroup.setName(StringUtils.parseString(GetMapObject(wRow,"Name")))
			 * ; wBFCHomePageGroup.setType(StringUtils.parseInt(GetMapObject(wRow,"Type")));
			 * 
			 * wResult.add(wBFCHomePageGroup); }
			 */

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
		return wResult;
	}

	public int Update(BFCHomePageGroup wBFCHomePageGroup) {
		int wResult = 0;
		try {

			/// \"\s*\+[\s ]*\"
			/// \`([A-Za-z0-9_]+)\`
			/// \<\{([A-Za-z0-9_]+)\:[^\}]+\}\>

			String wSQL = ""; 
			if (wBFCHomePageGroup.getID() <= 0) {
				wSQL = MessageFormat.format(
						"INSERT INTO {0}.mbs_menu_group(Name,Icon,Type,Active,CreateTime,EditTime,CreatorID,EditorID)"
								+ "VALUES(:Name,:Icon,:Type,:Active,:CreateTime,:EditTime,:CreatorID,:EditorID);",
						this.GetDateBaseName(DataBaseTypes.MES));
				
				wBFCHomePageGroup.setIcon(Constants.SERVER_URL+Constants.MENU_GROUP_ICON);
				
			} else {
				wSQL = MessageFormat.format(
						"UPDATE  {0}.mbs_menu_group SET  Name = :Name,  Icon = :Icon,  Type = :Type,  "
								+ "Active = :Active,  CreateTime = :CreateTime,  EditTime = :EditTime,  "
								+ "CreatorID = :CreatorID,  EditorID = :EditorID  WHERE ID = :ID; ",
						this.GetDateBaseName(DataBaseTypes.MES));
			}

			wSQL = this.DMLChange(wSQL, Constants.SQL_TYPE);

			KeyHolder keyHolder = new GeneratedKeyHolder();

			SqlParameterSource wSqlParameterSource = new BeanPropertySqlParameterSource(wBFCHomePageGroup);

			wResult = nameJdbcTemplate.update(wSQL,wSqlParameterSource, keyHolder);
			if(wBFCHomePageGroup.getID()<=0)
				wResult=keyHolder.getKey().intValue();
			else {
				wResult=wBFCHomePageGroup.getID();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
		return wResult;
	}

	private BFCHomePageGroupManager() {
		super();
	}

	public static BFCHomePageGroupManager getInstance() {
		if (Instance == null)
			Instance = new BFCHomePageGroupManager();
		return Instance;
	}

}
