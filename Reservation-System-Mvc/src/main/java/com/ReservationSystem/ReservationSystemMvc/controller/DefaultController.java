package com.ReservationSystem.ReservationSystemMvc.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.ReservationSystem.ReservationSystemMvc.domain.Bus;
import com.ReservationSystem.ReservationSystemMvc.domain.Place;
import com.ReservationSystem.ReservationSystemMvc.domain.Seat;
import com.ReservationSystem.ReservationSystemMvc.services.PlaceService;
import com.ReservationSystem.ReservationSystemMvc.services.ReservationService;
import com.ReservationSystem.ReservationSystemMvc.services.UserService;

@Controller
public class DefaultController {


	@Autowired
	PlaceService placeService;

	@Autowired
	ReservationService reservationService;
	
	@Autowired
	UserService userService;

	@GetMapping("/getPlaces1")
	public String getPlaces() {
		List<Place> places = placeService.getPlacesForSrcAndDest();
		System.out.println(places);
		return "Success";

	}

	@GetMapping("/getDates1")
	public String getDates() {
		  long millis=System.currentTimeMillis();  
	        java.sql.Date date=new java.sql.Date(millis);  
		List<Bus> places = placeService.getBusBasedOnCriteria("Hyderbad","Tenali",date);
		System.out.println(places);
		return "Success";

	}


	@GetMapping("/getReservedSeatsForBus1")
	public String getReservedSeatsForBus() {
		  long millis=System.currentTimeMillis();  
	        java.sql.Date date=new java.sql.Date(millis);  
//		List<Seat> places = 
		String places = reservationService.updateSeatsForBus(1,date);
		System.out.println(places);
		return "Success";

	}
	
	@GetMapping("/createUser")
	public String createUser() {
		String UserName = "DineshBabu";
		String Password = "DineshBabuG";
		return userService.createUser(UserName, Password);
		
	}
	
	@GetMapping("/login")
	public String login() {
		String UserName = "DineshBabu";
		String Password = "DineshBabu";
		System.out.println(userService.login(UserName, Password));
		return null;
		
	}
	
	@GetMapping("/getUSerdetails")
	public String getUSerdetails() {
		String UserName = "DineshBabu";
		System.out.println(userService.getUserDetails(UserName));
		return null;
		
	}
	
	@GetMapping("/getAllBUses")
	public String getAllBuses() {
		List<Bus> places = placeService.getAllBuses();
		System.out.println(places);
		return "Success";

	}
	

	@GetMapping("/reserveSeats")
	public String reserveSeats() {
		  long millis=System.currentTimeMillis();  
	        java.sql.Date date=new java.sql.Date(millis);  
		List<Seat> places = new ArrayList<>();
		Seat s1 = new Seat();
		s1.setSeatId(22);
		Seat s2 = new Seat();
		s2.setSeatId(23);
		places.add(s1);
		places.add(s2);
		String places1 = reservationService.reserveSeatsForBus(1,date,places);
		return "Success";

	}

}
