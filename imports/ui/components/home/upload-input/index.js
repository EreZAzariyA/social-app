import React from "react";
import { Input, Menu } from "antd";
import "./style.css";

export const UploadInput = ({user})=>{
  return(
    <div className="main_container">
      <div className="inner_container">
        <div className="main">
          <div className="input">
            <Input type="text" placeholder={`Hey ${user.profile?.first_name}, Want to write something?`}/>
          </div>
          <Menu mode="horizontal" className="actions_menu" items={[
            {label:'Live video',key:'live'},
            {label:'Phone/video',key:'upload'},
            {label:'Feeling/activity',key:'feelings'},
          ]}
          />
        </div>
      </div>
    </div>
  )
}