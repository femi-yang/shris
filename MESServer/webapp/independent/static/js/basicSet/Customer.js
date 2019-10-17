require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($zace, $com) {

    var KEYWORD_Customer_LIST,
        KEYWORD_Customer,
        FORMATTRT_Customer,
        CustomerTemp ,
        TypeSource_Customer,
        
        KEYWORD_LinkManCustomer_LIST,
        KEYWORD_LinkManCustomer,
        FORMATTRT_LinkManCustomer,
        CustomerTemp_LinkManCustomer,
        TypeSource_LinkManCustomer,
         DataCustomerFor,
         DataLinkManFor,
		model,
        DataAll,
        DATABasic,
        DataAll_Link,
        DATABasic_Link,
        mid,
        wid,
        HTML;
    mid =wid=1;

    CustomerTemp = {
    	Active:1,
    	Address:"",
    	AuditTime:$com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
    	Auditor:window.parent.User_Info.Name,
    	CityID:0,
    	CountryID:0,
    	CreateTime:$com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
    	Creator:window.parent.User_Info.Name,
    	CustomerCode:"",
    	CustomerName:"",
    	Grade:0,
        ID: 0,
        ProvinceID:0,
        Status:3,
        TaxCode:"",
        Type:0
    };  
    CustomerTemp_LinkManCustomer={
    	ID:0,
    	CustomerID:0,
    	Name:"",
    	Postition:"",
    	WeiXin:"",
    	MobilePhone:"",
    	EMail:"",
    	Grade:0,
    	Description:"",
    	CreateTime:$com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
    	Creator:window.parent.User_Info.Name,
    	Active:1
    };
    HTML = {
        TableMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
                '<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                 '<td data-title="CustomerName" data-value="{{CustomerName}}" >{{CustomerName}}</td>',
                 '<td data-title="CustomerCode" data-value="{{CustomerCode}}" >{{CustomerCode}}</td>',
                 '<td data-title="TaxCode" data-value="{{TaxCode}}" >{{TaxCode}}</td>',
                 '<td data-title="CountryID" data-value="{{CountryID}}" >{{CountryID}}</td>',
                  '<td data-title="ProvinceID" data-value="{{ProvinceID}}" >{{ProvinceID}}</td>',
                 '<td data-title="CityID" data-value="{{CityID}}" >{{CityID}}</td>',
				'<td data-title="Address" data-value="{{Address}}" >{{Address}}</td>',
				//'<td data-title="Type" data-value="{{Type}}" >{{Type}}</td>',
				 '<td data-title="Grade" data-value="{{Grade}}" >{{Grade}}</td>',
				//'<td data-title="AuditTime" data-value="{{AuditTime}}" >{{AuditTime}}</td>',
				//'<td data-title="Auditor" data-value="{{Auditor}}" >{{Auditor}}</td>',
				'<td data-title="CreateTime" data-value="{{CreateTime}}" >{{CreateTime}}</td>',
                '<td data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',              
                '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
                //'<td data-title="Status" data-value="{{Status}}" >{{Status}}</td>',
 
				'</tr>',
        ].join(""),

        TableMode_LinkManCustomer: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
                '<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                 //'<td data-title="CustomerID" data-value="{{CustomerID}}" >{{CustomerID}}</td>',
                 '<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
                 '<td data-title="Position" data-value="{{Position}}" >{{Position}}</td>',
                 '<td data-title="WeiXin" data-value="{{WeiXin}}" >{{WeiXin}}</td>',
                 '<td data-title="MobilePhone" data-value="{{MobilePhone}}" >{{MobilePhone}}</td>',
                '<td data-title="EMail" data-value="{{EMail}}" >{{EMail}}</td>',
				'<td data-title="Grade" data-value="{{Grade}}" >{{Grade}}</td>',
				'<td data-title="Description" data-value="{{Description}}" >{{Description}}</td>',
				'<td data-title="CreateTime" data-value="{{CreateTime}}" >{{CreateTime}}</td>',
				 '<td data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',             
                '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
 
				'</tr>',
        ].join(""),

    }
    $(function () {
        KEYWORD_Customer_LIST = [
          "CustomerName|客户名称",
          "CustomerCode|客户编码",
           "TaxCode|税号",
         "Type|类型|ArrayOne",
         "AuditTime|审核时间|DateTime",
         "Auditor|审核者",
         "CountryID|国家|ArrayOneControl",
         "ProvinceID|省份|ArrayOneControl|CountryID",
         "CityID|城市|ArrayOneControl|CountryID,ProvinceID",
          "Address|地址",
         "CreateTime|编辑时间|DateTime",
         "Creator|编辑者",
         "Grade|等级|ArrayOne",       
         "Status|状态|ArrayOne",
         "Active|激活|ArrayOne",
        ];
        KEYWORD_Customer = {};
        FORMATTRT_Customer = {};

        TypeSource_Customer = {

            Active: [
            {
                name: "激活",
                value: 1
            },{
            	name: "禁用",
                value: 0
               }
            ],
            Grade:[
            {
            	name: "一星级",
                value: 1
            },{
            	name: "二星级",
                value: 2
            },{
            	name: "三星级",
                value: 3
            }
            ],
           CityID:[],
           CountryID:[],
           ProvinceID:[],
            Status: [
           {
                name: "已保存",
                value: 1
            },
            {
                name: "已提交",
                value: 2
            }, {
                name: "已审核",
                value: 3
            },
            {
                name: "反审核",
                value: 4
            },
            {
                name: "撤销",
                value: 5
            }],
            Type: [
            {
                name: "无",
                value: 0
            }, {
                name: "机械",
                value: 1
            }, {
                name: "计算机",
                value: 2
            } ],
        };

        $.each(KEYWORD_Customer_LIST, function (i, item) {
            var detail = item.split("|");
            KEYWORD_Customer[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_Customer[detail[0]] = $com.util.getFormatter(TypeSource_Customer, detail[0], detail[2]);
            }
        });
    });

    $(function () {
        KEYWORD_LinkManCustomer_LIST = [
         
         "CustomerID|客户|ArrayOne",
         "Name|姓名",
         "Position|职位", 
         "WeiXin|微信", //
         "MobilePhone|电话号码",//
         "EMail|邮箱",
         "Grade|等级|ArrayOne", 
         "Description|描述",
         "CreateTime|编辑时间|DateTime",
         "Creator|编辑者",
         "Active|激活|ArrayOne",
        ];
        KEYWORD_LinkManCustomer = {};
        FORMATTRT_LinkManCustomer = {};

        TypeSource_LinkManCustomer = {

            Active: [
            {
                name: "激活",
                value: 1
            },{
            	name: "禁用",
                value: 0
               }
            ],
            Grade:[
            {
            	name: "一星级",
                value: 1
            },{
            	name: "二星级",
                value: 2
            },{
            	name: "三星级",
                value: 3
            }
            ],
            CustomerID:[
            
            ]
        };

        $.each(KEYWORD_LinkManCustomer_LIST, function (x, item1) {
            var detail = item1.split("|");
            KEYWORD_LinkManCustomer[detail[0]] = {
                index: x,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_LinkManCustomer[detail[0]] = $com.util.getFormatter(TypeSource_LinkManCustomer, detail[0], detail[2]);
            }
        });
    });
    model = $com.Model.create({
        name: '联系人信息',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {
            //顾客信息查询
            $("body").delegate("#zace-search-Customer", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value=="" || value.trim().length < 1)
                    $("#femi-Customer-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-Customer-tbody"),  DataCustomerFor, value, "ID");
            });

            //顾客信息修改
            $("body").delegate("#zace-edit-Customer", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Customer-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                var Default_value = {
                    Address: SelectData[0].Address,
                    CustomerCode: SelectData[0].CustomerCode,
                    CustomerName: SelectData[0].CustomerName,
                    TaxCode: SelectData[0].TaxCode,
                    CityID: SelectData[0].CityID,
                    CountryID: SelectData[0].CountryID,
                    ProvinceID: SelectData[0].ProvinceID,
                };
                $("body").append($com.modal.show(Default_value, KEYWORD_Customer, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].Address = rst.Address;
                    SelectData[0].CustomerCode = rst.CustomerCode;
                    SelectData[0].CustomerName = rst.CustomerName;
                    SelectData[0].TaxCode = rst.TaxCode;
                    SelectData[0].CityID = Number(rst.CityID);
                    SelectData[0].ProvinceID = Number(rst.ProvinceID);
                    SelectData[0].CountryID = Number(rst.CountryID);

//                  DATABasic[6].SupplierID=3;
                    model.com.PostUpdateAdd({
                        data: SelectData[0]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                    })

                }, TypeSource_Customer));


            });          
            //顾客信息新增
            $("body").delegate("#zace-add-Customer", "click", function () {
                var default_value = {
                    //Active: 0,
                    Address: "",
                    CityID:0,
                    CountryID:0,
                    CustomerCode: "",
                    CustomerName:"",
                    Grade: 0,
                    ProvinceID:0,
                    //Status:0,
                    TaxCode:"",
                    //Type:0
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Customer, "新增", function (rst) {
                    //调用插入函数 

                    if (!rst || $.isEmptyObject(rst))
                        return;

                    //CustomerTemp.Active = Number(rst.Active);
                    CustomerTemp.Address = rst.Address;
                    CustomerTemp.CityID = Number(rst.CityID);
                    CustomerTemp.CountryID = Number(rst.CountryID );
                    CustomerTemp.CustomerCode = rst.CustomerCode;
                    CustomerTemp.CustomerName= rst.CustomerName;
                    CustomerTemp.Grade = Number(rst.Grade);
                    CustomerTemp.ProvinceID = Number(rst.ProvinceID);
                    //CustomerTemp.Status = Number(rst.Status);
                    //CustomerTemp.Type = Number(rst.Type);
                    CustomerTemp.TaxCode= rst.TaxCode;
//                  if (DATABasic.length < 1) {
//                      DATABasic.push(CustomerTemp );
//                  } else {
//                      CustomerTemp.ID = model.com.GetMaxID(DATABasic);
//                      var mID = CustomerTemp.ID ;
//                      DATABasic.push(CustomerTemp );
//                  }
                    model.com.PostUpdateAdd({
                        data: CustomerTemp
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })

              

                }, TypeSource_Customer));


            });
            //顾客信息导出
            $("body").delegate("#zace-export-Customer", "click", function () {
                var $table = $(".table-part"),
                     fileName = "顾客信息.xls",
                     Title = "顾客信息";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });

            });
            
            
             //顾客信息条件查询
            $("body").delegate("#zace-search-Customer_", "click", function () {
                var default_value = {                
                    CityID: 0,
                    CountryID:0,
                    ProvinceID:0,
                };
                $("body").append($com.modal.show(default_value,KEYWORD_Customer, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.CityID = Number(rst.CityID);
                    default_value.CountryID = Number(rst.CountryID);
                    default_value.ProvinceID = Number(rst.ProvinceID);
                    $com.table.filterByConndition($("#femi-Customer-tbody"), DataAll, default_value, "ID");

                }, TypeSource_Customer));


            });

             //激活 顾客信息
            $("body").delegate("#zace-ok-Customer", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-Customer-tbody"), "ID", DataAll);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
              
                if (!confirm("已选择" + SelectData.length + "条数据，是否激活？")) {
                    return;
                }

                model.com.postActive({
                    data: SelectData,
                    active:1
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();
                })
            });
            //禁用顾客信息
            $("body").delegate("#zace-remove-Customer", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-Customer-tbody"), "ID", DataAll);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                if (!confirm("已选择" + SelectData.length + "条数据，是否禁用？")) {
                    return;
                }

                model.com.postActive({
                    data: SelectData,
                    active: 0
                }, function (res1) {
                    alert("禁用成功");
                    model.com.refresh();
                })
            });
            
            
                //顾客信息(从顾客信息到顾客联系信息)
            $("body").delegate("#femi-Customer-tbody tr", "dblclick", function () {
                var $this = $(this);
                mid = Number($this.find('td[data-title=ID]').attr('data-value'));
                //mid = DATABasic[wid - 1].ID;
                var WName = $this.find('td[data-title=CustomerName]').attr('data-value');
                if ($this.children('th')[0]) {
                    return true;
                }
                $('.zzza').hide();
                $('.zzzb').show();
                $('.zzzb').width("100%");
                $('#kk').html(WName);
                model.com.refresh();
            });
            
           $("body").delegate("#zace-back-LinkManCustomer","click",function(){
             	$('.zzza').show();
                $('.zzzb').hide();
           })
             //顾客联系信息查询
            $("body").delegate("#zace-search-LinkManCustomer", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value=="" || value.trim().length < 1)
                    $("#femi-LinkManCustomer-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-LinkManCustomer-tbody"), DataLinkManFor, value, "ID");
            });
            
            
            //顾客联系信息新增
            $("body").delegate("#zace-add-LinkManCustomer", "click", function () {
                var default_value = {
//                  CustomerID:0,
                    Name: "",
                    Position:"",
                    WeiXin:"",
                    MobilePhone: "",
                    EMail:"",
                    Grade: 0,                   
                    Description:""
                };
                $("body").append($com.modal.show(default_value, KEYWORD_LinkManCustomer, "新增", function (rst) {
                    //调用插入函数 

                    if (!rst || $.isEmptyObject(rst))
                        return;

                    CustomerTemp_LinkManCustomer.CustomerID = mid
                    CustomerTemp_LinkManCustomer.Name = rst.Name;
                    CustomerTemp_LinkManCustomer.Position = rst.Position;
                    CustomerTemp_LinkManCustomer.WeiXin = rst.WeiXin;
                    CustomerTemp_LinkManCustomer.MobilePhone = rst.MobilePhone;
                    CustomerTemp_LinkManCustomer.EMail= rst.EMail;
                    CustomerTemp_LinkManCustomer.Description= rst.Description;
                    CustomerTemp_LinkManCustomer.Grade = Number(rst.Grade);
                   // CustomerTemp_LinkManCustomer.Active = Number(rst.Active);
                   
//                  if (DATABasic.length < 1) {
//                      DATABasic.push(CustomerTemp );
//                  } else {
//                      CustomerTemp.ID = model.com.GetMaxID(DATABasic);
//                      var mID = CustomerTemp.ID ;
//                      DATABasic.push(CustomerTemp );
//                  }
                    model.com.PostUpdateAdd_LinkMan({
                        data: CustomerTemp_LinkManCustomer
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })

              

                }, TypeSource_LinkManCustomer));


            });
            
            
             //顾客联系信息修改
            $("body").delegate("#zace-edit-LinkManCustomer", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-LinkManCustomer-tbody"), "ID", DataAll_Link);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                var Default_value = {
                    Name: SelectData[0].Name,
                    Position: SelectData[0].Position,
                    WeiXin: SelectData[0].WeiXin,
                    MobilePhone: SelectData[0].MobilePhone,
                    EMail: SelectData[0].EMail,
                    Description: SelectData[0].Description,
                };
                $("body").append($com.modal.show(Default_value, KEYWORD_LinkManCustomer, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].Name = rst.Name;
                    SelectData[0].Position = rst.Position;
                    SelectData[0].WeiXin = rst.WeiXin;
                    SelectData[0].MobilePhone = rst.MobilePhone;
                    SelectData[0].EMail = rst.EMail;
                    SelectData[0].Description = rst.Description;

                    //var mID = SelectData[0].WID;
                    //DATABasic_Link[mID - 1].Name   = SelectData[0].Name ;
                    //DATABasic_Link[mID - 1].CreateTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                    //DATABasic_Link[mID - 1].Creator = window.parent.User_Info.Name;

                    //DATABasic_Link[mID - 1].Position = SelectData[0].Position;
                    //DATABasic_Link[mID - 1].WeiXin = SelectData[0].WeiXin;
                    //DATABasic_Link[mID - 1].MobilePhone = SelectData[0].MobilePhone;
                    //DATABasic_Link[mID - 1].EMail = SelectData[0].EMail;
                    //DATABasic_Link[mID - 1].Description = SelectData[0].Description;
//                  DATABasic[6].SupplierID=3;
                    model.com.PostUpdateAdd_LinkMan({
                        data: SelectData[0]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                    })

                }, TypeSource_LinkManCustomer));


            }); 
            
             //激活 顾客联系信息
            $("body").delegate("#zace-ok-LinkManCustomer", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-LinkManCustomer-tbody"), "ID", DataAll_Link);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                //var list = [];
                //for (var i = 0; i < SelectData.length; i++) {
                //    var Wid = SelectData[i].WID;

                //    list.push(DATABasic_Link[Wid - 1]);
                //}

                if (!confirm("已选择" + SelectData.length + "条数据，是否激活？")) {
                    return;
                }

                model.com.postActive_LinkMan({
                    data: SelectData,
                    active:1
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();
                })
            });
            
             //禁用顾客联系信息
            $("body").delegate("#zace-remove-LinkManCustomer", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-LinkManCustomer-tbody"), "ID", DataAll_Link);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                //var _list = [];
                //for (var i = 0; i < SelectData.length; i++) {
                //    var Wid = SelectData[i].WID;

                //    _list.push(DATABasic_Link[Wid - 1]);
                //}   
                if (!confirm("已选择" + SelectData.length + "条数据，是否禁用？")) {
                    return;
                }

                model.com.postActive_LinkMan({
                    data: SelectData,
                    active: 0
                }, function (res1) {
                    alert("禁用成功");
                    model.com.refresh();
                })
            });
          
          //顾客联系信息导出
            $("body").delegate("#zace-export-LinkManCustomer", "click", function () {
                var $table = $(".table-partQ"),
                     fileName = "顾客联系信息.xls",
                     Title = "顾客联系信息";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });

            });
            
               //顾客联系信息条件查询
            $("body").delegate("#zace-search-LinkManCustomer_", "click", function () {
                var default_value = {                
                    CustomerID: 0,
                };
                $("body").append($com.modal.show(default_value,KEYWORD_LinkManCustomer, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.CustomerID = Number(rst.CustomerID);
                    $com.table.filterByConndition($("#femi-LinkManCustomer-tbody"),DataAll_Link, default_value, "ID");

                }, TypeSource_LinkManCustomer));


            });
            
        },




        run: function () {   
        	$(".zzzb").hide();
                     //得到所有的供应商
          model.com.getCustomer({}, function (res1) {
                    $.each(res1.list, function (i, item) {
                        TypeSource_LinkManCustomer.CustomerID.push({
                            name: item.CustomerName,
                            //value: item.ID,
                            value: item.ID,
                            far: null
                        })
                    }); 
                    model.com.getArea({}, function (resA) {
                        if (!resA)
                            return;
                        if (resA && resA.list) {
                            $.each(resA.list, function (i, item) {
                                TypeSource_Customer.CountryID.push({
                                    name: item.Name,
                                    value: item.ID,
                                });
                                $.each(item.RegionList, function (l_i, l_item) {
                                    TypeSource_Customer.ProvinceID.push({
                                        name: l_item.Name,
                                        value: l_item.ID,
                                        far: item.ID
                                    });

                                    $.each(l_item.RegionList, function (c_i, c_item) {
                                        TypeSource_Customer.CityID.push({
                                            name: c_item.Name,
                                            value: c_item.ID,
                                            far: item.ID + "_" + l_item.ID
                                        });
                                    });
                                });

                            });

                                model.com.refresh();
                        }



                    });
                });
          
        },

        com: {
            refresh: function () {

                model.com.getCustomer({}, function (resS) {
                    if (!resS)
                        return;
                    if (resS && resS.list) {
                        DataAll = $com.util.Clone(resS.list);   //界面数据
                        DATABasic = $com.util.Clone(resS.list); //数据库数据                    
                        //for (var i = 0; i < DataAll.length; i++) {
                        //    DataAll[i].WID = i + 1;
                        //}
                         var Data = $com.util.Clone(DataAll);
                        $.each(Data, function (i, item) {
                              for (var p in item) {
                                  if (!FORMATTRT_Customer[p])
                                      continue;
                                  item[p] = FORMATTRT_Customer[p](item[p]);
                              }
                          });
                        DataCustomerFor = $com.util.Clone(Data);
                        $("#femi-Customer-tbody").html($com.util.template(Data, HTML.TableMode));

                    }

                });
                model.com.getLinkManCustomer({active:2,customer_id:mid},function(resL){
                	if(!resL)
                	return;
                	if(resL && resL.list){
                		DataAll_Link = $com.util.Clone(resL.list);
                		DATABasic_Link = $com.util.Clone(resL.list);
                		//for (var i = 0; i < DataAll_Link.length; i++) {
                        //    DataAll_Link[i].WID = i + 1;
                        //}
                	}
                	var Data_Link = $com.util.Clone(DataAll_Link);
                	$.each(Data_Link , function (i, item) {
                              for (var p in item) {
                                  if (!FORMATTRT_LinkManCustomer[p])
                                      continue;
                                  item[p] = FORMATTRT_LinkManCustomer[p](item[p]);
                              }
                          });
                	DataLinkManFor = $com.util.Clone(Data_Link);
                        $("#femi-LinkManCustomer-tbody").html($com.util.template(Data_Link,HTML.TableMode_LinkManCustomer));
                	
                });
            },

            //查询区域
            getArea: function (data, fn, context) {
                var d = {
                    $URI: "/Area/Tree",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询顾客信息
            getCustomer: function (data, fn, context) {
                var d = {
                    $URI: "/Customer/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //激活顾客信息
            postActive: function (data, fn, context) {
                var d = {
                    $URI: "/Customer/Active",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //更新添加顾客信息
            PostUpdateAdd: function (data, fn, context) {
                var d = {
                    $URI: "/Customer/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //导出
            postExportExcel: function (data, fn, context) {
                var d = {
                    $URI: "/Upload/ExportExcel",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            
      
            //删除得到新的数据
            getNewList: function (_source, set_data) {
                if (!_source)
                    _source = [];
                if (!set_data)
                    set_data = [];
                var rst = [];
                for (var i = 0; i < _source.length; i++) {
                    var NotOWn = false;
                    for (var j = 0; j < set_data.length; j++) {
                        if (_source[i].RiskID == set_data[j].RiskID) {
                            _source.splice(i, 1);
                            set_data.splice(j, 1);
                            NotOWn = true;
                        }
                        if (set_data.length < 1) {
                            break;
                        }
                        if (NotOWn) {
                            model.com.getNewList(_source, set_data);
                        }
                    }

                }
                rst = _source;
                return rst;
            },
            //得到ID
            GetMaxID: function (_source) {
                var id = 0;
                if (!_source)
                    _source = [];
                $.each(_source, function (i, item) {
                    if (item.ID > id)
                        id = item.ID;
                });
                return id + 1;

            },
            
              //查询顾客联系人列表
            getLinkManCustomer: function (data, fn, context) {
                var d = {
                    $URI: "/LinkManCustomer/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            
            //激活顾客联系人
            postActive_LinkMan: function (data, fn, context) {
                var d = {
                    $URI: "/LinkManCustomer/Active",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //更新添加顾客联系人
            PostUpdateAdd_LinkMan: function (data, fn, context) {
                var d = {
                    $URI: "/LinkManCustomer/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
        }
    }),

    model.init();


});