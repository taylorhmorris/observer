import { BroadcastEvents } from "../broadcaster/BroadcastEvents.type";
import { IObserver } from "./IObserver.interface";

/**
 * A simple observer which can be used to subscribe to one or more {@link Broadcaster | Broadcasters}.
 *
 * Observers can be created with a callback function that will be called when a notification is received.
 * ```ts
 * const callback = (entity, event) => { console.log(`${entity}: ${event}`) };
 * const observer = new Observer(callback);
 * ```
 *
 * @typeParam EntityType - the type of entities that will trigger events sent by {@link Broadcaster | Broadcasters}.
 * @typeParam EventsType - the type of events that can be received by this Observer.
 */
export class Observer<EntityType, EventsType extends string>
  implements IObserver<EntityType, EventsType>
{
  callback: (entity: EntityType, event: BroadcastEvents | EventsType) => void;

  /**
   *
   * @param callback a function to handle notifications
   */
  constructor(
    callback?: (
      entity: EntityType,
      event: BroadcastEvents | EventsType,
    ) => void,
  ) {
    if (!callback) callback = () => {};
    this.callback = callback;
  }

  /**
   * Method called by {@link Broadcaster}s when event occurs.
   * @param entity the entity which triggered the event
   * @param event the event type
   */
  onNotify(entity: EntityType, event: BroadcastEvents | EventsType) {
    this.callback(entity, event);
  }
}
