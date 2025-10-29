import en_settings from './en/settings.json';
import en_reception_usine from './en/receptionUsine.json';
import en_drawer_navigation from './en/drawerNavigation.json';
import en_menu_recolte from './en/menuRecolte.json';
import en_menu_lavage from './en/menuLavage.json';
import en_menu_egrainage from './en/menuEgrainage.json';
import en_affectation_bac_paysan from './en/affectationBacPaysan.json';
import en_affectation_bin_parcelle from './en/affectationBinParcelle.json';
import en_pesee_recolte from './en/peseeRecolte.json';
import en_picking_egrainage from './en/pickingEgrainage.json';
import en_sortie_egrainage from './en/sortieEgrainage.json';
import en_entre_lavage from './en/entreLavage.json'
import en_sortie_lavage from './en/sortieLavage.json'
import en_packaging from './en/packaging.json'
import en_terminate_of_lavage from './en/terminateOFLavage.json'
import en_login from './en/login.json'
import en_envoi_bin_usine from './en/envoiBINUsine.json';
import en_affectation_bac_grade from './en/affectationBacGrade.json';
import en_affectation_paysan_table from './en/affectationPaysanTable.json';
import en_menu_autres from './en/menuAutres.json';
import en_modale from './en/Modale.json'

const en = {
  ...en_settings,
  ...en_drawer_navigation,
  ...en_menu_recolte,
  ...en_menu_lavage,
  ...en_menu_egrainage,
  ...en_affectation_bac_paysan,
  ...en_reception_usine,
  ...en_affectation_bin_parcelle,
  ...en_pesee_recolte,
  ...en_picking_egrainage,
  ...en_sortie_egrainage,
  ...en_entre_lavage,
  ...en_sortie_lavage,
  ...en_packaging,
  ...en_terminate_of_lavage,
  ...en_login,
  ...en_envoi_bin_usine,
  ...en_affectation_bac_grade,
  ...en_affectation_paysan_table,
  ...en_menu_autres,
  ...en_modale
};

export default en;
