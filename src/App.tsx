import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import { UserProvider } from "./context/userContext";

function App() {
  return (
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
}

export default App
