import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home  from './components/Home';

function App() {
  return (
   <BrowserRouter> 
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Home} />
    
      <h1>Henry Dogs</h1>
     </div>
   </BrowserRouter>
  );
}

export default App;
