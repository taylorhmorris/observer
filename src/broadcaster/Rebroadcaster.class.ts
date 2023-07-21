import { IObserver } from "../observer/IObserver.interface";
import { BroadcastEvents } from "./BroadcastEvents.type";
import { Broadcaster } from "./Broadcaster.class";

/**
 * A {@link Broadcaster} which also works as an {@link IObserver}
 * and automatically relays notifications it receives.
 */
export class Rebroadcaster<EntityType, EventsType extends string>
  extends Broadcaster<EntityType, EventsType>
  implements IObserver<EntityType, EventsType>
{
  onNotify(entity: EntityType, event: EventsType | BroadcastEvents) {
    this.notify(entity, event);
  }
}
