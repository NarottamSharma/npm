import { ComponentAdapter, ComponentTestResult, EventOptions } from '../types';

export class ReactAdapter implements ComponentAdapter {
  private testingLibrary: any;

  constructor() {
    try {
      this.testingLibrary = require('@testing-library/react');
    } catch (error) {
      throw new Error('React Testing Library is required for React components. Please install @testing-library/react');
    }
  }

  render(component: any, props?: any): ComponentTestResult {
    const { render } = this.testingLibrary;
    const result = render(component, props);
    
    return {
      element: result.container.firstChild,
      container: result.container,
      rerender: result.rerender,
      unmount: result.unmount,
      debug: result.debug
    };
  }

  cleanup(): void {
    const { cleanup } = this.testingLibrary;
    cleanup();
  }

  fireEvent(element: any, eventType: string, options?: EventOptions): void {
    const { fireEvent } = this.testingLibrary;
    const eventMethod = fireEvent[eventType];
    
    if (typeof eventMethod === 'function') {
      eventMethod(element, options);
    } else {
      throw new Error('Event type ' + eventType + ' is not supported');
    }
  }

  async waitFor(callback: () => void | Promise<void>, options?: { timeout?: number }): Promise<void> {
    const { waitFor } = this.testingLibrary;
    return waitFor(callback, options);
  }
}
