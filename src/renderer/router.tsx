import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from './components/pages/HomePage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { BrowsePage } from './components/pages/BrowsePage';
import { ISearchOnSearchEvent } from './components/generic/search/Search';
import { ICentralState } from './interfaces';
import { AboutPage } from './components/pages/AboutPage';
import { IGameOrderChangeEvent } from './components/GameOrder';
import { ConfigPage } from './components/pages/ConfigPage';

export interface IAppRouterProps {
  central?: ICentralState;
  search?: ISearchOnSearchEvent;
  order?: IGameOrderChangeEvent;
}

export class AppRouter extends React.Component<IAppRouterProps, {}> {
  render() {
    const props = {
      central: this.props.central,
      search: this.props.search,
      order: this.props.order,
    };
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <PropsRoute exact path="/browse" component={BrowsePage} {...props} />
        <Route exact path="/config" component={ConfigPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

// Reusable way to pass properties down a router and to its component
const renderMergedProps = (component: any, ...rest: any[]) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}
const PropsRoute = ({ component, ...rest }: any) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}
