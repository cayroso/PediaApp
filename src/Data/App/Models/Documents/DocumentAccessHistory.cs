﻿using Common.Extensions;
using Data.App.Models.Users;
using System;

namespace Data.App.Models.Documents
{
    public class DocumentAccessHistory
    {
        public string DocumentAccessHistoryId { get; set; }

        public string DocumentId { get; set; }
        public virtual Document Document { get; set; }

        public string AccessedById { get; set; }
        public virtual User AccessedBy { get; set; }

        DateTime _dateAccessed;
        public DateTime DateAccessed
        {
            get => _dateAccessed;
            set => _dateAccessed = value.Truncate().AsUtc();
        }
    }
}
