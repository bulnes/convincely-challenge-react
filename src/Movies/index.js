import React, { useEffect, useState } from 'react';
import axios from "axios";
// import _ from "lodash";

import './index.scss';

import imgWins from '../assets/images/wins.png';

const url = 'https://the-one-api.dev/v2/movie';
const apiToken = '5sn22IKN7mtbKyc7N-xo';

const getMovies = async () => axios.get(url, {
		headers: {
			Authorization: `Bearer ${apiToken}`
		}
	});

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [unfiltered, setUnfiltered] = useState([])

  const handleSearch = (e) => {
    const { value } = e.target
    const formatedValue = value.toLowerCase().trim()

    if (formatedValue) {
      const filterMovies = unfiltered.filter(movie => movie.name.toLowerCase().includes(formatedValue))
  
      setMovies([...filterMovies])
    } else {
      setMovies([...unfiltered])
    }
  }

  const handleSort = (e) => {
    const { value } = e.target

    const sortMovies = unfiltered.sort((a, b) => {
      const movieA = a.name.toLowerCase()
      const movieB = b.name.toLowerCase()

      const firstMovie = value === 'asc' ? movieA : movieB
      const secondMovie = value === 'asc' ? movieB : movieA

      return (firstMovie > secondMovie) ? 1 : (firstMovie < secondMovie) ? -1 : 0
    })

    setMovies([...sortMovies])
  }

  useEffect(() => {
    getMovies().then((response) => {
      const { data } = response
      const { docs } = data

      console.log('docs', docs)

      setMovies(docs)
      setUnfiltered([...docs])
    })
  }, [])

	return (
		<div className="challenge">
      <header className='movies-header'>
        <h1 className='movies-header__title'>Lord of the Rings Movies</h1>

        <div className='movies-header__info'>
          <div className='movies-header__info-column'>
            <p className='movies-header__desc'>Ave. movie runtime: xxx min</p>
            <p className='movies-header__desc'>Ave. movie budget: $XXM</p>
          </div>

          <div className='movies-header__info-column'>
            <input type="text" name="finder" id="finder" placeholder='Find movies by name' onKeyUp={handleSearch} />

            <select onChange={handleSort}>
              <option value="asc">Asc sort</option>
              <option value="desc">Desc sort</option>
            </select>
          </div>
        </div>
      </header>


      <div className="movies-container">
        {movies.map(movie => (
          <div key={movie._id} className="movie-box">
            <div className="movie-box__cover"></div>
            <div className="movie-box__content">
              <h2 className="movie-box__title">{movie.name}</h2>

              <p className="movie-box__runtime">{movie.runtimeInMinutes} min</p>

              <p className="movie-box__wins">
                <img src={imgWins} alt="Wins and Nominations" title="Wins and Nominations" width="9.66" height="20" loading="lazy" />
                <span>{movie.academyAwardWins} Wins and {movie.academyAwardNominations} Nominations</span>
              </p>

              <div className="movie-box__money">
                <p className="movie-box__money-column">
                  <strong>Budget</strong>
                  <span className="movie-box__money-desc">${movie.budgetInMillions}M</span>
                </p>
                <p className="movie-box__money-column">
                  <strong>Revenue</strong>
                  <span className="movie-box__money-desc">${movie.boxOfficeRevenueInMillions}M</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
	);
}

export default Movies