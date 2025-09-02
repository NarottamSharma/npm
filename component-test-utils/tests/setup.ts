// Jest setup for component-test-utils
import { customMatchers } from '../src/utils/assertions';

// Extend Jest matchers with our custom assertions
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInDocument(): R;
      toBeVisible(): R;
      toHaveTextContent(text: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string): R;
      toHaveStyle(styles: Record<string, any>): R;
    }
  }
}

// Mock DOM environment if not available
if (typeof window === 'undefined') {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost',
    pretendToBeVisual: true,
    resources: 'usable'
  });
  
  global.window = dom.window as any;
  global.document = dom.window.document;
  global.HTMLElement = dom.window.HTMLElement;
  global.Element = dom.window.Element;
}

// Extend Jest with custom matchers
expect.extend(customMatchers);
