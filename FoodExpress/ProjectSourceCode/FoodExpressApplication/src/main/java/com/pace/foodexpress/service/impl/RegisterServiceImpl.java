package com.pace.foodexpress.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.pace.foodexpress.DAO.impl.RegisterDAOImpl;
import com.pace.foodexpress.VO.FoodExpressUser;
import com.pace.foodexpress.VO.Status;
import com.pace.foodexpress.VO.UserDetails;
import com.pace.foodexpress.service.RegisterService;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class RegisterServiceImpl implements RegisterService {
	
	@Autowired RegisterDAOImpl registerDAO;
	
	
	public Status registerUser(FoodExpressUser foodexpressuser) {
	    return registerDAO.registerUser(foodexpressuser);
	}
	
	public UserDetails loginUser(FoodExpressUser foodexpressuser) {
	    return registerDAO.loginUser(foodexpressuser);
	}
	
	public UserDetails updateUser(FoodExpressUser foodexpressuser) {
	    return registerDAO.updateUser(foodexpressuser);
	}
	
	public List<FoodExpressUser> getUserDetails(String userId) {
		return registerDAO.getUserDetails(userId);
	}

}
