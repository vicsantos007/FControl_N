import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositivoClassificacaoComponent } from './dispositivo-classificacao.component';

describe('DispositivoClassificacaoComponent', () => {
  let component: DispositivoClassificacaoComponent;
  let fixture: ComponentFixture<DispositivoClassificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositivoClassificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositivoClassificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
