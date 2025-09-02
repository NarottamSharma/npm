import { PerformanceTestOptions } from '../types';

export interface PerformanceMetrics {
  renderTime: number;
  memoryUsage?: number;
  rerenderTime?: number;
  iterations?: number;
}

export class PerformanceTester {
  static async measureRenderPerformance(
    renderFn: () => void | Promise<void>,
    options?: PerformanceTestOptions
  ): Promise<PerformanceMetrics> {
    const iterations = options?.iterations || 1;
    const renderTimes: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      await renderFn();
      const endTime = performance.now();
      renderTimes.push(endTime - startTime);
    }
    
    const averageRenderTime = renderTimes.reduce((sum, time) => sum + time, 0) / renderTimes.length;
    
    const metrics: PerformanceMetrics = {
      renderTime: averageRenderTime,
      iterations
    };
    
    // Add memory usage if available
    if ('memory' in performance) {
      metrics.memoryUsage = (performance as any).memory.usedJSHeapSize;
    }
    
    return metrics;
  }
  
  static async measureRerenderPerformance(
    rerenderFn: () => void | Promise<void>,
    options?: PerformanceTestOptions
  ): Promise<number> {
    const iterations = options?.iterations || 10;
    const rerenderTimes: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      await rerenderFn();
      const endTime = performance.now();
      rerenderTimes.push(endTime - startTime);
    }
    
    return rerenderTimes.reduce((sum, time) => sum + time, 0) / rerenderTimes.length;
  }
  
  static measureMemoryUsage(): number | undefined {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return undefined;
  }
  
  static startPerformanceProfile(label: string): void {
    if (performance.mark) {
      performance.mark(label + '-start');
    }
  }
  
  static endPerformanceProfile(label: string): number | undefined {
    if (performance.mark && performance.measure) {
      performance.mark(label + '-end');
      performance.measure(label, label + '-start', label + '-end');
      
      const entries = performance.getEntriesByName(label);
      if (entries.length > 0) {
        return entries[entries.length - 1].duration;
      }
    }
    return undefined;
  }
  
  static async waitForStablePerformance(
    testFn: () => void | Promise<void>,
    options?: { maxAttempts?: number; threshold?: number }
  ): Promise<void> {
    const maxAttempts = options?.maxAttempts || 10;
    const threshold = options?.threshold || 0.1; // 10% variance
    const measurements: number[] = [];
    
    for (let i = 0; i < maxAttempts; i++) {
      const startTime = performance.now();
      await testFn();
      const endTime = performance.now();
      measurements.push(endTime - startTime);
      
      if (measurements.length >= 3) {
        const recent = measurements.slice(-3);
        const avg = recent.reduce((sum, val) => sum + val, 0) / recent.length;
        const variance = recent.every(val => Math.abs(val - avg) / avg < threshold);
        
        if (variance) {
          return; // Performance is stable
        }
      }
    }
    
    console.warn('Performance did not stabilize within maximum attempts');
  }
}

export function measureRenderPerformance(
  renderFn: () => void | Promise<void>,
  options?: PerformanceTestOptions
): Promise<PerformanceMetrics> {
  return PerformanceTester.measureRenderPerformance(renderFn, options);
}

export function measureRerenderPerformance(
  rerenderFn: () => void | Promise<void>,
  options?: PerformanceTestOptions
): Promise<number> {
  return PerformanceTester.measureRerenderPerformance(rerenderFn, options);
}
