import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuComponent } from './cpu.component';

describe('CpuComponent', () => {
  let component: CpuComponent;
  let fixture: ComponentFixture<CpuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
