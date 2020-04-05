import { HtmlElementsData } from "./HtmlElementsId";
import { HitApi } from "./HitApi";
import { localHostUrl } from "./LocalHost";

export class GeneratePaging 
{
//     currentPage : number
//     maxSize = 5 
//    // selectPage : number
//     elements : HtmlElementsData

//     constructor()
//     {
//         this.elements = new HtmlElementsData();
//     }

//     private generatePage(selectedPageNo : string, sortAttribute : string= "" , sortType : string = "")
//     {   
        
//         let find = (document.getElementById(this.elements.search) as HTMLInputElement).value;
//         let uri = new localHostUrl().uri+"?find="+encodeURI(find)+"&sort="+sortAttribute+"&sort-type="+sortType+"page="+selectedPageNo;
//         new HitApi().HitGetApi(uri);         
//     }

//     selectPage(pageNumber)

//     {
//          var sort = (document.getElementById(this.elements.thead) as HTMLTableRowElement).getAttribute(this.elements.sortAttributr);       
//          var sortType  =  (document.getElementById(this.elements.thead) as HTMLTableRowElement).getAttribute(this.elements.sortType);
//          this.generatePage(pageNumber , sort , sortType);

//     }


//     pagging( totalcount : number , page = 1 , pagesize = 2 )
//     {   this.clearData();
//         let temp : number  = Math.ceil(totalcount / 2); 
//         const maxSize = 5
//         let size : number ;
//         //  if (temp > maxSize )
//         //  {
//         //      size = maxSize ;
//              this.navigateButton( this.elements.previous , size , "previous")
//         //  }
//         //  else{
//         //  let size =page;
//         //  }

//         // this.clearPages();
//        for(let loop=0 ; loop < size ; loop++){
//            this.addPageElement(loop+1)
//            this.navigateButton(this.elements.next , size, "next")
//         }
//         if (temp > maxSize )
//         {
//             size = maxSize ;
//             this.addPageElement( ">>" )
//         }
//     }

//    private navigateButton(value  , size , state)
//     {
//         (document.getElementById("pages") as HTMLDivElement).innerHTML = `<input type="submit" class="page" id="${state}" value="${value}" > `;
//         // if (state == "previous" && )
//     }
//     private addPageElement(start : number , end : number )
//     {
//         for (let loop = start ; loop <= end ; loop++)
//             (document.getElementById("pages") as HTMLDivElement).innerHTML += `<input type="submit" class="page" id="${loop}" value="${loop}" >`;
//     }
    
//     private clearData()
//     {
//         document.getElementById("pages").innerHTML = "";
//     }
   




//     paging(selectPage : number , size : number )
//     {
        
//         let totalPages  = Math.ceil(size/2);
//         let mid = Math.floor(this.maxSize/2) ; 
//         let start : number , end :number;
//         if ((selectPage - mid)>=1  && (selectPage - mid)<=totalPages )
//         {   
//             start = selectPage - mid ;
//             end = selectPage + mid ;
//         }
//         else if((selectPage - mid)>=1  && (selectPage - mid)>totalPages )
//         {
//             start = (totalPages - this.maxSize)-1;
//             end = totalPages;
//         }
//         else if((selectPage - mid)<1  && (selectPage - mid)<=totalPages )
//         {
//             start = 1;
//             end = this.maxSize ;
//         }
//         else{
//             start = 1;
//             end = totalPages;
//         }
//        this.addPageElement(start , end);

    // }
}


