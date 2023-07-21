import { describe, expect, test, vi } from "vitest";
import { Broadcaster, Observer } from '../src/index';

describe('Broadcaster', () => {
  test('can be constructed', () => {
    const broadcaster = new Broadcaster();
    expect(broadcaster).toBeDefined();
  });

  test('can subscribe and notify an observer', () => {
    const broadcaster = new Broadcaster();
    const observer = new Observer();
    const spy = vi.spyOn(observer, 'onNotify');
    broadcaster.subscribe(observer);
    broadcaster.notify(broadcaster, 'destroy');
    expect(spy).toHaveBeenCalledOnce();
  });

  test('can unsubscribe an observer', () => {
    const broadcaster = new Broadcaster();
    const observer = new Observer();
    const spy = vi.spyOn(observer, 'onNotify');
    broadcaster.subscribe(observer);
    broadcaster.unsubscribe(observer);
    broadcaster.notify(broadcaster, 'destroy');
    expect(spy).not.toHaveBeenCalled();
  });
});
