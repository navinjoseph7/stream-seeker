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
        const movie_id= data.results[0].id;
        const original_title = data.results[0].title;
        const overview = data.results[0].overview;
        const poster_path = data.results[0].poster_path;
        const rating = data.results[0].vote_average;
        const url = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOThmZWNkMTc5ZjljNWZhYmQ3MzI1MDBjYjkxZjc1NCIsInN1YiI6IjY0ZGI0MzY5MDAxYmJkMDBlMzVkMmYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yi7avS_OqTTm_iJj_Kydr0YIIE2SFdhGTbyNm-4Hz5Y'
            }
        };
        const second_response = await fetch(url, options)
        const second_data = await second_response.json();
        const links = second_data.results.GB;
        const movie_info={movie_id:movie_id , title:original_title,  overview:overview, poster_path: poster_path ,rating:rating,links: links}
        console.log(movie_info);
        res.status(200).json(data.results);
        
    },
    FindLinks: async(req,res) =>{
        console.log("here")
        const movie_id = req.params.titleid;
        console.log(movie_id)
        const url = `https://api.themoviedb.org/3/movie/${movie_id}/watch/providers`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOThmZWNkMTc5ZjljNWZhYmQ3MzI1MDBjYjkxZjc1NCIsInN1YiI6IjY0ZGI0MzY5MDAxYmJkMDBlMzVkMmYwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yi7avS_OqTTm_iJj_Kydr0YIIE2SFdhGTbyNm-4Hz5Y'
            }
        };
        const second_response = await fetch(url, options)
        const second_data = await second_response.json();
        const links = second_data.results.GB;
        console.log(second_data.results);
        res.status(200).json(links.link);
    }

}



module.exports = TitleController;

