import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-beranda-sa',
  templateUrl: './beranda-sa.component.html',
  styleUrls: ['./beranda-sa.component.css']
})
export class BerandaSaComponent  {

  title = "app";

  single: any[] = [
    {
      name: "Germany",
      value: 8940000
    },
    {
      name: "USA",
      value: 5000000
    },
  ];

  view: any[] = [700, 200];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = "Country";
  showYAxisLabel = true;
  yAxisLabel = "Population";

  colorScheme = {
    domain: ["#1abc9c", "#f1c40f", "#C7B42C", "#AAAAAA"]
  };

  onSelect(event) {
    console.log(event);
  }
}
