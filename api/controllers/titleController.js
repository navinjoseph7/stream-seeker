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
        
        const titleData = await Title.findOne({title: title});

        if (!titleData) {
            return res.status(404).json({ error: "Title not found" });
        }

        res.status(200).json(titleData);
    }

}



module.exports = TitleController;

