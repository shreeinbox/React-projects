import React from 'react';
import Header from './components/Header'
import { BrowserRouter as Router} from "react-router-dom"


class App extends React.Component {


  render(){
    return(
      <div>
        <Router>
          <Header />
        </Router>
      </div>
       );
  }
}
export default App;
