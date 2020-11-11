/// <reference path="../typings/highcharts.d.ts" />
/**
 * Created by hage on 30.01.2015.
 */
declare module Infront {
    class CurrencyConverter {
        private static kUSD;
        private static kWFXFeed;
        private infront;
        private streaming;
        private cacheKey;
        private loadedCurrencies;
        private instrumentCurrency;
        private historyCache;
        private currenciesCacheStartEnd;
        private crossSymbols;
        private intradayCache;
        constructor(infront: Model, streaming: boolean);
        createConvertedFieldFromCache(field: FieldReference, fromCurrencyRef: FieldReference | string, toCurrencyRef: FieldReference | string, targetFieldRef?: FieldReference): FieldReference;
        private doCreateConvertedField(targetReference, field, fromCurrency, toCurrency);
        private createComputedField(targetReference, field, fromRef, toRef, factor);
        private loadCurrency(instrument);
        cacheIntraday(instrument: Instrument, targetCurrency: string, resolution: string, stepSize: number, daysBack: number, maxLookupDays: number): Promise<boolean>;
        cacheHistory(instrument: Instrument, targetCurrency: string, startDate: Date, endDate: Date, splits: boolean, dividends: boolean): Promise<boolean>;
        getIntradayValue(value: number, date: Date, fromCurr: string, toCurr: string, crossCurrencies: Instrument[]): any;
        getHistoricalValue(value: number, date: Date, fromCurrency: string, toCurrency: string): any;
        convertTrades(instrument: Instrument, trades: any[], targetCurrency: string): any[];
        getInstrumentCurrency(instrument: Instrument): Promise<string>;
        getCrossSymbols(instrument: Instrument, targetCurrency: string): Instrument[];
        getCrossSymbolsPromise(instrument: Instrument, targetCurrency: string): Promise<Instrument[]>;
    }
}
/**
 * AUTO-GENERATED CODE
 * Do not edit, your code will be overwritten!
 *
 * Library-conf-Parser version 1.1.0
 * code generated from: _removed/factory/library-factory.html
 * Generated at: 10/31/2019, 11:15:28 AM
 * Environment : dev
 */
declare module Infront {
    class LibraryConstants {
        static kTraceDebugLogs: string;
        static kDefaultClientApplication: string;
        static kBuildType: string;
        static kApplicationVersion: string;
        static kRoutingUrl: string;
        static kVisualRoutingUrl: string;
    }
}
declare module InfrontUtil {
    class FormatSettings {
        useBrowserFormatting: boolean;
        browserDecimalSeparator: string;
        browserThousandsSeparator: string;
        useKiloMegaFormat: boolean;
        thousandsSeparator: string;
        decimalSeparator: string;
        kilo: string;
        mega: string;
        dateFormat: string;
        longDateFormat: string;
        dayMonthTimeFormat: string;
        dateTimeFormat: string;
        timeFormat: string;
        constructor();
    }
    var formatSettings: FormatSettings;
    class BrowserInfo {
        opera: boolean;
        safari: boolean;
        firefox: boolean;
        chrome: boolean;
        crios: boolean;
        msie: boolean;
        headless: boolean;
        versionStr: string;
        versionMajor: number;
        versionMinor: number;
        uagent: string;
        constructor();
    }
    var browserInfo: BrowserInfo;
    class LocalStorageCache {
        private static kCachePrefix;
        private prefix;
        constructor();
        store(key: string, value: Object, expires: Date): void;
        get(key: any): Object;
    }
    class CallbackWithError {
        callback: (...args: any[]) => void;
        error: (...args: any[]) => void;
    }
    /**
     * Simple utility-class that lets you set up a callback that will be called when any number of other callbacks have completed.
     */
    class MultiCallbackHandler {
        private totalCallbacks;
        private returnedCallbacks;
        private completeCallback;
        private log;
        constructor(completeCallback: () => void);
        setDebug(debug: boolean): void;
        addCallback(callback: any, name?: string): (...args: any[]) => void;
        addCallbackWithError(callback: any, error: any, name?: string): CallbackWithError;
        private createCallback(callback, name?);
    }
    class ObserverManager<O> {
        private observers;
        constructor();
        addObserver(obs: O): void;
        removeObserver(obs: O): void;
        foreach(func: (obs: O) => void): void;
        hasObservers(): boolean;
    }
    /**
     * Utility-class used to manager targets using the InterLibraryLink
     */
    class LinkTargetManager<DT> {
        private targets;
        constructor();
        addTarget(target: InterLibraryLink.Target): void;
        removeTarget(target: InterLibraryLink.Target): void;
        updateTargets(type: string, value: DT | DT[]): void;
        isLinked(): boolean;
    }
    /**
     * Utility-class for ad-hoc inline linking using the InterLibraryLink interfaces.
     */
    class InlineLinkTarget implements InterLibraryLink.Target {
        private dataTypes;
        private callback;
        constructor(acceptTypes: string[], callback: (msg: InterLibraryLink.Message) => void);
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
    }
    /**
     * Utility-class to export values and/or names from enum
     */
    class EnumExport {
        static getNames(e: any): string[];
        static getValues(e: any): number[];
    }
    /**
     * Utility-class to deal with url-parameters after a #
     */
    class URLHashParameters {
        private parameters;
        constructor();
        has(param: string): boolean;
        get(param: string): string;
    }
    enum SortedListAction {
        Insert = 0,
        Delete = 1,
        Clear = 2,
        Update = 3,
    }
    enum SortedListSortOrder {
        Asc = 0,
        Desc = 1,
    }
    class SortedList<DT> {
        private data;
        private sortOrder;
        private compareCallback;
        private updateCallback;
        constructor(defaults: DT[], sortOrder: SortedListSortOrder, compareCallback?: (a: DT, b: DT) => void, updateCallback?: (update: SortedListAction, args: DT[]) => void);
        private validIndex(index);
        get(index: number): DT;
        remove(index: number): void;
        clear(): void;
        length(): number;
        find(item: DT): any;
        insert(item: DT, duplicate?: boolean): any;
    }
    /**
     * Copies object1, merges object2 into the copy and returns the copy.
     * Arrays will always be from object2 if conflicting.
     * @param object1 Defaults.
     * @param object2 Object that will be applied on the copy of object1
     * @param deepCopyObjects Whether objects that only exists on object2 and all arrays within object2 should be deepCopied or referenced
     * @returns a deep copy of object1 with object2 merged in
     */
    function mergeRecursiveCopy(object1: any, object2: any, deepCopyObjects?: boolean): any;
    /**
     * Takes object1, merges object2 into object1 and returns object1.
     * Arrays will always be from object2 if conflicting.
     * @param object1 Object that will be merged into and returned
     * @param object2 Object that will be applied on the copy of object1
     * @param deepCopyObjects Whether objects that only exists on object2 and all arrays within object2 should be deepCopied or referenced
     * @returns object1
     */
    function mergeRecursive(object1: any, object2: any, deepCopyObjects?: boolean): any;
    function deepCopy(source: any): any;
    function arrayDeepCopy(source: any[]): any[];
    function isArray(value: any): value is any[];
    function arraysAreEqual(array1: any[], array2: any[]): boolean;
    function isLocalStorageSupported(): boolean;
    function getClassName(thing: Object): string;
    function isFunction(value: any): boolean;
    function isPrimitive(value: any): boolean;
    function isObject(value: any): boolean;
    function isEmptyObject(obj: Object): boolean;
    function isString(value: any): value is string;
    function isStringOrNull(value: any): value is string | null;
    function isNumber(value: any): value is number;
    function isBoolean(value: any): value is boolean;
    function isDate(value: any): value is Date;
    function isNumeric(value: string): boolean;
    function isLetter(value: string): boolean;
    function isIntegerString(str: string): boolean;
    function makeUUID(): string;
    function isSameValue(a: number, b: number, epsilon?: number): boolean;
    function isAndroid(): boolean;
    function isBlackBerry(): boolean;
    function isIOS(): boolean;
    function isOpera(): boolean;
    function isWindows(): boolean;
    function isMobile(): boolean;
    function shiftArray(array: any[], left: boolean): any[];
    function sumArray(array: number[]): number;
    function noElementsUndefined(array: any[]): boolean;
    function arrayContains(array: any[], equalsFunc: (val: any) => boolean): boolean;
    function checkArrayItems(array: any[], check: (item: any) => boolean): boolean;
    function addInlineStyle(element: HTMLElement, style: string): void;
    function addClassName(element: HTMLElement, className: string): void;
    function removeClassName(element: HTMLElement, className: string): void;
    function hasClass(element: HTMLElement, className: string): boolean;
    function addEventListener(element: GlobalEventHandlers, event: string, callback: (event: Event) => void): void;
    function removeEventListener(element: GlobalEventHandlers, event: string, callback: (event: Event) => void): void;
    function removeAllChildNodes(element: Element): void;
    function validatePropertyExists(obj: Object, constant: string): boolean;
    function getApiDateString(date: Date): string;
    function getTradingAlgoParamDateString(date: Date): string;
    function getTradingAlgoParamTimeString(time: Date): string;
    function parseIso8601DateString(date: string): Date;
    function parseTradingAlgoParamDateString(date: string): Date;
    function parseTradingAlgoParamTimeString(timeStr: string): Date;
    function formatTradingAlgoPriceString(src: string): string;
    /**
     * Replaces '_' with ' ' and capitalizes words for easier printing of server-provided enums.
     */
    function formatEnumString(value: string): string;
    /**
     * Formats a date the way we show a standard timestamp.
     * If the date is today, we show just time (hh:mm:ss),
     * if the date is not today, we show just the date (DD.MM.YYYY).
     */
    function formatStandardTimestamp(date: Date, seconds?: boolean): string;
    function formatDate(date: Date): string;
    function formatDateTime(date: Date, format: string, languageHandler?: any): string;
    function parsePlainTimeString(time: string): Date;
    function getPlainTimestring(date: Date, seconds?: boolean): string;
    function getPlainDatestring(date: Date): string;
    function today(): Date;
    function addDays(src: Date, days: number): Date;
    function addMonths(src: Date, months: number): Date;
    function isTimeStampSameDate(d1: number, d2: number): boolean;
    function isSameDate(d1: Date, d2: Date): boolean;
    function isLeapYear(year: number): boolean;
    /**
     * Returns the number of days in a given month.
     * @param month Zero-based month.
     * @param year four digit year.
     */
    function daysInMonth(month: number, year: number): number;
    function isToday(src: Date): boolean;
    function formatPercent(val: number, decimals?: number): string;
    function formatNumber(val: number, decimals: number): string;
    function sign(value: number): number;
    /**
     * Formats an integer suitable for use as an id.
     * @param id
     */
    function formatID(id: number): string;
    /**
     * Formats the value as an integer, but shortens it with k or m (or other letters specified in the language-dictionary):
     * Otherwise just format as integer.
     */
    function formatAndShorten(val: any, nb: number): string;
    /**
     * Formats the value as an integer, but shortens it with k or m (or other letters specified in the language-dictionary):
     * If val is bigger than 100 000, shorten with k (250 000 => 250k)
     * If val is bigger than 10 000 000, shorten with m (35 000 000 =>35m)
     * Otherwise just format as integer.
     */
    function formatAndShortenInteger(val: number, nb?: number): string;
    function parseFloatValue(src: string): number;
    function roundFloat(value: number, decimals: number): number;
    function parseNumber(value: string): number;
    /**Implements an actual zero-delay timeout.
     * This is used to ensure asynchronous behaviour, even when it is not strictly necessary.
     * The use of postMessage instead of setTimeout is for performance-reasons. postMessage has a significantly
     * shorter delay compared to setTimeout for a zero delay callback.
     * See FeedHandler or Observable for example.
     *
     * Edit: Changed implementation (at least temporarily) to setTimeout since performance for postMessage seems abysmal in IE.
     */
    function setZeroTimeout(callback: () => void): void;
    function parseJson(str: string): Object;
    function errorLogCallback(error_code: number, error_message: string): void;
    function isPositive(double: number): boolean;
    function isNM(value: string): boolean;
    function isNMPlus(value: string): boolean;
    function isNMMinus(value: string): boolean;
    function isNA(value: string): boolean;
    function removeSpaceAndPercent(value: string): string;
    function shorterName(str: any, nb?: number): any;
    function replaceAll(search: any, replace: any, subject: any): any;
    function debugLog(error_txt: any, error_obj?: Object): void;
    function errorLog(error_txt: any, error_obj?: Object): void;
    function allNullProperties(object: any): boolean;
    function getTime(): string;
    function htmlSanitize(string: string): string;
    function padHex(value: number, width?: number, padChar?: string): string;
    function getEnumStr(value: number, getStrCallback: (value: number) => string, count?: number): string;
    function getEnumStrings(value: number, getStrCallback: (value: number) => string, count?: number): string[];
    function padToDblDigit(value: any): string;
    function makeDbg(value: string): string;
    function roundToPrecision(value: any, decimals?: number): number;
    function DateToInt(d: Date, utc?: boolean): number;
    function TimeToInt(d: Date, utc?: boolean): number;
    function DateNuToDate(d: number, date: Date): void;
    function DateFromDateNu(d: number): Date;
    function DateFromDateAndTimeNu(date: number, time: number): Date;
    function DateNuToStr(d: number): string;
    function TimeNuToDate(t: number, date: Date, minOfs: number): void;
    function GetNowDateAsInt(): number;
    function GetNowTimeAsInt(): number;
    function ToCommonframeworkDate(date: Date): string;
    function ToCommonframeworkTime(time: Date): string;
    function ToCommonframeworkTimeOffset(ofs: number): string;
}
declare module Infront {
    interface Binding {
        valueUpdated(val: any): void;
        advancedValueUpdated?(newValue: any, oldValue: any): boolean;
        cleanup?(): void;
    }
    class GenericBinding implements Binding {
        private object;
        private transmitter;
        private formatter;
        private cachedValue;
        constructor(boundObject: Object, transmitter: Transmitter, formatter: Formatter);
        cleanup(): void;
        /**
         * This method is called by the observable this binding is watching when the value
         * of the observable has been updated.
         * @param val
         */
        valueUpdated(val: any): void;
        advancedValueUpdated(newValue: any, oldValue: any): boolean;
    }
    class AsyncGetBinding extends GenericBinding {
        advancedValueUpdated(newValue: any, oldValue: any): boolean;
    }
    class BindingFactory {
        static createInlineBinding(callback: (val: any) => void): Binding;
        static createAsyncGetBinding(callback: (val: any) => void): Binding;
        static createValueBinding(target: Object, field?: string): GenericBinding;
        static createDOMElementBinding(target: Element): GenericBinding;
        static createNumberFormatValueBinding(target: Object, field: string, decimals: number, allowZero?: boolean): any;
        static createNumberFormatValueBinding(target: Object, field: string, decimals: Observable, allowZero?: boolean): any;
        static createVolumeNumberBinding(target: Object, field: string, allowZero?: boolean): GenericBinding;
        static createShortenNumberBinding(target: Object, field: string, allowZero?: boolean): GenericBinding;
        static createIDBinding(target: Object, field: string): GenericBinding;
        static createPercentBinding(target: Object, decimals: number, field?: string, allowZero?: boolean): GenericBinding;
        static createTimestampBinding(target: Object, showSeconds?: boolean, field?: string): GenericBinding;
        static createDateBinding(target: Object, field?: string): GenericBinding;
        static createIdsDateBinding(target: Object, field?: string): GenericBinding;
        static createTranslateBinding(target: Object, translateFunction: (val: any) => any, field?: string): GenericBinding;
        static createBinding(target: Object, formatter: Formatter, transmitter: Transmitter): Binding;
        static createObjectFieldBinding(target: Object, sourceField: string[], targetField?: string): GenericBinding;
        static createHTMLAttributeBinding(target: HTMLElement, attribute: string, formatter: (val: any) => string): GenericBinding;
    }
    class ClassBinding implements Binding {
        private boundEl;
        private condition;
        private className;
        constructor(boundEl: HTMLElement, className: string, condition: (val: any) => boolean);
        valueUpdated(val: any): void;
    }
    interface InputBinding {
        bind(element: HTMLElement): any;
        unbind(): any;
    }
    class SelectInputBinding implements InputBinding {
        private element;
        private value;
        private changeListener;
        private observers;
        private notifyListenersOnBind;
        constructor(notifyListenersOnBind?: boolean);
        getSelectedIndex(): number;
        bind(element: HTMLSelectElement): void;
        unbind(): void;
        private selectedUpdated();
        setSelected(newSelected: number, notify?: boolean): void;
        observe(observer: (selectedIndex: number) => void): void;
        setDisabled(disabled: boolean): void;
    }
    class SelectStringValueInputBinding implements InputBinding {
        private element;
        private changeListener;
        private observers;
        constructor();
        bind(element: HTMLSelectElement): void;
        unbind(): void;
        observe(observer: (value: string) => void): void;
        private selectedUpdated();
        setDisabled(disabled: boolean): void;
        setSelected(newSelected: number): void;
    }
    class RadioInputBinding implements InputBinding {
        private boundElements;
        private onChange;
        private value;
        private onClickEvent;
        constructor(onChange: (value: any) => void);
        getValue(): any;
        setSelectedValue(value: any): void;
        private elementClicked(element);
        bind(element: HTMLInputElement): void;
        unbind(): void;
    }
    class CheckBoxInputBinding implements InputBinding {
        private element;
        private onChange;
        private value;
        private onClickEvent;
        constructor(onChange: (value: boolean) => void);
        getValue(): boolean;
        setValue(value: boolean): void;
        private elementClicked(element);
        bind(element: HTMLInputElement): void;
        unbind(): void;
    }
    class TextInputBinding implements InputBinding {
        private static kPlaceholderClass;
        private static kInvalidClass;
        static kKeycodeLeftArrow: number;
        static kKeycodeRightArrow: number;
        static kKeycodeUpArrow: number;
        static kKeycodeDownArrow: number;
        static kKeycodeEnter: number;
        static kKeycodeEscape: number;
        static kKeycodeTab: number;
        static kKeycodeBackspace: number;
        static kKeycodeDelete: number;
        static kKeycodeNumpadComma: number;
        static kKeycodeSpace: number;
        private lastvalue;
        private element;
        private observers;
        private keyCodeObservers;
        private keyUpListener;
        private keyDownListener;
        private focusListener;
        private blurListener;
        private focusCallback;
        private blurCallback;
        private onClickCallback;
        private numeric;
        private scrolling;
        private scrollCallback;
        private placeholder;
        private validator;
        constructor();
        bind(element: HTMLInputElement): void;
        unbind(): void;
        setNumeric(value: boolean): void;
        setScrolling(value: boolean, callback: (event: Event) => void): void;
        setOnClick(callback: (event: Event) => void): void;
        private isNumeric(event);
        setValidator(validator: (value: string) => boolean): void;
        isValid(): boolean;
        validate(): void;
        setPlaceholder(placeholder: string): void;
        setEnabled(enabled: boolean): void;
        isEnabled(): boolean;
        private focus();
        private blur();
        private keyDown(event);
        private keyUp(event);
        private valueUpdated();
        private updateObservers();
        onFocus(callback: () => void): void;
        onBlur(callback: () => void): void;
        observe(callback: (value: string) => void): void;
        observeSpecialKeys(keyCodes: number[], callback: (keyCode: number) => void): any;
        observeSpecialKeys(keyCodes: number, callback: (keyCode: number) => void): any;
        private addKeyCodeObserver(keyCode, callback);
        get(): string;
        /**
         * Sets the value of this observer and the input-element it links to. If updateObservers is false this
         * will not trigger an event for the observers.
         * @param value
         * @param updateObservers
         */
        set(value: string, updateObservers?: boolean): void;
        requestFocus(): void;
        requestBlur(): void;
        getElement(): HTMLInputElement;
    }
    interface IArrayBinding {
        reInit(items: any[]): any;
        itemAdded(item: any, index: number): any;
        itemRemoved(item: any, index: number): any;
        itemMoved(item: any, oldIndex: number, newIndex: number): any;
    }
    class ArrayBinding implements IArrayBinding {
        private el;
        private factory;
        private observer;
        constructor(boundEl: HTMLElement, rowFactory: RowFactory, observer: ArrayBindingObserver);
        reInit(items: any[]): void;
        itemAdded(item: any, index: number): void;
        itemRemoved(item: any, index: number): void;
        itemMoved(item: any, oldIndex: number, newIndex: number): void;
    }
    /**
     * Optimized Arraybinding that only displays visible rows. This creates a very light-weight dom.
     * Requirements:
     * - Must use supported CSS (Particularily, boundEl must have overflow:hidden and be handling scrolling)
     * - All rows must have constant height, height must be provided in constructor
     * - topExpandingEl and bottomExpandingEl must be children of boundEl
     */
    class FastArrayBinding implements IArrayBinding {
        private element;
        private topExpander;
        private bottomExpander;
        private rowFactory;
        private observer;
        private rowHeight;
        private data;
        private startIndex;
        private endIndex;
        constructor(boundEl: HTMLElement, topExpandingEl: HTMLElement, bottomExpandingEl: HTMLElement, rowFactory: RowFactory, observer: ArrayBindingObserver, rowHeight: number);
        reInit(items: any[]): void;
        itemAdded(item: any, index: number): void;
        itemRemoved(item: any, index: number): void;
        itemMoved(item: any, oldIndex: number, newIndex: number): void;
        private isInViewport(index);
        private updateView();
        private insertNewRowBefore(index, before);
        private removeRow(index, node);
        private createRow(index);
    }
    interface ArrayBindingObserver {
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): any;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): any;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): any;
    }
    interface RowFactory {
        createRow(item: any, index: number): HTMLElement;
    }
    class InlineRowFactory implements RowFactory {
        private createRowFunction;
        constructor(createRowFunction: (item: any, index: number) => HTMLElement);
        createRow(item: any, index: number): HTMLElement;
    }
}
declare module Infront {
    /**
     * An array that can be observed (typically by an ArrayBinding). Any manipulation of the array will cause callbacks to the observer(s).
     * Interaction mostly mirrors the way you interact with a normal javascript array (except for the [] index). Callbacks are sent synchronously.
     */
    class ObservableArray {
        static counter: number;
        id: string;
        data: any[];
        obs: IArrayBinding[];
        lengthObservable: Observable<number>;
        private isReInitializing;
        constructor();
        /**
         * Returns the javascript-array backing this ObservableArray. Be careful about interacting with this, since any manipulation of the
         * array will not be signaled to any observers.
         */
        get(): any[];
        /**
         * Insert a value at the specified index.
         */
        insert(obj: any, index: number): void;
        /**
         * Search for obj and remove it if found.
         */
        remove(obj: any): void;
        /**
         * Remove the item at the given index and returns it.
         * @param index
         * @returns any
         */
        removeItemAt(index: number): any;
        /**
         * Appends an item to the end (biggest index) of the array.
         * @param obj
         */
        push(obj: any): void;
        /**
         * Removes the item at the end (biggest index) of the array and returns it.
         * @returns any
         */
        pop(): any;
        /**
         * Searches for an item and, if found, moves it to a new index.
         * @param obj
         * @param newIndex
         */
        move(obj: any, newIndex: any): void;
        /**
         * Removes all items in the array.
         */
        clear(): void;
        protected updateLengthObservable(): void;
        /**
         * Sorts the array using the provided compare-function. After the sort the observers will receive one move-callback
         * for each element with the new position, even if it did not move in the array.
         * @param compareFunction
         */
        sort(compareFunction: (itemA: any, itemB: any) => number): void;
        /**
         * Iterates over the array and executes func with each item as a parameter. You should NOT modify the array in this
         * process.
         * @param func
         */
        foreach(func: (item: any) => void): void;
        /**
         * Searches through the array and returns the first (or last if reverse is true) item where the compare-function
         * returns true.
         * @param compare
         * @param reverse
         * @returns any
         */
        find(compare: (item: any) => boolean, reverse?: boolean): any;
        /**
         * Replaces the data currently in the array with new data.
         * @param data
         */
        replaceWith(data: any[]): void;
        length(): number;
        item(index: number): any;
        lastItem(): any;
        indexOf(obj: any): number;
        contains(obj: any): boolean;
        observe(b: IArrayBinding): void;
        unbind(b: IArrayBinding): void;
        private updateInserted(obj, index);
        private updateRemoved(obj, index);
        private updateMoved(obj, oldIndex, newIndex);
    }
    /**
     * An observable array that will insert any object in sorted order, according to the provided
     * compare-function. This overrides the functionality of the push- and insert-functions.
     */
    class SortedObservableArray extends ObservableArray {
        private compareFunction;
        private allowDuplicates;
        constructor(compareFunction: (itemA: any, itemB: any) => number, allowDuplicates?: boolean);
        /**
         * Finds the correct insert-index for the given item using a binary search through the array.
         * @param obj
         * @param startIndex
         * @param endIndex
         * @returns {*}
         */
        private findInsertIndex(obj, startIndex, endIndex);
        replaceWith(newData: any[]): void;
        /**
         * The push-function normally appends the item to the end of the array, but since this class maintains
         * a sorted order it will be inserted into it's proper place instead.
         * @param obj
         */
        push(obj: any): void;
        findObjectItemIndex(item: any, key: string): number;
        /**
         * See push().
         */
        insert(obj: any, index: number): void;
        /**
         * Changes the compare-function of this array. This causes the array to be re-sorted.
         * @param compareFunction
         */
        setCompareFunction(compareFunction: (itemA: any, itemB: any) => number): void;
    }
    /**
     * This class will intercept and pass on callbacks from the ObservableArray backing it, but act if only the top part of the array (as specified by the cap-parameter) is visible.
     */
    class ObservableArrayCap implements IArrayBinding {
        private obs;
        protected backing: ObservableArray;
        private cap;
        private paddingItem;
        constructor(backing: ObservableArray, cap: number, paddingItem?: any);
        private createTempDataArray();
        setCap(newCap: number): void;
        observe(b: IArrayBinding): void;
        unbind(b: IArrayBinding): void;
        reInit(items: any[]): void;
        itemAdded(item: any, index: number): void;
        itemRemoved(item: any, index: number): void;
        itemMoved(item: any, oldIndex: number, newIndex: number): void;
        private updateInserted(obj, index);
        private updateRemoved(obj, index);
        private updateMoved(obj, oldIndex, newIndex);
    }
    class CachedObservableArrayCap extends ObservableArrayCap {
        private cache;
        private cacheKey;
        private bound;
        constructor(cache: BindingCache, cap: number, paddingItem?: any);
        reInit(items: any[]): void;
        unbindFromCache(): void;
        bindToCache(cacheKey: string): void;
    }
    /**
     * Syncs the contents of a target array based on events from the source array.
     */
    class ObservableArraySync implements IArrayBinding {
        private source;
        private target;
        private filter;
        constructor(target: ObservableArray, filter?: (item: any) => boolean);
        setSource(source: ObservableArray): void;
        reInit(items: any[]): void;
        itemAdded(item: any, index: number): void;
        itemRemoved(item: any, index: number): void;
        itemMoved(item: any, oldIndex: number, newIndex: number): void;
        destroy(): void;
    }
    class ObservableArrayRowCounter implements IArrayBinding {
        rowCount: Observable<number>;
        array: ObservableArray;
        constructor(array: ObservableArray);
        unbind(): void;
        private update();
        reInit(items: any[]): any;
        itemAdded(item: any, index: number): any;
        itemRemoved(item: any, index: number): any;
        itemMoved(item: any, oldIndex: number, newIndex: number): any;
    }
    enum InitialUpdate {
        None = 0,
        Asynchronous = 1,
        Synchronous = 2,
    }
    /**
     * Lets you subscribe to a value (usually a primitive) and receive updates when it changes.
     */
    class Observable<T = any> {
        protected bindings: Binding[];
        protected value: T;
        infrontObservable: boolean;
        constructor(initValue?: T);
        private updateBinding(binding);
        observe(b: Binding, initialUpdate?: InitialUpdate): void;
        unbind(b: Binding): void;
        updateBindings(oldValue: T): void;
        set(val: T): void;
        get(): T;
        isNull(): boolean;
        count(): number;
        static isObservable(obj: any): obj is Observable;
    }
    class ObservableBinding extends Observable<any> implements Binding {
        private translate;
        constructor(translate?: (val: any) => any);
        valueUpdated(val: any): void;
    }
    /**
     * A bastardization of Observable that doesn't actually have its own value. Instead it subscribes to
     * one or more other Observables and runs the provided computation-function whenever one or more of them
     * changes their value (and then updates its own listeners).
     */
    class ComputedObservable extends Observable implements Binding {
        private args;
        private computation;
        private needAllArgs;
        /**
         *
         * @param args Observables that should be used in computation function
         * @param computation Function to process args and return the ComputedObservables updated value
         * @param needAllArgs Pass true to prevent computation from firing until all args have received a non-null value
         */
        constructor(args: Observable[], computation: (args: any[]) => any, needAllArgs?: boolean);
        set(val: any): void;
        valueUpdated(val: any): void;
        unbindAll(): void;
    }
    class CacheComputedObservable extends Observable<any> implements Binding {
        private computation;
        private cache;
        private fields;
        private unbinds;
        constructor(cache: BindingCache, fields: FieldReference[], computation: (args: any[]) => any);
        set(val: any): void;
        valueUpdated(val: any): void;
        unbindAll(): void;
    }
    /**
     * Observable that computes a average on a single field in all rows of a table, potentially weighted by the contents of a second column.
     */
    class CacheWeightedAverageObservable extends Observable<number> implements IArrayBinding {
        private cache;
        private cacheKeyCreator;
        private weightFieldCacheKeyCreator;
        private valueMap;
        private weightMap;
        private unbindMap;
        private avgField;
        private weightField;
        constructor(cache: BindingCache, avgField: any, weightField: any, avgFieldCacheKeyCreator: (arrayItem: any) => string, weightFieldCacheKeyCreator: (arrayItem: any) => string);
        set(val: any): void;
        private update();
        /**
         * IArrayBinding
         */
        reInit(items: any[]): any;
        itemAdded(item: any, index: number): any;
        itemRemoved(item: any, index: number): any;
        itemMoved(item: any, oldIndex: number, newIndex: number): any;
    }
    /**
     * Observable that performs a computation on a single field in all rows of a table.
     */
    class CacheColumnComputedObservable extends Observable implements IArrayBinding {
        private cache;
        private field;
        private cacheKeyCreator;
        private computation;
        private observedKeys;
        private valueMap;
        private unbindMap;
        private strategy;
        constructor(cache: BindingCache, field: string[], cacheKeyCreator: (arrayItem: any) => string, computation: (values: any[]) => any, strategy: ComputationStrategy);
        constructor(cache: BindingCache, field: string, cacheKeyCreator: (arrayItem: any) => string, computation: (values: any[]) => any, strategy: ComputationStrategy);
        set(val: any): void;
        private update();
        /**
         * IArrayBinding
         */
        reInit(items: any[]): any;
        itemAdded(item: any, index: number): any;
        itemRemoved(item: any, index: number): any;
        itemMoved(item: any, oldIndex: number, newIndex: number): any;
    }
    /**
     * An implementation of Observable that has an override-method. This is intended to allow for forcing the value without
     * having if-statements everywhere.
     * It saves any changes to the value while the override is in effect so nothing will be lost.
     */
    class OverridableObservable extends Observable {
        private overrideActive;
        private actualValue;
        constructor();
        set(val: any): void;
        override(val: any): void;
        clearOverride(): void;
    }
}
declare module Infront {
    enum CalculatorStatus {
        Ok = 200,
        BadRequest = 400,
        BadOrExpiredToken = 401,
        PaymentRequired = 402,
        Forbidden = 403,
        StoredObjectNotFound = 404,
        Timeout = 408,
        Conflict = 409,
    }
    class ApiAccessToken {
        access_token: string;
        expires_in: number;
        refresh_expires_in: number;
        refresh_token: string;
        token_type: string;
        not_before_policy: number;
        session_state: string;
        scope: string;
        assign(json: string): boolean;
    }
    class CalculationRequest {
        options: CalculationRequestOptions;
        processResponse: (xhr: XMLHttpRequest) => void;
        requestMethod: (request: CalculationRequest) => void;
        tokenRefreshCount: number;
        command: string;
        callback: (response: CalculatorResponse) => void;
    }
    class CalculationRequestOptions {
        response: CalculatorResponse;
        getParams(): string;
    }
    class BaseCalculatorObject {
        objectType: CalculatorObjectType;
        currency: string;
        protected data: {
            [tag: number]: ValueCalculator;
        };
        protected arrays: {
            [tag: number]: ObservableArray;
        };
        constructor();
        clear(): void;
        getVal(tag: number, makeNew?: boolean): ValueCalculator;
        getArray(tag: number, makeNew?: boolean): ObservableArray;
        getCurrency: () => string;
        getField(tag: number): ValueCalculator;
        getValue(tag: number): any;
        setValue(tag: number, value: any): ValueCalculator;
        inspect(): any;
        protected updateCurrencyFields(): void;
        protected formatNumber(value: number, field: CalculatorFieldDefinition): string;
        protected processObject(container: BaseCalculatorObject, data: any): void;
        protected processArray(array: ObservableArray, arrayKey: string, data: any): void;
        protected processValue(key: string, value: any): void;
    }
    abstract class CalculatorResponse extends BaseCalculatorObject {
        status: number;
        statusText: string;
        inspect(): any;
        protected abstract readDataNode(data: any): any;
        protected readMetaNode(data: any): void;
        assign(data: string): boolean;
    }
    class CashFlowItem {
        currency: string;
        discount_factor_fix: number;
        discount_factor_float: number;
        evaluation_date: Date;
        amount_fix: number;
        amount_float: number;
        forward_rate_float: number;
        present_value_fix: number;
        present_value_float: number;
        constructor(data: any);
        hasValidContent(): boolean;
    }
    class CalculatorSwapResponse extends CalculatorResponse {
        constructor();
        protected readDataNode(data: any): void;
    }
    class CalculatorBondResponse extends CalculatorResponse {
        constructor();
        protected readDataNode(data: any): void;
    }
    class ApiGetTokenRequest extends CalculationRequestOptions {
        username: string;
        password: string;
        grant_type: string;
        client_id: string;
        client_secret: string;
    }
    class ApiRefreshTokenRequest extends CalculationRequestOptions {
        grant_type: string;
        refresh_token: string;
    }
    class CalculateSwapRequest extends CalculationRequestOptions {
        evaluation_date: string;
        currency: string;
        start_date: string;
        end_date: string;
        frequency_fix: string;
        frequency_float: string;
        interest_calculation_method_fix: string;
        interest_calculation_method_float: string;
        first_coupon_fix: string;
        first_coupon_float: string;
        fix_is_payer: string;
        notional: string;
        fix_rate: string;
        floating_spread: string;
        leverage: string;
    }
    class CalculateBondsRequest extends CalculationRequestOptions {
        clean_price: string;
        currency: string;
        start_date: string;
        end_date: string;
        valuation_date: string;
        first_coupon_date: string;
        last_coupon_date: string;
        fix_rate: string;
        frequency: string;
        interest_calculation_method: string;
        marginal_tax_rate: string;
        notional: string;
        redemption: string;
        yield: string;
    }
    class CalculatorServer {
        private accessUrl;
        private calculatorUrl;
        private credentials;
        private token;
        private idsCore;
        constructor(idsCore: IDS.ServerPool);
        private getServerSettings();
        private sendTokenRequest(callback);
        private ensureValidTokenAndSendRequest(request);
        private requestCalculatorData;
        private tokenIsExpired(xhr);
        private needTokenRefresh(xhr, request);
        getSwap(requestOptions: CalculateSwapRequest, callback: (response: CalculatorSwapResponse) => void): void;
        getFixedBond(requestOptions: CalculateBondsRequest, callback: (response: CalculatorBondResponse) => void): void;
        getFloatingBond(requestOptions: CalculateBondsRequest, callback: (response: CalculatorBondResponse) => void): void;
    }
}
declare namespace IDS {
    enum ResponseEnum {
        Ok = 0,
        Error = 1,
        WorkingOnServer = 2,
    }
    enum ResponseCacheEnum {
        NoCache = 0,
        CacheData = 1,
        ReloadedFromServer = 2,
        ConcatenatedFromServer = 3,
    }
    class ResponseHeader {
        type: ResponseEnum;
        cache: ResponseCacheEnum;
        errorMsg: string;
        constructor(type?: ResponseEnum, errorMsg?: string, cache?: ResponseCacheEnum);
    }
    interface AllResponseCallbacks {
        ResponseBrokerStats?(ResponseHeader: any, any: any): void;
        ResponseHistBrokerStats?(ResponseHeader: any, any: any): void;
        ResponseHistPerformance?(ResponseHeader: any, any: any): void;
        ResponseTimeSeries?(ResponseHeader: any, any: any): void;
        ResponseHistTimeSeries?(ResponseHeader: any, any: any): void;
        ResponseTickSize?(ResponseHeader: any, any: any): void;
        ResponseChainList?(ResponseHeader: any, any: any): void;
        ResponseChainContent?(ResponseHeader: any, any: any): void;
        ResponseCompanyData?(ResponseHeader: any, any: any): void;
        ResponseSearchSymbol?(ResponseHeader: any, any: any): void;
        ResponseRanking?(ResponseHeader: any, any: any): void;
        ResponseCalendarEvents?(ResponseHeader: any, any: any): void;
        ResponseCalendarStory?(ResponseHeader: any, any: any): void;
        ResponseHeadline?(ResponseHeader: any, any: any): void;
        ResponseNewsStory?(ResponseHeader: any, any: any): void;
        ResponseHistHeadline?(ResponseHeader: any, any: any): void;
        ResponseHistNewsStory?(ResponseHeader: any, any: any): void;
        ResponseStorageCategories?(ResponseHeader: any, any: any): void;
        ResponseStorageList?(ResponseHeader: any, any: any): void;
        ResponseStorageGetFile?(ResponseHeader: any, any: any): void;
        ResponseStoragePutFile?(ResponseHeader: any, any: any): void;
        ResponseStorageDeleteFile?(ResponseHeader: any, any: any): void;
        ResponseGetAlerts?(ResponseHeader: any, any: any): void;
        ResponseDeleteAlert?(ResponseHeader: any, any: any): void;
        ResponseAddAlert?(ResponseHeader: any, any: any): void;
        ResponseModifyAlert?(ResponseHeader: any, any: any): void;
        StreamingAlertUpdate?(ResponseHeader: any, any: any): void;
        StreamingAlertEvent?(ResponseHeader: any, any: any): void;
        ResponseCalculatedHistory?(ResponseHeader: any, any: any): void;
        ResponseWireData?(ResponseHeader: any, any: any): void;
        ConnectionStatus?(ResponseHeader: any, isConnected: boolean): void;
        ResponseError(ResponseHeader: any): void;
    }
    class CommonFrameworkResponse {
        Reply: (header: ResponseHeader, response: Object) => void;
        dummy: any;
    }
    class ResponseItem {
        buf: Uint8Array;
        fromCache: boolean;
        constructor(buf: Uint8Array, fromCache?: boolean);
    }
    class BaseRequest {
        private requestTime;
        type: number;
        request: any;
        data: ResponseItem[];
        commonFramework: CommonFrameworkResponse;
        responseNu: number;
        constructor(type?: number);
        responseTimeStr(prefix?: string, id?: number): string;
    }
    class Request extends BaseRequest {
        callback: AllResponseCallbacks;
    }
    class TickItem {
        id: number;
        lower_bound: number;
        upper_bound: number;
        size: number;
        constructor(id: number, lower_bound: number, upper_bound: number, size: number);
    }
}
declare module Infront {
    interface GenericCallback<DataType> {
        (data: DataType): void;
    }
    class CallbackHandler<CbDataType> {
        private callbacks;
        AddCallback(callback: GenericCallback<CbDataType>): void;
        RemoveCallback(callback: GenericCallback<CbDataType>): void;
        NotifyCallbacks(data: CbDataType): void;
        SingleNotifyCallback(data: CbDataType): void;
        length(): number;
    }
}
declare module Infront {
    enum FeedType {
        Stocks = 1,
        News = 2,
        Bonds = 4,
        EuroOptions = 8,
        Futures = 16,
        Commodities = 32,
        Indices = 64,
        Forex = 128,
        UsOptions = 256,
        Funds = 512,
        Chat = 1024,
        UrlNews = 2048,
        Orders = 4096,
        Investors = 8192,
        Warrants = 16384,
        Features = 32768,
        SymbolExt = 65536,
        CalendarUpdates = 131072,
        FxDepositRates = 262144,
        Mtf = 524288,
        ResearchNews = 1048576,
        WebFeature = 2097152,
        Si = 4194304,
    }
    enum FeedProperty {
        Orderbook = 1,
        Trades = 2,
        AllTrades = 4,
        TradeBrokers = 8,
        PushData = 16,
        OrderEntryTicker = 32,
        OrderBookBrokers = 64,
        OrderEntryIsin = 128,
        SubscribeSymbols = 256,
        Fractions = 512,
        DynTickSize = 1024,
        ExchMsg = 2048,
        Lists = 4096,
        Chains = 8192,
        DefaultSymbols = 16384,
        PagesOnly = 32768,
        HistInvestorInfo = 65536,
        SpecialPrices = 131072,
        FeedFlag = 262144,
        Utf8 = 524288,
        Derivatives = 1048576,
        SeparateBboMbo = 2097152,
        Mbo = 4194304,
        IgnoreUrl = 8388608,
        Consolidated = 16777216,
        SeparateTrades = 33554432,
        RssNews = 67108864,
        NoSharing = 134217728,
        HideIsin = 268435456,
        FxForwards = 536870912,
        FxCurrencyCross = 1073741824,
        SecondaryFeed = 2147483648,
    }
    const FeedtypeSymbols: number;
}
declare module Infront {
    class Feed {
        private staticRequests;
        private timerToken;
        bypassStaticCache: boolean;
        feednu: number;
        date: Date;
        ofsMins: number;
        syms: {
            [symbol: string]: IDS.Symbol;
        };
        mwsRefData: CallbackHandler<any>;
        content: IDS.SymbolContentEnum;
        pendingContent: IDS.SymbolContentEnum;
        constructor(feednu: number);
        MWSDistRefData(): void;
        StaticRequested(instrument: Instrument): boolean;
        StaticReceived(instrument: Instrument): void;
        hasAllStatic(): boolean;
        resetSymbols(): void;
        static FeedTypeToStr(type: FeedType): string;
        static FeedPropertyToStr(property: FeedProperty): string;
    }
    class FeedList {
        feeds: {
            [feedNu: number]: Feed;
        };
        addFeed(feed: Feed): void;
    }
}
declare module Infront {
    function MakePidSidIndex(pid: number, sid: number): number;
    function DecodePidSidIndex(pidSid: number): PidSid;
    class PidSid {
        pid: number;
        sid: number;
        constructor(pid?: number, sid?: number);
        Index(): number;
        toStr(delimiter?: string): string;
        isLoginServer(): boolean;
        isPidSid(pid: number, sid: number): boolean;
    }
    class PidSidDb {
        private feeds;
        GetFeed(feed: number, makeNew: boolean): any;
    }
}
declare module Infront {
    import SortedList = InfrontUtil.SortedList;
    enum OrderbookSide {
        BID = 1,
        ASK = 2,
    }
    class OrderBase {
        price?: number;
        volume?: number;
        time?: number;
        orders?: number;
    }
    class MblLevel {
        bid: OrderBase;
        ask: OrderBase;
    }
    class MblOrder extends OrderBase {
        level: number;
    }
    class MblOrderBook {
        private symbol;
        bids: MblOrder[];
        asks: MblOrder[];
        levels: MblLevel[];
        constructor(symbol: IDS.Symbol);
        init(): void;
        getOrder(level: number, isBid: boolean): MblOrder;
        deleteOrder(level: number, isBid: boolean): void;
        insertOrder(level: MblLevel, isBid: boolean, realtimeTag: number, value: any): boolean;
        publishOrderbook(): void;
        reset(): void;
    }
    class MboOrder extends OrderBase {
        orderId: string;
        bidAsk?: OrderbookSide;
        market?: string;
        buyerSeller?: string;
    }
    class MboLevel {
        price: number;
        volume?: number;
        ordersNum?: number;
        orders?: SortedList<MboOrder>;
        private update?(action, args);
    }
    class MboOrderBook {
        private symbol;
        private orders;
        private bidLevels;
        private askLevels;
        private bidLevelsUpdated;
        private askLevelsUpdated;
        constructor(symbol: IDS.Symbol);
        insertOrder(order: MboOrder, publish?: boolean): boolean;
        updateOrder(order: MboOrder, publish: boolean): boolean;
        updateOrder(index: number, newOrder: MboOrder, publish: boolean): boolean;
        deleteOrder(orderId: string, publish?: boolean): boolean;
        publishOrderbook(forcePublishEmpty?: boolean): void;
        private getUpdatedOrderbook();
        reset(): void;
        ordersCount(): number;
    }
    class OrderbookRow {
        side: OrderbookSide;
        level: number;
        price: Observable;
        volume: Observable;
        numOrders: Observable;
        formattedPrice: Observable;
        constructor(side: OrderbookSide);
    }
}
declare module Infront {
    enum LastChangeCalcMethodEnum {
        Last = 0,
        YYLast = 1,
        BidAsk = 2,
        IndOpen = 3,
        IndLast = 4,
    }
    class Value extends Observable<any> implements DatabaseValue {
        constructor(value?: any);
        SetDateRaw(dateTimeMs: number): void;
        Inc(data: any): void;
        setWithoutNotify(newValue: any): void;
    }
    class ValueChange extends Value implements Binding {
        private last;
        private ylast;
        private percent;
        constructor(last: Value, ylast: Value, percent: boolean);
        valueUpdated(value: number): void;
        unbindAll(): void;
    }
    class ValueChangeEx extends Value implements Binding {
        private symbol;
        private last;
        private ylast;
        private yylast;
        private bid;
        private ask;
        private indOpen;
        private indLast;
        private symbolType;
        private tradeMoves;
        private onFloorVolume;
        private percent;
        private static kEpsilon;
        constructor(symbol: IDS.Symbol, last: Value, ylast: Value, yylast: Value, bid: Value, ask: Value, indOpen: Value, indLast: Value, symbolType: Value, tradeMoves: Value, onFloorVolume: Value, percent: boolean);
        private isBidAskPriceTypeNormal(val);
        private isIndex();
        private isFund();
        private noTradesToday();
        private getChangeCalcMethod();
        private setValue(fromPrice, toPrice);
        valueUpdated(value: number): void;
        unbindAll(): void;
    }
    class ValueCascaded extends Value implements Binding {
        private inputs;
        constructor(inputs: Value[]);
        valueUpdated(value: number): void;
        unbindAll(): void;
    }
    class ValueTime extends Value implements Binding {
        private time;
        constructor(time: Value);
        set(val: any): void;
        valueUpdated(): void;
        unbindAll(): void;
    }
    class ValueDate extends Value implements Binding {
        private time;
        constructor(time: Value);
        valueUpdated(): void;
        unbindAll(): void;
    }
    class ValueSymbolType extends Value implements Binding {
        private type;
        constructor(type: Value);
        valueUpdated(): void;
    }
    class ValueSymbolSubType extends Value implements Binding {
        private subType;
        constructor(subType: Value);
        valueUpdated(): void;
    }
    class ValueComputed extends Value implements Binding {
        private computation;
        private inputs;
        private name;
        constructor(name: string, inputs: Value[], computation: (args: any[]) => any);
        UpdateReferences(inputs: Value[], computation: (args: any[]) => any): void;
        NoReferences(): boolean;
        unbindAll(): void;
        valueUpdated(): void;
    }
    class ValueCalculator extends Value {
        protected fieldDefinition: CalculatorFieldDefinition;
        private getCurrency;
        name: string;
        constructor(fieldDefinition: CalculatorFieldDefinition, getCurrency: () => string, value?: any);
        getRaw(): any;
        isCurrencyField(): boolean;
        get(): any;
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Feed = Infront.Feed;
    import GenericCallback = Infront.GenericCallback;
    import CallbackHandler = Infront.CallbackHandler;
    import MblOrderBook = Infront.MblOrderBook;
    import MboOrderBook = Infront.MboOrderBook;
    import Instrument = Infront.Instrument;
    import Value = Infront.Value;
    import ValueComputed = Infront.ValueComputed;
    enum SymbolContentEnum {
        None = 0,
        Basic = 1,
        Mbl = 2,
        Mbo = 4,
        Trades = 8,
        Consolidated = 16,
        Unconsolidated = 32,
        HistPerformance = 64,
        StaticData = 128,
    }
    class SymbolContent {
        content: SymbolContentEnum;
        constructor(content: SymbolContentEnum);
        getFeedProperties(): number;
        getCommon(content: SymbolContentEnum): SymbolContentEnum;
        getDiff(content: SymbolContentEnum): SymbolContentEnum;
        static SymbolContentToStr(content: SymbolContentEnum): string;
        static SymbolContentStr(content: SymbolContentEnum): string;
    }
    class Symbol {
        private ps;
        private computedFields;
        fsService: ProviderService;
        feedInfo: FeedInfo;
        feed: Feed;
        date: Date;
        data: {
            [tag: number]: Value;
        };
        fs: Instrument;
        mbo: MboOrderBook;
        mbl: MblOrderBook;
        genericCallbacks: CallbackHandler<Object>;
        orderbookCallbacks: CallbackHandler<MblOrderBook>;
        tradesCallbacks: CallbackHandler<MWSTrade>;
        tradesCacheCallback: GenericCallback<MWSTrade>;
        content: SymbolContentEnum;
        fundDetailsRequested: boolean;
        fundDataDetailsRequested: boolean;
        hasStaticContent: boolean;
        hasRealTimeTrade: boolean;
        constructor(ps: PidSid, fs: Instrument, fsService: ProviderService, feedInfo: FeedInfo, feed: Feed);
        private addChange(lastTag, yestTag, changeTag, percent);
        reset(): void;
        resetOrderbook(): void;
        hasContent(content: SymbolContentEnum): boolean;
        inspect(): any;
        getValue(tag: IDS.IdsTag, makeNew?: boolean): Value;
        getForwardCurveAllValuesOrNull(): any;
        getValueOrNull(tag: IDS.RealtimeTags | IDS.RealtimeDateTime | MwsRealtimeTags | IDS.PerformanceTags | IDS.MorningstarSEKPerformanceTags | AllRealtimeFundTags | IDS.ForwardCurve | IDS.RealtimeCalculatedHistoryTags): any;
        getComputedValue(tagName: string, makeNew?: boolean): ValueComputed;
        GetExchangeCode(): any;
        GetComputedTagValueOrNull(tagName: string): any;
        setComputedValue(tagName: string, data: Value): ValueComputed;
        CacheUpdated(update?: boolean): void;
        MWSRegisterGeneric(cb: GenericCallback<Object>): void;
        MWSUnregisterGeneric(cb: GenericCallback<Object>): void;
        registerOrderbookCallback(cb: GenericCallback<MblOrderBook>): void;
        unregisterOrderbookCallback(cb: GenericCallback<MblOrderBook>): void;
        registerTradesCallback(cb: GenericCallback<MWSTrade>): void;
        unregisterTradesCallback(cb: GenericCallback<MWSTrade>): void;
        distTrades(data: MWSTrade): void;
        GetDecimals(): number;
        ToMwsInstrument(): any;
        ToMws(): any;
        static SymbolTypeToStr(type: number): string;
        static SymbolSubTypeToStr(type: number): string;
        static StrToSymbolType(type: string): number;
        static StrToSymbolSubType(type: string): number;
    }
}
declare module Infront {
    interface DatabaseValue {
    }
    interface DatabaseEntry {
        add(id: number, value: any): DatabaseValue;
        get(id: number, createNew: boolean): DatabaseValue;
        delete(id: number): any;
    }
    interface DatabaseIndex {
    }
    interface DatabaseList {
    }
    interface Database {
    }
    class Db implements Database {
        private pidSidDb;
        constructor();
        GetFeedDb(ps: PidSid, feed: number, makeNew: boolean): Feed;
        GetSymbols(feedNu: number, symbolTicker: string): IDS.Symbol[];
    }
}
/**
 * Cache for storing data that can be observed by the UI.
 *
 * This cache stores (potentially partial) COPIES of the object that is passed in, and allows the UI to bind to it's
 * contents. This is an efficient way of updating the UI to updates of streaming data.
 *
 * Terms:
 * KEY: Key identifying the root object in the cache map.
 * FIELD: Key identifying a field in an object contained in the cache map. Possibly in a nested Object, specified by
 * supplying an array to the field-parameter.
 */
declare module Infront {
    enum ComputationStrategy {
        PASSIVE = 0,
        AGGRESSIVE = 1,
        FIRST_RESULT = 2,
    }
    /**
     * A reference to a value in the cache consists of two things:
     * - A cache-key (string)
     * - A field-spec (a string or array of strings)
     */
    class FieldReference {
        cacheKey: string;
        fieldSpec: any;
        constructor(key: string, spec: any);
        getSpecAsArray(): string[];
        toString(): string;
    }
    enum CacheSource {
        CachedArrays = 0,
        CachedObservables = 1,
        UnboundObservers = 2,
        UnboundArrayObservers = 3,
    }
    class BindingCache {
        static kCacheTimestampField: string;
        private cachedArrays;
        private streamingManager;
        private cachedObservables;
        private unboundObservers;
        private unboundArrayObservers;
        private snapshotCallback;
        private feedCallback;
        constructor();
        SetIDS(streamingManager: IDS.API.StreamingManager): void;
        GetIDS(): IDS.API.StreamingManager;
        /**
         * Creates an array in the cache. If you supply an itemKeyCreator, such an array only stores cache-keys, so it's really just a list of references
         * to other objects in the cache. If not itemKeyCreator is provided, objects are stored directly in the array. If you supply a compareFunction
         * the array will be sorted (without streaming-support). We treat arrays differently and
         * store them in their own store, just to make things simple for ourselves. Cache-arrays are standard ObservableArray.
         * @param key
         * @param itemKeyCreator
         * @param compareFunction
         * @param allowDuplicates
         */
        createArray(key: string, itemKeyCreator?: (item: any) => string, compareFunction?: (a: any, b: any) => number, allowDuplicates?: boolean): void;
        /**
         * Updates an item in an array, or adds it if it is new. If the array doesn't contain keys, this will do nothing.
         * @param key
         * @param item
         */
        updateArrayItem(key: string, item: any): void;
        updateArrayItems(key: string, items: any[]): void;
        insertKeyIntoArray(arrayKey: string, itemKey: string): void;
        deleteArrayItem(arrayKey: string, item: any): void;
        clearArray(arrayKey: string): void;
        private lookupArrayContainer(arrayKey);
        /**
         * Binds to a cached Array.
         * @param key
         * @param binding
         */
        bindToArray(key: string, binding: IArrayBinding): () => void;
        unbindFromArray(key: string, binding: IArrayBinding): void;
        getArray(arrayKey: string): ObservableArray;
        /**
         * Update an object in the cache with data.
         *
         * This method will create a copy of all objects and primitives with corresponding observable values. If the
         * object (in part or in whole) exists it will be updated with the new data. Any bound elements will be updated.
         *
         * @param key key Identifier of the Object (for example a snapshot of instrument-data).
         * @param data The object containing the new data.
         * @param updateTimestamp If true (default), the cache timestamp will be updated.
         */
        update(key: string, data: Object, updateTimestamp?: boolean): void;
        /**
        * Update an object in the cache with data.
        *
        * This method will create a copy of all objects and primitives with corresponding observable values. If the
        * object (in part or in whole) exists it will be updated with the new data. Any bound elements will be updated.
        * This function will only update the cache valid values (non null) from the data object.
        *
        * @param key key Identifier of the Object (for example a snapshot of instrument-data).
        * @param data The object containing the new data.
        * @param updateTimestamp If true (default), the cache timestamp will be updated.
        */
        softUpdate(key: string, data: Object, updateTimestamp?: boolean): void;
        updateIdsValue(key: string, field: string, data: Object): void;
        private deleteValue(valueKey);
        delete(key: string): void;
        /**
         * Identical to customBind, only it uses a FieldReference object to identify the field to bind to.
         * @param fieldRef
         * @param binding
         * @returns {function(): void}
         */
        customBindFR(fieldRef: FieldReference, binding: Binding): () => void;
        /**
         * Shorthand for binding with an inline binding-object.
         * @param key
         * @param field
         * @param callback
         */
        inlineBind(key: string, field: string[], callback: (val: any) => void): () => void;
        inlineBind(key: string, field: string, callback: (val: any) => void): () => void;
        inlineSymbolBind(instrument: Instrument, tag: IDS.TagOrComputed, callback: (val: any) => void): () => void;
        /**
         *
         * @param key Identifier of the Object (for example a snapshot of instrument-data)
         * @param field The name of the field to observe. This may be nested in contained objects by providing an array of fields.
         * @param binding The binding you want to receive updates through.
         * @return A function you can call to unbind.
         */
        customBind(key: string, field: string[], binding: Binding): () => void;
        customBind(key: string, field: string, binding: Binding): () => void;
        customSymbolBind(instrument: Instrument, tag: IDS.TagOrComputed, binding: Binding): () => void;
        /**
         * A modifiable version of customBind, where the cache-key is an observable that may be changed.
         *
         * @param key Identifier of the Object (for example a snapshot of instrument-data), packed in an Observable
         * @param field The name of the field to observe. This may be nested in contained objects by providing an array of fields.
         * @param binding The binding you want to receive updates through.
         * @return A function you can call to unbind.
         */
        modifyableBind(key: Observable, field: any, binding: Binding): () => void;
        private unbind(key, field, binding);
        /**
         * Adds any currently unbound observers to the given observable.
         * @param key
         * @param observable
         */
        private addUnboundObservers(key, observable);
        /**
         * Creates a key to look up in this.unboundObservers for a given cache-key/field combo.
         * @param key
         * @param field
         * @returns {string}
         */
        private static kDefaultCacheKey;
        private createObserverKey(key, field);
        /**
         * Binds a field in an object to a UI element. You may bind before the object exists and the UI will be updated
         * when data is available. If the data is available now, the UI will be updated instantaneously.
         *
         * @param key Identifier of the Object (for example a snapshot of instrument-data)
         * @param field The name of the field to observe. This may be nested in contained objects by providing an array of fields.
         * @param htmlElement The UI-element to bind with. The contents of the element will be updated with the value of the field.
         * @return A function you can call to unbind.
         */
        bind(key: string, field: string[], htmlElement: HTMLElement): () => void;
        bind(key: string, field: string, htmlElement: HTMLElement): () => void;
        /**
         * Check if the cache currently has a field.
         * @param key
         * @param field
         */
        has(key: string, field: string[]): boolean;
        has(key: string, field: string): boolean;
        /**
         * Get a value from the cache.
         * @param key key Identifier of the Object (for example a snapshot of instrument-data)
         * @param field The name of the field to request. This may be nested in contained objects by providing an array of fields.
         */
        get(key: string, field: string[]): any;
        get(key: string, field: string): any;
        /**
         * Asynchronously gets the value of a field.
         * @param callback
         * @param key
         */
        asyncGet(callback: (val: any) => void, key: FieldReference): () => void;
        asyncGet(callback: (val: any) => void, key: string, field: string[]): () => void;
        asyncGet(callback: (val: any) => void, key: string, field: string): () => void;
        symbolAsyncGet(instrument: Instrument, tag: IDS.TagOrComputed, callback: (val: any) => void): void;
        /**
         * An async get that returns at once if we get any data at all. Mostly usable for data that always comes in the first callback
         * Like instrument-data for snapshot or portfolio positions/orders/trades.
         * @param callback
         * @param key
         */
        guaranteedAsyncGet(callback: (val: any) => void, key: FieldReference): any;
        guaranteedAsyncGet(callback: (val: any) => void, key: string, field: string[]): any;
        guaranteedAsyncGet(callback: (val: any) => void, key: string, field: string): any;
        /**
         * Many objects in the cache contains an instrument. This is a utility-function for retrieving
         * feed and ticker and creating an Instrument-object from them.
         * Returns null if no instrument is found.
         *
         * @param key
         */
        getInstrument(key: string): Instrument;
        /**
         * Searches through the cache and returns a collection of every value that matches needle
         * @param needle
         */
        search(needle: RegExp): Object[];
        search(needle: string): Object[];
        /**
         * Debug-method that searches through the cache for keywords in keys and dumps the contents to the console.
         * @param needle
         */
        debugSearch(needle: string): void;
        /**
         * Creates a computed field in the cache. A computed field is a field that has no data of itself, but merely updates
         * its value when ever one of the parameter fields updates.
         *
         * The computation is done through a supplied function, the arguments to the function is passed in the same order they are
         * specified in the fields array.
         *
         * If a field with this name exists in the object referenced by the key, nothing happens. For this reason it is important to
         * avoid the existing key-names when creating computed fields. Use the function fieldExists(key, field) to check.
         *
         * @param key The cache-key where the field is placed
         * @param name The name of the field. Must not exist from before
         * @param fields The fields used as arguments for the computation. Each member of the array can be a string or an array of strings. (as in bind() or customBind())
         * @param computation
         */
        createComputedField(key: string, name: string, fields: FieldReference[], computation: (args: any[]) => any): void;
        createSymbolComputedField(instrument: Instrument, name: string, fields: IDS.TagOrComputed[], computation: (args: any[]) => any): void;
        /**
         * Creates a special kind of computed field that computes a value over all fields of objects contained in an Array.
         *
         * @param targetRef Field-reference to where we should store the computed value.
         * @param field Field-name (string or array of strings) you want to observe and calculate over.
         * @param array Array you want to calculate over
         * @param strategy
         * @param cacheKeyCreator Function to turn array-item into key suitable for looking up in the cache. This is widget-dependent.
         * @param computation Function to perform the actual computation.
         */
        createFieldComputation(targetRef: FieldReference, field: any, array: ObservableArray, strategy: ComputationStrategy, cacheKeyCreator: (arrayItem: any) => string, computation: (values: any[]) => any): () => void;
        createWeightedAverage(targetRef: FieldReference, valueField: any, weightField: any, array: ObservableArray, valueCacheKeyCreator: (arrayItem: any) => string, weightCacheKeyCreator: (arrayItem: any) => string): () => void;
        createInCacheFieldComputation(targetKey: string, targetField: any, arrayKey: string, sourceField: any, strategy: ComputationStrategy, cacheKeyCreator: (arrayItem: any) => string, computation: (values: any[]) => any): () => void;
        updateCacheTimestamp(keyBase: string): void;
        private updateObservableFields(keyBase, source);
        private softUpdateObservableFields(keyBase, source);
        private fieldExists(key, field);
        /**
         * Returns a callback that is guaranteed to update the cache (if only with a timestamp), even if the
         * returning callback is empty.
         *
         * @param reqInstrument
         * @returns {function(Object): void}
         */
        getGuaranteedSnapshotOnDataCallback(reqInstrument: Instrument): (result: Object) => void;
        getGuaranteedSnapshotOnErrorCallback(reqInstrument: Instrument, log?: boolean): (error_code: number, error_message: string) => void;
        getSnapshotOnDataCallback(): (result: Object) => void;
        getFeedOnDataCallback(): (result: Object) => void;
        private static objectHasField(obj, field);
        inspectCache(filter: string, label?: string, source?: CacheSource): void;
    }
    /**
     * Helper class that searches for data inside the cache.
     */
    class DataAccess {
        private cache;
        private tradingManager;
        constructor(cache: BindingCache, tradingManager: TradingManager);
        getOrder(orderId: number, portfolioName?: string): Object;
    }
    class CacheKeyFactory {
        static createInstrumentKey(instrument: Object): string;
        static createInstrumentKeyVariantHandler(instrument: Object): string;
        static createInstrumentKeyVariantIsin(instrument: Object): string;
        static createInstrumentFromKey(cacheKey: string): Instrument;
        static createFeedKey(feedNumber: number): string;
        /**
         * Key for broker/feed pairing.
         * @param period
         * @param feed
         * @param broker
         * @returns {string}
         */
        static createBrokerKey(period: string, feed: number, broker: string): string;
        /**
         * Key for Broker/Instrument pairing
         * @param period
         * @param instrument
         * @param broker
         * @returns {string}
         */
        static createInstrumentBrokerstatsKey(period: string, instrument: Object, broker: string): string;
        static createPortfolioKey(portfolio: Portfolio): string;
        static createPortfolioDataKey(portfolio: Portfolio): string;
        static createPortfolioPositionsKey(portfolio: Portfolio): string;
        static createPortfolioCashPositionsKey(portfolio: Portfolio): string;
        static createPortfolioOrdersKey(portfolio: Portfolio): string;
        static createPortfolioTradesKey(portfolio: Portfolio): string;
        static createPortfolioValuesKey(portfolio: Portfolio): string;
        static createPortfolioAlertsKey(portfolio: Portfolio): string;
        static createOrderKey(order: Object): string;
        static createOrderIdKey(portfolio: string, orderId: number): string;
        static createTradeKey(trade: Object): string;
        static createCashPositionKey(position: Object): string;
        static createValueKey(value: Object): string;
        static createPotentialValueKey(portfolioName: string, valueName: string): string;
        static createPositionKey(position: Object): string;
        /**
         * As you can see, this is the same as createPositionKey. The name is just to reflect that the key is not created from an actual position-object,
         * but from parts that could (potentially :) belong to one.
         */
        static createPotentialPositionKey(portfolioName: string, instrument: Object): string;
        static createNetTradesKey(portfolio: Portfolio): string;
        static createNetTradeKey(portfolio: Portfolio, instrument: Object): string;
        static createVisualKey(name: string): string;
    }
    class CacheBasedFilter implements IArrayBinding {
        private static kFilterUnbindKeyPrefix;
        private static filterCounter;
        private filterKey;
        private cache;
        private observer;
        private fields;
        private filterFunc;
        private cacheKeyCreator;
        private unbinds;
        private values;
        constructor(cache: BindingCache, observer: IArrayBinding, fields: any[], cacheKeyCreator: (item: any, field: any) => string, filterFunc: (args: any[]) => boolean);
        private updateItem(item, val);
        reInit(items: any[]): any;
        itemAdded(item: Object, index: number): any;
        itemRemoved(item: Object, index: number): any;
        itemMoved(item: any, oldIndex: number, newIndex: number): any;
        reset(): void;
        destroy(): void;
        private getLocalKey(item, create?);
    }
}
/**
 * Created by hage on 14.01.14.
 */
declare module Infront {
    interface Cloneable {
        inf_clone(): Object;
    }
    class InfrontObject {
    }
    class Instrument extends InfrontObject implements Cloneable {
        feed: number;
        ticker: string;
        feed_code: string;
        full_name: string;
        isin: string;
        currency: string;
        issuer: string;
        issuer_full_name: string;
        expiry_date: string;
        under_feed: number;
        under_ticker: string;
        under_price: number;
        instrument_type: string;
        instrument_subtype: string;
        segment: string;
        segment_description: string;
        symbol_status: string;
        is_tradable: any;
        sort_nu: number;
        constructor(feed?: number, ticker?: string);
        static isValid(instrument: any): boolean;
        equals(object: any): boolean;
        static isSameInstrument(instrument1: Instrument, instrument2: Instrument): boolean;
        inf_clone(): Instrument;
        static inf_clone(instr: Instrument): Instrument;
        static isInstrument(obj: any): boolean;
        static GetValueOrNull(fieldName: string, rawInstr: any): any;
        toJson(): string;
        formatted(): string;
        toString(delimiter?: string): string;
        static jsonToInstrument(json: string): Instrument;
        static InstrumentDataType(type: string): number;
        static InstrumentSubType(type: string): number;
    }
    class Chain extends InfrontObject {
        feed: number;
        name: string;
        provider?: number;
        description?: string;
    }
    class ChainNode extends InfrontObject {
        label: string;
        feed: number;
        name: string;
        provider: number;
        hasSubNodes: boolean;
        nodes: ChainNode[];
    }
    class PidSidsObject extends InfrontObject {
        pid: number;
        sid: number;
    }
    interface FeedMetadataDictionary {
        [feed: number]: FeedMetaData;
    }
    class FeedMetaData {
        feed: number;
        country: number;
        iso_country: string;
        feed_code: string;
        mic: string;
        description: string;
        all_day: boolean;
        buyer_seller: boolean;
        start_time: string;
        end_time: string;
        decimals: number;
        local_time_offset: string;
        min_delay_secs: number;
        max_delay_secs: number;
        full_feed: boolean;
        main_index: string;
        main_index_feed: number;
        trades: boolean;
        data_types: string[];
        additional_info: {
            [key: string]: string;
        };
        feed_properties: string[];
    }
    class Strategy {
        id: string;
        label: string;
        description: string;
        params: AlgoParam[];
        findParam(paramId: string): AlgoParam;
        static parseFromResultObject(res: Object): Strategy;
    }
    class AlgoParam {
        static FREE_TEXT: string;
        static DOUBLE: string;
        static STOP_PRICE: string;
        static INIT_CODE: string;
        static PARENT: string;
        static DONE_CODE: string;
        static VALID_SESSION: string;
        static TIME: string;
        static DATE: string;
        static DATETIME: string;
        static DROPDOWN: string;
        static BOOL: string;
        static INT: string;
        static INSTRUMENT: string;
        static PRICE: string;
        static VOLUME_LOTS: string;
        static MULTI_LINE: string;
        id: string;
        type: string;
        default: string;
        label: string;
        description: string;
        mandatory: boolean;
        min: number;
        max: number;
        dropdown_items: DropdownParam[];
        modify: boolean;
    }
    class DropdownParam {
        label: string;
        value: string;
        componentCode: string;
        constructor(label?: string, value?: string);
        setLabel(label: string): this;
        setValue(value: string): this;
    }
    class CustomFieldItem extends AlgoParam {
        value: string;
        prefix: string;
        forOrderTypes: string[];
        isHidden: boolean;
    }
    enum NewsType {
        FlashLevel1 = 0,
        FlashLevel2 = 1,
        FlashLevel3 = 2,
        Url = 3,
        Regular = 4,
    }
    enum BuyOrSell {
        Buy = 0,
        Sell = 1,
    }
    class InfinInstrument extends InfrontObject implements Cloneable {
        isin: string;
        efcode: string;
        name: string;
        ticker: string;
        country: string;
        sector: string;
        active: boolean;
        constructor(efcode: string, name?: string, isin?: string, ticker?: string);
        equals(object: any): boolean;
        inf_clone(): InfinInstrument;
        getCompany(): string;
    }
    class UniverseObject extends InfrontObject implements Cloneable {
        code: string;
        type: UniverseType;
        sector: string;
        country: string;
        marketPlaces: string[];
        constructor(code?: string, type?: UniverseType, mkp?: string[], sector?: string, country?: string);
        equals(object: any): boolean;
        inf_clone(): UniverseObject;
        setCode(code: string): void;
        setType(type: UniverseType): void;
        setSector(sector: string): void;
        setCountry(country: string): void;
        setMarketPlaces(mkp: string[]): void;
        getCode(): string;
        getType(): UniverseType;
        getAdditionalSector(): string;
        getAdditionalCountry(): string;
        getAdditionalMkpList(): string[];
    }
    class EtaObject extends InfrontObject implements Cloneable {
        company: string;
        isin: string;
        efcode: string;
        name: string;
        ticker: string;
        placename: string;
        growth: number;
        quality: number;
        momentum: number;
        value: number;
        constructor(isin: string);
        equals(object: any): boolean;
        inf_clone(): EtaObject;
    }
    class FieldObject extends InfrontObject {
        full_name: string;
        field_id: number;
        field_data: Object;
        name: string;
        note: number;
        value: number;
        order: number;
    }
    class DropdownObj extends InfrontObject {
        value: any;
        description: string;
        constructor(value: any, description: string);
    }
}
declare module InfrontConstants {
    class OrderType {
        static ASK: string;
        static BID: string;
    }
    class Fields {
        static ACC_VOLUME: string;
        static TURNOVER: string;
        static ONEXCH_VOLUME: string;
        static ONEXCH_TURNOVER: string;
        static BID: string;
        static BID_SIZE: string;
        static ASK_SIZE: string;
        static NUM_BIDS: string;
        static NUM_ASKS: string;
        static ORDERBOOK: string;
        static VWAP: string;
        static AVG_VOLUME: string;
        static AVG_VALUE: string;
        static OPEN: string;
        static ASK: string;
        static HIGH: string;
        static LOW: string;
        static LAST: string;
        static LAST_VALID: string;
        static PREVIOUS_CLOSE: string;
        static TIME: string;
        static CHANGE: string;
        static PCT_CHANGE: string;
        static NUM_TRADES: string;
        static GICS: string;
        static NUM_SHARES: string;
        static EPS: string;
        static RSI14: string;
        static MACD: string;
        static MA50: string;
        static MA100: string;
        static MA200: string;
        static CONTRACT_SIZE: string;
        static TRADING_STATUS: string;
        static TICK_SIZE_ID: string;
        static SEGMENT: string;
        static SEGMENT_DESCRIPTION: string;
        static SECTOR: string;
        static INDIC_PRICE: string;
        static INDIC_VOLUME: string;
        static TRADING_POWER: string;
        static BASE_TRADING_POWER: string;
        static PHYSICAL_UNIT: string;
        static SECONDARY_SEGMENT: string;
        static COUNTRY_OF_INCORPORATION: string;
    }
    class FieldGroups {
        static FUND_DETAILS: string;
        static HIST_PERFORMANCE: string;
        static REF_DATA_DETAILS: string;
    }
    class FundDetailsMap {
        static ROOT_OBJECT: string;
        static FUND_STYLEBOX: string[];
        static START_DATE: string[];
        static INVESTMENT_MANDATE: string[];
        static PROSPECTIVE_BOOK_VALUE_YIELD: string[];
        static PROSPECTIVE_EARNINGS_YIELD: string[];
        static TOP_COUNTRIES: string[];
        static TOP_SECTORS: string[];
        static TOP_HOLDINGS: string[];
        static ASSET_ALLOCATION: string[];
        static MIN_INIT_INVESTMENT: string[];
        static FOR_SALE_IN: string[];
        static FOR_SALE_IN_SHORT: string[];
        static FOR_SALE_IN_COUNT: string[];
        static FUND_MANAGER: string[];
        static HOMEPAGE: string[];
        static TRACKING_ERROR: string[];
        static ACTIVE_SHARE: string[];
        static RISK_LEVEL: string[];
        static STAR_RATING: string[];
    }
    class IntradayTradesSortValues {
        static TIME_DESC: string;
        static TIME_ASC: string;
        static VOLUME_DESC: string;
        static VOLUME_ASC: string;
        static PRICE_DESC: string;
        static PRICE_ASC: string;
    }
    class SortOrder {
        static PCT_CHANGE_DESC: string;
        static PCT_CHANGE_ASC: string;
        static LV_PCT_CHANGE_DESC: string;
        static LV_PCT_CHANGE_ASC: string;
        static TURNOVER_DESC: string;
        static TURNOVER_ASC: string;
        static TICKER_DESC: string;
        static TICKER_ASC: string;
        static VOLUME_DESC: string;
        static VOLUME_ASC: string;
        static ONE_W_PCT_CHANGE_DESC: string;
        static ONE_W_PCT_CHANGE_ASC: string;
        static ONE_M_PCT_CHANGE_DESC: string;
        static ONE_M_PCT_CHANGE_ASC: string;
        static THREE_M_PCT_CHANGE_DESC: string;
        static THREE_M_PCT_CHANGE_ASC: string;
        static SIX_M_PCT_CHANGE_DESC: string;
        static SIX_M_PCT_CHANGE_ASC: string;
        static ONE_Y_PCT_CHANGE_DESC: string;
        static ONE_Y_PCT_CHANGE_ASC: string;
        static TWO_Y_PCT_CHANGE_DESC: string;
        static TWO_Y_PCT_CHANGE_ASC: string;
        static THREE_Y_PCT_CHANGE_DESC: string;
        static THREE_Y_PCT_CHANGE_ASC: string;
        static FIVE_Y_PCT_CHANGE_DESC: string;
        static FIVE_Y_PCT_CHANGE_ASC: string;
        static YTD_PCT_CHANGE_DESC: string;
        static YTD_PCT_CHANGE_ASC: string;
        static CUST_1_ASC: string;
        static CUST_1_DESC: string;
        static CUST_2_ASC: string;
        static CUST_2_DESC: string;
        static CUST_3_ASC: string;
        static CUST_3_DESC: string;
        static CUST_4_ASC: string;
        static CUST_4_DESC: string;
        static CUST_5_ASC: string;
        static CUST_5_DESC: string;
    }
    class InstrumentType {
        static NONE: string;
        static STOCK: string;
        static NEWS: string;
        static BOND: string;
        static EURO_OPTION: string;
        static FUTURES: string;
        static COMMODITY: string;
        static INDEX: string;
        static FOREX: string;
        static US_OPTION: string;
        static FUND: string;
        static OPTION: string;
        static COMBO: string;
        static CFD: string;
        static CERTIFICATE: string;
        static UNKNOWN: string;
    }
    class SearchItemType {
        static INSTRUMENT: string;
        static CHAIN: string;
        static FEED: string;
    }
    class EventNames {
        static kLoginFailed: string;
        static kOnReady: string;
        static kOnDisconnect: string;
    }
    class BrokerStatsPeriodes {
        static INTRADAY: string;
        static TWO_DAYS: string;
        static ONE_WEEK: string;
        static ONE_MONTH: string;
        static THREE_MONTHS: string;
        static SIX_MONTHS: string;
        static ONE_YEAR: string;
        static YTD: string;
    }
    enum HistoricalPeriodes {
        ONE_WEEK = "1W",
        ONE_MONTH = "1M",
        THREE_MONTH = "3M",
        SIX_MONTH = "6M",
        ONE_YEAR = "1Y",
        TWO_YEAR = "2Y",
        THREE_YEAR = "3Y",
        FIVE_YEAR = "5Y",
        YTD = "YTD",
    }
    class FundAllocationType {
        static COUNTRY: string;
        static ASSET: string;
        static SECTOR: string;
    }
}
/**
 * Created by hage on 07.01.14.
 */
/**
 * Contains string-constants for use in messaging, mainly field-names in request- and response-messages.
 */
declare module Infront {
    class MWSConstants {
        static feed: string;
        static ticker: string;
        static type: string;
        static date: string;
        static description: string;
        static orders: string;
        static trades: string;
        static price: string;
        static country: string;
        static iso_country: string;
        static iso_8601_format: boolean;
        static error_code: string;
        static error_message: string;
        static instrument: string;
        static volume: string;
        static amount: string;
        static id: string;
        static label: string;
        static currency: string;
        static instrument_type: string;
        static instrument_subtype: string;
        static full_name: string;
        static isin: string;
        static market: string;
        static contract_size: string;
        static strike_price: string;
        static precision_code: string;
        static exchange_instrument_id: string;
        static last: string;
        static last_valid: string;
        static bid: string;
        static ask: string;
        static asks: string;
        static bids: string;
        static hist_performance: string;
        static pct_change: string;
        static change: string;
        static previous_close: string;
        static tick_size_id: string;
        static lv_prev_close: string;
        static level: string;
        static news_sources: string;
        static source_name: string;
        static source_short: string;
        static news_source_region: string;
        static news_regions: string;
        static news_region_code: string;
        static news_id: string;
        static news_feed: string;
        static headline: string;
        static category: string;
        static time: string;
        static language: string;
        static url: string;
        static symbols: string;
        static mime_type: string;
        static body: string;
        static up: string;
        static down: string;
        static unchanged: string;
        static up_pct: string;
        static down_pct: string;
        static unchanged_pct: string;
        static turnover: string;
        static type_instrument: string;
        static chain: string;
        static urls: string;
        static splits: string;
        static dividends: string;
        static factor: string;
        static error_displayable: string;
        static request_data: string;
        static update_data: string;
        static session_token: string;
        static session_timeout: string;
        static features: string;
        static decimals: string;
        static tr_routings: string;
        static provider: string;
        static service: string;
        static tradable_feeds: string;
        static input_fields: string;
        static nodes: string;
        static key: string;
        static may_persist: string;
        static mask: string;
        static keyboard: string;
        static connections: string;
        static HF_OPEN: string;
        static HF_HIGH: string;
        static HF_LOW: string;
        static HF_LAST: string;
        static HF_VOLUME: string;
        static buyer: string;
        static seller: string;
        static buyer_full: string;
        static seller_full: string;
        static seq_id: string;
        static value: string;
        static base_currency: string;
        static order_id: string;
        static avg_price: string;
        static trading_power: string;
        static base_trading_power: string;
        static is_shortable: string;
        static margin_rate: string;
        static pid: string;
        static sid: string;
        static portfolios: string;
        static positions: string;
        static total_invested: string;
        static values: string;
        static alerts: string;
        static position: string;
        static alert: string;
        static portfolio: string;
        static cash: string;
        static invested: string;
        static multiplier: string;
        static collateral: string;
        static profit: string;
        static base_invested: string;
        static ytd_base_invested: string;
        static base_value: string;
        static base_result: string;
        static market_price: string;
        static base_collateral: string;
        static loan_to_value_ratio: string;
        static order: string;
        static customer_id: string;
        static buy_or_sell: string;
        static open_volume: string;
        static order_type: string;
        static changed: string;
        static valid_until: string;
        static order_status: string;
        static volume_filled: string;
        static accumulated_traded: string;
        static transaction_id: string;
        static exchange_order_id: string;
        static read_only: string;
        static custom_tags: string;
        static algo_id: string;
        static algo_params: string;
        static created: string;
        static comment: string;
        static fail_code: string;
        static parent_order: string;
        static params: string;
        static default: string;
        static mandatory: string;
        static min: string;
        static max: string;
        static dropdown_items: string;
        static modify: string;
        static trade_id: string;
        static trade_time: string;
        static trade: string;
        static net_trade: string;
        static net_trades: string;
        static buy_vwap: string;
        static sell_vwap: string;
        static buy_volume: string;
        static sell_volume: string;
        static net_volume: string;
        static buy_value: string;
        static sell_value: string;
        static net_value: string;
        static net_price: string;
        static algos: string;
        static custom_fields: string;
        static string_value: string;
        static upper_bound: string;
        static lower_bound: string;
        static size: string;
        static state: string;
        static data: string;
        static message: string;
        static payload: string;
        static instruments: string;
        static underlying: string;
        static under_feed: string;
        static under_ticker: string;
        static under_price: string;
        static expiry_date: string;
        static issuer: string;
        static issuer_full_name: string;
        static md_instrument_update: string;
        static termination_code: string;
        static termination_reason: string;
        static api_version: string;
    }
    class MWSErrorCodes {
        static SUPERUSER_FORBIDDEN: number;
        static EXTERNAL: number;
        static TOKEN_VALIDATION_ERROR: number;
        static RETRY: number;
        static SESSION_TOKEN_REUSED: number;
        static TOKEN_ERROR: number;
        static BAD_REQUEST: number;
        static FORBIDDEN: number;
        static NOT_FOUND: number;
        static METHOD_NOT_ALLOWED: number;
        static NOT_IMPLEMENTED: number;
        static SERVICE_TIMEOUT: number;
    }
    class MWSBuyOrSell {
        static BUY: string;
        static SELL: string;
        static isBuy(val: string): boolean;
        static isSell(val: string): boolean;
    }
    class OrderType {
        static NORMAL: string;
        static FILL_OR_KILL: string;
        static FILL_AND_KILL: string;
        static FILL_OR_NOTHING: string;
        static CROSS: string;
        static BEST_POSSIBLE: string;
        static AT_MARKET: string;
        static MARKET: string;
        static MARKET_TO_LIMIT: string;
        static AT_MARKET_AND_KILL: string;
        static QUOTE_ORDER: string;
        static LIMIT_OR_MARKET_ON_CLOSE: string;
        static STOP_LIMIT: string;
        static STOP_LOSS: string;
        static CONTINGENT: string;
        static FLEX: string;
        static INTEREST: string;
        static ACCEPT: string;
        static PARENT: string;
        static STRATEGY: string;
        static FIX: string;
        static LIMIT_TO_MARKET: string;
        static BEST_TO_LIMIT: string;
        static MULTI_LEG: string;
        static MARKET_FOK: string;
        static MARKET_FAK: string;
        static PEGGED: string;
        static AT_OPEN: string;
        static AT_CLOSE: string;
        static OCO: string;
        static ICEBERG: string;
    }
    class MWSNewsType {
        static FLASH_LEVEL_1: string;
        static FLASH_LEVEL_2: string;
        static FLASH_LEVEL_3: string;
        static URL: string;
        static REGULAR: string;
        static typeMap: Object;
    }
    class Resolution {
        static TICKS: string;
        static MINUTES: string;
        static HOURS: string;
        static SECONDS: string;
    }
    class QuoteFields {
        static ACC_VOLUME: string;
        static TURNOVER: string;
        static ONEXCH_VOLUME: string;
        static ONEXCH_TURNOVER: string;
        static BID: string;
        static ASK: string;
        static BID_SIZE: string;
        static ASK_SIZE: string;
        static NUM_BIDS: string;
        static NUM_ASKS: string;
        static ORDERBOOK: string;
        static VWAP: string;
        static AVG_VOLUME: string;
        static AVG_VALUE: string;
        static OPEN: string;
        static HIGH: string;
        static LOW: string;
        static LAST: string;
        static PREVIOUS_CLOSE: string;
        static TIME: string;
        static CHANGE: string;
        static PCT_CHANGE: string;
        static NUM_TRADES: string;
        static GICS: string;
        static NUM_SHARES: string;
        static EPS: string;
        static RSI14: string;
        static MACD: string;
        static MA50: string;
        static MA100: string;
        static MA200: string;
        static CONTRACT_SIZE: string;
        static TRADING_STATUS: string;
        static TICK_SIZE_ID: string;
        static SEGMENT: string;
        static SEGMENT_DESCRIPTION: string;
        static SECTOR: string;
        static INDIC_PRICE: string;
        static INDIC_VOLUME: string;
        static TRADES: string;
        static FUND_DETAILS: string;
        static FUND_DATA_DETAILS: string;
        static PHYSICAL_UNIT: string;
        static SECONDARY_SEGMENT: string;
        static COUNTRY_OF_INCORPORATION: string;
    }
    class IntradayFields {
        static BID: string;
        static ASK: string;
        static OPEN: string;
        static HIGH: string;
        static LOW: string;
        static LAST: string;
        static VOLUME: string;
        static TURNOVER: string;
    }
    class KeyboardType {
        static NUMERIC: string;
        static ALPHANUMERIC: string;
    }
    class ChainTypes {
        static FEED: string;
        static INDEX: string;
        static GLOBAL: string;
    }
    class IntradaySorting {
        static TIME_DESC: string;
        static TIME_ASC: string;
        static VOLUME_DESC: string;
        static VOLUME_ASC: string;
        static PRICE_DESC: string;
        static PRICE_ASC: string;
    }
    class VisualConstants {
        static instrument: string;
        static read_only: string;
        static custom_tags: string;
        static algo_id: string;
        static algo_params: string;
        static eta: string;
        static field: string;
        static company: string;
        static efcode: string;
        static isin: string;
        static ticker: string;
        static market_cap: string;
        static companyInfos: string;
    }
    class TerminationCodes {
        static kickout: number;
        static INVALID_SESSION_TOKEN: number;
        static unknown: number;
    }
    class InfrontAlertOperators {
        static GT: string;
        static LT: string;
    }
    class InfrontAlertTypes {
        static INSTRUMENT_ALERT: string;
        static NEWS_ALERT: string;
    }
    class InfrontAlertValue {
        instrument: Instrument;
        md_field: string;
        ToIds(type: IDS.AlertType): IDS.API.AlertValue;
        static toServerAlertValue(value: InfrontAlertValue, type: IDS.AlertType): IDS.API.AlertValue;
    }
    class InfrontAlertNode extends InfrontObject {
        double: number;
        md_value: InfrontAlertValue;
        operator: string;
        left: InfrontAlertNode;
        right: InfrontAlertNode;
        constructor();
        ToIds(type: IDS.AlertType): IDS.API.AlertNode;
        static toServerAlertNode(node: InfrontAlertNode, type: IDS.AlertType): IDS.API.AlertNode;
    }
    class InfrontAlert extends InfrontObject {
        comment: string;
        description: string;
        enabled: boolean;
        id: string;
        index: number;
        rule: InfrontAlertNode;
        trigger_type: string;
        type: string;
        constructor();
        hasInstrument(): boolean;
        getInstrument(): Instrument;
        ToIds(): IDS.API.ServerAlert;
        static toServerAlert(alert: InfrontAlert): IDS.API.ServerAlert;
    }
    interface OWC_Message {
        id: number;
        level: number;
        format: number;
        headline: string;
        message: string[];
        url: string[];
        read: boolean;
    }
    class FeedDataTypes {
        static STOCKS: string;
        static NEWS: string;
        static BONDS: string;
        static EUROOPTIONS: string;
        static FUTURES: string;
        static COMMODITIES: string;
        static INDICES: string;
        static FOREX: string;
        static USOPTIONS: string;
        static FUNDS: string;
        static CHAT: string;
        static URLNEWS: string;
        static ORDERS: string;
        static WARRANTS: string;
        static FEATURES: string;
        static SYMBOL_EXT: string;
        static CALENDAR_UPDATES: string;
        static FX_DEPOSIT_RATES: string;
        static MTF: string;
        static WEB_FEATURE: string;
    }
    interface MarketInfo {
        access: string;
        additional_info: string;
        country: number;
        data_types: string[];
        feed: number;
        max_delay_secs: number;
        min_delay_secs: number;
        provider: string;
        service: string;
    }
}
declare module Infront {
    class Base64 {
        private static alphabet;
        private lookup;
        private ie;
        private ieo;
        constructor();
        decode(str: string): string;
        encode(str: string): string;
        private fromUtf8(str);
        private toUtf8(str);
    }
}
declare var XDomainRequest: any;
declare module Infront {
    interface TransportObserver {
        transportConnected(source: Transport): any;
        transportReconnected(source: Transport): any;
        transportReconnecting(source: Transport): any;
        transportDisconnected(source: Transport, isUnloading: boolean): any;
        transportError(source: Transport, sourceMessage: string, code: number, message: string): any;
        messageReceived(source: Transport, message: string): any;
    }
    interface Transport {
        sendMessage(message: string): void;
        supportsStreaming(): boolean;
        close(isBeforeUnload?: boolean): void;
        prepareLogout(): void;
        reconnectToUrl(url: string): void;
    }
    class TransportFactory {
        private httpPoolSize;
        private usingNodeJS;
        constructor(httpPoolSize: number, usingNodeJS: boolean);
        transportForUrl(url: string, observer: TransportObserver): Transport;
    }
    class HTTPTransportPool implements Transport, TransportObserver {
        private transports;
        private observer;
        private nextTransport;
        constructor(url: string, observer: TransportObserver, poolSize: number, usingNodeJS?: boolean);
        sendMessage(message: string): void;
        supportsStreaming(): boolean;
        close(isBeforeUnload?: boolean): void;
        transportConnected(source: Transport): void;
        transportDisconnected(source: Transport): void;
        transportReconnected(source: Transport): void;
        transportReconnecting(source: Transport): void;
        transportError(source: Transport, sourceMessage: string, code: number, message: string): void;
        messageReceived(source: Transport, message: string): void;
        reconnectToUrl(url: string): void;
        prepareLogout(): void;
    }
    class HTTPTransport implements Transport {
        url: string;
        xhr: any;
        corsSupported: boolean;
        usingXDomainRequest: boolean;
        observer: TransportObserver;
        pipeline: string[];
        transportAvailable: boolean;
        constructor(url: string, observer: TransportObserver, usingNodeJS: boolean);
        sendMessage(message: string): void;
        private processNext();
        private sendNextMessage();
        onError(event: any): void;
        onLoad(event: any): void;
        private currentMessageFinished();
        close(isBeforeUnload?: boolean): void;
        supportsStreaming(): boolean;
        prepareLogout(): void;
        reconnectToUrl(url: string): void;
    }
    class WebsocketTransport implements Transport {
        protected static CONNECTING: number;
        protected static OPEN: number;
        protected static CLOSING: number;
        protected static CLOSED: number;
        observer: TransportObserver;
        websocket: WebSocket;
        isUnloading: boolean;
        protected url: string;
        useMock: boolean;
        usingNodeJS: boolean;
        messageQueue: string[];
        private beforeUnloadListener;
        constructor(url: string, observer: TransportObserver, useMock?: boolean, usingNodeJS?: boolean);
        createSocket(): void;
        onWebsocketOpen(): void;
        onWebsocketError(error: ErrorEvent): void;
        private onWebsocketMessage(message);
        onWebsocketClose(): void;
        sendMessage(message: string): void;
        supportsStreaming(): boolean;
        close(isBeforeUnload?: boolean): void;
        static isWebsocketsSupported(usingNodeJS?: boolean): boolean;
        prepareLogout(): void;
        reconnectToUrl(url: string): void;
    }
    class ReconnectWebsocketTransport extends WebsocketTransport {
        private static kRetryResetThreshold;
        private maxRetryCount;
        private retryCount;
        private reconnecting;
        private reconnectTime;
        private successfullyConnected;
        private directlyClosed;
        constructor(url: string, observer: TransportObserver, retryCount: number, useMock?: boolean, usingNodeJS?: boolean);
        sendMessage(message: string): void;
        onWebsocketOpen(): void;
        onWebsocketError(error: ErrorEvent): void;
        onWebsocketClose(): void;
        close(isBeforeUnload?: boolean): void;
        prepareLogout(): void;
        reconnectToUrl(url: string): void;
    }
}
declare module Infront {
    class RequestOptions {
        onSuccess: (response: Object) => void;
        onError: (error_code: number, error_message: string) => void;
    }
    class SubscriptionOptions extends RequestOptions {
        onData: (data: Object) => void;
    }
    enum MessageType {
        InfinData = 0,
        Connect = 1,
        MarketData = 2,
        Trading = 3,
    }
    class MessageContainer {
        message: string;
        messageType: MessageType;
        constructor(message: string, messageType: MessageType);
    }
    interface MessageServiceObserver {
        marketDataDisconnected(): any;
        tradingDisconnected(): any;
        tradingReconnecting(): any;
        tradingReconnected(): any;
    }
    class MessageService implements TransportObserver, IDS.LoginCallbacks {
        private static kSessionTerminatedKey;
        private static kTrSessionTerminatedKey;
        private static messageCounter;
        private marketDataTransport;
        private tradingTransport;
        private visualTransport;
        private visualConnectTransport;
        private routingTransport;
        private transportFactory;
        private visualConnectUrl;
        private marketDataUrl;
        private tradingUrl;
        private visualUrl;
        private marketDataSessionToken;
        private tradingSessionToken;
        private visualSessionToken;
        private responseObservers;
        private subscriptionObservers;
        private specialEventObservers;
        private sessionTerminatedObserver;
        private observer;
        onMarketdataReconnect: () => void;
        onSlowResponse: (request_type: string, request: string, response: Object, sendTimestamp: number, receiveTimestamp: number, target: string) => void;
        serverPool: IDS.ServerPool;
        streamingManager: IDS.API.StreamingManager;
        constructor(observer: MessageServiceObserver, httpPoolSize: number, usingNodeJS: boolean);
        StartIDS(login: string, password: string, secure: boolean, token: string, loginUrls?: string[]): boolean;
        EndLogin(success: boolean, responseId: IDS.HeaderResponses, msg?: string): void;
        registerSpecialEventObserver(updateKey: string, callback: (data: any) => void): void;
        reconnectMarketData(url: string): void;
        prepareTradingLogout(): void;
        prepareMDLogout(): void;
        supportsStreaming(messageType: MessageType): boolean;
        disconnectMarketData(): void;
        disconnectTrading(): void;
        disconnectVisual(): void;
        setMarketDataSessionToken(token: string): void;
        setTradingSessionToken(token: string): void;
        setVisualSessionToken(token: string): void;
        setVisualConnectUrl(url: string): void;
        getVisualConnectUrl(): string;
        setVisualUrl(url: string): void;
        getVisualUrl(): string;
        sendSubscriptionRequest(request: SubscriptionRequest, options: SubscriptionOptions): (unsubOptions: RequestOptions) => void;
        instrumentSubscribe(request: InstrumentSubscriptionRequest, options: RequestOptions): void;
        sendRequest(request: Message, options: RequestOptions, resend?: boolean): void;
        private sendMessage(message, resendOnReconnect, callback);
        setSessionTerminatedObserver(callback: (event: Object) => void): void;
        transportConnected(source: Transport): void;
        transportDisconnected(source: Transport, isUnloading: boolean): void;
        transportReconnecting(source: Transport): void;
        transportReconnected(source: Transport): void;
        transportError(source: Transport, sourceMessage: string, code: number, message: string): void;
        messageReceived(source: Transport, message: string): void;
        private checkSlowResponse(obs, receivedMessageRoot, source);
        private stringifyRequestMessage(key, value);
        /**
         * Returns the url of the transport based on the type
         * @param transport
         */
        private getTransportUrl(transport);
        routeMessage(container: MessageContainer): void;
        private getMarketDataTransport();
        private getVisualConnectTransport();
        private getVisualTransport();
        private getTradingTransport();
        private getSessionToken(messageType);
        private validateResult(result, request);
        static getUniqueRequestData(): string;
    }
    interface Message {
        getMessageType(): MessageType;
        getMessageKey(): string;
        getResponseKey(): string;
    }
    interface SubscriptionRequest extends Message {
        getEventKey(): string;
        createUnsubscribeRequest(): Message;
        getUpdateData(): string;
    }
    /**
     * When you reach this point you may ask yourself: "Pray, why did he implement it this way instead of traditional getters?"
     * The reason is simple: Subclasses of this class is serialized directly into JSON. If we stored messageKey, responseKey
     * and type as member variables they would be added to the JSON message, which the server api doesn't support.
     * Function-members are ignored when serializing JSON,  so that is why we do it this way.
     */
    class GenericRequest implements Message {
        private _getMessageKey;
        private _getResponseKey;
        private _getMessageType;
        constructor(messageKey: string, responseKey: string, type: MessageType);
        getMessageType(): MessageType;
        getMessageKey(): string;
        getResponseKey(): string;
    }
    class GetOWCRequest extends GenericRequest {
        message: string;
        payload: Object;
        constructor();
    }
    class SubscribeOWCRequest extends GenericRequest implements SubscriptionRequest {
        private _getUpdateData;
        constructor(updateData: string);
        getEventKey(): string;
        createUnsubscribeRequest(): Message;
        getUpdateData(): string;
    }
    class UnsubscribeOWCRequest extends GenericRequest {
        update_data: string;
        constructor();
    }
    class SubscribeNewsRequest extends GenericRequest implements SubscriptionRequest {
        instruments: Instrument[];
        news_feeds: number[];
        regions: number[];
        types: string[];
        private _getUpdateData;
        constructor(updateData: string);
        getEventKey(): string;
        createUnsubscribeRequest(): Message;
        getUpdateData(): string;
    }
    class UnsubscribeNewsRequest extends GenericRequest {
        update_data: string;
        constructor();
    }
    class MarketDataKeepAliveRequest extends GenericRequest {
        constructor();
    }
    class GetFeedMetadataRequest extends GenericRequest {
        feed: number;
        constructor();
    }
    class GetSnapshotRequest extends GenericRequest {
        instruments: Instrument[];
        fields: string[];
        constructor();
        setInstrument(instrument: Instrument): void;
        setInstruments(instruments: Instrument[]): void;
        setFields(fields: string[]): void;
        getInstrument(): Instrument;
        getFields(): string[];
    }
    class InstrumentSubscriptionRequest extends GetSnapshotRequest implements SubscriptionRequest {
        num_trades: number;
        getMessageKey(): string;
        getResponseKey(): string;
        getEventKey(): string;
        getUpdateData(): string;
        createUnsubscribeRequest(): Message;
    }
    class InstrumentUnsubscribeRequest extends GetSnapshotRequest {
        getMessageKey(): string;
        getResponseKey(): string;
    }
    class InstrumentSearchRequest extends GenericRequest {
        query: string;
        instrument_types: string[];
        item_types: string[];
        max_results: number;
        feeds: number[];
        ticker: boolean;
        instruments: Instrument[];
        use_accesses: boolean;
        constructor();
    }
    class CalendarRequest extends GenericRequest {
        sources: number[];
        countries: string[];
        instrument: Instrument;
        start_date: string;
        end_date: string;
        constructor();
    }
    class GetInfinancialsUrlRequest extends GenericRequest {
        instrument: Instrument;
        widgets: string[];
        width: number;
        height: number;
        dark_theme: boolean;
        constructor();
    }
    class TradingRequest extends GenericRequest {
        constructor(messageKey: string, responseKey: string);
    }
    class VisualLoginRequest extends GenericRequest {
        login_id: string;
        password: string;
        client_application: string;
        country_code: string;
        api_version: string;
        signed_token: string;
        token_type: string;
        constructor();
    }
    class ComponentRequest extends GenericRequest {
        id: number;
        company: string;
        peergroup: string;
        index: string;
        sector: string;
        theme: string;
        response: string;
        custom: Object;
        currency: number | string;
        source: string;
        constructor();
    }
    class ScreenerRequest extends ComponentRequest {
        full: boolean;
        requesttype: string;
        resulttype: string;
        mcslimit: number;
        mcsuniverse: Object;
        mcsindustry: Object;
        mcsfinancials: Object;
    }
    class EurofinRequest extends ComponentRequest {
        pgaction: number;
        pgname: string;
        pgnames: string[];
        pgentries: string[];
        pglistentries: string[][];
    }
    class UniverseRequest extends ComponentRequest {
        type: UniverseType;
        country: Array<string>;
        marketplace: Array<string>;
        region: string;
        field: number;
        nbtop: number;
        nbbot: number;
    }
    class ChartRequest extends ComponentRequest {
        chart: number;
        field: number;
    }
    class EvolutionChartRequest extends ComponentRequest {
        predefinedSeries: number;
        fields: number[];
        periods: string[];
    }
    class EtaRequest extends ComponentRequest {
        view: number;
        mode: number;
        univers: string;
        return: string;
    }
    class EstimatesRequest extends ComponentRequest {
        chart: number;
    }
    class SearchRequest extends GenericRequest {
        query: string;
        max_results: number;
        instrument_types: string[];
        item_types: string[];
        feeds: number[];
        ticker: boolean;
        constructor();
    }
    class FundamentalsRequest extends ComponentRequest {
        mode: number;
        currency: number;
    }
    class FundDetailsRequest extends GenericRequest {
        instrument: Instrument;
        constructor();
    }
}
declare module Infront {
    const DEBUG_VISUAL: boolean;
    class EventCallbackMap {
        static eventMap: EventCallbackMap;
        private map;
        constructor();
        registerEventCallback(eventName: string, callback: (event: InfrontEvent) => void): void;
        unregisterEventCallback(eventName: string, callback: (event: InfrontEvent) => void): void;
        publish(event: InfrontEvent): void;
    }
}
declare module Infront {
    enum InfrontStatus {
        Uninitialized = 0,
        Connecting = 1,
        Connected = 2,
        Disconnected = 3,
    }
    enum AuthenticationType {
        Username = 0,
        OAUTH = 1,
        ExistingSession = 2,
        JWT = 3,
        NONE = 4,
    }
    enum TradingLoginModes {
        USER_PASS = 0,
        JWT_AUTO = 1,
        IDP_SUPER_USER = 2,
        IDP_AUTO = 3,
    }
    enum ConnectionSecurity {
        Require = 0,
        Prefer = 1,
        Unimportant = 2,
    }
    class TradingLoginOptions {
        url: any;
        provider: number;
        service: number;
        md_user_id: string;
        md_password: string;
        user_id: string;
        password: string;
        pin: string;
        valid_sids_pids: PidSidsObject[];
        signed_token: string;
        token_type: string;
    }
    class LoginOptions {
        user_id: string;
        password: string;
        auth_token: string;
        md_mws_url: string;
        signed_token: string;
        token_type: string;
        session_token: string;
        session_urls: string[];
        session_user: string;
        session_pw: string;
        routing_response: Object;
        store_session: boolean;
        client_application: string;
        keepSessionAlive: boolean;
        secureConnection: ConnectionSecurity;
        disableWebsocket: boolean;
        httpPoolSize: number;
        onSlowResponse: (request_type: string, request: string, response: Object, sendTimestamp: number, receiveTimestamp: number, target: string) => void;
        infrontWidgetAccess: boolean;
        visualWidgetAccess: boolean;
        useIds: boolean;
        useMws: boolean;
        loginUrls: string[];
        tradingOptions: TradingLoginOptions;
        getAuthenticationType(): AuthenticationType;
    }
    class ControllerOptions extends LoginOptions {
        baseCurrency: string;
        streaming: boolean;
        usingNodeJS: boolean;
        userIdentification: string;
        visualRoutingUrl: string;
        visualConnectPath: string;
        visualComponentPath: string;
    }
    class InfrontEvent {
        name: string;
        message: string;
    }
    /**
     * We send this when the library is logged in and has a valid marketdata-session.
     */
    class ReadyEvent extends InfrontEvent {
        static kEventName: string;
        sessionToken: string;
        urls: string[];
        constructor();
    }
    /**
     * We send this when you receive system alerts.
     */
    class SystemAlertsEvent extends InfrontEvent {
        static kEventName: string;
        systemMessage: OWC_Message;
        constructor();
    }
    /**
     * We send this when the library is logged in into visual application and has a valid visual-session.
     */
    class VisualReadyEvent extends InfrontEvent {
        static kEventName: string;
        sessionToken: string;
        urls: string[];
        constructor();
    }
    /**
     * We send this when portfolio currency changes.
     */
    class PortfolioCurrencyChangedEvent extends InfrontEvent {
        static kEventName: string;
        constructor(currency: string);
    }
    /**
     * We send this when we disconnect or fail to log in or getServiceRoutings.
     */
    enum DisconnectEventReason {
        KICKOUT = 0,
        DISCONNECT = 1,
        INVALID_SESSION_TOKEN = 2,
        UNKNOWN = 3,
    }
    class DisconnectEvent extends InfrontEvent {
        static kEventName: string;
        reason: DisconnectEventReason;
        constructor();
    }
    /**
     * We send this when connection succeeds but username or password is wrong in Visual !
     */
    class VisualLoginFailedEvent extends InfrontEvent {
        static kEventName: string;
        constructor();
    }
    class TradingConnectedEvent extends InfrontEvent {
        static kEventName: string;
        pid: number;
        sid: number;
        constructor(pid: number, sid: number);
    }
    class TradingDisconnectedEvent extends InfrontEvent {
        static kEventName: string;
        constructor();
    }
    class TradingReconnectingEvent extends InfrontEvent {
        static kEventName: string;
        constructor();
    }
    class TradingReconnectedEvent extends InfrontEvent {
        static kEventName: string;
        constructor();
    }
    class TradingLoginFailedEvent extends InfrontEvent {
        static kEventName: string;
        error_code: number;
        constructor();
    }
    class TradingLoginCanceledEvent extends InfrontEvent {
        static kEventName: string;
        constructor();
    }
    class TradingTokenInvalidEvent extends InfrontEvent {
        static kEventName: string;
        constructor();
    }
    class TradingLostConnectionEvent extends InfrontEvent {
        static kEventName: string;
        termination_code: number;
        termination_reason: string;
        tradingName: string;
        constructor(tradingName: string, termination_code: number, termination_reason: string);
    }
    class TradingTerminatedEvent extends InfrontEvent {
        static kEventName: string;
        termination_code: number;
        termination_reason: string;
        tradingUrl: string;
        constructor(tradingUrl: string, termination_code: number, termination_reason: string);
    }
    class TradingErrorEvent extends InfrontEvent {
        static kEventName: string;
        ps: string;
        gateway: string;
        error_code: string;
        error_description: string;
        orderId: string;
        constructor(ps: PidSid, gateway: string, code: string, description: string, orderId?: string);
    }
    /**
     * We send this when an alert has been modified
     */
    class AlertsChangedEvent extends InfrontEvent {
        static kEventName: string;
        alert: InfrontAlert;
        source: any;
        constructor(source?: any);
    }
    /**
     * We send this when wathclist instrument has been added
     */
    class WatchlistInstrumentAddedEvent extends InfrontEvent {
        static kEventName: string;
        source: any;
        constructor(source?: any);
    }
    /**
    * We send this when wathclist instrument has been added
    */
    class WatchlistInstrumentRemovedEvent extends InfrontEvent {
        static kEventName: string;
        source: any;
        constructor(source?: any);
    }
    /**
     * We send this when connection succeeds but username or password is wrong.
     */
    class LoginFailedEvent extends InfrontEvent {
        static kEventName: string;
        constructor();
    }
    /**
     * We send this when we get an edit user request from the login server
     */
    class EditUserDataEvent extends InfrontEvent {
        static kEventName: string;
        editType: number;
        constructor(type: number);
    }
    /**
     * We send this when new server connection succeeds
     */
    class LowLevelDisconnectEvent extends InfrontEvent {
        static kEventName: string;
        serverType: IDS.ServerType;
        ps: PidSid;
        constructor(ps: PidSid, type: IDS.ServerType);
    }
    class LowLevelConnectEvent extends InfrontEvent {
        static kEventName: string;
        serverType: string;
        ps: PidSid;
        constructor(ps: PidSid, type: IDS.ServerType);
    }
    class WireReconnectEvent extends InfrontEvent {
        static kEventName: string;
        serverType: string;
        ps: PidSid;
        constructor(ps: PidSid, type: IDS.ServerType);
    }
    /**
     * Stores data needed to recreate a session (session-token, url) in HTML5 sessionStorage.
     */
    class StoredMwsSession {
        sessionToken: string;
        url: string;
        sessionTimeout: number;
        routingResponse: Object;
        pid: number;
        sid: number;
        userId: string;
        password: string;
        features: string[];
    }
    class LocallyStoredSession {
        private static kInfrontStoragePrefix;
        private name;
        loaded: boolean;
        values: StoredMwsSession;
        constructor(name: string);
        set(userId: string, password: string, sessionToken: string, url: string, sessionTimeout: number, routingResponse: Object, features: string[], pid?: number, sid?: number): void;
        clear(): void;
        private store();
        private load();
        private key();
        hasCredentials(): boolean;
    }
    /**
     * The controller stores the state of the system, establishes and administrates sessions.
     */
    class Controller implements KeepAliveSenderObserver, MessageServiceObserver, IDS.TradingCallbacks {
        private static kStoredMarketDataSessionName;
        private static kStoredVisualSessionName;
        static kStoredTradingSessionName: string;
        private status;
        private tradingStatus;
        private keepAliveSender;
        private options;
        messageService: MessageService;
        private routingResponse;
        private userId;
        private password;
        private nodes;
        private currentNode;
        private storedVSSession;
        private storedTRSession;
        private tradingNodes;
        private currentTradingNode;
        tradingEndpoint: Object;
        private tradingUserId;
        private tradingPassword;
        private tradingPin;
        private tradingToken;
        private tradingTokenType;
        private sidPidMatches;
        private tradingLoginMode;
        private eventMap;
        private protocolPriorityList;
        private useSecureIdsConnection;
        tradingServer: IDS.TradingServer;
        streamingManager: IDS.API.StreamingManager;
        private infront;
        private readyEventPublished;
        constructor(infront: Model);
        init(controllerOptions: ControllerOptions): void;
        logOut(): void;
        private setValuesAndDoVisualLogin(userId?, password?, sessionToken?, routingResponse?);
        private setNodesToUrl(url);
        private setNodesToUrl(url);
        private startVisualNewSessionCreation();
        private visualLogin();
        private marketDataLoginSuccess(sessionToken, sessionTimeout);
        private startIDS(sessionToken?);
        private publishReadyEvent(sessionToken?);
        private publishLoginFailedEvent(msg);
        private publishEditUserEvent(type);
        private publishDisconnectedEvent(reason, msg);
        /**
         * Infinancials Login Success
         */
        private visualLoginSuccess(sessionToken, sessionTimeout);
        private establishTradingSession(onCompleteCallback);
        /**
         * Returns a TradingConnectedEvent with pid/sid from storedTRSession
         */
        tradingConnectedEventFromStorage(): TradingConnectedEvent;
        /**
         * Log in to trading using only the pre-supplied options given on library construction.
         */
        private hasTradingAccess(pidSid);
        private loginWithStoredTRSession(onCompleteCallback);
        private loginWithTradingOptionsIDP(onCompleteCallback);
        private loginWithTradingOptionsJWT(onCompleteCallback);
        startTradingLogin(provider: number, service: number, username: string, password: string, pin: string): void;
        getTradableFeeds(): number[];
        getTradingRoutings(): Object[];
        getSidPidMatches(): Object[];
        getTradingLoginMode(): TradingLoginModes;
        private determineTradingLoginMode();
        generate_pid_sid_matches(): void;
        findTradingService(provider: number, service: number): Object;
        ResponseTradingLogin(header: IDS.ResponseHeader, resp: IDS.LoginResponse): void;
        ResponseError(header: IDS.ResponseHeader): void;
        private tradingLogin(callback?);
        private tradingLoginFailed(error_code, error_message, persistEndpoint?);
        private tradingLoginSuccess(trLoginResponse, pidSid);
        tradingLogout(): void;
        getTradingFeatures(): string[];
        private doDisconnect(reason, message);
        private sessionTerminated(event);
        marketDataDisconnected(): void;
        tradingDisconnected(): void;
        tradingReconnecting(): void;
        tradingReconnected(): void;
        registerEventObserver(eventName: string, callback: (event: InfrontEvent) => void): void;
        unregisterEventObserver(eventName: string, callback: (event: InfrontEvent) => void): void;
        getMessageService(): MessageService;
        getStatus(): InfrontStatus;
        getTradingStatus(): InfrontStatus;
        getTradingSession(): LocallyStoredSession;
        isStreaming(): boolean;
        isTradingStreaming(): boolean;
        keepAliveFailed(error_code: number, error_message: string): void;
        private pickPrioritizedUrl(urls);
        publishEvent(evt: InfrontEvent): void;
    }
    interface KeepAliveSenderObserver {
        keepAliveFailed(error_code: number, error_message: string): any;
    }
}
/**
 * Created by Andreas on 20.01.14.
 */
declare module Infront {
    class FeedHandler {
        private feeds;
        private feedsInRequest;
        private controller;
        constructor(controller: Controller);
        getFeedMetaData(feedNumber: number): FeedMetaData;
        getFeed(feedNumber: number, callback: (feed: FeedMetaData) => void): void;
        getFeeds(feedNumbers: number[], callback: (feeds: FeedMetaData[]) => void): void;
        dumpFeed(feedNumber: number): void;
        private processCallbacks(key);
        private storeFeedMetadata(data);
        private storeIdsFeedMetadata(data, feedNu);
    }
    class Countries {
        private static WT_COUNTRY_CODES;
        static getAlpha2(infrontCountry: number): any;
        static getCountryName(infrontCountry: number): any;
    }
}
declare module Infront {
    var urlLanguage: any;
    var urlList: any;
    var urlTheme: any;
    enum UniverseType {
        COUNTRY = 0,
        MARKETPLACE = 1,
        REGION = 2,
        REGION_SECTOR = 3,
        COUNTRY_SECTOR = 4,
        MARKETPLACE_SECTOR = 5,
    }
    class BaseDataOptions {
        onError: (error_code: number, error_message: string) => void;
        streaming?: boolean;
    }
    class DataOptions extends BaseDataOptions {
        onData: (data: Object) => void;
    }
    class QuoteOptions extends DataOptions {
        fields: string[];
    }
    class QuoteListOptions extends QuoteOptions {
        feedNumber: number;
        symbolList: string[];
        instruments: Instrument[];
    }
    class WireDataOptions extends DataOptions {
        instruments: Instrument[];
        thresholdMotionDetection: number;
        thresholdNews: number;
        languages: string[];
        subscribe: boolean;
        onConnectionStatus: (isConnected: boolean) => void;
        getSymbols(): Instrument[];
    }
    class RankedListOptions extends DataOptions {
        chain: string;
        items: number;
        fields: string[];
        sortOrder: string;
        instrumentTypes: string[];
        minTurnover: number;
        page: number;
        idsRankType(): IDS.RankType;
    }
    class FeedColumnsOptions extends DataOptions {
        feedNumber: number;
    }
    class ReferenceDataOptions extends DataOptions {
        feedNumber: number;
        instrument: Instrument;
    }
    class ChainOptions extends DataOptions {
        provider: number;
        homeProvider: boolean;
    }
    class ChainsOptions extends DataOptions {
        provider: number;
        homeProvider: boolean;
        types: string[];
        tree: boolean;
    }
    class NewsItemsOptions extends DataOptions {
        feedNumbers: number[];
        startTime: Date;
        endTime: Date;
        maxItems: number;
        newsIdHint: string;
        instrument: Instrument;
        instruments: Instrument[];
        offset: number;
        types: string[];
        regions: number[];
        streaming: boolean;
    }
    class AlertsOptions extends DataOptions {
        alert_id: string;
        index: number;
        type: string;
        comment: string;
        trigger_type: string;
        rule: InfrontAlertNode;
        ToIds(): IDS.API.ServerAlert;
    }
    class ModifyAlertOptions extends DataOptions {
        alert: InfrontAlert;
        ToIds(): IDS.API.ServerAlert;
    }
    class SearchOptions extends DataOptions {
        maxResults: number;
        instrumentTypes: string[];
        itemTypes: string[];
        feeds: number[];
        ticker: boolean;
        useAccesses: boolean;
        infinancialsSearch: boolean;
        sector: boolean;
    }
    class BrokerStatsOptions extends DataOptions {
        broker: string;
        instrument: Instrument;
        feed: number;
    }
    class TickSizesOptions extends DataOptions {
        id: number;
        ticker: string;
        isin: string;
    }
    class CalendarOptions extends DataOptions {
        feeds: number[];
        countries: string[];
        instrument: Instrument;
        instruments: Instrument[];
        startDate: Date;
        endDate: Date;
    }
    class IntradayTradesOptions extends DataOptions {
        resolution: string;
        stepSize: number;
        fields: string[];
        targetCurrency: string;
    }
    class InstrumentTradesOptions extends DataOptions {
        items: number;
        tradesStart: number;
        tradesEnd: number;
    }
    class InsertOrderOptions extends DataOptions {
        portfolio: string;
        instrument: Instrument;
        buyOrSell: BuyOrSell;
        price: number;
        volume: number;
        orderType: string;
        lastPrice: number;
        lastTradeDate: Date;
        validUntil: any;
        openVolume: number;
        activeOrder: boolean;
        customerReference: string;
        comment: string;
        customTags: Object[];
        algoId: string;
        algoParams: Object[];
        customFields: Object[];
    }
    class ActivateOrderOptions extends DataOptions {
        portfolio: string;
        order_id: number;
    }
    class ModifyOrderOptions extends DataOptions {
        instrument: Instrument;
        price: number;
        volume: number;
        openVolume: number;
        activeOrder: boolean;
        validUntil: any;
        customerReference: string;
        comment: string;
        customTags: Object[];
        algoId: string;
        algoParams: Object[];
        customFields: Object[];
    }
    class RiskLevelOptions extends DataOptions {
        portfolio: string;
        orderId: number;
    }
    class DeleteOrderOptions extends DataOptions {
        portfolio: string;
        order_id: number;
    }
    class GetAlgosOptions extends DataOptions {
        feed: number;
        algoId: string;
    }
    class GetCustomFieldsOptions extends DataOptions {
        feed: number;
        id?: string;
    }
    class TradesByDaysOptions extends IntradayTradesOptions {
        days_back: number;
        num_days: number;
        maxLookupDays: number;
    }
    class HistoricalTradesOptions extends DataOptions {
        start_date: Date;
        end_date: Date;
        fields: string[];
        adjust_splits: boolean;
        adjust_dividends: boolean;
        targetCurrency: string;
    }
    class MarketActivityOptions extends DataOptions {
        streaming: boolean;
        chain: string;
    }
    class TradingPowerOptions extends DataOptions {
        instrument: Instrument;
    }
    class InfinancialsUrlOptions extends DataOptions {
        instrument: Instrument;
        widgets: string[];
        width: number;
        height: number;
        darkTheme: boolean;
    }
    class ComponentOptions extends DataOptions {
        id: number;
        company: string;
        peergroup: string;
        secondCompany: string;
        custom: Object;
        currency: number | string;
        source: string;
    }
    class ChartOptions extends ComponentOptions {
        chart: number;
    }
    class EvolutionChartOptions extends ComponentOptions {
        fields: number[];
        predefinedSeries: number;
        periods: string[];
    }
    class EtaOptions extends DataOptions {
        id: number;
        company: string;
        view: number;
        mode: number;
        universe: string;
    }
    class UniverseOptions extends ComponentOptions {
        type: UniverseType;
        index: string;
        sector: string;
        country: Array<string>;
        marketplace: Array<string>;
        region: string;
        field: number;
        nbtop: number;
        nbbot: number;
    }
    class FundamentalsOptions extends DataOptions {
        id: number;
        company: string;
        mode: number;
        currency: number;
    }
    class EurofinOptions extends DataOptions {
        id: number;
        company: string;
        action: number;
        name: string;
        entries: string[];
        arr_names: string[];
        arr_entries: string[][];
        rm_company: string;
    }
    class CalculateOptions extends DataOptions {
        response: CalculatorResponse;
        isIdentical(item: CalculateOptions): boolean;
        populateRequest(request: CalculationRequestOptions): CalculationRequestOptions;
    }
    class CalculateSwapOptions extends CalculateOptions {
        evaluationDate: Date;
        currency: string;
        startDate: Date;
        endDate: Date;
        frequencyFix: string;
        frequencyFloat: string;
        firstCouponFix: Date;
        firstCouponFloat: Date;
        interestCalculationMethodFix: string;
        interestCalculationMethodFloat: string;
        fixIsPayer: string;
        notional: number;
        fixRate: number;
        floatingSpread: number;
        leverage: number;
    }
    class CalculateBondOptions extends CalculateOptions {
        cleanPrice: number;
        currency: string;
        startDate: Date;
        endDate: Date;
        valuationDate: Date;
        firstCouponDate: Date;
        lastCouponDate: Date;
        fixRate: number;
        frequency: string;
        interestCalculationMethod: string;
        marginalTaxRate: number;
        notional: number;
        redemption: number;
        yield: number;
        bondType: string;
    }
    class InfrontOptions extends ControllerOptions {
    }
    enum ChangeDirection {
        Unchanged = 0,
        Up = 1,
        Down = 2,
    }
    class MarketActivityItem {
        instrument: Instrument;
        direction: ChangeDirection;
        constructor(instrument: Instrument);
        setDirection(value: number): boolean;
    }
    class MarketActivity {
        items: {
            [key: string]: MarketActivityItem;
        };
        unbinds: {
            (): void;
        }[];
        addInstrument(instrument: Instrument): void;
        getInstruments(): Instrument[];
        update(fs: Instrument, value: number): boolean;
        unbind(): void;
        get(): any;
    }
    /**
     * Entry-point of the core library. Use this if you want to request data directly
     */
    class Model {
        private static kDefaultBaseCurrency;
        readonly options: InfrontOptions;
        readonly controller: Controller;
        readonly feedHandler: FeedHandler;
        readonly tradingManager: TradingManager;
        readonly cache: BindingCache;
        private instrumentManager;
        private watchListManager;
        streamingManager: IDS.API.StreamingManager;
        serverPool: IDS.ServerPool;
        language: string;
        searchServer: IDS.SearchServer;
        newsServer: IDS.API.News.NewsManager;
        alertsServer: IDS.API.AlertsServer;
        realtimeTestServer: IDS.Realtime.RealtimeServer;
        wireServer: IDS.Wire.WireServer;
        private marketListPromise;
        private emailDevicePromise;
        private initialized;
        private currencyConverter;
        private calculatorServer;
        _idsTradingServer: IDS.TradingServer;
        constructor(options: InfrontOptions);
        setTradingServer(tradingServer: IDS.TradingServer): void;
        getTradingServer(): IDS.TradingServer;
        getBaseCurrency(): string;
        getCurrencyConverter(): CurrencyConverter;
        publishEvent(event: InfrontEvent): void;
        getCache(): BindingCache;
        clearIndexedDb(): void;
        getFeedHandler(): FeedHandler;
        setLoginInformation(options: LoginOptions): void;
        getTradingRoutings(): Object[];
        getCurrentTGW(): string;
        getSidPidMatches(): Object[];
        getTradableFeeds(): number[];
        getFeedExchangeCode(feednu: number): string;
        tradingLogin(provider: number, service: number, username: string, password: string, pin: string): void;
        cancelTradingLogin(): void;
        tradingLogout(): void;
        getTradingManager(): TradingManager;
        getTradingFeatures(): string[];
        init(): void;
        loginServer(): IDS.LoginServer;
        logout(): void;
        registerEventObserver(eventName: string, callback: (event: InfrontEvent) => void): void;
        unregisterEventObserver(eventName: string, callback: (event: InfrontEvent) => void): void;
        registerTradingConnectedEventObserverWithCallbackIfConnected(callback: (event: InfrontEvent) => void): void;
        registerWatchlistInstrumentAddedObserver(callback: (event: InfrontEvent) => void): void;
        registerWatchlistInstrumentRemovedObserver(callback: (event: InfrontEvent) => void): void;
        getStatus(): InfrontStatus;
        getTradingStatus(): InfrontStatus;
        getTradingSession(): LocallyStoredSession;
        isStreaming(): boolean;
        private cleanInstrumentsArgument(instruments);
        instrumentInfoPromise(feed: number, ticker: string): Promise<Instrument>;
        instrumentInfo(instrument: Object, options: DataOptions): any;
        instrumentInfo(feed: number, ticker: string, options: DataOptions): any;
        companyDataPromise(feed: number, ticker: string): Promise<IDS.CompanyInfo>;
        fundamentalDataPromise(feed: number, ticker: string, sources: number[], language?: string): Promise<IDS.CompanyInfo>;
        getTrades(instruments: Instrument[], options: InstrumentTradesOptions, subscribe: boolean): () => void;
        private getOrderbook(instruments, callback);
        private setJsonSymbolValue(feed, symbol, tagName, data, path?);
        private getFundDetails(instruments, callback);
        private getFundDataDetails(instruments, callback);
        getSymbols(instruments: Instrument[], fields: string[], callback: (data: any) => void, numTrades: number, subscribe: boolean, refresh?: boolean): () => void;
        subscribe(instruments: Instrument[], fields: string[], guarantee?: boolean, callback?: (data: any) => void, numTrades?: number): () => void;
        subscribe(instruments: Instrument, fields: string[], guarantee?: boolean, callback?: (data: any) => void, numTrades?: number): () => void;
        unsubscribe(instruments: Instrument[], fields: string[], callback?: (data: any) => void): any;
        unsubscribe(instruments: Instrument, fields: string[], callback?: (data: any) => void): any;
        testSnapshots(instrument: Instrument, hosts: string[]): Promise<Object[]>;
        snapshot(instruments: Instrument[], fields: string[], guarantee?: boolean, callback?: (data: any) => void, numTrades?: number, refresh?: boolean): any;
        snapshot(instruments: Instrument, fields: string[], guarantee?: boolean, callback?: (data: any) => void, numTrades?: number, refresh?: boolean): any;
        rankedList(feed: number, options: RankedListOptions): void;
        /**
         * We use a separate function for subscription here because the result is VERY different. The results from this function
         * is not actually sorted, it is just the contents of the ranked list so we have to sort it ourselves.
         */
        rankedListSubscription(feed: number, options: RankedListOptions): () => void;
        chain(chainName: string, feedNumber: number, options: ChainOptions): void;
        chains(feed: number, options: ChainsOptions): void;
        feedColumns(options: FeedColumnsOptions): void;
        monitorServerConnection(feedNu: number, callback: () => void): () => void;
        testReferenceData(feedNu: number): Promise<Object[]>;
        referenceData(options: ReferenceDataOptions): void;
        newsSources(options: DataOptions): void;
        private getAlertServer(id);
        alertsData(options: DataOptions): void;
        addAlert(options: AlertsOptions): void;
        deleteAlert(options: AlertsOptions): void;
        modifyAlert(options: ModifyAlertOptions): void;
        alerts(options: DataOptions): () => void;
        addAlertDevice(deviceType: IDS.AlertDeviceType, token: string, enabled?: boolean, deviceClient?: string): void;
        getEmailDevice(): Promise<IDS.API.AlertsEmailDeviceResponse>;
        setEmailDevice(email: string, enabled: boolean): void;
        private getNewsServer(id);
        resetNewsItemsCache(input: Instrument | Instrument[] | number[]): void;
        newsItems(options: NewsItemsOptions): void;
        subscribeNewsItems(options: NewsItemsOptions): () => void;
        newsItem(feed: number, id: string, headline: IDS.HeadlineItem, options: DataOptions): void;
        wireData(options: WireDataOptions): () => void;
        lookupInstrument(instrument: string, options: DataOptions): any;
        lookupInstrument(instrument: Instrument, options: DataOptions): any;
        search(query: Instrument | string | any, options: SearchOptions): void;
        underlyings(feed: number, issuer: string, issuerFullName: string, options: DataOptions): void;
        issuers(feed: number, underlying: string, options: DataOptions): void;
        expiryDates(feed: number, underFeed: number, underTicker: string, options: DataOptions): void;
        underlyingOptions(feed: number, underFeed: number, underTicker: string, optionsExpiries: number[], futureForwardExpiries: number[], symbolType: number, options: DataOptions): void;
        feedInstruments(feed: number, underFeed: number, underTicker: string, issuer: string, issuerFullName: string, expiries: number[], symbolType: number, ignoreUnderlying: boolean, ignoreIssuer: boolean, options: DataOptions): void;
        brokerStats(period: string, options: BrokerStatsOptions): void;
        tickSizes(feed: number, options: TickSizesOptions): void;
        getFeatureFeeds(): IDS.MwsMarketInfo[];
        getFeatureStrings(): any;
        getLoginInfo(): IDS.LoginInfo;
        marketLists(options: DataOptions): void;
        private getCalendarServer(options);
        /**
         * Improved market-list request
         */
        marketListsPromise(): Promise<MarketInfo[]>;
        calendar(options: CalendarOptions): void;
        tradesByDays(instrument: Instrument, options: TradesByDaysOptions): void;
        private ensureValidHistoricalTrades(items, field, startDate, endDate);
        private ensureValidHist(hist, field, startDate, endDate, adjustSplits, adjustDividends, convert?, fromCurr?, toCurr?);
        historicalTrades(instrument: Instrument, options: HistoricalTradesOptions): void;
        companyHistory(instrument: Instrument, options: HistoricalTradesOptions): void;
        marketActivity(feed: number, options: MarketActivityOptions): () => void;
        getWatchlistTitles(): Promise<SortedObservableArray>;
        isWatchlistReadOnly(listName: string): boolean;
        getWatchlistContents(listName: string): Promise<Watchlist>;
        addWatchlist(listName: string): Promise<boolean>;
        addWatchlistInstrument(listName: string, instrument: Instrument): Promise<boolean>;
        removeWatchlistInstrument(listName: string, instrument: Instrument): Promise<boolean>;
        saveUserList(listName: string, entries: WatchlistEntry[]): Promise<Object>;
        updateUserList(listName: string, watchlist: Watchlist): Promise<Object>;
        deleteUserList(listName: string): Promise<boolean>;
        infinancialsUrl(options: InfinancialsUrlOptions): void;
        trGetPortfolioNames(options: DataOptions): void;
        trGetTradingPower(portfolioName: string, options: TradingPowerOptions): void;
        /**
         * Requests data about a portfolio (positions, values, etc.) and, if trading-streaming is on, subscribes to the same data.
         *
         * @param portfolioName: string
         * @param inpOptions: DataOptions
         * @returns {function(): void}
         */
        trPortfolio(portfolioName: string, inpOptions: DataOptions): () => void;
        setActivePortfolio(portfolioName: string): () => void;
        trOrderTypes(options: DataOptions): void;
        /** replaces and combines trOrders and trTrades
         * @param portfolioName
         * @param options
         */
        trOrdersAndTrades(portfolioName: string, options: DataOptions): () => void;
        trNetTrades(portfolioName: string, options: DataOptions): () => void;
        trInsertOrder(options: InsertOrderOptions): void;
        trDeleteOrder(portfolio: string, orderId: number, options: DataOptions): void;
        trModifyOrder(portfolio: string, orderId: number, options: ModifyOrderOptions): void;
        trRiskLevel(options: RiskLevelOptions): void;
        trGetAlgos(options: GetAlgosOptions): void;
        trGetCustomFields(options: GetCustomFieldsOptions): void;
        trGetCustomFieldLabel(market: string, value: string): string;
        activateOrder(options: ActivateOrderOptions): void;
        deactivateOrder(options: ActivateOrderOptions): void;
        trGetMarketplaceForFeed(feedNu: number): string;
        trHasServerProp(property: IDS.ServerProperties, feedNu?: number): boolean;
        trHasServerProp2(property: IDS.ServerProperties2, feedNu?: number): boolean;
        trHasServerProp3(property: IDS.ServerProperties3, feedNu?: number): boolean;
        trHasUserProp(property: IDS.UserProperties): boolean;
        logOut(): void;
        /**
         * Generic Component data with all standards information request.
         */
        componentData(options: ComponentOptions): void;
        /**
         * Generic Component data with all standards information request.
         */
        eurofinData(options: EurofinOptions): void;
        /**
         * Generic ChartComponent data with all standards information request.
         */
        chartComponentData(options: ChartOptions): void;
        /**
         * Generic ChartComponent data with all standards information request.
         */
        evolutionComponentData(options: EvolutionChartOptions): void;
        /**
         * Generic ChartComponent data with all standards information request.
         */
        etaComponentData(options: EtaOptions): void;
        /** SectorMomentum Data request: specific type of request, so we are using a dedicated method. */
        sectorIndiceComponentData(options: UniverseOptions): void;
        /** Screener Data request: specific type of request, so we are using a dedicated method. */
        leagueTablesData(options: UniverseOptions): void;
        /** Screener Data request: specific type of request, so we are using a dedicated method. */
        screenerData(request: ScreenerRequest, options: DataOptions): void;
        /**
         * Fundamentals data
         */
        fundamentalsData(options: FundamentalsOptions): void;
        getConnectionStatus(options: DataOptions, subscribe: boolean): () => void;
        calculateSwap(options: CalculateSwapOptions): void;
        calculateFixBond(options: CalculateBondOptions): void;
        calculateFloatingBond(options: CalculateBondOptions): void;
    }
}
/**
 * Created by hage on 15.08.2016.
 */
declare module Infront {
    class InstrumentManager {
        private static kDefaultNumTrades;
        private static kBunchingDelay;
        private static kLazyUnsubDelay;
        private infront;
        private streamingManager;
        private cache;
        private messageService;
        private nextTradeNumReq;
        private delayedSubscribeTimerID;
        private delayedUnsubscribeTimerID;
        private observers;
        private subscriptionCounter;
        constructor(messageService: MessageService, infront: Model);
        SetIDS(streamingManager: IDS.API.StreamingManager): void;
        private sendSubscribeRequest(instruments, fields, guarantee?, numTrades?);
        createOrderbookCache(instruments: Instrument[]): void;
        private requestFundDetails(instruments);
        private resubscribeAllInstruments();
        snapshot(instruments: Instrument[], fields: string[], guarantee?: boolean, callback?: (data: any) => void, numTrades?: number, refresh?: boolean): void;
        private removeNonSubscriptionFields(fields);
        private removeFundsDetailsFields(fields);
        private hasTradesField(fields);
        private hasFundDetailsFields(fields);
        private loadTGWFields(instruments, fields);
        private singleLoadTGWFields(instrument);
        instrumentUpdate(data: any): void;
        processIdsOrderbook(instrument: Instrument, data: MblOrderBook): void;
        private processOrderbook(update);
        private processOrderbookUpdate(instrument, side, orderLevels, targetArray);
    }
}
declare namespace IDS {
    import Instrument = Infront.Instrument;
    class BrokerSingle {
        num: number;
        volume: number;
        turnover: number;
        Add(i: BrokerSingle): void;
        AddTrade(t: Realtime.Trade, noVolume: boolean): void;
        Assign(i: BrokerSingle): void;
    }
    class BrokerStatItem {
        name: string;
        feed: number;
        symbol: string;
        dateTime: Date;
        buy: BrokerSingle;
        sell: BrokerSingle;
        internal: BrokerSingle;
        aggressiveBuy: BrokerSingle;
        aggressiveSell: BrokerSingle;
        Add(i: BrokerStatItem): void;
        instrument: Instrument;
        fullname: string;
        buys: number;
        sells: number;
        int_trades: number;
        buy_volume: number;
        sell_volume: number;
        int_volume: number;
        total_volume: number;
        buy_value: number;
        sell_value: number;
        int_value: number;
        avg_buy: number;
        avg_sell: number;
        net_buy_value: number;
        hit_value: number;
        hit_value_pct: number;
        take_value: number;
        take_value_pct: number;
        total_value: number;
        total_value_pct: number;
        trades: number;
        trades_pct: number;
        sym_turn: number;
        sym_turn_pct: number;
        time: string;
        date: string;
        toMws(): void;
    }
    enum NewsFlags {
        Flash = 1,
        Body = 2,
        Deleted = 4,
        Expired = 8,
        AttachmentWithBody = 16,
        Popup = 32,
        DisableListing = 64,
        Event = 128,
    }
    class HeadlineItem {
        private newsId;
        streamingId: string;
        news_feed: number;
        headline: string;
        dateTime: Date;
        flags: NewsFlags;
        isFlash: boolean;
        language: string;
        url: string;
        industry: string;
        category: string;
        topic: string;
        storyNumber: number;
        country: string;
        productCode: string;
        moneyCode: string;
        author: string;
        governmentCode: string;
        statisticsCode: string;
        symbols: Instrument[];
        isUpdated: boolean;
        isHistory: boolean;
        news_id: string;
        GetHeadlineType(): MWSHeadlineType;
        private GetInstruments();
        private AddStr(result, value);
        private GetSymbolsStr();
        private GetDebugPrefix();
        IsDeleted(): boolean;
        ToMws(): any;
        debug(): any;
        merge(item: HeadlineItem): boolean;
    }
    class CalendarEventItem {
        source: number;
        id: number;
        parentId: number;
        description: string;
        dateTime: Date;
        country: string;
        category: CalendarCategory;
        categoryType: string;
        type: CalendarType;
        isMacro: boolean;
        properties: number;
        feed: number;
        symbol: string;
        resultPrevious: number;
        resultExpected: number;
        resultActual: number;
        actualFeed: number;
        actualSymbol: string;
        expectedFeed: number;
        expectedSymbol: string;
        revisedFeed: number;
        revisedSymbol: string;
        deltaFeed: number;
        deltaSymbol: string;
        resultDelta: number;
        resultUnit: string;
        resultRevised: number;
        instrument: Instrument;
        date: string;
        time: string;
        ToMws(): void;
    }
}
declare namespace IDS {
    import Db = Infront.Db;
    enum StaticDataCacheEnum {
        ItemIsValid = 0,
        CrcMismatch = 1,
        InvalidCacheItem = 2,
        ItemNotInCache = 3,
        SymbolCrcMissing = 4,
        CouldNotAccessCache = 5,
    }
    class StaticDataCache {
        private symDb;
        constructor(symDb: Db);
        Parse(s: Symbol, parser: Parser, buf: Uint8Array, fromCache?: boolean): void;
        private StoreSymbolToIxDb(sym, buf, pos, length);
        LoadSymbolFromIxDb(sym: Symbol, callback: (sym: Symbol, cacheStatus: number) => void): void;
    }
}
declare module Infront {
    class SystemAlerts {
        private controller;
        constructor(controller: Controller);
        private systemAlerts(options);
        private processOWCMessage(message);
        private systemAlertsData();
    }
}
declare module Infront {
    class TradeExecutedEvent extends InfrontEvent {
        static kEventName: string;
        trades: any[];
        portfolio: string;
        constructor(trades: any[], portfolio: string);
    }
    interface TradingManagerObserver {
        availablePortfoliosChanged(portfolios: Portfolio[]): any;
        currentPortfolioChanged(portfolio: Portfolio): any;
        currentPortfolioReady(portfolio: Portfolio): any;
    }
    class TradingPower {
        trading_power: number;
        currency: string;
        base_trading_power: number;
        base_currency: string;
    }
    class Portfolio {
        name: string;
        description: string;
        fullName?: string;
        displayName?: string;
        constructor(name: string, description: string);
    }
    class TradingManager implements IDS.TradingCallbacks {
        private static kPortfolioPollingInterval;
        private static kPortfolioPollingDelay;
        static kInitializedField: string;
        private static resultCalculation;
        private static divCalculation;
        private static pctCalculation;
        private static kTradingpower;
        private static kTrading_power;
        static kCompositeCurrency: string;
        static kMarketValue: string;
        static kBaseMarketValue: string;
        static kPLToday: string;
        static kPLTodayPct: string;
        static kBasePLToday: string;
        static kResult: string;
        static kResultPct: string;
        static kBaseResult: string;
        static kBaseResultPct: string;
        static kBaseCurrencyResult: string;
        static kAvgPrice: string;
        static kBaseCollateral: string;
        static kTotalBaseMarketValue: string;
        static kTotalBaseResult: string;
        static kTotalBasePLToday: string;
        static kTotalBaseInvested: string;
        static kTotalBasePLTodayPct: string;
        static kTotalBaseResultPct: string;
        static kSumCashField: string;
        static kSAvgPrice: string;
        static kOrderHealthKey: string;
        static kSCollateral: string;
        static kTotalTrades: string;
        static kTotalOrders: string;
        private static kTradeExecutedEventDelay;
        private tradeExecutedEventBuffer;
        private tradeExecutedTimeoutId;
        private infront;
        private portfolios;
        private currentPortfolio;
        private externallySetActivePortfolioName;
        private observerManager;
        private currencyConverter;
        private started;
        private initialized;
        private deferredCalls;
        private portfoliosLoaded;
        private todaysPLEnabled;
        private pollPortfolioValues;
        private portfolioPollingTimeout;
        private continuousPortfolioPollingTimeout;
        private tradesInitialized;
        private positionsInitialized;
        private currentPortfolioReady;
        private readyPortfolios;
        private strategyManager;
        private subscribeToAll;
        private unsubscribeAll;
        currentPortfolioCurrency: string;
        constructor(infront: Model);
        private init();
        didTradingLogin(provider: number, service: number): void;
        didTradingLogout(): void;
        StreamingTradingPower(header: IDS.ResponseHeader, resp: IDS.TradingPowerItem): void;
        StreamingPortfolioPositions(header: IDS.ResponseHeader, resp: IDS.PortfolioPosition): void;
        StreamingOrderStatus(header: IDS.ResponseHeader, resp: IDS.OrderStatusItem): void;
        StreamingTrade(header: IDS.ResponseHeader, resp: IDS.TradeItem, alreadyReceived: boolean): void;
        ResponseError(header: IDS.ResponseHeader): void;
        private doSubscribeToAllPortfolios();
        subscribeToAllPortfolios(): void;
        unsubscribeFromAllPortfolios(): void;
        private getPortfolios();
        getPortfolio(portfolioName: string): Portfolio;
        private createDataStructuresForPortfolio(p);
        private clearDataStructuresForPortfolio(p);
        private updatePortfolios(newPortfolios);
        setCurrentPortfolioName(portfolioName: string): void;
        setCurrentPortfolio(portfolio: Portfolio): void;
        getCurrentPortfolio(): Portfolio;
        private portfolioReady(portfolio);
        observe(obs: TradingManagerObserver): void;
        removeObserver(obs: TradingManagerObserver): void;
        private receiveTradingPower(portfolio, resp);
        private updatePositionInstrument(position);
        private setUpMarketValueField(position);
        /**
         * Unsubscribes from fields required to calculate market-value and related fields ( see setUpMarketValueField() )
         * @param portfolio: Portfolio
         * @param position
         */
        private setUpTodaysPLField(portfolio, position);
        private setUpCashPositionMarketValueField(cashPosition);
        getStrategy(feed: number, strategyID: string, callback: (strategy: Strategy) => void): void;
        /**
         * Modifies an order-object for insertion into cache. It extracts AlgoParams from an array and makes them into normal cache-values.
         * It also adds the read only field (default value of false) if it is missing.
         * @param order
         */
        private processOrderObject(order);
        private processAlgoParam(id, value, strategy);
        private processPosition(portfolio, position);
        private calculatePositionPLForPortfolio(portfolio);
        private calculatePositionPL(portfolio, instrument);
        static doCalculatePositionPL(actualPortfolioVolume: number, prvCls: number, marketPrice: number, change: number, contractSize: number, trades: any[]): number | "-";
        private calculateAvgPrice(portfolio, orderId);
        private receivePortfolioResponse(portfolio, data);
        private subscribePortfolio(portfolio);
        private startPortfolioPolling(portfolio);
        stopPortfolioPolling(): void;
        /**
         * Publishes the trade as a TradeExecutedEvent, potentially bundling it with other trades executed at (approx) the same time
         * @param trade
         */
        private sendTradeExecutedEvent(trade);
        private updatePortfolioValues(portfolio);
        private receiveOrders(portfolio, data);
        private subscribeOrdersAndTrades(portfolio);
        private receiveTrades(portfolio, data, alreadyReceived);
        private unsubscribe();
        private setComputedCacheValues(portfolio);
        private subscribe(portfolio);
        private processDeferredCalls();
        private deferToPostPortfolioLoad(runner);
        enableTodaysPL(): void;
        needValue(valueName: string): void;
        private needTotalResult();
        private needTotalBasePlToday();
        private needTotalBaseMarketValue();
        private needTotalBaseInvested();
        private needTotalTrades();
        private needTotalOrders();
        private needOwnCapitalChange();
        private needOwnCapitalChangePercent();
        private createPercentageValueForAllPortfolios(targetField, denominatorField, numeratorField);
        private createPercentagePortfolioValue(portfolio, targetField, denominatorField, numeratorField);
        private createSummedValueForAllPortfolios(sourceField, targetField);
        private createSummedPortfolioValue(portfolio, sourceField, targetField);
        static createPortfolioValueId(valueName: string): string;
    }
}
declare namespace IDS {
    enum AlertRequest {
        AddAlert = 16,
        DeleteAlert = 17,
        ModifyAlert = 18,
        GetAlerts = 19,
        AddDevice = 20,
        GetAlertLog = 21,
        DeleteDevice = 22,
        MarkEvents = 23,
        EnableAlert = 24,
        DisableAlert = 25,
        GetEmailDevice = 32,
        GetOwcLog = 33,
        MarkOwcRead = 34,
        IntrusionLevel1Notification = 0,
        IntrusionLevel2Browser = 1,
        IntrusionLevel3Error = 2,
    }
    enum AlertTag {
        Separator = 0,
        Id = 1,
        LoginId = 2,
        Type = 3,
        Description = 4,
        Enabled = 5,
        Feed = 6,
        Ticker = 7,
        Double = 8,
        Int = 9,
        DeviceId = 10,
        DeviceType = 11,
        TriggerType = 12,
        TimeoutMinutes = 13,
        RevisionIndex = 14,
        Comment = 15,
        List = 34,
        ChainName = 35,
        ChainDescription = 36,
        ChainProvider = 37,
        InstrumentType = 48,
        InstrumentSubtype = 49,
        TriggerDate = 50,
        TriggerTime = 51,
        EventId = 52,
        NotificationMsg = 53,
        EventRead = 54,
        Operator = 64,
        UpdateType = 65,
        ActionType = 66,
        Hostname = 67,
        DeviceClient = 68,
        PortfolioTitle = 69,
        MarketDataField = 81,
        PortfolioDataField = 113,
    }
    enum AlertType {
        Instrument = 1,
        Chain = 2,
        List = 3,
        News = 4,
        Portfolio = 5,
    }
    enum AlertTriggerType {
        KeepActive = 1,
        Disable = 2,
        Timeout = 3,
        RenewDaily = 4,
    }
    enum AlertUpdateType {
        Alert = 1,
        Event = 2,
        Owc = 3,
    }
    enum AlertActionType {
        Added = 1,
        Modified = 2,
        Deleted = 3,
    }
    enum AlertMarketDataField {
        Last = 1,
        Bid = 2,
        BidSize = 3,
        Ask = 4,
        AskSize = 5,
        Change = 6,
        ChangePct = 7,
        Volume = 8,
        Turnover = 9,
    }
    enum AlertOperator {
        Or = 1,
        And = 2,
        Eq = 3,
        Ne = 4,
        Gt = 5,
        Gte = 6,
        Lt = 7,
        Lte = 8,
    }
    enum AlertDeviceType {
        Apns = 1,
        Gcm = 2,
        Email = 3,
    }
    enum AlertOwc {
        MsgId = 4096,
        IntrusionLevel = 4097,
        Format = 4098,
        Headline = 4099,
        Message = 4100,
        Url = 4101,
        ExpireDate = 4102,
        ExpiryTime = 4103,
        PublishDate = 4104,
        PublishTime = 4105,
        MessageRead = 4112,
    }
    enum AlertPortfolioDataField {
        Last = 1,
        Change = 2,
        PctChange = 3,
    }
}
declare module Infront {
    enum CalculatorObjectType {
        Unknown = 0,
        Swap = 1,
        SwapCashFlow = 2,
        Bond = 3,
        BondCashFlow = 4,
    }
    enum CalculatorFieldType {
        TextField = 0,
        NumericField = 1,
        PercentField = 2,
        VolumeField = 3,
        CurrencyField = 4,
        DateField = 5,
    }
    class CalculatorFieldDefinition {
        fieldType: CalculatorFieldType;
        decimals: number;
        displayZeroValues: boolean;
        displayField: string;
        constructor(fieldType: CalculatorFieldType, decimals?: number, displayField?: string, displayZeroValues?: boolean);
    }
    enum CalculatorSwapTag {
        Unknown = 0,
        currency = 1,
        fix_accrued_interest = 2,
        float_accrued_interest = 3,
        accrued_interest = 4,
        present_value = 5,
        present_value_fix_leg = 6,
        present_value_float_leg = 7,
        swap_cash_flows = 8,
        total_sum = 9,
        total_sum_fix_leg = 10,
        total_sum_float_leg = 11,
        premium = 12,
        par_rate = 13,
        principal = 14,
    }
    function getCalculatorSwapField(tag: CalculatorSwapTag): CalculatorFieldDefinition;
    enum CalculatorSwapCashFlowTag {
        Unknown = 0,
        currency = 1,
        discount_factor_fix = 2,
        discount_factor_float = 3,
        evaluation_date = 4,
        amount_fix = 5,
        amount_float = 6,
        forward_rate_float = 7,
        forward_rate_fix = 8,
        present_value_fix = 9,
        present_value_float = 10,
    }
    function getCalculatorSwapCashFlowField(tag: CalculatorSwapCashFlowTag): CalculatorFieldDefinition;
    enum CalculatorBondInfoTag {
        unknown = 0,
        accrued_interest_days = 1,
        accrued_interest_in_percent = 2,
        accrued_interest = 3,
        basis_point_value_in_points = 4,
        clean_price_in_percent = 5,
        convexity = 6,
        currency = 7,
        dirty_price_in_percent = 8,
        duration = 9,
        gross_yield_in_percent = 10,
        maturity_in_years = 11,
        modified_duration = 12,
        net_yield_in_percent = 13,
        present_value = 14,
        yield_in_percent = 15,
        bond_cash_flows = 16,
    }
    function getCalculatorBondField(tag: CalculatorBondInfoTag): CalculatorFieldDefinition;
    enum CalculatorBondCashFlowTag {
        unknown = 0,
        amount = 1,
        amount_in_percent = 2,
        balance = 3,
        balance_in_percent = 4,
        description = 5,
        evaluation_date = 6,
    }
    function getCalculatorBondCashFlowField(tag: CalculatorBondCashFlowTag): CalculatorFieldDefinition;
    function getCalculatorField(objectType: CalculatorObjectType, tag: number): CalculatorFieldDefinition;
    function getArrayField(objectType: CalculatorObjectType, arrayKey: string, tagName: string): CalculatorFieldDefinition;
    function getTagForObjectType(objectType: CalculatorObjectType, key: string): any;
    function calculatorTagToStr(objectType: CalculatorObjectType, tag: number): string;
    function getCurrencyField(objectType: CalculatorObjectType): number;
    function objectTypeToStr(objectType: CalculatorObjectType): string;
}
declare namespace IDS {
    enum CalendarRequest {
        FilterData = 5,
        CalendarData = 6,
        Story = 9,
        FxSettlementDate = 10,
        NextDividend = 11,
    }
    enum CalendarTags {
        Separator = 0,
        Symbol = 5,
        Feed = 6,
        Id = 20,
        Text = 27,
        DataSource = 32,
        Date = 33,
        DateFrom = 34,
        DateTo = 35,
        Time = 36,
        Country = 37,
        Region = 38,
        RegionCountry = 39,
        EventId = 40,
        Category = 41,
        CategoryName = 42,
        Description = 43,
        ResultPrevious = 44,
        ResultExpected = 45,
        ResultActual = 46,
        WebLink = 47,
        CountryLimitCorpEvent = 48,
        ExternId = 49,
        Type = 50,
        ResultUnit = 51,
        IsCategoryMacro = 52,
        IsCategoryDefault = 53,
        IsMoreDataAvail = 54,
        Properties = 55,
        EventParentId = 56,
        MaxItems = 57,
        SettleDate = 64,
        FxCurrency1 = 65,
        FxCurrency2 = 66,
        ActualFeed = 67,
        ActualSymbol = 68,
        ExpectedFeed = 69,
        ExpectedSymbol = 70,
        SkipDate = 71,
        SkipCurrency = 72,
        SkipDescription = 73,
        NextDividend = 74,
        NextExDividendDate = 75,
        NextDividendPayDate = 76,
        NextDividendAnnouncement = 77,
        DividendCurrency = 78,
        ResultRevised = 79,
        ResultDelta = 80,
        RevisedFeed = 81,
        RevisedSymbol = 82,
        DeltaFeed = 83,
        DeltaSymbol = 84,
        SettleDateOffset = 85,
    }
    enum CalendarType {
        Announcement = 1,
        Arrangement = 2,
        Assimilation = 3,
        Bankruptcy = 4,
        Bonus = 5,
        BonusRights = 6,
        BuyBack = 7,
        Call = 8,
        CapitalReduction = 9,
        CertificateExchange = 10,
        ClassAction = 11,
        CompanyMeeting = 12,
        Consolidation = 13,
        ConversionTerms = 14,
        ConversionTermsChange = 15,
        CurrencyDenomination = 16,
        Demerger = 17,
        Distribution = 18,
        Divestment = 19,
        Dividend = 20,
        DividendReinvestmentPlan = 21,
        Entitlement = 22,
        FinancialYearChange = 23,
        Franking = 24,
        IncorporationChange = 25,
        ISINCodeChange = 26,
        IssuerNameChange = 27,
        Liquidation = 28,
        ListingStatusChange = 29,
        LocalCodeChange = 30,
        LotChange = 31,
        Merger = 32,
        NewListing = 33,
        PerValueDenomination = 34,
        PreferentialOffer = 35,
        PurchaseOffer = 36,
        RedemptionTerms = 37,
        ReturnOfCapital = 38,
        Rights = 39,
        SecurityDescriptionChange = 40,
        SecurityReclassification = 41,
        SecuritySwap = 42,
        SedolChange = 43,
        Subdivision = 44,
        Takeover = 45,
        Adjustment = 46,
        Result = 47,
        CapitalMarketDay = 48,
        InterimReport = 49,
        MacroPriority1 = 1001,
        MacroPriority2 = 1002,
        MacroPriority3 = 1003,
        MacroUnknown = 1099,
    }
    enum CalendarCategory {
        Announcement = 1,
        ResultDividend = 2,
        CorporateAction = 3,
        IPO = 4,
        Dividends = 5,
        Results = 6,
        MacroGeneral = 1001,
        MacroAuction = 1002,
        MacroUnknown = 1003,
    }
}
declare namespace IDS {
    enum DataType {
        IdsInt = 0,
        Float = 1,
        Double = 2,
        Int32 = 3,
        BCD = 4,
        DeltaBCD = 5,
        DeltaIdsInt = 6,
        String = 17,
        Binary = 22,
        Int64 = 26,
        Null = 32,
        NullWithoutData = 4660,
    }
    enum HeaderTags {
        PID = 1,
        SeqNu = 2,
        Access = 4,
        SID = 7,
        Request = 8,
        ResponseId = 9,
        Response = 10,
        UserData = 11,
        LoginId = 12,
        ReplyNu = 13,
        TickCount = 17,
        RtSeqNu = 21,
        AppNumber = 23,
        AppVersion = 24,
        Compress = 25,
        UnCompressLen = 26,
        UniqueId = 39,
        Properties = 59,
        TemplStartTags = 27,
        TemplTag = 14,
        TemplDataType = 15,
        TemplAccess = 40,
        End = 63,
    }
    function HeaderTagsToStr(value: HeaderTags): "PID" | "SeqNu" | "Access" | "SID" | "Request" | "ResponseId" | "Response" | "UserData" | "LoginId" | "ReplyNu" | "TickCount" | "RtSeqNu" | "AppNumber" | "AppVersion" | "Compress" | "UnCompressLen" | "UniqueId" | "Properties" | "TemplStartTags" | "TemplTag" | "TemplDataType" | "TemplAccess" | "End";
    enum HeaderRequests {
        Ping = 0,
        LoginProvider = 1,
        CloseConnection = 2,
        StartRealtime = 3,
        Subscribe = 4096,
        Unsubscribe = 4097,
        ChangeSubscriptions = 4100,
        LoginAuthentication = 4101,
    }
    enum HeaderResponses {
        Ok = 0,
        ErrLogin = 1,
        NotLoggedIn = 2,
        NoAccess = 3,
        Error = 4,
        ExcludeUser = 5,
        Restart = 6,
        RestartPS = 9,
        ReqCrypto = 10,
        NoData = 12,
    }
    enum EndUserApplications {
        AppnuUnknown = 0,
        AppnuTheonlinetrader = 1,
        AppnuWebquote = 2,
        AppnuXquote = 3,
        AppnuMtrader = 4,
        AppnuIpad = 5,
        AppnuWebToolkit = 6,
        AppnuWebToolkitDirect = 7,
        AppnuExcelContribution = 8,
    }
    function HeaderResponsesToStr(value: HeaderResponses): string;
}
declare namespace IDS {
    enum LoginTags {
        Separator = 0,
        Login = 5,
        Password = 6,
        PID = 8,
        LoginId = 9,
        ProviderName = 10,
        SID = 11,
        ServiceName = 12,
        Host = 13,
        Port = 14,
        ConnectionType = 15,
        AccessFeed = 16,
        Tag = 35,
        ColNu = 36,
        Length = 37,
        Attributes = 39,
        OwnerProviderId = 74,
        SupportEmail = 53,
        LoginServers = 91,
        PrivateNetworkId = 150,
        HelpUrl = 17,
        PublicKey = 7,
        UserType = 77,
        Info1 = 18,
        Info2 = 19,
        Info3 = 20,
        Info4 = 21,
        Info5 = 22,
        Url2 = 23,
        FreeService = 24,
        TagSet = 32,
        Encrypt = 119,
        ServiceType = 106,
        Country = 25,
        ExchCode = 26,
        FeedContent = 27,
        Feed = 28,
        FeedDescription = 31,
        MainIndex = 40,
        FullName = 52,
        Address = 54,
        Phone = 55,
        AccessExp = 57,
        AppVersion = 59,
        ForceUpgradeVer = 60,
        UpgradeDescr = 61,
        FileDate = 62,
        UpgradePath = 63,
        Priority = 64,
        MainIndexFeed = 151,
        StartTime = 79,
        EndTime = 80,
        IpAddr = 82,
        RemoteIp = 179,
        BrokerCode = 84,
        BrokerDescr = 85,
        BrokerMainUrl = 86,
        BrokerCountry = 87,
        DbHint = 88,
        ChangeDate = 89,
        BrokerProperties = 90,
        WrapToFeed = 93,
        GetFromFeed = 95,
        UnderlyingFeed = 105,
        OptionsFeed = 161,
        ParentFeed = 154,
        GmtFeedOffset = 128,
        GmtLocalOffset = 129,
        Language = 132,
        TickFromPrice = 121,
        TickToPrice = 122,
        TickSize = 123,
        TickSizeId = 136,
        RtType = 143,
        RtSubType = 144,
        LimitApp = 146,
        LogoNumber = 147,
        AppName = 148,
        VolIndex = 153,
        VolIndexFeed = 152,
        AdditionalInfo = 56,
        MarketCodeReuters = 157,
        MarketCodeMic = 158,
        FeedProperties = 44,
        DefaultDecimals = 38,
        DefaultContractSize = 124,
        MinDelaySeconds = 111,
        MaxDelaySeconds = 112,
        FeedDescrUrl = 127,
        MaxMblLevels = 162,
        SsoToken = 180,
        AppNu = 58,
        Marketplace = 120,
        ExpireDate = 78,
        ExpireTime = 80,
        CustomerId = 163,
        CustomerId2 = 164,
        CustomCode = 182,
        AuthVersion = 183,
        Signature = 184,
        Thumbprint = 185,
        Uuid = 186,
        Namespace = 187,
        ExtLoginId = 188,
        SetupTemplateNumber = 20492,
        SetupTemplateTag = 20493,
        SetupTemplateDataType = 20494,
        SetupTemplateStaticData = 20495,
        SetupTemplateEnd = 20497,
        NotifyUser = 149,
        EditUserData = 131,
    }
    enum LoginRequests {
        Ping = 0,
        Login = 5,
        Providers = 6,
        ProviderAccess = 7,
        Logout = 8,
        Exchanges = 9,
        ProvFeeds = 12,
        Columns = 15,
        ExternalLinks = 35,
        Marketplaces = 37,
        TickSize = 38,
        VideoLink = 40,
        TranslateFeed = 49,
        Authentication = 50,
        IASLoginDone = 28,
    }
    enum ServiceType {
        Realtime = 0,
        Delayed = 1,
        Historical = 2,
        Chat = 3,
        OrderEntry = 4,
        Internal = 5,
        Mngmt = 6,
        File = 7,
        Spool = 8,
        Fundamentals = 9,
        Symbols = 10,
        SpoolDist = 11,
        Logger = 12,
        NewsContrib = 13,
        Storage = 14,
        StorageUpload = 15,
        Chains = 16,
        OeMngmt = 17,
        OwnOrders = 18,
        AuxiliaryData = 19,
        Calendar = 20,
        IndexWeight = 21,
        OeMonitoring = 22,
        OrderMonitor = 23,
        Im = 24,
        FxTrading = 25,
        FreeTextSearch = 26,
        Calc = 27,
        Consolidated = 28,
        CommunicationsDirectory = 29,
        RemoteControl = 30,
        Alert = 31,
        AccHistCalcHist = 32,
        SymbolsExtra = 33,
        MotionDetection = 34,
        RemoteControlMaster = 35,
        Feedback = 36,
        News = 37,
        SymbolMapping = 37,
        PortfolioTracker = 38,
        PriceContribution = 39,
        Kid = 40,
        UserStats = 41,
        Wire = 48,
    }
    function serviceTypeToStr(value: ServiceType): string;
    enum Info1 {
        BrowserStory = 1,
        HtmlStory = 2,
        UseUtf8 = 4,
        DisableImpliedPrices = 8,
    }
    function info1ToStr(value: Info1): string;
    enum Info2 {
        OeOneDayOrder = 1,
        OeNoMyOrders = 4096,
        OeReqPin = 8192,
        OeHtmlLogin = 16384,
        OeNoPassword = 32768,
        OeInteractiveHtmlLogin = 65536,
        OeBranding = 131072,
        OeReqMobile = 262144,
        OeSuppGetLoginMethods = 524288,
        OeKidRequired = 1048576,
        OeKidIHaveRead = 2097152,
        OeNoKidBlocksTrading = 4194304,
        OeRiskLevelBreachBlocksTrading = 8388608,
        OeIdsJsCertified = 16777216,
        ChatNoAlias = 1,
    }
    function info2ToStr(value: Info2): string;
    enum Info3 {
        FullSsl = 1,
        ClientCert = 2,
        CertInFile = 4,
    }
    function info3ToStr(value: Info3): string;
    enum Info4 {
        OnlySsl3 = 1,
        TLS12 = 2,
    }
    function info4ToStr(value: Info4): string;
    enum TagSet {
        Login = 0,
        Realtime = 1,
        Chat = 2,
        OrderEntry = 3,
        File = 4,
        Fundamental = 8,
        Calendar = 10,
        FreeForm = 11,
        Communications = 12,
        RemoteSupport = 13,
        Alert = 15,
        Feedback = 16,
        Wire = 17,
    }
}
declare namespace IDS {
    type AllRealtimeFundTags = RealtimeContributedFundTags | RealtimeFundTags;
    type IdsTag = RealtimeTags | RealtimeDateTime | MwsRealtimeTags | PerformanceTags | MorningstarSEKPerformanceTags | AllRealtimeFundTags | ForwardCurve | RealtimeCalculatedHistoryTags | TickSizeTags;
    type TagOrComputed = IdsTag | string;
    type ForwardCurveTag = IDS.ForwardCurve;
    enum RealtimeType {
        Trade = 1,
        Static = 2,
        NewsText = 3,
        RankInc = 9,
        RankDec = 10,
        RankTurnover = 11,
        DeferredTrade = 12,
        AuctionEquilibrium = 20,
        Cust_1_Inc = 40,
        Cust_1_Dec = 41,
        Cust_2_Inc = 42,
        Cust_2_Dec = 43,
        Cust_3_Inc = 44,
        Cust_3_Dec = 45,
        Cust_4_Inc = 46,
        Cust_4_Dec = 47,
        Cust_5_Inc = 48,
        Cust_5_Dec = 49,
    }
    enum RealtimeDateTime {
        Date = 31,
        TradeTime = 17,
        ActualTradeDate = 627,
        ActualTradeTime = 626,
        DivDate = 532,
        IssueDate = 8238,
        AdjustDate = 4131,
        NewsExpiryDate = 768,
        NewsExpiryTime = 769,
        NewsAlertTime = 770,
        LAST_TRADE_DATE = 1544,
        LAST_TRADE_DATE_DIV = 1579,
        TradeDate = 1805,
        reportDate = 8449,
        UsTime = 83,
        MsTime = 84,
        BidTime = 86,
        AskTime = 87,
        StartOfIndexPeriod = 1049,
        EndOfIndexPeriod = 1056,
        MaturityDate = 8228,
        FirstCouponDate = 8475,
        NextCouponDate = 8777,
        BondFixingDate = 8780,
        EstimatesReportedDate = 8529,
        StartDateEstimate = 8530,
        EndDateEstimate = 8531,
        StartDateReported = 8532,
        EndDateReported = 8533,
    }
    enum RealtimeCalculatedHistoryTags {
        MovingAverage = 1,
        ExponentialMovingAverage = 2,
        VolumeWeigtehAveragePrice = 3,
        AverageDailyVolume = 4,
        StdDevOfDailyVolume = 5,
        AverageDailyExchangeVolume = 6,
        StdDevOfExchangeVolume = 7,
        LinearRegressionSlopeOfLastPrice = 8,
        StdDevOfLastPrice = 9,
        SimpleAvgOfLastPrice = 10,
        StdDevOfDailyChange = 11,
        AvgDailyChange = 12,
        LinearRegressionSlopeOfLastStderr = 13,
        LinearRegressionSlopeOfLastPredict = 14,
        LastVolatility = 15,
        LnDeltaCount = 16,
        LnDeltaSum = 17,
        LnDeltaSquareSum = 18,
        AvgTrueRange = 19,
        AvgBid = 20,
        AvgAsk = 21,
        AvgTurnover = 22,
        AvgDivYieldFactor = 23,
        CalculatedHistoryType = 8576,
        CalculatedHistoryParam = 8577,
        CalculatedHistoryValue = 8578,
    }
    enum IsDateTag {
        StartOfIndexPeriod = 1049,
        EndOfIndexPeriod = 1056,
        MaturityDate = 8228,
        FirstCouponDate = 8475,
        IssueDate = 8238,
        LastTradeDate = 1544,
        NextCouponDate = 8777,
        BondFixingDate = 8780,
        EstimatesReportedDate = 8529,
        StartDateEstimate = 8530,
        EndDateEstimate = 8531,
        StartDateReported = 8532,
        EndDateReported = 8533,
    }
    enum RealtimeTags {
        Separator = 0,
        EOP = 1,
        Type = 2,
        TemplateNu = 47,
        TemplatePMap = 56,
        RepeatedTemplates = 60,
        Symbol = 5,
        Feed = 6,
        Subscribe = 66,
        Unsubscribe = 67,
        AcVolume = 16,
        YestClose = 14,
        YestBidClose = 15,
        Open = 23,
        High = 24,
        Low = 25,
        SourceSeqnu = 18,
        Last = 9,
        Yield = 35,
        IncVolume = 10,
        IsTradable = 1152,
        IsTrade = 28,
        TradeSeparator = 46,
        Market = 52,
        TradeId = 41,
        Buyer = 12,
        Seller = 13,
        TrTypeNu = 50,
        TrTypeStr = 11,
        HitterTaker = 568,
        OnExchVolume = 70,
        OnExchTurnover = 71,
        Turnover = 26,
        YYield = 73,
        YBidYield = 74,
        YyLast = 76,
        YAsk = 58,
        BidYield = 36,
        AskYield = 37,
        BaReset = 259,
        NuBids = 42,
        NuAsks = 43,
        BidAnalytics = 79,
        AskAnalytics = 80,
        TradeAnalytics = 81,
        BaLevel = 40,
        OrderId = 44,
        Bid = 7,
        Ask = 8,
        BidSize = 33,
        AskSize = 34,
        BaBroker = 75,
        BaBuyerId = 617,
        BaSellerId = 618,
        BaBuyMarket = 628,
        BaAskMarket = 629,
        CleanBid = 581,
        CleanAsk = 582,
        BidModifier = 583,
        AskModifier = 584,
        LastModifier = 585,
        CleanOpen = 586,
        CleanHigh = 587,
        CleanLow = 588,
        CleanLast = 589,
        SymbolDbNumber = 522,
        StaticCRC = 523,
        Currency = 521,
        SymbolType = 518,
        SymbolSubType = 513,
        FullName = 29,
        ISIN = 30,
        ExchangeSymbol = 8200,
        Issuer = 8461,
        Sector = 8197,
        SubSector = 8253,
        InfrontSector = 632,
        InfrontSectorName = 9124,
        InfrontSectorDescription = 9125,
        InfrontSectorDefinition = 103,
        PrimarySegment = 8199,
        SecondarySegment = 8198,
        PrimarySegmentDescription = 8244,
        SecondarySegmentDescription = 8246,
        Leverage = 8241,
        MIC = 8245,
        Country = 8194,
        SymbolStatus = 38,
        SymbolStatusText = 549,
        BoardLot = 530,
        NuShares = 531,
        SharesPerOption = 550,
        OpenInterest = 515,
        PhysicalUnit = 9345,
        SectorId = 8213,
        ContractSize = 8216,
        NotForDisplay = 8224,
        UnderlyingFeed = 543,
        UnderlyingTicker = 544,
        UnderlyingBase = 572,
        UnderlyingDescr = 8226,
        Expiry = 514,
        Strike = 512,
        TickId = 565,
        TickTo = 566,
        TickSize = 567,
        Multiplier = 580,
        EarningsYield = 630,
        DividendYield = 631,
        Settle = 526,
        FundBaseCurrency = 8595,
        FundType = 8468,
        IssuerFullName = 8469,
        EpsEstimate = 8470,
        EbitEstimate = 8471,
        Eps = 8483,
        NetSales = 8484,
        NetSalesEstimate = 8485,
        NetProfit = 8486,
        NetProfitEstimate = 8487,
        Ebit = 8488,
        Ebitda = 8489,
        EbitdaEstimate = 8490,
        Pe = 8491,
        PeEstimate = 8492,
        FundIncomeType = 8276,
        FundProspectiveBookValueYield = 8278,
        FundInvestmentStyle = 8743,
        MorningstarRating = 8713,
        MorningstarRating3Y = 8714,
        MorningstarSecId = 8740,
        FundOngoingCharge = 8760,
        FundAnnualReportDate = 8761,
        FundManagementFee = 1607,
        FundActualManagementFee = 1608,
        FundPortfolioManager = 8275,
        FundRegionExposure = 8742,
        FundRiskMeasure = 8741,
        FundTopHolding = 8277,
        FundTotalExpense = 8750,
        FundTotalAssets = 8751,
        FundStdDev1Year = 8744,
        FundStdDev3Years = 8745,
        FundStdDev5Years = 8746,
        NetAssetValue = 8585,
        PERF_SOY = 1625,
        PERF_1D = 1631,
        PERF_1W = 1619,
        PERF_1M = 1620,
        PERF_3M = 1621,
        PERF_6M = 1622,
        PERF_1Y = 1626,
        PERF_2Y = 1627,
        PERF_3Y = 1628,
        PERF_5Y = 1629,
        PERF_10Y = 1630,
        FundNameSwedish = 8637,
        AmortizationType = 8472,
        FxCurrency1 = 8502,
        FxCurrency2 = 8503,
        FxTenor = 8497,
        BloombergTicker = 8624,
        BloombergGlobalId = 8625,
        BloombergGlobalIdComposite = 8626,
        NextDividendValue = 8627,
        NextDividendDate = 8628,
        NextDividendCurrency = 8629,
        BondApproxYield = 8757,
        BondType = 8563,
        CurrentCoupon = 8721,
        CouponRate = 536,
        CouponsPerYear = 8239,
        CouponType = 8564,
        BondDescription = 8788,
        ExpiryType = 8592,
        IssuerId = 8970,
        IssuerIndustry = 2052,
        IssuerIsin = 8968,
        BondMainType = 8787,
        BondMinDenomination = 8756,
        OfficialClose = 8593,
        OfficialCloseDate = 8594,
        InfinancialsSector = 8599,
        EusipaCode = 9054,
        BasisPointSpread = 9068,
        SearchFreeText = 8575,
        FreeTextTagMustMatch = 8596,
        SearchItemType = 8591,
        SearchRangeTag = 8640,
        SearchRangeLowerLimit = 8642,
        SearchRangeUpperLimit = 8643,
        SearchEmptyTag = 8978,
        IndexDescription = 8712,
        SortNu = 517,
        CompanyId = 8608,
        CompanyURL = 8609,
        CompanyName = 8612,
        UseTag = 1291,
        OptionSearch = 1290,
        StartDate = 545,
        StopDate = 546,
        StartTime = 1299,
        StopTime = 1300,
        CacheSerialNu = 12288,
        AdjustValue = 4129,
        Dividend = 533,
        DividendCurrency = 571,
        SetupTemplateNumber = 20492,
        SetupTemplateTag = 20493,
        SetupTemplateDataType = 20494,
        SetupTemplateStaticData = 20495,
        MaxItems = 1289,
        ChainFeed = 8219,
        ChainName = 8214,
        ChainDescr = 8215,
        ChainType = 8221,
        ChainHierarchy = 8581,
        ProviderId = 8236,
        PriceDisplay = 8222,
        MinimumIcebergSize = 8556,
        MinimumIcebergValue = 8559,
        MarketCap = 4105,
        Theoretical = 4106,
        Delta = 4107,
        Elast = 4112,
        TradesStart = 1283,
        TradesEnd = 1284,
        TradeResolutionType = 1285,
        TradeResolution = 1286,
        DaysBack = 1287,
        NumberOfDays = 1303,
        ResetFeed = 542,
        ResetSymbol = 258,
        RankOperation = 806,
        FullMmt = 57,
        CompressedMmt = 59,
        ESMA_Trade_Type = 1314,
        ESMAType = 9232,
        RSI14Gain = 8493,
        RSI14Loss = 8494,
        RSI14Periods = 8495,
        YVolume = 9120,
        YTurnover = 9121,
        YExchangeVolume = 9122,
        YExchangeTurnover = 9123,
        IndicTrade = 551,
        IndicIncVol = 552,
        IndicHigh = 553,
        IndicLow = 554,
        Nms = 555,
        IndicOpen = 556,
        IndicOpenVol = 557,
        ParticipationLevel = 1057,
        BreakEven = 1058,
        AsianAverage = 1059,
        EstimatesCurrency = 8528,
        CalculatedHistoryType = 8576,
        Change = 4096,
        BidChange = 4097,
        ChangePct = 4098,
        BidChangePct = 4099,
        OpenChange = 4122,
        OpenChangePct = 4123,
        LastTradedAt = 1545,
        AdjustMode = 1616,
        HistFieldsMode = 1617,
        NoiiFlag = 4147,
        NoiiBid = 4148,
        NoiiAsk = 4149,
        NoiiBidSize = 4150,
        NoiiAskSize = 4151,
        OrderbookMoves = 64,
        TradeMoves = 65,
        UsTime = 83,
        MsTime = 84,
        Last5MinsAgo = 85,
        Language = 1297,
        SimplifiedJson = 8689,
        ClientTheme = 9317,
        ExchInstrType = 8247,
        FileName = 4153,
        PingResolution = 637,
        PingSource = 638,
        PingData = 639,
        CheckpointPhase1 = 20485,
        CheckpointPhase2 = 20486,
        CheckpointPhase3 = 20487,
        SetupTimezone = 20488,
        SpoolSourceProcess = 20489,
        SpoolSourceMachine = 20490,
        RecommendationType = 1063,
        MaxChartLookupDays = 1315,
        AverageDailyTurnover = 12872,
        AverageDailyVolume = 9236,
        DayCountConvention = 8480,
        BondReferenceRate = 8722,
        BondFaceValue = 8723,
        BondTrusteeCompany = 8724,
        BondPayingCompany = 8725,
        BondIssueType = 8726,
        BondDirtyPrice = 8727,
        BondCouponReferenceFeed = 8728,
        BondCouponReferenceSymbol = 8729,
        BondCouponSpread = 8730,
        BondOption = 8731,
        BondNextPutDate = 8733,
        BondNextCallDate = 8734,
        BondNextCouponAdjustmentDate = 8735,
        BondRedemptionPrice = 8737,
        TradeSizeInitial = 8964,
        TradeSizeIncrement = 8965,
        NumSettlementDays = 8966,
        PriceType = 8967,
        IssuerISIN = 8968,
        CountryOfIncorporation = 8969,
        InfrontYield = 2340,
        InfrontBidYield = 2341,
        InfrontAskYield = 2342,
        InfrontYYield = 2343,
        InfrontISpread = 2344,
        InfrontGSpread = 2345,
        InfrontZSpread = 2346,
        InfrontYieldChange = 2347,
        BullBearComparison = 1344,
        BullBearGearing = 1345,
        ManagementFee = 1607,
        LeverageForTurbos = 8241,
        PERF_SINCE_INCEPTION = 1632,
        PayDay = 9383,
        StartPrice = 1346,
    }
    enum PriceDisplay {
        Display_default = 0,
        Display_0decimals = 1,
        Display_1decimals = 2,
        Display_2decimals = 3,
        Display_3decimals = 4,
        Display_4decimals = 5,
        Display_5decimals = 6,
        Display_6decimals = 7,
        Display_7decimals = 8,
        Display_8decimals = 9,
    }
    enum ESMATypes {
        Undefined = 0,
        Liquid = 1,
        NoneLiquid = 2,
    }
    enum AuctionTags {
        AuctionTime = 590,
        AuctionState = 591,
        Auction1Volume = 574,
        Auction1Price = 575,
        Auction2Volume = 576,
        Auction2Price = 577,
        Auction3Volume = 578,
        Auction3Price = 579,
        AuctionType = 8248,
    }
    enum NewsTags {
        Headline = 19,
        Id = 20,
        SymbolFeed = 21,
        Symbol = 22,
        Text = 27,
        StoryNu = 39,
        Isin = 256,
        FgColor = 260,
        BgColor = 261,
        StoryURL = 519,
        Flash = 548,
        Category = 559,
        PNAC = 560,
        Flags = 563,
        AlertType = 771,
        AlertText = 772,
        Topic = 1294,
        Industry = 1295,
        Country = 1296,
        Language = 1297,
        ProductCode = 1305,
        MoneyCode = 1306,
        StatisticsCode = 1307,
        GovernmentCode = 1308,
        Author = 1309,
        NewsEnd = 8705,
        StreamingId = 8707,
    }
    enum PerformanceTags {
        LAST_1W = 1536,
        LAST_1M = 1537,
        LAST_3M = 1538,
        LAST_6M = 1539,
        LAST_1Y = 1540,
        LAST_SOW = 1541,
        LAST_SOM = 1542,
        LAST_SOY = 1543,
        LAST_TRADE = 1545,
        HIGH_1W = 1546,
        HIGH_1M = 1547,
        HIGH_3M = 1548,
        HIGH_6M = 1549,
        HIGH_1Y = 1550,
        LOW_1W = 1551,
        LOW_1M = 1552,
        LOW_3M = 1553,
        LOW_6M = 1554,
        LOW_1Y = 1555,
        LAST_2Y = 1556,
        LAST_3Y = 1557,
        LAST_5Y = 1558,
        HIGH_2Y = 1559,
        HIGH_3Y = 1560,
        HIGH_5Y = 1561,
        LOW_2Y = 1562,
        LOW_3Y = 1563,
        LOW_5Y = 1564,
        HIGH_SOW = 1565,
        HIGH_SOM = 1566,
        HIGH_SOY = 1567,
        LOW_SOW = 1568,
        LOW_SOM = 1569,
        LOW_SOY = 1570,
        VOL_1W = 1649,
        VOL_1M = 1650,
        VOL_3M = 1651,
        VOL_6M = 1652,
        VOL_1Y = 1653,
        VOL_2Y = 1654,
        VOL_3Y = 1655,
        VOL_5Y = 1657,
        VOL_SOW = 1658,
        VOL_SOM = 1659,
        VOL_SOY = 1660,
        DAYCOUNT_1W = 1665,
        DAYCOUNT_1M = 1666,
        DAYCOUNT_3M = 1667,
        DAYCOUNT_6M = 1668,
        DAYCOUNT_1Y = 1669,
        DAYCOUNT_2Y = 1670,
        DAYCOUNT_3Y = 1671,
        DAYCOUNT_5Y = 1673,
        DAYCOUNT_SOW = 1674,
        DAYCOUNT_SOM = 1675,
        DAYCOUNT_SOY = 1676,
        YIELD_1W = 1713,
        YIELD_1M = 1714,
        YIELD_3M = 1715,
        YIELD_6M = 1716,
        YIELD_1Y = 1717,
        YIELD_2Y = 1718,
        YIELD_3Y = 1719,
        YIELD_5Y = 1721,
        YIELD_SOW = 1722,
        YIELD_SOM = 1723,
        YIELD_SOY = 1724,
        RSI14_GAIN = 8493,
        RSI14_LOSS = 8494,
        RSI14_PERIODS = 8495,
        LAST_1W_DIV = 1571,
        LAST_1M_DIV = 1572,
        LAST_3M_DIV = 1573,
        LAST_6M_DIV = 1574,
        LAST_1Y_DIV = 1575,
        LAST_SOW_DIV = 1576,
        LAST_SOM_DIV = 1577,
        LAST_SOY_DIV = 1578,
        LAST_TRADE_DIV = 1580,
        HIGH_1W_DIV = 1581,
        HIGH_1M_DIV = 1582,
        HIGH_3M_DIV = 1583,
        HIGH_6M_DIV = 1584,
        HIGH_1Y_DIV = 1585,
        LOW_1W_DIV = 1586,
        LOW_1M_DIV = 1587,
        LOW_3M_DIV = 1588,
        LOW_6M_DIV = 1589,
        LOW_1Y_DIV = 1590,
        LAST_2Y_DIV = 1591,
        LAST_3Y_DIV = 1592,
        LAST_5Y_DIV = 1593,
        HIGH_2Y_DIV = 1594,
        HIGH_3Y_DIV = 1595,
        HIGH_5Y_DIV = 1596,
        LOW_2Y_DIV = 1597,
        LOW_3Y_DIV = 1598,
        LOW_5Y_DIV = 1599,
        HIGH_SOW_DIV = 1600,
        HIGH_SOM_DIV = 1601,
        HIGH_SOY_DIV = 1602,
        LOW_SOW_DIV = 1603,
        LOW_SOM_DIV = 1604,
        LOW_SOY_DIV = 1605,
        VOL_1W_DIV = 1633,
        VOL_1M_DIV = 1634,
        VOL_3M_DIV = 1635,
        VOL_6M_DIV = 1636,
        VOL_1Y_DIV = 1637,
        VOL_2Y_DIV = 1638,
        VOL_3Y_DIV = 1639,
        VOL_5Y_DIV = 1641,
        VOL_SOW_DIV = 1642,
        VOL_SOM_DIV = 1643,
        VOL_SOY_DIV = 1644,
        RSI14_GAIN_DIV = 8499,
        RSI14_LOSS_DIV = 8500,
        RSI14_PERIODS_DIV = 8501,
    }
    enum MorningstarSEKPerformanceTags {
        SEK_PERF_SOY = 1696,
        SEK_PERF_1M = 1697,
        SEK_PERF_3M = 1698,
        SEK_PERF_6M = 1699,
        SEK_PERF_1Y = 1700,
        SEK_PERF_2Y = 1701,
        SEK_PERF_3Y = 1702,
        SEK_PERF_5Y = 1703,
        SEK_PERF_10Y = 1704,
        SEK_PERF_1D = 1705,
        SEK_PERF_1W = 1706,
        SEK_PERF_SINCE_INCEPTION = 1707,
    }
    enum CompanyTags {
        id = 8608,
        descr = 8448,
        capital = 8450,
        shortTermDebt = 8451,
        longTermDebt = 8452,
        revenue = 8453,
        earnings = 8454,
        url = 8609,
        peerFeed = 8610,
        peerSymbol = 8611,
        name = 8612,
        source = 8613,
        beta_1Y = 8614,
        indexFeed = 8616,
        indexSymbol = 8615,
        enterpriseValue = 8617,
        enterpriseCurrency = 8618,
        infinancialsSectorCode = 8619,
        primaryShares = 8620,
        secondaryShares = 8621,
        CEO = 8622,
        chairman = 8623,
        officer1Name = 8656,
        officer1Title = 8657,
        officer2Name = 8658,
        officer2Title = 8659,
        officer3Name = 8660,
        officer3Title = 8661,
        officer4Name = 8662,
        officer4Title = 8663,
        officer5Name = 8664,
        officer5Title = 8665,
    }
    enum FundamentalTags {
        Source = 9472,
        Item = 9473,
        Period = 9474,
        PeriodDisplay = 9475,
        Actual = 9476,
        EstimateMean = 9477,
        EstimateMedian = 9478,
        EstimateHigh = 9479,
        EstimateLow = 9480,
        EstimateCount = 9481,
        EstimateDeviation = 9482,
    }
    enum BrokerStatTags {
        broker = 592,
        descr = 593,
        someUnknownFlag = 594,
        nuBuys = 595,
        nuSells = 596,
        nuInternal = 597,
        buyVolume = 598,
        sellVolume = 599,
        intVolume = 600,
        buyTurnover = 601,
        sellTurnover = 602,
        intTurnover = 603,
        openBuy = 604,
        highBuy = 605,
        lowBuy = 606,
        lastBuy = 607,
        openSell = 608,
        highSell = 609,
        lowSell = 610,
        lastSell = 611,
        openInt = 612,
        highInt = 613,
        lowInt = 614,
        lastInt = 615,
        BrokerId = 616,
        BuyerId = 617,
        SellerId = 618,
        accumulateFlag = 619,
        nuHitBid = 620,
        hitBidVolume = 621,
        hitBidTurnover = 622,
        nuHitAsk = 623,
        hitAskVolume = 624,
        hitAskTurnover = 625,
    }
    enum RealtimeFundTags {
        PortfolioManager = 8275,
        IncomeType = 8276,
        TopHolding = 8277,
        ProspectiveBookValueYield = 8278,
        ProspectiveDividendYield = 8279,
        TransferAgents = 8280,
        IsLeverageFund = 8281,
        HistoricDividendYield = 8282,
        Alpha12M = 8283,
        Beta12M = 8284,
        TrackingError12M = 8285,
        TreynorRatio12M = 8286,
        InformationRatio12M = 8287,
        AnalystRating = 8288,
        SharpeRatio = 8600,
        AnnualizedTotal3Year = 8601,
        AnnualizedTotal5Year = 8602,
        MorningstarRefIndex = 8603,
        ReferenceFeed = 9376,
        ReferenceSymbol = 9377,
        SustainabilityRating = 9237,
        SustainabilityRatingDate = 9238,
    }
    enum RealtimeContributedFundTags {
        Id = 30000,
        FundManager = 30002,
        Sustainability = 30003,
        BuyButton = 30004,
        Fee = 30005,
        Risk = 30006,
        Recommendation = 30007,
        MainSupply = 30008,
        FundText = 30009,
        StandardTexts = 30010,
        Currency = 30011,
        RecommendationTexts = 30012,
        Products = 30013,
        Links = 30014,
        UnderlyingPrice = 30032,
        MetaData_00 = 30032,
        MetaData_01 = 30033,
        MetaData_02 = 30034,
        MetaData_03 = 30035,
        MetaData_04 = 30036,
        MetaData_05 = 30037,
        MetaData_06 = 30038,
        MetaData_07 = 30039,
        MetaData_08 = 30040,
        MetaData_09 = 30041,
        MetaData_10 = 30042,
        MetaData_11 = 30043,
        MetaData_12 = 30044,
        MetaData_13 = 30045,
        MetaData_14 = 30046,
        MetaData_15 = 30047,
        MetaData_16 = 30048,
        MetaData_17 = 30049,
        MetaData_18 = 30050,
        MetaData_19 = 30051,
        MetaData_20 = 30052,
        MetaData_21 = 30053,
        MetaData_22 = 30054,
        MetaData_23 = 30055,
        MetaData_24 = 30056,
        MetaData_25 = 30057,
        MetaData_26 = 30058,
        MetaData_27 = 30059,
        MetaData_28 = 30060,
        MetaData_29 = 30061,
        MetaData_30 = 30062,
        MetaData_31 = 30063,
    }
    enum MwsRealtimeTags {
        LastTradedAt = 268435456,
        Time = 268435457,
        LastTradeDate = 268435458,
        SymbolType = 268435459,
        SymbolSubType = 268435460,
        MarketPrice = 268435461,
    }
    const MwsRealtimeTagStart: MwsRealtimeTags;
    enum TradableType {
        TradableSHB = 4,
    }
    enum TrTypeNu {
        Auction = 1,
        ShortSell = 2,
        NoHighLow = 256,
        NoVolume = 512,
        Deleted = 1024,
        DeleteIDC = 2048,
        InsertIDC = 4096,
        UseLast = 8192,
        Modify = 16384,
        NoBrokerStats = 32768,
        MmtNegotiated = 65536,
        MmtCrossing = 131072,
        MmtBenchmark = 262144,
        MmtDelayed = 524288,
        MmtExCumDiv = 1048576,
        MmtOutsideSpread = 2097152,
        MmtRepo = 4194304,
        MmtOffbookAuto = 8388608,
        Equilibrium = 16777216,
        PreTrade = 33554432,
        PostTrade = 67108864,
        NoChartUpdate = 134217728,
    }
    enum TickSizeTags {
        Id = 565,
        ToPrice = 566,
        TickSize = 567,
    }
    enum RealtimeRequests {
        SymbolData = 10,
        AllSymbolData = 5,
        Symbols = 6,
        SymbolStatic = 26,
        History = 12,
        HistPerformance = 31,
        FindSymbol = 33,
        ChainList = 38,
        ChainContent = 39,
        Headlines = 8,
        NewsStory = 9,
        CompanyData = 69,
        CompanySymbols = 70,
        BrokerStat = 15,
        BrokerSymbolStat = 28,
        SymbolBrokerStat = 16,
        Trades = 7,
        Intraday = 27,
        TickSize = 49,
        Ranking = 32,
        FundJsonData = 95,
        FundJsonDataDetails = 105,
        FindPortfolioSymbols = 101,
        Fundamental = 102,
        CalculatedHistory = 63,
    }
    enum EnumTypes {
        Providers = 0,
        Exchanges = 1,
        ProvFeeds = 2,
        ProvFormat = 3,
        FeedTag = 5,
        Version = 6,
        FtpGotFile = 7,
        OwnerInfo = 8,
        Brokers = 9,
        Alert = 10,
        NewsTicker = 11,
        BrokerLinks = 12,
        ExternalLinks = 13,
        Marketplaces = 14,
        ProxyTypes = 15,
        Proxies = 16,
        TickSize = 17,
        FileDownload = 18,
        Videos = 20,
    }
    enum AdjustMode {
        Server = 1,
        Client = 2,
    }
    enum HistFieldsMode {
        Classic = 1,
        All = 2,
    }
    enum HitterTaker {
        None = 0,
        HitBid = 1,
        HitAsk = 2,
    }
    enum RankOperation {
        InsertOrUpdate = 0,
        Delete = 1,
        DeleteAll = 2,
    }
    enum RankType {
        Increase = 9,
        Decrease = 10,
        Turnover = 11,
        CUST_1_DESC = 40,
        CUST_1_ASC = 41,
        CUST_2_DESC = 42,
        CUST_2_ASC = 43,
        CUST_3_DESC = 44,
        CUST_3_ASC = 45,
        CUST_4_DESC = 46,
        CUST_4_ASC = 47,
        CUST_5_DESC = 48,
        CUST_5_ASC = 49,
    }
    enum DayCountConvention {
        Undefined = 0,
        Conv_30E_360 = 1,
        Conv_ACT_360 = 2,
        Conv_ACT_ACT = 3,
        Conv_30U_360 = 4,
        Conv_ACT_365_FIXED = 5,
        Conv_ACT_PER = 6,
        Conv_TBILL1 = 7,
        Conv_TBILL2 = 8,
        Conv_BSU_252 = 9,
        Conv_ACT_365_LEAP = 10,
        Conv_NONE = 11,
        Conv_ACT_ACT_ISMA_ULTIMO = 12,
        Conv_30_365 = 13,
    }
    enum Availability {
        BID = 1,
        ASK = 2,
        BOTH = 3,
    }
    enum ForwardCurve {
        Availability = 9280,
        Month1Bid = 9281,
        Month1Ask = 9282,
        Month2Bid = 9283,
        Month2Ask = 9284,
        Month3Bid = 9285,
        Month3Ask = 9286,
        Month4Bid = 9287,
        Month4Ask = 9288,
        Month5Bid = 9289,
        Month5Ask = 9290,
        Month6Bid = 9291,
        Month6Ask = 9292,
        Month7Bid = 9293,
        Month7Ask = 9294,
        Month8Bid = 9295,
        Month8Ask = 9296,
        Month9Bid = 9297,
        Month9Ask = 9298,
        Month10Bid = 9299,
        Month10Ask = 9300,
        Month11Bid = 9301,
        Month11Ask = 9302,
        Month12Bid = 9303,
        Month12Ask = 9304,
        ValueDate = 9305,
    }
    class RankSymbols {
        static Turnover: string;
        static Increase: string;
        static Decrease: string;
        static LargeCapIncrease: string;
        static LargeCapDecrease: string;
        static MidCapIncrease: string;
        static MidCapDecrease: string;
        static SmallCapIncrease: string;
        static SmallCapDecrease: string;
        static FirstNorthIncrease: string;
        static FirstNorthDecrease: string;
        static Custom5Inc: string;
        static Custom5Dec: string;
        static rankTypeToStr(rankType: RankType): string;
    }
    enum TemplateSetup {
        Number = 20492,
        Tag = 20493,
        DataType = 20494,
        StaticData = 20495,
    }
    function GetRankFeed(feed: number): number;
    function MakeMmt(m: number): string;
    function MakeEsma(mmt: string): string;
}
declare namespace IDS {
    import Instrument = Infront.Instrument;
    const MwsCacheTimestampField = "_cache_time_stamp";
    namespace FromMws {
        class PerfComputedTags {
            yest: number;
            today: number;
            percent: boolean;
            constructor(yest: number, today: number, percent: boolean);
        }
        class TagSet {
            normalTags: (RealtimeTags | PerformanceTags | MwsRealtimeTags | AllRealtimeFundTags | RealtimeDateTime | MorningstarSEKPerformanceTags | RealtimeCalculatedHistoryTags)[];
            computedTags: string[];
        }
        function Tags(mws: string[]): TagSet;
        function HistPerformanceTag(s: string): boolean;
        function ComputedPerformanceTag(s: string): PerfComputedTags;
        function ForwardCurves(s: string): ForwardCurve;
        function SplitInstrumentKey(key: string): Instrument;
        function LoginDataType(type: string): number;
        function StrToOrderType(orderTypeStr: string): OrderTypes;
        function StrToAlertType(alertTypeStr: string): AlertType;
        function StrToAlertTriggerType(triggerTypeStr: string): AlertTriggerType;
        function StrToAlertMdField(field: string): AlertMarketDataField;
        function StrToOperator(operator: string): AlertOperator;
    }
    namespace ToMws {
        function Tags(tags: number[]): string[];
        function ServiceTypeToStr(type: ServiceType): string;
        function HeadlineTypeToStr(type: MWSHeadlineType): string;
        function OrderTypeToStr(orderType: OrderTypes): string;
        function OrderStatusToStr(orderType: OrderStatus): string;
        function ParamTypeToStr(paramType: ParamType): "" | "FREE_TEXT" | "DOUBLE" | "STOP_PRICE" | "INIT_CODE" | "PARENT" | "DONE_CODE" | "VALID_SESSION" | "TIME" | "DATE" | "DATETIME" | "DROPDOWN" | "BOOL" | "INT" | "INSTRUMENT" | "PRICE" | "VOLUME_LOTS" | "MULTI_LINE";
        function AlertTypeToStr(type: AlertType): string;
        function AlertUpdateTypeToStr(type: AlertUpdateType): string;
        function AlertActionTypeToStr(type: AlertActionType): string;
        function AlertOperatorToStr(operator: AlertOperator): string;
        function AlertTriggerTypeToStr(triggerType: AlertTriggerType): string;
        function AlertMdFieldToStr(field: AlertMarketDataField): string;
        function AlertPortfolioDataFieldToStr(field: AlertPortfolioDataField): string;
    }
    class MWSChain {
        feed: number;
        name: string;
        description: string;
    }
    class MWSTradingInputField {
        key: string;
        label: string;
        may_persist: boolean;
        mask: boolean;
        keyboard: string;
        constructor(key: string, label: string, may_persist: boolean, mask: boolean, isNumeric: boolean);
    }
    class MWSTradingRoutes {
        name: string;
        provider: number;
        service: number;
        tradable_feeds: number[];
        input_fields: MWSTradingInputField[];
        constructor(info2: number);
        private addInputField(key, label, may_persist, mask, isNumeric);
    }
    class MWSFieldReference {
        cacheKey: string;
        fieldSpec: any;
    }
    class MWSHistoricalPerformance {
    }
    function MWSMakeFullDateTime(date: number, time: number, includeMilliSeconds?: boolean): string;
    function MWSMakeDate(date: number): string;
    enum MWSHeadlineType {
        FlashLevel1 = 0,
        FlashLevel2 = 1,
        FlashLevel3 = 2,
        Url = 3,
        Regular = 4,
    }
    class MWSTradeItem {
        last: number;
        volume: number;
        time: string;
        seq_id: number;
        buyer: string;
        seller: string;
    }
    class MWSTrade {
        instrument: Instrument;
        historical_performance: MWSHistoricalPerformance;
        change: number;
        last: number;
        last_valid: number;
        pct_change: number;
        time: string;
        volume: number;
        trades: MWSTradeItem[];
    }
    class MWSNewsSource {
        feed: number;
        name: string;
        region: number;
        short_name: string;
    }
    class MWSNewsRegion {
        code: number;
        description: string;
    }
    class MWSNewsSources {
        sources: MWSNewsSource[];
        regions: MWSNewsRegion[];
    }
    class MwsMarketInfo {
        access: string;
        country: number;
        countryCode: string;
        countryName: string;
        feed: number;
        max_delay_secs: number;
        min_delay_secs: number;
        provider: string;
        service: string;
        additional_info: string;
        data_types: string[];
        custom_codes: string[];
        trading: boolean;
        private pluralize(value, singular, plural);
        private getTimeStr(minutes);
        setAccessStr(): void;
    }
    function CountryIdToCode(id: number): string;
    function CountryIdToString(id: number): string;
    class MWSBuyOrSell {
        static BUY: string;
        static SELL: string;
        static isBuy(val: string): boolean;
        static isSell(val: string): boolean;
    }
    function LoginDataType(type: string): number;
}
declare namespace IDS {
    enum StorageRequest {
        Upload = 32,
        Download = 33,
        ChangeMetaData = 34,
        Browse = 35,
        AllCategories = 36,
        Delete = 37,
        CreateCategories = 38,
    }
    enum StorageTags {
        Separator = 0,
        Title = 256,
        Description = 257,
        Crc32 = 258,
        Size = 259,
        UniqueTitleLimit = 260,
        Category = 272,
        Property = 273,
        FilterCategory = 274,
        FilterProperty = 275,
        ExcludeCategory = 276,
        UserIdentifier = 279,
        UserNamespace = 280,
        CreatePolicy = 288,
        UniquePolicy = 289,
        DownloadPolicy = 290,
        CheckPolicy = 291,
        StorageCookie = 292,
        CreatedDate = 304,
        CreatedTime = 305,
        PublishDate = 306,
        PublishTime = 307,
        ExpiryDate = 308,
        ExpiryTime = 309,
        ContentId = 512,
        ContentData = 513,
        MultiPacket = 8496,
        ResponseCode = 8512,
        ResponseMessage = 8513,
    }
    enum StorageCreatePolicy {
        Ignore = 0,
        PropertyOnly = 1,
        CategoryOnly = 2,
        PropertyAndCategory = 3,
    }
    enum StorageUniquePolicy {
        CreateNew = 0,
        DeleteOld = 1,
        Category = 2,
        CategoryTitle = 3,
        CategoryUniqueTitle = 4,
    }
    enum StorageMultiPacket {
        Middle = 0,
        Begin = 1,
        End = 2,
        BeginAndEnd = 3,
    }
    enum StorageTypes {
        Mobile_List = "mobile-list",
        Market_List = "market-list",
        Option_List = "option-list",
    }
    enum StorageXmlTags {
        Symbollist = "Symbollist",
        IsPortfolio = "isportfolio",
        Account = "Account",
        PortfolioID = "PortfolioID",
        Currency = "Currency",
        Symbol = "Symbol",
        ReferenceIndex = "ReferenceIndexSymbol",
        FeedNu = "FeedNu",
        SymbolTicker = "SymbolTicker",
        HoldingSymbolType = "SymbolType",
        HoldingSubType = "SubType",
        HoldingGroup = "Group",
        HoldingWeight = "Weight",
        HoldingVolume = "Volume",
        HoldingAvgPrice = "AveragePrice",
        Feed = "Feed",
        Ticker = "Ticker",
        Provider = "provider",
        Service = "service",
    }
}
declare module Infront {
    enum SymbolType {
        None = 0,
        Stock = 1,
        News = 2,
        Bond = 4,
        EuroOption = 8,
        Futures = 16,
        Commodity = 32,
        Index = 64,
        Forex = 128,
        UsOption = 256,
        Funds = 512,
        Option = 1024,
        Combo = 2048,
        CFD = 4096,
        Certificate = 8192,
        Indicator = 16384,
        Unknown = 255,
    }
    enum SymbolSubType {
        Synthetic = -1,
        Unknown = 255,
        None = 0,
        OptionCall = 1,
        OptionPut = 2,
        OptionFuture = 3,
        OptionForward = 4,
        OptionCallWarrant = 5,
        OptionSecLending = 6,
        OptionPutWarrant = 7,
        OptionCalendarSpread = 8,
        OptionVolatilityTrade = 9,
        OptionBarrierCall = 10,
        OptionBarrierPut = 11,
        OptionBarrier = 12,
        OptionBarrierDownInCall = 13,
        OptionBarrierDownInPut = 14,
        OptionBarrierDownOutCall = 15,
        OptionBarrierDownOutPut = 16,
        OptionBarrierUpInCall = 17,
        OptionBarrierUpInPut = 18,
        OptionBarrierUpOutCall = 19,
        OptionBarrierUpOutPut = 20,
        BondConvertible = 32,
        BondPremium = 33,
        BondSwap = 34,
        BondUTC = 35,
        BondCertificate = 36,
        StockBonus = 64,
        StockRight = 65,
        StockSubscriptionOption = 66,
        ForexSpot = 96,
        ForexDeposit = 97,
        ForexFRA = 98,
        ForexForward = 99,
        ForexDepositIndicative = 100,
        ForexFreeFRA = 101,
        ForexOption = 102,
        OptionBinaryConCall = 128,
        OptionBinaryConPut = 129,
        OptionBinaryGapCall = 130,
        OptionBinaryGapPut = 131,
        OptionBinaryAonCall = 132,
        OptionBinaryAonPut = 133,
        OptionBinarySupershare = 134,
        OptionStock = 103,
        CertBasket = 144,
        CertDiscount = 145,
        CertLeverage = 146,
        CertBonus = 147,
        CertOther = 148,
        CertInvestment = 149,
        CertParticipation = 150,
        CertCashOrShare = 151,
        CertExpress = 152,
        CertGuarantee = 153,
        CertIndex = 154,
        CertOutperform = 155,
        CertSpread = 168,
        CertTurbo = 169,
        CertBalance = 156,
        CertBullBear = 157,
        CertLongShort = 158,
        CertMiniFuture = 159,
        CertIr = 160,
        CertCredit = 161,
        CertCoupon = 162,
        CertPremium = 163,
        CertGrowth = 164,
        CertTracker = 166,
        BondEquityIndex = 274,
        BondPortfolio = 275,
        BondHedge = 277,
        BondMarket = 278,
        BondCredit = 279,
        BondCommodity = 280,
        BondStrategy = 281,
        BondInterval = 282,
        BondTreasuryNotes = 256,
        BondTreasury = 257,
        BondCorporate = 258,
        BondMunicipal = 259,
        BondLoanInstitution = 260,
        BondLeasingCompany = 261,
        BondHousing = 262,
        BondForeign = 263,
        BondBankSavings = 264,
        BondTreasuryBills = 265,
        BondFloater = 266,
        BondStrips = 267,
        BondZero = 268,
        BondGovernment = 269,
        BondOther = 270,
        BondMoneyMarket = 271,
        BondMortgage = 272,
        BondBenchmark = 273,
        FundUcitsEtf = 509,
        FundETN = 510,
        FundMutual = 511,
        UcitsEtf = 509,
        Etf = 513,
        DerivativeIrSwap = 514,
        IndicatorSpread = 515,
        DerivativeOniSpread = 516,
        DerivativeSwaption = 517,
        DerivativeTenorBasis = 518,
        DerivativeCurrencyBasis = 519,
        DerivativeCapsFloor = 520,
        DerivativeCrossCurrencySwap = 521,
    }
    const SymbolSearchTypes: number;
}
declare namespace IDS {
    interface TradingCallbacks {
        PortfolioName?: string;
        TradeReadyForLogin?(Header: any): void;
        ResponseTradingLogin?(ResponseHeader: any, any: any): void;
        ResponseTradingPortfolioNames?(ResponseHeader: any, any: any): void;
        ResponseTradingPower?(ResponseHeader: any, any: any): void;
        StreamingTradingPower?(ResponseHeader: any, any: any): void;
        ResponseAlgorithms?(ResponseHeader: any, any: any): void;
        ResponseCustomFields?(ResponseHeader: any, any: any): void;
        ResponseMarketProperties?(ResponseHeader: any, any: any): void;
        ResponseInsertOrder?(ResponseHeader: any, any: any): void;
        ResponseModifyOrder?(ResponseHeader: any, any: any): void;
        ResponseDeleteOrder?(ResponseHeader: any, any: any): void;
        ResponseActivateOrder?(ResponseHeader: any, any: any): void;
        ResponseRiskLevel?(ResponseHeader: any, any: any): void;
        ResponseTickSize?(ResponseHeader: any, any: any): void;
        ResponsePortfolioPositions?(ResponseHeader: any, any: any): void;
        StreamingPortfolioPositions?(ResponseHeader: any, any: any): void;
        ResponseOrderList?(ResponseHeader: any, any: any): void;
        StreamingOrderStatus?(ResponseHeader: any, any: any): void;
        StreamingTrade?(ResponseHeader: any, any: any, boolean: any): void;
        ResponseNetTrades?(ResponseHeader: any, any: any): void;
        ResponseFindPortfolioSymbols?(ResponseHeader: any, any: any): void;
        ResponseError(ResponseHeader: any): void;
    }
    enum TradingRequest {
        InsertOrder = 5,
        DeleteOrder = 6,
        DeleteAllOrders = 7,
        OrderList = 9,
        TradeList = 10,
        Portfolio = 11,
        PortfolioNames = 12,
        Login = 13,
        Logout = 14,
        TradingPower = 15,
        CustomerOrderList = 17,
        CustomerTradeList = 18,
        ModifyOrder = 19,
        ActivateOrder = 21,
        MarketProperties = 22,
        QuoteRequest = 23,
        CreatePortfolio = 24,
        MoveTrade = 25,
        CustomFields = 26,
        TickSize = 27,
        ClientAccount = 28,
        Algorithms = 29,
        OrderConfirm = 30,
        OrderConfirmData = 31,
        PositionUnblock = 32,
        DayTradePosGet = 33,
        DayTradePosClose = 34,
        OrderHistory = 35,
        RiskLevel = 86,
    }
    enum TradingTag {
        Separator = 0,
        CustomerId = 13,
        Login = 13,
        Password = 24,
        Pin = 126,
        RequestId = 81,
        LoginToken = 130,
        LoginTokenType = 346,
        LoginSignedToken = 347,
        LoginChallenge = 43,
        CustomerAdditionalId = 280,
        Comment = 23,
        ServerProperties = 103,
        ServerProperties2 = 802,
        ServerProperties3 = 804,
        ServerProperties4 = 805,
        UserProperties = 104,
        Subscribe = 66,
        Unsubscribe = 67,
        Ask = 1,
        Bid = 2,
        OpenVolume = 6,
        OrderType = 7,
        Portfolio = 8,
        SubMarket = 10,
        Price = 9,
        AveragePrice = 158,
        ValidDate = 11,
        Volume = 12,
        ExpiryDate = 15,
        AutoActivate = 27,
        AutoDelete = 28,
        CustomerReference = 29,
        BrokerClientId = 30,
        Ecn = 31,
        Currency = 64,
        Date = 3,
        Time = 82,
        TimeUs = 164,
        ExchInstrId = 16,
        Isin = 17,
        Market = 18,
        Sedol = 19,
        StrikePrice = 20,
        Underlying = 21,
        Valoren = 22,
        InstrType = 25,
        InstrSubType = 118,
        Symbol = 26,
        InstrDescr = 131,
        Mic = 330,
        ExecutionMarket = 278,
        TradeCustomNu = 364,
        TradeCustomData = 365,
        LastTradeDate = 139,
        LastTrade = 140,
        SharesPerOption = 141,
        Language = 142,
        UnderlyingBase = 143,
        UnderlyingFeed = 119,
        UnderlyingIsin = 279,
        ComponentCode = 120,
        ChangeHist = 121,
        FailCode = 32,
        FailDescription = 33,
        FailEventId = 367,
        OrderStatus = 34,
        OrderId = 35,
        VolumeFilled = 36,
        AccFilled = 37,
        AccTradedVolume = 38,
        AccVolume = 39,
        OrderFailCode = 40,
        OrderStatusText = 44,
        OrderStatusNew = 45,
        OrderFailDescription = 41,
        DisplayPortfolio = 46,
        DefaultPortfolio = 371,
        OwnerDesk = 47,
        TransactionId = 801,
        Accrued = 48,
        Buyer = 49,
        Seller = 50,
        BuyOrSell = 51,
        Client = 52,
        Counterpart = 53,
        ExchOrderId = 54,
        ExchTime = 55,
        ExchTradeId = 56,
        Fee = 57,
        FxRate = 58,
        Invested = 59,
        SettleDate = 60,
        TradeDate = 61,
        ExchTradeId2 = 62,
        PositionValue = 260,
        PositionPrice = 264,
        CustomMoneyKindId = 268,
        CustomMoneyKindData = 269,
        CustomMoneyKindType = 270,
        PortfolioState = 271,
        PortfolioStateDescription = 272,
        StopOutState = 295,
        LoanToValueRatio = 275,
        Multiplier = 306,
        Collateral = 322,
        BaseInvested = 324,
        ProfitLoss = 325,
        BaseCurrency = 327,
        OriginalCurrency = 276,
        BaseResult = 328,
        Shortable = 361,
        RealizedResult = 362,
        RiskData = 385,
        DeletedTrade = 65,
        ParentId = 66,
        TradeId = 67,
        TradeTime = 68,
        TradeTimeUs = 163,
        VerifiedTrade = 69,
        PortfolioType = 305,
        PortfolioDescr = 258,
        PositionType = 259,
        LoginId = 80,
        User = 83,
        ChangeInAccrued = 84,
        ChangeInVolume = 85,
        ChangeInInvested = 86,
        Feed = 87,
        PacketType = 88,
        TradingPower = 89,
        TradingPowerStatus = 90,
        MoneyKind = 91,
        StartDate = 92,
        EndDate = 93,
        IsInternalUser = 94,
        CreateDate = 95,
        ChangeDate = 96,
        ChangeTime = 97,
        ChangeTimeUs = 165,
        LimitPerDay = 108,
        LimitPerOrder = 109,
        SafetyLimitOverride = 110,
        CustomNu = 112,
        CustomLabel = 113,
        CustomForOrderTypes = 114,
        CustomDisplay = 115,
        CustomType = 116,
        CustomData = 117,
        MaxValidDays = 122,
        MarketProperties = 123,
        MarketProperties2 = 803,
        BasketNameAndSerial = 124,
        LockReport = 154,
        TickFromPrice = 127,
        TickToPrice = 128,
        TickSize = 129,
        BloombergTicker = 160,
        BloombergGlobalId = 161,
        BloombergGlobalIdComposite = 162,
        PrimarySegment = 376,
        SecondarySegment = 377,
        LimitCurrency = 287,
        QuoteConfig = 318,
        DefaultOrderWarning = 319,
        PositionNumber = 372,
        OrderPermissionFlg = 771,
        AlgoId = 512,
        AlgoBrokerId = 513,
        AlgoUserId = 514,
        AlgoLabel = 515,
        AlgoDescr = 516,
        AlgoParamId = 517,
        AlgoParamLabel = 518,
        AlgoParamData = 519,
        AlgoParamDescr = 520,
        AlgoParamMandatory = 521,
        AlgoParamDefault = 522,
        AlgoParamType = 523,
        AlgoParamMaxLen = 524,
        AlgoParamMultiLine = 525,
        AlgoParamMin = 526,
        AlgoParamMax = 527,
        AlgoParamElement = 528,
        AlgoParamFeed = 534,
        AlgoProperties = 535,
        AlgoParamProperty = 536,
        AlgoParamCustomNuRef = 537,
        Provider = 2048,
        Service = 2049,
    }
    enum ServerProperties {
        ModifyOrder = 1,
        MonitorOrder = 2,
        ActivateOrder = 4,
        RequestTrades = 8,
        ModifyMonitorOrder = 16,
        OrderTypes = 32,
        ModifyOrderActivate = 64,
        ModifyOrderBuySell = 128,
        ModifyOrderType = 256,
        CustomFields = 512,
        NoCommentField = 1024,
        DisableActivate = 2048,
        ModifyRemainingVolume = 4096,
        ModifyNotPortfolio = 8192,
        PerSymbolTickSize = 16384,
        ModifyNormalToMonitor = 32768,
        NoPortfolio = 65536,
        ZeroNegPrice = 131072,
        SliceOrders = 262144,
        ClientAccountInfo = 524288,
        AlwaysParent = 1048576,
        NoTradingPower = 2097152,
        AlgoTrading = 4194304,
        OrderConfirmation = 8388608,
        PositionUnblock = 16777216,
        DayTradeClose = 33554432,
        PortfolioByDate = 67108864,
        OrderHistory = 134217728,
        OrderValidTime = 268435456,
        ChangePassword = 536870912,
        NoPortfolioTradesUpdate = 1073741824,
        NoAlgoModify = 2147483648,
    }
    function ServerPropToStr(prop: ServerProperties): string;
    enum ServerProperties2 {
        SupportOrderTrigger = 1,
        SupportTradeReports = 2,
        SupportQuote = 4,
        SupportReqForQuote = 8,
        SupportMassDelQuote = 16,
        AllowComboLegPrice = 32,
        SimulateSell = 64,
        MoneyKindsHeader = 128,
        HideRefreshPortfolio = 256,
        GmtTimestamps = 512,
        SupportFilters = 1024,
        AlgoModifyRemainingVolume = 2048,
        FindExtTrade = 4096,
        PortfolioHierarchy = 8192,
        ATDL = 16384,
        BasketSupport = 32768,
        DisableMultiDelete = 65536,
        SupportFxDeals = 131072,
        SelectFxCurrency = 262144,
        DisableClientRef = 524288,
        NewsNotification = 1048576,
        SupportQuoteConfig = 2097152,
        StaticPortfolios = 4194304,
        ModifyAlgoType = 8388608,
        ModifyReqOrder = 16777216,
        Allocations = 33554432,
        NoVolumeModify = 67108864,
        ShowOldOrders = 134217728,
        SupportModifyTrade = 268435456,
        OrderMassCancel = 536870912,
        AutomaticUserCreation = 1073741824,
        NoValidityModify = 2147483648,
    }
    function ServerProp2ToStr(prop: ServerProperties2): string;
    enum ServerProperties3 {
        NoOpenVolumeModify = 1,
        RiskLevel = 2,
        Unused_03 = 4,
        Unused_04 = 8,
        Unused_05 = 16,
    }
    function ServerProp3ToStr(prop: ServerProperties3): string;
    enum ServerProperties4 {
        ActivateOnce = 1,
        TpNoFeed = 2,
    }
    function ServerProp4ToStr(prop: ServerProperties4): string;
    enum UserProperties {
        InactiveOnly = 1,
        CreatePortfolio = 2,
        MoveToPortfolio = 4,
        AllPortfolios = 8,
        MyOrders = 16,
        LockChildBroker = 32,
        ReadOnly = 64,
        AcceptReject = 128,
        StopOut = 256,
        HandleParents = 512,
        FxTrader = 1024,
        KidRequiredIgnored = 2048,
        RiskLevelChecks = 4096,
        LiquidityCheck = 8192,
        Reserved_15 = 16384,
        Reserved_16 = 32768,
        Reserved_17 = 65536,
        Reserved_18 = 131072,
        Reserved_19 = 262144,
        Reserved_20 = 524288,
        Reserved_21 = 1048576,
        Reserved_22 = 2097152,
        Reserved_23 = 4194304,
        Reserved_24 = 8388608,
        Reserved_25 = 16777216,
        Reserved_26 = 33554432,
        Reserved_27 = 67108864,
        Reserved_28 = 134217728,
        Reserved_29 = 268435456,
        Reserved_30 = 536870912,
        Reserved_31 = 1073741824,
        Reserved_32 = 2147483648,
    }
    function UserPropToStr(prop: UserProperties): string;
    enum PacketTypes {
        Order = 1,
        OrderStatus = 2,
        Trade = 3,
        Portfolio = 4,
        Response = 5,
        PortfolioNames = 6,
        TradingPower = 7,
        QuoteResponse = 8,
        TradeReport = 9,
        QuoteStatusFeed = 10,
        RfqFeed = 11,
        BasketList = 14,
        FxDealing = 16,
        FxDealingStatus = 17,
        FxAdStatus = 18,
        FxAdCcySetting = 19,
        FxAdCrossSetting = 20,
        FxAdListEnd = 21,
        InterfaceStatusUpdate = 22,
        FxTraderMessage = 23,
    }
    function packetTypeToStr(value: PacketTypes): string;
    enum FailCodes {
        ErrorOk = 0,
        ErrorNoSuchInstrument = 1,
        ErrorNoOrderId = 2,
        ErrorNoCustomerId = 3,
        ErrorNoPortfolio = 4,
        ErrorUnknownSymbol = 5,
        ErrorLoginDenied = 6,
        ErrorNotLoggedIn = 7,
        ErrorUnknownRequest = 8,
        ErrorNotUnique = 9,
        ErrorMissingKey = 10,
        ErrorIllegalValue = 11,
        ErrorUnknownKey = 12,
        ErrorInternalError = 13,
        ErrorNoAccess = 14,
        ErrorMarketServerNoConnection = 256,
        ErrorMarketServerLostConnection = 257,
        ErrorMarketServerInternalError = 258,
        ErrorMarketServerSystemError = 259,
        ErrorMarketServerNoOrderActivator = 260,
        ErrorMarketServerConnectionError = 261,
        ErrorMarketServerNoAccess = 262,
        ErrorMarketServerNoData = 263,
        ErrorMarketServerTimeout = 264,
        ErrorLoginMoreDataNeeded = 265,
        ErrorCustomUnknownPortfolio = 65535,
    }
    function failCodeToStr(value: FailCodes): string;
    enum PortfolioTypes {
        Undefined = 1,
        Equity = 2,
        Fx = 3,
        Static = 4,
    }
    enum OrderTypes {
        Normal = 0,
        FillOrKill = 1,
        FillAndKill = 2,
        FillOrNothing = 3,
        Dummy = 4,
        CrossOrder = 5,
        BestPossible = 6,
        AtMarket = 7,
        Market = 8,
        Limit = 9,
        MarketToLimit = 10,
        AtMarketAndKill = 11,
        QuoteRequest = 12,
        LimitOrMarketOnTheClose = 13,
        StopLimit = 14,
        StopLoss = 15,
        Contingent = 16,
        Flex = 17,
        Interest = 18,
        Accept = 19,
        Parent = 29,
        Strategy = 30,
        Fix = 31,
        LimitToMarket = 32,
        BestToLimit = 33,
        MultiLeg = 34,
        MarketFillOrKill = 35,
        MarketFillAndKill = 36,
        Pegged = 37,
        AtOpen = 38,
        AtClose = 39,
        Oco = 40,
        Iceberg = 41,
    }
    enum OrderStatus {
        Inactive = 0,
        Request = 1,
        Exchange = 2,
        Active = 2,
        Internal = 3,
        Delete = 4,
        Offline = 5,
        Deleted = 6,
        Monitor = 7,
        Working = 8,
        ModifiedNew = 9,
        ErrorSystem = 10,
        ErrorTradingPower = 11,
        ErrorLimit = 12,
        ErrorCommunication = 13,
        Expired = 14,
        Executed = 15,
        Rejected = 16,
        PendingInsert = 17,
        PendingModify = 18,
        PendingDelete = 19,
        Simulate = 20,
        CareRequest = 21,
        DoneForDay = 22,
        Pending = 4096,
        DeletedExecuted = 4097,
        DeletedRefused = 4098,
        Parent = 4099,
        DeletedModify = 4100,
        Abandoned = 4101,
    }
    function orderStatusToStr(value: OrderStatus): string;
    enum ParamType {
        Parent = -1,
        SingleChoiceListEntry = 0,
        SingleChoiceListDefault = 1,
        FreeText = 2,
        Double = 4,
        StopPrice = 8,
        ValidSession = 16,
        InitCode = 32,
        DoneCode = 64,
        Time = 3,
        Date = 5,
        Datetime = 6,
        Dropdown = 7,
        Bool = 9,
        Int = 10,
        Instrument = 11,
        Price = 12,
        VolumeLots = 13,
        DropdownFreeText = 14,
        DropdownFreeTextDefault = 15,
        DropdownFreeTextNoSave = 16,
        MultiLine = 1066,
    }
    enum AlgoProperties {
        SmartOrder = 1,
        Default = 2,
        DarkOrder = 4,
        PairsOrder = 8,
        PairsRatio = 16,
        SuitableOnMobile = 32,
        ShowExecuteNotBs = 64,
        DisableStdVolume = 128,
        DisableCtdComment = 256,
        PairsDifferentSymbols = 512,
    }
    function algoPropertiesToStr(value: AlgoProperties): string;
    enum ParamProperties {
        common = 1,
        SpreadLimit = 2,
        SpreadUnit = 4,
        PairsId = 8,
        SpreadSide = 16,
        NoModify = 32,
        Deprecated = 64,
        OnlyForTrades = 128,
        TradeModifiable = 256,
        NewUiSection = 512,
        Hidden = 1024,
        Numeric = 2048,
        ReadOnly = 4096,
        RiskResendOnChange = 8192,
        DoNotSendForOrders = 16384,
        CustomWidth = 32768,
        RiskLevel = 65536,
        CopyToAlgos = 131072,
    }
    function paramPropertiesToStr(value: ParamProperties): string;
    enum MoneyKind {
        Undefined = 0,
        Balance = 1,
        Carry = 2,
        Cash = 3,
        Correction = 4,
        Coupon = 5,
        CreditLimit = 6,
        Fee = 7,
        Financing = 8,
        FuturesLimit = 9,
        Lending = 10,
        Margins = 11,
        ShortSpotLimit = 12,
        ShortOptionsLimit = 13,
        SumCash = 14,
        AvailableCredit = 15,
        TotalLoan = 16,
        Custom = 17,
        PortfolioState = 18,
        StopoutState = 19,
        Collateral = 20,
    }
    enum CustomMoneyKindType {
        Value = 0,
        String = 1,
        Url = 2,
        Percent = 3,
    }
    function CustomMoneyKindTypeToStr(value: CustomMoneyKindType): "unknown" | "URL" | "NUMBER" | "STRING" | "PERCENT";
    function moneyKindToStr(value: MoneyKind): string;
}
declare namespace IDS {
    enum WireRequest {
        GetSnapshot = 105,
    }
    enum WireTag {
        Separator = 0,
        BeginSection = 1,
        EndSection = 2,
        Feed = 17,
        NewsCategory = 18,
        CalendarDescription = 19,
        CalendarSubject = 20,
        CalendarType = 21,
        CalendarFlag = 22,
        CalendarSource = 23,
        Date = 24,
        Time = 25,
        Headline = 26,
        NewsId = 27,
        NewsFlag = 28,
        NewsContentType = 29,
        Symbol = 30,
        Language = 31,
        MotionDetectionType = 32,
        MotionDetectionSubType = 33,
        MotionDetectionValue = 34,
        CalendarExternalID = 35,
        CalendarExpected = 36,
        CalendarPrevious = 37,
        CalendarActual = 38,
        CalendarNumberUnit = 39,
        MotionDetectionSubValue = 40,
        MultiPacket = 8496,
        NewsSourceId = 9071,
        NewsStoryId = 9072,
        NewsArticleId = 9073,
        PriorityValue = 9074,
        EventId = 9075,
        EventScore = 9076,
        EventType = 9077,
        EventSubType = 9078,
        MotionDetectionScore = 9079,
        NewsSigScore = 9080,
        EventAmount = 9081,
        Caption = 9082,
        EventArticleCount = 9083,
        BlockSeparator = 9084,
        SymbolScore = 9085,
        SubscriptionId = 9086,
        FlashCount = 9087,
        Status = 65534,
        StatusDescription = 65535,
    }
    enum WireMultiPacket {
        Middle = 0,
        Begin = 1,
        End = 2,
        BeginAndEnd = 3,
    }
    enum WireBlockType {
        Generic = 0,
        Event = 1,
        Instruments = 2,
        NewsCaption = 3,
        FlashElements = 4,
        MotionPacket = 5,
        CalendarItem = 6,
        Feeds = 7,
        Header = 8,
    }
    enum MotionDetectionType {
        OpenChange = 1,
        HighLow = 2,
        UnusualVolume = 3,
        EMA10VsLast = 4,
        ChangeVsIndex = 5,
        MaCross = 6,
        RecentNews = 7,
        FiveMinChange = 8,
        RegressionLine = 9,
        LargeTrade = 10,
        LargeTradeDeferred = 11,
    }
    function WireBlockTypeToStr(value: WireBlockType): string;
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    abstract class BaseServer {
    }
    abstract class BaseIDSServer extends BaseServer implements ServerConnectionCallbacks {
        conn: ServerConnection;
        serverType: ServerType;
        ps: PidSid;
        tagSet: TagSet;
        serverPool: ServerPool;
        loginServer: LoginServer;
        protected constructor(serverPool: ServerPool, ps: PidSid, serverType: ServerType);
        outstandingRequests(): number;
        clearOutstandingRequests(): void;
        protected publishEvent(event: Infront.InfrontEvent): void;
        lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
        destroyBase(): void;
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import FeedMetaData = Infront.FeedMetaData;
    import FeedType = Infront.FeedType;
    import FeedProperty = Infront.FeedProperty;
    import SymbolType = Infront.SymbolType;
    var loginServers: string[];
    interface LoginCallbacks {
        EndLogin(success: boolean, responseId: HeaderResponses, msg?: string): void;
    }
    const GlobalChainsFeed = 990;
    const SymbolMappingServerFeed = 832;
    const InfinancialsFullContentFeed = 902;
    const InfinancialsFeed = 903;
    const WireFeed = 823;
    class FeedColumn {
        pid: number;
        sid: number;
        feed: number;
        tag: number;
        colNu: number;
        length: number;
        defaultDecimals: number;
        attributes: number;
    }
    class FeedColumnsResponse {
        feedColumns: FeedColumn[];
    }
    class EndLogin implements LoginCallbacks {
        EndLogin: (success: boolean, responseId: HeaderResponses, msg?: string) => void;
    }
    class LoginInfo {
        loginId: number;
        customerId: number;
        customerId2: number;
        ownerProviderId: number;
        supportEmail: string;
        loginServers: string;
        privateNetworkId: number;
        expireDate: number;
        helpUrl: string;
        publicKey: string;
        userType: number;
        brokerCode: string;
        brokerCountry: number;
        customCode: string;
        authVersion: number;
        signature: string;
        thumbPrint: string;
        uuid: string;
        namespace: string;
        editUserData: number;
        extLoginId: string;
    }
    class HostInfo {
        parent: ServiceInfo;
        host: string;
        port: number;
        privateNetwork: number;
    }
    class ServiceInfo {
        parent: ProviderInfo;
        SID: number;
        serviceType: ServiceType;
        tagSet: number;
        name: string;
        providerName: string;
        encrypt: number;
        freeService: boolean;
        info1: Info1;
        info2: Info2;
        info3: Info3;
        info4: Info4;
        info5: number;
        hosts: {
            [host: string]: HostInfo;
        };
        feeds: {
            [feednu: number]: FeedInfo;
        };
        isJsCertified(logWarning?: boolean): boolean;
        getFullName(): string;
        getPsStr(): string;
        logServerName(): void;
        logInfo(verbose?: boolean): void;
    }
    class ProviderInfo {
        PID: number;
        name: string;
        supportEmail: string;
        loginServers: string;
        phone: string;
        services: {
            [sid: number]: ServiceInfo;
        };
    }
    class WrapFeedInfo {
        feednu: number;
        content: number;
    }
    class FeedInfo {
        feedNu: number;
        country: number;
        exchCode: string;
        content: number;
        descr: string;
        mainIndex: string;
        mainIndexFeed: number;
        volumeIndex: string;
        volumeIndexFeed: number;
        startTime: number;
        endTime: number;
        getFromFeed: number;
        underFeed: number;
        wrapToFeed: number;
        gmtFeedOffset: number;
        gmtFeedOffsetMins: number;
        gmtLocalOffset: number;
        parentFeed: number;
        additionalInfo: string;
        optionsFeed: number;
        marketCodeReuters: string;
        marketCodeMic: string;
        wrapFeeds: {
            [feednu: number]: WrapFeedInfo;
        };
        hasSymbolType(symbolType: number): boolean;
        isFeatureFeed(): boolean;
        isSymbolFeed(): boolean;
        hasOnly(feedType: FeedType): boolean;
        getDefaultSymbolType(): SymbolType;
        feedDataTypes(): string[];
    }
    class ProviderService {
        private _feedInfo;
        PID: number;
        SID: number;
        feedNu: number;
        properties: FeedProperty;
        defaultDecimals: number;
        minDelaySeconds: number;
        maxDelaySeconds: number;
        defaultContractSize: number;
        feedDescrUrl: string;
        gmtFeedOffset: number;
        gmtFeedOffsetMins: number;
        gmtLocalOffset: number;
        mblLevels: number;
        tradingMarketplace: string;
        service: ServiceInfo;
        historyFeed: ProviderService;
        actualMBOFeed: ProviderService;
        pidSid(): PidSid;
        psStr(): string;
        getDecimalEnum(): PriceDisplay;
        propertyStrings(): string;
        propertyStringList(): string[];
        getServiceType(): ServiceType;
        hasBrokerOrders(): boolean;
        hasOrderBook(): boolean;
        orderbookIsMBO(): boolean;
        separateBBOandLevel1(): boolean;
        getWrappedToFeed(): number;
        isWrappedToFeed(): boolean;
        isWrappedMBLOrderbook(): boolean;
        isWrappedMBOOrderbook(): boolean;
        hasFreeTextSearch(): boolean;
        providedBy(ps: PidSid): boolean;
        readonly feedInfo: FeedInfo;
    }
    class FeedServiceInfo {
        feedNu: number;
        service: {
            [psIndex: number]: ProviderService;
        };
        constructor(feedNu: number);
    }
    class LoginGetFeeds {
        feedInfo: FeedInfo;
        providerService: {
            [psIndex: number]: ProviderService;
        };
    }
    class LoginServer extends BaseIDSServer {
        readonly login: string;
        readonly password: string;
        readonly ssoToken: string;
        private callbacks;
        private providers;
        private services;
        private wrapFeeds;
        private feedService;
        private counter;
        private requests;
        private loginTimeoutCounter;
        private loginTimeoutHandler;
        feeds: {
            [feednu: number]: FeedInfo;
        };
        loginInfo: LoginInfo;
        tickSizes: {
            [key: string]: Realtime.TickSize;
        };
        constructor(login: string, password: string, secure: boolean, ssoToken?: string, hosts?: string[], serverPool?: ServerPool);
        destroyBase(): void;
        register(callback: LoginCallbacks): void;
        unregister(callback: LoginCallbacks): void;
        getWrappedFeed(feedNu: number): number;
        getWrappedFeeds(feedNu: number): number[];
        GetOrderbookFeed(ps: PidSid, feedNu: number): {
            feed: number;
            isMbo: boolean;
        };
        getFeed(ps: PidSid, feedNu: number): ProviderService;
        getServiceInfo(ps: PidSid): ServiceInfo;
        getServiceName(ps: PidSid): string;
        getWireFeeds(serviceTypes: ServiceType[], feedProperty?: FeedProperty): number[];
        getFeeds(serviceType?: ServiceType, feedProperty?: FeedProperty, showWrapped?: boolean): LoginGetFeeds[];
        getFeedsForMarket(marketPlace: string): number[];
        getAccessFeeds(ps: PidSid, type?: SymbolType): number[];
        getHosts(ps: PidSid): string[];
        getNewsFeeds(ps: PidSid): number[];
        getPidSidFeeds(ps: PidSid, mainFeed?: number, feedProperty?: FeedProperty): number[];
        getPidSidServiceType(ps: PidSid): ServiceType;
        getPidSids(serviceType: ServiceType): PidSid[];
        getFirstPidSidForServiceType(serviceType: ServiceType): PidSid;
        getPidSid(feedNu: number, serviceType: ServiceType, feedProperty?: FeedProperty): PidSid;
        getProviderServiceForPidSid(feedNu: number, pidSid: PidSid, findBest?: boolean): ProviderService;
        getFeedProperties(feedNu: number, pidSid: PidSid, findBest?: boolean): FeedProperty;
        findOrderEntryPidSid(feedNu: number): PidSid;
        feedCanTradeOnPidSid(feedNu: number, pidSid: PidSid): boolean;
        feedHasRealtime(feedNu: number): boolean;
        feedHasDelayed(feedNu: number): boolean;
        feedIsMajorMarket(feedNu: number): boolean;
        feedIsOTC(feedNu: number): boolean;
        logPidSidsForFeed(feedNu: number): void;
        getPidSidForFeedAndProperty(feedNu: number, feedProperty: FeedProperty): PidSid;
        getTagSet(ps: PidSid): TagSet;
        feedOffsetUtc(feedNu: number, serviceInfo?: ServiceInfo): number;
        toUtc(feedNu: number, time: number, serviceInfo?: ServiceInfo): number;
        toFeedTime(feedNu: number, date: Date, serviceInfo?: ServiceInfo): Date;
        private loginOk(id?);
        getTradingRouteName(pidSid: PidSid): string;
        getTradingRoutes(logWarning?: boolean): MWSTradingRoutes[];
        getTradableFeeds(): number[];
        getNewsSources(): MWSNewsSources;
        getSymbolSearchFeeds(): PidSid[];
        getFeatureFeeds(): any;
        getFeatureStrings(): any;
        getMarkets(): MwsMarketInfo[];
        getAdditionalInfoFromFeedInfo(additionalInfo: string): {
            [key: string]: string;
        };
        getFeedExchangeCode(feednu: number): string;
        getFeedMetadata(feednu: number): FeedMetaData;
        getFeedColumns(feednu: number, common: CommonFrameworkResponse): void;
        getTickSizes(feed: number, id: number): Realtime.TickSize;
        private authentication(bufs);
        private responseLogin(header, buf, parser);
        private responseProviders(header, buf, parser);
        private responseFeeds(header, buf, parser);
        private responsePSFeeds(header, buf, parser);
        private responseProviderAccess(header, buf, parser);
        private responseExternalLinks(header, buf, parser);
        private getTickSizeKey(feed, tickSizeId);
        private responseTickSize(header, buf, parser);
        private responseVideoLink(header, buf, parser);
        private responseFeedColumns(header, buf, parser);
        lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
        lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
        lowLevelReRequestAll(header: Header): void;
        lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Instrument = Infront.Instrument;
    enum ChainType {
        All = 0,
        Feed = 1,
        Index = 2,
        Global = 3,
    }
    class ChainResponseItem {
        feed: number;
        chainFeed: number;
        name: string;
        description: string;
        type: ChainType;
        providerId: number;
        ToMws(): void;
    }
    class ChainContentResponseItem {
        feed: number;
        symbol: string;
        symbolType: number;
        symbolSubType: number;
        isin: string;
        currency: string;
        fullname: string;
        exchangeSymbol: string;
        instrument: Instrument;
        ToMws(): void;
    }
    class ChainResponse {
        items: ChainResponseItem[];
        ToMws(): void;
    }
    class ChainContentResponse {
        name: string;
        descr: string;
        type: ChainType;
        providerId: number;
        items: ChainContentResponseItem[];
        ToMws(): void;
    }
    class ChainsServer extends BaseIDSServer {
        private requests;
        constructor(ps: PidSid, serverPool: ServerPool);
        RequestChains(feed: number, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
        RequestChainContent(feed: number, name: string, provider: number, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
        private ResponseChains(req);
        private ResponseChainContent(req);
        lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
        lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
        lowLevelReRequestAll(header: Header): void;
        lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Instrument = Infront.Instrument;
    class HistoryConstants {
        static IsAll: string;
    }
    class TimeSeriesItem {
        date: Date;
        bid: number;
        ask: number;
        open: number;
        high: number;
        low: number;
        last: number;
        volume: number;
        turnover: number;
        onExchTurnover: number;
        num_trades: number;
        orderbookMoves: number;
        netAssetValue: number;
        officialClose: number;
        yield: number;
        bidYield: number;
        askYield: number;
        indicTrade: number;
        indicIncVol: number;
        indicHigh: number;
        indicLow: number;
        nms: number;
        indicOpen: number;
        indicOpenVol: number;
        onFloorVolume: number;
        constructor(date?: number);
    }
    class Adjustment {
        date: number;
        factor: number;
    }
    class Dividend {
        date: number;
        dividend: number;
        currency: string;
    }
    class TimeSeriesResponse {
        feed: number;
        symbol: string;
        items: TimeSeriesItem[];
        adjustments: Adjustment[];
        dividends: Dividend[];
        serialNumber: number;
    }
    class PerformanceItem {
        high: number[];
        low: number[];
        last: number[];
        vol: number[];
        perf: number[];
        perf_sek: number[];
        lastTrade: number;
        lastTradeDate: Date;
        RsiGain: number;
        RsiLoss: number;
        RsiPeriods: number;
    }
    class PerformanceResponseItem {
        feed: number;
        symbol: string;
        tags: {
            [tag: number]: any;
        };
        dayCount: number[];
        value: PerformanceItem;
        div: PerformanceItem;
        ToMws(): void;
    }
    class PerformanceResponse {
        items: PerformanceResponseItem[];
        ToMws(): void;
    }
    class CalculatedHistoryResponse {
        items: CalclulatedHistoryResponseItem[];
        dummy: any;
        ToMws(): void;
    }
    class CalclulatedHistoryResponseItem {
        feed: number;
        symbol: string;
        tags: {
            [tag: number]: any;
        };
        calculatedHistoryParam: number;
        calculatedHistoryType: number;
        calculatedHistoryValue: number;
        movingAverage: number;
        exponentialMovingAverage: number;
        volumeWeigtehAveragePrice: number;
        averageDailyVolume: number;
        stdDevOfDailyVolume: number;
        averageDailyExchangeVolume: number;
        stdDevOfExchangeVolume: number;
        linearRegressionSlopeOfLastPrice: number;
        stdDevOfLastPrice: number;
        simpleAvgOfLastPrice: number;
        stdDevOfDailyChange: number;
        avgDailyChange: number;
        linearRegressionSlopeOfLastStderr: number;
        linearRegressionSlopeOfLastPredict: number;
        lastVolatility: number;
        lnDeltaCount: number;
        lnDeltaSum: number;
        lnDeltaSquareSum: number;
        avgTrueRange: number;
        avgBid: number;
        avgAsk: number;
        avgTurnover: number;
        avgDivYieldFactor: number;
    }
    class HeadlineRequest {
        feeds: number[];
        startDate: number;
        endDate: number;
        maxItems: number;
        offset: number;
        types: number[];
        regions: number[];
        symbols: Instrument[];
    }
    class HeadlineResponse {
        private filteredItems;
        items: HeadlineItem[];
        addItem(item: HeadlineItem): void;
        applyFilteredResult(): void;
        ToMws(): any;
        debug(): any;
    }
    class NewsStoryResponse {
        news_feed: number;
        news_id: string;
        text: string[];
        headline: string;
        date: number;
        time: number;
        private makeLinks(text);
        private hasMarkupText(text);
        ToMws(): string;
    }
    class CompanyOfficer {
        name: string;
        title: string;
    }
    class FundamentalInfo {
        source: number;
        item: string;
        period: string;
        periodDisplay: string;
        actual: number;
        estimateMean: number;
        estimateMedian: number;
        estimateHigh: number;
        estimateLow: number;
        estimateCount: number;
        estimateDeviation: number;
        currency: string;
        isEstimate: boolean;
    }
    class CompanyInfo {
        feed: number;
        symbol: string;
        companyId: number;
        sortNu: number;
        name: string;
        descr: string;
        beta1Y: number;
        indexFeed: number;
        indexSymbol: string;
        marketCap: number;
        currency: string;
        country: string;
        sector: string;
        subSector: string;
        enterpriseValue: number;
        enterpriseCurrency: string;
        primaryShares: number;
        secondaryShares: number;
        reportDate: Date;
        capital: number;
        shortTermDebt: number;
        longTermDebt: number;
        revenue: number;
        earnings: number;
        urls: string[];
        source: number;
        infinancialsSectorCode: string;
        CEO: string;
        chairman: string;
        officers: CompanyOfficer[];
        fundamentals: any;
    }
    class CompanyDataResponse {
        primary: CompanyInfo;
        peers: CompanyInfo[];
        constructor();
    }
    class BrokerStatRequest {
        feed: number;
        brokers: string[];
        symbols: string[];
        startDate: number;
        endDate: number;
        accumulate: boolean;
    }
    class BrokerStatResponse {
        feed: number;
        brokers: BrokerStatItem[];
        b: {
            [id: string]: BrokerStatItem[];
        };
        s: {
            [id: string]: BrokerStatItem[];
        };
        ToMws(): void;
    }
    class TimeSeriesCache {
        feed: number;
        symbol: string;
        serial: number;
        firstDate: number;
        lastDate: number;
        nuItems: number;
        data: TimeSeriesResponse;
        range(): string;
    }
    class TimeSeriesRequest {
        startDate: number;
        endDate: number;
        cache: TimeSeriesCache;
        includeAdjustments: boolean;
        constructor(startDate?: number, endDate?: number);
    }
    class HistoryServer extends BaseIDSServer {
        private requests;
        useTimeSeriesCache: boolean;
        constructor(ps: PidSid, serverPool: ServerPool);
        GetTimeSeries(feed: number, symbol: string, params: TimeSeriesRequest, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
        GetCalculatedHistory(symbols: Instrument[], callback: AllResponseCallbacks, common: CommonFrameworkResponse, historyType: RealtimeCalculatedHistoryTags, params: number[]): void;
        GetSymbolPerformance(symbols: Instrument[], callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
        GetPerformance(feed: number, symbol: string, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
        GetHeadlines(data: HeadlineRequest, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
        GetNewsStory(feed: number, date: Date, id: string, streamingId: string, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
        GetCompanyData(feed: number, symbol: string, callback: AllResponseCallbacks): void;
        GetFundamentalData(feed: number, symbol: string, sources: number[], language: string, callback: AllResponseCallbacks): void;
        GetBrokerStats(data: BrokerStatRequest, callback: AllResponseCallbacks, common: CommonFrameworkResponse): void;
        private GetCacheKey(feed, symbol);
        private GetIxDBTimeSeriesCache(feed, symbol, req, callback);
        private PutIxDBTimeSeriesCache(req, data, callback?);
        DeleteIxDbTimeSeriesCache(feed: number, symbol: string): void;
        private ResponseCalculatedHistory(header, req);
        private ResponseTimeSeries(header, req);
        private ResponsePerformance(header, req);
        private ResponseHeadlines(header, req);
        private ResponseNewsStory(header, req);
        private ResponseCompanyData(header, req);
        private ResponseBrokerStats(header, req);
        lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
        lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
        lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
    }
}
declare namespace IDS {
    interface TransportCallbacks {
        onOpen(evt: any): void;
        onClose(evt: any): void;
        onMessage(evt: any): void;
        onError(evt: any): void;
    }
    class InfrontWebSocket {
        private cb;
        localLoop: boolean;
        ws: WebSocket;
        constructor(url: string, localLoop: boolean);
        Register(cb: TransportCallbacks): void;
        Unregister(cb: TransportCallbacks): void;
        readyState(): number;
        close(): void;
        onOpen(evt: Event): void;
        onClose(evt: CloseEvent): void;
        onMessage(evt: MessageEvent): void;
        onError(evt: ErrorEvent): void;
    }
    function GetInfrontWebSocket(url: string, fromTerminal: boolean): InfrontWebSocket;
    function GetInfrontRequestUniqueId(): number;
}
declare namespace IDS {
    class LowLevel {
        static GetLen(buf: Uint8Array, pos: number): 1 | 2 | 3 | 8 | 4 | 5 | 6 | 7;
        static Utf8ArrayToStr(array: any): any;
        static GetString(buf: Uint8Array, pos: number, len: number, isUtf8?: boolean): any;
        static GetBCD(buf: Uint8Array, pos: number, len: number): any;
        static GetInt(buf: Uint8Array, pos: number, len: number): number;
        static GetSignedInt(buf: Uint8Array, pos: number, len: number): number;
        static GetWord(buf: Uint8Array, pos: number): number;
        static GetInt32(buf: Uint8Array, pos: number): number;
        static GetSignedInt32(buf: Uint8Array, pos: number): number;
        static GetInt64(buf: Uint8Array, pos: number): string;
        static GetFloat(buf: Uint8Array, pos: number): number;
        static GetDouble(buf: Uint8Array, pos: number): number;
        static AddInt32(buf: Uint8Array, pos: number, data: number): number;
        static AddInt(buf: Uint8Array, pos: number, data: number): number;
        static AddString(buf: Uint8Array, pos: number, data: string): number;
        static AddBCD(buf: Uint8Array, pos: number, data: number): number;
        static AddBinary(buf: Uint8Array, pos: number, data: Uint8Array, dataPos: number, dataLen: number): number;
    }
    class Tag {
        tag: number;
        dataType: number;
        pos: number;
        len: number;
        access: number;
        buf: Uint8Array;
        staticData: Uint8Array;
        get(buf?: Uint8Array): any;
        String(buf?: Uint8Array, isUtf8?: boolean): string;
        Int(buf?: Uint8Array): number;
        SignedInt(buf?: Uint8Array): number;
        Decimal(buf?: Uint8Array): number;
    }
    class TemplTag {
        tag: number;
        dataType: number;
        access: number;
        staticData: Uint8Array;
        constructor(tag: number);
    }
    class TemplateField {
        constructor(tag: number);
        tag: TemplTag;
        isStatic: boolean;
        SetData(t: Tag, buf: Uint8Array): void;
    }
    class Template {
        isTrade: boolean;
        isNOII: boolean;
        fields: TemplateField[];
    }
    class TemplateStorage {
        t: Template[];
        Find(nu: number): Template;
        Add(nu: number, t: Template): void;
    }
    enum ParserFlags {
        RealtimeTagSet = 1,
        WithoutHeader = 2,
        SkipHeader = 4,
    }
    class Parser {
        private headerEndPos;
        private startPos;
        private lastPos;
        private templInfo;
        private flags;
        pos: number;
        inHeader: boolean;
        tagSet: TagSet;
        constructor(pos: number, lastPos: number, flags?: ParserFlags, templ?: TemplateStorage);
        Initialize(pos: number, lastPos: number, flags?: ParserFlags, templ?: TemplateStorage): void;
        AssignTemplateStorage(storage: TemplateStorage): void;
        SetBuffer(buf: Uint8Array): void;
        DataLen(): number;
        DuplicateData(buf: Uint8Array): Uint8Array;
        DuplicateDataOnly(buf: Uint8Array): Uint8Array;
        SetHeaderEnd(): void;
        SkipHeader(buf: Uint8Array): void;
        Next(buf: Uint8Array, tag: Tag, tagSet: TagSet): boolean;
        private NextTemplate(buf, tag);
        private ParseTemplate(buf, tag);
        Restart(buf: Uint8Array): void;
        SetPos(pos: number): void;
    }
    class Maker {
        readonly buf: Uint8Array;
        pos: number;
        uniqueId: number;
        resendable: boolean;
        tagSet: TagSet;
        tagSetTags: TagSet;
        constructor(uniqueId?: number, m?: Maker);
        private IsDecimal(n);
        AddRaw(buf: Uint8Array): void;
        Add(tag: number, data: any): void;
        AddSeparator(): void;
        AddInt(tag: number, data: number): void;
        AddString(tag: number, data: string): void;
        AddBinary(tag: number, data: Uint8Array, dataPos: number, dataLen: number): void;
        AddBCD(tag: number, data: number): void;
        CheckSendSegmentedRequest(websocket: InfrontWebSocket, startPos: number): boolean;
        private readyStateToStr(readyState);
        Send(websocket: InfrontWebSocket): boolean;
    }
}
declare namespace IDS {
    import Instrument = Infront.Instrument;
    namespace API {
        class Unbind {
            unbind: () => void;
            instruments: Instrument[];
            feeds: number[];
        }
        class CallbackHandlerItem<CALLBACKS> {
            private refCount;
            cb: CALLBACKS;
            constructor(cb: CALLBACKS);
            AddRef(): boolean;
            DelRef(): boolean;
        }
        class CallbackHandler<CALLBACKS> {
            readonly singleRef: boolean;
            cb: CallbackHandlerItem<CALLBACKS>[];
            constructor(singleRef?: boolean);
            private find(cb);
            bind(cb: CALLBACKS): boolean;
            unbind(cb: CALLBACKS): boolean;
        }
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Instrument = Infront.Instrument;
    namespace API {
        namespace News {
            interface NewsCallbacks {
                OnNewsHeadline(headline: IDS.HeadlineItem): any;
                OnNewsHeadlineMulti(headlines: IDS.HeadlineItem[]): any;
                OnNewsReset(feed: number, date: Date): any;
            }
            class NewsManager implements AllResponseCallbacks, IDS.Realtime.RealtimeCallbacks {
                readonly pidSids: PidSid[];
                private serverPool;
                private realtime;
                private feedCache;
                private symbolCache;
                private binds;
                private feedCallbacks;
                private isNewsServer;
                constructor(serverPool: ServerPool, id?: string);
                private doneRealtime(id?);
                bind(obj: Object): () => void;
                private getSymbolCache(instrument);
                SubscribeSymbols(instruments: Instrument[], cb: NewsCallbacks): () => void;
                GetSymbolHeadlines(options: Realtime.HeadlineRequestParams, common: AllResponseCallbacks, cb: NewsCallbacks, subscribe: boolean): () => void;
                SubscribeFeeds(feeds: number[], cb: NewsCallbacks): () => void;
                resetHeadlinesCache(instrumentsOrFeeds: Instrument | Instrument[] | number[]): void;
                GetFeedsHeadlines(options: Realtime.HeadlineRequestParams, common: AllResponseCallbacks, cb: NewsCallbacks, subscribe: boolean): Unbind;
                GetStory(headline: HeadlineItem, theme: number, resp: CommonFrameworkResponse, withHeadline?: boolean): void;
                ResponseHeadline(header: ResponseHeader, data: IDS.HeadlineResponse): void;
                OnRealtimeHeadline(header: IDS.Header, headlines: IDS.HeadlineItem[], clientServer?: boolean): void;
                clearPending(feeds: number[]): void;
                OnRealtimeResetFeed(feed: number, date: Date): void;
                ResponseError(header: ResponseHeader): void;
            }
        }
    }
}
declare namespace IDS {
    namespace API {
        namespace Ranking {
            interface Callbacks {
                OnCSRanking(type: IDS.RankType, data: IDS.Realtime.Ranking[]): any;
                OnRTRanking(type: IDS.RankType, data: IDS.Realtime.Ranking): any;
            }
            class Scope {
                feed: number;
                type: IDS.RankType;
                subscribe: boolean;
                constructor(feed?: number, type?: IDS.RankType);
            }
            class RankingManager implements IDS.Realtime.RealtimeCallbacks {
                private serverPool;
                private scope;
                private rt;
                private ps;
                private acc;
                private cb;
                private unsubscribe;
                constructor(serverPool: ServerPool, scope: Scope, cb: Callbacks);
                unbind(): void;
                ChangeScope(scope: Scope): boolean;
                OnRealtimeRanking(header: Header, rank: IDS.Realtime.Ranking): void;
                ResponseError(resp: ResponseHeader): void;
                OnRefreshAll(header: Header): void;
            }
        }
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    class MortenTest4 implements ServerConnectionCallbacks {
        server: ServerConnection;
        constructor(host: string);
        lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
        lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
        lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect(ps: PidSid, subscriptionCount: number): void;
        lowLevelReRequestAll(header: Header): void;
        private packets;
    }
    class MortenTest3 implements ServerConnectionCallbacks {
        server: ServerConnection;
        constructor();
        lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
        lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
        lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect(ps: PidSid, subscriptionCount: number): void;
        lowLevelReRequestAll(header: Header): void;
    }
    class MortenTest2 implements IDS.LoginCallbacks, IDS.API.News.NewsCallbacks, IDS.API.Ranking.Callbacks, AllResponseCallbacks {
        serverPool: IDS.ServerPool;
        streaming: IDS.API.StreamingManager;
        news: IDS.API.News.NewsManager;
        rt: IDS.Realtime.RealtimeServer;
        output: any;
        table: any;
        ranking: IDS.API.Ranking.RankingManager;
        constructor();
        private CreateTable();
        EndLogin(success: boolean, respId: HeaderResponses, msg?: string): void;
        private writeToScreen(message);
        Request(d: Date, maxItems: number): void;
        testDate: Date;
        testFwdDate: Date;
        testId: string;
        testFwdId: string;
        TestBack(): void;
        TestForward(): void;
        OnRealtimeTrade?(header: Header, trade: IDS.Realtime.Trade): void;
        OnRealtimeResetFeed?(feed: number, date: Date): void;
        OnRealtimeHeadline?(header: Header, headline: HeadlineItem[]): void;
        OnRealtimeRanking?(header: Header, rank: IDS.Realtime.Ranking): void;
        OnNewsHeadline(headline: IDS.HeadlineItem): void;
        OnNewsHeadlineMulti(headlines: IDS.HeadlineItem[]): void;
        OnNewsReset(feed: number, date: Date): void;
        OnCSRanking(type: IDS.RankType, items: IDS.Realtime.Ranking[]): void;
        OnRTRanking(type: IDS.RankType, data: IDS.Realtime.Ranking): void;
        ResponseHeadline(header: ResponseHeader, hl: HeadlineResponse): void;
        ResponseError(header: ResponseHeader): void;
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Feed = Infront.Feed;
    import Instrument = Infront.Instrument;
    namespace Realtime {
        interface RealtimeCallbacks {
            OnRealtimeTrade?(header: Header, trade: Trade): void;
            OnRealtimeResetFeed?(feed: number, date: Date): void;
            OnRealtimeHeadline?(header: Header, headline: HeadlineItem[]): void;
            OnRealtimeRanking?(header: Header, rank: Ranking): void;
            OnRefreshAll?(header: Header): void;
            OnRealtimePing?(): void;
        }
        class HeadlineRequestParams {
            symbols: Instrument[];
            feeds: number[];
            date: Date;
            limitDate: Date;
            maxItems: number;
            newsIdHint: string;
            hasSymbols(): boolean;
            hasFeeds(): boolean;
        }
        class Ranking {
            instrument: Instrument;
            type: RankType;
            operation: RankOperation;
            last: number;
            change: number;
            pct_change: number;
            turnover: number;
            clear(): void;
            saveToSymbolCache(sym: Symbol): void;
            ToMws(): any;
        }
        class RankingResponse {
            items: Ranking[];
            toMws(): any;
        }
        class FindPortfolioSymbolResponse {
            items: {
                [index: number]: Instrument[];
            };
            addPortfolioSymbolItem(index: number, item: Instrument): void;
        }
        class SymbolDataResponse {
            items: Symbol[];
        }
        enum TimeSeriesResolution {
            TickByTick = 1,
            Minute = 2,
            Hour = 3,
            AccPrice = 4,
            PriceVolume = 5,
            Second = 6,
        }
        class TimeSeriesRequest {
            instrument: Instrument;
            startDate: Date;
            endDate: Date;
            daysBack: number;
            numberOfDays: number;
            maxIntradaysPoints: number;
            resolution: TimeSeriesResolution;
            stepSize: number;
            tags: (RealtimeTags | RealtimeDateTime | MwsRealtimeTags | PerformanceTags | MorningstarSEKPerformanceTags | AllRealtimeFundTags | RealtimeCalculatedHistoryTags)[];
            maxLookupDays: number;
        }
        class TimeSeriesItem {
            dateTime: Date;
            time: string;
            open: number;
            high: number;
            low: number;
            last: number;
            bid: number;
            ask: number;
            volume: number;
            turnover: number;
            yield: number;
            trType: number;
            ToMws(): void;
        }
        class TimeSeriesResponse {
            feed: number;
            symbol: string;
            startTrade: number;
            endTrade: number;
            resolution: TimeSeriesResolution;
            stepSize: number;
            items: TimeSeriesItem[];
            newDayOffsets: number[];
            instrument: Instrument;
            ToMws(): void;
        }
        class TradesRequest {
            instrument: Instrument;
            startDate: Date;
            endDate: Date;
            daysBack: number;
            tradesStart: number;
            tradesEnd: number;
            limitNumberOfTrades: number;
            private readonly resolution;
            tags: (RealtimeTags | RealtimeDateTime | MwsRealtimeTags | PerformanceTags | MorningstarSEKPerformanceTags | AllRealtimeFundTags | RealtimeCalculatedHistoryTags)[];
        }
        class Trade {
            symbol: Symbol;
            last: number;
            volume: number;
            yield: number;
            bid: number;
            ask: number;
            accumulatedVolume: number;
            dateTime: Date;
            market: string;
            buyer: string;
            seller: string;
            trTypeNu: number;
            trTypeStr: string;
            analysis: string;
            hitterTaker: number;
            actualTradeDate: number;
            actualTradeTime: number;
            tradeId: string;
            seq_id: number;
            time: string;
            mmt: string;
            esma: string;
            hasRealTimeTrade: boolean;
            Reset(): void;
            HasTrType(trType: number): boolean;
            IsDeleted(): boolean;
            ToMws(): void;
        }
        class TradesResponse {
            feed: number;
            symbol: string;
            tradesStart: number;
            endTrade: number;
            trades: Trade[];
            newDayOffsets: number[];
            instrument: Instrument;
            ToMws(): void;
        }
        class TickSizeRequestItem {
            feed: number;
            id: number;
            constructor(feed: number, id: number);
        }
        class TickSizeRequest {
            items: TickSizeRequestItem[];
        }
        class TickSize {
            feed: number;
            id: number;
            items: TickItem[];
            updateBounds(): void;
        }
        class TickSizeResponse {
            items: TickSize[];
            updateBounds(): void;
        }
        class RealtimeServer extends BaseIDSServer {
            readonly isNews: boolean;
            readonly serviceInfo: IDS.ServiceInfo;
            private feeds;
            private callbacks;
            private requests;
            private start;
            private stop;
            private staticData;
            private pendingStaticSymbols;
            private timerToken;
            private newsFeeds;
            private tag;
            private subTag;
            private tickSizes;
            private baLevel;
            private subParser;
            conn: ServerConnection;
            bypassStaticCache: boolean;
            constructor(ps: PidSid, serverPool: ServerPool, isNews?: boolean);
            destroyBase(): void;
            observe(cb: RealtimeCallbacks): void;
            unbind(cb: RealtimeCallbacks): void;
            private GetParser(buf);
            GetDbFeed(feednu: number, makeNew?: boolean): Feed;
            getDbSymbol(feedNu: number, symbolTicker: string, makeNew?: boolean): Symbol;
            GetTimeSeries(item: TimeSeriesRequest, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
            getTrades(item: TradesRequest, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
            GetBrokerStats(data: BrokerStatRequest, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
            GetHeadlines(params: HeadlineRequestParams, callback: AllResponseCallbacks, subscribe?: boolean): () => void;
            GetNewsStory(feednu: number, id: string, theme: number, callback: AllResponseCallbacks, common?: CommonFrameworkResponse, withNewsHeadline?: boolean): void;
            private getTickSizeKey(feed, tickSizeId);
            GetTickSize(item: TickSizeRequest, callback: AllResponseCallbacks): void;
            GetFeeds(feeds: number[], content: SymbolContent, subscribe?: boolean): any;
            GetSymbols(instruments: Instrument[], content: SymbolContent, subscribe?: boolean, refresh?: boolean): void;
            ChangeSymbols(instruments: Instrument[], content: SymbolContent, subscribe?: boolean, unbind?: () => void): void;
            private needStaticData(symbol);
            private processPendingStaticSymbols(feed);
            GetRanking(feednu: number, rankType: RankType, callback: AllResponseCallbacks, subscribe?: boolean, common?: CommonFrameworkResponse): void;
            GetPortfolioSymbols(ps: PidSid, items: {
                [position: number]: PortfolioBaseItem;
            }, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
            UnsubRanking(feednu: number, rankType: RankType): void;
            private SeqIdMap;
            private ResponseTimeSeries(header, req);
            private ResponseTrades(header, req);
            private ResponseBrokerStats(header, req);
            private ResponseHeadlines(header, req);
            private ResponseNewsStory(header, req);
            private ResponseTickSize(header, req);
            private ResponseRanking(header, req);
            private ResponseFindPortfolioSymbols(header, req);
            private ResponseStaticData(header, req);
            private GetSequenceId(key);
            private ParseTrade(f, sym, header, buf, parser);
            private ParseMboOrders(sym, header, buf, parser);
            private ParseMblOrders(sym, header, buf, parser, baLevel);
            private ParseStaticData(sym, header, buf, parser);
            private ParseNews(header, buf, parser, feed);
            private ParseRanking(sym, header, buf, parser, rankType);
            private ResetFeed(f);
            private ResetMboOrderbooks(f);
            private ResetOrderbooks(f);
            private NotifyPing();
            lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
            private StartStopThrottle();
            private StartThrottleTimerIfNotRunning();
            SubscribeFeed(feeds: number[], content: SymbolContent): () => void;
            UnsubscribeFeeds(feeds: number[], content: SymbolContent): void;
            UnsubscribeSymbols(instruments: Instrument[], content: SymbolContent): void;
            private DistTrade(header, data);
            lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
            lowLevelReRequestAll(header: Header): void;
            lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
            lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
        }
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Instrument = Infront.Instrument;
    class FindOptionPart {
        underFeed: number;
        underTicker: string;
        underBase: string;
        expiry: number;
        strike: number;
        OpenInterest: number;
        optionSearch: boolean;
    }
    class FindFundPart {
        countryOfSale: string;
        morningstarRating: number[];
        morningstarRating3Y: number[];
        fundOngoingCharge: number;
        riskMeasure: string;
        regionExposure: string;
        portfolioManager: string;
        topHolding: string[];
        fundType: string;
        baseCurrency: string;
        morningstarSecId: string;
        investmentStyle: string;
        incomeType: string;
    }
    class ForexFindPart {
        tenor: string;
        curr1: string;
        curr2: string;
    }
    class BloombergFindPart {
        ticker: string;
        globalId: string;
        globalIdComposite: string;
    }
    class BondFindPart {
        couponRate: number;
        expiryType: number;
        bondType: number;
        minDenomination: number;
        approxYield: number;
        mainType: number;
        couponType: number;
        description: string;
        issuerIndustry: string;
        issuerId: string;
        issuerIsin: string;
        issueDate: string;
    }
    enum ItemType {
        Symbol = 1,
        Company = 2,
        Chain = 4,
        Screen = 8,
    }
    class SearchSymbol {
        maxItems: number;
        feed: number[];
        useTagClearsPrev: boolean;
        useTag: number[];
        symbol: string;
        fullname: string;
        symbolType: number;
        symbolSubType: number;
        isin: string;
        currency: string;
        exchSymbol: string;
        issuer: string;
        issuerFullName: string;
        primarySegment: string;
        secondarySegment: string;
        mic: string;
        emptyTags: number[];
        option: FindOptionPart;
        fund: FindFundPart;
        forex: ForexFindPart;
        bloomberg: BloombergFindPart;
        bond: BondFindPart;
        freeText: string;
        freeTextTagMustMatch: number[];
        itemType: ItemType;
        searchRangeTag: number[];
        searchRangeLowerLimit: number;
        searchRangeUpperLimit: number;
        sortNu: number;
    }
    class Company {
        id: string;
        name: string;
    }
    class Chain {
        feed: number;
        name: string;
        description: string;
        provider: number;
        ToMws(): void;
    }
    class Underlying {
        feed: number;
        ticker: string;
        base: string;
        descr: string;
    }
    class Option {
        strike: number;
        expiry: number;
        expiryType: number;
    }
    class SymbolResponseItem {
        sortNu: number;
        items: {
            [tag: number]: any;
        };
        feed: number;
        symbol: string;
        fullName: string;
        isin: string;
        symbolType: number;
        symbolSubType: number;
        underlying: Underlying;
        option: Option;
        company: Company;
        chain: Chain;
        issuer: string;
        IssuerFullName: string;
        country: string;
        countryOfIncorporation: string;
        sector: string;
        instrument: Instrument;
        type: string;
        ToMws(loginServer: LoginServer): void;
    }
    class SymbolResponse {
        items: SymbolResponseItem[];
        ToMws(loginServer: LoginServer): void;
    }
    class SearchServer extends BaseIDSServer {
        private requests;
        constructor(ps: PidSid, serverPool: ServerPool);
        static Search(searchServer: SearchServer, search: SearchSymbol | SearchSymbol[], callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
        private _Company(a);
        private _Chain(a);
        private _Under(a);
        private _Option(a);
        private ResponseSearch(header, req);
        lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
        lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
        lowLevelReRequestAll(header: Header): void;
        lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Instrument = Infront.Instrument;
    var overrideHost: string;
    var loginOk: boolean;
    var localTerminalLoopback: boolean;
    var useVerificationLoginServer: boolean;
    enum SegmentInfo {
        First = 0,
        More = 1,
        Last = 2,
    }
    function segmentToStr(value: SegmentInfo): string;
    enum ConnectionState {
        None = 0,
        Connecting = 1,
        WaitFirstPacket = 2,
        Running = 3,
        Closing = 4,
        Suspended = 5,
        Closed = 6,
    }
    class Header {
        clientServer: boolean;
        request: number;
        responseId: number;
        userData: number;
        uniqueId: number;
        pid: number;
        sid: number;
        segment: SegmentInfo;
        responseMsg: string;
        constructor(ps?: PidSid);
        idStr(): string;
        psToStr(): string;
        inspect(tagSet: TagSet): {};
    }
    interface ServerConnectionCallbacks {
        lowLevelData?(header: Header, buf: Uint8Array, parser: Parser): void;
        lowLevelError?(header: Header, responseId: HeaderResponses, msg: string): void;
        lowLevelConnect?(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect?(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
        lowLevelReRequestAll?(header: Header): void;
    }
    class ConnectionStatus {
        pid: number;
        sid: number;
        serverType: ServerType;
        serverDescription: string;
        feedDescription: string;
        serverIndex: string;
        host: string;
        lastTriedConnectTime: number;
        lastSuccessfulConnectTime: number;
        connectionState: ConnectionState;
        connectionStateDescription: string;
        resubscribeCount: number;
        totalReRequestCount: number;
        connectionAttemptCount: number;
        constructor(serverType: ServerType, pidSid: PidSid);
    }
    class ServerConnection implements TransportCallbacks {
        hosts: string[];
        readonly feedAccess: number[];
        readonly encrypt: boolean;
        readonly tagSet: TagSet;
        private callbacks;
        protected websocket: InfrontWebSocket;
        protected subscribe: SubscriptionDb;
        protected reconnectTimerId: number;
        protected pingTimeout: number;
        protected pingCounter: number;
        private hostNu;
        private lastSuccessHostNu;
        private ConnectTimeout;
        private requests;
        private readyForRequests;
        private seqNu;
        protected maxRetries: number;
        private core;
        private authCounter;
        private rawDebug;
        private rawDebugCounter;
        private rawDebugPackets;
        private firstConnection;
        protected checkTimerMs: number;
        protected timersPerSecond: number;
        ps: PidSid;
        monitorServerConnection: boolean;
        protected subscribeTimeout: number;
        private startLoginProvider;
        private dataReceived;
        resubscribeOnReconnect: boolean;
        isLoginServer: boolean;
        status: ConnectionStatus;
        onStatusChange: (serverStatus: ConnectionStatus) => void;
        private overflowBuffer;
        constructor(ps: PidSid, encrypt: boolean, callbacks: ServerConnectionCallbacks, feedAccess: number[], hosts: string[], tagSet: any, core: IDS.ServerPool, serverType: ServerType, isLoginServer?: boolean, rawDebug?: boolean);
        start(): void;
        Destroy(): void;
        private setConnectionState(state);
        OutstandingRequests(): number;
        ClearOutstandingRequests(): void;
        SubscriptionCount(): number;
        private Close();
        LoginKillConnection(): void;
        private IsIp4(s);
        private HostToDns(s, pid?, sid?);
        protected ConnectNext(): void;
        protected connectionShouldClose(): boolean;
        protected CheckConnection(): void;
        Register(callback: ServerConnectionCallbacks): void;
        private Unregister(callback);
        private Data(header, buf, parser);
        GetRequest(request: number, userUniqueId: number): Maker;
        SubscribeFeeds(feeds: number[], obj?: Object): () => void;
        UnsubscribeFeeds(feeds: number[], obj?: Object): boolean;
        SubscribeSymbols(instruments: Instrument[], obj?: Object): boolean;
        UnsubscribeSymbols(instruments: Instrument[], obj?: Object): boolean;
        UnsubscribeObject(obj: Object): boolean;
        protected Resubscribe(): boolean;
        protected SendPing(): boolean;
        protected SendClose(): boolean;
        SendAuthenticationRequest(): boolean;
        Send(buf: Maker, resendable: boolean): boolean;
        private ReRequest();
        private LoginProvider();
        private LoginProviderAuth();
        private StartRealtime();
        onOpen(evt: any): void;
        onClose(evt: CloseEvent): void;
        onMessage(evt: any): void;
        onError(evt: ErrorEvent): void;
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Db = Infront.Db;
    interface ServerCallbacks {
        ResponseServerStatus?(any: any): void;
        StreamingServerStatus?(any: any): void;
    }
    enum ServerType {
        Unknown = 0,
        Realtime = 1,
        Trading = 2,
        History = 3,
        Search = 4,
        Chain = 5,
        Storage = 6,
        Calendar = 7,
        Morningstar = 8,
        Alert = 9,
        Login = 10,
        Wire = 11,
    }
    class ServerPool implements LoginCallbacks {
        private servers;
        private endLogin;
        secure: boolean;
        login: LoginServer;
        streamingManager: API.StreamingManager;
        symbolDb: Db;
        staticCache: StaticDataCache;
        loginId: number;
        authCounter: number;
        private connections;
        private callbacks;
        constructor();
        Start(login: string, password: string, secure: boolean, ssoToken?: string, host?: string[]): void;
        private Timer();
        RegisterEndLogin(cb: any): void;
        UnregisterEndLogin(cb: any): void;
        private GetServerIndex(ps, serverType, isNews?);
        RegisterStreaming(ps: PidSid, serverType: ServerType, cb: any): boolean;
        UnregisterStreaming(ps: PidSid, serverType: ServerType, cb: any): boolean;
        reset(): void;
        private LogMsg(ps, msg, id?);
        private GetServer(ps, serverType, isNews?);
        private AddServer(ps, server, isNews?);
        GetRealtime(ps: PidSid, owner: Object, isNews?: boolean, id?: string): Realtime.RealtimeServer;
        GetTrading(ps: PidSid, owner: Object, streamingManager: API.StreamingManager, id?: string): TradingServer;
        GetHistory(ps: PidSid, owner: Object, id?: string): HistoryServer;
        GetSearch(ps: PidSid, owner: Object, id?: string): SearchServer;
        GetChain(ps: PidSid, owner: Object, id?: string): ChainsServer;
        GetStorage(ps: PidSid, owner: Object, id?: string): StorageServer;
        GetCalendar(ps: PidSid, owner: Object, id?: string): CalendarServer;
        GetMorningstar(ps: PidSid, owner: Object, id?: string): API.MorningstarServer;
        GetAlert(ps: PidSid, owner: Object, id?: string): API.AlertsServer;
        GetWire(ps: PidSid, owner: Object, id?: string): Wire.WireServer;
        Dispose(ps: PidSid, serverType: ServerType, owner: Object, id?: string): void;
        register(callback: ServerCallbacks): void;
        unRegister(callback: ServerCallbacks): void;
        getConnectionStatus(callback: ServerCallbacks, subscribe: boolean): () => void;
        private onConnectionStatusChange;
        EndLogin(success: boolean, responseId: HeaderResponses, msg: string): void;
        private tmpAuthSegments;
        private authSegments;
        ResponseAuthentication(header: Header, inBuf: Uint8Array, parser: Parser): void;
        GetAuth(ps: PidSid): Uint8Array[];
        GetAuthRaw(): Uint8Array[];
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Instrument = Infront.Instrument;
    class StorageCategoryItem {
        name: string;
        properties: string[];
        constructor(category: string);
        addProperty(property: string): void;
    }
    class CategoriesResponse {
        items: {
            [category: string]: StorageCategoryItem;
        };
        addCategory(category: string): StorageCategoryItem;
    }
    class StorageListItem {
        instrument: Instrument;
        extra: {
            [key: string]: string;
        };
        constructor(feed: number, ticker: string);
        hasValue(tag: StorageXmlTags): boolean;
        isValid(): boolean;
    }
    class StorageListProperties {
        [key: string]: string;
    }
    class StorageListContent {
        items: StorageListItem[];
        referenceIndex: StorageListItem;
        listProperties: StorageListProperties;
        getListProperty(name: string): string;
    }
    class ListResponseItem {
        id: string;
        categories: {
            [category: string]: string;
        };
        title: string;
        description: string;
        crc32: number;
        size: number;
        hasCategory(cat: StorageXmlTags): boolean;
        category(cat: StorageXmlTags): string;
    }
    class ListResponse {
        items: ListResponseItem[];
    }
    class GetFileRequest {
        id: string;
    }
    class PutFileRequest {
        type: string;
        title: string;
        listHeader: ListResponseItem;
        description: string;
        xml: string;
        pos: number;
        private setField(item, node, tag);
        MakeWatchlist(content: StorageListContent): void;
    }
    class PutMobileListRequest extends PutFileRequest {
        constructor(title: string, content: StorageListContent, listHeader: ListResponseItem);
    }
    class PutFileResponse {
        id: string;
        title: string;
        description: string;
        crc32: number;
        size: number;
    }
    class GetFileResponse {
        title: string;
        description: string;
        crc32: number;
        size: number;
        contentId: number;
        xml: string;
        private setField(item, symbolNode, tag);
        private setListProperty(list, listNode, tag);
        DecodeWatchlist(): StorageListContent;
    }
    class DeleteFileResponse {
    }
    class StorageServer extends BaseIDSServer {
        private requests;
        constructor(ps: PidSid, serverPool: ServerPool);
        private addCategoryProperty(m, category, property);
        private addLoginInfo(maker);
        GetCategories(callback: AllResponseCallbacks): void;
        GetList(callback: AllResponseCallbacks): void;
        GetFile(item: GetFileRequest, callback: AllResponseCallbacks): void;
        private isValidCategory(category);
        PutFile(item: PutFileRequest, callback: AllResponseCallbacks): void;
        DeleteFile(id: string, callback: AllResponseCallbacks): void;
        private ResponseCategories(header, req);
        private ResponseList(header, req);
        private ResponseGetFile(header, req);
        private ResponseDeleteFile(header, req);
        private ResponsePutFile(header, req);
        lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
        lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
        lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
    }
}
declare namespace IDS {
    import Instrument = Infront.Instrument;
    import PidSid = Infront.PidSid;
    class OneSubscribe {
        private refCount;
        private os;
        private GetObj(obj);
        GetObjRefCount(obj: Object): number;
        GetRef(): number;
        IncRef(obj: Object): boolean;
        DecRef(obj: Object, allFromObj: boolean): boolean;
        UnbindObj(obj: Object): boolean;
    }
    class SubscribeFeed {
        symbols: {
            [symbol: string]: OneSubscribe;
        };
    }
    class SubscriptionDb {
        feeds: {
            [feednu: number]: OneSubscribe;
        };
        symbols: {
            [feendu: number]: SubscribeFeed;
        };
        HasFeed(feednu: number, obj?: Object): boolean;
        HasSymbol(feednu: number, symbol: string, obj?: Object): boolean;
        HasFeedOrSymbol(feednu: number, symbol: string, obj?: Object): boolean;
        Empty(): boolean;
        Clear(): void;
        Count(): number;
        addFeed(feednu: number, ps: PidSid, obj?: Object): boolean;
        delFeed(feednu: number, ps: PidSid, obj?: Object, allFromObj?: boolean): boolean;
        addSymbol(feednu: number, symbol: string, ps: PidSid, obj?: Object): boolean;
        delSymbol(feednu: number, symbol: string, ps: PidSid, obj?: Object, allFromObj?: boolean): boolean;
        GetSubscribedSymbols(feednu: number, obj?: Object): string[];
        GetSubscribedInstruments(obj?: Object): Instrument[];
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Instrument = Infront.Instrument;
    import Value = Infront.Value;
    class TradingConstants {
        static PortfolioName: string;
    }
    class BaseTradeResponse {
        failCode: FailCodes;
        failMessage: string;
        getFailMessage(): string;
        success(): boolean;
    }
    class LoginResponse extends BaseTradeResponse {
        feed: number;
        serverProps: ServerProperties;
        serverProps2: ServerProperties2;
        serverProps3: ServerProperties3;
        serverProps4: ServerProperties4;
        userProps: UserProperties;
        internalUser: boolean;
        limitPerDay: number;
        limitPerOrder: number;
        limitCurrency: string;
        safetyLimitOverride: boolean;
        defaultOrderWarning: string;
        customerId: string;
        loginToken: string;
        LoginSignedToken: string;
        ExecutionMarket: string;
        pidSid: PidSid;
        hasServerProp(prop: ServerProperties): boolean;
        hasServerProp2(prop: ServerProperties2): boolean;
        hasServerProp3(prop: ServerProperties3): boolean;
        hasServerProp4(prop: ServerProperties4): boolean;
        hasUserProp(prop: UserProperties): boolean;
        logStreamingDetails(prefix?: string): void;
        ToMws(): any;
    }
    class PortfolioNamesResponse extends BaseTradeResponse {
        items: any[];
    }
    function getValue(value1: string, value2?: string, value3?: string): string;
    class PortfolioBaseItem {
        protected data: {
            [tag: number]: Value;
        };
        portfolio: string;
        symbolRef: Symbol;
        symbolMappingStatus: string;
        isEmpty(): boolean;
        inspect(): any;
        getVal(tag: TradingTag, makeNew?: boolean): Value;
        getValue(tag: TradingTag): any;
        setValue(tag: TradingTag, value: any): void;
        addValueToObject(targetObject: Object, propertyName: string, valueId: TradingTag): void;
        addValueCallbackToObject(targetObject: Object, propertyName: string, valueId: TradingTag, getValueCallback: (value: number) => any): void;
        hasUnresolvedSymbol(): boolean;
        getKey(): string;
        applyFeedSymbol(instrument: Instrument): void;
    }
    enum PositionType {
        Position = 0,
        Cash = 1,
        Value = 2,
        Alert = 3,
    }
    class PortfolioPosition extends PortfolioBaseItem {
        isDirty: boolean;
        getPortfolioItemType(): PositionType;
        getCustomMoneyKindData(): any;
        positionToMws(): Object;
        ToMws(): {
            position: Object;
            value?: undefined;
            alert?: undefined;
        } | {
            value: Object;
            position?: undefined;
            alert?: undefined;
        } | {
            alert: Object;
            position?: undefined;
            value?: undefined;
        };
    }
    class PortfolioResponse extends BaseTradeResponse {
        portfolio: PortfolioDataSet;
        items: PortfolioPosition[];
        constructor(portfolio?: PortfolioDataSet);
        ToMws(inspect?: boolean): any;
    }
    class TradingPowerItem {
        portfolio: string;
        displayPortfolio: string;
        tradingPower: number;
        tradingPowerStatus: number;
        symbol: string;
        loanToValueRatio: number;
        shortable: boolean;
        currency: string;
        baseCurrency: string;
        timeReceived: number;
        constructor(item?: TradingPowerItem);
        assign(item: TradingPowerItem): void;
        isStale(): boolean;
        ToMws(): any;
    }
    class TradingPowerResponse extends TradingPowerItem {
        failCode: FailCodes;
        failMessage: string;
        success(): boolean;
    }
    class DropdownItem {
        label: string;
        value: string;
        componentCode: string;
    }
    class AlgoParamItem {
        id: string;
        typeNu: number;
        default: string;
        label: string;
        description: string;
        mandatory: boolean;
        min: number;
        max: number;
        dropdown_items: DropdownItem[];
        value: string;
        maxLen: number;
        multiLine: boolean;
        element: string;
        feeds: number[];
        property: ParamProperties;
        customNuRef: number;
        constructor(id?: string);
        addDropdownItem(dropdown: DropdownItem): void;
        addFeed(feed: number): void;
        isHidden(feed: number): boolean;
        getParamProperties(): string[];
        private getDefaultDropdownValue(value);
        ToMws(feed: number): any;
    }
    class AlgoItem {
        id: string;
        label: string;
        description: string;
        params: AlgoParamItem[];
        brokerId: string;
        userId: string;
        properties: AlgoProperties;
        markets: string[];
        _tmpParam: AlgoParamItem;
        constructor(id?: string);
        addParamItem(param: AlgoParamItem): void;
        getAlgoProperties(): string[];
        availableForMarket(market: string): boolean;
        ToMws(feed: number): any;
    }
    class AlgorithmsResponse extends BaseTradeResponse {
        items: AlgoItem[];
        getAlgosForMarket(market: string): AlgoItem[];
        ToMws(feed?: number, market?: string): any;
    }
    class CustomField {
        market: string;
        id: number;
        type: string;
        typeNu: number;
        label: string;
        forOrderTypes: string[];
        display: string;
        value: string;
        default: string;
        mandatory: boolean;
        properties: number;
        modify: boolean;
        maxLen: number;
        dropdown_items: DropdownItem[];
        forFeeds: number[];
        private addDropdownItem(dropdown, isDefault);
        addOrderType(orderType: number): void;
        addFeed(feedNu: number): void;
        addDisplayValues(displayText: string, valueText: string, componentCode: string): boolean;
        ToMws(): void;
    }
    class CustomFieldsResponse extends BaseTradeResponse {
        feed: number;
        portfolio: string;
        displayPortfolio: string;
        defaultPortfolio: string;
        portfolioDescription: string;
        items: CustomField[];
        dropdownItems: any;
        ToMws(market: string): any;
    }
    class MarketPlace {
        marketName: string;
        marketProperties: number;
        marketProperties2: number;
        marketProperties3: number;
        maxValidDays: number;
        orderTypes: number[];
        feeds: number[];
        constructor(marketName: string);
        hasMarketProp(prop: ServerProperties): boolean;
        hasMarketProp2(prop: ServerProperties2): boolean;
        hasMarketProp3(prop: ServerProperties3): boolean;
        private orderTypesToStr();
        findFeeds(login: LoginServer): void;
        ToMws(): any;
    }
    class MarketPropertiesResponse extends BaseTradeResponse {
        feed: number;
        markets: MarketPlace[];
        getMarket(marketName: string): MarketPlace;
        findFeedsForMarkets(login: LoginServer): void;
        ToMws(): any;
    }
    class CustomTag {
        id: number;
        value: string;
        label: string;
        constructor(id: number, value: string, label?: string);
        setLabel(label: string): void;
    }
    class OrderStatusItem extends PortfolioBaseItem {
        orderStatusStr: string;
        tempCustomId: number;
        customTags: CustomTag[];
        algo: AlgoItem;
        trades: {
            [tradeId: string]: TradeItem;
        };
        private getAvgPrice();
        inspect(): any;
        orderId(): string;
        orderStatus(): OrderStatus;
        setOrderStatus(value: OrderStatus): void;
        getRemainingVolume(): number;
        getDisplayOrderStatus(): string;
        addCustomTag(id: number, value: string): void;
        addTrade(trade: TradeItem): void;
        getOrderRequest(): OrderRequest;
        canModify(loginData: LoginResponse): boolean;
        assign(item: OrderStatusItem): void;
        ToMws(): any;
        hasErrorContent(): boolean;
    }
    class TradeItem extends PortfolioBaseItem {
        order: OrderStatusItem;
        orderId(): string;
        tradeId(): string;
        ToMws(): any;
    }
    class NetTradeItem {
        portfolio: string;
        market: string;
        isin: string;
        currency: string;
        symbol: string;
        symbolRef: Symbol;
        exchangeInstrumentId: string;
        buyVwap: number;
        buyVolume: number;
        buyValue: number;
        sellVwap: number;
        sellVolume: number;
        sellValue: number;
        netPrice: number;
        netVolume: number;
        netValue: number;
        constructor(order: OrderStatusItem);
        private getContractSize();
        addTrade(trade: TradeItem): void;
        ToMws(): any;
    }
    class SymbolMappingCache {
        private items;
        addSymbol(item: PortfolioBaseItem, instrument: Instrument): void;
        getSymbol(key: string): Instrument;
    }
    class PortfolioDataSet {
        readonly streamingManager: API.StreamingManager;
        name: string;
        description: string;
        displayName: string;
        defaultPortfolio: string;
        type: PortfolioTypes;
        orders: {
            [orderId: string]: OrderStatusItem;
        };
        trades: {
            [tradeId: string]: TradeItem;
        };
        netTrades: {
            [key: string]: NetTradeItem;
        };
        positions: {
            [key: string]: PortfolioPosition;
        };
        tradingPowerItem: TradingPowerItem;
        timeTradingPowerRequest: number;
        timePortfolioRequest: number;
        constructor(streamingManager: API.StreamingManager, name: string);
        clearOrdersAndTrades(): void;
        clearOrders(): void;
        clearTrades(): void;
        addPosition(position: PortfolioPosition): void;
        addOrder(newItem: OrderStatusItem): OrderStatusItem;
        updateTradingPower(item: TradingPowerItem): void;
        tradingPowerIsStale(): boolean;
        applyMappedSymbolsFromCache(symbolMappingCache: SymbolMappingCache, streamingMgr: API.StreamingManager): void;
        addTrade(trade: TradeItem): NetTradeItem;
        fullName(): string;
        getPositions(): PortfolioPosition[];
        setPositionsDirty(): void;
        getNetTrades(): {
            net_trades: any[];
        };
        tradingPowerRequested(): boolean;
        tradingPowerNotRequested(): boolean;
        getSymbolMappingList(): PortfolioBaseItem[];
        ToMws(includeDeletedOrders?: boolean): any;
    }
    class PortfolioDb {
        readonly streamingManager: API.StreamingManager;
        items: {
            [portfolioName: string]: PortfolioDataSet;
        };
        constructor(streamingManager: API.StreamingManager);
        clear(): void;
        get(portfolioName: string): PortfolioDataSet;
        addPosition(position: PortfolioPosition, aPortfolio?: PortfolioDataSet): void;
        addOrder(order: OrderStatusItem, aPortfolio?: PortfolioDataSet): OrderStatusItem;
        addTrade(trade: TradeItem, usePortfolio?: PortfolioDataSet): NetTradeItem;
        getOrder(portfolioName: string, orderId: string): OrderStatusItem;
        portfolioNames(): any;
        updateTradingPower(item: TradingPowerItem): void;
    }
    class OrderListResponse extends BaseTradeResponse {
        portfolio: PortfolioDataSet;
        applyCustomFields: (data: Object) => void;
    }
    class InsertOrderResponse extends BaseTradeResponse {
        orderId: number;
        orderStatus: OrderStatus;
        orderStatusText: string;
        customerId: string;
        autoActivate: boolean;
        symbol: string;
        exchangeInstrumentId: string;
        underlying: string;
        feed: number;
        instrumentType: number;
        instrumentSubType: number;
        isin: string;
        market: string;
        currency: string;
        ExecutionMarket: string;
        setOrderStatus(value: OrderStatus): void;
        ToMws(): any;
    }
    class ModifyOrderResponse extends BaseTradeResponse {
        orderId: number;
        ToMws(): any;
    }
    class DeleteOrderResponse extends BaseTradeResponse {
        orderId: number;
        customerId: string;
        autoDelete: boolean;
        ToMws(): any;
    }
    class ActivateOrderResponse extends BaseTradeResponse {
        orderId: number;
        orderStatus: OrderStatus;
        orderStatusText: string;
        setOrderStatus(value: OrderStatus): void;
        ToMws(): any;
    }
    class RiskLevelResponse extends BaseTradeResponse {
        order: OrderStatusItem;
    }
    class TickSizeResponse extends BaseTradeResponse {
        items: Realtime.TickSize[];
    }
    class OrderEntryEvent {
        feed: number;
        portfolio: string;
        failCode: FailCodes;
        failEventId: string;
        failDescription: string;
        requestId: number;
        hasErrorContent(): boolean;
    }
    enum Position {
        buy = 1,
        sell = 2,
    }
    class OrderRequest {
        symbolRef: Symbol;
        market: string;
        portfolio: string;
        orderType: OrderTypes;
        orderStatus: OrderStatus;
        position: Position;
        price: number;
        volume: number;
        openVolume: number;
        feedNu: number;
        symbol: string;
        mic: string;
        exchOrderId: string;
        comment: string;
        lastPrice: number;
        lastTradeDate: number;
        validUntil: number;
        customFields: Object[];
        algoId: string;
        algoParams: Object[];
        customerId: string;
        changeHist: string;
        orderId: string;
        activeOrder: boolean;
        customerReference: string;
        addCustomerId(customerId: string): void;
    }
    class TickSizeRequest {
        feed: number;
        symbol: string;
        isin: string;
        mic: string;
    }
    class TradingRequestItem extends BaseRequest {
        portfolioRef: PortfolioDataSet;
        order: OrderStatusItem;
        callback: TradingCallbacks;
    }
    class TradingServerConnection extends ServerConnection {
        static readonly defaultCheckTimerMs: number;
        constructor(ps: PidSid, encrypt: boolean, callbacks: ServerConnectionCallbacks, feedAccess: number[], hosts: string[], tagSet: any, core: IDS.ServerPool, serverType: ServerType, isLoginServer?: boolean, rawDebug?: boolean);
        protected CheckConnection(): void;
    }
    class TradingServer extends BaseIDSServer {
        readonly feeds: number[];
        private password;
        private pin;
        private token;
        private tokenType;
        private streaming;
        private requests;
        private loginDone;
        private hasPendingLogin;
        private login;
        private callbacks;
        private tag;
        private subParser;
        private tradesRequested;
        private timerToken;
        private tpTimerToken;
        private disconnectTimerToken;
        private subscriptions;
        private symbolMappingCache;
        private markets;
        private serviceInfo;
        private customFieldLabelLookup;
        private customFieldsRequested;
        loginData: LoginResponse;
        portfolios: PortfolioDb;
        algos: AlgorithmsResponse;
        customFields: CustomFieldsResponse;
        includeDeletedOrders: boolean;
        constructor(ps: PidSid, serverPool: ServerPool, streaming: API.StreamingManager, login?: string, password?: string, pin?: string, token?: string, tokenType?: string);
        private hasStreamingPortfolioUpdates();
        private tradingPowerNotSupported();
        private hasStreamingTradingPowerUpdates();
        Register(cb: TradingCallbacks): void;
        Unregister(cb: TradingCallbacks): void;
        private GetParser(buf);
        private hasPortfolioSubscription(name);
        private subscribePortfolio(name);
        private unsubscribePortfolio(name);
        unsubscribeAll(): void;
        private IsTradableFeed(feedNu);
        private errorCallback(callback, failMessage);
        Login(login: string, password: string, pin: string, token?: string, tokenType?: string, common?: CommonFrameworkResponse): void;
        GetMarketplaceForFeed(feedNu: number): string;
        GetPortfolioNames(callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        private hasRecentPortfolioUpdate(portfolio);
        GetPortfolio(portfolioName: string, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        private checkSoldPositions(portfolioDataSet);
        private updatePortfolio(portfolioName);
        private updateOrdersAndTrades(portfolioName);
        private SendTradingPowerRequest(portfolio, instrument, callback, common?);
        private GetCachedTradingPower(portfolio, callback, common);
        private initTradingPower(portfolio);
        private updateTradingPower(portfolio);
        private NeedTradingPower(portfolio);
        GetTradingPower(portfolioName: string, instrument: Instrument, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        GetAlgorithms(callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        GetCustomFields(callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        GetMarketProperties(callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        sendOrderTradeRequest(request: TradingRequest, portfolioName: string, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        GetOrdersAndTrades(portfolioName: string, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        GetNetTrades(portfolioName: string, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        private GetExchInstrument(feedNu, symbol);
        private addSymbolTags(m, symbol);
        private addRequestTags(m, request);
        InsertOrder(orderRequest: OrderRequest, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        RequestRiskLevel(portfolioName: string, orderId: string, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        private applyOrderFieldsToModifyOrder(orderRequest, order);
        ModifyOrder(orderRequest: OrderRequest, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        DeleteOrder(portfolio: string, orderId: string, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        GetTickSizes(tickSizeRequest: TickSizeRequest, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        supportServerPropertyForMarketPlace(property: ServerProperties, marketName: string): boolean;
        supportServerProperty2ForMarketPlace(property: ServerProperties2, marketName: string): boolean;
        supportServerProperty3ForMarketPlace(property: ServerProperties3, marketName: string): boolean;
        hasUserProp(property: UserProperties): boolean;
        private ActivateOrderRequest(order, activate, callback, common?);
        ActivateOrder(portfolio: string, orderId: string, activate: boolean, callback: TradingCallbacks, common?: CommonFrameworkResponse): void;
        private extractUndeterminedItems(items);
        private getSymbolScore(instrument, item);
        private findBestSymbol(symbolsList, item);
        private requestSymbolMapping(items, callback);
        private ResponseLogin(header, req);
        private ResponsePortfolioNames(header, req);
        private ResponsePortfolioPositions(header, req);
        private ResponseTradingPower(header, req);
        private ResponseAlgorithms(header, req);
        private ResponseCustomFields(header, req);
        GetCustomFieldLabel(market: string, value: string): any;
        private ResponseMarketProperties(header, req);
        private ProcessPortfolioItem(item, tag, buf);
        private ProcessOrderItem(item, tag, buf);
        private ProcessTradeItem(item, tag, buf);
        private ResponseOrdersAndTradesList(header, req, isOrders);
        private DistributeOrdersAndTradesList(header, req, resp);
        private ResponseInsertOrder(header, req);
        private ResponseModifyOrder(header, req);
        private ResponseDeleteOrder(header, req);
        private ResponseActivateOrder(header, req);
        private responseRiskLevel(header, req);
        private responseTickSize(header, req);
        private StreamingOrder(header, buf, parser);
        private StreamingOrderStatus(header, buf, parser);
        private StreamingTrade(header, buf, parser);
        private StreamingPortfolioPositionUpdate(header, buf, parser);
        private StreamingTradingPower(header, buf, parser);
        lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
        lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
        lowLevelReRequestAll(header: Header): void;
        private reconnect();
        private clearDisconnectTimer();
        lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
    }
}
declare module Infront {
    class WatchlistEntry extends Observable<any> {
        instrument: Instrument;
        symbol: IDS.Symbol;
        extra: {
            [key: string]: string;
        };
        constructor(streamingManager?: IDS.API.StreamingManager, instrument?: Instrument);
        applyStorageListItem(streamingManager: IDS.API.StreamingManager, item: IDS.StorageListItem): void;
        getStorageListItem(): IDS.StorageListItem;
        hasValidInstrument(): boolean;
        hasValue(tag: IDS.StorageXmlTags): boolean;
        getValue(tag: IDS.StorageXmlTags): string;
        getDecimals(): number;
        getFormattedValue(tag: IDS.StorageXmlTags, decimals?: number): string;
        getNumValue(tag: IDS.StorageXmlTags): number;
        setValue(tag: IDS.StorageXmlTags, value: string): void;
    }
    class Watchlist {
        isReadOnly: boolean;
        id: string;
        entries: ObservableArray;
        referenceIndex: WatchlistEntry;
        listProperties: IDS.StorageListProperties;
        advanced: boolean;
        streamingManager: IDS.API.StreamingManager;
        constructor(streamingManager: IDS.API.StreamingManager, readonly: boolean);
        setEntries(entries: WatchlistEntry[]): void;
        addEntry(entry: WatchlistEntry): boolean;
        updateEntry(entry: WatchlistEntry): boolean;
        removeEntry(entry: WatchlistEntry): boolean;
        private findMatchingEntry(entry);
        findInstrument(instrument: Instrument): WatchlistEntry;
        private contains(entry);
        addInstrument(instrument: Instrument, extraColumns?: {
            [s: string]: string;
        }): boolean;
        removeInstrument(instrument: Instrument, extraColumns?: {
            [s: string]: string;
        }): boolean;
        getStorageListContent(): IDS.StorageListContent;
        clear(): void;
    }
    class WatchListManager {
        private static kDefaultListName;
        private idsListHeaders;
        private listTitles;
        private listTitlesPromise;
        private listContents;
        private pidSid;
        private uploadPidSid;
        private controller;
        private model;
        titlesInitialised: boolean;
        readOnly: any;
        constructor(controller: Controller, model: Model);
        private getListHeader(listTitle);
        private getListId(listTitle);
        private deleteIdsHeader(listId);
        sanitizeListName(listName: string): string;
        private getStorageServer();
        private doneStorageServer(storageServer, id);
        private getStorageUploadServer();
        private doneStorageUploadServer(storageServer, id);
        getWatchlistTitles(): Promise<SortedObservableArray>;
        private createDefaultList();
        private setListTitles(listTitles);
        getListContent(listTitle: string): Promise<Watchlist>;
        private setListContent(listTitle, list);
        setListReadOnly(listTitle: string, isReadOnly: boolean): void;
        updateList(listTitle: string, watchlist: Watchlist): Promise<Object>;
        saveList(listTitle: string, watchlist: Watchlist, referenceIndex?: WatchlistEntry): Promise<Object>;
        private sendSaveListRequest(listTitle, list);
        /**
         * Adds an instrument to a list. Returns a promise with true if successful, rejects if something went wrong
         * @param listTitle Watchlist title
         * @param instrument Instrument to add
         */
        addListInstrument(listTitle: string, instrument: Instrument): Promise<boolean>;
        /**
         * Remove an instrument from a list. Returns a promise with true if successful, rejects if something went wrong
         * @param listTitle Watchlist title
         * @param instrument Instrument to remove
         */
        removeListInstrument(listTitle: string, instrument: Instrument): Promise<boolean>;
        /**
         * Adds a new list. Returns a promise with true if successful, rejects if list already exists
         * @param listTitle
         */
        addListTitle(listTitle: string): Promise<boolean>;
        removeList(listTitle: string): Promise<boolean>;
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    namespace API {
        class AlertValue {
            instrument: Symbol;
            feed: number;
            ticker: string;
            mdField: number;
        }
        class AlertNode {
            parent: AlertNode;
            isLeft: boolean;
            type: AlertType;
            double: number;
            mdValue: AlertValue;
            operator: AlertOperator;
            left: AlertNode;
            right: AlertNode;
            constructor(operator: AlertOperator, isLeft: any, type: AlertType);
            hasLeft(): boolean;
            hasRight(): boolean;
            addSubNode(operator: AlertOperator, isLeft: boolean): AlertNode;
            addMdField(mdField: number): void;
            addFeedTicker(feed: number, ticker: string): void;
            private getLeftValue();
            private getRightValue();
            getSymbol(): string;
            getValueStr(): string;
            getChangeStr(): string;
            getFieldType(): number;
            getAlertMessage(updateType: AlertUpdateType): string;
            buildRequest(maker: Maker): void;
            ToMws(): any;
        }
        class ServerAlert {
            currentNode: AlertNode;
            tmpFeed: number;
            id: string;
            revisionIndex: number;
            description: string;
            comment: string;
            enabled: boolean;
            timeoutMinutes: number;
            type: AlertType;
            triggerType: AlertTriggerType;
            operator: AlertOperator;
            rule: AlertNode;
            marketDataField: AlertMarketDataField;
            portfolioDataField: AlertPortfolioDataField;
            list: string;
            notificationMsg: string;
            constructor(id?: string);
            addComment(value: string): void;
            addNode(operator: AlertOperator): AlertNode;
            assign(item: ServerAlert): void;
            buildRequest(maker: Maker): void;
            ToMws(updateType?: AlertUpdateType): any;
        }
        class AlertEvent {
            loginId: number;
            id: string;
            eventId: number;
            triggerDate: number;
            triggerTime: number;
            eventRead: boolean;
            type: AlertType;
            notificationMsg: string;
            comment: string;
            hostName: string;
            description: string;
            feed: number;
            ticker: string;
            constructor(loginId: number);
            addComment(value: string): void;
            getTriggerTime(): Date;
            ToMws(): any;
        }
        class AlertDb {
            items: {
                [id: string]: ServerAlert;
            };
            clear(): void;
            get(id: string): ServerAlert;
            addOrModify(alert: ServerAlert): void;
            delete(alert: ServerAlert): void;
        }
        class AlertsResponse {
            items: ServerAlert[];
            ToMws(): any;
        }
        class AlertsEmailDeviceResponse {
            email: string;
            enabled: boolean;
        }
        class AlertsServer extends BaseIDSServer {
            readonly loginId: number;
            private requests;
            private instrument;
            private tag;
            private callbacks;
            private hasSubscription;
            private hasAlerts;
            alerts: AlertDb;
            constructor(ps: PidSid, serverPool: IDS.ServerPool);
            subscribeAlerts(common: AllResponseCallbacks): void;
            unsubscribeAlerts(common: AllResponseCallbacks): void;
            getAlerts(callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
            deleteAlert(index: number, alertId: string, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
            addAlert(alert: ServerAlert, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
            modifyAlert(alert: ServerAlert, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
            addOrDeleteAlertDevice(deviceType: AlertDeviceType, token: string, enabled: boolean, deviceClient: string, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
            getEmailDevice(callback: AllResponseCallbacks, common?: CommonFrameworkResponse): void;
            private ProcessAlertItem(item, tag, buf);
            private ResponseGetAlerts(req);
            private ResponseDeleteAlert(req);
            private ResponseAddAlert(req);
            private ResponseModifyAlert(req);
            private ResponseAddOrDeleteDevice(req);
            private ResponseGetEmailDevice(req);
            private StreamingAlert(header, buf, parser);
            private StreamingEvent(header, buf, parser);
            private StreamingOwc(header, buf, parser);
            lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
            lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
            lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
            lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
        }
    }
}
declare namespace IDS {
    namespace API {
        namespace BrokerStats {
            enum Type {
                AccAll = 0,
                AccOneBroker = 1,
                AccOneSymbol = 2,
            }
            class Scope {
                feed: number;
                type: Type;
                firstDate: Date;
                lastDate: Date;
                broker: string;
                symbol: string;
                subscribe: boolean;
                constructor(period?: string);
                private daysBack(offset);
                private firstDayOfWeek();
                applyPeriod(period: string): void;
            }
            interface Callbacks {
                OnBrokerStats(scope: Scope, b: BrokerStatItem): void;
                OnBrokerStatsMulti(scope: Scope, b: BrokerStatItem[]): void;
                OnBrokerStatsReset(scope: Scope): void;
            }
            class BrokerStatsManager implements IDS.Realtime.RealtimeCallbacks {
                private serverPool;
                private scope;
                private rt;
                private ps;
                private acc;
                private cb;
                private unsubscribe;
                private hasHistoryRequest;
                constructor(serverPool: ServerPool, scope: Scope, cb: Callbacks);
                unbind(): void;
                ChangeScope(scope: Scope): boolean;
                OnRealtimeTrade(header: Header, trade: IDS.Realtime.Trade): void;
                OnRealtimeResetFeed(feed: number, date: Date): void;
                ResponseError(resp: ResponseHeader): void;
                private calcTotals(dist);
                private Response(bs, isRealtime);
            }
        }
    }
}
declare namespace IDS {
    import Instrument = Infront.Instrument;
    namespace API {
        namespace Calendar {
            class Scope {
                countries: string[];
                instrument: Instrument[];
                feeds: number[];
                dateFrom: Date;
                dateTo: Date;
            }
            interface Callbacks {
                OnCalendarEvent(item: CalendarEventItem): void;
                OnCalendarEventMulti(item: CalendarEventItem[]): void;
                OnCalendarReset(): void;
            }
            class CalendarManager implements AllResponseCallbacks {
                private serverPool;
                private scope;
                private cb;
                private pidSids;
                private cals;
                constructor(serverPool: ServerPool, scope: Scope, cb: Callbacks);
                unbind(): void;
                ChangeScope(scope: Scope): void;
                ResponseCalendarEvents(h: ResponseHeader, data: IDS.EventsResponse): void;
                ResponseError(h: ResponseHeader): void;
            }
        }
    }
}
declare namespace IDS {
    namespace API {
        namespace HistPerformance {
            class HistPerformanceManager {
                private serverPool;
                private timerToken;
                private symbols;
                useThrottling: boolean;
                blockSize: number;
                constructor(serverPool: IDS.ServerPool);
                private GetPerformanceResp(common);
                private GetCalculatedHistoryResp(common);
                GetFeed(feed: number, common: CommonFrameworkResponse): void;
                private ThrottleSymbolRequest();
                GetSymbol(feed: number, symbol: string, common: CommonFrameworkResponse): void;
            }
        }
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    namespace API {
        class Json {
            feed: number;
            isin: string;
            symbol: string;
            currency: string;
            blob: string;
        }
        class MorningstarServer extends BaseIDSServer {
            private requests;
            constructor(ps: PidSid, serverPool: IDS.ServerPool);
            GetJson(feed: number, symbol: string, isin: string, currency: string, language: string, common: CommonFrameworkResponse): void;
            GetFundDataDetailsJson(feed: number, symbol: string, isin: string | undefined, currency: string | undefined, language: string | undefined, common: CommonFrameworkResponse): void;
            private getPidSid(feed, feedProperty?);
            private GetRealtime(feed);
            private SetSymbolValue(feed, symbol, mwsTagName, data);
            private setJsonSymbolValue(feed, symbol, tagName, data, path?);
            private SaveToCache(data);
            private ResponseFundsJsonData(header, req);
            lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
            lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
            lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
            lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
        }
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Instrument = Infront.Instrument;
    import FeedProperty = Infront.FeedProperty;
    import GenericCallback = Infront.GenericCallback;
    namespace API {
        class StreamingManager {
            private serverPool;
            private realtime;
            histPerf: API.HistPerformance.HistPerformanceManager;
            constructor(serverPool: ServerPool);
            getServerPool(): ServerPool;
            private getPidSid(feed, feedProperty?);
            private lastFeed;
            private lastFeedProperty;
            private lastPidSid;
            getRealtime(feed: number, isNews?: boolean, feedProperty?: FeedProperty, id?: string): Realtime.RealtimeServer;
            GetRealtimeFromPidSid(pidSid: PidSid, isNews?: boolean, id?: string): Realtime.RealtimeServer;
            private getPidSidList(feeds);
            static isArray(value: any): boolean;
            MWSCreateComputedField(mainFeed: number, mainSymbol: string, name: string, fields: MWSFieldReference[], computation: (args: any[]) => any): void;
            CreateSymbolComputedField(mainFeed: number, mainSymbol: string, computedTagName: string, baseTags: TagOrComputed[], computation: (args: any[]) => any): void;
            MWSCustomBind(feed: number, symbol: string, fields: any, binding: Infront.Binding): () => void;
            SymbolCustomBind(feed: number, symbol: string, tag: IDS.TagOrComputed, binding: Infront.Binding, log?: boolean): () => void;
            getHistPerformance(symbol: Symbol): void;
            getSymbol(feed: number, symbol: string, makeNew?: boolean): IDS.Symbol;
            getSymbolValue(feed: number, symbol: string, mwsTagName: string[]): any;
            setSymbolValue(feed: number, symbol: string, mwsTagName: string[], data: any): void;
            SetCustomSymbolValue(feed: number, symbol: string, tagName: string, data: any): void;
            MWSRegisterObserver(feed: number, symbol: string, callback: (data: any) => void): void;
            MWSUnregisterObserver(feed: number, symbol: string, callback: (data: any) => void): void;
            MWSRegisterTradesObserver(feed: number, symbol: string, cacheCallback: GenericCallback<MWSTrade>, callback: GenericCallback<MWSTrade>): void;
            MWSUnregisterTradesObserver(feed: number, symbol: string, callback: (data: any) => void): void;
            MWSOrderbook(feed: number, symbol: string, callback: (data: any) => void): () => void;
            GetTimeSeries(item: Realtime.TimeSeriesRequest, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): boolean;
            GetTrades(item: Realtime.TradesRequest, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): boolean;
            GetRanking(feed: number, rankType: RankType, callback: AllResponseCallbacks, subscribe: any, rtCallbacks?: Realtime.RealtimeCallbacks): () => void;
            GetBrokerStats(data: BrokerStatRequest, callback: AllResponseCallbacks, common?: CommonFrameworkResponse): boolean;
            GetHeadlines(feeds: number[], callback: AllResponseCallbacks, rtCallbacks: Realtime.RealtimeCallbacks): boolean;
            GetTickSize(item: Realtime.TickSizeRequest, callback: AllResponseCallbacks): boolean;
            GetFeedSymbols(feed: number, callback: (symbols: {
                [ticker: string]: IDS.Symbol;
            }) => void): () => void;
            GetFeeds(feeds: number[], content: SymbolContent, subscribe?: boolean): () => void;
            GetSymbols(instruments: Instrument[], content: SymbolContent, subscribe?: boolean, refresh?: boolean): void;
            UnsubscribeSymbols(instruments: Instrument[], content: SymbolContent): void;
        }
    }
}
declare namespace IDS {
    import Instrument = Infront.Instrument;
    namespace API {
        namespace Trades {
            class Scope {
                instrument: Instrument;
                subFeeds: number[];
                start: Date;
                end: Date;
                resolution: any;
                maxItems: number;
                startItem: number;
                endItem: number;
            }
            class TradesManager implements AllResponseCallbacks {
                private serverPool;
                private scope;
                private rt;
                private rtPs;
                private privateUnbind;
                private instrument;
                constructor(serverPool: ServerPool);
                unbind(): void;
                ChangeScope(scope: Scope): boolean;
                ResponseTimeSeries(header: ResponseHeader, any: any): void;
                ResponseError(ResponseHeader: any): void;
            }
        }
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Instrument = Infront.Instrument;
    namespace Wire {
        enum WireEventType {
            None = 0,
            Unknown = 1,
            News = 2,
            EquityCalendar = 3,
            MacroCalendar = 4,
            MotionDetection = 5,
            Alert = 6,
        }
        function wireEventTypeToStr(value: WireEventType): string;
        class WireRequestOptions {
            instruments: Instrument[];
            thresholdMotionDetection: number;
            thresholdNews: number;
            languages: string[];
        }
        class WireMetaData {
            eventId: string;
            eventScore: number;
            eventType: string;
            feeds: number[];
            articleCount: number;
            flashCount: number;
            dateTime: Date;
            isSnapshot: boolean;
        }
        class WireCaption {
            sourceId: string;
            newsId: string;
            feed: number;
            caption: string;
            contentType: string;
            newsTags: string[];
        }
        class WireSymbol {
            feed: number;
            ticker: string;
            symbolScore: number;
            constructor(feed?: number, ticker?: string, score?: number);
            toStr(): string;
        }
        class WireFlashItem {
            feed: number;
            sourceId: string;
            newsId: string;
            headline: string;
            newsType: Infront.NewsType;
            dateTime: Date;
            score: number;
            timeStr: string;
            assign(item: WireFlashItem): void;
        }
        class WireCalendarItem {
            calendarDescription: string;
            calendarSubject: string;
            calendarType: number;
            calendarFlag: string;
            calendarSource: string;
            dateTime: Date;
            hasTime: boolean;
            calendarExternalId: string;
            calendarExpected: number | string;
            calendarPrevious: number | string;
            calendarActual: number | string;
            calendarNumberUnit: string;
            calendarTimeStr: string;
            assign(item: WireCalendarItem): void;
        }
        class WireMotionDetectionItem {
            motionDetectionType: number;
            motionDetectionSubType: number;
            motionDetectionValue: number;
            motionDetectionSubValue: number;
            motionDetectionScore: number;
        }
        class WireEvent {
            metaData: WireMetaData;
            eventType: WireEventType;
            eventId(): string;
            cardKey(): string;
            getEventType(): string;
            getCaption(): string;
            getFirstSymbol(): WireSymbol;
            getFlashItems(): WireFlashItem[];
        }
        class WireNewsEvent extends WireEvent {
            header: WireCaption;
            symbolInfo: WireSymbol[];
            flashItems: WireFlashItem[];
            constructor();
            getCaption(): string;
            getFirstSymbol(): WireSymbol;
            getFlashItems(): WireFlashItem[];
        }
        class WireEquityCalendarEvent extends WireEvent {
            header: WireCaption;
            symbolInfo: WireSymbol[];
            calendarItem: WireCalendarItem;
            constructor();
            getCaption(): string;
            cardKey(): string;
            getFirstSymbol(): WireSymbol;
        }
        class WireMacroCalendarEvent extends WireEvent {
            header: WireCaption;
            symbolInfo: WireSymbol[];
            calendarItem: WireCalendarItem;
            constructor();
            getCaption(): string;
            cardKey(): string;
            getFirstSymbol(): WireSymbol;
        }
        class WireMotionDetectionEvent extends WireEvent {
            header: WireCaption;
            symbolInfo: WireSymbol;
            motionDetectionItem: WireMotionDetectionItem;
            constructor();
            getCaption(): string;
        }
        class WireAlertEvent extends WireEvent {
            caption: string;
            symbolInfo: WireSymbol;
            constructor(alert: API.AlertEvent);
            getCaption(): string;
        }
        class WireDataResponse {
            status: string;
            statusDescription: string;
            subscriptionId: string;
            streamingEvents: WireEvent[];
            equityCalendarEvents: WireEquityCalendarEvent[];
            macroCalendarEvents: WireMacroCalendarEvent[];
            addEvent(eventData: WireEventData): void;
            finalize(): void;
        }
        class WireEventData {
            newsEvent: WireNewsEvent;
            equityCalendarEvent: WireEquityCalendarEvent;
            macroCalendarEvent: WireMacroCalendarEvent;
            motionDetectionEvent: WireMotionDetectionEvent;
            eventType: WireEventType;
        }
        class WireServer extends BaseIDSServer {
            private requests;
            private subscriptionSequence;
            private callbacks;
            private subscriptions;
            private hasActiveSubscription;
            constructor(ps: PidSid, serverPool: ServerPool);
            private GetSubscriptionId();
            GetWire(requestOptions: WireRequestOptions, callback: AllResponseCallbacks, subscribe?: boolean): () => void;
            private getEventType(metadata);
            private processEventData(block, eventData, isClientServer);
            private ResponseWire(header, req);
            private notifyConnectionStatus(isConnected);
            private reconnect();
            private ResponseCloseSubscription(header, req);
            lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
            lowLevelReRequestAll(header: IDS.Header): void;
            lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
            lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
            lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
        }
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    import Instrument = Infront.Instrument;
    class EventsRequest {
        sources: number[];
        countries: string[];
        instruments: Instrument[];
        dateFrom: Date;
        dateTo: Date;
        numItems: number;
    }
    class EventsResponse {
        events: CalendarEventItem[];
        ToMws(): void;
    }
    class CalendarServer extends BaseIDSServer {
        private requests;
        constructor(ps: PidSid, serverPool: ServerPool);
        GetEvents(item: EventsRequest, callback: AllResponseCallbacks, common: CommonFrameworkResponse): void;
        private GetStory(id, callback);
        private ResponseEvents(header, req);
        private ResponseStory(header, req);
        lowLevelData(header: Header, buf: Uint8Array, parser: Parser): void;
        lowLevelError(header: Header, responseId: HeaderResponses, msg: string): void;
        ResponseError(header: any): void;
        lowLevelConnect(ps: PidSid, loginTimeMs: number): void;
        lowLevelDisconnect(ps: PidSid, subscriptionCount: number, outstandingRequests: number): void;
        lowLevelReRequestAll(header: Header): void;
    }
}
declare module Infront {
    class CompareFunctions {
        static compareNumberDesc(a: number, b: number): number;
        static compareNumberAsc(a: number, b: number): number;
        static compareDateStringsDesc(a: string, b: string): number;
        static compareDateStringsAsc(a: string, b: string): number;
        static compareTimeStringsDesc(a: string, b: string): number;
        static compareTimeStringsAsc(a: string, b: string): number;
        static compareStringsDesc(a: string, b: string): number;
        static compareStringsAsc(a: string, b: string): number;
    }
}
declare namespace IDS {
    import PidSid = Infront.PidSid;
    const DEBUG_CONFIG_TO_FILE: boolean;
    const DEBUG_CONFIG_TIME_STAMP: boolean;
    const DEBUG_CONFIG_ALL_TAGS: boolean;
    const DEBUG_CONFIG_LITE_TRESHOLD = -1;
    const DEBUG: boolean;
    const DEBUG_VERSION: boolean;
    const DEBUG_NO_ACCESS_TO_FEED: boolean;
    const DEBUG_UNHANDLED_TAGS: boolean;
    const DEBUG_CALLBACKS: boolean;
    const DEBUG_CALLBACKS_SYMBOL: boolean;
    const DEBUG_BINDINGS: boolean;
    const DEBUG_TIMERS: boolean;
    const DEBUG_INDEXED_DB: boolean;
    const DEBUG_REQUESTS: boolean;
    const DEBUG_WEBSOCKET: boolean;
    const DEBUG_SERVER_CONN: boolean;
    const DEBUG_SERVER_CONN_DETAIL: boolean;
    const DEBUG_SUBSCRIPTIONS: boolean;
    const DEBUG_SERVER_REFERENCE: boolean;
    const DEBUG_SERVER_POOL: boolean;
    const DEBUG_SERVER_OBJECTS: boolean;
    const DEBUG_SYMBOL_SEARCH: boolean;
    const DEBUG_SYMBOL_SEARCH_TAGS: boolean;
    const DEBUG_REALTIME_REQUEST_ERROR: boolean;
    const DEBUG_SYMBOL_STATIC_CS: boolean;
    const DEBUG_SYMBOL_STATIC_CS_TAGS: boolean;
    const DEBUG_SYMBOL_STATIC_INDEXEDDB: boolean;
    const DEBUG_SYMBOL_DATA_CS: boolean;
    const DEBUG_ALL_SYMBOL_DATA_CS: boolean;
    const DEBUG_SYMBOL_DATA_CS_DIST: boolean;
    const DEBUG_SYMBOL_DATA_CONTENT: boolean;
    const DEBUG_SYMBOL_DATA_TAGS: boolean;
    const DEBUG_ALL_SYMBOL_DATA_TAGS: boolean;
    const DEBUG_HIST_PERFORMANCE: boolean;
    const DEBUG_HIST_PERFORMANCE_TAGS: boolean;
    const DEBUG_INSTRUMENT_INFO: boolean;
    const DEBUG_SNAPSHOT: boolean;
    const DEBUG_ORDERBOOK: boolean;
    const DEBUG_ORDERBOOK_TAGS: boolean;
    const DEBUG_LOGIN: boolean;
    const DEBUG_LOGIN_DETAIL: boolean;
    const DEBUG_LOGIN_CS_LOGIN_AUTH: boolean;
    const DEBUG_LOGIN_CS_LOGIN_AUTH_TAGS: boolean;
    const DEBUG_LOGIN_CS_LOGIN_INFO: boolean;
    const DEBUG_LOGIN_CS_LOGIN_INFO_TAGS: boolean;
    const DEBUG_LOGIN_CS_TAGS_PROVIDERS: boolean;
    const DEBUG_LOGIN_CS_FEEDS: boolean;
    const DEBUG_LOGIN_CS_PROVIDERS: boolean;
    const DEBUG_LOGIN_CS_TAGS_FEEDS: boolean;
    const DEBUG_LOGIN_CS_PROV_FEEDS: boolean;
    const DEBUG_LOGIN_CS_MARKETPLACES: boolean;
    const DEBUG_LOGIN_CS_PROV_FEEDS_TAGS: boolean;
    const DEBUG_LOGIN_MWS: boolean;
    const DEBUG_LOGIN_MWS_MARKETS: boolean;
    const DEBUG_LOGIN_MWS_FEATURE_FEEDS: boolean;
    const DEBUG_LOGIN_MWS_METADATA: boolean;
    const DEBUG_TICK_SIZE_CS: boolean;
    const DEBUG_TICK_SIZE_CS_TAGS: boolean;
    const DEBUG_TRADES: boolean;
    const DEBUG_TRADES_CS: boolean;
    const DEBUG_TRADES_CS_FILTER: boolean;
    const DEBUG_TRADES_CS_TAGS: boolean;
    const DEBUG_TRADES_CS_HIST_TAGS: boolean;
    const DEBUG_TRADES_RT: boolean;
    const DEBUG_TRADES_RT_TAGS: boolean;
    const DEBUG_TRADES_CACHE: boolean;
    const DEBUG_BROKER_STATS: boolean;
    const DEBUG_BROKER_STATS_CS: boolean;
    const DEBUG_BROKER_STATS_CS_TAGS: boolean;
    const DEBUG_RANKING: boolean;
    const DEBUG_RANKING_CS: boolean;
    const DEBUG_RANKING_CS_TAGS: boolean;
    const DEBUG_RANKING_RT: boolean;
    const DEBUG_RANKING_RT_TAGS: boolean;
    const DEBUG_CALENDAR: boolean;
    const DEBUG_CALENDAR_CS: boolean;
    const DEBUG_CALENDAR_CS_TAGS: boolean;
    const DEBUG_ALERTS: boolean;
    const DEBUG_ALERTS_CS: boolean;
    const DEBUG_ALERTS_CS_TAGS: boolean;
    const DEBUG_ALERTS_RT: boolean;
    const DEBUG_ALERTS_RT_TAGS: boolean;
    const DEBUG_NEWS: boolean;
    const DEBUG_NEWS_CS: boolean;
    const DEBUG_NEWS_CS_TAGS: boolean;
    const DEBUG_NEWS_RT: boolean;
    const DEBUG_NEWS_RT_TAGS: boolean;
    const DEBUG_CHAINS: boolean;
    const DEBUG_CHAINS_CS: boolean;
    const DEBUG_CHAINS_CS_TAGS: boolean;
    const DEBUG_NEWS_SHOW_FEED: boolean;
    const DEBUG_NEWS_SHOW_ID: boolean;
    const DEBUG_NEWS_SHOW_TIME: boolean;
    const DEBUG_NEWS_SHOW_SYMBOL: boolean;
    const DEBUG_STORAGE: boolean;
    const DEBUG_STORAGE_CS: boolean;
    const DEBUG_STORAGE_CS_TAGS: boolean;
    const DEBUG_TRADING: boolean;
    const DEBUG_TRADING_FEATURES: boolean;
    const DEBUG_TRADING_CS: boolean;
    const DEBUG_TRADING_CS_TAGS: boolean;
    const DEBUG_TRADING_LOGIN_CS: boolean;
    const DEBUG_TRADING_LOGIN_SERVICE_INFO: boolean;
    const DEBUG_TRADING_LOGIN_CS_TAGS: boolean;
    const DEBUG_TRADING_ORDERS_TRADES_CS_TAGS: boolean;
    const DEBUG_TRADING_ALGOS: boolean;
    const DEBUG_TRADING_ALGO_CS_TAGS: boolean;
    const DEBUG_TRADING_CUST_FIELDS: boolean;
    const DEBUG_TRADING_CUST_FIELDS_CS_TAGS: boolean;
    const DEBUG_TRADING_MKT_PROP_CS: boolean;
    const DEBUG_TRADING_MKT_PROP_CS_TAGS: boolean;
    const DEBUG_TRADING_PORTFOLIO_NAMES_CS: boolean;
    const DEBUG_TRADING_PORTFOLIO_NAMES_CS_TAGS: boolean;
    const DEBUG_TRADING_POSITIONS_CS: boolean;
    const DEBUG_TRADING_POSITIONS_CS_TAGS: boolean;
    const DEBUG_TRADING_POWER_CS: boolean;
    const DEBUG_TRADING_POWER_CS_TAGS: boolean;
    const DEBUG_TRADING_RT: boolean;
    const DEBUG_TRADING_RT_ORDER: boolean;
    const DEBUG_TRADING_RT_ORDER_TAGS: boolean;
    const DEBUG_TRADING_RT_ORDER_STATUS: boolean;
    const DEBUG_TRADING_RT_ORDER_STATUS_TAGS: boolean;
    const DEBUG_TRADING_RT_TRADE: boolean;
    const DEBUG_TRADING_RT_TRADE_TAGS: boolean;
    const DEBUG_TRADING_RT_POSITION: boolean;
    const DEBUG_TRADING_RT_PORT_HEADER: boolean;
    const DEBUG_TRADING_RT_POSITION_TAGS: boolean;
    const DEBUG_TRADING_RT_TRADING_POWER: boolean;
    const DEBUG_TRADING_RT_TRADING_POWER_TAGS: boolean;
    const DEBUG_SYMBOL_MAPPING_CS: boolean;
    const DEBUG_SYMBOL_MAPPING_CACHE: boolean;
    const DEBUG_SYMBOL_MAPPING_SCORE_CS: boolean;
    const DEBUG_SYMBOL_MAPPING_CS_TAGS: boolean;
    const DEBUG_CACHE_UNBOUND_OBSERVERS: boolean;
    const DEBUG_CACHE_PORTFOLIO: boolean;
    const DEBUG_CACHE_TRADING_POWER: boolean;
    const DEBUG_CACHE_TRADES: boolean;
    const DEBUG_CACHE_ORDERS: boolean;
    const DEBUG_WIRE: boolean;
    const DEBUG_WIRE_BLOCKS: boolean;
    const DEBUG_WIRE_TAGS: boolean;
    const DEBUG_WIRE_SYMBOLS: boolean;
    const DEBUG_WIRE_LINKS: boolean;
    const DEBUG_WIRE_WATCH_LIST: boolean;
    const DEBUG_WIRE_CARDS: boolean;
    const DEBUG_WIRE_SETTINGS: boolean;
    var DEBUG_VERBOSE: boolean;
    var DEBUG_ERROR_LOG_CALLBACK: boolean;
    var DEBUG_SERVER_EVENTS: boolean;
    var DEBUG_CREATE_CURRENCY_CONVERT_FIELD: boolean;
    var DEBUG_CURRENCY_CONVERT: boolean;
    var DEBUG_WIDGETS: boolean;
    var DEBUG_WIDGET_PUTCALLWIDGET: boolean;
    var DEBUG_WIDGET_ALERTLISTWIDGET: boolean;
    var DEBUG_WIDGET_BONDSTRADINGWIDGET: boolean;
    var DEBUG_WIDGET_COMPLEXCHARTWIDGET: boolean;
    var DEBUG_WIDGET_ASSETSPIECHART: boolean;
    var DEBUG_CALCULATEDHISTORY_TAGS: boolean;
    function tagToStr(tagSet: TagSet, tag: number): string;
    function tagsetToShortStr(tagSet: TagSet): string;
    function tagsetToStr(tagSet: TagSet): string;
    function valueToStr(tagSet: TagSet, tag: Tag, buf: Uint8Array): string;
    function logCSPackageHeader(msg: string, ps: PidSid): void;
    function logRTPackageHeader(msg: string, ps: PidSid): void;
    function logToConsole(tagSet: TagSet, tag: Tag, buf: Uint8Array): void;
    function log(...args: any[]): void;
    function requestToStr(tagSet: TagSet, request: number): string;
    function serverTypeToStr(serverType: ServerType): string;
    function logTimeStamp(timeStamp?: Date): string;
    function logSeparator(): void;
    function logRequestToConsole(tagSet: IDS.TagSet, tagSetTags: IDS.TagSet, buf: any): void;
}
declare module Infront {
    /** A Formatter is responsible for transforming the value into a format. An example is formatting a number into a string for displaying to the user. */
    interface Formatter {
        /** This will format the passed value */
        format(value: any): any;
        /** Use this methode to get notified when the value has updated. */
        listen?(updateCallback: () => void): void;
        /** Use this methode to remove bindings and reset. */
        cleanupFormatter?(): void;
    }
    class ObjectFieldFormatter implements Formatter {
        private sourceField;
        constructor(sourceField: string[]);
        format(value: Object): any;
    }
    /** Formats a number */
    class NumberFormatter implements Formatter {
        decimals: number;
        allowZero: boolean;
        /**
         * Create a number formatter.
         * @param decimals - number of decimals.
         * @param allowZero - if this is true it will allow to display zero instead of empty value. default value is false.
         */
        constructor(decimals: number, allowZero?: boolean);
        format(value: any): any;
    }
    class VolumeFormatter implements Formatter {
        decimals: number;
        allowZero: boolean;
        constructor(allowZero?: boolean);
        format(value: any): any;
    }
    class DynamicNumberFormatter extends NumberFormatter implements Formatter, Binding {
        private decimalsUpdated;
        private decimalsObs;
        constructor(decimals: Observable, allowZero?: boolean);
        valueUpdated(val: number): void;
        listen(changeCallback: () => void): void;
        cleanupFormatter(): void;
    }
    class ShortenNumberFormatter implements Formatter {
        allowZero: boolean;
        constructor(allowZero?: boolean);
        format(value: any): any;
    }
    class IDFormatter implements Formatter {
        format(value: any): any;
    }
    class PercentFormatter implements Formatter {
        private decimals;
        allowZero: boolean;
        constructor(decimals: number, allowZero?: boolean);
        format(value: any): any;
    }
    class TimestampFormatter implements Formatter {
        private showSeconds;
        constructor(showSeconds: boolean);
        format(value: any): any;
    }
    class DateFormatter implements Formatter {
        format(value: any): any;
    }
    class IdsDateFormatter implements Formatter {
        private date;
        format(value: any): any;
    }
    class InlineFormatter implements Formatter {
        private translateFunction;
        constructor(translateFunction: (value: any) => any);
        format(value: any): any;
    }
}
/**
 * Created by hage on 25.09.2015.
 */
/**
 * The InterLibraryLink is a set of interfaces describing a generic and extensible
 * link mechanism between objects.
 */
declare module InterLibraryLink {
    /**
     * All messages transmitted must contain a datatype specified in this enum.
     * Add datatypes when needed.
     */
    class DataType {
        static infinInstrument: string;
        static isin: string;
        static source: string;
        static field: string;
        static universeObject: string;
        static symphonyApp: string;
        static infrontInstrument: string;
        static removeInfrontInstrument: string;
        static clearAllInstruments: string;
        static replaceAllInstruments: string;
        static infrontNewsItem: string;
        static feed: string;
        static price: string;
        static infrontAlert: string;
        static infrontFilter: string;
        static expandInfrontFilter: string;
        static removeInfrontFilter: string;
        static removeInfrontFilterItem: string;
        static listInstrument: string;
        static listenerAdded: string;
        dataType: string;
        constructor(datatype: string);
    }
    /**
     * A message contains a value and an associated type.
     */
    class Message {
        type: string;
        value: any;
        constructor(type?: string, value?: any);
    }
    /**
     * Any receiver of data from another widget should implement Target.
     */
    interface Target {
        /**
         * Target must return an array of all datatypes the widget accepts in a message.
         */
        accepts(): string[];
        /**
         * Target must:
         * - Handle any message containing a datatype returned by accepts()
         * - Disregard any message not containing a datatype returned by accepts()
         */
        receiveMessage(msg: Message): any;
    }
    /**
     * A widget wishing to transmit data to another widget should implement Controller.
     * A controller MUST call accepts() on any target linked to it and respect the
     * returned datatypes.
     */
    interface Controller {
        link(target: Target): any;
        unlink(target: Target): any;
    }
    function targetSupportsType(target: InterLibraryLink.Target, type: string): boolean;
    /**
     * To better communication between libraries, we need to externalize the Controller linking system.
     * Using this "singleton" class we can easily add/remove targets and broadcast the message only to those that accept it.
     * This controller allow multi-directional links.
     */
    class ControllerLinkFactory implements InterLibraryLink.Controller {
        static DEFAULT_CHANNEL: number;
        private static _channels;
        private targetsList;
        private lastMessageCache;
        constructor();
        static getInstance(channel?: number): ControllerLinkFactory;
        private static eachChannel(channels, cb);
        private static eachChannel(channels, cb);
        static link(channels: number[], target: InterLibraryLink.Target): any;
        static link(channels: number, target: InterLibraryLink.Target): any;
        static unlink(channels: number[], target: InterLibraryLink.Target): any;
        static unlink(channels: number, target: InterLibraryLink.Target): any;
        static broadcastMessage(channels: number[], msg: InterLibraryLink.Message): any;
        static broadcastMessage(channels: number, msg: InterLibraryLink.Message): any;
        static getLastMessage(channel: number, type: string): Message;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        /**
         * Retrieve last message on channel of a specific type, or null if no message has been broadcasted.
         */
        private getLastMessage(type);
        /**
         * Save this message in the last message cache.
         */
        private storeMessage(msg);
        /** Handle action between widgets and broadcast the message. */
        broadcastMessage(msg: InterLibraryLink.Message): void;
    }
}
declare module Infront {
    /**
        * A Transmitter is responsible for applying the updated value to a target. This is usually done by setting
        * a property (like innerHTML) or by calling a function.
        */
    interface Transmitter {
        transmit(target: Object, value: any): void;
    }
    class InlineTransmitter implements Transmitter {
        private callback;
        constructor(callback: (val: any) => void);
        transmit(target: Object, value: any): void;
    }
    class FieldTransmitter implements Transmitter {
        private field;
        constructor(field: string);
        transmit(target: Object, value: any): void;
    }
    class HTMLAttributeTransmitter {
        private attribute;
        constructor(attribute: string);
        transmit(target: HTMLElement, value: any): void;
    }
    class DOMElementTransmitter implements Transmitter {
        transmit(target: Element, value: Element): void;
    }
}
declare module Infront {
    interface WidgetStorage {
        store(widgetId: string, key: string, val: any, storageType?: any): void;
        get(widgetId: string, key: string, storageType?: any): any;
        clear(widgetId: string, key: string, storageType?: any): void;
        removeWidget(widgetId: string, storageType?: any): void;
        storeGlobal(key: string, val: any): void;
        getGlobal(key: string): any;
        clearGlobal(key: string): void;
    }
    class DefaultWidgetStorage implements WidgetStorage {
        private localStorageKey;
        private storageObject;
        constructor(localStorageKey: string);
        store(widgetId: string, key: string, val: any, storageType?: any): void;
        get(widgetId: string, key: string, storageType?: any): any;
        clear(widgetId: string, key: string, storageType?: any): void;
        removeWidget(widgetId: string, storageType?: any): void;
        private save();
        storeGlobal(key: string, val: any, storageType?: any): void;
        getGlobal(key: string, storageType?: any): void;
        clearGlobal(key: string, storageType?: any): void;
    }
}
/**
 * Created by hage on 28.01.14.
 */
declare module Infront {
    enum WidgetState {
        Constructing = 0,
        Constructed = 1,
        Initialized = 2,
        Initializing = 3,
        UiBuilt = 4,
        Subscribed = 5,
        Destroying = 6,
    }
    /**
     * Interface for interacting with an already created widget
     */
    interface InfrontWidget {
        /**
         * Modify the options for this widget.
         * @param options
         */
        modify(options: WidgetOptions): void;
        /**
         * Stop this widget. Calling stop will unsubscribe all data, but will not remove the widget from the ui or the data currently contained in it.
         */
        pause(): any;
        /**
         * Starts this widget if previously stopped. You do not need to call this if you haven't called pause(), widgets are
         * automatically started on creation.
         */
        resume(): any;
        /**
         * Destroys this widget. You must call this before removing the widget from the Page to avoid memory leaks and make
         * sure the corresponding data is unsubscribed from.
         */
        destroy(): any;
        isResizeable(): boolean;
        resizeWidget(): any;
    }
    /**
     * Type of nav-button (typically button in top right corner) for those widgets that support it.
     */
    enum WidgetNavButtonType {
        NONE = 0,
        EXPAND = 1,
        NAVIGATE = 2,
    }
    class WidgetSubscriptions {
        private infront;
        private instruments;
        private fields;
        constructor(infrontModel: Model);
        /**
         * Unsubscribes from everything and removes all instruments & fields
         */
        resetSubscriptions(): void;
        updateInstruments(callback?: (allupdated: boolean, reason?: string | MWSErrorCodes) => void): void;
        /**
         * Subscribes instrument
         * @param instrument Instrument to subscribe
         */
        addInstrument(instrument: Instrument): void;
        /**
         * Used to unsubscribe from current instrument(s) and subscribe to a single new one.
         * @param instrument New instrument to subscribe
         */
        setInstrument(instrument: Instrument): void;
        /**
         * Subscribes to given instruments on previously added fields if any
         * @param instruments Array of instruments to subscribe
         */
        addInstruments(instruments: Instrument[]): void;
        /**
         * Unsubscribes from instrument
         * @param instrument Instrument to unsubscribe
         */
        removeInstrument(instrument: Instrument): void;
        /**
         * Unsubscribes from instruments
         * @param instruments Array if instruments to unsubscribe from
         */
        removeInstruments(instruments: Instrument[]): void;
        /**
         * Unsubscribes from all instruments
         */
        removeAllInstruments(): void;
        /**
         * Add field that should be subscribed to by all subscribed instruments
         * @param field Field to subscribe
         */
        addField(field: string): void;
        addFields(fields: string[]): void;
        removeField(field: string): void;
        /**
         * Used to remove all fields, use instead of removeAllInstruments for widgets like QuoteList for pause/unsub functionality
         */
        removeAllFields(): void;
    }
    enum WidgetDecimals {
        FEED = "FEED",
        INSTRUMENT = "INSTRUMENT",
        DEFAULT = "DEFAULT",
    }
    /**
     * Common options for all widgets.
     */
    class WidgetOptions {
        widgetStateCallback: (state: Infront.WidgetState) => void;
        id: string;
        persistState: boolean;
        storageType: any;
        widgetTitle: string;
        hasContentCallback: (hasContent: boolean, item?: any) => void;
        navButton: WidgetNavButtonType;
        navButtonClicked: () => void;
        linkChannels: number[] | number;
        useOriginal: boolean;
        decimals: WidgetDecimals | number;
        showSearchWidget: boolean;
    }
    /**
     * Base-class for Widgets.
     */
    abstract class WidgetBase implements InfrontWidget {
        protected widgetState: WidgetState;
        protected infront: Model;
        protected infrontUI: UI;
        protected element: HTMLElement;
        protected widgetTitle: string;
        protected languageKey: string;
        protected content: any;
        protected navButtonClick: (event: Event) => void;
        protected options: WidgetOptions;
        protected cache: BindingCache;
        protected isInitialised: boolean;
        /** All unbind functions added here will be executed during this.removeBindings() */
        protected unbinds: {
            (): void;
        }[];
        /** Add fields and instruments to subscribe, will unsubscribe and clear on this.unsubscribe() */
        protected subscribes: WidgetSubscriptions;
        protected languageHandler: Language;
        protected progressIndicator: ProgressIndicator;
        private initId;
        private addedEvents;
        private addedInfrontEvents;
        private storage;
        private _linkChannels;
        private _sendOnlyLinkChannels;
        private _receiveOnlyLinkChannels;
        private _hasContent;
        private _hasContentCallback;
        protected abstract returnDefaultWidgetOptions(): WidgetOptions;
        protected searchWidget: Infront.SearchBox;
        protected searchContainer: HTMLElement;
        private static kGlobalStorageID;
        private createAndAssignOptions(options);
        protected constructor(element: HTMLElement, infrontUI: UI, languageKey: string, options: WidgetOptions, widgetTitleKey?: string);
        /**
         * Should do property initialization/resets.
         */
        protected newInit(): void;
        /**
         * Responsible for creating DOM and bindings
         */
        protected newBuildUI(): void;
        /**
         * Do bindings here
         */
        protected createBindings(): void;
        /**
         * Do subscribes here
         */
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        protected removeBindings(): void;
        protected newDestroyUI(): void;
        protected finalize(): void;
        updateAllInstruments(): void;
        accepts(): string[];
        receive(): void;
        modify(options: WidgetOptions): void;
        pause(): void;
        resume(): void;
        destroy(): void;
        protected setHasContent(hc: boolean, item?: any): void;
        protected getHasContent(): Observable<any>;
        protected supportsHasContent(): boolean;
        protected getInitialHasContentValue(): boolean;
        protected store(key: string, val: any): void;
        protected getStoredValue(key: string): any;
        protected clearStoredValue(key: string): void;
        removeAllStorage(): void;
        protected storeGlobal(key: string, val: any): void;
        protected getStoredGlobalValue(key: string): any;
        protected clearStoredGlobalValue(key: string): void;
        removeAllGlobalStorage(): void;
        isResizeable(): boolean;
        resizeWidget(): void;
        /**
         * Adds an event and registers it so it will be removed when calling destroy
         */
        protected addEventListener(element: HTMLElement, event: string, callback: (event: Event) => void): void;
        /**
         * Adds an infrontevent and registers it so it will be removed when calling destroy
         */
        protected addInfrontEventObserver(eventName: string, callback: (event: InfrontEvent) => void): void;
        protected unregisterAllEvents(): void;
        protected getFeedMetadata(feed: number, callback: (feed: FeedMetaData) => void): void;
        protected getSyncFeedMetadata(feed: number): FeedMetaData;
        protected swapInstrument(instrument: Instrument): void;
        protected addInstrumentSearchOpts(widgetName: string): SearchBoxOptions;
        protected onSearchButtonClick(event: any): void;
    }
    class SingleInstrumentWidgetOptions extends WidgetOptions {
        instrument: Instrument;
        decimals: number;
    }
    abstract class SingleInstrumentWidgetBase extends WidgetBase implements InterLibraryLink.Target {
        protected options: SingleInstrumentWidgetOptions;
        protected feedMetaData: FeedMetaData;
        protected decimals: Observable;
        protected cacheKey: string;
        private instrumentDecimals;
        protected assignCacheKey(): void;
        protected newInit(): void;
        /**
         * Uses widget-options, feed metadata and instrument-data to decide how many decimals the widget should show.
         */
        private updateDecimals();
        protected newSubscribe(): void;
        receiveMessage(msg: InterLibraryLink.Message): void;
        accepts(): string[];
    }
    class TradingWidgetOptions extends WidgetOptions {
        clickToLogin: boolean;
        rememberCanceledLogin: boolean;
        tradingLoginCallback: (didLogin: boolean, item?: any) => void;
        hasTradingContentCallback: (hasTradingContent: boolean, item?: any) => void;
    }
    abstract class TradingWidgetBase extends WidgetBase implements TradingManagerObserver {
        private tradingLoginCallback;
        protected options: TradingWidgetOptions;
        private noTradingContentDisplay;
        private languageTradingClick;
        private languageTrading;
        private tradingConnectedEvent;
        private tradingDisconnectedEvent;
        private tradingReconnectingEvent;
        private tradingReconnectedEvent;
        protected portfolioName: string;
        protected constructor(element: HTMLElement, infrontUI: UI, languageKey: string, options: TradingWidgetOptions, widgetTitleKey?: string);
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        protected isTradingConnected(): boolean;
        protected onTradingConnected(): void;
        protected onTradingDisconnected(): void;
        protected onTradingReconnecting(): void;
        protected onTradingReconnected(): void;
        private clickToLoginCallback();
        createNoTradingContentDisplay(): HTMLElement;
        setNoTradingContentDisplay(value: any): void;
        /**
         * TradingManagerObserver
         */
        availablePortfoliosChanged(portfolios: Portfolio[]): any;
        currentPortfolioChanged(portfolio: Portfolio): any;
        currentPortfolioReady(portfolio: Portfolio): any;
    }
    class WidgetArray extends Array<Infront.WidgetBase> {
        private constructor();
        static create(): any;
        destroyAndRemoveAll(): void;
    }
}
declare module Infront {
    class AlertListWidgetOptions extends WidgetOptions {
        columns: Object[];
        openModifyAlertClick: (alert: InfrontAlert) => void;
        closeModifyAlert: () => void;
        alertListMini: boolean;
    }
    class AlertListWidget extends WidgetBase implements InfrontWidget, InterLibraryLink.Controller, RowFactory, ArrayBindingObserver {
        messageString: any;
        private static kLanguageKey;
        private mwsAlertsArray;
        private displayedAlerts;
        protected options: AlertListWidgetOptions;
        private linkedTargets;
        private deleteAlertArrow;
        private modifyAlertArrow;
        private toggleOptionsArrow;
        private uniqueID;
        private columns;
        private expandedAlert;
        private isExpanded;
        private hasAlerts;
        private toggleOptionsCondition;
        constructor(element: HTMLElement, infrontUI: UI, options: AlertListWidgetOptions);
        private sortAlert(itemA, itemB);
        private onAlertsChanged(event);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected getAlerts(reset?: boolean): void;
        protected newBuildUI(): void;
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): void;
        toggleOptions(item: InfrontAlert): void;
        createRow(item: any, index: number): HTMLElement;
        private setFocusOnButton(rowElements);
        private enableAlert(item, state);
        private filterAlerts();
        private deleteAlert(item);
        private modifyAlert(item);
        reloadData(reset?: boolean): void;
        modify(): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
    }
}
declare module Infront {
    class AlertWidgetOptions extends SingleInstrumentWidgetOptions {
        alertAddedClick: () => void;
        alert: InfrontAlert | undefined;
        hideSearchBox: boolean;
        customSearchClicked: () => void;
    }
    class AlertWidget extends SingleInstrumentWidgetBase implements InfrontWidget, InterLibraryLink.Target {
        static recurrence: string[];
        static kLanguageKey: string;
        private selectedRule;
        private alertEnabled;
        private modifyMode;
        private currentAlert;
        private containers;
        private customSearchContainer;
        private focusWidget;
        private searchBox;
        private searchOpts;
        private setLabel;
        private switchToggle;
        private messageString;
        private enableSearch;
        private triggerTypeObserver;
        private conditionObserver;
        private commentObserver;
        private valueObserver;
        private conditions;
        private triggerTypes;
        private validity;
        protected options: AlertWidgetOptions;
        constructor(element: HTMLElement, infrontUI: UI, options: AlertWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected newSubscribe(): void;
        private createFocus(instrument);
        private instrumentChanged(instrument);
        private triggerTypeChanged(index);
        private commentChanged(comment);
        private conditionChanged(index);
        private valueChanged(value);
        private sendAlert();
        private closeWindow();
        protected newDestroyUI(): void;
        private resetInputs();
        private setAlert(alert);
        private setSearchBoxToOptInstrument();
        private createSwitch();
        private validateValue(value);
        private setObserversValue();
        private modifyAlert();
        private enableAlert(state);
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
    }
}
/**
 * Created by hage on 13.01.2015.
 */
declare module Infront {
    class AssetsPieChartOptions extends TradingWidgetOptions {
        type: string;
        showCash: boolean;
        colors: string[];
        borderColor: string;
        borderWidth: number;
        enableLabels: boolean;
        legend: boolean;
        enable3d: boolean;
        alpha: number;
        beta: number;
        depth: number;
        spacingBottom: number;
        spacingLeft: number;
        spacingRight: number;
        spacingTop: number;
        innerSize: string;
        fontFamily: string;
        legendMaxHeight: number;
        legendLabelColor: string;
    }
    class AssetsPieChart extends TradingWidgetBase implements IArrayBinding {
        private static kLanguageKey;
        static kInstrumentTypes: string;
        static kInstruments: string;
        private static seriesId;
        private static kOthers;
        protected options: AssetsPieChartOptions;
        private unbind;
        private chart;
        private othersGroup;
        private totalValue;
        private instrumentCount;
        private instrumentTypes;
        private instruments;
        private itemUnbinds;
        private positions;
        private cashPositions;
        private positionsSync;
        private cashPositionsSync;
        private redrawDelayTimer;
        private fullNamesCache;
        private isDirty;
        private updating;
        private data;
        private dataBufferPrimary;
        private dataBufferSecondary;
        private lazyUpdate;
        private updateInterval;
        private updateTimer;
        constructor(element: HTMLElement, infrontUI: UI, options: AssetsPieChartOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newDestroyUI(): void;
        private createChart(data);
        private getChart();
        private clearChart();
        /** TRADING MANAGER OBSERVER **/
        currentPortfolioChanged(portfolio: Portfolio): void;
        currentPortfolioReady(portfolio: Portfolio): void;
        /** ARRAY BINDING **/
        reInit(items: any[]): any;
        itemAdded(item: any, index: number): void;
        private updateOthers();
        private setOthersValue(value);
        private getOthersDetailText();
        private addOrUpdatePoint(newPoint, doSort?);
        private setDirty();
        private lazyUpdatePointValue(pointId, name, value, displayValue);
        private lazyUpdatePointName(pointId, name);
        private updatePoint(pointId, name, value, displayValue);
        itemAddedInstrumentTypes(item: any): void;
        itemAddedInstruments(item: any): any;
        itemRemoved(item: any, index: number): any;
        itemMoved(item: any, oldIndex: number, newIndex: number): any;
        private fixChartData();
        private beginUpdate();
        private endUpdate();
        private updateClonePoint(oldPoint, newPoint);
        private updateChart();
    }
}
declare module Infront {
    class BondsCalculatorOptions extends WidgetOptions {
        nominalAmount: number;
        nominalInterestRate: number;
        cleanPricePercent: number;
        taxRatePercent: number;
        yieldPercent: number;
        redemptionPrice: number;
        currencies: string[];
    }
    enum BondsCalculatorTab {
        TabMain = "tabMain",
        TabCashFlow = "tabCashFlow",
        TabOther = "tabOther",
    }
    enum CouponFrequency {
        monthly = "monthly",
        quarterly = "quarterly",
        four_month_interval = "four_month_interval",
        semi_annually = "semi_annually",
        annually = "annually",
    }
    enum CalculationMethod {
        german_30_360 = "german_30_360",
        german_30_365 = "german_30_365",
        french_act_360 = "french_act_360",
        english_act_365 = "english_act_365",
        isma_act_act = "isma_act_act",
        isma_30e_360 = "isma_30e_360",
    }
    class BondsCalculatorWidget extends WidgetBase {
        private domElements;
        protected options: BondsCalculatorOptions;
        private tabBar;
        private activeTab;
        private nominalAmount;
        private fixedRate;
        private cleanPricePercent;
        private redemptionPrice;
        private taxRatePercent;
        private yieldPercent;
        private valueDateSelector;
        private issueDateSelector;
        private firstCouponDateSelector;
        private lastCouponDateSelector;
        private maturityDateSelector;
        private couponFrequency;
        private dayCountConvention;
        private calculationMethod;
        private currency;
        private bondType;
        private frequencyItems;
        private dayCountItems;
        private calculationMethodItems;
        private currencyItems;
        private bondTypes;
        private bondTypeItems;
        private searchBox;
        private searchOptions;
        private bondOptions;
        private resultPanel;
        private cashFlowPanel;
        private calculatorResponse;
        private isUpdating;
        private ready;
        constructor(element: HTMLElement, infrontUI: UI, options: BondsCalculatorOptions);
        protected newInit(): void;
        protected newBuildUI(): void;
        private createTabs();
        private createDateSelectors();
        private initializeDropdowns();
        private createPanels();
        private instrumentSelected;
        private beginUpdate();
        private endUpdate();
        private setSearchBoxInstrument(instrument);
        private applySymbol(instrument, symbol);
        private searchFilter;
        private initializeSymbolSearch();
        private amountChanged;
        private onDateChanged;
        private onDropDownChanged;
        private setBondType(bondType);
        private setCurrency(currency);
        private getCurrency();
        private setCouponFrequency(frequency);
        private getCouponFrequency();
        private setDayCountConvention(calculationMethod);
        private getInterestCalculationMethod();
        private getBondType();
        private setCouponDates(issueDate, maturityDate, firstCouponDate, couponsPerYear);
        private updateCalculator();
        private onSelectTab;
        private onReceiveBondData;
        private onReceiveErrorResponse;
        protected returnDefaultWidgetOptions(): WidgetOptions;
    }
    class BondsCalculatorCashFlowWidgetOptions extends WidgetOptions {
    }
    class BondsCalculatorCashFlowWidget extends WidgetBase {
        private cashFlowItems;
        private isInitialized;
        fixedRate: number;
        constructor(element: HTMLElement, infrontUI: UI, response: CalculatorResponse, options: SwapCalculatorCashFlowWidgetOptions);
        protected newInit(): void;
        clear(): void;
        applyResult(response: CalculatorResponse): void;
        displayErrorMessage(error_code: number, error_message: string): void;
        protected newBuildUI(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
    }
    class BondsCalculatorResultWidgetOptions extends WidgetOptions {
    }
    class BondsCalculatorResultWidget extends WidgetBase {
        private yieldPercent;
        private cleanPricePercent;
        private grossYieldPercent;
        private remainingMaturity;
        private netYieldPercent;
        private duration;
        private accruedInterestDays;
        private modifiedDuration;
        private accruedInterest;
        private basisPointValue;
        private dirtyPricePercent;
        private convexity;
        private statusText;
        private hasValidResponse;
        private isInitialized;
        private calculatorResponse;
        constructor(element: HTMLElement, infrontUI: UI, calculatorResponse: CalculatorResponse, options: SwapCalculatorResultWidgetOptions);
        protected newInit(): void;
        clear(): void;
        applyResult(data: CalculatorResponse): void;
        displayErrorMessage(error_code: number, error_message: string): void;
        protected newBuildUI(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
    }
}
interface Number {
    fixed: (n: number) => string;
}
declare module Infront {
    enum BondsTradeType {
        SPOT = 0,
        FORWARD = 1,
    }
    enum BondsActions {
        BUY = 0,
        SELL = 1,
    }
    enum BondsTradingState {
        DATA_ENTRY = 0,
        CONFIRM = 1,
        MODIFY = 2,
        SUCCESS = 3,
        ERROR = 4,
    }
    class BondsTradingWidgetOptions extends TradingWidgetOptions {
        instrument: Instrument;
        initialPrice: any;
        autoSelectAfterTab: boolean;
        availableFeeds: number[];
        forwardCurveFeeds: number[];
        marketFeed: number[];
        enableSpotMarketFeed: boolean;
        searchTickersOnly: boolean;
        modifyOrderId: number;
        modifyPortfolio: string;
        confirmation: boolean;
        closeOnComplete: boolean;
        keepInstrumentOnNew: boolean;
        advancedOptionsCallback: (showAdvanced: boolean) => void;
        closeCallback: () => void;
        instrumentInfoCallback: (showInstrumentInfo: boolean) => void;
        portfolioChangedCallback: (portfolio: Portfolio) => void;
        resetCallback: () => void;
        errorCallback: (error: string) => void;
        dropdownComponentList: any[];
        hasInstrument(): boolean;
    }
    class BondsTradingWidget extends TradingWidgetBase implements InterLibraryLink.Target, InterLibraryLink.Controller {
        private forward_instruments;
        private messageService;
        tradableFeeds: number[];
        private orderStatusUnbind;
        private statusMessage;
        private infoMessage;
        private static kLanguageKey;
        protected options: BondsTradingWidgetOptions;
        private tradingManager;
        private static kOEStoredTradableFeeds;
        private static kOEStoredInstrument;
        private feedMetaData;
        private unsubscribeInstrument;
        private isSendingRequest;
        private currentOrder;
        private dropdownLabelVisibility;
        private instruments;
        private instrumentObserver;
        private forwards_instruments;
        private bondsList;
        private otherBondsList;
        private customFields;
        private nominalBinding;
        private forwardDateBinding;
        private depositNumberBinding;
        private loanTransactionAcc;
        private freeText;
        private dateSelector;
        private dateSelectorElement;
        private internalDepotNumber;
        private currentPortfolio;
        private currentInstrument;
        private instrumentValues;
        private date;
        private last_updated;
        private bondSpotPrice;
        private clientSpotPrice;
        private disableBuySell;
        private forwardPrice;
        private clientForwardPrice;
        private premium;
        private discount;
        private typeSelectionVisibility;
        private tradeType;
        private tradeAction;
        private displayForwardValues;
        private errorMessage;
        private orderState;
        private focus;
        private focusOptions;
        private searchBox;
        private searchElement;
        private searchBoxOptions;
        private searchBoxOptionsFeed;
        private buySellDropdownOptions;
        private buySellDropdown;
        private portfolioSelectorOptions;
        private portfolioSelector;
        private focusElement;
        private dropDownElement;
        private nominalValue;
        private depositNumber;
        private forwardDate;
        private dropdownSelectedValue;
        private clientSpot;
        private loanAccount;
        private forwardOrdersCheck;
        private moduleTag;
        constructor(element: HTMLElement, infrontUI: UI, options: BondsTradingWidgetOptions);
        protected newInit(): void;
        private instrumentsToDict(instruments);
        private buildList(list);
        createListFromFeed(list: any[], feed: number, callback: (result: Object[]) => void): void;
        loadBondsList(list: any[], feed: number, callback: () => void): void;
        updateBondInstrument(index: number, result: any, original?: any): any;
        protected newBuildUI(): void;
        private attachDateSelector(element);
        protected newDestroyUI(): void;
        private createDropdownElement(element);
        loadFeed(feed: number): void;
        protected freeTextChange(text: string): void;
        protected nominalInputChange(text: string): void;
        protected forwardDateChange(text: string): void;
        protected depositNumberChange(text: string): void;
        protected loanTransactionAccChange(text: string): void;
        protected bondTypeClick(type: number): void;
        protected updateWithSymbolData(instrument: any, symbolData: any): any;
        protected instrumentSelected(instrument: any): void;
        private processSelectedInstrumentValues(item, existInXml);
        private setValueDate(symbolData);
        private setLastUpdated(symbolData);
        private setInputsEnabled(isEnabled);
        private setBondSpotPrice(item);
        protected onSelectBuySellClick(action: number): void;
        private getInterpolatedRate(numberOfDays, instrumentValues);
        private calculateForwardPrice(instrumentValues);
        private setPremiumOrDiscount(tradeAction, deductionOrAddition);
        private calcNumberOfDays(startDate, endDate);
        private validateForm();
        private checkTimestamp();
        private resetClick();
        private resetWidget();
        protected submitClick(): void;
        private getMissingOrderFieldsList(orderFields, tagsObject?);
        private isValidOrder(order);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        private getCustomFields();
        private isSearchMatch(item, text);
        private processSearch(text);
        private createOrder(buyOrSell);
        private insertOrderCallback(result);
        private showOrderStatus(portfolio, orderId);
        private insertOrder();
        private attachSearchBoxToElement(searchBoxEl);
        private attachFocusWidget();
        private attachPortfolioSelector(portfoliosElem);
        setFocus(): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
    }
}
/**
 * Created by hage on 12.09.2014.
 *
 * This file contains Common stuff used by different list-types.
 */
declare module Infront {
    interface ListUIFactory extends ArrayBindingObserver {
        getSubscriptionFields(): string[];
        createRootUI(): {
            root: HTMLElement;
            headerContainer: HTMLElement;
            bodyContainer: HTMLElement;
            footerContainer: HTMLElement;
        };
        createHeaderUI(): HTMLElement;
        createRowUI(rowId: any, cacheKey: string, decimals: any): HTMLElement;
        createComputedFieldsInCache(rowId: any, cacheKey: string): any;
    }
    interface SortableListFactory extends ListUIFactory {
        sortingEnabled: boolean;
        currentlySortedColumn: Field;
        currentSortOrder: SortOrder;
    }
    enum ListLayout {
        TABLE = 0,
        DIV = 1,
        CARD = 2,
        COMPACT = 3,
        GRID = 4,
        FLEX = 5,
    }
    enum ListType {
        generic = 0,
        screener = 1,
    }
    class CommonListOptions extends TradingWidgetOptions {
        className: string;
        columns: any[];
        availableColumns: any[];
        defaultSortedColumn: any;
        defaultSortOrder: SortOrder;
        enableChangeStatusColors: boolean;
        extraColumns: any[];
        extraOptions: Object;
        interactionHighlight: boolean;
        linkTrigger: any;
        rowSelectable: boolean;
        sortable: boolean;
        tabs: QuoteListTabOptions[];
        uiFactory: ListUIFactory;
        decimals: WidgetDecimals | number;
        layout: ListLayout;
        defaultContent: any;
        expandableRows: boolean;
        loadSavedColumns: boolean;
        enableColumnsMove: boolean;
        enableColumnsResize: boolean;
        createExpandRow: (item: any, rowElem: HTMLElement, additional?: any) => () => void;
        onColumnsChanged: () => void;
        onSettingsClicked: () => void;
        onColumnDeleted: (col: any, index) => void;
        onColumnMoving: (col: any, fromIdx, toIdx) => boolean;
        onColumnMoved: (col: any, fromIdx, toIdx) => void;
        onColumnInsert: (spec: any, index) => void;
        onColumnsResized: (indexes: number[]) => void;
        onResetColumns: () => void;
        enableFixedHeader: boolean;
    }
    interface CommonListUISharedFunctions {
        sortColumnChanged(column: Field, sortOrder: SortOrder, userInteraction: boolean): void;
        rowClicked(instrument: Instrument | any): void;
        linkEvent(instrument: Instrument): void;
    }
    abstract class CommonListWidgetBase extends WidgetBase implements CommonListUISharedFunctions {
        protected static kMyColumnsKey: string;
        protected options: CommonListOptions;
        protected unbindingManager: UnbindingManager;
        protected static cacheKeyCounter: number;
        protected static trCounter: number;
        protected columns: Field[];
        protected columnManager: ColumnManager;
        protected itemsToShow: Infront.ContinouslySortedCachedInstrumentObservableArray | Infront.ContinouslySortedColumnCacheKeyObservableArray;
        protected rowClickCallback: (rowId: any) => void;
        protected dataRetriever: (col: Field, dataObject: Object) => void;
        protected cacheKeyConverter: (originalKey: string, column: Field) => string;
        protected footerTr: HTMLElement;
        private isUpdating;
        private isExpanded;
        constructor(element: HTMLElement, infrontUI: UI, languageKey: string, options: CommonListOptions, string?: string);
        protected abstract setListItems(param?: any): void;
        protected abstract setColumnManager(): void;
        abstract sortColumnChanged(column: Field, sortOrder: SortOrder, userInteraction: boolean): void;
        abstract rowClicked(instrument: Instrument | any): void;
        abstract linkEvent(instrument: Instrument): void;
        protected setOptions(options: CommonListOptions): void;
        createRootUI(): {
            root: HTMLElement;
            headerContainer: HTMLElement;
            bodyContainer: HTMLElement;
            footerContainer: HTMLElement;
            defaultContent: HTMLElement;
        };
        createHeaderRow(): HTMLDivElement | HTMLTableRowElement;
        createFooterRow(decimals: number, languageCategory: string): HTMLElement;
        createElementRowFromCache(rowId: any, cacheKey: string, decimals: Observable | any | number): HTMLElement;
        createRowFromResult(rowId: any, result: Object, decimals: number): HTMLElement | HTMLTableRowElement;
        static createExpandRowErrorHandling(options: CommonListOptions, rowId: any, expandedRow: HTMLElement, optional?: any): () => void;
        setRowClickCallback(callback: (rowId: any) => void): void;
        private loadColumns();
        saveColumns(): void;
        resetColumns(): void;
        addCustomColumn(spec: any): void;
        addDefaultColumn(index: number): void;
        addColumnFromAvailableList(index: number): void;
        removeColumn(columnNameOrNumber: string | number): void;
        moveColumn(fromColumnNameOrNumber: string | number, toColumnNameOrNumber: string | number): void;
        insertColumn(spec: any, columnNameOrNumber: string | number): void;
        resizeColumn(index: number, newWidth: any): void;
        getAllFields(): Field[];
        getDefaultColumns(): any[];
        getAvailableColumns(): any[];
        beginUpdate(): void;
        endUpdate(): void;
        protected swapInstrument(instrument: Instrument): void;
    }
    enum ColumnOrigin {
        Default = 0,
        Available = 1,
        UserDefined = 2,
    }
    /**
     * Delegate for managing Columns in  a table.
     * This class contains common code for dealing with columns, creating header- and data-rows and organizing
     * the UI for sorting a table (Just the UI mind you).
     *
     * This class is only useful for tables that allow the user to configure the table using Column-definitions. See the Column-object below.
     */
    class ColumnManager {
        static LINK_TARGET_ROW_CLICK: string;
        private static kCacheKeyPrefix;
        private static kColumnSeperator;
        private static kPropSeperator;
        private static kTabSeperator;
        private static cacheKeyCounter;
        private static trCounter;
        static Yes: string;
        static No: string;
        private tabIndex;
        extraPopup: ExtendedTableRowPopup;
        private unbindingManager;
        private infront;
        private infrontUI;
        private cache;
        private enableInteractionHighlight;
        private enableChangeStatusColors;
        private updatedColumn;
        private updatedIndex1;
        private updatedIndex2;
        private isInserting;
        private ignoreSortClick;
        sortingEnabled: boolean;
        currentlySortedColumn: Field;
        currentSortOrder: SortOrder;
        currentlySelectedSortArrows: HTMLElement;
        private sortedColumnChangedCallback;
        private rowClickCallback;
        private linkCallback;
        private dataRetriever;
        private cacheKeyConverter;
        private footerTr;
        protected options: CommonListOptions;
        private cacheKey;
        private languageHandler;
        private headerRow;
        private footerRow;
        private rows;
        private rowIds;
        private rowsCache;
        private decimals;
        private results;
        private footerDecimals;
        private dataSource;
        private subscribes;
        private isSubscribed;
        private indexFix;
        private items;
        private itemsCacheKeyCreator;
        columns: Field[];
        extraColumns: Field[];
        portfolioColumns: Field[];
        protected columnCreator: (spec: any, languageHandler: Language) => Field;
        private columnsSpec;
        private columnsRealIndex;
        private loadedTabsString;
        tabs: any[];
        private draggingColumnEl;
        enableColumnsMove: boolean;
        enableColumnsResize: boolean;
        private editDropDown;
        defaultContent: HTMLElement;
        defaultContentParent: HTMLElement;
        static expanded: boolean;
        constructor(options: CommonListOptions, infront: Model, infrontUI: UI, columnCreator?: (spec: any, languageHandler: Language) => Field, subscribes?: WidgetSubscriptions);
        toggleState(expandable: boolean): void;
        static createRootUI(options: CommonListOptions): {
            root: HTMLElement;
            headerContainer: HTMLElement;
            bodyContainer: HTMLElement;
            footerContainer: HTMLElement;
            defaultContent: HTMLElement;
        };
        static createHeaderRow(options: CommonListOptions, columnManager: ColumnManager, unbindingManager?: UnbindingManager, columns?: Field[]): HTMLDivElement | HTMLTableRowElement;
        static createFooterRow(options: CommonListOptions, columnManager: ColumnManager, unbindingManager: UnbindingManager, decimals: number, languageCategory: string, columns: Field[], infrontUI: UI, footerTr: HTMLElement, cache: BindingCache): HTMLElement;
        static createCompactCardHeader(columnManager: ColumnManager, columns?: Field[]): HTMLElement;
        static createCompactCardSection(options: CommonListOptions, columnManager: ColumnManager, rowId: any, cacheKey: string, decimals: Observable | any | number, trCounter?: number, columns?: Field[], unbindingManager?: UnbindingManager): HTMLElement;
        static createElementCardRowFromCache(options: CommonListOptions, columnManager: ColumnManager, rowId: any, cacheKey: string, decimals: Observable | any | number, trCounter?: number, columns?: Field[], unbindingManager?: UnbindingManager): HTMLElement;
        /*** Creates an expandable table row by subscribing to the Cache.
         * @param options
         * @param columnManager
         * @param rowId Anything that identifies the row. For marketdata this would be an instrument.
         * @param cacheKey The string (or strings in a CacheKeys Object) that identifies an object in the cache. Typically created from CacheKeyFactory.
         * @param decimals
         * @returns {any}
         */
        static createSimpleCachedDataBlock(options: CommonListOptions, columnManager: ColumnManager, rowId: any, cacheKey: string, decimals: Observable | any | number, trCounter?: number, columns?: Field[], unbindingManager?: UnbindingManager): HTMLElement;
        /*** Creates a table row by subscribing to the Cache.
         * @param options
         * @param columnManager
         * @param rowId Anything that identifies the row. For marketdata this would be an instrument.
         * @param cacheKey The string (or strings in a CacheKeys Object) that identifies an object in the cache. Typically created from CacheKeyFactory.
         * @param decimals
         * @returns {any}
         */
        static createElementRowFromCache(options: CommonListOptions, columnManager: ColumnManager, rowId: any, cacheKey: string, decimals: Observable | any | number, trCounter?: number, columns?: Field[], unbindingManager?: UnbindingManager): HTMLElement;
        /*** Creates a table-row by extracting data directly from a result.
         * @param options
         * @param columnManager
         * @param rowId Anything that identifies the row. For marketdata this would be an instrument.
         * @param result A result that contains data from the server.
         * @param decimals
         * @param trCounter
         * @returns {any}
         */
        static createRowFromResult(options: CommonListOptions, columnManager: ColumnManager, rowId: any, result: Object, decimals: number, trCounter: number, columns?: Field[], unbindingManager?: UnbindingManager): HTMLElement | HTMLTableRowElement;
        static createExpandRowErrorHandling(options: CommonListOptions, rowId: any, expandedRow: HTMLElement, optional?: any): () => void;
        private generateColumnsString(columns, columnsRealIndex);
        saveColumns(): string;
        private static parseColumnsString(columnsStr, defaultColumns, availableColumns);
        static _loadColumns(columnsStr: string, options: CommonListOptions): void;
        loadColumns(columnsStr: string): void;
        resetColumns(): void;
        setVisible(colName: string, visibility: boolean): void;
        visible(colName: string): boolean;
        addCustomColumn(spec: any): Field;
        addColumnFromAvailableList(colIndex: number): Field;
        addDefaultColumn(colIndex: number): Field;
        removeColumn(colNameOrIndex: string | number): void;
        moveColumn(fromIndex: string | number, toIndex: string | number): void;
        insertColumn(colSpec: any, colIndex: string | number, origin?: ColumnOrigin): void;
        private addCol(spec, realIndex?, origin?);
        private removeCol(colNameOrIndex);
        private getColumnRealIndex(colIndex);
        private moveCol(fromIndex, toIndex);
        private resizeCol(index, newWidth);
        resizeColumn(index: number, newWidth: any): void;
        private createHeaderColumn(column);
        private createFooterColumn(column);
        private createElementColumnFromCache(column);
        private createColumnFromResult(column);
        selectTab(tabIdOrIndex: string | number): void;
        private modifyCurrentTab();
        selectedTab(): string;
        selectedTabIndex(): number;
        subscribe(subscribes?: WidgetSubscriptions): void;
        unsubscribe(): void;
        getUnbindingManager(): UnbindingManager;
        /*** Merged from ListUIFactoryBase ***/
        getSubscriptionFields(): string[];
        /**
         * Just creates a single column. This function can be overridden to provide further details to
         * column creation, or you can create a column-creator function to the constructor. (Public to enable overriding)
         */
        createColumn(spec: any, languageHandler: Language, source?: FieldSource[]): Field;
        applyInteractionEvents(tr: HTMLElement | HTMLTableRowElement, rowId: any, rowObject: any): void;
        applyCacheInteractionEvents(row: HTMLElement | HTMLTableRowElement, rowId: any, cacheKey: string): void;
        /**
         * Creates and assigns the columns-array based an an array of specs.
         */
        protected createColumns(mainSpecs: any[], extraSpecs: any[], languageHandler: Language): void;
        updateDefaultContent(): void;
        removeDefaultContent(): void;
        /**
         * Searches through the list of columns to find one of the given name.
         * @param name
         * @returns {Column} the column-object if found, null otherwise.
         */
        findColumn(name: string): Field;
        /*** END Merged from ListUIFactoryBase ***/
        /**
         * Creates a string-array of field-names suitable to send to the get snapshot/subscription methods.
         *
         * @returns {string[]} An array guaranteed to only contain names of existing fields, and only one of each.
         */
        getColumns(): Field[];
        createQuoteOptions(): QuoteOptions;
        createFooterFields(array: ObservableArray, cacheKeyCreator: (item: any) => string): void;
        private createFooterField(array, col, cacheKeyCreatorFactory);
        createComputedFieldInCache(col: Field, rowId: any, cacheKey: string): void;
        createComputedFieldsInCache(rowId: any, cacheKey: string): void;
        setSortColumnChangedCallback(callback: (sortedColumn: Field, sortOrder: SortOrder, userInteraction: boolean) => void): void;
        setRowClickCallback(callback: (rowId: any) => void): void;
        setLinkTriggerCallback(callback: (rowId: any, value: any, extras: any) => void): void;
        setCacheKeyConverter(converter: (originalKey: string, column: Field) => string): void;
        /**
         * You may need to extract the values from the result-object in a non-standard way. If you provide this callback it
         * will be used instead of Column.getValueFromObject()
         *
         * @param callback
         */
        setDataRetriever(callback: (col: Field, dataObject: Object) => void): void;
        setVisibleColumns(visibleColumnNames: string[]): void;
        private showExtraPopup(anchorElement, cacheKey, columnIndex);
        createHeaderCol(col: Field): HTMLElement;
        private isColInAvailableList(column);
        unbindFooterTr(): void;
        private createGenericCol(col, rowId);
        createTDfromResult(rowId: any, result: Object, col: Field, decimals: number): HTMLElement;
        private formatValueForColumn(col, rowId, decimals, val);
        createColfromCache(rowId: any, cacheKey: string, col: Field, decimals: Observable, columnIndex: number): HTMLElement;
        createColfromCache(rowId: any, cacheKey: string, col: Field, decimals: number, columnIndex: number): HTMLElement;
        /**
         * Determines the type of binding needed and binds. Returns the unbind function
         * @param useSymbolBinding If the rowId is an instrument or not (needs to contain feed+ticker)
         * @param cacheKey Cachekey for normal binding
         * @param instrument RowId, not needed if doing "old-school" binding with cachekey
         * @param field The field/column object
         * @param binding The binding we want to use
         */
        private bindField(useSymbolBinding, cacheKey, instrument, field, binding);
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): void;
        private setupDragAndDrop();
    }
    /**
     * Subclass of ColumnManager that creates Column-objects that has a known source.
     */
    class SnapshotColumnManager extends ColumnManager {
        createColumn(spec: any, languageHandler: Language): Field;
    }
    class BrokerstatsColumnManager extends ColumnManager {
        createColumn(spec: any, languageHandler: Language): Field;
    }
    class MarketListColumnManager extends ColumnManager {
        createColumn(spec: any, languageHandler: Language): Field;
    }
    class InstrumentListLinkControllerDelegate implements InterLibraryLink.Controller {
        private targetManager;
        private isinTargetManager;
        private cache;
        constructor(cache: BindingCache);
        instrumentClicked(instrument: Instrument): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
    }
}
declare module Infront {
    class BrokerstatsWidgetOptions extends CommonListOptions {
        instrument: Instrument;
        feed: number;
        broker: string;
        period: string;
        enablePeriodSelector: boolean;
        maxItems: number;
        onInstrumentSelected: (instrument: Instrument) => void;
        onBrokerSelected: (broker: string) => void;
        tickerInHeader: boolean;
        columns: any[];
        defaultSortedColumn: any;
        defaultSortOrder: SortOrder;
    }
    class BrokerstatsWidget extends CommonListWidgetBase implements RowFactory, InterLibraryLink.Target {
        protected options: BrokerstatsWidgetOptions;
        private displayTicker;
        private static kMySortingColumnKey;
        private feedMetadata;
        private decimals;
        private brokerstatsAvailableForFeed;
        private currentPeriod;
        private data;
        private dataCap;
        private periods;
        private periodTitles;
        private periodObserver;
        private showProgressIndicator;
        private widgetTitleObs;
        private tableHeader;
        constructor(element: HTMLElement, infrontUI: UI, options: BrokerstatsWidgetOptions);
        linkEvent(instrument: Instrument): void;
        protected setColumnManager(): void;
        protected setListItems(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
        private addLabelToSelectElement(elements);
        private createCacheKey(resultItem);
        private getBrokerstatsData();
        createRow(item: any, index: number): HTMLElement;
        rowClicked(rowId: any): void;
        private periodSelected(selectedIndex);
        sortColumnChanged(column: Field, sortOrder: SortOrder, userInteraction: boolean): void;
        protected getStoredColumn(): void;
        modify(options: WidgetOptions): void;
        receiveMessage(msg: InterLibraryLink.Message): void;
        accepts(): string[];
    }
}
declare module Infront {
    class CashPositionsWidgetOptions extends CommonListOptions {
        showPortfolio: boolean;
        showPortfolioSelect: boolean;
        columns: any[];
        titleClick: () => void;
    }
    class CashPositionsWidget extends TradingWidgetBase implements RowFactory, IArrayBinding {
        protected options: CashPositionsWidgetOptions;
        protected showPortfolio: boolean;
        protected showPortfolioSelect: boolean;
        protected portfolioSelectWidget: Infront.PortfolioSelectWidget;
        private columnManager;
        private items;
        private sync;
        private currentPortfolioNameObs;
        private isTrading;
        private unbind;
        constructor(element: HTMLElement, infrontUI: UI, options: CashPositionsWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
        createRow(item: any, index: number): HTMLElement;
        currentPortfolioChanged(portfolio: Portfolio): any;
        currentPortfolioReady(portfolio: Portfolio): any;
        supportsHasContent(): boolean;
        private updateHasContent();
        reInit(items: any[]): any;
        itemAdded(item: any, index: number): any;
        itemRemoved(item: any, index: number): any;
        itemMoved(item: any, oldIndex: number, newIndex: number): any;
        createPortfolioSelect(container: HTMLElement): void;
    }
}
/**
 * Created by hage on 16.07.2014.
 */
declare module Infront {
    class CssConstants {
        static kVisbilityHidden: string;
        static kHiddenClass: string;
        static kNoDataClass: string;
        static kNoPaddingClass: string;
        static kFullButtonCellClass: string;
        static kDeleteButton: string;
        static kModifyButton: string;
        static kActivateButton: string;
        static kDeactivateButton: string;
        static kCursorPointer: string;
        static kCellRowInteraction: string;
        static kTableCellInteraction: string;
        static kCellActiveRow: string;
        static kCellSumRow: string;
        static kCellSumRowLabel: string;
        static kCellTableSortable: string;
        static kCellTableSortableDesc: string;
        static kCellTableSortableAsc: string;
        static kCellNumeric: string;
        static kCellText: string;
        static kCellNumTime: string;
        static kCellNumDate: string;
        static kCellArrow: string;
        static kUpdateUp: string;
        static kUpdateDown: string;
        static kUpdateNeutral: string;
        static kUpdateNone: string;
        static kUpdateFlashUp: string;
        static kUpdateFlashDown: string;
        static kStatusPositive: string;
        static kStatusNegative: string;
        static kInputConfirmed: string;
        static kSearchResultEquity: string;
        static kSearchResultBond: string;
        static kSearchResultFeed: string;
        static kSearchResultFuture: string;
        static kSearchResultOption: string;
        static kSearchResultFund: string;
        static kSearchResultForex: string;
        static kSearchResultChain: string;
        static kSearchResultIndex: string;
        static kSearchResultCertificate: string;
        static kSearchResultOther: string;
        static kCellNotificationsSuccess: string;
        static kCellNotificationsAlert: string;
        static kCellNotificationsInfo: string;
        static kTableRowBuy: string;
        static kTableRowSell: string;
        static kPopupArrowTopLeft: string;
        static kPopupArrowTopRight: string;
        static kPopupArrowBottomLeft: string;
        static kPopupArrowBottomRight: string;
        static kInstrumentValuesHorizontal: string;
        static kInstrumentValuesVertical: string;
        static kInstrumentValuesVerticalHeading: string;
        static kInstrumentValuesVerticalValue: string;
        static kCellTradingInfoWrapper: string;
        static kCellActiveOrderMessageBox: string;
        static kCellTradesMessageBox: string;
    }
}
/**
 * Created by hage on 14.07.2014.
 */
declare module Infront {
    interface InfrontComponent {
        destroy(): void;
    }
    class TabOptions {
        id: string;
        label: string;
        selected?: boolean;
        constructor(id?: string, label?: string, selected?: boolean);
    }
    class TabbedContainerOptions {
        tabs: TabOptions[];
        useContainers: boolean;
        onSelect: (id: string) => void;
    }
    /**
     * Tabbed Container to split functionality under several tabs.
     */
    class TabbedContainer implements InfrontComponent {
        private static kContainer;
        private static kHiddenClassname;
        private element;
        protected options: TabbedContainerOptions;
        private tabs;
        private selectedId;
        private enabled;
        constructor(element: HTMLElement, options: TabbedContainerOptions);
        private buildUI();
        setSelectedId(id: string): void;
        getContainer(id: string): HTMLElement;
        setEnabled(enabled: boolean): void;
        destroy(): void;
    }
    class SimpleSearchBoxOptions {
        searchThreshold: number;
        maxResults: number;
        placeholder: string;
        fields: string[];
        autoselectAfterTab: boolean;
        showAfterSelect: any;
        enableMultiSelect: boolean;
        preselectedElements: any;
        searchItemType: string;
        processSearch: (text) => Object[];
        getSelectedItemStr: (item: any) => string;
        itemAdded: (item: any) => void;
        itemRemoved: (item: any) => void;
        itemSelected: (item: any) => void;
        emptyResultSelected: (searchText: string) => void;
        dropdownUpdatedCallback: (dropdownContainer: HTMLElement) => void;
    }
    /**
     * Class that adds label to elements.
     * @param element Parent element
     * @param labelEl Label element for parent element
     * @param opts Options for label element
     * @param id Id for parent element
     * @param text Inner text for label element
     */
    class SetLabel {
        opts: {
            hide: string;
        };
        constructor(element: HTMLElement, labelEl: HTMLLabelElement, opts: string, id: string, text: string);
    }
    class SimpleSearchBox implements InfrontComponent {
        static kShowEmpty: string;
        private element;
        protected options: SimpleSearchBoxOptions;
        private strings;
        private textObserver;
        private searchResults;
        private showResults;
        private selectedResult;
        private currentSearchId;
        private lastReturnedSearchId;
        private itemHasBeenSelected;
        private currentElements;
        private selectLastElement;
        private absolutePosWrapper;
        private perfectScrollbar;
        constructor(element: HTMLElement, infront: Model, options: SimpleSearchBoxOptions);
        private createDefaults();
        private init();
        private buildUI();
        private searchTextUpdated(text);
        private keyPressed(keycode);
        private getShowAfterSelect(item);
        private searchResultSelected(item);
        private noSearchResultSelected();
        private removeElement(instrument);
        focus(): void;
        clear(): void;
        setText(txt: string, performSearch?: boolean): void;
        setEnabled(enabled: boolean): void;
        modify(newOptions: SimpleSearchBoxOptions): void;
        destroy(): void;
    }
    class SearchBoxOptions {
        feeds: number[];
        searchTickersOnly: boolean;
        searchThreshold: number;
        maxResults: number;
        placeholder: string;
        fields: string[];
        autoselectAfterTab: boolean;
        instrumentSelected: (instrument: Instrument) => void;
        emptyResultSelected: (searchText: string) => void;
        chainSelected: (chain: Chain) => void;
        itemTypes: string[];
        instrumentTypes: string[];
        showAfterSelect: any;
        popupOffset: number;
        filter: (resultItem: any) => boolean;
        instrumentInfoCallback: (showInstrumentInfo: boolean) => void;
        disableSearchOnEnter: boolean;
        enableMultiSelect: boolean;
        preselectedInstruments: any;
        instrumentAdded: (instrument: Instrument) => void;
        instrumentRemoved: (instrument: Instrument) => void;
        dropdownUpdatedCallback: (dropdownContainer: HTMLElement) => void;
        searchResultCallback: (results: any[]) => void;
        rightAlignDropDown: boolean;
        role: string;
        setLabel: (hide: string, innerHtml: string, id: string) => void;
        hiddenLabel: boolean;
    }
    /**
     * Textbox that searches for instruments and shows results in a dropdown for selection.
     */
    class SearchBox implements InfrontComponent, InterLibraryLink.Controller {
        static kShowTicker: string;
        static kShowName: string;
        static kShowEmpty: string;
        static kShowTickerAndFeedCode: string;
        static kTypeChain: string;
        static kTypeForex: string;
        static kTypeInstrument: string;
        private static kClassTypeProperty;
        private static kItemClassTypeProperty;
        private element;
        private dropDownEl;
        protected options: SearchBoxOptions;
        private infront;
        private textObserver;
        private searchResults;
        private showResults;
        private selectedResult;
        private instrumentTypeClassMap;
        private instrumentItemTypeClassMap;
        private currentSearchId;
        private lastReturnedSearchId;
        private tabbedOutBeforeResult;
        private instrumentHasBeenSelected;
        private currentElements;
        private selectLastElement;
        private targetManager;
        private absolutePosWrapper;
        private searchField;
        private perfectScrollbar;
        constructor(element: HTMLElement, infront: Model, options: SearchBoxOptions);
        private init();
        private createDefaults();
        private buildUI();
        private outsideClickCheckKeyboard;
        private outsideClickCheck;
        private searchTextUpdated(text);
        private processSearchResult(data);
        private keyPressed(keycode);
        private getShowAfterSelect(item);
        private searchResultSelected(item);
        private noSearchResultSelected();
        private removeElement(instrument);
        focus(): void;
        clear(updateObservers?: boolean): void;
        setText(txt: string, performSearch?: boolean): void;
        setEnabled(enabled: boolean): void;
        modify(newOptions: SearchBoxOptions): void;
        destroy(): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
    }
    class DropDownOptions {
        id: string;
        title: string;
        onItemClicked: (item: any) => void;
        onSelectedItemsChanged: (items: any[]) => void;
        onSortItems: (item1, item2) => number;
        list: any[];
        subNodeName: string;
        multiSelect: boolean;
        sortAlphabetically: boolean;
        showToggleAll: boolean;
        closeOnClick: boolean;
        className: string;
        dropDownClassName: string;
        itemLabelPropertyKeys: string[];
        itemPath: string;
        selectionUpdatesTitle: boolean;
        preSelectedItems: any[];
        visible: boolean;
        overridePosition: string;
    }
    class DropDown implements InfrontComponent {
        static kRootElementName: string;
        private element;
        private options;
        private parent;
        private isMultiLevel;
        private list;
        private showDropDownMenu;
        private inSubMenu;
        private dropDownTitle;
        private stack;
        private rootItem;
        id: string;
        title: Observable<string>;
        backButtonLabel: string;
        toggleAllButtonLabel: string;
        private selectedDropdownItems;
        language: Language;
        dropdownContainer: HTMLElement;
        private dropDownElements;
        upperPaneElement: HTMLElement;
        lowerPaneElement: HTMLElement;
        private upperPaneVisible;
        private lowerPaneVisible;
        private absolutePosWrapper;
        private dropdownLabel;
        isActive: Observable;
        private closeBtn;
        private perfectScrollbar;
        constructor(element: HTMLElement, options: DropDownOptions, language?: Language, parent?: any);
        private buildDropdownFromList(list, preSelectedItems);
        private buildUI();
        private onOkClick();
        private onToggleAllClick();
        private getDropdownTitle(length);
        private setActiveSubMenu(itemWithDropDown);
        /**
         * Hides or shows the whole drop-down (Including the button)
         * @param value
         */
        display(value: boolean): void;
        /**
         * Closes the dropdown menu if it was open
         */
        close(): void;
        private findElement();
        private backItemClicked();
        /** Resets a dropdown to the root element */
        private resetMenuNavigation();
        private windowClick;
        private keyboardListener;
        private dropDownClicked();
        private emitSelectedItems();
        private itemClicked(clickedItem);
        setList(newList: any[], preSelectedItems: any[]): void;
        setSelectedItem(item: any): void;
        setSelectedItems(itemList: any[]): void;
        getSelectedItems(): any[];
        private updateScrollAreaSize();
        showUpperPane(doShow?: boolean): void;
        showLowerPane(doShow?: boolean): void;
        destroy(): void;
    }
    class SliderItem {
        label: string;
        value: number;
        constructor(value?: number, label?: string);
    }
    class SliderOptions {
        steps: number;
        initialPosition: number;
        getLabel: (step: number) => string;
        onPositionChanged: (position: number) => any;
    }
    class Slider implements InfrontComponent {
        private element;
        private domElements;
        private options;
        private parent;
        private stepElement;
        private stepMarkerWidth;
        private stepSize;
        private backgroundBarBounds;
        private mouseStartX;
        private currentPosition;
        private bulletWidth;
        private offsetX;
        private initialized;
        position: number;
        constructor(element: HTMLElement, options: SliderOptions, parent?: any);
        private getSliderItems(steps);
        private buildUI();
        private initializeEasing();
        private clickBackground;
        private clickBullet;
        private moveBullet;
        private stopBullet;
        private updatePosition(value, updateBulletPosition);
        destroy(): void;
    }
    class PagerOptions {
        pages: number;
        onPageChange: (newPage: number, oldPage: number) => void;
    }
    class Pager implements InfrontComponent {
        private element;
        protected options: PagerOptions;
        private languageHandler;
        private prevEnabled;
        private nextEnabled;
        private visible;
        private currentPage;
        constructor(element: HTMLElement, languageHandler: Language, options: PagerOptions);
        private buildUI();
        private pageChanged(oldPage);
        private prevClicked();
        private nextClicked();
        private firstClicked();
        setPages(pages: number): void;
        getCurrentPage(): number;
        setCurrentPage(page: number): void;
        destroy(): void;
    }
    class DateSelector {
        private static months;
        private static oneLetterDays;
        private element;
        private strings;
        private showCalendar;
        private currentMonthName;
        private disabled;
        private currentMonth;
        private currentYear;
        private textFieldBinding;
        private calendarContainer;
        private currentDate;
        private minDate;
        private maxDate;
        private data;
        private onClickListener;
        private dateChangeCallback;
        private elements;
        constructor(element: HTMLElement, strings: Language, dateChangeCallback?: (newDate: Date) => void);
        private buildUI();
        private dropdownListener;
        private windowClick;
        private calendarVisibility(event);
        private createCalendar(month, year);
        private dateIsOutsideRange(val);
        private clearAllData(element);
        private updateCalendar();
        private updateTextfield();
        private nextMonthClick(event);
        private prevMonthClick(event);
        private dateClick(event);
        private textUpdated(text);
        setFocus(): void;
        getDate(): Date;
        setDate(newDate: Date): void;
        setMinDate(minDate: Date): void;
        setMaxDate(maxDate: Date): void;
        setEnabled(value: boolean): void;
        destroy(): void;
        reset(): void;
    }
    class TimeSelector {
        private element;
        private strings;
        private hourSelector;
        private hourItems;
        private minuteSelector;
        private minuteItems;
        private disabled;
        private seperator;
        private currentTime;
        private currentHour;
        private currentMinute;
        private minHour;
        private maxHour;
        private timeChangeCallback;
        constructor(element: HTMLElement, strings: Language, timeChangeCallback?: (newTime: Date) => void);
        private buildUI();
        private setTimeInternal(newHour, newMinute);
        setTimeA(newHour: number, newMinute: number): Date;
        setTimeB(newTime: Date): Date;
        setHour(newHour: number): Date;
        setMinute(newMinute: number): Date;
        getHour(): number;
        getMinute(): number;
        getTime(): Date;
        setEnabled(value: boolean): void;
        getSeperator(): string;
        setSeperator(newSeperator: string): void;
        setMinMaxHour(newMin: number, newMax: number): void;
        getFormattedTime(): string;
        destroyUI(): void;
        destroy(): void;
        reset(): void;
    }
    enum PopupAnchorLocation {
        TOP_LEFT = 0,
        TOP_RIGHT = 1,
        BOTTOM_LEFT = 2,
        BOTTOM_RIGHT = 3,
    }
    class PopupOptions {
        anchor: PopupAnchorLocation;
        arrow: boolean;
        offsetX: number;
        offsetY: number;
        width: number;
    }
    class Popup {
        private static kArrowClasses;
        private _options;
        private anchorTo;
        private parent;
        protected container: HTMLElement;
        protected content: HTMLElement;
        constructor(parent: HTMLElement, anchorTo: HTMLElement, options: PopupOptions);
        getContent(): HTMLElement;
        private buildUI();
        private findTopLevelParent();
        private findParentOffset();
        destroy(): void;
    }
    class YesNoPopupOptions extends PopupOptions {
        onYes: () => void;
        onNo: () => void;
    }
    class YesNoPopup extends Popup {
        protected options: YesNoPopupOptions;
        private questionText;
        private languageHandler;
        constructor(parent: HTMLElement, anchorTo: HTMLElement, questionText: string, languageHandler: Language, options: YesNoPopupOptions);
        private doBuildUI();
        private onYes();
        private onNo();
    }
    class Switch {
        private element;
        private state;
        private binding;
        private ariaLabelString;
        onSwitch: () => void;
        constructor(element: HTMLElement, onStateChange: (state: boolean) => void, initialState: boolean, ariaLabelString: string);
        setState(state: boolean): void;
        private buildUI();
        destroy(): void;
    }
    class RadioButton {
        private element;
        private group;
        private id;
        private label;
        private state;
        constructor(element: HTMLElement, group: string, id: number, label: string, onStateChange?: (selectedId: number) => void, initialState?: boolean);
        private buildUI();
        private radioClicked();
        setSelected(selected: boolean): void;
        getId(): number;
        destroy(): void;
    }
    class AccesabilityCommon {
        getKeyboardNav(tableBody: HTMLElement | null, tableParent: HTMLElement | null): void;
    }
    class Link extends WidgetBase implements InterLibraryLink.Controller, InterLibraryLink.Target {
        private linkAction;
        private linkChannels;
        private receiveCallback;
        private targetManager;
        constructor(infrontUI: UI, linkAction: LinkAction, linkChannels: number[] | number, receiveCallback: (type: string, value: any) => void);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        private doLink(type, value);
        linkInstrument(instrument: Instrument): void;
        linkInstruments(instruments: Instrument[]): void;
        linkIsin(isin: string): void;
    }
}
declare module Infront {
    class QuoteListTabOptions extends TabOptions {
        columns: string[];
    }
    class QuoteListWidgetOptions extends CommonListOptions {
        instruments: Instrument[];
        feed: number;
        instrumentTypes: string[];
        issuer: string;
        showDropDowns: boolean;
        linkAction: LinkAction;
        selectedRow: number;
        selectedInstrument: Instrument;
        onInstrumentSelected: (instrument: Instrument) => void;
        columns: any[];
        useChains: boolean;
        chains: Chain[];
        defaultChain: Chain | string;
        enableSearch: boolean;
        types: string[];
        dropDownItemClick: (item: any) => void;
        preferredIssuers: string[];
        preferredUnderlying: string;
        expandContainer: HTMLElement;
        maxItems: number;
        onItemCountChange: (items: number) => void;
        chainButtonTitle: string;
        cacheKeyConverter: (originalKey: string, column: Field) => string;
        showFilters: boolean;
        showUnderlyings: boolean;
        showIssuers: boolean;
        showExpiries: boolean;
        issuersHasAll: boolean;
        issuersHasNone: boolean;
        underlyingsHasNone: boolean;
        underlyingsHasAll: boolean;
        customDropDowns: DropDownOptions[];
        customElementsBefore: HTMLElement[];
        customElementsAfter: HTMLElement[];
        customTitle: HTMLElement;
        secondarySortedColumn: any;
    }
    class FilterOpts {
        dropdownOpts?: DropDownOptions;
        targetElement?: HTMLElement;
        filterFunc: () => void;
        setItems: (items: any[]) => void;
        filterItems: (items: any[]) => void;
    }
    class QuoteListWidget extends CommonListWidgetBase implements InterLibraryLink.Controller, InterLibraryLink.Target, RowFactory, ArrayBindingObserver {
        private static kMyStoredChainKey;
        private static kLanguageKey;
        private static kMySortingColumnKey;
        private static kDropDownToggleAllValues;
        private static kWarrants;
        private static kOptions;
        private static kBonds;
        private static kFunds;
        protected options: QuoteListWidgetOptions;
        private sAll;
        private sNone;
        protected cachedReferenceData: {
            feed: number;
            data: any[];
        };
        private instrumentsToShow;
        protected instruments: ObservableArray;
        private dataCap;
        private tabBar;
        private binding;
        private feedMetaData;
        private chainName;
        private feedDescription;
        private dataTypes;
        private issuers;
        private underlying;
        private underlyingFeeds;
        private underlyingFullName;
        private widgetSubTitle;
        dropDowns: ObservableArray;
        private chainDropDown;
        private expiryDropDown;
        private underlyingDropDown;
        private issuerDropDown;
        private showIssuers;
        private showUnderlying;
        private showChains;
        private instrumentFilter;
        private perfferedUnderlying;
        private visibleExpirydates;
        private updateVisibleExpiryDates;
        private showExpiryDates;
        private targetManager;
        private isinTargetManager;
        private selectedRow;
        private selectedInstrument;
        private initiallySelectedInstrument;
        private showProgressIndicator;
        private dropDownContainer;
        private headerElement;
        private chains;
        private selectedChain;
        private selectedChainName;
        private hasMultipleChains;
        private linkTargets;
        private requestsCount;
        private secondarySortColumn;
        private showCustomDropDowns;
        private defaultSortColumn;
        constructor(element: HTMLElement, infront: Model, infrontUI: UI, options: QuoteListWidgetOptions);
        protected setListItems(): void;
        protected setColumnManager(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        /**
         * Responsible for creating DOM and bindings
         */
        protected newBuildUI(): void;
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        protected newDestroyUI(): void;
        protected finalize(): void;
        private addAllInstruments(instruments);
        /**
         * Fetches feed metadata if necessary and adds the instrument to the list and the cache.
         *
         * @param instrument
         */
        private doAddInstrument(instrument);
        private handleItemTypes(dataTypes);
        setSorting(fieldName: string, sortOrder: SortOrder, userInteraction: boolean): void;
        sortColumnChanged(column: Field, sortOrder: SortOrder, userInteraction: boolean): void;
        private getSecondarySortField();
        private getStoredColumnSortingOptions();
        private createSettings();
        private createAndBindRootElement();
        setMaxItems(newMax: number): void;
        createRow(instrument: any, index: number): HTMLElement;
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): void;
        rowClicked(instrument: Instrument): void;
        linkEvent(instrument: Instrument): void;
        private tabSelected(tabId);
        setVisibleColumns(visibleColumnNames: string[]): void;
        getColumnManager(): ColumnManager;
        setInitiallySelectedInstrument(instrument: Instrument): void;
        accepts(): string[];
        static replaceAlls: number;
        static adds: number;
        receiveMessage(msg: InterLibraryLink.Message): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        hasInstrument(instrument: Instrument): boolean;
        addInstrument(instrument: Instrument): void;
        addInstruments(instruments: Instrument[]): void;
        /**
         * Remove an instrument from the list if it's there.
         *
         * @param instrument
         */
        removeInstrument(instrument: Instrument): void;
        clear(): void;
        clearVisible(): void;
        loadChain(chain: Chain): void;
        loadFeed(feed: number): void;
        private addExtraFieldsToInstrument(instrument, mwsData);
        private addExpiryDate(expiryDate);
        fillIssuers(feed: number, onDone: () => void): void;
        private updateIssuers(underlying);
        fillUnderlyings(feed: number, issuer?: string, issuerFullName?: string): void;
        private updateUnderlyings(issuer, issuerFullName, onDone?);
        getReferenceData(feed: number, instrumentsInChain?: Instrument[]): void;
        private selectDefaultFilters();
        private preFilterInstruments(instrumentArray, instrumentsInChain?);
        private requestInstruments(all?);
        private filterAndAddInstruments();
        private setWidgetSubtitle();
        private getUnderlyingFullName();
        private sortList(list, property?);
        private findUnderlying(underTicker, underFeed);
        private underlyingSelected(underlying, doRequest?);
        private hasUnderlying(underlying, defualtValue?);
        private addIssuer(issuer, issuerFullname);
        private issuerSelected(issuerFullname, doRequest?);
        private hasIssuer(issuer, defaultValue?);
        private addCustomElement(element);
        private addDropDown(opts, showDropDownObs);
        private createCustomElementsBefore();
        private createCustomElementsAfter();
        private createCustomDropDowns();
        showHideDropDown(dropdown: DropDownOptions, visible: boolean): void;
        private createIssuerDropDown();
        createUnderlyingDropDown(): void;
        private expiryDateSelected(expiryDates);
        createExpiryDatesDropDown(): void;
        getInstruments(): Instrument[];
        getSelectedInstrument(): Instrument;
        private loadFeedChains();
        private nodesFromFlatChains(flatChains);
        private buildChainNodes(item);
        /**
         * Sets initial chain from first chain matching provided name. If no name provided it sets the first chain
         * @param items Chain/Node objects
         * @param initialChainName Name of chain to set. If empty the first chain found will match.
         */
        private selectInitChain(items, initialChainName);
        private chainSelected(chain);
    }
}
declare module Infront {
    class ChainViewerWidgetOptions extends QuoteListWidgetOptions {
        feed: number;
        types: string[];
        defaultChain: Chain | string;
        enableSearch: boolean;
        dropDownItemClick: (item: any) => void;
        useChains: boolean;
    }
}
declare module Infront.Indicators {
    class IndicatorCalculationOptions {
        periods: number[];
        longestPeriod: number;
        constructor(periods: number[]);
        setPeriods(periods: number[]): void;
    }
    abstract class baseIndicatorCalculation {
        protected priceType: number;
        protected firstValidTick: number;
        protected rebaseFactor: number;
        protected calcField: string;
        protected options: IndicatorCalculationOptions;
        protected prevTempValues: number[];
        protected tempValues: number[];
        protected dataValues: ChartCachePoint[];
        protected doRebase(value: number): number;
        constructor(dataValues: ChartCachePoint[], options: IndicatorCalculationOptions);
        protected resetValues(): void;
        protected abstract resetIndicatorChildValues(): any;
        setData(dataValues: ChartCachePoint[]): void;
        calcTick(tick: number, isUpdate?: boolean): number[];
        abstract indicatorCalculation(tick: number, periodTick: number, outArray: number[], isUpdate: boolean): any;
        private saveOrLoadPreviousValues(tick, isUpdate);
        setDataIsCompare(isCompare: boolean): void;
        usesCompareData(): boolean;
    }
    class template_Calculation extends baseIndicatorCalculation {
        protected resetIndicatorChildValues(): void;
        indicatorCalculation(tick: number, periodTick: number, outArray: number[], isUpdate: boolean): void;
    }
    class MACD_Calculation extends baseIndicatorCalculation {
        protected resetIndicatorChildValues(): void;
        indicatorCalculation(tick: number, periodTick: number, outArray: number[], isUpdate: boolean): void;
        setDataIsCompare(isCompare: boolean): void;
    }
    class SO_Calculation extends baseIndicatorCalculation {
        private timespan1;
        private timespan2;
        private timespan3;
        private Prev_K_Values;
        protected resetIndicatorChildValues(): void;
        private calc_SO_K(tick, timespan);
        indicatorCalculation(tick: number, periodTick: number, outArray: number[], isUpdate: boolean): void;
        setDataIsCompare(isCompare: boolean): void;
    }
    class SMA_Calculation extends baseIndicatorCalculation {
        protected resetIndicatorChildValues(): void;
        indicatorCalculation(tick: number, periodTick: number, outArray: number[], isUpdate: boolean): void;
    }
    class EMA_Calculation extends baseIndicatorCalculation {
        protected resetIndicatorChildValues(): void;
        indicatorCalculation(tick: number, periodTick: number, outArray: number[], isUpdate: boolean): void;
    }
    class WMA_Calculation extends baseIndicatorCalculation {
        private maxDivisor;
        protected resetIndicatorChildValues(): void;
        indicatorCalculation(tick: number, periodTick: number, outArray: number[], isUpdate: boolean): void;
    }
    class BB_Calculation extends baseIndicatorCalculation {
        protected resetIndicatorChildValues(): void;
        private GetBBPrice(priceType, index);
        indicatorCalculation(tick: number, periodTick: number, outArray: number[], isUpdate: boolean): void;
    }
    class RSI_Calculation extends baseIndicatorCalculation {
        protected resetIndicatorChildValues(): void;
        indicatorCalculation(tick: number, periodTick: number, outArray: number[], isUpdate: boolean): void;
        setDataIsCompare(isCompare: boolean): void;
    }
    class ATR_Calculation extends baseIndicatorCalculation {
        protected resetIndicatorChildValues(): void;
        private trueRange(tick);
        indicatorCalculation(tick: number, periodTick: number, outArray: number[], isUpdate: boolean): void;
        setDataIsCompare(isCompare: boolean): void;
    }
}
declare module Infront.Indicators {
    enum IndicatorTypes {
        MACD = 0,
        STOCHASTIC = 1,
        SIMPLE_MOVING_AVERAGE = 2,
        EXPONENTIAL_MOVING_AVERAGE = 3,
        WEIGHTED_MOVING_AVERAGE = 4,
        BOLLINGER_BANDS = 5,
        RELATIVE_STRENGTH_INDEX = 6,
        AVERAGE_TRUE_RANGE = 7,
    }
    class LineInfo {
        lastY: number;
        highChartSeries: Highcharts.SeriesObject;
        previousSetColorClass: string;
        constructor(seriesOptions: Highcharts.SeriesOptions, chart: Highcharts.ChartObject);
        addPoint(x: number, y: number, options: IndicatorGraphOptions): void;
        updatePoint(y: number, options: IndicatorGraphOptions): void;
        clear(): void;
        removeLines(): void;
        getColor(): string;
        setColor(colorClassName: string): void;
    }
    class IndicatorGraphOptions {
        shift: boolean;
        constructor(shift?: boolean);
    }
    class IndicatorAxisOptions {
        lineWidth: number;
        title: {
            text: any;
        };
        labels: {
            enabled: boolean;
        };
        id: string;
        height: string;
        top: string;
        constructor(axisID: string, axisHeight: number, topOffset: number);
    }
    class IndicatorManager {
        indicators: ChartIndicator[];
        indicatorOptions: IndicatorGraphOptions;
        dataValues: ChartCachePoint[];
        dataIsCompare: boolean;
        chart: Highcharts.ChartObject;
        labelManager: ChartWidgetLabelHandler;
        axisChangeCallback: (axisID: string, isIndicator: boolean) => void;
        editCallback: () => void;
        periodChangedCallBack: (period: number) => void;
        widgetInstanceCount: number[];
        loadingFromStorage: boolean;
        languageHandler: Language;
        constructor(chart: Highcharts.ChartObject, labelManager: ChartWidgetLabelHandler, language: Language, removeCallback: (axisID: string) => void, editCallback: () => void);
        addIndicator(indicator: IndicatorTypes, axisID: string, calcOptions?: IndicatorCalculationOptions, colorClassObject?: string[]): ChartIndicator | null;
        removeIndicator(indicator: Indicators.ChartIndicator): void;
        getStorageString(): string;
        loadFromStorage(storageString: string, doForEachIndicator?: (indicator: IndicatorTypes, axisID: string, options: IndicatorCalculationOptions) => void): void;
        pointAdded(tickNumber?: number): void;
        updateLastPoint(): void;
        setIndicatorsData(values: ChartCachePoint[], isCompare?: boolean): void;
        clear(): void;
        showPeriodEdit(editModal: ChartEditModal, indicator: Indicators.ChartIndicator): void;
    }
    abstract class ChartIndicator {
        manager: IndicatorManager;
        index: number;
        calcObject: baseIndicatorCalculation;
        graphOptions: IndicatorGraphOptions;
        calcOptions: IndicatorCalculationOptions;
        indicatorType: IndicatorTypes;
        indicatorID: string;
        labelManager: ChartWidgetLabelHandler;
        labels: SeriesLabels;
        axisID: string;
        colorClassList: string[];
        protected editInt: number[];
        protected tempValues: number[];
        protected dataValues: ChartCachePoint[];
        lineinfo: LineInfo[];
        constructor(index: number, indicator: IndicatorTypes, axisID: string, manager: IndicatorManager, calcOptions?: IndicatorCalculationOptions, colorClassList?: string[]);
        protected abstract getDefaultCalcOptions(): IndicatorCalculationOptions;
        protected abstract constructCalcObject(calcOptions?: IndicatorCalculationOptions): any;
        protected abstract constructLines(chart: Highcharts.ChartObject): any;
        protected abstract getIndicatorNameShort(): string;
        abstract getIndicatorName(): any;
        removeLines(): string;
        addPoint(tick: number): void;
        static getAxisHeight(): number;
        updateLastPoint(): void;
        setData(dataValues: ChartCachePoint[]): void;
        addLabels(): void;
        setColors(colorClassList: string[]): void;
        setID(): void;
        getAdjustableCalcOptions(): number[];
        getPeriodNames(): string[];
        getLineNames(): string[];
    }
}
/**
 * Created by hage on 18.03.14.
 * Updated by djuve on 08.06.16
 */
/**
 * Set Global highcharts-options
 */
import ChartCache = Infront.ChartCache;
import Resolution = Infront.Resolution;
declare module Infront {
    import IndicatorTypes = Infront.Indicators.IndicatorTypes;
    enum IntradayPeriod {
        TICK = 0,
        SECOND = 1,
        ONE_DAY = 2,
        PERIOD_24H = 3,
        TWO_DAYS = 4,
        THREE_DAYS = 5,
        FIVE_DAYS = 6,
        TEN_DAYS = 7,
        THIRTY_DAYS = 8,
    }
    enum HistoricalPeriod {
        ONE_MONTH = 1000,
        ONE_WEEK = 1001,
        THREE_MONTHS = 1002,
        SIX_MONTHS = 1003,
        ONE_YEAR = 1004,
        THREE_YEARS = 1005,
        FIVE_YEARS = 1006,
        TEN_YEARS = 1007,
        YTD = 1008,
        ALL = 1009,
    }
    enum ChartResolution {
        TICKS = 0,
        SECONDS = 1,
        MINUTES = 2,
        DAYS = 3,
        WEEKS = 4,
        MONTHS = 5,
        AUTO = 6,
    }
    enum WatermarkType {
        full_name = "full_name",
    }
    enum TooltipVersion {
        Standard = "standard",
        Advanced = "advanced",
        None = "none",
    }
    interface InstrumentUpdate {
        trades: Object[];
    }
    class ChartCachePoint {
        timestamp: number;
        time: string;
        last: number;
        open: number;
        volume: number;
        high: number;
        low: number;
        _compare: number;
        isNewDay: boolean;
        isTick: boolean;
        constructor(data: ChartCachePoint, timestamp: number | Date, closeValue: number, isFakeTick?: boolean);
        calculateCompare(closeValue: number): void;
    }
    enum HighchartsSeriesType {
        line = 0,
        area = 1,
        arearange = 2,
        areaspline = 3,
        areasplinerange = 4,
        candlestick = 5,
        column = 6,
        columnrange = 7,
        flags = 8,
        ohlc = 9,
        polygon = 10,
        scatter = 11,
        spline = 12,
    }
    enum CurrencyType {
        NOK = "NOK",
        SEK = "SEK",
        USD = "USD",
    }
    class ChartFieldType {
        static last: ChartFieldType;
        static open: ChartFieldType;
        static high: ChartFieldType;
        static low: ChartFieldType;
        static _compare: ChartFieldType;
        static getFieldTypeDisplayName(field: ChartFieldType, languageHandler: Language): string;
    }
    class ChartCache {
        instrumentArray: InstrumentData[];
        constructor();
        setResolutions(instrument: Instrument, period?: any, baseResolution?: string, baseStepSize?: number): void;
        addData(trades: Object[], instrumentID: string, callback: (updatedInstrument: InstrumentData) => void): void;
        indexOf(instrument: Instrument): number;
        shallowCheckIndexOf(instrument: Instrument): number;
    }
    class InstrumentData {
        instrument: Instrument;
        instrumentId: string;
        basedOnTicks: boolean;
        resolutions: ResolutionArray[];
        defaultResolution: ChartResolution;
        tempStorage: Object[];
        private mainField;
        private prevSelectedField;
        private lastTimeStamp;
        getMainFieldAsString(): string;
        getLastTimeStamp(): any;
        setLastTimeStamp(timeStamp: any): void;
        setMainField(field: ChartFieldType, setPrevOnly?: boolean): void;
        setCompare(isCompare: boolean): void;
        setResolutions(period: any, baseResolution: string, baseStepSize: number): void;
        setData(data: any): void;
        appendTrades(newTrades: Object[], callback?: (updatedInstrument: InstrumentData) => void): void;
        private addMergedTickToResolutions(mergedTick, resStartIndex);
        closestEligbleRes(baseIndex: number): ResolutionArray;
    }
    class ResolutionArray {
        isYesterday: boolean;
        data: ChartCachePoint[];
        stepSize: number;
        stepSizeMilliseconds: number;
        resolution: ChartResolution;
        baseRes: ResolutionArray;
        closeValue: number;
        hasCompareData: boolean;
        latestLastValue: number;
        pointsShownInChart: number;
        label: string;
        selected: Observable;
        available: Observable;
        selectedAuto: boolean;
        constructor(resolution: any, stepSize?: any, period?: any);
        setData(): void;
        updateLatestLast(): void;
        updateLastTick(data: ChartCachePoint): ChartCachePoint;
        private getNewDayTimeStamp(newDayTimeStamp);
        addCacheTick(data: ChartCachePoint): number;
        private addFakeTick(time);
        addMWSTick(data: ChartCachePoint, addToCache?: boolean, date?: Date): ChartCachePoint;
        getStepsAfterTimeStamp(timeStamp: number): number;
        findFittingZoomFromTimeStamp(timeStamp: number, isMin: boolean, maxNumberOfTicks: number): number;
    }
    class ChartPeriodButton {
        id: number;
        name: string;
        label: string;
        constructor(id: number, name: string, label: string);
        static kPeriodIds: {
            "T": IntradayPeriod;
            "S": IntradayPeriod;
            "1D": IntradayPeriod;
            "24H": IntradayPeriod;
            "2D": IntradayPeriod;
            "3D": IntradayPeriod;
            "5D": IntradayPeriod;
            "10D": IntradayPeriod;
            "30D": IntradayPeriod;
            "1W": HistoricalPeriod;
            "1M": HistoricalPeriod;
            "3M": HistoricalPeriod;
            "6M": HistoricalPeriod;
            "1Y": HistoricalPeriod;
            "3Y": HistoricalPeriod;
            "5Y": HistoricalPeriod;
            "10Y": HistoricalPeriod;
            "YTD": HistoricalPeriod;
            "ALL": HistoricalPeriod;
        };
        static fromString(periodStr: string, languageHandler: Language): ChartPeriodButton;
    }
    class LabelStylingTemplate {
        mainLabel: {
            wrapper: string;
            label: string;
        };
        lastBanner: {
            wrapper: string;
            label: string;
        };
    }
    class ChartEditModal {
        editBox: HTMLElement;
        overlay: HTMLElement;
        isVisible: boolean;
        parentElement: HTMLElement;
        constructor(parentElement: HTMLElement);
        outsideClickListener: (event: Event) => void;
        positionCheck(): void;
        remove(): void;
    }
    enum CustomLabelType {
        Static = 1,
        Hover = 2,
        None,
    }
    class ChartWidgetLabelHandler {
        private labelType;
        private labels;
        private chartContainer;
        private mainAxisLabelWrappers;
        private decimals;
        private showFullName;
        private infront;
        private hasInvertedYAxis;
        private languageHandler;
        overrideStaticChangeTag: IDS.RealtimeTags | string;
        constructor(container: HTMLElement, infront: Infront.Model, showCustomLabels: CustomLabelType, decimals: number, showFullName: boolean, invertedYAxis: boolean, languageHandler: Language);
        addInstrumentLabels(series: Highcharts.SeriesObject, instrumentId: string, targetCurrency: string, removeCallback: (editModal: ChartEditModal) => void, isCompare?: boolean, showRemove?: boolean): void;
        showFullnameOnLabel(): void;
        addIndicatorLabels(series: Highcharts.SeriesObject, id: string, callback: (editModal: ChartEditModal) => void, isCompare: boolean): SeriesLabels;
        addIndicatorLabels(series: Highcharts.SeriesObject[], id: string, callback: (editModal: ChartEditModal) => void, isCompare: boolean): SeriesLabels;
        addHoverDataToLabel(labelID: string, point: Highcharts.PointObject, hasOHLC: boolean, indicatorLineIndex?: number): void;
        addVolumeDataToLabel(labelID: string, point: Highcharts.PointObject, hasOHLC: boolean): void;
        updateAllLabels(currentLastPointNegativeOffset?: number): void;
        updateLabelDecimalCount(decimalCount: number): void;
        updateSpecificLabels(labelID: string, currentLastPointNegativeOffset?: number): void;
        updateSpecificLabelCompare(labelID: string, value: boolean): void;
        updateSpecificLabelField(labelID: string, field: ChartFieldType): void;
        setSpecificStaticChange(labelID: string, value: number): void;
        removeLabels(labelID: string): void;
        clearVolumeData(labelID: string): void;
        clearSeriesData(): void;
    }
    class MainAxisLabelWrappers {
        mainAxisWrapper: HTMLElement;
        instrumentLabelWrapper: HTMLElement;
        indicatorLabelWrapper: HTMLElement;
        constructor(chartWrapper: HTMLElement);
    }
    class SeriesLabels {
        languageHandler: Language;
        forSeries: Highcharts.SeriesObject[];
        chartContainer: HTMLElement;
        axisContainer: HTMLElement;
        mainLabel: MainLabel;
        lastBanners: LastBanner[];
        constructor(series: Highcharts.SeriesObject[], decimals: number, labelText: string, languageHandler: Language, labelStyleOptions: LabelStylingTemplate, chartContainer: HTMLElement, callback: (editModal: ChartEditModal) => void, isCompare: boolean, invertedYAxis: boolean, axisContainer?: HTMLElement, showRemove?: boolean);
        constructor(series: Highcharts.SeriesObject, decimals: number, labelText: string, languageHandler: Language, labelStyleOptions: LabelStylingTemplate, chartContainer: HTMLElement, callback: (editModal: ChartEditModal) => void, isCompare: boolean, invertedYAxis: boolean, axisContainer?: HTMLElement, showRemove?: boolean);
        update(lastPointNegativeOffset?: number): void;
        updateDecimalCount(decimalCount?: number): void;
        updateIsCompared(value: boolean): void;
        updateField(field: string): void;
        remove(): void;
        setPercentChange(value: number): void;
    }
    class MainLabel {
        private wrapper;
        private targetWrapper;
        private tooltipContainer;
        private rect;
        isCompare: boolean;
        private forSeries;
        private hasOHLC;
        editModal: ChartEditModal;
        showsDataForField: string;
        private languageHandler;
        private colorFactors;
        private styleSettings;
        decimalCount: number;
        private nowDate;
        private dateFormat;
        showPeriodEdit: () => void;
        constructor(series: Highcharts.SeriesObject, labelText: string, styleSettings: {
            wrapper: string;
            label: string;
        }, targetWrapper: HTMLElement, callback: (editModal?: ChartEditModal) => void, isCompare: boolean, languageHandler: Language, showRemove?: boolean);
        setTimeFormat(): void;
        update(): void;
        addHoverData(point: Highcharts.PointObject, hasOHLC: boolean, indicatorLineIndex?: number): void;
        showVolume(point: Highcharts.PointObject, hasOHLC: boolean): void;
        clearVolumeData(): void;
        clearSeriesData(): void;
        getAbsolutePosition(): {
            bottom: number;
            left: number;
        };
        remove(): void;
        toggleAdvancedModal(callback: (editModal: ChartEditModal) => void): void;
    }
    class LastBanner {
        private forSeries;
        private targetWrapper;
        private wrapper;
        private element;
        isCompare: boolean;
        decimalCount: number;
        private styleSettings;
        private colorFactors;
        private invertedAxis;
        constructor(series: Highcharts.SeriesObject, styleSettings: {
            wrapper: string;
            label: string;
        }, targetWrapper: HTMLElement, isCompare: boolean, decimals: number, invertedAxis: boolean);
        update(lastPointNegativeOffset?: number): void;
        remove(): void;
        formatToMatchYAxis(value: number): string;
    }
    class ChartWidgetConstants {
        static kLanguageKey: string;
        static kXaxisId: string;
        static kValueYAxisId: string;
        static kVolumeYAxisId: string;
        static kVolumeSeriesId: string;
        static kNavigatorSeriesId: string;
        static kIntraday: string;
        static kHistorical: string;
        static kInteractive: string;
        static kRangeDay: string;
        static kRangeAll: string;
        static kPeriodSelectorPosRight: string;
        static kPeriodSelectorPosLeft: string;
        static kTicker: string;
        static kFullName: string;
        static kCompareValueField: string;
        static kVolumeAxisHeight: number;
        static kSeparateAxisHeight: number;
        static kPaneMarginHeight: number;
        static kIndicatorSaveKey: string;
        static kSeperateAxisSaveKey: string;
        static kPeriodSaveKey: string;
        static kInstrumentsStoreKey: string;
        static kTypeStoreKey: string;
        static kMainFieldStoreKey: string;
        static kIntradayGrouping: {
            "enabled": boolean;
            "units": (string | number[])[][];
        };
        static kDefaultChartColors: string[];
        static kDefaultVolumeSeriesColor: string;
        static kNumberOfResolutionsToStore: number;
        static kMinTickPixelInterval: number;
    }
    class ChartWidgetOptions2 extends WidgetOptions {
        zoom: boolean;
        showVolume: boolean;
        yAxisOpposite: boolean;
        step: boolean;
        instruments: any;
        linkAction: LinkAction;
        hideBreaks: boolean;
        streaming: boolean;
        hasCustomSearchButton: boolean;
        customSearchClicked: () => void;
        intradayPeriod: IntradayPeriod;
        intradayStepSize: number;
        intradayStepUnit: string;
        startDate: Date;
        endDate: Date;
        targetCurrency: string;
        selectedCurrency: string;
        instrumentIsin: string[];
        selectablePeriods: string[];
        defaultPeriod: string;
        defaultResolution: string;
        periodSelectorPosition: string;
        chartTypeID: string;
        legendCreator: (instrument: Instrument) => string;
        legend: string;
        chartColors: string[];
        volumeColor: string;
        initialRange: string;
        gapSize: number;
        breakSize: number;
        yAxis: Highcharts.AxisOptions;
        onClick: () => void;
        indicators: string[];
        hideAxes: boolean;
        hideXAxis: boolean;
        hideYAxis: boolean;
        invertXAxis: boolean;
        invertYAxis: boolean;
        noSpacing: boolean;
        xDateFormat?: string;
        axisDateTimeFormat: any;
        buypassDefaultGlobalHighchartsOptions: boolean;
        enableReferenceSymbols: boolean;
        storedHistory: boolean;
        maxLookupDays: number;
        showWatermark: boolean;
        watermarkType: WatermarkType;
        chartUI: Highcharts.UIoptions;
        showSearchWidget: boolean;
    }
    /**
     * Convenience-object for holding chart-data (MWS-formatted) associated with an instrument.
     */
    class InstrumentAndData {
        instrument: Instrument;
        data: Object[];
    }
    class ComplexChartWidget extends WidgetBase implements InterLibraryLink.Target {
        private redrawPromise;
        private unbindingManager;
        private zIndexCounter;
        private isCompareChart;
        protected options: ChartWidgetOptions2;
        protected chart: Highcharts.ChartObject;
        protected navInstrumentId: string;
        protected breakInstrumentId: string;
        protected chartCache: ChartCache;
        protected currentBreaks: Object[];
        private _unsubscribes;
        progressIndicator: ProgressIndicator;
        isCalculating: boolean;
        dayBeforeLastValue: any;
        secondsStepSize: number;
        decimalCount: number;
        pointPixelInterval: number;
        maxNumberOfPointsAllowed: number;
        displayedCacheIndex: number;
        navCacheIndex: number;
        lockNavigator: boolean;
        private afterSetExtremesCallback;
        private resolutionUserLocked;
        private isAuto;
        private selectedResolutionName;
        private intraday;
        private selectedPeriodId;
        private chartIsMaximized;
        private displayedInstrumentHasNoIntraday;
        private minTimeStamp;
        private maxTimeStamp;
        private chartIsInitialized;
        private currentIntradayPeriod;
        private currentStartDate;
        private realStartDate;
        private currentEndDate;
        private toolbarContainer;
        private expandButtonContainer;
        private customSearchContainer;
        private vIndicatorsCombinedHeight;
        private vSeparateAxesCount;
        private nextUniqueAxisIdNumber;
        private hcSeries;
        private currentZoomDataOffset;
        private hasCustomLabels;
        private showFullnameForLabel;
        editModal: ChartEditModal;
        showAdvancedParameters: boolean;
        private chartDropdowns;
        private showToolbar;
        private hasSearchBox;
        private hasExpandButton;
        private hasChartTypeMenu;
        private hasIndicatorMenu;
        private hasPeriodMenu;
        private hasResolutionMenu;
        private customMenuButtons;
        private showIndicatorMenu;
        private showChartTypeMenu;
        private showPeriodMenu;
        private showResolutionsMenu;
        private autoResolution;
        private chartTypes;
        private indicatorTypes;
        private periods;
        private resolutions;
        private selectedPeriodName;
        private indicatorManager;
        private labelManager;
        protected defaults: any;
        private requestId;
        private indicatorPeriod;
        private watermark;
        private watermarkLabel;
        private defaultResIndex;
        private chartNoData;
        private tooltipClearTimeout;
        constructor(element: HTMLElement, infrontUI: UI, options: ChartWidgetOptions2);
        private setMetadataParameters(feedMetadata);
        protected newInit(): void;
        processSelectedSymbol(instrument: Instrument, callback: (data: Instrument) => void): void;
        private retrieveIsinCurrency(instrument, callback);
        protected newBuildUI(): void;
        private buildMenuUI(toolbarContainer);
        protected newDestroyUI(): void;
        private clearDropdowns();
        hideDropdowns(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newUnsubscribe(): void;
        /**
         * This is not the recommended way (and now we do it for every chart even if we in reality just have to do it once)
         * Buuuut we still do it here becuase we need the language object to avoid having multiple translation-objects
         */
        private setHighchartsLanguage();
        protected getColor(instrument: Instrument): string;
        selectInstrumentWithSpecifiedCurrency(originalInstrument: Instrument, isin: any, callback: (instrument: Instrument) => void): void;
        private checkforReferenceSymbol(instrument, callback);
        /**
         * Gets chart-data from all instruments. When it has collected all the data, it calls the next step in the build-phase.
         */
        protected getChartData(newPeriod?: boolean): void;
        setResolution(): void;
        setDisplayedCacheIndex(index: number, setByUser?: boolean): void;
        /**
         * Loads data from server for an instrument. If needed, it fetches the previous-close value and/or adds compare-values. It adds the data to the
         * cache before calling the callback.
         * @param instrument
         * @param callback
         */
        loadDataForInstrument(instrument: Instrument, callback: () => void): void;
        updateMinMax(data: InstrumentUpdate): any;
        updateMinMax(data: ResolutionArray[]): any;
        getInstrumentDataFromCache(instrument: any): ResolutionArray;
        unsubscribeFromAll(): void;
        private unsubscribeFromInstrument(instrument);
        private recivedTrades(instrument, trades);
        private subscribeToInstrumentIntraday(instrument);
        private subscribeToInstrumentHistoric(instrument);
        updateSeriesToReflectUpdatedCache(updatedInstrument: InstrumentData): void;
        private redrawChartAsync();
        createPointObject(cachePoint: ChartCachePoint, chartType: string, selectedField: string): Object;
        protected getIntradayChartDataForInstrument(instrument: Instrument, period: IntradayPeriod, completeIntradayCallback: (data: ChartCachePoint[]) => void): void;
        protected calculateDayBasedOnIntradayData(data: ChartCachePoint[]): ChartCachePoint;
        protected getHistoricalChartDataForInstrument(instrument: Instrument, startDate: Date, endDate: Date, callback: (data: ChartCachePoint[]) => void): void;
        addInstrument(instrument: Instrument, isMainInstrument?: boolean): void;
        removeInstrument(instrument: Instrument): void;
        private setUseCompare();
        clearNavSeries(): void;
        clear(): void;
        protected hasInstrument(instrument: Instrument): boolean;
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
        modify(options: ChartWidgetOptions2): void;
        updateAllInstruments(): void;
        getChartDataForInstrument(instrument: Instrument, callback: (data: Object[]) => void): void;
        createHighcharts(newPeriod?: boolean): void;
        private createPeriodButtons();
        initializeChart(): void;
        private updateIndicatorData();
        initHighcharts(chartContainer: HTMLElement): void;
        addIndicatorsFromStorage(): void;
        calculateAndLockNavigator(): {
            min: number;
            max: number;
        };
        getDataTimestampExtremes(): {
            min: number;
            max: number;
        };
        calculateAndGetDataTimestampExtremes(): {
            min: number;
            max: number;
        };
        updateResolution(event?: any): void;
        customExtremes(axis: Highcharts.AxisObject, min: number, max: number): Object;
        calculateMin(max: number, displayedRes: ResolutionArray): number;
        calculateMax(min: number, displayedRes: ResolutionArray): number;
        showSeriesEdit(editModal: ChartEditModal, id: InstrumentData, series: Highcharts.SeriesObject, isMainSeries: boolean): void;
        private windowClickedKeyboard(event);
        private windowClicked();
        updateChart(isFirstUpdate?: boolean): void;
        private addWaterMark(label);
        private setWatermark(resize?);
        private updateInstrumentSeries(isFirstUpdate?);
        private updateNavigatorDataSeries();
        private updateVolumeSeries();
        calculateBreaks(data: any[][]): Object[];
        private updateChartData(newPeriod?);
        updateMenuSettings(settings: Highcharts.UIoptions): void;
        private toggleChartTypeMenu();
        private toggleIndicatorMenu();
        private togglePeriodMenu();
        private toggleResolutionMenu();
        private updatePeriodMenu();
        private updateChartTypeMenu();
        private updateResolutionsMenu();
        resizeWidget(): void;
        customAddInstrument(instrument: any): void;
        isResizeable(): boolean;
        private toggleExpandRestoreChart();
        private getPeriodFromId(periodId);
        periodSelected(periodId: any, userInteraction?: boolean): void;
        setOtherResolutionsAvailable(): void;
        resolutionSelected(resolution: ResolutionArray): void;
        setChartType(typeID: string, initialLoad?: boolean): void;
        createValueSeries(instrument: Instrument, data: any[], field?: string): Highcharts.SeriesOptions;
        createVolumeSeries(data: ChartCachePoint[]): Highcharts.SeriesOptions;
        createNavigatorSeries(): any[];
        createComplexVolumeAxis(): any;
        updateYAxis(axisOpts: Highcharts.AxisOptions, removedAxis?: boolean, addedFromStorage?: boolean): void;
        addIndicator(indicator: any): void;
        removeIndicatorCallback(axisID: string, isIndicator: boolean): void;
        getIndicatorAxis(indicatorType: any, axisID?: string): Highcharts.AxisOptions | null;
        createIndicatorAxis(indicatorType: IndicatorTypes, axisID: string): Highcharts.AxisOptions;
    }
    /**
     * Default highcharts-options designed to simplify providing default chart options that counts for all charts.
     * @type {{}}
     */
    let DefaultChartOptions: Highcharts.Options;
    let DefaultChartWidgetOptions: Highcharts.ChartWidgetOptions;
}
declare module Infront {
    class ColumnCategory {
        id: number;
        title: string;
        expand: Observable<boolean>;
        items: ColumnItem[];
        element: HTMLElement;
        content: HTMLElement;
        onClick: (id: number) => void;
        onDblClick: (id: number) => void;
    }
    enum ColumnItemPosition {
        AvailableList = 0,
        DisplayedList = 1,
    }
    class ColumnItem {
        id: number;
        fieldName: string;
        title: string;
        spec: any;
        frozen: string;
        originalItem: ColumnItem;
        selected: Observable<boolean>;
        visible: Observable<boolean>;
        filtered: Observable<boolean>;
        draggable: Observable<boolean>;
        locked: Observable<boolean>;
        categories: ColumnCategory[];
        element: HTMLElement;
        position: ColumnItemPosition;
        onClick: (event) => void;
        onDblClick: (event) => void;
        headingHover: string;
    }
    class ColumnChooserWidgetOptions extends WidgetOptions {
        listWidget: CommonListWidgetBase;
        showTitle: boolean;
        overrideTitle: string;
        useOriginal: boolean;
        allowDirectUpdate: boolean;
        allowDragAndDrop: boolean;
        onClose: (state: number) => void;
        onAdd: () => void;
    }
    class ColumnChooserWidget extends WidgetBase {
        private static kLanguageKey;
        protected options: ColumnChooserWidgetOptions;
        protected widgetTitle: string;
        private categories;
        private availableItems;
        private displayedItems;
        private selectedItemsToAdd;
        private selectedItemsToRemove;
        private firstFilteredItem;
        private draggingItem;
        private allowDirectUpdate;
        private filterBinding;
        private btnAddDisabled;
        private btnRemoveDisabled;
        private modifiers;
        aListElement: HTMLElement;
        bListElement: HTMLElement;
        constructor(element: HTMLElement, infrontUI: UI, options: ColumnChooserWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
        private static getRealID(itemOrElement);
        private addSelectedToDisplay();
        private removeSelectedFromDisplay();
        private removeAllFromDisplay();
        reloadDisplayedList(): void;
        private resetDisplayList();
        private okClicked();
        private cancelClicked();
        private closeClicked();
        private categoryClicked(id);
        private categoryDblClicked(id);
        private itemToAddClicked(event);
        private itemToAddDblClicked(event);
        private itemToRemoveClicked(event);
        private itemToRemoveDblClicked(event);
        private createCategory(categoryName);
        private isItemDisplayed(item);
        private addItemToAvailableList(rawItem);
        private fillAvailableList();
        private addItemToDisplayedList(nameOrField, index, saveChanges?);
        private removeItemFromDisplayedList(item);
        private fillDisplayedList(loadDefaults?);
        private updateSelectionList(item, doSelect, list);
        private toggleItem(item, doSelect?);
        private expandCategory(id);
        private expandAllCategories(doExpand?);
        private findCategory(categoryName);
        private applyFilter(filter);
        private handleFilterSpecialKeys(keyCode);
        private setupDragAndDrop();
    }
}
declare module Infront {
    class CommunicationStatusWidgetOptions extends CommonListOptions {
        id: string;
        sortOrder: SortOrder;
        sortable: true;
        onRowClicked: (instrument: Instrument) => void;
        defaultSortedColumn: any;
        tableHeight: number;
        columns: any[];
    }
    class CommunicationStatusWidget extends CommonListWidgetBase implements RowFactory, ArrayBindingObserver {
        private currentCompareFunc;
        private defaultCompareFunc;
        protected options: CommunicationStatusWidgetOptions;
        private cols;
        private items;
        private counter;
        constructor(element: HTMLElement, infrontUI: UI, options: CommunicationStatusWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected setOptions(options: CommunicationStatusWidgetOptions): void;
        protected newSubscribe(): void;
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): any;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): any;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): any;
        linkEvent(instrument: Instrument): void;
        sortColumnChanged(column: Field, sortOrder: SortOrder, userInteraction: boolean): void;
        private static formatToCamelCase(fieldName);
        protected setListItems(): void;
        createRow(item: any, index: number): HTMLElement;
        protected setColumnManager(): void;
        rowClicked(instrument: Instrument): void;
    }
}
/**
 * Created by hage on 27.03.2015.
 */
declare module Infront {
    enum CompactModifyState {
        INPUT = 0,
        CONFIRM = 1,
        EXECUTE = 2,
    }
    class CompactModifyOrderWidgetOptions extends TradingWidgetOptions {
        order: number;
        onCancelClick: () => void;
        onOKClick: () => void;
        confirmation: OrderEntryConfirmation;
        confirmationCallback: (order: Object) => void;
    }
    class CompactModifyOrderWidget extends TradingWidgetBase {
        static kLanguageKey: string;
        protected options: CompactModifyOrderWidgetOptions;
        private currentPortfolio;
        private validity;
        private volumeInput;
        private priceInput;
        private openVolumeInput;
        private triggerPriceInput;
        private limitPriceInput;
        private trailLimitInput;
        private deviationInput;
        private orderState;
        private orderStateText;
        private orderStatusUnbind;
        private showError;
        private errorMessage;
        private errorMessageUnbind;
        private state;
        private confirmBody;
        private executeContainer;
        private modifyOptions;
        private instrument;
        private decimals;
        constructor(element: HTMLElement, infrontUI: UI, options: CompactModifyOrderWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        private changeState(newState);
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
        private modifyClick();
        private showExecuteScreen();
        confirmOrder(): void;
        private confirmClick();
        private cancelClick();
        currentPortfolioChanged(portfolio: Portfolio): any;
    }
}
/**
 * Created by Djuve on 16.07.19
 */
declare module Infront {
    class CompanyDescriptionWidgetOptions extends SingleInstrumentWidgetOptions {
    }
    class CompanyDescriptionWidget extends SingleInstrumentWidgetBase {
        private static kLanguageKey;
        private description;
        protected options: CompanyDescriptionWidgetOptions;
        constructor(element: HTMLElement, infrontUI: UI, options: CompanyDescriptionWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
    }
}
declare module Infront {
    enum CompanyFundamentalsRows {
        EV_Sales = "EV/SALES",
        ROE = "ROE",
        Dividend_yield = "DIVIDEND_YIELD",
        Eget_kapital = "EGET_KAPITAL",
        Netto_resultat = "NETTORESULTAT",
        Change_y = "CHANGE_Y",
        Credit_losses = "CREDIT_LOSSES",
        PE = "P/E",
        PSales = "P/SALES",
        PE_Adjusted = "P/E_ADJUSTED",
        FINANS_NETTO = "FINANSNETTO",
        Revenue = "REVENUE",
        Net_commission_income = "NET_COMMISSION_INCOME",
        Net_interest_income = "NET_INTEREST_INCOME",
        Profit_after_tax = "PROFIT_AFTER_TAX",
        Profit_before_tax = "PROFIT_BEFORE_TAX",
        Total_income = "TOTAL_INCOME",
        Total_costs = "TOTAL_COSTS",
        Total_assets = "TOTAL_ASSETS",
        Dividend_per_share = "DIVIDEND_PER_SHARE",
        EPS = "EPS",
        EPS_adjusted = "EPS_ADJUSTED",
        Stocks = "STOCKS",
        EBITDA = "EBITDA",
        EBITA = "EBITA",
        EBIT = "EBIT",
        EarningsYield = "EARNINGS_YIELD",
        EarningsYieldAdjusted = "EARNINGS_YIELD_ADJUSTED",
    }
    class CompanyFundamentalsData {
        [key: string]: IDS.FundamentalInfo[];
    }
    class CompanyFundamentalsItem {
        value: any;
        data: IDS.FundamentalInfo;
        currency?: string;
        constructor(rawData: IDS.FundamentalInfo);
    }
    class CompanyFundamentalsCollection {
        actualsYears: string[];
        estimateYears: string[];
        currentYears: string[];
        normalizedData: {
            [row: string]: {
                label: string;
                data: {
                    [year: number]: CompanyFundamentalsItem;
                };
                currency?: string;
            };
        };
    }
    class CompanyFundamentalsFactory {
        static convertKeys(rawData: CompanyFundamentalsData): CompanyFundamentalsData;
        static getFundamentalsKeyFromSwedish(key: string): CompanyFundamentalsRows;
    }
    class CompanyFundamentalsColumn {
        readonly hasEstimates: any;
        year: string;
        label: string;
        constructor(year: string);
    }
    class CompanyFundimentalsEstimatesColum extends CompanyFundamentalsColumn {
        hasEstimates: boolean;
        constructor(year: any, estimateSubfix: any);
    }
    class CompanyFundamentalsWidgetOptions extends SingleInstrumentWidgetOptions {
        rows: any[];
        showHalves: boolean;
        showQuarters: boolean;
        showCurrent: boolean;
        actualLimit: number;
        estimateLimit: number;
        hideEstimates: boolean;
        accessId: number;
        currentColumnHeader: string;
        estimatesSubfix: string;
        layout: ListLayout;
    }
    class CompanyFundamentalsWidget extends SingleInstrumentWidgetBase {
        private static kLanguageKey;
        protected options: CompanyFundamentalsWidgetOptions;
        private data;
        private rawData;
        private fundamentalsDataCollection;
        private columns;
        private rows;
        private rowHandlers;
        private currency;
        private sector;
        private subSector;
        private hasContent;
        constructor(element: HTMLElement, infrontUI: UI, options: CompanyFundamentalsWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        prepareFundamentals(): void;
        private addComputedRows(data?);
        protected newBuildUI(): void;
        createTableRow(tbody: HTMLElement): void;
        createCardRow(tbody: HTMLElement): void;
        protected newDestroyUI(): void;
        private processData();
        private convertRows();
        private getCurrent(label);
        private filterFundamentals();
    }
}
/**
 * Created by hage on 23.01.14.
 */
declare module Infront {
    class Data {
        private static kInfrontDataDefaultPrefix;
        private static kInfrontDataKeyPrefix;
        private static uid;
        private cache;
        private expando;
        private counter;
        constructor();
        put(element: HTMLElement, key: string, val: any): void;
        get(element: HTMLElement, key: string): any;
        hasKey(element: HTMLElement, key: string): boolean;
        delete(element: HTMLElement, key: string): void;
        clear(element: HTMLElement): void;
        private getCacheObject(element, create?);
        private nextKey();
    }
}
declare module Infront {
    class AlertNotificationClickedEvent extends InfrontEvent {
        static kEventName: string;
        payload: any;
        constructor(payload: any);
    }
    class AlertNotificationShownEvent extends InfrontEvent {
        static kEventName: string;
        payload: any;
        constructor(payload: any);
    }
}
/**
 * Created by hage on 12.09.2014.
 *
 * This file contains Common stuff used by different list-types.
 */
declare module Infront {
    enum BlinkType {
        Neutral = 0,
        UpDown = 1,
        UpDownSame = 2,
        UpDownFlash = 3,
        Percent = 4,
        None = 5,
    }
    enum BlinkDuration {
        Default = 1000,
        Short = 500,
        Long = 2000,
        Sustained = 0,
    }
    enum ColumnSortDirection {
        NONE = 0,
        ASC = 1,
        DESC = 2,
    }
    enum DataType {
        Boolean = 0,
        Numeric = 1,
        Integer = 2,
        Volume = 3,
        ID = 4,
        Percent = 5,
        Text = 6,
        Enum = 7,
        DateTime = 8,
        DateOnly = 9,
        Time = 10,
        DOM = 11,
        IndicatorArrow = 12,
        IdsDate = 13,
    }
    enum FieldSource {
        Unknown = 0,
        Instrument = 1,
        Snapshot = 2,
        Historical = 3,
        Brokerstats = 4,
        IntradayTrades = 5,
        Position = 6,
        Order = 7,
        OrderAlgo = 8,
        Trade = 9,
        Fund = 10,
        Portfolio = 11,
        Market = 12,
        CalculatedHistory = 13,
    }
    enum FieldType {
        Normal = 0,
        Computed = 1,
        Custom = 2,
        Converted = 3,
    }
    /**
     * Returns a value used to request this column from the cache.
     */
    class FieldsHelper {
        static kCustomType: string;
        static kComputedType: string;
        static kConvertedType: string;
        static getFieldInfoFromSpec(spec: any, languageHandler?: Language): {
            heading: string;
            fieldName: string;
            headingHover: string;
        };
        static createFieldFromSpec(spec: any, languageHandler?: Language, fieldSources?: FieldSource[]): Field;
        static createFieldsFromNames(fieldNames: string[], fieldSources?: FieldSource[]): Field[];
        static isValidSpec(spec: any): boolean;
        static isValidFooter(spec: any): boolean;
        static getSubscriptionFieldsArray(fields: Field[]): string[];
        private static fieldFromName(fieldName);
        private static fieldFromSource(fieldName, fieldSource);
        private static fieldFromNameAndType(fieldName, fieldSource, fieldType);
    }
    abstract class Field {
        static kFieldsLanguageKey: string;
        name: string;
        type: FieldType;
        source: FieldSource;
        heading: string;
        translate: (item: any, itemFieldValue: any) => string;
        decimals: number;
        currency: string;
        sourceField: Field;
        content: ((item: any, instrument?: Instrument, element?: HTMLElement) => string) | string;
        className: string;
        computeFields: Field[];
        hover: Field;
        headingHover: string;
        hidden: boolean;
        compute: (item: any, args: any[], instrument: any) => any;
        sortable: boolean;
        shorten: boolean;
        footer: any;
        onClick: (lineId: any, value: any, extras: {
            target?: HTMLElement;
            instrument?: Instrument;
        }) => void;
        showExtra: boolean;
        toggleExpanded: boolean;
        sortUsingOriginalValue: boolean;
        flag: boolean;
        footerStrategy: ComputationStrategy;
        weight: string;
        url: string;
        protected subscribeFieldName: string;
        dataType: DataType;
        protected lowerCaseName: string;
        genericClass: string;
        specificClass: string;
        protected cacheBinding: string[];
        protected supportsBackgroundFlash: boolean;
        blinkType: BlinkType;
        blinkDuration: BlinkDuration;
        highlightChange: boolean;
        sortDirection: Observable;
        protected languageHandler: Language;
        visible: OverridableObservable;
        totalReference: FieldReference;
        fieldClassName: string;
        protected tag: IDS.TagOrComputed;
        constructor(name: string, tag: IDS.TagOrComputed, dataType?: DataType, shorten?: boolean, supportsBackgroundFlash?: boolean);
        getFieldSpec(): string[];
        getFieldTag(): IDS.TagOrComputed;
        getSubscriptionFieldNames(): string[];
        getDependendFields(): Field[];
        getFieldClassName(): string;
        isValid(): boolean;
        applySpecAndDefaults(spec: any, languageHandler?: Language): void;
        protected applyDefaults(spec: any, languageHandler?: Language): void;
        protected applySpec(spec: any): void;
        protected isValidSpecProp(spec: any, propName: string, typeCheck: (prop: any) => boolean): boolean;
        protected specToProp(spec: any, propName: string, typeCheck: (prop: any) => boolean, createField?: boolean): void;
        forceVisible(): void;
        forceHidden(): void;
        isSortable(): boolean;
        equals(other: Field): boolean;
        /**
         * Extracts a value represented by this column from an object (typically a response-message)
         */
        getValueFromObject(obj: Object): any;
        /**
         * Returns true if obj contains a value identified by this Column-object.
         * @param obj
         */
        objectHasValue(obj: Object): boolean;
        /**
         * Creates the proper binding based on the columns dataType, or a TranslatedBinding if the column contains
         * a translate-function.
         */
        createValueBinding(rowId: any, element: HTMLElement, field: string, decimals: number, allowZero?: boolean): Binding;
        createValueBinding(rowId: any, element: HTMLElement, field: string, decimals: Observable, allowZero?: boolean): Binding;
        /**
         * Returns a compare-function suitable for comparing two values of the type described
         * by this column.
         * @param sortOrder
         * @returns {function(any, any): number}
         * @private
         */
        getCompareFunction(sortOrder: SortOrder): (itemA: any, itemB: any) => number;
    }
    class FieldsListBase {
        static getField(fieldName: any): Field;
    }
    class InstrumentField extends Field {
        protected subscribeFieldName: string;
        source: FieldSource;
        getFieldSpec(): string[];
    }
    class InstrumentFields extends FieldsListBase {
        static BOND_FACE_VALUE(): InstrumentField;
        static TICKER(): InstrumentField;
        static FULL_NAME(): InstrumentField;
        static ISIN(): InstrumentField;
        static CURRENCY(): InstrumentField;
        static MARKET(): InstrumentField;
        static INSTRUMENT_TYPE(): InstrumentField;
        static INSTRUMENT_SUBTYPE(): InstrumentField;
        static STRIKE_PRICE(): InstrumentField;
        static STRIKE(): InstrumentField;
        static EXPIRY_DATE(): InstrumentField;
        static PAY_DAY(): InstrumentField;
        static START_PRICE(): InstrumentField;
        static EXPIRY(): InstrumentField;
        static OPEN_INTEREST(): InstrumentField;
        static MIN_ICEBERG_SIZE(): InstrumentField;
        static COMPANY_URL(): InstrumentField;
        static ISSUER(): InstrumentField;
        static ISSUER_FULL_NAME(): InstrumentField;
        static SORT_NU(): InstrumentField;
        static EUSIPA_CODE(): InstrumentField;
        static IS_TRADEABLE(): InstrumentField;
        static CONTRIBUTED_ID(): InstrumentField;
        static CONTRIBUTED_FUND_MANAGER(): InstrumentField;
        static CONTRIBUTED_SUSTAINABILITY(): InstrumentField;
        static CONTRIBUTED_BUY_BUTTON(): InstrumentField;
        static CONTRIBUTED_FEE(): InstrumentField;
        static CONTRIBUTED_RISK(): InstrumentField;
        static CONTRIBUTED_RECOMMENDATION(): InstrumentField;
        static CONTRIBUTED_MAIN_SUPPLY(): InstrumentField;
        static CONTRIBUTED_FUND_TEXT(): InstrumentField;
        static CONTRIBUTED_STANDARD_TEXTS(): InstrumentField;
        static CONTRIBUTED_CURRENCY(): InstrumentField;
        static CONTRIBUTED_RECOMMENDATION_TEXTS(): InstrumentField;
        static CONTRIBUTED_PRODUCTS(): InstrumentField;
        static CONTRIBUTED_LINKS(): InstrumentField;
        static CONTRIBUTED_METADATA_00(): InstrumentField;
        static CONTRIBUTED_METADATA_01(): InstrumentField;
        static CONTRIBUTED_METADATA_02(): InstrumentField;
        static CONTRIBUTED_METADATA_03(): InstrumentField;
        static CONTRIBUTED_METADATA_04(): InstrumentField;
        static CONTRIBUTED_METADATA_05(): InstrumentField;
        static CONTRIBUTED_METADATA_06(): InstrumentField;
        static CONTRIBUTED_METADATA_07(): InstrumentField;
        static CONTRIBUTED_METADATA_08(): InstrumentField;
        static CONTRIBUTED_METADATA_09(): InstrumentField;
        static CONTRIBUTED_METADATA_10(): InstrumentField;
        static CONTRIBUTED_METADATA_11(): InstrumentField;
        static CONTRIBUTED_METADATA_12(): InstrumentField;
        static CONTRIBUTED_METADATA_13(): InstrumentField;
        static CONTRIBUTED_METADATA_14(): InstrumentField;
        static CONTRIBUTED_METADATA_15(): InstrumentField;
        static CONTRIBUTED_METADATA_16(): InstrumentField;
        static CONTRIBUTED_METADATA_17(): InstrumentField;
        static CONTRIBUTED_METADATA_18(): InstrumentField;
        static CONTRIBUTED_METADATA_19(): InstrumentField;
        static CONTRIBUTED_METADATA_20(): InstrumentField;
        static CONTRIBUTED_METADATA_21(): InstrumentField;
        static CONTRIBUTED_METADATA_22(): InstrumentField;
        static CONTRIBUTED_METADATA_23(): InstrumentField;
        static CONTRIBUTED_METADATA_24(): InstrumentField;
        static CONTRIBUTED_METADATA_25(): InstrumentField;
        static CONTRIBUTED_METADATA_26(): InstrumentField;
        static CONTRIBUTED_METADATA_27(): InstrumentField;
        static CONTRIBUTED_METADATA_28(): InstrumentField;
        static CONTRIBUTED_METADATA_29(): InstrumentField;
        static CONTRIBUTED_METADATA_30(): InstrumentField;
        static CONTRIBUTED_METADATA_31(): InstrumentField;
        static ONE_D_PERF(): InstrumentField;
        static ONE_W_PERF(): InstrumentField;
        static ONE_M_PERF(): InstrumentField;
        static THREE_M_PERF(): InstrumentField;
        static SIX_M_PERF(): InstrumentField;
        static ONE_Y_PERF(): InstrumentField;
        static TWO_Y_PERF(): InstrumentField;
        static THREE_Y_PERF(): InstrumentField;
        static FIVE_Y_PERF(): InstrumentField;
        static TEN_Y_PERF(): InstrumentField;
        static YTD_PERF(): InstrumentField;
        static PERF_SINCE_INCEPTION(): InstrumentField;
        static DATE(): InstrumentField;
        static BOND_MINIMUMDENOMINATION(): InstrumentField;
    }
    class CalculatedHistoryField extends Field {
        source: FieldSource;
        constructor(name: string, tag: IDS.RealtimeCalculatedHistoryTags, dataType?: DataType, shorten?: boolean, supportsBackgroundFlash?: boolean);
    }
    class CalculatedHistoryFields extends FieldsListBase {
        static ATR30_HISTORICAL(): CalculatedHistoryField;
        static ADV(): CalculatedHistoryField;
        static ATR30(): CalculatedHistoryField;
    }
    class SnapshotField extends Field {
        source: FieldSource;
        constructor(name: string, tag: IDS.TagOrComputed, dataType?: DataType, shorten?: boolean, supportsBackgroundFlash?: boolean);
    }
    class SnapshotFields extends FieldsListBase {
        static ACC_VOLUME(): SnapshotField;
        static TURNOVER(): SnapshotField;
        static ONEXCH_VOLUME(): SnapshotField;
        static ONEXCH_TURNOVER(): SnapshotField;
        static BID(): SnapshotField;
        static ASK(): SnapshotField;
        static BID_SIZE(): SnapshotField;
        static ASK_SIZE(): SnapshotField;
        static NUM_BIDS(): SnapshotField;
        static NUM_ASKS(): SnapshotField;
        static ORDERBOOK(): SnapshotField;
        static INDIC_PRICE(): SnapshotField;
        static INDIC_VOLUME(): SnapshotField;
        static TRADING_STATUS(): SnapshotField;
        static VWAP(): SnapshotField;
        static AVG_VOLUME(): SnapshotField;
        static AVG_VALUE(): SnapshotField;
        static OPEN(): SnapshotField;
        static HIGH(): SnapshotField;
        static LOW(): SnapshotField;
        static LAST(): SnapshotField;
        static NET_ASSET_VALUE(): SnapshotField;
        static LAST_VALID(): SnapshotField;
        static PREVIOUS_CLOSE(): SnapshotField;
        static TIME(): SnapshotField;
        static LAST_VALID_DATE(): SnapshotField;
        static CHANGE(): SnapshotField;
        static PCT_CHANGE(): SnapshotField;
        static EPS(): SnapshotField;
        static NUM_SHARES(): SnapshotField;
        static CONTRACT_SIZE(): SnapshotField;
        static MULTIPLIER(): SnapshotField;
        static MARGIN_RATE(): SnapshotField;
        static IS_SHORTABLE(): SnapshotField;
        static SEGMENT(): SnapshotField;
        static SECONDARY_SEGMENT(): SnapshotField;
        static COUNTRY_OF_INCORPORATION(): SnapshotField;
        static START_PRICE(): SnapshotField;
        static SEGMENT_DESCRIPTION(): SnapshotFields;
        static SECTOR(): SnapshotFields;
        static COUNTRY(): SnapshotField;
        static FEED(): SnapshotField;
        static SERVICE(): SnapshotField;
        static PHYSICAL_UNIT(): SnapshotField;
        static INDIC_TRADE(): SnapshotField;
        static INDIC_INCVOL(): SnapshotField;
        static INDIC_HIGH(): SnapshotField;
        static INDIC_LOW(): SnapshotField;
        static NMS(): SnapshotField;
        static INDIC_OPEN(): SnapshotField;
        static INDIC_OPEN_VOL(): SnapshotField;
        static ESMA_ADV(): SnapshotField;
        static INFRONT_SECTOR(): SnapshotField;
        static MATURITY_DATE(): SnapshotField;
        static ISSUE_DATE(): SnapshotField;
        static START_OF_INDEX_PERIOD(): SnapshotField;
        static END_OF_INDEX_PERIOD(): SnapshotField;
        static PARTICIPATION_LEVEL(): SnapshotField;
        static BREAK_EVEN(): SnapshotField;
        static ASIAN_AVERAGE(): SnapshotField;
        static DELTA(): SnapshotField;
        static ELAST(): SnapshotField;
        static NAV(): SnapshotField;
        static BOND_FACE_VALUE(): SnapshotField;
        static BOND_MINIMUMDENOMINATION(): SnapshotField;
        static UNDER_TICKER(): SnapshotField;
        static UNDER_FEED(): SnapshotField;
        static UNDER_PRICE(): SnapshotField;
        static MARKET(): SnapshotField;
        static LEVERAGE(): SnapshotField;
        static THEORETICAL(): SnapshotField;
        static NEXT_COUPON_DATE(): SnapshotField;
        static COUPON_RATE(): SnapshotField;
        static COUPONS_PER_YEAR(): SnapshotField;
        static BID_YIELD(): SnapshotField;
        static ASK_YIELD(): SnapshotField;
        static RECOMMENDATION_TYPE(): SnapshotField;
        static ESMA_TYPE(): SnapshotField;
        static BULLBEAR_COMPARISON(): SnapshotField;
        static BULLBEAR_GEARING(): SnapshotField;
        static REALTIME_MANAGEMENT_FEE(): SnapshotField;
        static LEVERAGE_TURBOS(): SnapshotField;
    }
    class HistoricalField extends Field {
        protected subscribeFieldName: string;
        source: FieldSource;
        getFieldSpec(): string[];
        constructor(name: string, tag: IDS.TagOrComputed, dataType?: DataType, highlightChange?: boolean);
    }
    class HistoricalFields extends FieldsListBase {
        static YTD_CLOSE(): HistoricalField;
        static ONE_W_CLOSE(): HistoricalField;
        static ONE_M_CLOSE(): HistoricalField;
        static THREE_M_CLOSE(): HistoricalField;
        static SIX_M_CLOSE(): HistoricalField;
        static ONE_Y_CLOSE(): HistoricalField;
        static TWO_Y_CLOSE(): HistoricalField;
        static THREE_Y_CLOSE(): HistoricalField;
        static FIVE_Y_CLOSE(): HistoricalField;
        static YTD_CHANGE(): HistoricalField;
        static ONE_W_CHANGE(): HistoricalField;
        static ONE_M_CHANGE(): HistoricalField;
        static THREE_M_CHANGE(): HistoricalField;
        static SIX_M_CHANGE(): HistoricalField;
        static ONE_Y_CHANGE(): HistoricalField;
        static TWO_Y_CHANGE(): HistoricalField;
        static THREE_Y_CHANGE(): HistoricalField;
        static FIVE_Y_CHANGE(): HistoricalField;
        static YTD_PCT_CHANGE(): HistoricalField;
        static ONE_W_PCT_CHANGE(): HistoricalField;
        static ONE_M_PCT_CHANGE(): HistoricalField;
        static THREE_M_PCT_CHANGE(): HistoricalField;
        static SIX_M_PCT_CHANGE(): HistoricalField;
        static ONE_Y_PCT_CHANGE(): HistoricalField;
        static TWO_Y_PCT_CHANGE(): HistoricalField;
        static THREE_Y_PCT_CHANGE(): HistoricalField;
        static FIVE_Y_PCT_CHANGE(): HistoricalField;
        static YTD_HIGH(): HistoricalField;
        static ONE_W_HIGH(): HistoricalField;
        static ONE_M_HIGH(): HistoricalField;
        static THREE_M_HIGH(): HistoricalField;
        static SIX_M_HIGH(): HistoricalField;
        static ONE_Y_HIGH(): HistoricalField;
        static TWO_Y_HIGH(): HistoricalField;
        static THREE_Y_HIGH(): HistoricalField;
        static FIVE_Y_HIGH(): HistoricalField;
        static YTD_LOW(): HistoricalField;
        static ONE_W_LOW(): HistoricalField;
        static ONE_M_LOW(): HistoricalField;
        static THREE_M_LOW(): HistoricalField;
        static SIX_M_LOW(): HistoricalField;
        static ONE_Y_LOW(): HistoricalField;
        static TWO_Y_LOW(): HistoricalField;
        static THREE_Y_LOW(): HistoricalField;
        static FIVE_Y_LOW(): HistoricalField;
        static LAST_TRADE(): HistoricalField;
        static LAST_TRADE_DATE(): HistoricalField;
        static ONE_D_PERF_SEK(): HistoricalField;
        static ONE_W_PERF_SEK(): HistoricalField;
        static ONE_M_PERF_SEK(): HistoricalField;
        static THREE_M_PERF_SEK(): HistoricalField;
        static SIX_M_PERF_SEK(): HistoricalField;
        static ONE_Y_PERF_SEK(): HistoricalField;
        static TWO_Y_PERF_SEK(): HistoricalField;
        static THREE_Y_PERF_SEK(): HistoricalField;
        static FIVE_Y_PERF_SEK(): HistoricalField;
        static TEN_Y_PERF_SEK(): HistoricalField;
        static YTD_PERF_SEK(): HistoricalField;
        static PERF_SINCE_INCEPTION_SEK(): HistoricalField;
        static ONE_W_LAST_DIV(): HistoricalField;
        static ONE_M_LAST_DIV(): HistoricalField;
        static THREE_M_LAST_DIV(): HistoricalField;
        static SIX_M_LAST_DIV(): HistoricalField;
        static ONE_Y_LAST_DIV(): HistoricalField;
        static YTD_LAST_DIV(): HistoricalField;
        static VOL_1M(): HistoricalField;
        static DAYCOUNT_1M(): HistoricalField;
    }
    class BrokerstatsField extends Field {
        source: FieldSource;
        constructor(name: string, dataType?: DataType, shorten?: boolean);
    }
    class BrokerstatsFields extends FieldsListBase {
        static NAME(): BrokerstatsField;
        static FULLNAME(): BrokerstatsField;
        static TIME(): BrokerstatsField;
        static BUYS(): BrokerstatsField;
        static SELLS(): BrokerstatsField;
        static INT_TRADES(): BrokerstatsField;
        static BUY_VOLUME(): BrokerstatsField;
        static SELL_VOLUME(): BrokerstatsField;
        static INT_VOLUME(): BrokerstatsField;
        static TOTAL_VOLUME(): BrokerstatsField;
        static BUY_VALUE(): BrokerstatsField;
        static SELL_VALUE(): BrokerstatsField;
        static INT_VALUE(): BrokerstatsField;
        static AVG_BUY(): BrokerstatsField;
        static AVG_SELL(): BrokerstatsField;
        static NET_BUY_VALUE(): BrokerstatsField;
        static HIT_VALUE(): BrokerstatsField;
        static HIT_VALUE_PCT(): BrokerstatsField;
        static TAKE_VALUE(): BrokerstatsField;
        static TAKE_VALUE_PCT(): BrokerstatsField;
        static TOTAL_VALUE(): BrokerstatsField;
        static TOTAL_VALUE_PCT(): BrokerstatsField;
        static TRADES(): BrokerstatsField;
        static SYM_TURN(): BrokerstatsField;
        static SYM_TURN_PCT(): BrokerstatsField;
    }
    class MarketListField extends Field {
        source: FieldSource;
        constructor(name: string, dataType?: DataType, shorten?: boolean);
    }
    class MarketListFields extends FieldsListBase {
        static FLAG(): MarketListField;
        static FEED(): MarketListField;
        static SERVICE(): MarketListField;
    }
    class IntradayTradesField extends Field {
        subscribeFieldName: string;
        source: FieldSource;
        constructor(name: string, dataType?: DataType, shorten?: boolean);
    }
    class IntradayTradesFields extends FieldsListBase {
        static OPEN(): IntradayTradesField;
        static LAST(): IntradayTradesField;
        static HIGH(): IntradayTradesField;
        static LOW(): IntradayTradesField;
        static BID(): IntradayTradesField;
        static ASK(): IntradayTradesField;
        static VOLUME(): IntradayTradesField;
        static TURNOVER(): IntradayTradesField;
        static BUYER(): IntradayTradesField;
        static SELLER(): IntradayTradesField;
        static BUYER_FULL(): IntradayTradesField;
        static SELLER_FULL(): IntradayTradesField;
        static MARKET(): IntradayTradesField;
        static TYPE(): IntradayTradesField;
        static SEQ_ID(): IntradayTradesField;
        static TIME(): IntradayTradesField;
    }
    class PositionField extends Field {
        source: FieldSource;
        constructor(name: string, dataType?: DataType, shorten?: boolean);
    }
    class PositionFields extends FieldsListBase {
        static ERROR_CODE(): PositionField;
        static ERROR_MESSAGE(): PositionField;
        static PORTFOLIO(): PositionField;
        static INVESTED(): PositionField;
        static VOLUME(): PositionField;
        static AMOUNT(): PositionField;
        static MULTIPLIER(): PositionField;
        static COLLATERAL(): PositionField;
        static LOAN_TO_VALUE_RATIO(): PositionField;
        static PROFIT(): PositionField;
        static BASE_CURRENCY(): PositionField;
        static BASE_INVESTED(): PositionField;
        static YTD_BASE_INVESTED(): PositionField;
        static BASE_VALUE(): PositionField;
        static AVG_PRICE(): PositionField;
        static S_AVG_PRICE(): PositionField;
        static MARKET_PRICE(): PositionField;
        static MARKET_VALUE(): PositionField;
        static BASE_MARKET_VALUE(): PositionField;
        static PL_TODAY(): PositionField;
        static BASE_PL_TODAY(): PositionField;
        static PL_TODAY_PCT(): PositionField;
        static RESULT(): PositionField;
        static RESULT_PCT(): PositionField;
        static BASE_RESULT(): PositionField;
        static BASE_RESULT_PCT(): PositionField;
        static BASE_CURRENCY_RESULT(): PositionField;
        static S_POS_CURRENCY(): PositionField;
        static TOTAL_BASE_PL_TODAY_PCT(): PositionField;
        static OWN_CAPITAL_CHANGE_PERCENT(): PositionField;
        static BASE_COLLATERAL(): PositionField;
    }
    class PortfolioField extends Field {
        source: FieldSource;
        constructor(name: string, dataType?: DataType, shorten?: boolean);
    }
    class PortfolioFields extends FieldsListBase {
        static VALUE(): PortfolioField;
        static TRADING_POWER(): PortfolioField;
        static BASE_TRADING_POWER(): PortfolioField;
    }
    class OrderFields extends FieldsListBase {
        static ORDER_ID(): Field;
        static ALGO_ID(): Field;
        static FAIL_CODE(): Field;
        static ERROR_MESSAGE(): Field;
        static PORTFOLIO(): Field;
        static CUSTOMER_ID(): Field;
        static BUY_OR_SELL(): Field;
        static PRICE(): Field;
        static AVG_PRICE(): Field;
        static VOLUME(): Field;
        static OPEN_VOLUME(): Field;
        static ORDER_TYPE(): Field;
        static CREATED(): Field;
        static CHANGED(): Field;
        static VALID_UNTIL(): Field;
        static ORDER_STATUS(): Field;
        static VOLUME_FILLED(): Field;
        static COMMENT(): Field;
        static ACCUMULATED_TRADED(): Field;
        static TRANSACTION_ID(): Field;
        static EXCHANGE_ORDER_ID(): Field;
        static READ_ONLY(): Field;
        static CUSTOM_DATE_FIELDS(): Field;
        static TRIGGER_PRICE(): Field;
        static CLIENT_SPOT(): Field;
        static LOAN_TRANS_ACC(): Field;
        static FORWARD_DATE(): Field;
        static DISC_PREMIUM(): Field;
        static FREETXT(): Field;
        static INT_DEPOT_NUM(): Field;
        static FORWARD_PRICE(): Field;
    }
    class OrderAlgoField extends Field {
        source: FieldSource;
        constructor(name: string, dataType?: DataType, shorten?: boolean);
        getFieldSpec(): string[];
    }
    class OrderAlgoFields extends FieldsListBase {
        static TRIGGERCOND(): OrderAlgoField;
        static TRIGGERPX(): OrderAlgoField;
        static ORDERLIMITPX(): OrderAlgoField;
        static TRIGGERVALID(): OrderAlgoField;
        static TRAILLIMIT(): OrderAlgoField;
        static PCTFROMLAST(): OrderAlgoField;
        static TICKSFROMLAST(): OrderAlgoField;
        static BESTPX(): OrderAlgoField;
        static ENTRYPX(): OrderAlgoField;
        static FORETGTPX(): OrderAlgoField;
        static TRIGGERATPX(): OrderAlgoField;
    }
    class TradeField extends Field {
        source: FieldSource;
        constructor(name: string, dataType?: DataType, shorten?: boolean);
    }
    class TradeFields extends FieldsListBase {
        static TRADE_ID(): Field;
        static ERROR_CODE(): Field;
        static ERROR_MESSAGE(): Field;
        static ORDER_ID(): Field;
        static PORTFOLIO(): Field;
        static CUSTOMER_ID(): Field;
        static BUY_OR_SELL(): Field;
        static PRICE(): Field;
        static VOLUME(): Field;
        static TRADE_TIME(): Field;
        static FEE(): Field;
        static FOREX_RATE(): Field;
        static INVESTED(): Field;
        static EXCHANGE_ORDER_ID(): Field;
        static EXCHANGE_TRADE_ID(): Field;
        static EXCHANGE_TRADE_ID2(): Field;
        static DELETED_TRADE(): Field;
        static VERIFIED_TRADE(): Field;
        static EXEC_MARKET(): Field;
    }
    class FundRefField extends Field {
        source: FieldSource;
        subscribeFieldName: string;
    }
    class FundDetailsField extends Field {
        source: FieldSource;
        subscribeFieldName: string;
        constructor(name: string, tag?: IDS.TagOrComputed, dataType?: DataType, shorten?: boolean);
        getFieldSpec(): string[];
    }
    class FundFields extends FieldsListBase {
        static FUND_TYPE(): FundRefField;
        static FUND_TOTAL_EXPENSE(): FundRefField;
        static FUND_TOTAL_ASSETS(): FundRefField;
        static FUND_SHARPE_RATIO(): FundRefField;
        static FUND_STD_DEV_1Y(): FundRefField;
        static FUND_PROSPECTIVE_DIVIDEND_YIELD(): FundRefField;
        static FUND_PROSPECTIVE_BOOK_VALUE_YIELD(): FundRefField;
        static RISK_LEVEL(): FundDetailsField;
        static STAR_RATING(): FundDetailsField;
        static STAR_RATING_3Y(): FundDetailsField;
        static FUND_ONGOING_CHARGE(): FundDetailsField;
        static FUND_ANNUAL_REPORT_DATE(): FundDetailsField;
        static FUND_SUSTAINABILITY_RATING(): FundDetailsField;
        static FUND_SUSTAINABILITY_RATING_DATE(): FundDetailsField;
        static FUND_MANAGEMENT_FEE(): FundDetailsField;
        static FUND_ACTUAL_MANAGEMENT_FEE(): FundDetailsField;
        static ANALYST_RATING(): FundDetailsField;
        static FUND_NAME_SWEDISH(): FundDetailsField;
        static FUND_REFERENCE_FEED(): FundDetailsField;
        static FUND_REFERENCE_SYMBOL(): FundDetailsField;
        static FUND_STYLEBOX(): FundDetailsField;
        static MIN_INIT_INVESTMENT(): FundDetailsField;
        static START_DATE(): FundDetailsField;
        static INVESTMENT_MANDATE(): FundDetailsField;
        static PROSPECTIVE_BOOK_VALUE_YIELD(): FundDetailsField;
        static PROSPECTIVE_EARNINGS_YIELD(): FundDetailsField;
        static HOMEPAGE(): FundDetailsField;
        static FUND_MANAGER(): FundDetailsField;
        static FOR_SALE_IN(): FundDetailsField;
        static FOR_SALE_IN_SHORT(): FundDetailsField;
        static FOR_SALE_IN_COUNT(): FundDetailsField;
        static TRACKING_ERROR(): FundDetailsField;
        static ACTIVE_SHARE(): FundDetailsField;
        private static fundManagerTranslate(rowId, val);
        private static forSaleInTranslate(rowId, val);
        private static forSaleInShortTranslate(rowId, val);
        private static forSaleInCountTranslate(rowId, val);
    }
    class ComputedField extends Field {
        type: FieldType;
        computeFields: Field[];
        constructor(name: string, dataType?: DataType, source?: FieldSource, shorten?: boolean, supportsBackgroundFlash?: boolean);
        hideComputedFields(): void;
        createComputedFieldInCache(cache: BindingCache, cacheKeyObject: any, cacheKey: string, cacheKeyConverter?: (originalKey: string, column: Field) => string): void;
        static isComputedField(field: Field): field is ComputedField;
        protected applySpec(spec: any): void;
        protected applyDefaults(spec: any, languageHandler?: Language): void;
    }
    class ComputedFields extends FieldsListBase {
        private static orderTypesWithoutPrice;
        private static orderSupportsPrice(orderType);
        static OFF_HIGH(): ComputedField;
        static OFF_LOW(): ComputedField;
        static GAP_PCT(): ComputedField;
        static OPEN_LAST_CHANGE_PCT(): ComputedField;
        static NET_VOLUME(): ComputedField;
        static VOLUME_ADV_PCT(): ComputedField;
        static S_DATETIME(): ComputedField;
        static PCT_SPREAD(): ComputedField;
        static S_MARKET_PRICE(): ComputedField;
        static S_ORDER_VALUE(): ComputedField;
        static S_TRADED_VALUE(): ComputedField;
        private static centCurrencies;
        private static ComputeShareCapital(value, numShares, currency);
        static Y_SHARE_CAPITAL(): ComputedField;
        static SHARE_CAPITAL(): ComputedField;
        static S_MIXED_DEVIATION(): ComputedField;
        static S_POS_LAST(): ComputedField;
        static S_COLLATERAL(): ComputedField;
        static S_VALID_UNTIL(): ComputedField;
        static S_TRIGGER_PRICE(): ComputedField;
        static RANGE(): ComputedField;
        /**
         * *********   CUSTOM FIELDS very sketchy
         */
        static B_CLIENT_SPOT(): ComputedField;
        static S_FORWARD_PRICE(): ComputedField;
        static B_LOAN_TRANS_ACC(): ComputedField;
        static B_FORWARD_DATE(): ComputedField;
        static B_DISC_PREMIUM(): ComputedField;
        private static calcPct(item, args);
    }
    class CustomField extends Field {
        type: FieldType;
        protected applySpec(spec: any): void;
    }
    class CustomFields {
        items: CustomFieldItem[];
        static createArrowSpec(tagToReflect: IDS.RealtimeTags): CustomField;
        static ARROW_BID(): CustomField;
        static ARROW_ASK(): CustomField;
        static ARROW_LAST(): CustomField;
    }
    class ConvertedField extends Field {
        type: FieldType;
        protected applySpec(spec: any): void;
    }
}
/**
 * Created by hage on 25.08.2014.
 */
declare module Infront {
    enum FinancialCalendarLayout {
        COMPACT = 0,
        EXPANDED = 1,
    }
    class FinancialCalendarWidgetOptions extends WidgetOptions {
        instrument: Instrument;
        instruments: Instrument[];
        countryCodes: string[];
        feeds: number[];
        enableRegionSelector: boolean;
        startDate: Date;
        endDate: Date;
        startEmpty: boolean;
        layout: FinancialCalendarLayout;
        pageItems: number;
        paging: boolean;
        showCategory: boolean;
        showTicker: boolean;
        showTickerInHeader: boolean;
        defaultSortOrder: SortOrder;
    }
    class FinancialCalendarWidget extends WidgetBase implements InfrontWidget, InterLibraryLink.Target {
        protected options: FinancialCalendarWidgetOptions;
        private items;
        private visibleItems;
        private selectedRegions;
        private regions;
        private showCountryMenu;
        private pager;
        private absolutePosWrapper;
        private calendarRequestIdCount;
        private regionsDropdown;
        ticker: Observable<string>;
        constructor(element: HTMLElement, infrontUI: UI, options: FinancialCalendarWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
        private loadData();
        private windowClick();
        private countryDropdownLabelClicked();
        private countryClicked(item);
        private countryChanged(item);
        private pageChange(newPage, oldPage);
        modify(options: WidgetOptions): void;
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
    }
}
/**
 * Created by hage on 23.01.14.
 */
declare module Infront {
    class UnbindingManager extends Data {
        private static kUnbindKey;
        constructor();
        registerUnbind(element: HTMLElement, unbind: () => void): void;
        registerUnbinds(element: HTMLElement, unbinds: {
            (): void;
        }[]): void;
        unbind(element: HTMLElement, recursive?: boolean): void;
    }
}
/**
 * AUTO-GENERATED CODE
 * Do not edit, your code will be overwritten!
 *
 * Widget-Parser version 1.0.2
 * code generated from: widgetFactory/dom-factory.html
 * Generated at: 2020-6-8 16:28:36
 */
declare module Infront {
    class WidgetDOMFactory {
        private static unbindingManager;
        static create_WFocus_DOM(containerElement: HTMLElement, lastTicks: ObservableArray, decimals: Observable, tradesToday: Observable, enableLink: boolean, linkClick: (event: Event) => void, isDelayed: boolean, showSearchWidget: boolean, searchButtonClick: (event: Event) => void, cache: BindingCache, cacheKey: string, strings: Language): {
            wFocus: HTMLElement;
            searchContainer: HTMLElement;
        };
        static create_WFocusMini_DOM(containerElement: HTMLElement, decimals: Observable, tradesToday: Observable, isDelayed: boolean, showSearchWidget: boolean, searchButtonClick: (event: Event) => void, cache: BindingCache, cacheKey: string, strings: Language): {
            wFocus: HTMLElement;
            searchContainer: HTMLElement;
        };
        static create_WComplexChart_DOM(containerElement: HTMLElement, showToolbar: Observable): {
            chartContainer: HTMLElement;
            topbarWrapper: HTMLElement;
        };
        static create_CChartMenu_DOM(containerElement: HTMLElement, hasCustomSearchButton: Boolean, hasSearchField: Observable, hasExpandButton: Observable, customButtons: ObservableArray, expandButtonClicked: (event: Event) => void, expandButtonKeyUp: (event: Event) => void, customSearchClicked: (event: Event) => void, displayValue: Observable): {
            searchContainer: HTMLElement;
            expandButtonContainer: HTMLElement;
            dropDownContainer: HTMLElement;
            customSearchContainer: HTMLElement;
        };
        static create_CChartDropDown_DOM(containerElement: HTMLElement, hasMenu: Observable, showMenu: Observable, items: ObservableArray, displayValue: Observable, dropdownClicked: (event: Event) => void, itemSelected: (item) => void, dropdownClass: string, autoItem: Observable, isAuto: Observable): {
            dropdownContainer: HTMLElement;
            dropdownElement: HTMLElement;
        };
        static create_WValuePair_DOM(containerElement: HTMLElement, leftLabel: string, rightLabel: string): {
            leftWidget: HTMLElement;
            rightWidget: HTMLElement;
        };
        static create_WSimpleChartOverview_DOM(containerElement: HTMLElement, title: string, decimals: Observable, chartPeriod: string, cache: BindingCache, cacheKey: string): HTMLElement;
        static create_WIndexOverview_DOM(containerElement: HTMLElement, decimals: Observable, historyHeadings: string[], historicValues: string[], primaryValueIndex: number, up: Observable, unchanged: Observable, down: Observable, upPct: Observable, unchangedPct: Observable, downPct: Observable, historicColor: Boolean, enableLink: Boolean, linkClick: (event: Event) => void, cache: BindingCache, cacheKey: string, strings: Language): void;
        static create_WIndexOverviewMini_DOM(containerElement: HTMLElement, decimals: Observable, showFullName: boolean, cache: BindingCache, cacheKey: string): void;
        static create_WIndexOverviewSimple_DOM(containerElement: HTMLElement, decimals: Observable, up: Observable, unchanged: Observable, down: Observable, upPct: Observable, unchangedPct: Observable, downPct: Observable, cache: BindingCache, cacheKey: string, strings: Language): void;
        static create_WHistoricalOverview_DOM(containerElement: HTMLElement, title: string, fields: Object[], computedLowBar: Observable, computedLastIndicator: Observable, low: Observable, high: Observable, lowLabel: Observable, highLabel: Observable, decimals: Observable, onPeriodClick: (event: Event) => void, currentBarPeriod: Observable, cache: BindingCache, cacheKey: string, strings: Language): void;
        static create_WNewsListFlex_DOM(containerElement: HTMLElement, title: string, columns: Object[], navButton: WidgetNavButtonType, navButtonClick: (event: Event) => void, enableQuickfilter: boolean, filterObserver: InputBinding, customFilters: NewsListWidgetFilter[], selectedCustomFilter: Observable, customFilterSelected: (item) => void, items: ObservableArray, paging: boolean, currentPage: Observable, nextEnabled: Observable, prevEnabled: Observable, showUserFilterMenu: Observable, enableUserFilter: boolean, userFilters: ObservableArray, addUserFilterObserver: InputBinding, firstHandler: (event: Event) => void, prevHandler: (event: Event) => void, nextHandler: (event: Event) => void, itemClick: (item) => void, userFilterDropDownClick: (event: Event) => void, userFilterClick: (item) => void, deleteButtonClick: (item) => void, makeHeaderLine: boolean, showSearchWidget: boolean, searchButtonClick: (event: Event) => void, ticker: Observable, strings: Language): {
            root: HTMLElement;
            dropDownElement: HTMLElement;
            sourcesDropDownElement: HTMLElement;
            searchContainer: HTMLElement;
            body: HTMLElement;
        };
        static create_WNewsList_DOM(containerElement: HTMLElement, title: string, columns: Object[], navButton: WidgetNavButtonType, navButtonClick: (event: Event) => void, enableQuickfilter: boolean, filterObserver: InputBinding, customFilters: NewsListWidgetFilter[], selectedCustomFilter: Observable, customFilterSelected: (item) => void, items: ObservableArray, paging: boolean, currentPage: Observable, nextEnabled: Observable, prevEnabled: Observable, showUserFilterMenu: Observable, enableUserFilter: boolean, userFilters: ObservableArray, addUserFilterObserver: InputBinding, firstHandler: (event: Event) => void, prevHandler: (event: Event) => void, nextHandler: (event: Event) => void, itemClick: (item) => void, userFilterDropDownClick: (event: Event) => void, userFilterClick: (item) => void, deleteButtonClick: (item) => void, showSearchWidget: boolean, searchButtonClick: (event: Event) => void, ticker: Observable, strings: Language): {
            root: HTMLElement;
            dropDownElement: HTMLElement;
            sourcesDropDownElement: HTMLElement;
            searchContainer: HTMLElement;
        };
        static create_WNewsShowFlashOnly_DOM(checked: Observable, checkClick: () => void, strings: Language): HTMLElement;
        static create_WNewsReader_DOM(containerElement: HTMLElement, headline: Observable, source: Observable, time: Observable): HTMLElement;
        static create_WAlert_DOM(containerElement: HTMLElement, hideSearchBox: Boolean, title: string, triggerTypeObserver: InputBinding, triggerType: string[], conditionObserver: InputBinding, conditions: string[], commentObserver: InputBinding, valueObserver: InputBinding, enableSearch: boolean, message: Observable, modifyMode: Observable, sendClick: (event: Event) => void, modifyClick: (event: Event) => void, validity: Observable, strings: Language): {
            searchContainer: HTMLElement;
            focusContainer: HTMLElement;
            switchContainer: HTMLElement;
            selectedAlertLabel: HTMLElement;
            selectedAlert: HTMLElement;
        };
        static create_WAlertList_DOM(containerElement: HTMLElement, title: string, columns: Object[], alerts: ObservableArray, enabledColumn: Object, deleteClick: (item) => void, modifyClick: (item) => void, strings: Language): {
            root: HTMLElement;
            tableContents: HTMLElement;
            tableHeadings: HTMLElement;
            tableParent: HTMLElement;
        };
        static create_WAlertListMini_DOM(containerElement: HTMLElement, list: ObservableArray, hasAlerts: Observable, strings: Language): HTMLElement;
        static create_WAlertListMiniRow_DOM(alert: InfrontAlert, columns: any[], expandedAlert: Observable, deleteClick: (item) => void, modifyClick: (item) => void, toggleOptions: (item) => void, isExpanded: Observable, strings: Language): {
            row: HTMLElement;
            switchContainer: HTMLElement;
            flagContainer: HTMLElement;
            editButton: HTMLElement;
            deleteButton: HTMLElement;
            toggleButton: HTMLElement;
        };
        static create_WMyLists_DOM(containerElement: HTMLElement, lists: ObservableArray, isEmpty: Observable, selectedList: Observable, showMenu: Observable, showDeleteList: Observable, showAddList: Observable, showListSelector: Boolean, confirmIndex: Observable, enableAdd: Observable, editMode: Observable, dropDownLabelClick: (event: Event) => void, listClick: (list) => void, addListClick: () => void, editListClick: (index) => void, listDeleteClick: (index) => void, deleteConfirmClick: () => void, deleteCancelClick: (event: Event) => void, addList: (action) => void, addListObserver: InputBinding, isReadOnly: Observable, strings: Language): {
            listContainer: HTMLElement;
            searchContainer: HTMLElement;
            dropdownWrapper: HTMLElement;
            dropdownContainer: HTMLElement;
            dropDownLabel: HTMLElement;
            addListContainer: HTMLElement;
            addListButton: HTMLElement;
            confirmContainer: HTMLElement;
            dropdownElements: HTMLElement;
            notificationsContainer: HTMLElement;
            dropdown: HTMLElement;
            popupWrapper: HTMLElement;
            deleteBtn: HTMLElement;
            addListContainerInput: HTMLElement;
        };
        static create_WChainViewer_DOM(containerElement: HTMLElement, chains: ObservableArray, selectedChain: Observable, showMenu: Observable, hasMultipleChains: Observable, enableSearch: Boolean, dropDownLabelClick: (event: Event) => void, listClick: (list) => void): {
            container: HTMLElement;
            searchContainer: HTMLElement;
            dropDownContainer: HTMLElement;
        };
        static create_WHistory_DOM(containerElement: HTMLElement, title: string, instrument: Instrument, items: ObservableArray, dividends: ObservableArray, splits: ObservableArray, useRatioSplit: boolean, columns: Object[], sortedColumn: Observable, columnHeaderClick: (index) => void, years: number[], yearObserver: InputBinding, decimals: number, optionButtons: string[], selectedOptionButton: Observable, optionSelected: (index) => void, strings: Language): HTMLElement;
        static create_WFinancialCalendar_DOM(containerElement: HTMLElement, title: string, ticker: Observable, navButton: WidgetNavButtonType, navButtonClick: (event: Event) => void, events: ObservableArray, expandedLayout: boolean, showTicker: boolean, enableRegions: boolean, showCategory: boolean, showSearchWidget: boolean, searchButtonClick: (event: Event) => void, strings: Language): {
            pagerContainer: HTMLElement;
            activityIndicator: HTMLElement;
            countryDropDownElement: HTMLElement;
            searchContainer: HTMLElement;
        };
        static create_WOrderbook_DOM(containerElement: HTMLElement, ticker: Observable, pctChange: Observable, absoluteChange: Observable, layout: OrderbookRowLayout, showOrders: boolean, title: string, enableLink: boolean, showPctChange: boolean, showAbsoluteChange: boolean, showTicker: boolean, showBidAskRatio: boolean, barHeight: string, bidSize: Observable, bidRatio: Observable, askSize: Observable, askRatio: Observable, spread: Observable, decimals: Observable, linkClick: (event: Event) => void, showSearchWidget: boolean, searchButtonClick: (event: Event) => void, strings: Language): {
            bidTBody: HTMLElement;
            askTBody: HTMLElement;
            searchContainer: HTMLElement;
            percentChangeNode: HTMLElement;
            absoluteChangeNode: HTMLElement;
        };
        static create_WOrderbookBidRow_DOM(price: Observable, volume: Observable, numOrders: Observable, barWidth: Observable, barHeight: string, decimals: Observable, priceClick: (event: Event) => void, layout: OrderbookRowLayout, showOrders: boolean): HTMLElement;
        static create_WOrderbookAskRow_DOM(price: Observable, volume: Observable, numOrders: Observable, barWidth: Observable, barHeight: string, decimals: Observable, priceClick: (event: Event) => void, layout: OrderbookRowLayout, showOrders: boolean): HTMLElement;
        static create_WRanking_DOM(containerElement: HTMLElement, title: string, showSnapshotIcon: boolean, navButton: WidgetNavButtonType, navButtonClick: (event: Event) => void, showPeriodSelector: boolean, periods: string[], periodObserver: InputBinding, strings: Language): {
            thead: HTMLElement;
            tbody: HTMLElement;
        };
        static create_WHeatmap_DOM(containerElement: HTMLElement, title: string, strings: Language): {
            heatmapWrapper: HTMLElement;
            dropdown: HTMLElement;
        };
        static create_WBrokerStats_DOM(containerElement: HTMLElement, ticker: Observable, title: Observable, showPeriodSelector: boolean, periods: string[], periodObserver: InputBinding, layout: Infront.ListLayout, brokerstatsAvailableForFeed: boolean, showSearchWidget: boolean, searchButtonClick: (event: Event) => void, strings: Language): {
            thead: HTMLElement;
            tbody: HTMLElement;
            searchContainer: HTMLElement;
            periodSelect: HTMLElement;
            labelPeriodSelect: HTMLElement;
        };
        static create_WIntradayTrades_DOM(containerElement: HTMLElement, title: string, defaultContent: string, navButton: WidgetNavButtonType, navButtonClick: (event: Event) => void, layout: Infront.ListLayout): {
            thead: HTMLElement;
            tbody: HTMLElement;
            pagerContainer: HTMLElement;
            defaultContentElm: HTMLElement;
        };
        static create_WIntradayTradesMini_DOM(containerElement: HTMLElement, ticker: Observable, title: string, showTicker: boolean, showColumnsHeaders: boolean, showBuyerAndSeller: boolean, enableLink: boolean, showSearchWidget: boolean, linkClick: (event: Event) => void, searchButtonClick: (event: Event) => void, strings: Language): {
            tradeBody: HTMLElement;
            searchContainer: HTMLElement;
        };
        static create_WIntradayTradesMiniRow_DOM(price: Observable, decimals: Observable, volume: Observable, time: Observable, lastStatus: Observable, status: Observable, barWidth: Observable, buyer: Observable, seller: Observable, showBuyerAndSeller: boolean, priceClick: (event: Event) => void): HTMLElement;
        static create_WMultipleValues_DOM(containerElement: HTMLElement, title: string): HTMLElement;
        static create_WStyleMap_DOM(containerElement: HTMLElement, selected: Observable, elementClicked: (id) => void, cache: BindingCache, cacheKey: string, strings: Language): void;
        static create_WRiskLevel_DOM(containerElement: HTMLElement, riskLevels: number, cache: BindingCache, cacheKey: string, strings: Language): {
            riskLevelStars: HTMLElement;
            container: HTMLElement;
        };
        static create_WMorningstarRating_DOM(containerElement: HTMLElement, title: string, cache: BindingCache, cacheKey: string, strings: Language): {
            container: HTMLElement;
            morningstarRating: HTMLElement;
        };
        static create_WFundsInfo_DOM(containerElement: HTMLElement, cache: BindingCache, cacheKey: string, strings: Language): void;
        static create_WFundAllocation_DOM(containerElement: HTMLElement, items: ObservableArray, title: string, captionName: string, valueName: string): HTMLElement;
        static create_WOrderEntry_DOM(containerElement: HTMLElement, title: Observable, compactMode: boolean, kidUrl: Observable, kidTitle: Observable, advancedCaption: Observable, statusMessage: Observable, errorMessage: Observable, decimals: Observable, ticker: Observable, volumeBinding: InputBinding, priceBinding: InputBinding, orderTypes: ObservableArray, orderTypeObserver: InputBinding, orderTotal: Observable, owned: Observable, tradingPower: Observable, advancedValid: Observable, disableBuySell: Observable, orderState: Observable, disableInput: Observable, advancedMode: Observable, tickSizeValid: Observable, instrumentCurrency: Observable, baseCurrency: Observable, buyClick: (event: Event) => void, sellClick: (event: Event) => void, confirmClick: (event: Event) => void, cancelClick: (event: Event) => void, modifyClick: (event: Event) => void, deleteClick: (event: Event) => void, newClick: (event: Event) => void, closeClick: (event: Event) => void, advancedClick: (event: Event) => void, selectClick: (event: Event) => void, enableTickButtons: boolean, tickClick: (key) => void, volumeClick: (key) => void, strings: Language): {
            searchBoxElement: HTMLElement;
            portfolioElement: HTMLElement;
            algoWidgetElement: HTMLElement;
            customFieldsWidgetElement: HTMLElement;
            orderTypesElement: HTMLElement;
            algoTypesElement: HTMLElement;
            volumeInput: HTMLElement;
            priceInput: HTMLElement;
            advancedPanelElement: HTMLElement;
            commentFieldElement: HTMLElement;
        };
        static create_WOrderEntry_Select_DOM(items: ObservableArray, field: string, obs: InputBinding, orderEntryState: Observable, disableInput: Observable, skipIfTabbed: boolean): HTMLElement;
        static create_WOrderEntry_LimitOrder_DOM(modifyMode: boolean, validityItems: ObservableArray, validityObserver: InputBinding, validityDateVisible: Observable, validityTimeVisible: Observable, openVolumeBinding: InputBinding, activeBinding: InputBinding, activeCkVisible: Observable, activeBtnVisible: Observable, activeBtnTitle: Observable, orderEntryState: Observable, disableInput: Observable, openVolumeValid: Observable, warningString: Observable, inputClicked: (event: Event) => void, setActiveClicked: (event: Event) => void, strings: Language): {
            root: HTMLElement;
            dateSelector: HTMLElement;
            timeSelector: HTMLElement;
        };
        static create_WOrderEntry_Comment_DOM(obs: InputBinding, disableInput: Observable, inputClicked: (event: Event) => void, strings: Language): HTMLElement;
        static create_WOrderEntryAlgo_DOM(containerElement: HTMLElement, algoName: Observable, message: Observable): HTMLElement;
        static create_WOrderEntryAlgo_Input_DOM(obs: InputBinding, caption: string, disabled: Observable, confirmMode: Observable, inputClicked: (event: Event) => void): HTMLElement;
        static create_WOrderEntryAlgo_TextArea_DOM(obs: InputBinding, caption: string, disabled: Observable, confirmMode: Observable, inputClicked: (event: Event) => void): HTMLElement;
        static create_WOrderEntryAlgo_Select_DOM(items: ObservableArray, obs: InputBinding, caption: string, disabled: Observable, confirmMode: Observable, inputClicked: (event: Event) => void): HTMLElement;
        static create_WOrderEntryAlgo_Calendar_DOM(caption: string, confirmMode: Observable): {
            root: HTMLElement;
            dateSelector: HTMLElement;
        };
        static create_WOrderEntryAlgo_Time_DOM(caption: string, confirmMode: Observable): {
            root: HTMLElement;
            timeSelector: HTMLElement;
        };
        static create_WOrderEntryCustomFields_DOM(containerElement: HTMLElement): HTMLElement;
        static create_WOrderEntryCustomFields_Input_DOM(obs: InputBinding, caption: string, disabled: Observable, confirmMode: Observable, inputClicked: (event: Event) => void): HTMLElement;
        static create_WOrderEntryCustomFields_TextArea_DOM(obs: InputBinding, caption: string, disabled: Observable, confirmMode: Observable, inputClicked: (event: Event) => void): HTMLElement;
        static create_WOrderEntryCustomFields_Select_DOM(items: ObservableArray, obs: InputBinding, caption: string, disabled: Observable, confirmMode: Observable, inputClicked: (event: Event) => void): HTMLElement;
        static create_WOrderEntryCustomFields_Calendar_DOM(caption: string, confirmMode: Observable): {
            root: HTMLElement;
            dateSelector: HTMLElement;
        };
        static create_WOrderEntryHoriz_DOM(containerElement: HTMLElement, decimals: Observable, modifyMode: Observable, step: Observable, currentPortfolio: Observable, tradingPower: Observable, owned: Observable, orderTotal: Observable, message: Observable, confirmPrice: Observable, confirmVolume: Observable, confirmOrderType: Observable, confirmValidity: Observable, advancedOrderType: Observable, confirmOpenVolume: Observable, confirmTriggerPrice: Observable, confirmLimitPrice: Observable, confirmTrailLimit: Observable, confirmDeviation: Observable, confirmTriggerLimit: Observable, currency: Observable, ticker: Observable, simpleConfirmation: boolean, actualPrice: Observable, actualVolume: Observable, filled: Observable, avgPrice: Observable, orderStatus: Observable, orderState: Observable, orderStateText: Observable, errorMessage: Observable, disableBuySell: Observable, customButtons: OrderEntryConfirmScreenButton[], priceBinding: InputBinding, volumeBinding: InputBinding, buyClick: (event: Event) => void, sellClick: (event: Event) => void, confirmClick: (event: Event) => void, cancelClick: (event: Event) => void, feedbackOkClick: (event: Event) => void, cancelOrderClick: (event: Event) => void, modifyClick: (event: Event) => void, modifyCancelClick: (event: Event) => void, strings: Language): {
            searchBox: HTMLElement;
            dateSelector: HTMLElement;
        };
        static create_WOEAdvancedOptions_DOM(containerElement: HTMLElement, selectedTab: Observable, openVolumeBinding: InputBinding, ovTypeBinding: InputBinding, slCondition: InputBinding, slTriggerPrice: InputBinding, slLimitPrice: InputBinding, tsTriggerLimit: InputBinding, tsTrailLimit: InputBinding, tsDeviation: InputBinding, tsTriggerLimitSelectedIndex: Observable, strings: Language): HTMLElement;
        static create_WCompactModifyOrder_DOM(containerElement: HTMLElement, title: string, state: Observable, orderId: number, confirmType: OrderEntryConfirmation, modifyClick: (event: Event) => void, confirmClick: (event: Event) => void, cancelClick: (event: Event) => void, strings: Language): {
            parameterBody: HTMLElement;
            confirmBody: HTMLElement;
            executeContainer: HTMLElement;
        };
        static create_WCompactModifyTextinputRow_DOM(labelText: string, binding: InputBinding): HTMLElement;
        static create_WGenericTableRow_DOM(content: string[]): HTMLElement;
        static create_WCompactModifyExecuteScreen_DOM(containerElement: HTMLElement, showError: Observable, orderState: Observable, orderStateText: Observable, errorMessage: Observable, cache: BindingCache, cacheKey: string, strings: Language): void;
        static create_WOrder_DOM(decimals: Observable, statusLabel: Observable, limitLabel: Observable, conditionLabel: Observable, suffixLabel: Observable, orderStatus: String, bidAskLabel: Observable, bidAsk: Observable, avgPrice: Observable, noCurrency: boolean, orderClicked: (event: Event) => void, cache: BindingCache, cacheKey: string, strings: Language): HTMLElement;
        static create_WTradingTable_DOM(containerElement: HTMLElement, layout: Infront.ListLayout, title: string, portfolioName: Observable, showPortfolio: boolean, showPortfolioSelect: boolean, showDeleteAll: boolean, isTrading: Observable, deleteAllClick: (event: Event) => void, titleClick: () => void, strings: Language): {
            thead: HTMLElement;
            tbody: HTMLElement;
            tfoot: HTMLElement;
            progressIndicator: HTMLElement;
            portfolioContainer: HTMLElement;
        };
        static create_WTradingTableFlex_DOM(containerElement: HTMLElement, title: string, portfolioName: Observable, showPortfolio: boolean, showPortfolioSelect: boolean, showDeleteAll: boolean, deleteAllClick: (event: Event) => void, titleClick: () => void, isEmpty: Observable, mode: Observable, strings: Language): {
            tbody: HTMLElement;
            thead: HTMLElement;
            progressIndicator: HTMLElement;
            portfolioContainer: HTMLElement;
        };
        static create_WNetTrades_DOM(containerElement: HTMLElement, title: string, showPortfolio: boolean, portfolio: Observable, sortedColumn: Observable, sortColumnClicked: (colId) => void, strings: Language): {
            thead: HTMLElement;
            tbody: HTMLElement;
            progressIndicator: HTMLElement;
        };
        static create_WNetTradesRow_DOM(cache: BindingCache, cacheKey: string): HTMLElement;
        static create_WPortfolioValues_DOM(containerElement: HTMLElement, title: string): {
            thead: HTMLElement;
            tbody: HTMLElement;
        };
        static create_WPortfolioValuesRow_DOM(name: string, isPercent: boolean, cache: BindingCache, cacheKey: string): HTMLElement;
        static create_WPortfolioRanking_DOM(containerElement: HTMLElement, title: string): {
            leftColumn: HTMLElement;
            rightColumn: HTMLElement;
        };
        static create_NPortfolioName_DOM(containerElement: HTMLElement, selectedPortfolio: Observable): void;
        static create_WPortfolioSelect_DOM(containerElement: HTMLElement, title: string, selectedPortfolio: Observable, portfolios: ObservableArray, numberOfPortfolios: Observable, showMenu: Observable, scaling: boolean, dropDownLabelClick: (event: Event) => void, listClick: (item) => void, titleClick: () => void): {
            dropdownContainer: HTMLElement;
            dropdownLabel: HTMLElement;
            dropDownList: HTMLElement;
        };
        static create_DTradingLogin_DOM(routings: Object[], routingBinding: InputBinding, okClick: (event: Event) => void, cancelClick: (event: Event) => void, message: string, showControls: Observable, strings: Language): {
            inputContainer: HTMLElement;
            widgetRoot: HTMLElement;
        };
        static create_DTradingLoginInputFields_DOM(containerElement: HTMLElement, fields: Object[], inputBindings: Object, warningMsg: Observable, strings: Language): void;
        static create_Overlay_DOM(containerElement: HTMLElement, overlayVisible: Observable, closehandler: (event: Event) => void, strings: Language): {
            lightbox: HTMLElement;
            closeBtn: HTMLElement;
        };
        static create_DNotifications_DOM(containerElement: HTMLElement, notifications: ObservableArray, visible: Observable, closeClick: (internalId) => void, notificationClick: (internalId) => void): void;
        static create_WStatus_DOM(containerElement: HTMLElement, connected: Observable): void;
        static create_WIdsStatus_DOM(containerElement: HTMLElement, status: Observable): void;
        static create_WScreener_DOM(containerElement: HTMLElement, title: Observable, collapsable: boolean): HTMLElement;
        static create_WBondsTrading_DOM(containerElement: HTMLElement, title: string, bondTypeClick: (type) => void, bondTradeActionClick: (action) => void, submitClick: () => void, resetClick: () => void, typeSelectionVisibility: Observable, nominalBinding: InputBinding, forwardDateBinding: Observable, depositNumberBinding: InputBinding, loanTransactionAcc: InputBinding, freeText: InputBinding, currentInstrument: Observable, disableBuySell: Observable, tradeType: Observable, tradeAction: Observable, date: Observable, instrumentValues: Observable, last_updated: Observable, forwardPrice: Observable, clientForwardPrice: Observable, discount: Observable, premium: Observable, bondSpotPrice: Observable, clientSpotPrice: Observable, displayForwardValues: Observable, dropdownLabelVisibility: Observable, errorMessage: Observable, statusMessage: Observable, infoMessage: Observable, strings: Language): {
            searchBoxContainer: HTMLElement;
            buySellDropdownContainer: HTMLElement;
            portfolioContainer: HTMLElement;
            depotNumberDropdownContainer: HTMLElement;
            dateContainer: HTMLElement;
        };
        static create_WColumnChooser_DOM(containerElement: HTMLElement, title: string, filterBinding: InputBinding, btnAddDisable: Observable, btnRemoveDisable: Observable, allowDirectUpdate: boolean, addClick: (event: Event) => void, removeClick: (event: Event) => void, resetClick: (event: Event) => void, clearSelectionClick: (event: Event) => void, closeClick: (event: Event) => void, okClick: (event: Event) => void, cancelClick: (event: Event) => void, strings: Language): {
            aListElement: HTMLElement;
            bListElement: HTMLElement;
            filterInput: HTMLElement;
        };
        static create_WColumnChooserCategory_DOM(title: string, index: number, expand: Observable, titleClicked: (categoryIndex) => void, titleDblClicked: (categoryIndex) => void): {
            categoryElement: HTMLElement;
            contentElement: HTMLElement;
        };
        static create_WColumnChooserItem_DOM(headingHover: string, title: string, index: number, selected: Observable, visible: Observable, filtered: Observable, draggable: Observable, locked: Observable, itemClicked: (event: Event) => void, itemDblClicked: (event: Event) => void): HTMLElement;
        static create_WPutCall_DOM(containerElement: HTMLElement, title: string, subTitle: Observable, underlyingBinding: InputBinding, underlyingList: ObservableArray, underlyingChooserVisible: boolean, expiryBinding: InputBinding, expiryList: ObservableArray, expiryVisible: Observable, rangeBinding: InputBinding, rangeList: ObservableArray, rangeVisible: Observable, strings: Language): {
            titleEl: HTMLElement;
            tableEl: HTMLElement;
            symbolPanelEl: HTMLElement;
            tabBarEl: HTMLElement;
            subTitleExtraEl: HTMLElement;
        };
        static create_WWire_DOM(containerElement: HTMLElement, headerVisible: Observable, strings: Language): {
            wireContainer: HTMLElement;
            popupWrapper: HTMLElement;
            setupButton: HTMLElement;
            connectionStatus: HTMLElement;
        };
        static create_CWireNewsCard_DOM(containerElement: HTMLElement, title: Observable, titleClicked: () => void, read: Observable, index: Observable, flashItems: ObservableArray, showData: Observable, time: Observable, score: Observable, expanded: Observable, toggleLabel: Observable, toggleHandler: () => void, strings: Language): {
            wireCard: HTMLElement;
            header: HTMLElement;
            cardPills: HTMLElement;
            feedFlag: HTMLElement;
            tickerField: HTMLElement;
            todaysChangeField: HTMLElement;
            footerLink: HTMLElement;
        };
        static create_CWireEquityCalendarCard_DOM(containerElement: HTMLElement, title: Observable, titleClicked: () => void, read: Observable, index: Observable, listItems: ObservableArray, showData: Observable, time: Observable, expanded: Observable, toggleLabel: Observable, toggleHandler: () => void, strings: Language): {
            wireCard: HTMLElement;
            openCalendar: HTMLElement;
            footerLink: HTMLElement;
        };
        static create_CWireMacroCalendarCard_DOM(containerElement: HTMLElement, title: Observable, titleClicked: () => void, read: Observable, index: Observable, listItems: ObservableArray, showData: Observable, time: Observable, expanded: Observable, toggleLabel: Observable, toggleHandler: () => void, strings: Language): {
            wireCard: HTMLElement;
            openCalendar: HTMLElement;
            footerLink: HTMLElement;
        };
        static create_CWireMotionDetectionCard_DOM(containerElement: HTMLElement, title: Observable, titleClicked: () => void, read: Observable, index: Observable, listItems: ObservableArray, showData: Observable, time: Observable, score: Observable, expanded: Observable, toggleLabel: Observable, toggleHandler: () => void, strings: Language): {
            wireCard: HTMLElement;
            header: HTMLElement;
            cardPills: HTMLElement;
            feedFlag: HTMLElement;
            tickerField: HTMLElement;
            todaysChangeField: HTMLElement;
            footerLink: HTMLElement;
        };
        static create_CWireAlertCard_DOM(containerElement: HTMLElement, title: Observable, titleClicked: () => void, read: Observable, index: Observable, listItems: ObservableArray, showData: Observable, time: Observable, expanded: Observable, toggleLabel: Observable, toggleHandler: () => void, strings: Language): {
            wireCard: HTMLElement;
            footerLink: HTMLElement;
            cardPills: HTMLElement;
            feedFlag: HTMLElement;
            tickerField: HTMLElement;
            todaysChangeField: HTMLElement;
        };
        static create_WSwapCalculator_DOM(containerElement: HTMLElement, title: string, activeTab: Observable, notional: InputBinding, currency: InputBinding, currencyItems: ObservableArray, fixedIsPay: Observable, fixedRateBinding: InputBinding, spreadBinding: InputBinding, fixedFrequency: InputBinding, floatFrequency: InputBinding, frequencyItems: ObservableArray, fixedCalcMethod: InputBinding, floatCalcMethod: InputBinding, calcMethodItems: ObservableArray, swapPayReceive: (event: Event) => void, strings: Language): {
            tabBar: HTMLElement;
            resultPanel: HTMLElement;
            cashFlowPanel: HTMLElement;
            startDate: HTMLElement;
            maturityDate: HTMLElement;
            valueDate: HTMLElement;
            firstCouponDateFixed: HTMLElement;
            firstCouponDateFloat: HTMLElement;
        };
        static create_WSwapCalculator_result_DOM(containerElement: HTMLElement, leg1npv: Observable, leg2npv: Observable, npv: Observable, premium: Observable, parRate: Observable, principal: Observable, accrued: Observable, marketValue: Observable, statusText: Observable, hasValidResponse: Observable, strings: Language): void;
        static create_WSwapCalculator_cashFlow_DOM(containerElement: HTMLElement, cashFlowItems: ObservableArray, strings: Language): void;
        static create_WBondsCalculator_DOM(containerElement: HTMLElement, title: string, activeTab: Observable, bondType: InputBinding, bondTypeItems: ObservableArray, currency: InputBinding, currencyItems: ObservableArray, amount: InputBinding, fixedRate: InputBinding, couponFrequency: InputBinding, frequencyItems: ObservableArray, dayCountConvention: InputBinding, dayCountItems: ObservableArray, calculationMethod: InputBinding, calculationMethodItems: ObservableArray, cleanPricePercent: InputBinding, redemptionPrice: InputBinding, taxRatePercent: InputBinding, yieldPercent: InputBinding, strings: Language): {
            tabBar: HTMLElement;
            resultPanel: HTMLElement;
            cashFlowPanel: HTMLElement;
            valueDate: HTMLElement;
            issueDate: HTMLElement;
            firstCouponDate: HTMLElement;
            lastCouponDate: HTMLElement;
            maturityDate: HTMLElement;
            searchBox: HTMLElement;
        };
        static create_WBondsCalculator_result_DOM(containerElement: HTMLElement, yieldPercent: Observable, cleanPricePercent: Observable, grossYieldPercent: Observable, remainingMaturity: Observable, netYieldPercent: Observable, duration: Observable, accruedInterestDays: Observable, modifiedDuration: Observable, accruedInterest: Observable, basisPointValue: Observable, dirtyPricePercent: Observable, convexity: Observable, statusText: Observable, hasValidResponse: Observable, strings: Language): void;
        static create_WBondsCalculator_cashFlow_DOM(containerElement: HTMLElement, cashFlowItems: ObservableArray, strings: Language): void;
        static create_CFilterSelector_DOM(containerElement: HTMLElement, title: string, className: string, selectedCount: Observable, filters: FilterGroupItem[], filterClicked: (event: Event) => void, expandedGroup: Observable, filterTabIndex: Observable, toggleExpand: () => void, collapsable: boolean, wrapperHeight: Observable, strings: Language): HTMLElement;
        static create_CRadioFilterSelector_DOM(containerElement: HTMLElement, title: string, className: string, selectedCount: Observable, filters: FilterGroupItem[], filterClicked: (event: Event) => void, expandedGroup: Observable, filterTabIndex: Observable, toggleExpand: () => void, collapsable: boolean, wrapperHeight: Observable, strings: Language): HTMLElement;
        static create_CRangeFilterSelector_DOM(containerElement: HTMLElement, title: string, className: string, backgroundSelectedWidth: number, backgroundSelectedLeft: number, selectedCount: Observable, filters: FilterGroupItem[], filterClicked: (event: Event) => void, expandedGroup: Observable, filterTabIndex: Observable, toggleExpand: () => void, collapsable: boolean, wrapperHeight: Observable): {
            filtergroupContainer: HTMLElement;
            filtergroupHolder: HTMLElement;
            rangeWrapper: HTMLElement;
        };
        static create_CFilterSingleSelector_DOM(containerElement: HTMLElement, title: string, className: string, filter: FilterGroupItem, filterClicked: () => void): {
            filterContainer: HTMLElement;
            columnElement: HTMLElement;
        };
        static create_CFilterFreeTextSearch_DOM(containerElement: HTMLElement, title: string, className: string, strings: Language): HTMLElement;
        static create_WScreenerActiveFilter_DOM(containerElement: HTMLElement, title: string, showRemoveAllFilters: Observable, removeAllFilters: () => void, strings: Language): HTMLElement;
        static create_CScreenerActiveFilterGroup_DOM(containerElement: HTMLElement, title: Observable, activeFilters: ObservableArray, expandClickHandler: () => void, removeFilterClickHandler: () => void, removeItemClickHandler: (item) => void): HTMLElement;
        static create_CScreenerActiveFilterShowCountGroup_DOM(containerElement: HTMLElement, title: Observable, count: Observable<number>, selectedLabel: string, expandClickHandler: () => void, removeFilterClickHandler: () => void, removeItemClickHandler: (item) => void): HTMLElement;
        static create_CScreenerActiveRangeFilterGroup_DOM(containerElement: HTMLElement, title: Observable, startLabel: Observable, endLabel: Observable, separator: Observable, expandClickHandler: () => void, removeFilterClickHandler: () => void, removeItemClickHandler: (item) => void): HTMLElement;
        static create_CTabs_DOM(containerElement: HTMLElement, tabs: ObservableArray, selectedId: Observable, clickhandler: (id) => void): HTMLElement;
        static create_CSearch_DOM(containerElement: HTMLElement, textObserver: InputBinding, searchResults: ObservableArray, fields: string[], selectedResult: Observable, showResults: Observable, enableMultiSelect: boolean, currentElements: ObservableArray, selectLastElement: Observable, listClick: (item) => void, elementClicked: (instrument) => void, containerClick: (event: Event) => void): {
            dropdownContainer: HTMLElement;
            searchfield: HTMLElement;
        };
        static create_CSearchInputOnly_DOM(containerElement: HTMLElement, textObserver: InputBinding, enableMultiSelect: boolean, currentElements: ObservableArray, selectLastElement: Observable, elementClicked: (instrument) => void, containerClick: (event: Event) => void): HTMLElement;
        static create_CDropDown_DOM(containerElement: HTMLElement, title: Observable, showToggleAll: boolean, list: ObservableArray, showDropDownMenu: Observable, dropDownTitle: Observable, inSubMenu: Observable, dropDownLabelClick: (event: Event) => void, itemClick: (item) => void, itemWithSubClick: (item) => void, backButtonClick: (event: Event) => void, okButtonClick: (event: Event) => void, toggleAllClick: (event: Event) => void, isMultiSelect: boolean, isMultiLevel: boolean, backLabel: any, toggleAllLabel: any, strings: Language): {
            dropdownContainer: HTMLElement;
            upperPaneContainer: HTMLElement;
            lowerPaneContainer: HTMLElement;
            dropdownElements: HTMLElement;
            dropDownLabel: HTMLElement;
            closeBtn: HTMLElement;
        };
        static create_CPager_DOM(containerElement: HTMLElement, visible: Observable, prevEnabled: Observable, nextEnabled: Observable, firstHandler: (event: Event) => void, prevHandler: (event: Event) => void, nextHandler: (event: Event) => void, strings: Language): void;
        static create_CDateSelector_DOM(containerElement: HTMLElement, showCalendar: Observable, textFieldBinding: InputBinding, currentMonth: Observable, disabled: Observable, nextMonthClick: (event: Event) => void, prevMonthClick: (event: Event) => void): {
            calendar: HTMLElement;
            dropdownContainer: HTMLElement;
        };
        static create_CTimeSelector_DOM(containerElement: HTMLElement, hourItems: ObservableArray, minutItems: ObservableArray, hourSelector: InputBinding, minuteSelector: InputBinding, minHour: number, maxHour: number, timeSeperator: Observable, disable: Observable): HTMLElement;
        static create_CSlider_DOM(containerElement: HTMLElement, items: SliderItem[]): {
            sliderGroupHolder: HTMLElement;
            backgroundBar: HTMLElement;
            sliderRangeContainer: HTMLElement;
            sliderWrapper: HTMLElement;
            sliderBullet: HTMLElement;
            sliderSelectedRange: HTMLElement;
        };
        static create_CPopup_DOM(containerElement: HTMLElement, showArrow: boolean, arrowClass: string): {
            container: HTMLElement;
            content: HTMLElement;
        };
        static create_CYesNoPopup_DOM(containerElement: HTMLElement, questionText: string, onYes: (event: Event) => void, onNo: (event: Event) => void, strings: Language): void;
        static create_CHoldingValuesPopup_DOM(containerElement: HTMLElement, title: string, volumeBinding: InputBinding, priceBinding: InputBinding, investedBinding: InputBinding, disableOk: Observable, okClick: (event: Event) => void, cancelClick: (event: Event) => void, selectClick: (event: Event) => void, strings: Language): {
            volumeInput: HTMLElement;
            avgPriceInput: HTMLElement;
        };
        static create_CWireSettingsPopup_DOM(containerElement: HTMLElement, title: string, customListItems: ObservableArray, customList: InputBinding, disableOk: Observable, okClick: (event: Event) => void, cancelClick: (event: Event) => void, selectClick: (event: Event) => void, strings: Language): {
            customLists: HTMLElement;
            markets: HTMLElement;
            newsSlider: HTMLElement;
            newsSwitch: HTMLElement;
            motionSlider: HTMLElement;
            motionDetectionSwitch: HTMLElement;
            alertSwitch: HTMLElement;
        };
        static create_COrderMessage_DOM(containerElement: HTMLElement, message: string, classname: string, item: any, elementClicked: (instrument) => void, strings: Language): HTMLElement;
        private static macro_MHeader(title, showSnapshotIcon, navButton, navbuttonClick, ticker, strings);
        static create_CSwitch_DOM(containerElement: HTMLElement, switchState: Observable, switchClick: (event: Event) => void): {
            container: HTMLElement;
            switchBtn: HTMLElement;
        };
        static create_CRadio_DOM(containerElement: HTMLElement, label: string, state: Observable, clickEvent: (event: Event) => void): void;
        static create_WCompanyFundamentals_DOM(containerElement: HTMLElement, label: string, currency: string, columns: Object[], layout: Infront.ListLayout, hasContent: Observable, strings: Language): HTMLElement;
        static create_WCompanyDescription_DOM(containerElement: HTMLElement, label: string, info: string): void;
        static create_WCommunicationStatus_DOM(containerElement: HTMLElement, columns: string[], items: SortedObservableArray): {
            thead: HTMLElement;
            tbody: HTMLElement;
        };
        static unbindAll(element: HTMLElement): void;
    }
}
/**
 * Created by hage on 16.01.14.
 */
declare module Infront {
    enum FocusWidgetLayout {
        STANDARD = 0,
        MINI = 1,
    }
    class FocusWidgetOptions extends SingleInstrumentWidgetOptions {
        layout: FocusWidgetLayout;
        onClick: (instrument: Instrument) => void;
    }
    class FocusWidget extends SingleInstrumentWidgetBase implements InfrontWidget, InterLibraryLink.Target {
        private static kComputedLowBarField;
        private static kComputedHighBarField;
        private static kComputedArrowPosition;
        private static kNumberOfTicks;
        protected options: FocusWidgetOptions;
        private enableLink;
        private tradesToday;
        private prevLast;
        private lastTicks;
        constructor(element: HTMLElement, infrontUI: UI, options: FocusWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        private linkClicked();
    }
}
/**
 * Created by Djuve on 07.06.17
 */
declare module Infront {
    class FundAllocationPieChartWidgetOptions extends WidgetOptions {
        instruments: Instrument[];
        allocationType: "Country" | "Asset" | "Sector";
        animation: boolean;
        colors: string[];
        borderColor: string;
        borderWidth: number;
        enableLabels: boolean;
        legend: boolean;
        enable3d: boolean;
        alpha: number;
        beta: number;
        depth: number;
        spacingBottom: number;
        spacingLeft: number;
        spacingRight: number;
        spacingTop: number;
        innerSize: string;
        fontFamily: string;
        legendMaxHeight: number;
        legendLabelColor: string;
    }
    class FundAllocationPieChartWidget extends WidgetBase implements Binding {
        protected options: FundAllocationPieChartWidgetOptions;
        private allocationType;
        private allocationArray;
        private fundAllocationTotalValues;
        progressIndicator: ProgressIndicator;
        private chart;
        constructor(element: HTMLElement, infrontUI: UI, options: FundAllocationPieChartWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected createBindings(): void;
        protected newSubscribe(): void;
        protected removeBindings(): void;
        protected newDestroyUI(): void;
        valueUpdated(val: any): void;
        receiveMessage(msg: InterLibraryLink.Message): void;
        accepts(): string[];
        private updateChart();
        private createPieChartSeries();
        private formatCacheDataForSeries();
        private getBindingFields();
        private getCaptionFieldName();
        private getValueFieldName();
    }
}
/**
 * Created by OMG on 10.02.17.
 */
declare module Infront {
    class FundAllocationWidgetOptions extends SingleInstrumentWidgetOptions {
        allocationType: "Country" | "Asset" | "Sector";
        maxLines: number;
    }
    class FundAllocationWidget extends SingleInstrumentWidgetBase implements Binding, InterLibraryLink.Target {
        protected options: FundAllocationWidgetOptions;
        private allocationType;
        private allocationArray;
        constructor(element: HTMLElement, infrontUI: UI, options: FundAllocationWidgetOptions);
        protected newBuildUI(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        private getTitle();
        private getCaptionFieldName();
        private getValueFieldName();
        private getBindingFields();
        valueUpdated(val: any): void;
    }
}
/**
 * Created by OMG on 14.02.17.
 */
declare module Infront {
    class FundMorningstarRatingWidgetOptions extends SingleInstrumentWidgetOptions {
    }
    class FundMorningstarRatingWidget extends SingleInstrumentWidgetBase {
        protected options: FundMorningstarRatingWidgetOptions;
        private strings;
        constructor(element: HTMLElement, infrontUI: UI, options: FundMorningstarRatingWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
    }
}
/**
 * Created by OMG on 10.02.17.
 */
declare module Infront {
    class FundRiskLevelWidgetOptions extends SingleInstrumentWidgetOptions {
    }
    class FundRiskLevelWidget extends SingleInstrumentWidgetBase {
        private static kDefaultRiskLevels;
        protected options: FundRiskLevelWidgetOptions;
        private strings;
        constructor(element: HTMLElement, infrontUI: UI, options: FundRiskLevelWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
    }
}
/**
 * Created by hage on 19.01.2017.
 */
declare module Infront {
    class FundStylemapWidgetOptions extends SingleInstrumentWidgetOptions {
    }
    class FundStylemapWidget extends SingleInstrumentWidgetBase {
        protected options: FundStylemapWidgetOptions;
        private selected;
        constructor(element: HTMLElement, infrontUI: UI, options: FundStylemapWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        protected newSubscribe(): void;
    }
}
declare module Infront {
    class FundTopHoldingsWidgetOptions extends SingleInstrumentWidgetOptions {
        showCurrency: boolean;
    }
    class FundTopHoldingsWidget extends SingleInstrumentWidgetBase implements Binding, InterLibraryLink.Target {
        private holdings;
        private holdingsUnbind;
        protected options: FundTopHoldingsWidgetOptions;
        constructor(element: HTMLElement, infrontUI: UI, options: FundTopHoldingsWidgetOptions);
        protected newSubscribe(): void;
        protected newBuildUI(): void;
        protected returnDefaultWidgetOptions(): FundTopHoldingsWidgetOptions;
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
        valueUpdated(val: any): void;
        private createHolding(name, currency, isin, weight);
    }
}
declare module Infront {
    enum RGBColors {
        R = 0,
        G = 1,
        B = 2,
    }
    enum HeatmapMode {
        CHAINS = 0,
        WATCHLIST = 1,
    }
    enum HeatmapPeriod {
        INTRADAY = 0,
        ONE_WEEK = 1,
        ONE_MONTH = 2,
        ONE_YEAR = 3,
        YTD = 4,
    }
    class HeatmapWidgetOptions extends CommonListOptions {
        feed: number;
        chain: string;
        streaming: boolean;
        sortOrder: SortOrder;
        instrumentTypes: string[];
        instruments: Infront.Instrument[];
        maxItems: number;
        heatmapPeriod: HeatmapPeriod;
        onInstrumentSelected: (instrument: Instrument) => void;
        layout: Infront.ListLayout;
        rangeUpMinColor: number[];
        rangeUpMaxColor: number[];
        rangeDownMinColor: number[];
        rangeDownMaxColor: number[];
        defaultColor: number[];
        useChains: boolean;
        mode: HeatmapMode;
        chains: Chain[];
        defaultChain: Chain | string;
        colorClippingTreshold: number;
    }
    class HeatmapWidget extends CommonListWidgetBase implements InfrontWidget, RowFactory, ArrayBindingObserver, InterLibraryLink.Controller {
        protected options: HeatmapWidgetOptions;
        private items;
        private cap;
        protected instruments: ObservableArray;
        protected cachedReferenceData: {
            feed: number;
            data: any[];
        };
        private isStreaming;
        private decimals;
        private linkController;
        private currentPeriod;
        private heatmapWrapper;
        private chains;
        private selectedChain;
        private selectedChainName;
        private static kMyStoredChainKey;
        private static kMyStoredWatchlistKey;
        private static kMyStoredTimeperiodKey;
        private static kMyStoredSortingKey;
        private feedMetaData;
        private isChainsDropdownSet;
        private isWatchlistDropdownSet;
        private isSortDropdownSet;
        private colorInterval;
        private streamingUnsub;
        private dropdownContainer;
        private dropdownElement;
        private colorArrayUp;
        private colorArrayDown;
        private firstInit;
        private perfectScrollbar;
        private periodValues;
        private periods;
        constructor(element: HTMLElement, infrontUI: UI, options: HeatmapWidgetOptions);
        protected setColumnManager(): void;
        protected setListItems(): void;
        protected newInit(): void;
        private addAllInstruments(instruments);
        private loadWatchlists();
        private loadChains();
        private loadFeedChains();
        private buildWatchlistNodes(watchlistTitles);
        private buildChainNodes(item);
        private nodesFromFlatChains(flatChains);
        /**
         * Sets initial chain from first chain matching provided name. If no name provided it sets the first chain
         * @param items Chain/Node objects
         * @param initialChainName Name of chain to set. If empty the first chain found will match.
         */
        private selectInitChain(items, initialChainName);
        /**
        * Selected watchlist handler
        * Requsts watchlist instruments, given the watchlist name and adds all the instruments to the list
        */
        private watchlistSelected(watchlistName);
        private chainSelected(chain);
        loadChain(chain: Chain): void;
        getReferenceData(feed: number, instrumentsInChain?: Instrument[]): void;
        clear(): void;
        hasInstrument(instrument: Instrument): boolean;
        clearVisible(): void;
        addInstrument(instrument: Instrument): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        private preFilterInstruments(instrumentArray, instrumentsInChain?);
        private setStreaming();
        protected newBuildUI(): void;
        private updateHistColumns();
        private getHistoryColumn();
        protected setOptions(options: HeatmapWidgetOptions): void;
        private calculateColorArray();
        private colorBetween(colorA, colorB, percent);
        private getColorValueFromChangedField(value);
        private calculateColorByValue(value);
        private generateRGBString(rgbArray);
        sortColumnChanged(column: Field, sortOrder: SortOrder, userInteraction: boolean): void;
        private buildDropdown(items, title, itemClickedCallback, preSelectedItems);
        private createSortDropdown();
        private createPeriodDropdown();
        private setCurrentPeriod(periodString);
        private addDropDown(opts);
        private doAddInstrument(instrument);
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        protected newDestroyUI(): void;
        createRow(item: any, index: number): HTMLElement;
        appendPlaceholders(container: HTMLElement): void;
        createElementRowFromCache(rowId: any, cacheKey: string, decimals: Observable | any | number): HTMLElement;
        rowClicked(instrument: Instrument): void;
        linkEvent(instrument: Instrument): void;
        getColumnManager(): ColumnManager;
        private getTickerField();
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
    }
}
declare module Infront {
    class HistoricalOverviewWidgetOptions extends SingleInstrumentWidgetOptions {
        historicFields: InfrontConstants.HistoricalPeriodes[];
        barPeriod: InfrontConstants.HistoricalPeriodes;
    }
    class HistoricalOverviewWidget extends SingleInstrumentWidgetBase {
        private static kStoredPeriodKey;
        private currentBarPeriod;
        private localLow;
        private localHigh;
        private localLast;
        private localHistClose;
        private lowLabel;
        private highLabel;
        protected options: HistoricalOverviewWidgetOptions;
        constructor(element: HTMLElement, infrontUI: UI, options: HistoricalOverviewWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        private onPeriodClicked(item);
        private createHistFieldDef(period, field);
    }
}
/**
 * Created by hage on 21.08.2014.
 */
declare module Infront {
    class HistoryWidgetOptions extends SingleInstrumentWidgetOptions {
        startYear: number;
        endYear: number;
        useRatioForSplit: boolean;
        filterSmallSplits: boolean;
        columns: any[];
    }
    class HistoryWidgetColumn {
        name: string;
        sortName?: string;
        className?: string;
        dataType: string;
        decimals?: number;
        compareFactory: (field: string, descending: boolean) => (a, b) => number;
        constructor(options?: any);
    }
    class HistoryWidget extends SingleInstrumentWidgetBase {
        static kTradeItem: number;
        static kSplitItem: number;
        static kDividendItem: number;
        private defaultColumnsDefinition;
        private static kDefaultSortingColumn;
        protected options: HistoryWidgetOptions;
        private items;
        private years;
        private yearObserver;
        private selectedYear;
        private selectedOptionButton;
        private columns;
        private sortedColumn;
        private dividends;
        private splits;
        constructor(element: HTMLElement, infrontUI: UI, options: HistoryWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        protected newSubscribe(): void;
        private feedContainsOnlyFund();
        private symbolIsFund();
        private symbolIsStock();
        private loadCompanyHistory(doneCallback?);
        private convertToRatio(value);
        private getClosestFraction(value);
        private optionSelected(index);
        private yearSelected(year);
        private columnHeaderClicked(index);
        private updateSorting();
        private getColumnDefaultConfig(colName);
    }
}
/**
 * Created by hage on 10.06.2014.
 */
declare module Infront {
    enum InstrumentOverviewWidgetLayout {
        STANDARD = 0,
        MINI = 1,
        SIMPLE = 2,
    }
    class IndexOverviewWidgetOptions extends SingleInstrumentWidgetOptions {
        primaryValue: string;
        historicFields: string[];
        historicColor: boolean;
        layout: InstrumentOverviewWidgetLayout;
        showFullName: boolean;
        onClick: (instrument: Instrument) => void;
    }
    class IndexOverviewWidget extends SingleInstrumentWidgetBase implements InfrontWidget, InterLibraryLink.Target {
        protected options: IndexOverviewWidgetOptions;
        private enableLink;
        private up;
        private down;
        private unchanged;
        private upPct;
        private downPct;
        private unchangedPct;
        private unbind;
        constructor(element: HTMLElement, infrontUI: UI, options: IndexOverviewWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        protected newSubscribe(): void;
        private getMarketActivity();
        private marketActivityUpdate(data);
        private linkClicked();
        destroy(): void;
    }
}
/**
 * Created by hage on 13.01.14.
 */
declare module Infront {
    class StatusWidgetOptions extends WidgetOptions {
        show_user_id: boolean;
    }
    class StatusWidget extends WidgetBase {
        protected options: StatusWidgetOptions;
        private userIdElement;
        private connected;
        constructor(element: HTMLElement, infrontUI: UI, options: StatusWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
    }
    class IDSStatusWidgetOptions extends WidgetOptions {
        show_user_id: boolean;
        statusChangedCallback: (status: InfrontStatus) => void;
    }
    class IDSStatusWidget extends WidgetBase {
        protected options: IDSStatusWidgetOptions;
        private serverTypeDisconnects;
        private status;
        constructor(element: HTMLElement, infrontUI: UI, options: IDSStatusWidgetOptions);
        private addLowLevelConnect(event);
        private addLowLevelDisconnect(event);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        destroy(): void;
    }
}
/**
 * Created by hage on 10.01.14.
 */
declare module Infront {
    class LoginDialog {
        observer: LoginDialogObserver;
        showing: boolean;
        overlay: HTMLElement;
        box: HTMLElement;
        constructor(observer: LoginDialogObserver);
        show(): void;
        hide(): void;
    }
    interface LoginDialogObserver {
        loginInformationProvided(username: string, password: string): any;
        loginCanceled(): any;
    }
}
declare module Infront {
    class PortfolioNameWidgetOptions extends TradingWidgetOptions {
    }
    class PortfolioNameWidget extends TradingWidgetBase {
        protected options: PortfolioNameWidgetOptions;
        private portfolios;
        private selectedPortfolio;
        private showMenu;
        constructor(element: HTMLElement, infrontUI: UI, options: PortfolioNameWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        /**
         * TradingManagerObserver
         */
        availablePortfoliosChanged(portfolios: Portfolio[]): void;
        currentPortfolioChanged(portfolio: Portfolio): void;
    }
}
declare module Infront {
    class PortfolioSelectWidgetOptions extends TradingWidgetOptions {
        portfoliosChanged: (amount: number) => void;
        scaling: boolean;
        titleClick: () => void;
        showFullName: boolean;
    }
    class PortfolioSelectWidget extends TradingWidgetBase implements InfrontWidget, TradingManagerObserver {
        private static kMyStoredPortfolio;
        protected options: PortfolioSelectWidgetOptions;
        private portfolios;
        private numberOfPortfolios;
        private selectedPortfolio;
        private showMenu;
        private scaling;
        private dropdownScaled;
        private dropdownContainer;
        private dropdownPositioning;
        private listClick;
        constructor(element: HTMLElement, infrontUI: UI, options: PortfolioSelectWidgetOptions);
        protected newBuildUI(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        private portfolioSelected(portfolio);
        getPortfoliosAmount(): number;
        private scaleDropdown();
        private absolutePositionDropdown();
        /**
         * TradingManagerObserver
         */
        availablePortfoliosChanged(portfolios: Portfolio[]): void;
        currentPortfolioChanged(portfolio: Portfolio): void;
        currentPortfolioReady(portfolio: Portfolio): void;
    }
}
/**
 * Created by hage on 13.11.2014.
 */
declare module Infront {
    class TradingTableWidgetOptions extends CommonListOptions {
        showPortfolio: boolean;
        showPortfolioSelect: boolean;
        showDeleteAll: boolean;
        clickToLogin: boolean;
        aggregated: boolean;
        titleClick: () => void;
        hideEmptyList: boolean;
        maxItems: number;
        onItemCountChange: (items: number) => void;
    }
    abstract class TradingTableWidgetBase extends TradingWidgetBase implements CommonListUISharedFunctions, IArrayBinding, ArrayBindingObserver, RowFactory {
        protected static kMySortingColumnKey: string;
        protected options: TradingTableWidgetOptions;
        protected trCounter: number;
        protected showPortfolio: boolean;
        protected showPortfolioSelect: boolean;
        protected portfolioSelectWidget: Infront.PortfolioSelectWidget;
        protected portfolioNameObs: Observable;
        protected items: ContinouslySortedColumnCacheKeyObservableArray;
        protected syncUnbind: () => void;
        protected columnManager: ColumnManager;
        protected feedMetadata: {
            [s: number]: FeedMetaData;
        };
        protected deleteAllClick: (event: Event) => void;
        private filterFields;
        private filterFunc;
        private isTrading;
        private rowCounter;
        protected decimals: {
            [s: string]: Observable;
        };
        protected dataCap: ObservableArrayCap;
        private filters;
        protected symbolCacheKeys: any[];
        constructor(element: HTMLElement, languageKey: string, infrontUI: UI, options: TradingTableWidgetOptions, filterFields?: any[], filterFunc?: (args: any[]) => boolean, deleteAllClick?: (event: Event) => void);
        abstract linkEvent(instrument: Instrument): void;
        protected newBuildUI(): void;
        setMaxItems(newMax: number): void;
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        protected newDestroyUI(): void;
        /**
         * Functions that may or must be implemented by sub-classes
         */
        rowClicked(rowId: any): void;
        protected createArrayCacheKey(portfolio: Portfolio): string;
        createColumn(spec: any, languageHandler: Language): Field;
        /**
         * Return a proper rowId to use for this item. This varies from table to table, so subclasses should override this.
         * @param item
         * @returns any
         */
        protected getRowId(item: any): any;
        /**
         * End section of functions that may or must be implemented by sub-classes.
         */
        sortColumnChanged(col: Field, sortOrder: SortOrder, userInteraction: boolean): void;
        private getStoredColumn();
        /**
         * Converts the cacheKey stored in the array into the correct cache-key to use for this column. This is typically dependent
         * on the context, and is therefore implemented here in the widget-implementation. It is used by ColumnManager.
         * @param cacheKey
         * @param column
         * @returns {string}
         */
        protected convertCacheKey(cacheKey: string, column: Field): string;
        createCacheKey(item: any, field: any): string;
        /**
         * RowFactory
         */
        createRow(item: any, index: number): HTMLElement;
        /**
         * TradingManagerObserver
         */
        availablePortfoliosChanged(portfolios: Portfolio[]): void;
        currentPortfolioChanged(portfolio: Portfolio): void;
        syncToPortfolios(portfolios: Portfolio[]): void;
        currentPortfolioReady(portfolio: Portfolio): void;
        /**
         * IArrayBinding
         */
        reInit(items: any[]): void;
        itemAdded(item: any, index: number): void;
        itemRemoved(item: any, index: number): void;
        itemMoved(item: any, oldIndex: number, newIndex: number): void;
        /**requests specified info in each item in cached array and updates cache with information already loaded in symbols
         * @param field - specifies which field to check for
         * @param portfolio - portfolio name, if any, null if not needed
         * @param object (optional) - nested object that the field is located in
         * @param type (optional) - specifies which cache array to check
         * @param item (optional) - full cache key if updating only one item
         * @returns none
         */
        protected iterateCacheItems(field: any, portfolio: string, object?: any, type?: string, item?: any): void;
        /**
         * ArrayBindingObserver
         */
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): void;
        supportsHasContent(): boolean;
        createPortfolioSelect(container: HTMLElement): void;
    }
}
declare module Infront {
    class PositionsWidgetOptions extends TradingTableWidgetOptions {
        instrumentTypes: string[];
        instrumentSubtypes: string[];
        hideInstrumentSubtypes: string[];
        hideInstrumentTypes: string[];
        loans: boolean;
        layout: ListLayout;
        displayRowColumns: any[];
        enableOrders: boolean;
        enableTrades: boolean;
        onChangeModeCallback: (value: any) => void;
        onOrderClick: (object: any) => void;
        onTradeClick: (instrument: Instrument) => void;
    }
    class PositionsWidget extends TradingTableWidgetBase implements RowFactory {
        private static kLoanMarket;
        protected options: PositionsWidgetOptions;
        private expandedAlert;
        private unbindingManager;
        private mode;
        private itemCacheKeys;
        private displayColumns;
        private expandables;
        private tableState;
        private orderItems;
        private ordersSync;
        private ordersfilterFields;
        private ordersUnbind;
        private tradeItems;
        private tradesSync;
        private tradesUnbind;
        private netTradesHandler;
        private isEmpty;
        private rebuild;
        constructor(element: HTMLElement, infront: Model, infrontUI: UI, options: PositionsWidgetOptions);
        private setColumns();
        setDisplayColumns(cols: any[]): void;
        private createTickerColumn();
        private initializeOrders();
        private initializeTrades();
        protected newBuildUI(): void;
        linkEvent(instrument: Instrument): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        createArrayCacheKey(portfolio: Portfolio): string;
        private filter(args);
        private filterMarket(market);
        private filterInstrumentType(type, subtype?);
        createColumn(spec: any, languageHandler: Language): Field;
        itemAdded(item: any, index: number): void;
        private appendOrderInfoElement(item, message, key);
        getInfoType(item: string): string;
        private removeOrderInfoElement(item, key, value);
        createRow(item: any, index: number): HTMLElement;
        reInit(items: any[]): void;
        private appendInfoWrapper(item, retVal);
        protected onTradingConnected(): void;
        currentPortfolioChanged(portfolio: Portfolio): void;
        currentPortfolioReady(portfolio: Portfolio): void;
        setLayout(layout: ListLayout): void;
    }
    class PositionsNetTradesHandler {
        private netTrades;
        private portfolio;
        private returnCallback;
        private onClickCallback;
        constructor(returnCallback?: (value: any, message?: string, key?: string) => any);
        processTradeItem(item: any, buyOrSell: string, cache: BindingCache): void;
        private instrumentTraded(cacheKey);
        private getCacheKeyFromTradeItem(item, cache);
        private setNetBuySellPrice(item, cacheKey, cache, buyOrSell);
        private setNetVolume(item, cacheKey, cache, buyOrSell);
        private updateTotal(cacheKey);
        private getTotal(cacheKey);
        getNetSellMessage(cacheKey: string, decimals?: number): string;
        getNetBuyMessage(cacheKey: string, decimals?: number): string;
    }
    class OrderItem {
        orderkey: string;
        instrument: Instrument;
        price: any;
        orderStatus: any;
        buySell: any;
        portfolio: string;
        volume: number;
        algoID: string;
        order_type: string;
        condition: any;
        orderlimit: any;
        currency: string;
    }
    class PositionsOrderItemHandler {
        private bidAskField;
        private subscribes;
        private orderMessage;
        private orderItem;
        private orderStatusCallback;
        private retVal;
        private onClickCallback;
        constructor(item: string, cache: BindingCache, infront: UI, orderStatusCallback?: (value: any, message: string, key: string, orderitem: any) => any, onClickCallback?: (instrument: Infront.Instrument) => void);
        private setBindings(cache);
        private setValuesFromCache(item, cache);
        private getBidAskFromOrderPosition(item, cache);
        getOrderStatusUnbind(item: any, cache: BindingCache): () => void;
        private updateOrderStatus(item, status);
        private handleStrategyOrderType(item, cache);
        private createOrderMessage();
        getOrderMessage(): string;
        getInstrumentFromOrder(item: string, cache: BindingCache): Instrument;
        isActive(): boolean;
    }
}
declare module Infront {
    class OrderStatus {
        static INACTIVE_ORDER: string;
        static ORDER_REQUEST: string;
        static EXCHANGE_ORDER: string;
        static INTERNAL_ORDER: string;
        static DELETE_REQUEST: string;
        static OFFLINE_ORDER: string;
        static DELETED_ORDER: string;
        static MONITOR_ORDER: string;
        static EXECUTED_ORDER: string;
        static WORKING_ORDER: string;
        static MODTONEW_ORDER: string;
        static DONE_FOR_DAY: string;
        static REJECTED_ORDER: string;
        static EXPIRED_ORDER: string;
        static PENDING_INSERT_ORDER: string;
        static PENDING_MODIFY_ORDER: string;
        static PENDING_DELETE_ORDER: string;
        static CARE_REQUEST: string;
    }
    class OrdersWidgetOptions extends TradingTableWidgetOptions {
        showStatuses: string[];
        hideStatuses: string[];
        showTypes: string[];
        hideTypes: string[];
        stopLossOnly: boolean;
        onOrderSelected: (portfolio: Portfolio, orderId: number, instrument: Instrument) => void;
        modifyClick: (portfolio: string, orderId: number) => void;
        columns: any[];
    }
    class OrdersWidget extends TradingTableWidgetBase {
        private static kLanguageKey;
        static kCancelOrderColumn: string;
        static kModifyOrderColumn: string;
        static kActivateOrderColumn: string;
        static kDeactivateOrderColumn: string;
        private static deletableOrderStatuses;
        private static partialFillExecutedStatuses;
        protected options: OrdersWidgetOptions;
        private unbindingManager;
        private popup;
        constructor(element: HTMLElement, infrontUI: UI, options: OrdersWidgetOptions);
        linkEvent(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        private modifyClicked(item);
        private activateClicked(item);
        private deactivateClicked(item);
        private closePopup();
        private showDeleteAllConfirmation(elementClicked);
        private deleteAllOrders();
        private showDeleteConfirmation(orderId, elementClicked);
        private _deleteOrder(orderId);
        rowClicked(rowId: number): void;
        createArrayCacheKey(portfolio: Portfolio): string;
        /**
         * Convenience-method for deleting an order via external means. For example if you want to create a custom delete-button
         * with your own type of confirmation.
         * @param orderId
         */
        deleteOrder(orderId: number): void;
        getRowId(item: any): any;
        createColumn(spec: any, languageHandler: Language): Field;
        private filterStatus(orderStatus, volumeFilled);
        private filterType(orderType);
        private filterAlgoId(algoId);
        createRow(item: any, index: number): HTMLElement;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
    }
}
declare module Infront {
    enum SpecialExpiryDate {
        All = 0,
        FirstMonthly = 1,
        SecondMonthly = 2,
        ThirdMonthly = 3,
        AllWeekly = 4,
        FutureForward = 5,
    }
    class PutCallPair {
        callInstrument: Instrument;
        putInstrument: Instrument;
        expiry: number;
        strike: number;
        rank: number;
        constructor(callInstrument: Instrument, putInstrument: Instrument, expiry: number, strike: number);
    }
    class PutCallWidgetOptions extends CommonListOptions {
        feed: number;
        showTitle: boolean;
        showTabs: boolean;
        showFutureForward: boolean;
        showUnderlyingChooser: boolean;
        showRangeChooser: boolean;
        showSymbolPanel: boolean;
        showLastInTitle: boolean;
        showAllTab: boolean;
        defaultUnderlying: Instrument;
        columns: any[];
        sortable: boolean;
        defaultSortedColumn: number;
        defaultSortOrder: SortOrder;
        linkAction: LinkAction;
        onUnderlyingClicked: (instrument: Instrument) => void;
        onRowClicked: (callInstrument: Instrument, putInstrument: Instrument) => void;
    }
    class PutCallWidget extends CommonListWidgetBase implements InterLibraryLink.Controller, InterLibraryLink.Target, RowFactory, ArrayBindingObserver {
        private static kLanguageKey;
        private static kMySortingColumnKey;
        private static kMyRangeKey;
        protected options: PutCallWidgetOptions;
        protected widgetTitle: string;
        private widgetSubTitle;
        private instrumentsToShow;
        protected instrumentsPairs: ObservableArray;
        private cacheStorage;
        private binding;
        private feedMetaData;
        private feedDescription;
        private underlyings;
        private expiries;
        private expiriesFutureForward;
        private primarySortingColumn;
        private secondarySortingColumn;
        private currentSymbolLastBinding;
        private currentSymbolLastUnsub;
        private currentSymbolLastValue;
        private activeItem;
        private lastActiveItem;
        private lastRange;
        private currentUnderlying;
        private targetManager;
        private isinTargetManager;
        private showProgressIndicator;
        private afterLoadCallback;
        private underlyingBinding;
        private underlyingList;
        private underlyingChooserVisible;
        private expiryBinding;
        private expiryList;
        private expiryVisible;
        private rangeBinding;
        private rangeList;
        private rangeVisible;
        private extraSubTitleLastEl;
        private extraSubtitleLast;
        private currentSymbolTitleEl;
        private currentSymbolBidEl;
        private currentSymbolAskEl;
        private currentSymbolLastEl;
        private currentSymbolPctChange;
        private currentSymbolPctChangeUnsub;
        private currentSymbolBid;
        private currentSymbolAsk;
        private currentSymbolLast;
        private tabBarEl;
        private tabBar;
        private tabIgnoreChange;
        constructor(element: HTMLElement, infrontUI: UI, options: PutCallWidgetOptions);
        protected setListItems(): void;
        protected setColumnManager(): void;
        getColumnManager(): ColumnManager;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        protected newDestroyUI(): void;
        private convertCacheKey(cacheKey, column);
        private initColumns();
        private fillUnderlyings();
        private underlyingChanged(selectedIndex);
        private requestOptions(underlyingFeed, underlyingTicker, optionsExpiries, futureForwardExpiries, updateView?);
        private showHideSelectors(isSpecialExpiryDate, specialDate?);
        private expiryChanged(selectedIndex);
        private updateLastBinding(instrument);
        private reCalcRanges(activeValue);
        private rangeChanged(selectedIndex);
        loadFeed(feed: number): void;
        addInstruments(items: PutCallPair[]): void;
        showInstruments(): void;
        private doAddInstrument(item);
        clear(): void;
        clearVisible(): void;
        private getStoredColumn();
        private dateStringCompareFunction(valueA, valueB, sortOrder);
        sortColumnChanged(column: Field, sortOrder: SortOrder, userInteraction: boolean): void;
        private getDecimals(cacheKey, feed);
        createRow(item: PutCallPair, index: number): HTMLElement;
        rowClicked(instrument: Instrument): void;
        private createExtraSubtitle(element);
        private updateExtraSubtitle(instrument);
        private createSymbolPanel(element);
        private updateSymbolPanel(instrument);
        private updateTabBar();
        private tabSelected(id);
        private static numberToDate(date);
        selectUnderlying(instrument: Instrument): void;
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): void;
        linkEvent(instrument: Instrument): void;
        accepts(): string[];
        static replaceAlls: number;
        static adds: number;
        receiveMessage(msg: InterLibraryLink.Message): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
    }
}
declare module Infront {
    enum LinkAction {
        Replace = 0,
        Append = 1,
        None = 2,
    }
    class InfrontUIOptions extends InfrontOptions {
        enableLoginDialog: boolean;
        language: string;
        dictionary: Object;
        widgetStateStorage: WidgetStorage;
        useDefaultStateStorage: boolean;
        infrontDemotradingAutologon: boolean;
        enableAlertNotification: boolean;
        enableHighlightUpDownChanges: boolean;
    }
    /**
     * Entry point of the widget-library.
     */
    class UI implements LoginDialogObserver, TradingLoginDialogObserver {
        static kDefaultDecimals: number;
        static kDefaultLocalStorageKey: string;
        static kCancelClicked: string;
        private infront;
        protected options: InfrontUIOptions;
        private cache;
        languageHandler: Language;
        language: string;
        private notificationHandler;
        cancelClicked: Observable;
        private currentLoginDialog;
        private tradingLoginListeners;
        private tradingLoginDialogVisible;
        private storage;
        private unsubscribe;
        constructor(options: InfrontUIOptions);
        registerEventObserver(eventName: string, callback: (event: InfrontEvent) => void): void;
        init(): void;
        logout(): void;
        notify(message: NotificationOptions): any;
        notify(message: string, timeoutSeconds: number, type?: NotificationType, payload?: any): any;
        private infrontReady();
        private infrontDemoTradingLogin();
        isTradingLoggedIn(): boolean;
        ensureTradingLoggedIn(rememberCanceledLogin: boolean): void;
        private tradingConnected();
        private tradingDisconnected();
        private tradingLoginFailed();
        tradingLogin(message?: string): void;
        AddTradingManagerObserver(observer: TradingManagerObserver): void;
        RemoveTradingManagerObserver(observer: TradingManagerObserver): void;
        setActivePortfolio(portfolioName: string): void;
        private displayLoginDialog();
        getDataAccess(): DataAccess;
        getModel(): Model;
        getStorage(): WidgetStorage;
        loginInformationProvided(username: string, password: string): void;
        tradingLoginInformationProvided(provider: number, service: number, fields: LoginField[]): void;
        tradingLoginDialogCanceled(): void;
        tradingLoginDialogReset(): void;
        loginCanceled(): void;
        hideTradingDialog(): void;
        showTradingDialog(): void;
        simpleSearchWidget(targetElement: HTMLElement, options: SimpleSearchBoxOptions): SimpleSearchBox;
        simpleSearchWidget(targetElement: string, options: SimpleSearchBoxOptions): SimpleSearchBox;
        searchWidget(targetElement: HTMLElement, options: SearchBoxOptions): SearchBox;
        searchWidget(targetElement: string, options: SearchBoxOptions): SearchBox;
        dropDownWidget(targetElement: HTMLElement, options: DropDownOptions, language?: Language): DropDown;
        dropDownWidget(targetElement: string, options: DropDownOptions, language?: Language): DropDown;
        /**
         * Create the simple quote-widget
         * @param targetElement
         * @param options
         */
        quoteWidget(targetElement: HTMLElement, options: QuoteWidgetOptions): InfrontWidget;
        quoteWidget(targetElement: string, options: QuoteWidgetOptions): InfrontWidget;
        /**
         * Create the MyLists-widget.
         *
         * @param targetElement either the id of a DOM-element as a string, or a reference to a DOM-element directly.
         * @param options options in the form of a map.
         */
        myListsWidget(targetElement: HTMLElement, options: MyListsWidgetOptions): InfrontWidget;
        myListsWidget(targetElement: string, options: MyListsWidgetOptions): InfrontWidget;
        /**
         * Create a quote list widget.
         *
         * @param targetElement - either the id of a DOM-element as a string, or a reference to a DOM-element directly.
         * @param options in the form of a map.
         * @returns {InfrontWidget}
         */
        quoteList(targetElement: HTMLElement, options: QuoteListWidgetOptions): InfrontWidget;
        quoteList(targetElement: string, options: QuoteListWidgetOptions): InfrontWidget;
        /**
         * Create a ranked list widget.
         *
         * @param targetElement
         * @param options
         */
        rankingWidget(targetElement: string, options: RankingWidgetOptions): InfrontWidget;
        rankingWidget(targetElement: HTMLElement, options: RankingWidgetOptions): InfrontWidget;
        chainViewer(targetElement: HTMLElement, options: QuoteListWidgetOptions): InfrontWidget;
        chainViewer(targetElement: string, options: QuoteListWidgetOptions): InfrontWidget;
        companyDescription(targetElement: HTMLElement, options: CompanyDescriptionWidgetOptions): InfrontWidget;
        companyDescription(targetElement: string, options: CompanyDescriptionWidgetOptions): InfrontWidget;
        companyFundamentals(targetElement: HTMLElement, options: CompanyFundamentalsWidgetOptions): InfrontWidget;
        companyFundamentals(targetElement: string, options: CompanyFundamentalsWidgetOptions): InfrontWidget;
        focusWidget(targetElement: HTMLElement, options: FocusWidgetOptions): FocusWidget;
        focusWidget(targetElement: string, options: FocusWidgetOptions): FocusWidget;
        /**
         * Create a Fund Morningstar-Rating widget.
         *
         * @param targetElement either the id of a DOM-element as a string, or a reference to a DOM-element directly.
         * @param options in the form of a map.
         * @returns {InfrontWidget}
         */
        fundMorningstarRatingWidget(targetElement: HTMLElement, options: FundMorningstarRatingWidgetOptions): InfrontWidget;
        fundMorningstarRatingWidget(targetElement: string, options: FundMorningstarRatingWidgetOptions): InfrontWidget;
        /**
         * Create a Fund Risk Level widget.
         *
         * @param targetElement either the id of a DOM-element as a string, or a reference to a DOM-element directly.
         * @param options in the form of a map.
         * @returns {InfrontWidget}
         */
        fundRiskLevelWidget(targetElement: HTMLElement, options: FundRiskLevelWidgetOptions): InfrontWidget;
        fundRiskLevelWidget(targetElement: string, options: FundRiskLevelWidgetOptions): InfrontWidget;
        /**
         * Create a Fund Allocation widget.
         *
         * @param targetElement either the id of a DOM-element as a string, or a reference to a DOM-element directly.
         * @param options in the form of a map.
         * @returns {InfrontWidget}
         */
        fundAllocationWidget(targetElement: HTMLElement, options: FundAllocationWidgetOptions): InfrontWidget;
        fundAllocationWidget(targetElement: string, options: FundAllocationWidgetOptions): InfrontWidget;
        /**
         * Create a Fund Allocation Pie Chart widget.
         *
         * @param targetElement either the id of a DOM-element as a string, or a reference to a DOM-element directly.
         * @param options in the form of a map.
         * @returns {InfrontWidget}
         */
        fundAllocationPieChartWidget(targetElement: HTMLElement, options: FundAllocationPieChartWidgetOptions): InfrontWidget;
        fundAllocationPieChartWidget(targetElement: string, options: FundAllocationPieChartWidgetOptions): InfrontWidget;
        /**
         * Create a Fund Stylemap widget.
         *
         * @param targetElement either the id of a DOM-element as a string, or a reference to a DOM-element directly.
         * @param options in the form of a map.
         * @returns {InfrontWidget}
         */
        fundStylemapWidget(targetElement: HTMLElement, options: FundStylemapWidgetOptions): InfrontWidget;
        fundStylemapWidget(targetElement: string, options: FundStylemapWidgetOptions): InfrontWidget;
        fundTopHoldingsWidget(targetElement: any, options: FundTopHoldingsWidgetOptions): InfrontWidget;
        instrumentSingleValueWidget(targetElement: HTMLElement, options: InstrumentSingleValueWidgetOptions): any;
        instrumentSingleValueWidget(targetElement: string, options: InstrumentSingleValueWidgetOptions): any;
        instrumentValuesWidget(targetElement: HTMLElement, options: InstrumentValuesWidgetOptions): any;
        instrumentValuesWidget(targetElement: string, options: InstrumentValuesWidgetOptions): any;
        valuePairWidget(targetElement: HTMLElement, options: ValuePairWidgetOptions): InfrontWidget;
        valuePairWidget(targetElement: string, options: ValuePairWidgetOptions): InfrontWidget;
        wireWidget(targetElement: HTMLElement, options: WireWidgetOptions): InfrontWidget;
        wireWidget(targetElement: string, options: WireWidgetOptions): InfrontWidget;
        swapCalculatorWidget(targetElement: HTMLElement, options: SwapCalculatorOptions): InfrontWidget;
        swapCalculatorWidget(targetElement: string, options: SwapCalculatorOptions): InfrontWidget;
        bondsCalculatorWidget(targetElement: HTMLElement, options: BondsCalculatorOptions): InfrontWidget;
        bondsCalculatorWidget(targetElement: string, options: BondsCalculatorOptions): InfrontWidget;
        simpleChartOverviewWidget(targetElement: HTMLElement, options: SimpleChartOverviewWidgetOptions): InfrontWidget;
        simpleChartOverviewWidget(targetElement: string, options: SimpleChartOverviewWidgetOptions): InfrontWidget;
        orderbookWidget(targetElement: HTMLElement, options: OrderbookWidgetOptions): InfrontWidget;
        orderbookWidget(targetElement: string, options: OrderbookWidgetOptions): InfrontWidget;
        /**
         * Create a status-widget.
         * @param targetElement either the id of a DOM-element as a string, or a reference to a DOM-element directly.
         * @param options options in the form of a map.
         * @returns {StatusWidget}
         */
        statusWidget(targetElement: HTMLElement, options: StatusWidgetOptions): StatusWidget;
        statusWidget(targetElement: string, options: StatusWidgetOptions): StatusWidget;
        /**
         * Create a status-widget.
         * @param targetElement either the id of a DOM-element as a string, or a reference to a DOM-element directly.
         * @param options options in the form of a map.
         * @returns {StatusWidget}
         */
        idsStatusWidget(targetElement: HTMLElement, options: IDSStatusWidgetOptions): IDSStatusWidget;
        idsStatusWidget(targetElement: string, options: IDSStatusWidgetOptions): IDSStatusWidget;
        chartWidget2(targetElement: HTMLElement, options: ChartWidgetOptions2): ComplexChartWidget;
        chartWidget2(targetElement: string, options: ChartWidgetOptions2): ComplexChartWidget;
        alertListWidget(targetElement: HTMLElement, options: AlertListWidgetOptions): AlertListWidget;
        alertListWidget(targetElement: string, options: AlertListWidgetOptions): AlertListWidget;
        alertWidget(targetElement: HTMLElement, options: AlertWidgetOptions): AlertWidget;
        alertWidget(targetElement: string, options: AlertWidgetOptions): AlertWidget;
        indexOverviewWidget(targetElement: HTMLElement, options: IndexOverviewWidgetOptions): IndexOverviewWidget;
        indexOverviewWidget(targetElement: string, options: IndexOverviewWidgetOptions): IndexOverviewWidget;
        newsListWidget(targetElement: any, options: NewsListWidgetOptions): NewsListWidget;
        newsReaderWidget(targetElement: any, options?: NewsReaderWidgetOptions): NewsReaderWidget;
        newsScrollerWidget(targetElement: any, options?: NewsScrollerWidgetOptions): NewsScrollerWidget;
        historicalOverviewWidget(targetElement: HTMLElement, options: HistoricalOverviewWidgetOptions): any;
        historicalOverviewWidget(targetElement: string, options: HistoricalOverviewWidgetOptions): any;
        historyWidget(targetElement: HTMLElement, options: HistoryWidgetOptions): InfrontWidget;
        historyWidget(targetElement: string, options: HistoryWidgetOptions): InfrontWidget;
        heatmapWidget(targetElement: HTMLElement, options: HeatmapWidgetOptions): InfrontWidget;
        heatmapWidget(targetElement: string, options: HeatmapWidgetOptions): InfrontWidget;
        financialCalendarWidget(targetElement: HTMLElement, options: FinancialCalendarWidgetOptions): InfrontWidget;
        financialCalendarWidget(targetElement: string, options: FinancialCalendarWidgetOptions): InfrontWidget;
        brokerstatsWidget(targetElement: HTMLElement, options: BrokerstatsWidgetOptions): InfrontWidget;
        brokerstatsWidget(targetElement: string, options: BrokerstatsWidgetOptions): InfrontWidget;
        intradayTradesWidget(targetElement: HTMLElement, options: IntradayTradesWidgetOptions): InfrontWidget;
        intradayTradesWidget(targetElement: string, options: IntradayTradesWidgetOptions): InfrontWidget;
        intradayTradesSimpleWidget(targetElement: HTMLElement, options: IntradayTradesSimpleWidgetOptions): InfrontWidget;
        intradayTradesSimpleWidget(targetElement: string, options: IntradayTradesSimpleWidgetOptions): InfrontWidget;
        portfolioNameWidget(targetElement: HTMLElement, options: PortfolioNameWidgetOptions): InfrontWidget;
        portfolioNameWidget(targetElement: string, options: PortfolioNameWidgetOptions): InfrontWidget;
        portfolioSelectWidget(targetElement: HTMLElement, options: PortfolioSelectWidgetOptions): InfrontWidget;
        portfolioSelectWidget(targetElement: string, options: PortfolioSelectWidgetOptions): InfrontWidget;
        orderEntryWidget(targetElement: HTMLElement, options: OrderEntryWidgetOptions): InfrontWidget;
        orderEntryWidget(targetElement: string, options: OrderEntryWidgetOptions): InfrontWidget;
        OrderEntryAlgoWidget(targetElement: HTMLElement, options: OrderEntryAlgoWidgetOptions): InfrontWidget;
        OrderEntryAlgoWidget(targetElement: string, options: OrderEntryAlgoWidgetOptions): InfrontWidget;
        OrderEntryHorizWidget(targetElement: HTMLElement, options: OrderEntryHorizWidgetOptions): InfrontWidget;
        OrderEntryHorizWidget(targetElement: string, options: OrderEntryHorizWidgetOptions): InfrontWidget;
        modifyOrderWidget(targetElement: HTMLElement, options: CompactModifyOrderWidgetOptions): InfrontWidget;
        modifyOrderWidget(targetElement: string, options: CompactModifyOrderWidgetOptions): InfrontWidget;
        positionsWidget(targetElement: HTMLElement, options: PositionsWidgetOptions): any;
        positionsWidget(targetElement: string, options: PositionsWidgetOptions): any;
        positionsFlexWidget(targetElement: HTMLElement, options: PositionsFlexWidgetOptions): any;
        positionsFlexWidget(targetElement: string, options: PositionsFlexWidgetOptions): any;
        cashPositionsWidget(targetElement: HTMLElement, options: CashPositionsWidgetOptions): any;
        cashPositionsWidget(targetElement: string, options: CashPositionsWidgetOptions): any;
        ordersWidget(targetElement: HTMLElement, options: OrdersWidgetOptions): any;
        ordersWidget(targetElement: string, options: OrdersWidgetOptions): any;
        tradesWidget(targetElement: HTMLElement, options: TradesWidgetOptions): any;
        tradesWidget(targetElement: string, options: TradesWidgetOptions): any;
        netTradesWidget(targetElement: HTMLElement, options: NetTradesWidgetOptions): any;
        netTradesWidget(targetElement: string, options: NetTradesWidgetOptions): any;
        portfolioValuesWidget(targetElement: HTMLElement, options: PortfolioValuesWidgetOptions): any;
        portfolioValuesWidget(targetElement: string, options: PortfolioValuesWidgetOptions): any;
        singlePortfolioValueWidget(targetElement: HTMLElement, options: PortfolioSingleValueWidgetOptions): any;
        singlePortfolioValueWidget(targetElement: string, options: PortfolioSingleValueWidgetOptions): any;
        tradingPowerWidget(targetElement: HTMLElement, options: TradingPowerWidgetOptions): any;
        tradingPowerWidget(targetElement: string, options: TradingPowerWidgetOptions): any;
        /**
         * Deprecated, use assetsPieChart instead.
         * @param targetElement
         * @param options
         */
        portfolioPie(targetElement: HTMLElement, options: AssetsPieChartOptions): any;
        portfolioPie(targetElement: string, options: AssetsPieChartOptions): any;
        assetsPieChart(targetElement: HTMLElement, options: AssetsPieChartOptions): any;
        assetsPieChart(targetElement: string, options: AssetsPieChartOptions): any;
        portfolioRankingWidget(targetElement: HTMLElement, options: PortfolioRankingWidgetOptions): any;
        portfolioRankingWidget(targetElement: string, options: PortfolioRankingWidgetOptions): any;
        orderStackWidget(targetElement: HTMLElement, options: OrderStackWidgetOptions): any;
        orderStackWidget(targetElement: string, options: OrderStackWidgetOptions): any;
        marketListWidget(targetElement: HTMLElement, options: MarketListWidgetOptions): any;
        marketListWidget(targetElement: string, options: MarketListWidgetOptions): any;
        screenerWidget(targetElement: HTMLElement, options: ScreenerWidgetOptions): any;
        screenerWidget(targetElement: string, options: ScreenerWidgetOptions): any;
        activeFiltersWidget(targetElement: HTMLElement, options: ScreenerWidgetOptions): any;
        activeFiltersWidget(targetElement: string, options: ScreenerWidgetOptions): any;
        bondsTradingWidget(targetElement: HTMLElement, options: BondsTradingWidgetOptions): any;
        bondsTradingWidget(targetElement: string, options: BondsTradingWidgetOptions): any;
        columnChooserWidget(targetElement: HTMLElement, options: ColumnChooserWidgetOptions): any;
        columnChooserWidget(targetElement: string, options: ColumnChooserWidgetOptions): any;
        putCallWidget(targetElement: HTMLElement, options: PutCallWidgetOptions): any;
        putCallWidget(targetElement: string, options: PutCallWidgetOptions): any;
        communicationStatus(targetElement: any, options: CommunicationStatusWidgetOptions): CommunicationStatusWidget;
        notifications(targetElement: any, closeWhenClicked?: boolean): void;
        static parseElementArgument(element: any): HTMLElement;
        infrontRTD(param: string, showErrorStack?: boolean): void;
    }
}
/**
 * Created by hage on 19.01.2015.
 */
declare module Infront {
    class ValueWidgetOptions extends SingleInstrumentWidgetOptions {
        column: any;
        enableChangeStatusColors: boolean;
        rootElement: string;
        dataType: Infront.DataType;
        type: string;
        name: string;
        translate: (lineId: any, value: any) => string;
        content: any;
        onClick: (lineId: any, value: any, extras?: any) => void;
        className: string;
        currencyClassName: string;
        computeFields: string[];
        compute: (lineId: any, args: any[]) => any;
        hover: string;
        showCurrency: boolean;
        currencyField: string;
    }
    /**
     * Abstract superclass for widget that binds to a single value in the cache. This
     * Class contains all code for binding and normal interaction (supports mostly the same options as a column in quoteList), but
     * needs to be subclassed to provide the actual data.
     *
     * Subclasses must set up the right subscriptions/update the cache with the right data and then call buildUI to initiate the widget.
     */
    abstract class ValueWidget extends SingleInstrumentWidgetBase {
        protected options: ValueWidgetOptions;
        column: Field;
        protected rowId: any;
        protected rootEl: HTMLElement;
        constructor(element: HTMLElement, infrontUI: UI, options: ValueWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
    }
    class CachedValueWidgetOptions extends ValueWidgetOptions {
        cacheKey: string;
        cacheKeyConverter: (originalKey: string, col: Field) => string;
    }
    class CachedValueWidget extends ValueWidget {
        protected options: CachedValueWidgetOptions;
        protected assignCacheKey(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        accepts(): string[];
    }
}
declare module Infront {
    class InstrumentSingleValueWidgetOptions extends ValueWidgetOptions {
        cacheKeyConverter: (originalKey: string, col: Field) => string;
    }
    class InstrumentSingleValueWidget extends ValueWidget {
        protected options: InstrumentSingleValueWidgetOptions;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected assignCacheKey(): void;
    }
}
declare module Infront {
    class IntradayTradesSimpleWidgetOptions extends SingleInstrumentWidgetOptions {
        pageItems: number;
        onPriceClick: (price: number) => void;
        onPriceInstrumentClick: (price: number, instrument: Instrument) => void;
        onTickerClick: (instrument: Instrument) => void;
        tickerInHeader: boolean;
        showBuyerAndSeller: boolean;
        showColumnsHeaders: boolean;
    }
    enum TradePriceStatus {
        NORMAL = 0,
        DOWN = -1,
        UP = 1,
    }
    class TradeItem {
        seq_id: number;
        buyer: string;
        seller: string;
        last: number;
        volume: number;
        time: string;
        upDownStatus: TradePriceStatus;
        priceStatus: TradePriceStatus;
        volumeBarSize: number;
    }
    class TradeItemObs {
        seq_id: number;
        buyer: Observable<string>;
        seller: Observable<string>;
        last: Observable<number>;
        volume: Observable<number>;
        time: Observable<string>;
        upDownStatus: Observable<TradePriceStatus>;
        priceStatus: Observable<TradePriceStatus>;
        volumeBarSize: Observable<number>;
        constructor(trade: TradeItem);
        getTrade(): TradeItem;
        setTrade(trade: TradeItem): void;
    }
    class IntradayTradesSimpleWidget extends SingleInstrumentWidgetBase implements InterLibraryLink.Controller, ArrayBindingObserver {
        static kTradePageItems: number;
        enableLink: boolean;
        protected options: IntradayTradesSimpleWidgetOptions;
        private displayTicker;
        private maxVolume;
        private targetManager;
        private cappedItems;
        private itemsBinding;
        private tradesList;
        private tradesListLength;
        private rowsElementsList;
        private rowsMapping;
        private unsubscribe;
        data: ObservableArray;
        private lastItem;
        constructor(element: HTMLElement, infrontUI: UI, options: IntradayTradesSimpleWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        protected removeBindings(): void;
        private reset();
        private updateTradeStatus(trade, prevTrade);
        private updateTradesVolumeBarSize();
        private getMaxVolume();
        private addRow(item, index);
        private updateTradeRow(item, index);
        private priceClicked(item);
        private linkClicked();
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): void;
    }
}
declare module Infront {
    class IntradayTradesWidgetOptions extends CommonListOptions {
        instrument: Instrument;
        pageItems: number;
        paging: boolean;
        columns: any[];
        tickerInHeader: boolean;
    }
    class IntradayTradesWidget extends CommonListWidgetBase implements RowFactory, InterLibraryLink.Target {
        protected options: IntradayTradesWidgetOptions;
        private items;
        private visibleItems;
        private decimals;
        private instrumentDecimals;
        private feedDecimals;
        private currentPage;
        private lowestSequenceNumber;
        private snapReqCount;
        private binding;
        private pager;
        private pageAwaitingData;
        private defaultContentElm;
        private unsubscribe;
        constructor(element: HTMLElement, infrontUI: UI, options: IntradayTradesWidgetOptions);
        protected setColumnManager(): void;
        sortColumnChanged(): void;
        protected setListItems(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        private updateDecimals();
        protected newBuildUI(): void;
        private replaceDefaultContent();
        protected newUnsubscribe(): void;
        protected newDestroyUI(): void;
        getColumnManager(): ColumnManager;
        protected createBindings(): void;
        private sliceAndReplaceVisibleItems(pageChanged?);
        private getOlderTrades();
        private onData(data, prepend?);
        protected newSubscribe(): void;
        createRow(item: any, index: number): HTMLElement;
        private pageChanged(newPage, oldPage);
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
        supportsHasContent(): boolean;
        rowClicked(instrument: any): void;
        linkEvent(instrument: Instrument): void;
    }
}
/**
 * Created by hage on 12.06.2014.
 */
declare module Infront {
    class LanguageOptions {
        language: string;
        dictionary: Object;
    }
    class Language {
        private default;
        private primary;
        private languageMap;
        constructor(options: LanguageOptions);
        get(module: string, key: string): string;
    }
    /**
     * This language map allows for insertion of additional languages by adding a language code / dictionary key value to it.
     * You must add new languages before instantiating Infront.UI.
     */
    var languageMap: Object;
}
/**
 * Created by djuve on 10.03.2017.
 */
declare module Infront {
    enum MarketListFilters {
        BI = 0,
    }
    class MarketListWidgetOptions extends CommonListOptions {
        widgetTitle: string;
        columns: string[];
        linkAction: LinkAction;
        selectedFeedNumber: number;
        filters: MarketListFilters[];
        onFeedSelected: (feed: number) => void;
    }
    class MarketListWidget extends CommonListWidgetBase implements InfrontWidget, InterLibraryLink.Controller, RowFactory, ArrayBindingObserver {
        private static kMySortingColumnKey;
        protected options: MarketListWidgetOptions;
        private feedsToShow;
        private feeds;
        private binding;
        private targetManager;
        private isinTargetManager;
        private selectedRow;
        private initiallySelectedFeedNumber;
        private flagColumnIndex;
        private filters;
        private showProgressIndicator;
        constructor(element: HTMLElement, infrontUI: UI, options: MarketListWidgetOptions);
        protected setListItems(): void;
        protected setColumnManager(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        addMarket(market: MarketInfo): void;
        passesFilters(item: MarketInfo): boolean;
        private createAndBindRootElement();
        createRow(feed: MarketInfo, index: number): HTMLElement;
        rowClicked(marketInfo: MarketInfo): void;
        sortColumnChanged(column: Field, sortOrder: SortOrder, userInteraction: boolean): void;
        private getStoredColumn();
        linkEvent(marketInfo: MarketInfo | any): void;
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
    }
}
declare module Infront {
    class InstrumentValuesWidgetOptions extends SingleInstrumentWidgetOptions {
        layout: MultipleValuesWidgetLayout;
        rememberCanceledLogin: boolean;
        fields: any[];
    }
    class InstrumentValuesWidget extends SingleInstrumentWidgetBase implements TradingManagerObserver {
        protected options: InstrumentValuesWidgetOptions;
        private widget;
        private columns;
        private hasContent;
        constructor(element: HTMLElement, infrontUI: UI, options: InstrumentValuesWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newDestroyUI(): void;
        currentPortfolioChanged(portfolio: Portfolio): void;
        availablePortfoliosChanged(portfolios: Portfolio[]): any;
        currentPortfolioReady(portfolio: Portfolio): any;
    }
    enum MultipleValuesWidgetLayout {
        VERTICAL = 0,
        TABLE_ROW = 1,
    }
    class MultipleValuesWidgetOptions extends WidgetOptions {
        columns: Field[];
        layout: MultipleValuesWidgetLayout;
        decimals: number;
        cacheKey: string;
        cacheKeyConverter: (originalKey: string, column: Field) => string;
    }
    class MultipleValuesWidget extends WidgetBase {
        private static kLanguageKey;
        protected options: MultipleValuesWidgetOptions;
        private subWidgets;
        constructor(element: HTMLElement, infrontUI: UI, options: MultipleValuesWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        private buildVerticalUI(containerFragment);
        private buildTableRowUI(containerFragment);
        private createValueWidgetOpts(column);
        protected newDestroyUI(): void;
    }
    class ExtendedTableRowPopupOptions extends PopupOptions {
        cacheKey: string;
        cacheKeyConverter: (originalKey: string, column: Field) => string;
        columns: Field[];
        width: number;
    }
    class ExtendedTableRowPopup extends Popup {
        private static kDefaultCellWidth;
        protected options: ExtendedTableRowPopupOptions;
        private widget;
        constructor(parent: HTMLElement, anchorTo: HTMLElement, infrontUI: UI, options: ExtendedTableRowPopupOptions);
        destroy(): void;
    }
}
/**
 * Created by hage on 15.07.2014.
 */
declare module Infront {
    class HoldingValuesPopupOptions extends PopupOptions {
        okClick: (entry: WatchlistEntry, changed: boolean) => void;
        cancelClick: () => void;
    }
    class HoldingValuesPopup extends Popup {
        protected options: HoldingValuesPopupOptions;
        private caption;
        private languageHandler;
        private volumeBinding;
        private priceBinding;
        private investedBinding;
        private disableOk;
        private holdingVolume;
        private holdingAvgPrice;
        private holdingInvested;
        private entry;
        private changed;
        constructor(parent: HTMLElement, anchorTo: HTMLElement, caption: string, languageHandler: Language, options: HoldingValuesPopupOptions, entry: WatchlistEntry);
        private doBuildUI();
        private cancelClickListener;
        private keyUp;
        private setValues();
        private inputIsValid();
        private validateInput();
        private volumeInputChanged(text);
        private priceInputChanged(text);
        private investedInputChanged(text);
        private selectClick();
        private okClick();
        private cancelClick();
        destroy(): void;
    }
    class MyListsWidgetOptions extends CommonListOptions {
        instrumentList: () => Infront.Instrument[];
        selectedList: (list: string) => void;
        linkAction: LinkAction;
        hideSearchWidget: boolean;
        hideListSelector: boolean;
        rightAlignSearchBoxDropdown: boolean;
        notificationsTargetElementId: string;
        onInstrumentAdded: (list: string, instrument: Instrument) => void;
        onInstrumentRemoved: (list: string, instrument: Instrument) => void;
    }
    enum WatchlistActions {
        ADD = 0,
        EDIT = 1,
        DELETE = 2,
    }
    class MyListsWidget extends WidgetBase implements IArrayBinding {
        private targetManager;
        private searchBox;
        private static kSelectedListKey;
        protected options: MyListsWidgetOptions;
        private listTitles;
        private listStatus;
        private listSync;
        private selectedList;
        private showMenu;
        private showAddListPopup;
        private showListSelector;
        private confirmIndex;
        private addListObserver;
        private addListPopup;
        private deleteListPopup;
        private listContainer;
        private showDeleteList;
        private enableAdd;
        private editMode;
        private listText;
        private dropdownContainer;
        private quoteList;
        private isReadOnly;
        private showDeleteColumn;
        private absolutePosWrapper;
        private popupWrapper;
        private addInstElement;
        private currentWatchList;
        private currentListName;
        private notificationHandler;
        private quoteListOptions;
        private watchlistUnbind;
        private holdingUnbinds;
        private popupDialog;
        private isEmptyWatchlist;
        private sortIndex;
        private UUID;
        private watclistInstrumentChangeCount;
        private watchlistInstrumentChanged;
        private dropdownLabel;
        private addListPopupInput;
        private addListButton;
        constructor(element: HTMLElement, infront: Model, infrontUI: UI, options: MyListsWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        private setSpecialColChangeStatus(colValue, element);
        private addSpecialColumns(columns);
        private getInvested(entry);
        private getMarketValue(entry);
        private getTotalProfit(entry);
        private showHoldingValuesPopup(instrument);
        private holdingValuesPopupTitle(instrument);
        private updateHolding(entry);
        protected newUnsubscribe(): void;
        private adjustPopupPosition(element);
        private addListClick();
        private editListClick(item);
        private triggerConfirm(action);
        protected newSubscribe(): void;
        protected newDestroyUI(): void;
        private collapsePopup(element);
        private windowClicked;
        private dropdownLabelClicked();
        getColumnManager(): ColumnManager;
        private setSelectedList(list, storeSelected?);
        private editListName(newName, oldName);
        private bindToWatchlist(watchlist);
        private unbindFromWatchlist();
        reInit(items: any[]): void;
        itemAdded(item: any, index: number): void;
        itemRemoved(item: any, index: number): void;
        itemMoved(item: any, oldIndex: number, newIndex: number): void;
        private addListTextChanged(value);
        private addListSpecialKeyPress(keyCode);
        private deleteList(list);
        private deleteListClicked(index);
        private addInstrument(instrument);
        private removeInstrument(instrument);
        private createNotificationMessage(action, list, additional?);
        private triggerNotification(message, timeout);
        private adjustNotificationContainer();
        modify(options: WidgetOptions): void;
        pause(): void;
        resume(): void;
        getInstruments(): Instrument[];
    }
}
declare module Infront {
    class NetTradesWidgetOptions extends TradingWidgetOptions {
        showPortfolio: boolean;
        defaultSortedColumn: string;
        defaultSortOrder: SortOrder;
    }
    class NetTradesWidget extends TradingWidgetBase implements RowFactory {
        private static kRealizedField;
        static kColTicker: string;
        static kColBuyVol: string;
        static kColBuyVWap: string;
        static kColBuyValue: string;
        static kColSellVol: string;
        static kColSellVWap: string;
        static kColSellValue: string;
        static kColNetVolume: string;
        static kColNetValue: string;
        static kColNetRealized: string;
        static kColTickerDesc: string;
        static kColTickerAsc: string;
        static kColBuyVolDesc: string;
        static kColBuyVolAsc: string;
        static kColBuyVWapDesc: string;
        static kColBuyVWapAsc: string;
        static kColBuyValueDesc: string;
        static kColBuyValueAsc: string;
        static kColSellVolDesc: string;
        static kColSellVolAsc: string;
        static kColSellVWapDesc: string;
        static kColSellVWapAsc: string;
        static kColSellValueDesc: string;
        static kColSellValueAsc: string;
        static kColNetVolumeDesc: string;
        static kColNetVolumeAsc: string;
        static kColNetValueDesc: string;
        static kColNetValueAsc: string;
        static kColNetRealizedDesc: string;
        static kColNetRealizedAsc: string;
        protected options: NetTradesWidgetOptions;
        private currentPortfolio;
        private portfolioNameObs;
        private elements;
        private rowCounter;
        private sortedColumn;
        private currentlySortedColumn;
        private currentSortOrder;
        private currentFieldSpec;
        private currentCompareFunc;
        private unsubscribe;
        constructor(element: HTMLElement, infrontUI: UI, options: NetTradesWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        createRow(item: any, index: number): HTMLElement;
        private updateSortedColumn(newSortCol, newSortOrder);
        private updateSortColumnUI();
        private columnClicked(colId);
        currentPortfolioChanged(portfolio: Portfolio): void;
        currentPortfolioReady(portfolio: Portfolio): void;
        protected newDestroyUI(): void;
        supportsHasContent(): boolean;
    }
}
declare module Infront {
    class NewsListWidgetFilter {
        name: string;
        className?: string;
        region?: number;
        feeds?: number[];
    }
    enum NewsListLayout {
        flex = 0,
        table = 1,
    }
    let newsListPeriods: {
        TODAY: {
            startTime: Date;
            endTime: Date;
            maxDays: number;
        };
        YESTERDAY: {
            startTime: Date;
            endTime: Date;
            maxDays: number;
        };
        TWO_DAYS: {
            startTime: Date;
            endTime: Date;
            maxDays: number;
        };
        THREE_DAYS: {
            startTime: Date;
            endTime: Date;
            maxDays: number;
        };
        FOUR_DAYS: {
            startTime: Date;
            endTime: Date;
            maxDays: number;
        };
        FIVE_DAYS: {
            startTime: Date;
            endTime: Date;
            maxDays: number;
        };
        THIS_WEEK: {
            startTime: Date;
            endTime: Date;
            maxDays: number;
        };
        LAST_WEEK: {
            startTime: Date;
            endTime: Date;
            maxDays: number;
        };
        THIS_MONTH: {
            startTime: Date;
            endTime: Date;
            maxDays: number;
        };
        LAST_MONTH: {
            startTime: Date;
            endTime: Date;
            maxDays: number;
        };
    };
    class NewsListWidgetOptions extends WidgetOptions {
        streaming: boolean;
        columns: Object[];
        instrument: Instrument;
        instruments: Instrument[];
        feeds: number[];
        maxItems: number;
        maxDays: number;
        paging: boolean;
        pageItems: number;
        enableRegionSelector: boolean;
        enableSourceSelector: boolean;
        enableQuickFilter: boolean;
        enableUserFilter: boolean;
        enableDateSelector: boolean;
        selectableDates: string[];
        infinitiveScroll: boolean;
        types: string[];
        preSelectedRegions: any[];
        preSelectedDate: any[];
        preSelectNews: boolean;
        useLightbox: boolean;
        customFilters: NewsListWidgetFilter[];
        filterFunction: (newsItem: any) => boolean;
        onNewsItemSelected: (newsItem: any) => void;
        cssURL: string;
        layout: NewsListLayout;
        enableHeaderLine: boolean;
        preventDefault: boolean;
        retrieveData: () => Instrument[] | Instrument | any;
        showFlashNewsFilter: boolean;
        showFlashNewsOnly: boolean;
        onPageChange: (pageIndex: number) => void;
        showTickerInHeader: boolean;
        onSelectTimePeriod: (item: any) => void;
        onDataLoaded: (updated: boolean) => void;
    }
    class NewsListWidget extends WidgetBase implements InterLibraryLink.Controller, InterLibraryLink.Target {
        private static kMyStoredSourcesKey;
        private static kMyStoredFiltersKey;
        private static kMyStoredShowFlashNewsOnlyKey;
        static kLanguageKey: string;
        static kNewsTimestampField: string;
        static kNewsSourceField: string;
        static kNewsShortSourceField: string;
        static kNewsIsFlashField: string;
        static kNewsSourceAllSources: string;
        static kNewsSourceNoSource: string;
        static kCustomFilterIdField: string;
        static kIsUpdated: string;
        static kNewsFeed: string;
        static kProductCode: string;
        private static kCustomFilterNoneSelectedId;
        protected options: NewsListWidgetOptions;
        private overlay;
        private reader;
        private selectedPeriod;
        private filterText;
        private displayedItems;
        private displayObserver;
        private allFilteredNewsItems;
        private unfilteredItems;
        private currentPage;
        private pageBreakOffset;
        private numberOfPages;
        private prevEnabled;
        private nextEnabled;
        private initialLoad;
        private newStartTime;
        private newsIdHint;
        private newsAmount;
        private newsFactor;
        private userFilterName;
        private newsSources;
        private allRegions;
        private allSources;
        private subscribedSources;
        private sourcesDropDown;
        private dropdownItems;
        private datesDropDown;
        private selectableDates;
        private maxDays;
        private showCategory;
        private showUserFilterMenu;
        private subscribed;
        private customFilters;
        private selectedCustomFilter;
        private userFilters;
        private quickFilterObserver;
        private addUserFilterObserver;
        private linkedTargets;
        private newsRequestCounter;
        private ItemsReceivedPrevRequest;
        private unsubscribe;
        private initMaxItems;
        private initPageItems;
        private filteredRequestCount;
        private static startHighlightTag;
        private static endHighlightTag;
        private showFlashNewsOnly;
        private dropdownContainer;
        private userInput;
        private colHandlers;
        ticker: Observable<string>;
        private userInteraction;
        private elm;
        constructor(element: HTMLElement, infrontUI: UI, options: NewsListWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        protected newDestroyUI(): void;
        private populateRegionsAndSources(data);
        private addSourcesToRegions();
        private getSourceItemsFromFeeds(feeds);
        private getAllSourcesForRegion(region);
        private getStoredSources();
        private storeSelectedSources();
        /**
         * Returns the initial sources that should be pre-selected according to defaults & storage
         */
        private getInitialSources();
        private regionNameToRegion(regionString);
        private createDropDowns(dropDownContainer, sourceDdContainer);
        private createShowFlashNewsOnlyFilter();
        private newsSourcesChanged(items);
        private getSubscribedFeeds();
        private windowClick;
        private initUserFilters();
        private storeUserFilters();
        private userFilterDropDownClicked();
        private userFilterClicked(item);
        private addUserFilterTextChanged(value);
        private itemSelected(item);
        private deleteUserFilter(item);
        private saveUserFilter(keyCode);
        private filterChanged(text);
        private customFilterSelected(item);
        private isFirstPage();
        private nextPage();
        private prevPage();
        /**
         * When we navigate back to the first page, we get all new data and clear our items-cache.
         */
        private goToFirstPage();
        private resetAndGetNews();
        private resetNewsItemsCache();
        private getNewsItems(itemCount?);
        private subscribeNews();
        private itemIsQualified(item);
        updateFilter(): void;
        preProcessItem(item: Object): void;
        highlightTextThatMatchesFilter(filterText: string, originalText: string): string;
        removeHighlight(): void;
        removeHighlightTags(originalText: string): string;
        private updateDisplay();
        fillNextPage(itemCount?: number): void;
        private showError();
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
        updateList(value: any): void;
    }
}
declare module Infront {
    class NewsReaderWidgetOptions extends WidgetOptions {
        cssURL: string;
        newsItem: any;
    }
    class NewsReaderWidget extends WidgetBase implements InfrontWidget, InterLibraryLink.Target {
        protected options: NewsReaderWidgetOptions;
        private currentNewsItem;
        private headline;
        private timestamp;
        private source;
        private iFrame;
        constructor(element: HTMLElement, infrontUI: UI, options: NewsReaderWidgetOptions);
        protected newInit(): void;
        protected newBuildUI(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        private setNewsItem(newItem);
        private getNewsBody();
        private showError();
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
        modify(options: WidgetOptions): void;
    }
}
declare module Infront {
    class NewsObject {
        type: number;
        headline: string;
        time: string;
        news_id: string;
        news_feed: number;
        url: URL;
        constructor(type: number, headline: string, time: string, id: string, feed: number, url: URL);
    }
    class NewsScrollerWidgetOptions extends WidgetOptions {
        streaming: boolean;
        columns: Object[];
        feeds: number[];
        maxItems: number;
        maxDays: number;
        cssURL: string;
        readTime: number;
        onNewsItemSelected: (item: NewsObject) => void;
    }
    class NewsScrollerWidget extends WidgetBase implements InterLibraryLink.Controller {
        protected options: NewsScrollerWidgetOptions;
        private newsSourceArray;
        private newsRequestCounter;
        private unsubscribe;
        private newEndTime;
        private newStartTime;
        private newsElements;
        private loopTimeout;
        private overlay;
        private reader;
        private linkedTargets;
        constructor(element: HTMLElement, infrontUI: UI, options: NewsScrollerWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        private itemSelected(item);
        protected newBuildUI(): void;
        protected newUnsubscribe(): void;
        private updateDisplay();
        private getNews();
        protected newSubscribe(): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        destroy(): void;
    }
}
declare module Infront {
    class NotificationOptions {
        id: string;
        message: string;
        timeout: number;
        type: NotificationType;
        payload: any;
        groupById: boolean;
        groupMaxCount: number;
        onClick: (id: string, payload?: any) => void;
        onClose: (id: string) => void;
    }
    enum NotificationType {
        SUCCESS = 0,
        ALERT = 1,
        INFO = 2,
        ERROR = 3,
    }
    class Notifications implements IArrayBinding {
        private static kGroupMore;
        private element;
        private notifications;
        private visible;
        private closeWhenClicked;
        constructor(element: HTMLElement, closeWhenClicked?: boolean);
        notify(message: NotificationOptions): any;
        notify(message: string, timeoutSeconds: number, type: NotificationType, payload?: any, onClick?: (payload: any) => void): any;
        private doNotify(options);
        private buildUI();
        private notificationClicked(internalId);
        reInit(values: any[]): void;
        itemAdded(item: any, index: number): void;
        itemRemoved(item: any, index: number): void;
        itemMoved(item: any, oldIndex: number, newIndex: number): void;
        private closeNotification(internalId);
        private lookup(internalId);
    }
}
/**
 * Created by hage on 29.08.2014.
 */
declare module Infront {
    enum OrderbookRowLayout {
        WIDE = 0,
        COMPACT = 1,
    }
    class OrderBookTitleSettings {
        showTicker: boolean;
        showPctChange: boolean;
        showAbsoluteChange: boolean;
    }
    class OrderbookWidgetOptions extends SingleInstrumentWidgetOptions {
        levels: number;
        layout: OrderbookRowLayout;
        hideOrders: boolean;
        streaming: boolean;
        onPriceClick: (price: number, orderType: string) => void;
        onPriceInstrumentClick: (price: number, orderType: string, instrument: Instrument) => void;
        onTickerClick: (instrument: Instrument) => void;
        volumeBarHeight: string;
        legacyMode: boolean;
        showFooter: boolean;
        titleSettings: OrderBookTitleSettings;
    }
    class OrderbookWidget extends SingleInstrumentWidgetBase implements InterLibraryLink.Controller, ArrayBindingObserver {
        static kOrderbookAllLevels: number;
        protected options: OrderbookWidgetOptions;
        private displayTicker;
        private maxVolume;
        private cappedMaxVolume;
        enableLink: boolean;
        private cappedBids;
        private cappedAsks;
        private asksBinding;
        private bidsBinding;
        private avoidCache;
        private bidRowElements;
        private askRowElements;
        private bidRows;
        private askRows;
        private pctChange;
        private change;
        private bidRatio;
        private askRatio;
        private bidSize;
        private askSize;
        private spread;
        private headerValueWidgets;
        private targetManager;
        private unsubscribe;
        constructor(element: HTMLElement, infrontUI: UI, options: OrderbookWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        private addChangeFieldToHeader(element, field);
        protected newSubscribe(): void;
        protected newDestroyUI(): void;
        private addOrUpdateItem(rowItem, isBid);
        private getMaxVolume();
        protected createBindings(): void;
        protected newUnsubscribe(): void;
        protected removeBindings(): void;
        protected computeBarWidth(args: any[]): number;
        private createBidRow(item, index);
        private createAskRow(item, index);
        private priceClicked(item, type);
        private reset();
        private linkClicked();
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): void;
    }
}
declare module Infront {
    class OrderEntryAlgoWidgetOptions extends WidgetOptions {
        strategy: Strategy;
        fieldChangeCallback: () => void;
        fieldClickedCallback: () => void;
    }
    class OrderEntryAlgoWidget extends WidgetBase {
        protected options: OrderEntryAlgoWidgetOptions;
        private selectedStrategy;
        private algoName;
        private message;
        private algoFields;
        private algoFieldsData;
        private confirmMode;
        private inputFieldClicked;
        constructor(element: HTMLElement, infrontUI: UI, options: OrderEntryAlgoWidgetOptions);
        protected newInit(): void;
        private customInit();
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
        private paramIsVisible(param);
        private updateUIForSelectedStrategy();
        reset(): void;
        private getLabel(param);
        private createAlgoParamInputField(param);
        private createAlgoParamDropdownField(param);
        private createAlgoParamDateField(param);
        private createAlgoParamTimeField(param);
        private createAlgoParamFreeTextField(param);
        private algoFieldChanged(value);
        private clearFields();
        private isNumberField(type);
        private applyTextValidators(binding, param);
        setPrice(value: number): void;
        validateInput(): boolean;
        initModify(cacheKey: string): void;
        modifyOrder(order: ModifyOrderOptions): void;
        populateOrder(order: InsertOrderOptions): void;
        private getDropdownIndexOfValue(items, value);
        private applyFieldValue(id, value);
        private applyOrderAlgoParams(params);
        populateFromCurrentOrder(order: InsertOrderOptions): void;
        populateFromModifyOrder(order: ModifyOrderOptions): void;
        setConfirmMode(value: boolean): void;
    }
}
declare module Infront {
    class OrderEntryCustomFieldsWidgetOptions extends WidgetOptions {
        customFields: CustomFields;
        orderType: string;
        fieldChangeCallback: (componentCode: string) => void;
        fieldClickedCallback: () => void;
    }
    class OrderEntryCustomFieldsWidget extends WidgetBase {
        protected options: OrderEntryCustomFieldsWidgetOptions;
        private customFields;
        private customFieldsData;
        private confirmMode;
        private hasAnyMandatoryField;
        fields: CustomFields;
        hasMandatory(): boolean;
        private inputFieldClicked;
        constructor(element: HTMLElement, infrontUI: UI, options: OrderEntryCustomFieldsWidgetOptions);
        protected newInit(): void;
        private customInit();
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
        reset(): void;
        private getLabel(item);
        private setIsHidden(item);
        private createCustomFieldItemInputField(item);
        private createCustomFieldItemDateField(item);
        private createCustomFieldItemDropdownField(item);
        private createCustomFieldItemFreeTextField(item);
        private customFieldChanged(value, componentCode?);
        checkCommentFieldIsMandatory(): boolean;
        private clearFields();
        private prefixNeeded(item);
        private prefixed(item, value);
        private unPrefix(item, value);
        private isNumberField(type);
        private applyTextValidators(binding, item);
        setPrice(value: number): void;
        validateInput(): boolean;
        initModify(cacheKey: string): void;
        private getDropdownIndexOfValue(items, value);
        private applyFieldValue(id, value);
        private applyOrderCustomFieldsItems(items);
        modifyOrder(order: ModifyOrderOptions): void;
        populateOrder(order: InsertOrderOptions): void;
        populateFromCurrentOrder(order: InsertOrderOptions): void;
        populateFromModifyOrder(order: ModifyOrderOptions): void;
        setConfirmMode(value: boolean): void;
    }
}
declare module Infront {
    enum OrderState {
        PENDING = 0,
        FAILED = 1,
        SUCCESS = 2,
    }
    enum OrderEntryConfirmation {
        NONE = 0,
        SIMPLE = 1,
        EXTERNAL = 2,
    }
    enum AdvancedOrderType {
        NORMAL = 0,
        STOP_LOSS = 1,
        TRAILING_STOP = 2,
    }
    class OrderEntryConfirmScreenButton {
        label: string;
        onclick: () => void;
    }
    class OrderEntryHorizWidgetOptions extends TradingWidgetOptions {
        modifyOrder: number;
        instrument: Instrument;
        initialPrice: any;
        enabledFeeds: number[];
        autoselectAfterTab: boolean;
        searchTickersOnly: boolean;
        confirmation: OrderEntryConfirmation;
        confirmationCallback: (order: Object) => void;
        confirmScreenButtons: OrderEntryConfirmScreenButton[];
    }
    class OrderEntryHorizWidget extends TradingWidgetBase implements InfrontWidget, InterLibraryLink.Controller, InterLibraryLink.Target {
        static pendingStatuses: string[];
        static successStatuses: string[];
        static rejectedStuses: string[];
        static defaultTradeableInstrumentTypes: string[];
        static kNoOrderType: string;
        protected options: OrderEntryHorizWidgetOptions;
        private decimals;
        private volumeBinding;
        private priceBinding;
        private disableBuySell;
        private currentInstrument;
        private portfolios;
        private currentPortfolio;
        private currentPrice;
        private currentVolume;
        private orderTotal;
        private owned;
        private tradingPower;
        private ownedUnbinding;
        private tpUnbinding;
        private dateSelector;
        private searchBox;
        private step;
        private currentOrder;
        private currentValidity;
        private confirmPrice;
        private confirmVolume;
        private confirmOrderType;
        private confirmValidity;
        private confirmOpenVolume;
        private confirmTriggerPrice;
        private confirmLimitPrice;
        private confirmTrailLimit;
        private confirmDeviation;
        private confirmTriggerLimit;
        private currency;
        private message;
        private advancedOrderType;
        private ticker;
        private actualPrice;
        private actualVolume;
        private filled;
        private avgPrice;
        private orderStatus;
        private orderState;
        private orderStateText;
        private errorMessage;
        private orderStatusUnbind;
        private targetManager;
        private advancedOptions;
        private strategies;
        private isInitialized;
        private modifyMode;
        private modifyOptions;
        private modifyOrderType;
        private modifyAlgoId;
        constructor(element: HTMLElement, infrontUI: UI, options: OrderEntryHorizWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected onTradingConnected(): void;
        protected onTradingDisconnected(): void;
        protected onTradingReconnecting(): void;
        protected onTradingReconnected(): void;
        private init();
        private initModify();
        private loadAdvanceModifyValues(cacheKey);
        private updateOwned();
        private updateTotal();
        private validateInput();
        private snapshot(snapshot);
        private loadStrategies();
        protected newBuildUI(): void;
        private filterResultItem(resultItem);
        private instrumentSelected(instrument);
        private advancedTabSelected(tabId);
        private createAlgoParams(selectedTab, advancedValues, parsedValidUntil);
        private modifyClicked();
        private buttonClicked(buyOrSell);
        confirmOrder(): void;
        cancelOrder(): void;
        private confirmClicked();
        private cancelClicked();
        private showInsertOrderError(error_message);
        private showOrderFeedback(orderId);
        private reset();
        private volumeInputChanged(text);
        private priceInputChanged(text);
        /**
         * TradingManagerObserver
         */
        availablePortfoliosChanged(portfolios: Portfolio[]): void;
        currentPortfolioChanged(portfolio: Portfolio): void;
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        /**
         * InfrontWidget
         */
        modify(options: OrderEntryHorizWidgetOptions): void;
        destroy(): any;
        createAdvancedOptionsWidget(element: any): InfrontWidget;
    }
    enum AdvancedOEOrderType {
        FILL_ANY = 0,
        FILL_AND_KILL = 1,
        FILL_OR_KILL = 2,
    }
    enum AdvancedOEStopLossCondition {
        LOWER_EQUAL = 0,
        GREATER_EQUAL = 1,
    }
    enum AdvancedOETriggerLimit {
        PERCENT = 0,
        TICKS = 1,
    }
    class AdvancedOEValues {
        openVolume: number;
        orderMethod: AdvancedOEOrderType;
        stopLossCondition: AdvancedOEStopLossCondition;
        triggerPrice: number;
        limitPrice: number;
        triggerLimit: AdvancedOETriggerLimit;
        trailLimit: number;
        deviation: number;
    }
    class AdvancedOEOptionsWidget extends WidgetBase implements InfrontWidget {
        static kLanguageKey: string;
        static kStopLossAlgo: string;
        static kStopLossAlgoId: string;
        static kTriggerConditionId: string;
        static kTriggerCondGteVal: string;
        static kTriggerCondLteVal: string;
        static kTriggerPriceId: string;
        static kLimitPriceId: string;
        static kTrailingStopLossTicksAlgoId: string;
        static kTrailingStopLossPctAlgoId: string;
        static kTriggerValidityId: string;
        static kTrailLimitId: string;
        static kDeviationPctId: string;
        static kDeviationTicksId: string;
        static kLanguageModule: string;
        static kOpenVolumeTab: string;
        static kStopLossTab: string;
        static kTrailingStopLossTab: string;
        private static orderMethodMap;
        tabBar: TabbedContainer;
        private selectedTab;
        ovInput: TextInputBinding;
        ovType: RadioInputBinding;
        slCondition: SelectInputBinding;
        slTriggerPrice: TextInputBinding;
        slLimitPrice: TextInputBinding;
        tsTriggerLimit: SelectInputBinding;
        tsTrailLimit: TextInputBinding;
        tsDeviation: TextInputBinding;
        private tsTriggerLimitSelectedIndex;
        private onTabSelect;
        constructor(element: HTMLElement, infrontUI: UI, onTabSelect?: (tabId: string) => void);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        reset(): void;
        getSelectedTab(): string;
        setSelectedTab(tabId: string): void;
        getOptions(): AdvancedOEValues;
        private buildUI();
        modify(options: WidgetOptions): void;
        destroy(): void;
    }
}
declare module Infront {
    import Instrument = Infront.Instrument;
    class KidDefinition {
        URL: string;
        DisplayName: string;
        SymbolTypes: string;
    }
    enum OrderEntryState {
        DATA_ENTRY = 0,
        CONFIRM = 1,
        MODIFY = 2,
        SUCCESS = 3,
        ERROR = 4,
    }
    enum OrderAction {
        INSERT = 0,
        MODIFY = 1,
        DELETE = 2,
    }
    class LimitOrderData {
        validitySelector: SelectInputBinding;
        validityItems: ObservableArray;
        validSessionItem: CustomFieldItem;
        validSessionItemIndex: number;
        dateSelector: DateSelector;
        dateSelectorIndex: number;
        dateVisible: Observable;
        timeSelector: TimeSelector;
        timeSelectorIndex: number;
        timeVisible: Observable;
        activeObs: CheckBoxInputBinding;
        activeVisible: Observable;
        activeBtnTitle: Observable<string>;
        openVolObs: TextInputBinding;
        commentObs: TextInputBinding;
        statusUnbind: () => void;
        private populateToOrder(order);
        populateOrder(order: InsertOrderOptions): void;
        modifyOrder(order: ModifyOrderOptions): void;
        private populateFromOrder(order);
        populateFromCurrentOrder(order: InsertOrderOptions): void;
        populateFromModifyOrder(order: ModifyOrderOptions): void;
    }
    enum PortfolioSelectorMode {
        name = "name",
        fullName = "fullName",
        nameFullName = "nameFullName",
    }
    class OrderEntryWidgetOptions extends TradingWidgetOptions {
        instrument: Instrument;
        compactMode: boolean;
        initialPrice: any;
        autoSelectAfterTab: boolean;
        availableFeeds: number[];
        searchTickersOnly: boolean;
        algoId: string;
        modifyOrderId: number;
        modifyPortfolio: string;
        confirmation: boolean;
        closeOnComplete: boolean;
        keepInstrumentOnNew: boolean;
        advancedOptionsCallback: (showAdvanced: boolean) => void;
        closeCallback: () => void;
        instrumentInfoCallback: (showInstrumentInfo: boolean) => void;
        portfolioChangedCallback: (portfolio: Portfolio) => void;
        kidLinkDefinition: KidDefinition;
        customKidMidCalculation: (feedNu: number, mic: string) => string;
        customKidMidUrlParameter: string;
        advancedOptionsCreated: (element: HTMLElement) => void;
        enableTickButtons: boolean;
        portfolioSelectorMode: PortfolioSelectorMode;
        hasInstrument(): boolean;
    }
    class OrderEntryWidget extends TradingWidgetBase implements InterLibraryLink.Target, InterLibraryLink.Controller {
        static kComputedVolume: string;
        static kLanguageKey: string;
        static LABEL: string;
        static defaultTradableInstrumentTypes: string[];
        private static kOEStoredTradableFeeds;
        private static kOEStoredInstrument;
        private static kOEStoredVolume;
        private tradingManager;
        protected options: OrderEntryWidgetOptions;
        private algoElement;
        private customFieldsElement;
        private commentFieldElement;
        private portfolioElement;
        private orderTypesElement;
        private algoTypesElement;
        private limitOrderElement;
        private advancedPanelElement;
        private compactMode;
        private caption;
        private advancedCaption;
        private statusMessage;
        private errorMessage;
        private algoWidget;
        private customFieldsWidget;
        private advancedMode;
        private ticker;
        private searchBox;
        private searchBoxOptions;
        private currentPrice;
        private currentVolume;
        private currentIceBerg;
        private currentOpenVolume;
        private decimals;
        private volumeBinding;
        private priceBinding;
        private orderTotal;
        private owned;
        private ownedUnbinding;
        private tradingPower;
        private tpUnbinding;
        private orderStatusUnbind;
        private orderAction;
        private orderState;
        private disableInput;
        private disableOrderTypeSelector;
        private advancedValid;
        private disableBuySell;
        private tickSizeValid;
        private openVolumeValid;
        private warningOpenVolume;
        private modifyOptions;
        private isInitialized;
        private orderTypes;
        private orderTypeObserver;
        private orderTypesMapping;
        private algoTypes;
        private algoTypeObserver;
        private selectedOrderTypeIx;
        private currentInstrument;
        private kidUrl;
        private kidTitle;
        private tradableFeeds;
        private portfolios;
        private currentPortfolio;
        private portfolioObserver;
        private limitOrderData;
        private currentOrder;
        private buyOrSell;
        private algoId;
        private algoIndex;
        private baseCurrency;
        private instrumentCurrency;
        private tickSizes;
        private isSendingRequest;
        private targetManager;
        private customFields;
        private hasPrice;
        private hasOpenVol;
        private supportedOrderTypes;
        private supportedMaxValidDays;
        private initSteps;
        private forceOrderTypeUpdate;
        private isOrderActive;
        private hasParentOrder;
        private contractSizeBinding;
        private marketPriceBinding;
        private modifyOrderStatus;
        private commentFieldIsVisible;
        private commentFieldIsMandatory;
        private prevFeed;
        private orderTypesWithoutPrice;
        constructor(element: HTMLElement, infrontUI: UI, options: OrderEntryWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected onTradingConnected(): void;
        protected onTradingDisconnected(): void;
        protected onTradingReconnecting(): void;
        protected onTradingReconnected(): void;
        setFocus(): void;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
        private init();
        private initModify();
        private modifyRemainingVolume();
        private initModifyOrderTypeSettings();
        private initModifyLimitOrder(cacheKey);
        private getAlgos();
        private getCustomFields();
        private getTradableFeeds();
        private scrollPrice(event);
        private scrollOpenVolume(event);
        private scrollVolume(event);
        private setPriceByTick(keyCode);
        private increasePrice(keyCode);
        private increaseVolume(keyCode);
        private increaseOpenVolume(keyCode);
        private getInstrumentTickSize();
        private getTickSizes(tickSizeId);
        private findMarket(feed, markets);
        private insertDefaultOrderTypes();
        private receiveOrderTypes(data);
        private populateOrderTypes();
        private insertStandardOrderTypes();
        private isAlgoOrderType();
        private getAlgoType();
        private hasTradingFeature(feature, feed?);
        private hasTradingFeature2(feature, feed?);
        private hasTradingFeature3(feature, feed?);
        private createCustomFieldWidget();
        private destroyCustomFieldWidget();
        private customFieldChanged(componentCode);
        private createAlgoFieldWidget();
        private destroyAlgoFieldWidget();
        private algoFieldChanged();
        private orderSupportsPrice();
        private orderSupportsOpenVol();
        private orderSupportsGoodTillDate();
        private orderSupportsGoodTillTime();
        private updateUIForSelectedOrderType(OrderTypeIndex);
        private updateUIForSelectedPortfolio(selectedIndex);
        private updateValidity();
        private createOrderTypeSelector();
        private createAlgoTypeSelector();
        private createLimitOrderWidget();
        setCommentFieldVisibility(): void;
        createCommentFieldWidget(): void;
        private destroyLimitOrderWidget();
        private ActiveCheckBoxVisible();
        private ActivateButtonVisible();
        activeToggled(): void;
        private setActiveStatus(doActive);
        private attachSearchBoxToElement(searchBoxEl);
        private setSearchBoxInstrument(instrument);
        static filterResultItem(resultItem: Object): boolean;
        private resetAdvancedOptions();
        private snapshot(data);
        private instrumentSelected(instrument, store?);
        private customKidMidCalculation(feedNu, mic);
        private showKID(symbolType, subtype);
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        private isModifyMode();
        modify(options: OrderEntryWidgetOptions): void;
        reset(): void;
        private initWhenReady();
        private updateTotal();
        private updateOwned();
        private conformsToOpenVolumeRules(volume);
        private conformsToTickSizeRules(price);
        validateInput(): void;
        private OpenVolumeChanged(text);
        private volumeInputChanged(text);
        private priceInputChanged(text);
        private getOrderType();
        private setOrderType(orderType);
        private getOpenVolume();
        private createOrder(buyOrSell);
        private createModifyOrder();
        private populateFromCurrentOrder();
        private populateFromModifyOrder();
        private getBuyOrSellStr();
        private getTGW();
        private getTGWStr();
        private inputFieldSelected();
        private resetOrderEntryState();
        private setOrderEntryState(newState);
        private prepareOrder(buyOrSell);
        private showOrderStatus(portfolio, orderId);
        private insertOrder();
        private insertModifyOrder();
        private storeVolume(instrument, volume);
        private deleteOrder();
        private buyClicked();
        private sellClicked();
        private confirmClicked();
        private cancelClicked();
        private modifyClicked();
        private deleteClicked();
        private newClicked();
        private closeClicked();
        private deleteOrderCallback(result);
        private insertOrderCallback(result);
        private modifyOrderCallback(result);
        private displayErrorMessage(context, error_message);
        updatePortfolioGUI(portfolioName: string): void;
        availablePortfoliosChanged(portfolios: Portfolio[]): void;
        currentPortfolioChanged(portfolio: Portfolio): void;
        private setupTradingPowerCurrencyConverter();
        private applyAdvancedMode(sendCallback);
        toggleAdvancedMode(event: any): void;
        setAdvancedMode(value: boolean, sendCallback?: boolean): void;
    }
}
/**
 * Created by Andreas on 20.04.2016.
 */
declare module Infront {
    class OrderStackWidgetOptions extends TradingWidgetOptions {
        orderClicked: (portfolio: string, orderId: number) => void;
        computedAvgPrice: boolean;
    }
    class AlgoID {
        static TRAILING_STOP_LOSS_TICK: string;
        static TRAILING_STOP_LOSS_PCT: string;
        static STOP_LOSS: string;
    }
    class OrderStackWidget extends TradingWidgetBase implements RowFactory, IArrayBinding {
        static includedStates: string[];
        static activeStates: string[];
        protected options: OrderStackWidgetOptions;
        private syncUnbind;
        private items;
        private sync;
        private itemUnbinds;
        private statusLabels;
        private limitLabels;
        private conditionLabels;
        private suffixLabels;
        private overrideStatus;
        private orderTypesWithoutPrice;
        private decimals;
        constructor(element: HTMLElement, infrontUI: UI, options: OrderStackWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
        private isActiveOrder(item);
        private orderClicked(item, index, event);
        private orderSupportsPrice(orderType);
        /**Handlers are for determining what the labels are going to be bound to**/
        private statusHandler(item);
        private limitHandler(item);
        private getCustomFields(item, callback);
        private conditionHandler(item);
        private suffixHandler(item);
        private updateLimit(item, value);
        private updateCondition(item, value);
        private updateSuffix(item, value);
        private updateOrderStatus(item, status);
        createRow(item: any, index: number): HTMLElement;
        currentPortfolioChanged(portfolio: Portfolio): void;
        private getInstrumentFromOrder(item);
        private getBidAskFromOrderPosition(item);
        private unsubscribe(item);
        private subscribe(item);
        reInit(items: any[]): void;
        private unbindItem(item);
        itemAdded(item: any, index: number): void;
        itemRemoved(item: any, index: number): void;
        itemMoved(item: any, oldIndex: number, newIndex: number): void;
        supportsHasContent(): boolean;
    }
}
/**
 * Created by hage on 17.06.2014.
 */
declare module Infront {
    class Overlay {
        private box;
        private closeBtn;
        private overlayVisible;
        languageHandler: Language;
        constructor();
        show(): void;
        hide(): void;
        getCloseBtn(): HTMLElement;
        getBox(): HTMLElement;
        private buildUI();
    }
}
/**
 * Created by hage on 09.03.2015.
 */
declare module Infront {
    class PortfolioRankingWidgetOptions extends TradingWidgetOptions {
        maxItems: number;
    }
    class PortfolioRankingWidget extends TradingWidgetBase implements ArrayBindingObserver, RowFactory {
        private static kLanguageKey;
        private static kPaddingItem;
        protected options: PortfolioRankingWidgetOptions;
        private winners;
        private losers;
        private winnersCap;
        private losersCap;
        private winnersSync;
        private losersSync;
        private winnersSyncUnbind;
        private losersSyncUnbind;
        private biggestLoser;
        private biggestWinner;
        private biggestAbsValue;
        private unbindingManager;
        private rebindUI;
        private elements;
        constructor(element: HTMLElement, infrontUI: UI, options: PortfolioRankingWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        private subscribe(item);
        private unsubscribe(item);
        protected newBuildUI(): void;
        protected createBindings(): void;
        protected removeBindings(): void;
        protected newDestroyUI(): void;
        private getInstrumentFromCache(cacheKey);
        /**
         * RowFactory
         */
        createRow(item: any, index: number): HTMLElement;
        /**
         * ArrayBindingObserver
         */
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): any;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): any;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): any;
        /**
         * TradingManagerObserver
         */
        currentPortfolioChanged(portfolio: Portfolio): any;
        currentPortfolioReady(portfolio: Portfolio): void;
    }
    class TopElementObserver implements IArrayBinding {
        topValue: ObservableBinding;
        private topElementUnbind;
        private cache;
        private array;
        constructor(cache: BindingCache, array: ObservableArray);
        private setTopItem(item);
        reInit(items: any[]): void;
        itemAdded(item: any, index: number): void;
        itemRemoved(item: any, index: number): void;
        itemMoved(item: any, oldIndex: number, newIndex: number): void;
    }
}
declare module Infront {
    class PortfolioSingleValueWidgetOptions extends ValueWidgetOptions {
        valueName: string;
        name: string;
        onClick: () => void;
    }
    class PortfolioSingleValueWidget extends ValueWidget implements TradingManagerObserver {
        protected options: PortfolioSingleValueWidgetOptions;
        private portfolioName;
        constructor(element: HTMLElement, infrontUI: UI, options: PortfolioSingleValueWidgetOptions);
        protected newInit(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        availablePortfoliosChanged(portfolios: Portfolio[]): void;
        currentPortfolioChanged(portfolio: Portfolio): void;
        currentPortfolioReady(portfolio: Portfolio): void;
        private updatePortfolio(portfolio);
        protected newBuildUI(): void;
        private getPortfolioValue();
        protected finalize(): void;
        protected assignCacheKey(): void;
    }
    class TradingPowerWidgetOptions extends ValueWidgetOptions {
        base: boolean;
    }
    class TradingPowerWidget extends ValueWidget implements TradingManagerObserver {
        private static kBaseCurrencyCacheField;
        private portfolio;
        constructor(element: HTMLElement, infrontUI: UI, options: TradingPowerWidgetOptions);
        protected newInit(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        availablePortfoliosChanged(portfolios: Portfolio[]): void;
        currentPortfolioChanged(portfolio: Portfolio): void;
        currentPortfolioReady(portfolio: Portfolio): void;
        private updatePortfolio(portfolio);
        protected assignCacheKey(): void;
        protected finalize(): void;
    }
}
/**
 * Created by hage on 16.02.2015.
 */
declare module Infront {
    class PortfolioValuesWidgetOptions extends TradingWidgetOptions {
        values: string[];
        filter: (name: string, value: any) => boolean;
    }
    class PortfolioValuesWidget extends TradingWidgetBase implements RowFactory, ArrayBindingObserver {
        protected options: PortfolioValuesWidgetOptions;
        private items;
        private sync;
        private filter;
        private syncUnbind;
        private currentPortfolio;
        constructor(element: HTMLElement, infrontUI: UI, options: PortfolioValuesWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
        protected onTradingConnected(): void;
        protected onTradingDisconnected(): void;
        private getPortfolioValues();
        /** RowFactory **/
        createRow(item: any, index: number): HTMLElement;
        /** ArrayBindingObserver **/
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): any;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): any;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): any;
        /** TradingManagerObserver **/
        currentPortfolioChanged(portfolio: Portfolio): any;
    }
}
declare module Infront {
    class PositionsFlexWidgetOptions extends PositionsWidgetOptions {
        layout: ListLayout;
        displayRowColumns: string[];
    }
    enum TableState {
        INITIALIZING = 0,
        UI_INITIALIZED = 1,
        INITIALIZING_TRADING = 2,
        UI_TRADING_INITIALIZED = 3,
        RELOADING = 4,
    }
    class PositionsFlexWidget extends TradingTableWidgetBase implements RowFactory {
        private static kLoanMarket;
        private expandedAlert;
        protected options: PositionsFlexWidgetOptions;
        private unbindingManager;
        private mode;
        private itemCacheKeys;
        private displayColumns;
        private expandables;
        private tableState;
        private orderItems;
        private ordersSync;
        private ordersfilterFields;
        private ordersUnbind;
        private list;
        private isEmpty;
        constructor(element: HTMLElement, infront: Model, infrontUI: UI, options: PositionsFlexWidgetOptions);
        private createTickerColumn();
        private initializeOrders();
        setLayout(layout: ListLayout): void;
        protected newBuildUI(): void;
        linkEvent(instrument: Instrument): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        createArrayCacheKey(portfolio: Portfolio): string;
        private filter(args);
        private filterMarket(market);
        private filterInstrumentType(type, subtype?);
        createColumn(spec: any, languageHandler: Language): Field;
        itemAdded(item: any, index: number): void;
        private createOrderInfoElement(item);
        createRow(item: any, index: number): HTMLElement;
        protected onTradingConnected(): void;
        toggleOptions(item: any): void;
        currentPortfolioChanged(portfolio: Portfolio): void;
        currentPortfolioReady(portfolio: Portfolio): void;
    }
}
/**
 * Created by hage on 19.06.2014.
 */
declare module Infront {
    class ProgressIndicator implements Binding {
        private element;
        private root;
        private els;
        private classes;
        private delay;
        private timeoutHandle;
        private boundObservable;
        constructor(element: HTMLElement);
        observe(observable: Observable): void;
        unbind(): void;
        private buildUI();
        start(): void;
        stop(): void;
        private tick();
        private apply();
        destroy(): void;
        /** Binding **/
        valueUpdated(val: any): void;
    }
}
declare module Infront {
    class QuoteWidgetOptions extends ValueWidgetOptions {
        name: string;
    }
    class QuoteWidget extends ValueWidget implements InterLibraryLink.Target {
        protected options: QuoteWidgetOptions;
        constructor(element: HTMLElement, infrontUI: UI, options: QuoteWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
    }
}
declare module Infront {
    enum RankingField {
        LV_PCT_CHANGE = 0,
        PCT_CHANGE = 1,
        TURNOVER = 2,
        VOLUME = 3,
    }
    enum RankingPeriod {
        INTRADAY = 0,
        ONE_WEEK = 1,
        ONE_MONTH = 2,
        ONE_YEAR = 3,
        YTD = 4,
    }
    enum CustomRanking {
        LARGE_CAP = 0,
        MID_CAP = 1,
        SMALL_CAP = 2,
        FIRST_NORTH = 3,
        MAIN_INDEX = 4,
    }
    class RankingWidgetOptions extends CommonListOptions {
        feed: number;
        chain: string;
        rows: number;
        minTurnover: number;
        streaming: boolean;
        rankingPeriod: RankingPeriod;
        rankingField: RankingField;
        sortOrder: SortOrder;
        customRanking: CustomRanking;
        instrumentTypes: string[];
        enablePeriodSelector: boolean;
        onInstrumentSelected: (instrument: Instrument) => void;
        columns: any[];
    }
    class RankingWidget extends CommonListWidgetBase implements InfrontWidget, RowFactory, ArrayBindingObserver, InterLibraryLink.Controller {
        protected options: RankingWidgetOptions;
        private items;
        private cap;
        private localCache;
        private snapshotColumns;
        private histColumns;
        private turnOverCol;
        private volumeColumn;
        private pctChangeColumn;
        private periods;
        private periodObserver;
        private periodValues;
        private currentPeriod;
        private isStreaming;
        private decimals;
        private linkController;
        private streamingUnsub;
        constructor(element: HTMLElement, infrontUI: UI, options: RankingWidgetOptions);
        sortColumnChanged(column: Field, sortOrder: SortOrder, userInteraction: boolean): void;
        protected setColumnManager(): void;
        protected setListItems(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        private setStreaming();
        protected newBuildUI(): void;
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        private getHistoryColumnPrefix();
        private initColumns();
        private updateHistColumns();
        private setInstruments(data, isStreaming?);
        protected newDestroyUI(): void;
        createRow(item: any, index: number): HTMLElement;
        rowClicked(instrument: Instrument): void;
        linkEvent(instrument: Instrument): void;
        getColumnManager(): ColumnManager;
        private periodeSelected(selectedIndex);
        private getSortOrder();
        private getTickerField();
        private getRankingFieldName();
        htmlElementTreeAdded(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeRemoved(rootElement: HTMLElement, item: any, index: number): void;
        htmlElementTreeMoved(rootElement: HTMLElement, item: any, oldIndex: number, newIndex: number): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
    }
}
declare module Infront {
    class ScreenerActiveFiltersWidgetOptions extends WidgetOptions {
    }
    abstract class ActiveFilterDisplayComponent {
        filterElement: HTMLElement;
        header: Observable;
        activeFilters: ObservableArray;
        activeFiltersCount: Observable<string>;
        private filterGroup;
        constructor(filterContainer: HTMLElement, filterGroup: AllFilterGroupTypes, infrontUI: any);
        removeGroup(): void;
        abstract update(filterGroup: AllFilterGroupTypes): void;
        destroy(): void;
    }
    class ActiveSingleSelectFilterDisplay extends ActiveFilterDisplayComponent {
        headerValBinding: Binding;
        constructor(filterContainer: HTMLElement, filterGroup: AllSingleSelectGroupTypes, infrontUI: UI);
        update(filterGroup: AllSingleSelectGroupTypes): void;
    }
    class ActiveMultiSelectFilterDisplay extends ActiveFilterDisplayComponent {
        constructor(filterContainer: HTMLElement, filterGroup: AllMultipleSelectGroupTypes, infrontUI: UI);
        update(filterGroup: AllMultipleSelectGroupTypes): void;
    }
    class ScreenerActiveFiltersWidget extends WidgetBase implements InterLibraryLink.Controller, InterLibraryLink.Target {
        private static kLanguageKey;
        private filterContainer;
        private targetManager;
        private activeFilters;
        private showRemoveAllFilters;
        constructor(element: HTMLElement, infrontUI: UI, options: ScreenerActiveFiltersWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        addOrUpdateFilter(filter: AllSingleSelectGroupTypes | AllMultipleSelectGroupTypes): void;
        private removeAllFiltersClicked();
        removeFilter(filter: AllFilterGroupTypes, fromLinkMessage?: boolean): void;
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
    }
}
declare module Infront {
    type AllFilterSpecs = SelectFilterSpec | MultiSelectFilterGroupSpec | FreeTextFilterSpec | RadioSelectFilterGroupSpec | RangeSelectFilterGroupSpec;
    type AllSingleSelectGroupTypes = SelectFilter | FreeTextFilter;
    type AllMultipleSelectGroupTypes = MultiSelectFilter | RadioSelectFilter | RangeSelectFilter;
    type AllFilterGroupTypes = AllSingleSelectGroupTypes | AllMultipleSelectGroupTypes;
    enum FilterEnum {
        Morningstar = 0,
        Risklevel = 1,
    }
    enum FilterTypeEnum {
        Select = 0,
        Multiselect = 1,
        FreeText = 2,
        RadioSelect = 3,
        RangeSelect = 4,
    }
    enum FilterState {
        Unselected = -1,
        Selected = 1,
    }
    class FilterChangeEvent {
        filterType: FilterTypeEnum;
        selection: FilterState;
        parentGroup: FilterGroup;
        selectedFilters: FilterGroupItem[];
    }
    interface IFilterConditionFunc {
        (val: any): boolean;
    }
    class FilterItem {
        text: string;
        filterCondition: IFilterConditionFunc;
        preSelected: boolean;
        className: string;
        constructor(text: string, filterCondition: IFilterConditionFunc, className?: string, preSelected?: boolean);
    }
    class FilterItemValue extends FilterItem {
        constructor(text: string, values: number[], className?: string, preSelected?: boolean);
    }
    class FilterItemString extends FilterItem {
        constructor(text: string, values: string[], className?: string, preSelected?: boolean);
    }
    class FilterGroupItem {
        id: string;
        selected: Observable<boolean>;
        text: Observable<string>;
        aria: Observable<string>;
        count: Observable<number>;
        matchingItems: {
            [cacheKey: string]: Instrument;
        };
        filterFunction: IFilterConditionFunc;
        className: string;
        constructor(filter: FilterItem, id: string);
    }
    interface FilterGroupBaseSpec {
        filterFields: string | string[];
        filterItems?: FilterItem | FilterItem[];
        header?: string;
        defaultExpanded?: boolean;
        filterType: FilterTypeEnum;
        className?: string;
        placeholder?: string;
        hideFromActiveFilters?: boolean;
        activeFilterType?: FilterTypeEnum;
        activeFilterSelectionCount?: boolean;
    }
    abstract class FilterSpec implements FilterGroupBaseSpec {
        filterFields: string[];
        filterItems: FilterItem[];
        filterType: FilterTypeEnum;
        header?: string;
        className?: string;
        hideFromActiveFilters: boolean;
        activeFilterType: FilterTypeEnum;
        activeFilterSelectionCount: boolean;
        constructor(baseSpec: FilterGroupBaseSpec);
        protected abstract getClassName(className: string): string;
    }
    class SelectFilterSpec extends FilterSpec {
        constructor(baseSpec: FilterGroupBaseSpec);
        protected getClassName(className: string): string;
    }
    class FreeTextFilterSpec extends SelectFilterSpec {
        placeholder?: string;
        constructor(baseSpec: FilterGroupBaseSpec);
        protected getClassName(className: string): string;
    }
    class MultiSelectFilterGroupSpec extends FilterSpec {
        defaultExpanded?: boolean;
        constructor(baseSpec: FilterGroupBaseSpec);
        protected getClassName(className: string): string;
    }
    class RadioSelectFilterGroupSpec extends FilterSpec {
        defaultExpanded?: boolean;
        constructor(baseSpec: FilterGroupBaseSpec);
        protected getClassName(className: string): string;
    }
    class RangeSelectFilterGroupSpec extends FilterSpec {
        defaultExpanded?: boolean;
        constructor(baseSpec: FilterGroupBaseSpec);
        protected getClassName(className: string): string;
    }
    abstract class FilterGroup {
        filterFields: Field[];
        filterFieldTags: IDS.TagOrComputed[];
        header: string;
        id: string;
        className: string;
        hasSelected: boolean;
        hideFromActiveFilters: boolean;
        activeFilterType: FilterTypeEnum;
        activeFilterSelectionCount: boolean;
        protected cacheFilterObserver: ContinouslyFilteredInstrumentObserver;
        protected changeCallback: () => void;
        protected wrapperHeight: Observable<number>;
        protected screener: ScreenerWidget;
        private itemUnbinds;
        private cache;
        private isInitialising;
        constructor(id: string, options: FilterSpec, cacheFilterObserver: ContinouslyFilteredInstrumentObserver, cache: BindingCache, screener: ScreenerWidget, filterGroupChangedCallback: (filterGroup: FilterGroup) => void);
        destroy(): void;
        static statusUpdates: number;
        static skippedUpdates: number;
        addCacheInstrumentBindning(item: InstrumentFilterItem): void;
        unbindAll(): void;
        abstract buildUI(parent: HTMLElement): void;
        abstract passes(val: any[]): any;
        abstract unselectFilterParam(filter: FilterGroupItem): void;
        abstract unselectAllFilterParams(): void;
        abstract toggleExpand(): void;
    }
    class RadioSelectFilter extends FilterGroup {
        filters: FilterGroupItem[];
        selectedFilters: FilterGroupItem[];
        private collapsable;
        private expandedCallback;
        private selectedCount;
        expandedGroup: Observable<boolean>;
        filtersTabIndex: Observable<string>;
        private selected;
        private itemCount;
        private filtersAriaLabel;
        private strings;
        constructor(id: string, infrontUI: UI, options: RadioSelectFilterGroupSpec, cacheFilterObserver: ContinouslyFilteredInstrumentObserver, cache: BindingCache, screener: ScreenerWidget, collapsable: boolean, filterGroupChangedCallback: (filterGroup: FilterGroup) => void, filterExpandedCallback: (filterGroup: FilterGroup) => void);
        buildUI(element: HTMLElement): void;
        selectFilterParam(filter: FilterGroupItem): void;
        unselectFilterParam(filter: FilterGroupItem): void;
        unselectAllFilterParams(): void;
        toggleExpand(): void;
        passes(val: any): boolean;
    }
    class RangeSelectFilter extends FilterGroup {
        filters: FilterGroupItem[];
        selectedFilters: FilterGroupItem[];
        private collapsable;
        private expandedCallback;
        private selectedCount;
        expandedGroup: Observable<boolean>;
        filtersTabIndex: Observable<string>;
        private selected;
        backgroundSelectedWidth: number;
        backgroundSelectedLeft: number;
        private bullet1;
        private bullet2;
        private backgroundBar;
        private backgroundSelectedBar;
        private stepElement;
        private movingBullet;
        startPoint: number;
        endPoint: number;
        startPointLabel: Observable<string>;
        endPointLabel: Observable<string>;
        activeFilterRangeSeparatorLabel: Observable<string>;
        private itemCount;
        private oneStep;
        private stepWidth2;
        private hasPreselected;
        private infrontUI;
        constructor(id: string, options: RangeSelectFilterGroupSpec, cacheFilterObserver: ContinouslyFilteredInstrumentObserver, infrontUI: UI, cache: BindingCache, screener: ScreenerWidget, collapsable: boolean, filterGroupChangedCallback: (filterGroup: FilterGroup) => void, filterExpandedCallback: (filterGroup: FilterGroup) => void);
        buildUI(element: HTMLElement): void;
        private dragBullet(event);
        private setSelectedBackground();
        private getLeftB();
        private getRightB();
        setFilterRange(start?: number, end?: number): void;
        setRange(val?: number, dontMoveBullets?: boolean): void;
        selectFilterParam(filter: FilterGroupItem): void;
        unselectFilterParam(filter: FilterGroupItem): void;
        unselectAllFilterParams(): void;
        toggleExpand(): void;
        passes(val: any): boolean;
    }
    class MultiSelectFilter extends FilterGroup {
        filters: FilterGroupItem[];
        selectedFilters: FilterGroupItem[];
        private collapsable;
        private strings;
        private expandedCallback;
        private selectedCount;
        expandedGroup: Observable<boolean>;
        filtersTabIndex: Observable<string>;
        private itemCount;
        constructor(id: string, infrontUI: UI, options: MultiSelectFilterGroupSpec, cacheFilterObserver: ContinouslyFilteredInstrumentObserver, cache: BindingCache, screener: ScreenerWidget, collapsable: boolean, filterGroupChangedCallback: (filterGroup: FilterGroup) => void, filterExpandedCallback: (filterGroup: FilterGroup) => void);
        buildUI(element: HTMLElement): void;
        selectFilterParam(filter: FilterGroupItem): void;
        unselectFilterParam(filter: FilterGroupItem): void;
        unselectAllFilterParams(): void;
        toggleExpand(): void;
        passes(val: any): boolean;
    }
    class SelectFilter extends FilterGroup {
        selectedFilter: FilterGroupItem;
        filter: FilterGroupItem;
        protected elementField: HTMLElement;
        constructor(id: string, options: SelectFilterSpec, cacheFilterObserver: ContinouslyFilteredInstrumentObserver, cache: BindingCache, screener: ScreenerWidget, filterGroupChangedCallback: (filterGroup: FilterGroup) => void);
        buildUI(parent: HTMLElement): void;
        toggleExpand(): void;
        setSelectedFilter(filter: FilterGroupItem): void;
        unselectFilterParam(filter: FilterGroupItem): void;
        unselectAllFilterParams(): void;
        passes(val: any): boolean;
    }
    class FreeTextFilter extends SelectFilter {
        private placeholder;
        protected elementField: HTMLInputElement;
        private strings;
        constructor(id: string, infrontUI: UI, options: FreeTextFilterSpec, cacheFilterObserver: ContinouslyFilteredInstrumentObserver, cache: BindingCache, screener: ScreenerWidget, filterGroupChangedCallback: (filterGroup: FilterGroup) => void);
        buildUI(element: HTMLElement): void;
        private valuesContainsString(vals, searchstring);
        replaceText(searchstring: string): void;
        unselectAllFilterParams(): void;
    }
    class ScreenerWidgetOptions extends WidgetOptions {
        linkAction: LinkAction;
        feed: number;
        instruments: Instrument[];
        filters: (FilterEnum | FilterGroupBaseSpec)[];
        collapsable: boolean;
        onChange: (filter: FilterChangeEvent) => void;
        customRequiredFields: IDS.RealtimeTags[];
        customReferenceData: {
            feed: number;
            fields: Infront.Field[];
        };
    }
    class ScreenerWidget extends WidgetBase implements InterLibraryLink.Controller, InterLibraryLink.Target {
        private static kLanguageKey;
        private filterGroups;
        private showProgressIndicator;
        private instruments;
        private title;
        private filterContainer;
        private instrumentObserver;
        private targetManager;
        private linkTimer;
        protected options: ScreenerWidgetOptions;
        constructor(element: HTMLElement, infrontUI: UI, options: ScreenerWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newInit(): void;
        private waitForDataAndContinueInit(idsSymbols, timeout?, currentTimeout?);
        customBindFields(): void;
        protected newBuildUI(): void;
        protected createBindings(): void;
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        protected removeBindings(): void;
        private allSymbolsHasStaticData(idsSymbols);
        private addFilter(filterEnumOrSpec);
        createFilterFromTypeEnum(filterType: FilterEnum): FilterGroupBaseSpec;
        clearAllFilters(): void;
        reInit(items: any[]): void;
        itemAdded(item: any, index: number): void;
        itemRemoved(item: any, index: number): void;
        itemMoved(item: any, oldIndex: number, newIndex: number): void;
        filterChanged(filter: FilterGroup): void;
        filterExpanded(filter: MultiSelectFilter | RadioSelectFilter | RangeSelectFilter): void;
        accepts(): string[];
        receiveMessage(msg: InterLibraryLink.Message): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        getFilterGroup(id: string): FilterGroup;
    }
    class InstrumentObserverParam {
        filterFunction: IFilterConditionFunc;
        resultLength: Observable;
    }
    class InstrumentObserverFilter {
        id: string;
        fieldSpec: string[];
        filterParamObjects: {
            [key: string]: InstrumentObserverParam;
        };
        selectedParamIds: string[];
        constructor(id: string, fieldSpec: string[], items: FilterGroupItem[]);
        passes(val: any): boolean;
        addFilterParams(id: string, filterFunc: IFilterConditionFunc): void;
        selectFilterParam(id: string): void;
        unselectFilterParam(id: string): IFilterConditionFunc;
    }
    class InstrumentFilterItem {
        originalItem: Instrument;
        passes: boolean;
        filterResults: {};
        filterValues: {
            [id: string]: number[] | string[];
        };
        updateCallback: (item: any, passed: boolean, stopPropagation: boolean) => void;
        constructor(item: Instrument, updateCallback: (item: any, passed: boolean, stopPropagation: boolean) => void);
        updateStatus(stopPropagation?: boolean): void;
    }
    class ContinouslyFilteredInstrumentObserver {
        cache: BindingCache;
        instruments: Instrument[];
        filterGroups: AllFilterGroupTypes[];
        itemsToFilter: InstrumentFilterItem[];
        itemsAfterFilter: ObservableArray;
        isCalculatingFiltersLength: boolean;
        itemLengthTimeout: number;
        private isInitializing;
        constructor(cache: BindingCache, instruments: Instrument[]);
        preFinalizeInit(): void;
        finalizeInit(): void;
        addFilter(filterGroup: AllFilterGroupTypes): void;
        filterParamUpdated(filterGroup: AllFilterGroupTypes): void;
        observe(b: IArrayBinding): void;
        unbind(b: IArrayBinding): void;
        destroy(): void;
        static itemUpdatesSkipped: number;
        static itemUpdates: number;
        itemUpdated(item: any, passed: boolean, stopPropagation: boolean): void;
        static itemLengthTimeoutCount: number;
        updateFilteredItemsLength(): void;
    }
}
/**
 * Created by Justine on 7-11-2017.
 */
declare module Infront {
    class SimpleChartOverviewWidgetOptions extends SingleInstrumentWidgetOptions {
        defaultPeriod: string;
    }
    class SimpleChartOverviewWidget extends SingleInstrumentWidgetBase {
        private static kLanguageKey;
        protected options: SimpleChartOverviewWidgetOptions;
        private chartWidget;
        constructor(element: HTMLElement, infrontUI: UI, options: SimpleChartOverviewWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
    }
}
declare module Infront {
    class SwapCalculatorOptions extends WidgetOptions {
        notional: number;
        currency: string;
        fixedRate: number;
        spread: number;
    }
    enum SwapCalculatorTab {
        TabMain = "tabMain",
        TabCashFlow = "tabCashFlow",
        TabOther = "tabOther",
    }
    class SwapCalculatorWidget extends WidgetBase {
        protected options: SwapCalculatorOptions;
        private domElements;
        private tabBar;
        private activeTab;
        private notionalBinding;
        private currencyBinding;
        private currencyItems;
        private fixedFrequencyBinding;
        private floatFrequencyBinding;
        private frequencyItems;
        private calcMethodItems;
        private fixedCalcMethodBinding;
        private floatCalcMethodBinding;
        private fixedIsPayer;
        private fixedRateBinding;
        private spreadBinding;
        private resultPanel;
        private cashFlowPanel;
        private startDateSelector;
        private maturityDateSelector;
        private valueDateSelector;
        private firstCouponDateFixedSelector;
        private firstCouponDateFloatSelector;
        private calculatorResponse;
        private swapOptions;
        private ready;
        constructor(element: HTMLElement, infrontUI: UI, options: SwapCalculatorOptions);
        protected newInit(): void;
        protected newBuildUI(): void;
        private createTabs();
        private createDateSelectors();
        private initializeDropdowns();
        private onDateChanged;
        private amountChanged;
        private onSwapPayReceive;
        private onDropDownChanged;
        private onSelectTab;
        private getFixedRate();
        private updateCalculator();
        private onReceiveSwapData;
        private onReceiveErrorResponse;
        protected returnDefaultWidgetOptions(): WidgetOptions;
    }
    class CashFlowDisplayItem {
        date: string;
        floatingRate: string;
        floatingCashFlow: string;
        fixedRate: string;
        fixedCashFlow: string;
        netCashFlow: string;
        discountFactor: string;
        netPresentValue: string;
    }
    class SwapCalculatorCashFlowWidgetOptions extends WidgetOptions {
    }
    class SwapCalculatorCashFlowWidget extends WidgetBase {
        private cashFlowItems;
        private isInitialized;
        fixedRate: number;
        constructor(element: HTMLElement, infrontUI: UI, calculatorResponse: CalculatorSwapResponse, options: SwapCalculatorCashFlowWidgetOptions);
        protected newInit(): void;
        clear(): void;
        applyResult(response: CalculatorSwapResponse): void;
        displayErrorMessage(error_code: number, error_message: string): void;
        protected newBuildUI(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
    }
    class SwapCalculatorResultWidgetOptions extends WidgetOptions {
    }
    class SwapCalculatorResultWidget extends WidgetBase {
        private NPV;
        private leg1NPV;
        private leg2NPV;
        private premium;
        private parRate;
        private principal;
        private accrued;
        private marketValue;
        private statusText;
        private hasValidResponse;
        private isInitialized;
        private calculatorResponse;
        constructor(element: HTMLElement, infrontUI: UI, calculatorResponse: CalculatorSwapResponse, options: SwapCalculatorResultWidgetOptions);
        protected newInit(): void;
        clear(): void;
        applyResult(data: CalculatorSwapResponse): void;
        displayErrorMessage(error_code: number, error_message: string): void;
        protected newBuildUI(): void;
        protected returnDefaultWidgetOptions(): WidgetOptions;
    }
}
declare module Infront {
    class TradesWidgetOptions extends TradingTableWidgetOptions {
        columns: any[];
    }
    class TradesWidget extends TradingTableWidgetBase {
        protected options: TradesWidgetOptions;
        constructor(element: HTMLElement, infrontUI: UI, options: TradesWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        createArrayCacheKey(portfolio: Portfolio): string;
        /**
         * Converts the cacheKey stored in the array into the correct cache-key to use for this column. This is typically dependent
         * on the context, and is therefore implemented here in the widget-implementation. It is used by ColumnManager.
         * @param cacheKey
         * @param column
         * @returns {string}
         */
        protected convertCacheKey(cacheKey: string, column: Field): string;
        createColumn(spec: any, languageHandler: Language): Field;
        linkEvent(): void;
    }
}
declare module Infront {
    class LoginField {
        key: string;
        value: string;
        constructor(key: string, value: string);
    }
    interface TradingLoginDialogObserver {
        tradingLoginInformationProvided(provider: number, service: number, fields: LoginField[]): any;
        tradingLoginDialogCanceled(): any;
        tradingLoginDialogReset(): any;
    }
    class TradingLoginDialog {
        private infront;
        private infrontUI;
        private routings;
        private inputContainer;
        private widgetRoot;
        private routingSelectBinding;
        private inputBindings;
        private selectedRoutingIndex;
        progressIndicator: ProgressIndicator;
        private observer;
        private sidPidMatches;
        private onKeyPress;
        private onLoginFailed;
        private onLoginSuccess;
        private message;
        showControls: Observable;
        private warningMsg;
        constructor(trRoutings: Object[], sidPidMatches: Object[], infrontUI: UI, infront: Model, observer: TradingLoginDialogObserver, message?: string);
        show(message?: string): void;
        hide(): void;
        private buildUI();
        private isCapsLock(event);
        private routingSelected(routing);
        private okClick();
        private cancelClick();
    }
}
declare module Infront {
    /**
     * Binding that creates a "blink"-effect on an element by setting and then, after a time, removing a css-class on it.
     */
    class CssUpdateBinding implements Binding {
        private boundEl;
        private upClassName;
        private downClassName;
        private neutralClassName;
        private upFlashClassName;
        private downFlashClassName;
        private blinkType;
        private duration;
        timeoutHandle: number;
        clearCallback: () => void;
        lastValue: any;
        initialized: boolean;
        hasUpdated: boolean;
        constructor(boundEl: HTMLElement, duration: number, blinkType?: BlinkType);
        valueUpdated(val: any): void;
    }
}
declare module Infront {
    enum SortOrder {
        Desc = 0,
        Asc = 1,
        None = 2,
    }
    /**
     * Utility class for comparing on a cacheKey with a given sortFieldSpec
     */
    class CacheKeyFieldSpecSorting {
        compareFunction: (valueA: any, valueB: any) => number;
        cacheKeyConverter: (key: string) => string;
        sortFieldSpec: string[];
        private cache;
        private unbinds;
        private itemValueUpdated;
        constructor(sortFieldSpec: string[], cache: BindingCache, compareFunction: (valueA: string, valueB: string) => number, cacheKeyConverter: (cacheKey: string) => string, itemValueUpdated: (item: string) => void);
        compareItems(itemA: string, itemB: string): number;
        updateCompare(items: ObservableArray, sortFieldSpec: string[], compareFunction: (valueA: string, valueB: string) => number, rebind?: boolean): void;
        bindItem(item: any): void;
        unbindItem(item: any): void;
        unbindAll(): void;
        rebindItems(items: ObservableArray): void;
    }
    class ContinouslySortedCacheKeyObservableArray extends ObservableArray {
        protected cacheKeySorters: CacheKeyFieldSpecSorting[];
        private cache;
        private cacheKeyConverter;
        constructor(sortFieldSpecs: string[][], cache: BindingCache, compareFunctions: {
            (valueA: any, valueB: any): number;
        }[], cacheKeyConverter?: (cacheKey: string) => string);
        private createCacheKeyConverters(sortFieldSpecs, compareFunctions);
        updateSorting(sortFieldSpecs: string[][], compareFunctions: {
            (valueA: any, valueB: any): number;
        }[]): void;
        setSortFieldSpec(sortFieldSpecs: string[][]): void;
        protected compareItems(itemA: string, itemB: string): number;
        protected itemValueUpdated(item: string): void;
        /**
         * Returns true if VALUE should be inserted at INDEX according to the current compare-function
         */
        private sortsAtIndex(item, index);
        /**
         * Returns true if VALUE should come after the value at INDEX.
         */
        private sortsAfter(item, index);
        /**
         * Finds the correct insert-index for the given item using a binary search through the array.
         * @param item
         * @param startIndex
         * @param endIndex
         * @returns {*}
         */
        private findInsertIndex(item, startIndex, endIndex);
        push(item: any): void;
        insert(item: any, index: number): void;
        remove(item: any): void;
        removeItemAt(index: number): any;
    }
    class ContinouslySingleSortedCacheKeyObservableArray extends ContinouslySortedCacheKeyObservableArray {
        constructor(sortFieldSpec: string[], cache: BindingCache, compareFunction: (valueA: any, valueB: any) => number, cacheKeyConverter?: (cacheKey: string) => string);
    }
    class ContinouslySortedColumnCacheKeyObservableArray extends ContinouslySingleSortedCacheKeyObservableArray {
        private sortColumn;
        private sortOrder;
        private columnCacheKeyConverter;
        constructor(sortColumn: Field, sortOrder: SortOrder, cache: BindingCache, cacheKeyConverter?: (cacheKey: string, column: Field, cache: BindingCache) => string);
        setSortColumn(col: Field, sortOrder: SortOrder): void;
        setSortOrder(sortOrder: SortOrder): void;
    }
    class ContinouslySortedCachedInstrumentObservableArray extends ObservableArray {
        private static unbindKey;
        private sortingField;
        private secondarySortingField;
        private sortingFieldSpec;
        private secondarySortingFieldSpec;
        private sortOrder;
        private cap;
        private compareFunction;
        private secondaryCompareFunction;
        private defaultSortingField;
        private defaultSortingFieldSpec;
        private defaultSortOrder;
        private cache;
        instrumentProperty: string;
        constructor(sortingField: Field, secondarySortingField: Field, cache: BindingCache, sortOrder?: SortOrder, compareFunction?: (valA: any, valB: any, sortOrder: SortOrder) => number, secondaryCompareFunction?: (valA: any, valB: any, sortOrder: SortOrder) => number, cap?: number);
        setCap(newCap: number): void;
        setSecondarySortingField(secondarySortingField: Field, secondaryCompareFunction?: (valA: any, valB: any, sortOrder: SortOrder) => number, updateSorting?: boolean): void;
        getDefaultSortingColumn(): Field;
        setSortingField(sortField: Field, sortOrder?: SortOrder, compareFunction?: (valA: any, valB: any, sortOrder: SortOrder) => number): void;
        private doSetSortingField(newField, sortOrder?, compareFunction?, notify?);
        private getFieldValue(rowId, fromSecondaryField?);
        sortNow(notify?: boolean): void;
        private compareValues(valueA, valueB);
        private secondaryCompareValues(valueA, valueB);
        private compareValuesDefault(valueA, valueB);
        private simpleStringCompare(s1, s2);
        private shouldInsertAfter(value, secondaryValue, index);
        /**
         * Returns true if VALUE should come after the value at INDEX.
         */
        private sortsAfter(value, secondaryValue, index);
        /**
         * Returns true if VALUE should be inserted at INDEX according to the current compare-function
         */
        private sortsAtIndex(obj, value, secondaryValue, index);
        private findInsertIndex(value, secondaryValue, startIndex, endIndex);
        private valueUpdated(obj, newValue, secondaryNewValue);
        private removeItemIfHasSortValueAt(index);
        private isCapped();
        insert(obj: Instrument, index: number): void;
        push(obj: Instrument): void;
        remove(obj: Instrument): void;
        move(obj: any, newIndex: any): void;
        removeItemAt(index: number): Instrument;
        replaceWith(data: Instrument[]): void;
        private getInstrument(obj);
    }
}
/**
 * Created by hage on 14.04.2015.
 */
declare module Infront {
    class ValuePairWidgetOptions extends SingleInstrumentWidgetOptions {
        leftField: any;
        rightField: any;
    }
    class ValuePairWidget extends SingleInstrumentWidgetBase {
        private static kLanguageKey;
        protected options: ValuePairWidgetOptions;
        private leftColumn;
        private rightColumn;
        private leftWidget;
        private rightWidget;
        constructor(element: HTMLElement, infrontUI: UI, options: ValuePairWidgetOptions);
        protected returnDefaultWidgetOptions(): WidgetOptions;
        protected newBuildUI(): void;
        protected newDestroyUI(): void;
    }
}
declare module Infront {
    enum CardType {
        None = 0,
        News = 1,
        EquityCalendar = 2,
        MacroCalendar = 3,
        MotionDetection = 4,
        Alert = 5,
    }
    function cardTypeToStr(value: CardType): "?" | "Alert" | "MotionDetection" | "News" | "EquityCalendar" | "MacroCalendar";
    class EventList {
        items: {
            [cardId: string]: IDS.Wire.WireEvent[];
        };
        addEvent(cardKey: string, event: IDS.Wire.WireEvent): void;
        getEvents(cardId: string): IDS.Wire.WireEvent[];
        deleteCard(cardId: string): void;
        moveEventToTop(cardId: string): void;
        clear(): void;
    }
    abstract class WireEventCard {
        index: Observable<number>;
        debugStr: Observable<string>;
        protected title: Observable<string>;
        protected isRead: Observable<boolean>;
        protected listItems: ObservableArray;
        protected timeString: Observable<string>;
        protected unixTime: Observable<number>;
        protected expanded: Observable<boolean>;
        protected toggleText: Observable<string>;
        protected showSymbolInfoBar: Observable<boolean>;
        protected languageHandler: Language;
        protected infront: Infront.Model;
        protected unsubscribe: () => void;
        protected unbinds: {
            (): void;
        }[];
        protected collapsedItems: number;
        protected scoreThreshold: number;
        protected showScore: boolean;
        protected makeTerminalLinks: boolean;
        protected terminalUniqueId: string;
        protected cardType: CardType;
        constructor(event: IDS.Wire.WireEvent, showScore: boolean, index: number, infront: Infront.Model, languageHandler: Language, nowDateTime: Observable<number>, scoreThreshold: number, terminalUniqueId?: string);
        getRoot(): HTMLElement;
        protected createCard(titleClickHandler: any, toggleHandler: any): void;
        protected initialize(event: IDS.Wire.WireEvent): void;
        protected applyEventData(event: IDS.Wire.WireEvent): void;
        protected toggleClick(): void;
        protected titleClick(): void;
        update(event: IDS.Wire.WireEvent, index: number, scoreThreshold: number): void;
        protected createBindings(languageHandler: Language, nowUnixTime: Observable<number>): void;
        protected expandCollapse(isExpanded: boolean): void;
        protected setExpandedClass(isExpanded: boolean, element: HTMLElement): void;
        protected getExpandCollapseLabel(isExpanded: boolean): string;
        protected getFeedFlagClass(symbol: IDS.Symbol): string;
        protected getSymbolFullName(symbol: IDS.Symbol): string;
        protected getTimeString(minutesAgo: number, eventUnixTime: number, languageHandler: Language): string;
        protected getDateOrTime(date: Date): string;
        destroy(): void;
    }
    class WireNewsEventCard extends WireEventCard {
        domElements: {
            wireCard: HTMLElement;
            header: HTMLElement;
            cardPills: HTMLElement;
            feedFlag: HTMLElement;
            tickerField: HTMLElement;
            todaysChangeField: HTMLElement;
            footerLink: HTMLElement;
        };
        private instrumentObservable;
        private newsEvent;
        getRoot(): HTMLElement;
        protected createCard(titleClickHandler: any, toggleHandler: any): void;
        protected initialize(event: IDS.Wire.WireEvent): void;
        protected showDebug(): void;
        protected titleClick(): void;
        protected createBindings(languageHandler: Language, nowUnixTime: Observable<number>): void;
        protected expandCollapse(isExpanded: boolean): void;
        protected getExpandCollapseLabel(isExpanded: boolean): string;
        private getLink(linkType, event);
        private applyNewsEventData(event);
        protected applyEventData(event: IDS.Wire.WireEvent): void;
        update(event: IDS.Wire.WireEvent, index: number, scoreThreshold: number): void;
    }
    class WireEquityCalendarEventCard extends WireEventCard {
        domElements: {
            wireCard: HTMLElement;
            openCalendar: HTMLElement;
            footerLink: HTMLElement;
        };
        getRoot(): HTMLElement;
        protected createCard(titleClickHandler: any, toggleHandler: any): void;
        protected initialize(event: IDS.Wire.WireEvent): void;
        protected titleClick(): void;
        protected createBindings(languageHandler: Language, nowUnixTime: Observable<number>): void;
        private getLink();
        private applyCalendarEventData(event);
        protected expandCollapse(isExpanded: boolean): void;
        protected applyEventData(event: IDS.Wire.WireEvent): void;
        private addCalendarItem(event);
        update(event: IDS.Wire.WireEvent, index: number, scoreThreshold: number): void;
        protected getTimeString(minutesAgo: number, eventUnixTime: number, languageHandler: Language): string;
    }
    class WireMacroCalendarEventCard extends WireEventCard {
        domElements: {
            wireCard: HTMLElement;
            openCalendar: HTMLElement;
            footerLink: HTMLElement;
        };
        getRoot(): HTMLElement;
        protected createCard(titleClickHandler: any, toggleHandler: any): void;
        protected initialize(event: IDS.Wire.WireEvent): void;
        protected titleClick(): void;
        protected createBindings(languageHandler: Language, nowUnixTime: Observable<number>): void;
        private getLink();
        private applyCalendarEventData(event);
        protected expandCollapse(isExpanded: boolean): void;
        protected applyEventData(event: IDS.Wire.WireEvent): void;
        private addCalendarItem(event);
        update(event: IDS.Wire.WireEvent, index: number, scoreThreshold: number): void;
        protected getTimeString(minutesAgo: number, eventUnixTime: number, languageHandler: Language): string;
    }
    class WireMotionDetectionCard extends WireEventCard {
        domElements: {
            wireCard: HTMLElement;
            header: HTMLElement;
            cardPills: HTMLElement;
            feedFlag: HTMLElement;
            tickerField: HTMLElement;
            todaysChangeField: HTMLElement;
            footerLink: HTMLElement;
        };
        private instrumentObservable;
        private motionEvent;
        getRoot(): HTMLElement;
        protected createCard(titleClickHandler: any, toggleHandler: any): void;
        protected initialize(event: IDS.Wire.WireEvent): void;
        protected showDebug(): void;
        protected titleClick(): void;
        protected createBindings(languageHandler: Language, nowUnixTime: Observable<number>): void;
        protected expandCollapse(isExpanded: boolean): void;
        private getLink(linkType, event);
        private getDirectionStr(value);
        private applyMotionDetectionData(event);
        protected applyEventData(event: IDS.Wire.WireEvent): void;
        update(event: IDS.Wire.WireEvent, index: number, scoreThreshold: number): void;
    }
    class WireAlertCard extends WireEventCard {
        domElements: {
            wireCard: HTMLElement;
            footerLink: HTMLElement;
            cardPills: HTMLElement;
            feedFlag: HTMLElement;
            tickerField: HTMLElement;
            todaysChangeField: HTMLElement;
        };
        private instrumentObservable;
        private alertEvent;
        getRoot(): HTMLElement;
        protected createCard(titleClickHandler: any, toggleHandler: any): void;
        protected initialize(event: IDS.Wire.WireEvent): void;
        protected titleClick(): void;
        protected createBindings(languageHandler: Language, nowUnixTime: Observable<number>): void;
        protected expandCollapse(isExpanded: boolean): void;
        private getLink(linkType, event);
        private applyAlertData(event);
        protected applyEventData(event: IDS.Wire.WireEvent): void;
    }
    class WireSettings {
        watchList: string;
        defaultToFirstWatchList: boolean;
        selectedFeeds: number[];
        scoreThresholdNews: number;
        showNews: boolean;
        scoreThresholdMotionDetection: number;
        showMotionDetection: boolean;
        showMyAlerts: boolean;
        newsFilter: number;
    }
    class WireSettingsPopupOptions extends PopupOptions {
        onOkClick: (subscription: WireSettings, changed: boolean, resubscribe: boolean) => void;
        onCancelClick: () => void;
        onFilterChanged: (settings: WireSettings) => void;
        watchListTitles: ObservableArray;
        marketInfos: IDS.MwsMarketInfo[];
        settings: WireSettings;
    }
    class WireWidgetOptions extends WidgetOptions {
        instruments: Instrument[];
        feeds: number[];
        selectedFeeds: number[];
        watchList: string;
        scoreThresholdMotionDetection: number;
        scoreThresholdNews: number;
        displayFilteredItems: boolean;
        languages: string[];
        subscribe: boolean;
        showHeader: boolean;
        showMotionDetection: boolean;
        showNews: boolean;
        showAlerts: boolean;
        showScore: boolean;
        showCardIndex: boolean;
        maxCardCount: number;
        uniqueId: string;
    }
    class WireWidget extends WidgetBase implements InterLibraryLink.Controller {
        private static kHiddenClassname;
        domElements: {
            wireContainer: HTMLElement;
            popupWrapper: HTMLElement;
            setupButton: HTMLElement;
            connectionStatus: HTMLElement;
        };
        protected options: WireWidgetOptions;
        private targetManager;
        private displayFilteredItems;
        private events;
        private eventCards;
        private currentIndex;
        private minuteTimerObservable;
        private timerId;
        private unsubscribe;
        private watchListTitles;
        private showHeader;
        private popupDialog;
        private settings;
        private marketInfos;
        private feeds;
        private filteredItems;
        static kWireSettingWatchlistKey: string;
        static kWireSettingSelectedFeedsKey: string;
        static kWireSettingScoreThresholdMotionDetectionKey: string;
        static kWireSettingScoreThresholdNewsKey: string;
        static kWireSettingShowAlertsKey: string;
        static kWireSettingShowMotionDetectionKey: string;
        static kWireSettingShowNewsKey: string;
        constructor(element: HTMLElement, infrontUI: UI, options: WireWidgetOptions);
        protected newInit(): void;
        protected newBuildUI(): void;
        private setupClick;
        private setupOptionsChanged;
        private canDelete(event);
        private removeCard(eventId);
        private checkIfOldCardsShouldBeRemoved();
        private clearCards();
        private rePopulateCards();
        private eventIsIncluded(event);
        private getScoreThreshold(event);
        private moveCardToTop(event);
        private showScore();
        private addOrUpdateCard(event);
        private processEvents(response);
        private processAlert(alert);
        private onConnectionStatus;
        protected newSubscribe(): void;
        protected newUnsubscribe(): void;
        protected onWireReconnect: (event: InfrontEvent) => void;
        protected newDestroyUI(): void;
        destroy(): void;
        link(target: InterLibraryLink.Target): void;
        unlink(target: InterLibraryLink.Target): void;
        returnDefaultWidgetOptions(): WireWidgetOptions;
    }
}
