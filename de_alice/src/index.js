// src/index.js

import React from 'react';
import { View } from 'react-native';

import { isSignedIn } from "./services/auth";

import { createRootNavigator, SignedOutRoutes, SignedInRoutes } from './routes';

export default class App extends React.Component {
  state = {
    signed: false,
    signLoaded: false,
  };

  UNSAFE_componentWillMount() {
    isSignedIn()
        .then(
            res => this.setState({ signed: res, signLoaded: true}),

        )
        .catch(err => alert(err));

  }

  render() {
    const { signLoaded, signed } = this.state;

    if (!signLoaded) {
      return null;
    }

    const Layout = createRootNavigator(signed);
    return <Layout />;
  }
}