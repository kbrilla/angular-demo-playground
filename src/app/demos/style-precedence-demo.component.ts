import { Component, Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[dirRed]',
  host: { '[style.color]': '"red"', '[style.font-weight]': '"bold"' },
})
export class DirRedDirective {}

@Directive({
  selector: '[dirBlue]',
  host: { '[style.color]': '"blue"', '[style.font-style]': '"italic"' },
})
export class DirBlueDirective {}

@Directive({
  selector: '[dirGreen]',
})
export class DirGreenDirective {
  @HostBinding('style.color') color = 'green';
  @HostBinding('style.text-decoration') decoration = 'underline';
}

@Directive({
  selector: '[dirPurpleBg]',
  host: { '[style.backgroundColor]': '"rgb(230, 200, 255)"', '[style.color]': '"rgb(100, 0, 200)"' },
})
export class DirPurpleBgDirective {}

@Directive({ selector: '[colorHostDir]', standalone: true })
export class ColorHostDirective {
  @HostBinding('style.backgroundColor') color = 'rgb(255, 200, 200)';
}

@Directive({
  selector: '[dirWithHost]',
  hostDirectives: [ColorHostDirective],
})
export class DirWithHostDirective {
  @HostBinding('style.backgroundColor') ownColor = 'rgb(200, 255, 200)';
}

@Component({
  selector: 'styled-box',
  host: {
    '[style.color]': '"purple"',
    '[style.border]': '"2px solid purple"',
    '[style.padding]': '"8px 12px"',
    '[style.display]': '"inline-block"',
    '[style.border-radius]': '"4px"',
  },
  template: `<ng-content />`,
})
export class StyledBoxComponent {}

@Component({
  selector: 'red-first-wrapper',
  imports: [DirRedDirective, DirBlueDirective],
  template: `<div dirRed dirBlue class="live-result"><ng-content /></div>`,
  styles: `.live-result { padding: 10px; font-size: 16px; font-weight: 600; background: rgba(255,255,255,0.03); border-radius: 6px; margin-bottom: 6px; }`,
})
export class RedFirstWrapperComponent {}

@Component({
  selector: 'blue-first-wrapper',
  imports: [DirBlueDirective, DirRedDirective],
  template: `<div dirRed dirBlue class="live-result"><ng-content /></div>`,
  styles: `.live-result { padding: 10px; font-size: 16px; font-weight: 600; background: rgba(255,255,255,0.03); border-radius: 6px; margin-bottom: 6px; }`,
})
export class BlueFirstWrapperComponent {}

@Component({
  selector: 'style-map-vs-host',
  imports: [DirPurpleBgDirective],
  template: `
    <div class="anomaly-grid">
      <div class="anomaly-item">
        <span class="anomaly-label">[style] map only (no directive)</span>
        <div class="anomaly-result" [style]="{'backgroundColor': 'rgb(0, 200, 200)', 'color': 'rgb(200, 0, 200)'}">Cyan bg, Magenta text</div>
      </div>
      <div class="anomaly-item">
        <span class="anomaly-label">dirPurpleBg + [style] map</span>
        <div class="anomaly-result" dirPurpleBg [style]="{'backgroundColor': 'rgb(0, 200, 200)', 'color': 'rgb(200, 0, 200)'}">
          Which background wins?
        </div>
        <span class="anomaly-expected">Expected: template style should win</span>
      </div>
      <div class="anomaly-item">
        <span class="anomaly-label">dirPurpleBg + [style.backgroundColor] individual</span>
        <div class="anomaly-result" dirPurpleBg [style.backgroundColor]="'rgb(0, 200, 200)'" [style.color]="'rgb(200, 0, 200)'">
          Individual always wins
        </div>
        <span class="anomaly-expected">Expected: template wins</span>
      </div>
    </div>
  `,
  styles: `
    .anomaly-grid { display: grid; gap: 10px; }
    .anomaly-item { background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 12px; }
    .anomaly-label { display: block; font-size: 11px; color: var(--adev-text-secondary, #94a3b8); margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
    .anomaly-result { padding: 12px; font-size: 15px; font-weight: 600; border-radius: 6px; margin-bottom: 4px; }
    .anomaly-expected { font-size: 11px; color: var(--adev-text-secondary, #94a3b8); font-style: italic; }
  `,
})
export class StyleMapVsHostComponent {}

@Component({
  selector: 'host-directive-test',
  imports: [DirWithHostDirective],
  template: `
    <div class="anomaly-grid">
      <div class="anomaly-item">
        <span class="anomaly-label">dirWithHost: directive sets green bg, hostDirective sets red bg</span>
        <div class="anomaly-result" dirWithHost style="padding: 12px; color: black; font-weight: 600;">
          Which background wins?
        </div>
        <span class="anomaly-expected">Expected: directive wins</span>
      </div>
    </div>
  `,
  styles: `
    .anomaly-grid { display: grid; gap: 10px; }
    .anomaly-item { background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 12px; }
    .anomaly-label { display: block; font-size: 11px; color: var(--adev-text-secondary, #94a3b8); margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
    .anomaly-result { padding: 12px; font-size: 15px; font-weight: 600; border-radius: 6px; margin-bottom: 4px; }
    .anomaly-expected { font-size: 11px; color: var(--adev-text-secondary, #94a3b8); font-style: italic; }
  `,
})
export class HostDirectiveTestComponent {}

@Component({
  selector: 'app-style-precedence-demo',
  imports: [
    DirRedDirective,
    DirBlueDirective,
    DirGreenDirective,
    DirPurpleBgDirective,
    StyledBoxComponent,
    RedFirstWrapperComponent,
    BlueFirstWrapperComponent,
    StyleMapVsHostComponent,
    HostDirectiveTestComponent,
  ],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Style Binding Precedence Bugs</h2>
        <span class="badge prec-badge">Standalone</span>
      </div>
      <p class="demo-description">
        Live demonstrations of style binding precedence issues in standalone components.
      </p>

      <div class="example-section">
        <h3><span class="feat-badge">BUG</span> [style] Map Loses to Directive Host</h3>
        <p class="desc">Template bindings should beat host bindings, but in standalone components the host can win.</p>
        <style-map-vs-host />
        <div class="anomaly-box">
          Template [style] maps can lose to directive host bindings. Individual [style.prop] still wins.
        </div>
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">BUG</span> imports[] Order Changes the Winner</h3>
        <p class="desc">Both wrappers render the same template, but the imports[] order changes which style wins.</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">imports: [DirRed, DirBlue] -> Blue wins</span>
            <red-first-wrapper>This text shows: Blue wins</red-first-wrapper>
            <span class="live-explain">DirBlue is last in imports[]</span>
          </div>
          <div class="live-box">
            <span class="live-label">imports: [DirBlue, DirRed] -> Red wins</span>
            <blue-first-wrapper>This text shows: Red wins</blue-first-wrapper>
            <span class="live-explain">DirRed is last in imports[]</span>
          </div>
        </div>
        <div class="anomaly-box">
          Reordering imports[] can silently change which styles win.
        </div>
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">BUG</span> CSS Property Name Variants</h3>
        <p class="desc">When both background-color and backgroundColor are set, the last binding wins.</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">[style.background-color] then [style.backgroundColor]</span>
            <div class="live-result" [style.background-color]="'pink'" [style.backgroundColor]="'lightblue'" style="color: black; padding: 10px;">
              Which variant wins?
            </div>
            <span class="live-explain">Last binding wins</span>
          </div>
          <div class="live-box">
            <span class="live-label">[style.backgroundColor] then [style.background-color]</span>
            <div class="live-result" [style.backgroundColor]="'lightblue'" [style.background-color]="'pink'" style="color: black; padding: 10px;">
              Which variant wins?
            </div>
            <span class="live-explain">Swapped order changes the winner</span>
          </div>
        </div>
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">INFO</span> Directive vs hostDirective</h3>
        <p class="desc">A directive's host bindings should beat its hostDirective bindings.</p>
        <host-directive-test />
      </div>
    </div>
  `,
  styles: `
    .demo-container { max-width: 960px; margin: 0 auto; padding: 24px; }
    .demo-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; }
    .demo-header h2 { font-size: 26px; font-weight: 700; margin: 0; }
    .badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .prec-badge { background: rgba(251, 146, 60, 0.12); color: #fb923c; border: 1px solid rgba(251, 146, 60, 0.25); }
    .demo-description { color: var(--adev-text-secondary, #94a3b8); font-size: 14px; line-height: 1.7; margin-bottom: 20px; }
    .example-section { background: var(--adev-surface, #1e293b); border: 1px solid var(--adev-border, #334155); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .example-section h3 { font-size: 16px; font-weight: 600; margin: 0 0 8px 0; display: flex; align-items: center; gap: 8px; }
    .desc { color: var(--adev-text-secondary, #94a3b8); font-size: 13px; margin: 0 0 12px 0; line-height: 1.6; }
    .feat-badge { background: rgba(240, 160, 200, 0.15); color: #f0a0c8; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; }
    code { background: rgba(240, 160, 200, 0.08); color: #f0a0c8; padding: 1px 5px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-size: 12px; }

    .live-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; }
    .live-box { background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 12px; }
    .live-label { display: block; font-size: 11px; color: var(--adev-text-secondary, #94a3b8); margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
    .live-result { padding: 10px; font-size: 16px; font-weight: 600; background: rgba(255,255,255,0.03); border-radius: 6px; margin-bottom: 6px; }
    .live-explain { font-size: 11px; color: var(--adev-text-secondary, #94a3b8); font-style: italic; }

    .anomaly-box { background: rgba(251, 146, 60, 0.08); border: 1px solid rgba(251, 146, 60, 0.3); border-radius: 8px; padding: 12px 16px; margin-top: 12px; font-size: 13px; line-height: 1.6; }

    @media (max-width: 700px) {
      .live-grid { grid-template-columns: 1fr; }
    }
  `,
})
export class StylePrecedenceDemoComponent {}
