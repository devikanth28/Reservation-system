package com.ReservationSystem.ReservationSystemMvc.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ReservationSystem.ReservationSystemMvc.domain.Bus;
import com.ReservationSystem.ReservationSystemMvc.domain.Place;
import com.ReservationSystem.ReservationSystemMvc.services.PlaceService;

@RestController
public class DefaultController {
	
	@Autowired
	PlaceService placeService;
	
	@GetMapping("/getPlaces")
	public String getPlaces() {
		List<Place> places = placeService.getPlacesForSrcAndDest();
		System.out.println(places);
		return "Success";
		
	}
	
	@GetMapping("/getDates")
	public String getDates() {
		List<Bus> places = placeService.getBusBasedOnCriteria("Hyderbad","Tenali",new Date(2023-04-26));
		System.out.println(places);
		return "Success";
		
	}

}
