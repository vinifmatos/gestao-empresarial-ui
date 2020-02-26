import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoIndexComponent } from './pedido-index.component';

describe('PedidoIndexComponent', () => {
  let component: PedidoIndexComponent;
  let fixture: ComponentFixture<PedidoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
