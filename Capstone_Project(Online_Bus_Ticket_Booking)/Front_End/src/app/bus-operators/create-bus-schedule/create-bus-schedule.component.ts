import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BusSchedule, BusScheduleService } from '../../services/bus.service';

@Component({
  selector: 'app-bus-schedule',
  templateUrl: './create-bus-schedule.component.html',
  styleUrls: ['./create-bus-schedule.component.css']
})
export class BusScheduleComponent implements OnInit {
  busScheduleForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private busScheduleService: BusScheduleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.busScheduleForm = this.formBuilder.group({
      busName: [''],
      busNumber: [''],
      busType: [''],
      numofSeats: [''],
      origin: [''],
      destination: [''],
      timings: [''],
      fare: ['']
    });
  }

  successMessage: string = '';
  errorMessage: string = '';

  // Convenience getter for easy access to form fields
  get f() { return this.busScheduleForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Prepare BusSchedule object from form data
    const busSchedule: BusSchedule = this.busScheduleForm.value;

    // Call service method to create bus schedule
    this.busScheduleService.createBusSchedule(busSchedule).subscribe(
      response => {
        this.successMessage = 'Bus Scheduled Successfully!';
        this.errorMessage = '';
      },
      error => {
        console.error('Error Scheduling Bus:', error);
        this.errorMessage = 'Error Scheduling Bus: ' + (error.error?.message || error.message || 'Unknown Error');
        this.successMessage = '';
      }
    );
  }
}
