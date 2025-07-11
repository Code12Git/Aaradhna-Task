import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import Dashboard from './Dashboard';

const Routing = () => {
  return (
    <Routes>
            <Route path="/" element={<Dashboard />} />

      <Route path="/Dashboard" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/create" element={<CreateBlog />} />
    </Routes>
  );
};

export default Routing;
