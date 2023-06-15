package com.ReservationSystem.ReservationSystemMvc.dao.impl;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.ReservationSystem.ReservationSystemMvc.dao.PlaceDao;
import com.ReservationSystem.ReservationSystemMvc.domain.Bus;
import com.ReservationSystem.ReservationSystemMvc.domain.Place;

@Repository
public class PlaceDaoImpl implements PlaceDao{
	
	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public List<Place> getPlacesForSrcAndDest() {
		List<Place> places = jdbcTemplate.query("SELECT * FROM Place", new RowMapper<Place>() {
		    public Place mapRow(ResultSet rs, int rowNum) throws SQLException {
		    	Place place = new Place();
		        place.setCity(rs.getString("city"));
		        place.setDistrict(rs.getString("district"));
		        place.setState(rs.getString("state"));
		        return place;
		    }
		});
		System.out.println(places);
		return places;
	}

	@Override
	public List<Bus> getBusBasedOnCriteria(String src,String dest,Date date) {
		List<Bus> buses = jdbcTemplate.query("select * from Bus a left join TravellingDates b on a.BusId=b.BusId where a.Src='"+src+"' and a.Dest='"+dest+"' and b.Date='"+date+"'", new RowMapper<Bus>() {
		    public Bus mapRow(ResultSet rs, int rowNum) throws SQLException {
		    	Bus bus = new Bus();
		    	bus.setName(rs.getString("BusName"));
		    	bus.setSrc(rs.getString("Src"));
		    	bus.setDest(rs.getString("Dest"));
		    	bus.setTravellingDate(rs.getDate("Date"));
		        return bus;
		    }
		});
		System.out.println("buses"+buses);
		return buses;
	}

	@Override
	public List<Bus> getAllBuses() {
		List<Bus> buses = jdbcTemplate.query("SELECT * FROM Bus", new RowMapper<Bus>() {
		    public Bus mapRow(ResultSet rs, int rowNum) throws SQLException {
		    	Bus bus = new Bus();
		        bus.setBusId(rs.getInt("BusId"));
		        bus.setName(rs.getString("BusName"));
		        bus.setSrc(rs.getString("Src"));
		        bus.setDest(rs.getString("Dest"));
		        return bus;
		    }
		});
		System.out.println(buses);
		return buses;
	}

}
