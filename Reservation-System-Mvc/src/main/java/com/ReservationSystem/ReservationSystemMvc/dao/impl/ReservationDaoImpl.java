package com.ReservationSystem.ReservationSystemMvc.dao.impl;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.ReservationSystem.ReservationSystemMvc.dao.ReservationDao;
import com.ReservationSystem.ReservationSystemMvc.domain.Seat;

@Repository
public class ReservationDaoImpl implements ReservationDao{
	
	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public List<Seat> getReservedSeatsForBus(int busId, Date date) {
		System.out.println(busId+""+date);
		List<Seat> reservedSeats = jdbcTemplate.query("SELECT  a.date, a.BusId, a.seatId, a.status, a.bookedStatus,b.seatNo FROM reserved_seats a inner join Seat b on a.seatId = b.seatId WHERE a.BusId = '"+busId+"' AND a.date = '"+date+"'", new RowMapper<Seat>() {
		    public Seat mapRow(ResultSet rs, int rowNum) throws SQLException {
		    	Seat seat = new Seat();
		    	seat.setSeatId(rs.getInt("seatId"));
		    	seat.setSeatNo(rs.getString("seatNo"));
		    	seat.setSeatStatus(rs.getString("status"));
		    	seat.setBookedStatus(rs.getString("bookedStatus"));
		        return seat;
		    }
		});
		System.out.println("reservedSeats"+reservedSeats);
		return reservedSeats;
	}

}
