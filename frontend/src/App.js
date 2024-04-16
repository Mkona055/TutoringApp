import './styles/App.css';
import { Routes, Route } from "react-router-dom";
import Authentication from './pages/Authentication/Authentication';
import Feed from './pages/Feed/Feed';
import ManagePosts from './pages/ManagePosts/ManagePosts';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import UserPosts from './pages/UserPosts/UserPosts';
function App() {
  return (
      <Routes>
        <Route default path="/" element={<Authentication />}/>
        <Route path="/feed" element={<Feed key={Date.now()}/>}/>
        <Route path="/user-posts" element={<UserPosts key={Date.now()}/>}/>
        <Route path="/manage-posts" element={<ManagePosts key={Date.now()}/>}/>
        <Route path="/manage-users" element={<ManageUsers key={Date.now()}/>}/>
       </Routes>  
  );
    
}

export default App;
