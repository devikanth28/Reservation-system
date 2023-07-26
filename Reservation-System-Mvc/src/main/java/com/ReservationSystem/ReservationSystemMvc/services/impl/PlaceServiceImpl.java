package com.ReservationSystem.ReservationSystemMvc.services.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ReservationSystem.ReservationSystemMvc.dao.PlaceDao;
import com.ReservationSystem.ReservationSystemMvc.domain.Bus;
import com.ReservationSystem.ReservationSystemMvc.domain.Place;
import com.ReservationSystem.ReservationSystemMvc.services.PlaceService;

@Service
public class PlaceServiceImpl  implements PlaceService{

	@Autowired
	PlaceDao placeDao;

	@Override
	public List<Place> getPlacesForSrcAndDest() {
		return placeDao.getPlacesForSrcAndDest();
	}

	@Override
	public List<Bus> getBusBasedOnCriteria(String src, String dest, Date date) {
		return placeDao.getBusBasedOnCriteria(src,dest,date);
	}

	@Override
	public List<Bus> getAllBuses() {
		return placeDao.getAllBuses();
	}


}
