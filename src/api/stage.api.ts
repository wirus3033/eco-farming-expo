import { AxiosError, AxiosResponse } from "axios"
import { UseMode } from "../app/_layout"
import { BDD_Local } from "../constants/BaseLocal"
import { getData } from "../helpers/AsyncStorage"
import axiosAPI from "../service/axios"
import { STAGES_LIST_V3, WORKERS_LIST_V3 } from "../service/endPoint"
import { AxiosRequestResponse } from "./agentApi"
import { Stage, Worker } from "../Interface/global/interface_V3"

export interface StageAPI {
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
const getProdModeStageResponse = async () => {
    try {
        const axiosResponse = await axiosAPI.get(STAGES_LIST_V3)
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

const getProdModeStage = async (): Promise<AxiosRequestResponse> => {
    const axiosRequestResponse = await getProdModeStageResponse()
    if (axiosRequestResponse.status_code === 200) {
        const stageListeAPI = axiosRequestResponse.data as StageAPI[]
        const paysantListe = stageListeAPI.map((stageAPI) => {
            const newPesant: Stage = {
                stage_id: stageAPI.stage_id,
                stage_sequence: stageAPI.stage_sequence,
                stage_name: stageAPI.stage_name,
                stage_operation_type: stageAPI.stage_operation_type,
                menu_id: stageAPI.menu_id,
                menu_name: stageAPI.menu_name,
                stage_worker_weighed: stageAPI.stage_worker_weighed,
                stage_need_grade: stageAPI.stage_need_grade,
                stage_need_of: stageAPI.stage_need_of,
                stage_need_of_standard: stageAPI.stage_need_of_standard,
                stage_need_weighing: stageAPI.stage_need_weighing,
                stage_need_worker: stageAPI.stage_need_worker,
                stage_of_final: stageAPI.stage_of_final,
                stage_one_one: stageAPI.stage_one_one,
                stage_out_from_of: stageAPI.stage_out_from_of,

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




const getStages = async () => {
    const useMode = await getData(BDD_Local.useMode) as UseMode
   return getProdModeStageResponse()
};


export default { getStages };