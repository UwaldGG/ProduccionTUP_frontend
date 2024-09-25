import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritosEditComponent } from './distritos-edit.component';

describe('DistritosEditComponent', () => {
  let component: DistritosEditComponent;
  let fixture: ComponentFixture<DistritosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistritosEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistritosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
