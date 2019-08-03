using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class Monster
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Type { get; set; }

        public string Desc { get; set; }
        public string Attribute { get; set; }
        public int Atk { get; set; }
        public int Def { get; set; }
    }
}