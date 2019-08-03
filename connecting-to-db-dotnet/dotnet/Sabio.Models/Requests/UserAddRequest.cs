using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests
{
    public class UserAddRequest
    {
        public string Username { get; set; }

        [Required]
        [EmailAddress, StringLength(100, MinimumLength = 10, ErrorMessage = "Email should be a minimum of 10 and a maximum of 100 characters")]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,}",
         ErrorMessage = "Password must have at least one lowercase and one uppercase letter.")]
        public string Password { get; set; }

        [Compare(nameof(Password), ErrorMessage = "Passwords do not match")]
        public string PasswordConfirm { get; set; }
    }
}