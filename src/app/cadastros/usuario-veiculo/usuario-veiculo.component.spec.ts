import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioVeiculoComponent } from './usuario-veiculo.component';

describe('UsuarioVeiculoComponent', () => {
  let component: UsuarioVeiculoComponent;
  let fixture: ComponentFixture<UsuarioVeiculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioVeiculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
