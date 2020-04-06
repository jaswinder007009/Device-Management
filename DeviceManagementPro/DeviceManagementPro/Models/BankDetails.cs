using System;
using System.Collections.Generic;

namespace DeviceManagementPro.Models
{
    public partial class BankDetails
    {
        public int BankDetailsId { get; set; }
        public int UserId { get; set; }
        public string AadharNumber { get; set; }
        public string PanNumber { get; set; }
        public string BankName { get; set; }
        public string BankBranchName { get; set; }
        public string BankAccountNumber { get; set; }
        public string IfscCode { get; set; }

        public User User { get; set; }
    }
}
