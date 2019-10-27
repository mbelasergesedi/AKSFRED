import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SchoolsService } from '../services/school.service';
import { VilleService } from '../services/city.service';
import { QryCustomerService } from '../services/customers.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customers } from '../model/customers.model';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
 // tslint:disable-next-line: variable-name
 prof_form: FormGroup;

 errorMessage = '';


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
 // tslint:disable-next-line: use-lifecycle-interface
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
  this.prof_form = this.formBuilder.group({
    nom: new FormControl('', Validators.compose([
      Validators.required
    ])),
    categorie: new FormControl('', Validators.compose([
      Validators.required
    ])),


  });
}
 tryRegister() {
   const data = this.prof_form.value;
   // 1. On cherche si l'email de l'utilisateur est déjà présent dans la DB;
   console.log(  this.prof_form.get('categorie').value);
   this.itemCollection = this.db.collection<any[]>('customers', ref => ref.where('profession', '==',
     this.prof_form.get('categorie').value));
   this.items = this.itemCollection.valueChanges().subscribe((val: any) => {
     this.enregistrement = val;
    // console.log(this.enregistrement);

     // 2. S'il n'est pas présent, on l'inscrit dans la DB et dans système d'authentification;
     //if (Object.keys(this.enregistrement).length === 0) {
     //  this.qryCustomerService.createCustomer(data);
      //// this.authenticateService.registerUser(this.prof_form.get('email').value, this.prof_form.get('password').value)
       ////  .then(res => {
         //  console.log(res);
         ///  this.errorMessage = '';
         ///  this.successMessage = 'Votre compte a été crée.';
         //}, err => {
           //console.log(err);
         ///  this.errorMessage = err.message;
         ///  this.successMessage = '';
        // });
       // 3. Sinon on le previent qu'il est déjà présent dans la DB;
     //} else { console.log('Utilisateur déjà présent'); }
   }
   );
 }
}
