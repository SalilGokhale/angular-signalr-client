import { Component, OnInit } from '@angular/core';
import { SignalRService } from './signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-signalr-client';
  total = 10000;
  inputs = [{value: 10000, touched: false}];
  problem = false;

  constructor(public signalRService: SignalRService) { }

  async ngOnInit() {
    // await this.signalRService.startConnection();
  }

  addInput() {
    const newNumber = this.inputs.length + 1;
    const newAverage = this.total / newNumber;
    for (let index = 0; index < this.inputs.length; index++) {
      this.inputs[index] = {
        value: newAverage,
        touched: false
      };
    }
    this.inputs.push({ value: newAverage, touched: false });
  }

  removeInput(i: number) {
    const newNumber = this.inputs.length - 1;
    const newAverage = this.total / newNumber;
    for (let index = 0; index < this.inputs.length; index++) {
      this.inputs[index] = {
        value: newAverage,
        touched: false
      };
    }
    this.inputs.splice(i, 1);
  }

  changeValue($event: any, index: number) {
    const value = $event.target.value;

    let newTotal = 0;
    let touchedTotal = 0;
    let newAutoNumber = 0;
    let allTouched = true;

    if (Number(value !== this.inputs[index])) {
      this.inputs[index] = {
        value: Number(value),
        touched: true
      };
    }

    this.inputs.forEach(input => {
      newTotal += input.value;
      if (!input.touched) {
        allTouched = false;
        newAutoNumber++;
      } else {
        touchedTotal += input.value;
      }
    });

    if (newTotal > this.total || (newTotal < this.total && allTouched)) {
      this.problem = true;
      return;
    }
    this.problem = false;

    const newAutoTotal = this.total - touchedTotal;

    const newAverage = newAutoTotal / newAutoNumber;

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.inputs.length; i++) {
      if (!this.inputs[i].touched) {
        this.inputs[i].value = newAverage;
      }
    }

  }
}
