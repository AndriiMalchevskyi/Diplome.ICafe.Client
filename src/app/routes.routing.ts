import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guard/AuthGuard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuListComponent } from './menuList/menuList.component';
import { PersonalListComponent } from './personalList/personalList.component';
import { WaitersListComponent } from './waitersList/waitersList.component';
import { AboutComponent } from './about/about.component';
import { UserDetailComponent } from './userDetail/userDetail.component';
import { CartComponent } from './Cart/Cart.component';
import { ProductDetailComponent } from './productDetail/productDetail.component';



export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'home', component: HomeComponent},
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'menu', component: MenuListComponent},
    {path: 'personal', component: PersonalListComponent},
    {path: 'waiters', component: WaitersListComponent},
    {path: 'about', component: AboutComponent},
    {path: 'user-detail/:id', component: UserDetailComponent},
    {path: 'product-detail/:id', component: ProductDetailComponent},
    {path: 'product-detail', component: ProductDetailComponent},
    {path: 'cart', component: CartComponent},
    {path: '**', redirectTo: 'home', pathMatch: 'full'},
];
