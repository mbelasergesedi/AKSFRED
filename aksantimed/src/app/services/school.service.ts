import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { School } from '../model/school.model';
import { LoginComponent } from '../login/login.component';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as firebase from 'firebase';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
@Injectable()
export class SchoolsService {
    private dbPath = '/school';
    schoolRef: AngularFireList<LoginComponent>;

    constructor(private db: AngularFireDatabase) {
        this.schoolRef = db.list(this.dbPath);
    }

    schools: School[] = [];
    schoolsSubject = new Subject<School[]>();

    emitSchools() {
        this.schoolsSubject.next(this.schools);
    }

    saveSchools() {
        firebase.database().ref('/school').set(this.schools);
    }


    getSchools() {
        firebase.database().ref('/schools')
            .on('value', (data: DataSnapshot) => {
                this.schools = data.val() ? data.val() : [];
                this.emitSchools();
            }
            );
    }

    getSchool(): AngularFireList<LoginComponent> {
        return this.schoolRef;
    }

}

