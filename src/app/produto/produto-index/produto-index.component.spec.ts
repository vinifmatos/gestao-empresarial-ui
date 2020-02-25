import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoIndexComponent } from './produto-index.component';

describe('ProdutoIndexComponent', () => {
  let component: ProdutoIndexComponent;
  let fixture: ComponentFixture<ProdutoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
