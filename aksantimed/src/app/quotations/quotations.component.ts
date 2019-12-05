import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolsService } from '../services/school.service';
import { VilleService } from '../services/city.service';
import { QryCustomerService } from '../services/customers.service';
import { QryQuotationsService } from '../services/quotation.services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customers } from '../model/customers.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss'],
})
export class QuotationsComponent implements OnInit {
  clicked = false;

  // tslint:disable-next-line: variable-name
  quotation_form: FormGroup;

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
  ville: any;

  successMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authenticateService: AuthenticateService,
              private schoolsService: SchoolsService,
              private villeService: VilleService,
              private db: AngularFirestore,
              private qryCustomerService: QryCustomerService,
              private qryQuotationsService: QryQuotationsService,
              private toastController: ToastController,
              private router: Router) { }

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
    this.quotation_form = this.formBuilder.group({
      secteur: new FormControl('', Validators.compose([
        Validators.required
      ])),
      denomination: new FormControl('', Validators.compose([
        Validators.required
      ])),
      nom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      quantite: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      ville: new FormControl('', Validators.compose([
        Validators.required
      ])),
      type: new FormControl('', Validators.compose([
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gsm: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }
  tryRegister() {
    const data = this.quotation_form.value;

    this.qryQuotationsService.createQuotation(data);

  }

  async quotationToast() {
    const toast = await this.toastController.create({
      message: 'Vous demande de quotation des prix a été envoyée.',
      duration: 3000
    });
    toast.present();
  }
}
