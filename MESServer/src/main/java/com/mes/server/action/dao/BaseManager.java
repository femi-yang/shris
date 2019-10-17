package com.mes.server.action.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

import com.alibaba.fastjson.JSON; 
import com.mes.server.utils.Constants;
import com.mes.server.utils.MyApplicationContextUtil; 

public class BaseManager {

	public class SQLTypes {
		public static final int Mysql = 1;
		public static final int SqlServer = 2;
		public static final int Orecle = 3;
		public static final int Access = 4;

	}

	public static class DataBaseTypes {
		public static final int Default = 0;
		public static final int MES = 1;
		public static final int DMS = 2;
		public static final int EXC = 3;
		public static final int ERP = 4;
		public static final int Data = 5;

		public static String GetDateBaseName(int filed) {
			String wResult = "";
			switch (filed) {
			case DataBaseTypes.Default:
				wResult = "iplant_mes";
				break;
			case DataBaseTypes.MES:
				wResult = "iplant_mes";
				break;
			case DataBaseTypes.DMS:
				wResult = "iplant_dms";
				break;
			case DataBaseTypes.EXC:
				wResult = "iplant_exc";
				break;
			case DataBaseTypes.ERP:
				wResult = "iplant_erp";
				break;
			case DataBaseTypes.Data:
				wResult = "iplant_xxx";
				break;

			default:
				wResult = "iplant_mes";
			}
			return wResult;
		}
	}

	private static Logger logger = LoggerFactory.getLogger(BaseManager.class);

	protected NamedParameterJdbcTemplate nameJdbcTemplate;

	public NamedParameterJdbcTemplate getNameJdbcTemplate() {
		return nameJdbcTemplate;
	}

	public void setNameJdbcTemplate(NamedParameterJdbcTemplate nameJdbcTemplate) {
		this.nameJdbcTemplate = nameJdbcTemplate;
	}

	public BaseManager() {
		nameJdbcTemplate = MyApplicationContextUtil.getContext().getBean("nameJdbcTemplate",
				NamedParameterJdbcTemplate.class);
	}

	protected Object GetMapObject(Map<String, Object> wMap, String wKey) {
		Object wResult = null;
		try {
			if (wMap == null || wMap.size() < 1 || wKey == null || wKey.isEmpty())
				return wResult;

			if (wMap.containsKey(wKey))
				wResult = wMap.get(wKey);

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
		return wResult;
	}

	protected String GetDateBaseName(int wDataBaseFiled, int wSQLTypeFiled) {
		String wResult = DataBaseTypes.GetDateBaseName(wDataBaseFiled);

		switch (wSQLTypeFiled) {
		case SQLTypes.Mysql:

			break;
		case SQLTypes.SqlServer:
			wResult = wResult + ".dbo";
			break;
		case SQLTypes.Orecle:

			break;
		case SQLTypes.Access:

			break;
		default:
			break;
		}

		return wResult;
	}

	protected String GetDateBaseName(int wDataBaseFiled) {
		String wResult = DataBaseTypes.GetDateBaseName(wDataBaseFiled);

		switch (Constants.SQL_TYPE) {
		case SQLTypes.Mysql:

			break;
		case SQLTypes.SqlServer:
			wResult = wResult + ".dbo";
			break;
		case SQLTypes.Orecle:

			break;
		case SQLTypes.Access:

			break;
		default:
			break;
		}

		return wResult;
	}

	protected String MysqlChangeToSqlServer(String wMySqlString) {
		String wResult = "";
		try {
			StringBuffer wStringBuffer = new StringBuffer("");

			Matcher wMatcher = Pattern
					.compile("SELECT\\s+LAST_INSERT_ID\\(\\)(\\s+as\\s+ID)?\\s*\\;", Pattern.CASE_INSENSITIVE)
					.matcher(wMySqlString);
			if (wMatcher.matches()) {
				wMySqlString = wMatcher.replaceAll("");

				wMatcher = Pattern.compile("\\)\\s*VALUES\\s*\\(", Pattern.CASE_INSENSITIVE).matcher(wMySqlString);
				if (wMatcher.matches()) {
					wMySqlString = wMatcher.replaceAll(") output inserted.* \\n VALUES (");
				}
			}
			wMySqlString = wMySqlString.replaceAll("now()", "GETDATE()");

			wMatcher = Pattern.compile("\\s*SELECT\\s+", Pattern.CASE_INSENSITIVE).matcher(wMySqlString);

			if (wMatcher.matches()) {
				wMatcher = Pattern.compile("\\s+limit\\s+(?<Num>\\d+)\\s*\\,?(?<Num2>\\d*)", Pattern.CASE_INSENSITIVE)
						.matcher(wMySqlString);
				if (wMatcher.matches()) {
					wMySqlString = wMatcher.replaceAll("");

					wMatcher = Pattern.compile("\\s*SELECT\\s+", Pattern.CASE_INSENSITIVE).matcher(wMySqlString);

					wStringBuffer.setLength(0);

					while (wMatcher.find()) {
						wMatcher.appendReplacement(wStringBuffer,
								String.format(" SELECT Top ($1) ", wMatcher.group("Num")));
					}

					wMatcher.appendTail(wStringBuffer);
					wMySqlString = wStringBuffer.toString();
				}
			}

			wMatcher = Pattern.compile("\\`(?<Column>[a-zA-Z]+[a-zA-Z0-9_]+)\\`", Pattern.CASE_INSENSITIVE)
					.matcher(wMySqlString);
			wStringBuffer.setLength(0);

			while (wMatcher.find()) {
				wMatcher.appendReplacement(wStringBuffer, wMatcher.group("Column"));
			}

			wMatcher.appendTail(wStringBuffer);
			wMySqlString = wStringBuffer.toString();

			wMatcher = Pattern.compile(
					"str_to_date\\(\\s*(?<STR>[\\']{1,2}2010\\-01\\-01[\\']{1,2})\\s*\\,\\s*[\\']{1,2}\\%Y\\-\\%m\\-\\%d\\s*\\%H[\\']{1,2}\\)",
					Pattern.CASE_INSENSITIVE).matcher(wMySqlString);
			wStringBuffer.setLength(0);

			while (wMatcher.find()) {
				wMatcher.appendReplacement(wStringBuffer,
						String.format("cast( %s  as datetime)", wMatcher.group("STR")));
			}

			wMatcher.appendTail(wStringBuffer);
			wMySqlString = wStringBuffer.toString();

			wResult = wMySqlString;

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}

		return wResult;
	}

	protected String DMLChange(String wMySqlString, int wSQLTypeFiled) {
		switch (wSQLTypeFiled) {
		case SQLTypes.Mysql:

			break;
		case SQLTypes.SqlServer:
			wMySqlString = this.MysqlChangeToSqlServer(wMySqlString);
			break;
		case SQLTypes.Orecle:

			break;
		case SQLTypes.Access:

			break;
		default:
			break;
		}
		return wMySqlString;
	}

	/**
	 * SelectAll数据量查询数据
	 * 
	 * @param wSQL      查询sql语句 用:冒号定义参数
	 * @param wParamMap sql参数集
	 * @param clazz     返回数据类型 注意sql返回的数据需与实体类型相匹配
	 * @return
	 */
	protected <T> List<T> QueryForList(String wSQL, Map<String, Object> wParamMap, Class<T> clazz) {
		List<T> wResult = new ArrayList<T>();
		try {

			List<Map<String, Object>> wQueryResultList = nameJdbcTemplate.queryForList(wSQL, wParamMap);

			wResult = JSON.parseArray(JSON.toJSONString(wQueryResultList), clazz);

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
		return wResult;
	}
	
	/**
	 * Select数据量查询数据
	 * 
	 * @param wSQL      查询sql语句 用:冒号定义参数
	 * @param wParamMap sql参数集
	 * @param clazz     返回数据类型 注意sql返回的数据需与实体类型相匹配 不准用简单类型
	 * @return
	 */
	protected <T> T QueryForObject(String wSQL, Map<String, Object> wParamMap, Class<T> clazz) {
		T wResult = null;
		try {
			  
			Map<String, Object> wQueryResult = nameJdbcTemplate.queryForMap(wSQL, wParamMap);

			wResult = JSON.parseObject(JSON.toJSONString(wQueryResult), clazz);

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
		}
		return wResult;
	}

}
