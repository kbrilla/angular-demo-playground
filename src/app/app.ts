import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: string;
  badge?: string;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  sidenavOpened = signal(true);

  navItems: NavItem[] = [
    { id: 'overview', path: '/', label: 'Overview', icon: 'home' },
    { id: 'ts-features', path: '/ts-features', label: 'TS Template Features', icon: 'code', badge: 'NEW' },
    { id: 'mix-match', path: '/mix-match', label: 'Optional Chaining', icon: 'compare_arrows', badge: 'NEW' },
    { id: 'style-precedence', path: '/style-precedence', label: 'Style Binding Bugs', icon: 'layers' },
  ];
}
