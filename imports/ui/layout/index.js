import React from "react";
import { Layout, Menu } from "antd";
import { Header } from "./header/header";
import { useResize } from "../../api/helpers";
import { Routing } from "./routing";
import { ProfileMenu } from "../components/profile-menu/profile-menu";
import "./style.css";

const { Content, Sider} = Layout;

const items = [
  {key:'a',label:'a',icon:null,title:'a'},
  {key:'b',label:'b',icon:null,title:'b'},
  {key:'c',label:'c',icon:null,title:'c'},
]

export const App = ()=>{
  const { isMobile } = useResize();

  return(
      <Layout className='main_layout'>
        <div className="header">
          <Header/>
        </div>

        <Layout style={isMobile ? {}:{ marginLeft: '25em',marginRight:'15em' }}>
          {!isMobile &&
            <Sider theme="light" width={350} className="profile_sider">
              <ProfileMenu/>
            </Sider>
          }

          <Content style={{backgroundColor: 'whitesmoke'}}>
            <Routing/>
          </Content>

          {!isMobile &&
            <Sider theme="light" width={200} className="seconde-sider">
              <Menu
                mode="inline"
                items={items}
              />
            </Sider>
          }
        </Layout>
      </Layout>
  )
}