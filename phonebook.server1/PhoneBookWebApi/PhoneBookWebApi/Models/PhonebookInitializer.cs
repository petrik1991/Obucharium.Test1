using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PhoneBookWebApi.Models
{
    public class PhonebookInitializer: DropCreateDatabaseAlways<PhonebookDb>
    {
        public readonly string[] names =
        {
            "Jeff Bezos",
            "Bill Gates",
            "Warren Buffett",
            "Bernard Arnault",
            "Mark Zuckerberg",
            "Amancio Ortega",
            "Carlos Slim",
            "Charles Koch",
            "David Koch",
            "Larry Ellison"
        };

        protected override void Seed(PhonebookDb context)
        {
            foreach(var name in names)
            {
                context.Contacts.Add(new Contact
                {
                    Name = name,
                    Phone = Math.Abs((int)name.GetHashCode()).ToString().Substring(0, 6).PadRight(6, '0')
                });
            }

            base.Seed(context);
        }
    }
}