import { BroadcastEvents } from "../broadcaster/BroadcastEvents.type";
import { IObserver } from "./IObserver.interface";

/**
 * A simple observer which can be used to subscribe to one of more Broadcasters.
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
