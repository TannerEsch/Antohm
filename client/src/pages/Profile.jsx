import React, { useState } from "react";
import QuantDash from "../components/QuantDash";
import { ProfileNav, SocialDash } from "../components";

const Profile = () => {
  const [current, setCurrent] = useState(2)
  return (
    <>
    <ProfileNav setCurrent={setCurrent}/>
    {current == 1? <SocialDash /> :<QuantDash /> }
    </>
  );
};

export default Profile;