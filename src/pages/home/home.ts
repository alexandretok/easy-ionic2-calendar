import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Date = new Date();

  eventos: any = [
    {
      starts: new Date(2017, 1, 2),
      ends: new Date(2017, 1, 2, 12),
      title: 'Título',
      description: 'Descrição do evento'
    },
    {
      starts: new Date(2017, 2, 3),
      ends: new Date(2017, 2, 3, 12),
      title: 'Título',
      description: 'Descrição do evento'
    }
  ];

  constructor(public navCtrl: NavController) {

  }

  onChange(event) {
    console.log("data selecionada:", event);
  }

  evento(event){
    console.log("evento clicado", event);
  }

}
