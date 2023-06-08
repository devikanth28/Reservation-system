package com.ReservationSystem.ReservationSystemMvc.logUtility;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

public class LoggingUtility {
	public static void getRequestParameter(HttpServletRequest request) {
		Enumeration<String> params = request.getParameterNames(); 
		while(params.hasMoreElements()){
		 String paramName = params.nextElement();
		 System.out.println("Parameter Name - "+paramName+", Value - "+request.getParameter(paramName));
		}
	}
}
