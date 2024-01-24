import { Status } from './status';

export interface Task {
  id: number,
  title: string,
  date: string,
  status: Status,
}
