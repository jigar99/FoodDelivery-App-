package com.pace.foodexpress.DAO.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.pace.foodexpress.DAO.RegisterDAO;
import com.pace.foodexpress.VO.FoodExpressUser;
import com.pace.foodexpress.VO.Status;
import com.pace.foodexpress.VO.UserDetails;

import io.micrometer.common.util.StringUtils;

@Repository
public class RegisterDAOImpl implements RegisterDAO{
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public Status registerUser(FoodExpressUser foodexpressuser){
		Status status = new Status();
		try {
			List<FoodExpressUser> userList = jdbcTemplate.query("select * from foodExpressUser where email = ?", new Object[] {foodexpressuser.getEmail()}, new BeanPropertyRowMapper(FoodExpressUser.class));
			if(userList != null  && !userList.isEmpty()) {
				status.setStatusResponse("Failed");
				status.setResponseMessage("Account with email already exist. Please try a different email to register");
			} else {
				int updateStatus = jdbcTemplate.update(
		                "insert into foodExpressUser (userID, firstName, lastName, email, areaCode, phoneNumber, password) values(nextval('foodExpressUser_seq'),?,?,?,?,?,?)",
		                foodexpressuser.getFirstName(), foodexpressuser.getLastName(), foodexpressuser.getEmail(), foodexpressuser.getAreaCode(), foodexpressuser.getPhoneNumber(), foodexpressuser.getPassword());
				if(updateStatus == 1) {
					status.setStatusResponse("Success");
				} else {
					status.setStatusResponse("Failed");
					status.setResponseMessage("Registration failed! Please try again later");
				}
			}
		} catch(Exception exception) {
			status.setStatusResponse("Failed");
			status.setResponseMessage("Registration failed! Please try again later");
			exception.printStackTrace();
		}
		return status;
	}
	
	@Override
	public UserDetails loginUser(FoodExpressUser foodexpressuser){
		UserDetails userDetails =  new UserDetails();
		Status status = new Status();
		try {
			List<FoodExpressUser> userList = jdbcTemplate.query("select * from foodExpressUser where email = ?", new Object[] {foodexpressuser.getEmail()}, new BeanPropertyRowMapper(FoodExpressUser.class));
			if(userList != null  && !userList.isEmpty()) {
				List<FoodExpressUser> listOfUserDetails =   jdbcTemplate
		                .query("select * from foodExpressUser where email=? and password=?", new Object[] {foodexpressuser.getEmail(), foodexpressuser.getPassword()},new BeanPropertyRowMapper(FoodExpressUser.class) );
				if(listOfUserDetails != null && !listOfUserDetails.isEmpty()) {
					status.setStatusResponse("Success");
				} else {
					status.setStatusResponse("Failed");
					status.setResponseMessage("The Password is incorrect");
				}
				userDetails.setUserDetailsList(listOfUserDetails);
			} else {
				status.setStatusResponse("Failed");
				status.setResponseMessage("No Account exists for this email");
			}
		} catch(Exception exception) {
			status.setStatusResponse("Failed");
			status.setResponseMessage("Login failed! Please try again later");
		} finally {
			userDetails.setStatus(status);
		}
		return userDetails;
		
	}
	
	@Override
	public UserDetails updateUser(FoodExpressUser foodexpressuser){
		UserDetails userDetails =  new UserDetails();
		Status status = new Status();
		List<FoodExpressUser> listOfUserDetails = new ArrayList<>();
		try {
			List<FoodExpressUser> userList = jdbcTemplate.query("select * from foodExpressUser where email = ?", new Object[] {foodexpressuser.getEmail()}, new BeanPropertyRowMapper(FoodExpressUser.class));
			if(userList != null  && !userList.isEmpty()) {
				int result =   jdbcTemplate
		                .update("update foodExpressUser set firstName = ?, lastName = ?, phoneNumber = ?, email = ? where email = ?", new Object[] {foodexpressuser.getFirstName(), foodexpressuser.getLastName(), foodexpressuser.getPhoneNumber(), StringUtils.isEmpty(foodexpressuser.getNewEmail()) ? foodexpressuser.getEmail() : foodexpressuser.getNewEmail(), foodexpressuser.getEmail()});
				
				if(result>0) {
					status.setStatusResponse("Success");
					listOfUserDetails =   jdbcTemplate
			                .query("select * from foodExpressUser where email=?", new Object[] {StringUtils.isEmpty(foodexpressuser.getNewEmail()) ? foodexpressuser.getEmail() : foodexpressuser.getNewEmail()},new BeanPropertyRowMapper(FoodExpressUser.class) );
					
				} else {
					status.setStatusResponse("Failed");
					status.setResponseMessage("No Account exists for this email");
				}
				userDetails.setUserDetailsList(listOfUserDetails);
			} else {
				status.setStatusResponse("Failed");
				status.setResponseMessage("No Account exists for this email");
			}
		} catch(Exception exception) {
			status.setStatusResponse("Failed");
			status.setResponseMessage("Account Update failed! Please try again later");
		} finally {
			userDetails.setStatus(status);
		}
		return userDetails;
		
	}

	@Override
	public List<FoodExpressUser> getUserDetails(String userId) {
		@SuppressWarnings({ "deprecation", "rawtypes", "unchecked" })
		List<FoodExpressUser> listOfUserDetails =   jdbcTemplate
                .query("select * from foodExpressUser where userId=?", new Object[] {Integer.parseInt(userId)},new BeanPropertyRowMapper(FoodExpressUser.class) );
		return listOfUserDetails;
	}

}
