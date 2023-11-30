import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { ProductRepository } from './model/product.repository';
import { StaticDataSource } from './model/static.datasource';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule } from './store/store.module';
import { StoreFirstGuard } from './storeFirst.guard';
import { RouterModule } from '@angular/router';
import { CartDetailComponent } from './store/cartDetail.component';
import { CheckoutComponent } from './store/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule,
    RouterModule.forRoot([
      {
      path: "store", component: StoreComponent,
      canActivate: [StoreFirstGuard]
      },
      {
      path: "cart", component: CartDetailComponent,
      canActivate: [StoreFirstGuard]
      },
      {
      path: "checkout", component: CheckoutComponent,
      canActivate: [StoreFirstGuard]
      },
      { path: "**", redirectTo: "/store" }
      ])
    
  ],

  
  providers: [
    provideHttpClient(),
    ProductRepository,
    StaticDataSource,
    StoreFirstGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
