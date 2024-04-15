import './styles/App.css';
import { Routes, Route } from "react-router-dom";
import Authentication from './pages/Authentication/Authentication';
import Feed from './pages/Feed/Feed';

function App() {
  return (
      <Routes>
        <Route default path="/" element={<Authentication />}/>
        <Route path="/feed" element={<Feed key={Date.now()}/>}/>
       </Routes>  
  );
    
}

export default App;
