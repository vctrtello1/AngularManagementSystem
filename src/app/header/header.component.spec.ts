import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

/**
 * El encabezado.
 *
 * El `should create` acá no es de adorno: este componente se dibujaba a sí mismo y ese
 * test fue el único que lo cazó (`RangeError: Maximum call stack size exceeded`). Por eso
 * sigue primero.
 */
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** El HTML ya renderizado del componente. */
  function raiz(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const logo = raiz().querySelector<HTMLImageElement>('#logo img');

    expect(logo?.getAttribute('src')).toBe('logo.png');
    expect(logo?.getAttribute('alt')).toBeTruthy();
  });

  it('should render the two links and the logout button', () => {
    const enlaces = Array.from(raiz().querySelectorAll('nav a')).map((a) =>
      a.textContent?.trim(),
    );

    expect(enlaces).toEqual(['Home', 'Management']);
    expect(raiz().querySelector('nav button')?.textContent).toContain('Logout');
  });
});
