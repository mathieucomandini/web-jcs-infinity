import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PariComponent } from './pari.component';

describe('PariComponent', () => {
  let component: PariComponent;
  let fixture: ComponentFixture<PariComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PariComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
