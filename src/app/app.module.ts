import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FundListComponent } from './fund-list/fund-list.component';
import { FundDetailsComponent } from './fund-details/fund-details.component';
import { InfrontModule } from 'src/InfrontModule/infront.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, FundListComponent, FundDetailsComponent],
  imports: [BrowserModule, InfrontModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
