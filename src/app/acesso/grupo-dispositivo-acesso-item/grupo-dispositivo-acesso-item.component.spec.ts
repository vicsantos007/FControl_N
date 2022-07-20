import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoDispositivoAcessoItemComponent } from './grupo-dispositivo-acesso-item.component';

describe('GrupoDispositivoAcessoItemComponent', () => {
  let component: GrupoDispositivoAcessoItemComponent;
  let fixture: ComponentFixture<GrupoDispositivoAcessoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoDispositivoAcessoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoDispositivoAcessoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
