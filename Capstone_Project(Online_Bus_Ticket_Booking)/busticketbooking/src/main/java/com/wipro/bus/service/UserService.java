package com.wipro.bus.service;

import com.wipro.bus.entities.User;
import com.wipro.bus.exception.UserNotFoundException;
import com.wipro.bus.entities.Booking;

import java.util.List;

public interface UserService {
	User registerUser(User user);

	User loginUser(String email);

	User updateProfile(User user) throws UserNotFoundException;

	List<Booking> viewBookingHistory(Long userId);

	boolean cancelBooking(Long bookingId);

	boolean deleteUserByEmail(String email);

	 List<User> getAllUser(); 
		
		
	
}
