import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-overview',
  imports: [MatIconModule, RouterLink],
  template: `
    <div class="overview-page">
      <section class="hero">
        <div class="wip-banner">
          <mat-icon class="wip-icon">construction</mat-icon>
          <div>
            <strong>Work in Progress</strong>
            <p>This playground and the features it shows are under active development.</p>
          </div>
        </div>
        <h1 class="hero-title">Angular Template Upgrades</h1>
        <p class="hero-subtitle">
          A focused playground for template expression upgrades that work in the runtime and compiler.
        </p>
      </section>

      <section class="feature-grid">
        <a class="feature-card" routerLink="/ts-features">
          <div class="card-icon ts"><mat-icon>code</mat-icon></div>
          <h3>TypeScript Template Features</h3>
          <p>Destructuring, BigInt, computed properties, arrow params, block comments, and more.</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Parser</span>
            <span class="tag">Syntax</span>
          </div>
        </a>

        <a class="feature-card" routerLink="/mix-match">
          <div class="card-icon mix"><mat-icon>compare_arrows</mat-icon></div>
          <h3>Optional Chaining and Migration</h3>
          <p>Legacy vs native semantics side by side, plus migration guidance.</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Comparison</span>
            <span class="tag">Migration</span>
          </div>
        </a>

        <a class="feature-card" routerLink="/style-precedence">
          <div class="card-icon sp"><mat-icon>layers</mat-icon></div>
          <h3>Style Binding Bugs</h3>
          <p>Live demos of real style binding precedence issues in standalone components.</p>
          <div class="card-footer">
            <span class="tag accent">BUGS</span>
            <span class="tag">Standalone</span>
            <span class="tag">CSS</span>
          </div>
        </a>
      </section>

      <section class="stats-row">
        <div class="stat-card">
          <span class="stat-value">3</span>
          <span class="stat-label">Feature Demos</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">13+</span>
          <span class="stat-label">Template Features</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">2</span>
          <span class="stat-label">Chaining Modes</span>
        </div>
      </section>
    </div>
  `,
})
export class OverviewComponent {}
