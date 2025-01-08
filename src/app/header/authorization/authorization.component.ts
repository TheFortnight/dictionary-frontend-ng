import {
  Component,
  inject,
  Injectable
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ReactiveFormsModule
} from '@angular/forms';
import {
  AuthService
} from '../../data/services/auth.service';

@Component({
  selector: 'app-authorization',
  imports: [ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss', ],
  standalone: true,
})

@Injectable({
  providedIn: 'root'
})


export class AuthorizationComponent {

  authService = inject(AuthService);
  error: string | null = null;
  modal: boolean = false;
  modalSignin: boolean = false;
  signedIn: boolean = false;
  currUserName: string | null = null;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authService.me().subscribe({
      next: resp => {
        this.signedIn = true;
        this.currUserName = resp.name;
      }
    
    })
  }

  openModal() {

    this.modal = true;
    this.modalSignin = true;
  }

  closeModal(event: Event) {
    if (event.target === document.querySelector('.auth-modal-layer') || event.target === document.querySelector('.auth-modal-close')) {
      this.modal = false;
      this.modalSignin = false;
    }
  }

  registerUser() {

    if (this.registerForm.valid) {
      //console.log(this.registerForm.value)
      this.error = null;
      this.authService.register(this.registerForm.value)
      
      .subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.modal = false;
          this.currUserName = response.name; // doesn't add name right after registration!
          console.log('Curr User Name is: ', this.currUserName)
          
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

  signIn() {

    if (this.loginForm.valid) {
      //console.log(this.loginForm.value)
      this.error = null;
      this.authService.signIn(this.loginForm.value)
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.modal = false;
          this.signedIn = true;
          this.loginForm.reset()
         // this.authService.me()
          //.subscribe() // better use it in interceptor
          
        },
        error: (error) => {
          if (error.status === 401) {
            console.error('Validation error:', error.error.message); // Log the error details
            this.error = "wrong email or password. try again";

          } else {
            console.error('An unexpected error occurred:', error);

          }
        },
      });

    }

  }

  logout() {
    this.authService.logOut()
    .subscribe({
      next: (response) => {
        console.log('Logout successful:', response);
        this.signedIn = false;
        
      },
      error: (error) => {
        
          console.error('An unexpected error occurred:', error);

      },
    })
  }

  
}
