/**
 * @license
 * Copyright Infront AS. All Rights Reserved.
 *
 * Use of this source code is governed b
 */
/**
 * @module
 * @description
 * Entry point from which you should export all public angular APIs.
 */

//Angular Module
export { InfrontModule } from "./infront.module";

//Interface widgets
export { Search, SimpleSearch } from "./src/widgets/interfaceWidgets/search";
export { Switch } from "./src/widgets/interfaceWidgets/switch";

//Market data widgets
export { Alert } from "./src/widgets/marketdata/alert";
export { AlertList } from "./src/widgets/marketdata/alertList";
export { BrokerStats } from "./src/widgets/marketdata/brokerstats";
export { ChainViewer } from "./src/widgets/marketdata/chainViewer";
export { Chart } from "./src/widgets/marketdata/chart";
export { FinancialCalendar } from "./src/widgets/marketdata/financialcalendar";
export { Focus } from "./src/widgets/marketdata/focus";
export { FundAllocation } from "./src/widgets/marketdata/fundallocation";
export { FundRiskLevel } from "./src/widgets/marketdata/fundrisklevel";
export { FundStylemap } from "./src/widgets/marketdata/fundStylemap";
export { HistoricalOverview } from "./src/widgets/marketdata/historicalOverview";
export { History } from "./src/widgets/marketdata/history";
export { IndexOverview } from "./src/widgets/marketdata/indexOverview";
export { InstrumentSingleValue } from "./src/widgets/marketdata/instrumentSingleValue";
export { InstrumentValues } from "./src/widgets/marketdata/instrumentvalues";
export { IntradayTrades } from "./src/widgets/marketdata/intradayTrades";
export { IntradayTradesSimple } from "./src/widgets/marketdata/intradaySimpleTrades";
export { MarketList } from "./src/widgets/marketdata/marketList";
export { MyList } from "./src/widgets/marketdata/mylist";
export { NewsList } from "./src/widgets/marketdata/newslist";
export { NewsReader } from './src/widgets/marketdata/newsReader';
export { NewsScroller } from "./src/widgets/marketdata/newsScroller";
export { Orderbook } from "./src/widgets/marketdata/orderbook";
export { QuoteList } from "./src/widgets/marketdata/quotelist";
export { Ranking } from "./src/widgets/marketdata/ranking";
export { ScreenerFilter } from "./src/widgets/marketdata/screener";
export { ValuePair } from "./src/widgets/marketdata/valuepair";
export { SimpleChartOverview } from "./src/widgets/marketdata/simpleChartOverview";

//Trading widgets
export { AssetsPieChart } from "./src/widgets/trading/assetsPieChart";
export { BondsTrading } from "./src/widgets/trading/bondsTrading";
export { CashPositions } from "./src/widgets/trading/cashPositions";
export { NetTrades } from "./src/widgets/trading/netTrades";
export { OrderEntry } from "./src/widgets/trading/orderEntry";
export { Orders } from "./src/widgets/trading/orders";
export { OrderStack } from "./src/widgets/trading/orderStack";
export { PortfolioName } from "./src/widgets/trading/portfolioName";
export { PortfolioSelect } from "./src/widgets/trading/portfolioSelect";
export { PortfolioValues } from "./src/widgets/trading/portfolioValues";
export { PortfolioRanking } from "./src/widgets/trading/portfolioRanking";
export { Positions } from "./src/widgets/trading/positions";
export { SinglePortfolioValue } from "./src/widgets/trading/singlePortfolioValue";
export { Trades } from "./src/widgets/trading/trades";
export { TradingPower } from "./src/widgets/trading/tradingPower";

//Fundamentals widgets
export { Beta } from "./src/widgets/fundamentals/beta";
export { CompanyTitle } from "./src/widgets/fundamentals/companyTitle";
export { Estimates } from "./src/widgets/fundamentals/estimates";
export { Eta } from "./src/widgets/fundamentals/eta";
export { EvolutionChart } from "./src/widgets/fundamentals/evolutionChart";
export { Grpv } from "./src/widgets/fundamentals/grpv";
export { Insiders } from "./src/widgets/fundamentals/insiders";
export { LeagueTable } from "./src/widgets/fundamentals/leagueTable";
export { MultiplesChart } from "./src/widgets/fundamentals/multiplesChart";
export { QuickReport } from "./src/widgets/fundamentals/quickReport";
export { Screener } from "./src/widgets/fundamentals/screener";
export { SectorMomentum } from "./src/widgets/fundamentals/sectorMomentum";
export { ShortPositions } from "./src/widgets/fundamentals/shortPositions";
export { StockPerformances } from "./src/widgets/fundamentals/stockPerformances";
export { UpcomingEvents } from "./src/widgets/fundamentals/upcomingEvents";
export { Valuation } from "./src/widgets/fundamentals/valuation";
export { WorldMap } from "./src/widgets/fundamentals/worldMap";

//Services
export { UserService } from './src/services/user';
export { LoggedInGuard } from './src/services/logged-in.guard';
export { InstrumentService, InstrumentTypeClass } from './src/services/instrument';
export { MarketService, MarketType } from './src/services/market';
export { InfrontUIService } from './src/services/InfrontUI';
export { WTMarketFeed } from './src/services/marketFeeds';
export { TradingService } from './src/services/trading';
export { WidgetService } from './src/services/widgetService';



