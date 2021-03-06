//本地环境
// var urls = "http://192.168.1.221:8084/";  //本地的ip
// var urls = "http://192.168.1.59:8084/";  //肖尊武的本地的ip

//测试环境
var urls = "http://192.168.1.33:8080/small_b/";//测试环境api
var uploadImgUrls = "http://192.168.1.33:8080/small_b/upload/uploadFile"; //图片测试环境上传
var imgUrl = "http://192.168.1.44:82/upload"; //图片测试环境


//正式环境
// var urls = "http://120.79.59.7/small_b/"; //1.0.0
// var uploadImgUrls = "http://120.79.59.7/small_b/upload/uploadFile"; //图片正式环境上传
// var imgUrl = "https://file2.gzrockveda.com/upload";


/**
 * token:登陆的标识
 * userMessage:登陆后 ,返回的用户信息
 * */
var token,userMessage;
userMessage = JSON.parse(sessionStorage.getItem("user_message"));
var jaroy_url = {
  // // 上传图片路径
  // 'uploadBase64':'/img/uploadBase64', //Base64
  // 'uploadFile':'/img/uploadFile', //文件

  //登陆操作
  'login':'/sys/login', //登陆
  // 'queryByUser':'/sys/permission/queryByUser', //获取左侧导航栏菜单
  
  'bsysGoodsCate_list':'/bsysGoodsCate/list', //获取商品分类列表
  'bsysGoodsCate_create':'/bsysGoodsCate/create', //商品分类列表新增
  'bsysGoodsCate_update':'/bsysGoodsCate/update', //商品分类列表编辑
  'bsysGoodsCate_delete':'/bsysGoodsCate/delete', //商品分类列表删除
  
  'oneCatelist':'bsysGoodsCate/oneCatelist', //返回商品分类下拉框
  
  'getOneTypeList':'/bsysGoodsCate/getOneTypeList', //返回商品一级分类下拉框
  'getTwoTypeList':'/bsysGoodsCate/getTwoTypeList', //返回商品二级分类下拉框
  
  'goodsList':'bSysGoods/goodsList', //获取商品列表
  'bSysGoods_updateGoodsStatus':'bSysGoods/updateGoodsStatus', //商城列表上架-新品-推荐开关
  'goodsList_update':'bSysGoods/updateGoods', //获取商品列表-商品详情编辑提交
  'goodsList_delete':'bSysGoods/delete', //获取商品列表-删除
  
  'bSysGoods_createOne':'bSysGoods/createOne', //添加商品第一步
  'bSysGoods_historyGoodsCate':'bSysGoods/historyGoodsCate', //获取商品列表
  
  'bSysBrand_brandList':'bSysBrand/brandList', //添加商品第二步品牌下拉
  'sysFreightTemplate_list':'sysFreightTemplate/list', //添加商品第二步运费模板下拉
  'bSysGoods_createTwo':'bSysGoods/createTwo', //添加商品第二步按钮下一步
  
  'bSysGoods_Save':'bSysGoods/threeSaveOrUpdate', //添加商品第二步按钮下一步
  
  
  'bSysGoods_newGoodsView':'bSysGoods/newGoodsView', //商品审核详情
  'bSysGoods_createExamine':'bSysGoods/createExamine', //商品审核提交接口
  
  
  'sysFreightTemplate_ListPage':'/sysFreightTemplate/templateListPage', //商品审核提交接口

	
  
};

/**  
 * 将以base64的图片url数据转换为Blob  
 * @param urlData  
 *            用url方式表示的base64图片数据  
 */  
//将base64转换为blob
function dataURLtoFile(dataURI, type) {
  let binary = atob(dataURI.split(',')[1]);
  let array = [];
 for(let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
 return new Blob([new Uint8Array(array)], {type:type });
}
// 验证IP有效性
function isValidIP(ip) {
  var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip);
}
/**
 * 该方法用于把JSON转成字符串
 * @param {JSON} json json对象
 * */
function JsonToString(json){
	var str = JSON.stringify(json);
	console.log(str);
}

//js获取当前指定的前几天的日期
function getBeforeDate(n) {
  var n = n;
  var d = new Date();
  var year = d.getFullYear();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  if(day <= n) {
      if(mon > 1) {
          mon = mon - 1;
      } else {
          year = year - 1;
          mon = 12;
      }
  }
  d.setDate(d.getDate() - n);
  year = d.getFullYear();
  mon = d.getMonth() + 1;
  day = d.getDate();
  s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
  return s;
}

/**
 * 该方法用于生成n位随机数
 * */
function generateMixed(n){
  var chars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 62);
    if(chars[id] == undefined){
      chars[id] = "A";
    }
    res += chars[id];
  }
  return res;
}

/**
 * 该方法用于判断token是否存在session里面 检测 应用于每个有数据交互的页面
 * */
function IsTokenSave () {
	if (sessionStorage.getItem("token")) {  //判断是否登陆
		token = sessionStorage.getItem("token");
		$(".token_input").val(token);
	}else{
		window.location = "login_v2.html";
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user_message");

		return false;
	}
	if (sessionStorage.getItem("user_message")) {
		// userMessage = JSON.parse(sessionStorage.getItem("user_message"));
		// $(".userinfoId_input").val(userMessage.id);
	}
}

/**
 * 该方法封装了请求官网服务器数据的公共方法
 * @param {JSON} ajaxData ajaxData是请求数据所需传的参数
 * @param {Function} sucCallback sucCallback是返回成功时的回调函数
 * */
function OfficialGetData (ajaxData,sucCallback) {
	Showload("正在初始化列表......");
	officialjaroyTimeout = setInterval("Timeout(officialjaroyTimeout)", 1000);
	 $.ajax({
		type:"get",
		url:urls+ jaroy_url.get_offical_data,
		async:true,
		timeout:60000,
		dataType:"json",
		data:ajaxData,
		success:function (json) {
			CheckLogout (json);//检查是否登陆过期
			console.log(123132132132132132132132)
			if (json.return_code == "SUCCESS") {
				sucCallback(json);
			} else{
				if (json.return_msg == "Session过期") {
					window.location = "login_timeout.html";
				}else{
					TipsAlert(json.return_msg);
					//location.reload();
				}
			}
			InitTime (officialjaroyTimeout);
		},
		error:function(xml, text, errorThrown) {
			if (text == "timeout") {
				TipsAlert("系统繁忙，请稍后再试");
			} else{
				TipsAlert("系统繁忙，请稍后再试");
			}
			InitTime (officialjaroyTimeout);
		}

	});
}
/**
 * 该方法封装了请求官网服务器数据的公共方法
 * @param {JSON} ajaxData ajaxData是请求数据所需传的参数
 * @param {Function} sucCallback sucCallback是返回成功时的回调函数
 * */
function OfficialGetScrollPage (ajaxData,sucCallback) {
	Showload("正在初始化列表......");
	officialjaroyTimeout = setInterval("Timeout(officialjaroyTimeout)", 1000);
	 $.ajax({
		type:"get",
		url:urls+ jaroy_url.official_scrollPic_list,
		async:true,
		timeout:30000,
		dataType:"json",
		data:ajaxData,
		success:function (json) {
			CheckLogout (json);//检查是否登陆过期
			if (json.return_code == "SUCCESS") {
				sucCallback(json);
			} else{
				if (json.return_msg == "Session过期") {
					window.location = "login_timeout.html";
				}else{
					TipsAlert(json.return_msg);
					//location.reload();
				}
			}
			InitTime (officialjaroyTimeout);
		},
		error:function(xml, text, errorThrown) {
			if (text == "timeout") {
				TipsAlert("系统繁忙，请稍后再试");
			} else{
				TipsAlert("系统繁忙，请稍后再试");
			}
			InitTime (officialjaroyTimeout);
		}

	});
}

/**
 * 该方法用于官网的公共添加或者修改记录的方法
 * @param {String} submitUrl submitUrl是请求的地址
 * @param {String} formName formName是提交内容的表单ID
 * */
function OfficialjaroySubmit (submitUrl,formName) {
	officialSubmitTimeout = null;
	$(formName).submit(function () {
		Showload("loading......");
		officialSubmitTimeout = setInterval("Timeout(officialSubmitTimeout)", 1000);
		$(this).ajaxSubmit({
			type:"post",
			url:submitUrl,
			async:true,
			timeout:30000,
			dataType:"json",
			success:function  (json) {
				CheckLogout (json);//检查是否登陆过期
				if (json.return_code == "SUCCESS") {
					swal({
					    title: "操作成功",
					    text: "操作成功",
					    type: "success",
					},function () {
						location.reload();
					});
				} else{
					if (json.return_msg == "Session过期") {
						window.location = "login_timeout.html";
					}else{
						swal({
						    title: "操作失败，即将刷新页面",
						    text: json.return_msg,
						    type: "error",
						},function () {
							location.reload();
						});
					}
				}
				InitTime (officialSubmitTimeout);
			},
			error:function(xml, text, errorThrown) {
				if (text == "timeout") {
					TipsAlert("请求超时,请检查网络或着重新打开该页面.");
				} else{
					TipsAlert("请求数据失败,请联系后台技术人员",function () {
						location.reload();
					});


				}
				InitTime (officialSubmitTimeout);
			}
		});
		return false;
	});

}

/**
 * 该方法用于官网的获取对应记录的详情
 * @param {Number} listId listId是当前记录的id
 * @param {Function} sucSuccess sucSuccess是成功时的回调函数
 * */
function OfficialjaroyGetDetails (listId,sucSuccess) {
	Showload("loading......");
	officialEditTimeout = setInterval("Timeout(officialEditTimeout)", 1000);
	$.ajax({
		type:"get",
		url:urls+ jaroy_url.get_official_listDetails,
		async:true,
		timeout:30000,
		dataType:"json",
		data:{token:token,id:listId},
		success:function(json) {
			CheckLogout (json);//检查是否登陆过期
			if (json.return_code == "SUCCESS") {
				sucSuccess(json);
			} else{
				if (json.return_msg == "Session过期") {
					window.location = "login_timeout.html";
				}else{
					TipsAlert(json.return_msg);
				}
			}
			InitTime (officialEditTimeout);
		},
		error:function(xml, text, errorThrown) {
			if (text == "timeout") {
				TipsAlert("请求超时,请检查网络或着重新打开该页面.");
			} else{
				TipsAlert("请求数据失败,请联系后台技术人员");
			}
			InitTime (officialEditTimeout);
		}

	});
}

/**
 * 该方法用来获取官网列表的批量选中的记录的id
 * */
function OfficialjaroyGetIdString () {
	var idString = "";
	$(".td_checkbox").each(function () {
		if ($(this).is(":checked")) {
			idString = idString + "," + $(this).parents("td").siblings(".td_id").text();
		}
	});
	return idString.trim().substr(1,idString.length);
}
/**
 * 该方法用于官网管理后台的操作处理，如：上下架 删除等
 * @param {String} ajaxUrl ajaxUrl是请求的接口地址
 * @param {JSON} respData respData请求需要传过去的参数
 * */
function OfficialjaroyMake (ajaxUrl,respData) {
	Showload("loading......");
	officialMakeTimeout = setInterval("Timeout(officialMakeTimeout)", 1000);
	$.ajax({
		type:"post",
		url:ajaxUrl,
		async:true,
		timeout:30000,
		dataType:"json",
		data:respData,
		success:function(json) {
			CheckLogout (json);//检查是否登陆过期
			if (json.return_code == "SUCCESS") {
				swal({
				    title: "操作成功",
				    text: "操作成功",
				    type: "success",
				},function () {
					location.reload();
				});
			} else{
				if (json.return_msg == "Session过期") {
					window.location = "login_timeout.html";
				}else{
//					TipsAlert(json.return_msg);
					swal({
					    title: "操作失败",
					    text: json.return_msg,
					    type: "error"
					});
				}
			}
			InitTime (officialMakeTimeout);
		},
		error:function(xml, text, errorThrown) {
			if (text == "timeout") {
				TipsAlert("系统繁忙，请稍后再试.");
			} else{
				TipsAlert("系统繁忙，请稍后再试");
			}
			InitTime (officialMakeTimeout);
		}

	});
}

/**
 * 该方法用于检测是否登陆过期
 * @param {JSON} json json后台传过来的json对象
 * */
function CheckLogout (json) {
	if (json.return_code == "FAIL" && json.return_msg =="Session过期") {
		window.location = "login_timeout.html";
	}
}

/**
 * 该方法用于处理返回字符为null时 把当前数据变成空显示
 * @param {String} datas datas是需要变更的数据
 * */
function DealNull(datas) {
	if (datas == null) {
		datas = "";
	}
	return datas;
}

/**
 * 用于显示加载层的函数
 * */
function Showload(txt){
	$("#wating_show").removeClass("none");
	$("#loading_text").html(txt);
}
/**
 * 公共方法；用于停止计时器
 * */
var second = 0;
function Timeout(timeName) {
	second++;
	$("#second_span").html(second);
	if(parseInt(second) >= 60) {
		clearInterval(timeName);
		second = 0;
		$("#wating_show").addClass("none");
		$("#second_span").html(0);
	}
}
/**
 * 公共方法；用于初始化计时器参数
 * */
function InitTime (timeName) {
	clearInterval(timeName);
	$("#wating_show").addClass("none");
	second = 0;
	$("#second_span").html(0);
}
/**
 * 该方法用于初始化时间 从当前月的第一天 到当前月的最后一天 (财务管理-收入账-押金账 销售收入账 设备计费账 充值收入账)
 * */
function InitBillCheckTime () {
	var times = new Date();
	var nowYear = times.getFullYear();
	var nowMonth = times.getMonth() + 1;
	var lastDate = null;//每个月最后一天
	//根据月份设置每月最后一天
	if (nowMonth == 1 || nowMonth == 3 || nowMonth == 5 || nowMonth == 7 || nowMonth == 8 || nowMonth == 10 || nowMonth == 12 ) {
		lastDate = 31;
	}else if (nowMonth == 4 || nowMonth == 6 || nowMonth == 9 || nowMonth == 11 ) {
		lastDate = 30;
	}else if (nowMonth = 2) {
		if (nowYear % 4 == 0 && nowYear % 100 != 0 || nowYear % 400 == 0) {
			lastDate = 29;
		}else{
			lastDate = 28;
		}
	}
	var startStr = nowYear.toString() + "-" + nowMonth.toString() + "-01 00:00:00";
	var endStr = nowYear.toString() + "-" + nowMonth.toString() +"-"+lastDate+ " 23:59:59";
	$(".ibox-title .layer-date").eq(0).val(startStr);  //起始时间
	$(".ibox-title .layer-date").eq(1).val(endStr);//结束时间
}
/**
 * 该方法用于初始化时间 从当天的零时 到当天的24时 (财务管理-收入账-押金账 销售收入账 设备计费账 充值收入账)
 * */
function InitBillDayTime () {
	var times = new Date();
	var nowYear = times.getFullYear();
	var nowMonth = times.getMonth() + 1;
	var lastDate = times.getDate();
	var startStr = nowYear.toString() + "-" + nowMonth.toString() +"-"+lastDate+ " 00:00:00";
	var endStr = nowYear.toString() + "-" + nowMonth.toString() +"-"+lastDate+ " 23:59:59";
	$(".ibox-title .layer-date").eq(0).val(startStr);  //起始时间
	$(".ibox-title .layer-date").eq(1).val(endStr);//结束时间
}
/**
 * 该方法把时间字符串转成时间戳
 * @param {String} dateStr dateStr是时间字符串
 * */
function get_unix_time(dateStr){
    var newstr = dateStr.replace(/-/g,'/');
    var date =  new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str;
}
/**
 * 该方法用于获取dom元素的x轴坐标
 * @param {Object} e e是dom对象
 * */
function getX(e) {
 	e = e || window.event;
	return e.pageX || e.clientX + document.body.scrollLeft;
}
/**
 * 该方法用于获取dom元素的y轴坐标
 * @param {Object} e e是dom对象
 * */
function getY(e) {
  	e = e|| window.event;
	return e.pageY || e.clientY + document.boyd.scrollTop;
}
/**
 * 获取url参数部分全部内容
 * @param {String} 被取参数的url
 * @returns {JSON} 返回"?"之后的数据
 */
function getURLParams(url) {
	var param = url.substr(url.indexOf('?') + 1);
	var paramArray = param.split('&');
	var keyValue = "";
	var json = "";
	for(var i = 0; i < paramArray.length; i++) {
		var keyValueArray = paramArray[i].split('=');
		keyValue = '"' + keyValueArray[0] + '"' + ":" + '"' + keyValueArray[1] + '"';
		if(keyValue != "" && keyValue != ":") {
			if(json == "") {
				json = keyValue;
			} else {
				json = json + "," + keyValue;
			}
		}
	}
	if(json != "") {
		json = "{" + json + "}";
	}
	return strToJson(json);
}
/**
 * 字符串转化为json对象
 * @param {Object} str 被转换的字符串
 * return 成功转换返回json对象，转换失败返回false
 */
function strToJson(str) {
	try {
		return JSON.parse(str);
	} catch(erro) {
		return false;
	}
}
/**
 * 该方法用于判断上传文件的大小
 * @param {String} jqSelect jqSelect是jq选择器
 * @param {String} fileDocId fileDocId是input[type="file"]的id属性
 * */
function IsFileExcess (jqSelect,fileDocId) {
	jqSelect.change(function() {
		var fileInput = document.getElementById(fileDocId);
		var s = fileInput.files[0].size / 1024 ;
		s = s/1024;
		s = s.toFixed(2);
		if (s > 30) {
			TipsAlert("文件超过30M,不准上传.文件大小：" + s + "M");
			fileInput.value = "";
			return false;
		}else{
			return true;
		}
	});


}
/**
 * 该方法用于鉴别文件是否超过200k
 * @param {String} fileDocId fileDocId是文件输入框的id
 * */
function CheckFile200K (fileDocId) {
	var fileInput = document.getElementById(fileDocId).files;  //获取文件
	//s[0].size 的单位是字节  除以1024 获取到kb
	var fileSize = (fileInput[0].size) / 1024;
	if (fileSize >= 200) {
		TipsAlert("文件大小不能大于200KB,目前文件大小：" + fileSize.toFixed(2) + "KB");
		return false;
	}
}

/**
 * 该方法用于处理所有table都要做的东西
 * */
function DealTable () {
	$(".table-bordered tbody td").each(function () {
		if ($(this).text() == "null") {
			$(this).text("");
		}
		$(this).click(function () {  //点击更换当前列的背景色及字体
			$(".table-bordered tbody tr").removeClass("table_click_class");
			$(this).parents("tr").addClass("table_click_class");
		});
  });
  
  

}
function DealNewTable () {
  $(".data_body > div").each(function () {
		if ($(this).find("div").html() == "null") {
			$(this).find("div").html("");
		}
		$(this).click(function () {  //点击更换当前列的背景色及字体
			$(".data_body > div").parents(".data_body").removeClass("table_click_class");
			$(this).parents(".data_body").addClass("table_click_class");
		});
	});
}

/**
 * 该方法用于处理所有table都要做的东西
 * */
function undefindTable () {
	$(".table-bordered tbody td").each(function () {
		if ($(this).text() == "undefined") {
			$(this).text("");
		}
	});

}

/**
 * 该方法封装了管理后台用的提示框
 * @param {String} text 是提示语
 * @param {Object} callback 是操作方法,可不传
 * */
function TipsAlert (text,callback) {

	swal({
	    title: text,
	    text: text,
	    type: "error",
	},function () {
		if (callback) {
			callback();
		}
	});
}
/**
 * 该方法是用来重写summernote编辑器的图片上传
 * @param {File} files files是当前选择的文件
 * @param {Object} editor editor是对图片操作的对象
 * @param {Object} $editable $editable是dom元素对象
 * */
function summernoteImageUpload (files,editor,$editable) {
	if (files) {
		imgTimeout = null;
		var datas = new FormData();
		datas.append("files",files[0]);
		datas.append("token",token);
		Showload("读取图片中......");
		imgTimeout = setInterval("Timeout(imgTimeout)", 1000);
		$.ajax({
			type:"post",
			url:urls +jaroy_url.upload_img_interface,
			async:true,
			data:datas,
			processData:false,
			contentType:false,
			timeout:30000,
			success:function (result) {
				//console.log(result);
				if (result.return_code != "FAIL") {
//					$($editable[0]).append('<img src='+img_urls + result.files[0]+' />');
					document.execCommand("insertHtml", false, '<img src='+img_urls + result.files[0]+' />');
				}else{
					TipsAlert(result.return_msg)
				}

				InitTime (imgTimeout);
			},
			error:function (xms,text,error) {
				console.log(xms);
				console.log(text);
				console.log(error);
				InitTime (imgTimeout);
			}
		});
	}
}
/**
 * 该方法用于对数值用进一法处理
 * @param {Number} num num是取小数点后几位的值进1
 * */
Number.prototype.toCeil = function (num) {
	return Math.ceil(this * Math.pow(10, num)) / Math.pow(10, num);
};
//去尾法
Number.prototype.toFloor = function (num) {
	return Math.floor(this * Math.pow(10, num)) / Math.pow(10, num);
};

//四舍五入法
Number.prototype.toRound = function (num) {
	return Math.round(this * Math.pow(10, num)) / Math.pow(10, num);
};
// 计算距离当前时间多长
function datasum(str){
	var date1=new Date(str);
	var date2=new Date();
	var date3=date2.getTime()-date1.getTime();
	return date3/(3600*1000);
}
Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "H+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

/**
 * 根据经纬度计算距离
 * @param {Object} {"lng":111,"lat":23} 起点经纬度
 * @param {Object} {"lng":111,"lat":23}  终点经纬度
 * */
function getDistance(a, b) {
    var fD = function (a, b, c) {
        for (; a > c;)
            a -= c - b;
        for (; a < b;)
            a += c - b;
        return a;
    };
    var jD = function (a, b, c) {
        b != null && (a = Math.max(a, b));
        c != null && (a = Math.min(a, c));
        return a;
    };

    var yk = function (a) {
        return Math.PI * a / 180
    };

    var Ce = function (a, b, c, d) {
        var dO = 6370996.81;
        return dO * Math.acos(Math.sin(c) * Math.sin(d) + Math.cos(c) * Math.cos(d) * Math.cos(b - a));
    };

    if (!a || !b)
        return 0;
    a.lng = fD(a.lng, -180, 180);
    a.lat = jD(a.lat, -74, 74);
    b.lng = fD(b.lng, -180, 180);
    b.lat = jD(b.lat, -74, 74);
    return ((Ce(yk(a.lng), yk(b.lng), yk(a.lat), yk(b.lat))) / 1000).toFixed(2);
}
/*
 * ajax模板
$.ajax({
	type:"post",
	url:urls+ jaroy_url.add_qrcode_info,
	async:true,
	timeout:30000,
	dataType:"json",
	data:$("#edit_form").serialize(),
	success:function  (json) {
		CheckLogout (json);//检查是否登陆过期
		if (json.return_code == "SUCCESS") {
		} else{
			if (json.return_msg == "Session过期") {
				window.location = "login_timeout.html";
			}else{
				TipsAlert(json.return_msg);
			}
		}
	},
	error:function(xml, text, errorThrown) {
		if (text == "timeout") {
			TipsAlert("请求超时,请检查网络或着重新打开该页面.");
		} else{
			TipsAlert("请求数据失败,请联系后台技术人员");
		}
	}

});
 * 
 * 时间控制器模板
Showload("正在初始化列表......");
tableTimeout = setInterval("Timeout(tableTimeout)", 1000);
InitTime (tableTimeout);
 * 
 * 
 * 单按钮sweetAlert
swal({
    title: "",
    text: "！",
    type: "success",

},function () {
	location.reload();
});
 * 
swal({
	title: "",
	text: "",
	type: "warning",
	showCancelButton: true,
	confirmButtonColor: "#5bb7ee",
	confirmButtonText: "是的",
	cancelButtonText: "让我再考虑一下…",
	closeOnConfirm: true,
	closeOnCancel: true
}, function(isConfirm) {
	if (isConfirm) {

	} else {
		swal("已取消", "您取消了操作！", "error");
	}
});
 * 
 * <!--加载遮罩组件-->
        <div class="none" id="wating_show">
        	<div class="ibox wating_big_div">
	            <div class="zhezhao bg_f"></div>
 <div class="ibox-content wating_content_div " >
	                <div class="spiner-example">
	                    <div class="sk-spinner sk-spinner-wave">
	                        <div class="sk-rect1"></div>
	                        <div class="sk-rect2"></div>
	                        <div class="sk-rect3"></div>
	                        <div class="sk-rect4"></div>
	                        <div class="sk-rect5"></div>
	                    </div>
	                    <h5 class="f20 c0" ><span id="loading_text">正在请求 ，请稍后...... </span>(<span id="second_span">0</span>)秒</h5>
	                </div>
	            </div>
	        </div>
        </div>
 * 
 * */
