import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs"); // Set the view engine to EJS

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let blogPosts = [
    {
      id: 1,
      title: "My first blog",
      content: "This is the content of the first blog post."
    },
    // Add more posts here if needed
  ];

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: blogPosts });
});

app.post("/new", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
    return res.render("new-post.ejs", { errorMessage: "Please fill in all fields." });
    }
    const newPost = {
        id: blogPosts.length + 1, // Generate ID (in a real app, this would be handled differently)
        title,
        content
    };
    blogPosts.push(newPost);
    res.redirect("/");
})

app.get("/new", (req, res) => {
    res.render("new-post.ejs", {errorMessage: null});
  });

app.get("/zack", (req, res) => {
    res.render("zack.ejs", {errorMessage: null});
  });

app.get("/post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const selectedPost = blogPosts.find(post => post.id === postId);
    res.render("single-post.ejs", { post: selectedPost });
  });

app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = blogPosts.find(post => post.id === postId);
    res.render("edit-post.ejs", { post: postToEdit });
  });
  
// Handle edited post submission
app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
  
    const postToEdit = blogPosts.find(post => post.id === postId);
    postToEdit.title = title;
    postToEdit.content = content;
  
    res.redirect("/");
  });

  // Delete route
app.post("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    blogPosts = blogPosts.filter(post => post.id !== postId);
    res.redirect("/");
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});