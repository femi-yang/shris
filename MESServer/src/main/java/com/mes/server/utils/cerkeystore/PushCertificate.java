package com.mes.server.utils.cerkeystore;

// /*******************************************************************************
// * Copyright 2014 flybug.
// * 
// * Licensed under the Apache License, Version 2.0 (the "License"); you may not
// * use this file except in compliance with the License. You may obtain a copy of
// * the License at
// * 
// * http://www.apache.org/licenses/LICENSE-2.0
// * 
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// * License for the specific language governing permissions and limitations under
// * the License.
// *******************************************************************************/

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.Signature;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.util.Date;

import javax.crypto.Cipher;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import base.tina.external.encrypt.TinaCrypt;


/**
 * @author flybug
 */
public class PushCertificate
{
	private static Logger logger = LoggerFactory.getLogger(PushCertificate.class);
	/**
	 * Java密钥库(Java Key Store，JKS)KEY_STORE
	 */
	public static final String KEY_STORE = "JKS";
	
	public static final String X509      = "X.509";
	
	//客户端
	
	/**
	 * 公钥加密
	 * 
	 * @param data
	 * @param certificatePath
	 * @return
	 * @throws Exception
	 */
	public static byte[] encryptByPublicKey(byte[] data, String certificatePath) throws Exception {
		FileInputStream in = null;
		try
		{
			in = new FileInputStream(certificatePath);
			// 取得公钥
			PublicKey publicKey = getPublicKey(in);
			in.close();
			// 对数据加密
			Cipher cipher = Cipher.getInstance(publicKey.getAlgorithm());
//			Cipher cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			
			return cipher.doFinal(data);
		}
		finally
		{
			if (in != null) in.close();
		}
		
	}
	
	/**
	 * 公钥解密
	 * 
	 * @param data
	 * @param certificatePath
	 * @return
	 * @throws Exception
	 */
	public static byte[] decryptByPublicKey(byte[] data, String certificatePath) throws Exception {
		FileInputStream in = null;
		try
		{
			in = new FileInputStream(certificatePath);
			// 取得公钥
			PublicKey publicKey = getPublicKey(in);
			in.close();
			// 对数据加密
			Cipher cipher = Cipher.getInstance(publicKey.getAlgorithm());
			cipher.init(Cipher.DECRYPT_MODE, publicKey);
			
			return cipher.doFinal(data);
		}
		finally
		{
			if (in != null) in.close();
		}
	}
	
	/**
	 * 由Certificate获得公钥
	 * 
	 * @param certificatePath
	 * @return
	 * @throws Exception
	 */
	private static PublicKey getPublicKey(InputStream in) throws Exception {
		Certificate certificate = getCertificate(in);
		PublicKey key = certificate.getPublicKey();
		return key;
	}
	
	/**
	 * 获得Certificate
	 * 
	 * @param certificatePath
	 * @return
	 * @throws Exception
	 */
	private static Certificate getCertificate(InputStream in) throws Exception {
		CertificateFactory certificateFactory = CertificateFactory.getInstance(X509);
		Certificate certificate = certificateFactory.generateCertificate(in);
		return certificate;
	}
	
	/**
	 * 公钥加密
	 * 
	 * @param data
	 * @param certificatePath
	 * @return
	 * @throws Exception
	 */
	public static byte[] encryptByPublicKey(byte[] data, InputStream in) throws Exception {
		try
		{
			// 取得公钥
			PublicKey publicKey = getPublicKey(in);
			// 对数据加密
			Cipher cipher = Cipher.getInstance(publicKey.getAlgorithm());
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			return cipher.doFinal(data);
		}
		finally
		{
			if (in != null) in.close();
		}
		
	}
	
	/**
	 * 公钥解密
	 * 
	 * @param data
	 * @param certificatePath
	 * @return
	 * @throws Exception
	 */
	public static byte[] decryptByPublicKey(byte[] data, InputStream in) throws Exception {
		try
		{
			// 取得公钥
			PublicKey publicKey = getPublicKey(in);
			// 对数据加密
			Cipher cipher = Cipher.getInstance(publicKey.getAlgorithm());
			cipher.init(Cipher.DECRYPT_MODE, publicKey);
			
			return cipher.doFinal(data);
		}
		finally
		{
			if (in != null) in.close();
		}
	}
	
	//服务端
	/**
	 * 由KeyStore获得私钥
	 * 
	 * @param keyStorePath
	 * @param alias
	 * @param password
	 * @return
	 * @throws Exception
	 */
	private static PrivateKey getPrivateKey(InputStream in, String alias, String password) throws Exception {
		KeyStore ks = getKeyStore(in, password);
		PrivateKey key = (PrivateKey) ks.getKey(alias, password.toCharArray());
		return key;
	}
	
	/**
	 * 获得Certificate
	 * 
	 * @param keyStorePath
	 * @param alias
	 * @param password
	 * @return
	 * @throws Exception
	 */
	private static Certificate getCertificate(InputStream in, String alias, String password) throws Exception {
		KeyStore ks = getKeyStore(in, password);
		Certificate certificate = ks.getCertificate(alias);
		
		return certificate;
	}
	
	/**
	 * 获得KeyStore
	 * 
	 * @param keyStorePath
	 * @param password
	 * @return
	 * @throws Exception
	 */
	private static KeyStore getKeyStore(InputStream is, String password) throws Exception {
		KeyStore ks = KeyStore.getInstance(KEY_STORE);
		ks.load(is, password.toCharArray());
		return ks;
	}
	
	/**
	 * 私钥加密
	 * 
	 * @param data
	 * @param keyStorePath
	 * @param alias
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static byte[] encryptByPrivateKey(byte[] data, String keyStorePath, String alias, String password) throws Exception {
		FileInputStream in = null;
		try
		{
			
			in = new FileInputStream(keyStorePath);
			// 取得私钥
			PrivateKey privateKey = getPrivateKey(in, alias, password);
			// 对数据加密
			Cipher cipher = Cipher.getInstance(privateKey.getAlgorithm());
			cipher.init(Cipher.ENCRYPT_MODE, privateKey);
			return cipher.doFinal(data);
		}
		finally
		{
			if (in != null) in.close();
		}
	}
	
	/**
	 * 私钥解密
	 * 
	 * @param data
	 * @param keyStorePath
	 * @param alias
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static byte[] decryptByPrivateKey(byte[] data, String keyStorePath, String alias, String password) throws Exception {
		FileInputStream in = null;
		try
		{
			in = new FileInputStream(keyStorePath);
			// 取得私钥
			PrivateKey privateKey = getPrivateKey(in, alias, password);
			// 对数据加密
//			Cipher cipher = Cipher.getInstance("RSA");
			Cipher cipher = Cipher.getInstance(privateKey.getAlgorithm());
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			return cipher.doFinal(data);
		}
		finally
		{
			if (in != null) in.close();
		}
	}
	
	/**
	 * 私钥加密
	 * 
	 * @param data
	 * @param keyStorePath
	 * @param alias
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static byte[] encryptByPrivateKey(byte[] data, InputStream in, String alias, String password) throws Exception {
		try
		{
			// 取得私钥
			PrivateKey privateKey = getPrivateKey(in, alias, password);
			in.close();
			// 对数据加密
			Cipher cipher = Cipher.getInstance(privateKey.getAlgorithm());
			cipher.init(Cipher.ENCRYPT_MODE, privateKey);
			
			return cipher.doFinal(data);
		}
		finally
		{
			if (in != null) in.close();
		}
	}
	
	/**
	 * 私钥解密
	 * 
	 * @param data
	 * @param keyStorePath
	 * @param alias
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static byte[] decryptByPrivateKey(byte[] data, InputStream in, String alias, String password) throws Exception {
		try
		{
			// 取得私钥
			PrivateKey privateKey = getPrivateKey(in, alias, password);
			in.close();
			// 对数据加密
			Cipher cipher = Cipher.getInstance(privateKey.getAlgorithm());
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			
			return cipher.doFinal(data);
		}
		finally
		{
			if (in != null) in.close();
		}
	}
	
	/**
	 * 验证Certificate
	 * 
	 * @param certificatePath
	 * @return
	 */
	public static boolean verifyCertificate(String certificatePath) {
		return verifyCertificate(new Date(), certificatePath);
	}
	
	/**
	 * 验证Certificate是否过期或无效
	 * 
	 * @param date
	 * @param certificatePath
	 * @return
	 */
	public static boolean verifyCertificate(Date date, String certificatePath) {
		boolean status = true;
		FileInputStream in = null;
		try
		{
			in = new FileInputStream(certificatePath);
			// 取得证书
			Certificate certificate = getCertificate(in);
			in.close();
			// 验证证书是否过期或无效
			status = verifyCertificate(date, certificate);
		}
		catch (Exception e)
		{
			status = false;
		}
		finally
		{
			if (in != null) try
			{
				in.close();
			}
			catch (IOException e)
			{
				e.printStackTrace();
			}
		}
		return status;
	}
	
	/**
	 * 验证证书是否过期或无效
	 * 
	 * @param date
	 * @param certificate
	 * @return
	 */
	private static boolean verifyCertificate(Date date, Certificate certificate) {
		boolean status = true;
		try
		{
			X509Certificate x509Certificate = (X509Certificate) certificate;
			x509Certificate.checkValidity(date);
		}
		catch (Exception e)
		{
			status = false;
		}
		return status;
	}
	
	/**
	 * 签名
	 * 
	 * @param keyStorePath
	 * @param alias
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public static String sign(byte[] sign, String keyStorePath, String alias, String password) throws Exception {
		FileInputStream in = null;
		try
		{
			
			in = new FileInputStream(keyStorePath);
			// 获得证书
			X509Certificate x509Certificate = (X509Certificate) getCertificate(in, alias, password);
			// 获取私钥
			KeyStore ks = getKeyStore(in, password);
			in.close();
			// 取得私钥
			PrivateKey privateKey = (PrivateKey) ks.getKey(alias, password.toCharArray());
			
			// 构建签名
			Signature signature = Signature.getInstance(x509Certificate.getSigAlgName());
			signature.initSign(privateKey);
			signature.update(sign);
			byte[] bytes = signature.sign();
			return TinaCrypt.base64Encoder(bytes, 0, bytes.length);
		}
		finally
		{
			if (in != null) in.close();
		}
	}
	
	/**
	 * 验证签名
	 * 
	 * @param data
	 * @param sign
	 * @param certificatePath
	 * @return
	 * @throws Exception
	 */
	public static boolean verify(byte[] data, String sign, String certificatePath) throws Exception {
		FileInputStream in = null;
		try
		{
			in = new FileInputStream(certificatePath);
			// 获得证书
			X509Certificate x509Certificate = (X509Certificate) getCertificate(in);
			// 获得公钥
			PublicKey publicKey = x509Certificate.getPublicKey();
			// 构建签名
			Signature signature = Signature.getInstance(x509Certificate.getSigAlgName());
			signature.initVerify(publicKey);
			signature.update(data);
			in.close();
			return signature.verify(TinaCrypt.base64Decoder(sign.toCharArray(), 0));
		}
		finally
		{
			if (in != null) in.close();
		}
	}
	
	/**
	 * 验证Certificate
	 * 
	 * @param keyStorePath
	 * @param alias
	 * @param password
	 * @return
	 */
	public static boolean verifyCertificate(Date date, String keyStorePath, String alias, String password) {
		boolean status = true;
		FileInputStream in = null;
		try
		{
			in = new FileInputStream(keyStorePath);
			Certificate certificate = getCertificate(in, alias, password);
			status = verifyCertificate(date, certificate);
		}
		catch (Exception e)
		{
			status = false;
		}
		finally
		{
			if (in != null) try
			{
				in.close();
			}
			catch (IOException e)
			{
				e.printStackTrace();
			}
		}
		return status;
	}
	
	/**
	 * 验证Certificate
	 * 
	 * @param keyStorePath
	 * @param alias
	 * @param password
	 * @return
	 */
	public static boolean verifyCertificate(String keyStorePath, String alias, String password) {
		return verifyCertificate(new Date(), keyStorePath, alias, password);
	}
	
	public static byte[] putBToA(byte[] a, byte[] b) {
		if (a == null)
		{
			return b;
		}
		else
		{
			byte[] c = new byte[a.length + b.length];
			for (int i = 0; i < a.length; i++)
			{
				c[i] = a[i];
			}
			for (int i = 0; i < b.length; i++)
			{
				c[a.length + i] = b[i];
			}
			return c;
		}
	}
	
	public static boolean checkKeyStoreFileExsited(String keyStorePath){
		File keystore = new File(keyStorePath);
		if(keystore.exists()){
			return true;
		}else{
			return false;
		}
	}
	
	public static void saveIOToFile(byte[] io, String filePathName){
		File exsit = new File(filePathName);
		try
        {
			if(exsit.exists()){
				exsit.delete();
			}
			exsit.createNewFile();
        }
        catch (IOException e1)
        {
	        e1.printStackTrace();
        }
		
		OutputStream picStream = null;
		try {
			//
			picStream = new FileOutputStream(exsit);
			picStream.write(io);
			picStream.flush();
		} catch (IOException e) {
			logger.error(e.getMessage());
		} finally {
			try {
				if (picStream != null) {
					picStream.close();
				}
			} catch (IOException e) {
			}
		}
		
	}
}
