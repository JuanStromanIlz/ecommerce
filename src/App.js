import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ThemeContext from './context/ThemeContext';
import UserContext from './context/UserContext';
import AuthorView from './views/AuthorView';
import CollectionView from './views/CollectionView';
import HomeView from './views/HomeView';

function App() {
  return (
    <ThemeContext>
      <UserContext>
        <Router>
          <Switch>
            <Route exact path='/' component={HomeView}/>
            <Route path='/collections/:title' component={CollectionView} />
            <Route path='/authors/:author' component={AuthorView} />
          </Switch>
        </Router>
      </UserContext>
    </ThemeContext>
  );
}

export default App;
