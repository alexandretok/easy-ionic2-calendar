#### A Simple Calendar for your Ionic 2 App

Instalattion process:

* Copy the components folder to your project.
* Add `import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';` to your app.module.ts.
* Add `schemas: [CUSTOM_ELEMENTS_SCHEMA]` after the providers (also on app.module.ts).
* Add `<ion-calendar (onChange)="onChange($event)" [currentDate]="date"></ion-calendar>` in your view.
* Add the `onChange(event)` function to your controller.
