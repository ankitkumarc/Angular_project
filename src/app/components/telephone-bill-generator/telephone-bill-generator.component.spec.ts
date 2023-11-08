import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TelephoneBillGeneratorComponent } from './telephone-bill-generator.component';
import { TelephoneBooth } from '../../models/telephone-booth';

describe('TelephoneBillGeneratorComponent', () => {
  let component: TelephoneBillGeneratorComponent;
  let fixture: ComponentFixture<TelephoneBillGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelephoneBillGeneratorComponent],
    });

    fixture = TestBed.createComponent(TelephoneBillGeneratorComponent);
    component = fixture.componentInstance;
  });

  it('should start the stopwatch when startStopwatch is called', () => {
    component.startStopwatch('Domestic');

    expect(component.isStopwatchRunning).toBe(true);
    expect(component.isCallActive).toBe(true);
    expect(component.totalBill).toBe(0);
    expect(component.currentBooth.callType).toBe('Domestic');
  });

  it('should end the call when endCall is called', () => {
    // Simulate a running stopwatch
    component.isStopwatchRunning = true;
    component.isCallActive = true;

    spyOn(component, 'calculateBill'); // Spy on the calculateBill method

    component.endCall();

    expect(component.isStopwatchRunning).toBe(false);
    expect(component.isCallActive).toBe(false);
    expect(component.showBill).toBe(true);
    expect(component.calculateBill).toHaveBeenCalled();
  });

  it('should update call duration when updateCallDuration is called', () => {
    component.updateCallDuration(60); // Simulate 1 minute call duration

    expect(component.callDuration).toBe(60);
  });

  it('should calculate the bill correctly for Domestic call', () => {
    // Simulate a Domestic call with 2 minutes duration
    component.currentBooth.callType = 'Domestic';
    component.callDuration = 120; // 2 minutes

    component.calculateBill();

    // Assuming ratePerSecond for Domestic is 0.3
    expect(component.totalBill).toBe(120 * 0.3);
  });

  it('should reset the stopwatch when resetStopwatch is called', () => {
    // Simulate a running stopwatch
    component.callDuration = 60;

    component.resetStopwatch();

    expect(component.callDuration).toBe(0);
  });

  it('should format time correctly', () => {
    const formattedTime = component.formatTime(3665); // 1 hour, 1 minute, and 5 seconds

    expect(formattedTime).toBe('01:01:05');
  });

  it('should format single-digit values with leading zeros', () => {
    const formattedDigit = component.formatDigit(9);

    expect(formattedDigit).toBe('09');
  });
});
