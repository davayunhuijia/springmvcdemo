package com.mycompany.myapp.api.user;

import com.mycompany.myapp.entity.domain.user.User;

//业务接口类：提供给controller调用，实现在core中，controller只能引用facade 不能引用service及mapper。


public interface UserFacade  {
	
	/**
     *  
     * @param  
     * @return
     */

    public User findById(int id);
	
	
	public int updateUser(User user);
	
	
	public int insertUser(User user);
}
