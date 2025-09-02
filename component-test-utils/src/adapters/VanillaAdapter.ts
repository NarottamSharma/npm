import { ComponentAdapter, ComponentTestResult, EventOptions } from '../types';

export class VanillaAdapter implements ComponentAdapter {
  private container: HTMLElement | null = null;

  constructor() {
    // Don't create container immediately - wait until render() is called
    // This allows the adapter to be instantiated in Node.js environments
  }

  private ensureContainer(): HTMLElement {
    if (!this.container) {
      if (typeof document === 'undefined') {
        throw new Error('VanillaAdapter requires a DOM environment. Make sure you are running in a browser or have jsdom configured.');
      }
      this.container = document.createElement('div');
      this.container.setAttribute('data-testid', 'test-container');
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  render(component: any, props?: any): ComponentTestResult {
    // Ensure container is created
    const container = this.ensureContainer();
    
    // For vanilla JS, component can be:
    // 1. A function that returns an HTMLElement
    // 2. An HTMLElement directly
    // 3. A string of HTML
    
    let element: HTMLElement;
    
    if (typeof component === 'function') {
      element = component(props);
    } else if (component instanceof HTMLElement) {
      element = component;
    } else if (typeof component === 'string') {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = component;
      element = wrapper.firstElementChild as HTMLElement;
    } else {
      throw new Error('Invalid component type for vanilla adapter');
    }
    
    container.innerHTML = '';
    container.appendChild(element);
    
    return {
      element,
      container: container,
      rerender: (newProps?: any) => {
        if (typeof component === 'function') {
          const newElement = component(newProps);
          container.innerHTML = '';
          container.appendChild(newElement);
        }
      },
      unmount: () => {
        container.innerHTML = '';
      },
      debug: () => {
        console.log(container.innerHTML);
      }
    };
  }

  cleanup(): void {
    if (this.container) {
      this.container.innerHTML = '';
      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
      this.container = null;
    }
  }

  fireEvent(element: any, eventType: string, options?: EventOptions): void {
    const event = new Event(eventType, {
      bubbles: options?.bubbles || true,
      cancelable: options?.cancelable || true,
      ...options
    });
    
    element.dispatchEvent(event);
  }

  async waitFor(callback: () => void | Promise<void>, options?: { timeout?: number }): Promise<void> {
    const timeout = options?.timeout || 5000;
    const startTime = Date.now();
    
    return new Promise((resolve, reject) => {
      const check = async () => {
        try {
          await callback();
          resolve();
        } catch (error) {
          if (Date.now() - startTime > timeout) {
            reject(new Error('waitFor timed out after ' + timeout + 'ms'));
          } else {
            setTimeout(check, 100);
          }
        }
      };
      check();
    });
  }
}
