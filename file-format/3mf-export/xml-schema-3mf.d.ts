export interface Xml3mf {
    '?xml': {
        '@_version': '1.0'
        '@_encoding': 'UTF-8'
    }
    model: Xml3mfModel
}

export interface Xml3mfModel {
    '@_unit': Xml3mfUnit
    '@_xml:lang': 'en-US'
    '@_xmlns': 'http://schemas.microsoft.com/3dmanufacturing/core/2015/02'
    '@_xmlns:slic3rpe': 'http://schemas.slic3r.org/3mf/2017/06'
    metadata: { '@_name': string, '#text': string }[],
    resources: Xml3mfResource[]
    build: Xml3mfBuild
}

export interface Xml3mfResource {
    object: Xml3mfMeshObject | Xml3mfComponentObject
}

interface Xml3mfObjectBase {
    '@_id': number
    '@_type': 'model'
    '@_name'?: string
}

export interface Xml3mfMeshObject extends Xml3mfObjectBase {
    mesh: Xml3mfMesh
}

export interface Xml3mfComponentObject extends Xml3mfObjectBase {
    components: { component: Xml3mfComponent[] }
}

export interface Xml3mfMesh {
    vertices: { vertex: Xml3mfVertex[] }
    triangles: { triangle: Xml3mfTriangle[] }
}

export interface Xml3mfVertex {
    '@_x': string
    '@_y': string
    '@_z': string
}

export interface Xml3mfTriangle {
    '@_v1': number
    '@_v2': number
    '@_v3': number
}

export interface Xml3mfBuild {
    item: Xml3mfItem[]
}

export interface Xml3mfItem {
    '@_objectid': number
    '@_transform'?: string
}

export interface Xml3mfComponent {
    '@_objectid': number,
    '@_transform'?: string
}

export type Xml3mfUnit = 'micron' | 'millimeter' | 'centimeter' | 'inch' | 'foot' | 'meter'

export interface Xml3mfRelationFile {
    '?xml': {
        '@_version': '1.0'
        '@_encoding': 'UTF-8'
    }
    Relationships: {
        '@_xmlns': 'http://schemas.openxmlformats.org/package/2006/relationships'
        Relationship: {
            '@_Target': string
            '@_Id': string
            '@_Type': string
        }[]
    }
}