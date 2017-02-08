import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ion-calendar',
  templateUrl: 'ion-calendar.html',
})
export class IonCalendarComponent {

  @Input() currentDate: Date = new Date();
  @Input() events: any = [];

  @Output() onChange: EventEmitter<Date> = new EventEmitter<Date>();

  rows = [];
  stop = false;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    /* If the currentDate was changed outside (in the parent component), we need to call this.calc() */
    /* But only if the month is changed */
    if(changes["currentDate"] && !changes["currentDate"].isFirstChange()) {
      if (changes["currentDate"].currentValue.getMonth() != changes["currentDate"].previousValue.getMonth())
        this.calc();
    }

    if(changes["events"] && !changes["events"].isFirstChange()) {
      let listToRemoveClasses: HTMLCollection = document.getElementsByClassName("hasEvents");
      let n: number = listToRemoveClasses.length;

      for(let i=0; i < n; i++)
        listToRemoveClasses[0].classList.remove("hasEvents"); /* Using index zero because the object is updated after we remove an item */

      this.setClassesOnEventDays();
    }
  }

  ngAfterViewInit(){
    /* Calls `this.calc()` after receiving an initial date */
    this.currentDate.setHours(0, 0, 0, 0);
    this.calc();
  }

  setClassesOnEventDays(){
    let firstDayOfTheMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
    );

    let lastDayOfTheMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
    );

    if(this.events)
      this.events.forEach((item, index) => {
        if(item.starts.getTime() >= firstDayOfTheMonth.getTime() && item.ends.getTime() < lastDayOfTheMonth.getTime()) {
          document.getElementById("calendar-day-" + item.starts.getDate()).classList.add('hasEvents');
        }
      });
  }

  setToday(){
    let tmp = new Date();
    tmp.setHours(0,0,0,0);

    let calc: boolean = tmp.getMonth() + "" + tmp.getFullYear() != this.currentDate.getMonth() + "" + this.currentDate.getFullYear();

    this.currentDate = tmp;
    this.onChange.emit(this.currentDate);

    calc && this.calc();
  }

  /**
   * Recalculates the rows and columns needed to represent the new month selected
   */
  calc(){
    /* Resets the rows */
    this.rows = [];

    let tmp = new Date(this.currentDate.getTime()); tmp.setDate(1);

    while(tmp.getMonth() == this.currentDate.getMonth()){
      /* Pushes a new empty row */
      this.rows.push(['', '', '', '', '', '', '']);
      while(tmp.getDay() < 6 && tmp.getMonth() == this.currentDate.getMonth()){
        /* Populates the row only where needed */
        this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
        tmp.setDate(tmp.getDate() + 1);
      }
      if(tmp.getMonth() == this.currentDate.getMonth())
        this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
      tmp.setDate(tmp.getDate() + 1);
    }

    setTimeout(() => {
      this.setClassesOnEventDays();
    });
  }

  /**
   * Function fired when a date is clicked
   * (no need to call this.calc() because the user can't click a date on a different month)
   * @param date number The day that was clicked
   */
  dateClicked(date){
    let clickedDate = new Date(this.currentDate);
    clickedDate.setDate(date);

    this.currentDate = clickedDate;
    this.onChange.emit(this.currentDate);
  }

  /**
   * Subtracts a month on currentDate
   */
  previousMonth(){
    let tmp = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        this.currentDate.getDate()
    );

    /* Prevents skipping a month if the previous month doesn't have the selected day */
    /* Ex: Mar 31st -> Feb 28th (because Feb doesn't have a 31st) */
    while(tmp.getMonth() > this.currentDate.getMonth() - 1 && tmp.getFullYear() == this.currentDate.getFullYear()) {
      tmp.setDate(tmp.getDate() - 1);
    }

    this.currentDate = tmp;
    this.onChange.emit(this.currentDate);

    this.calc();
  }

  /**
   * Adds a month on currentDate
   */
  nextMonth(){
    let tmp = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        this.currentDate.getDate()
    );

    /* Prevents skipping a month if the next month doesn't have the selected day */
    /* Ex: Jan 31st -> Feb 28th (because Feb doesn't have a 31st) */
    while(tmp.getMonth() > this.currentDate.getMonth() + 1) {
      tmp.setDate(tmp.getDate() - 1);
    }

    this.currentDate = tmp;
    this.onChange.emit(this.currentDate);

    this.calc();
  }
}
