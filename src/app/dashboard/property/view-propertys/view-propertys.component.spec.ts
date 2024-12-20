import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropertysComponent } from './view-propertys.component';

describe('ViewPropertysComponent', () => {
  let component: ViewPropertysComponent;
  let fixture: ComponentFixture<ViewPropertysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewPropertysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPropertysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
