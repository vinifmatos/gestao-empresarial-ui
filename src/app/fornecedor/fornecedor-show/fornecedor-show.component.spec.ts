import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorShowComponent } from './fornecedor-show.component';

describe('FornecedorShowComponent', () => {
  let component: FornecedorShowComponent;
  let fixture: ComponentFixture<FornecedorShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FornecedorShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
