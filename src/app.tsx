import * as React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import { storeContext } from './utils/use'
import Main from './Main'

const App = () => {
  console.log('this.propsthis.propsthis.propsthis.props', store)
  return (
    <storeContext.Provider value={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" render={(props) => <Main {...props}/>}></Route>
        </Switch>
      </BrowserRouter>
    </storeContext.Provider>
  )
}

export default App
