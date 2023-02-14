import React, { lazy } from "react";
import { Layout, Menu } from "antd";
import { Header } from "./header/header";
import { useResize } from "../../api/helpers";
import { Routing } from "./routing";
import "./style.css";

const Bookmarks = lazy(()=>import('../components/bookmarks/index'));

const { Content, Sider} = Layout;

const items = [
  {key:'a',label:'a',icon:null,title:'a'},
  {key:'b',label:'b',icon:null,title:'b'},
  {key:'c',label:'c',icon:null,title:'c'},
]

export const App = ()=>{
  const { isMobile, isResponsive } = useResize();

  return(
      <Layout className='main_layout'>
        <div className="header">
          <Header/>
        </div>

        <Layout 
          style={!isResponsive ? { marginLeft: '25em',marginRight: '14.5em' } : !isMobile ? { marginRight: '14.5em'} : {}}
        >
          {!isResponsive &&
            <Sider theme="light" 
              width={350}
              className="profile_sider"
            >
              <Bookmarks/>
            </Sider>
          }

          <Content>
            <Routing/>
          </Content>

          {!isMobile &&
            <Sider 
              theme="light" 
              width={200} 
              className="seconde-sider"
            >
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