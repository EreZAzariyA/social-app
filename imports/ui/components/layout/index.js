import React from "react";
import { Layout } from "antd";
import { useResize } from "../../../api/helpers";
import { Routing } from "../routing";
import { Header } from "./header/header";
import "./style.css";

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
            <Sider theme="light" collapsed collapsedWidth={350}>
              side
            </Sider>
          }
          <Content style={{backgroundColor: 'whitesmoke'}}>
            <Routing/>
          </Content>
          {!isMobile &&
            <Sider theme="light">
              side
            </Sider>
          }
        </Layout>
      </Layout>
  )
}