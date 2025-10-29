

// Interface for Agent table
export interface Agent {
  IDAgent: number;
  Nom: string;
  Prenom: string;
  Matricule: string;
  Email: string;
  Login: string;
  MDP: string;
  IDSmartphone: number;
  FonctionAgent: string;
  CodeUtilisateur: string;
}

export interface CurrentUserInfo {
  user_id: number;
  username: string;
  email: string;
  token: string;
}

// Interface for Balance table
export interface Balance {
  IDBalance: number;
  codeBalance: string;
  NomBalance: string;
  Description: string;
  PL_CodeParcelle: string;
  PL_IdParcelle: number;
}

export interface Bin {
  IDBENNE: number;
  BN_CodeBIN: string;
  BN_Libelle: string;
  BN_Statut: 'available' | 'in_parcel' | 'moving' | 'in_factory';
  poids: number;
  poids_max: number;
  unite: string;

  BN_current_location_id: number;
  BN_current_location_code: string;
  BN_current_location_name: string;
  BN_current_location_surface: number;

  BN_dest_location_id: number;
  BN_dest_location_code: string;
  BN_dest_location_name: string;
  BN_dest_location_surface: number;

  PL_CodeParcelle: string;
  PL_IdParcelle: number;
  PL_Parcelle_name: string;
  PL_Parcelle_surface: number;
}
// Interface for BenneDansRecolte table
export interface BenneDansRecolte {
  IDBenneDansRecolte: number;
  Poids: number;
  BN_CodeBIN: string;
  CodeTicket: string;
  CodeBenneDansRecolte: string;
  CodeRecolte: string;
  IdRecolte: number;
}

// Interface for Crate table
export interface Crate {
  IDCrate: number;
  CR_CodeCrate: string;
  CR_Libelle: string;
  CR_Statut: string;
  CR_Description: string;

  IDParcelle: number;
  PL_codeParcelle: string;
  PL_Parcelle_name: string;
  PL_Surface_parcelle: number;

  IDPeasant: number;
  ID_Code_peasant: string;
  Peasant_name: string;

  IDGrade: number;
  CodeGrade: GradeType | '';
  LibelleGrade: string;
  unite: string;
}

// Interface for CrateDansLavage table
export interface CrateDansLavage {
  IDCrateDansLavage: number;
  IDLavage: number;
  IDPesage: number;
}

// Interface for CrateParGrade table
export interface CrateParGrade {
  IDCrateParGrade: number;
  CodeCrateParGrade: string;
  CodeGrade: string;
  IdCrate: number;
  CR_CodeCrate: string;
}

// Interface for Egrainage table
export interface Egrainage {
  IDEgrainage: number;
  DateEgrainage: Date;
  HeureEgrainage: string; // Time format as string
  ObsEgrainage: string;
  IDOrdreFabrication: number;
  IDAgent: number;
  IDEmplacement: number;
  IDCrateDansLavage: number;
}

// Interface for Emplacement table
export interface Location {
  IDEmplacement: number;
  EMP_codeEmplacement: string;
  EMP_Libelle: string;
  EMP_Description: string;
}

// Interface for Grade table
export interface Grade {
  IDGrade: number;
  CodeGrade: string;
  LibelleGrade: string;
  Description: string;
}

// Interface for Lavage table
export interface Lavage {
  IDLavage: number;
  DateLavage: Date;
  HeureLavage: string;
  ObsLavage: string;
  IDOrdreFabrication: number;
  IDEmplacement: number;
  IDBenneDansRecolte: number;
}

// Interface for OrdreFabrication table
export interface OrdreFabrication {
  IDOrdreFabrication: number;
  DateOF: Date;
  HeureOF: string;
  LibelleOF: string;
  StatutOF: string;
  IDEmplacement: number;
  IDTypeOF: number;
  IDBENNE: number;
}

// Interface for Parcelle table
export interface Parcelle {
  IDParcelle: number;
  PL_CodeParcelle: string;
  PL_Nom: string;
  PL_SurfaceHa: number;
}

// Interface for Paysan table
export interface Peasant {
  IDPaysan: number;
  PA_Nom: string;
  PA_Prenom: string;
  PA_Tel: string;
  PA_CIN: string;
  PA_Adresse: string;
  PA_Badge: string;
  CR_CodeCrate: string;
  Id_Crate: number;

  ID_Parcelle: number;
  PL_Parcelle_code: string;
  PL_Parcelle_name: string;
  PL_Parcelle_surface: number;

  Table_ID: number;
  Table_name: string;
}

// Interface for Pesage table
export interface Pesage {
  IDPesage: number;
  DatePesee: Date;
  PR_Ref: string;
  HeurePesee: string;
  Poids: number;
  BN_CodeBIN: string;
  BN_IdBin: number;
  CR_CodeCrate: string;
  CR_IdCrate: number;
  CodeTicket: string;
  CodePesage: string;
  EMP_codeEmplacement: string;
}

// Interface for Produit table
export interface Produit {
  IDProduit: number;
  PR_Nom: string;
  PR_Ref: string;
  PR_Description: string;
}

// Interface for Recolte table
export interface Recolte {
  IDRecolte: number;
  DateRecolte: Date;
  StatutRecolte: string;
  HeureRecolte: string;
  ObsRecolte: string;
  CodeRecolte: string;
  PL_CodeParcelle: string;
  PL_IdParcelle: number;
  EMP_codeEmplacement: string;
}

// Interface for Smartphone table
export interface Smartphone {
  IDSmartphone: number;
  SP_num: string;
  SP_IMEI: string;
  SP_Nom: string;
}

// export interface PesageInterface {
//   CR_CodeCrate: number;
//   PA_Badge: number;
//   CodeTicket: string;
//   DatePesee: string;
//   HeurePesee: string;
//   Poids: string;
//   PL_CodeParcelle: number;
//   isSync: boolean;
// }

export interface PesageInterface {
  crate_id: number;
  peasant_id: number;
  parcel_id: number;
  weighing_code: string;
  weight: number;
  date_harvest: string;
}

export interface ListeItems {
  code: string;
  type: string;
}

export interface WeighingData {
  crate_id: number;
  peasant_id: number;
  weighing_code: string;
  weight: number;
  date_harvest: string;
}

export interface PeseeData {
  parcel_id: number;
  data: WeighingData[];
}

export interface DataBinsAffectation {
  id: number;
}

export interface AffectationBinParcel {
  parcel_id: number;
  bins: DataBinsAffectation[];
  isSynch: boolean;
}

export interface PeseeBac {
  parcel_id: number;
  data: WeighingData[];
}

export interface DataEditPoidsInterface {
  bin_id: number;
  parcel_id: number;
  crate_id: number;
  peasant_id: number;
  weighing_code: string;
  weight: number;
  date_harvest: string;
}

export interface DataInterface {
  code: string;
  libelle: string;
}

export interface TicketResult {
  date?: string;
  heure?: string;
  code?: string;
  poids?: string;
  increment?: string;
  error?: string;
}

export interface StateBinInterface {
  bin_id: number;
}

export interface DataBacInterface {
  crate_id: number;
}

export interface DataArrayBacsInterface {
  IDParcelle: number;
  IDCrate: number;
}

export interface DataAffectationBACGrade {
  grade_id: null;
  bacs: DataBacInterface[];
}

export interface ArrayBacsInterface {
  CR_CodeCrate: string;
  CR_Description: string;
  CR_Libelle: string;
  CR_Statut: string;
  CodeGrade: string;
  IDCrate: number;
  IDGrade: number;
  IDParcelle: number;
  IDPeasant: number;
  Code_peasant: string;
  LibelleGrade: string;
  PL_Parcelle_name: string;
  PL_Surface_parcelle: string;
  PL_codeParcelle: string;
  Peasant_name: string;
  ID_Location: number;
  Code_Location: string;
  Libelle_Location: string;
  ID_Destination: number;
  Code_Destination: string;
  Libelle_Destination: string;
}

export interface OrderFabricationInterface {
  ID_OF: number;
  Code_OF: string;
  bacs: ArrayBacsInterface[];
  statut: 'available' | 'in_use' | 'finished';
}

export interface BacEngrainageInterface {
  bac_id: number;
  destination_id: number;
  of_id: number;
}

export interface ExitEngrainageInterface {
  bac_id: number;
  destination_id: number;
  peasant_id: number;
  ticket: string;
}

//OFLAVAGE

interface OfLavageCrate {
  crate_current_location_id: number;
  crate_current_location_name: string;
  crate_id: number;
  crate_name: string;
}

interface OFLavageBin {
  bin_current_location_id: number;
  bin_current_location_name: string;
  bin_id: number;
  bin_name: string;
}

interface OfLavageLocationDest {
  crate_garde_id: number;
  crate_garde_name: string;
  crate_id: string;
  crate_location_dest_id: number;
  crate_location_dest_name: string;
  crate_name: string;
}

interface OF_Lavage {
  all_consommed: boolean;
  bin_location_id: number;
  bin_location_name: string;
  bins: OFLavageBin[];
  crates: OfLavageCrate[];
  grade_id: number;
  grade_in_abc: boolean;
  grade_name: string;
  location_dests: OfLavageLocationDest[];
  of_id: number;
  of_state: string;
}

interface OFEgrainageCrate {
  crate_current_location_id: number;
  crate_current_location_name: string;
  crate_id: number;
  crate_name: string;
}

interface OFEgrainage {
  crate_location_id: number;
  crate_location_name: string;
  crates: OFEgrainageCrate[];
  grade_id: number;
  grade_in_abc: boolean;
  grade_name: string;
  location_dest_id: number;
  location_dest_name: string;
  of_id: number;
  of_state: string;
}
