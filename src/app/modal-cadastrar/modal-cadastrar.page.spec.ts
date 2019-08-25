import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarPage } from './modal-cadastrar.page';

describe('ModalCadastrarPage', () => {
  let component: ModalCadastrarPage;
  let fixture: ComponentFixture<ModalCadastrarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCadastrarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCadastrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
