using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System;
using Tabloid.Models;
using Tabloid.Repositories;
using System.Security.Claims;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
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

        [HttpGet("PostReaction")]
        public IActionResult PostReaction()
        {
            return Ok(_postRepository.GetPostReactions());
        }
        
        [HttpPost("PostReaction")]
        public IActionResult PostReaction(PostReaction postReaction)
        {
            var user = GetCurrentUserProfile();
            postReaction.UserProfileId = user.Id;
            _postRepository.AddPostReaction(postReaction);
            return Ok();
        }
        
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
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
    }
}
