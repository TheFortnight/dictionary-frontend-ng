import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../data/services/auth.service';

@Component({
  selector: 'app-authorization',
  imports: [ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss',],
  standalone: true,
})
export class AuthorizationComponent {

  authService = inject(AuthService);
  error: string | null = null;
  modal: boolean = false;

    registerForm: FormGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })

    openModal() {

      this.modal = true;
    }

    closeModal(event: Event) {
      if (event.target === document.querySelector('.auth-modal-layer')) this.modal = false;
    }

    onSubmit(){
      
      if (this.registerForm.valid) {
        console.log(this.registerForm.value)
        this.error = null;
        this.authService.register(this.registerForm.value).subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
          },
          error: (error) => {
            if (error.status === 422) {
              console.error('Validation error:', error.error.message); // Log the error details
              this.error = error.error.message;
              
            } else {
              console.error('An unexpected error occurred:', error);
              
            }
          },
        });
        
      }
      
    } 
}
