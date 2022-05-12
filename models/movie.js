export class Movie {
  title = "";
  year = "";
  director = "";
  duration = "";
  actors = "";

  constructor(title, year, director, duration, actors) {
    this.title = title;
    this.year = year;
    this.director = director;
    this.duration = duration;
    this.actors = actors;
  }
}
