import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Etusivu from './components/Etusivu';
import Salasana from './components/Salasana';
import Haku from './components/Haku';


function App() {
  return (
    <BrowserRouter>
            
            <div>
                
                
                <Switch>
                  <Route path='/' exact component={Etusivu}
                   />
                  <Route path='/listaus' component={Haku}
                  />
                  <Route path='/salasana' component={Salasana}
                  />
                </Switch>
                </div>
    
                
                </BrowserRouter>
    );
}

export default App;
