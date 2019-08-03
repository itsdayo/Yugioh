using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface IRegisterService
    {
        int Insert(UserAddRequest model);
    }
}