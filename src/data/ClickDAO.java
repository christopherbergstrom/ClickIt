package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

@Transactional
public class ClickDAO
{
	@PersistenceContext
	private EntityManager em;
	
	public List<Scores> getScores()
	{
		return em.createQuery("SELECT s FROM Scores s ORDER BY s.score DESC", Scores.class).setMaxResults(10).getResultList();
	}
	
	public Boolean createScore(Scores score)
	{
		em.persist(score);
		if (!em.contains(score))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
}
