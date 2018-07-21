using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PhoneBookWebApi.Models
{
    public class Contact
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [Required]
        [JsonProperty("name")]
        public string Name { get; set; }

        [Required]
        [RegularExpression("\\d+", ErrorMessage = "Field 'Age' need be a number")]
        [JsonProperty("age")]
        public string Age { get; set; }

        [Required]
        [JsonProperty("number")]
        public string Phone { get; set; }

        [JsonProperty("groupId")]
        public int? GroupId { get; set; }
    }
}