import { ComponentAdapter, ComponentTestResult, EventOptions } from '../types';

export class VueAdapter implements ComponentAdapter {
  private testUtils: any;

  constructor() {
    try {
      this.testUtils = require('@testing-library/vue');
    } catch (error) {
      throw new Error('Vue Testing Library is required for Vue components. Please install @testing-library/vue');
    }
  }

  render(component: any, props?: any): ComponentTestResult {
    const { render } = this.testUtils;
    const result = render(component, { props });
    
    return {
      element: result.container.firstChild,
      container: result.container,
      rerender: (newProps?: any) => result.rerender({ props: newProps }),
      unmount: result.unmount,
      debug: result.debug
    };
  }

  cleanup(): void {
    const { cleanup } = this.testUtils;
    if (cleanup) {
      cleanup();
    }
  }

  fireEvent(element: any, eventType: string, options?: EventOptions): void {
    const { fireEvent } = this.testUtils;
    const eventMethod = fireEvent[eventType];
    
    if (typeof eventMethod === 'function') {
      eventMethod(element, options);
    } else {
      throw new Error('Event type ' + eventType + ' is not supported');
    }
  }

  async waitFor(callback: () => void | Promise<void>, options?: { timeout?: number }): Promise<void> {
    const { waitFor } = this.testUtils;
    return waitFor(callback, options);
  }
}
