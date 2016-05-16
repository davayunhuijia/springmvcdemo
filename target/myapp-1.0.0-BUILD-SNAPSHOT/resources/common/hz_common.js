var hz = {};

hz.location = (window.location+'').split('/'); 
//hz.basePath = hz.location[0]+'//'+hz.location[2];
hz.basePath = hz.location[0]+'//'+hz.location[2]+'/'+hz.location[3];

/**
 * 平台常量定义
 * 渲染页面和js所有平台数据来源，务在页面或js写死
 */
//状态： 0=初审中  1=初审失败  2=核保中  3=核保失败  5=核保成功  6=拒保  7=已过期   8=已撤销',
hz.insureStatus = [[0,'初审中'],[1,'初审失败'],[2,'核保中'],[3,'核保失败'],[5,'核保成功'],[6,'拒保'],[7,'已过期'],[8,'已撤销'],[9,'待支付'],[10,'待确认'],[11,'已支付'],[12,'待出单'],[13,'已出单']];
hz.firstCheckStatus= [[0,'初审中'],[1,'初审失败'],[2,'初审成功'],[6,'拒保']];
hz.secondCheckStatus=[[2,'核保中'],[3,'核保失败'],[5,'核保成功'],[6,'拒保']];


hz.payStatus = [[1,'待支付'],[2,'待确认'],[3,'已支付']];//支付状态（1=待支付，2=待确认，3=已支付

hz.receivePayStatus = [[1,'待付款'],[2,'已付款']];//收款状态（1：待收款 2：已收款）

hz.issueStatus = [[1,'待出单'],[2,'已出单']];//出单状态（1=未出单  2=已出单）',

hz.expreWay = [[1,'寄送'],[2,'自提']];

hz.cardType = [[1,'身份证'],[2,'护照'],[3,'军官证'],[4,'港澳回乡证'],[5,'台胞证'],[6,'组织机构代码证'],[7,'税务登记证'],[8,'其他']];

hz.ownerKind = [[1,'私人'],[2,'企业'],[3,'机关']];//车主所属性质

hz.vehicleUseKind = [[0,'非营业'],[1,'营业']];// 车辆使用性质

hz.secondvehicleUseKind=[[1,'城市公交客车'],[2,'出租车'],[3,'租赁客车'],[4,'公路营运客车'],[5,'货车'],[6,'家庭自用汽车'],[7,'客车'],[8,'货车']];

hz.quotationStatus= [[-1,'待填写'],[0,'待报价'],[1,'已报价'],[2,'报价失败'],[3,'拒保'],[4,'crm线下报价']];

//收款方式
hz.payType=[[1,'银行转账'],[2,'支付宝'],[3,'财付通'],[4,'块钱'],[5,'其它']];
//车险收款方式：1:银行转账 2：pos刷卡 3：支付宝 4：银联 5:快钱 6财付通'
hz.carPayType=[[1,'银行转账'],[2,'pos刷卡'],[3,'支付宝'],[4,'银联 '],[5,'快钱'],[6,'财付通']];
//性别(0女1男)
hz.sex = [[0,'女'],[1,'男']];

//合作状态ID:1 未合作2 合作中3 合作暂停4 合作结束
hz.state = [[1,'未合作'],[2,'合作中'],[3,'合作暂停'],[4,'合作结束']];

hz.result_success = '0';
hz.result_fail = '1';

hz.initInsureStatus = function(id){
	var statusData;
	var json=new Array();
	json.push('{"label":"-1","text":"-1","value":"--全部--"}');
	for (var i = 0; i < hz.insureStatus.length; i++) {
		json.push('{"label":"'+hz.insureStatus[i][0]+'","text":"'+hz.insureStatus[i][0]+'","value":"'+hz.insureStatus[i][1]+'"}');
	}
	statusData="["+json.join(",")+"]";
	$("#"+id+"").combobox({
        data : eval("("+statusData+")"),
        valueField:'text',
        textField:'value'
    });
};
hz.checkStatus = function(id,data){
	var statusData;
	var json=new Array();
	json.push('{"label":"-1","text":"-1","value":"--全部--"}');
	for (var i = 0; i < data.length; i++) {
		json.push('{"label":"'+data[i][0]+'","text":"'+data[i][0]+'","value":"'+data[i][1]+'"}');
	}
	statusData="["+json.join(",")+"]";
	$("#"+id+"").combobox({
        data : eval("("+statusData+")"),
        valueField:'text',
        textField:'value'
    });
};
hz.initCompany=function(id){
	var companyData;
	var json=new Array();
	json.push('{"label":"0","text":"0","value":"--全部--"}');
	var url=hz.basePath+"/company/getList";
	$.ajax({
		url : url,
		type: 'post',
		data : {},
		dataType : 'json',
		success : function(data) {
			if(data){
				for(var i=0;i<data.length;i++){
					json.push('{"label":"'+data[i].companyId+'","text":"'+data[i].companyId+'","value":"'+data[i].simpName+'"}');
				}
			}
			companyData="["+json.join(",")+"]";
			$("#"+id+"").combobox({
				data : eval("("+companyData+")"),
		        valueField:'text',
		        textField:'value'
			}); 
		}
	});
};
//初始化付款方式(下拉框)
hz.initPayType = function(id){
	var serviceTypeData;
	var json=new Array();
	json.push('{"label":"0","text":"0","value":"--请选择--"}');
	for (var i = 0; i < hz.payType.length; i++) {
		json.push('{"label":"'+hz.payType[i][0]+'","text":"'+hz.payType[i][0]+'","value":"'+hz.payType[i][1]+'"}');
	}
	serviceTypeData="["+json.join(",")+"]";
	$("#"+id+"").combobox({
        data : eval("("+serviceTypeData+")"),
        valueField:'text',
        textField:'value'
    });
};
//打开窗口
hz.openWindow = function(windowId,opt){
	$('#'+windowId).window({
		title:opt,
		modal:true,
		resizable:false,
		draggable:false,
		collapsible:false,
		closed:true,
    	maximized:true,
    	minimizable:false,
    	maximizable:false,
		onBeforeClose:function(){
			$(".tooltip").remove();
		}
	});
	$('#'+windowId).window('open');
};
//将表单数据转为json
hz.form2Json = function(id) {
	var arr = $("#" + id).serializeArray()
	var jsonStr = "";
	jsonStr += '{';
	for (var i = 0; i < arr.length; i++) {
		jsonStr += '"' + arr[i].name + '":"' + $.trim(arr[i].value) + '",'
	}
	jsonStr = jsonStr.substring(0, (jsonStr.length - 1));
	jsonStr += '}'
	var json = JSON.parse(jsonStr)
	return json
};
//关闭窗口
hz.closeWindow = function(windowId){
	$('#'+windowId).window('close');
};

/**
 * 公司资料类型定义
 */
hz.INFO_TYPE_1=1;//1产品条款管理 ;
hz.INFO_TYPE_2=2;//2索赔方式管理;
hz.INFO_TYPE_3=3;//3赔付比例管理;
hz.INFO_TYPE_4=4;//4疾病分类管理;
hz.INFO_TYPE_6=6;//6投保须知管理;
hz.INFO_TYPE_7=7;//7投保声明

//正推， 表单到对象
hz.serializeObject = function(form) {  
    var o = {};  
    $.each(form.serializeArray(), function(index) {  
        if (o[this['name']]) {  
            o[this['name']] = o[this['name']] + "," + this['value'];  
        } else {  
            o[this['name']] = this['value'];  
        }  
    });  
    return o;  
};  
hz.keydown = function() {
	$(document).keydown(function(event){
	    if(event.keyCode==13){
	      $("#search").click();
	    }
	 });
};
// 反推，对象填充到input
hz.setValue = function(obj) {
	// 开始遍历
	for ( var p in obj) {
		// 方法
		console.info(obj);
		if (typeof (obj[p]) == "function") {
			// obj[p]();
		} else {
			$("#" + p).val(obj[p]);
			// p 为属性名称，obj[p]为对应属性的值
		}
	}
}  

//获取传递参数值
$.getUrlParam = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
};
//选择险种一级大类
hz.selectCatrogyDataGrid = function(){
	$('#catrogy_list').datagrid({
		url : hz.basePath+'/proType/getListByPlatform/'+hz.platforms[0][0],
		method : 'post',
		title : '',
		toolbar : '#sub_toolbar',
		pagination : 'true',
		rownumbers : 'true',
		fitcolumns : 'true',
		singleselect : 'false',
		width:781,
		height:460,
		pageSize: 15,//每页显示的记录条数，默认为10
	    pageList:[5,10,15,20],//每页显示几条记录
		frozenColumns : [[
			{field : 'ck',checkbox :'true',width : 80}
		]]
	}); 
    var p = $('#catrogy_list').datagrid('getPager'); 
    $(p).pagination({ 
        pageSize: 15,//每页显示的记录条数，默认为10
        pageList:[5,10,15,20],//每页显示几条记录
        beforePageText: '第',//页数文本框前显示的汉字
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录    共 {total} 条记录',
        onBeforeRefresh:function(){ 
            $(this).pagination('loading');//正在加载数据中...
            $(this).pagination('loaded'); //数据加载完毕
        } 
    }); 
};

$.extend($.fn.validatebox.methods, {    
    remove: function(jq, newposition){    
        return jq.each(function(){    
            $(this).removeClass("validatebox-text validatebox-invalid").unbind('focus').unbind('blur');  
        });    
    },  
    reduce: function(jq, newposition){    
        return jq.each(function(){    
           var opt = $(this).data().validatebox.options;  
           $(this).addClass("validatebox-text").validatebox(opt);  
        });    
    },
    reset: function(jq, newposition){ 
    	 return jq.each(function(){    
             $(this).removeClass("validatebox-text validatebox-invalid").unbind('focus').unbind('blur');  
             var opt = $(this).data().validatebox.options;  
             $(this).addClass("validatebox-text").validatebox(opt);  
         });
    }
}); 

//清空datagrid数据
$.extend($.fn.datagrid.methods,{
	 clearData:function(jq){
	     return jq.each(function(){
	          $(this).datagrid('loadData',{total:0,rows:[]});
	     });
	 }
});

//加载效果
hz.loading = function(type,msg){
	if(msg==null||msg==""){
		msg = "请稍后,正在加载......";
	}
	var  body_width =  document.body.clientWidth;
	var  body_height= document.body.clientHeight;
	//展示loading
	if(type=="show"){
		var myload = $("<div id='myload' style='border:2px solid #95B8E7;display:inline-block;padding:10px 8px;;position:absolute;z-index:999999999;top:0px;left:0px;background:#ffffff'>"+
				"<div style='float:left;'><img src='"+hz.basePath+"/resources/common/jquery-easyui-1.4.1/themes/black/images/loading.gif'></div>"+
				"<div style='font-size:12px;float:left;display:inline-block;margin-top:2px;margin-left:5px;'>"+msg+"</div>"+
		 "</div>").appendTo($("body"));
		 var myloadwidth = myload.width();
		 var myloadheight = myload.height();
		 myload.css({"left":(body_width-myloadwidth)/2,"top":(body_height-myloadheight)/2});
		 $("<div id='remote_load' style='position:fixed;width:100%;height:"+body_height+"px;z-index:99999999;top:0px;left:0px;background-color: #ccc;opacity: 0.3;filter: alpha(opacity = 30);'></div>").appendTo($("body"));
	}else{
		$("#myload").remove();
		$("#remote_load").remove();
	}
};

hz.beginEditAllLine = function(id){
	var curObj = $("#"+id);
	var rows = curObj.datagrid("getRows");
	for(var i=0,length = rows.length;i<length;i++){
		curObj.datagrid('beginEdit', i);
   	}
};


function convertArray(o) { 
	var v = {};
	for ( var i in o) {
		if (typeof (v[o[i].name]) == 'undefined')
			v[o[i].name] = o[i].value;
		else
			v[o[i].name] += "," + o[i].value;
	}
	return JSON.stringify(v);
}

//获取当前日期
hz.getCurDate = function(){
	var now = new Date(); 
	var SY = now.getFullYear(); 
	var SM = now.getMonth(); 
	var SD = now.getDate(); 
	return SY+"-"+(SM+1)+"-"+SD;
};
//获取当前日期前一个月
hz.getPreMonthDate = function(){
	var now = new Date(); 
	var SY = now.getFullYear(); 
	var SM = now.getMonth()-1; 
	var SD = now.getDate(); 
	return SY+"-"+(SM+1)+"-"+SD;
};

//判断开始日期是否小于结束日期可相等
hz.isStartLessThanEndDate = function(startDate,endDate){   
    if(startDate.length>0&&endDate.length>0){   
        var arrStartDate = startDate.split("-");   
        var arrEndDate = endDate.split("-");   
        var allStartDate = new Date(arrStartDate[0],arrStartDate[1],arrStartDate[2]);   
        var allEndDate = new Date(arrEndDate[0],arrEndDate[1],arrEndDate[2]);   
        if(allStartDate.getTime()>allEndDate.getTime()){   
             return false;   
        }   
     }   
     return true;   
};

hz.convertArray = function(o) { 
	var v = {};
	for ( var i in o) {
		if (typeof (v[o[i].name]) == 'undefined')
			v[o[i].name] = o[i].value;
		else
			v[o[i].name] += "," + o[i].value;
	}
	return JSON.stringify(v);
};
/**
 * async:true异步
 * dataType:服务器返回的数据类型
 */
hz.ajaxRequest = function(url,reqParam,async,dataType,callback){
	$.ajax({
		  beforeSend: function(){
			  hz.isLogin();
		  },
		  async:async,
		  type: 'POST',
		  url: url,
		  data: reqParam,
		  dataType:dataType,
		  cache: false,
		  success: callback
	});
};
hz.isLogin = function(){
	var url=hz.basePath+"/common/getCurrentUser?v="+Math.random();
	$.ajax({
		url : url,
		type: 'post',
		dataType : 'json',
		success : function(data) {
			if(!data){
				top.location =hz.basePath+"/pages/login.html";
			}
		}
	}); 
};
String.prototype.replaceAll  = function(s1,s2){     
    return this.replace(new RegExp(s1,"gm"),s2);     
};

function converLookupJsonObj(data){
	var str = "";
	for(var i = 0,length = data.length;i<length;i++){
		str = str+"\""+data[i].itemvalue +"\":\""+data[i].itemname+"\"";
		if(i<length-1){
			str = str+",";
		}
	}
	return eval("({"+str+"})");
};
hz.clearSearchForm = function(){
	$("#startCreateTimes").val("");
	$("#endCreateTimes").val("");
	$("#searchOwner").textbox('clear');
	$("#searchPlateNum").textbox('clear');
	$("#companyList").combobox('setValue', '0');
	$("#searchInsureNum").textbox('clear');
};

hz.getRandomBaseDate = function(){
	 var now = new Date();
	 var year = now.getFullYear()+'';
	 var month = now.getMonth()+'';
	 var day = now.getDate()+'';
	 var hours = now.getHours()+'';
	 var minutes = now.getMinutes()+'';
	 var seconds = now.getSeconds()+'';
	 var mseconds = now.getMilliseconds()+'';
	 return year+month+day+hours+minutes+seconds+mseconds+Math.ceil(Math.random()*10); 
}

function myformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-'
		+ (d < 10 ? ('0' + d) : d);
}
function myparser(s) {
	if (!s)
		return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	var d = parseInt(ss[2], 10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y, m - 1, d);
	} else {
		return new Date();
	}
}

function enableOrDisable(ids,isEnable){
	var idArray = ids.split(',');
	for(var i=0;i<idArray.length;i++){
		if(isEnable)
			$('#'+idArray[i]).linkbutton('enable');
		else
			$('#'+idArray[i]).linkbutton('disable');
	}
}


/**
 * 选择日期合法性检查
 * @returns {Boolean}
 */
function checkDate(startDate,endDate){
	//如果日期为空，返回TRUE
	if(startDate==null || startDate ==""){
		return true;
	}
	if(endDate ==null || endDate ==""){
		return true;
	}
	var dateReg = /^(1[89]\d\d|2[01][01]\d)-(1[0-2]|0\d)-([0-2]\d|3[01])$/;
	if(!dateReg.test(startDate)){
		alert("起始日期格式要求为'yyyy-MM-dd'，请重新选择！");
		return false;
	}
	if(!dateReg.test(endDate)){
		alert("截止日期格式要求为'yyyy-MM-dd'，请重新选择！");
		return false;
	}
	//现在日期毫秒表示
	var todayMs = new Date().getTime();
	//获取选择的日期转为毫秒表示
	var beginMs = new Date(startDate.replace(/-/g,'/')).getTime();
	var endMs = new Date(endDate.replace(/-/g,'/')).getTime();
	//起止间隔天数
	var beginToEndDays = Math.floor((endMs - beginMs)/1000/60/60/24);
	//选择的起始日期距离现在天数
	var beginToNowDays = Math.floor((todayMs - beginMs)/1000/60/60/24);
	
	//暂时不需要此项判断
//	if(beginToNowDays - 360 > 0){
//		alert("只支持一年内(360天)的明细查询，请重新选择！");
//		return false;
//	}
	
	if(beginMs - endMs > 0){
		alert("起始日期不能大于截止日期，请重新选择！");
		return false;
	}
	//不需要此验证
//	if(endMs - todayMs > 0){
//		alert("截止日期不能大于今天，请重新选择！");
//		return false;
//	}
	//暂时不需要此项判断
//	if(beginToEndDays - 90 > 0){
//		alert("一次查询最大时间跨度为90天，请重新选择！");
//		return false;
//	}
	return true;
}

hz.loadingMsg = '正在加载,请等待...',

hz.show = function (msg,title){
	var _title = '提示信息';
	if(title){
		_title = title;
	}
	$.messager.show({
		title: _title,
		msg: msg
	});
}

hz.alert = function(msg, icon, title){
	var _title = '提示信息';
	var _icon = 'info';
	if(title){
		_title = title;
	}
	if(icon){
		_icon = icon;
	}
	$.messager.alert(_title, msg, _icon);
}
 

hz.isNullStr = function(str){
	if(str==null || str=='' || str==undefined || str=='undefined' ){
		return true;
	}
	return false;
}


hz.disableTreeNode = function(target){
	target.find("span[class^=tree-icon],span[class^=tree-title]").bind('click',
			function(e) {
				e.stopPropagation();
			}).css("cursor", "not-allowed").attr("title","不可选择");
	target.find("span[class=tree-title]").css({
		"font-style" : "italic",
		"color" : "#bbb"
	});
}

//删除
hz.deleteObj = function(url, id, datagrid){
	if(hz.isNullStr(id)){
		return false;
	}
	$.messager.confirm('提示信息' , '确认删除?' , function(r){
		if(r){
			$.ajax({
				type : "post",
				data: 'id='+id,
				dataType : "json",
				url : hz.basePath+url,
				success : function(data) {
					if(data.flag=='0'){
						hz.show("删除成功");
						$('#'+datagrid).datagrid('reload');
					}else{
						hz.alert(data.exception,'error');
					}
				},
				error : function(err) {
					hz.alert('获取信息失败...请联系管理员!', 'error');
				}
			});
		}
	}); 
} 

//保存或更新  ,非可编辑表格保存需要stringify。 自己组装的json格式 需传入 notStringify: true.
hz.saveOrUpdate = function(url, data, datagrid, notStringify){
	var json;
	if(notStringify){
		json = data;
	}else{
		json = JSON.stringify(data);
	}
	$.ajax({
		type : "post",
		data: 'jsonObj='+ json,
		dataType : "json",
		url : hz.basePath+url,
		success : function(data) {
			if(data.flag=='0'){
				hz.show("保存成功");
				if(datagrid){
					$('#'+datagrid).datagrid('reload');
				}
			}else{
				hz.alert(data.exception,'error');
			}
		},
		error : function(err) {
			hz.alert('获取信息失败...请联系管理员!', 'error');
		}
	});
}

hz.saveOrModify = function(url, data, callback){
	var json = JSON.stringify(data);
	$.ajax({
		type : "post",
		data: 'jsonObj='+ json,
		dataType : "json",
		url : hz.basePath+'/'+url,
		success : function(data) {
			callback(data);
		},
		error : function(err) {
			hz.alert('保存信息失败', 'error');
		}
	});
}

//post 请求
hz.post = function(url, data, datagrid, msg){
	$.ajax({
		type : "post",
		data: data,
		dataType : "json",
		url : hz.basePath+url,
		success : function(data) {
			if(data.flag=='0'){
				var m = "操作成功";
				if(msg){
					m = msg;
				}
				hz.show(m);
				if(datagrid){
					$('#'+datagrid).datagrid('reload');
				}
			}else{
				hz.alert(data.exception, 'error');
			}
		},
		error : function(err) {
			hz.alert('获取信息失败...请联系管理员!', 'error');
		}
	});
}

//提交post请求，传入callBack方法
hz.postForCallBack = function(url, data, callBack){
	$.ajax({
		type : "post",
		data: data,
		dataType : "json",
		url : hz.basePath + url,
		success : function(data) {
			if(data.flag==hz.result_success){
				if(callBack){
					callBack(data);
				}
			}else{
				hz.alert(data.exception, 'error');
			}
		},
		error : function(err) {
			hz.alert('获取信息失败...请联系管理员!', 'error');
		}
	});
}
//提交表单
hz.submitForm = function(formId, url, winId, gridId) {
	if(!$('#'+formId).form('validate')){
		hz.show('验证没有通过,不能提交表单!');
		return false;
	}
	$.ajax({
		type: 'post',					//请求方式
		url: hz.basePath+url,	//地址
		cache: false ,					//是否情况缓存
		data: $('#'+formId).serialize(), //向后台发送的数据
		dataType: 'json',				//服务器返回时接收的数据类型 
		success: function(data){
			if(data.flag=='0'){
				hz.show("保存成功");
				if(winId){
					$('#'+winId).window('close');
				}
				if(gridId){
					$('#'+gridId).datagrid("reload");
				}
			}else{
				hz.alert(data.exception,'error');
			}
		},
		error: function(result){
			hz.alert('获取信息失败...请联系管理员!', 'error');
		}
	});
}

//移除
hz.removeObj = function (id){
	$("#"+id).remove();
}

//获取数组长度   如果不是数组 返回-1
hz.arrayLength = function(arr){
	return (arr && (arr instanceof Array)) ? arr.length:-1;
}

//打开编辑
hz.openEditRow = function(grid, index){
	$('#'+grid).datagrid('beginEdit', index);
}

//取消编辑
hz.cancelEditRow = function(grid, index, id){
	if(!hz.isNullStr(id)){
		$('#'+grid).datagrid('cancelEdit', index);
	}else{
		$('#'+grid).datagrid('rejectChanges');
	}
}

//关闭编辑列
hz.closeEditRow = function(grid, index){
	if($('#'+grid).datagrid('validateRow', index)){
		$('#'+grid).datagrid('endEdit', index);
	}else{
		hz.show("数据校验没通过，请检查");
	}
}

//校验form表单数据
hz.validateForm = function(formId){
	if(!$("#"+formId).form("validate")){
		hz.show("数据校验没有通过，请检查数据");
		return false;
	}
	return true;
}