using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; }
        public string Username { get; set; }
        public string PasswordConfirm { get; set; }
        public string Password { get; set; }
    }
}