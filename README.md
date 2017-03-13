### An easy calendar for your Ionic 2 App

Demo:

  [Live Demo](https://rawgit.com/alexandretok/easy-ionic2-calendar/master/demo/lab.html)
  
#### How to use:
Place the following in the desired page:

    <ion-calendar
            (onChange)="onChange($event)"
            [events]="myEvents"
            (onEventClicked)="eventClicked($event)"
            [useSwipe]="true"
            [todayText]="Today"
            [showEventsList]="true"
            [disablePastDates]="false"
            [weekDaysToDisable]="[0,6]"
            [inputDate]="myDate">
    </ion-calendar>
    
Read about the options below.


#### Instalattion process:

* Clone the project and copy the ion-calendar folder to your project's components folder (src/components).
* Import the component on your `app.module.ts`:

    ```
    import { IonCalendarComponent } from '../components/ion-calendar/ion-calendar';
    ```
* Insert it on the declarations array:

    ```
    declarations: [
        MyApp,
        HomePage,
        IonCalendarComponent
      ],
    ```

* Add `<ion-calendar></ion-calendar>` in your desired view.
* Set the options and add the callback functions to your controller.

#### Options:

* `(onChange)="yourOnDateChangeCallback($event)"`
  * This callback is triggered everytime the current selected date is changed.
  * It passes the new date as the parameter.
* `(onEventClicked)="yourOnEventClickedCallback($event)"`
  * This callback is triggered everytime an event is clicked (from the list below the calendar).
  * It passes the clicked event as the parameter.
* `[events]="yourEventsArray"`
  * `yourEventsArray` should be an array of objects with the following properties:
    * starts: Date object representing the date and time that the events starts.
    * ends: Date object representing the date and time that the events ends.
    * title: String with the title to be shown in the events list.
* `[showEventsList]="true"`
  * Wheter or not to show the events list on the bottom of the calendar
* [disablePastDates]="false"
  * Wheter or not to show past dates as disabled (disables user click on those dates)
* [weekDaysToDisable]="[0,6]"
  * You can use this to disable certain weekdays, in this example we are disabling Sundays (0) and Saturdays (6). Users will not be able to click these days.
* `[useSwipe]="false"`
  * You can use this to prevent swiping through the months
* `[todayText]="Today"`
  * You can use this to translate the today's button content to other languages
* `[inputDate]="yourDateObject"`
  * Date object you can use to set the initial date or to set the selected date programmatically.
    * When you want to set the selected date programmatically, remember to always create a new reference(a new Date object).
      Example:
                      
      ```
      this.yourDateObject.setDate(5); /* This will NOT work and the view is not going to update correctly */
      
      var tmpDate = new Date();
      tmpDate.setDate(5);
      this.yourDateObject = tmpDate; /* This will work and date will be updated on the calendar view */
      ```
