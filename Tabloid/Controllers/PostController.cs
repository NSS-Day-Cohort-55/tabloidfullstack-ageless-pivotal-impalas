using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_postRepository.GetAll());
        }

        [HttpGet("/api/post/user/{id}")]
        public IActionResult GetAllByUserId(int id)
        {
            return Ok(_postRepository.GetAllByUserId(id));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var post = _postRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        {
            post.IsApproved = true;
            if (post.PublishDateTime <= DateTime.MinValue)
            {
                post.PublishDateTime = DateTime.Now;
            }
            post.CreateDateTime = DateTime.Now;
            _postRepository.Add(post);

            return CreatedAtAction("GetById", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Edit(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _postRepository.Edit(post);
            return NoContent();

        }
    }
}
