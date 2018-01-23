var PRODUCT_API_URL = "http://localhost:3000/_api/v1/products";
var FILE_UPLOAD_URL = "http://localhost:3000/_api/v1/images";
// Chờ dom load hết.
$(document).ready(function(){
	var id = getUrlParameter('id');
	var action = 1; // Thêm mới.
	if(id !=null && id !=undefined && id.length > 0){
		action = 2; // Sửa
		loadDetail(id);
	}

	// Bắt sự kiện click vào nút btn-submit
	$('[name="btn-submit"]').click(function(){				
		var code = $('[name="code"]').val();
		var name = $('[name="name"]').val();
		var description = $('[name="description"]').val();
		var unitPrice = $('[name="unitPrice"]').val();
		var imagesUrl = $('[name="imagesUrl"]').val();		

		var product = {
			'code': code,
			'name': name,					
			'description': description,
			'unitPrice': unitPrice,
			'imagesUrl': imagesUrl			
		};
		var api_url = PRODUCT_API_URL;
		var method = 'POST';
		if(action==2){
			method = 'PUT';
			api_url += '/' + id;
		}
		$.ajax({
			url: api_url,
			type: method,
			data: product,
			success: function(response){										
				$('#modal-success').modal();
				$('[name=product-form]').trigger("reset");
			},
			error: function(response, message){
				alert('Có lỗi xảy ra. ' + message);
			}
		});

	});

	$("#fileUpload").change(function (e){						
		var data = new FormData();
		data.append('myFile', e.target.files[0]);
		$.ajax({
			url: FILE_UPLOAD_URL,
			type: "POST",
			data: data,
			cache: false,
		    contentType: false,
		    processData: false,
			success: function(response){										
				$('#preview').attr('src', response);
				$('[name="imagesUrl"]').val(response);
			},
			error: function(response, message){
				alert('Có lỗi xảy ra. ' + message);
			}
		});
	});
});


function loadDetail(id){
	$.ajax({
			url: PRODUCT_API_URL + '/' + id,
			type: 'GET',
			success: function(response){										
				$('[name="code"]').val(response.code);
				$('[name="name"]').val(response.name);
				$('[name="description"]').val(response.description);
				$('[name="unitPrice"]').val(response.unitPrice);
				$('[name="imagesUrl"]').val(response.imagesUrl);
				$('#preview').attr('src', response.imagesUrl);
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