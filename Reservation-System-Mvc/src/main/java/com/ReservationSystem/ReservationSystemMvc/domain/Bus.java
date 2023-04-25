package com.ReservationSystem.ReservationSystemMvc.domain;

public class Bus extends TravellingDate{
	
	private int busId;
	private String name;
	private String src;
	private String dest;
	@Override
	public String toString() {
		return "Bus [busId=" + busId + ", name=" + name + ", src=" + src + ", dest=" + dest + "]";
	}
	public int getBusId() {
		return busId;
	}
	public void setBusId(int busId) {
		this.busId = busId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSrc() {
		return src;
	}
	public void setSrc(String src) {
		this.src = src;
	}
	public String getDest() {
		return dest;
	}
	public void setDest(String dest) {
		this.dest = dest;
	}

}
