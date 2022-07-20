import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoAcessoPermitidoItemComponent } from './periodo-acesso-permitido-item.component';

describe('PeriodoAcessoPermitidoItemComponent', () => {
  let component: PeriodoAcessoPermitidoItemComponent;
  let fixture: ComponentFixture<PeriodoAcessoPermitidoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodoAcessoPermitidoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoAcessoPermitidoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
