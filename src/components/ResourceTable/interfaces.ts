import { Bundle } from "fhir/r4";
import { UIConfigTableItemInterface } from "../../interfaces";

export interface ResourceTableProps {
    bundle: Bundle;
    tableConfig: UIConfigTableItemInterface[];
    detailsConfig: UIConfigTableItemInterface[];
}
