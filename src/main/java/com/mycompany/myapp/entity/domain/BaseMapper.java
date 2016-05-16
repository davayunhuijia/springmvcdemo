
package com.mycompany.myapp.entity.domain;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 *
 *
 * 基础接口方法
 * </p>
 *
 * @author 
 * @date 
 * @version
 */
public interface BaseMapper<T extends Serializable, M extends BaseDomain>  {


	public int insert(M domain);
	
    /**
     * 插入
     * @param domain 实体
     * @return
     */
    int insertSelective(M domain);


    /**
     * 根据主键删除
     * @param key 主键
     * @return
     */
    int deleteByPrimaryKey(T key);


    /**
     * 根据实体删除（慎用，以免删除全表数据）
     * @param domain
     * @return
     */
    @Deprecated
    int deleteByObj(M domain);


    /**
     * 修改对象
     * @param domain
     * @return
     */
    int updateByPrimaryKeySelective(M domain);


    /**
     * 通过主键获取对象
     * @param key
     * @return
     */
    M selectByPrimaryKey(T key);


    ///////////////////////////获取条数start///////////////////////////////////////
    /**
     * 通过传入实体参数获取条数
     * @param domain
     * @return
     */
    int selectCountByObj(M domain);



    ///////////////////////////获取条数end/////////////////////////////////////////


    ///////////////////////////获取实体start/////////////////////////////////////////
    /**
     * 通过传入 实体参数 获取对象
     * @param domain
     * @return
     */
    M selectDomainByObj(M domain);


    /**
     * 通过传入 实体参数 获取对象
     * @param domain
     * @param whereSql 自定义WhereSql 例如:   String whereSql ="id > 10 and id < 20 ";
     * @return
     */
    M selectDomainByObj(M domain, String whereSql);
    ////////////////////////////获取实体end////////////////////////////////////////


    ///////////////////////////获取实体列表 start//////////////////////////////////////////
    /**
     * 获取实体列表
     * @param domain
     * @return
     */
    List<M> selectListByObj(M domain);


    /////////////////////////////获取实体end/////////////////////////////////////

	/**
	 * 插入列表
	 * @param domainList
	 * @version      
	 */ 
	void insertList(List<M> domainList);
	

	/**
	 * <p>
	 * 
	 * 分布查询
	 *
	 * </p>
	 * @param domain
	 * @return
	 *  
	 * @author	hz15081621 
	 * @date	2015年10月20日 下午2:06:54
	 * @version      
	 */ 
	//public Pagination<M> selectPage(M domain);
}
