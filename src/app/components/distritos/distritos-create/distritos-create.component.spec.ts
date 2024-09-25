import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritosCreateComponent } from './distritos-create.component';

describe('DistritosCreateComponent', () => {
  let component: DistritosCreateComponent;
  let fixture: ComponentFixture<DistritosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistritosCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistritosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
