# Component Test Utils Examples

## Vanilla JavaScript Example

`javascript
import { createTestUtils } from 'component-test-utils';

// Create a simple button component
const createButton = (text, onClick) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = 'btn btn-primary';
  button.addEventListener('click', onClick);
  return button;
};

// Test the component
describe('Button Component', () => {
  const testUtils = createTestUtils({ framework: 'vanilla' });

  afterEach(() => {
    testUtils.cleanup();
  });

  it('renders button with correct text', () => {
    const handleClick = jest.fn();
    const { element } = testUtils.render(() => createButton('Click me', handleClick));
    
    expect(element).toBeInDocument();
    expect(element).toHaveTextContent('Click me');
    expect(element).toHaveClass('btn');
    expect(element).toHaveClass('btn-primary');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { element } = testUtils.render(() => createButton('Click me', handleClick));
    
    testUtils.fireEvent(element, 'click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is accessible', async () => {
    const { element } = testUtils.render(() => createButton('Click me', () => {}));
    
    // The button has text content, so it should pass accessibility checks
    const violations = await testAccessibility(element);
    expect(violations).toHaveLength(0);
  });
});
`

## Performance Testing Example

`javascript
import { createTestUtils, measureRenderPerformance } from 'component-test-utils';

describe('Performance Tests', () => {
  const testUtils = createTestUtils({ framework: 'vanilla' });

  it('renders within performance budget', async () => {
    const createExpensiveComponent = () => {
      const container = document.createElement('div');
      // Simulate some expensive rendering
      for (let i = 0; i < 1000; i++) {
        const item = document.createElement('div');
        item.textContent = Item ;
        container.appendChild(item);
      }
      return container;
    };

    const metrics = await measureRenderPerformance(
      () => testUtils.render(() => createExpensiveComponent()),
      { iterations: 5 }
    );
    
    console.log('Average render time:', metrics.renderTime, 'ms');
    expect(metrics.renderTime).toBeLessThan(100); // 100ms budget
  });
});
`

## Quick Start

1. Install the package:
   `ash
   npm install component-test-utils
   `

2. Choose your framework and install peer dependencies:
   
   **For Vanilla JS:** No additional dependencies needed!
   
   **For React:**
   `ash
   npm install @testing-library/react react
   `
   
   **For Vue:**
   `ash
   npm install @testing-library/vue vue
   `
   
   **For Angular:**
   `ash
   npm install @angular/testing @angular/core
   `

3. Start testing with the universal API!
