package com.pace.foodexpress.service;

import java.util.List;
import java.util.Map;

import com.pace.foodexpress.VO.FoodExpressUser;
import com.pace.foodexpress.VO.Status;
import com.pace.foodexpress.VO.UserDetails;

public interface RegisterService {

	public Status registerUser(FoodExpressUser foodexpressuser);
	
	public UserDetails loginUser(FoodExpressUser foodexpressuser);
	
	public UserDetails updateUser(FoodExpressUser foodexpressuser);
	
	public List<FoodExpressUser> getUserDetails(String userId);
}
