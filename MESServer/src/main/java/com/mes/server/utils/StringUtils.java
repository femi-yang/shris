package com.mes.server.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.security.MessageDigest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date; 
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StringUtils {
	private static Logger logger = LoggerFactory.getLogger(StringUtils.class);

	private static Map<String, MessageDigest> digests = new ConcurrentHashMap<String, MessageDigest>();

	public static Integer parseInt(Object value) {
		if (value != null) {
			if (value instanceof Integer) {
				return (Integer) value;
			} else if (value instanceof String) {
				try {
					return Integer.valueOf((String) value);
				} catch (Exception e) {
					return 0;
				}
			}
		}
		return 0;
	}

	public static Float parseFloat(Object value) {
		if (value != null) {
			if (value instanceof Float) {
				return (Float) value;
			} else if (value instanceof Integer) {
				return (float) ((Integer) value).longValue();
			} else if (value instanceof Double) {
				return (float) ((Double) value).longValue();
			} else if (value instanceof String) {
				try {
					return Float.valueOf((String) value);
				} catch (Exception e) {
					return 0f;
				}
			}
		}
		return 0f;
	}

	public static Long parseLong(Object value) {
		if (value != null) {
			if (value instanceof Long) {
				return (Long) value;
			}
			if (value instanceof Integer) {
				return ((Integer) value).longValue();
			} else if (value instanceof String) {
				try {
					return Long.valueOf((String) value);
				} catch (Exception ex) {
					return 0L;
				}
			}
		}
		return 0L;
	}

	public static Double parseDouble(Object value) {
		if (value != null) {
			if (value instanceof Double) {
				return (Double) value;
			}
			if (value instanceof BigDecimal) {
				return Double.valueOf(value.toString());
			}
			if (value instanceof Integer) {
				return (double) ((Integer) value).longValue();
			} else if (value instanceof String) {
				try {
					return Double.valueOf((String) value);
				} catch (Exception ex) {
					return (double) 0;
				}
			}
		}
		return (double) 0;
	}

	public static String parseString(Object value) {
		if (value != null) {
			return String.valueOf(value);
		}
		return null;
	}

	@SuppressWarnings("unchecked")
	public static <T> List<T> parseList(Object value) {
		if (value != null) {
			try {
				return (List<T>) value;
			} catch (Exception ex) {
				return null;
			}
		}
		return null;
	}

	public static int[] parseIntList(List<String> value) {

		int[] wResult = new int[0];
		if (value != null) {
			wResult = new int[value.size()];
			try {
				for (int i = 0; i < value.size(); i++) {
					wResult[i] = Integer.parseInt(value.get(i));
				}
			} catch (Exception ex) {
				return wResult;
			}
		}
		return wResult;
	}

	public static int[] parseIntList(String[] value) {

		int[] wResult = new int[0];
		if (value != null) {
			wResult = new int[value.length];
			try {
				for (int i = 0; i < value.length; i++) {
					wResult[i] = Integer.parseInt(value[i]);
				}
			} catch (Exception ex) {
				return wResult;
			}
		}
		return wResult;
	}

	public static Boolean parseBoolean(Object value) {
		if (value != null) {
			if (value instanceof Integer) {
				return ((Integer) value).intValue() == 1;
			} else if (value instanceof String) {
				return "1".equals(value) || "true".equals(value);
			} else if (value instanceof Boolean) {
				return (Boolean) value;
			}
		}
		return false;
	}

	public static String hash(String data) {
		return hash(data, "MD5");
	}

	public static String hash(String data, String algorithm) {
		try {
			return hash(data.getBytes("utf-8"), algorithm);
		} catch (UnsupportedEncodingException e) {

		}
		return data;
	}

	public static String hash(byte[] bytes, String algorithm) {
		synchronized (algorithm.intern()) {
			MessageDigest digest = digests.get(algorithm);
			if (digest == null) {
				try {
					digest = MessageDigest.getInstance(algorithm);
					digests.put(algorithm, digest);
				} catch (Exception nsae) {
					return null;
				}
			}
			// Now, compute hash.
			digest.update(bytes);
			return encodeHex(digest.digest());
		}
	}

	public static String encodeHex(byte[] bytes) {
		StringBuilder buf = new StringBuilder(bytes.length * 2);
		int i;

		for (i = 0; i < bytes.length; i++) {
			if (((int) bytes[i] & 0xff) < 0x10) {
				buf.append("0");
			}
			buf.append(Long.toString((int) bytes[i] & 0xff, 16));
		}
		return buf.toString();
	}

	public static boolean isEmpty(String str) {
		return str == null || str.length() == 0;
	}

	public static boolean isNotEmpty(String str) {
		return !StringUtils.isEmpty(str);
	}

	public static String trim(String str) {
		return str == null ? null : str.trim();
	}

	/**
	 * 计算字符串字节长度
	 * 
	 * @param str
	 * @return
	 * @author Femi
	 */
	public static int getStringByteLength(String str) {
		char[] t = str.toCharArray();
		int count = 0;
		for (char c : t) {
			if ((c >= 0x4e00) && (c <= 0x9fbb)) {
				count = count + 2;
			} else {
				count++;
			}
		}
		return count;
	}

	public static String parseInputStreamToString(InputStream is) {
		BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		StringBuilder sb = new StringBuilder();

		String line = null;
		try {
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				is.close();
				is = null;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return sb.toString();

	}

	public static Date parseDate(String value, String format) {
		try {
			SimpleDateFormat DateFormat = new SimpleDateFormat(format);
			return DateFormat.parse(value);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		}
		return null;
	}
	
	public static Calendar parseDateTime(Object value, String format) {
		Calendar wCalendar=Calendar.getInstance(); 
		try {
			wCalendar.set(1970,1, 1);
			if(value instanceof Calendar) {
				wCalendar=(Calendar)value;
			}else if(value instanceof Date) {
				wCalendar.setTime((Date)value);
			}else if(value instanceof Long) { 
				wCalendar.setTimeInMillis((long)value);  
			}else if(value instanceof Integer) {
				wCalendar.add(Calendar.MILLISECOND, (int)value); 
			}else if(value instanceof String) {
				SimpleDateFormat DateFormat = new SimpleDateFormat(format);
				wCalendar.setTime(DateFormat.parse((String)value));
			}else {
				SimpleDateFormat DateFormat = new SimpleDateFormat(format);
				wCalendar.setTime(DateFormat.parse((String)value));
			} 
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			logger.error(e.getMessage());
		}
		return wCalendar;
	}
	
	public static String DencodeURIComponent(String wValue,String wKey) {
		if(wValue==null||wValue.trim().isEmpty()||wKey==null||wKey.trim().isEmpty())
			return "";
		
		if(!wValue.startsWith("?"))
			wValue="?"+wValue;
		
		int wIndex=wValue.indexOf("?"+wKey+"=");
		if(wIndex<0) 
			wIndex=wValue.indexOf("&"+wKey+"="); 
		
		if(wIndex<0)
			return "";
		
		
		String wResut = wValue.substring(wIndex+1);
		wIndex=wResut.indexOf('&');
		wResut = wResut.substring(wKey.length()+1,wIndex);
		 
		return wResut;
	}


	public static Calendar parseCalendar(Object value) {
		return parseDateTime(value,"yyyy-MM-dd HH:mm:ss");
	}
	
	public static String parseDateToString(Date value, String format) {
		SimpleDateFormat DateFormat = new SimpleDateFormat(format);
		return DateFormat.format(value);
	}

}
