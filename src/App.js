import './App.css';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import {Route,Switch,BrowserRouter} from 'react-router-dom';
import AuthProviders from './Context/AuthProviders';
import AppProvider from './Context/AppProvider';
import AddRoomModals from './components/Modals/AddRoomModals';
import InviteMemberModal from './components/Modals/InviteMemberModal';


function App() {
  return (
    <BrowserRouter>
      <AuthProviders>
          <AppProvider>
            <Switch>
              <Route component={Login} path="/login"/>
              <Route component={ChatRoom} path="/"/>
            </Switch>
            <AddRoomModals/>
            <InviteMemberModal/>
          </AppProvider>
        </AuthProviders>
    </BrowserRouter>
  );
}

export default App;
