package com.mycompany.myapp.entity.domain.user;

import java.io.Serializable;


/**
 *
 * 角色权限表
 *
 */
public class RolePermission implements Serializable {

	private static final long serialVersionUID = 1L;

	/** 主键 */
	private Long id;

	/** 角色ID */
	private Long rid;

	/** 权限ID */
	private Long pid;

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRid() {
		return this.rid;
	}

	public void setRid(Long rid) {
		this.rid = rid;
	}

	public Long getPid() {
		return this.pid;
	}

	public void setPid(Long pid) {
		this.pid = pid;
	}

}
