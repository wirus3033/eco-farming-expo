import { AxiosError, AxiosResponse } from "axios";
import axiosAPI from "../service/axios";
import { CRATES_LIST_V3 } from "../service/endPoint";
import { AxiosRequestResponse } from "./agentApi";
import { getData } from "../helpers/AsyncStorage";
import { BDD_Local } from "../constants/BaseLocal";
import { UseMode } from "../app/_layout";
import { Crate } from "../Interface/global/interface_V3";




export interface CrateAPI {
    crate_id: number;
    crate_name: string;
    product_id: number;
    prduct_name: string;
    product_qty: number;
    grade_id: number;
    grade_name: string;
    flow_id: number;
    flow_name: string;
    state: string;
    stage_ids: any[];
}




const getProdModeCratesResponse = async () => {
    try {
        const axiosResponse = await axiosAPI.get(CRATES_LIST_V3);
        const axiosRequestResponse = axiosResponse.data as AxiosRequestResponse;
        console.log('Tunel liste crate axios errorwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww : ', axiosRequestResponse);
        return axiosRequestResponse;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log('Tunel liste crate axios errorwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww : ',);
        console.log('Tunel liste crate axios error : ', axiosError);
        const axiosErrorResponse = axiosError.response as AxiosResponse;
        const axiosRequestResponse = axiosErrorResponse.data as AxiosRequestResponse;
        return axiosRequestResponse;
    }
};

const getProdModeCrates = async (): Promise<AxiosRequestResponse> => {
    const axiosRequestResponse = await getProdModeCratesResponse();
    console.log('getProdModeCrates axiosRequestResponsewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww: ', axiosRequestResponse);
    if (axiosRequestResponse.status_code === 200) {
        const crateListeAPI = axiosRequestResponse.data as CrateAPI[];
        const crateListe = crateListeAPI.map(crateAPI => {
            const newCrate: Crate = {
                crate_id: crateAPI.crate_id,
                crate_name: crateAPI.crate_name,
                product_id: crateAPI.product_id,
                product_name: crateAPI.prduct_name,
                flow_id: crateAPI.flow_id,
                flow_name: crateAPI.flow_name,
                grade_id: crateAPI.grade_id,
                grade_name: crateAPI.grade_name,
                product_qty: crateAPI.product_qty,
                state: crateAPI.state,
                stage_ids: crateAPI.stage_ids,
            };
            return newCrate;
        });

        const newxiosRespons: AxiosRequestResponse = {
            data: crateListe,
            messages: 'Liste des crate disponible',
            status_code: 200,
        };
        return newxiosRespons;
    } else {
        const newxiosRespons: AxiosRequestResponse = {
            data: axiosRequestResponse.data,
            messages: axiosRequestResponse.messages,
            status_code: axiosRequestResponse.status_code,
        };
        console.log('getProdModeCrates axiosRequestResponsewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww: ', newxiosRespons);
        return newxiosRespons;
    }
};

const getCrates = async () => {
  const useMode = (await getData(BDD_Local.useMode)) as UseMode;
 return getProdModeCrates();
};

export default {getCrates};