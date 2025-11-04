import { AxiosError, AxiosResponse } from "axios";
import axiosAPI from "../service/axios";
import { BINS_LIST_V3 } from "../service/endPoint";
import { AxiosRequestResponse } from "./agentApi";
import { getData } from "../helpers/AsyncStorage";
import { BDD_Local } from "../constants/BaseLocal";
import { UseMode } from "../app/_layout";
import { Bin } from "../Interface/global/interface_V3";



interface BinAPI {
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
 stage_ids: any[];
}

const getProdModeBinsResponse = async () => {
    try {
        const axiosResponse = await axiosAPI.get(BINS_LIST_V3);
        const axiosRequestResponse = axiosResponse.data as AxiosRequestResponse;
        console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbiiiiiiiiiiiiiiiiiiiiiiiiiinnnnnnnnnnnnnnnnnnnnnnsss ', axiosRequestResponse);
        return axiosRequestResponse;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log('Tunel liste bin axios error : ', axiosError);
        const axiosErrorResponse = axiosError.response as AxiosResponse;
        const axiosRequestResponse = axiosErrorResponse.data as AxiosRequestResponse;
        return axiosRequestResponse;
    }
};

const getProdModeBins = async (): Promise<AxiosRequestResponse> => {
    const axiosRequestResponse = await getProdModeBinsResponse();
    if (axiosRequestResponse.status_code === 200) {
        const binListeAPI = axiosRequestResponse.data as BinAPI[];
        const binListe = binListeAPI.map(binAPI => {
            const newLocatBin: Bin = {
                bin_id: binAPI.bin_id,
                bin_name: binAPI.bin_name,
                product_id: binAPI.product_id,
                product_name: binAPI.product_name,
                flow_id: binAPI.flow_id,
                flow_name: binAPI.flow_name,
                grade_id: binAPI.grade_id,
                grade_name: binAPI.grade_name,
                product_qty: binAPI.product_qty,
                state: binAPI.state,
                stage_ids: binAPI.stage_ids,
            };
            return newLocatBin;
        });

        const newxiosRespons: AxiosRequestResponse = {
            data: binListe,
            messages: 'Liste des bin disponible',
            status_code: 200,
        };
        return newxiosRespons;
    } else {
        const newxiosRespons: AxiosRequestResponse = {
            data: axiosRequestResponse.data,
            messages: axiosRequestResponse.messages,
            status_code: axiosRequestResponse.status_code,
        };
        return newxiosRespons;
    }
};

const getBins = async () => {
    const useMode = (await getData(BDD_Local.useMode)) as UseMode;
    return getProdModeBins();
};

export default { getBins };