using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PhoneBookWebApi.Models
{
    public class PhonebookDb: DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        static PhonebookDb()
        {
            Database.SetInitializer<PhonebookDb>(new PhonebookInitializer());
        }
    }
}