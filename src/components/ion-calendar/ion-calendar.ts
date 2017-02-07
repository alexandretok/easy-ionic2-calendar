import { Component } from '@angular/core';

@Component({
  selector: 'ion-calendar',
  templateUrl: 'ion-calendar.html',
  outputs: ['currentDate']
})
export class IonCalendarComponent {

  currentDate: Date;
  rows = [];
  stop = false;

  constructor() {
    this.currentDate = new Date();
    this.currentDate.setHours(0,0,0,0);

    this.calc();

    setInterval(() => {
      console.log(this.currentDate);
    }, 2000);
  }

  calc(){
    this.rows = [];

    var tmp = new Date(this.currentDate.getTime()); tmp.setDate(1);

    while(tmp.getMonth() == this.currentDate.getMonth()){
      this.rows.push(['', '', '', '', '', '', '']);
      while(tmp.getDay() < 6 && tmp.getMonth() == this.currentDate.getMonth()){
        this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
        tmp.setDate(tmp.getDate() + 1);
      }
      if(tmp.getMonth() == this.currentDate.getMonth())
        this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
      tmp.setDate(tmp.getDate() + 1);
    }
  }

  dateClicked(date){
    var clickedDate = new Date(this.currentDate);
    clickedDate.setDate(date);

    this.currentDate = clickedDate;
  }

  previousMonth(){
    var tmp = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        this.currentDate.getDate()
    );

    /* Evita passar 2 meses caso o próximo mês não possua o dia selecionado */
    while(tmp.getMonth() > this.currentDate.getMonth() - 1 && tmp.getFullYear() == this.currentDate.getFullYear()) {
      tmp.setDate(tmp.getDate() - 1);
    }

    this.currentDate = tmp;

    this.calc();
  }

  nextMonth(){
    var tmp = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        this.currentDate.getDate()
    );

    /* Evita passar 2 meses caso o próximo mês não possua o dia selecionado */
    while(tmp.getMonth() > this.currentDate.getMonth() + 1) {
      tmp.setDate(tmp.getDate() - 1);
    }

    this.currentDate = tmp;

    this.calc();
  }

}
