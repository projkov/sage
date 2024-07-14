import { Table } from 'antd';
import { ResourceTableProps } from './interfaces';
import { prepareData, prepareTableColumns } from './utils';


export function ResourceTable(props: ResourceTableProps) {
    const { tableConfig, bundle, detailsConfig } = props;
    return (
        <Table
            columns={prepareTableColumns(tableConfig)}
            dataSource={prepareData(bundle, tableConfig, detailsConfig)}
        />
    );
}
