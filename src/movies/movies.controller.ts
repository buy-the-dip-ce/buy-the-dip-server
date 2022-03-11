import { CreateMoiveDto } from "./dto/create-movie.dto";
import { Movie } from "./entities/movie.entity";
import { MoviesService } from "./movies.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get("/:id")
  getOne(@Param("id") id: string): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMoiveDto) {
    return this.moviesService.create(movieData);
  }

  @Delete("/:id")
  remove(@Param("id") id: string) {
    return this.moviesService.deleteOne(id);
  }

  // @Patch("/:id")
  // patch(@Param("id") id: string, @Body() updateData) {
  //   return this.moviesService.update(movieId);
  // }
}
