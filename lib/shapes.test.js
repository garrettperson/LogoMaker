const {Circle, Square, Triangle} = require("./shapes")

// Circle 
describe('Circle', () => {
    test('renders circle correctly', () => {
      const shape = new Circle("blue");
      expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="blue"/>`);
    });
  });
  
  // Square 
  describe('Square', () => {
      test('renders correctly', () => {
        const shape = new Square("green");
        expect(shape.render()).toEqual(`<rect x="50" height="200" width="200" fill="green"/>`);
      });
    });
  
    // Triangle 
  describe('Triangle', () => {
      test('renders correctly', () => {
        const shape = new Triangle("red");
        expect(shape.render()).toEqual(`<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="red"/>`);
      });
    });