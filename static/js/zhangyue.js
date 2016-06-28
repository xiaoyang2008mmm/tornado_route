$(document).ready(function() {

    $("#qianyi_btn").click(function() {

        var start_time = $("#start_time").val();
        var end_time = $("#end_time").val();

        var uid = $("#uid").val();
        if (uid == "" || isNaN(uid)) {
            alert("请输入要查询的uid,UID必须为纯数字");
        } else if (start_time == "" || end_time == "") {
            alert("请选择时间");
        } else {
            $.post("/uid_info/", {
                start_time: start_time,
                end_time: end_time,
                uid: uid,
            },
            function(dataset) {
                console.log(dataset);

                $('#myTable').dataTable({
                    "data": eval(dataset),
                    "columns": [{
                        "title": "直播ID"
                    },
                    {
                        "title": "传输码率"
                    },
                    {
                        "title": "编码速率"
                    },
                    {
                        "title": "重连次数",
                        "class": "center"
                    },
                    {
                        "title": "SERVER地址",
                        "class": "center"
                    },
                    {
                        "title": "详细时间",
                        "class": "center"
                    }],

                    "oLanguage": {
                        "sLengthMenu": "每页显示 _MENU_ 条记录",
                        "sZeroRecords": "抱歉， 没有找到",
                        "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                        "sInfoEmpty": "没有数据",
                        "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                        "sZeroRecords": "没有检索到数据",
                        "sSearch": "名称:",
                        "oPaginate": {
                            "sFirst": "首页",
                            "sPrevious": "前一页",
                            "sNext": "后一页",
                            "sLast": "尾页"
                        }

                    },
                    "bDestroy": true

                });
                alert("数据加载完成！！！！！！");

            });

        }
    });
    ////////////////////////////
    $("#uid_search").click(function() {
                $("#user_list").empty();
                $("#file_list").empty();
                $("#down_file_list").empty();
		$("#merge_file_list").empty();
		$("#display_shell").empty();

        var user_uid = $("#user_uid").val();
        var live_id = $("#user_list option:selected").text();
        if (user_uid == "" || isNaN(user_uid)) {
            alert("请输入要查询的uid,UID必须为纯数字");
        } else {
            $.post("/ucloud_uid/", {
                user_uid: user_uid,
            },
            function(data) {
                var data = eval(data);
                $("#user_list").empty();
                for (var i = 0; i < data.length; i++) {
                    if ((data[i]).length != 0) {
                        $("#user_list").append("<option>" + data[i] + "</option>");
                    }
                }

            });
        }
    });
    ////////////////////////////
    $("#get_time").click(function() {
        var user_uid = $("#user_uid").val();
        var live_uid = $("#user_list option:selected").text();
        if (user_uid == "" || isNaN(user_uid)) {
            alert("请输入要查询的uid,UID必须为纯数字");
        } else if (live_uid == "") {
            alert("请选择1个live_ID");
        } else {
            $.post("/get_liveid_file/", {
                user_uid: user_uid,
                live_uid: live_uid,
            },
            function(data) {
                var data = eval(data);
                $("#file_list").empty();
                for (var i = 0; i < data.length; i++) {
                    if ((data[i]).length != 0) {
                        $("#file_list").append("<option>" + data[i] + "</option>");
                    }
                }
                localStorage.setItem('file_set', data);

            });
        }

    });
    ////////////////////////////
    $("#enusre").click(function() {
	if( $("#file_list option").size() != 0 ){
            all_active(localStorage.getItem('file_set'));
	}else{
	    alert("请先添加文件!!!");
	}

    });
    ////////////////////////////
    function all_active(file_array) {
        var msg = "确定要全部激活吗?";
        if (confirm(msg) == true) {
            $.post("/active_all_file/", {
                all_file_list: file_array,
            },
            function(data) {
                if (Number(data) == 000) {
                    alert("全部激活成功!!!");
                    var file = (localStorage.getItem('file_set')).split(",");
                    $("#down_file_list").empty();
                    for (var i = 0; i < file.length; i++) {
                        if ((file[i]).length != 0) {
                            $("#down_file_list").append("<option>" + file[i] + "</option>");
                        }
                    }

                } else {
                    alert("全部激活失败!!!");

                }

            });
        } else {
            return false;
        }
    }

    ////////////////////////////
    $("#down_file").click(function() {
	if( $("#down_file_list option").size() != 0 ){
            all_download(localStorage.getItem('file_set'));
	}else{
		alert("请先激活文件!!!!");
	}

    });


    function all_download(file_array) {
        var msg = "确定要下载吗?";
        if (confirm(msg) == true) {
            $.post("/down_all_file/", {
                all_file_list: file_array,
            },
            function(data) {
		alert(data)
		
            });
        } else {
            return false;
        }
    }



    ////////////////////////////
    $("#upload_ks3").click(function() {
        var file = (localStorage.getItem('file_set')).split(",");
	if (file == ""){
            var live_id = ((((file[0])).split("_"))[1]);
	    file_upload_ks3(live_id);

	    $("#merge_file_list").empty()
	    $("#merge_file_list").append("KS3"+"</br>"+"观看地址为http://record2.a8.com/mp4/" + live_id + ".mp4");
	}else{
	    alert("文件集合为空!!!!!");
	}

    });



    function file_upload_ks3(file) {
        var msg = "上传之前，请先测试观看，以便检查录播视频是否完整????";
        if (confirm(msg) == true) {
            $.post("/upload_file_ks3/", {
                file: file,
            },
            function(data) {
                alert(data)

            });
        } else {
            return false;
        }
    }

/////////////////////////////////////////////


    $("#recover_play").click(function() {
        var file = (localStorage.getItem('file_set')).split(",");
	if (file == ""){
            var live_id = ((((file[0])).split("_"))[1]);
	    recover_api_mp4(live_id);
	}else{
	    alert("文件集合为空!!!!!");
	}


    });



    function recover_api_mp4(file) {
        var msg = "确认恢复录播接口状态？此操作是线上操作，请谨慎!!!!!!";
        if (confirm(msg) == true) {
            $.post("/recover_api/", {
                file: file,
            },
            function(data) {
                alert(data)

            });
        } else {
            return false;
        }
    }










});
