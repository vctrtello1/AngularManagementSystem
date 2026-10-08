import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerStatusComponent } from './server-status.component';

/**
 * El estado del servidor.
 *
 * Lo que importa es que los tres casos del `@if` muestren lo suyo y **solo** lo suyo: por
 * eso cada prueba comprueba el mensaje que va y el que no.
 */
describe('ServerStatusComponent', () => {
  let component: ServerStatusComponent;
  let fixture: ComponentFixture<ServerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** El texto ya renderizado. */
  function texto(): string {
    return (fixture.nativeElement as HTMLElement).textContent ?? '';
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the online message when the servers are online', () => {
    expect(texto()).toContain('Servers are online');
    expect(texto()).not.toContain('Servers are offline');
  });

  it('should show the offline message when the servers are offline', () => {
    component.currentStatus = 'offline';
    fixture.detectChanges();

    expect(texto()).toContain('Servers are offline');
    expect(texto()).not.toContain('Servers are online');
  });

  it('should show the unknown message for any other status', () => {
    component.currentStatus = 'algo-raro';
    fixture.detectChanges();

    expect(texto()).toContain('Server status is unknown');
  });
});
