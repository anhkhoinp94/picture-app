import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-countdown-clock',
    templateUrl: './countdown-clock.component.html',
    styleUrls: ['./countdown-clock.component.css']
})
export class CountdownClockComponent implements OnInit, OnDestroy {
    timeLeft: number = 60;
    interval: any;

    @Output() resetEvent = new EventEmitter<void>();

    ngOnInit(): void {
        this.startCountdown();
    }

    startCountdown() {
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
            } else {
                clearInterval(this.interval);
            }
        }, 1000);
    }

    ngOnDestroy(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    resetCountdown() {
        clearInterval(this.interval); // Stop current countdown
        this.timeLeft = 60; // Reset the time
        this.startCountdown(); // Restart countdown
    }
}
