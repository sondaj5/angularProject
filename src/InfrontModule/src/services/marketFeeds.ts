import { Injectable, Optional } from '@angular/core';
import { UserService } from './user';
import { Subject, Subscription } from 'rxjs';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

export interface infrontCountryInfo {
  a2: string;
  country_name: string;
}
const wtCountrycodes: { [cKey: string]: infrontCountryInfo } = {
  '0': {
    a2: '',
    country_name: 'World',
  },
  '1': {
    a2: 'US',
    country_name: 'United States',
  },
  '2': {
    a2: 'CA',
    country_name: 'Canada',
  },
  '7': {
    a2: 'RU',
    country_name: 'Russian Federation',
  },
  '20': {
    a2: 'EG',
    country_name: 'Egypt',
  },
  '27': {
    a2: 'ZA',
    country_name: 'South Africa',
  },
  '30': {
    a2: 'GR',
    country_name: 'Greece',
  },
  '31': {
    a2: 'NL',
    country_name: 'Netherlands',
  },
  '32': {
    a2: 'BE',
    country_name: 'Belgium',
  },
  '33': {
    a2: 'FR',
    country_name: 'France',
  },
  '34': {
    a2: 'ES',
    country_name: 'Spain',
  },
  '36': {
    a2: 'HU',
    country_name: 'Hungary',
  },
  '39': {
    a2: 'IT',
    country_name: 'Italy',
  },
  '40': {
    a2: 'RO',
    country_name: 'Romania',
  },
  '41': {
    a2: 'CH',
    country_name: 'Switzerland',
  },
  '43': {
    a2: 'AT',
    country_name: 'Austria',
  },
  '44': {
    a2: 'GB',
    country_name: 'United Kingdom',
  },
  '45': {
    a2: 'DK',
    country_name: 'Denmark',
  },
  '46': {
    a2: 'SE',
    country_name: 'Sweden',
  },
  '47': {
    a2: 'NO',
    country_name: 'Norway',
  },
  '48': {
    a2: 'PL',
    country_name: 'Poland',
  },
  '49': {
    a2: 'DE',
    country_name: 'Germany',
  },
  '52': {
    a2: 'MX',
    country_name: 'Mexico',
  },
  '54': {
    a2: 'AR',
    country_name: 'Argentina',
  },
  '55': {
    a2: 'BR',
    country_name: 'Brazil',
  },
  '56': {
    a2: 'CL',
    country_name: 'Chile',
  },
  '58': {
    a2: 'VE',
    country_name: 'Venezuela, Bolivarian Republic of',
  },
  '60': {
    a2: 'MY',
    country_name: 'Malaysia',
  },
  '61': {
    a2: 'AU',
    country_name: 'Australia',
  },
  '62': {
    a2: 'ID',
    country_name: 'Indonesia',
  },
  '63': {
    a2: 'PH',
    country_name: 'Philippines',
  },
  '64': {
    a2: 'NZ',
    country_name: 'New Zealand',
  },
  '65': {
    a2: 'SG',
    country_name: 'Singapore',
  },
  '66': {
    a2: 'TH',
    country_name: 'Thailand',
  },
  '81': {
    a2: 'JP',
    country_name: 'Japan',
  },
  '82': {
    a2: 'KR',
    country_name: 'Korea, Republic of',
  },
  '84': {
    a2: 'VN',
    country_name: 'Vietnam',
  },
  '86': {
    a2: 'CN',
    country_name: 'China',
  },
  '90': {
    a2: 'TR',
    country_name: 'Turkey',
  },
  '91': {
    a2: 'IN',
    country_name: 'India',
  },
  '92': {
    a2: 'PA',
    country_name: 'Pakistan',
  },
  '212': {
    a2: 'MA',
    country_name: 'Morocco',
  },
  '216': {
    a2: 'TN',
    country_name: 'Tunisia',
  },
  '230': {
    a2: 'MU',
    country_name: 'Mauritius',
  },
  '233': {
    a2: 'GH',
    country_name: 'Ghana',
  },
  '234': {
    a2: 'NG',
    country_name: 'Nigeria',
  },
  '250': {
    a2: 'RW',
    country_name: 'Rwanda',
  },
  '254': {
    a2: 'KE',
    country_name: 'Kenya',
  },
  '255': {
    a2: 'TZ',
    country_name: 'Tanzania, United Republic of',
  },
  '256': {
    a2: 'UG',
    country_name: 'Uganda',
  },
  '258': {
    a2: 'MZ',
    country_name: 'Mozambique',
  },
  '260': {
    a2: 'ZM',
    country_name: 'Zambia',
  },
  '263': {
    a2: 'ZW',
    country_name: 'Zimbabwe',
  },
  '264': {
    a2: 'NA',
    country_name: 'Namibia',
  },
  '265': {
    a2: 'MW',
    country_name: 'Malawi',
  },
  '267': {
    a2: 'BW',
    country_name: 'Botswana',
  },
  '268': {
    a2: 'SZ',
    country_name: 'Swaziland',
  },
  '351': {
    a2: 'PT',
    country_name: 'Portugal',
  },
  '352': {
    a2: 'LU',
    country_name: 'Luxembourg',
  },
  '353': {
    a2: 'IE',
    country_name: 'Ireland',
  },
  '354': {
    a2: 'IS',
    country_name: 'Iceland',
  },
  '356': {
    a2: 'MT',
    country_name: 'Malta',
  },
  '358': {
    a2: 'FI',
    country_name: 'Finland',
  },
  '359': {
    a2: 'BG',
    country_name: 'Bulgaria',
  },
  '370': {
    a2: 'LT',
    country_name: 'Lithuania',
  },
  '371': {
    a2: 'LV',
    country_name: 'Latvia',
  },
  '372': {
    a2: 'EE',
    country_name: 'Estonia',
  },
  '380': {
    a2: 'UA',
    country_name: 'Ukraine',
  },
  '385': {
    a2: 'HR',
    country_name: 'Croatia',
  },
  '386': {
    a2: 'SI',
    country_name: 'Slovenia',
  },
  '420': {
    a2: 'CZ',
    country_name: 'Czech Republic',
  },
  '852': {
    a2: 'HK',
    country_name: 'Hong Kong',
  },
  '886': {
    a2: 'TW',
    country_name: 'Taiwan, Province of China',
  },
  '972': {
    a2: 'IL',
    country_name: 'Israel',
  },
  '996': {
    a2: 'KG',
    country_name: 'Kyrgyzstan',
  },
  '997': {
    a2: '',
    country_name: 'Infront (997)',
  },
};

export interface WTMarketFeed extends Infront.MarketInfo {
  //service: string; //	Market description
  //provider: string;//	Vendor description
  //access: string; //	Describes the update frequency of the vendor
  //feed: number;//	Internal feed number of market
  //min_delay_secs: number;
  //max_delay_secs: number;
  //country: number;
  //data_types: string[]; //Infront.FeedDataTypes
  //custom_codes: string[];
  //hidden: boolean;
  //countryCode: string;
  //trading: boolean;

  //Above is how we get from WT-backend, then we extend with the following upon receive to support market search
  countryName: string;
  type: string; //InfrontConstants.SearchItemType
  _typeclass: string;
  flag: string;
}

export class CountryHelper {
  static getAlpha2(infrontCountry: string): string {
    if (InfrontUtil.isNumber(infrontCountry)) {
      var key = infrontCountry;
      if (wtCountrycodes.hasOwnProperty(key)) {
        return wtCountrycodes[key].a2;
      }
    }
    return null;
  }
  static getCountryInfoFromA2(a2: string): infrontCountryInfo {
    for (let cKey in wtCountrycodes) {
      if (
        wtCountrycodes.hasOwnProperty(cKey) &&
        wtCountrycodes[cKey].a2 == a2
      ) {
        return wtCountrycodes[cKey];
      }
    }
    return null;
  }

  static getToolkitFlagClass(infrontCountry: string): string {
    var a2 = CountryHelper.getAlpha2(infrontCountry);
    if (a2 != null) {
      return 'cell-flag-' + a2.toLowerCase();
    }
    return '';
  }
}
export class TerminalWebService {
  public ServiceID: string;
  public DisplayName: string;
  public ServiceGUI: string;
  public URL: string;
  public SymbolTypes: string;
  public PID: string;
  constructor(lines: string[]) {
    for (let line of lines) {
      let trimmedLine = line.trim();
      let parts = trimmedLine.split('=');
      if (parts.length > 1) {
        let propName = parts[0].trim();
        let value = trimmedLine.substring(propName.length + 1).replace("'", '');
        this[propName] = value;
      }
    }
  }
}

enum FeedType {
  Features = 'FEATURES',
  WebFeature = 'WEB_FEATURE',
}

class FeedFeatureString {
  [key: string]: string;
  constructor(equalSeparatedFeatureString: string) {
    let parts = equalSeparatedFeatureString.split('=');
    if (parts.length == 2 && parts[0]) {
      this[parts[0]] = parts[1];
    }
    //Note: Possibly add the following if we find featurestrings without a value
    //else if (equalSeparatedFeatureString) {
    //    this[equalSeparatedFeatureString] = true;
    //}
  }
}

export class FeedInfo {
  private infrontSource = new Subject<Infront.UI>();
  public infrontDefined$ = this.infrontSource.asObservable();

  private infrontPromise: Promise<Infront.UI>;

  private visual: any;
  //private marketDataRequest: Promise<Object>;
  private marketsPromise: Promise<WTMarketFeed[]>;

  //private marketList: WTMarketFeed[];
  private kidServices: TerminalWebService[];
  private features: FeedFeatureString[];
  private userCountries: infrontCountryInfo[];

  private marketDataConnectedStatus = new Subject<Infront.InfrontStatus>();
  public marketDataConnectedStatus$ = this.marketDataConnectedStatus.asObservable();
  public lastDisconnectedEvent: Infront.DisconnectEvent;

  private isReconnecting: boolean = false;
  public isDisconnected: Infront.Observable<boolean> = new Infront.Observable(
    false
  );
  public disconnectedReason: string = '';

  private mwsLogSubscription: Subscription;
  private reconnectSubscription: Subscription;

  constructor(private infrontUI: Infront.UI, private model: Infront.Model) {
    this.setMarketList();
  }

  private setMarketList() {
    this.marketsPromise = new Promise((resolve, reject) => {
      this.model.marketListsPromise().then((markets) => {
        this.userCountries = [];
        this.features = [];
        let wtMarkets = [];
        for (let market of markets) {
          if (this.isWebFeatureFeed(market)) {
            for (let featurestring of market.additional_info.split('\n')) {
              this.features.push(new FeedFeatureString(featurestring));
            }
            //this.features.AddRange(m.custom_codes.Select<string, FeatureString>(x => new FeatureString(x)));
          } else if (this.isTerminalFeatureFeed(market)) {
            this.setKidServices(market.additional_info.split('\n'));
          } else if (
            market.data_types.length > 1 ||
            (market.data_types.length == 1 &&
              market.data_types[0] != 'INDICIES')
          ) {
            let wtMarket = <WTMarketFeed>market;
            if (wtMarket.hasOwnProperty('country')) {
              // var countryName = "World";
              let countryInfo =
                wtCountrycodes[wtMarket.country] || wtCountrycodes[0];

              if (this.userCountries.indexOf(countryInfo) == -1) {
                this.userCountries.push(countryInfo);
              }
              // Adding a few extra properties to simplify thing later
              wtMarket.countryName = countryInfo.country_name;
              wtMarket.type = InfrontConstants.SearchItemType.FEED;
              wtMarket._typeclass = Infront.CssConstants.kSearchResultFeed;
              wtMarket.flag =
                'cell-flag  cell-flag-' + countryInfo.a2.toLowerCase();
            }
            wtMarkets.push(wtMarket);
          }
        }
        resolve(wtMarkets);
      });
    });
  }

  async getMainIndexMarketFeed(instrument: Infront.Instrument) {
    return new Promise<number>((resolve, reject) => {
      this.model
        .instrumentInfoPromise(instrument.feed, instrument.ticker)
        .then((instrument) => {
          if (instrument && instrument.under_feed) {
            resolve(instrument.under_feed);
          } else {
            resolve(instrument.feed);
          }
        });
    });
  }

  async getMainIndex(feed: number): Promise<Infront.Instrument> {
    let metaData = await this.getMarketMetadata(feed);
    return new Infront.Instrument(
      metaData['main_index_feed'] ? metaData['main_index_feed'] : metaData.feed,
      metaData['main_index']
    );
  }

  async getMarketMetadata(feed: number): Promise<Infront.FeedMetaData> {
    var promise = new Promise<Infront.FeedMetaData>((resolve, reject) => {
      //this.getModel().then((model) => {
      this.model
        .getFeedHandler()
        .getFeed(feed, (metaData: Infront.FeedMetaData) => {
          if (!metaData) {
            reject('No metadata found');
          } else {
            resolve(metaData);
          }
        });
      //});
    });
    return promise.then(
      (val: Infront.FeedMetaData) => {
        return val;
      },
      (error: string) => {
        return null;
      }
    );
  }

  async getMarketList(): Promise<WTMarketFeed[]> {
    return this.marketsPromise;
  }
  async getKidServices(): Promise<TerminalWebService[]> {
    await this.model.marketListsPromise();
    return this.kidServices; //TODO: Check if this still works at some point
    //if (this.kidServices) {
    //    return this.kidServices;
    //}
    //else {
    //    let response = await this.marketDataRequest;
    //    this.kidServices = JSON.parse(response["kid_services"]);
    //    return this.kidServices;
    //}
  }
  async getUserCountries(): Promise<infrontCountryInfo[]> {
    if (this.userCountries) {
      return this.userCountries;
    } else {
      await this.getMarketList();
      return this.userCountries;
    }
  }

  private isWebFeatureFeed(m: Infront.MarketInfo): boolean {
    return m.data_types.length == 1 && m.data_types[0] == FeedType.WebFeature;
  }
  private isTerminalFeatureFeed(m: Infront.MarketInfo): boolean {
    return (
      m.data_types.length == 2 &&
      (m.data_types[0] == FeedType.Features ||
        m.data_types[1] == FeedType.Features)
    );
  }
  private setKidServices(customCode: string[]) {
    let inServices = false;
    let itemStart = 0;
    for (let i = 0; i < customCode.length; i++) {
      let line = customCode[i].trim();
      if (line.length > 0) {
        if (!inServices && line.indexOf('ExternalWebServices=<') >= 0) {
          inServices = true;
        }
        if (line == 'item') {
          itemStart = i + 1;
        } else if (line.indexOf('end') == 0) {
          let service = new TerminalWebService(
            customCode.slice(itemStart, i - itemStart)
          );
          this.kidServices.push(service);
          if (line.endsWith('>')) {
            break; //Means all webservices are processed so skip doing anything else
          }
        }
      }
    }
  }
}
