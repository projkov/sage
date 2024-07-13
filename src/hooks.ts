import { initServices, useService } from "@beda.software/fhir-react";

export function useResourceInfo(resourceType: string) {
    const {
        getFHIRResources,
    } = initServices('https://fhir-server.com' + '/fhir');
    const [response] = useService(async () => {
        return await getFHIRResources(resourceType, {});
    }, [])

    return { response }
}