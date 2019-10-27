import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../../services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolsService } from '../../services/school.service';
import { VilleService } from '../../services/city.service';
import { QryCustomerService } from '../../services/customers.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customers } from '../../model/customers.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})


export class AccountComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  account_form: FormGroup;

  errorMessage = '';

  // tslint:disable-next-line: variable-name
  validation_messages = {
    email: [
      { type: 'required', message: 'Un email est obligtoire.' },
      { type: 'pattern', message: 'Entrer une  adresse valide.' }
    ],
    password: [
      { type: 'required', message: 'Un mot de passe est obligatoire.' },
      { type: 'minlength', message: 'Votre mot de passe doit contenir au moins 5 caractères.' }
    ]
  };
  enr: any;
  itemCollection: any;
  MyData: any;
  items: Observable<[any]>;
  enregistrement: any;
  [x: string]: any;
  list: Customers[];
  signupForm: FormGroup;

  successMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authenticateService: AuthenticateService,
              private schoolsService: SchoolsService,
              private villeService: VilleService,
              private db: AngularFirestore,
              private qryCustomerService: QryCustomerService,
              private router: Router) {

  }
  ngOnInit() {
    this.initForm();
    this.getVille();
  }
  getVille() {
    this.villeService.getVille().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(ville => {
      this.villeRef = ville;
      this.ville = ville;
      console.log(this.ville);
    });
  }
  initForm() {
    // Validations patterns
    this.account_form = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      structure: new FormControl('', Validators.compose([
        Validators.required
      ])),
      device: new FormControl('', Validators.compose([
      ])),
      geocoding: new FormControl('', Validators.compose([
      ])),

      ville: new FormControl('', Validators.compose([
        Validators.required
      ])),
      validate: new FormControl('', Validators.compose([
        Validators.required
      ])),
      profession: new FormControl('', Validators.compose([
        Validators.required
      ])),
      civilite: new FormControl('', Validators.compose([
        Validators.required
      ])),
      gsm: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])),
    });
  }
  tryRegister() {
    const data = this.account_form.value;
    // 1. On cherche si l'email de l'utilisateur est déjà présent dans la DB;
    this.itemCollection = this.db.collection<any[]>('customers', ref => ref.where('email', '==',
      this.account_form.get('email').value));
    this.items = this.itemCollection.valueChanges().subscribe((val: any) => {
      this.enregistrement = val;

      // 2. S'il n'est pas présent, on l'inscrit dans la DB et dans système d'authentification;
      if (Object.keys(this.enregistrement).length === 0) {
        this.qryCustomerService.createCustomer(data);
        this.authenticateService.registerUser(this.account_form.get('email').value, this.account_form.get('password').value)
          .then(res => {
            console.log(res);
            this.errorMessage = '';
            this.successMessage = 'Votre compte a été crée.';
          }, err => {
            //console.log(err);
            this.errorMessage = err.message;
            this.successMessage = '';
          });
        // 3. Sinon on le previent qu'il est déjà présent dans la DB;
      } else { console.log('Utilisateur déjà présent'); }
    }
    );
  }
}
