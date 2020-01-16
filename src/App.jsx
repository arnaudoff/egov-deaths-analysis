import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import styled from 'styled-components'

const Home = lazy(() => import('./CountryMap'));
const Detailed = lazy(() => import('./Detailed'));
const Comparison = lazy(() => import('./Comparison'));

const App = () => (
  <Router>
    <Link  style={{ textDecoration: 'none', color: 'black' }} to="/">
      <HomeButton>
        <img width="30" height="30" src="http://simpleicon.com/wp-content/uploads/home-2.png" alt="home"/>
      </HomeButton>
    </Link>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/detailed/:id" component={Detailed}/>
        <Route exact path="/comparison/:id" component={Comparison}/>
      </Switch>
    </Suspense>
  </Router>
);

const HomeButton = styled.div`
  padding: 10px;
  cursor: pointer;
  background: #f6f6f6;
  position: fixed;
  width: 150px;
  text-align: center;
  left 100px; top 0;
  border: 1px solid #d6d6d6;
  border-top: 0px;
  opacity: 0.6;
  border-radius: 0 0 50px 50px;
  
  &:hover {
    opacity: 1;
  }
`



export default App;
