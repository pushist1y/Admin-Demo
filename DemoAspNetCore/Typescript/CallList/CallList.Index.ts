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

    //$(".k-grid-Excel").click(e => { this.excelButtonClick(e as any); });
  }

  excelButtonClick(e: JQueryEventObject) {
    e.preventDefault();
    this.grid.saveAsExcel();
    console.log("excel export");
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

      batch: true,
      editable: "inline",
      //selectable: "row",
      pageable: {
        pageSize: 10
      },
      toolbar: ["create", "excel" /*{ iconClass: "k-icon k-i-table-column-insert-right", text: "Excel"} as kendo.ui.GridToolbarItem*/],
      columns: [
        { field: "id", title: "Id", editable: () => false, aggregates: ["count"], footerTemplate: "Total Count: #=count#", groupFooterTemplate: "Count: #=count#" },
        { field: "status", title: "Status" },
        { field: "name", title: "Name" },
        { field: "callStartDate", format: "{0:dd.MM.yyyy}", title: "Call start date"},
        { field: "lastCallDate", format: "{0:dd.MM.yyyy}", title: "Last call date" },
        { title: "Call sheet", template: "<a href=\"#: callSheet #\">#: callSheetLabel #</a>" },
        { command: ["edit", "destroy"] }
      ] as kendo.ui.TreeListColumn[],
      excel: {
        allPages: true,
        fileName: "Calls.xlsx"
      },
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
        },
        create: {
          url: "/api/data",
          type: "POST",
          data: data => {
            data.callStartDate = data.callStartDate.toISOString();
            data.lastCallDate = data.lastCallDate.toISOString();
            return data;
          }
        },
        destroy: {
          url: (o) => {
            return `/api/data/${o.id}`;
          },
          dataType: "json",
          type: "DELETE"
        },
        update: {
          url: `/api/data`,
          type: "PUT",
          data: data => {
            data.callStartDate = data.callStartDate.toISOString();
            data.lastCallDate = data.lastCallDate.toISOString();
            return data;
          }
        },
        parameterMap: (options, operation) => {
          console.log("Sending request");
          console.log(operation);
          console.log(options);

          if (operation !== "read" && options.models) {
            return { models: kendo.stringify(options.models) };
          }
          return null;
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
        },

      },
      pageSize: 10,
      error: (e) => {
        let text = e.errorThrown + " " + e.xhr.responseText;
        notifyError(text);
        console.error(e);
      },
      group: {
        field: "name",
        aggregates: [{ field: "id", aggregate: "count" }, { field: "callStartDate", aggregate: "min" }, { field: "lastCallDate", aggregate: "max" }]
      },
      aggregate: [{ field: "id", aggregate: "count" }]
      

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

var notificationElement: JQuery;
var popupNotification: kendo.ui.Notification;

export function notifyError(errorText: string) {
  if (!popupNotification) {
    notificationElement = $("span");
    popupNotification = notificationElement.kendoNotification({
      stacking: "down",
      position: {
        top: 30,
        right: 30
      }
    } as kendo.ui.NotificationOptions).data("kendoNotification");
  }

  popupNotification.show(errorText, "error");
}