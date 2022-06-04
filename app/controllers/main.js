var service = new Services();
var validation = new Validation();
var arrayProduct = [];

function getEle(id) {
  return document.getElementById(id);
}

function resetValue() {
  getEle("Ten").value = "";
  getEle("Gia").value = "";
  getEle("HinhAnh").value = "";
  getEle("MoTa").value = "";
}

function getData(data) {
  data.forEach(function (ele) {
    arrayProduct.push(ele);
  });
}

// Lấy danh sách từ server về
function getListProduct() {
  service
    .getListProductApi()
    .then(function (result) {
      renderListProduct(result.data);
      getData(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getListProduct();

function renderListProduct(data) {
  var contentHTML = "";
  data.forEach(function (product, index) {
    contentHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.ten}</td>
            <td>$${product.gia}</td>
            <td><img src="./../../assets/img/${product.hinhAnh}" style="width: 30%" alt=""></td>
            <td><a href= "#">${product.moTa}</a></td>
            <td>
                <button class = "btn btn-info" data-toggle="modal"
                data-target="#myModal" onclick = "editProduct(${
                  product.id
                })">Sửa</button>
                <button class = "btn btn-danger" onclick = "deleteProduct(${
                  product.id
                })">xóa</button>
            </td>
        </tr>`;
  });
  getEle("tblDanhSachSP").innerHTML = contentHTML;
}

/**
 * Xóa người dùng
 */
function deleteProduct(id) {
  service
    .deleteProductApi(id)
    .then(function () {
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Nhấn nút thêm mới
 */
getEle("btnThemSP").onclick = function () {
  // đổi tên tiêu đề
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thêm sản phẩm";
  // thêm nút add
  var footer = `<button class="btn btn-primary" onclick = "addProduct()">Thêm sản phẩm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
};

/**
 * Thêm người dùng
 */
function addProduct() {
  var product = validProduct(true , false, "");
  if (product == null) { return };  
  service
    .addProductApi(product)
    .then(function () {
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
  resetValue();
}

/**
 * Sửa người dùng
 */
function editProduct(id) {
  // khóa nút tài khoản
    getEle("Ten").disabled = true;
  // đổi tên tiêu đề
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Cập nhật sản phẩm";
  // thêm nút add
  var footer = `<button class="btn btn-primary"  onclick = "updateProduct(${id})">Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  service
    .getProductById(id)
    .then(function (result) {
      getEle("Ten").value = result.data.ten;
      getEle("Gia").value = result.data.gia;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
    resetValue();
}

/**
 * Update người dùng
 */
function updateProduct(id) {
  var product = validProduct(false, true, id);
  if (product == null) { return };  
  service
  .updateProductById(product)
  .then(function() {
    getListProduct();
    document.getElementsByClassName("close")[0].click();
  })
  .catch(function(error) {
    console.log(error);
  });
  resetValue();
}


function validProduct(isAdd, isEdit, id) {
  // đặt biến isEdit nếu true id = id (update), false id = "" (thêm),
  // đặt biến isAdd xét TK, true ở thêm, false ở update.
  var id = isEdit ? id : "";
  var ten = getEle("Ten").value;
  var gia = getEle("Gia").value;
  var hinhAnh = getEle("HinhAnh").value;
  var moTa = getEle("MoTa").value;
  // tạo lớp đối tượng
  var product = new Products(
    id,
    ten,
    gia,
    hinhAnh,
    moTa
  );

  // biến validation
  var number = /^[0-9]+$/;

  // flag (cờ) isValid true: hợp lệ / false: không hợp lệ
  var isValid = true;

  if(isAdd) {
    isValid &=
    validation.kiemTraRong(ten, "errorTen", "*Vui lòng nhập tên sản phẩm") &&
    validation.kiemTraTaiKhoan(
      ten,
      "errorTen",
      "*Tài khoản đã tồn tại",
      arrayProduct
    );
  }

  isValid &= validation.kiemTraRong(gia, "errorGia", "*Vui lòng nhập giá sản phẩm") && validation.kiemTraKieuDL(gia, number, "errorGia", "*Vui lòng nhập số")

  isValid &= validation.kiemTraRong(
    hinhAnh,
    "errorHA",
    "*Vui lòng nhập link hình ảnh"
  );

  isValid &=
    validation.kiemTraRong(moTa, "errorMoTa", "*Vui lòng nhập mô tả") &&
    validation.kiemTraDoDaiKyTu(
      moTa,
      "errorMoTa",
      "*Vui lòng nhập mô tả dưới 60 ký tự",
      60,
      1
    );

  // check isValid
  if (!isValid) {return  null};
  return product;
}