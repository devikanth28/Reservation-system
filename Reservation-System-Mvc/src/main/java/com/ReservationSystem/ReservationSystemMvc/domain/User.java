package com.ReservationSystem.ReservationSystemMvc.domain;

public class User {
	
	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", userId=" + userId + "]";
	}
	private String username;
	private String password;
	private int userId;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}

}
