package com.pace.foodexpress.VO;

import java.util.List;

public class UserDetails {
	
	List<FoodExpressUser> userDetailsList;
	
	Status status;

	/**
	 * @return the userDetailsList
	 */
	public List<FoodExpressUser> getUserDetailsList() {
		return userDetailsList;
	}

	/**
	 * @param userDetailsList the userDetailsList to set
	 */
	public void setUserDetailsList(List<FoodExpressUser> userDetailsList) {
		this.userDetailsList = userDetailsList;
	}

	/**
	 * @return the status
	 */
	public Status getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(Status status) {
		this.status = status;
	}
	
}
