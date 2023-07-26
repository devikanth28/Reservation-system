package com.ReservationSystem.ReservationSystemMvc.domain;

public class Seat {
	
	public Seat() {
		this.seatId=seatId;
	}
	
	private double price;
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	private Integer seatId;
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
		return "Seat [price=" + price + ", seatId=" + seatId + ", seatNo=" + seatNo + ", seatStatus=" + seatStatus
				+ ", bookedStatus=" + bookedStatus + "]";
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
