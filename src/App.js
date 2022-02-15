import { Login } from './login/login';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Register } from './register/register';
import Loader from './components/loader';
import { useState } from 'react';
import Toast from './components/toast';
import Patients from './patients-profile/patients';
import Doctors from './doctors-profile/doctors';
import { DoctorsLogin } from './login/doctors-login';
import Dashboard from './admin/dashboard/dashboard';
import Meeting from './meeting/meeting';
import DigitalHealthPassport from './dhp/digital-health-passport'
import Page404 from './page-404';
import DoctorsProfileUpdate from './doctors/profile-update';
import ProfileUpdateSuccessful from './doctors/profile-update-successful';

function App() {

  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [toastVis, setToastVis] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [msgBoxType, setMsgBoxType] = useState("success");

  const ShowToast = (message, messageBoxType) => {
    setToastMsg(message);
    setMsgBoxType(messageBoxType);
    setToastVis(true);
  }

  return (
    <>
      <Loader isVisible={isLoaderVisible} />
      <Toast
        toastMessage={toastMsg}
        msgBoxType={msgBoxType}
        toastVisibility={toastVis}
        setToastVisibility={setToastVis}
      />
      <Router basename='/'>
        <Switch>
          <Route path="/" exact>
            <Login showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/register" exact>
            <Register showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/patients/profile" exact>
            <Patients showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/doctors/profile" exact>
            <Doctors showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/doctors/login" exact>
            <DoctorsLogin showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/admin/dashboard" exact>
            <Dashboard showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/meeting/meeting-page" exact>
            {/* Re-route to the patient's main page... */}
            <Meeting showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path='/patients/digital-health-passport' exact>
            <DigitalHealthPassport showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path='/doctors/complete-profile-registration' exact>
            <DoctorsProfileUpdate showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path='/doctors/profile-update-successful' exact>
            <ProfileUpdateSuccessful showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>

          <Route path="*">
            {/* Re-route to the patient's main page... */}
            <Page404 showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
