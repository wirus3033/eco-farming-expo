package expo.modules.scanermanager

import android.annotation.SuppressLint
import android.content.*
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.annotation.RequiresApi
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.json.JSONException
import org.json.JSONObject
import java.util.Objects

// --------- BEGIN: imports et types natifs originaux (inchangés) ----------
import android.bld.ScanManager
import android.bld.ScanManager.getDefaultInstance
// --------- END   ---------------------------------------------------------

class ScanermanagerModule : Module() {

  // --- Constantes et états (inchangés) ---
  private val TAG = "ScanManagerModule"
  private val SCAN_ACTION = "SCAN_ATION"
  private val SCAN_RESULT_KEY = "SCAN_RESULT_KEY"

  private val EVENT_ERROR_NAME = "EVENT_ERROR_NAME"
  private val EXISTE_VALUE_EVENT_NAME = "EXISTE_VALUE_EVENT_NAME"
  private val ISCANNING_EVENT_NAME = "ISCANNING_EVENT_NAME"

  private var scanManager: ScanManager? = null
  private var scanValue: String = ""
  private var continousScanMode: Boolean = false
  private var lastContinousScanMode: Boolean = false
  private var isScanningState: Boolean = false

  private var broadcastReceiver: BroadcastReceiver? = null

  @RequiresApi(Build.VERSION_CODES.O) // minSdk = 26 → OK
  override fun definition() = ModuleDefinition {
    // Nom JS: requireNativeModule('Scanermanager')
    Name("Scanermanager")

    // Constantes compatibles avec ton wrapper (PI)
    Constants("PI" to Math.PI)

    // Événements (inchangés)
    Events(
      "onContinuousSanData",
      "useScanData",
      EXISTE_VALUE_EVENT_NAME,
      EVENT_ERROR_NAME,
      ISCANNING_EVENT_NAME
    )

    // API de démo
    Function("hello") { "Hello world! 👋" }

    AsyncFunction("setValueAsync") { _: String -> /* no-op */ }

    // Méthodes exposées (inchangées)
    AsyncFunction("initialization") {
      initialization()
      Log.i(TAG, "initialization openScanner ..........................................................")
      true
    }
    AsyncFunction("beginContinuousScan") { beginContinuousScan() }
    AsyncFunction("startContinuousScan") { startContinuousScan() }
    AsyncFunction("stopContinuousScan") { stopContinuousScan() }
    AsyncFunction("startScan") { startScan() }
    AsyncFunction("stopScan") { stopScan() }

    AsyncFunction("isScannerOpen") {
      tryEnsureManager()
      Log.i(TAG, "isScannerOpen ..........................................................")
      scanManager?.isScannerOpen ?: false
    }
    AsyncFunction("openScanner") {
      tryEnsureManager()
      Log.i(TAG, "openScanner ..........................................................")
      scanManager?.openScanner() ?: false
    }
    AsyncFunction("closeScanner") {
      tryEnsureManager()
      Log.i(TAG, "closeScanner ..........................................................")
      scanManager?.closeScanner() ?: false
    }
    AsyncFunction("startDecode") {
      tryEnsureManager()
      Log.d(TAG, "JS → startDecode")
      scanManager?.startDecode() ?: false
    }
    AsyncFunction("stopDecode") {
      tryEnsureManager()
      scanManager?.stopDecode() ?: false
    }
    AsyncFunction("resetScan") { resetScan() }

    AsyncFunction("setSoundState") { state: Boolean ->
      tryEnsureManager()
      Log.i(TAG, "The wanted sound state is: $state")
      scanManager?.setPlaySound(state)
      Log.i(TAG, "The new sound state is: ${scanManager?.playSound}")
      scanManager?.playSound ?: false
    }
    AsyncFunction("getSoundState") {
      tryEnsureManager()
      scanManager?.playSound ?: false
    }
    AsyncFunction("setVibrateState") { state: Boolean ->
      tryEnsureManager()
      Log.i(TAG, "The wanted vibrate state is: $state")
      scanManager?.setVibrate(state)
      Log.i(TAG, "The new vibrate state is: ${scanManager?.vibrate}")
      scanManager?.vibrate ?: false
    }
    AsyncFunction("getVibrateState") {
      tryEnsureManager()
      scanManager?.vibrate ?: false
    }

    AsyncFunction("debugEmit") { eventName: String, payload: String ->
      emitEvent(eventName, payload)
    }

    OnDestroy { unregisterReceiverSafe() }
  }

  // ------------------------- Implémentation LOGIQUE (inchangée) -------------------------

  private fun reactContext(): Context? {
    // Si reactContext est null très tôt, on retombe sur applicationContext (si dispo)
    return appContext.reactContext ?: appContext.reactContext?.applicationContext
  }

  private fun tryEnsureManager() {
    if (scanManager == null) {
      scanManager = getDefaultInstance(reactContext())
    }
  }

  @RequiresApi(Build.VERSION_CODES.O)
  private fun initialization() {
    Log.i(TAG, "Lectur initializing ..........................................................")
    try {
      Log.i(TAG, "Lectur initializing22222 ..........................................................")
      tryEnsureManager()
      val mgr = scanManager ?: return
      Log.i(TAG, "Lectur initializing33333333 ..........................................................")
      val isOpen = if (mgr.isScannerOpen) mgr.isScannerOpen else mgr.openScanner()
      if (!isOpen) sendErrorEvent(EVENT_ERROR_NAME, "E_100", "Erreur d'ouverture du scanner")
      Log.i(TAG, "Scanner ouvert: $isOpen")

      // Désactiver le bouton scan
      mgr.setHandleKey(false)
      mgr.setLiftToStop(false)

      // Broadcast mode
      if (mgr.opMode != 0) mgr.opMode = 0

      // Activer le scan continu
      mgr.setContinueScan(true)

      // Paramètres broadcast
      if (!Objects.equals(mgr.broadcastKey, SCAN_RESULT_KEY)) mgr.broadcastKey = SCAN_RESULT_KEY
      if (!Objects.equals(mgr.broadcastAction, SCAN_ACTION)) mgr.broadcastAction = SCAN_ACTION

      // Receiver
      registerReceiverIfNeeded()

      Log.i(TAG, "-------------------------- FIN init ------------------------------")
    } catch (e: Exception) {
      Log.i(TAG, "Scan failed to start", e)
      sendErrorEvent(EVENT_ERROR_NAME, "E_108", "Le lancement du scan continue a echoué")
    }
  }

  // (Annotations @RequiresApi retirées car ces méthodes n'utilisent pas d'API 33)
  private fun startContinuousScan() {
    Log.i(TAG, "Lectur staarting11111111 ..........................................................")
    scanValue = ""
    try {
      tryEnsureManager()
      val mgr = scanManager
      if (mgr != null) {
        Log.i(TAG, "Lectur staarting222222222222222 ..........................................................")
        continousScanMode = true
        if (!isScanningState) {
          Log.i(TAG, "Lecture  du scan en continue en cours ..........................................................")
          isScanningState = true
          val isStartingDecode = mgr.startDecode()
          if (!isStartingDecode) sendErrorEvent(EVENT_ERROR_NAME, "E_104", "Le scanner ne peut pas lancer le decodage de l'information")
          Log.i(TAG, "Lecture lancée $isStartingDecode")
          sendIsScanningEvent(ISCANNING_EVENT_NAME, true)
        }
      } else {
        Log.i(TAG, "Lecture fermée ")
        sendErrorEvent(EVENT_ERROR_NAME, "E_110", "Impossible de comminuquer avec le scanner")
      }
    } catch (e: Exception) {
      Log.i(TAG, "Scan failed to start", e)
      sendErrorEvent(EVENT_ERROR_NAME, "E_108", "Le lancement du scan continue a echoué")
    }
  }

  private fun beginContinuousScan() {
    Log.i(TAG, "Lectur staarting ..........................................................")
    scanValue = ""
    try {
      tryEnsureManager()
      Log.i(TAG, "Lectur staarting ..........................................................")
      continousScanMode = true
      Log.i(TAG, "Lecture  du scan en continue en cours ..........................................................")

      isScanningState = true
      val isStartingDecode = scanManager?.startDecode() ?: false
      if (!isStartingDecode) sendErrorEvent(EVENT_ERROR_NAME, "E_104", "Le scanner ne peut pas lancer le decodage de l'information")
      Log.i(TAG, "Lecture lancée $isStartingDecode")

      sendIsScanningEvent(ISCANNING_EVENT_NAME, true)
    } catch (e: Exception) {
      Log.i(TAG, "Scan failed to start", e)
      sendErrorEvent(EVENT_ERROR_NAME, "E_108", "Le lancement du scan continue a echoué")
    }
  }

  private fun stopContinuousScan() {
    scanValue = ""
    val mgr = scanManager
    if (mgr != null && isScanningState) {
      try {
        sendIsScanningEvent(ISCANNING_EVENT_NAME, false)
        Log.i(TAG, "L'arret du scan en continue en cours ..........................................................")
        // (logique d’origine conservée)
        val isDecodeStoped = mgr.startDecode()
        isScanningState = false
        Log.i(TAG, "decodage  fermé : $isDecodeStoped")
      } catch (e: Exception) {
        Log.e(TAG, "Failed to stop scan", e)
        Toast.makeText(reactContext(), "Failed to stop scan", Toast.LENGTH_SHORT).show()
      }
    }
  }

  private fun startScan() {
    scanValue = ""
    try {
      tryEnsureManager()
      val mgr = scanManager
      if (mgr != null) {
        continousScanMode = false
        val isScannnerAlreadyLaunched = mgr.isScannerOpen

        sendIsScanningEvent(ISCANNING_EVENT_NAME, true)

        val isOpen = if (mgr.isScannerOpen) mgr.isScannerOpen else mgr.openScanner()
        if (!isOpen) sendErrorEvent(EVENT_ERROR_NAME, "E_100", "Erreur d'ouverture du scanner")
        Log.i(TAG, "Scanner ouvert: $isOpen")

        mgr.setHandleKey(true)
        val keyActivated = mgr.handleKey
        if (!keyActivated) sendErrorEvent(EVENT_ERROR_NAME, "E_101", "Erreur d'activation du button manuelle")

        if (mgr.opMode != 0) mgr.opMode = 0
        val scanMode = mgr.opMode
        if (scanMode != 0) sendErrorEvent(EVENT_ERROR_NAME, "E_102", "Le mode broadcast ne peut pas etre activé")
        Log.i(TAG, "Scan mode $scanMode")

        if (mgr.continueScan) mgr.setContinueScan(false)
        val isContinuousScan = mgr.continueScan
        if (isContinuousScan) sendErrorEvent(EVENT_ERROR_NAME, "E_107", "Le scan continue ne peut pas etre desactivé")

        mgr.setIntervalTime(1000)

        if (!isScannnerAlreadyLaunched) {
          val isStartingDecode = mgr.startDecode()
          if (!isStartingDecode) sendErrorEvent(EVENT_ERROR_NAME, "E_104", "Le scanner ne peut pas lancer le decodage de l'information")
          Log.i(TAG, "Lecture lancée $isStartingDecode")
        }

        sendIsScanningEvent(ISCANNING_EVENT_NAME, true)

        if (!Objects.equals(mgr.broadcastKey, SCAN_RESULT_KEY)) mgr.broadcastKey = SCAN_RESULT_KEY
        if (!Objects.equals(mgr.broadcastKey, SCAN_RESULT_KEY)) sendErrorEvent(EVENT_ERROR_NAME, "E_105", "Le parametrage du la clé de broadcast a echoué")

        mgr.setPlaySound(mgr.playSound)

        if (!Objects.equals(mgr.broadcastAction, SCAN_ACTION)) mgr.broadcastAction = SCAN_ACTION
        if (!Objects.equals(mgr.broadcastAction, SCAN_ACTION)) sendErrorEvent(EVENT_ERROR_NAME, "E_106", "Le parametrage du l'ecoute des données decodees a echoué")

        registerReceiverIfNeeded()

        Log.i(TAG, "-------------------------- FIN ------------------------------")
      } else {
        sendErrorEvent(EVENT_ERROR_NAME, "E_110", "Impossible de comminuquer avec le scanner")
        Log.i(TAG, "Lecture fermée ")
      }
    } catch (e: Exception) {
      Log.i(TAG, "Scan failed to start", e)
      sendErrorEvent(EVENT_ERROR_NAME, "E_109", "Le lancement du scan  a echoué")
    }
  }

  private fun stopScan() {
    scanValue = ""
    val mgr = scanManager
    if (mgr != null) {
      try {
        Log.i(TAG, "L'arret du scan en continue en cours ......")
        sendIsScanningEvent(ISCANNING_EVENT_NAME, false)
        val isDecodeStoped = mgr.stopDecode()
        Log.i(TAG, "decodage  fermé : $isDecodeStoped")
      } catch (e: Exception) {
        Log.e(TAG, "Failed to stop scan", e)
        Toast.makeText(reactContext(), "Failed to stop scan", Toast.LENGTH_SHORT).show()
      }
    }
  }

  private fun startReceivingScans(): BroadcastReceiver {
    return object : BroadcastReceiver() {
      override fun onReceive(context: Context, intent: Intent) {
        if (Objects.equals(intent.action, SCAN_ACTION)) {
          val scanData = intent.getStringExtra(SCAN_RESULT_KEY)

          if (continousScanMode != lastContinousScanMode) {
            // reset selon logique d’origine (no-op)
            var ignored = ""
            ignored = ignored
            lastContinousScanMode = continousScanMode
          }

          if (scanData != null && scanData != scanValue) {
            val isSCanContinue = scanManager?.continueScan ?: false
            scanValue = scanData
            if (isSCanContinue) {
              Log.i(TAG, "Data receive on continous scanning : $scanData")
              emitEvent("onContinuousSanData", scanData)
            } else {
              Log.i(TAG, "Data receive on scan : $scanData")
              emitEvent("useScanData", scanData)
            }
          } else if (scanData != null && scanData == scanValue) {
            emitEvent(EXISTE_VALUE_EVENT_NAME, scanData)
          }
        }
      }
    }
  }

  @SuppressLint("InlinedApi") // RECEIVER_NOT_EXPORTED référencé sous garde API
  private fun registerReceiverIfNeeded() {
    if (broadcastReceiver != null) return
    val filter = IntentFilter(SCAN_ACTION)
    val ctx = reactContext()
    broadcastReceiver = startReceivingScans()
    try {
      when {
        // Android 13+ (API 33) : flags explicites
        Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU -> {
          ctx?.registerReceiver(broadcastReceiver, filter, Context.RECEIVER_NOT_EXPORTED)
        }
        // Android 8–12L (API 26–32) : surcharge avec flags = 0
        Build.VERSION.SDK_INT >= Build.VERSION_CODES.O -> {
          ctx?.registerReceiver(broadcastReceiver, filter, 0)
        }
        // Plus ancien (par sécurité)
        else -> {
          @Suppress("DEPRECATION")
          ctx?.registerReceiver(broadcastReceiver, filter)
        }
      }
    } catch (e: Exception) {      
      Log.e(TAG, "registerReceiver failed", e)
      sendErrorEvent(EVENT_ERROR_NAME, "E_106", "Le parametrage du l'ecoute des données decodees a echoué")
    }
  }

  private fun unregisterReceiverSafe() {
    val ctx = appContext.reactContext ?: return
    try {
      broadcastReceiver?.let { ctx.unregisterReceiver(it) }
    } catch (_: Exception) {
      // ignore
    } finally {
      broadcastReceiver = null
    }
  }

  // ---------------------- Helpers d’événements (transport uniquement) ----------------------

  /**
   * Expo Modules n’accepte que Map<String, Any?> ou Bundle en second param.
   * On emballe donc toute donnée non-Map/Bundle dans `mapOf("data" to data)`.
   * → pas de changement de logique : même contenu, juste le conteneur.
   */
  private fun emitEvent(eventName: String, data: Any?) {
    when (data) {
      is Map<*, *> -> {
        @Suppress("UNCHECKED_CAST")
        this@ScanermanagerModule.sendEvent(eventName, data as Map<String, Any?>)
      }
      is Bundle -> this@ScanermanagerModule.sendEvent(eventName, data)
      else -> this@ScanermanagerModule.sendEvent(eventName, mapOf("data" to data))
    }
  }

  private fun sendIsScanningEvent(eventName: String, isScanning: Boolean) {
    emitEvent(eventName, isScanning)
  }

  private fun sendErrorEvent(eventName: String, code: String, message: String) {
    val errorJson = JSONObject()
    try {
      errorJson.put("code", code)
      errorJson.put("message", message)
    } catch (_: JSONException) {
      Toast.makeText(reactContext(), "L'application ne peut pas afficher l'erreur", Toast.LENGTH_SHORT).show()
    }
    emitEvent(eventName, errorJson.toString())
  }

  private fun resetScan() {
    tryEnsureManager()
    scanValue = ""
    try {
      scanManager?.resetScan()
    } catch (_: Exception) {
      // no-op
    }
  }
}
