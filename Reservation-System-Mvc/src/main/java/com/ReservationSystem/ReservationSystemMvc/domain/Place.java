package com.ReservationSystem.ReservationSystemMvc.domain;

public class Place {
	
	@Override
	public String toString() {
		return "Place [state=" + state + ", district=" + district + ", city=" + city + "]";
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	private String state;
	private String district;
	private String city;


}
