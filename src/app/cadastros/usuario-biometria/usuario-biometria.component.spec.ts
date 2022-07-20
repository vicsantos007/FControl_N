import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioBiometriaComponent } from './usuario-biometria.component';

describe('UsuarioBiometriaComponent', () => {
  let component: UsuarioBiometriaComponent;
  let fixture: ComponentFixture<UsuarioBiometriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioBiometriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioBiometriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
