using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngleSharp.Html.Dom;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/monsters")]
    [ApiController]
    public class MonsterApiController : BaseApiController
    {
        private IMonsterService _monsterService;

        public MonsterApiController(IMonsterService monsterService, ILogger<MonsterApiController> logger) : base(logger)
        {
            _monsterService = monsterService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Insert(MonsterAddRequest model)
        {
            try
            {
                ItemResponse<int> resp = new ItemResponse<int>();
                resp.Item = _monsterService.Insert(model);
                return Created201(resp);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpGet]
        public ActionResult<ItemResponse<List<Monster>>> GetAll()
        {
            try
            {
                List<Monster> monster = _monsterService.GetAll();
                // _monsterService.Scrapper();

                if (monster == null)
                {
                    return StatusCode(404, new ErrorResponse("Monsters not found."));
                }
                else
                {
                    ItemResponse<List<Monster>> resp = new ItemResponse<List<Monster>>();
                    resp.Item = monster;
                    return StatusCode(200, resp);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpGet("yugioh")]
        [AllowAnonymous]
        public ActionResult<ItemResponse<List<ArticleTag>>> GetPage()
        {
            try
            {
                _monsterService.Scrapper();
                var body = _monsterService.GetPage();
                ItemResponse<List<ArticleTag>> resp = new ItemResponse<List<ArticleTag>>();
                resp.Item = body;
                return StatusCode(200, resp);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpGet("types")]
        public ActionResult<ItemResponse<List<MonsterType>>> GetAllTypes()
        {
            try
            {
                List<MonsterType> type = _monsterService.GetAllTypes();

                if (type == null)
                {
                    return StatusCode(404, new ErrorResponse("Types not found."));
                }
                else
                {
                    ItemResponse<List<MonsterType>> resp = new ItemResponse<List<MonsterType>>();
                    resp.Item = type;
                    return StatusCode(200, resp);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            try
            {
                SuccessResponse resp = new SuccessResponse();
                _monsterService.Delete(id);
                return Ok200(resp);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }

        [HttpPut("{monId:int}")]
        public ActionResult<SuccessResponse> Update(MonsterUpdateRequest model, int monId)
        {
            try
            {
                if (monId == model.Id)
                {
                    _monsterService.Update(model);

                    SuccessResponse resp = new SuccessResponse();

                    return Ok200(resp);
                }
                else
                {
                    return NotFound404(new ErrorResponse("Bad Request: Body Id does not match Entity"));
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                return StatusCode(500, new ErrorResponse(ex.Message));
            }
        }
    }
}