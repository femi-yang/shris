package com.mes.server.bean.bfc;

import java.io.Serializable;
import java.util.Calendar;

public class BFCHomePageModule implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public int getGroupID() {
		return GroupID;
	}

	public void setGroupID(int groupID) {
		GroupID = groupID;
	}

	public int getMessageCount() {
		return MessageCount;
	}

	public void setMessageCount(int messageCount) {
		MessageCount = messageCount;
	}

	public String getIcon() {
		return Icon;
	}

	public void setIcon(String icon) {
		Icon = icon;
	}

	public String getUrl() {
		return Url;
	}

	public void setUrl(String url) {
		Url = url;
	}

	public int getType() {
		return Type;
	}

	public void setType(int type) {
		Type = type;
	}

	public int getActive() {
		return Active;
	}

	public void setActive(int active) {
		Active = active;
	}

	public Calendar getCreateTime() {
		return CreateTime;
	}

	public void setCreateTime(Calendar createTime) {
		CreateTime = createTime;
	}

	public Calendar getEditTime() {
		return EditTime;
	}

	public void setEditTime(Calendar editTime) {
		EditTime = editTime;
	}

	public int getCreatorID() {
		return CreatorID;
	}

	public void setCreatorID(int creatorID) {
		CreatorID = creatorID;
	}

	public int getEditorID() {
		return EditorID;
	}

	public void setEditorID(int editorID) {
		EditorID = editorID;
	}
	
	public int getDefault() {
		return Default;
	}

	public void setDefault(int default1) {
		Default = default1;
	}
	
	public String getSecretKey() {
		return SecretKey;
	}
	public void setSecretKey(String secretKey) {
		SecretKey = secretKey;
	}
	
	public int ID;  

	/*
	 *  模块的名称
	 */
	public String Name;
	
	/*
	 * 模块组ID
	 */
	public int GroupID; //   
	
	public int MessageCount;// 消息数

	public String Icon;// 模块的图标

	public String Url; // 模块对应打开的地址

	/*
	 * 模块类型   WEB:0 client:1 App:2
	 */
	public int Type; // 模块对应打开方式
	
	/*
	 * 激活 1  冻结 2  删除3 
	 */
	public int Active;
	
	public Calendar CreateTime;
	 
	public Calendar EditTime; 
	
	public int CreatorID;
	
	public int EditorID; 

	public int Default; 
	
	public String SecretKey; 

	
	public BFCHomePageModule() {}
}
