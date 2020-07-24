import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementComponent } from './classement.component';

describe('ClassementComponent', () => {
  let component: ClassementComponent;
  let fixture: ComponentFixture<ClassementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
