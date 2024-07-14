import { FhirResource } from "fhir/r4";
import { UIConfigTableItemInterface } from "../../interfaces";

export interface ResourceDetailsProps {
    buttonText: string;
    resource: FhirResource;
    detailsConfig: UIConfigTableItemInterface[]
}

export interface ResourceSummaryProps {
    detailsConfig: UIConfigTableItemInterface[];
    resource: FhirResource;
}