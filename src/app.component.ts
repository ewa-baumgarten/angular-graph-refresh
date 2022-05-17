import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { Browser } from '@syncfusion/ej2-base';

/**
 * Sample for Line Series
 */

 const SERVICE_URI =  'https://services.odata.org/V4/Northwind/Northwind.svc/Orders/';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    @ViewChild("chart")
    public chart: ChartComponent;

    public items: object[];

    public dataSource: DataManager;

    public ngOnInit(): void {
        this.dataSource = new DataManager({ url: SERVICE_URI, adaptor: new ODataV4Adaptor() });
    }

    //Initializing Primary X Axis
    public primaryXAxis: Object = {
        valueType: 'Category',
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis: Object = {       
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 }
    };
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    public width: string = Browser.isDevice ? '100%' : '60%';
    public marker: Object = {
        visible: true,
        height: 10,
        width: 10
    };
    public tooltip: Object = {
        enable: true
    };
    // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
    // custom code end
    public title: string = 'Inflation - Consumer Price';

    add(event) {
        this.chart.addSeries([{
            type: 'StepLine',
            dataSource: this.dataSource,
            query: new Query().take(8),
            width: 2,
            xName: 'CustomerID', 
            yName: 'OrderID', 
            name: "USA"
        }]);
    }

    remove(event) {
        this.chart.removeSeries(1);
    }

    constructor() {
       //code
    };

}