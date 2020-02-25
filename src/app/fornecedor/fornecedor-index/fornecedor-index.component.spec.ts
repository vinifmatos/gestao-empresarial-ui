import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorIndexComponent } from './fornecedor-index.component';

describe('FornecedorIndexComponent', () => {
  let component: FornecedorIndexComponent;
  let fixture: ComponentFixture<FornecedorIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedorIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
