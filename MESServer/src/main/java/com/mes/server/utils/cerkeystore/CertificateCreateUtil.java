package com.mes.server.utils.cerkeystore;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mes.server.utils.Configuration;

public class CertificateCreateUtil
{
	
	private static Logger logger = LoggerFactory.getLogger(CertificateCreateUtil.class);
	
	public static void main(String[] args) {
		String alias = "alias";
		String storepass = "storepass";
		String keypass = "keypass";
		
		String keystore_name = "qiping";
		String cer_name = "qiping";
		
		String ou = "网吧的营业执照";
		boolean is_windows = false;
		String cn = "网吧名";
		String o = "启屏单位名称";
		
		String keystore_path_dir = Configuration.readConfigString("wangba.keystore.save.dir", "config/config") + "/"+ou+"/";
		File key_file = new File(keystore_path_dir);
		if(!key_file.exists()){
			key_file.mkdir();
		}
		String cer_path_dir = Configuration.readConfigString("wangba.cer.save.dir", "config/config") + "/"+ou+"/";
		File cer_file = new File(cer_path_dir);
		if(!cer_file.exists()){
			cer_file.mkdir();
		}
		
	    genkey(alias, storepass, keypass, keystore_name, keystore_path_dir, is_windows, cn, ou, o);
	    
	    export(alias, storepass, cer_name, keystore_name, keystore_path_dir, cer_path_dir, is_windows);
    }
	
	public static void execCommand(String[] arstringCommand) {
		for (int i = 0; i < arstringCommand.length; i++)
		{
			System.out.print(arstringCommand[i] + " ");
		}
		try
		{
			Runtime.getRuntime().exec(arstringCommand);
			
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
		}
	}
	
	public void execCommand(String arstringCommand) {
		try
		{
			Runtime.getRuntime().exec(arstringCommand);
			
		}
		catch (Exception e)
		{
			System.out.println(e.getMessage());
		}
	}
	
	/**
	 *  生成密钥 keystore
	 * 给服务器用于解密的
	 * @param alias 别名
	 * @param storepass 指定密钥库的密码(获取keystore信息所需的密码)
	 * @param keypass 指定别名条目的密码(私钥的密码)
	 * @param keystore_name keystore的文件名
	 * @param keystore_path_dir keystore保存位置
	 * @param is_windows 生成服务器是否 windows
	 * @param cn 网吧名唯一值
	 * @param ou 网吧证件号
	 * @param o 启屏服务商组织
	 */
	public static void genkey(String alias, String storepass, String keypass, String keystore_name, 
	                          String keystore_path_dir, boolean is_windows,
	                          String cn, String ou, String o) {
		File exsitKey = new File(keystore_path_dir + keystore_name + ".keystore");
		if(exsitKey.exists()){
			exsitKey.delete();
		}
		
		String[] arstringCommand = null;
		if (is_windows)
		{
			arstringCommand = new String[] {
			        "cmd ",
			        "/k",
			        "start", // cmd Shell命令
			        
			        "keytool",
			        "-genkey", // -genkey表示生成密钥
			        "-validity", // -validity指定证书有效期(单位：天)，这里是36000天
			        "36500",
			        "-keysize",//     指定密钥长度
			        "1024",
			        "-alias", // -alias指定别名，这里是ss
			        alias,
			        "-keyalg", // -keyalg 指定密钥的算法 (如 RSA DSA（如果不指定默认采用DSA）)
			        "RSA",
			        "-keystore", // -keystore指定存储位置，这里是d:/demo.keystore
			        keystore_path_dir + keystore_name + ".keystore",
			        "-dname",// CN=(名字与姓氏), OU=(组织单位名称), O=(组织名称), L=(城市或区域名称),
			                 // ST=(州或省份名称), C=(单位的两字母国家代码)"
//			        "CN=(TGX), OU=(TGX.INC), O=(TGX), L=(HZ), ST=(ZJ), C=(CN)",
			        "CN="+cn+",OU="+ou+",O="+o+",L=HZ,ST=ZJ,C=CN",
			        "-storepass", // 指定密钥库的密码(获取keystore信息所需的密码)
			        storepass,
			        "-keypass",// 指定别名条目的密码(私钥的密码)
			        keypass,
			        "-v"// -v 显示密钥库中的证书详细信息
			};
		}
		else
		{
			arstringCommand = new String[] {
			        "keytool",
			        "-genkey", // -genkey表示生成密钥
			        "-validity", // -validity指定证书有效期(单位：天)，这里是36000天
			        "36500",
			        "-keysize",//     指定密钥长度
			        "1024",
			        "-alias", // -alias指定别名，这里是ss
			        alias,
			        "-keyalg", // -keyalg 指定密钥的算法 (如 RSA DSA（如果不指定默认采用DSA）)
			        "RSA",
			        "-keystore", // -keystore指定存储位置，这里是d:/demo.keystore
			        keystore_path_dir + keystore_name + ".keystore",
			        "-dname",// CN=(名字与姓氏), OU=(组织单位名称), O=(组织名称), L=(城市或区域名称),
			                 // ST=(州或省份名称), C=(单位的两字母国家代码)"
//			        "CN=(TGX), OU=(TGX.INC), O=(TGX), L=(HZ), ST=(ZJ), C=(CN)",
			        "CN="+cn+",OU="+ou+",O="+o+",L=HZ,ST=ZJ,C=CN",
			        "-storepass", // 指定密钥库的密码(获取keystore信息所需的密码)
			        storepass,
			        "-keypass",// 指定别名条目的密码(私钥的密码)
			        keypass,
			        "-v"// -v 显示密钥库中的证书详细信息
			};
		}
		execCommand(arstringCommand);
		
		while(true){
			try{
				if(!new File(keystore_path_dir + keystore_name + ".keystore").exists()){
					Thread.sleep(100);
				}else{
					break;
				}
			}catch(Exception e){
				logger.error(e.getMessage());
				
				try{
					Thread.sleep(100);
				}catch(Exception ee){
					
				}
			}
		}
		
		System.out.println("------------------keystore: " + keystore_path_dir + keystore_name + ".keystore");
	}
	
	/**
	 * 导出证书文件 cer
	 * 提供给用户用的文件
	 * @param alias 别名
	 * @param storepass 指定密钥库的密码
	 * @param cer_name cer文件名
	 * @param keystore_name keystore文件名
	 * @param keystore_path_dir keystore保存位置
	 * @param cer_path_dir cer保存位置
	 * @param is_windows 生成服务器是否为windows
	 */
	public static void export(String alias, String storepass, 
	                          String cer_name, String keystore_name, String keystore_path_dir, String cer_path_dir, boolean is_windows) {
		File exsitCer = new File(cer_path_dir + cer_name + ".cer");
		if(exsitCer.exists()){
			exsitCer.delete();
		}
		
		String path_name = keystore_path_dir + keystore_name + ".keystore";
		while (!new File(path_name).exists())
		{
			try
			{
				Thread.sleep(100);
			}
			catch (InterruptedException e)
			{
				e.printStackTrace();
			}
		}
		String[] arstringCommand = null;
		if (is_windows)
		{
			arstringCommand = new String[] {
			        "cmd ",
			        "/k",
			        "start", // cmd Shell命令
			        "keytool",
			        "-export", // - export指定为导出操作 
			        "-keystore", // -keystore指定keystore文件，这里是d:/demo.keystore
			        keystore_path_dir + keystore_name + ".keystore",
			        "-alias", // -alias指定别名，这里是ss
			        alias, //账号
			        "-file",//-file指向导出路径
			        cer_path_dir + cer_name + ".cer",
			        "-storepass",// 指定密钥库的密码
			        storepass
			//密码
			
			};
		}
		else
		{
			arstringCommand = new String[] {
			        "keytool",
			        "-export", // - export指定为导出操作 
			        "-keystore", // -keystore指定keystore文件，这里是d:/demo.keystore
			        path_name,
			        "-alias", // -alias指定别名，这里是ss
			        alias, //账号
			        "-file",//-file指向导出路径
			        cer_path_dir + cer_name + ".cer",
			        "-storepass",// 指定密钥库的密码
			        storepass
			//密码
			
			};
		}
		
		execCommand(arstringCommand);

		while(true){
			try{
				if(!new File(cer_path_dir + cer_name + ".cer").exists()){
					Thread.sleep(100);
				}else{
					break;
				}
			}catch(Exception e){
				logger.error(e.getMessage());
				
				try{
					Thread.sleep(100);
				}catch(Exception ee){
					
				}
			}
		}
		
		System.out.println("------------------cer: " + cer_path_dir + cer_name + ".cer");
	}
	
}
