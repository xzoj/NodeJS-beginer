var PRODUCT_API_URL = "http://localhost:3000/_api/v1/products";

$(document).ready(function(){	
	var page = Number(getUrlParameter('page'));
	var limit = Number(getUrlParameter('limit'));
	load(1, 10);
	// $('body').on('click', '.delete-link', function(event){
	// 		alert(JSON.stringify(event.target));
	// 		return false;
	// });
});

function load(page, limit){
	$.ajax({
		url: PRODUCT_API_URL + '?page=' + page + '&limit=' + limit,
		type: 'GET',				
		success: function(response){
			// var listStudent = response.listStudent;
			// var totalPage = response.totalPage;			
			var listProduct = response;
			var content = '<h2 class="title text-center">Sản phẩm mới</h2>';
			for (var i = 0; i < listProduct.length; i++) {
				var id = listProduct[i]._id;							
				content += '<div class="col-sm-4 ng-scope">';
				content +=	'<div class="product-image-wrapper">';							
					content +=	'<div class="single-products">';
							content += '<div class="productinfo text-center">';
								content += '<a href="#">';
									content += '<div class="img-div" style="background-image:url(\'' + listProduct[i].imagesUrl + '\'); background-size:contain; background-repeat:no-repeat"></div>';
								content += '</a>';
								content += '<h2 class="ng-binding">' + listProduct[i].unitPrice + ' VND</h2>';
								content += '<a href="#"><p class="ng-binding">' + listProduct[i].name + '</p></a>'; 					
								content += '<a href="" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Thêm vào giỏ hàng</a>';
							content += '</div>';									
						content += '</div>';										
					content += '</div>';
				content += '</div>';
			}

			// var paginateContent = '';
			// if(page > 1){
			// 	paginateContent += '<li><a href="?page=1&limit=' + limit + '" aria-label="First"><span aria-hidden="true"><<</span></a></li>';
			// 	paginateContent += '<li><a href="?page=' + (page - 1) + '&limit=' + limit + '" aria-label="Previous"><span aria-hidden="true"><</span></a></li>';
			// }
			// if(page > 2){
			// 	paginateContent += '<li><a href="?page=' + (page - 2) + '&limit=' + limit + '">' + (page - 2) + '</a></li>';
			// }
			// if(page > 1){
			// 	paginateContent += '<li><a href="?page=' + (page - 1) + '&limit=' + limit + '">' + (page - 1) + '</a></li>';
			// }
			// paginateContent += '<li class="active"><a href="?page=' + page + '">' + page + '</a></li>';			
			// if(totalPage > page){
			// 	paginateContent += '<li><a href="?page=' + (page + 1) + '&limit=' + limit + '">' + (page + 1) + '</a></li>';	
			// }
			// if((totalPage - 1) > page){
			// 	paginateContent += '<li><a href="?page=' + (page + 2) + '&limit=' + limit + '">' + (page + 2) + '</a></li>';	
			// }
			// if(page < totalPage){
			// 	paginateContent += '<li><a href="?page=' + (page + 1) + '&limit=' + limit + '" aria-label="Next"><span aria-hidden="true">></span></a></li>';
			// 	paginateContent += '<li><a href="?page=' + (totalPage) + '&limit=' + limit + '" aria-label="Last"><span aria-hidden="true">>></span></a></li>';
			// }
				
   // 			$('.pagination').html(paginateContent);
			$('#result').html(content);
		},
		error: function(response, message){
			alert('Có lỗi xảy ra. ' + message);
		}
	});
}

// Lấy tham số truyền lên trong url theo tên.
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};