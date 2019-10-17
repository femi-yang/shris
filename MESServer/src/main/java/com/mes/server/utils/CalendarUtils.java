package com.mes.server.utils;

import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CalendarUtils {
	private static Logger logger = LoggerFactory.getLogger(CalendarUtils.class);

	public static Calendar GetToday(int wHour, int wMinute, int wSecond) {
		Calendar wCalendar = Calendar.getInstance();
		try {
			wCalendar.set(Calendar.HOUR_OF_DAY, wHour);
			wCalendar.set(Calendar.SECOND, wMinute);
			wCalendar.set(Calendar.MINUTE, wSecond);
			wCalendar.set(Calendar.MILLISECOND, 0);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return wCalendar;
	}

	public static Calendar Add(Calendar wCalendar, int wFiled, int wValue) {

		try {
			wCalendar.add(wFiled, wValue);
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return wCalendar;
	}
}
