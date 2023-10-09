import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { IMovie, IMovieData } from './Types/Type';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class MoviesService {
  private data: IMovieData;

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      this.data = JSON.parse(fs.readFileSync('movies.json', 'utf8'));
    } catch (err) {
      this.data = { movies: [] };
    }
  }

  private saveData() {
    fs.writeFileSync('movies.json', JSON.stringify(this.data, null, 2), 'utf8');
  }

  findAll(filter?: { director?: string; year?: number }) {
    let movies = this.data.movies;

    if (filter && filter.year) {
      movies = movies.filter((movie) => +movie.year === +filter.year);
    }

    return movies;
  }

  findOne(id: string) {
    return this.data.movies.find((movie) => movie.id == id);
  }

  create(movie: IMovie) {
    const newMovie = {
      id: uuidv4(),
      rating: 0, // По умолчанию рейтинг 0
      status: false, // По умолчанию фильм непросмотрен
      ...movie,
    };
    this.data.movies.push(newMovie);
    this.saveData();
    return newMovie;
  }

  update(id: string, updateMovieDto: IMovie) {
    console.log(id, updateMovieDto, '#####');

    const movie = this.data.movies.find((m) => m.id == id);
    if (!movie) {
      return null;
    }
    if (updateMovieDto.rating !== undefined) {
      movie.rating = updateMovieDto.rating;
    }
    if (updateMovieDto.status !== undefined) {
      movie.status = updateMovieDto.status;
    }
    this.saveData();
    return movie;
  }

  remove(id: string) {
    const index = this.data.movies.findIndex((movie) => movie.id == id);
    if (index === -1) {
      return null;
    }
    const deletedMovie = this.data.movies.splice(index, 1)[0];
    this.saveData();
    return deletedMovie;
  }
}
