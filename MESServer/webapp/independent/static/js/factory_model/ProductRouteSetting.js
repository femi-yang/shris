require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base', '../static/utils/js/base/jquery.treeview','../static/utils/js/base/tooltip', '../static/utils/js/base/route'], function ($zace, $com, $treeview, $tooltip, $route) {

    var KEYWORD_Level_LIST,
        KEYWORD_Level,
        FORMATTRT_Level,
        DEFAULT_VALUE_Level,
        TypeSource_Level,
        KEYWORD_condition_LIST,
        KEYWORD_condition,
        FORMATTRT_condition,
        DEFAULT_VALUE_condition,
        TypeSource_condition,
        mProductID,
		model,
        DataAll,
        DataCustomer,
        DataBasicGrid,
        DATABasic,
        DataAllConfirmBasic,
        DataAllConfirmChange,
        DataAllConfirm,
        DataShow,
        DataAllSearch,
        DataAllFactorySearch,
        mWidth,
        HTML;
    dataRoute = [];
    RouteColor = {};
        DataShow = {};
    dataPart = [];
    dataPartPoint = [];
    DataAll = [];
    DATABasic = [];
    DataAllConfirmBasic = [];
    DataAllConfirmChange = [];
    DataAllConfirm = [];
    mProductID = 0;
    DataAllFactorySearch = DataAllSearch = [];
    PositionTemp = {
        Active: true,
        Auditor: window.parent.User_Info.Name,
        AuditorID: 0,
        AuditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        BusinessUnit: "",
        CreateTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Creator: window.parent.User_Info.Name,
        CreatorID: 0,
        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Editor: window.parent.User_Info.Name,
        EditorID: 0,
        Factory: "",
        ID: 0,
        Line: "",
        ProductID: 0,
        ProductNo: "",
        ProductType: "",
        RouteID: 0,
        RouteName:"",
        VersionNo:"",
        Status: 3,
        StatusText: "",
    };

    Temp={
        ID: 0,
        ProductID: 0,
        RouteID: 0,
        PartID: 0,
        PartPointID: 0,
        ItemID: 0,
        ItemValue:0,


    }
    ;
    HTML = {
        TableMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
				'<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
				'<td data-title="RouteName" data-value="{{RouteName}}" >{{RouteName}}</td>',
				'<td data-title="VersionNo" data-value="{{VersionNo}}" >{{VersionNo}}</td>',
				'<td data-title="BusinessUnit" data-value="{{BusinessUnit}}" >{{BusinessUnit}}</td>',
               // '<td data-title="Factory" data-value="{{Factory}}" >{{Factory}}</td>',
                 '<td data-title="Line" data-value="{{Line}}" >{{Line}}</td>',
                '<td data-title="ProductType" data-value="{{ProductType}}" >{{ProductType}}</td>',
                 '<td data-title="ProductNo" data-value="{{ProductNo}}" >{{ProductNo}}</td>',
				//'<td data-title="Status" data-value="{{Status}}" >{{Status}}</td>',
                '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
                '<td data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',
                 '<td data-title="CreateTime" data-value="{{CreateTime}}" >{{CreateTime}}</td>',
                  '<td data-title="Editor" data-value="{{Editor}}" >{{Editor}}</td>',
                 '<td data-title="EditTime" data-value="{{EditTime}}" >{{EditTime}}</td>',
                //'<td data-title="Auditor" data-value="{{Auditor}}" >{{Auditor}}</td>',
                // '<td data-title="AuditTime" data-value="{{AuditTime}}" >{{AuditTime}}</td>',
				'</tr>',
        ].join(""),



    }
    $(function () {
        KEYWORD_Level_LIST = [       
         "RouteID|工艺路线|ArrayOne",
         "PartID|工段|ArrayOne",
           "PartPointID|工序|ArrayOne",
         "ProductID|规格|ArrayOne",
         "Status|状态|ArrayOne",
         "Active|激活|ArrayOne",
        ];
        KEYWORD_Level = {};
        FORMATTRT_Level = {};

        DEFAULT_VALUE_Level = {
            ProductID: 0,
            RouteID: 0,
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
            RouteID: [
              {
                  name: "无",
                  value: 0,               
              }
            ],
            PartID: [
             {
                 name: "无",
                 value: 0,
             }
            ],
            ProductID: [
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

    $(function () {
        KEYWORD_condition_LIST = [
            "RouteNameZ|路线|Readonly",
            "PartNameZ|工序|Readonly",
            "PartPointNameZ|工步|Readonly",
           
           
        ];
        KEYWORD_condition = {};
        FORMATTRT_condition = {};



        TypeSource_condition = {
          

        };

        $.each(KEYWORD_condition_LIST, function (i, item) {
            var detail = item.split("|");
            KEYWORD_condition[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_condition[detail[0]] = $com.util.getFormatter(TypeSource_condition, detail[0], detail[2]);
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
            //zace-search-routeLine
            //条件查询
            $("body").delegate("#zace-search-routeLine", "click", function () {
                var default_value = {
                    RouteID: 0,
                  
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.RouteID = Number(rst.RouteID);
                  
                    $com.table.filterByConndition($("#femi-riskLevel-tbody"), DataAll, default_value, "ID");

                }, TypeSource_Level));


            });
            //产品工艺路线查询
            $("body").delegate("#zace-search-level", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevel-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevel-tbody"), DataAllFactorySearch, value, "ID");



            });
            //产品工艺路线修改
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
                //if (SelectData[0].Status != 1) {
                //    alert("数据选择有误！")
                //    return;
                //}
                var default_value = {               
                    ProductID: SelectData[0].ProductID,
                    RouteID: SelectData[0].RouteID,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;                
                    SelectData[0].ProductID = Number(rst.ProductID);
                    SelectData[0].RouteID = Number(rst.RouteID);
                   // SelectData[0].Active = rst.Active;

                    model.com.postFPCProductRoute({
                        data: SelectData[0],
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                        //var $Tr = $('#femi-riskLevel-tbody tr td[data-title=WID][data-value=' + wid + ']').closest("tr");
                        //$Tr.replaceWith($com.util.template(DATABasic[wid - 1], HTML.TableMode));

                    })

                }, TypeSource_Level));


            });        

            //产品工艺路线激活
            $("body").delegate("#zace-active-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                //if (SelectData[0].Status != 1) {
                //    alert("数据选择有误！")
                //    return;
                //}
                model.com.activeAudit({
                    data: SelectData,
                    Active:1,
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();


                })




            });
            //产品工艺路线禁用
            $("body").delegate("#zace-disable-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                //if (SelectData[0].Status != 1) {
                //    alert("数据选择有误！")
                //    return;
                //}
                model.com.activeAudit({
                    data: SelectData,
                    Active: 0,
                }, function (res) {
                    alert("禁用成功");
                    model.com.refresh();


                })

            });

            //产品工艺路线新增
            $("body").delegate("#zace-add-level", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_Level, KEYWORD_Level, "新增", function (rst) {
                    //调用插入函数 
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    PositionTemp.ProductID = Number(rst.ProductID);
                    PositionTemp.RouteID = Number(rst.RouteID);              
                    //PositionTemp.Active = rst.Active;

                    model.com.postFPCProductRoute({
                        data: PositionTemp,
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })

                }, TypeSource_Level));


            });
            //产品工艺路线提交
            $("body").delegate("#zace-up-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                //for (var i = 0; i < SelectData.length; i++) {
                //    if (SelectData[i].Status == 2 || SelectData[i].Status == 0) {
                //        alert("有数据已被提交,请重新选择!!");
                //        return;

                //    }
                //    else if (SelectData[i].Status == 3 || SelectData[i].Status == 4) {
                //        alert("有数据已被审核,请重新选择!!");
                //        return;
                //    }

                //}
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其提交？")) {
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {

                    //var wid = SelectData[i].WID;
                    SelectData[i].Status = 2;
                    model.com.postFPCProductRoute({
                        data: SelectData[i],
                    }, function (res) {
                        alert("提交成功");
                        model.com.refresh();
                    })
                }
            });
            //产品工艺路线撤销
            $("body").delegate("#zace-return-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                //for (var i = 0; i < SelectData.length; i++) {
                //    if (SelectData[i].Status == 1 || SelectData[i].Status == 0) {
                //        alert("数据选择有误,请重新选择!");
                //        return;

                //    }
                //    else if (SelectData[i].Status == 3 || SelectData[i].Status == 4) {
                //        alert("有数据已被审核,请重新选择!");
                //        return;
                //    }

                //}
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其撤回？")) {
                    return;
                }
                for (var i = 0; i < SelectData.length; i++) {

                    //var wid = SelectData[i].WID;
                    SelectData[i].Status = 1;

                    model.com.postFPCProductRoute({
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
                $(".zzzb").show();
                $(".zzzc").hide();

            });
            $("body").delegate("#zace-open-routeLine", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据操作！")
                    return;
                }
                mProductID = SelectData[0].ProductID;
                var routePartArr = [],
                        _dataRoute = $com.util.Clone(dataRoute),
                        _dataPart = $com.util.Clone(dataPart),
                        RouteID = SelectData[0].RouteID;
                //拿到此路线下对应的工序段
                $.each(_dataPart, function (p_i, p_item) {
                    if (RouteID == p_item.RouteID) {
                        routePartArr.push(p_item);
                    }
                });
                //if ($(this).parents(".business")) {
                    model.com.renderRouteChart(routePartArr);
                //} else if ($(this).parents(".factory")) {
                //    model.com.renderFactoryChart(routePartArr);
                //}
                var title = FORMATTRT_Level["RouteID"](RouteID)+"工艺流程";
                $(".zace-titleZ").html(title);
                $(".zzza").hide();
                $(".zzzb").hide();
                $(".zzzc").show();
               
            });
            //返回
            $("body").delegate("#zace-returnAudit-level", "click", function () {
                $(".zzza").show();
                $(".zzzb").hide();
                $(".zzzc").hide();

            });
            //返回
            $("body").delegate("#returnChart", "click", function () {
                $(".zzza").show();
                $(".zzzb").hide();
                $(".zzzc").hide();
               
            });
            //隐藏
            $("body").delegate("#zace-close-detail", "click", function () {
               
                $(".right-contain").css("width", "0px");
                $(".left-containPro").css("margin-right", "0px");
                $(".right-contain").hide();
            });

            //产品工艺查询
            $("body").delegate("#zace-search-returnAudit", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevelAudit-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevelAudit-tbody"), DataAllSearch, value, "ID");



            });
            //产品工艺审核
            $("body").delegate("#zace-audit-returnAudit", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevelAudit-tbody"), "ID", DataAllConfirmChange);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                //for (var i = 0; i < SelectData.length; i++) {
                //    if (SelectData[i].Status == 1 || SelectData[i].Status == 0) {
                //        alert("数据选择,请重新选择!!");
                //        return;

                //    }
                //    else if (SelectData[i].Status == 3 || SelectData[i].Status == 4) {
                //        alert("有数据已被审核,请重新选择!!");
                //        return;
                //    }

                //}
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
            //产品工艺路线反审核
            $("body").delegate("#zace-fan-returnAudit", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevelAudit-tbody"), "ID", DataAllConfirmChange);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                //for (var i = 0; i < SelectData.length; i++) {
                //    if (SelectData[i].Status == 2 || SelectData[i].Status == 1) {
                //        alert("数据选择有误,请重新选择!!");
                //        return;

                //    }
                //    else if (SelectData[i].Status == 0 || SelectData[i].Status == 4) {
                //        alert("数据选择有误,请重新选择!!");
                //        return;
                //    }

                //}
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

            $("body").delegate("#zace-save-detail", "click", function () {
                var suc = $com.propertyGrid.getData($(".zace-pripoty"));
                var _data = suc.data;
                var _list = [];
                if (DataBasicGrid.list.length<1) {
                    for (var i = 0; i < DataCustomer.length; i++) {
                        var _Temp = $com.util.Clone(Temp);
                        _Temp.PartID = DataBasicGrid.info.PartID;
                        _Temp.PartPointID = DataBasicGrid.info.PartPointID;
                        _Temp.RouteID = DataBasicGrid.info.RouteID;
                        _Temp.ProductID = mProductID;
                        _Temp.ItemID = i + 1;
                        _Temp.ItemValue = suc.data["Custom_" + _Temp.ItemID];
                        _list.push(_Temp);
                    }




                    model.com.postFPCRoutePartPoint({
                        data: DataBasicGrid.info,
                        list: _list
                    }, function (res) {
                        alert("保存成功");
                        model.com.refresh();

                    })
                } else {
                    for (var i = 0; i < DataBasicGrid.list.length; i++) {
                       
                        DataBasicGrid.list[i].ItemValue = suc.data["Custom_" + DataBasicGrid.list[i].ItemID];
                        
                    }




                    model.com.postFPCRoutePartPoint({
                        data: DataBasicGrid.info,
                        list: DataBasicGrid.list
                    }, function (res) {
                        alert("保存成功");
                        model.com.refresh();

                    })

                }
               
            });

           
        },




        run: function () {
            model.com.getConfig({}, function (resC) {
                if (!resC)
                    return;
                if (resC && resC.list) {
                    var listC = resC.list;
                    DataCustomer=resC.list;
                    $.each(listC, function (i, item) {
                        KEYWORD_condition["Custom_"+item.PropertyID] = {
                            index: i + 3,
                            name: item.PropertyName,
                            type: item.PropertyType, 
                        }; 
                        FORMATTRT_condition["Custom_" + item.PropertyID] = $com.util.getFormatter(TypeSource_condition, "Custom_" + item.PropertyID, item.PropertyType); 
                    });
                     
                }
              
            })
            model.com.getFPCRoute({FactoryID :0,ProductTypeID :0,BusinessUnitID :0}, function (resPZ) {
                if (resPZ && resPZ.list) {
                    dataRoute = resPZ.list;
                    $.each(resPZ.list, function (i, item) {
                        TypeSource_Level.RouteID.push({
                            name: item.Name,
                            value: item.ID,                          
                        });
                    });
                    //TypeSource_condition.RouteID = TypeSource_Level.RouteID;
                }
                model.com.getFPCProduct({BusinessUnitID:0,ProductTypeID:0}, function (resBZ) {
                    if (resBZ && resBZ.list) {
                        $.each(resBZ.list, function (i, item) {
                            TypeSource_Level.ProductID.push({
                                name: item.ProductNo,
                                value: item.ID,
                            });
                        });

                    }
                    model.com.getPartAll({}, function (data) {
                        dataPart = data.list;
                        $.each(data.list, function (i, item) {
                            TypeSource_Level.PartID.push({
                                name: item.Name,
                                value: item.ID,
                            });
                        });
                        //TypeSource_condition.PartID = TypeSource_Level.PartID;
                        model.com.getPartPointAll({}, function (data) {
                            dataPartPoint = data.list;

                          
                            model.com.refresh();
 
                           
                        });
                    });
                  

                    
                });
            });





        },

        com: {
            refresh: function () {

                model.com.getFPCProductRoute({RouteID:0,ProductID:0}, function (resP) {
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
                        DataAllConfirmChange = [];
                        for (var i = 0; i < DataAllConfirm.length; i++) {
                            if (DataAllConfirm[i].Status == 2 || (DataAllConfirm[i].Status == 3 && DataAllConfirm[i].Auditor == window.parent.User_Info.Name)) {
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
                        DataAllSearch = $com.util.Clone(_listC);
                        $("#femi-riskLevelAudit-tbody").html($com.util.template(_listC, HTML.TableMode));


                    }

                });
            },
            refreshGrid: function (id,productId) {
                model.com.getFPCRoutePartPointInfo({ ID: id, ProductID: productId }, function (resP1) {
                    if (!resP1)
                        return;
                    if (resP1) {
                        var data = resP1;

                        DataBasicGrid = resP1;
                        var _showData = {};
                        for (var i = 0; i < dataPartPoint.length; i++) {
                            if (id == dataPartPoint[i].ID) {
                                _showData = $com.util.Clone(dataPartPoint[i]);
                            }
                        }
                        DataShow = _showData;

                        var _showDataT = {};
                        if (DataBasicGrid.list.length<1) {
                            _showDataT.RouteNameZ = FORMATTRT_Level["RouteID"](DataBasicGrid.info.RouteID);
                            _showDataT.PartNameZ = FORMATTRT_Level["PartID"](DataBasicGrid.info.PartID);
                            _showDataT.PartPointNameZ = DataShow.PartPointName;

                            for (var property in KEYWORD_condition) {
                                if (_showDataT[property] || _showDataT[property] == false || _showDataT[property] == 0)
                                    continue;
                                _showDataT[property] = "";
                            }



                            //KEYWORD_condition.Creator = {
                            //    control: undefined,
                            //    index: 2,
                            //name: "创建者",
                            //type: "Readonly",

                            //}

                            $com.propertyGrid.show($(".zace-pripoty"), _showDataT, KEYWORD_condition, TypeSource_condition);
                        } else {

                            _showDataT.RouteNameZ = FORMATTRT_Level["RouteID"](DataBasicGrid.info.RouteID);
                            _showDataT.PartNameZ = FORMATTRT_Level["PartID"](DataBasicGrid.info.PartID);
                            _showDataT.PartPointNameZ = DataShow.PartPointName;

                            for (var property in KEYWORD_condition) {
                                if (_showDataT[property] || _showDataT[property] == false || _showDataT[property] == 0)
                                    continue;
                                _showDataT[property] = "";
                            }

                            for (var i = 0; i < DataBasicGrid.list.length; i++) {
                                var num = 0;
                                num=i+1;
                                _showDataT["Custom_" + num] = DataBasicGrid.list[i].ItemValue;
                                if (_showDataT["Custom_" + num] == false || _showDataT["Custom_" + num]=="false") {
                                    _showDataT["Custom_" + num] = false;
                                }
                                if (_showDataT["Custom_" + num] == true || _showDataT["Custom_" + num] == "true") {
                                    _showDataT["Custom_" + num] = true;
                                }
                            }

                            //KEYWORD_condition.Creator = {
                            //    control: undefined,
                            //    index: 2,
                            //name: "创建者",
                            //type: "Readonly",

                            //}

                            $com.propertyGrid.show($(".zace-pripoty"), _showDataT, KEYWORD_condition, TypeSource_condition);

                        }
                       
                    }

                });
            },
            getConfig: function (data, fn, context) {
                var d = {
                    $URI: "/FPCProductCustom/Config",
                    $TYPE: "get"
                };
                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            getPartAll: function (data, fn, context) {
                var d = {
                    $URI: "/FPCRoutePart/All",
                    $TYPE: "get"
                };
                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            getPartPointAll: function (data, fn, context) {
                var d = {
                    $URI: "/FPCRoutePartPoint/All",
                    $TYPE: "get"
                };
                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //保存工序段列表
            postFPCRoutePartPoint: function (data, fn, context) {
                var d = {
                    $URI: "/FPCRoutePartPoint/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询某个工序
            getFPCRoutePartPointInfo: function (data, fn, context) {
                var d = {
                    $URI: "/FPCRoutePartPoint/Info",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询路线
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
            OrderList: function (data) {
                var _list = [];
                for (var i = 0; i < data.length; i++) {

                    for (var j = 0; j < data.length; j++) {
                        if ((i + 1) == data[j].OrderID) {
                            _list.push(data[j]);
                        }
                    }

                }
                return _list;

            },
            renderRouteChart: function (routePartArr) {
                var orderPartPointArr = [],
                    orderPartArr = [];
                //var _newOrderPart = [];
                //var _newOrderPartPoint = [];
                
                _routePartArr = $com.util.Clone(routePartArr),
                _routePartArr = model.com.OrderList(_routePartArr);

                _dataPartPoint = $com.util.Clone(dataPartPoint);
                //拿到此路线下所有工序段下的工序
                $.each(_routePartArr, function (i, item) {
                    $.each(_dataPartPoint, function (p_i, p_item) {
                        if (item.ID == p_item.PartID) {
                            orderPartPointArr.push(p_item);
                        }
                    });
                    orderPartPointArr = model.com.OrderList(orderPartPointArr);
                    orderPartArr = orderPartArr.concat(orderPartPointArr);
                    orderPartPointArr = [];
                });

                //得到的数据排序

                //添加唯一顺序字段OrderID
                for (var i = 0; i < orderPartArr.length; i++) {
                    orderPartArr[i].OrderIDPro = i + 1;
                }

                //显示流程图

                //为流程图添加方法
                //创建悬浮框方法
                var mouseoverFn = function (data, json) {
                    var cv = $(".left-contain").scrollTop();
                    //var cl = $("#ChartRoute").scrollLeft();
                    var $target = {
                        offset: function () {
                            return {
                                left: json.X + json.left+300,
                                top: json.Y + json.top+60-cv ,
                            };
                        },
                        width: function () {
                            return json.width;
                        },
                        height: function () {
                            return json.height;
                        },
                    }
                    //var x = json.X + json.left;
                    //var y = json.Y + json.top - cv;
                  //  alert(json.Y + "   ---   " + json.top);
                    var dataHtml = model.com.changeData(data);
                    $tooltip.show({ target: $target, object: dataHtml, orientation: 2, Choice_color: 4, max_width: 200, fontsize: 13, });
                }
                var mouseoutFn = function (data) {
                    $tooltip.clear();
                }
                //点击方法
                var clickFn = function (data, json) {
                    var _info = data;
                    var showInfo = $com.util.Clone(_info);
                    //var _showData = {};
                    //for (var i = 0; i < dataPartPoint.length; i++) {
                    //    if (showInfo.ID == dataPartPoint[i].ID) {
                    //        _showData = $com.util.Clone(dataPartPoint[i]);
                    //    }
                    //}
                    //DataShow = _showData;
                   
                    model.com.refreshGrid(showInfo.ZID,mProductID);
                   
                    $(".right-contain").css("width", "400px");
                    $(".left-containPro").css("margin-right", "400px");
                    $(".right-contain").show();
                }
                //1 置空
                $("#ChartPartPoint").html("");
                //$(".zzzc").show();

                //2 创建结构
                var dataObj = {
                    contain: $("#ChartPartPoint"),
                    data: [],
                    dataSet: {
                        Text: "title",//显示字段名称
                        Index: "ID",//索引字段名称
                        PrevIndex: "PrevID", //索引字段名称
                        NextIndex: "NextID",//索引字段名称
                        "BGC": "backgroundColor", //背景色字段名称
                        "FGC": "foregroundColor", //前景色字段名称
                    },
                    padding: 10,
                    direction: "right",
                    //background_color: 'transparent', //流程框背景颜色
                    foreground_color: 'red', //箭头颜色
                    fn_mouseover: mouseoverFn,
                    fn_mouseout: mouseoutFn,
                    fn_click: clickFn
                };
                //3 填充data
                if (orderPartArr.length != 0) {
                    $.each(orderPartArr, function (i, item) {
                        dataObj.data.push({
                            title: item.PartPointName,
                            ID: item.OrderIDPro,
                            ZID:item.ID,
                            PrevID: item.OrderIDPro - 1,
                            NextID: 0,
                            backgroundColor: model.com.getRandomColor(item.PartID),
                            foregroundColor: "white",
                            PartName: FORMATTRT_Level["PartID"](item.PartID),
                            RouteName: FORMATTRT_Level["RouteID"](item.RouteID),
                            VersionNo: item.VersionNo,

                        });
                    });
                    //4 显示流程图
                    $route.show(dataObj);
                }
                else {
                    return false;
                }
            },
            getRandomColor: function (partID) {
                if (!RouteColor[partID]) {
                    RouteColor[partID] = 'rgb(' + (Math.floor(Math.random() * 255)) + ',' + (Math.floor(Math.random() * 255)) + ',' + (Math.floor(Math.random() * 255)) + ')';
                }

                return RouteColor[partID];
            },
            changeData: function (data) {
                var obj = {
                    工序名: ":" + data.title,
                    顺序: ":" + data.ID,
                    工序段名: ":" + data.PartName,
                    路线名: ":" + data.RouteName,
                    路线编码: ":" + data.VersionNo,
                }
                return obj;
            },

            //查询产品规格
            getFPCProduct: function (data, fn, context) {
                var d = {
                    $URI: "/FPCProduct/All",
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
            //查询产品工艺路线列表
            getFPCProductRoute: function (data, fn, context) {
                var d = {
                    $URI: "/FPCProductRoute/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //保存产品工艺路线列表
            postFPCProductRoute: function (data, fn, context) {
                var d = {
                    $URI: "/FPCProductRoute/Update",
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
                    $URI: "/FPCProductRoute/Audit",
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
                    $URI: "/FPCProductRoute/Active",
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