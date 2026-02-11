import { Component, signal } from '@angular/core';
import { CurrencyPipe, JsonPipe } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-ts-features-demo',
  imports: [CurrencyPipe, JsonPipe],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>TypeScript Features in Angular Templates</h2>
      </div>
      <p class="demo-description">
        These examples use real template syntax from the custom Angular build in the tarballs.
      </p>

      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 1. @let Object Destructuring</h3>
        @if (selectedProduct(); as product) {
          @let { name, price, category } = product;
          <div class="code-row">
            <span class="label">Name:</span>
            <span class="result">{{ name }}</span>
          </div>
          <div class="code-row">
            <span class="label">Price:</span>
            <span class="result">{{ price | currency }}</span>
          </div>
          <div class="code-row">
            <span class="label">Category:</span>
            <span class="result">{{ category }}</span>
          </div>
        }
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 2. @let Array Destructuring</h3>
        @let [firstProduct, ...restProducts] = products();
        <div class="code-row">
          <span class="label">First:</span>
          <span class="result">{{ firstProduct?.name ?? 'none' }}</span>
        </div>
        <div class="code-row">
          <span class="label">Rest count:</span>
          <span class="result">{{ restProducts.length }}</span>
        </div>
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 3. @for Destructuring</h3>
        @for ({ name, price } of products(); track $index) {
          <div class="code-row compact">
            <span class="label">{{ name }}:</span>
            <span class="result">{{ price | currency }}</span>
          </div>
        }
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 4. Number and BigInt Literals</h3>
        <div class="code-row">
          <span class="label">Hex (0x1FF):</span>
          <span class="result">{{ 0x1FF }}</span>
        </div>
        <div class="code-row">
          <span class="label">Binary (0b1100):</span>
          <span class="result">{{ 0b1100 }}</span>
        </div>
        <div class="code-row">
          <span class="label">Numeric separators (0xFF_FF):</span>
          <span class="result">{{ 0xFF_FF }}</span>
        </div>
        <div class="code-row">
          <span class="label">BigInt (9007199254740991n):</span>
          <span class="result">{{ 9007199254740991n }}</span>
        </div>
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 5. Computed Property Names</h3>
        @let dynamicKey = 'price';
        <div class="code-row">
          <span class="label">{['price']: 42}:</span>
          <span class="result">{{ {['price']: 42} | json }}</span>
        </div>
        <div class="code-row">
          <span class="label">{[dynamicKey]: 42}:</span>
          <span class="result">{{ {[dynamicKey]: 42} | json }}</span>
        </div>
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 6. Arrow Function Params</h3>
        @let nums = [10, 20, 30];
        <div class="code-row">
          <span class="label">Rest params:</span>
          <span class="result">{{ nums.reduce((...args) => args[0] + args[1]) }}</span>
        </div>
        <div class="code-row">
          <span class="label">Destructuring:</span>
          <span class="result">{{ (({a, b}: any) => a + b)({a: 10, b: 20}) }}</span>
        </div>
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 7. Block Comments</h3>
        <div class="code-row">
          <span class="label">5 + 3 (with comment):</span>
          <span class="result">{{ 5 /* stripped */ + 3 }}</span>
        </div>
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 8. Braced Unicode Escapes</h3>
        <div class="code-row">
          <span class="label">\\u{4f60}:</span>
          <span class="result">{{ '\\u{4f60}' }}</span>
        </div>
        <div class="code-row">
          <span class="label">\\u{1F600}:</span>
          <span class="result">{{ '\\u{1F600}' }}</span>
        </div>
      </div>

      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 9. Pipes in Event Handlers</h3>
        <p class="note">Pipes now work inside event bindings and arrow bodies.</p>
        <div class="event-demo">
          <input class="demo-input" placeholder="Type here..."
                 (input)="pipeInputValue.set(($any($event.target)).value.toUpperCase())" />
          <div class="code-row">
            <span class="label">Input value (uppercased):</span>
            <span class="result">{{ pipeInputValue() }}</span>
          </div>
        </div>
      </div>

      <div class="products-section">
        <h3>Select a Product</h3>
        <p class="products-note">Click a product to update the destructuring demo above.</p>
        @for ({ id, name, price, category } of products(); track $implicit_ref.id) {
          <div class="product-card" [class.selected]="id === selectedProduct()?.id">
            <span class="product-name">{{ name }}</span>
            <span class="product-price">{{ price | currency }}</span>
            <span class="product-category">{{ category }}</span>
            <button (click)="selectProduct(id)">Select</button>
          </div>
        }
        <button class="add-btn" (click)="addProduct()">+ Add Product</button>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      max-width: 900px; margin: 0 auto; padding: 32px 32px 64px;
    }
    .demo-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap;
    }
    .demo-header h2 {
      font-size: 28px; font-weight: 700; color: var(--adev-text); margin: 0;
    }
    .demo-description {
      color: var(--adev-text-secondary); font-size: 15px; line-height: 1.7; margin-bottom: 24px;
    }
    .feat-badge {
      display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.5px;
      background: linear-gradient(135deg, var(--adev-gradient-start), var(--adev-gradient-end));
      color: #0f0f11; padding: 2px 6px; border-radius: 4px; vertical-align: middle;
      margin-right: 4px;
    }
    .example-section {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      border-left: 3px solid var(--adev-info);
      padding: 20px; margin: 20px 0; border-radius: 8px;
    }
    h3 { color: var(--adev-text); margin-top: 0; font-size: 16px; font-weight: 600; }
    .code-row {
      display: flex; align-items: center; gap: 12px;
      background: var(--adev-surface-2); padding: 10px 12px; border-radius: 6px;
      margin: 8px 0; font-size: 14px;
    }
    .code-row.compact { padding: 6px 12px; margin: 4px 0; }
    .label { color: var(--adev-text-secondary); font-weight: 500; min-width: 120px; }
    .result { font-weight: 600; color: var(--adev-primary); }
    .note {
      background: rgba(74, 222, 128, 0.08); border-left: 3px solid var(--adev-success);
      padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary);
    }
    .products-section { margin-top: 24px; }
    .products-note {
      font-size: 13px; color: var(--adev-text-tertiary); font-style: italic; margin-bottom: 12px;
    }
    .product-card {
      display: flex; align-items: center; gap: 12px;
      background: var(--adev-surface-2); padding: 10px 12px; border-radius: 6px;
      margin: 6px 0; border: 1px solid var(--adev-border-subtle);
    }
    .product-card.selected { border-color: var(--adev-primary); background: rgba(240, 160, 200, 0.06); }
    .product-name { font-weight: 600; min-width: 100px; color: var(--adev-text); }
    .product-price { color: var(--adev-success); min-width: 80px; }
    .product-category { color: var(--adev-text-secondary); font-size: 13px; flex: 1; }
    .product-card button {
      background: var(--adev-accent); color: white; border: none;
      padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;
    }
    .product-card button:hover { opacity: 0.85; }
    .add-btn {
      background: var(--adev-surface-2); color: var(--adev-text-secondary);
      border: 2px dashed var(--adev-border);
      padding: 8px 16px; border-radius: 6px; cursor: pointer;
      font-size: 13px; width: 100%; margin-top: 8px;
    }
    .add-btn:hover { background: var(--adev-surface-3); }
    .event-demo { margin: 12px 0; }
    .demo-input {
      padding: 8px 12px; border: 1px solid var(--adev-border); border-radius: 6px;
      font-size: 14px; width: 300px; margin-bottom: 8px;
      background: var(--adev-surface-2); color: var(--adev-text);
    }
    .demo-input:focus { border-color: var(--adev-primary); outline: none; }
  `],
})
export class TsFeaturesDemoComponent {
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Keyboard', price: 75, category: 'Accessories' },
    { id: 3, name: 'Monitor', price: 299, category: 'Electronics' },
  ]);

  selectedProduct = signal<Product | null>(null);
  pipeInputValue = signal('');

  selectProduct(id: number) {
    const product = this.products().find(p => p.id === id) ?? null;
    this.selectedProduct.set(product);
  }

  addProduct() {
    const newId = Math.max(...this.products().map(p => p.id)) + 1;
    this.products.update(list => [
      ...list,
      { id: newId, name: `Product ${newId}`, price: Math.floor(Math.random() * 500) + 50, category: 'New' },
    ]);
  }

  ngOnInit() {
    this.selectedProduct.set(this.products()[0]);
  }
}
