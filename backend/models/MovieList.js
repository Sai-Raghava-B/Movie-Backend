import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  imdbID: String,
  title: String,
  year: String,
  poster: String,
});

const movieListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  movies: [movieSchema],
});

// const Movie = mongoose.model('Movie', movieSchema);
const MovieList = mongoose.model('MovieList', movieListSchema);


export default (MovieList);


