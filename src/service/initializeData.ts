import binApi from "../api/bin.api";
import crateApi from "../api/crate.api";
import parcelleApi from "../api/parcelle.api";

import { setNewBinGlobalInfo } from "../store/slices/globalInfo.slice";
import { AppDispatch } from "../store/store";
import { testConnexion } from "../utils/testConnexion";
import { useDispatch } from 'react-redux';
import { useAppContext } from '../context/App.context';
import workerApi from "../api/worker.api";
import gradeApi from "../api/grade.api";
import emplacementApi from "../api/emplacement.api";
import stageApi from "../api/stage.api";
import { updateBinListFromCode, updateParcelleListFromCode } from "../database/database.methode";


const dispatch = useDispatch<AppDispatch>();
const appContext = useAppContext();
export const initializeData = async () => {

    return new Promise(async (resolve, reject) => {
        try {
            if (await testConnexion()) {
                resolve('Data available');
                const [
                    parcelResult,
                    binResult,
                    crateResult,
                    WorkerResult,
                    gradeResulte,
                    emplacementResult,
                    stageResulte,
                    // weighingResulte,
                    // peseBinResult,
                    // peseBacResult,
                    // gradeResult,
                    // ofLavageResult,
                    // tableListeResult,
                    // ofEgrainageResult,
                    // ofPackagingResult,
                    // crateGradedResult,
                    // ofLavagePeseHorsCalibreListeResult,
                ] = await Promise.all([
                    parcelleApi.getParcelles(),
                    binApi.getBins(),
                    crateApi.getCrates(),
                    workerApi.getPeasants(),
                    gradeApi.getGrades(),
                    emplacementApi.getLocations(),
                    stageApi.getStages(),
                    // weighingApi.getWeighingRecords(),
                    // receptionApi.getPeseBinList(),
                    // // crateApi.getPeseeCrates(),
                    // gradeApi.getGrades(),
                    // ofLavageApi.getListOfLavageResponse(appContext),
                    // tableApi.getTableListe(),
                    // ofEgrainageApi.getOfEgrainageListe(),
                    // ofPackagingApi.getListOfPackagingResponse(appContext),
                    // crateApi.getCratesGraded(),
                    // ofLavageApi.getListePeseHorsCalibre(),
                ]);



                //   const hasInvalidUnit = binResult.data.some((binItem) => {
                //     if (binItem.unite !== 'g' && binItem.unite !== 'kg') {
                //       dispatch(setNewBinGlobalInfo({ isVisible: true, message: `Veuillez associer l'unité du BIN N° ${binItem.BN_CodeBIN}` }));
                //       return true; // Arrête l'itération
                //     }
                //     return false;
                //   });


                if (parcelResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: parcelResult.messages }));
                if (binResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: binResult.messages }));
                if (crateResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: crateResult.messages }));
                if (WorkerResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: WorkerResult.messages }));
                if (gradeResulte.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: gradeResulte.messages }));
                if (emplacementResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: emplacementResult.messages }));
                if (stageResulte.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: stageResulte.messages }));
                //   if (weighingResulte.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: weighingResulte.messages }));
                //   if (peseBinResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: peseBinResult.messages }));
                //   if (peseBac
                //   if (crateResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: crateResult.messages }));
                //   if (peasantResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: peasantResult.messages }));
                //   if (peseBinResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: peseBinResult.messages }));
                //   if (peseBacResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: peseBacResult.messages }));
                //   if (gradeResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: gradeResult.messages }));
                //   if (ofLavageResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: ofLavageResult.messages }));
                //   if (tableListeResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: tableListeResult.messages }));
                //   if (ofEgrainageResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: ofEgrainageResult.messages }));
                //   if (ofPackagingResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: ofPackagingResult.messages }));
                //   if (crateGradedResult.status_code !== 200) dispatch(setNewBinGlobalInfo({ isVisible: true, message: crateGradedResult.messages }));


                updateParcelleListFromCode(appContext, parcelResult.data);
                updateBinListFromCode(appContext, binResult.data);
                //   updateCrateListFromCode(appContext, crateResult.data);
                //   updatePeasantListFromCode(appContext, peasantResult.data);
                //   updateReceiveSavePeseBinListFromCode(appContext, peseBinResult.data);
                //   updatePesageListFromCode(appContext, peseBacResult.data);
                //   updateGradeListFromCode(appContext, gradeResult.data);
                //   updateOFLavageListFromCode(appContext, ofLavageResult.data);
                //   updateTableListFromCode(appContext, tableListeResult.data);
                //   updateOFEgrainageListFromCode(appContext, ofEgrainageResult.data);
                //   updateActiveOfPackagingFromCode(appContext, ofPackagingResult.data);
                //   updateCrateGradedListFromCode(appContext, crateGradedResult.data);
                //   updateOFLavagePeseHorsCalibreListFromCode(appContext, ofLavagePeseHorsCalibreListeResult.data);
                //Local database
                // updateAffectationBacPaysantListFromDatabase(appContext);
                // updateReceivePeseBinDataListFromDatabase(appContext);
                // updateSynchronizePeseeBacListFromDatabase(appContext);
                // updateAffectationBinParcelListFromDatabase(appContext);
                // resolve('Data available');

            } else {
                // updateParcelleListFromDatabase(appContext);
                // updateBinListFromDatabase(appContext);
                // updateCrateListFromDatabase(appContext);
                // updatePeasantListFromDatabase(appContext);
                // updateReceiveSavePeseBinListFromDatabase(appContext);
                // updatePesageListFromDatabase(appContext);
                // updateGradeListFromDatabase(appContext);
                //   updateOFLavageListFromDatabase(appContext);
                //   updateTableListFromDatabase(appContext);
                //   updateOFEgrainageListFromDatabase(appContext);
                //   updateOFPackagingListFromDatabase(appContext);
                //   updateCrateGradedListFromDatabase(appContext);
                //   updateOFLavagePeseHorsCalibreListFromDatabase(appContext);
                //Local database
                // updateAffectationBacPaysantListFromDatabase(appContext);
                // updateReceivePeseBinDataListFromDatabase(appContext);
                // updateSynchronizePeseeBacListFromDatabase(appContext);
                // updateAffectationBinParcelListFromDatabase(appContext);
                // resolve('Data available');

            }
        } catch (error) {
            console.log('__________________________eroor catch : ', error);
            reject(error.message);
        }
    });
};