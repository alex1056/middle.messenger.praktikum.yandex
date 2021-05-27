import { EventBus } from '../EventBus';
import { isEmpty } from '../../utils/is-empty';

export function getEventBus(): EventBus {
  if (!EventBus._instance || isEmpty(EventBus._instance)) {
    EventBus._instance = new EventBus();
  }
  return EventBus._instance;
}
