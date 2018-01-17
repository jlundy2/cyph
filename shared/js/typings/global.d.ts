/**
 * @global
 * The root route of accounts.
 */
declare let accountRoot: string;

/**
 * @global
 * Message to return for beforeunload event.
 */
declare let beforeUnloadMessage: string|undefined;

/**
 * @global
 * If applicable, identifier of this custom build.
 */
declare let customBuild: string|undefined;

/**
 * @global
 * If applicable, API flags for this custom build.
 */
declare let customBuildApiFlags: string|undefined;

/**
 * @global
 * If applicable, voice call background image for this custom build.
 */
declare let customBuildAudioImage: string|undefined;

/**
 * @global
 * If applicable, call type for this custom build.
 */
declare let customBuildCallType: 'audio'|'video'|undefined;

/**
 * @global
 * If applicable, indicates whether docs will be enabled for this custom build.
 */
declare let customBuildEnableDocs: boolean;

/**
 * @global
 * If applicable, Walken image replacement for this custom build.
 */
declare let customBuildErrorImage: string|undefined;

/**
 * @global
 * If applicable, favicon for this custom build.
 */
declare let customBuildFavicon: string|undefined;

/**
 * @global
 * If applicable, horizontal logo for this custom build.
 */
declare let customBuildLogoHorizontal: string|undefined;

/**
 * @global
 * If applicable, vertical logo for this custom build.
 */
declare let customBuildLogoVertical: string|undefined;

/**
 * @global
 * If applicable, password for this custom build.
 */
declare let customBuildPassword: string|undefined;

/**
 * @global
 * If applicable, replacement strings for this custom build (base64-encoded string map).
 */
declare let customBuildStrings: string|undefined;

/**
 * @global
 * WorkerGlobalScope API to load JavaScript file.
 * Reduced to accept just one script rather than
 * an array to accommodate WebSign packing.
 */
declare let importScripts : (script: string) => void;

/**
 * @ignore
 */
declare let IS_WEB: boolean;

/**
 * @global
 * Cross-browser container of values in self.location.
 */
declare let locationData: Location;

/**
 * @global
 * Cross-browser container of values in self.navigator.
 */
declare let navigatorData: Navigator;

/**
 * @global
 * Event handler for messages to the current thread.
 */
declare let onthreadmessage: ((e: MessageEvent) => any)|undefined;

/**
 * @global
 * Used in test environments for some setup.
 */
declare let testEnvironmentSetup: undefined|(
	(databaseService: any, localStorageService: any) => Promise<void>
);

/**
 * @global
 * Mapping of language codes to translations of English phrases
 * (populated during build process).
 */
declare let translations: {[language: string]: {[text: string]: string}};
