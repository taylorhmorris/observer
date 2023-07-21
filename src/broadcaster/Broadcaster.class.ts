import { IObserver } from "../observer/IObserver.interface";
import { BroadcastEvents } from "./BroadcastEvents.type";

/**
 * Broadcaster to notify an {@link IObserver} of events.
 */
export class Broadcaster<EventsType extends string> {
  /** A set of {@link IObserver}s listening for events */
  #listeners: Set<IObserver<EventsType>>;

  constructor() {
    this.#listeners = new Set();
  }

  /**
   * Subscribe an {@link IObserver} to notifications
   * @param observer the {@link IObserver} to subscribe
   */
  subscribe(observer: IObserver<EventsType>) {
    this.#listeners.add(observer);
  }

  /**
   * Unsubscribe an {@link IObserver} from notifications
   * @param observer the {@link IObserver} to unsubscribe
   */
  unsubscribe(observer: IObserver<EventsType>) {
    this.#listeners.delete(observer);
  }

  /**
   * Notify all subscribers of an event.
   * @param entity the entity which triggered the event
   * @param event the event type
   */
  notify(entity: object, event: BroadcastEvents | EventsType) {
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
