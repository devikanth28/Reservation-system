package com.ReservationSystem.ReservationSystemMvc.dao.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import com.ReservationSystem.ReservationSystemMvc.dao.UserDao;
import com.ReservationSystem.ReservationSystemMvc.domain.User;

@Repository
public class UserDaoImpl implements UserDao {

	@Autowired
	NamedParameterJdbcTemplate jdbcTemplate;

	@Override
	public String createUser(String username, String password) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("value1", username);
		paramMap.put("value2", password);
		String sql = "Insert into users(UserName,Password) values(:value1,:value2)";
		int name = jdbcTemplate.update(sql, paramMap);
		return "success";

	}

	private String getExistingUser(String username) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("username", username);
		System.out.println(username);
		String sql = "select UserName from users where UserName=(:username)";
		try {
		return jdbcTemplate.queryForObject(sql, paramMap, String.class);
		}catch (Exception e) {
			return null;
		}
//		return name;

	}

	@Override
	public String getUser(String username, String password) {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("value1", username);
		System.out.println(getExistingUser(username));
		String isExistingUser = getExistingUser(username);
		if (isExistingUser == null || isExistingUser.length() == 0) {
			return "User not found . Please register";
		}
		String sql = "select Password from users where UserName=:value1";
		String passwordFromDB = jdbcTemplate.queryForObject(sql, paramMap, String.class);
		if (!password.equals(passwordFromDB)) {
			return "Psasword is not correct . Please enter correct password";
		}
		return "success";

	}
}
