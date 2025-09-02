// Core types for component-test-utils

export type Framework = 'react' | 'vue' | 'angular' | 'vanilla';

export interface TestUtilsConfig {
  framework: Framework;
  timeout?: number;
  debug?: boolean;
  accessibility?: boolean;
  performance?: boolean;
}

export interface ComponentTestResult {
  element: any;
  container: any;
  rerender?: (props?: any) => void;
  unmount: () => void;
  debug: () => void;
}

export interface EventOptions {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
  detail?: any;
  target?: any;
}

export interface AccessibilityTestOptions {
  rules?: string[];
  tags?: string[];
  timeout?: number;
  includedImpacts?: ('minor' | 'moderate' | 'serious' | 'critical')[];
}

export interface PerformanceTestOptions {
  renderTimeout?: number;
  measureRerender?: boolean;
  iterations?: number;
}

export interface Matcher {
  toBeInDocument(): void;
  toBeVisible(): void;
  toHaveTextContent(text: string): void;
  toHaveAttribute(attr: string, value?: string): void;
  toHaveClass(className: string): void;
  toHaveStyle(style: Record<string, any>): void;
  toBeDisabled(): void;
  toBeEnabled(): void;
  toHaveFocus(): void;
  toBeChecked(): void;
  toHaveValue(value: any): void;
}

export interface ComponentAdapter {
  render(component: any, props?: any): ComponentTestResult;
  cleanup(): void;
  fireEvent(element: any, eventType: string, options?: EventOptions): void;
  waitFor(callback: () => void | Promise<void>, options?: { timeout?: number }): Promise<void>;
}
