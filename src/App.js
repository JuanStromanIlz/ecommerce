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
import ItemView from './views/ItemView';
import LoginView from './views/LoginView';
import CheckoutView from './views/CheckoutView';

function App() {
  return (
    <Router>
      <ThemeContext>
        <UserContext>
          <Switch>
            <Route exact path='/' component={HomeView} />
            <Route path='/user' component={LoginView} />
            <Route path='/checkout' component={CheckoutView} />
            <Route path='/collections/:title' component={CollectionView} />
            <Route path='/authors/:author' component={AuthorView} />
            <Route path='/books/:book' component={ItemView} />
          </Switch>
        </UserContext>
      </ThemeContext>
    </Router>
  );
}

export default App;
