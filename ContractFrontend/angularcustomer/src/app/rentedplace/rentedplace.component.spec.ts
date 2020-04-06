import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentedplaceComponent } from './rentedplace.component';

describe('RentedplaceComponent', () => {
  let component: RentedplaceComponent;
  let fixture: ComponentFixture<RentedplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentedplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentedplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
