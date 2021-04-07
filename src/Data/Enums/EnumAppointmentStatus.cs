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
