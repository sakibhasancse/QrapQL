const Post = require('../../models/Post')
const slugify = require('slugify');
const { checkAuth } = require('../../../utils/auth');
const { AuthenticationError } = require('apollo-server');
const { size } = require('lodash')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();

                return posts
            } catch (error) {
                throw new Error("Internal server error", +error);
            }

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
                    slug = slugify(title).toLowerCase(),
                    newPost = new Post({
                        slug,
                        title,
                        body,
                        user: user.id,
                        username: user.username,
                        createdAt: new Date().toDateString()
                    });

                const post = await newPost.save()
                return post;

            } catch (error) {
                throw new Error(error)
            }

        },
        async deletePost(_, { slug }, context) {
            try {
                const user = checkAuth(context);
                const post = await Post.findOne({ slug });
                if (!post) throw new Error('Post not found');
                if (user.id != post.user) throw new AuthenticationError('Access Denied , you are not allowed to delete this post')
                await Post.findByIdAndDelete(post._id);
                return 'Post deleted successfully'

            } catch (error) {
                console.log(error)
                throw new Error(error)
            }
        }
    }
}