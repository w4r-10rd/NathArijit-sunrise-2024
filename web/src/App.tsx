import React from 'react';
import { Layout } from 'antd';
import Taskboard from './components/Taskboard';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Taskboard />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Taskboard System ©2024
      </Footer>
    </Layout>
  );
};

export default App;
