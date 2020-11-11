// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  basePath: '/',
  custodyTradingPwaBasePath: 'http://content-iis-tst.sebank.se/components/financialmarket/custody-trading/dev/#/',
  infrontTokenUrlLive: 'https://api.seb.se/open/prod/fundlist/v2/infront/auth',
  analyticsPath: 'https://assets.adobedtm.com/71e07657e0b1660036c6a3a1ee5aeea1a106b3e8/satelliteLib-1903d55effa0f2befbeb99ab2e0c73dac4304621-staging.js',
  IBPFundLinkAPI: '/wow/api/FundLink/',
  IBPBuyFundPath: '/wow/1000/1200/wowc1251.aspx?B2=',
  IBPBuyFundLoginPath: '/wow/1000/1000/wow1020.aspx?RDI=',
  IBPBuyFundLoginRedirectPath: '/WOW/wow/1000/1200/wow1260.aspx?P1=',
  IBPSellFundPath: '/ibp/sell/',
  IBFFundLinkAPI: '/kgb/api/FundLink/',
  IBFBuyFundPath: '/kgb/1000/1200/kgbc1203.aspx?B2=',
  IBFBuyFundLoginPath: '/kgb/1000/1000/kgb1020.aspx?RDI=',
  IBFBuyFundLoginRedirectPath: '/kgb/1000/1200/kgb1260.aspx?P1=',
  IBFSellFundPath: '/ibf/sell/',
  ibpUri: 'https://privat.ib.seb.se/',
  ibfUri: 'https://foretag.ib.seb.se/',
  sebseUri: 'https://seb.se/',
  becomeACustomerPath: '/privat/bli-kund'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
