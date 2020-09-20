import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './styles/app.css'
import './styles/globals.css'


import MainApp from './components/MainAppComponent'
import PrivacyPolicy from './components/PrivacyPolicyComponent'
import TermsConditions from './components/ThermsConditionsComponent'
import About from './components/WhoWeAreComponent'


function App() {

  return (
    <Router>
        <div>
          <Route exact path="/" component={MainApp} />
          <Route exact path="/privacy_policy" component={PrivacyPolicy} />
          <Route exact path="/terms_conditions" component={TermsConditions} />
          <Route exact path='/about' component={About} />
        </div>
    </Router>
  );
  
}

export default App;
