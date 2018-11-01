import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  constructor(id, name, username, priority) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.priority = priority;
  }

  @ApiModelProperty()
  readonly id: string;
  @ApiModelProperty()
  readonly name: string;
  @ApiModelProperty()
  readonly username: string;
  @ApiModelPropertyOptional()
  readonly priority: number;
}
