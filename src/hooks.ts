import { initServices, useService } from "@beda.software/fhir-react";
import { useMemo } from "react";

export function useResourceInfo(resourceType: string, serverUrl: string) {
    const { getFHIRResources } = useMemo(() => initServices(serverUrl), [serverUrl])
    const [response] = useService(async () => {
        return await getFHIRResources(resourceType, {});
    }, [getFHIRResources])

    return { response }
}