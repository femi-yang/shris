package com.mes.server.bean.bfc;

import java.io.Serializable;
 

public class BFCHomeUser  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public String Name="Shris";
	public String CompanyName="Shris.Mes";  
	public String Faces="./static/images/userface.png";
	public String CompanyFaces="./static/images/shris.jpg";
	public String LoginName="";
	
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getCompanyName() {
		return CompanyName;
	}
	public void setCompanyName(String companyName) {
		CompanyName = companyName;
	}
	public String getFaces() {
		return Faces;
	}
	public void setFaces(String faces) {
		Faces = faces;
	}
	public String getCompanyFaces() {
		return CompanyFaces;
	}
	public void setCompanyFaces(String companyFaces) {
		CompanyFaces = companyFaces;
	}
	public String getLoginName() {
		return LoginName;
	}
	public void setLoginName(String loginName) {
		LoginName = loginName;
	}
}
