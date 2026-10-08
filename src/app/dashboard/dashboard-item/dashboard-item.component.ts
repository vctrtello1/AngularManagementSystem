import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  templateUrl: './dashboard-item.component.html',
})
export class DashboardItemComponent {
  @Input({ required: true }) image: { src: string; alt: string } = { src: '', alt: '' };
  @Input({ required: true }) title: string = '';
}
