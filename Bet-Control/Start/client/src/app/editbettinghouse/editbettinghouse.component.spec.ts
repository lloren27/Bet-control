/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditbettinghouseComponent } from './editbettinghouse.component';

describe('EditbettinghouseComponent', () => {
  let component: EditbettinghouseComponent;
  let fixture: ComponentFixture<EditbettinghouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditbettinghouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbettinghouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
