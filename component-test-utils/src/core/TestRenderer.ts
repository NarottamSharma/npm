import { TestUtilsConfig, ComponentTestResult, Framework, ComponentAdapter } from '../types';
import { ReactAdapter } from '../adapters/ReactAdapter';
import { VueAdapter } from '../adapters/VueAdapter';
import { AngularAdapter } from '../adapters/AngularAdapter';
import { VanillaAdapter } from '../adapters/VanillaAdapter';

export class TestRenderer {
  private adapter: ComponentAdapter;
  private config: TestUtilsConfig;

  constructor(config: TestUtilsConfig) {
    this.config = config;
    this.adapter = this.createAdapter(config.framework);
  }

  private createAdapter(framework: Framework): ComponentAdapter {
    switch (framework) {
      case 'react':
        return new ReactAdapter();
      case 'vue':
        return new VueAdapter();
      case 'angular':
        return new AngularAdapter();
      case 'vanilla':
        return new VanillaAdapter();
      default:
        throw new Error('Unsupported framework: ' + framework);
    }
  }

  render(component: any, props?: any): ComponentTestResult {
    return this.adapter.render(component, props);
  }

  fireEvent(element: any, eventType: string, options?: any): void {
    return this.adapter.fireEvent(element, eventType, options);
  }

  async waitFor(callback: () => void | Promise<void>, options?: { timeout?: number }): Promise<void> {
    return this.adapter.waitFor(callback, options);
  }

  cleanup(): void {
    return this.adapter.cleanup();
  }
}

export function createTestUtils(config: TestUtilsConfig): TestRenderer {
  return new TestRenderer(config);
}
