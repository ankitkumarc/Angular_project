// src/app/app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TelephoneBillGeneratorComponent } from './components/telephone-bill-generator/telephone-bill-generator.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component'; // Add this line

@NgModule({
  declarations: [AppComponent, TelephoneBillGeneratorComponent, StopwatchComponent], // Add StopwatchComponent
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
