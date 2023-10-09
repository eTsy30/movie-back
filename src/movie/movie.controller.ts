import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movie.service';
import { IMovie } from './Types/Type';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get('/filter')
  filter(@Query() filter: any) {
    return this.moviesService.findAll(filter);
  }
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    const movie = this.moviesService.findOne(id);

    if (!movie) {
      return 'Фильм не найден';
    }
    return movie;
  }

  @Post()
  create(@Body() movie: IMovie) {
    return this.moviesService.create(movie);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: IMovie) {
    const movie = this.moviesService.update(id, updateMovieDto);
    if (!movie) {
      return 'Фильм не найден';
    }
    return movie;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const movie = this.moviesService.remove(id);
    if (!movie) {
      return 'Фильм не найден';
    }
    return movie;
  }
}
