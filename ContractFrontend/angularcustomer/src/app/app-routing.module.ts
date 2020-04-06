import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { RentedplaceComponent } from './rentedplace/rentedplace.component';
import { TenantComponent } from './tenant/tenant.component';
import { AccountComponent } from './account/account.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
{ path: 'customer',  component : CustomerComponent },
{ path: 'rentedPlace', component : RentedplaceComponent },
{ path: 'tenant', component : TenantComponent},
{ path: 'account', component : AccountComponent},
{ path: 'report', component : ReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rountingComponents = [CustomerComponent, RentedplaceComponent, TenantComponent, AccountComponent, ReportComponent  ]
