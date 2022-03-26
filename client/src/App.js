import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home  from './components/Home';
import Detail  from './components/Detail';
import CreateDog  from './components/CreateDog';

function App() {
  return (
   <BrowserRouter> 
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route path='/home' component={Home} />
      <Route path='/dog' component= {CreateDog}/>
      <Route path='/dogs/:id' component= {Detail}/>
     </div>
   </BrowserRouter>
  );
}

export default App;
