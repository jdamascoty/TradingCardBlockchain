import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainCardComponent } from './blockchain-card.component';

describe('BlockchainCardComponent', () => {
  let component: BlockchainCardComponent;
  let fixture: ComponentFixture<BlockchainCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockchainCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
