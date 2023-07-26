package com.ReservationSystem.ReservationSystemMvc.services;

import java.sql.Date;
import java.util.List;

import com.ReservationSystem.ReservationSystemMvc.domain.Bus;
import com.ReservationSystem.ReservationSystemMvc.domain.Place;

public interface PlaceService {
	
	public List<Place> getPlacesForSrcAndDest();
	
	public List<Bus> getBusBasedOnCriteria(String src,String dest,Date date);
	
	public List<Bus> getAllBuses();

}
