import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import SignUpAddress from './pages/signUpAddress';
import Main from './pages/main';
import Intro from './pages/intro';
import Menu from './pages/menu';
import onboarding from './pages/onboarding';

// const Routes = createStackNavigator({
//     SignIn,
//     SignUp,
//     Main,
// });

export const SignedOutRoutes = createStackNavigator({
    SignIn: SignIn,
    SignUp: SignUp,
    SignUpAddress: SignUpAddress,
    Intro: Intro,
    Menu: Menu,
    Onboarding: onboarding,
}, {
    headerMode: "none",
    // initialRouteName: "Intro"
    initialRouteName: "Intro"
})

export const SignedInRoutes = createStackNavigator({
    Main: Main,
}, {
    headerMode: "none",
})

export const createRootNavigator = (signedIn = false) => {

    return createAppContainer(createStackNavigator({
        SignedIn: SignedInRoutes,
        SignedOut: SignedOutRoutes
    },
    {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut",
        headerMode: "none"
    }));
}

// export default Routes;