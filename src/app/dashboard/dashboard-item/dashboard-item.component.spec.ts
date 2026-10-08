import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardItemComponent } from './dashboard-item.component';

/**
 * La tarjeta reutilizable.
 *
 * Recibe el título y la imagen por `@Input` y dibuja el contenido que le pasen con
 * `<ng-content />`. Acá se comprueba lo primero: que pinte lo que recibe.
 */
describe('DashboardItemComponent', () => {
  let component: DashboardItemComponent;
  let fixture: ComponentFixture<DashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title and the image it receives', () => {
    component.title = 'Server Status';
    component.image = { src: 'status.png', alt: 'A signal symbol' };
    fixture.detectChanges();

    const raiz = fixture.nativeElement as HTMLElement;
    const imagen = raiz.querySelector<HTMLImageElement>('img');

    expect(raiz.querySelector('h2')?.textContent).toContain('Server Status');
    expect(imagen?.getAttribute('src')).toBe('status.png');
    expect(imagen?.getAttribute('alt')).toBe('A signal symbol');
  });
});
