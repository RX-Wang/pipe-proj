
/**
 * 添加新的 样品图
 * @param e
 */
function addNewProductImg(e, webRoot) {
    var imgIndex = $('#product_imgs').find('form').length + 1;
    $('#product_imgs').append(
        '<form id="img_upload_'+ imgIndex +'" method="post" enctype="multipart/form-data" class="form-horizontal" role="form" action="/management/upload_bannerImg">'+
        '   <div class="form-group">'+
        '       <label class="col-sm-3 control-label no-padding-right"> 产品样品图</label>'+
        '       <div class="col-sm-9">'+
        '           <input class="col-xs-5 col-sm-2" type="file" name="upload_file" accept="image/gif,image/x-png,image/jpeg" onchange="upload(event, ' + imgIndex + ');">'+
        '           <i class="red">( 图片尺寸：1280 * 400 )</i>'+
        '           <a class="red" href="javascript:$(\'#img_upload_' + imgIndex + '\').remove();" title="删除该图片" style="margin-left: 20px;">'+
        '               <i class="icon-trash bigger-130"></i>'+
        '           </a>'+
        '       </div>'+
        '       <img id="img_widget_' + imgIndex + '" src="' + webRoot + '/images/upload-bg.png" style="margin: 20px 14px;max-width:260px;"/>' +
        '       <label>名称：</label>' +
        '       <input type="text" disabled id="imgName_' + imgIndex + '"/>' +
        '       <label>使用状态：</label>' +
        '       <span class="radio" style="display:inline">' +
        '           <label>' +
        '               <input name="showStatus" value="1" type="radio" class="ace" checked/>' +
        '               <span class="lbl">启用</span>' +
        '           </label>' +
        '       </span>' +
        '       <span class="radio" style="display:inline">' +
        '           <label>' +
        '               <input name="showStatus" value="0" type="radio" class="ace"/>' +
        '               <span class="lbl">禁用</span>' +
        '           </label>' +
        '       </span>' +
        '   </div>'+
        '</form>'
    );
}

/**
 * 上传文件到本地
 * @param event
 * @param index
 */
function upload(event, index) {
    var $file = $(event.target)[0].files[0];
    $('#imgName_' + index).val($file.name);
    if(window.FileReader) {
        var fr = new FileReader();
        fr.onloadend = function(e) {
            $("#img_widget_" + index).attr('src', e.target.result);
        };
        fr.readAsDataURL($file);
    }
}

/**
 * 保存 产品信息
 */
function submit_productImg() {
    $("#imgUrl").val(result.data.file_path);
    $("#img_widget").attr('imgName', result.data._originalName);
    $('#imgName').val(result.data._originalName);
    /**
     * 再 提交表单
     */
    var bannerImgName   = $("input[name='bannerImgName']").val();
    var useStatus       = $("input[name='useStatus']:checked").val();
    var imgUrl          = $("input[name='imgUrl']").val();
    var imgName         = $("#img_widget").attr('imgName');
    var description     = $('#description').val();
    var editType        = '<%= data.editType%>';
    var _id             = '<%=data._id%>';
    if (!bannerImgName) {
        return bootbox.alert('请输入banner图名称');
    } else if(!useStatus) {
        return bootbox.alert('请选择启用状态');
    } else if (!imgUrl) {
        return bootbox.alert('请上传banner图片');
    }
    $.post('/management/bannerImg/add', {
        bannerImgName   : bannerImgName,
        useStatus       : useStatus,
        imgUrl          : imgUrl,
        imgName         : imgName,
        description     : description,
        editType        : editType,
        _id             : _id
    }, function (result) {
        if (result.code === '200') {
            return bootbox.alert('保存成功', function () {
                window.location.href = '/management/bannerImg';
            });
        } else {
            return bootbox.alert(result.code + ":" + result.msg);
        }
    }, 'json');
}

/**
 * 上传图片到服务器
 * @private
 */
function _ajaxFileUpload() {
    var imgFormLength = $('#product_imgs').find('form').length;
    var uploadedImg = 0;    // 上传成功的图片数量
    var hideForm = '';
    var options = {};
    for(var i = 1; i < imgFormLength + 1; i++) {
        hideForm = $('#img_upload_' + i);
        options = {
            dataType: "json",
            success: function (result) {
                if (result.code === '200') {
                    uploadedImg++;
                    console.log($('#imgName_' + i).val());
                    if(uploadedImg === imgFormLength) {
                        bootbox.alert('开始保存啦');
                    }
                        // submit_productImg();
                } else {
                    bootbox.alert($('#imgName_' + i).val() + '上传失败');
                }
            },
            error: function (result) {
                bootbox.alert(result.msg + '');
            }
        };
        hideForm.ajaxSubmit(options);
    }
}

/**
 * 校验 产品名称是否重复
 * @param btn
 */
function productNameUnique(btn) {
    /**
     *  先校验banner 名字是佛重复
     */
    $.ajax({
        url: '/management/productNameUnique',
        type: 'POST',
        data: {
            bannerImgName: $("input[name='bannerImgName']").val()
        },
        success: function (results) {
            if(results.code === '200') {
                /**
                 *  再上传图片
                 */
                _ajaxFileUpload();
            } else {
                bootbox.alert(results.msg);
            }
        },
        error: function (err) {
            bootbox.alert(err.message);
        }
    });
}