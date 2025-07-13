import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import Herosection from "./pages/Home";
import Login from "./pages/Login";
import Createblog from "./pages/Createblog";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Myblogs from "./pages/Myblogs";
import SingleBlog from "./components/Singleblog";
import Profile from "./pages/Profile";
import Bloglist from "./pages/Bloglist";

import "./App.css";
const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Herosection />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Createblog" element={<Createblog />} />
          <Route path="/Myblogs" element={<Myblogs />} />
          <Route path="/blogs/:blogId" element={<SingleBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blogs" element={<Bloglist />} />
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
