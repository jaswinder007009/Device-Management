using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RequestAdmin.Models
{
    public class Result <T>
    {
        public int ResultCount { get; set; }
        public List<T> Results { get; set; }
      
     

    }
}