import React from "react";
import { Input, Menu } from "antd";
import "./style.css";

export const UploadInput = ({user})=>{

  const items = [
    {label:'Live video',key:'live'},
    {label:'Phone/video',key:'upload'},
    {label:'Feeling/activity',key:'feelings'},
  ]

  return(
    <div className="upload_main_container">
      <div className="upload_inner_container">
        <div className="main">
          <div className="input">
            <Input type="text" placeholder={`Hey ${user.profile?.first_name}, Want to write something?`}/>
          </div>
          <Menu mode="horizontal" className="actions_menu" items={items}
          />
        </div>
      </div>
    </div>
  )
}