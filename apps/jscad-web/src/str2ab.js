export function str2ab(str) {
  var arrBuff = new ArrayBuffer(str.length);
  var bytes = new Uint8Array(arrBuff);
  for (var iii = 0; iii < str.length; iii++) {
    bytes[iii] = str.charCodeAt(iii);
  }
  return bytes;
}