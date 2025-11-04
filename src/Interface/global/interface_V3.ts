export interface Parcel {
    parcel_id: number;
    parcel_name: string;
}


export interface Stage {
    stage_id: number;
    stage_sequence: number;
    stage_name: string;
    stage_operation_type: string;
    stage_worker_weighed: boolean;
    stage_need_of: boolean;
    stage_need_of_standard: boolean;
    stage_need_weighing: boolean;
    stage_out_from_of: boolean;
    stage_one_one: boolean;
    stage_of_final: boolean;
    stage_need_worker: boolean;
    stage_need_grade: boolean;
    menu_id: number;
    menu_name: string;
}

export interface StageInTable {
    stage_id: number;
    stage_name: string;
    stage_sequence: number;
    stage_state: string;
}


export interface Crate {
    crate_id: number;
    crate_name: string;
    product_id: number;
    product_name: string;
    product_qty: number;
    grade_id: number;
    grade_name: string;
    flow_id: number;
    flow_name: string;
    state: string;
    stage_ids: StageInTable[];
}

export interface Bin {
    bin_id: number;
    bin_name: string;
    product_id: number;
    product_name: string;
    product_qty: number;
    grade_id: number;
    grade_name: string;
    flow_id: number;
    flow_name: string;
    state: string;
    stage_ids: StageInTable[];
}


export interface Location {
    location_id: number;
    location_name: string;
    production_stage_id: number;
    production_stage_name: string;
}


export interface Worker {
    worker_id: number;
    worker_name: string;
    registration: string;
}


export interface Grade {
    grade_id: number;
    grade_name: string;
}


export interface EntityRef {
    id: number;
    name: string;
}

export interface WeighingRecord {
    id: number;
    menu_id: EntityRef[];
    worker_id: EntityRef[];
    parcelle_id: EntityRef[];
    lot_id: EntityRef[];
    balance_code: string;
    weighing_ticket: string;
    weight: number;
    date_weighing: string;
    bin_recept_id: EntityRef[];
}


export interface WeighingResponse {
    data: WeighingRecord[];
    total: number;
    limit: number;
    offset: number;
}