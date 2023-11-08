// src/app/components/telephone-bill-generator/telephone-bill-generator.component.ts
import { Component } from '@angular/core';
import { TelephoneBooth } from '../../models/telephone-booth';

Component({
  selector: 'app-telephone-bill-generator',
  templateUrl: './telephone-bill-generator.component.html',
  styleUrls: ['./telephone-bill-generator.component.css'],
})
export class TelephoneBillGeneratorComponent {
  currentBooth: TelephoneBooth = new TelephoneBooth(0, '', 0);
  isStopwatchRunning: boolean = false;
  isCallActive: boolean = false;
  showBill: boolean = false;
  callDuration: number = 0;
  totalBill: number = 0;

  startStopwatch(callType: string) {
    this.resetStopwatch();
    this.totalBill = 0;
    this.currentBooth.callType = callType;
    this.isStopwatchRunning = true;
    this.isCallActive = true;
  }

  endCall() {
    this.isStopwatchRunning = false;
    this.isCallActive = false;
    this.calculateBill(); // Moved this line after the resetStopwatch() call
    this.showBill = true;
  }

  updateCallDuration(time: number) {
    this.callDuration = time;
  }

  calculateBill() {
    // Assuming a simple calculation for the total bill based on call type and duration
    const ratePerSecond = this.currentBooth.callType === 'Domestic' ? 0.3 : 0.5;
    this.totalBill = this.callDuration * ratePerSecond;
  }

  resetStopwatch() {
    this.callDuration = 0;
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${this.formatDigit(hours)}:${this.formatDigit(minutes)}:${this.formatDigit(remainingSeconds)}`;
  }

  formatDigit(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}

export TelephoneBillGeneratorComponent
