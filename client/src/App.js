import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './styles/app.css'
import './styles/globals.css'


import MainApp from './components/MainAppComponent'
import PrivacyPolicy from './components/PrivacyPolicyComponent'
import ThermsConditions from './components/ThermsConditionsComponent'
import WhoWeAre from './components/WhoWeAreComponent'


function App() {

  return (
    <Router>
        <div>
          <Route exact path="/" component={MainApp} />
          <Route exact path="/privacy_policy" component={PrivacyPolicy} />
          <Route exact path="/therms_conditions" component={ThermsConditions} />
          <Route exact path='/who_we_are' component={WhoWeAre} />
        </div>
    </Router>
  );
  
}

export default App;
