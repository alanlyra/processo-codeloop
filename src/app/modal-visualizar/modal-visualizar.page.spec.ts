import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarPage } from './modal-visualizar.page';

describe('ModalVisualizarPage', () => {
  let component: ModalVisualizarPage;
  let fixture: ComponentFixture<ModalVisualizarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVisualizarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVisualizarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
