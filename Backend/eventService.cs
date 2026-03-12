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

    // futuras implementações
    public void DeleteEvent(int id)
    {
        // TODO
    }

    public List<Event> GetEvents()
    {
        return new List<Event>();
    }
}
