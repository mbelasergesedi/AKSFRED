import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'modal-page', loadChildren: './tab3/modal-page/modal-page.module#ModalPagePageModule' },
  {
    path: 'simple',
    loadChildren: () => import('../app/tab3/simple/simple.module').then(m => m.SimpleModule)
  },
  {
    path: 'infos',
    loadChildren: () => import('../app/informations/informations.module').then(m => m.InformationsModule)
  },

  {
    path: 'infosdetails',
    loadChildren: () => import('../app/infosdetails/infosdetails.module').then(m => m.InfosdetailsModule)
  },
  {
    path: 'complexe',
    loadChildren: () => import('../app/tab3/complexe/complexe.module').then(m => m.ComplexeModule)
  },

  { path: 'second/:price', loadChildren: './second/second.module#SecondPageModule' },

  {
    path: 'login',
    loadChildren: () => import('../app/login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'lostpassword',
    loadChildren: () => import('../app/lostpassword/lostpassword.module').then(m => m.LostpasswordModule)
  },
  {
    path: 'updatemydata',
    loadChildren: () => import('../app/updatemydata/updatemydata.module').then(m => m.UpdatemydataModule)
  },

  {
    path: 'interaction',
    loadChildren: () => import('../app/tab3/interaction/interaction.module').then(m => m.InteractionModule)
  }
  ,

  {
    path: 'dci',
    loadChildren: () => import('../app/tab3/dci/dci.module').then(m => m.DciModule)
  }
  ,
  {
    path: 'cartographie',
    loadChildren: () => import('./tab5/tab5.module').then(m => m.Tab5PageModule)
  }
  ,
  {
    path: 'account',
    loadChildren: () => import('../app/tab3/account/account.module').then(m => m.AccountModule)
  }
  ,
  {
    path: 'quotation',
    loadChildren: () => import('../app/quotations/quotations.module').then(m => m.QuotationsModule)
  }
  ,
  {
    path: 'students',
    loadChildren: () => import('../app/tab3/accountStudent/account.module').then(m => m.AccountModule)
  }
  ,

  {
    path: 'professional',
    loadChildren: () => import('../app/tab3/authentication-users/authentification-users.module').then(m => m.AuthentificationUsersModule)
  },
  { path: 'second', loadChildren: './second/second.module#SecondPageModule' }

];
@NgModule({
  imports:
    [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
  exports:
    [
      RouterModule
    ]
})
export class AppRoutingModule { }
