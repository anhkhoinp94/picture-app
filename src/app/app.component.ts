import picsJson from '../assets/data/pics.json';
import { Component, ViewChild } from '@angular/core';
import { CountdownClockComponent } from './components/CountdownClock/countdown-clock.component';

interface Picture {
  id: number;
  picName: string;
  sample: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isShowSample = false;
  id = 1;
  min = 1;
  max = picsJson.length;
  picName = '';
  sample = '';
  pics: Picture[] = [];
  selectedPic: Picture = {
    id: 0,
    picName: '',
    sample: '',
  };

  selectedVoice: SpeechSynthesisVoice | null;
  voices: SpeechSynthesisVoice[];
  selectedRate: number = 1;
  canSpeak: boolean = true;

  userText: string = '';

  @ViewChild(CountdownClockComponent)
  countdownClockComponent!: CountdownClockComponent;

  constructor() {
    this.selectedVoice = null;
    this.voices = [];
    this.pics = this.pics.concat(picsJson);
    this.id = this.getRandomArbitrary(this.min, this.max);
    let pic = this.pics.find((obj) => {
      return obj.id === this.id;
    });
    if (pic) {
      this.selectedPic = pic;
      this.picName = pic.picName;
      this.sample = pic.sample;
    }
  }

  get wordCount(): number {
    return this.userText.trim().split(/\s+/).filter(Boolean).length;
  }

  next() {
    this.id = this.getRandomArbitrary(this.min, this.max);
    let pic = this.pics.find((obj) => {
      return obj.id === this.id;
    });
    if (pic) {
      this.selectedPic = pic;
      this.picName = pic.picName;
      this.sample = pic.sample;
    }
    this.resetCountdown();
    this.isShowSample = false;
    this.userText = '';
  }

  showSample() {
    this.isShowSample = !this.isShowSample;
    this.resetCountdown();
  }

  resetCountdown() {
    this.countdownClockComponent.resetCountdown();
  }

  getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  speakMessage() {
    let words = this.sample.split(',');
    if (words.length > 0) {
      var utterance = new SpeechSynthesisUtterance(words[0].trim());
      utterance.voice = this.selectedVoice;
      utterance.rate = this.selectedRate;
      speechSynthesis.speak(utterance);
    }
  }

  speakMessage5() {
    for (let index = 0; index < 5; index++) {
      this.speakMessage();
    }
  }

  speakSentence() {
    var utterance = new SpeechSynthesisUtterance('');
    utterance.voice = this.selectedVoice;
    utterance.rate = this.selectedRate;
    speechSynthesis.speak(utterance);
  }
}
