export interface UIConfigTableItemInterface {
    key: string;
    title: string;
    expression: string;
}

export interface UIConfigResourceInterface {
    resourceType: string;
    table: {
        items: UIConfigTableItemInterface[];
    };
    details: {
        items: UIConfigTableItemInterface[];
    };
}
export interface UIConfigInterface {
    resources: UIConfigResourceInterface[]
}