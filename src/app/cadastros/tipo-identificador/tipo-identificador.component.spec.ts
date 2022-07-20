import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoIdentificadorComponent } from './tipo-identificador.component';

describe('TipoIdentificadorComponent', () => {
  let component: TipoIdentificadorComponent;
  let fixture: ComponentFixture<TipoIdentificadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoIdentificadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoIdentificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
