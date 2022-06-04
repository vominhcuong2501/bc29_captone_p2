function Validation() {
  this.kiemTraRong = function (value, errorID, mess) {
    // Check validation
    if (value === "") {
      // error
      getEle(errorID).style.display = "block";
      getEle(errorID).innerHTML = mess;
      return false;
    }
    getEle(errorID).style.display = "none";
    getEle(errorID).innerHTML = "";
    return true;
  };
  
  this.kiemTraTaiKhoan = function (value, errorID, mess, arr) {
    var isStatus = true;
    arr.forEach(function (item) {
      if (item.taiKhoan === value) {
        isStatus = false;
        
      }
    });
    if (isStatus) {
      getEle(errorID).style.display = "none";
      getEle(errorID).innerHTML = "";
      return true;
    }
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;
    return false;
  };

  this.kiemTraDoDaiKyTu = function (value, errorID, mess, max, min) {
    if (value.trim().length >= min && value.trim().length <= max) {
      getEle(errorID).style.display = "none";
      getEle(errorID).innerHTML = "";
      return true;
    }
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;
    return false;
  };

  this.kiemTraKieuDL = function (value, check, errorID, mess) {
    if (value.match(check)) {
      getEle(errorID).style.display = "none";
      getEle(errorID).innerHTML = "";
      return true;
    }
    getEle(errorID).style.display = "block";
    getEle(errorID).innerHTML = mess;
    return false;
  };
}
