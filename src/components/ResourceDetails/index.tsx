import React, { useState } from 'react';
import { Button, Drawer, Tabs } from 'antd';
import { FhirResource } from 'fhir/r4';
import { Editor } from '@monaco-editor/react';

interface ResourceDetailsProps {
    buttonText: string;
    resource: FhirResource;
}

export function ResourceDetails(props: ResourceDetailsProps) {
    const [open, setOpen] = useState(false);
    const { buttonText, resource } = props;

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
                    {key: '1', label: 'JSON', 'children': <><Editor height="90vh" defaultLanguage="json" defaultValue={JSON.stringify(resource, null, 2)} /></>}
                ]} />
            </Drawer>
        </>
    );
};
