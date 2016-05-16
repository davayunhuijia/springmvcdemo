     var  Duck = function (){}
	 
	 
	 /**
	    试算项答案
	 **/
	 Duck.prototype.trialGenes = function (){
	   var temptrialGenesId  = Base.prototype.getQueryValue("trialGenesId");
       var tempurl = "http://is.huize.com/hzapi/productInsure/getTrialGenesById?trialGenesId="+temptrialGenesId;
    	$.ajax({ url: tempurl, asyc:false,dataType:'json',success: function(data){
		      	trialGenes = JSON.parse(data.result.trialGenes);
                return trialGenes["genes"];
        },
        error: function(){
		        log('ajax 请求试算项出错 ');
				return  [];
		}
	   });
	 }
	 
	 
	 /**
	   把返回的json设置到该选项中
	 **/
	 
	 Duck.prototype.settingAnserJson = function (){
		 
		 return "";
	 } 
	 
	 
	 /**
	  用于debug,如果为true,则不跳过此页面，看到所有console
	 **/
	 Duck.prototype.debug = false;
	 /**
	 初次进入页面的操作，比如隐藏按钮之类的..
	 **/
     Duck.prototype.doSomethingForInit = function (array){
	     //参数为受影响的试算因子
		 /* "genes":[{"key":"insurantDate","value":"2016-03-16"},{"key":"sex","value":"女"},{"key":"insurantJob","value":"1-4类"},{"key":"insurantDateLimit","value":"终身"},{"protectItemId":"27","value":"10万元"},{"key":"paymentType","value":"年交"},{"key":"insureAgeLimit","value":"5年"}]
		 */
	 };
	 /**
	 进入编辑页面操作
	 **/
	 Duck.prototype.doSomethingForEdit = function (array){
	     //参数为受影响的试算因子
		 /* "genes":[{"key":"insurantDate","value":"2016-03-16"},{"key":"sex","value":"女"},{"key":"insurantJob","value":"1-4类"},{"key":"insurantDateLimit","value":"终身"},{"protectItemId":"27","value":"10万元"},{"key":"paymentType","value":"年交"},{"key":"insureAgeLimit","value":"5年"}]
		 */
	 };
	 
	 /**
	    检测自定义的是否填写->默认,如果为"{result:false,message:''}"
	 **/
	 Duck.prototype.isFillAnsWer =  function (){
	      //填写答案是否完成,检测空
		  return "{result:true}";
	 }; 
	 
	 Duck.prototype.equalExepectValue =  function (){
	      //是否等于自定义答案
		  return true;
	 };
	 
	 
	 
	 
	 /**
	    设置页面自动重新设置答案..
	 **/
	 Duck.prototype.reset = function(json)
	 {
	  //最初填入的json答案还原
     if(json){
	     var  obj = JSON.parse(json);
         var len = obj.Content.length;
		 if(obj.checktype){
		     //选择框集中在下面
		     if(obj.checktype=='1'){
			     $("#is_1").attr('checked',true);
			 }
			 if(obj.checktype=='0'){
			     $("#not_1").attr('checked',true);
			 }
		 }
		for(var i=0;i<len;i++){
			  if(obj.Content[i].type=='radio'){
               //代表单选框
              var ans= obj.Content[i].Value1[0];
              if(ans["IsTrue1"] == 'False'){
                 if(document.getElementById('is_'+(i+1))){
                    document.getElementById('is_'+(i+1)).checked = true ;
                 }
              }else{
                 if(document.getElementById('not_'+(i+1))){
                 document.getElementById('not_'+(i+1)).checked = true ;
                 }
              }
               
               
           }else if(obj.Content[i].type=='text'){
                var def = obj.Content[i].Value1[0];
                for(var key in def){
                  if(document.getElementById(key)){
                     document.getElementById(key).value = def[key];
                  }
                }              
           }else if(obj.Content[i].type=='singleradio'){
		       
			   var k =  obj.Content[i].Value1.replace(/'/g,'"');
		       var x =  JSON.parse(k);
			   for(var s=0;s<x.length;s++)
			   {
			       for(var key in x[s])
			      {   
				     
				        $("input:radio[name='"+key+"'][value='"+x[s][key]+"']").attr('checked','checked');
			      }
			   }
		   }else if(obj.Content[i].type=='multipletext'){
		       var k =  obj.Content[i].Value1.replace(/'/g,'"');
		       var x =  JSON.parse(k);
			   for(var s=0;s<x.length;s++)
			   {
			       for(var key in x[s])
			      {
			         
				  $("#"+key).val(x[s][key]);
			      }
			   }
			  
		   }
			 
		}      
     }
     };
     
	 /**
	   健康告知动态生成JSON
	 **/
     Duck.prototype.getHealthOld = function () {
        var justoneradio ;  // 全局是否一个选项框
		var expect ;
		var choice ;
		var arr = new Array(0);
		var data = $(".health-inform-x").attr("data").replace(/'/g,'"');
		var dt = JSON.parse(data);
		if(dt["checktype"]){
		    justoneradio = true;
			expect = dt["checktype"];
			choice =  $('input:radio[name=gsname]:checked').val();
			
		}
       	$("div.divLine:visible").each(function(index){
       		
       		var dataxy = $(".health-inform-x").attr("data").replace(/'/g,'"');
    		var dtxy = JSON.parse(dataxy);
    		var justoneradio1;
    		var expect1;
    		var choice1;
    		if(dt["checktype"]){
    		    justoneradio1 = true;
    		    expect1 = dt["checktype"];
    			choice =  $('input:radio[name=gsname]:checked').val();
    			
    		}
       		
       		
       		
		        var tob = new Object();
				tob.Id = index+1 ; //id 
				tob.Id1 = index+1 ; //id 
				tob.Title= $(this).find("div.health-left").html().replace(/\t/g,'').replace(/\n/g,'');  //title
				var tdata  = $(this).find("div.health-left").attr("data").replace(/'/g,'"');
				var tt = JSON.parse(tdata);
				if(justoneradio1 && tt['type']=='radio'){
				  tob.type='radio';
				  if(choice1 == '1')
				  {
				    tob.IsTrue = '是'; 
					tob.IsTrue1 = '是'; 
					  tob.Answer='是';
					  tob.Answer1='是';
					tob.Value = '[{"IsTrue":"True"}]';  
					tob.Value1 = '[{"IsTrue":"True"}]';
				  }else{
				     tob.IsTrue = '否'; 
					 tob.IsTrue1 = '否'; 
					  tob.Answer='否';
					  tob.Answer1='否';
				     tob.Value = '[{"IsTrue":"False"}]'; 
					 tob.Value1 = '[{"IsTrue":"False"}]'; 
				  }
				  
				  if(choice1 == expect1 )
				  {
				     tob.Result = true;
				  }else{
				     tob.Result = false;
				  }
				  log('...length for span remark '+$(this).find('span.rmarkFont').length);
				  if($(this).find('span.rmarkFont').length>0){
					  tob.Content = $(this).find('span.rmarkFont').html().replace(/\t/g,'').replace(/\n/g,'').replace(/<br>/g,'');  //content;
					  tob.Content1 = $(this).find('span.rmarkFont').html().replace(/\t/g,'').replace(/\n/g,'').replace(/<br>/g,'');  
				  }else{
					  tob.Content = ''  //content;
					  tob.Content1 ='';  
				  }
				}else {
				  if(tt['type']=='multipletext')
				  {	  	  
                        //多选
					  var keys = tt['keys'];
					  var arr_A = keys.split(',');
					  tob.Result = true;
				      tob.type= 'multipletext';
					  tob.IsTrue = '否';
					  tob.IsTrue1 = '否';
					  tob.Value = "[{'IsTrue':'False'}]";
					  tob.Value1 = "[{'IsTrue':'False'}]";  
					 
					  
				  } 
				  if(tt['type']=='radio')
				  {   
				      tob.type='radio'; 
				      var v= $(this).find("div.health-right").find('input:radio:checked').val();
					  if(v==1)
					  {
					   tob.IsTrue = '是';
					   tob.IsTrue1 = '是';
					    tob.Answer='是';
					  tob.Answer1='是';
					   tob.Value = "[{'IsTrue':'True'}]";  
					   tob.Value1 = "[{'IsTrue':'True'}]";  
					  }else{
					  
					   tob.IsTrue = '否';
					   tob.IsTrue1 = '否';
					     tob.Answer='否';
					  tob.Answer1='否';
					   tob.Value = "[{'IsTrue':'False'}]";
					   tob.Value1 = "[{'IsTrue':'False'}]";  
					  }
				      var expect =    tt['expectvalue'];
					  if(expect ==v  )
					  {
					      tob.Result = true;
					  }
					  else
					  {
					      tob.Result = false;
					  }
					  if($(this).find('span.rmarkFont').length>0){
						  tob.Content = $(this).find('span.rmarkFont').html().replace(/\t/g,'').replace(/\n/g,'').replace(/<br>/g,'');  //content;
						  tob.Content1 = $(this).find('span.rmarkFont').html().replace(/\t/g,'').replace(/\n/g,'').replace(/<br>/g,'');  
					  }else{
						  tob.Content = ''  //content;
						  tob.Content1 ='';  
					  }
				  }
				 
				 
				  
				  if(tt['type']=='singleradio')
                  {  
				     var key = tt['key'];
				     var val = $("input:radio[name='"+key+"']:checked").val();				    
					 tob.type='singleradio';
					 tob.Content= '';
					 tob.Content1= '';
					 tob.Value= "[{'"+key+"':'"+val+"'}]";
					 tob.Value1= "[{'"+key+"':'"+val+"'}]";
					 tob.IsTrue = '否';
					 tob.IsTrue1 = '否';
					 tob.Answer = $("input:radio[name='"+key+"'][value='"+val+"']").next().html().replace(/\t/g,'').replace(/\n/g,'').replace(/<br>/g,'');
					 tob.Answer1 = $("input:radio[name='"+key+"'][value='"+val+"']").next().html().replace(/\t/g,'').replace(/\n/g,'').replace(/<br>/g,'');
					 tob.Result = true ;
					 
					
				  }
					
				}
				
		        arr.push(tob);  
		  
      });
	  
	  
	   //TODO 数组转换为json,IE6,7,8 需要自己去引用第三方js库
	  log("替换前.."+arr);
	  var arry =  this.back(arr);  //后置处理器
	  var json = JSON.stringify(arry);
	  
	  //checktype,代表全局选项框，并且答案是1，答案是0，否
	   var as  = "";
	  if(dt["checktype"])
	  {
	  as  = '{"checktype":"'+choice+'","Content":'+json+'}';  
	  }else{
	    as = '{"Content":'+json+'}';
	  }
	  log("返回给..."+as)
	  return as;
     };
     
	 
	 /**
	  动态替换
	 **/
     Duck.prototype.back = function (arr){
	    return arr;
	 };
	 
	 /**
	   添加健康告知
	 **/
	 Duck.prototype.postNotifyAnswer = function () {
		   var notifyAnswerId ;
		   var notityUrl = "http://is.huize.com/notify/AddNotifyAnswer";
	        $.ajax(
			{ async:false,
              type: 'post',
              data: { 'answer': this.getHealthOld()},
              dataType: 'json',
              url: notityUrl,
              success: function (data, textStatus) {
                if (!data.IsSuccess) {
                    alert("添加答案失败！");
                    return;
                }
                notifyAnswerId  =   data.Message;   
                log('返回的id:'+notifyAnswerId);  
             },
			  error: function (){
				 log('调用健康告知失败') 
			  }
           }
		   );
		   return notifyAnswerId;
	 }
	 
	 
	 /**
	    健康告知成功跳转的页面
	 **/
	 Duck.prototype.pass = function(notifyAnswerId) {
		 
		      //跳转购买
	    	  var url = 'http://is.huize.com/product/insure';
			  var productId = Base.prototype.getQueryValue("productId");
			  var planId = Base.prototype.getQueryValue("planid");
			  var trialGenesId = Base.prototype.getQueryValue("trialGenesId");
			  var preminum = Base.prototype.getQueryValue("preminum");
			  var productInfo = '-' + productId + '-' + planId;
			  var orderNO = Base.prototype.getQueryValue("orderNO");
			  var type = Base.prototype.getQueryValue("type");
			  var payUrl = Base.prototype.getQueryValue("payUrl");
			  var qhSuccessUrl = "http://lf.huize.com/Appointment/QHSuccess";
              var qhReservationUrl = "http://lf.huize.com/Appointment/QHReservation";
              if(orderNO && type && payUrl){
			    	//转向支付页面
			    	if (type == 1) {
						if (payUrl.indexOf("?") != -1) {
							payUrl += "&";
						} else {
							payUrl += "?";
						}
						window.location.href = payUrl;
					} else if (type == 2) {
						
					} else if (type == 3) { //聚米
					  
					}
			    }else{
			    	//转向投保页面
				    var resultUrl = url + productInfo + '.html?trialGenesId=' + trialGenesId + '&preminum=' + preminum+ '&notifyAnswerId='+notifyAnswerId;
				    log("即将跳入投保页面..."+resultUrl);
				    location.href=resultUrl;
			    }    
		 
	 }
	 
	     /**
		   预约页面
		 **/
		 
	 Duck.prototype.nopass = function(notifyAnswerId) {
		        var url = 'http://lf.huize.com/Appointment?planid=';
	    		var planId = Base.prototype.getQueryValue("planid");
	    		var resultUrl = url + planId+"&notifyAnswerId="+notifyAnswerId;
	    		location.href=resultUrl;
		 
	 }

