import React, { useRef, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views 
import Home from './views/Home';


const App = () => {

  const childRef = useRef();

  useEffect(() => {
    document.body.classList.add('is-loaded')
    childRef.current.init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
        </Switch>
      )} />
  );
}

export default App;