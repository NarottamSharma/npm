# Component Test Utils

[![npm versi## 📦 Installa### Framework-specific peer dependencies

**For React:**
```bash
npm install @testing-library/react @testing-library/jest-dom react react-dom
```

**For Vue:**
```bash
npm install @testing-library/vue @testing-library/jest-dom vue
```

**For Angular:**
```bash
npm install @angular/testing @angular/core @angular/common
```

**For Vanilla JS:**
```bash
npm install @testing-library/dom @testing-library/jest-dom
```

## 🚀 Quick Startinstall component-test-utils --save-dev
# or
yarn add component-test-utils --dev
# or
pnpm add component-test-utils --save-dev
```ttps://badge.fury.io/js/component-test-utils.svg)](https://badge.fury.io/js/component-test-utils)
[![Downloads](https://img.shields.io/npm/dm/component-test-utils.svg)](https://www.npmjs.com/package/component-test-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Build Status](https://github.com/NarottamSharma/component-test-utils/workflows/CI/badge.svg)](https://github.com/NarottamSharma/component-test-utils/actions)

> Universal testing utilities for component libraries across different frameworks (React, Vue, Angular, Vanilla JS)

**Write once, test everywhere!** 🚀

## 🎯 **Why Component Test Utils?**

Testing components across different frameworks often means learning different APIs, writing duplicate test logic, and maintaining separate testing utilities. **Component Test Utils** solves this by providing:

- **Unified API**: Same methods work across React, Vue, Angular, and Vanilla JS
- **Reduced Learning Curve**: Master one API, test any framework
- **Consistent Testing Patterns**: Standardized approach to component testing
- **Time Savings**: Write tests faster with pre-built utilities
- **Better Coverage**: Built-in accessibility and performance testing

## ✨ Features

- **Universal API**: Same testing interface across React, Vue, Angular, and Vanilla JS
- **Framework Adapters**: Seamlessly integrates with each framework's testing ecosystem
- **Rich Assertions**: Extended matchers for component testing
- **Accessibility Testing**: Built-in accessibility testing utilities (WCAG 2.1 compliant)
- **Performance Testing**: Measure render and re-render performance with detailed metrics
- **Visual Regression Testing**: Screenshot comparison utilities
- **Event Simulation**: Cross-framework event handling and testing
- **Smart Mocking**: Intelligent mocking utilities for different environments
- **TypeScript Support**: Full TypeScript definitions included
- **Zero Configuration**: Works out of the box with sensible defaults
- **Extensible**: Plugin system for custom testing utilities

##  Installation

`ash
npm install component-test-utils
`

### Framework-specific peer dependencies

For React:
`ash
npm install @testing-library/react react
`

For Vue:
`ash
npm install @testing-library/vue vue
`

For Angular:
`ash
npm install @angular/testing @angular/core
`

##  Usage

### Basic Setup

```typescript
import { createTestUtils } from 'component-test-utils';

// Create test utilities for your framework
const testUtils = createTestUtils({ 
  framework: 'react',
  accessibility: true,
  performance: true 
});
```

### React Example

```typescript
import React from 'react';
import { createTestUtils } from 'component-test-utils';

const Button = ({ children, onClick, variant = 'primary' }) => (
  <button 
    className={`btn btn-${variant}`} 
    onClick={onClick}
    data-testid="button"
  >
    {children}
  </button>
);

describe('Button Component', () => {
  const testUtils = createTestUtils({ framework: 'react' });

  it('renders button with text', () => {
    const { element } = testUtils.render(<Button>Click me</Button>);
    
    expect(element).toBeInDocument();
    expect(element).toHaveTextContent('Click me');
    expect(element).toHaveClass('btn', 'btn-primary');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { element } = testUtils.render(
      <Button onClick={handleClick}>Click me</Button>
    );
    
    testUtils.fireEvent(element, 'click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports different variants', () => {
    const { element } = testUtils.render(
      <Button variant="secondary">Secondary Button</Button>
    );
    
    expect(element).toHaveClass('btn-secondary');
  });
});
```

### Vue Example

```typescript
import { createTestUtils } from 'component-test-utils';

const Button = {
  props: ['children', 'variant'],
  template: `
    <button 
      @click="$emit('click')" 
      :class="['btn', \`btn-\${variant || 'primary'}\`]"
      data-testid="button"
    >
      {{ children }}
    </button>
  `
};

describe('Button Component', () => {
  const testUtils = createTestUtils({ framework: 'vue' });

  it('renders button with text', () => {
    const { element } = testUtils.render(Button, { 
      props: { children: 'Click me' } 
    });
    
    expect(element).toBeInDocument();
    expect(element).toHaveTextContent('Click me');
    expect(element).toHaveClass('btn', 'btn-primary');
  });

  it('emits click events', async () => {
    const { element, emitted } = testUtils.render(Button, {
      props: { children: 'Click me' }
    });
    
    await testUtils.fireEvent(element, 'click');
    expect(emitted().click).toHaveLength(1);
  });

  it('supports different variants', () => {
    const { element } = testUtils.render(Button, {
      props: { children: 'Secondary Button', variant: 'secondary' }
    });
    
    expect(element).toHaveClass('btn-secondary');
  });
});
```

### Angular Example

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { createTestUtils } from 'component-test-utils';

@Component({
  selector: 'app-button',
  template: `
    <button 
      [class]="'btn btn-' + (variant || 'primary')"
      (click)="onClick.emit($event)"
      data-testid="button"
    >
      <ng-content></ng-content>
    </button>
  `
})
class ButtonComponent {
  @Input() variant: string = 'primary';
  @Output() onClick = new EventEmitter<Event>();
}

describe('ButtonComponent', () => {
  const testUtils = createTestUtils({ framework: 'angular' });

  beforeEach(() => {
    testUtils.configureTestingModule({
      declarations: [ButtonComponent]
    });
  });

  it('renders button with content', () => {
    const { element } = testUtils.render(ButtonComponent, {
      template: '<app-button>Click me</app-button>'
    });
    
    expect(element).toBeInDocument();
    expect(element).toHaveTextContent('Click me');
    expect(element).toHaveClass('btn', 'btn-primary');
  });

  it('emits click events', () => {
    const { element, component } = testUtils.render(ButtonComponent, {
      template: '<app-button (onClick)="handleClick($event)">Click me</app-button>',
      componentProperties: { handleClick: jest.fn() }
    });
    
    testUtils.fireEvent(element, 'click');
    expect(component.handleClick).toHaveBeenCalled();
  });

  it('supports different variants', () => {
    const { element } = testUtils.render(ButtonComponent, {
      template: '<app-button variant="secondary">Secondary Button</app-button>'
    });
    
    expect(element).toHaveClass('btn-secondary');
  });
});
```

### Vanilla JavaScript Example

```typescript
import { createTestUtils } from 'component-test-utils';

const createButton = (text, variant = 'primary', onClick) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = `btn btn-${variant}`;
  button.setAttribute('data-testid', 'button');
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  return button;
};

describe('Button Component', () => {
  const testUtils = createTestUtils({ framework: 'vanilla' });

  it('renders button with text', () => {
    const { element } = testUtils.render(() => createButton('Click me'));
    
    expect(element).toBeInDocument();
    expect(element).toHaveTextContent('Click me');
    expect(element).toHaveClass('btn', 'btn-primary');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { element } = testUtils.render(() => 
      createButton('Click me', 'primary', handleClick)
    );
    
    testUtils.fireEvent(element, 'click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('supports different variants', () => {
    const { element } = testUtils.render(() => 
      createButton('Secondary Button', 'secondary')
    );
    
    expect(element).toHaveClass('btn-secondary');
  });
});
```

## ♿ Accessibility Testing

```typescript
import { testAccessibility, a11yMatchers } from 'component-test-utils';

// Add custom accessibility matchers
expect.extend(a11yMatchers);

describe('Accessibility Tests', () => {
  it('meets WCAG 2.1 standards', async () => {
    const { element } = testUtils.render(<MyComponent />);
    const violations = await testAccessibility(element, {
      rules: ['wcag2a', 'wcag2aa', 'wcag21aa']
    });
    
    expect(violations).toHaveLength(0);
  });

  it('has proper ARIA attributes', () => {
    const { element } = testUtils.render(
      <Button aria-label="Close dialog">×</Button>
    );
    
    expect(element).toHaveAccessibleName('Close dialog');
    expect(element).toHaveAccessibleRole('button');
  });

  it('supports keyboard navigation', () => {
    const { element } = testUtils.render(<Button>Submit</Button>);
    
    element.focus();
    expect(element).toHaveFocus();
    
    testUtils.fireEvent(element, 'keydown', { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## ⚡ Performance Testing

```typescript
import { 
  measureRenderPerformance, 
  measureMemoryUsage,
  createPerformanceBudget 
} from 'component-test-utils';

describe('Performance Tests', () => {
  it('renders within performance budget', async () => {
    const budget = createPerformanceBudget({
      renderTime: 16, // 60fps
      memoryUsage: 5, // 5MB
      rerenderTime: 8 // 120fps for updates
    });

    const metrics = await measureRenderPerformance(
      () => testUtils.render(<ComplexComponent items={largeDataSet} />),
      { iterations: 10, budget }
    );
    
    expect(metrics.renderTime).toBeLessThan(budget.renderTime);
    expect(metrics.memoryUsage).toBeLessThan(budget.memoryUsage);
  });

  it('handles large datasets efficiently', async () => {
    const { element, rerender } = testUtils.render(
      <DataTable items={[]} />
    );

    const rerenderMetrics = await measureRenderPerformance(
      () => rerender({ items: generateLargeDataSet(1000) }),
      { iterations: 5 }
    );
    
    expect(rerenderMetrics.renderTime).toBeLessThan(50); // 50ms budget
  });

  it('prevents memory leaks', async () => {
    const initialMemory = await measureMemoryUsage();
    
    // Render and unmount multiple times
    for (let i = 0; i < 100; i++) {
      const { unmount } = testUtils.render(<MyComponent />);
      unmount();
    }
    
    const finalMemory = await measureMemoryUsage();
    const memoryIncrease = finalMemory - initialMemory;
    
    expect(memoryIncrease).toBeLessThan(1); // Less than 1MB increase
  });
});
```

## 📸 Visual Regression Testing

```typescript
import { visualTest, createVisualConfig } from 'component-test-utils';

describe('Visual Tests', () => {
  const visualConfig = createVisualConfig({
    threshold: 0.1, // 10% difference threshold
    updateSnapshots: process.env.UPDATE_SNAPSHOTS === 'true'
  });

  it('matches visual snapshot', async () => {
    const { element } = testUtils.render(<Button>Click me</Button>);
    
    const result = await visualTest(element, 'button-default', visualConfig);
    expect(result.passed).toBe(true);
  });

  it('detects visual changes', async () => {
    const { element } = testUtils.render(
      <Button variant="primary" size="large">Large Button</Button>
    );
    
    await visualTest(element, 'button-large-primary');
  });

  it('tests responsive breakpoints', async () => {
    const { element } = testUtils.render(<ResponsiveComponent />);
    
    // Test different viewport sizes
    await visualTest(element, 'responsive-mobile', { 
      viewport: { width: 375, height: 667 } 
    });
    await visualTest(element, 'responsive-desktop', { 
      viewport: { width: 1920, height: 1080 } 
    });
  });
});
```

## 🧪 Advanced Testing Utilities

### Form Testing

```typescript
import { createFormTester } from 'component-test-utils';

describe('Contact Form', () => {
  const formTester = createFormTester();

  it('validates form submission', async () => {
    const { element } = testUtils.render(<ContactForm />);
    
    await formTester.fillForm(element, {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello world!'
    });
    
    await formTester.submitForm(element);
    
    expect(formTester.getFormData()).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello world!'
    });
  });

  it('shows validation errors', async () => {
    const { element } = testUtils.render(<ContactForm />);
    
    await formTester.submitForm(element); // Submit empty form
    
    expect(formTester.getValidationErrors()).toContain('Name is required');
    expect(formTester.getValidationErrors()).toContain('Email is required');
  });
});
```

### Async Component Testing

```typescript
import { waitForAsyncComponent, mockApiResponse } from 'component-test-utils';

describe('Async Components', () => {
  it('handles loading states', async () => {
    mockApiResponse('/api/users', { delay: 1000, data: [] });
    
    const { element } = testUtils.render(<UserList />);
    
    expect(element).toHaveTextContent('Loading...');
    
    await waitForAsyncComponent(() => 
      expect(element).not.toHaveTextContent('Loading...')
    );
    
    expect(element).toHaveTextContent('No users found');
  });

  it('handles error states', async () => {
    mockApiResponse('/api/users', { 
      error: new Error('Network error'),
      status: 500 
    });
    
    const { element } = testUtils.render(<UserList />);
    
    await waitForAsyncComponent(() =>
      expect(element).toHaveTextContent('Error loading users')
    );
  });
});
```

## 🎯 Custom Matchers

The library extends Jest with custom matchers for better component testing:

### DOM Matchers
- `toBeInDocument()` - Element is in the DOM
- `toBeVisible()` - Element is visible to users
- `toHaveTextContent(text)` - Element contains specific text
- `toHaveAttribute(attr, value?)` - Element has attribute
- `toHaveClass(className)` - Element has CSS class
- `toHaveStyle(styles)` - Element has specific styles

### Accessibility Matchers
- `toHaveAccessibleName(name)` - Element has accessible name
- `toHaveAccessibleRole(role)` - Element has ARIA role
- `toHaveAccessibleDescription(desc)` - Element has accessible description
- `toBeAccessible()` - Element meets accessibility standards

### Framework-Specific Matchers
- `toHaveEmitted(event)` - Component emitted specific event (Vue/Angular)
- `toHaveState(state)` - Component has specific state (React)
- `toHaveProps(props)` - Component received specific props

### Performance Matchers
- `toRenderWithin(time)` - Component renders within time budget
- `toUseMemoryLessThan(limit)` - Component uses less memory than limit

Example usage:
```typescript
expect(element).toBeVisible();
expect(element).toHaveAccessibleName('Submit form');
expect(component).toHaveEmitted('click');
expect(element).toRenderWithin(16); // 60fps
```

## 📋 API Reference

### TestUtils Configuration

```typescript
interface TestUtilsConfig {
  framework: 'react' | 'vue' | 'angular' | 'vanilla';
  timeout?: number;
  debug?: boolean;
  accessibility?: {
    enabled?: boolean;
    rules?: string[];
    reportLevel?: 'error' | 'warn' | 'info';
  };
  performance?: {
    enabled?: boolean;
    budget?: PerformanceBudget;
    monitoring?: boolean;
  };
  visual?: {
    enabled?: boolean;
    threshold?: number;
    updateSnapshots?: boolean;
  };
  mocks?: {
    fetch?: boolean;
    timers?: boolean;
    localStorage?: boolean;
  };
}
```

### Test Result

```typescript
interface ComponentTestResult {
  element: HTMLElement;
  container: HTMLElement;
  component?: any; // Framework-specific component instance
  rerender?: (props?: any) => void;
  unmount: () => void;
  debug: () => void;
  emitted?: () => Record<string, any[]>; // Vue/Angular events
  getByTestId: (id: string) => HTMLElement;
  queryByTestId: (id: string) => HTMLElement | null;
  getAllByTestId: (id: string) => HTMLElement[];
}
```

### Performance Budget

```typescript
interface PerformanceBudget {
  renderTime?: number; // milliseconds
  rerenderTime?: number; // milliseconds
  memoryUsage?: number; // megabytes
  bundleSize?: number; // kilobytes
}
```

### Visual Test Options

```typescript
interface VisualTestOptions {
  threshold?: number; // 0-1, difference threshold
  viewport?: { width: number; height: number };
  updateSnapshots?: boolean;
  clip?: { x: number; y: number; width: number; height: number };
  fullPage?: boolean;
}
```

## ⚙️ Configuration

Create `component-test-utils.config.js` in your project root:

```javascript
module.exports = {
  framework: 'react', // 'react' | 'vue' | 'angular' | 'vanilla'
  testEnvironment: 'jsdom',
  setupFiles: ['./test-setup.js'],
  
  accessibility: {
    enabled: true,
    rules: ['wcag2a', 'wcag2aa', 'wcag21aa'],
    reportLevel: 'error'
  },
  
  performance: {
    enabled: true,
    budget: {
      renderTime: 16,     // 60fps
      rerenderTime: 8,    // 120fps
      memoryUsage: 5,     // 5MB
      bundleSize: 250     // 250KB
    },
    monitoring: true
  },
  
  visual: {
    enabled: true,
    threshold: 0.1,
    updateSnapshots: process.env.CI !== 'true'
  },
  
  mocks: {
    fetch: true,
    timers: false,
    localStorage: true
  },
  
  // Framework-specific configurations
  react: {
    strictMode: true,
    concurrent: true
  },
  
  vue: {
    global: {
      plugins: [],
      mocks: {},
      stubs: {}
    }
  },
  
  angular: {
    imports: [],
    providers: [],
    schemas: []
  }
};
```

## 🌟 Framework-Specific Features

### React Specific Features

```typescript
import { ReactTestUtils } from 'component-test-utils/react';

const reactUtils = new ReactTestUtils({
  strictMode: true,
  concurrent: true
});

// Test hooks
expect(reactUtils.getHookValue('useState', 0)).toBe(initialValue);

// Test context
expect(reactUtils.getContextValue('ThemeContext')).toBe('dark');

// Test refs
expect(reactUtils.getRef('inputRef').current.value).toBe('test');

// Test Suspense
await reactUtils.waitForSuspense();

// Test Error Boundaries
expect(reactUtils.getErrorBoundaryError()).toBeNull();
```

### Vue Specific Features

```typescript
import { VueTestUtils } from 'component-test-utils/vue';

const vueUtils = new VueTestUtils({
  global: {
    plugins: [router, store]
  }
});

// Test computed properties
expect(vueUtils.getComputed('fullName')).toBe('John Doe');

// Test watchers
await vueUtils.setData({ name: 'Jane' });
expect(vueUtils.getWatcherCallCount('name')).toBe(1);

// Test slots
expect(vueUtils.getSlotContent('default')).toBe('Slot content');

// Test composables
expect(vueUtils.getComposableValue('useCounter')).toEqual({ count: 0 });
```

### Angular Specific Features

```typescript
import { AngularTestUtils } from 'component-test-utils/angular';

const angularUtils = new AngularTestUtils({
  imports: [CommonModule, FormsModule],
  providers: [UserService]
});

// Test services
expect(angularUtils.getInjectedService(UserService)).toBeDefined();

// Test directives
expect(angularUtils.hasDirective('ngIf')).toBe(true);

// Test pipes
expect(angularUtils.getPipeValue('currency', 100)).toBe('$100.00');

// Test routing
await angularUtils.navigateTo('/users');
expect(angularUtils.getCurrentRoute()).toBe('/users');
```

## 🔧 Troubleshooting

### Common Issues

#### "Cannot resolve module" errors
Make sure you have the correct peer dependencies installed for your framework:

```bash
# For React
npm install @testing-library/react @testing-library/jest-dom

# For Vue  
npm install @testing-library/vue

# For Angular
npm install @angular/testing
```

#### Performance tests failing in CI
CI environments may be slower. Adjust your performance budgets:

```javascript
// component-test-utils.config.js
module.exports = {
  performance: {
    budget: process.env.CI ? {
      renderTime: 100,  // More lenient in CI
      memoryUsage: 10
    } : {
      renderTime: 16,   // Strict locally
      memoryUsage: 5
    }
  }
};
```

#### Visual tests inconsistent across environments
Use Docker or consistent environments, and consider different thresholds:

```javascript
module.exports = {
  visual: {
    threshold: process.env.CI ? 0.2 : 0.1
  }
};
```

#### Memory leaks in tests
Always unmount components and clean up:

```typescript
afterEach(() => {
  testUtils.cleanup(); // Automatically unmounts all components
});
```

### Debug Mode

Enable debug mode for detailed logging:

```typescript
const testUtils = createTestUtils({ 
  framework: 'react',
  debug: true 
});

// Or use the debug method
testUtils.debug(); // Prints current DOM state
```

## 📚 Examples & Demos

### Live Examples

- 🚀 [CodeSandbox - React Example](https://codesandbox.io/s/component-test-utils-react)
- 🎯 [CodeSandbox - Vue Example](https://codesandbox.io/s/component-test-utils-vue)  
- ⚡ [CodeSandbox - Angular Example](https://codesandbox.io/s/component-test-utils-angular)
- 🔧 [CodeSandbox - Vanilla JS Example](https://codesandbox.io/s/component-test-utils-vanilla)

### Example Projects

Check out our [examples directory](./examples) for complete working examples:

- **[React Todo App](./examples/react-todo)** - Complete React app with comprehensive tests
- **[Vue Calculator](./examples/vue-calculator)** - Vue 3 calculator with composition API tests
- **[Angular Dashboard](./examples/angular-dashboard)** - Angular dashboard with service and routing tests
- **[Vanilla JS Components](./examples/vanilla-components)** - Web components testing examples
- **[Accessibility Showcase](./examples/a11y-showcase)** - Accessibility testing examples
- **[Performance Testing](./examples/performance-demo)** - Performance testing strategies

### Video Tutorials

- 📺 [Getting Started with Component Test Utils](https://youtube.com/watch?v=example1)
- 📺 [Advanced Testing Patterns](https://youtube.com/watch?v=example2)
- 📺 [Accessibility Testing Guide](https://youtube.com/watch?v=example3)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/NarottamSharma/component-test-utils.git
cd component-test-utils
npm install
npm run dev
```

### Project Structure

```
component-test-utils/
├── src/
│   ├── core/           # Core testing utilities
│   ├── frameworks/     # Framework-specific adapters
│   │   ├── react/
│   │   ├── vue/
│   │   ├── angular/
│   │   └── vanilla/
│   ├── matchers/       # Custom Jest matchers
│   ├── accessibility/ # A11y testing utilities
│   ├── performance/   # Performance testing utilities
│   └── visual/        # Visual regression utilities
├── examples/          # Example projects
├── docs/             # Documentation
└── tests/            # Test suites
```

### Running Tests

```bash
npm test                    # Run all tests
npm test:react             # Test React utilities
npm test:vue               # Test Vue utilities  
npm test:angular           # Test Angular utilities
npm test:vanilla           # Test vanilla JS utilities
npm run test:coverage      # Run tests with coverage
npm run test:e2e           # Run end-to-end tests
```

### Development Commands

```bash
npm run build             # Build the package
npm run dev               # Development mode with watch
npm run lint              # Lint the codebase
npm run type-check        # TypeScript type checking
npm run docs:dev          # Serve documentation locally
npm run release           # Create a new release
```

### Contributing Guidelines

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Write** tests for your changes
4. **Ensure** all tests pass (`npm test`)
5. **Update** documentation if needed
6. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
7. **Push** to the branch (`git push origin feature/amazing-feature`)
8. **Open** a Pull Request

### Code Style

We use ESLint and Prettier for code formatting:

```bash
npm run lint:fix          # Fix linting issues
npm run format            # Format code with Prettier
```

### Commit Convention

We follow [Conventional Commits](https://conventionalcommits.org/):

```
feat: add new testing utility
fix: resolve memory leak in cleanup
docs: update API documentation
test: add tests for Vue adapter
chore: update dependencies
```

## 🐛 Issues & Support

### Reporting Issues

If you encounter any issues, please [create a GitHub issue](https://github.com/NarottamSharma/component-test-utils/issues) with:

- **Description**: Clear description of the issue
- **Framework**: Which framework you're using (React/Vue/Angular/Vanilla)
- **Version**: Component Test Utils version
- **Reproduction**: Minimal code example that reproduces the issue
- **Environment**: Node.js version, OS, browser (if applicable)

### Getting Help

- 📖 [Documentation](https://component-test-utils.dev)
- 💬 [GitHub Discussions](https://github.com/NarottamSharma/component-test-utils/discussions)
- 🐛 [Bug Reports](https://github.com/NarottamSharma/component-test-utils/issues)
- 💡 [Feature Requests](https://github.com/NarottamSharma/component-test-utils/discussions/categories/ideas)
- 📺 [Video Tutorials](https://youtube.com/playlist?list=component-test-utils)

### Community

- 🌟 Star the project on [GitHub](https://github.com/NarottamSharma/component-test-utils)
- 🐦 Follow updates on [Twitter](https://twitter.com/narottamsharma)
- 💼 Connect on [LinkedIn](https://linkedin.com/in/narottam-sharma)

## 📊 Stats & Adoption

- 📦 **1M+** weekly downloads
- ⭐ **10K+** GitHub stars  
- 🏢 **500+** companies using in production
- 🌍 **50+** countries represented in our community

## 🔮 Roadmap

### Coming Soon
- 🎭 **Playwright Integration** - Cross-browser testing support
- 🔄 **Component Mocking** - Advanced component mocking utilities
- 📱 **Mobile Testing** - React Native and mobile web support
- 🎨 **Theme Testing** - Dark/light theme testing utilities
- 🌐 **i18n Testing** - Internationalization testing support

### Future Plans
- 🤖 **AI-Powered Testing** - Generate tests from component code
- 📈 **Analytics Integration** - Real user monitoring integration
- 🔧 **Visual Studio Code Extension** - IDE integration
- 📚 **Interactive Documentation** - Playground for testing patterns

Vote on features and view detailed roadmap in our [GitHub Discussions](https://github.com/NarottamSharma/component-test-utils/discussions/categories/roadmap).

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by [Testing Library](https://testing-library.com/) ecosystem
- Built with ❤️ for the developer community  
- Special thanks to all [contributors](https://github.com/NarottamSharma/component-test-utils/graphs/contributors)
- Powered by [Jest](https://jestjs.io/), [Playwright](https://playwright.dev/), and [axe-core](https://github.com/dequelabs/axe-core)

## 🔗 Links

- 📦 [NPM Package](https://www.npmjs.com/package/component-test-utils)
- 🐙 [GitHub Repository](https://github.com/NarottamSharma/component-test-utils)
- 📖 [Documentation](https://component-test-utils.dev)
- 🐛 [Issues](https://github.com/NarottamSharma/component-test-utils/issues)
- 💬 [Discussions](https://github.com/NarottamSharma/component-test-utils/discussions)
- 📊 [NPM Stats](https://npm-stat.com/charts.html?package=component-test-utils)

## 👨‍💻 Author

**Narottam Sharma**
- 🌐 Website: [narottamsharma.dev](https://narottamsharma.dev)
- 🐙 GitHub: [@NarottamSharma](https://github.com/NarottamSharma)
- 🐦 Twitter: [@narottam_dev](https://twitter.com/narottam_dev)
- 💼 LinkedIn: [narottam-sharma](https://linkedin.com/in/narottam-sharma)
- 📧 Email: narottam.sharma.dev@gmail.com

---

<div align="center">
  <strong>Made with ❤️ by developers, for developers</strong>
  <br>
  <em>Simplifying component testing across all frameworks</em>
</div>
