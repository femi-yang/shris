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
        DataLinelist,
        DATAAllBasic,
        DataAllBSearch,
        HTML;

    DataAll = DataLinelist = [];
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
        Available: true,
        BusinessUnit: "",
        //BusinnessUnitID: 0,     /// 
        Code: "",
        CreateTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Creator: window.parent.User_Info.Name,
        CreatorID: 0,
        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Editor: window.parent.User_Info.Name,
        EditorID: 0,
        DeviceID: 0,
        DeviceNo: "",
        Factory: "",
        //FactoryID: 0,         ///
        ID: 0,
        Name: "",
        WorkShop: "",
        WorkShopID: 0,
        Line: "",
        LineID: 0,
        Status: 1,
        StatusText: "",
        ResourceID: 0,
        ResourceName: "",
        IPTModuleID: 0,
        EnableShiftIPT01: true,
        EnableShiftIPT02: true
    };


    ;
    HTML = {
        TableMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
				'<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
				'<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
				'<td data-title="Code" data-value="{{Code}}" >{{Code}}</td>',
				//'<td data-title="Factory" data-value="{{Factory}}" >{{Factory}}</td>',
                '<td data-title="BusinessUnit" data-value="{{BusinessUnit}}" >{{BusinessUnit}}</td>',
				'<td data-title="WorkShop" data-value="{{WorkShop}}" >{{WorkShop}}</td>',
				'<td data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
                '<td data-title="ResourceID" data-value="{{ResourceID}}" >{{ResourceID}}</td>',
                '<td data-title="DeviceID" data-value="{{DeviceID}}" >{{DeviceID}}</td>',
                 '<td data-title="IPTModuleID" data-value="{{IPTModuleID}}" >{{IPTModuleID}}</td>',
                  //'<td data-title="EnableShiftIPT01" data-value="{{EnableShiftIPT01}}" >{{EnableShiftIPT01}}</td>',
                  // '<td data-title="EnableShiftIPT02" data-value="{{EnableShiftIPT02}}" >{{EnableShiftIPT02}}</td>',
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



    }
    $(function () {
        KEYWORD_Level_LIST = [
         "Name|名称",
         "Code|编码",
         //"WorkShopID|车间|ArrayOneControl",
         //"LineID|产线|ArrayOneControl|WorkShopID",
         "WorkShopID|车间|ArrayOne",
         "LineID|产线|ArrayOne",
         "ResourceID|资源组|ArrayOne",
         "DeviceID|设备号|ArrayOne",
         "IPTModuleID|点检模板|ArrayOne",
         //"IPTModuleID|点检模板",
         "Status|状态|ArrayOne",
         "EnableShiftIPT01|班前点检|ArrayOne",
         "EnableShiftIPT02|班后点检|ArrayOne",
         "Active|激活|ArrayOne",
        ];
        KEYWORD_Level = {};
        FORMATTRT_Level = {};

        DEFAULT_VALUE_Level = {
            Name: "",
            Code: "",
            WorkShopID: 0,
            LineID: 0,
            ResourceID: 0,
            DeviceID: 0,
            IPTModuleID: 0,
            //EnableShiftIPT01: true,
            //EnableShiftIPT02:true
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
            EnableShiftIPT01: [
            {
                name: "是",
                value: true
            }, {
                name: "否",
                value: false
            }
            ],
            EnableShiftIPT02: [
            {
                name: "是",
                value: true
            }, {
                name: "否",
                value: false
            }
            ],
            DeviceID: [],
            IPTModuleID: [],
            WorkShopID: [
             {
                 name: "无",
                 value: 0,
                 // far: 0
             }
            ],
            ResourceID: [
          {
              name: "无",
              value: 0,
              // far: 0
          }
            ],
            LineID: [
              {
                  name: "无",
                  value: 0,
                  // far: 0
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
        name: '岗位',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {

            //条件查询
            $("body").delegate("#zace-searchApproval-level", "click", function () {
                var default_value = {
                    WorkShopID: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.WorkShopID = Number(rst.WorkShopID);
                    /// default_value.Position = Number(rst.Position);
                    $com.table.filterByConndition($("#femi-riskLevel-tbody"), DataAll, default_value, "ID");

                }, TypeSource_Level));


            });

            //条件查询
            $("body").delegate("#zace-searchAudit-level", "click", function () {
                var default_value = {
                    WorkShopID: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.WorkShopID = Number(rst.WorkShopID);
                    /// default_value.Position = Number(rst.Position);
                    $com.table.filterByConndition($("#femi-riskLevelAudit-tbody"), DataAllConfirm, default_value, "ID");

                }, TypeSource_Level));


            });
            //条件查询
            $("body").delegate("#zace-searchAll-level", "click", function () {
                var default_value = {
                    WorkShopID: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.WorkShopID = Number(rst.WorkShopID);
                    /// default_value.Position = Number(rst.Position);
                    $com.table.filterByConndition($("#femi-riskLevelApproval-tbody"), DATAAllBasic, default_value, "ID");

                }, TypeSource_Level));


            });

            //导出 
            $("body").delegate("#zace-exportApproval-level", "click", function () {
                var $table = $(".table-partApproval"),
                      fileName = "工位信息.xls",
                      Title = "工位信息";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });



            });
            //导出 
            $("body").delegate("#zace-exportAll-level", "click", function () {
                var $table = $(".table-partAll"),
                      fileName = "工位信息.xls",
                      Title = "工位信息";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });



            });
            //导出 
            $("body").delegate("#zace-exportAudit-level", "click", function () {
                var $table = $(".table-partAudit"),
                      fileName = "工位信息.xls",
                      Title = "工位信息";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });



            });
            //工位查询 所有
            $("body").delegate("#zace-search-All", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevelApproval-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevelApproval-tbody"), DataAllBSearch, value, "ID");



            });

            //工位查询
            $("body").delegate("#zace-search-Audit", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevelAudit-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevelAudit-tbody"), DataAllSearch, value, "ID");



            });

            //工位查询 申请
            $("body").delegate("#zace-search-approval", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevel-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevel-tbody"), DataAllFactorySearch, value, "ID");



            });
            //工位修改
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
                    WorkShopID: SelectData[0].WorkShopID,
                    LineID: SelectData[0].LineID,
                    Name: SelectData[0].Name,
                    DeviceID: SelectData[0].DeviceID,
                    Code: SelectData[0].Code,
                    ResourceID: SelectData[0].ResourceID,
                    IPTModuleID: SelectData[0].IPTModuleID,
                    //EnableShiftIPT01: SelectData[0].EnableShiftIPT01,
                    //EnableShiftIPT02: SelectData[0].EnableShiftIPT02,

                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].Name = rst.Name;
                    SelectData[0].Code = rst.Code;
                    SelectData[0].WorkShopID = Number(rst.WorkShopID);
                    SelectData[0].LineID = Number(rst.LineID);
                    SelectData[0].ResourceID = Number(rst.ResourceID);
                    SelectData[0].DeviceID = Number(rst.DeviceID);
                    SelectData[0].IPTModuleID = Number(rst.IPTModuleID);
                    //SelectData[0].EnableShiftIPT01 = eval(rst.EnableShiftIPT01.toLowerCase());
                    //SelectData[0].EnableShiftIPT02 = eval(rst.EnableShiftIPT02.toLowerCase());

                    model.com.postFMCStation({
                        data: SelectData[0],
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                        //var $Tr = $('#femi-riskLevel-tbody tr td[data-title=WID][data-value=' + wid + ']').closest("tr");
                        //$Tr.replaceWith($com.util.template(DATABasic[wid - 1], HTML.TableMode));

                    })

                }, TypeSource_Level));


            });

            //工位激活
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
                    Active: 1,
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();


                })




            });
            //工位禁用
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

            //工位新增
            $("body").delegate("#zace-add-level", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_Level, KEYWORD_Level, "新增", function (rst) {
                    //调用插入函数 
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    PositionTemp.WorkShopID = Number(rst.WorkShopID);
                    PositionTemp.LineID = Number(rst.LineID);
                    PositionTemp.Name = rst.Name;
                    PositionTemp.Code = rst.Code;
                    PositionTemp.ResourceID = Number(rst.ResourceID);
                    PositionTemp.DeviceID = Number(rst.DeviceID);
                    PositionTemp.IPTModuleID = Number(rst.IPTModuleID);
                    //PositionTemp.EnableShiftIPT01 = eval(rst.EnableShiftIPT01.toLowerCase());
                    //PositionTemp.EnableShiftIPT02 = eval(rst.EnableShiftIPT02.toLowerCase());

                    model.com.postFMCStation({
                        data: PositionTemp,
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })

                }, TypeSource_Level));


            });
            //工位提交
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
                    model.com.postFMCStation({
                        data: SelectData[i],
                    }, function (res) {
                        alert("提交成功");
                        model.com.refresh();
                    })
                }
            });
            //工位撤销
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

                    model.com.postFMCStation({
                        data: SelectData[i],
                    }, function (res) {
                        alert("撤销成功");
                        model.com.refresh();
                    })
                }



            });
            //===========
            //我的审核
            $("body").delegate("#zace-myAudit-level", "click", function () {

                $(".zzza").hide();
                $(".zzzb").show();
                $(".zzzc").hide();


            });
            //我的申请
            $("body").delegate("#zace-myApproval-level", "click", function () {
                $(".zzza").show();
                $(".zzzb").hide();
                $(".zzzc").hide();

            });
            //=================所有列表
            $("body").delegate("#zace-allList-level", "click", function () {
                $(".zzza").hide();
                $(".zzzb").hide();
                $(".zzzc").show();

            });

            //工位审核
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
            //工位反审核
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

            $("body").delegate("#zace-workshop-level", "click", function () {
                var vdata = { 'header': '车间建模', 'href': './factory_model/WorkShopSetting.html', 'id': 'WorkShopSetup', 'src': './static/images/menu/manageBOM.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            //产线配置
            $("body").delegate("#zace-line-level", "click", function () {

                var vdata = { 'header': '产线信息', 'href': './factory_model/LineSetting.html', 'id': 'LineSetup', 'src': './static/images/menu/manageBOM.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            $("body").delegate("#zace-productType-level", "click", function () {
                var vdata = { 'header': '产品类型', 'href': './factory_model/ProductType.html', 'id': 'ProductTypeSetup', 'src': './static/images/menu/factoryRoute/productType.png' };
                window.parent.iframeHeaderSet(vdata);

            });

            $("body").delegate("#zace-product-level", "click", function () {
                var vdata = { 'header': '产品规格', 'href': './factory_model/ProductSetting.html', 'id': 'ProductSetup', 'src': './static/images/menu/factoryRoute/productSpecification.png' };
                window.parent.iframeHeaderSet(vdata);

            });
        },




        run: function () {
            var wDevice = window.parent._Device;
            model.com.getFMCLine({ FactoryID: 0, BusinessUnitID: 0, WorkShopID: 0 }, function (resW) {
                if (resW && resW.list) {
                    DataLinelist = resW.list;
                    $.each(resW.list, function (i, item) {
                        TypeSource_Level.LineID.push({
                            name: item.Name,
                            value: item.ID,
                            //  far:item.WorkShopID
                        });
                    });

                }
                model.com.getFMCWorkShop({ FactoryID: 0, BusinessUnitID: 0 }, function (resW) {
                    if (resW && resW.list) {
                        DataWorkShoplist = resW.list;
                        $.each(resW.list, function (i, item) {
                            TypeSource_Level.WorkShopID.push({
                                name: item.Name,
                                value: item.ID,
                                far: 0
                            });
                        });

                    }
                    model.com.getFMCResource({ FactoryID: 0, BusinessUnitID: 0 }, function (resR) {
                        if (resR && resR.list) {

                            $.each(resR.list, function (i, item) {
                                TypeSource_Level.ResourceID.push({
                                    name: item.Name,
                                    value: item.ID,
                                    far: 0
                                });
                            });

                        }


                        model.com.getDevicePointCheckType({
                            StationID: -1, Name: "", Active: -1,
                            StartTime: "2000-01-01", EndTime: "2000-01-01", ConfigType: 2,
                            BusinessUnitID: -1, BaseID: -1, FactoryID: -1, WorkShopID: -1, LineID: -1
                        }, function (resType) {

                            $.each(resType.list, function (i, item) {
                                TypeSource_Level.IPTModuleID.push({
                                    name: item.Name,
                                    value: item.ID,
                                    far: null
                                })
                            });

                            $.each(wDevice, function (i, item) {
                                TypeSource_Level.DeviceID.push({
                                    name: item.DeviceNo,
                                    value: item.ID,
                                });
                            });
                            model.com.refresh();
                        });


                    });
                });
            });


        },

        com: {
            refresh: function () {
                //所有
                model.com.getFMCStation({ LineID: 0 }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        var Grade = $com.util.Clone(resP.list);
                        DATAAllBasic = $com.util.Clone(resP.list);

                        $.each(Grade, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Level[p])
                                    continue;
                                item[p] = FORMATTRT_Level[p](item[p]);
                            }
                        });
                        DataAllBSearch = $com.util.Clone(Grade);
                        $("#femi-riskLevelApproval-tbody").html($com.util.template(Grade, HTML.TableMode));

                    }

                });
                //申请
                model.com.getFMCStation({ LineID: 0 }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        var Grade = $com.util.Clone(resP.list);
                        DATABasic = $com.util.Clone(resP.list);

                        for (var i = 0; i < Grade.length; i++) {
                            Grade[i].WID = i + 1;
                        }
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
                model.com.getFMCStation({ LineID: 0 }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {

                        //审核数据
                        DataAllConfirm = $com.util.Clone(resP.list);
                        DataAllConfirmChange = $com.util.Clone(resP.list);

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

            },
            //获取所有设备/备件点检类型列表
            getDevicePointCheckType: function (data, fn, context) {
                var d = {
                    $URI: "/DevicePointCheckType/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询设备
            getDeviceModel: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceModel/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //查询资源组列表
            getFMCResource: function (data, fn, context) {
                var d = {
                    $URI: "/FMCResource/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //查询车间
            getFMCWorkShop: function (data, fn, context) {
                var d = {
                    $URI: "/FMCWorkShop/All",
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
            //查询工位列表
            getFMCStation: function (data, fn, context) {
                var d = {
                    $URI: "/FMCStation/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //保存工位列表
            postFMCStation: function (data, fn, context) {
                var d = {
                    $URI: "/FMCStation/Update",
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
                    $URI: "/FMCStation/Audit",
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
                    $URI: "/FMCStation/Active",
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