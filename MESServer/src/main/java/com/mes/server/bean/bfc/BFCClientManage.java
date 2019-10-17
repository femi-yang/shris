package com.mes.server.bean.bfc;

import java.io.Serializable; 
 

public class BFCClientManage implements Serializable {


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public boolean IsUpdate;

	public String VersionID;

	public String Url;

	public String Description;

	public boolean isIsUpdate() {
		 
		return IsUpdate;
	}

	public void setIsUpdate(boolean isUpdate) {
		IsUpdate = isUpdate;
	}

	public String getVersionID() {
		return VersionID;
	}

	public void setVersionID(String versionID) {
		VersionID = versionID;
	}

	public String getUrl() {
		return Url;
	}

	public void setUrl(String url) {
		Url = url;
	}

	public String getDescription() {
		return Description;
	}

	public void setDescription(String description) {
		Description = description;
	}

}
