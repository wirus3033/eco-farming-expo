import { AxiosError, AxiosResponse } from "axios"
import { UseMode } from "../app/_layout"
import { BDD_Local } from "../constants/BaseLocal"
import { getData } from "../helpers/AsyncStorage"
import axiosAPI from "../service/axios"
import { WORKERS_LIST_V3 } from "../service/endPoint"
import { AxiosRequestResponse } from "./agentApi"
import { Worker } from "../Interface/global/interface_V3"


// export interface PeasantResponse {
//   CodeRetour:number,
//   message:string
//   data: Worker[];
// }
// const  getDevModePeasant = async() => {
//   const newxiosRespons:AxiosRequestResponse={
//     data:peasantResponse.data,
//     messages:'Liste de paysans disponible',
//     status_code:200
//   }
//    return newxiosRespons
// }

export interface PeasantAPI {
    peasant_id: number;
    peasant_name: string;
    peasant_registration: string;
}
const getProdModePeasantResponse = async () => {
    try {
        const axiosResponse = await axiosAPI.get(WORKERS_LIST_V3)
        const axiosRequestResponse = axiosResponse.data as AxiosRequestResponse
        console.log("woooooooooooooooooooooooooooooooooooooooorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrkkkkkkkkkkkkkerr : ", axiosRequestResponse)
        return axiosRequestResponse
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("Tunel liste paysant axios error : ", axiosError)
        const axiosErrorResponse = axiosError.response as AxiosResponse;
        const axiosRequestResponse = axiosErrorResponse.data as AxiosRequestResponse;
        return axiosRequestResponse

    }

}

const getProdModePeasant = async (): Promise<AxiosRequestResponse> => {
    const axiosRequestResponse = await getProdModePeasantResponse()
    if (axiosRequestResponse.status_code === 200) {
        const paysantListeAPI = axiosRequestResponse.data as PeasantAPI[]
        const paysantListe = paysantListeAPI.map((paysantAPI) => {
            const newPesant: Worker = {
                worker_id: paysantAPI.peasant_id,
                worker_name: paysantAPI.peasant_name,
                registration: paysantAPI.peasant_registration,

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




const getPeasants = async () => {
    const useMode = await getData(BDD_Local.useMode) as UseMode
    return getProdModePeasant()
};


export default { getPeasants };