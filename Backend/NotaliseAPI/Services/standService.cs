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

    //to do : DELETE e READ
}