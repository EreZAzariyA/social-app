import React from "react";
import { Layout, Menu } from "antd";
import { Header } from "./header/header";
import "./style.css";
import { ProfileMenu } from "./profile-menu/profile-menu";
import { useResize } from "../../api/helpers";
import { Routing } from "../components/routing";

const { Content, Sider} = Layout;

export const App = ()=>{
  const {isMobile} = useResize();

  return(
      <Layout className='main_layout'>
        <div className="header">
          <Header/>
        </div>

        <Layout>
          {!isMobile &&
            <Sider theme="light" width={300}>
              <ProfileMenu/>
            </Sider>
          }
          <Content style={{backgroundColor: 'whitesmoke'}}>
            <Routing/>
          </Content>
          {!isMobile &&
            <Sider theme="light" width={200}>
              <Menu
                mode="inline"
                items={[
                  {key:'a',label:'a',icon:null,title:'a'},
                  {key:'b',label:'b',icon:null,title:'b'},
                  {key:'c',label:'c',icon:null,title:'c'},
                ]}
              />
            </Sider>
          }
        </Layout>
      </Layout>
  )
}