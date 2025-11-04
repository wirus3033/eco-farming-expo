import { AxiosError, AxiosResponse } from "axios"
import { UseMode } from "../app/_layout"
import { BDD_Local } from "../constants/BaseLocal"
import { getData } from "../helpers/AsyncStorage"
import axiosAPI from "../service/axios"
import { GRADES_LIST_V3, WORKERS_LIST_V3 } from "../service/endPoint"
import { AxiosRequestResponse } from "./agentApi"
import { Grade, Worker } from "../Interface/global/interface_V3"




export interface GradeAPI {
    grade_id: number;
    grade_name: string;
}
const getProdModeGradeResponse = async () => {
    try {
        const axiosResponse = await axiosAPI.get(GRADES_LIST_V3)
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

const getProdModeGrade = async (): Promise<AxiosRequestResponse> => {
    const axiosRequestResponse = await getProdModeGradeResponse()
    if (axiosRequestResponse.status_code === 200) {
        const gradeListeAPI = axiosRequestResponse.data as GradeAPI[]
        const paysantListe = gradeListeAPI.map((gradeAPI) => {
            const newPesant: Grade = {
                grade_id: gradeAPI.grade_id,
                grade_name: gradeAPI.grade_name,

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




const getGrades = async () => {
    const useMode = await getData(BDD_Local.useMode) as UseMode
   return getProdModeGrade()
};


export default { getGrades };