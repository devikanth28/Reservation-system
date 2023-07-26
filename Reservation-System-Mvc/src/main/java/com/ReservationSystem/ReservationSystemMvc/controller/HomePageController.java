package com.ReservationSystem.ReservationSystemMvc.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;

//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.request;

//import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ReservationSystem.ReservationSystemMvc.constants.Context;
import com.ReservationSystem.ReservationSystemMvc.constants.Context.StatusCode;
import com.ReservationSystem.ReservationSystemMvc.domain.Bus;
import com.ReservationSystem.ReservationSystemMvc.domain.Place;
import com.ReservationSystem.ReservationSystemMvc.domain.Seat;
import com.ReservationSystem.ReservationSystemMvc.domain.User;
import com.ReservationSystem.ReservationSystemMvc.logUtility.LoggingUtility;
import com.ReservationSystem.ReservationSystemMvc.services.PlaceService;
import com.ReservationSystem.ReservationSystemMvc.services.ReservationService;
import com.ReservationSystem.ReservationSystemMvc.services.UserService;
import com.google.gson.Gson;

@RestController
@ComponentScan
@CrossOrigin
public class HomePageController {
	@Autowired
	PlaceService placeService;

	@Autowired
	ReservationService reservationService;

	@Autowired
	Gson gson;

	@Autowired
	UserService userservice;

	@GetMapping("/getPlaces")
	public Context getPlaces() {
		try {
			List<Place> places = placeService.getPlacesForSrcAndDest();
			return new Context("message", places, StatusCode.SUCCESS);
		} catch (Exception e) {
			System.out.println("errr   " + e);
			return new Context(e.getMessage(), "Failure", StatusCode.FAILURE);
		}
	}

	@RequestMapping("/getBuses")
	public @ResponseBody Context getBuses(HttpServletRequest request) {
		LoggingUtility.getRequestParameter(request);
		String requestFromParam = request.getParameter("from");
		String requestToParam = request.getParameter("to");
		String requestDate = request.getParameter("date");
		Date date = Date.valueOf(requestDate);
		try {
			List<Bus> Buses = placeService.getBusBasedOnCriteria(requestFromParam, requestToParam, date);
			return new Context("message", Buses, StatusCode.SUCCESS);
		} catch (Exception e) {
			System.out.println("err   " + e);
			return new Context(e.getMessage(), "Failure  ", StatusCode.FAILURE);
		}

	}

	@RequestMapping("/getSeats")
	public @ResponseBody Context getSeats(HttpServletRequest request) {
		LoggingUtility.getRequestParameter(request);
		String travellingDate = request.getParameter("travellingDate");
		String busId = request.getParameter("busId");
		int parseBusId = Integer.parseInt(busId);
		Date date = Date.valueOf(travellingDate);
		try {
			List<Seat> seats = reservationService.getReservedSeatsForBus(Integer.parseInt(busId), date);
			return new Context("successfully Featched Data", seats, StatusCode.SUCCESS);
		} catch (Exception e) {
			return new Context(e.getMessage(), "Failed", StatusCode.FAILURE);
		}
	}

	@GetMapping("/getAllBuses")
	public @ResponseBody Context getAllBuses() {
		try {
			List<Bus> Buses = placeService.getAllBuses();
			return new Context("successfully Featched Buses", Buses, StatusCode.SUCCESS);
		} catch (Exception e) {
			return new Context(e.getMessage(), "Failed", StatusCode.FAILURE);
			// TODO: handle exception
		}
	}

	@PostMapping("/updateBusDetails")
	public @ResponseBody Context setBusDetails(@RequestBody Map<String, String> request) {
//		System.out.println("Requesttttttttttttt"+request.getParameterNames());
//		LoggingUtility.getRequestParameter(request);
		String busId = request.get("busId");
		String travellingDate = request.get("travellingDate");
//		System.out.println(busId+""+travellingDate);
		try {
			String msg = reservationService.updateSeatsForBus(Integer.parseInt(busId), Date.valueOf(travellingDate));
			return new Context("success", msg, StatusCode.SUCCESS);
		} catch (Exception e) {
			// TODO: handle exception
			return new Context(e.getMessage(), "Failed To Set Details", StatusCode.FAILURE);
		}
	}

	@PostMapping("/createUser")
	public @ResponseBody Context creatUserDetails(@RequestBody Map<String, String> request) {
		String userName = request.get("userName");
		String password = request.get("password");
		System.out.println("createUser" + userName + "  dddddddddddd  " + password);
		try {
			String msg = userservice.createUser(userName, password);
			return new Context("successfully created user", msg, StatusCode.SUCCESS);
		} catch (Exception e) {
			// TODO: handle exception
			return new Context(e.getMessage(), "Falied To Create User", StatusCode.FAILURE);
		}
	}

	@GetMapping("/getUserDetails")
	public @ResponseBody Context getUserDetails(HttpServletRequest request) {
//		LoggingUtility.getRequestParameter(request);
		String userName = request.getParameter("userName");
		try {
			User user = userservice.getUserDetails(userName);
			return new Context("successfully featched user Details", user, StatusCode.SUCCESS);
		} catch (Exception e) {
			// TODO: handle exception
			return new Context(e.getMessage(), "Failed To Featch Details", StatusCode.FAILURE);
		}
	}

	@GetMapping("/getLogin")
	public @ResponseBody Context getLogin(HttpServletRequest request) {
		LoggingUtility.getRequestParameter(request);
		String userName = request.getParameter("userName");
		String password = request.getParameter("password");
		try {
			String msg = userservice.login(userName, password);
			return new Context("successfully Login", msg, StatusCode.SUCCESS);
		} catch (Exception e) {
			// TODO: handle exception
			return new Context(e.getMessage(), "Falied To Login", StatusCode.FAILURE);
		}
	}

	@GetMapping("/getBookSeats")
	public @ResponseBody Context updateReservedSeats(HttpServletRequest request) {
		LoggingUtility.getRequestParameter(request);
		System.out.println(request);
		String busId = request.getParameter("busId");
		String travellingDateStr = request.getParameter("date");

		String selectedSeatIds = request.getParameter("selectedSeats");
		List<Integer> seatIds = Arrays.stream(selectedSeatIds.split(",")).map(seatId -> Integer.valueOf(seatId))
				.collect(Collectors.toList());
		System.out.println(seatIds);
		List<Seat> seats =new ArrayList<>();
		for (Integer seatId : seatIds) {
			Seat newSeat = new Seat();
			newSeat.setSeatId(seatId);
			seats.add(newSeat);
		}
//		List<Seat> seats = seatIds.stream().map(seatId -> new Seat()).collect(Collectors.toList());
//		System.out.println("seats"+seats);
		String result = reservationService.reserveSeatsForBus(Integer.parseInt(busId), Date.valueOf(travellingDateStr), seats);
		System.out.println("Result      "+result);
		
		return new Context("", result, StatusCode.SUCCESS);
	}

}
