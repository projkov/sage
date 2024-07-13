import './App.css';

import { Tabs } from 'antd';

import jsonData from './ui-config.json'
import { ResourceContent } from './components/ResourceContent';

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
  const configData = jsonData as UIConfigInterface;
  const configItems = configData.resources

  return (
    <div className="App">
      <Tabs
        tabPosition={'left'}
        items={configItems.map((item) => {
          return {
            label: item.resourceType,
            key: item.resourceType,
            children: <ResourceContent resourceType={item.resourceType} resourceConfig={item} />,
          };
        })}
      />
    </div>
  );
}

export default App;
