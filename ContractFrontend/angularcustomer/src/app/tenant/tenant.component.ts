import { Component, OnInit} from '@angular/core'; 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Observable } from 'rxjs';  
import { TenantService } from '../tenant.service';  
import { Tenant } from '../tenant'; 
import { RentedPlaceService } from '../rentedplace.service'; 
import { RentedPlace } from '../rentedplace'; 

@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {

  public tenants: Tenant[];
  public rentedPlaces: RentedPlace[];
  question: any = {};
  dataSaved = false;     
  tenantIdUpdate = null;  
  massage = null;  
  sourceBoolean = {0: 'False', 1: 'True'};
  selected2 = null;

    tenantForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    downPayment: new FormControl(),
    deposit: new FormControl(),
    usedDownPayment: new FormControl(),
    usedDeposit: new FormControl(),
    active: new FormControl(),
    dateInsert: new FormControl(),
    rentedPlacesId: new FormControl() 
    })

  constructor(private formbuilder: FormBuilder, private tenantService: TenantService, private rentedPlaceService: RentedPlaceService ) { }

  ngOnInit() {
    this.tenantForm = this.formbuilder.group({  
      firstName: ['', [Validators.required]], 
      lastName: ['', [Validators.required]], 
      downPayment: ['', [Validators.required]], 
      deposit: ['', [Validators.required]], 
      usedDownPayment: ['', [Validators.required]], 
      usedDeposit: ['', [Validators.required]], 
      active: ['', [Validators.required]], 
      dateInsert: ['', [Validators.required]],  
      rentedPlacesId: [null, [Validators.required]],            
    }); 

    this.loadAllRentedPlaces(); 
    this.loadAllTenants();
  }

  loadAllRentedPlaces() {  
    this.rentedPlaceService.getAllRentedPlaces().subscribe(res => {
      this.rentedPlaces = res;
    });
  }

  loadAllTenants() {  
    this.tenantService.getAllTenants().subscribe(res => {
      this.tenants = res;
    });
  }

  
  onFormSubmit() {  
    this.dataSaved = false;    
    const tenant = this.tenantForm.value;  
    this.createTenant(tenant);  
    this.tenantForm.reset();  
  }  

  loadTenantToEdit(tenantId: string) {  
    this.tenantService.getTenantById(tenantId).subscribe((tenant: any) =>  {
    this.massage = null; 
    this.dataSaved = false;  
    console.log(tenant.rentedPlacesId);
    this.tenantIdUpdate = tenant.id;      
    this.tenantForm.controls['firstName'].setValue(tenant.firstName);  
    this.tenantForm.controls['lastName'].setValue(tenant.lastName); 
    this.tenantForm.controls['downPayment'].setValue(tenant.downPayment);
    this.tenantForm.controls['deposit'].setValue(tenant.deposit); 
    this.tenantForm.controls['usedDownPayment'].setValue(tenant.usedDownPayment); 
    this.tenantForm.controls['usedDeposit'].setValue(tenant.usedDeposit); 
    this.tenantForm.controls['active'].setValue(tenant.active);  
    this.tenantForm.controls['dateInsert'].setValue(tenant.dateInsert);  
    this.tenantForm.controls['rentedPlacesId'].setValue(tenant.rentedPlacesId); 
    this.selected2 = tenant.rentedPlacesId;
  });    
}  

createTenant(tenant: Tenant) {  
  if (this.tenantIdUpdate == null) {  
    this.tenantService.createTenant(tenant).subscribe(  
      () => {  
        this.dataSaved = true;  
        this.massage = 'Record saved Successfully';  
        this.loadAllRentedPlaces();  
        this.loadAllTenants();
        this.tenantIdUpdate = null;  
        this.tenantForm.reset();  
      }  
    );  
  } else {  
   tenant.id = this.tenantIdUpdate;  
    this.tenantService.updateTenant(tenant).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Updated Successfully';  
      this.loadAllRentedPlaces(); 
      this.loadAllTenants(); 
      this.tenantIdUpdate = null;  
      this.tenantForm.reset();  
    });  
  }  
}   
deleteTenant(tenantId: string) {  
  if (confirm("Are you sure you want to delete this ?")) {   
  this.tenantService.deleteTenantById(tenantId).subscribe(() => {  
    this.dataSaved = true;  
    this.massage = 'Record Deleted Succefully';  
    this.loadAllRentedPlaces();  
    this.loadAllTenants();
    this.tenantIdUpdate = null;  
    this.tenantForm.reset();    

  });  
}  
}  
resetForm() {  
  this.tenantForm.reset();  
  this.massage = null;  
  this.dataSaved = false;  
} 

}
