package com.ReservationSystem.ReservationSystemMvc.services;

public interface UserService {
	
	public String createUser(String username, String password);
	
	public String getUserDetails(String username, String password);

}
