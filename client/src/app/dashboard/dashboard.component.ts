import { Component } from '@angular/core';
import { TopCards } from './topcards.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TopCards],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
