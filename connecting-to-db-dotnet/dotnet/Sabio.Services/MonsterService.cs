using System;
using System.Collections.Generic;
using System.Text;
using global::Sabio.Data.Providers;
using global::Sabio.Models.Requests;
using System.Data;
using System.Data.SqlClient;
using Sabio.Models.Domain;
using Sabio.Data;
using System.Net;
using AngleSharp.Html.Parser;
using AngleSharp.Html.Dom;

namespace Sabio.Services
{
    public class MonsterService : IMonsterService
    {
        private IDataProvider _dataProvider;

        public MonsterService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        public int Insert(MonsterAddRequest model)
        {
            int retVal = 0;
            _dataProvider.ExecuteNonQuery("dbo.MonsterCards_Insert", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                SqlParameter parm = new SqlParameter();
                parm.ParameterName = "@Id";
                parm.SqlDbType = SqlDbType.Int;
                parm.Direction = ParameterDirection.Output;
                parms.Add(parm);

                parms.AddWithValue("@Name", model.Name);
                parms.AddWithValue("@Type", model.Type);
                parms.AddWithValue("@Desc", model.Desc);
                parms.AddWithValue("@Attribute", model.Attribute);
            }, returnParameters: delegate (SqlParameterCollection parms)
            {
                Int32.TryParse(parms["@Id"].Value.ToString(), out retVal);
            });

            return retVal;
        }

        public List<Monster> GetAll()
        {
            List<Monster> monsterList = null;

            _dataProvider.ExecuteCmd("dbo.MonsterCards_SelectALL",
                inputParamMapper: null,

                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    Monster monsterModel = MonsterMapper(reader);

                    if (monsterList == null)
                    {
                        monsterList = new List<Monster>();
                    }

                    monsterList.Add(monsterModel);
                });

            return monsterList;
        }

        public List<ArticleTag> GetPage()
        {
            List<ArticleTag> pageList = null;

            _dataProvider.ExecuteCmd("dbo.Pages_SelectALL",
                inputParamMapper: null,

                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    ArticleTag pageModel = PageMapper(reader);

                    if (pageList == null)
                    {
                        pageList = new List<ArticleTag>();
                    }

                    pageList.Add(pageModel);
                });

            return pageList;
        }

        public List<MonsterType> GetAllTypes()
        {
            List<MonsterType> monsterList = null;

            _dataProvider.ExecuteCmd("dbo.SubTypes_SelectALL",
                inputParamMapper: null,

                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    MonsterType monsterModel = MonsterTypeMapper(reader);

                    if (monsterList == null)
                    {
                        monsterList = new List<MonsterType>();
                    }

                    monsterList.Add(monsterModel);
                });

            return monsterList;
        }

        private int InsertPage(string date, string href, string content)
        {
            int retVal = 0;
            _dataProvider.ExecuteNonQuery("dbo.Pages_Insert", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                SqlParameter parm = new SqlParameter();
                parm.ParameterName = "@Id";
                parm.SqlDbType = SqlDbType.Int;
                parm.Direction = ParameterDirection.Output;
                parms.Add(parm);

                parms.AddWithValue("@Date", date);
                parms.AddWithValue("@Href", href);
                parms.AddWithValue("@Title", content);
            }, returnParameters: delegate (SqlParameterCollection parms)
            {
                Int32.TryParse(parms["@Id"].Value.ToString(), out retVal);
            });

            return retVal;
        }

        public void Scrapper()
        {
            var results = new List<ArticleTag>();
            var webClient = new WebClient();
            var html = webClient.DownloadString("https://www.yugioh-card.com/uk/news/?tag=news");

            var parser = new HtmlParser();

            var document = parser.ParseDocument(html);
            var articles = document.QuerySelectorAll("tr");

            foreach (var article in articles)
            {
                var articleTag = new ArticleTag();

                var date = articleTag.Content = article.ChildNodes[1].TextContent;
                var href = article.QuerySelector("a").GetAttribute("href");
                var content = article.ChildNodes[3].TextContent;

                InsertPage(date, href, content);
            }
        }

        public void Update(MonsterUpdateRequest model)
        {
            _dataProvider.ExecuteNonQuery("dbo.MonsterCards_Update", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                parms.AddWithValue("@Id", model.Id);
                parms.AddWithValue("@Name", model.Name);
                parms.AddWithValue("@Type", model.Type);
                parms.AddWithValue("@Description", model.Desc);
                parms.AddWithValue("@Attribute", model.Attribute);
            });
        }

        public void Delete(int id)
        {
            _dataProvider.ExecuteNonQuery("dbo.MonsterCards_DeleteById", inputParamMapper: delegate (SqlParameterCollection parms)
            {
                parms.AddWithValue("@Id", id);
            });
        }

        private static Monster MonsterMapper(IDataReader reader)
        {
            Monster model = new Monster();

            int startingIndex = 0;
            model.Id = reader.GetSafeInt32(startingIndex++);
            model.Name = reader.GetSafeString(startingIndex++);
            model.Type = reader.GetSafeString(startingIndex++);
            model.Desc = reader.GetSafeString(startingIndex++);

            model.Atk = reader.GetSafeInt32(startingIndex++);
            model.Def = reader.GetSafeInt32(startingIndex++);
            model.Attribute = reader.GetSafeString(startingIndex++);
            return model;
        }

        private static ArticleTag PageMapper(IDataReader reader)
        {
            ArticleTag model = new ArticleTag();

            int startingIndex = 0;
            model.Id = reader.GetSafeInt32(startingIndex++);
            model.Date = reader.GetSafeString(startingIndex++);
            model.Url = reader.GetSafeString(startingIndex++);
            model.Content = reader.GetSafeString(startingIndex++);

            return model;
        }

        private static MonsterType MonsterTypeMapper(IDataReader reader)
        {
            MonsterType model = new MonsterType();

            int startingIndex = 0;
            model.Id = reader.GetSafeInt32(startingIndex++);
            model.Name = reader.GetSafeString(startingIndex++);

            return model;
        }
    }
}