declare module wt {
    interface StorageInterface {
        store(widgetId: string, key: string, value: any): void;
        get(widgetId: string, key: string): any;
        clear(widgetId: string, key: string, value: any): void;
        removeWidget(widgetId: string): void;
        GetVersion(): string;
        SetCurrency(value: string): void;
        GetCurrency(): string;
        SetLanguage(value: string): void;
        GetLanguage(): string;
        SetTheme(value: string): void;
        GetTheme(): string;
        SetWtValue(item: string, key: string, value: any): void;
        GetWtValue(item: string, key: string): any;
        RemoveWtValue(item: string): void;

        SetOrderEntryVisible(value: boolean): void;
        GetOrderEntryVisible(): boolean;
        SetOrderEntryPosition(value: any): void;
        GetOrderEntryPosition(): any;
        SetOrderEntryAdvanced(value: boolean): void;
        GetOrderEntryAdvanced(): boolean;
    }
    var languageStrings: {
        [cKey: string]: string;
    };
    var displayOptions: {
        hasTrading: boolean;
        enableDesktopBuilder: boolean;
        hasInfinancials: boolean;
        hasCalendar: boolean;
        homePageName: string;
        portfolioPageName: string;
        sidebarName: string;
        newsReaderCss: string;
        defaultNewsRegion: string
        selectedTheme: string;
        storageError: boolean;
        kidUrl: string;
        isBeta: boolean;
    };
    

    var vbAppId: string;
    var vbAppEdition: string;
    //var homeProvider: number;
    var globalSaveInterface: StorageInterface;
    var planetaryjs: any;
	var topbarVisibility: boolean;
    var baseCurrency: string;
    var orderConfirmation: boolean;
    var soundNotification: boolean;

    var countryCodes: any;
    var wtVersion: string;

    var localInfrontUI: string;
    var wtkUrl: string;
    var wtkLocalUrl: string;
    var wtkVersion: string;
    var commonFrameworkVersion: string;

    var enableVisual: string;
    var localVisualsUI: string;
    var visualVersion: string;

    var sounds: {
        trade: any;
        notification: any;
    };
    var showMobile: boolean;
    var appInsights: any;
    var externalTrading: string;
    var insightsInstrumentationKey: string;
    var keepAliveURL: string;
    var marknadsinfoMode: boolean;
    var extUserId: string;
    var extNamespace: string;
    var settingsLoaded: boolean;
 }
