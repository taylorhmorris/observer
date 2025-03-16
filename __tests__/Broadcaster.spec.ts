import { describe, expect, test, vi } from "vitest";
import { Broadcaster, Observer } from "../src/index";

describe("Broadcaster", () => {
  test("can be constructed", () => {
    const broadcaster = new Broadcaster();
    expect(broadcaster).toBeDefined();
  });

  test("can subscribe and notify an observer", () => {
    const broadcaster = new Broadcaster();
    const observer = new Observer();
    const spy = vi.spyOn(observer, "onNotify");
    broadcaster.subscribe(observer);
    broadcaster.notify(broadcaster, "destroy");
    expect(spy).toHaveBeenCalledOnce();
  });

  test("can unsubscribe an observer", () => {
    const broadcaster = new Broadcaster();
    const observer = new Observer();
    const spy = vi.spyOn(observer, "onNotify");
    broadcaster.subscribe(observer);
    broadcaster.unsubscribe(observer);
    broadcaster.notify(broadcaster, "destroy");
    expect(spy).not.toHaveBeenCalled();
  });

  test("can subscribe and notify multiple observers", () => {
    const broadcaster = new Broadcaster();
    const observer = new Observer();
    const observer2 = new Observer();
    const spy = vi.spyOn(observer, "onNotify");
    const spy2 = vi.spyOn(observer2, "onNotify");
    broadcaster.subscribe(observer, observer2);
    broadcaster.notify(broadcaster, "destroy");
    expect(spy).toHaveBeenCalledOnce();
    expect(spy2).toHaveBeenCalledOnce();
  });

  test("can unsubscribe multiple observers", () => {
    const broadcaster = new Broadcaster();
    const observer = new Observer();
    const observer2 = new Observer();
    const spy = vi.spyOn(observer, "onNotify");
    const spy2 = vi.spyOn(observer2, "onNotify");
    broadcaster.subscribe(observer, observer2);
    broadcaster.unsubscribe(observer, observer2);
    broadcaster.notify(broadcaster, "destroy");
    expect(spy).not.toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
  });

  test("can destroy itself", () => {
    const broadcaster = new Broadcaster();
    const observer = new Observer();
    const spy = vi.spyOn(observer, "onNotify");
    broadcaster.subscribe(observer);
    broadcaster.destroy();
    expect(spy).toHaveBeenCalledWith(broadcaster, "destroyed");
  });

  test("destroying itself removes all listeners", () => {
    const broadcaster = new Broadcaster();
    const observer = new Observer();
    const spy = vi.spyOn(observer, "onNotify");
    broadcaster.subscribe(observer);
    broadcaster.destroy();
    expect(spy).toHaveBeenCalledWith(broadcaster, "destroyed");
    broadcaster.notify(broadcaster, "new message");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
