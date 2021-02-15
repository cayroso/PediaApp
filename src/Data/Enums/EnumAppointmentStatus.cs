using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Enums
{
    public enum EnumAppointmentStatus
    {
        Unknown = 0,
        
        ParentRequested,
        ClinicRequested,
        
        //NeedClinicConfirmation,
        //NeedParentConfirmation,
        
        ParentRejected,
        ClinicRejected,

        Accepted,

        InProgress,
        
        Completed,
        
        ParentCancelled,
        ClinicCancelled,

        Archived
    }
}
