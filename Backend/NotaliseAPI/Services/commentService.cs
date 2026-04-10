public class CommentService
{
    private Repositorio repo = new Repositorio();
    
    public void CreateComment(Comment comment)
    {
        repo.CreateComment(comment);
    }

    public void UpdateComment(Comment comment)
    {
        repo.UpdateComment(comment);
    }

    public List<Comment> GetComments()
    {
        return repo.GetComments();
    }

    public List<Comment> GetCommentsByStandId(int standId)
    {
        return repo.GetCommentsByStandId(standId);
    }

    public Comment? GetCommentById(int id)
    {
        return repo.GetCommentById(id);
    }

    public void DeleteComment(int id)
    {
        repo.DeleteComment(id);
    }
}
