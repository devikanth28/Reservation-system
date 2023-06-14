package com.ReservationSystem.ReservationSystemMvc.dao;

import com.ReservationSystem.ReservationSystemMvc.domain.User;

public interface UserDao {
	
	public String createUser(String username, String password);
	
	public String login(String username, String password);
	
	public User getUserDetails(String username);

}
