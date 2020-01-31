import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FeatureModule } from "./features/feature.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';  


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatureModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
