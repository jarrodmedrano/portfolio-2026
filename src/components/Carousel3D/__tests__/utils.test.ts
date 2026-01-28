import { describe, it, expect } from 'vitest';
import { getCardTransform } from '../utils';

describe('getCardTransform', () => {
  it('should return active state for index 0', () => {
    const transform = getCardTransform(0, 0, 5);
    expect(transform.rotateY).toBe(0);
    expect(transform.scale).toBe(1);
    expect(transform.opacity).toBe(1);
    expect(transform.isGoldenRect).toBe(true);
    expect(transform.zIndex).toBe(5);
  });

  it('should return near state for index 1', () => {
    const transform = getCardTransform(1, 0, 5);
    expect(transform.rotateY).toBe(72);
    expect(transform.scale).toBe(0.7);
    expect(transform.opacity).toBe(0.7);
    expect(transform.isGoldenRect).toBe(false);
    expect(transform.zIndex).toBe(4);
  });

  it('should handle wrapping (card 4 relative to active 0)', () => {
    const transform = getCardTransform(4, 0, 5);
    expect(transform.rotateY).toBe(-72);
    expect(transform.scale).toBe(0.7);
  });

  it('should return far state for index 2', () => {
    const transform = getCardTransform(2, 0, 5);
    expect(transform.rotateY).toBe(144);
    expect(transform.scale).toBe(0.5);
    expect(transform.opacity).toBe(0.4);
  });
});
