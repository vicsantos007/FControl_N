import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnologiaDispositivoComponent } from './tecnologia-dispositivo.component';

describe('TecnologiaDispositivoComponent', () => {
  let component: TecnologiaDispositivoComponent;
  let fixture: ComponentFixture<TecnologiaDispositivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecnologiaDispositivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecnologiaDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
