using dm_backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dm_backend.Models
{
    public class device
    {

        public string type { get; set; }
        public string brand { get; set; }
        public string model { get; set; }
        public string assign_date { get; set; }
        public string return_date { get; set; }

    }
}
