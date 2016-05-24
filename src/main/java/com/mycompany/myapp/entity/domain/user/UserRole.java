package com.mycompany.myapp.entity.domain.user;

import java.io.Serializable;


/**
 *
 * 用户角色表
 *
 */
public class UserRole implements Serializable {

	private static final long serialVersionUID = 1L;

	/** 主键 */
	private Long id;

	/** 用户ID */
	private Long uid;

	/** 角色ID */
	private Long rid;

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUid() {
		return this.uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	public Long getRid() {
		return this.rid;
	}

	public void setRid(Long rid) {
		this.rid = rid;
	}

}
