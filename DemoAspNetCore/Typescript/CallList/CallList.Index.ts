/// <reference path ="../Types/kendo.all.d.ts"/> 

(window as any).initializeCallList = initialize;

export async function initialize(pageId: number) {
  let index = new CallListIndex(pageId);
  await index.initialize();
}

export class CallListIndex {
  private grid: kendo.ui.Grid;

  constructor(private pageId: number) {

  }

  async initialize() {
    let gridOptions = this.getGridOptions();
    let dsOptions = this.getDataSourceOptions();
    gridOptions.dataSource = new kendo.data.DataSource(dsOptions);

    this.grid = $("#dataGrid").empty().kendoGrid(gridOptions).data("kendoGrid");
  }

  getGridOptions(): kendo.ui.GridOptions {
    return {
      filterable: {
        mode: "row", operators: {
          string: { contains: "Contains" }
        }
      },
      sortable: true,
      resizable: true,
      //selectable: "row",
      pageable: {
        pageSize: 10
      },
      toolbar: ["create"],
      columns: [
        { field: "id", title: "Id" },
        { field: "status", title: "Status" },
        { field: "name", title: "Name" },
        { field: "callStartDate", format: "{0:dd.MM.yyyy}", title: "Call start date" },
        { field: "lastCallDate", format: "{0:dd.MM.yyyy}", title: "Last call date" },
        { title: "Call sheet", template: "<a href=\"#: callSheet #\">#: callSheetLabel #</a>" }
      ] as kendo.ui.TreeListColumn[]
    } as kendo.ui.GridOptions;
  }

  getDataSourceOptions(): kendo.data.DataSourceOptions {
    return {
      type: this.getKendoDsType(),
      transport: {
        read: {
          url: `/api/data/index/${this.pageId}`,
          dataType: "json",
          type: "GET"
        }
      },
      serverPaging: false,
      serverFiltering: false,
      serverSorting: false,
      serverAggregates: false,
      serverGrouping: false,
      schema: {
        data: "data",
        total: "total",
        model: {
          id: "id",
          fields: {
            "id": { type: "number" },
            "status": { type: "string" },
            "name": { type: "string" },
            "callStartDate": { type: "date" },
            "lastCallDate": { type: "date" },
            "callSheetLabel": { type: "string" },
            "callSheet": { type: "string" }
          }
        }
      },
      pageSize: 10
    } as kendo.data.DataSourceOptions;
  }

  getKendoDsType() {
    if ((kendo.data.transports as any)['aspnetmvc-ajax']) {
      return 'aspnetmvc-ajax';
    } else {
      throw new Error('The kendo.aspnetmvc.min.js script is not included.');
    }
  }
}