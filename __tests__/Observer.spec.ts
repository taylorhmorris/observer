import { describe, expect, test, vi } from "vitest";
import { Broadcaster, Observer } from "../src/index";

describe("Observer", () => {
  test("can be constructed", () => {
    const obs = new Observer();
    expect(obs).toBeDefined();
  });

  test("calls callback onNotify", () => {
    const mockCallback = vi.fn();
    const observer = new Observer(mockCallback);
    observer.onNotify({}, "destroyed");
    expect(mockCallback).toHaveBeenCalledOnce();
  });

  test("can be subscribes to multiple Broadcasters", () => {
    const mockCallback = vi.fn();
    const observer = new Observer<Set<number>, "borg" | "test">(mockCallback);
    const broadcaster1 = new Broadcaster<Set<number>, "test">();
    const broadcaster2 = new Broadcaster<Set<number>, "borg">();
    broadcaster1.subscribe(observer);
    broadcaster2.subscribe(observer);
    broadcaster1.notify(new Set([5]), "test");
    broadcaster2.notify(new Set([5]), "borg");
    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
});
