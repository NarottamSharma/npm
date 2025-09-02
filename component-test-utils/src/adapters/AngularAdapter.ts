import { ComponentAdapter, ComponentTestResult, EventOptions } from '../types';

export class AngularAdapter implements ComponentAdapter {
  private testBed: any;

  constructor() {
    try {
      const { TestBed } = require('@angular/testing');
      this.testBed = TestBed;
    } catch (error) {
      throw new Error('Angular Testing utilities are required for Angular components. Please install @angular/testing');
    }
  }

  render(component: any, props?: any): ComponentTestResult {
    const fixture = this.testBed.createComponent(component);
    
    // Apply props to component instance
    if (props) {
      Object.assign(fixture.componentInstance, props);
    }
    
    fixture.detectChanges();
    
    return {
      element: fixture.nativeElement,
      container: fixture.nativeElement.parentElement || fixture.nativeElement,
      rerender: (newProps?: any) => {
        if (newProps) {
          Object.assign(fixture.componentInstance, newProps);
        }
        fixture.detectChanges();
      },
      unmount: () => {
        fixture.destroy();
      },
      debug: () => {
        console.log(fixture.nativeElement.outerHTML);
      }
    };
  }

  cleanup(): void {
    // TestBed cleanup is usually handled by Angular testing framework
    this.testBed.resetTestingModule();
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
