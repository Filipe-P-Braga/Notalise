using NotaliseAPI.Models;
public class EventService
{
    private Repositorio repo = new Repositorio();

    public void CreateEvent(Event ev)
    {
        repo.CreateEvent(ev);
    }

    public void UpdateEvent(Event ev)
    {
        repo.UpdateEvent(ev);
    }

    // feito DELETE e READ
    public void DeleteEvent(int id)
    {
         repo.DeleteEvent(id);
    }

    public List<Event> GetEvents()
    {
        return repo.GetEvents();
    }

    public Event? GetEventById(int id)
    {
        return repo.GetEventById(id);
    }
}