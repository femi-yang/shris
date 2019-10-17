package com.mes.server.bean.bfc;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

public class BFCHomePageGroup implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public BFCHomePageGroup() {
	}

	public int ID;

	public String Name;

	public String Icon;

	public int Type;

	public int Active;

	public Calendar CreateTime;

	public Calendar EditTime;

	public int CreatorID;

	public int EditorID;

	public int Default;
 
	public List<BFCHomePageModule> ModuleList = new ArrayList<BFCHomePageModule>();

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

	public String getIcon() {
		return Icon;
	}

	public void setIcon(String icon) {
		Icon = icon;
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
 
	public List<BFCHomePageModule> getModuleList() {
		return ModuleList;
	}

	public void setModuleList(List<BFCHomePageModule> moduleList) {
		if (moduleList == null)
			moduleList = new ArrayList<BFCHomePageModule>();
		ModuleList = moduleList;
	}

}
