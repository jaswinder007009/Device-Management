using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dm_backend.Models{
    public class Result <T>
    {
       public List<T> Results { get; set; }
       public int ResultCount { get; set; }
     

    }
}