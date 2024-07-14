import { RenderRemoteData } from "@beda.software/fhir-react";
import { FhirResource, Bundle } from "fhir/r4";
import { useResourceInfo } from "../../hooks";
import { ResourceTable } from "../ResourceTable";
import { ResourceContentProps } from "./interfaces";
import { Result } from "antd";

export function ResourceContent(props: ResourceContentProps) {
    const { resourceType, resourceConfig, serverUrl } = props;
    const { response } = useResourceInfo(resourceType, serverUrl)

    return (
        <RenderRemoteData remoteData={response} renderFailure={() => {
            if (serverUrl === '') {
                return <Result
                    style={{ marginTop: '150px' }}
                    title="Please enter the FHIR server URL to establish a connection."
                    extra={[
                        'Make sure the URL is correct and accessible to ensure successful integration.'
                    ]}
                />
            }

            return <Result
                style={{ marginTop: '150px' }}
                status="error"
                title="Something went wrong"
                extra={["The FHIR server URL you provided is incorrect or there was an issue connecting to the server. Please check the URL and try again."]}
            />
        }}>
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
