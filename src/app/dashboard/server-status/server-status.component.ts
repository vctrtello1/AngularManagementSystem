import { Component } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  templateUrl: './server-status.component.html',
})
export class ServerStatusComponent {
  currentStatus = 'online';
}
