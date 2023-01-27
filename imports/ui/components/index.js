import React from "react";
import { Layout, Drawer } from "antd";
import { useResize } from "../../api/helpers";

const {Header, Content, Sider} = Layout;

export const App = ()=>{
  const {isMobile} = useResize();

  return(
      <Layout className='main_layout'>
        <Header>
            sdfsd
        </Header>

        <Layout>
          <Sider theme="light">
            side
          </Sider>
          <Content style={{backgroundColor: 'whitesmoke'}}>
            Content
          </Content>
        </Layout>
      </Layout>
  )
}