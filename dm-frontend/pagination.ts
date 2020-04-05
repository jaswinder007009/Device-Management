// import { HtmlElementsData } from "./HtmlElementsId";
// import { HitApi } from "./HitApi";
// import { localHostUrl } from "./LocalHost";

export class GeneratePaging {}
// {
//     currentPage : number
//     totalResultCount  : number
//     elements : HtmlElementsData
//     totalRowsInTable : number =10
//     totalPages : number

//     constructor( totalCount : number)
//     {
//         this.totalResultCount = parseInt((document.getElementById("pagination") as HTMLDivElement).getAttribute(this.elements.resultcount));
//         this.totalPages = Math.ceil(this.totalResultCount / this.totalRowsInTable) 
//         this.elements = new HtmlElementsData();
//     }





//     private generatePage(selectedPageNo : string, sortAttribute : string= "" , sortType : string = "")
//     {   
        
//         let find = (document.getElementById(this.elements.search) as HTMLInputElement).value;
//         let uri = new localHostUrl().uri+"?find="+encodeURI(find)+"&sort="+sortAttribute+"&sort-type="+sortType+"page="+selectedPageNo+"page-size="+this.pageSize;
//         new HitApi().HitGetApi(uri);     
            
//     }

//     selectPage(pageNumber)

//     {
//          var sort = (document.getElementById(this.elements.thead) as HTMLTableRowElement).getAttribute(this.elements.sortAttributr);       
//          var sortType  =  (document.getElementById(this.elements.thead) as HTMLTableRowElement).getAttribute(this.elements.sortType);
//          this.generatePage(pageNumber , sort , sortType);

//     }



//     // pagging( totalcount : number , page = 1 , pagesize = 2 )
//     // {   this.clearData();
//     //     let temp : number  = Math.ceil(totalcount / 2); 
//     //     const totalResultCount = 5
//     //     let size : number ;
//     //     //  if (temp > totalResultCount )
//     //     //  {
//     //     //      size = totalResultCount ;
//     //          this.navigateButton( this.elements.previous , size , "previous")
//     //     //  }
//     //     //  else{
//     //     //  let size =page;
//     //     //  }

//     //     // this.clearPages();
//     //    for(let loop=0 ; loop < size ; loop++)
//     //        this.addPageElement(loop+1)
//     //        this.navigateButton(this.elements.next , )

//     //     if (temp > totalResultCount )
//     //     {
//     //         size = totalResultCount ;
//     //         this.addPageElement( ">>" )
//     //     }
//     // }

//    private navigateButton(value  , size , state)
//     {
//         (document.getElementById("pagination") as HTMLDivElement).innerHTML = `<input type="submit" class="page" id="${state}" value="${value}" > `;
//         //if (state == "previous" && )
//     }
//     public addPageElement(start : number  =1, end : number  = this.totalResultCount)
//     {
//         this.clearData();
//         for (let loop = start ; loop <= end ; loop++)
//         (document.getElementById("pagination") as HTMLDivElement).innerHTML += `<input type="submit" class="page" id="${loop}" value="${loop}" >`;
//     }
    
//     private clearData()
//     {
//         document.getElementById("pagination").innerHTML = "";
//     }
   




//     paging(selectPage : number , size : number )
//     {
        
//         let totalPages  = Math.ceil(size/2);
//         let mid = Math.floor(this.totalResultCount/2) ; 
//         let start : number , end :number;
//         if ((selectPage - mid)>=1  && (selectPage - mid)<=totalPages )
//         {   
//             start = selectPage - mid ;
//             end = selectPage + mid ;
//         }
//         else if((selectPage - mid)>=1  && (selectPage - mid)>totalPages )
//         {
//             start = (totalPages - this.totalResultCount)-1;
//             end = totalPages;
//         }
//         else if((selectPage - mid)<1  && (selectPage - mid)<=totalPages )
//         {
//             start = 1;
//             end = this.totalResultCount ;
//         }
//         else{
//             start = 1;
//             end = totalPages;
//         }
//        this.addPageElement(start , end);

//     }
// }


