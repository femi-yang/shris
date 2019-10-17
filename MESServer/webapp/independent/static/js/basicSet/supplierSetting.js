require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($zace, $com) {

    var KEYWORD_Level_LIST,
        KEYWORD_Level,
        FORMATTRT_Level,
        DEFAULT_VALUE_Level,
        TypeSource_Level,
		model,
        DataAllSupplier,
        DATASupplierBasic,
        DataAllConfirm,
        DataAllConfirmChange,
        DataAllConfirmBasic,
        HTML,
        mid,

        KEYWORD_LinkManSupplier_LIST,
        KEYWORD_LinkManSupplier,
        FORMATTRT_LinkManSupplier,
        LinkManSupplierTemp ,
        TypeSource_LinkManSupplier,
        DataAll,
        DATABasic;

    mid =wid=1;
    DataAllConfirmChange = [];
    LinkManSupplierTemp = {
        ID: 0,
        SupplierID: 0,
        Name: "",
        Position: "",
        WeiXin: "",
        MobilePhone: "",
        EMail: "",
        Grade: 0,
        Description: "",
        Creator: window.parent.User_Info.Name,
        CreateTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Active:true,
    };

    SupplierTemp = {
        ID: 0,
        SupplierName: "",
        SupplierCode: "",
        TaxCode: "",
        CountryID: 0,
        ProvinceID: 0,
        CityID: 0,
        Address: "",
        Type: 0,
        Grade: 0,
        Creator: window.parent.User_Info.Name,
        Auditor:window.parent.User_Info.Name,
        CreateTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        AuditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Active:true,
        Status:1,
        BankName:"",
        BankAccount:""
    };  
    
    HTML = {
        TableSupplierMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
                '<td data-title="WID" data-value="{{WID}}" >{{WID}}</td>',
				'<td data-title="SupplierName" data-value="{{SupplierName}}" >{{SupplierName}}</td>',
				'<td data-title="SupplierCode" data-value="{{SupplierCode}}" >{{SupplierCode}}</td>',
				'<td data-title="TaxCode" data-value="{{TaxCode}}" >{{TaxCode}}</td>',
				'<td data-title="CountryID" data-value="{{CountryID}}" >{{CountryID}}</td>',
                '<td data-title="ProvinceID" data-value="{{ProvinceID}}" >{{ProvinceID}}</td>',
				'<td data-title="CityID" data-value="{{CityID}}" >{{CityID}}</td>',
				'<td data-title="Address" data-value="{{Address}}" >{{Address}}</td>',
               // '<td data-title="Type" data-value="{{Type}}" >{{Type}}</td>',
                '<td data-title="Grade" data-value="{{Grade}}" >{{Grade}}</td>',                              
                '<td data-title="BankName" data-value="{{BankName}}" >{{BankName}}</td>',
                '<td data-title="BankAccount" data-value="{{BankAccount}}" >{{BankAccount}}</td>',
                '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
                //'<td data-title="Status" data-value="{{Status}}" >{{Status}}</td>',
                '<td data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',
                '<td data-title="CreateTime" data-value="{{CreateTime}}" >{{CreateTime}}</td>',
                //'<td data-title="Auditor" data-value="{{Auditor}}" >{{Auditor}}</td>',
                //'<td data-title="AuditTime" data-value="{{AuditTime}}" >{{AuditTime}}</td>',
				'</tr>',
        ].join(""),
        TableMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
                '<td data-title="WID" data-value="{{WID}}" >{{WID}}</td>',
				'<td data-title="SupplierID" data-value="{{SupplierID}}" >{{SupplierID}}</td>',
				'<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
				'<td data-title="Position" data-value="{{Position}}" >{{Position}}</td>',
				'<td data-title="WeiXin" data-value="{{WeiXin}}" >{{WeiXin}}</td>',
                '<td data-title="MobilePhone" data-value="{{MobilePhone}}" >{{MobilePhone}}</td>',
				'<td data-title="EMail" data-value="{{EMail}}" >{{EMail}}</td>',
				'<td data-title="Grade" data-value="{{Grade}}" >{{Grade}}</td>',
                '<td data-title="Description" data-value="{{Description}}" >{{Description}}</td>',
                '<td data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',
                '<td data-title="CreateTime" data-value="{{CreateTime}}" >{{CreateTime}}</td>',
                '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
				'</tr>',
        ].join(""),


    }
    //供应商
    $(function () {
        KEYWORD_Level_LIST = [       
         "SupplierName|供应商名称",
         "SupplierCode|供应商编码",
         "TaxCode|税号",
         "CountryID|国家|ArrayOneControl",
         "ProvinceID|省份|ArrayOneControl|CountryID",
         "CityID|城市|ArrayOneControl|CountryID,ProvinceID",
         "Address|地址",
         //"Type|行业",
         "Grade|等级|ArrayOne",
         "Status|状态|ArrayOne",
         "Active|激活|ArrayOne",
         "BankName|开户银行",
         "BankAccount|账号",
        ];
        KEYWORD_Level = {};
        FORMATTRT_Level = {};

        DEFAULT_VALUE_Level = {
            SupplierName: "",
            SupplierCode: "",
            TaxCode: "",
            CountryID: 0,
            ProvinceID: 0,
            CityID: 0,
            Address: "",
            //Type: 0,
            Grade: 0,           
            Active: true,
            //Status: 1,
            BankName: "",
            BankAccount: ""
        };

        TypeSource_Level = {
            CountryID: [
              {
                  name: "无",
                  value: -1,
                  far:-1
              }    
            ],
            ProvinceID: [
             {
                 name: "无",
                 value: -1,
                 far:-1
             }
            ],
            CityID: [
             {
                 name: "无",
                 value: -1,
                 far:-1
             }
            ],
            //Type: [
            //{
            //    name: "无",
            //    value: 0
            //}, {
            //    name: "机械",
            //    value: 1
            //}, {
            //    name: "计算机",
            //    value: 2
            //}
            //],
            Grade: [
            {
                name: "无",
                value: 0
            }, {
                name: "重要",
                value: 1
            }, {
                name: "普通",
                value: 2
            }
            ],
            Active: [
            {
                name: "禁用",
                value: false
            }, {
                name: "激活",
                value: true
            }
            ],
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
            },

            ],
        
        };

        $.each(KEYWORD_Level_LIST, function (i, item) {
            var detail = item.split("|");
            KEYWORD_Level[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_Level[detail[0]] = $com.util.getFormatter(TypeSource_Level, detail[0], detail[2]);
            }
        });
    });
    //联系人
    $(function () {
        KEYWORD_LinkManSupplier_LIST = [
         "SupplierID|供应商|ArrayOne",
         "Name|姓名",
         "Position|职位",
         "WeiXin|微信",
         "MobilePhone|电话号码",
         "EMail|邮件",
         "Grade|等级|ArrayOne",
         "Description|描述",
         "Active|激活|ArrayOne",
         "Creator|开发者",
         "CreateTime|开发时间|Date",
        ];
        KEYWORD_LinkManSupplier = {};
        FORMATTRT_LinkManSupplier = {};

        //      LinkManSupplierTemp  = {
        //      ID: 0,
        //      SupplierID:0,
        //      
        //      Creator:window.parent.User_Info.Name,
        //      CreateTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        //      Active:0,
        //      };

        TypeSource_LinkManSupplier = {

            Active: [
            {
                name: "激活",
                value: 1
            }, {
                name: "禁用",
                value: 0
            }
            ],
            SupplierID: [
            {
                name: "全部",
                value: 0
            }
            ],
            Grade: [
            {
                name: "一星级",
                value: 1
            }, {
                name: "二星级",
                value: 2
            }, {
                name: "三星级",
                value: 3
            }

            ]

        };

        $.each(KEYWORD_LinkManSupplier_LIST, function (i, item) {
            var detail = item.split("|");
            KEYWORD_LinkManSupplier[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_LinkManSupplier[detail[0]] = $com.util.getFormatter(TypeSource_LinkManSupplier, detail[0], detail[2]);
            }
        });
    });

    model = $com.Model.create({
        name: '供应商',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {
            $("body").delegate("#femi-supplier-tbody tr", "dblclick", function () {
                $(".zzzc").show();
                $(".zzzb").hide();
                $(".zzza").hide();
                var $this = $(this);

                wid = Number($this.find('td[data-title=WID]').attr('data-value'));
                mid = DATASupplierBasic[wid - 1].ID;

                model.com.refresh();
            });

            //模糊查询
            $("body").delegate("#zace-search-supplierMode", "change", function () {
                var $this = $(this),
					value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-supplier-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-supplier-tbody"), DataAllSupplier, value, "WID");
            });
            //供应商信息修改
            $("body").delegate("#zace-edit-supplier", "click", function () {              
                var SelectData = $com.table.getSelectionData($("#femi-supplier-tbody"), "WID", DataAllSupplier);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                //if (SelectData[0].Status == 2) {
                //    alert("数据选择有误,请重新选择!");
                //    return;

                //}
                //else if (SelectData[0].Status == 3 || SelectData[0].Status == 4) {
                //    alert("有数据已被审核,请重新选择!");
                //    return;
                //}             
                var default_value = {
                    SupplierName: SelectData[0].SupplierName,
                    SupplierCode: SelectData[0].SupplierCode,
                    TaxCode: SelectData[0].TaxCode,
                    Address: SelectData[0].Address,
                    //Type: SelectData[0].Type,
                    Grade: SelectData[0].Grade,
                    BankName: SelectData[0].BankName,
                    BankAccount: SelectData[0].BankAccount,
                    CountryID: SelectData[0].CountryID,
                    ProvinceID: SelectData[0].ProvinceID,
                    CityID: SelectData[0].CityID,
                    //Status:SelectData[0].Status,
                   
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].SupplierName = rst.SupplierName;
                    SelectData[0].SupplierCode = rst.SupplierCode;
                    SelectData[0].TaxCode = rst.TaxCode;
                    //SelectData[0].Type = rst.Type;
                    SelectData[0].Address = rst.Address;
                    SelectData[0].Grade = Number(rst.Grade);
                    SelectData[0].BankName = rst.BankName;
                    SelectData[0].BankAccount = rst.BankAccount;
                    SelectData[0].CountryID = Number(rst.CountryID);
                    SelectData[0].ProvinceID = Number(rst.ProvinceID);
                    SelectData[0].CityID = Number(rst.CityID);
                    //SelectData[0].Status = Number(rst.Status);
               
                    var mID = SelectData[0].WID;
                    DATASupplierBasic[mID - 1].SupplierName = SelectData[0].SupplierName;
                    DATASupplierBasic[mID - 1].SupplierCode = SelectData[0].SupplierCode;
                    DATASupplierBasic[mID - 1].TaxCode = SelectData[0].TaxCode;
                    //DATASupplierBasic[mID - 1].Type = SelectData[0].Type;
                    DATASupplierBasic[mID - 1].Address = SelectData[0].Address;
                    DATASupplierBasic[mID - 1].Grade = SelectData[0].Grade;
                    DATASupplierBasic[mID - 1].BankName = SelectData[0].BankName;
                    DATASupplierBasic[mID - 1].BankAccount = SelectData[0].BankAccount;
                    DATASupplierBasic[mID - 1].CountryID = SelectData[0].CountryID;
                    DATASupplierBasic[mID - 1].ProvinceID = SelectData[0].ProvinceID;
                    DATASupplierBasic[mID - 1].CityID = SelectData[0].CityID;
                    //DATASupplierBasic[mID - 1].Status = SelectData[0].Status;
                    DATASupplierBasic[mID - 1].Creator = window.parent.User_Info.Name;
                    DATASupplierBasic[mID - 1].Auditor = window.parent.User_Info.Name;
                    DATASupplierBasic[mID - 1].CreateTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                    DATASupplierBasic[mID - 1].AuditTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                                    
                    model.com.postSupplier({
                        data: DATASupplierBasic[mID - 1],
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                    })

                }, TypeSource_Level));


            });          
            //供应商新增
            $("body").delegate("#zace-add-supplier", "click", function () {
               
                $("body").append($com.modal.show(DEFAULT_VALUE_Level, KEYWORD_Level, "新增", function (rst) {
                    //调用插入函数 

                    if (!rst || $.isEmptyObject(rst))
                        return;                 
                    SupplierTemp.SupplierName = rst.SupplierName;
                    SupplierTemp.SupplierCode = rst.SupplierCode;
                    SupplierTemp.TaxCode = rst.TaxCode;
                    SupplierTemp.CountryID = Number(rst.CountryID);
                    SupplierTemp.ProvinceID = Number(rst.ProvinceID);
                    SupplierTemp.CityID = Number(rst.CityID);
                    SupplierTemp.Address = rst.Address;
                    //SupplierTemp.Type = rst.Type;
                    SupplierTemp.Grade = Number(rst.Grade);
                    SupplierTemp.Active = rst.Active;
                    //SupplierTemp.Status = Number(rst.Status);
                    SupplierTemp.BankName = rst.BankName;
                    SupplierTemp.BankAccount = rst.BankAccount;
                    SupplierTemp.ID = 0;
                    //if (DATABasic.length < 1) {
                    //    SupplierTemp.ID=1;
                    //} else {
                    //    SupplierTemp.ID = model.com.GetMaxID(DATABasic);                      
                    //}
                    model.com.postSupplier({
                        data: SupplierTemp,
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })
              
                }, TypeSource_Level));


            });
            //激活
            $("body").delegate("#zace-active-supplier", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-supplier-tbody"), "WID", DataAllSupplier);

                if (!SelectData || !SelectData.length) {
                    alert("至少选择一行数据！")
                    return;
                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其激活？")) {
                    return;
                }

                model.com.ActiveSupplier({
                    data: SelectData,
                    active: 1
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();
                })
            });
            //禁用
            $("body").delegate("#zace-disable-supplier", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-supplier-tbody"), "WID", DataAllSupplier);

                if (!SelectData || !SelectData.length) {
                    alert("至少选择一行数据！")
                    return;
                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其禁用？")) {
                    return;
                }

                model.com.ActiveSupplier({
                    data: SelectData,
                    active: 0
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();
                })
            });

            //条件查询
            $("body").delegate("#zace-search-supplier", "click", function () {
                var default_value = {
                    CountryID: 0,
                    ProvinceID: 0,
                    CityID: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.CountryID = Number(rst.CountryID);
                    default_value.ProvinceID = Number(rst.ProvinceID);
                    default_value.CityID = Number(rst.CityID);
                    $com.table.filterByConndition($("#femi-supplier-tbody"), DataAllSupplier, default_value, "WID");

                }, TypeSource_Level));


            });

            //提交  
            $("body").delegate("#zace-up-supplier", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-supplier-tbody"), "WID", DataAllSupplier);

            if (!SelectData || !SelectData.length) {
                alert("至少选择一行数据！")
                return;
            }
            for (var i = 0; i < SelectData.length; i++) {
                if (SelectData[i].Status==2) {
                    alert("有数据已被提交,请重新选择!!");
                    return;

                }
                else if (SelectData[i].Status == 3 || SelectData[i].Status == 4) {
                    alert("有数据已被审核,请重新选择!!");
                    return;
                }

            }
            if (!confirm("已选择" + SelectData.length + "条数据，确定将其提交？")) {
                return;
            }

            for (var i = 0; i < SelectData.length; i++) {

                var wid = SelectData[i].WID;
                DATASupplierBasic[wid - 1].Status = 2;
                model.com.postSupplier({
                    data: DATASupplierBasic[wid - 1],
                }, function (res) {
                    model.com.refresh();
                })
            }
           
           
            });

            //撤销
            $("body").delegate("#zace-upReturn-supplier", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-supplier-tbody"), "WID", DataAllSupplier);

                if (!SelectData || !SelectData.length) {
                    alert("至少选择一行数据！")
                    return;
                }
                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 1) {
                        alert("数据选择有误,请重新选择!");
                        return;

                    }
                    else if (SelectData[i].Status == 3 || SelectData[i].Status == 4) {
                        alert("有数据已被审核,请重新选择!");
                        return;
                    }

                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其撤回？")) {
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {

                    var wid = SelectData[i].WID;
                    DATASupplierBasic[wid - 1].Status = 1,
                    model.com.postSupplier({
                        data: DATASupplierBasic[wid - 1],
                    }, function (res) {
                        model.com.refresh();
                    })
                }
               

            });

            //我的审核  zace-confirm-supplier
            $("body").delegate("#zace-confirm-supplier", "click", function () {
                $(".zzzb").show();
                $(".zzza").hide();
                $(".zzzc").hide();
            });
            //返回
            $("body").delegate("#zace-confirmReturn-supplier", "click", function () {
                $(".zzzb").hide();
                $(".zzza").show();
                $(".zzzc").hide();
            });
            //zace-return-LinkManSupplier 返回
            $("body").delegate("#zace-return-LinkManSupplier", "click", function () {
                $(".zzzb").hide();
                $(".zzza").show();
                $(".zzzc").hide();
            });
            //审核
            $("body").delegate("#zace-confirmQ-supplier", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-supplierConfirm-tbody"), "WID", DataAllConfirmChange);

                if (!SelectData || !SelectData.length) {
                    alert("至少选择一行数据！")
                    return;
                }
                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 1) {
                        alert("数据选择有误，请重新选择!!");
                        return;

                    }
                    else if (SelectData[i].Status == 3 || SelectData[i].Status == 4) {
                        alert("有数据已被审核,请重新选择!!");
                        return;
                    }

                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定审核？")) {
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {

                    var wid = SelectData[i].WID;
                    DataAllConfirmBasic[wid - 1].Status = 3;
                    DataAllConfirmBasic[wid - 1].Auditor = window.parent.User_Info.Name;
                    DataAllConfirmBasic[wid - 1].AuditTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                    model.com.postSupplier({
                        data: DataAllConfirmBasic[wid - 1],
                    }, function (res) {
                        model.com.refresh();
                    })
                }

            });
            //反审核
            $("body").delegate("#zace-confirmQR-supplier", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-supplierConfirm-tbody"), "WID", DataAllConfirmChange);

                if (!SelectData || !SelectData.length) {
                    alert("至少选择一行数据！")
                    return;
                }
                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 1 || SelectData[i].Status == 2) {
                        alert("数据选择有误，请重新选择!!");
                        return;
                    }
                    

                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定反审核？")) {
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {

                    var wid = SelectData[i].WID;
                    DataAllConfirmBasic[wid - 1].Status = 1;
                    DataAllConfirmBasic[wid - 1].Auditor = window.parent.User_Info.Name;
                    DataAllConfirmBasic[wid - 1].AuditTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                    model.com.postSupplier({
                        data: DataAllConfirmBasic[wid - 1],
                    }, function (res) {
                        model.com.refresh();
                    })
                }
            });

            //审核界面模糊查询
            $("body").delegate("#zace-search-supplierRMode", "change", function () {
                var $this = $(this),
					value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-supplierConfirm-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-supplierConfirm-tbody"), DataAllConfirmChange, value, "WID");
            });
            //审核界面条件查询
            $("body").delegate("#zace-search-supplierR", "click", function () {
                var default_value = {
                    CountryID: 0,
                    ProvinceID: 0,
                    CityID: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.CountryID = Number(rst.CountryID);
                    default_value.ProvinceID = Number(rst.ProvinceID);
                    default_value.CityID = Number(rst.CityID);
                    $com.table.filterByConndition($("#femi-supplierConfirm-tbody"), DataAllConfirmChange, default_value, "WID");

                }, TypeSource_Level));


            });



            //联系人信息查询
            $("body").delegate("#zace-search-LinkManSupplier", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-LinkManSupplier-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-LinkManSupplier-tbody"), DataAll, value, "WID");
            });

            //联系人信息修改
            $("body").delegate("#zace-edit-LinkManSupplier", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-LinkManSupplier-tbody"), "WID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                var Default_value = {
                    //                  SupplierID: SelectData[0].SupplierID,
                    Name: SelectData[0].Name,
                    Position: SelectData[0].Position,
                    WeiXin: SelectData[0].WeiXin,
                    MobilePhone: SelectData[0].MobilePhone,
                    EMail: SelectData[0].EMail,
                    Grade: SelectData[0].Grade,
                    Description: SelectData[0].Description,
                    Active: SelectData[0].Active,
                };
                $("body").append($com.modal.show(Default_value, KEYWORD_LinkManSupplier, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    //                  SelectData[0].SupplierID = Number(rst.SupplierID);
                    SelectData[0].Name = rst.Name;
                    SelectData[0].Position = rst.Position;
                    SelectData[0].WeiXin = rst.WeiXin;
                    SelectData[0].MobilePhone = rst.MobilePhone;
                    SelectData[0].EMail = rst.EMail;
                    SelectData[0].Grade = Number(rst.Grade);
                    SelectData[0].Active = rst.Active;
                    SelectData[0].Description = rst.Description;


                    var mID = SelectData[0].WID;
                    //                  DATABasic[mID - 1].SupplierID  = SelectData[0].SupplierID ;
                    DATABasic[mID - 1].CreateTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                    DATABasic[mID - 1].Creator = window.parent.User_Info.Name;

                    DATABasic[mID - 1].Name = SelectData[0].Name;
                    DATABasic[mID - 1].Position = SelectData[0].Position;
                    DATABasic[mID - 1].WeiXin = SelectData[0].WeiXin;
                    DATABasic[mID - 1].MobilePhone = SelectData[0].MobilePhone;
                    DATABasic[mID - 1].EMail = SelectData[0].EMail;
                    DATABasic[mID - 1].Grade = SelectData[0].Grade;
                    DATABasic[mID - 1].Active = SelectData[0].Active;
                    DATABasic[mID - 1].Description = SelectData[0].Description;
                    //                  DATABasic[6].SupplierID=3;
                    model.com.PostUpdateAdd({
                        data: DATABasic[mID - 1],
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                    })

                }, TypeSource_LinkManSupplier));


            });
            //联系人信息新增
            $("body").delegate("#zace-add-LinkManSupplier", "click", function () {
                var default_value = {                 
                    Name: "",
                    Position: "",
                    WeiXin: "",
                    MobilePhone: "",
                    EMail: "",
                    Grade: 0,
                    Description: "",
                    Active: 1
                };
                $("body").append($com.modal.show(default_value, KEYWORD_LinkManSupplier, "新增", function (rst) {
                    //调用插入函数 

                    if (!rst || $.isEmptyObject(rst))
                        return;

                    LinkManSupplierTemp.SupplierID = DATASupplierBasic[wid - 1].ID;
                    LinkManSupplierTemp.Name = rst.Name;
                    LinkManSupplierTemp.Position = rst.Position;
                    LinkManSupplierTemp.WeiXin = rst.WeiXin;
                    LinkManSupplierTemp.MobilePhone = rst.MobilePhone;
                    LinkManSupplierTemp.EMail = rst.EMail;
                    LinkManSupplierTemp.Grade = rst.Grade;
                    LinkManSupplierTemp.Description = rst.Description;
                    LinkManSupplierTemp.Active = Number(rst.Active);
                    //                  if (DATABasic.length < 1) {
                    //                      DATABasic.push(LinkManSupplierTemp );
                    //                  } else {
                    //                      LinkManSupplierTemp.ID = model.com.GetMaxID(DATABasic);
                    //                      var mID = LinkManSupplierTemp.ID ;
                    //                      DATABasic.push(LinkManSupplierTemp );
                    //                  }
                    model.com.PostUpdateAdd({
                        data: LinkManSupplierTemp
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })



                }, TypeSource_LinkManSupplier));


            });
            //联系人信息导出
            $("body").delegate("#zace-export-LinkManSupplier", "click", function () {
                var $table = $(".table-part"),
                     fileName = "联系人信息.xls",
                     Title = "联系人信息";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });

            });
            //联系人信息条件查询
            $("body").delegate("#zace-search-LinkManSupplier_", "click", function () {
                var default_value = {
                    SupplierID: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_LinkManSupplier, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.SupplierID = Number(rst.SupplierID);
                    $com.table.filterByConndition($("#femi-LinkManSupplier-tbody"), DataAll, default_value, "WID");

                }, TypeSource_LinkManSupplier));


            });

            //激活 联系人信息
            $("body").delegate("#zace-ok-LinkManSupplier", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-LinkManSupplier-tbody"), "WID", DataAll);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                var list = [];
                for (var i = 0; i < SelectData.length; i++) {
                    var Wid = SelectData[i].WID;

                    list.push(DATABasic[Wid - 1]);
                }

                model.com.postActive({
                    data: list,
                    active: 1
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();
                })
            });
            //禁用联系人信息
            $("body").delegate("#zace-remove-LinkManSupplier", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-LinkManSupplier-tbody"), "WID", DataAll);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                var _list = [];
                for (var i = 0; i < SelectData.length; i++) {
                    var Wid = SelectData[i].WID;

                    _list.push(DATABasic[Wid - 1]);
                }
                model.com.postActive({
                    data: _list,
                    active: 0
                }, function (res1) {
                    alert("禁用成功");
                    model.com.refresh();
                })
            });
        },




        run: function () {
            $(".zzzb").hide();
            $(".zzza").show();
            $(".zzzc").hide();
            //得到所有的产品编号
            model.com.getSupplier({ supplier_name: "", country_id: 0, province_id: 0, city_id: 0, active: 2 }, function (res1) {
                $.each(res1.list, function (i, item) {
                    TypeSource_LinkManSupplier.SupplierID.push({
                        name: item.SupplierName,
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
                            TypeSource_Level.CountryID.push({
                                name: item.Name,
                                value: item.ID,
                            });
                            $.each(item.RegionList, function (l_i, l_item) {
                                TypeSource_Level.ProvinceID.push({
                                    name: l_item.Name,
                                    value: l_item.ID,
                                    far: item.ID
                                });

                                $.each(l_item.RegionList, function (c_i, c_item) {
                                    TypeSource_Level.CityID.push({
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
                //供应商
                model.com.getSupplier({supplier_name:"",country_id:0, province_id:0, city_id:0,active:2}, function (resS) {
                    if (!resS)
                        return;
                    if (resS && resS.list) {
                        //数据库数据
                        DATASupplierBasic = $com.util.Clone(resS.list);
                        //审核数据
                        DataAllConfirm = $com.util.Clone(resS.list);
                        //界面数据
                        DataAllSupplier = $com.util.Clone(resS.list);
                        for (var i = 0; i < DataAllSupplier.length; i++) {
                            DataAllSupplier[i].WID = i + 1;
                        }
                        

                        var _list = $com.util.Clone(DataAllSupplier);
                        $.each(_list, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Level[p])
                                    continue;
                                item[p] = FORMATTRT_Level[p](item[p]);
                            }
                        });

                        $("#femi-supplier-tbody").html($com.util.template(_list, HTML.TableSupplierMode));

                        //===========审核
                        DataAllConfirmChange = [];
                        for (var i = 0; i < DataAllConfirm.length; i++) {
                            if (DataAllConfirm[i].Status == 2 || (DataAllConfirm[i].Status == 3 && DataAllConfirm[i].Auditor==window.parent.User_Info.Name)) {
                                DataAllConfirmChange.push(DataAllConfirm[i]);
                            }
                        }
                        DataAllConfirmBasic = $com.util.Clone(DataAllConfirmChange);
                        for (var j = 0; j < DataAllConfirmChange.length; j++) {
                            DataAllConfirmChange[j].WID = j + 1;
                        }
                        var _listC = $com.util.Clone(DataAllConfirmChange);
                        $.each(_listC, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Level[p])
                                    continue;
                                item[p] = FORMATTRT_Level[p](item[p]);
                            }
                        });
                        $("#femi-supplierConfirm-tbody").html($com.util.template(_listC, HTML.TableSupplierMode));
                        
                    }

                });
                //联系人
                model.com.getLinkManSupplier({ customer_id: mid, active: 2 }, function (resS) {
                    if (!resS)
                        return;
                    if (resS && resS.list) {
                        DataAll = $com.util.Clone(resS.list);   //界面数据
                        DATABasic = $com.util.Clone(resS.list); //数据库数据                    
                        for (var i = 0; i < DataAll.length; i++) {
                            DataAll[i].WID = i + 1;
                        }
                        var Data = $com.util.Clone(DataAll);
                        $.each(Data, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_LinkManSupplier[p])
                                    continue;
                                item[p] = FORMATTRT_LinkManSupplier[p](item[p]);
                            }
                        });

                        $("#femi-LinkManSupplier-tbody").html($com.util.template(Data, HTML.TableMode));

                    }

                });
            },
            //查询供应商列表
            getSupplier: function (data, fn, context) {
                var d = {
                    $URI: "/Supplier/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
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
            //保存供应商列表
            postSupplier: function (data, fn, context) {
                var d = {
                    $URI: "/Supplier/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //激活供应商列表
            ActiveSupplier: function (data, fn, context) {
                var d = {
                    $URI: "/Supplier/Active",
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
          
            //查询联系人列表
            getLinkManSupplier: function (data, fn, context) {
                var d = {
                    $URI: "/LinkManSupplier/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //激活联系人
            postActive: function (data, fn, context) {
                var d = {
                    $URI: "/LinkManSupplier/Active",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //更新添加联系人
            PostUpdateAdd: function (data, fn, context) {
                var d = {
                    $URI: "/LinkManSupplier/Update",
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
        }
    }),

    model.init();


});