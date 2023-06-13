package com.ReservationSystem.ReservationSystemMvc.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ReservationSystem.ReservationSystemMvc.dao.UserDao;
import com.ReservationSystem.ReservationSystemMvc.services.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDao userDao;

	@Override
	public String createUser(String username, String password) {
		return userDao.createUser(username, password);
	}

	@Override
	public String getUserDetails(String username, String password) {
		return userDao.getUser(username,password);
	}

}
