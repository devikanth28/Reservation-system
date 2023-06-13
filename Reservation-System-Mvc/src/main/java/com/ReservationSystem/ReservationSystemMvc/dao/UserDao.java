package com.ReservationSystem.ReservationSystemMvc.dao;

public interface UserDao {
	
	public String createUser(String username, String password);
	
	public String getUser(String username, String password);

}
