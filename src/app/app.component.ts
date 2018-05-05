import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'Exchange Rates';
   rates = [];

   currencies = [
    "EUR",
    "USD",
    "GBP",
    "AUD",
    "CAD",
    "JPY"
   ];

   spread = 5;
   searched = false;
   ascending = false;

   ascendingCaracter = "▲";
   descendingCaracter = "▼";

  constructor(private http: HttpClient){
  }


  subtractSpread = function(value) {
    return value - ((value * this.spread) / 100);
  }

  addSpread = function(value){
     return value + ((value * this.spread) / 100);
  }

  UpdateExchangeRateTables = function(ccy, dateOfCcy){
    let request = "https://exchangeratesapi.io/api/" + dateOfCcy + "?base=" + ccy
    this.http.get(request)
    .subscribe(data => {
      this.searched = true;
      this.rates = Object.keys(data.rates).map(function(key){
        return [String(key), data.rates[key]];
      });
    });

  }


isInSelectedCcy = function(ccyValue){
  let result = this.currencies.indexOf(ccyValue);
  if (result === -1){
    return false;
  }else{
    return true;
  }
}



SortTable = function(){

  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("ccyTable");
  switching = true;

while (switching) {

  switching = false;
  rows = table.getElementsByTagName("TR");

  for (i = 1; i < (rows.length - 1); i++) {

    shouldSwitch = false;

    x = rows[i].getElementsByTagName("TD")[0];
    y = rows[i + 1].getElementsByTagName("TD")[0];

    if (this.ascending){
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
    }else{
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }

    }
  }
  if (shouldSwitch) {
    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    switching = true;
  }
}

    if (this.ascending){
      this.ascending = false;
    }else{
      this.ascending = true;
    }

}


}
