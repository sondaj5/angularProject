/// <reference path="./typings/InfrontUI.d.ts" />

declare global {
    interface Window {
        Highcharts: any;
    }
}

import * as Highcharts from 'highcharts/highstock';
window.Highcharts = Highcharts;
declare function require(name:string);
require('highcharts/modules/map')(Highcharts);
require('highcharts/highcharts-more')(Highcharts);

Highcharts.setOptions({
    "global": {
        "useUTC": false
    }
});

//Import and make D3 available for widgets
let d3 = require('d3');

//Angular module imports
import { NgModule, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Search, SimpleSearch } from "./src/widgets/interfaceWidgets/search";
import { Switch } from "./src/widgets/interfaceWidgets/switch";

//Market data widgets
import { Alert } from "./src/widgets/marketdata/alert";
import { AlertList } from "./src/widgets/marketdata/alertList";
import { BrokerStats } from "./src/widgets/marketdata/brokerstats";
import { ChainViewer } from "./src/widgets/marketdata/chainViewer";
import { Chart } from "./src/widgets/marketdata/chart";
import { FinancialCalendar } from "./src/widgets/marketdata/financialcalendar";
import { Focus } from "./src/widgets/marketdata/focus";
import { FundAllocation } from "./src/widgets/marketdata/fundallocation";
import { FundRiskLevel } from "./src/widgets/marketdata/fundrisklevel";
import { FundStylemap } from "./src/widgets/marketdata/fundStylemap";
import { HistoricalOverview } from "./src/widgets/marketdata/historicalOverview";
import { History } from "./src/widgets/marketdata/history";
import { IndexOverview } from "./src/widgets/marketdata/indexOverview";
import { InstrumentSingleValue } from "./src/widgets/marketdata/instrumentSingleValue";
import { InstrumentValues } from "./src/widgets/marketdata/instrumentvalues";
import { IntradayTrades } from "./src/widgets/marketdata/intradayTrades";
import { IntradayTradesSimple } from "./src/widgets/marketdata/intradaySimpleTrades";
import { MarketList } from "./src/widgets/marketdata/marketList";
import { MyList } from "./src/widgets/marketdata/mylist";
import { NewsList } from "./src/widgets/marketdata/newslist";
import { NewsReader } from './src/widgets/marketdata/newsReader';
import { NewsScroller } from "./src/widgets/marketdata/newsScroller";
import { PutCall } from "./src/widgets/marketdata/putCall";
import { Orderbook } from "./src/widgets/marketdata/orderbook";
import { QuoteList } from "./src/widgets/marketdata/quotelist";
import { Ranking } from "./src/widgets/marketdata/ranking";
import { ScreenerFilter } from "./src/widgets/marketdata/screener";
import { ValuePair } from "./src/widgets/marketdata/valuepair";
import { SimpleChartOverview } from "./src/widgets/marketdata/simpleChartOverview";

//Trading widgets
import { AssetsPieChart } from "./src/widgets/trading/assetsPieChart";
import { BondsTrading } from "./src/widgets/trading/bondsTrading";
import { CashPositions } from "./src/widgets/trading/cashPositions";
import { NetTrades } from "./src/widgets/trading/netTrades";
import { OrderEntry } from "./src/widgets/trading/orderEntry";
import { Orders } from "./src/widgets/trading/orders";
import { OrderStack } from "./src/widgets/trading/orderStack";
import { PortfolioName } from "./src/widgets/trading/portfolioName";
import { PortfolioSelect } from "./src/widgets/trading/portfolioSelect";
import { PortfolioValues } from "./src/widgets/trading/portfolioValues";
import { PortfolioRanking } from "./src/widgets/trading/portfolioRanking";
import { Positions } from "./src/widgets/trading/positions";
import { SinglePortfolioValue } from "./src/widgets/trading/singlePortfolioValue";
import { Trades } from "./src/widgets/trading/trades";
import { TradingPower } from "./src/widgets/trading/tradingPower";

//Fundamentals widgets
import { Beta } from "./src/widgets/fundamentals/beta";
import { CompanyTitle } from "./src/widgets/fundamentals/companyTitle";
import { Estimates } from "./src/widgets/fundamentals/estimates";
import { Eta } from "./src/widgets/fundamentals/eta";
import { EvolutionChart } from "./src/widgets/fundamentals/evolutionChart";
import { Grpv } from "./src/widgets/fundamentals/grpv";
import { Insiders } from "./src/widgets/fundamentals/insiders";
import { LeagueTable } from "./src/widgets/fundamentals/leagueTable";
import { MultiplesChart } from "./src/widgets/fundamentals/multiplesChart";
import { QuickReport } from "./src/widgets/fundamentals/quickReport";
import { Screener } from "./src/widgets/fundamentals/screener";
import { SectorMomentum } from "./src/widgets/fundamentals/sectorMomentum";
import { ShortPositions } from "./src/widgets/fundamentals/shortPositions";
import { StockPerformances } from "./src/widgets/fundamentals/stockPerformances";
import { UpcomingEvents } from "./src/widgets/fundamentals/upcomingEvents";
import { Valuation } from "./src/widgets/fundamentals/valuation";
import { WorldMap } from "./src/widgets/fundamentals/worldMap";

//Services
import { UserService } from './src/services/user';
import { LoggedInGuard } from './src/services/logged-in.guard';
import { InstrumentService, InstrumentTypeClass } from './src/services/instrument';
import { MarketService, MarketType } from './src/services/market';
import { InfrontUIService } from './src/services/InfrontUI';
import { WTMarketFeed } from './src/services/marketFeeds';
import { TradingService } from './src/services/trading';
import { WidgetService } from './src/services/widgetService';
import { ActiveFilters } from './src/widgets/marketdata/activeFilters';


@NgModule({
    declarations: [
        Search,
        SimpleSearch,
        Switch,

        Alert,
        AlertList,
        BrokerStats,
        ChainViewer,
        Chart,
        FinancialCalendar,
        Focus,
        FundAllocation,
        FundRiskLevel,
        FundStylemap,
        HistoricalOverview,
        History,
        IndexOverview,
        InstrumentSingleValue,
        InstrumentValues,
        IntradayTrades,
        IntradayTradesSimple,
        MarketList,
        MyList,
        NewsList,
        NewsReader,
        NewsScroller,
        Orderbook,
        PutCall,
        QuoteList,
        Ranking,
        ValuePair,
        ScreenerFilter,
        ActiveFilters,
		SimpleChartOverview,

        AssetsPieChart,
        BondsTrading,
        CashPositions,
        NetTrades,
        OrderEntry,
        Orders,
        OrderStack,
        PortfolioName,
        PortfolioSelect,
        PortfolioValues,
        PortfolioRanking,
        Positions,
        SinglePortfolioValue,
        Trades,
        TradingPower,

        Beta,
        CompanyTitle,
        Estimates,
        Eta,
        EvolutionChart,
        Grpv,
        Insiders,
        LeagueTable,
        MultiplesChart,
        QuickReport,
        Screener,
        SectorMomentum,
        ShortPositions,
        StockPerformances,
        UpcomingEvents,
        Valuation,
        WorldMap
    ],

    imports: [
        CommonModule
    ],

    providers: [UserService, LoggedInGuard, MarketService, TradingService, InstrumentService],

    exports: [
        Search,
        SimpleSearch,
        Switch,

        Alert,
        AlertList,
        BrokerStats,
        ChainViewer,
        Chart,
        FinancialCalendar,
        Focus,
        FundAllocation,
        FundRiskLevel,
        FundStylemap,
        HistoricalOverview,
        History,
        IndexOverview,
        InstrumentSingleValue,
        InstrumentValues,
		IntradayTrades,
        IntradayTradesSimple,
        MarketList,
        MyList,
        NewsList,
        NewsReader,
        NewsScroller,
        Orderbook,
        PutCall,
        QuoteList,
        Ranking,
        ValuePair,
        ScreenerFilter,
        ActiveFilters,
		SimpleChartOverview,

        AssetsPieChart,
        BondsTrading,
        CashPositions,
        NetTrades,
        OrderEntry,
        Orders,
        OrderStack,
        PortfolioName,
        PortfolioSelect,
        PortfolioValues,
        PortfolioRanking,
        Positions,
        SinglePortfolioValue,
        Trades,
        TradingPower,

        Beta,
        CompanyTitle,
        Estimates,
        Eta,
        EvolutionChart,
        Grpv,
        Insiders,
        LeagueTable,
        MultiplesChart,
        QuickReport,
        Screener,
        SectorMomentum,
        ShortPositions,
        StockPerformances,
        UpcomingEvents,
        Valuation,
        WorldMap
    ]
})


export class InfrontModule {
}

