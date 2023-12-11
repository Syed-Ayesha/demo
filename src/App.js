import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = 'a8ff591c';

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchText}`);
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
        setError('');
      } else {
        setMovies([]);
        setError(data.Error || 'No results found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
    }
  };

  const handleMovieClick = async (imdbID) => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
      const data = await response.json();

      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  useEffect(() => {
    setSelectedMovie(null);
  }, [searchText]);

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter movie title"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-item" onClick={() => handleMovieClick(movie.imdbID)}>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Title}</p>
            {selectedMovie && selectedMovie.imdbID === movie.imdbID && (
              <div className="movie-details">
                <p>IMDB Rating: {selectedMovie.imdbRating}</p>
                <p>Release Date: {selectedMovie.Released}</p>
                <p>Genre: {selectedMovie.Genre}</p>
                <p>Director: {selectedMovie.Director}</p>
                <p>Actors: {selectedMovie.Actors}</p>
                <p className="movie-plot" onClick={() => setSelectedMovie(null)}>
                  {selectedMovie.Plot}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
