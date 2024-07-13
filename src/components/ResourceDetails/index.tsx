import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { FhirResource } from 'fhir/r4';

interface ResourceDetailsProps {
    buttonText: string;
    resource: FhirResource;
}

export function ResourceDetails(props: ResourceDetailsProps){
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
            <Drawer title={drawerTitle} onClose={onClose} open={open} width={720}>
                {JSON.stringify(resource, null, 2)}
            </Drawer>
        </>
    );
};
