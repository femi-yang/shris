require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($zace, $com) {

    var KEYWORD_Level_LIST,
        KEYWORD_Level,
        FORMATTRT_Level,
        DEFAULT_VALUE_Level,
        TypeSource_Level,
		model,
        DataAll,
        DATABasic,
        DATABasicPro,
        DataAllPro,
        DataAllFactorySearchPro,
        DataAllConfirmBasic,
        DataAllConfirmChange,
        DataAllConfirm,
        DataAllSearch,
        DataAllFactorySearch,
        RouteID,
        HTML;

    RouteID = 0;
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
        BusinessUnit: "",
        BusinessUnitID: 0,
        CreateTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Creator: window.parent.User_Info.Name,
        CreatorID: 0,
        Description: "",
        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Editor: window.parent.User_Info.Name,
        EditorID: 0,
        Factory: "",
        FactoryID: 1,
        LineID:0,
        ID: 0,
        Name:"",
        ProductType: "",
        ProductTypeID: 0,
        Status: 1,
        StatusText: "",
        VersionNo:"",
    };


    ;
    HTML = {
        TableMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
				'<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                  '<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
                '<td data-title="VersionNo" data-value="{{VersionNo}}" >{{VersionNo}}</td>',
				'<td data-title="Description" data-value="{{Description}}" >{{Description}}</td>',
				'<td data-title="BusinessUnit" data-value="{{BusinessUnit}}" >{{BusinessUnit}}</td>',
                '<td data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
                '<td data-title="ProductTypeID" data-value="{{ProductTypeID}}" >{{ProductTypeID}}</td>',
                //'<td data-title="Factory" data-value="{{Factory}}" >{{Factory}}</td>',               
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

        TablePartMode: [
            '<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
				'<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                  '<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
                '<td data-title="OrderID" data-value="{{OrderID}}" >{{OrderID}}</td>',
				'<td data-title="RouteName" data-value="{{RouteName}}" >{{RouteName}}</td>',
				'</tr>',
        ].join(""),



    }
    $(function () {
        KEYWORD_Level_LIST = [
         "Name|名称",
         "VersionNo|编码",
         "Description|描述",
         "FactoryID|工厂|ArrayOne",
         "BusinessUnitID|事业部|ArrayOneControl",
         "LineID|产线|ArrayOneControl|BusinessUnitID",
         "ProductTypeID|类型|ArrayOneControl|BusinessUnitID",        
         "Status|状态|ArrayOne",
         "Active|激活|ArrayOne",
        ];
        KEYWORD_Level = {};
        FORMATTRT_Level = {};

        DEFAULT_VALUE_Level = {
            
            VersionNo: "",
            Description:"",
            Name: "",
            BusinessUnitID: 0,
            //FactoryID: 0,
            LineID: 0,
            ProductTypeID:0,
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
              {
                  name: "无",
                  value: 0,
                  far:0,
              }
            ],
            LineID: [
            {
                name: "无",
                value: 0,
                far: 0,
            }
            ],
            ProductTypeID: [
           {
               name: "无",
               value: 0,
               far: 0,
           }
            ],
            FactoryID: [
             {
                 name: "无",
                 value: 0,               
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
            $("body").delegate("#zace-searchAll-level", "click", function () {
                var default_value = {
                    BusinessUnitID: 0,

                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.BusinessUnitID = Number(rst.BusinessUnitID);
                    $com.table.filterByConndition($("#femi-riskLevelAuditAll-tbody"), DATABasicPro, default_value, "ID");

                }, TypeSource_Level));


            });
            $("body").delegate("#zace-searchApproval-level", "click", function () {
                var default_value = {
                    BusinessUnitID: 0,

                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.BusinessUnitID = Number(rst.BusinessUnitID);
                    $com.table.filterByConndition($("#femi-riskLevel-tbody"), DATABasic, default_value, "ID");

                }, TypeSource_Level));


            });
            $("body").delegate("#zace-searchAudit-level", "click", function () {
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

            //双击.
            $("body").delegate("#femi-riskLevel-tbody tr", "dblclick", function () {

                var $this = $(this);
                var WID = Number($this.find('td[data-title=ID]').attr('data-value'));
               
                RouteID = WID;
                model.com.refresh();
                $(".zzzb").hide();
                //$(".zzza").css("width", "70%");
                //$(".zzzc").css("width", "29%");
                $(".zzzc").css("width", "350px");
                $(".zzza").css("margin-right", "350px");
                $(".zzzc").show();

            });
            //隐藏
            $("body").delegate("#zace-closePart-level", "click", function () {

                $(".zzzb").hide();
                $(".zzza").css("margin-right", "0px");
                $(".zzzc").css("width", "0px");
                $(".zzzc").hide();

            });
            //申请查询
            $("body").delegate("#zace-search-approval", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevel-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevel-tbody"), DataAllFactorySearch, value, "ID");



            });
            //查询
            $("body").delegate("#zace-search-Audit", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevelAudit-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevelAudit-tbody"), DataAllSearch, value, "ID");



            });
            //所有数据查询
            $("body").delegate("#zace-search-All", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevelAuditAll-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevelAuditAll-tbody"), DataAllFactorySearchPro, value, "ID");



            });
            //产品路线修改
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
                    LineID: SelectData[0].LineID,
                    Name: SelectData[0].Name,
                    VersionNo: SelectData[0].VersionNo,
                    Description: SelectData[0].Description,
                   // FactoryID: SelectData[0].FactoryID,
                    BusinessUnitID: SelectData[0].BusinessUnitID,
                    ProductTypeID: SelectData[0].ProductTypeID,

                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].Name = rst.Name;
                    SelectData[0].VersionNo = rst.VersionNo;
                    SelectData[0].Description = rst.Description;
                   // SelectData[0].FactoryID = Number(rst.FactoryID);
                    SelectData[0].LineID = Number(rst.LineID);
                    SelectData[0].ProductTypeID = Number(rst.ProductTypeID);
                    SelectData[0].BusinessUnitID = Number(rst.BusinessUnitID);

                    model.com.postFPCRoute({
                        data: SelectData[0],
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                        //var $Tr = $('#femi-riskLevel-tbody tr td[data-title=WID][data-value=' + wid + ']').closest("tr");
                        //$Tr.replaceWith($com.util.template(DATABasic[wid - 1], HTML.TableMode));

                    })

                }, TypeSource_Level));


            });

            //工产品路线激活
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
            //产品路线禁用
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

            //产品新增
            $("body").delegate("#zace-add-level", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_Level, KEYWORD_Level, "新增", function (rst) {
                    //调用插入函数 
                    if (!rst || $.isEmptyObject(rst))
                        return;

                    PositionTemp.BusinessUnitID = Number(rst.BusinessUnitID);
                    PositionTemp.LineID = Number(rst.LineID);
                    PositionTemp.ProductTypeID = Number(rst.ProductTypeID);
                    //PositionTemp.FactoryID = Number(rst.FactoryID);                   
                    PositionTemp.Name = rst.Name;
                    PositionTemp.Description = rst.Description;
                   // PositionTemp.Status = Number(rst.Status);
                    PositionTemp.VersionNo = rst.VersionNo;
                    //PositionTemp.Active = rst.Active;

                    model.com.postFPCRoute({
                        data: PositionTemp,
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })

                }, TypeSource_Level));


            });
            //产品提交
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
                    model.com.postFPCRoute({
                        data: SelectData[i],
                    }, function (res) {
                        alert("提交成功");
                        model.com.refresh();
                    })
                }
            });
            //产品撤销
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

                    model.com.postFPCRoute({
                        data: SelectData[i],
                    }, function (res) {
                        model.com.refresh();
                    })
                }



            });
            //===========
            //我的审核
            $("body").delegate("#zace-myAudit-level", "click", function () {
                $(".zzza").hide();
                $(".zzzc").hide();
                $(".zzzd").hide();
                $(".zzzb").show();

            });
            $("body").delegate("#zace-myApproval-level", "click", function () {
                $(".zzza").show();
                $(".zzza").css("margin-right", "0px");
                $(".zzzc").css("width", "0px");
                $(".zzzc").hide();
                $(".zzzd").hide();
                $(".zzzb").hide();

            });
            $("body").delegate("#zace-allList-level", "click", function () {
                $(".zzza").hide();
                $(".zzzc").hide();
                $(".zzzd").show();
                $(".zzzb").hide();

            });
            //返回
            $("body").delegate("#zace-returnAudit-level", "click", function () {
                $(".zzza").show();
                $(".zzza").css("margin-right", "0px");
                $(".zzzc").css("width", "0px");
                $(".zzzc").hide();
                $(".zzzb").hide();
                $(".zzzd").hide();

            });
          
            //产品审核
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
            //产品反审核
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

            $("body").delegate("#zace-routePartPoint-level", "click", function () {
                var vdata = { 'header': '工艺工步', 'href': './factory_model/FPCRoutePartPointSetting.html', 'id': 'FPCRoutePartPoint', 'src': './static/images/menu/manageBOM.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            $("body").delegate("#zace-part-level", "click", function () {
                var vdata = { 'header': '工序库', 'href': './factory_model/FPCPartBasicSetting.html', 'id': 'FPCPartBasic', 'src': './static/images/menu/factoryRoute/standardPartpoint.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            $("body").delegate("#zace-partPoint-level", "click", function () {
                var vdata = { 'header': '工步库', 'href': './factory_model/FPCPartPointSetting.html', 'id': 'FPCPartPoint', 'src': './static/images/menu/factoryRoute/standardPartpoint.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            
            $("body").delegate("#zace-routePart-level", "click", function () {
                var vdata = { 'header': '工艺工序', 'href': './factory_model/FPCRoutePartSetting.html', 'id': 'FPCRoutePart', 'src': './static/images/menu/manageBOM.png' };
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
            $("body").delegate("#zace-Fabrication-level", "click", function () {
                var vdata = { 'header': '工艺流程图', 'href': './factory_route/FabricationRoute.html', 'id': 'FabricationRoute', 'src': './static/images/menu/factoryRoute/fabricationRoute.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            $("body").delegate("#zace-FPCManuCapacity-level", "click", function () {
                var vdata = { 'header': '生产制造能力', 'href': './factory_model/FPCManuCapacity.html', 'id': 'FPCManuCapacitySetup', 'src': './static/images/menu/factoryRoute/manufacturingCapacity.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            $("body").delegate("#zace-ProductRoute-level", "click", function () {
                var vdata = { 'header': '产品工艺路线', 'href': './factory_model/ProductRouteSetting.html', 'id': 'ProductRouteSetup', 'src': './static/images/menu/factoryRoute/productTechniqueRoute.png' };
                window.parent.iframeHeaderSet(vdata);

            });
        },




        run: function () {

            model.com.getFMCFactory({}, function (resPZ) {
                if (resPZ && resPZ.list) {
                    //$.each(resPZ.list, function (i, item) {
                    //    TypeSource_Level.FactoryID.push({
                    //        name: item.Name,
                    //        value: item.ID,
                    //    });
                    //});

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
                    model.com.getFMCLineAll({}, function (resBZ) {
                        if (resBZ && resBZ.list) {
                            $.each(resBZ.list, function (i, item) {
                                TypeSource_Level.LineID.push({
                                    name: item.Name,
                                    value: item.ID,
                                    far: item.BusinessUnitID,
                                });
                            });

                        }
                        model.com.getFPCProductType({BusinessUnitID:0}, function (resBZ1) {
                            if (resBZ1 && resBZ1.list) {
                                $.each(resBZ1.list, function (i, item) {
                                    TypeSource_Level.ProductTypeID.push({
                                        name: item.Name,
                                        value: item.ID,
                                        far: item.BusinessUnitID,
                                    });
                                });

                            }
                            model.com.refresh();
                        });
                    });
                });
            });

        },

        com: {
            refresh: function () {

                model.com.getFPCRoute({FactoryID:0,BusinessUnitID:0,ProductTypeID:0}, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        var Grade = $com.util.Clone(resP.list);
                        DATABasic = $com.util.Clone(resP.list);

                        //审核数据
                        DataAllConfirm = $com.util.Clone(resP.list);
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


                        //===========审核
                        DataAllConfirmChange = $com.util.Clone(resP.list);
                        //for (var i = 0; i < DataAllConfirm.length; i++) {
                        //    if (DataAllConfirm[i].Status == 2 || (DataAllConfirm[i].Status == 3 && DataAllConfirm[i].Auditor == window.parent.User_Info.Name)) {
                        //        DataAllConfirmChange.push(DataAllConfirm[i]);
                        //    }
                        //}
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
                        DataAllSearch = $com.util.Clone(_listC);
                        $("#femi-riskLevelAudit-tbody").html($com.util.template(_listC, HTML.TableMode));


                    }

                });
                model.com.getFPCRoute({ FactoryID: 0, BusinessUnitID: 0, ProductTypeID: 0 }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        //所有列表
                        var Grade = $com.util.Clone(resP.list);
                        DATABasicPro = $com.util.Clone(resP.list);
                      
                        for (var i = 0; i < Grade.length; i++) {
                            Grade[i].WID = i + 1;
                        }
                        DataAllPro = $com.util.Clone(Grade);

                        $.each(Grade, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Level[p])
                                    continue;
                                item[p] = FORMATTRT_Level[p](item[p]);
                            }
                        });
                        DataAllFactorySearchPro = $com.util.Clone(Grade);
                        $("#femi-riskLevelAuditAll-tbody").html($com.util.template(Grade, HTML.TableMode));


                       


                    }

                });
                model.com.getFPCRoutePart({ RouteID: RouteID }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        var _list = resP.list;
                        var _listOrder = [];
                        for (var i = 0; i < _list.length; i++) {

                            for (var j = 0; j < _list.length; j++) {
                                if ((i + 1) == _list[j].OrderID) {
                                    _listOrder.push(_list[j]);
                                }
                            }

                        }
                        $("#femi-riskPart-tbody").html($com.util.template(_listOrder, HTML.TablePartMode));

                    }
                });
            },
            //查询产品工序段列表
            getFPCRoutePart: function (data, fn, context) {
                var d = {
                    $URI: "/FPCRoutePart/All",
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
            //查询规格类型
            getFPCProductType: function (data, fn, context) {
                var d = {
                    $URI: "/FPCProductType/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询产线
            getFMCLineAll: function (data, fn, context) {
                var d = {
                    $URI: "/FMCLine/All",
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
            //查询产品路线列表
            getFPCRoute: function (data, fn, context) {
                var d = {
                    $URI: "/FPCRoute/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //保存产品路线列表
            postFPCRoute: function (data, fn, context) {
                var d = {
                    $URI: "/FPCRoute/Update",
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
                    $URI: "/FPCRoute/Audit",
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
                    $URI: "/FPCRoute/Active",
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