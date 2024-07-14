import './App.css';

import { Button, Layout, Tabs } from 'antd';

import jsonData from './ui-config.json'
import { ResourceContent } from './components/ResourceContent';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Search from 'antd/es/input/Search';
import { useState } from 'react';
import logo from './assets/logo.png';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';

export interface UIConfigTableItemInterface {
  key: string;
  title: string;
  expression: string;
}

export interface UIConfigResourceInterface {
  resourceType: string;
  table: {
    items: UIConfigTableItemInterface[];
  };
  details: {
    items: UIConfigTableItemInterface[];
  };
}
export interface UIConfigInterface {
  resources: UIConfigResourceInterface[]
}

function App() {
  const [serverUrl, setServerUrl] = useState<string>('');
  const configData = jsonData as UIConfigInterface;
  const configItems = configData.resources

  const layoutStyle: React.CSSProperties = {
    width: '100%',
    height: '100vh'
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '16px',
    justifyItems: 'center',
    alignItems: 'center',
    backgroundColor: '#4096ff',
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#f1f1f1',
    padding: '32px'
  };

  const footerStyle: React.CSSProperties = {
    color: '#fff',
    backgroundColor: '#4096ff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <img src={logo} alt="Logo" style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Set"
          size="large"
          onSearch={(e) => setServerUrl(e)}
        />
      </Header>
      <Content style={contentStyle}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '32px' }}>
          <Tabs
            tabPosition={'left'}
            items={configItems.map((item) => {
              return {
                label: item.resourceType,
                key: item.resourceType,
                children: <ResourceContent resourceType={item.resourceType} resourceConfig={item} serverUrl={serverUrl} />,
              };
            })}
          />
        </div>
      </Content>
      <Footer style={footerStyle}>
        <div style={{ alignContent: 'center' }}><b>Sage UI</b> is FHIR resource viewer</div>
        <div style={{ alignContent: 'center' }}>Developed by <b>Pavel Rozhkov</b>, 2024</div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
          <a href="https://github.com/projkov/sage" target='_blank' rel="noopener noreferrer"><GithubOutlined style={{ fontSize: '25px', color: '#FFF' }}/></a>
          <a href="https://www.linkedin.com/in/pavelrozhkov" target='_blank' rel="noopener noreferrer"><LinkedinOutlined style={{ fontSize: '25px', color: '#FFF' }}/></a>
        </div>
      </Footer>
    </Layout>

  );
}

export default App;
