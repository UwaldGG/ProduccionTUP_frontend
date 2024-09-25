import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritosListComponent } from './distritos-list.component';

describe('DistritosListComponent', () => {
  let component: DistritosListComponent;
  let fixture: ComponentFixture<DistritosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistritosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistritosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
