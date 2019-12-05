import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DciComponent } from './dci.component';

describe('InteractionComponent', () => {
  let component: DciComponent;
  let fixture: ComponentFixture<DciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DciComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
