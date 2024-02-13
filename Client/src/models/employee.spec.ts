import { Employee } from './employee';

describe('Employee', () => {
  it('should create an instance', () => {
    expect(new Employee('John', 'Doe', 'john@example.com', 'password', 123)).toBeTruthy();
  });
});
