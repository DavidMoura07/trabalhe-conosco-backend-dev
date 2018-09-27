export class CreateUserDto{

  constructor(id, name, username, priority){
    this.id = id;
    this.name = name;
    this.username = username;
    this.priority = priority;
  }

  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly priority: number;
}