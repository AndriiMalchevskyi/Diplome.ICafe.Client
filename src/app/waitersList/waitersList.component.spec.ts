/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WaitersListComponent } from './waitersList.component';

describe('WaitersListComponent', () => {
  let component: WaitersListComponent;
  let fixture: ComponentFixture<WaitersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
