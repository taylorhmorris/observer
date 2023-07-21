import { BroadcastEvents } from "../broadcaster/BroadcastEvents.type";

/**
 * Interface for Observers.
 *
 * Must be implemented in order to be notified by a broadcaster.
 */
export interface IObserver<EventsType> {
  onNotify(entity: object, event: BroadcastEvents | EventsType): void;
}
