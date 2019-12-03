using System.Collections.Generic;
using System.Linq;
using AngularAspTodo.Data;
using AngularAspTodo.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularAspTodo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public TodoController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            return _db.Todos.ToArray();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todoToDelete = _db.Todos.Find(id);
            if (todoToDelete == null)
            {
                return NotFound();
            }

            _db.Remove(todoToDelete);
            _db.SaveChanges();
            
            return Ok(todoToDelete);
        }

        [HttpPost]
        public IActionResult Post(Todo todo)
        {
            if (ModelState.IsValid)
            {
                _db.Todos.Add(todo);
                _db.SaveChanges();
            }

            return Ok(todo);
        }
    }
}