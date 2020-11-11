import { Injectable, Optional } from '@angular/core';
import { InfrontUIService } from './InfrontUI';
import { Subject } from 'rxjs';

@Injectable()
export class InstrumentService {

    public instrument: Infront.Instrument;

    private instrumentObservableSource = new Subject<Infront.Instrument>();

    instrumentObservable = this.instrumentObservableSource.asObservable();

    private instrumentWithMetaData: Promise<any>;

    constructor(private infrontUI: InfrontUIService) {

    }

    setInstrument(instrument: Infront.Instrument): Infront.Instrument {
        this.instrumentWithMetaData = new Promise((resolve, reject) => {
            if (instrument) {
                this.infrontUI.getModel().then(model => {
                    model.instrumentInfoPromise(instrument.feed, instrument.ticker)
                        .then(instrument => {
                            resolve(instrument);
                        }).catch(() => {
                            reject("No instrument info");
                        });                 
                });
            }
        });
        return this.instrument = instrument;
    }

    notifyObservers() {
        this.instrumentObservableSource.next(this.instrument);
    }

    public async getCurrency(): Promise<string>{
        return this.instrumentWithMetaData.then((instrumentMetaData) => {
            if (instrumentMetaData && instrumentMetaData.currency) {
                return instrumentMetaData.currency;
            }
            else {
                return "";
            }

        }).catch((reason) => {
            return "";
        });
        //if (!this.instrumentWithMetaData) {
        //    await this.setInstrumentInfo();
        //}
        //return new Promise<string>((resolve, reject) => {
        //    if (!this.instrumentWithMetaData.currency) {
        //        reject("No currency");
        //    }
        //    resolve(this.instrumentWithMetaData.currency);
        //});
    }

    public async getTicker(): Promise<string> {
        return this.instrumentWithMetaData.then((instrumentMetaData) => {
            if (instrumentMetaData && instrumentMetaData.ticker) {
                return instrumentMetaData.ticker;
            }
            else {
                return "";
            }
        }).catch((reason) => {
            return "";
        });
        //if (!this.instrumentWithMetaData) {
        //    await this.setInstrumentInfo();
        //}
        //return new Promise<string>((resolve, reject) => {
        //    if (!this.instrumentWithMetaData.ticker) {
        //        reject("No ticker");
        //    }
        //    resolve(this.instrumentWithMetaData.ticker);
        //});
    }

    public async getFullName(): Promise<string> {
        return this.instrumentWithMetaData.then((instrumentMetaData) => {
            if (instrumentMetaData && instrumentMetaData.full_name) {
                return instrumentMetaData.full_name;
            }
            else {
                return "";
            }

        }).catch((reason) => {
            return "";
        });

        //if (!this.instrumentWithMetaData) {
        //    await this.setInstrumentInfo();
        //}
        //return new Promise<string>((resolve, reject) => {
        //    if (!this.instrumentWithMetaData.full_name) {
        //        reject("No fullname");
        //    }
        //    resolve(this.instrumentWithMetaData.full_name);
        //});
    }

    public async getInstrumentTypeClass(): Promise<InstrumentTypeClass> {
        return this.instrumentWithMetaData.then((instrumentMetaData) => {
            if (instrumentMetaData && instrumentMetaData.instrument_type) {
                return getTypeClassFromMetaData(instrumentMetaData);
            }
            else {
                return getTypeClassFromMetaData("");;
            }

        }).catch((reason) => {
            return getTypeClassFromMetaData("");
        });
        //if (!this.instrumentWithMetaData) {
        //    await this.setInstrumentInfo();
        //}
        //return new Promise<InstrumentTypeClass>((resolve, reject) => {
        //    if (!this.instrumentWithMetaData.instrument_type) {
        //        reject("No instrument type");
        //    }
        //    let instrumentTypeClass = getTypeClassFromMetaData(this.instrumentWithMetaData)
        //    resolve(instrumentTypeClass);
        //});
    }

    public async getMic(): Promise<string> {
        return this.instrumentWithMetaData.then((instrumentMetaData) => {
            if (instrumentMetaData && instrumentMetaData.mic) {
                return instrumentMetaData.mic;
            }
            else {
                return "";
            }
        }).catch((reason) => {
            return "";
        });
    }

    public async getIsin(): Promise<string> {
        return this.instrumentWithMetaData.then((instrumentMetaData) => {
            if (instrumentMetaData && instrumentMetaData.isin) {
                return instrumentMetaData.isin;
            }
            else {
                return "";
            }

        }).catch((reason) => {
            return "";
        });
        //if (!this.instrumentWithMetaData) {
        //    await this.setInstrumentInfo();
        //}
        //return new Promise<string>((resolve, reject) => {
        //    if (!this.instrumentWithMetaData.isin) {
        //        reject("No isin");
        //    }
        //    resolve(this.instrumentWithMetaData.isin);
        //});
    }

    //public async setInstrumentInfo(): Promise<{}> {
    //    return new Promise((resolve, reject) => {
    //        if (this.instrument) {
    //            this.infrontUI.getModel().then(model => {
    //                model.instrumentInfo(this.instrument.feed, this.instrument.ticker, {
    //                    onData: (data: { instrument: any }) => {
    //                        this.instrumentWithMetaData = data.instrument;
    //                        resolve();
    //                    },
    //                    onError: function (error_code, error_message) {
    //                        reject("No instrument info");
    //                    }
    //                });
    //            });
    //        }
    //    });
    //}
}

function getTypeClassFromMetaData(instrumentWithMetaData: any): InstrumentTypeClass {
    switch (instrumentWithMetaData.instrument_type) {
        case ("NONE"):
            return InstrumentTypeClass.Stock;
        case ("STOCK"):
            return InstrumentTypeClass.Stock;
        case ("NEWS"):
            return InstrumentTypeClass.Stock;
        case ("BOND"):
            return InstrumentTypeClass.Bond;
        case ("EURO_OPTION"):
            return InstrumentTypeClass.Futures;
        case ("FUTURES"):
            return InstrumentTypeClass.Futures;
        case ("COMMODITY"):
            return InstrumentTypeClass.Futures;
        case ("INDEX"):
            return InstrumentTypeClass.Indicator;
        case ("FOREX"):
            return InstrumentTypeClass.Forex;
        case ("US_OPTION"):
            return InstrumentTypeClass.Futures;
        case ("FUND"):
            if (instrumentWithMetaData.instrument_subtype == "Etf")  {
                return InstrumentTypeClass.Etf;
            }
            return InstrumentTypeClass.Fund;
        case ("OPTION"):
            return InstrumentTypeClass.Futures;
        case ("COMBO"):
            return InstrumentTypeClass.Futures;
        case ("CFD"):
            return InstrumentTypeClass.Futures;
        case ("CERTIFICATE"):
            return InstrumentTypeClass.Futures;
        case ("UNKNOWN"):
            return InstrumentTypeClass.Stock;
        default:
            return InstrumentTypeClass.Stock;
    }
}

export enum InstrumentTypeClass {
    Stock,
    Bond,
    Futures,
    Indicator,
    Forex,
    Fund,
    Etf
}
