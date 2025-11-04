import { AxiosError, AxiosResponse } from "axios"
import { UseMode } from "../app/_layout"
import { BDD_Local } from "../constants/BaseLocal"
import { getData } from "../helpers/AsyncStorage"
import axiosAPI from "../service/axios"
import { PARCELLES_LIST_V3 } from "../service/endPoint"
import { AxiosRequestResponse } from "./agentApi"
import { Parcel } from "../Interface/global/interface_V3"



export interface ParcelleAPI {
    parcel_id: number;
    parcel_name: string;
}

// const getDevModeParcelles = async () => {

//     const newxiosRespons: AxiosRequestResponse = {
//         data: listParcel,
//         messages: 'Liste des bin disponible',
//         status_code: 200
//     }
//     return newxiosRespons
// }
const getProdModeParcellesResponse = async () => {
    try {
        const axiosResponse = await axiosAPI.get(PARCELLES_LIST_V3)
        const axiosRequestResponse = axiosResponse.data as AxiosRequestResponse
        // console.log("pppppppppppppppppppppppppppppppppaaaaaaaaaaaaaaaaaaaaaaaaaaaaaarrrrrrrrrrrrrrrrrrrrrrrrrrrrr ", axiosRequestResponse)
        return axiosRequestResponse
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("Erreru d'axios : ", axiosError)
        const axiosErrorResponse = axiosError.response as AxiosResponse;
        const axiosRequestResponse = axiosErrorResponse.data as AxiosRequestResponse;
        return axiosRequestResponse

    }
}

const getProdModeParcelles = async (): Promise<AxiosRequestResponse> => {
    const axiosRequestResponse = await getProdModeParcellesResponse()
    if (axiosRequestResponse.status_code === 200) {
        const parcellListeAPI = axiosRequestResponse.data as ParcelleAPI[]
        const parcellListe = parcellListeAPI.map((parcelAPI) => {
            const newParcel: Parcel = {
                parcel_id: parcelAPI.parcel_id,
                parcel_name: parcelAPI.parcel_name,
            }
            return newParcel
        })

        const newxiosRespons: AxiosRequestResponse = {
            data: parcellListe,
            messages: 'Liste des bin disponible',
            status_code: 200
        }
        return newxiosRespons
    } else {
        const newxiosRespons: AxiosRequestResponse = {
            data: axiosRequestResponse.data,
            messages: axiosRequestResponse.messages,
            status_code: axiosRequestResponse.status_code,

        }
        return newxiosRespons
    }
}



const getParcelles = async () => {
    const useMode = await getData(BDD_Local.useMode) as UseMode
     return getProdModeParcelles()
    
       
}

export default { getParcelles }