import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './_services/auth/AuthService.service';
import { AlertifyService } from './_services/alertify/Alertify.service';
import { AuthGuard } from './_guard/AuthGuard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuListComponent } from './menuList/menuList.component';
import { PersonalListComponent } from './personalList/personalList.component';
import { WaitersListComponent } from './waitersList/waitersList.component';
import { AboutComponent } from './about/about.component';
import { MenuCardComponent } from './Cards/menuCard/menuCard.component';
import { PersonalCardComponent } from './Cards/personalCard/personalCard.component';
import { UserDetailComponent } from './userDetail/userDetail.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      PersonalListComponent,
      MenuListComponent,
      WaitersListComponent,
      AboutComponent,
      MenuCardComponent,
      PersonalCardComponent,
      UserDetailComponent
   ],
   imports: [
      RouterModule.forRoot(appRoutes),
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   providers: [
      AuthService,
      AlertifyService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
