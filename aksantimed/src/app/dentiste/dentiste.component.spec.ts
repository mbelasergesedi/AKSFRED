import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DentisteComponent } from './dentiste.component';

describe('DentisteComponent', () => {
  let component: DentisteComponent;
  let fixture: ComponentFixture<DentisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentisteComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DentisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
