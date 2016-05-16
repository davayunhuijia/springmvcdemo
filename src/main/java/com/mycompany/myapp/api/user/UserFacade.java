package com.mycompany.myapp.api.user;

import com.mycompany.myapp.entity.domain.user.User;

public interface UserFacade  {
	
	/**
     *  
     * @param  
     * @return
     */
    public User selectById(int id);


}
