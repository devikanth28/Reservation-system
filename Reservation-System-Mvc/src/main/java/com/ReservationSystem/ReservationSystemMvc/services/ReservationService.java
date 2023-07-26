package com.ReservationSystem.ReservationSystemMvc.services;

import java.sql.Date;
import java.util.List;

import com.ReservationSystem.ReservationSystemMvc.domain.Seat;

public interface ReservationService {
	
	public List<Seat> getReservedSeatsForBus(int busId,Date bookingDate);
	
	public String updateSeatsForBus(int busId, Date date);
	
	public String reserveSeatsForBus(int busId,Date date,List<Seat> seats);

}
