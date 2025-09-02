export class ComponentAssertions {
  static toBeInDocument(element: Element | null): void {
    if (!element || !document.body.contains(element)) {
      throw new Error('Expected element to be in the document');
    }
  }
  
  static toBeVisible(element: Element | null): void {
    if (!element) {
      throw new Error('Expected element to exist');
    }
    
    const style = window.getComputedStyle(element);
    const isVisible = style.display !== 'none' && 
                     style.visibility !== 'hidden' && 
                     style.opacity !== '0';
    
    if (!isVisible) {
      throw new Error('Expected element to be visible');
    }
  }
  
  static toHaveTextContent(element: Element | null, text: string): void {
    if (!element) {
      throw new Error('Expected element to exist');
    }
    
    const textContent = element.textContent || '';
    if (!textContent.includes(text)) {
      throw new Error('Expected element to have text content ' + text + ', but got ' + textContent);
    }
  }
  
  static toHaveAttribute(element: Element | null, attr: string, value?: string): void {
    if (!element) {
      throw new Error('Expected element to exist');
    }
    
    if (!element.hasAttribute(attr)) {
      throw new Error('Expected element to have attribute ' + attr);
    }
    
    if (value !== undefined) {
      const actualValue = element.getAttribute(attr);
      if (actualValue !== value) {
        throw new Error('Expected attribute ' + attr + ' to have value ' + value + ', but got ' + actualValue);
      }
    }
  }
  
  static toHaveClass(element: Element | null, className: string): void {
    if (!element) {
      throw new Error('Expected element to exist');
    }
    
    if (!element.classList.contains(className)) {
      throw new Error('Expected element to have class ' + className);
    }
  }
  
  static toHaveStyle(element: Element | null, styles: Record<string, any>): void {
    if (!element) {
      throw new Error('Expected element to exist');
    }
    
    const computedStyle = window.getComputedStyle(element);
    
    for (const [property, expectedValue] of Object.entries(styles)) {
      const actualValue = computedStyle.getPropertyValue(property);
      if (actualValue !== expectedValue.toString()) {
        throw new Error('Expected element to have style ' + property + ': ' + expectedValue + ', but got ' + actualValue);
      }
    }
  }
  
  static toBeDisabled(element: Element | null): void {
    if (!element) {
      throw new Error('Expected element to exist');
    }
    
    const isDisabled = (element as HTMLElement).hasAttribute('disabled') ||
                      (element as HTMLElement).getAttribute('aria-disabled') === 'true';
    
    if (!isDisabled) {
      throw new Error('Expected element to be disabled');
    }
  }
  
  static toBeEnabled(element: Element | null): void {
    if (!element) {
      throw new Error('Expected element to exist');
    }
    
    const isDisabled = (element as HTMLElement).hasAttribute('disabled') ||
                      (element as HTMLElement).getAttribute('aria-disabled') === 'true';
    
    if (isDisabled) {
      throw new Error('Expected element to be enabled');
    }
  }
  
  static toHaveFocus(element: Element | null): void {
    if (!element) {
      throw new Error('Expected element to exist');
    }
    
    if (document.activeElement !== element) {
      throw new Error('Expected element to have focus');
    }
  }
  
  static toBeChecked(element: Element | null): void {
    if (!element) {
      throw new Error('Expected element to exist');
    }
    
    const input = element as HTMLInputElement;
    if (input.type !== 'checkbox' && input.type !== 'radio') {
      throw new Error('Expected element to be a checkbox or radio input');
    }
    
    if (!input.checked) {
      throw new Error('Expected element to be checked');
    }
  }
  
  static toHaveValue(element: Element | null, value: any): void {
    if (!element) {
      throw new Error('Expected element to exist');
    }
    
    const input = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    
    if (input.value !== value.toString()) {
      throw new Error('Expected element to have value ' + value + ', but got ' + input.value);
    }
  }
}

// Create matcher functions that can be used with expect.extend()
export const customMatchers = {
  toBeInDocument(received: Element | null) {
    try {
      ComponentAssertions.toBeInDocument(received);
      return { pass: true, message: () => 'Expected element not to be in document' };
    } catch (error: any) {
      return { pass: false, message: () => error.message };
    }
  },
  
  toBeVisible(received: Element | null) {
    try {
      ComponentAssertions.toBeVisible(received);
      return { pass: true, message: () => 'Expected element not to be visible' };
    } catch (error: any) {
      return { pass: false, message: () => error.message };
    }
  },
  
  toHaveTextContent(received: Element | null, text: string) {
    try {
      ComponentAssertions.toHaveTextContent(received, text);
      return { pass: true, message: () => 'Expected element not to have text content ' + text };
    } catch (error: any) {
      return { pass: false, message: () => error.message };
    }
  },
  
  toHaveAttribute(received: Element | null, attr: string, value?: string) {
    try {
      ComponentAssertions.toHaveAttribute(received, attr, value);
      return { pass: true, message: () => 'Expected element not to have attribute ' + attr };
    } catch (error: any) {
      return { pass: false, message: () => error.message };
    }
  },
  
  toHaveClass(received: Element | null, className: string) {
    try {
      ComponentAssertions.toHaveClass(received, className);
      return { pass: true, message: () => 'Expected element not to have class ' + className };
    } catch (error: any) {
      return { pass: false, message: () => error.message };
    }
  },
  
  toHaveStyle(received: Element | null, styles: Record<string, any>) {
    try {
      ComponentAssertions.toHaveStyle(received, styles);
      return { pass: true, message: () => 'Expected element not to have specified styles' };
    } catch (error: any) {
      return { pass: false, message: () => error.message };
    }
  }
};
