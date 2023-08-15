const Title = require ("../models/titles")


const TitleController = {
// Find a single Title with an id
    Find: async (req, res) => {
    const title = await Title.findById(req.params.id)

    if (!title) {
        return res.status(404).json({error: "Title not found"});
    }
    res.status(200).json({title: title})
}

}

module.exports = TitleController;

// Get: async (req, res) => {
//     const post = await Post.findById(req.params.id).populate("user_id")
//     if (!post) {
//       return res.status(404).json({error: "Post not found"});
//     }
//     const token = TokenGenerator.jsonwebtoken(req.user_id);
//     const authorId = post.user_id.id;
//     const author = post.user_id.username;
//     const logged_in_user = await User.findById(req.user_id)
//     res.status(200).json({ message: post.message, token: token, author: author, authorId: authorId, likes: post.likes, logged_in_user: logged_in_user.username, comments: post.comments})
//   }