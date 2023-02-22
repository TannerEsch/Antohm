import React from "react";
import "../styles/profile.css"
import Kanban from "./Kanban";
import DashboardApps from "../components/DashboardApps";
import { TodoList, ProfileSideBar } from "../components";

const Profile = () => {


  return (
    <div>
  <ProfileSideBar />
    <DashboardApps />
    <div className="profile-page__container">
       <Kanban />
       <TodoList/>
      </div>
      </div>
  );
};

export default Profile;