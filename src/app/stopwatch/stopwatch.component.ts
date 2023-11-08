// src/app/stopwatch/stopwatch.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  template: `
    <div>
      {{ formattedTime }}
    </div>
  `,
})
export class StopwatchComponent implements OnInit, OnDestroy {
  @Input() start: boolean = false;
  @Output() time = new EventEmitter<number>();

  private seconds: number = 0;
  private intervalId: any;

  get formattedTime(): string {
    const hours = Math.floor(this.seconds / 3600);
    const minutes = Math.floor((this.seconds % 3600) / 60);
    const remainingSeconds = this.seconds % 60;

    return `${this.formatDigit(hours)}:${this.formatDigit(minutes)}:${this.formatDigit(remainingSeconds)}`;
  }

  ngOnInit(): void {
    if (this.start) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  ngOnChanges(): void {
    if (this.start) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  private startTimer(): void {
    this.intervalId = setInterval(() => {
      this.seconds++;
      this.time.emit(this.seconds);
    }, 1000);
  }

  private stopTimer(): void {
    clearInterval(this.intervalId);
  }

  private formatDigit(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
