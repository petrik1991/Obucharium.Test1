using System;
using System.Data.Entity;
using System.Linq;

namespace PhoneBookWebApi.Models
{
    public class PhonebookInitializer: DropCreateDatabaseIfModelChanges<PhonebookDb>
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

        public static string[] groups =
        {
            "Family", "Work", "Friends", "Study"
        };

        protected override void Seed(PhonebookDb context)
        {
            context.Groups.AddRange(groups.ToList().Select((g, inc) => new Group { Id = inc, Name = g }));

            foreach (var name in names)
            {
                context.Contacts.Add(new Contact
                {
                    Name = name,
                    Age = new Random().Next(10, 80).ToString(),
                    Phone = Math.Abs((int)name.GetHashCode()).ToString().Substring(0, 6).PadRight(6, '0'),
                    Group = context.Groups.FirstOrDefault(g => g.Id == new Random().Next(0, 3))
                });
            }

            base.Seed(context);
        }
    }
}