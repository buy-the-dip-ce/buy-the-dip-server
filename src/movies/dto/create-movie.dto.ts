import { IsString, IsNumber } from "class-validator";

export class CreateMoiveDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true })
  readonly genres: string[];
}
