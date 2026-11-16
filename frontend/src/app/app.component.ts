import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  menuOpen = false;

  readonly areas = [
    { icon: '✦', tag: 'EMPREGOS', title: 'Oportunidades para você', description: 'Descubra possibilidades de trabalho e novas formas de construir sua autonomia.' },
    { icon: '♡', tag: 'PROTEÇÃO', title: 'Informação que acolhe', description: 'Conheça caminhos para buscar apoio, orientação e proteção.' },
    { icon: '✳', tag: 'AUTONOMIA', title: 'Seu próximo passo', description: 'Aprender e descobrir novos caminhos também é uma forma de liberdade.' },
  ];

  closeMenu(): void { this.menuOpen = false; }
}
