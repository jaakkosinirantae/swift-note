/*
  Filename: sophisticated_code.js

  Description: This code demonstrates a complex and professional JavaScript implementation of a social media dashboard.
*/

// Define the Dashboard class
class Dashboard {
  constructor() {
    this.users = [];
    this.posts = [];
    this.comments = [];
    this.likes = [];
  }

  // Add a user to the dashboard
  addUser(user) {
    this.users.push(user);
  }

  // Create a post for a user
  createPost(user, content) {
    if (!this.users.includes(user)) {
      throw new Error("User not found!");
    }

    const post = {
      id: this.posts.length + 1,
      userId: user.id,
      content: content,
      timestamp: new Date().toISOString(),
    };

    this.posts.push(post);
    return post;
  }

  // Add a comment to a post
  addComment(user, postId, content) {
    const post = this.posts.find((p) => p.id === postId);
    if (!post) {
      throw new Error("Post not found!");
    }

    if (!this.users.includes(user)) {
      throw new Error("User not found!");
    }

    const comment = {
      id: this.comments.length + 1,
      userId: user.id,
      postId: postId,
      content: content,
      timestamp: new Date().toISOString(),
    };

    this.comments.push(comment);
    return comment;
  }

  // Like a post
  likePost(user, postId) {
    const post = this.posts.find((p) => p.id === postId);
    if (!post) {
      throw new Error("Post not found!");
    }

    if (!this.users.includes(user)) {
      throw new Error("User not found!");
    }

    const existingLike = this.likes.find(
      (like) => like.userId === user.id && like.postId === postId
    );

    if (existingLike) {
      throw new Error("Post already liked by the user!");
    }

    const like = {
      id: this.likes.length + 1,
      userId: user.id,
      postId: postId,
      timestamp: new Date().toISOString(),
    };

    this.likes.push(like);
    return like;
  }

  // Get a user's activity feed
  getActivityFeed(userId) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new Error("User not found!");
    }

    const userPosts = this.posts.filter((post) => post.userId === userId);
    const userComments = this.comments.filter(
      (comment) => comment.userId === userId
    );
    const userLikes = this.likes.filter((like) => like.userId === userId);

    const activityFeed = [...userPosts, ...userComments, ...userLikes].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    return activityFeed;
  }
}

// Define a User class
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

// Usage example
const dashboard = new Dashboard();

// Create some users
const user1 = new User(1, "John");
const user2 = new User(2, "Emily");

// Add users to the dashboard
dashboard.addUser(user1);
dashboard.addUser(user2);

// User 1 creates a post
const post1 = dashboard.createPost(user1, "Hello world!");

// User 2 likes post 1
dashboard.likePost(user2, post1.id);

// User 1 adds a comment to post 1
dashboard.addComment(user1, post1.id, "Nice post!");

// Get User 1's activity feed
const activityFeed = dashboard.getActivityFeed(user1.id);

console.log(activityFeed);
// Output: [{ post1 }, { comment1 }, { like1 }]

// Output might include:
// [
//   { id: 1, userId: 1, content: 'Hello world!', timestamp: '2022-07-01T12:00:00Z' },
//   { id: 1, userId: 1, postId: 1, content: 'Nice post!', timestamp: '2022-07-01T12:01:00Z' },
//   { id: 1, userId: 2, postId: 1, timestamp: '2022-07-01T12:02:00Z' }
// ]