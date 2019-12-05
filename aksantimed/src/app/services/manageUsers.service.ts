import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { UpdatemydataComponent } from '../updatemydata/updatemydata.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class ManageUsers {

    private dbPath = '/customers';

    ManageUsersRef: AngularFireList<UpdatemydataComponent> = null;

    constructor(private db: AngularFireDatabase) {
        this.ManageUsersRef = db.list(this.dbPath);
    }

    updateManageUsers(key: string, value: any): Promise<void> {
        return this.ManageUsersRef.update(key, value);
    }

    deleteManageUsers(key: string): Promise<void> {
        return this.ManageUsersRef.remove(key);
    }

}
