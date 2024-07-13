import './App.css';

import { Layout, Tabs } from 'antd';

import jsonData from './ui-config.json'
import { ResourceContent } from './components/ResourceContent';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Search from 'antd/es/input/Search';
import { useState } from 'react';

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
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
  };

  const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'gray',
    padding: '32px'
  };

  const footerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#4096ff',
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
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
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>

  );
}

export default App;
