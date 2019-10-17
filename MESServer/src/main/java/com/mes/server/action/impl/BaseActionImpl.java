package com.mes.server.action.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSON;
import com.mes.server.utils.Constants;
import com.mes.server.utils.CookieContants;
import com.mes.server.action.BaseAction;
import com.mes.server.utils.Configuration;
import com.mes.server.utils.CryptUtil;
import com.mes.server.utils.DesUtil;
import com.mes.server.utils.StringUtils;
import com.mes.server.utils.cerkeystore.CertificateCreateUtil;
import com.mes.server.utils.cerkeystore.PushCertificate;

/**
 * @Title: BaseAction.java
 * @Package com.dracom.platform.pushweb.web.module.pushweb.action
 * @author Administrator
 * @date 2012-6-20
 * @version V1.0
 */
public class BaseActionImpl implements BaseAction {

	// public Map<String, Object> resultMap = new HashMap<String, Object>();
	public static String RESULT_KEY = "result";
	public static String RESULT_MSG = "msg";

	public static String DATA_LIST = "list";
	public static String DATA_FENYE = "page";
	public static String DATA_INFO = "info";

	public static int login_cookie_expiry = Configuration.readConfigInteger("login.cookie.expiry", "config/config");

	public BaseActionImpl() {
	}

	public static Logger logger = LoggerFactory.getLogger(BaseAction.class);

	public Object execute(Map<String, Object> param) {
		return null;
	}

	@Override
	public void init() {

	}

	public static String createAuthor(Map<String, Object> info) {
		String str = JSON.toJSONString(info);
		String author = "";

		File cer = new File(Constants.POINTER_KEYSTORE_SAVE_PATH + Constants.CHECK_AUTHOR_CER + ".cer");
		File keystore = new File(Constants.POINTER_KEYSTORE_SAVE_PATH + Constants.CHECK_AUTHOR_CER + ".keystore");
		if (!cer.exists() || !keystore.exists()) {
			if (cer.exists())
				cer.delete();
			if (keystore.exists())
				keystore.delete();

			CertificateCreateUtil.genkey(Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER,
					Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER, Constants.POINTER_KEYSTORE_SAVE_PATH, false,
					Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER);
			CertificateCreateUtil.export(Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER,
					Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER, Constants.POINTER_KEYSTORE_SAVE_PATH,
					Constants.POINTER_KEYSTORE_SAVE_PATH, false);

			// CertificateCreateUtil.genkey(Contants.CHECK_AUTHOR_CER,
			// Contants.CHECK_AUTHOR_CER, Contants.POINTER_KEYSTORE_SAVE_PATH,
			// false);
			// CertificateCreateUtil.export(Contants.CHECK_AUTHOR_CER,
			// Contants.CHECK_AUTHOR_CER, Contants.POINTER_KEYSTORE_SAVE_PATH,
			// Contants.POINTER_KEYSTORE_SAVE_PATH, false);
		}

		byte[] cer_rsa;
		try {
			cer_rsa = PushCertificate.encryptByPublicKey(str.getBytes(),
					Constants.POINTER_KEYSTORE_SAVE_PATH + Constants.CHECK_AUTHOR_CER + ".cer");
			author = CryptUtil.base64Encoder(cer_rsa, 0, 0);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}

		return author;
	}

	@SuppressWarnings("unchecked")
	public static Map<String, Object> decreate(String author) {
		Map<String, Object> m = null;
		if (StringUtils.isNotEmpty(author)) {
			byte[] encode;
			String info = null;
			try {
				File cer = new File(Constants.POINTER_KEYSTORE_SAVE_PATH + Constants.CHECK_AUTHOR_CER + ".cer");
				File keystore = new File(
						Constants.POINTER_KEYSTORE_SAVE_PATH + Constants.CHECK_AUTHOR_CER + ".keystore");
				if (!cer.exists() || !keystore.exists()) {
					logger.debug("null author cer keystore");
					if (cer.exists())
						cer.delete();
					if (keystore.exists())
						keystore.delete();

					CertificateCreateUtil.genkey(Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER,
							Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER,
							Constants.POINTER_KEYSTORE_SAVE_PATH, false, Constants.CHECK_AUTHOR_CER,
							Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER);
					CertificateCreateUtil.export(Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER,
							Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER,
							Constants.POINTER_KEYSTORE_SAVE_PATH, Constants.POINTER_KEYSTORE_SAVE_PATH, false);
					// CertificateCreateUtil.genkey(Contants.CHECK_AUTHOR_CER,
					// Contants.CHECK_AUTHOR_CER,
					// Contants.POINTER_KEYSTORE_SAVE_PATH, false);
					// CertificateCreateUtil.export(Contants.CHECK_AUTHOR_CER,
					// Contants.CHECK_AUTHOR_CER,
					// Contants.POINTER_KEYSTORE_SAVE_PATH,
					// Contants.POINTER_KEYSTORE_SAVE_PATH, false);
					logger.debug("create author cer keystore");
				}

				encode = CryptUtil.base64Decoder(author.toCharArray(), 0);
				byte[] decode;
				decode = PushCertificate.decryptByPrivateKey(encode,
						Constants.POINTER_KEYSTORE_SAVE_PATH + Constants.CHECK_AUTHOR_CER + ".keystore",
						Constants.CHECK_AUTHOR_CER, Constants.CHECK_AUTHOR_CER);
				info = new String(decode);
			} catch (Exception e) {
				e.printStackTrace();
			}
			if (StringUtils.isNotEmpty(info)) {
				try {
					m = JSON.parseObject(info, HashMap.class);
				} catch (Exception e) {
					logger.debug(e.toString());
				}
			}
		}
		return m;
	}

	public byte[] getBytes(String filePath) {
		byte[] bytes = null;
		File file = new File(filePath);
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(file);
			try {
				bytes = new byte[fis.available()];
				fis.read(bytes);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} finally {
			try {
				fis.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return bytes;
	}

	public String getCookieValue(String cookie_key, HttpServletRequest request) {

		String cookie_val = null;
		Cookie[] cos = request.getCookies();
		if (cos != null && cos.length > 0) {
			for (Cookie co : cos) {
				if (cookie_key.equalsIgnoreCase(co.getName())) {
					cookie_val = co.getValue();
					break;
				}
			}

		} else {
			cookie_val = StringUtils.parseString(request.getAttribute(cookie_key));
		}

		try {
			cookie_val = DesUtil.decrypt(cookie_val, CookieContants.Key);
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
			logger.error(e.getMessage(),"");
		}

		return cookie_val;
	}

	public Boolean CheckCookieNo(HttpServletRequest request) {
		Boolean wRst = false;

		String UserID = getCookieValue(CookieContants.iPlant_User_ID, request);
		String UserName = getCookieValue(CookieContants.iPlant_User_Name, request);
		String CompanyID = getCookieValue(CookieContants.iplant_Company_ID, request);

		if (UserID == null) {
			UserID = request.getParameter(CookieContants.Extension_User_ID);

		}

		// String
		// PersonJudge=getCookieValue(CookieContants.iplant_Company_ID,request);
		if (UserID == null || UserID.isEmpty())
			wRst = true;
		if (UserName == null || UserName.isEmpty())
			wRst = true;
		if (CompanyID == null || CompanyID.isEmpty())
			wRst = true;

		return wRst;
	}

}
