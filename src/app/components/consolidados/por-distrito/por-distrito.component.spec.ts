import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorDistritoComponent } from './por-distrito.component';

describe('PorDistritoComponent', () => {
  let component: PorDistritoComponent;
  let fixture: ComponentFixture<PorDistritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorDistritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorDistritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
