import {Component, OnInit} from '@angular/core';
import {Howl, Howler} from "howler";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  sound = new Howl({
    src: ['assets/music/background-music.mp3', "assets/music/peractorum.mp3"]
  });

  constructor() {

  }

  ngOnInit() {
    this.sound.play();

    Howler.volume(0.05);
  }


}
