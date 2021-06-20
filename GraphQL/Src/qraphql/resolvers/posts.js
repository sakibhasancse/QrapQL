const Post = require('../../models/Post')
const slugify = require('slugify')
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
        async createPost(_, { title, body }) {
            try {
                const slug = slugify(title),
                    user = "60cd8ff735a90868027bc78b"

                const newPost = new Post({ slug, title, body, user });
                await newPost.save((post, error) => {
                    if (error) throw new Error("Somthing went wrong try agin")
                    return post
                })
            } catch (error) {
                throw new Error(error)
            }

        }
    }
}