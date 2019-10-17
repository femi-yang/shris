require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($zace, $com) {

    var KEYWORD_Level_LIST,
        KEYWORD_Level,
        FORMATTRT_Level,
        DEFAULT_VALUE_Level,
        TypeSource_Level,
		model,
        DataAll,
        DATABasic,
        DataAllConfirmBasic,
        DataAllConfirmChange,
        DataAllConfirm,
        DataAllSearch,
        DataAllFactorySearch,
        BusinessUnitID,
        FactoryID,
        WorkShopID,
        HTML;
    WorkShopID =BusinessUnitID=FactoryID= 0;
    DataAll = [];
    DATABasic = [];
    DataAllConfirmBasic = [];
    DataAllConfirmChange = [];
    DataAllConfirm = [];
    DataAllFactorySearch = DataAllSearch = [];
    PositionTemp = {
        Active: true,
        Auditor: window.parent.User_Info.Name,
        AuditorID: 0,
        AuditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        BusinessUnitID: 0,
        BusinessUnit: "",
        Code: "",
        CreateTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Creator: window.parent.User_Info.Name,
        CreatorID: 0,
        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Editor: window.parent.User_Info.Name,
        EditorID: 0,
        Factory: "",
        FactoryID: 1,      
        ID: 0,
        LineID: 0,
        LineName: "",
        StationList :[],
        Name: "",       
        Status: 1,
        StatusText: "",
    };


    ;
    HTML = {
        TableMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
				'<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
				'<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
				'<td data-title="Code" data-value="{{Code}}" >{{Code}}</td>',
				'<td data-title="BusinessUnit" data-value="{{BusinessUnit}}" >{{BusinessUnit}}</td>',
                '<td data-title="LineName" data-value="{{LineName}}" >{{LineName}}</td>',
				'<td data-title="Status" data-value="{{Status}}" >{{Status}}</td>',
                '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
                '<td data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',
                 '<td data-title="CreateTime" data-value="{{CreateTime}}" >{{CreateTime}}</td>',
                  '<td data-title="Editor" data-value="{{Editor}}" >{{Editor}}</td>',
                 '<td data-title="EditTime" data-value="{{EditTime}}" >{{EditTime}}</td>',                
                '<td data-title="Auditor" data-value="{{Auditor}}" >{{Auditor}}</td>',
                 '<td data-title="AuditTime" data-value="{{AuditTime}}" >{{AuditTime}}</td>',
				'</tr>',
        ].join(""),
        TableLineMode: [
              '<tr>',
              '<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
              '<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
              '<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
              '<td data-title="Code" data-value="{{Code}}" >{{Code}}</td>',              
              '<td data-title="WorkShop" data-value="{{WorkShop}}" >{{WorkShop}}</td>',
             
              '</tr>',
        ].join(""),


    }
    $(function () {
        KEYWORD_Level_LIST = [
         "Name|名称",
         "Code|编码",
         "BusinessUnitID|事业部|ArrayOneControl",
         "LineID|产线|ArrayOneControl|BusinessUnitID",
         "FactoryID|工厂名|ArrayOne",
         "Status|状态|ArrayOne",
         "Active|激活|ArrayOne",
        ];
        KEYWORD_Level = {};
        FORMATTRT_Level = {};

        DEFAULT_VALUE_Level = {
            Name: "",
            Code: "",
            BusinessUnitID: 0,           
            LineID: 0,           
           // Active: true,
        };

        TypeSource_Level = {
            Active: [
              {
                  name: "激活",
                  value: true
              }, {
                  name: "禁用",
                  value: false
              }
            ],
            BusinessUnitID: [
            ],
            LineID: [

            ],
            FactoryID: [
             {
                 name: "无",
                 value: 0,
                 far: 0
             }
            ],
            Status: [
               //{
               //    name: "默认值",
               //    value: 0
               //},
           {
               name: "创建",
               value: 1
           }, {
               name: "待审核",
               value: 2
           }, {
               name: "已审核",
               value: 3
           }, {
               name: "撤销审核",
               value: 4
           }, ],



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


    model = $com.Model.create({
        name: '加工资源',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {
           
            //导出 
            $("body").delegate("#zace-exportApproval-level", "click", function () {
                var $table = $(".table-partApproval"),
                      fileName = "加工资源信息.xls",
                      Title = "加工资源信息";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });



            });
            //导出 
            $("body").delegate("#zace-exportAll-level", "click", function () {
                var $table = $(".table-partAll"),
                      fileName = "加工资源信息.xls",
                      Title = "加工资源信息";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });



            });
            //导出 
            $("body").delegate("#zace-exportAudit-level", "click", function () {
                var $table = $(".table-partAudit"),
                      fileName = "加工资源信息.xls",
                      Title = "加工资源信息";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });



            });

            //车间修改
            $("body").delegate("#zace-edit-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                if (SelectData[0].Status != 1) {
                    alert("数据选择有误！")
                    return;
                }
                var default_value = {           
                    Name: SelectData[0].Name,
                    Code: SelectData[0].Code,
                    BusinessUnitID: SelectData[0].BusinessUnitID,
                    LineID: SelectData[0].LineID,                  
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].Name = rst.Name;
                    SelectData[0].Code = rst.Code;
                    SelectData[0].BusinessUnitID = Number(rst.BusinessUnitID);
                    SelectData[0].LineID = Number(rst.LineID);
                   // SelectData[0].Active = rst.Active;

                    model.com.postFMCWorkShop({
                        data: SelectData[0],
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                        //var $Tr = $('#femi-riskLevel-tbody tr td[data-title=WID][data-value=' + wid + ']').closest("tr");
                        //$Tr.replaceWith($com.util.template(DATABasic[wid - 1], HTML.TableMode));

                    })

                }, TypeSource_Level));


            });

            //$("body").delegate("#femi-riskLevel-tbody tr", "dblclick", function () {

            //    var $this = $(this);
            //    var WName = $this.find('td[data-title=Name]').attr('data-value');
            //    var WID = Number($this.find('td[data-title=ID]').attr('data-value'));
            //    var wBusinnessUnitID,
            //        wFactoryID;
            //    for (var i = 0; i < DATABasic.length; i++) {
            //        if (WID == DATABasic[i].ID) {
            //            wBusinnessUnitID = DATABasic[i].BusinessUnitID;
            //            wFactoryID = DATABasic[i].FactoryID;
            //        }
            //    }
            //    $("#zace-span-change").html(WName);
            //    BusinessUnitID = wBusinnessUnitID;
            //    FactoryID = wFactoryID;
            //    WorkShopID = WID;
            //    model.com.refresh();
            //    $(".zzzb").hide();
            //    //$(".zzza").css("width", "70%");
            //    //$(".zzzc").css("width", "29%");
            //    $(".zzzc").css("width", "350px");
            //    $(".zzza").css("margin-right", "350px");
              

            //    $(".zzzc").show();
            //    $(".zzzd").hide();
                
            //});
            //zace-closeLine-level
            $("body").delegate("#zace-closeLine-level", "click", function () {
             
                $(".zzzb").hide();
                $(".zzza").css("margin-right", "0px");
                $(".zzzc").css("width", "0px");
                $(".zzzc").hide();

            });


            //产线配置
            $("body").delegate("#zace-line-level", "click", function () {
              
                var vdata = { 'header': '产线信息', 'href': './factory_model/LineSetting.html', 'id': 'LineSetup', 'src': './static/images/menu/manageBOM.png'};
                window.parent.iframeHeaderSet(vdata);

            });
            //工位配置
            $("body").delegate("#zace-station-level", "click", function () {

                var vdata = { 'header': '工位信息', 'href': './factory_model/StationSetupSetting.html', 'id': 'StationSetup', 'src': './static/images/menu/factoryRoute/station.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            //产品配置
            $("body").delegate("#zace-productType-level", "click", function () {
                var vdata = { 'header': '产品类型', 'href': './factory_model/ProductType.html', 'id': 'ProductTypeSetup', 'src': './static/images/menu/factoryRoute/productType.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            //产品规格
            $("body").delegate("#zace-product-level", "click", function () {
                var vdata = { 'header': '产品规格', 'href': './factory_model/ProductSetting.html', 'id': 'ProductSetup', 'src': './static/images/menu/factoryRoute/productSpecification.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            //车间激活
            $("body").delegate("#zace-active-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData[0].Status != 1) {
                    alert("数据选择有误！")
                    return;
                }
                model.com.activeAudit({
                    data: SelectData,
                    Active:1,
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();


                })




            });
            //车间禁用
            $("body").delegate("#zace-disable-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData[0].Status != 1) {
                    alert("数据选择有误！")
                    return;
                }
                model.com.activeAudit({
                    data: SelectData,
                    Active: 0,
                }, function (res) {
                    alert("禁用成功");
                    model.com.refresh();


                })

            });

            //车间新增
            $("body").delegate("#zace-add-level", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_Level, KEYWORD_Level, "新增", function (rst) {
                    //调用插入函数 
                    if (!rst || $.isEmptyObject(rst))
                        return;                  
                    PositionTemp.BusinessUnitID = Number(rst.BusinessUnitID);
                    //PositionTemp.FactoryID = Number(rst.FactoryID);              
                    PositionTemp.Name = rst.Name;
                    PositionTemp.LineID = Number(rst.LineID);
                    PositionTemp.Code = rst.Code;
                    //PositionTemp.Active = rst.Active;

                    model.com.postFMCWorkShop({
                        data: PositionTemp,
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })

                }, TypeSource_Level));


            });
            //车间提交
            $("body").delegate("#zace-up-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 2 || SelectData[i].Status == 0) {
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

                    //var wid = SelectData[i].WID;
                    SelectData[i].Status = 2;
                    model.com.postFMCWorkShop({
                        data: SelectData[i],
                    }, function (res) {
                        alert("提交成功");
                        model.com.refresh();
                    })
                }
            });
            //车间撤销
            $("body").delegate("#zace-return-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 1 || SelectData[i].Status == 0) {
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

                    //var wid = SelectData[i].WID;
                    SelectData[i].Status = 1;

                    model.com.postFMCWorkShop({
                        data: SelectData[i],
                    }, function (res) {
                        model.com.refresh();
                    })
                }



            });
            //===========
            //=================所有列表
            $("body").delegate("#zace-allList-level", "click", function () {
                $(".zzza").hide();
                $(".zzzb").hide();
                $(".zzzc").hide();
                $(".zzzd").show();

            });
            //我的申请
            $("body").delegate("#zace-myApproval-level", "click", function () {
               
                $(".zzzb").hide();
                $(".zzza").css("margin-right", "0px");
                $(".zzzc").css("width", "0px");
                $(".zzza").show();
                $(".zzzc").hide();
                $(".zzzd").hide();

            });

            //我的审核
            $("body").delegate("#zace-myAudit-level", "click", function () {
                //if (RoleNum != -1) {

                    $(".zzza").hide();
                    $(".zzzb").show();
                    $(".zzzc").hide();
                    $(".zzzd").hide();

                //} else {
                //    alert("无权限");
                //}


            });

            //所有列表  车间查询
            $("body").delegate("#zace-search-returnAudit", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevelAll-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevelAll-tbody"), DATAAllSearchBasic, value, "ID");
            });
            //所有 条件查询
            $("body").delegate("#zace-searchAll-level", "click", function () {
                var default_value = {
                    BusinessUnitID: 0,
                   
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.BusinessUnitID = Number(rst.BusinessUnitID);
                    $com.table.filterByConndition($("#femi-riskLevelAll-tbody"), DataAll, default_value, "ID");

                }, TypeSource_Level));


            });
            //申请 条件查询
            $("body").delegate("#zace-searchZall-level", "click", function () {
                var default_value = {
                    BusinessUnitID: 0,

                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.BusinessUnitID = Number(rst.BusinessUnitID);
                    $com.table.filterByConndition($("#femi-riskLevel-tbody"), DataAll, default_value, "ID");

                }, TypeSource_Level));


            });
            //审批 条件查询
            $("body").delegate("#zace-searchApproval-level", "click", function () {
                var default_value = {
                    BusinessUnitID: 0,

                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.BusinessUnitID = Number(rst.BusinessUnitID);
                    $com.table.filterByConndition($("#femi-riskLevelAudit-tbody"), DataAllConfirm, default_value, "ID");

                }, TypeSource_Level));


            });




            //我的申请  车间查询
            $("body").delegate("#zace-search-level", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevel-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevel-tbody"), DataAllFactorySearch, value, "ID");



            });

            //我的审批  车间查询
            $("body").delegate("#zace-search-returnApproval", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevelAudit-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevelAudit-tbody"), DataAllSearch, value, "ID");



            });


            //车间审核
            $("body").delegate("#zace-audit-returnAudit", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevelAudit-tbody"), "ID", DataAllConfirmChange);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 1 || SelectData[i].Status == 0) {
                        alert("数据选择,请重新选择!!");
                        return;

                    }
                    else if (SelectData[i].Status == 3 || SelectData[i].Status == 4) {
                        alert("有数据已被审核,请重新选择!!");
                        return;
                    }

                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其审核？")) {
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {

                    // var wid = SelectData[i].WID;
                    SelectData[i].Status = 3;

                    model.com.postAudit({
                        data: SelectData[i],
                    }, function (res) {
                        alert("审核成功");
                        model.com.refresh();
                    })
                }
            });
            //车间反审核
            $("body").delegate("#zace-fan-returnAudit", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevelAudit-tbody"), "ID", DataAllConfirmChange);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 2 || SelectData[i].Status == 1) {
                        alert("数据选择有误,请重新选择!!");
                        return;

                    }
                    else if (SelectData[i].Status == 0 || SelectData[i].Status == 4) {
                        alert("数据选择有误,请重新选择!!");
                        return;
                    }

                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其反审核？")) {
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {

                    //var wid = SelectData[i].WID;
                    SelectData[i].Status = 1;

                    model.com.postAudit({
                        data: SelectData[i],
                    }, function (res) {
                        alert("反审核成功");
                        model.com.refresh();
                    })
                }
            });


        },




        run: function () {

            model.com.getFMCFactory({}, function (resPZ) {
                if (resPZ && resPZ.list) {
                    $.each(resPZ.list, function (i, item) {
                        TypeSource_Level.FactoryID.push({
                            name: item.Name,
                            value: item.ID,                          
                        });
                    });

                }
                model.com.getBusinessUnit({}, function (resBZ) {
                    if (resBZ && resBZ.list) {
                        $.each(resBZ.list, function (i, item) {
                            TypeSource_Level.BusinessUnitID.push({
                                name: item.Name,
                                value: item.ID,
                                far:0,
                            });
                        });

                    }
                    model.com.getFMCLine({ FactoryID: 0, BusinessUnitID: 0, WorkShopID: 0 }, function (resW) {
                        if (resW && resW.list) {
                            DataLinelist = resW.list;
                            $.each(resW.list, function (i, item) {
                                TypeSource_Level.LineID.push({
                                    name: item.Name,
                                    value: item.ID,
                                    far: item.BusinessUnitID
                                });
                            });

                        }
                        model.com.refresh();
                    });
                });
            });





        },

        com: {
            refresh: function () {
                //所有
                model.com.getFMCWorkShop({FactoryID:0,BusinessUnitID:0}, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        var Grade = $com.util.Clone(resP.list);
                        DATAAllBBasic = $com.util.Clone(resP.list);
                        $.each(Grade, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Level[p])
                                    continue;
                                item[p] = FORMATTRT_Level[p](item[p]);
                            }
                        });
                        DATAAllSearchBasic = $com.util.Clone(Grade);
                        //所有列表
                        $("#femi-riskLevelAll-tbody").html($com.util.template(Grade, HTML.TableMode));


                    }

                });
                //申请
                model.com.getFMCWorkShop({ FactoryID: 0, BusinessUnitID: 0 }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        var Grade = $com.util.Clone(resP.list);
                        DATABasic = $com.util.Clone(resP.list);
                                           
                        DataAll = $com.util.Clone(Grade);

                        $.each(Grade, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Level[p])
                                    continue;
                                item[p] = FORMATTRT_Level[p](item[p]);
                            }
                        });
                        DataAllFactorySearch = $com.util.Clone(Grade);
                        $("#femi-riskLevel-tbody").html($com.util.template(Grade, HTML.TableMode));                       
                    }

                });
                //审批
                model.com.getFMCWorkShop({ FactoryID: 0, BusinessUnitID: 0 }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        

                        //审核数据
                        DataAllConfirm = $com.util.Clone(resP.list);                                             
                        DataAllConfirmChange = DataAllConfirm;

                        DataAllConfirmBasic = $com.util.Clone(DataAllConfirmChange);
                       
                        var _listC = $com.util.Clone(DataAllConfirmChange);
                        $.each(_listC, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Level[p])
                                    continue;
                                item[p] = FORMATTRT_Level[p](item[p]);
                            }
                        });
                        DataAllSearch = $com.util.Clone(_listC);
                        $("#femi-riskLevelAudit-tbody").html($com.util.template(_listC, HTML.TableMode));


                    }

                });
                //model.com.getFMCLine({ FactoryID: FactoryID, BusinessUnitID: BusinessUnitID, WorkShopID: WorkShopID }, function (resP) {
                //    if (!resP)
                //        return;
                //    if (resP && resP.list) {

                //        var _list=resP.list;
                //        $("#femi-riskLine-tbody").html($com.util.template(_list, HTML.TableLineMode));
                //    }
                //});
                
               
            },
            //查询
            getFMCUserId: function (data, fn, context) {
                var d = {
                    $URI: "/Role/UserAllByFunctionID",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询产线
            getFMCLine: function (data, fn, context) {
                var d = {
                    $URI: "/FMCLine/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询工厂
            getFMCFactory: function (data, fn, context) {
                var d = {
                    $URI: "/FMCFactory/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询事业部
            getBusinessUnit: function (data, fn, context) {
                var d = {
                    $URI: "/BusinessUnit/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询模块ID对应枚举值
            getModuleAll: function (data, fn, context) {
                var d = {
                    $URI: "/MESEnum/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询加工资源列表
            getFMCWorkShop: function (data, fn, context) {
                var d = {
                    $URI: "/FMCResource/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //保存加工资源列表
            postFMCWorkShop: function (data, fn, context) {
                var d = {
                    $URI: "/FMCResource/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //审核
            postAudit: function (data, fn, context) {
                var d = {
                    $URI: "/FMCResource/Audit",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //激活
            activeAudit: function (data, fn, context) {
                var d = {
                    $URI: "/FMCResource/Active",
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
        }
    }),

    model.init();


});