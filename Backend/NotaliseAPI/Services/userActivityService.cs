using NotaliseAPI.Models;
using NotaliseAPI.Repository;

public class UserActivityService
{
    private Repositorio repo = new Repositorio();

    public List<UserActivity> GetUserActivities()
    {
        return repo.GetUserActivities();
    }
}
