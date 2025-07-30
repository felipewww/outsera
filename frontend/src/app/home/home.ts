import { Component } from '@angular/core';
import {ListMultipleWinners} from './list-multiple-winners/list-multiple-winners';
import {TopStudios} from './top-studios/top-studios';
import {ProducersTopIntervals} from './producers-top-intervals/producers-top-intervals';
import {WinnersList} from './winners-list/winners-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ListMultipleWinners,
    TopStudios,
    ProducersTopIntervals,
    WinnersList
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
