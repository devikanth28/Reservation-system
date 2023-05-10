package com.ReservationSystem.ReservationSystemMvc.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ReservationSystem.ReservationSystemMvc.dao.ReservationDao;
import com.ReservationSystem.ReservationSystemMvc.domain.Bus;
import com.ReservationSystem.ReservationSystemMvc.domain.Place;
import com.ReservationSystem.ReservationSystemMvc.domain.Seat;
import com.ReservationSystem.ReservationSystemMvc.services.PlaceService;
import com.ReservationSystem.ReservationSystemMvc.services.ReservationService;

@RestController
public class DefaultController {
	
	@Autowired
	PlaceService placeService;
	
	@Autowired
	ReservationService reservationService;
	
	@GetMapping("/getPlaces")
	public String getPlaces() {
		List<Place> places = placeService.getPlacesForSrcAndDest();
		System.out.println(places);
		return "Success";
		
	}
	
	@GetMapping("/getDates")
	public String getDates() {
		  long millis=System.currentTimeMillis();  
	        java.sql.Date date=new java.sql.Date(millis);  
		List<Bus> places = placeService.getBusBasedOnCriteria("Hyderbad","Tenali",date);
		System.out.println(places);
		return "Success";
		
	}
	
	
	@GetMapping("/getReservedSeatsForBus")
	public String getReservedSeatsForBus() {
		  long millis=System.currentTimeMillis();  
	        java.sql.Date date=new java.sql.Date(millis);  
		List<Seat> places = reservationService.getReservedSeatsForBus(1,date);
		System.out.println(places);
		return "Success";
		
	}
	
	

}
