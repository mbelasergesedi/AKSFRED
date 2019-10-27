import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { ReactiveFormsModule } from '@angular/forms';
import {GaleniqueService} from '../../services/galenique.service';
import {AnatomiqueService} from '../../services/anatomique.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-complexe',
  templateUrl: './complexe.component.html',
  styleUrls: ['./complexe.component.scss'],
})
export class ComplexeComponent implements OnInit {
  [x: string]: any;

  signupForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private galeniqueService: GaleniqueService,
              private anatomiqueService: AnatomiqueService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
    this.getGalenique();
    this.getAnatomique();
  }

  getGalenique() {
    this.galeniqueService.getGalenique().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(galenique => {
      this.galeniqueRef = galenique;
      this.galenique = galenique;
      console.log(this.galenique);
    });
  }

  getAnatomique() {
    this.anatomiqueService.getAnatomique().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(anatomique => {
      this.anatomiqueRef = anatomique;
      this.anatomique = anatomique;
      console.log(this.anatomique);
    });
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}

