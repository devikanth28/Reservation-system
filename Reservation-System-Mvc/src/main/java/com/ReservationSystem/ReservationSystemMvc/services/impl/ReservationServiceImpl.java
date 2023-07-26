package com.ReservationSystem.ReservationSystemMvc.services.impl;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ReservationSystem.ReservationSystemMvc.dao.ReservationDao;
import com.ReservationSystem.ReservationSystemMvc.domain.Seat;
import com.ReservationSystem.ReservationSystemMvc.services.ReservationService;

@Service
public class ReservationServiceImpl implements ReservationService {
	
	@Autowired
	ReservationDao reservationDao;

	@Override
	public List<Seat> getReservedSeatsForBus(int busId, Date bookingDate) {
		return reservationDao.getReservedSeatsForBus(busId, bookingDate);
	}

	@Override
	public String updateSeatsForBus(int busId, Date date) {
		return reservationDao.updateSeatsForBus(busId, date);
	}

	@Override
	public String reserveSeatsForBus(int busId, Date date, List<Seat> seats) {
		return reservationDao.reserveSeatsForBus(busId, date,seats);
	}
}
