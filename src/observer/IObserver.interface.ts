import { BroadcastEvents } from "../broadcaster/BroadcastEvents.type";
import { Broadcaster } from "../broadcaster/Broadcaster.class";

/**
 * Interface for Observers.
 *
 * Must be implemented in order to be notified by a broadcaster.
 */
export interface IObserver<EntityType, EventsType extends string> {
  onNotify(
    entity: EntityType | Broadcaster<EntityType, EventsType>,
    event: BroadcastEvents | EventsType,
  ): void;
}
