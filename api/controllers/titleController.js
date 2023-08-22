const Movie = require("../models/movie");
const Title = require ("../models/movie")


const TitleController = {
    // Find a single Title with an id
    Find: async (req, res) => {
    const title = await Title.findById(req.params.id)

    if (!title) {
        return res.status(404).json({error: "Title not found"});
    }
    res.status(200).json(title)
    },

    //Find a title by the show/movie title
    FindByTitle: async (req, res) => {
        const title = req.params.title;
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&api_key=d98fecd179f9c5fabd732500cb91f754`);
        const data = await response.json();
        res.status(200).json(data.results);
        
    },
  

}



module.exports = TitleController;

