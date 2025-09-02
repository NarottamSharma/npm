// Component Test Utils - Universal testing utilities for component libraries
export * from './core/TestRenderer';
export * from './adapters/ReactAdapter';
export * from './adapters/VueAdapter';
export * from './adapters/AngularAdapter';
export * from './adapters/VanillaAdapter';
export * from './utils/accessibility';
export * from './utils/performance';
export * from './utils/assertions';

// Main API
export { createTestUtils } from './core/TestRenderer';
export type { 
  TestUtilsConfig, 
  ComponentTestResult, 
  EventOptions,
  AccessibilityTestOptions,
  PerformanceTestOptions 
} from './types';
