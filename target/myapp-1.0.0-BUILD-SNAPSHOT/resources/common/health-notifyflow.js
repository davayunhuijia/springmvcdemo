


var duck = new Duck();
//初次登入，还没有添加健康告知


$(function(){
	    var json =  duck.settingAnserJson();  //如果有答案，代表是还原页面
		if(json && json !='')
		{
			log('设置答案')
		reset(json);
		}else{
			log('设置问题')
		firstenter(); 
	   }	
});



function log(msg){
	if (window["console"]){
		console.log(msg);
	}
}

$(".insure-label").click(function(event){
	$(this).siblings().removeClass('insure-label-active');
	$(this).addClass('insure-label-active');
});

function firstenter(){
	    var trialGenes =  duck.trialGenes();
		
		log('...初次进入传入的试算因子...'+trialGenes);
	    duck.doSomethingForInit(trialGenes);
}

//投保页面，已经有健康告知,还原
function  reset(json){
       //重新画页面
	   //获取当初的试算信息
	   //年龄，性别
	  
	    var temptrialGenesId  = Base.prototype.getQueryValue("trialGenesId");
    	var tempurl = "http://is.huize.com/hzapi/productInsure/getTrialGenesById?trialGenesId="+temptrialGenesId;
    	log('... 重设答案  ...'+tempurl);
    	$.ajax({ url: tempurl, dataType:'json',success: function(data){
					trialGenes = JSON.parse(data.result.trialGenes["genes"]);
					duck.doSomethingForEdit(trialGenes);
       },
       error: function(){
		           log('ajax 请求出错 ');
		           duck.doSomethingForEdit(trialGenes); 	
		}
		
	   });
		duck.reset(json);
}

	
function getSelectValue(radname){
	    var rads = document.getElementsByName(radname);
		if(rads){
			for(var i=0;i<rads.length;i++){
				var r = rads[i];
				if(r.checked){
					return r.value;					
				}
			}
		}
		return -100;
}
	
//验证 选择值与预设值是否相同
function checkNotify(){  
        //通用型处理
		var  globalSetting = $('#globalSettingId');
		if(globalSetting.length>0){
			var rds = document.getElementsByName('gsname');
			var selectValue;
			for(var i=0;i<rds.length;i++){
				if(rds[i].checked){
					selectValue = rds[i].value;
					break;
				}
			}
			if(selectValue){
			    var data = $(".health-inform-x").attr("data").replace(/'/g,'"');
		        var dt = JSON.parse(data);
		        var expect = dt["checktype"];
				return selectValue == expect;
			}
			else{
				return false;
			}
	   } else{
			var divs = document.getElementsByName('itemDivId');
			if(divs){
				for(var n=0;n<divs.length;n++){
					var seq = divs[n].id.split('_')[1];
					
					if($('#itemDivId_'+seq).parent().parent().css('display')=='block')
					{
					var mv =  getSelectValue('xitem_'+seq);	
					var k = 'xitem_'+seq;
					var data = $("input:radio[name='"+k+"']").parent().prev().prev().attr("data").replace(/'/g,'"');
					var tt = JSON.parse(data);
					 var sv =    tt['expectvalue'];
					if(!(sv == mv)){
						return false;	
					}
					}
				}
			}		
	   }
	   return true;		
}
	
	
//验证告知模板是是否填写
function GetNotifyResult() {
		var  globalSetting = $('#globalSettingId');
		var result = "true"; //返回结果
		if(globalSetting.length>0){
			//统一答案
			var rds = document.getElementsByName('gsname');
			var selectValue;  //选中值
			for(var i=0;i<rds.length;i++){
				if(rds[i].checked){
					selectValue = rds[i].value;
					break;
				}
			}
			if(!selectValue){
				//没有选中
				result = false;
			}
			if(result==false)
			{
			   return  "{result:" + result + ",message:'<p><b>温馨提示：</b><br />对不起，您的健康告知未选择，保险公司无法受理您此险种的投保申请。</p>'}";
			
			}else{
			   return  "{result:" + true + "}";
			}
		} else{
			//单选答案
			var qsList = "";
			var divs = document.getElementsByName('itemDivId');
			if(divs){
				for(var n=0;n<divs.length;n++){
					var seq = divs[n].id.split('_')[1];
					if($('#itemDivId_'+seq).parent().parent().css('display')=='block')
					{
					   var mv =  getSelectValue('xitem_'+seq);	
					if(mv == -100){
						qsList += " "+(n+1)+" ";
					}
					}
					
				}
			}	
			
			if (qsList != undefined && qsList != "") {
	            result = false;
	        }

        	return "{result:" + result + ",message:'<p><b>温馨提示：</b><br /> 对不起，您的健康告知未选择/填写，保险公司无法受理您此险种的投保申请。</p>'}";
		
	   }
	   return "{result:true}";
 }
    
    
    //验证  健康告知
function checNewkNotify_new(){
    	//验证是否被调用
    	var result = GetNotifyResult();
		var result1 = duck.isFillAnsWer();
    	eval("var resultJson=" + result);//转json
		eval("var resultJson1=" + result1);//转json
		
        if (resultJson1.result== false || resultJson.result == false) {
        	$('#errorPrompt').show();
            var html = "";
			if(resultJson1["message"]){
				 html += resultJson1.message;
			}
            if( resultJson["message"])
			{
				html += resultJson.message;
			}	
            document.getElementById("errorPrompt").innerHTML = html;            
       }else{
       		$('#errorPrompt').hide();
       		document.getElementById("errorPrompt").innerHTML = '';//清空提示面板 
			
			var notifyAnswerId   = duck.postNotifyAnswer();
			
			if(notifyAnswerId)
			{
			 if(!this.debug)
		   {
  	        //验证选择值 是否正确，不正确跳转指定也页面
	    	 if(!duck.equalExepectValue || !checkNotify()){
	    		//跳转预留信息页面
	    		duck.nopass(notifyAnswerId);
	    	 }else{
	    	    duck.pass(notifyAnswerId);   
             }	 
           }	
				
			}else{
				
				log('返回的健康告知ID为空，请开发人员注意你的提交健康告知方法...,停滞不前了.....')
			}
		   
		  
		   
		   
		   
     }
  }