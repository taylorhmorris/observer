import { describe, expect, test, vi } from "vitest";
import { Rebroadcaster, Observer, Broadcaster } from "../src/index";

describe("Rebroadcaster", () => {
  test("can be constructed", () => {
    const broadcaster = new Rebroadcaster();
    expect(broadcaster).toBeDefined();
  });

  test("can subscribe and notify an observer", () => {
    const broadcaster = new Rebroadcaster();
    const observer = new Observer();
    const spy = vi.spyOn(observer, "onNotify");
    broadcaster.subscribe(observer);
    broadcaster.notify(broadcaster, "destroy");
    expect(spy).toHaveBeenCalledOnce();
  });

  test("can unsubscribe an observer", () => {
    const broadcaster = new Rebroadcaster();
    const observer = new Observer();
    const spy = vi.spyOn(observer, "onNotify");
    broadcaster.subscribe(observer);
    broadcaster.unsubscribe(observer);
    broadcaster.notify(broadcaster, "destroy");
    expect(spy).not.toHaveBeenCalled();
  });

  test("Notifies listeners when an event is received", () => {
    const broadcaster = new Broadcaster();
    const rebroadcaster = new Rebroadcaster();
    const observer = new Observer();
    const spy = vi.spyOn(observer, "onNotify");
    rebroadcaster.subscribe(observer);
    broadcaster.subscribe(rebroadcaster);
    broadcaster.notify(broadcaster, "destroy");
    expect(spy).toHaveBeenCalledOnce();
  });
});
