import { IsString, IsBoolean, IsNotEmpty, MaxLength } from "class-validator";

export class Todo {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(1000)
  description: string;

  @IsBoolean()
  completed: boolean;
}
