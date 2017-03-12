import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Date = new Date();
	weekdays = [];

  eventos: any = [];

  names: string[] = [
      'Bill Gates',
      'Mark Zuckerber',
      'Mark Cuban',
      'Barack Obama',
      'Donald Trump',
      'Putin',
      'your mamma',
      'myself',
      'my girl',
      'Hillary Clinton',
      'Eric Schimdt',
      'Anderson Silva',
      'Marcus Lemonis',
      'Kevin O`leary',
      'nobody',
      'that person',
      'Harry Potter',
      'Vin Diesel',
      'Forrest Gump',
      'Benedict Cucumberbatchy',
      'Iron Man',
      'Charlie Sheen',
      'Elon Musk'
  ];

  useSwipe = true;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  	setTimeout(() => {
  		console.log("disabling mondays...");
  		this.weekdays.push(1);
	  }, 2500);
  }

  fakeEvents(){
    let tmp = [];
    for(let i=0; i < 100; i++) {
      let starts = new Date(this.rand(1483228800000, 1514764800000));
      let dateStr = ("0" + starts.getHours()).slice(-2) + ":" + ("0" + starts.getMinutes()).slice(-2);
      tmp.push({
        starts: starts,
        ends: new Date(starts.getTime() + 60 * 60 * 1000),
        title: dateStr + ' Lunch with ' + this.names[this.rand(0, this.names.length - 1)],
        description: ''
      });
    }

    this.eventos = tmp;
  }

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onChange(event) {
    console.log("date clicked", event);
  }

  evento(event){
    console.log("event clicked", event);

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
