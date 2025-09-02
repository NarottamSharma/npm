import { AccessibilityTestOptions } from '../types';

export class AccessibilityTester {
  static async testAccessibility(element: HTMLElement, options?: AccessibilityTestOptions): Promise<any[]> {
    // This would typically use axe-core or similar accessibility testing library
    const violations: any[] = [];
    
    // Basic accessibility checks
    const checks = [
      () => this.checkForAltText(element),
      () => this.checkForAriaLabels(element),
      () => this.checkColorContrast(element),
      () => this.checkKeyboardNavigation(element),
      () => this.checkHeadingStructure(element)
    ];
    
    for (const check of checks) {
      try {
        const result = await check();
        if (result) violations.push(result);
      } catch (error: any) {
        violations.push({
          rule: 'accessibility-check-error',
          impact: 'serious',
          message: error?.message || 'Unknown error'
        });
      }
    }
    
    return violations;
  }
  
  private static checkForAltText(element: HTMLElement): any | null {
    const images = element.querySelectorAll('img');
    for (const img of Array.from(images)) {
      if (!img.getAttribute('alt') && !img.getAttribute('aria-label')) {
        return {
          rule: 'image-alt',
          impact: 'serious',
          message: 'Images must have alternative text',
          element: img
        };
      }
    }
    return null;
  }
  
  private static checkForAriaLabels(element: HTMLElement): any | null {
    const interactive = element.querySelectorAll('button, input, select, textarea, [role="button"]');
    for (const el of Array.from(interactive)) {
      const hasLabel = el.getAttribute('aria-label') || 
                      el.getAttribute('aria-labelledby') ||
                      el.textContent?.trim();
      
      if (!hasLabel) {
        return {
          rule: 'aria-label',
          impact: 'serious',
          message: 'Interactive elements must have accessible names',
          element: el
        };
      }
    }
    return null;
  }
  
  private static checkColorContrast(element: HTMLElement): any | null {
    // Simplified color contrast check - in practice, you'd use a more sophisticated algorithm
    const computedStyle = window.getComputedStyle(element);
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;
    
    // This is a simplified check - real implementation would calculate actual contrast ratios
    if (color === backgroundColor) {
      return {
        rule: 'color-contrast',
        impact: 'serious',
        message: 'Insufficient color contrast',
        element
      };
    }
    
    return null;
  }
  
  private static checkKeyboardNavigation(element: HTMLElement): any | null {
    const focusable = element.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    for (const el of Array.from(focusable)) {
      const tabIndex = el.getAttribute('tabindex');
      if (tabIndex && parseInt(tabIndex) > 0) {
        return {
          rule: 'tabindex',
          impact: 'moderate',
          message: 'Avoid positive tabindex values',
          element: el
        };
      }
    }
    return null;
  }
  
  private static checkHeadingStructure(element: HTMLElement): any | null {
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let lastLevel = 0;
    
    for (const heading of Array.from(headings)) {
      const level = parseInt(heading.tagName.charAt(1));
      if (level > lastLevel + 1) {
        return {
          rule: 'heading-order',
          impact: 'moderate',
          message: 'Heading levels should not skip levels',
          element: heading
        };
      }
      lastLevel = level;
    }
    
    return null;
  }
}

export function testAccessibility(element: HTMLElement, options?: AccessibilityTestOptions): Promise<any[]> {
  return AccessibilityTester.testAccessibility(element, options);
}
