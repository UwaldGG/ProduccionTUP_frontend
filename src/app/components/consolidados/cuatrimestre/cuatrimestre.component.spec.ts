import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuatrimestreComponent } from './cuatrimestre.component';

describe('CuatrimestreComponent', () => {
  let component: CuatrimestreComponent;
  let fixture: ComponentFixture<CuatrimestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuatrimestreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuatrimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
