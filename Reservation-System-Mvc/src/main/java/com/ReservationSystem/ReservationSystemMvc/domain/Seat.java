package com.ReservationSystem.ReservationSystemMvc.domain;

public class Seat {
	
	private int seatId;
	public int getSeatId() {
		return seatId;
	}
	public void setSeatId(int seatId) {
		this.seatId = seatId;
	}
	public String getSeatNo() {
		return seatNo;
	}
	@Override
	public String toString() {
		return "Seat [seatId=" + seatId + ", seatNo=" + seatNo + ", seatStatus=" + seatStatus + ", bookedStatus="
				+ bookedStatus + "]";
	}
	public void setSeatNo(String seatNo) {
		this.seatNo = seatNo;
	}
	private String seatNo;
	private String seatStatus;	
	public String getSeatStatus() {
		return seatStatus;
	}
	public void setSeatStatus(String seatStatus) {
		this.seatStatus = seatStatus;
	}
	public String getBookedStatus() {
		return bookedStatus;
	}
	public void setBookedStatus(String bookedStatus) {
		this.bookedStatus = bookedStatus;
	}
	private String bookedStatus;

}
