package com.mycompany.myapp.entity.domain.user;

import java.io.Serializable;
import java.util.Date;

/**
 *
 * 用户表
 *
 */
public class User implements Serializable {

	private static final long serialVersionUID = 1L;

	/** 主键ID */
	private int id;

	/** 登录名称 */
	private String name;

	/** 密码 */
	private String password;

	/** 创建时间 */
	private Date createTime;

	/** 最后登录时间 */
	private Date updateTime;


	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}


}
