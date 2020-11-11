import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteList, InfrontUIService } from 'src/InfrontModule/InfrontAngular';

@Component({
  selector: 'app-fund-list',
  templateUrl: './fund-list.component.html',
  styleUrls: ['./fund-list.component.scss'],
})
export class FundListComponent implements OnInit {
  screenerOptions: Infront.ScreenerWidgetOptions;
  activeFiltersOpts: Infront.ScreenerActiveFiltersWidgetOptions;
  quoteListOptions: Infront.QuoteListWidgetOptions;

  private itemsDisplayed = 10;

  @ViewChild('quoteListElement') quoteListElement: QuoteList;
  constructor(
    private router: Router,
    private infrontUIService: InfrontUIService
  ) {}

  ngOnInit(): void {
    this.createScreenerOptions();
    this.createActiveFiltersOptions();
    this.createQuoteListOptions();
  }

  createScreenerOptions() {
    this.screenerOptions = new Infront.ScreenerWidgetOptions();
    this.screenerOptions.feed = 4500;
    this.screenerOptions.linkChannels = [1337];
    this.screenerOptions.linkAction = Infront.LinkAction.Append;
    this.screenerOptions.filters = [Infront.FilterEnum.Risklevel];
    this.screenerOptions.collapsable = true;
    this.screenerOptions.onChange = (item: Infront.FilterChangeEvent) => {};
    this.screenerOptions.showSearchWidget = true;
  }

  createActiveFiltersOptions() {
    this.activeFiltersOpts = new Infront.ScreenerActiveFiltersWidgetOptions();
    this.activeFiltersOpts.linkChannels = [1337];
  }

  createQuoteListOptions() {
    this.quoteListOptions = new Infront.QuoteListWidgetOptions();
    this.quoteListOptions.linkChannels = [1337];
    this.quoteListOptions.linkAction = Infront.LinkAction.Replace;
    this.quoteListOptions.layout = Infront.ListLayout.DIV;
    this.quoteListOptions.sortable = true;
    this.quoteListOptions.columns = [
      'SORT_NU',
      'FULL_NAME',
      'ONE_D_PERF_SEK',
      'ONE_W_PERF_SEK',
      'ONE_M_PERF_SEK',
      'THREE_M_PERF_SEK',
      'SIX_M_PERF_SEK',
      'ONE_Y_PERF_SEK',
      'YTD_PERF_SEK',
      'THREE_Y_PERF_SEK',
      'FIVE_Y_PERF_SEK',
      'TEN_Y_PERF_SEK',
      'FUND_ONGOING_CHARGE',
      'LAST_TRADE_DATE',
      'STAR_RATING',
      'CONTRIBUTED_RISK',
      'CONTRIBUTED_RECOMMENDATION',
      'CONTRIBUTED_MAIN_SUPPLY',
    ];
    this.quoteListOptions.maxItems = 10;

    this.quoteListOptions.onInstrumentSelected = (
      instrument: Infront.Instrument
    ) => {
      this.router.navigateByUrl(
        `/funds/detail/${instrument.feed}/${instrument.ticker}`
      );
    };
  }

  async showMore() {
    this.itemsDisplayed = this.itemsDisplayed + 10;
    const widget: Infront.QuoteListWidget = this.quoteListElement
      .widget as Infront.QuoteListWidget;
    widget.setMaxItems(this.itemsDisplayed);
  }
}
