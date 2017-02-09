#### A Simple and fast calendar for your Ionic 2 App

Demo:

  [GIF Demo](https://github.com/alexandretok/simple-fast-ionic2-calendar/raw/master/demo.gif)

  [Live Demo](https://rawgit.com/alexandretok/simple-fast-ionic2-calendar/master/demo/lab.html)


Instalattion process:

* Clone the project and copy the components folder to your project's components folder (src/components).
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

* Add `<ion-calendar></ion-calendar>` in your view.
* Add the callback functions to your controller.

* You can set the following callbacks and inputs:
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
  * `[currentDate]="yourDateObject"`
    * Date object you can use to set the selected date programmatically.
      * When you want to set the selected date programmatically, remember to always create a new reference for this variable.
      
        Example:
                        
        ```
        this.yourDateObject = new Date(); /* This will work and date will be updated on the calendar view */
        this.yourDateObject.setDate(5); /* This will NOT work and the view is not going to update correctly */
                        
        var tmpDate = new Date();
        tmpDate.setDate(5);
        this.yourDateObject = tmpDate; /* This will work */
        ```

