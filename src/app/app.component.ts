import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DashboardItemComponent } from './dashboard/dashboard-item/dashboard-item.component';
import { ServerStatusComponent } from './dashboard/server-status/server-status.component';
import { TrafficComponent } from './dashboard/traffic/traffic.component';
import { TicketsComponent } from './dashboard/tickets/tickets.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    DashboardItemComponent,
    ServerStatusComponent,
    TrafficComponent,
    TicketsComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Lo que cada tarjeta necesita para su encabezado: el titulo y la imagen. Los pide
  // DashboardItemComponent por @Input, asi que los tiene el padre.
  statusItem = { title: 'Server Status', image: { src: 'status.png', alt: 'A signal symbol' } };
  trafficItem = { title: 'Traffic', image: { src: 'globe.png', alt: 'A globe' } };
  ticketsItem = { title: 'Support Tickets', image: { src: 'list.png', alt: 'A list of items' } };
}
