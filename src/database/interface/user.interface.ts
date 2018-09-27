import { User } from 'users/entitys/user.entity';

export class UserInterface extends User{

  constructor(id, name, username, priority){
    super();
    this.id = id;
    this.name = name;
    this.username = username;
    this.priority = priority;
  }
}