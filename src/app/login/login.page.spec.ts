import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location, LocationStrategy, PathLocationStrategy } from "@angular/common";
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';
import { UrlSerializer } from '@angular/router';
import { IonicModule } from '@ionic/angular';

fdescribe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [ReactiveFormsModule, IonicModule ],
      providers: [
        Location, 
        UrlSerializer,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
