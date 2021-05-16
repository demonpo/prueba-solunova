import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatActionButtonComponent } from './flat-action-button.component';

describe('FlatActionButtonComponent', () => {
  let component: FlatActionButtonComponent;
  let fixture: ComponentFixture<FlatActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlatActionButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
