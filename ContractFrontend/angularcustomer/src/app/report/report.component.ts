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
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  massage = null; 
  dataSaved = false;  
  selected2 = null;

  monate: Monat[] = [
    {value: '1', viewValue: 'January'},
    {value: '2', viewValue: 'February'},
    {value: '3', viewValue: 'March'},
    {value: '4', viewValue: 'April'},
    {value: '5', viewValue: 'May'},
    {value: '6', viewValue: 'June'},
    {value: '7', viewValue: 'July'},
    {value: '8', viewValue: 'August'},
    {value: '9', viewValue: 'september'},
    {value: '10', viewValue: 'October'},
    {value: '11', viewValue: 'November'},
    {value: '12', viewValue: 'December'}
  ];

  reportForm = new FormGroup({ 
    monthId: new FormControl()        
    })

  constructor(private formbuilder: FormBuilder, private accountService: AccountService, ) { }

  ngOnInit() {
    this.reportForm = this.formbuilder.group({ 
      monthId: [null, [Validators.required]]              
    }); 
  }

  getReport(monthId: string) {       
    this.accountService.getMonthlyReport(monthId).subscribe(() => {  
      this.dataSaved = true; 
      this.massage = 'Report Generated Succefully';      
  
    });  
  }  
   
  resetForm() {  
    this.reportForm.reset();  
    this.massage = null; 
    this.dataSaved = false;      
  } 

  onFormSubmit() {  
    this.dataSaved = false;      
    this.getReport(this.selected2);  
  }  

  changeClient2(data){
    this.selected2 = this.monate[data].value;      
  }

}
