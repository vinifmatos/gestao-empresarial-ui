import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelecaoClienteComponent } from './modal-selecao-cliente.component';

describe('ModalSelecaoClienteComponent', () => {
  let component: ModalSelecaoClienteComponent;
  let fixture: ComponentFixture<ModalSelecaoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSelecaoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSelecaoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
