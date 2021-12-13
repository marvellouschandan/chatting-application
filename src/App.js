import './App.css';
import HomePage from './components/HomePage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/signup" component={RegisterPage} />
      </Router>
    </div>
  );
}

export default App;
