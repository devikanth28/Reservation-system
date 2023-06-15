package com.ReservationSystem.ReservationSystemMvc.dao;

import java.sql.Date;
import java.util.List;

import com.ReservationSystem.ReservationSystemMvc.domain.Bus;
import com.ReservationSystem.ReservationSystemMvc.domain.Place;

public interface PlaceDao {
	
	public List<Place> getPlacesForSrcAndDest();

	public List<Bus> getBusBasedOnCriteria(String src,String dest,Date date);

	public List<Bus> getAllBuses();

}
