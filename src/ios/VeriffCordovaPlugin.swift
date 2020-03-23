
import Veriff

@objc(TwilioVideoCordovaPlugin) class VeriffCordovaPlugin: CDVPlugin {
	
	var callbackId: String = ""
	
	@objc(launchVeriffSDK:)
	func launchVeriffSDK(command: CDVInvokedUrlCommand) {
		callbackId = command.callbackId! as String
		let sessionToken = command.arguments[0] as! String
		
		let conf = VeriffConfiguration(sessionToken: sessionToken , sessionUrl: "https://alchemy.veriff.com")
		let veriff = Veriff.shared
		veriff.delegate = self
		veriff.set(configuration: conf!)
		veriff.startAuthentication()
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
	
	private func returnSuccessToCordova(message: String){
		self.commandDelegate!.send(
			CDVPluginResult(
				status: CDVCommandStatus_OK,
				messageAs: message),
			callbackId: callbackId
		)
	}
}

extension VeriffCordovaPlugin : VeriffDelegate {
	
	func onSession(result: VeriffResult, sessionToken: String) {
		var text = "VeriffSDK Result: "
		switch result.code {
		case .STATUS_DONE:
			// Session is completed from clients perspective.
			text += "Session is completed from clients perspective"
			break
		case .STATUS_ERROR_SESSION:
			// Invalid sessionToken is passed to the Veriff SDK.
			text += "Invalid sessionToken is passed to the Veriff SDK"
			break
		case .UNABLE_TO_ACCESS_CAMERA:
			// Failed to access device's camera. (either access denied or there are no usable cameras)
			text += "Failed to access device's camera"
			break
		case .STATUS_USER_CANCELED:
			// User cancelled the session.
			text += "User cancelled the session";
			break
		case .STATUS_SUBMITTED:
			// Photos are successfully uploaded.
			text += "Photos are successfully uploaded"
			break
		case .STATUS_ERROR_NETWORK:
			// Network is unavailable.
			text += "Network is unavailable"
			break
		case .STATUS_ERROR_NO_IDENTIFICATION_METHODS_AVAILABLE:
			// No identifications methods available
			text += "No identifications methods available"
			break
		case .STATUS_ERROR_UNKNOWN:
			// Unknown error occurred.
			text += "Unknown error occurred"
			break
		case .UNABLE_TO_ACCESS_MICROPHONE:
			// Failed to access device's microphone.
			text += "Failed to access device's microphone"
			break
		}
		
		self.returnSuccessToCordova(message: text)
	}
}
