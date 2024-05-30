import MovieList from '../models/MovieList.js';

export const createMovieList = async (req, res) => {
  const { name, isPublic } = req.body;

  try {
    const movieList = new MovieList({
      user: req.user._id,
      name,
      isPublic,
    });

    const createdList = await movieList.save();
    res.status(201).json(createdList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addMovieToList = async (req, res) => {
  const { listId, movie } = req.body;

  try {
    const movieList = await MovieList.findById(listId);

    if (movieList.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const movieExists = movieList.movies.some(m => m.imdbID === movie.imdbID);
    if (movieExists) {
      return res.status(400).json({ message: 'Movie already exists in the list' });
    }

    movieList.movies.push(movie);
    await movieList.save();
    res.status(200).json(movieList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteList = async (req,res) => {
  const { id } = req.params;

  try {
    // Delete the movie list
    const result = await MovieList.deleteOne({ _id: id });

    // Check if any movie list was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Movie list not found' });
    }

    // Return success message
    res.json({ message: 'Movie list deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const toggleVisibility = async(req,res) => {
// Toggle the visibility of a movie list

  try {
    const list = await MovieList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: 'Movie list not found' });
    }
    if (list.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'User not authorized' });
    }

    list.isPublic = !list.isPublic;
    await list.save();
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const getPublicList = async (req,res) =>{

  try {
    const list = await MovieList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: 'Movie list not found' });
    }
    if (!list.isPublic) {
      return res.status(403).json({ message: 'This list is private' });
    }
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getUserLists = async (req, res) => {
  try {
    const lists = await MovieList.find({ user: req.user._id });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
