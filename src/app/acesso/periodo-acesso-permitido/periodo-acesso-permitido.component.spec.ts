import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoAcessoPermitidoComponent } from './periodo-acesso-permitido.component';

describe('PeriodoAcessoPermitidoComponent', () => {
  let component: PeriodoAcessoPermitidoComponent;
  let fixture: ComponentFixture<PeriodoAcessoPermitidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodoAcessoPermitidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoAcessoPermitidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
