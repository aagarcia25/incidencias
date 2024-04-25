export function base64ToArrayBuffer(data: string) {
  var bString = window.atob(data);
  var bLength = bString.length;
  var bytes = new Uint8Array(bLength);
  for (var i = 0; i < bLength; i++) {
    var ascii = bString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}

export const Blanco = {
  // Estos colores se usan en TODO el proyecto cambiar SOLO cuando sea necesario
  Tipo: "image/png",
  Data: "iVBORw0KGgoAAAANSUhEUgAAANUAAACpCAYAAAC8oHg5AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHuSURBVHhe7dMxAQAgDMCwgX/PwIGEnslTBV3nGSCzf4GIqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpipoKYqSBmKoiZCmKmgpipIGYqiJkKYqaCmKkgZiqImQpSMxcoPgVO2geECAAAAABJRU5ErkJggg==",
};
