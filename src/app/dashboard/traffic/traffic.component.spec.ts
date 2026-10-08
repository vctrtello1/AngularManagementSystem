import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficComponent } from './traffic.component';

/**
 * La gráfica de tráfico.
 *
 * Las barras no están escritas a mano: las arma el `@for` a partir de los datos. Así que
 * acá se comprueba que haya **una por día** y que la más alta ocupe el 100%, que es lo
 * que dice el cálculo del alto.
 */
describe('TrafficComponent', () => {
  let component: TrafficComponent;
  let fixture: ComponentFixture<TrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** Las barras ya renderizadas. */
  function barras(): HTMLElement[] {
    return Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('#chart div'),
    );
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw one bar per day', () => {
    expect(barras().length).toBe(component.dummyTrafficData.length);
  });

  it('should size each bar against the busiest day', () => {
    const alturas = barras().map((barra) => barra.style.height);

    expect(alturas.every((altura) => altura.endsWith('%'))).toBeTrue();
    expect(alturas).toContain('100%');
  });
});
