
import Post from "./component/post"
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    
        <div className="App">
      <h1>ARTICLE DETAILS</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Post/>} /> 
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

