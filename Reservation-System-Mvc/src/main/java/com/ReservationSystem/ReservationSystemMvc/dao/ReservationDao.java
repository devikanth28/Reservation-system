package com.ReservationSystem.ReservationSystemMvc.dao;

import java.sql.Date;
import java.util.List;

import com.ReservationSystem.ReservationSystemMvc.domain.Seat;

public interface ReservationDao {
	
	public List<Seat> getReservedSeatsForBus(int busId,Date date);

	public String updateSeatsForBus(int busId, Date date);

}
