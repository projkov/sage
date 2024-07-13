import { Table } from 'antd';
import { Bundle } from 'fhir/r4';
import { UIConfigTableItemInterface } from '../../App';
import { ResourceDetails } from '../ResourceDetails';
const fhirpath = require('fhirpath');

const fhirpath_r4_model = require('fhirpath/fhir-context/r4');


function prepareData(bundle: Bundle, tableConfig: UIConfigTableItemInterface[]) {
    return bundle.entry?.map((entry, index) => {
        let resultObj: { [key: string]: any } = {};
        tableConfig.forEach((tableItem) => {
            const expressionResult = fhirpath.evaluate(entry.resource, tableItem.expression, null, fhirpath_r4_model).join(', ')
            resultObj[tableItem.key as string] = expressionResult
        })
        resultObj['key'] = index
        resultObj['resource'] = entry.resource

        return resultObj
    })
}

function prepareTableColumns(tableConfig: UIConfigTableItemInterface[]) {
    return tableConfig.map((tableItem, index) => {
        return {
            title: tableItem.title,
            dataIndex: tableItem.key,
            key: tableItem.key,
            render: (data: any, item: any) => index !== 0 ? <>{data}</> : <ResourceDetails buttonText={data} resource={item.resource!}/>
        }
    })
}

export function ResourceTable({ bundle, tableConfig }: { bundle: Bundle, tableConfig: UIConfigTableItemInterface[] }) {
    return (
        <Table
            columns={prepareTableColumns(tableConfig)}
            dataSource={prepareData(bundle, tableConfig)}
        />
    );
}
