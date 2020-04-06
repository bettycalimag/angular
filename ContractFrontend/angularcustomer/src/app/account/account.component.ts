import { Component, OnInit} from '@angular/core'; 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Observable } from 'rxjs';  
import { AccountService } from '../account.service';  
import { Account } from '../account'; 
import { TenantService } from '../tenant.service'; 
import { Tenant } from '../tenant'; 

interface Monat {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public tenants: Tenant[];
  public accounts: Account[];
  question: any = {};
  dataSaved = false;     
  accountIdUpdate = null;  
  massage = null;   
  selected2 = null;

  monate: Monat[] = [
    {value: 'january', viewValue: 'January'},
    {value: 'february', viewValue: 'February'},
    {value: 'march', viewValue: 'March'},
    {value: 'april', viewValue: 'April'},
    {value: 'may', viewValue: 'May'},
    {value: 'june', viewValue: 'June'},
    {value: 'july', viewValue: 'July'},
    {value: 'august', viewValue: 'August'},
    {value: 'september', viewValue: 'september'},
    {value: 'october', viewValue: 'October'},
    {value: 'november', viewValue: 'November'},
    {value: 'december', viewValue: 'December'}
  ];

  accountForm = new FormGroup({
    paymentDate: new FormControl(),
    rentAmountPaid: new FormControl(),
    electricBillPaid: new FormControl(),
    waterBillPaid: new FormControl(),
    remarks: new FormControl(),
    monthPaid: new FormControl(),
    tenantId: new FormControl()        
    })

  constructor(private formbuilder: FormBuilder, private accountService: AccountService, private tenantService: TenantService) { }

  ngOnInit() {
    this.accountForm = this.formbuilder.group({  
      paymentDate: ['', [Validators.required]], 
      rentAmountPaid: ['', [Validators.required]], 
      electricBillPaid: ['', [Validators.required]], 
      waterBillPaid: ['', [Validators.required]], 
      remarks: ['', [Validators.required]], 
      monthPaid: ['', [Validators.required]], 
      tenantId: [null, [Validators.required]]              
    }); 
    
    this.loadAllTenants();
    this.loadAllAccounts();
  }

  loadAllTenants() {  
    this.tenantService.getAllTenants().subscribe(res => {
      this.tenants = res;
    });
  }

  loadAllAccounts() {  
    this.accountService.getAllAccounts().subscribe(res => {
      this.accounts = res;
    });
  }

  onFormSubmit() {  
    this.dataSaved = false;    
    const account = this.accountForm.value;  
    this.createAccount(account);  
    this.accountForm.reset();  
  }  

  loadAccountToEdit(accountId: string) {  
    this.accountService.getAccountById(accountId).subscribe((account: any) =>  {
    this.massage = null; 
    this.dataSaved = false;  
    console.log(account.tenantId);
    this.accountIdUpdate = account.id;      
    this.accountForm.controls['paymentDate'].setValue(account.paymentDate);  
    this.accountForm.controls['rentAmountPaid'].setValue(account.rentAmountPaid); 
    this.accountForm.controls['electricBillPaid'].setValue(account.electricBillPaid);
    this.accountForm.controls['waterBillPaid'].setValue(account.waterBillPaid); 
    this.accountForm.controls['remarks'].setValue(account.remarks);  
    this.accountForm.controls['monthPaid'].setValue(account.monthPaid);  
    this.accountForm.controls['tenantId'].setValue(account.tenantId); 
    this.selected2 = account.tenantId;
  });    
}  

createAccount(account: Account) {  
  if (this.accountIdUpdate == null) {  
    this.accountService.createAccount(account).subscribe(  
      () => {  
        this.dataSaved = true;  
        this.massage = 'Record saved Successfully';  
        this.loadAllAccounts();  
        this.loadAllTenants();
        this.accountIdUpdate = null;  
        this.accountForm.reset();  
      }  
    );  
  } else {  
   account.id = this.accountIdUpdate;  
    this.accountService.updateAccount(account).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Updated Successfully';  
      this.loadAllAccounts(); 
      this.loadAllTenants(); 
      this.accountIdUpdate = null;  
      this.accountForm.reset();  
    });  
  }  
}   
deleteAccount(accountId: string) {  
  if (confirm("Are you sure you want to delete this ?")) {   
  this.accountService.deleteAccountById(accountId).subscribe(() => {  
    this.dataSaved = true;  
    this.massage = 'Record Deleted Succefully';  
    this.loadAllAccounts();  
    this.loadAllTenants();
    this.accountIdUpdate = null;  
    this.accountForm.reset();    

  });  
}  
}  
resetForm() {  
  this.accountForm.reset();  
  this.massage = null;  
  this.dataSaved = false;  
} 

}
