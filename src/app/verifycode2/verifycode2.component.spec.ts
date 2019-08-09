import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCodeComponent2 } from './verifycode2.component';

describe('VerifyCodeComponent', () => {
  let component: VerifyCodeComponent2;
  let fixture: ComponentFixture<VerifyCodeComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyCodeComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCodeComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
