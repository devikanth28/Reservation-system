package com.ReservationSystem.ReservationSystemMvc.services;

import com.ReservationSystem.ReservationSystemMvc.domain.User;

public interface UserService {
	
	public String createUser(String username, String password);
	
	public String login(String username, String password);
	
	public User getUserDetails(String username);
}
