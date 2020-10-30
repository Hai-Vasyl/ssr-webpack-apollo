import React from 'react'
import Routes from "./Routes"
import { Route, Switch } from "react-router-dom"
import Navbar from "./components/Navbar"

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <Switch>
        {Routes.map(({ exact, path, component: Component }) => {
          return <Route key={path} exact={exact} path={path} component={(props: any) => <Component {...props} />} />
        })}
      </Switch>
    </div>
  )
}

export default App
