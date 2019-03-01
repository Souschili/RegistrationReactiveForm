
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  regform: FormGroup;

  /*используем FormBuilder */
  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    alert('Registration finish');
  }



  ngOnInit() {
    this.regform = this.fb.group({
      Email: ['', [Validators.required, Validators.pattern( '[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}' )]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      Password2: ['', [Validators.required]]
    }
    , {validator: this.checkIfMatchingPasswords('Password', 'Password2')});
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      } else {
          return passwordConfirmationInput.setErrors(null);
      }
    };
  }

}



