using NotaliseAPI.Repository;

public class StandService
{
    private Repositorio repo = new Repositorio();
    
    public void CreateStand(Stand stand)
    {
        repo.CreateStand(stand);
    }

    public void UpdateStand(Stand stand)
    {
        repo.UpdateStand(stand);
    }

    public List<Stand> GetStands()
    {
        return repo.GetStands();
    }

    public Stand? GetStandById(int id)
    {
        return repo.GetStandById(id);
    }

    public List<Stand> GetStandsByEventId(int eventId)
    {
        return repo.GetStandsByEventId(eventId);
    }

    public void DeleteStand(int id)
    {
        repo.DeleteStand(id);
    }
}