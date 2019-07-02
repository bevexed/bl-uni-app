import CryptoJS from 'crypto-js'

let key = CryptoJS.enc.Utf8.parse("xintianyuanweishangcheng");
let iv = CryptoJS.enc.Utf8.parse("qianxunzhinengkj");

//aes加密
export function encrypt(context) {
  // return CryptoJS.AES.encrypt(context, key, {
  //   iv: iv,
  //   mode: CryptoJS.mode.CBC,
  //   padding: CryptoJS.pad.Pkcs7
  // }).ciphertext.toString();

  let srcs = CryptoJS.enc.Utf8.parse(context);
  let encrypted = CryptoJS.AES.encrypt(
    srcs,
    key,
    { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );
  let hexStr = encrypted.ciphertext.toString();

  console.log("base64:" + encrypted);
  let encryptedStr = encrypted.ciphertext.toString();
  console.log("16进制:" + encryptedStr);

  console.log('hexStr->' + hexStr);
  let oldHexStr = CryptoJS.enc.Hex.parse(hexStr);
  // 将密文转为Base64的字符串
  let base64Str = CryptoJS.enc.Base64.stringify(oldHexStr);
  console.log('base64Str->' + base64Str);
//这里根据需求返回 base64Str 或 hexStr(解密时有小小差别)
  return base64Str;
}

export function decrypt(text) {
  return CryptoJS.enc.Utf8.stringify(
    CryptoJS.AES.decrypt(CryptoJS.format.Hex.parse(text), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
  )
}
