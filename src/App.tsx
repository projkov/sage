import './App.css';

import { Layout, Tabs } from 'antd';

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

  return (
    <Layout className='layout'>
      <Header className='header'>
        <img src={logo} alt="Logo" className='logo'/>
        <Search
          placeholder="Write FHIR server URL to connect"
          allowClear
          enterButton="Connect"
          size="large"
          onSearch={(e) => setServerUrl(e)}
        />
      </Header>
      <Content className='content'>
        <div className='content-child'>
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
      <Footer className='footer'>
        <div className='footer-text-block'><b>Sage UI</b> is FHIR resource viewer</div>
        <div className='footer-text-block'>Developed by <b>Pavel Rozhkov</b>, 2024</div>
        <div className='footer-links'>
          <a href="https://github.com/projkov/sage" target='_blank' rel="noopener noreferrer"><GithubOutlined className="footer-icon"/></a>
          <a href="https://www.linkedin.com/in/pavelrozhkov" target='_blank' rel="noopener noreferrer"><LinkedinOutlined className="footer-icon"/></a>
        </div>
      </Footer>
    </Layout>

  );
}

export default App;
