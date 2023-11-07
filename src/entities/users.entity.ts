import { IsString, IsNotEmpty, IsEmail, MinLength, Min } from "class-validator";

export class User {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @Min(5)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}