<?php
/**
 * This function is used to define common functions to use across the applicaton
 * Date : 2021-08-30
 * 
 * @author Malayan K
 */
class JD_CommonFunctions
{

	const ENCRYPTION_METHOD = "AES-256-CBC"; // AES is used by the U.S. gov't to encrypt top secret documents.
	const SECRET_HASH       = "25c6c7ff35b9979b151f2136cd13b0ff";

	/**
	 * To get the encrypted token
	 * Date : 2021-08-09
	 *
	 * @author Malayan K
	 *
	 * @param string $stringToEncrypt
	 *
	 * @return string
	 */
	public function getEncriptedToken($stringToEncrypt)
	{
		//To encrypt
		$encryptedStr = openssl_encrypt($stringToEncrypt, self::ENCRYPTION_METHOD, self::SECRET_HASH);
		$urlSafeStr   = strtr($encryptedStr, "+/", "-_"); //URL safe encripted string

		return $urlSafeStr;
	}

	/**
	 * To get the decrypted token
	 * Date : 2021-08-09
	 *
	 * @author Malayan K
	 *
	 * @param string $encryptedString
	 *
	 * @return string
	 */
	public function getDecryptedToken($encryptedString)
	{
		$encryptedUrlSafeStr = strtr($encryptedString, "-_", "+/"); //URL safe encripted string

		//To Decrypt
		return openssl_decrypt($encryptedUrlSafeStr, self::ENCRYPTION_METHOD, self::SECRET_HASH);
	}

	/**
	 * To get the random string
	 * Date : 2021-10-27
	 *
	 * @author Malayan K
	 *
	 * @return string
	 */
	public function getRandomStr()
	{
		$string   = "abcdefghijklmnopqrstuvwxyz0123456789";
		$randomno = '';
		for($i=0;$i<7;$i++) {
			$pos       = rand(0,36);
			$randomno .= $string{$pos};
		}

		return $randomno;
	}
}
