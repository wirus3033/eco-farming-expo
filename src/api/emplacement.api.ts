import { AxiosError, AxiosResponse } from "axios"
import { UseMode } from "../app/_layout"
import { BDD_Local } from "../constants/BaseLocal"
import { getData } from "../helpers/AsyncStorage"
import axiosAPI from "../service/axios"
import { LOCATIONS_LIST_V3, STAGES_LIST_V3, WORKERS_LIST_V3 } from "../service/endPoint"
import { AxiosRequestResponse } from "./agentApi"
import { Location, Stage, Worker } from "../Interface/global/interface_V3"

export interface LocationAPI {
    location_id: number;
    location_name: string;
    production_stage_id: number;
    production_stage_name: string;
}
const getProdModeLocationResponse = async () => {
    try {
        const axiosResponse = await axiosAPI.get(LOCATIONS_LIST_V3)
        const axiosRequestResponse = axiosResponse.data as AxiosRequestResponse
        return axiosRequestResponse
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("Tunel liste paysant axios error : ", axiosError)
        const axiosErrorResponse = axiosError.response as AxiosResponse;
        const axiosRequestResponse = axiosErrorResponse.data as AxiosRequestResponse;
        return axiosRequestResponse

    }

}

const getProdModeLocation = async (): Promise<AxiosRequestResponse> => {
    const axiosRequestResponse = await getProdModeLocationResponse()
    if (axiosRequestResponse.status_code === 200) {
        const stageListeAPI = axiosRequestResponse.data as LocationAPI[]
        const paysantListe = stageListeAPI.map((stageAPI) => {
            const newPesant: Location = {
                location_id: stageAPI.location_id,
                location_name: stageAPI.location_name,
                production_stage_id: stageAPI.production_stage_id,
                production_stage_name: stageAPI.production_stage_name,

            }
            return newPesant
        })


        const newxiosRespons: AxiosRequestResponse = {
            data: paysantListe,
            messages: axiosRequestResponse.messages,
            status_code: axiosRequestResponse.status_code
        }
        return newxiosRespons
    } else {
        const newxiosRespons: AxiosRequestResponse = {
            data: axiosRequestResponse.data,
            messages: axiosRequestResponse.messages,
            status_code: axiosRequestResponse.status_code
        }
        return newxiosRespons
    }
}




const getLocations = async () => {
    const useMode = await getData(BDD_Local.useMode) as UseMode
    return getProdModeLocation()
};


export default { getLocations };