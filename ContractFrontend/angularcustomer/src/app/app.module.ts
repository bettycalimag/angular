import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomerService } from './customer.service'; 
import { RentedPlaceService } from './rentedplace.service'; 
import { TenantService } from './tenant.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';  

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';  
import { MatListModule } from '@angular/material/list';  

import { AppRoutingModule, rountingComponents } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    rountingComponents       
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    ReactiveFormsModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,  
    MatMenuModule,  
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,       
    MatIconModule,  
    MatRadioModule,  
    MatCardModule,  
    MatSidenavModule,  
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,  
    MatTooltipModule,  
    MatToolbarModule,
    MatListModule    
  ],
  providers: [HttpClientModule, CustomerService,RentedPlaceService,TenantService, MatDatepickerModule, MatNativeDateModule, { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
