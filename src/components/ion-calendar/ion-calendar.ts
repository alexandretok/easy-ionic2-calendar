import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ion-calendar',
  templateUrl: 'ion-calendar.html',
})
export class IonCalendarComponent {

  @Input() currentDate: Date = new Date();
  @Input() events: any = [];

  @Output() onChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onEventClicked: EventEmitter<any> = new EventEmitter<any>();

  weekDays: string[] = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
  ];

  rows = [];
  stop = false;
  todayEvents = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    /* If the currentDate was changed outside (in the parent component), we need to call this.calc() */
    /* But only if the month is changed */
    if(changes["currentDate"] && !changes["currentDate"].isFirstChange()) {
      if (changes["currentDate"].currentValue.getMonth() != changes["currentDate"].previousValue.getMonth()) {
        this.calc();
      }
    }

    if(changes["events"] && !changes["events"].isFirstChange()) {
      let listToRemoveClasses: HTMLCollection = document.getElementsByClassName("hasEvents");
      let n: number = listToRemoveClasses.length;

      for(let i=0; i < n; i++)
        listToRemoveClasses[0].classList.remove("hasEvents"); /* Using index zero because the object is updated after we remove an item */

      this.setHasEventsClass();
      this.showTodayEvents();
    }
  }

  ngAfterViewInit(){
    /* Calls `this.calc()` after receiving an initial date */
    this.currentDate.setHours(0, 0, 0, 0);

    setTimeout(() => {
      this.calc();
      this.updateSelectedDate();
    });
  }

  setHasEventsClass(){
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

  setTodayClass() {
    /* Checks if the selected month and year are the current */
    let tmp = new Date();
    if (tmp.getFullYear() == this.currentDate.getFullYear() && tmp.getMonth() == this.currentDate.getMonth()){
      var element = document.getElementById("calendar-day-" + tmp.getDate());
      if (element) {
        element.classList.remove("button-clear", "button-clear-md");
        element.classList.add("button-outline", "button-outline-md");
      }
    }
  }

  setSelectedClass() {
    /* Removes previous selectedDate class */
    let listToRemoveClasses: HTMLCollection = document.getElementsByClassName("selected");
    let n: number = listToRemoveClasses.length;
    for(let i=0; i < n; i++)
      listToRemoveClasses[0].classList.remove("selected"); /* Using index zero because the object is updated after we remove an item */


    var element = document.getElementById("calendar-day-" + this.currentDate.getDate());
    if(element)
      element.classList.add("selected");
  }

  setToday(){
    let tmp = new Date();
    tmp.setHours(0,0,0,0);

    let calc: boolean = tmp.getMonth() + "" + tmp.getFullYear() != this.currentDate.getMonth() + "" + this.currentDate.getFullYear();

    this.updateSelectedDate(tmp);

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
      /* Needs to be executed only after the DOM has been updated */
      this.setHasEventsClass();
      this.setTodayClass();
    });
  }

  /**
   * Function fired when a date is clicked
   * (no need to call this.calc() because the user can't click a date on a different month)
   * @param day number The day that was clicked
   */
  dateClicked(day){
    let clickedDate = new Date(this.currentDate);
    clickedDate.setDate(day);

    this.updateSelectedDate(clickedDate);
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

    this.updateSelectedDate(tmp);

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

    this.updateSelectedDate(tmp);

    this.calc();
  }

  updateSelectedDate(newDate: Date = null){
    if(newDate) {
      this.currentDate = newDate;
    }

    this.onChange.emit(this.currentDate);

    setTimeout(() => {
      this.showTodayEvents();
      this.setSelectedClass();
    });
  }

  showTodayEvents(){
    let tmp = [];

    /* Checks for events on the new selected date */
    this.events.forEach((item) => {
      var itemDay = new Date(item.starts);
      itemDay.setHours(0,0,0,0);

      if(itemDay.getTime() == this.currentDate.getTime())
        tmp.push(item);
    });

    this.todayEvents = tmp;
  }

  eventClicked(event) {
    this.onEventClicked.emit(event);
  }
}
