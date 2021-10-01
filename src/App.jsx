import { BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import AppHeader from './ui/AppHeader';

function App() {
  return (
    <BrowserRouter>
      <AppHeader/>
    </BrowserRouter>
  );
}

export default App;
