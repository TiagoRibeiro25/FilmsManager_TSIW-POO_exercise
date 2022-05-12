import { Director } from "./models/director.js";
import { Movie } from "./models/movie.js";

const form = document.querySelector("#addMovie");
form.addEventListener("submit", function (event) {
  event.preventDefault();
});
const directorForm = document.querySelector("#addOtherDirector");
directorForm.addEventListener("submit", function (event) {
  event.preventDefault();
});

// Global Variables
const directors = [
  {
    name: "Martin Scorsese",
    birthDate: "11/17/1942",
    country: "America",
  },
  {
    name: "Steven Spielberg",
    birthDate: "12/18/1946",
    country: "America",
  },
];

const films = [];

directorForm.addEventListener("submit", () => {
  for (let director in directors) {
    if (
      directors[director].name == document.querySelector("#directorName").value
    )
      return alert("Director already exists!");
  }

  const newDirector = new Director(
    document.querySelector("#directorName").value,
    document.querySelector("#directorBirthDate").value,
    document.querySelector("#directorCountry").value
  );

  directors.push(newDirector);

  //Add new Director to the HTML
  document.querySelector("#movieDirector").innerHTML += `
  <option value="${directors[directors.length - 1].name}">${
    directors[directors.length - 1].name
  }</option>
  `;
});

form.addEventListener("submit", () => {
  const newMovie = new Movie(
    document.querySelector("#movieTitle").value,
    document.querySelector("#movieYear").value,
    document.querySelector("#movieDirector").value,
    document.querySelector("#movieDuration").value,
    document.querySelector("#movieActors").value.split(",")
  );
  films.push(newMovie);
  renderTable();
});

const cleanTable = () => {
  document.querySelector("table").innerHTML = `
  <thead>
    <tr align="center">
      <th scope="col">Title</th>
      <th scope="col">Year of Release</th>
      <th scope="col">Director</th>
      <th scope="col">Duration (minutes)</th>
      <th scope="col">Actors
      </th>
    </tr>
  </thead>
  <tbody></tbody>
  `;
};

const renderTable = () => {
  cleanTable();

  for (let film in films) {
    let directorInfo = "";
    for (let director in directors) {
      if (directors[director].name == films[film].director) {
        directorInfo = `Name: ${directors[director].name}<br>Born in: ${directors[director].birthDate}<br>From: ${directors[director].country}`;
        break;
      }
    }

    document.querySelector("table").innerHTML += `
    <tr align="center">
      <td scope="row">${films[film].title}</td>
      <td scope="row">${films[film].year}</td>
      <td scope="row">${directorInfo}</td>
      <td scope="row">${films[film].duration}</td>
      <td scope="row">${films[film].actors}</td>
    `;
  }
};

//Add Event to "Clear Custom Directors Button"
document.querySelector("#clearDirectors").addEventListener("click", () => {
  //Reduce directors array to the first 2 directors (the ones that were hardcoded)
  directors.length = 2;

  //Reset the HTML Select
  document.querySelector("#movieDirector").innerHTML = `
  <option value="Martin Scorsese">Martin Scorsese</option>
  <option value="Steven Spielberg">Steven Spielberg</option>
  `;
});

//Add Function "cleanTable" as an Event to Clear Table Button
document
  .querySelector("#clearTableBtn")
  .addEventListener("click", cleanTable());

/* +Info Functions */

/* All Film Titles By */
document.querySelector("#allFilmTitlesByBtn").addEventListener("click", () => {
  const directorInput = document.querySelector("#allFilmTitlesByEntry").value;
  const filmsByDirector = [];

  for (let film in films) {
    if (films[film].director == directorInput)
      filmsByDirector.push(films[film].title);
  }

  if (filmsByDirector.length == 0)
    return alert(`The director ${directorInput} hasn't produced any films.`);
  return alert(`Films produced by ${directorInput}: ${filmsByDirector}.`);
});

/* Films where an actor/actress enters */
document.querySelector("#filmsActorEntersBtn").addEventListener("click", () => {
  const actorInput = document.querySelector("#filmsActorEntersEntry").value;
  const filmsByActor = [];

  for (let film in films) {
    if (films[film].actors.indexOf(actorInput) != -1)
      filmsByActor.push(films[film].title);
  }

  if (filmsByActor.length == 0)
    return alert(`The actor/actress ${actorInput} doesn't enter in any film.`);
  return alert(
    `The actor/actress enters in the following films: ${filmsByActor}.`
  );
});

/* Films made by directors from a specific country */
document
  .querySelector("#filmsByDirectorCountryBtn")
  .addEventListener("click", () => {
    const countryInput = document.querySelector(
      "#filmsByDirectorCountryEntry"
    ).value;
    const directorsByCountry = []; //Directors from "countryInput"
    const filmsByDirectorCountry = [];

    for (let director in directors) {
      if (directors[director].country == countryInput)
        directorsByCountry.push(directors[director].name);
    }

    for (let film in films) {
      for (let i = 0; i < directorsByCountry.length; i++) {
        if (films[film].director == directorsByCountry[i])
          filmsByDirectorCountry.push(films[film].title);
      }
    }

    if (filmsByDirectorCountry.length == 0)
      return alert(`No director from ${countryInput} made a film.`);
    return alert(
      `Directors from ${countryInput} made the following movies: ${filmsByDirectorCountry}.`
    );
  });

/* Director who produced most films */
document
  .querySelector("#directorMostFilmsBtn")
  .addEventListener("click", () => {
    const directorsInFilms = [];
    for (let film in films) {
      directorsInFilms.push(films[film].director);
    }
    const directorWithMostFilms = directorsInFilms.reduce(
      (previous, current, i, arr) =>
        arr.filter((item) => item === previous).length >
        arr.filter((item) => item === current).length
          ? previous
          : current
    );
    return alert(
      `Director who produced most films is ${directorWithMostFilms}.`
    );
  });
