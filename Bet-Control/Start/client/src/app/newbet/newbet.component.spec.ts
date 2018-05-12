/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewbetComponent } from './newbet.component';

describe('NewbetComponent', () => {
  let component: NewbetComponent;
  let fixture: ComponentFixture<NewbetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
