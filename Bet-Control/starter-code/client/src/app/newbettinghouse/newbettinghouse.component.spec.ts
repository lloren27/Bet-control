/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewbettinghouseComponent } from './newbettinghouse.component';

describe('NewbettinghouseComponent', () => {
  let component: NewbettinghouseComponent;
  let fixture: ComponentFixture<NewbettinghouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewbettinghouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewbettinghouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
