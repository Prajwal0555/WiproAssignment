
package com.wipro.bus.service;

import com.wipro.bus.dto.BookingDTO;
import com.wipro.bus.entities.Booking;
import com.wipro.bus.entities.User;
import com.wipro.bus.repository.BookingRepository;
import com.wipro.bus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Booking createBooking(BookingDTO bookingDTO) {
		Optional<User> userOptional = userRepository.findById(bookingDTO.getUserId());

		if (userOptional.isPresent()) {
			User user = userOptional.get();

			List<String> requestedSeats = Arrays.asList(bookingDTO.getSeatNumbers().split(","));

			List<Booking> conflictingBookings = bookingRepository
					.findBookingsByScheduleIdAndSeatNumbers(bookingDTO.getScheduleId(), bookingDTO.getSeatNumbers());

			List<String> bookedSeats = conflictingBookings.stream()
					.flatMap(b -> Arrays.stream(b.getSeatNumbers().split(","))).collect(Collectors.toList());

			for (String seat : requestedSeats) {
				if (bookedSeats.contains(seat.trim())) {
					throw new RuntimeException(
							"Seat number " + seat + " is already booked for route " + bookingDTO.getScheduleId());
				}
			}

			Booking booking = new Booking(user, bookingDTO.getScheduleId(), bookingDTO.getSeatNumbers(),
					bookingDTO.getBookingDate(), bookingDTO.getTotalFare(), bookingDTO.getStatus()

			);
			return bookingRepository.save(booking);
		} else {
			throw new RuntimeException("User not found");
		}
	}

	@Override
	public Booking updateBooking(Long bookingId, BookingDTO bookingDTO) {
		Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
		if (bookingOptional.isPresent()) {
			Booking booking = bookingOptional.get();
			booking.setScheduleId(bookingDTO.getScheduleId());
			booking.setSeatNumbers(bookingDTO.getSeatNumbers());
			booking.setBookingDate(bookingDTO.getBookingDate());
			booking.setTotalFare(bookingDTO.getTotalFare());
			booking.setStatus(bookingDTO.getStatus());

			return bookingRepository.save(booking);
		} else {
			throw new RuntimeException("Booking not found");
		}
	}

	@Override
	public void cancelBooking(Long bookingId) {
		if (bookingRepository.existsById(bookingId)) {
			bookingRepository.deleteById(bookingId);
		} else {
			throw new RuntimeException("Booking not found");
		}
	}

	@Override
	public Booking getBookingById(Long bookingId) {
		return bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("Booking not found"));
	}

	@Override
	public List<Booking> getAllBookings() {
		return bookingRepository.findAll();
	}

	@Override
	public List<Booking> getBookingsByUserId(Long userId) {
		return bookingRepository.findByUser_UserId(userId);
	}

	@Override
	public Booking bookTicket(BookingDTO bookingDTO) {
		Optional<User> userOptional = userRepository.findById(bookingDTO.getUserId());
		if (userOptional.isPresent()) {
			User user = userOptional.get();

			List<String> requestedSeats = Arrays.asList(bookingDTO.getSeatNumbers().split(","));
			List<Booking> conflictingBookings = bookingRepository
					.findBookingsByScheduleIdAndSeatNumbers(bookingDTO.getScheduleId(), bookingDTO.getSeatNumbers());

			List<String> bookedSeats = conflictingBookings.stream()
					.flatMap(b -> Arrays.stream(b.getSeatNumbers().split(","))).collect(Collectors.toList());

			for (String seat : requestedSeats) {
				if (bookedSeats.contains(seat.trim())) {
					throw new RuntimeException(
							"Seat number " + seat + " is already booked for route " + bookingDTO.getScheduleId());
				}
			}

			Booking booking = new Booking(user, bookingDTO.getScheduleId(), bookingDTO.getSeatNumbers(),
					bookingDTO.getBookingDate(), bookingDTO.getTotalFare(), bookingDTO.getStatus()

			);

			return bookingRepository.save(booking);
		} else {
			throw new RuntimeException("User not found");
		}
	}
}
