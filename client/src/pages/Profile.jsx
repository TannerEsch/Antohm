import React, { useState } from "react";
import QuantDash from "../components/QuantDash";
import { ProfileNav, SocialDash } from "../components";

const Profile = () => {
  const [current, setCurrent] = useState(1)
  return (
    <>
    <div className="fixed right-5 mt-20 3xl:mr-4 lg:hidden 1.5xl:mr-1 1.5xl:scale-80"><ProfileNav setCurrent={setCurrent}/></div>
    <div className="2xs:w-screen">{current == 1? <SocialDash /> :<QuantDash /> }</div>
    </>
  );
};

export default Profile;