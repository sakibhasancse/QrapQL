const Post = require('../../models/Post')
const slugify = require('slugify');
const { checkAuth } = require('../../../utils/auth')
module.exports = {
    Query: {
        async getPosts() {
            const posts = await Post.find()
            return posts
        },
        async getPost(_, { slug }) {
            try {
                const post = await Post.findOne({ slug })
                if (!post) throw new Error("Post not found");
                return post;
            } catch (error) {
                throw new Error(error)
            }

        }
    },

    Mutation: {
        async createPost(_, { title, body }, context) {
            try {
                const user = checkAuth(context),
                    slug = slugify(title),
                    newPost = new Post({
                        slug,
                        title,
                        body,
                        user: user.id,
                        username: user.username,
                        createdAt: new Date().toDateString()
                    });
                console.log(user);
                await newPost.save((post, error) => {
                    if (error) throw new Error("Somthing went wrong try agin")
                    return post;
                })
            } catch (error) {
                throw new Error(error)
            }

        }
    }
}