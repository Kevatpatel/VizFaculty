import React from "react";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import PublicationsPage from "./components/PublicationsPage";
import PrivateRoutes from "./components/PrivateRoutes";
import { Navigate } from "react-router-dom";
import RoleBaseRoutes from "./components/RoleBaseRoutes";
 import AdminSummary from "./components/AdminSummary";
import DepartmentList from "./components/DepartmentList";
import AddDepartment from "./components/AddDepartment";
import EditDepartment from "./components/EditDepartment";
import List from './components/List'
import Add from './components/Add'
import View from './components/View'
import ReceivedPublication from "./components/ReceivedPublication";
import PublicationForm from "./components/PublicationForm";
import FacultyHomepage from "./components/FacultyHomePage";
import JournalPublicationForm from "./components/JournelPublicationForm";
import ConferencePublication from "./components/ConferencePublicationForm";
import { JournalPublicationRequest } from "./components/JournalPublicationRequest";
import { ConferencePublicationRequest } from "./components/ConferencePublicationRequest";
import FacultyProfile from "./components/FacultyProfile";
import Allpublications from "./components/Allpublications"



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin-dashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole = {["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
          
          
          }>
            <Route index element = {<AdminSummary/>}></Route>
            <Route path="/admin-dashboard/department" element = {<DepartmentList/>}></Route>
            <Route path="/admin-dashboard/add-department" element = {<AddDepartment/>}></Route>
            <Route path="/admin-dashboard/department/:id" element = {<EditDepartment/>}></Route>
            <Route path="/admin-dashboard/faculties" element = {<List/>}></Route>
            <Route path="/admin-dashboard/add-faculty" element = {<Add/>}></Route>
            <Route path="/admin-dashboard/faculties/:id" element = {<View/>}></Route>
            <Route path="/admin-dashboard/receivedpublications" element={<ReceivedPublication />} /> 
            <Route path="/admin-dashboard/receivedpublications/journalpublication" element={<JournalPublicationRequest/>}/>
            <Route path="/admin-dashboard/receivedpublications/conferencepublication" element={<ConferencePublicationRequest/>}/>
            <Route path="/admin-dashboard/publications" element = {<Allpublications/>}></Route>
          </Route>
        <Route path="/employee-dashboard" element={<FacultyHomepage />}></Route>
        <Route path="/employee-dashboard/journal-publication-form" element={<JournalPublicationForm />} />
        <Route path="/employee-dashboard/conference-publication-form" element={<ConferencePublication />} />
        <Route path="/employee-dashboard/profile" element={<FacultyProfile />}></Route>
      </Routes>
    </BrowserRouter> 
  );
};

export default App;