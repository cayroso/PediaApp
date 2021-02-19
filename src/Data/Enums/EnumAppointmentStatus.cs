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

        ParentCancelled,
        ClinicCancelled,

        ParentRejected,
        ClinicRejected,

        Accepted,
        InProgress,
        Completed,
        Archived
    }
}
