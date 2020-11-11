import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfrontUIService } from 'src/InfrontModule/InfrontAngular';

@Component({
  selector: 'app-fund-details',
  templateUrl: './fund-details.component.html',
  styleUrls: ['./fund-details.component.scss'],
})
export class FundDetailsComponent implements OnInit {
  chartOptions: Infront.ChartWidgetOptions2;

  constructor(
    private route: ActivatedRoute,
    private infrontUIService: InfrontUIService
  ) {
    const callback = new Infront.DataOptions();
    callback.onData = (data: Object[]) => {
      console.warn(
        data.map((elem) => elem['pid'] + ':' + elem['sid'] + '|' + elem['host'])
      );
    };
    this.infrontUIService.getModel().then((model) => {
      model.getConnectionStatus(callback, false);
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      var feed = params.get('feed');
      var ticker = params.get('ticker');

      this.createChartOptions(new Infront.Instrument(+feed, ticker));
    });
  }

  clean() {
    // const serv1 = this.model.streamingManager.getServerPool().GetRealtime(new Infront.PidSid(2, 73), this.model);
    // const serv2 = this.model.streamingManager.getServerPool().GetRealtime(new Infront.PidSid(2, 2), this.model);
    // console.warn('srv1', serv1.conn.OutstandingRequests());
    // console.warn('srv2', serv2.conn.OutstandingRequests());
    // serv1.conn.ClearOutstandingRequests();
    // serv2.conn.ClearOutstandingRequests();
  }

  createChartOptions(instrument: Infront.Instrument) {
    this.chartOptions = new Infront.ChartWidgetOptions2();
    this.chartOptions.instruments = [instrument];
    this.chartOptions.chartUI = {
      tooltipVersion: 'none',
      periodMenu: false,
      indicatorMenu: false,
      expandButton: false,
      chartTypeMenu: false,
      searchBox: false,
      showStaticInfo: false,
    };

    this.chartOptions.targetCurrency = 'SEK';
    this.chartOptions.maxLookupDays = 7;
    this.chartOptions.decimals = 2;
    this.chartOptions.xDateFormat = '%Y-%m-%d';
    this.chartOptions.showVolume = false;
    this.chartOptions.zoom = false;

    this.chartOptions.chartTypeID = 'area';
    this.chartOptions.defaultPeriod = '1Y';
    this.chartOptions.selectablePeriods = [
      '1M',
      '3M',
      '6M',
      'YTD',
      '1Y',
      '3Y',
      '5Y',
      '10Y',
    ];
    this.chartOptions.invertYAxis = true;
    this.chartOptions.invertXAxis = true;
    this.chartOptions.noSpacing = true;

    // this.chartOptions.widgetStateCallback = (state) => {
    //   if (state === Infront.WidgetState.Subscribed) {
    //     // setInterval(() => { this.clean(); }, 1000);
    //   }
    // }
  }
}
