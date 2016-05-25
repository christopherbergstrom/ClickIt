package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import data.ClickDAO;
import data.Scores;

@Controller
public class ClickController
{
	@Autowired
	private ClickDAO clickDao;
	
	@ResponseBody
	@RequestMapping("ping")
	public String ping()
	{
		return "pong";
	}
	
	@ResponseBody
	@RequestMapping(path="getScores")
	public List<Scores> getScore()
	{
		return clickDao.getScores();
	}
	
	@ResponseBody
	@RequestMapping(path="score", method=RequestMethod.PUT)
	public Boolean createScore(@RequestBody Scores score)
	{
		return clickDao.createScore(score);
	}
}
