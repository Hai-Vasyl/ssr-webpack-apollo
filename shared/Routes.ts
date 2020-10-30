import Home from "./pages/Home"
import About from "./pages/About"
import Posts from "./pages/Posts"
import Post from "./pages/Post"

export const links = [
  {
    to: "/",
    exact: true,
    className: "link",
    activeClassName: "link--active",
    title: "Home"
  },
  {
    to: "/about",
    className: "link",
    activeClassName: "link--active",
    title: "About"
  },
  {
    to: "/posts",
    exact: true,
    className: "link",
    activeClassName: "link--active",
    title: "All Posts"
  },
  {
    to: "/posts/5f9aefc7338000473403d365",
    className: "link",
    activeClassName: "link--active",
    title: "New post"
  },
  {
    to: "/posts/5f9aefcf338000473403d366",
    className: "link",
    activeClassName: "link--active",
    title: "New post2"
  },
  {
    to: "/posts/5f9aeff2338000473403d368",
    className: "link",
    activeClassName: "link--active",
    title: "New post4"
  },
]

const routes = [
  {
    component: Home,
    exact: true,
    path: "/"
  },
  {
    component: About,
    path: "/about"
  },
  {
    component: Posts,
    exact: true,
    path: "/posts"
  },
  {
    component: Post,
    path: "/posts/:postId"
  },
]

export default routes