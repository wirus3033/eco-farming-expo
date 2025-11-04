import { useDispatch } from 'react-redux';
import peasantApi from '../api/peasant.api';
import receptionApi, { ReceiveSavePeseBin } from '../api/reception.api';
import { BDD_Local } from '../constants/BaseLocal';
import { getData, storeData } from '../helpers/AsyncStorage';

import store, { AppDispatch } from '../../store';
import { setNewPeasantList } from '../../store/paysan/paysantListSlice';
import crateApi from '../api/crate.api';
import crateEntityService from '../helpers/database/entityservice/crate.entity.service';
import { setNewBacList } from '../../store/bac/bacListeSlice';
import parcelleEntityService from '../helpers/database/entityservice/parcelle.entity.service';
import binEntityService from '../helpers/database/entityservice/bin.entity.service';
import parcelleApi from '../api/parcelle.api';
import { setNewParcelles } from '../../store/parcel/ParcelleSlice';
import binApi from '../api/bin.api';
import { setNewBinList } from '../../store/bin/BinSlice';
import { setNewReceiveSavePeseBinList } from '../../store/receivePeseBin/receivePeseBin.slice';
import receiveSavePeseBinEntityService from '../helpers/database/entityservice/receiveSavePeseBin.entity.service';
import {
    AffectationBacPaysant,
    CrateGraded,
    DataAffectationBACGrade,
    Grade,
    PesageInterface,
    PeseeBac,
    ReceivePeseBinData,
    SettingApp,
    Table,
} from '../helpers/database/entitie';
import affectaionBacPaysantService from '../helpers/database/entityservice/affectaionBacPaysant.entity.service';
import { setNewAffectationPeasantList } from '../../store/affectation/affectationBacSlice';
import { AppContextType } from '../context/App.context';
import AffectationBinParcelEntityService from '../helpers/database/entityservice/AffectationBinParcel.entity.service';
import pesageInterfaceEntityService from '../helpers/database/entityservice/pesageInterface.entity.service';
import gradeApi from '../api/grade.api';
import gradeEntityService from '../helpers/database/entityservice/grade.entity.service';
import affectationBacGradeEntityService from '../helpers/database/entityservice/affectationBacGrade.entity.service';
import receivePeseBinDataEntityService from '../helpers/database/entityservice/receivePeseBinData.entity.service';
import peseeBacEntityService from '../helpers/database/entityservice/peseeBac.entity.service';
import { resolve } from 'path';
import tableApi from '../api/table.api';
import { SynchronisationError } from '../components/synchronization/Synchronization';
import { setNewBinGlobalInfo } from '../../store/globalInfo/globalInfo.slice';
import { Bin, Crate, Parcel, Worker } from '../Interface/global/interface_V3';
import { DataEditPoidsInterface } from '../Interface/global/database.interface';

//JSON DATABASSE
//Crate method
export const updateCrateListFromApi = (appContext: AppContextType) => {
    return new Promise(resolve => {
        // Corrigé "resovle" en "resolve"
        crateApi
            .getCrates()
            .then(listCrateResponse => {
                if (listCrateResponse.status_code === 200) {
                    const listCrate = listCrateResponse.data as Crate[];
                    console.log('listCrate obtenu', listCrate.length);
                    appContext.setCrateListe(listCrate); // Utilisation du set pour mettre à jour la liste
                    storeData(BDD_Local.crateListe, JSON.stringify(listCrate));
                    resolve(true); // Utilise "resolve" ici
                } else {
                    console.log("Erreur de recupereation de liste de crate ", listCrateResponse.data);
                    store.dispatch(setNewBinGlobalInfo({ isVisible: true, message: listCrateResponse.messages }))
                    resolve(false); // Utilise "resolve" ici
                }
            })
            .catch(error => {
                console.log("Erreur de recupereation de liste de crate ", error);
                resolve(false); // Utilise "resolve" ici
            });
    });
};

export const updateCrateListFromDatabase = (appContext: AppContextType) => {
    return new Promise(async resolve => {
        const listCrateResponse = await getData(BDD_Local.crateListe);
        if (listCrateResponse) {
            const listCrate = (await JSON.parse(listCrateResponse)) as Crate[];
            appContext.setCrateListe(listCrate); // Utilisation du set pour mettre à jour la liste
        }
        resolve(true);
    });
};
export const updateCrateListFromCode = (appContext: AppContextType, crateList: Crate[]) => {
    return new Promise(resolve => {
        appContext.setCrateListe(crateList); // Utilisation du set pour mettre à jour la liste
        storeData(BDD_Local.crateListe, JSON.stringify(crateList));
        resolve(true);
    });
};

//Crate method
export const updateCrateGradedListFromApi = (appContext: AppContextType) => {
    return new Promise(resolve => {
        // Corrigé "resovle" en "resolve"
        crateApi
            .getCratesGraded()
            .then(listCrateGradedResponse => {
                if (listCrateGradedResponse.status_code === 200) {
                    const listCrateGraded = listCrateGradedResponse.data as CrateGraded[];
                    appContext.setCrateGradedListe(listCrateGraded); // Utilisation du set pour mettre à jour la liste
                    storeData(BDD_Local.crateGradedListe, JSON.stringify(listCrateGraded));
                    resolve(true); // Utilise "resolve" ici
                } else {
                    store.dispatch(setNewBinGlobalInfo({ isVisible: true, message: listCrateGradedResponse.messages }))
                    resolve(false); // Utilise "resolve" ici
                }
            })
            .catch(error => {
                resolve(false); // Utilise "resolve" ici
            });
    });
};

export const updateCrateGradedListFromDatabase = (appContext: AppContextType) => {
    return new Promise(async resolve => {
        const listCrateGradedResponse = await getData(BDD_Local.crateGradedListe);
        if (listCrateGradedResponse) {
            const listCrateGraded = (await JSON.parse(listCrateGradedResponse)) as CrateGraded[];
            appContext.setCrateGradedListe(listCrateGraded); // Utilisation du set pour mettre à jour la liste
        }
        resolve(true);
    });
};
export const updateCrateGradedListFromCode = (appContext: AppContextType, crateList: CrateGraded[]) => {
    return new Promise(resolve => {
        appContext.setCrateGradedListe(crateList); // Utilisation du set pour mettre à jour la liste
        storeData(BDD_Local.crateGradedListe, JSON.stringify(crateList));
        resolve(true);
    });
};

export const updatePeasantListFromApi = (appContext: AppContextType) => {
    return new Promise(resolve => {
        peasantApi
            .getPeasants()
            .then(listPaysanResponse => {
                if (listPaysanResponse.status_code === 200) {
                    const peasantList = listPaysanResponse.data as Peasant[];
                    console.log('peasantList obtenu', peasantList.length);
                    appContext.setPeasantListe(peasantList); // Utilisation du set pour mettre à jour la liste
                    storeData(BDD_Local.peasantListe, JSON.stringify(peasantList));
                    resolve(true); // Succès : retourne true
                } else {
                    console.log("Erreur de recupereation de liste de paysant ", listPaysanResponse.data);
                    store.dispatch(setNewBinGlobalInfo({ isVisible: true, message: listPaysanResponse.messages }));
                    resolve(false); // Statut inattendu : retourne false
                }
            })
            .catch((error) => {
                console.log("Erreur de recupereation de liste de paysant ", error);
                resolve(false)
            }); // Erreur : retourne false
    });
};

export const updatePeasantListFromDatabase = (appContext: AppContextType) => {
    return new Promise(async resolve => {
        const listPaysanResponse = await getData(BDD_Local.peasantListe);
        if (listPaysanResponse) {
            const peasantList = (await JSON.parse(listPaysanResponse)) as Worker[];
            appContext.workerListe(peasantList); // Utilisation du set pour mettre à jour la liste
            resolve(true);
        } else {
            resolve(false);
        }
    });
};

export const updateWorkerListFromCode = (appContext: AppContextType, peasantList: Worker[]) => {
    return new Promise(resolve => {
        appContext.workerListe = peasantList; // Utilisation du set pour mettre à jour la liste
        storeData(BDD_Local.peasantListe, JSON.stringify(peasantList));
        resolve(true);
    });
};

// Parcelle method
// ✅ Version API -> Contexte
export const updateParcelListFromApi = async (appContext: AppContextType): Promise<boolean> => {
    try {
        const listParcelResponse = await parcelleApi.getParcelles();

        if (listParcelResponse.status_code === 200) {
            const parcelList = listParcelResponse.data as Parcel[]; // <-- type cohérent
            console.log('parcelList obtenu', parcelList.length);

            // Utiliser le setter du contexte (qui mettra .current à jour)
            appContext.setParcelListe(parcelList);

            await storeData(BDD_Local.parcelListe, JSON.stringify(parcelList));
            return true;
        } else {
            console.log('Erreur de récupération de la liste de parcelles', listParcelResponse.data);
            store.dispatch(
                setNewBinGlobalInfo({
                    isVisible: true,
                    message: listParcelResponse.messages,
                })
            );
            return false;
        }
    } catch (error) {
        console.log('Erreur de récupération de la liste de parcelles', error);
        return false;
    }
};

export const updateParcelListFromCode = async (
    appContext: AppContextType,
    parcelList: Parcel[]
): Promise<boolean> => {
    appContext.setParcelListe(parcelList);

    await storeData(BDD_Local.parcelListe, JSON.stringify(parcelList));
    return true;
};


export const updateParcelListFromDatabase = async (
    appContext: AppContextType
): Promise<boolean> => {
    try {
        const raw = await getData(BDD_Local.parcelListe);
        if (!raw) return false;

        const parcelList = JSON.parse(raw) as Parcel[];

        appContext.setParcelListe(parcelList);
        return true;
    } catch (err) {
        console.log('Erreur lors du chargement des parcelles depuis la base locale :', err);
        return false;
    }
};


// Bin method
export const updateBinListFromApi = (appContext: AppContextType) => {
    return new Promise(resolve => {
        binApi
            .getBins()
            .then(listBinResponse => {
                if (listBinResponse.status_code === 200) {
                    const binList = listBinResponse.data as Bin[];
                    console.log('binList obtenu', binList.length);


                    // const hasInvalidUnit = binList.some((binItem) => {
                    //     if (binItem.unite !== 'g' && binItem.unite !== 'kg') {
                    //         store.dispatch(setNewBinGlobalInfo({ isVisible: true, message: `Veuillez associer l'unité du BIN N° ${binItem.BN_CodeBIN}` }));
                    //         return true; // Arrête l'itération
                    //     }
                    //     return false;
                    // });


                    appContext.setBinListe(binList)
                    storeData(BDD_Local.binListe, JSON.stringify(binList));
                    resolve(true);
                } else {
                    console.log("Erreur de recupereation de liste de bin ", listBinResponse.data);
                    store.dispatch(setNewBinGlobalInfo({ isVisible: true, message: listBinResponse.messages }));
                    resolve(false);
                }
            })
            .catch(error => {
                console.log("Erreur de recupereation de liste bin ", error);
                resolve(false)
            });
    });
};

export const updateBinListFromCode = (appContext: AppContextType, binList: Bin[]) => {
    return new Promise(resolve => {
        appContext.setBinListe(binList); // Utilisation du set pour mettre à jour la liste
        storeData(BDD_Local.binListe, JSON.stringify(binList));
        resolve(true);
    });
};

export const updateBinListFromDatabase = (appContext: AppContextType) => {
    return new Promise(async resolve => {
        const listBinResponse = await getData(BDD_Local.binListe);
        if (listBinResponse) {
            const binList = (await JSON.parse(listBinResponse)) as Bin[];
            appContext.setBinListe(binList); // Utilisation du set pour mettre à jour la liste
            resolve(true);
        } else {
            resolve(false);
        }
    });
};

// ReceiveSavePeseBin method
// export const updateReceiveSavePeseBinListFromApi = (appContext: AppContextType) => {
//     return new Promise(resolve => {
//         receptionApi
//             .getPeseBinList()
//             .then(listPeseBinResponse => {
//                 if (listPeseBinResponse.status_code === 200) {
//                     const listPeseBin = listPeseBinResponse.data as ReceiveSavePeseBin[];
//                     appContext.setReceiveSavePeseBinListe(listPeseBin); // Utilisation du set pour mettre à jour la liste
//                     storeData(BDD_Local.receiveSavedPeseBin, JSON.stringify(listPeseBin));
//                     resolve(true);
//                 } else {
//                     resolve(false);
//                 }
//             })
//             .catch(() => resolve(false));
//     });
// };

// export const updateReceiveSavePeseBinListFromDatabase = (appContext: AppContextType) => {
//     return new Promise(async resolve => {
//         const listPeseBinResponse = await getData(BDD_Local.receiveSavedPeseBin);
//         if (listPeseBinResponse) {
//             const listPeseBin = (await JSON.parse(listPeseBinResponse)) as ReceiveSavePeseBin[];
//             appContext.setReceiveSavePeseBinListe(listPeseBin); // Utilisation du set pour mettre à jour la liste
//             resolve(true);
//         } else {
//             resolve(false);
//         }
//     });
// };

// export const updateReceiveSavePeseBinListFromCode = (appContext: AppContextType, peseBinList: ReceiveSavePeseBin[]) => {
//     return new Promise(resolve => {
//         appContext.setReceiveSavePeseBinListe(peseBinList); // Utilisation du set pour mettre à jour la liste
//         storeData(BDD_Local.receiveSavedPeseBin, JSON.stringify(peseBinList));
//         resolve(true);
//     });
// };

//pesé bac

// Fonction pour mettre à jour la liste des pesages depuis l'API
// export const updatePesageListFromApi = (appContext: AppContextType) => {
//     crateApi.getPeseeCrates().then(listPesageResponse => {
//         if (listPesageResponse.status_code === 200) {
//             const listPesage = listPesageResponse.data as PesageInterface[];
//             appContext.setPeseBacListe(listPesage); // Mise à jour de la liste dans le contexte de l'application
//             storeData(BDD_Local.peseeBac, JSON.stringify(listPesage));
//             //pesageInterfaceEntityService.reCreateAllPesageRecords(listPesage);
//         }
//     });
// };

// export const updatePesageListFromCode = (appContext: AppContextType, affectationList: PesageInterface[]) => {
//     appContext.setPeseBacListe(affectationList); // Mise à jour de la liste
//     storeData(BDD_Local.peseeBac, JSON.stringify(affectationList));
//     // pesageInterfaceEntityService.reCreateAllPesageRecords(affectationList);
// };

// Fonction pour mettre à jour la liste des pesages depuis la base de données
// export const updatePesageListFromDatabase = async (appContext: AppContextType) => {
//     const listPesageResponse = await getData(BDD_Local.peseeBac);
//     if (listPesageResponse) {
//         const listPesage = (await JSON.parse(listPesageResponse)) as PesageInterface[];
//         appContext.setPeseBacListe(listPesage); // Mise à jour de la liste dans le contexte de l'application
//     }
// };

// AffectationBacPaysant method
// export const updateAffectationBacPaysantListFromDatabase = async (appContext: AppContextType) => {
//     const stringData = await getData(BDD_Local.affectationBinPeasant);
//     if (stringData) {
//         const listAffectation = (await JSON.parse(stringData)) as AffectationBacPaysant[];
//         appContext.setAffectationBacPaysantliste(listAffectation); // Utilisation du set pour mettre à jour la liste
//     } else {
//         appContext.setAffectationBacPaysantliste([]); // Utilisation du set pour mettre à jour la liste
//     }
// };

// export const updateAffectationBacPaysantListFromCode = (
//     appContext: AppContextType,
//     affectationList: AffectationBacPaysant[],
// ) => {
//     appContext.setAffectationBacPaysantliste(affectationList); // Utilisation du set pour mettre à jour la liste
//     storeData(BDD_Local.affectationBinPeasant, JSON.stringify(affectationList));
// };

//affectationBinPacelle

// export const updateAffectationBinParcelListFromDatabase = async (appContext: AppContextType) => {
//     const stringData = await getData(BDD_Local.affectationBinParcel);
//     if (stringData) {
//         const listAffectation = (await JSON.parse(stringData)) as AffectationBinParcel[];
//         appContext.setAffectationBinParcelListe(listAffectation); // Mise à jour de la liste
//     } else {
//         appContext.setAffectationBinParcelListe([]); // Mise à jour de la liste
//     }
// };

// export const updateAffectationBinParcelListFromCode = (
//     appContext: AppContextType,
//     affectationList: AffectationBinParcel[],
// ) => {
//     appContext.setAffectationBinParcelListe(affectationList); // Mise à jour de la liste
//     storeData(BDD_Local.affectationBinParcel, JSON.stringify(affectationList));

//     //AffectationBinParcelEntityService.reCreateAllAffectationBinParcel(affectationList);
// };

//synchronisation  pesz bin

// Méthode pour mettre à jour la liste des ReceivePeseBinData depuis la base de données
// export const updateReceivePeseBinDataListFromDatabase = async (appContext: AppContextType) => {
//     const listReceivePeseBinDataResponse = await getData(BDD_Local.receivePeseBinData);
//     if (listReceivePeseBinDataResponse) {
//         const listReceivePeseBinData = (await JSON.parse(listReceivePeseBinDataResponse)) as ReceivePeseBinData[];
//         appContext.setReceivePeseBinData(listReceivePeseBinData); // Utilisation du set pour mettre à jour la liste
//     } else {
//         appContext.setReceivePeseBinData([]); // Utilisation du set pour mettre à jour la liste
//     }
// };

// Méthode pour mettre à jour la liste des ReceivePeseBinData à partir de la liste passée en argument
// export const updateReceivePeseBinDataListFromCode = (
//     appContext: AppContextType,
//     receivePeseBinDataList: ReceivePeseBinData[],
// ) => {
//     appContext.setReceivePeseBinData(receivePeseBinDataList); // Utilisation du set pour mettre à jour la liste
//     storeData(BDD_Local.receivePeseBinData, JSON.stringify(receivePeseBinDataList));
// };

//synchronization pesé bac

// Method to update the list of PeseeBac data from the database
export const updateSynchronizePeseeBacListFromDatabase = async (appContext: AppContextType) => {
    const listPeseeBacResponse = await getData(BDD_Local.peseeBacSynchronisation);
    if (listPeseeBacResponse) {
        const listPeseeBac = (await JSON.parse(listPeseeBacResponse)) as DataEditPoidsInterface[];
        appContext.setSynchronizePeseeBacListe(listPeseeBac); // Update the list using the setter
    } else {
        appContext.setSynchronizePeseeBacListe([]); // Update the list using the setter
    }
};

// Method to update the list of PeseeBac data from the provided list
export const updateSynchronizePeseeBacListFromCode = (
    appContext: AppContextType,
    peseeBacList: DataEditPoidsInterface[],
) => {
    appContext.setSynchronizePeseeBacListe(peseeBacList); // Update the list using the setter
    storeData(BDD_Local.peseeBacSynchronisation, JSON.stringify(peseeBacList));
};

// Method to update the list of table
// export const updateTableListFromApi = (appContext: AppContextType) => {
//     return new Promise(resolve => {
//         tableApi
//             .getTableListe()
//             .then(listTableResponse => {
//                 if (listTableResponse.status_code === 200) {
//                     const listTable = listTableResponse.data as Table[];
//                     appContext.setTableListe(listTable);
//                     storeData(BDD_Local.tableListe, JSON.stringify(listTable));
//                     resolve(false);
//                 } else {
//                     resolve(false);
//                 }
//             })
//             .catch(() => resolve(false));
//     });
// };

// export const updateTableListFromDatabase = async (appContext: AppContextType) => {
//     return new Promise(async resolve => {
//         const tableListe = await getData(BDD_Local.tableListe);
//         if (tableListe) {
//             const listPeseeBac = (await JSON.parse(tableListe)) as Table[];
//             appContext.setTableListe(listPeseeBac);
//         } else {
//             resolve(false);
//         }
//     });
// };

// export const updateTableListFromCode = (appContext: AppContextType, tableList: Table[]) => {
//     return new Promise(resolve => {
//         appContext.setTableListe(tableList);
//         storeData(BDD_Local.tableListe, JSON.stringify(tableList));
//         resolve(true);
//     });
// };

export const updateGradeListFromApi = (appContext: AppContextType) => {
    gradeApi.getGrades().then(listGradeResponse => {
        if (listGradeResponse.status_code === 200) {
            const listGrade = listGradeResponse.data as Grade[];
            appContext.setGradeListe(listGrade); // Update the grade list in the app context
            //gradeEntityService.reCreateAllGrades(listGrade);
            storeData(BDD_Local.gradesList, JSON.stringify(listGrade));
        } else {
            store.dispatch(setNewBinGlobalInfo({ isVisible: true, message: listGradeResponse.messages }))
        }
    });
};

// Function to update the list of grades from a provided list of Grade records
export const updateGradeListFromCode = (appContext: AppContextType, gradeList: Grade[]) => {
    appContext.setGradeListe(gradeList); // Update the grade list in the app context
    //gradeEntityService.reCreateAllGrades(gradeList);
    storeData(BDD_Local.gradesList, JSON.stringify(gradeList));
};

// Function to update the list of grades from the database
export const updateGradeListFromDatabase = async (appContext: AppContextType) => {
    const stringgradeListe = await getData(BDD_Local.gradesList);
    if (stringgradeListe) {
        const listGrade = (await JSON.parse(stringgradeListe)) as Grade[];
        appContext.setGradeListe(listGrade);
    }
};

// Function to update the list of DataAffectationBACGrade from a provided list of records
export const updateDataAffectationBACGradeListFromCode = (
    appContext: AppContextType,
    dataList: DataAffectationBACGrade[],
) => {
    appContext.setAffectationBacGrade(dataList); // Update list in app context
    storeData(BDD_Local.affectationBacToGrade, JSON.stringify(dataList));
    //affectationBacGradeEntityService.reCreateAllAffectationBACGrade(dataList);
};

// Function to update the list of DataAffectationBACGrade from the database
export const updateDataAffectationBACGradeListFromDatabase = async (appContext: AppContextType) => {
    const stringData = await getData(BDD_Local.affectationBacToGrade);
    if (stringData) {
        const dataList = (await JSON.parse(stringData)) as DataAffectationBACGrade[];
        appContext.setAffectationBacGrade(dataList); // Update list in app context
    }
};

export const updateSettingAppFromDatabase = async (appContext: AppContextType) => {
    return new Promise(async resolve => {
        const settingAppResponse = await getData(BDD_Local.settingApp);
        if (settingAppResponse) {
            const settingApp = (await JSON.parse(settingAppResponse)) as SettingApp;
            appContext.setSettingApp(settingApp); // Utilisation du set pour mettre à jour la liste
        }
        resolve(true);
    });
};

// Méthode pour mettre à jour la liste des ReceivePeseBinData à partir de la liste passée en argument
export const updateSettingAppFromCode = (appContext: AppContextType, settingApp: SettingApp) => {
    appContext.setSettingApp(settingApp);
    storeData(BDD_Local.settingApp, JSON.stringify(settingApp));
};

// Function to update the list of grades from a provided list of Grade records
export const updateSynchronisationErrorListeFromCode = (
    appContext: AppContextType,
    synchronisationError: SynchronisationError[],
) => {
    appContext.setSynchronisationErrorListe(synchronisationError); // Update the grade list in the app context
    //gradeEntityService.reCreateAllGrades(gradeList);
    storeData(BDD_Local.SynchronisationErrorListe, JSON.stringify(synchronisationError));
};

// Function to update the list of grades from the database
export const updateSynchronisationErrorListeFromDatabase = async (appContext: AppContextType) => {
    const syncroString = await getData(BDD_Local.SynchronisationErrorListe);
    if (syncroString) {
        const synchroListe = (await JSON.parse(syncroString)) as SynchronisationError[];
        appContext.setSynchronisationErrorListe(synchroListe);
    }
};
