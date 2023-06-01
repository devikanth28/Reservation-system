package com.ReservationSystem.ReservationSystemMvc.controller;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ReservationSystem.ReservationSystemMvc.constants.Context;
import com.ReservationSystem.ReservationSystemMvc.constants.Context.StatusCode;
import com.ReservationSystem.ReservationSystemMvc.domain.Bus;
import com.ReservationSystem.ReservationSystemMvc.domain.Place;
import com.ReservationSystem.ReservationSystemMvc.domain.Seat;
import com.ReservationSystem.ReservationSystemMvc.logUtility.LoggingUtility;
import com.ReservationSystem.ReservationSystemMvc.services.PlaceService;
import com.ReservationSystem.ReservationSystemMvc.services.ReservationService;

@RestController
@ComponentScan
@CrossOrigin
public class HomePageController {
	@Autowired
	PlaceService placeService;
	
	@Autowired
	ReservationService reservationService;
	@GetMapping("/getPlaces")
	public Context getPlaces() {
		try {
			List<Place> places = placeService.getPlacesForSrcAndDest();
			return new Context("message",places,StatusCode.SUCCESS);
		}
		catch(Exception e) {
			System.out.println("errr   "+e);
			return new Context(e.getMessage(),"Failure",StatusCode.FAILURE);
		}
	}
	
	@RequestMapping("/getBuses")
	public @ResponseBody Context getBuses(HttpServletRequest request) {
		LoggingUtility.getRequestParameter(request);
		String requestFromParam = request.getParameter("from");
		String requestToParam = request.getParameter("to");
		String requestDate = request.getParameter("date");
		Date date=Date.valueOf(requestDate);
		try {
			List<Bus> Buses = placeService.getBusBasedOnCriteria(requestFromParam,requestToParam,date);
			System.out.println("Places"+Buses);
		return new Context("message", Buses, StatusCode.SUCCESS);
		}catch(Exception e) {
			System.out.println("err   "+e);
			return new Context(e.getMessage(),"Failure",StatusCode.FAILURE);
		}
		
			
	}
	
	@RequestMapping("/getSeats")
	public @ResponseBody Context getSeats(HttpServletRequest request) {
		LoggingUtility.getRequestParameter(request);
		String travellingDate = request.getParameter("travellingDate");
		String busId = request.getParameter("busId");
		int parseBusId = Integer.parseInt(busId);
		Date date=Date.valueOf(travellingDate);
 		try {
			List<Seat> seats = reservationService.getReservedSeatsForBus(1, date);
			return new Context("successfully Featched Data",seats,StatusCode.SUCCESS);
		}
 		catch (Exception e) {
 			return new Context(e.getMessage(),"Failed",StatusCode.FAILURE);
		}
	}
	
}
