import fr_settings from './fr/settings.json';
import fr_drawer_navigation from './fr/drawerNavigation.json';
import fr_menu_recolte from './fr/menuRecolte.json';
import fr_menu_lavage from './fr/menuLavage.json';
import fr_menu_egrainage from './fr/menuEgrainage.json';
import fr_Affectation_bac_paysan from './fr/affectationBacPaysan.json';
import fr_affectation_bin_parcelle from './fr/affectationBinParcelle.json';
import fr_reception_usine from './fr/receptionUsine.json';
import fr_pesee_recolte from './fr/peseeRecolte.json';
import fr_picking_egrainage from './fr/pickingEgrainage.json';
import fr_sortie_egrainage from './fr/sortieEgrainage.json';
import fr_entre_lavage from './fr/entreLavage.json'
import fr_sortie_lavage from './fr/sortieLavage.json'
import fr_packaging from './fr/packaging.json'
import fr_terminate_of_lavage from './fr/terminateOFLavage.json'
import fr_login from './fr/login.json'
import fr_envoi_bin_usine from './fr/envoiBINUsine.json';
import fr_affectaction_bac_grade from './fr/affectationBacGrade.json';
import fr_affectation_paysan_table from './fr/affectationBacPaysan.json';
import fr_menu_autres from './fr/menuAutres.json';
import fr_modale from './fr/Modale.json'

const fr = {
  ...fr_settings,
  ...fr_drawer_navigation,
  ...fr_menu_recolte,
  ...fr_menu_lavage,
  ...fr_menu_egrainage,
  ...fr_Affectation_bac_paysan,
  ...fr_reception_usine,
  ...fr_affectation_bin_parcelle,
  ...fr_pesee_recolte,
  ...fr_picking_egrainage,
  ...fr_sortie_egrainage,
  ...fr_entre_lavage,
  ...fr_sortie_lavage,
  ...fr_packaging,
  ...fr_terminate_of_lavage,
  ...fr_login,
  ...fr_envoi_bin_usine,
  ...fr_affectaction_bac_grade,
  ...fr_affectation_paysan_table,
  ...fr_menu_autres,
  ...fr_modale
};

export default fr;
