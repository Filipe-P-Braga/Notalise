using Backend.Models;
using Backend.Repositories;

namespace Backend.Services
{
    public class EventService
    {
        private readonly EventRepository _repo;

        public EventService(EventRepository repo)
        {
            _repo = repo;
        }

        public void CreateEvent(Event ev)
        {
            _repo.InsertEvent(ev);
        }
    }
}