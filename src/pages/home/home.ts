import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Date = new Date();

  eventos: any = [
    {
      starts: new Date(2017, 1, 2, 8, 30),
      ends: new Date(2017, 1, 2, 12),
      title: 'Meeting with Gates',
      description: ''
    },
    {
      starts: new Date(2017, 2, 3, 9, 45),
      ends: new Date(2017, 2, 3, 12),
      title: 'Lunch with Zuckerberg',
      description: ''
    }
  ];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  onChange(event) {
    console.log("data selecionada:", event);
  }

  evento(event){
    console.log("evento clicado", event);
    let starts = new Date(event.starts);
    let alert = this.alertCtrl.create({
      title: 'Event clicked!',
      subTitle: '<br>The following event was clicked: ',
      message: event.title + "<br>" + starts.toISOString().slice(0, 10) + "<br>Starts at: " + ("0" + starts.getHours()).slice(-2) + ":" + ("0" + starts.getMinutes()).slice(-2),
      buttons: ['OK']
    });
    alert.present();
  }

}
