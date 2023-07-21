import { describe, expect, test, vi } from "vitest";
import { Observer } from '../src/index';

describe('Observer', () => {
  test('can be constructed', () => {
    const obs = new Observer();
    expect(obs).toBeDefined();
  })

  test('calls callback onNotify', () => {
    const mockCallback = vi.fn();
    const observer = new Observer(mockCallback);
    observer.onNotify({}, 'destroyed');
    expect(mockCallback).toHaveBeenCalledOnce();
  });
});
