import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CountdownClockComponent } from './components/CountdownClock/countdown-clock.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownClockComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
