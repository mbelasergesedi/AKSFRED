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
    path: 'complexe',
    loadChildren: () => import('../app/tab3/complexe/complexe.module').then(m => m.ComplexeModule)
  },

  {
    path: 'login',
    loadChildren: () => import('../app/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'interaction',
    loadChildren: () => import('../app/tab3/interaction/interaction.module').then(m => m.InteractionModule)
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
    path: 'students',
    loadChildren: () => import('../app/tab3/accountStudent/account.module').then(m => m.AccountModule)
  }
  ,
  {
    path: 'professional',
    loadChildren: () => import('../app/tab3/authentication-users/authentification-users.module').then(m => m.AuthentificationUsersModule)
  }

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