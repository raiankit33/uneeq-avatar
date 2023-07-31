import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UneeqavatarComponent } from './uneeqavatar.component';

describe('UneeqavatarComponent', () => {
  let component: UneeqavatarComponent;
  let fixture: ComponentFixture<UneeqavatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UneeqavatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UneeqavatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
