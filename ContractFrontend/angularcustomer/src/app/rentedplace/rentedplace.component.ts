import { Component, OnInit} from '@angular/core'; 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Observable } from 'rxjs';  
import { RentedPlaceService } from '../rentedplace.service';  
import { RentedPlace } from '../rentedplace'; 

@Component({
  selector: 'app-rentedplace',
  templateUrl: './rentedplace.component.html',
  styleUrls: ['./rentedplace.component.css']
})
export class RentedplaceComponent implements OnInit {

  public rentedPlaces: RentedPlace[];
  question: any = {};
  dataSaved = false;     
  rentedPlaceIdUpdate = null;  
  massage = null;  

    rentedplaceForm = new FormGroup({
    rentedName: new FormControl(),
    address: new FormControl()  
    })
    

  constructor(private formbuilder: FormBuilder, private rentedPlaceService: RentedPlaceService) { }

  ngOnInit() {
    this.rentedplaceForm = this.formbuilder.group({  
      rentedName: ['', [Validators.required]],  
      address: ['', [Validators.required]],            
    }); 
    
    this.loadAllRentedPlaces(); 
  }

  loadAllRentedPlaces() {  
    this.rentedPlaceService.getAllRentedPlaces().subscribe(res => {
      this.rentedPlaces = res;
    });
  }

  onFormSubmit() {  
    this.dataSaved = false;    
    const rentedPlace = this.rentedplaceForm.value;  
    this.createRentedPlace(rentedPlace);  
    this.rentedplaceForm.reset();  
  }  

  loadRentedPlaceToEdit(rentedPlaceId: string) {  
    this.rentedPlaceService.getRentedPlaceById(rentedPlaceId).subscribe((rentedPlace: any) =>  {
    this.massage = null; 
    this.dataSaved = false;  
    console.log(rentedPlace.customerName);
    this.rentedPlaceIdUpdate = rentedPlace.id;      
    this.rentedplaceForm.controls['rentedName'].setValue(rentedPlace.rentedName);  
    this.rentedplaceForm.controls['address'].setValue(rentedPlace.address);          
  });    
}  

createRentedPlace(rentedPlace: RentedPlace) {  
  if (this.rentedPlaceIdUpdate == null) {  
    this.rentedPlaceService.createRentedPlace(rentedPlace).subscribe(  
      () => {  
        this.dataSaved = true;  
        this.massage = 'Record saved Successfully';  
        this.loadAllRentedPlaces();  
        this.rentedPlaceIdUpdate = null;  
        this.rentedplaceForm.reset();  
      }  
    );  
  } else {  
   rentedPlace.id = this.rentedPlaceIdUpdate;  
    this.rentedPlaceService.updateRentedPlace(rentedPlace).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Updated Successfully';  
      this.loadAllRentedPlaces();  
      this.rentedPlaceIdUpdate = null;  
      this.rentedplaceForm.reset();  
    });  
  }  
}   
deleteRentedPlace(rentedPlaceId: string) {  
  if (confirm("Are you sure you want to delete this ?")) {   
  this.rentedPlaceService.deleteRentedplaceById(rentedPlaceId).subscribe(() => {  
    this.dataSaved = true;  
    this.massage = 'Record Deleted Succefully';  
    this.loadAllRentedPlaces();  
    this.rentedPlaceIdUpdate = null;  
    this.rentedplaceForm.reset();    

  });  
}  
}  
resetForm() {  
  this.rentedplaceForm.reset();  
  this.massage = null;  
  this.dataSaved = false;  
} 

}
