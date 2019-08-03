using System.Collections.Generic;
using AngleSharp.Html.Dom;
using Sabio.Models.Domain;
using Sabio.Models.Requests;

namespace Sabio.Services
{
    public interface IMonsterService
    {
        List<Monster> GetAll();

        int Insert(MonsterAddRequest model);

        List<MonsterType> GetAllTypes();

        void Update(MonsterUpdateRequest model);

        void Delete(int id);

        void Scrapper();

        List<ArticleTag> GetPage();
    }
}