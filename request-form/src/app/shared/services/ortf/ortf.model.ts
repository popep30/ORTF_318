export interface OrtfRequest {
    clientName: string;
    ortfDirection: OrtfDirection;
    implementationDate: string;
    file: OrtfFile;
    status: string;
}

export enum OrtfDirection {
    Incoming = "Incoming",
    Outgoing = "Outgoing"
}

export interface OrtfFile {
    filename: string;
    data: string;
    type: OrtfFileType;
}

export enum OrtfFileType {
    Test = "Test",
    Production = "Production",
    Lag = "Lag"
}