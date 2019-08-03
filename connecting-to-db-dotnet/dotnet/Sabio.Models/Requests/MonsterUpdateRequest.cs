using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Requests
{
    public class MonsterUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Desc { get; set; }
        public string Attribute { get; set; }
    }
}