function Services() {
  this.getListProductApi = function() {
    return axios({
        url: "https://628b9961667aea3a3e32d1c5.mockapi.io/api/productPhone",
        method: "GET",
    });
};

  this.deleteProductApi = function (id) {
    return axios({
      url: `https://628b9961667aea3a3e32d1c5.mockapi.io/api/productPhone/${id}`,
      method: "DELETE"
    });
  };

  this.addProductApi = function (product) {
    return axios({
      url: "https://628b9961667aea3a3e32d1c5.mockapi.io/api/productPhone",
      method: "POST",
      data: product
    });
  };

  this.getProductById = function (id) {
    return axios({
      url: `https://628b9961667aea3a3e32d1c5.mockapi.io/api/productPhone/${id}`,
      method: "GET"
    });
  };

  this.updateProductById = function (product) {
    return axios({
      url: `https://628b9961667aea3a3e32d1c5.mockapi.io/api/productPhone/${product.id}`,
      method: "PUT",
      data: product
    });
  };
}
