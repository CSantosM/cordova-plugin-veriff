
import Veriff

@objc(TwilioVideoCordovaPlugin) class VeriffCordovaPlugin: CDVPlugin {
    
    var callbackId: String = ""
    
    @objc(launchVeriffSDK:)
    func launchVeriffSDK(command: CDVInvokedUrlCommand) {
        callbackId = command.callbackId! as String
        let sessionUrl = command.arguments[0] as! String
        let veriff = VeriffSdk.shared
        veriff.delegate = self
        veriff.startAuthentication(sessionUrl: sessionUrl)
    }
    
    private func returnErrorToCordova(message: String) {
        self.commandDelegate!.send(
            CDVPluginResult(
                status: CDVCommandStatus_ERROR,
                messageAs: message
            ),
            callbackId: self.callbackId as String
        )
    }
    
    private func returnSuccessToCordova(result: Dictionary<String,String>){
        self.commandDelegate!.send(
            CDVPluginResult(
                status: CDVCommandStatus_OK,
                messageAs: result),
            callbackId: callbackId
        )
    }
}

extension VeriffCordovaPlugin : VeriffSdkDelegate {
    func sessionDidEndWithResult(_ result: VeriffSdk.Result) {
        var resultJson: Dictionary<String,String> = [:]
        switch result.status {
        case .done:
            // The user successfully submitted the session
            resultJson["status"] = "DONE"
            resultJson["message"] = "Session is completed from clients perspective"
            break
        case .canceled:
            // The user canceled the verification process.
            resultJson["status"] = "CANCELED"
            resultJson["message"] = "User canceled the verification process"
            break
        case .error(let error):
            resultJson["status"] = "ERROR"
            resultJson["message"] = VeriffSdk.Error.init(rawValue: error.rawValue).debugDescription
            
        }
        self.returnSuccessToCordova(result: resultJson)
    }
}
