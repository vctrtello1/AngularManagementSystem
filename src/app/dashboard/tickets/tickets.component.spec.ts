import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsComponent } from './tickets.component';

/**
 * Los tickets de soporte.
 *
 * Hoy es una tarjeta estática: lo único que se puede comprobar es que estén el título y
 * el lugar donde después va la lista.
 */
describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the pending list placeholder', () => {
    // El título lo pone la tarjeta que lo envuelve, no este componente.
    const raiz = fixture.nativeElement as HTMLElement;

    expect(raiz.querySelector('#status')?.textContent).toContain('Todo...');
  });
});
