import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // <-- Import this if your component uses HttpClient
import { FuelComponent } from './fuel.component';

describe('FuelComponent', () => {
  let component: FuelComponent;
  let fixture: ComponentFixture<FuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelComponent, HttpClientModule] // <-- Add HttpClientModule here if needed
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});