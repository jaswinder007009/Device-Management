import { BASEURL } from './globals';
class MyDevices {
   
    data: any;
    size: number;
    url: string;
    table1:HTMLTableElement=document.getElementById("tab1") as HTMLTableElement;
    table2:HTMLTableElement=document.getElementById("tab2") as HTMLTableElement;
   tab1:HTMLLIElement=document.getElementById("one") as HTMLLIElement;
   tab2:HTMLLIElement=document.getElementById("two") as HTMLLIElement;
   choice:HTMLLIElement;
   search()
   { 
            
            if(document.querySelector(".mdl-layout__tab.is-active")==this.tab1)
            {

                 this.getCurrentDecice(document.getElementById("waterfall-exp").value)             }
            else{
                
   this.getPreviousDecice(document.getElementById("waterfall-exp").value);
            
            }
}



    async getPreviousDecice(search:string="") {
        this.url = BASEURL + "/api/Device/previous_device/16?search="+search;
        let data = await this.getApiCall(this.url);
        this.data = await data;
        console.log(data);
     
        this.size = data.length;
        this.dynamicGenerate(this.table2);
        return data;

    }
    async getCurrentDecice(search:string="") {
        this.url = BASEURL + "/api/Device/current_device/16?search="+search;
        let data = await this.getApiCall(this.url);
        this.data = await data;
        console.log(data);
        this.size = data.length;
        this.dynamicGenerate(this.table1);
        return data;

    }

    async getApiCall(URL: any) {


        let response = await fetch(URL);
        let data = await (response.json());
        console.log(data);
        return (await data);
    }

  

    dynamicGenerate(table:any) {
        let loop = 0; 
        this.DeleteRows(table) ;
        for (loop = 0; loop < this.data.length; loop++) {
            var row=table.insertRow(loop+1);
            var cell=row.insertCell(0);
            var cell1=row.insertCell(1);
            var cell2=row.insertCell(2);
            var cell3=row.insertCell(3);
            var cell4=row.insertCell(4);
            cell.innerHTML=this.data[loop]["type"]
            cell1.innerHTML=this.data[loop]["brand"]
            cell2.innerHTML=this.data[loop]["model"]
            cell3.innerHTML=this.data[loop]["assign_date"]
            cell4.innerHTML=this.data[loop]["return_date"]
   
        }


    }
   
     DeleteRows(table:any) {
        var rowCount = table.rows.length;
        for (var i = rowCount - 1; i > 0; i--) {
            table.deleteRow(i);
        }
    }
   
    sortTable(n,table) { 
      
        var rows, i, x, y, count = 0; 
        var switching = true; 
        var direction = "ascending"; 

        while (switching) { 
            switching = false; 
             rows= table.rows; 
            for (i = 1; i < (rows.length - 1); i++) { 
                var Switch = false; 
                x = rows[i].getElementsByTagName("TD")[n]; 
                y = rows[i + 1].getElementsByTagName("TD")[n];  
                if (direction == "ascending") { 
 
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) 
                        { 
                        Switch = true; 
                        break; 
                    } 
                } else if (direction == "descending") { 
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) 
                        { 
                        Switch = true; 
                        break; 
                    } 
                } 
            } 
            if (Switch) { 
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
                switching = true;  
                count++; 
            } else { 
                if (count == 0 && direction == "ascending") { 
                    direction = "descending"; 
                    switching = true; 
                } 
            } 
        } 
    } 
}
var mydevices =new MyDevices();
