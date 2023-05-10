package com.ReservationSystem.ReservationSystemMvc.domain;

import java.sql.Date;

public class TravellingDate {
	
	private Date travellingDate;
	public Date getTravellingDate() {
		return travellingDate;
	}
	public void setTravellingDate(Date travellingDate) {
		this.travellingDate = travellingDate;
	}
	@Override
	public String toString() {
		return "TravellingDate [travellingDate=" + travellingDate + "]";
	}

}
