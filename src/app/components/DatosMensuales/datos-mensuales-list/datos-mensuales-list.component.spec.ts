import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMensualesListComponent } from './datos-mensuales-list.component';

describe('DatosMensualesListComponent', () => {
  let component: DatosMensualesListComponent;
  let fixture: ComponentFixture<DatosMensualesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosMensualesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosMensualesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
