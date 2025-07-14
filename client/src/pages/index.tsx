// Routing.tsx
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import Dashboard from './Dashboard';
import PrivateAuth from '@/hooks/PrivateAuth';
import { PublicRoute } from '@/hooks/PublicRoute';
import NotFound from './Not-found';

const Routing = () => {
  return (
    <Routes>
      {/* Public routes  */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />
      
      {/* Protected routes */}
      <Route element={<PrivateAuth />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/create" element={<CreateBlog />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;