interface GoveeDevice {
    sku: string,
    device: string,
    deviceName: string,
    type: string,
    capabilities: GoveeCapability[]
}

interface GoveeApiResponse {
    code: number,
    message: string,
    data: GoveeDevice[]
}

interface GoveeCapability {
    type: string
    instance: string,
    value?: number | string,
    parameters?: GoveeParameters
}

interface GoveeParameters {
    dataType: 'ENUM' | 'INTEGER' | 'STRUCT',
    unit?: 'unit.percent',
    options?: GoveeOptions[]
    range?: GoveeRange
    fields: GoveeFields[]
}

interface GoveeOptions {
    name?: string,
    value: number
}

interface GoveeRange {
    min: number,
    max: number,
    precision: number
}

interface GoveeFields {
    fieldName: string,
    dataType: 'ENUM' | 'INTEGER' | 'Array',
    options?: GoveeOptions
    range?: GoveeRange
    required: boolean,
    unit?: 'unit.percent'
}

export type {
    GoveeDevice,
    GoveeApiResponse,
    GoveeCapability,
    GoveeFields,
    GoveeOptions,
    GoveeParameters,
    GoveeRange
}