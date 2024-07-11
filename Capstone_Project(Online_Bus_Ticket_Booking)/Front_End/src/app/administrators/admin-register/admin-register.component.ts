import { Component } from '@angular/core';
import { UserService } from '../../services/project.service';
import { Administrator } from '../../adminitrator.model'; // Adjust based on your model definition

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'] // Note the corrected styleUrls property
})
export class AdminRegisterComponent {
  administrator: Administrator = {
    name: '',
    email: '',
    password: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) { }

  onSubmit() {
    this.userService.registerAdministrator(this.administrator)
      .subscribe(response => {
        this.successMessage = 'Administrator registered successfully!';
        this.errorMessage = '';
      }, error => {
        this.errorMessage = 'Error registering administrator: ' + error.message;
        this.successMessage = '';
      });
  }
}
