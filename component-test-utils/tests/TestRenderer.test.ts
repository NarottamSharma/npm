import { createTestUtils } from '../src/core/TestRenderer';

describe('TestRenderer', () => {
  describe('React Framework', () => {
    it('should create a React test renderer', () => {
      const testUtils = createTestUtils({ framework: 'react' });
      expect(testUtils).toBeDefined();
    });
  });

  describe('Vue Framework', () => {
    it('should create a Vue test renderer', () => {
      const testUtils = createTestUtils({ framework: 'vue' });
      expect(testUtils).toBeDefined();
    });
  });

  describe('Angular Framework', () => {
    it('should create an Angular test renderer', () => {
      const testUtils = createTestUtils({ framework: 'angular' });
      expect(testUtils).toBeDefined();
    });
  });

  describe('Vanilla Framework', () => {
    it('should create a Vanilla JS test renderer', () => {
      const testUtils = createTestUtils({ framework: 'vanilla' });
      expect(testUtils).toBeDefined();
    });

    it('should render a simple HTML component', () => {
      const testUtils = createTestUtils({ framework: 'vanilla' });
      
      const component = () => {
        const div = document.createElement('div');
        div.textContent = 'Hello World';
        div.className = 'test-component';
        return div;
      };

      const result = testUtils.render(component);
      
      expect(result.element).toBeInDocument();
      expect(result.element).toHaveTextContent('Hello World');
      expect(result.element).toHaveClass('test-component');
      
      result.unmount();
    });
  });

  describe('Error Handling', () => {
    it('should throw error for unsupported framework', () => {
      expect(() => {
        createTestUtils({ framework: 'unsupported' as any });
      }).toThrow('Unsupported framework: unsupported');
    });
  });
});
