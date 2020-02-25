import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoContainerComponent } from './notificacao-container.component';

describe('NotificacaoContainerComponent', () => {
  let component: NotificacaoContainerComponent;
  let fixture: ComponentFixture<NotificacaoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacaoContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacaoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
