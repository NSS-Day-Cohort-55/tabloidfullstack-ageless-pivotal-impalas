using Microsoft.AspNetCore.Mvc;
using Tabloid.Models;
using Tabloid.Repositories;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }


        // GET: api/<CommentController>
        [HttpGet]
        public string Get()
        {
            return "g";
        }

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("/api/comment/post/{postId}")]
        public IActionResult GetCommentsByPost(int postId)
        {

            return Ok(_commentRepository.GetAllPostComments(postId));
        }

        // POST api/<CommentController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CommentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
