import { TabNavigator } from 'react-navigation';

import SignIn from './SignIn';
import SignUp from './SignUp';

const tabs = {
  SighIn: { screen: SignIn },
  SignUp: { screen: SignUp }
}

export default TabNavigator(tabs)