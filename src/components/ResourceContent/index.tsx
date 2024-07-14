import { RenderRemoteData } from "@beda.software/fhir-react";
import { FhirResource, Bundle } from "fhir/r4";
import { useResourceInfo } from "../../hooks";
import { ResourceTable } from "../ResourceTable";
import { ResourceContentProps } from "./interfaces";

export function ResourceContent(props: ResourceContentProps) {
    const { resourceType, resourceConfig, serverUrl} = props;
    const { response } = useResourceInfo(resourceType, serverUrl)

    return (
        <RenderRemoteData remoteData={response}>
            {(bundle) => (
                <ResourceTable
                    bundle={bundle as Bundle<FhirResource>}
                    tableConfig={resourceConfig.table.items}
                    detailsConfig={resourceConfig.details.items}
                />
            )}
        </RenderRemoteData>
    )
}
