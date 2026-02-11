import { Component, signal, Input, Pipe } from '@angular/core';
import { JsonPipe } from '@angular/common';

interface Config {
  theme?: string;
  debug?: boolean;
  api?: {
    baseUrl?: string;
    timeout?: number;
    headers?: {
      authorization?: string;
    };
  };
}

@Pipe({ name: 'stringifyNullish', standalone: true })
export class StringifyNullishPipe {
  transform(value: unknown): string {
    return value === null ? 'null' : value === undefined ? 'undefined' : String(value);
  }
}

@Component({
  selector: 'app-legacy-chaining',
  optionalChainingSemantics: 'legacy',
  imports: [StringifyNullishPipe],
  template: `
    <div class="panel legacy">
      <h3>Legacy Component</h3>
      <span class="badge legacy-badge">optionalChainingSemantics: 'legacy'</span>
      <p class="small">a?.b returns null when a is nullish</p>

      <div class="result-row">
        <code>config?.theme</code>
        <span class="value">{{ config()?.theme | stringifyNullish }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.baseUrl</code>
        <span class="value">{{ config()?.api?.baseUrl | stringifyNullish }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.timeout</code>
        <span class="value">{{ config()?.api?.timeout | stringifyNullish }}</span>
      </div>

      <div class="comparison-box">
        <p><strong>Strict equality (legacy):</strong></p>
        <code>config?.api?.timeout === null</code>
        <span class="result-true">{{ config()?.api?.timeout === null }} (returns {{ config()?.api?.timeout | stringifyNullish }})</span>
      </div>
    </div>
  `,
  styles: [`
    .panel { padding: 20px; border-radius: 8px; height: 100%; }
    .legacy { background: var(--adev-surface); border: 1px solid var(--adev-warning); }
    h3 { margin-top: 0; color: var(--adev-text); font-weight: 600; }
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 6px;
      font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace;
    }
    .legacy-badge { background: rgba(251, 191, 36, 0.12); color: #fbbf24; }
    .small { font-size: 13px; color: var(--adev-text-secondary); }
    code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary);
    }
    .result-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 12px; margin: 6px 0; background: var(--adev-surface-2); border-radius: 6px;
    }
    .value { font-weight: 600; color: var(--adev-warning); }
    .comparison-box {
      margin-top: 12px; padding: 10px 14px; background: rgba(248, 113, 113, 0.08);
      border-radius: 6px; border-left: 3px solid var(--adev-error);
    }
    .comparison-box p { color: var(--adev-text-secondary); }
    .comparison-box code { color: var(--adev-error); }
    .result-true { display: block; margin-top: 4px; font-weight: 700; color: var(--adev-success); }
  `],
})
export class LegacyChainingComponent {
  config = signal<Config | null>(null);

  @Input() set configData(value: Config | null) {
    this.config.set(value);
  }
}

@Component({
  selector: 'app-native-chaining',
  optionalChainingSemantics: 'native',
  imports: [StringifyNullishPipe],
  template: `
    <div class="panel native">
      <h3>Native Component</h3>
      <span class="badge native-badge">optionalChainingSemantics: 'native'</span>
      <p class="small">a?.b returns undefined when a is nullish</p>

      <div class="result-row">
        <code>config?.theme</code>
        <span class="value">{{ config()?.theme | stringifyNullish }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.baseUrl</code>
        <span class="value">{{ config()?.api?.baseUrl | stringifyNullish }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.timeout</code>
        <span class="value">{{ config()?.api?.timeout | stringifyNullish }}</span>
      </div>

      <div class="comparison-box">
        <p><strong>Strict equality (native):</strong></p>
        <code>config?.api?.timeout === null</code>
        <span class="result-false">{{ config()?.api?.timeout === null }} (returns {{ config()?.api?.timeout | stringifyNullish }})</span>
      </div>
    </div>
  `,
  styles: [`
    .panel { padding: 20px; border-radius: 8px; height: 100%; }
    .native { background: var(--adev-surface); border: 1px solid var(--adev-info); }
    h3 { margin-top: 0; color: var(--adev-text); font-weight: 600; }
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 6px;
      font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace;
    }
    .native-badge { background: rgba(96, 165, 250, 0.12); color: #60a5fa; }
    .small { font-size: 13px; color: var(--adev-text-secondary); }
    code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary);
    }
    .result-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 12px; margin: 6px 0; background: var(--adev-surface-2); border-radius: 6px;
    }
    .value { font-weight: 600; color: var(--adev-info); }
    .comparison-box {
      margin-top: 12px; padding: 10px 14px; background: rgba(248, 113, 113, 0.08);
      border-radius: 6px; border-left: 3px solid var(--adev-error);
    }
    .comparison-box p { color: var(--adev-text-secondary); }
    .comparison-box code { color: var(--adev-error); }
    .result-false { display: block; margin-top: 4px; font-weight: 700; color: var(--adev-error); }
  `],
})
export class NativeChainingComponent {
  config = signal<Config | null>(null);

  @Input() set configData(value: Config | null) {
    this.config.set(value);
  }
}

@Component({
  selector: 'app-mixed-chaining-demo',
  imports: [LegacyChainingComponent, NativeChainingComponent, JsonPipe],
  template: `
    <div class="demo-container">
      <h2>Mix and Match: Legacy and Native Optional Chaining</h2>
      <p class="description">
        Both components receive the same data but use different optional chaining semantics.
      </p>

      <div class="config-section">
        <h3>tsconfig.json (project-wide)</h3>
        <pre class="config-code">{
  "angularCompilerOptions": {
    "strictOptionalChainingSemantics": true
  }
}</pre>
        <p class="config-note">
          Components can override via optionalChainingSemantics in the decorator.
        </p>
      </div>

      <div class="side-by-side">
        <app-legacy-chaining [configData]="currentConfig()"></app-legacy-chaining>
        <app-native-chaining [configData]="currentConfig()"></app-native-chaining>
      </div>

      <div class="data-controls">
        <h3>Test Data</h3>
        <div class="control-buttons">
          <button (click)="setFullConfig()">Full Config</button>
          <button (click)="setPartialConfig()">Partial Config</button>
          <button (click)="setMinimalConfig()">Minimal Config</button>
          <button class="null-btn" (click)="setNullConfig()">Null Config</button>
        </div>
        <pre class="data-preview">{{ currentConfig() | json }}</pre>
      </div>

      <div class="migration-section">
        <h3>Migration Path</h3>
        <div class="migration-steps">
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <strong>Enable diagnostic warning</strong>
              <p><code>"legacySafeNavigationUsage": "warning"</code></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <strong>Run migration schematic</strong>
              <p><code>ng generate @angular/core:optional-chaining-semantics-migration</code></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <strong>Enable native semantics</strong>
              <p><code>"strictOptionalChainingSemantics": true</code> in tsconfig</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <div>
              <strong>Per-component override</strong>
              <p>Use optionalChainingSemantics to opt back to legacy if needed</p>
            </div>
          </div>
        </div>
      </div>

      <div class="examples-section">
        <h3>Migration Examples</h3>
        <div class="example-row">
          <div class="before"><code>{{ '{{ a?.b }}' }}</code></div>
          <div class="arrow">-></div>
          <div class="after"><code>{{ '{{ a?.b }}' }}</code></div>
          <div class="reason">Interpolation is safe (null and undefined render the same)</div>
        </div>
        <div class="example-row">
          <div class="before"><code>{{ '{{ a?.b === null }}' }}</code></div>
          <div class="arrow">-></div>
          <div class="after"><code>{{ '{{ (a != null ? a.b : null) === null }}' }}</code></div>
          <div class="reason">Strict equality needs a ternary guard</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container { max-width: 900px; margin: 0 auto; padding: 32px 32px 64px; }
    .description { color: var(--adev-text-secondary); line-height: 1.6; }
    code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      padding: 2px 6px; border-radius: 4px; font-size: 13px; color: var(--adev-primary);
    }
    .config-section {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .config-code {
      background: var(--adev-code-bg); color: var(--adev-code-text);
      border: 1px solid var(--adev-code-border);
      padding: 12px; border-radius: 6px; font-size: 13px; overflow-x: auto;
    }
    .config-note { font-size: 13px; color: var(--adev-text-secondary); margin-bottom: 0; }
    .side-by-side {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 16px; margin: 20px 0;
    }
    .data-controls {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .control-buttons { display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0; }
    button {
      background: var(--adev-accent); color: white; border: none;
      padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    button:hover { opacity: 0.85; }
    .null-btn { background: var(--adev-error); }
    .data-preview {
      background: var(--adev-code-bg); color: var(--adev-text-tertiary);
      border: 1px solid var(--adev-code-border);
      padding: 12px; border-radius: 6px; font-size: 12px; max-height: 200px; overflow: auto;
    }
    .migration-section {
      background: rgba(74, 222, 128, 0.06); border: 1px solid rgba(74, 222, 128, 0.2);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .migration-steps { display: flex; flex-direction: column; gap: 12px; }
    .step {
      display: flex; gap: 12px; align-items: flex-start;
      background: var(--adev-surface); padding: 12px; border-radius: 6px;
    }
    .step-num {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: 50%;
      background: var(--adev-success); color: #0f0f11; font-weight: 700; font-size: 14px;
      flex-shrink: 0;
    }
    .step p { margin: 4px 0 0; font-size: 13px; color: var(--adev-text-secondary); }
    .examples-section {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .examples-section h3 { color: var(--adev-text); border-bottom: 1px solid var(--adev-border); padding-bottom: 8px; }
    .example-row {
      display: grid; grid-template-columns: 1fr auto 1fr 1fr;
      gap: 8px; align-items: center;
      background: var(--adev-surface-2); padding: 8px 12px; border-radius: 6px; margin: 6px 0;
      font-size: 13px;
    }
    .example-row .arrow { color: var(--adev-text-tertiary); font-size: 16px; text-align: center; }
    .example-row .before code { color: var(--adev-error); }
    .example-row .after code { color: var(--adev-success); }
    .example-row .reason { color: var(--adev-text-tertiary); font-size: 12px; font-style: italic; }
    @media (max-width: 768px) {
      .side-by-side { grid-template-columns: 1fr; }
      .example-row { grid-template-columns: 1fr; gap: 4px; }
      .example-row .arrow { display: none; }
    }
  `],
})
export class MixedChainingDemoComponent {
  currentConfig = signal<Config | null>(null);

  private fullConfig: Config = {
    theme: 'dark',
    debug: true,
    api: {
      baseUrl: 'https://api.example.com',
      timeout: 5000,
      headers: {
        authorization: 'Bearer token123',
      },
    },
  };

  private partialConfig: Config = {
    theme: 'light',
    api: {
      baseUrl: 'https://api.example.com',
    },
  };

  private minimalConfig: Config = {
    theme: 'auto',
  };

  setFullConfig() {
    this.currentConfig.set(this.fullConfig);
  }

  setPartialConfig() {
    this.currentConfig.set(this.partialConfig);
  }

  setMinimalConfig() {
    this.currentConfig.set(this.minimalConfig);
  }

  setNullConfig() {
    this.currentConfig.set(null);
  }

  ngOnInit() {
    this.setPartialConfig();
  }
}
