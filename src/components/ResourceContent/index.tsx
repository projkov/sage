import { RenderRemoteData } from "@beda.software/fhir-react";
import { FhirResource, Bundle } from "fhir/r4";
import { useResourceInfo } from "../../hooks";
import { ResourceTable } from "../ResourceTable";
import { UIConfigResourceInterface } from "../../App";

interface ResourceContentProps {
    resourceType: string;
    resourceConfig: UIConfigResourceInterface;
}

export function ResourceContent(props: ResourceContentProps) {
    const { resourceType, resourceConfig } = props;
    const { response } = useResourceInfo(resourceType)

    return (
        <RenderRemoteData remoteData={response}>
            {(bundle) => (
                <ResourceTable
                    bundle={bundle as Bundle<FhirResource>}
                    tableConfig={resourceConfig.table.items}
                />
            )}
        </RenderRemoteData>
    )
}
