import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamComponent } from './ram.component';

describe('RamComponent', () => {
  let component: RamComponent;
  let fixture: ComponentFixture<RamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
