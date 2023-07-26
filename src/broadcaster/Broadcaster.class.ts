import { IObserver } from "../observer/IObserver.interface";
import { BroadcastEvents } from "./BroadcastEvents.type";

/**
 * Broadcaster to notify an {@link IObserver} of events.
 */
export class Broadcaster<EntityType, EventsType extends string> {
  /** A set of {@link IObserver}s listening for events */
  #listeners: Set<IObserver<EntityType, EventsType>>;

  constructor() {
    this.#listeners = new Set();
  }

  /**
   * Subscribe one or more {@link IObserver}s to notifications
   * @param {...} observers the {@link IObserver}(s) to subscribe
   */
  subscribe(...observers: IObserver<EntityType, EventsType>[]) {
    for (const observer of observers) {
      this.#listeners.add(observer);
    }
  }

  /**
   * Unsubscribe one or more {@link IObserver}s from notifications
   * @param {...} observers the {@link IObserver}(s) to unsubscribe
   */
  unsubscribe(...observers: IObserver<EntityType, EventsType>[]) {
    for (const observer of observers) {
      this.#listeners.delete(observer);
    }
  }

  /**
   * Notify all subscribers of an event.
   * @param entity the entity which triggered the event
   * @param event the event type
   */
  notify(
    entity: EntityType | typeof this,
    event: BroadcastEvents | EventsType,
  ) {
    for (const listener of this.#listeners) {
      listener.onNotify(entity, event);
    }
  }

  /**
   * Notify all subscribers this broadcaster is being destroyed
   * and remove all listeners.
   */
  destroy() {
    this.notify(this, "destroyed");
    this.#listeners.clear();
  }
}
