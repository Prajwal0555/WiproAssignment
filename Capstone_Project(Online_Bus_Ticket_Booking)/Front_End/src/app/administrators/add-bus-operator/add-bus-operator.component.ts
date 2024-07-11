import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';  // Ensure FormBuilder and FormGroup are imported
import { AdministratorService } from '../../services/administrator.service';
import { BusOperator } from '../../bus-operator.model';

@Component({
  selector: 'app-add-bus-operator',
  templateUrl: './add-bus-operator.component.html',
  styleUrls: ['./add-bus-operator.component.css']
})
export class AddBusOperatorComponent implements OnInit {

  addBusOperatorForm!: FormGroup;  // Declare addBusOperatorForm as a FormGroup
  isLoading = false;  // Initialize isLoading to false

  constructor(
    private formBuilder: FormBuilder,  // Inject FormBuilder
    private administratorService: AdministratorService  // Inject AdministratorService
  ) { }

  ngOnInit(): void {
    this.addBusOperatorForm = this.formBuilder.group({
      name: [''],  // Initialize name field
      email: [''],  // Initialize email field
      phoneNumber: [''],  // Initialize phoneNumber field
      password: ['']  // Initialize password field
      // Add more fields as per your BusOperator model
    });
  }

  onSubmit(): void {
    this.isLoading = true;  // Set isLoading to true during submission

    const busOperator: BusOperator = {
      name: this.addBusOperatorForm.value.name,  // Get name from form value
      email: this.addBusOperatorForm.value.email,  // Get email from form value
      phoneNumber: this.addBusOperatorForm.value.phoneNumber,  // Get phoneNumber from form value
      password: this.addBusOperatorForm.value.password  // Get password from form value
      // Assign more form values to corresponding fields in BusOperator model
    };

    this.administratorService.addBusOperator(busOperator).subscribe(
      addedBusOperator => {
        console.log('Bus operator added successfully:', addedBusOperator);
        // Optionally, reset form, show success message, etc.
        this.isLoading = false;  // Set isLoading back to false after submission
      },
      error => {
        console.error('Error adding bus operator:', error);
        // Handle error (e.g., show error message to user)
        this.isLoading = false;  // Set isLoading back to false if there's an error
      }
    );
  }

}
