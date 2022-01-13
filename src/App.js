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
      <Router basename='/Austin'>
        <Switch>
          <Route path="/" exact>
            <Login showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/register" exact>
            <Register showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/patients/profile">
            <Patients showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/doctors/profile">
            <Doctors showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/doctors/login">
            <DoctorsLogin showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="/admin/dashboard">
            <Dashboard showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
          <Route path="*">
            {/* Re-route to the patient's main page... */}
            <Patients showToast={ShowToast} setIsLoaderVisible={setIsLoaderVisible} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
