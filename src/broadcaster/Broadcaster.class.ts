import { IObserver } from "../observer/IObserver.interface";
import { BroadcastEvents } from "./BroadcastEvents.type";

/**
 * Broadcaster to notify an {@link IObserver} of events.
 *
 * Broadcasters can subscribe one or more {@link Observer | Observers}
 * and notify all subscribed observers.
 * ```ts
 * const broadcaster = new Broadcaster();
 * broadcaster.subscribe(observer1, observer2);
 * broadcaster.notify('entity1', 'created');
 * ```
 * 
 * Here strings are used as both the EntityType and EventsType to simplify
 * the example, but complex types are supported.
 * 
 * @typeParam EntityType - the type of entities that will trigger events sent by this Broadcaster.
 * @typeParam EventsType - the type of events that will be sent by this Broadcaster.
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
