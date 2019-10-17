package com.mes.server.utils;  
   
import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;  
   
import javax.crypto.Cipher;  
import javax.crypto.SecretKey;  
import javax.crypto.SecretKeyFactory;  
import javax.crypto.spec.DESKeySpec;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
  
 
   
   
public class DesUtil {  
   
	private static Logger logger = LoggerFactory.getLogger(DesUtil.class);
	
	
    private final static String DES = "DES";  
       

    /** 
     * Description 根据键值进行加密 
     * @param data  
     * @param key  加密键byte数组 Decoder
     * @return 
     * @throws Exception 
     */  
    public static String encrypt(String data, String key)   {  
        byte[] bt;
        String strs=null;
		try {
			bt = encrypt(data.getBytes(), key.getBytes());
			 strs =    CryptUtil.base64Encoder(bt, 0, 0)  ; 
		} catch (Exception e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
			logger.error(e.getMessage());
		}   
        return strs;  
    }  
   
    /** 
     * Description 根据键值进行解密 
     * @param data 
     * @param key  加密键byte数组 
     * @return 
     * @throws IOException 
     * @throws Exception 
     */  
    public static String decrypt(String data, String key) {  
        if (data == null)  
            return null;  
        byte[] bt=null;
        byte[] buf;
		try {
			buf = CryptUtil.base64Decoder(data.toCharArray(), 0);
			try {
				bt = decrypt(buf,key.getBytes());
			} catch (Exception e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
				logger.error(e.getMessage());
			}  
		} catch (IOException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
			logger.error(e.getMessage());
		}   
        return new String(bt);  
    }  
   
    /** 
     * Description 根据键值进行加密 
     * @param data 
     * @param key  加密键byte数组 
     * @return 
     * @throws Exception 
     */  
    private static byte[] encrypt(byte[] data, byte[] key) throws Exception {  
        // 生成一个可信任的随机数源  
        SecureRandom sr = new SecureRandom();  
   
        // 从原始密钥数据创建DESKeySpec对象  
        DESKeySpec dks = new DESKeySpec(key);  
   
        // 创建一个密钥工厂，然后用它把DESKeySpec转换成SecretKey对象  
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(DES);  
        SecretKey securekey = keyFactory.generateSecret(dks);  
   
        // Cipher对象实际完成加密操作  
        Cipher cipher = Cipher.getInstance(DES);  
   
        // 用密钥初始化Cipher对象  
        cipher.init(Cipher.ENCRYPT_MODE, securekey, sr);  
   
        return cipher.doFinal(data);  
    }  
       
       
    /** 
     * Description 根据键值进行解密 
     * @param data 
     * @param key  加密键byte数组 
     * @return 
     * @throws Exception 
     */  
    private static byte[] decrypt(byte[] data, byte[] key) throws Exception {  
        // 生成一个可信任的随机数源  
        SecureRandom sr = new SecureRandom();  
   
        // 从原始密钥数据创建DESKeySpec对象  
        DESKeySpec dks = new DESKeySpec(key);  
   
        // 创建一个密钥工厂，然后用它把DESKeySpec转换成SecretKey对象  
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(DES);  
        SecretKey securekey = keyFactory.generateSecret(dks);  
   
        // Cipher对象实际完成解密操作  
        Cipher cipher = Cipher.getInstance(DES);  
   
        // 用密钥初始化Cipher对象  
        cipher.init(Cipher.DECRYPT_MODE, securekey, sr);  
   
        return cipher.doFinal(data);  
    }  
      
      
    /** 
     * Description 获取字符串MD5值 
     * @param sourceStr 
     */  
    @SuppressWarnings("unused")
	private static String MD5(String sourceStr) {  
        String result = "";  
        try {  
            MessageDigest md = MessageDigest.getInstance("MD5");  
            md.update(sourceStr.getBytes());  
            byte b[] = md.digest();  
            int i;  
            StringBuffer buf = new StringBuffer("");  
            for (int offset = 0; offset < b.length; offset++) {  
                i = b[offset];  
                if (i < 0)  
                    i += 256;  
                if (i < 16)  
                    buf.append("0");  
                buf.append(Integer.toHexString(i));  
            }  
            result = buf.toString();  
            // System.out.println("MD5(" + sourceStr + ",32) = " + result);  
            // System.out.println("MD5(" + sourceStr + ",16) = " +  
            // buf.toString().substring(8, 24));  
        } catch (NoSuchAlgorithmException e) {  
        	logger.error(e.getMessage());  
        }  
        return result;  
    }  
      
      
  
	public static void main(String[] args) throws Exception {  
        String data = "0";  
       // String key = CookieContants.Key;//秘钥  
        String encode = encrypt(data, CookieContants.Key);  
        System.err.println(encode);  
        String dcode = decrypt(encode, CookieContants.Key);  
        System.err.println(dcode);  
    }  
}  