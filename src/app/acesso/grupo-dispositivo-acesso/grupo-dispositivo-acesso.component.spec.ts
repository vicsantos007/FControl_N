import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoDispositivoAcessoComponent } from './grupo-dispositivo-acesso.component';

describe('GrupoDispositivoAcessoComponent', () => {
  let component: GrupoDispositivoAcessoComponent;
  let fixture: ComponentFixture<GrupoDispositivoAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoDispositivoAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoDispositivoAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
