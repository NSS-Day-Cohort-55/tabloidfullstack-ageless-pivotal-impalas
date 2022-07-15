using Microsoft.AspNetCore.Mvc;
using Tabloid.Repositories;
using Tabloid.Models;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostTagRepository _ptRepo;

        public PostTagController(IPostTagRepository ptRepo)
        {
            _ptRepo = ptRepo;
        }


        // GET: api/<PostTagController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PostTagController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("/postTag/post/{id}")]
        public IActionResult GetAllTagsByPostId(int id)
        {
            var tags = _ptRepo.GetAllTagsByPostId(id);
            return Ok(tags);
        }

        [HttpGet("/postTag/post/{postId}/tag/{tagId}")]
        public bool CheckIfExists(int postId, int tagId)
        {
            PostTag postTag = new PostTag()
            {
                PostId = postId,
                TagId = tagId
            };
            if (_ptRepo.CheckIfExists(postTag))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        // POST api/<PostTagController>
        [HttpPost]
        public void Post(PostTag pt)
        {
            _ptRepo.Add(pt);
        }

        // PUT api/<PostTagController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PostTagController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
