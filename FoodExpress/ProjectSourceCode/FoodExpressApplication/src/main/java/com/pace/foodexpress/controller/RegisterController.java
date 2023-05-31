package com.pace.foodexpress.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pace.foodexpress.VO.FoodExpressUser;
import com.pace.foodexpress.VO.Status;
import com.pace.foodexpress.VO.UserDetails;
import com.pace.foodexpress.service.impl.RegisterServiceImpl;

import jakarta.servlet.http.HttpServletResponse;

@RestController("/")
public class RegisterController {
	
	@Autowired RegisterServiceImpl registerService;
	
	@PostMapping("/foodexpressuser/register")
	public Status registerUser(@RequestBody FoodExpressUser foodexpressuser ,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		return registerService.registerUser(foodexpressuser);
	}
	
	@PostMapping("/foodexpressuser/login")
	public UserDetails loginUser(@RequestBody FoodExpressUser foodexpressuser ,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		return registerService.loginUser(foodexpressuser);
	}
	
	@PostMapping("/foodexpressuser/update")
	public UserDetails updateUser(@RequestBody FoodExpressUser foodexpressuser ,HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		return registerService.updateUser(foodexpressuser);
	}
	
	@GetMapping("/getfoodexpressuser/{id}")
	public List<FoodExpressUser> getUserDetails(@PathVariable("id") String userId, HttpServletResponse response) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		return registerService.getUserDetails(userId);
	}

}
