import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Date = new Date(2017, 0, 1);

  constructor(public navCtrl: NavController) {

  }

  onChange(event) {
    console.log("data selecionada:", event);
  }

}
