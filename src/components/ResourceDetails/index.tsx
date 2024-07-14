import { useState } from 'react';
import { Button, Descriptions, Drawer, Tabs } from 'antd';
import { Editor } from '@monaco-editor/react';
import { ResourceDetailsProps, ResourceSummaryProps } from './interfaces';
const fhirpath = require('fhirpath');

const fhirpath_r4_model = require('fhirpath/fhir-context/r4');

export function ResourceDetails(props: ResourceDetailsProps) {
    const [open, setOpen] = useState(false);
    const { buttonText, resource, detailsConfig } = props;

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const drawerTitle = `${resource.resourceType}/${resource.id}`

    return (
        <>
            <Button type="link" onClick={showDrawer}>
                {buttonText}
            </Button>
            <Drawer title={drawerTitle} onClose={onClose} open={open} width={900}>
                <Tabs defaultActiveKey="1" items={[
                    { key: '1', label: 'Summary', children: <ResourceSummary detailsConfig={detailsConfig} resource={resource} /> },
                    { key: '2', label: 'JSON', children: <><Editor height="90vh" defaultLanguage="json" defaultValue={JSON.stringify(resource, null, 2)} /></> }
                ]} />
            </Drawer>
        </>
    );
};

function ResourceSummary(props: ResourceSummaryProps) {
    const { detailsConfig, resource } = props;
    return <Descriptions title="Details" bordered items={detailsConfig.map((item, index) => {
        return {
            key: index,
            label: item.title,
            children: fhirpath.evaluate(resource, item.expression, null, fhirpath_r4_model).join(', ')
        }
    })} />
}
