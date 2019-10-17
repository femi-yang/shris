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
        HTML;

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
        ERPID: 0,
        ID: 0,
        Name: "",
        Status: 1,
        StatusText: "",
        Description:""
    };


    ;
    HTML = {
        TableMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
				'<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
				'<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
				'<td data-title="Code" data-value="{{Code}}" >{{Code}}</td>',
                '<td data-title="Description" data-value="{{Description}}" >{{Description}}</td>',
				'<td data-title="BusinessUnit" data-value="{{BusinessUnit}}" >{{BusinessUnit}}</td>',
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
         
         "Name|名称",
         "Code|编码",
         "Description|描述",
         "BusinessUnitID|事业部|ArrayOne",
         "Status|状态|ArrayOne",
         "Active|激活|ArrayOne",
        ];
        KEYWORD_Level = {};
        FORMATTRT_Level = {};

        DEFAULT_VALUE_Level = {
            Name: "",
            Code: "",
            Description:"",
            BusinessUnitID: 0,
            //Active: true,
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
        name: '岗位',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {
            //查询
            $("body").delegate("#zace-searchAll-level", "click", function () {
                var default_value = {
                    BusinessUnitID: 0,
                    //Position: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.BusinessUnitID = Number(rst.BusinessUnitID);
                    $com.table.filterByConndition($("#femi-riskLevel-tbody"), DataAll, default_value, "ID");

                }, TypeSource_Level));




            });
            //产品类型查询
            $("body").delegate("#zace-search-level", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevel-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevel-tbody"), DataAllFactorySearch, value, "ID");



            });
            //产品类型修改
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
                    Description: SelectData[0].Description,
                    Name: SelectData[0].Name,
                    Code: SelectData[0].Code,
                    BusinessUnitID: SelectData[0].BusinessUnitID,
                    //FactoryID: SelectData[0].FactoryID,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].Name = rst.Name;
                    SelectData[0].Description = rst.Description;
                    SelectData[0].Code = rst.Code;
                    SelectData[0].BusinessUnitID = Number(rst.BusinessUnitID);
                    //SelectData[0].FactoryID = Number(rst.FactoryID);
                    // SelectData[0].Active = rst.Active;

                    model.com.postFPCProductType({
                        data: SelectData[0],
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                        //var $Tr = $('#femi-riskLevel-tbody tr td[data-title=WID][data-value=' + wid + ']').closest("tr");
                        //$Tr.replaceWith($com.util.template(DATABasic[wid - 1], HTML.TableMode));

                    })

                }, TypeSource_Level));


            });

          
            //产品类型激活
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
                    Active: 1,
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();


                })




            });
            //产品类型禁用
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

            //产品类型新增
            $("body").delegate("#zace-add-level", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_Level, KEYWORD_Level, "新增", function (rst) {
                    //调用插入函数 
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    PositionTemp.BusinessUnitID = Number(rst.BusinessUnitID);
                    //PositionTemp.FactoryID = Number(rst.FactoryID);
                    PositionTemp.Name = rst.Name;
                    //PositionTemp.Status = Number(rst.Status);
                    PositionTemp.Code = rst.Code;
                    PositionTemp.Description = rst.Description;
                  //  PositionTemp.Active = rst.Active;

                    model.com.postFPCProductType({
                        data: PositionTemp,
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })

                }, TypeSource_Level));


            });
            //产品类型提交
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
                    model.com.postFPCProductType({
                        data: SelectData[i],
                    }, function (res) {
                        alert("提交成功");
                        model.com.refresh();
                    })
                }
            });
            //产品类型撤销
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

                    model.com.postFPCProductType({
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

            });
            //返回
            $("body").delegate("#zace-returnAudit-level", "click", function () {
                $(".zzza").show();
                $(".zzzb").hide();

            });
            //产品类型查询
            $("body").delegate("#zace-search-returnAudit", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevelAudit-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevelAudit-tbody"), DataAllSearch, value, "ID");



            });
            //产品类型审核
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
            //产品类型反审核
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
            //工位配置
            $("body").delegate("#zace-station-level", "click", function () {

                var vdata = { 'header': '工位信息', 'href': './factory_model/StationSetupSetting.html', 'id': 'StationSetup', 'src': './static/images/menu/factoryRoute/station.png' };
                window.parent.iframeHeaderSet(vdata);

            });

            $("body").delegate("#zace-product-level", "click", function () {
                var vdata = { 'header': '产品规格', 'href': './factory_model/ProductSetting.html', 'id': 'ProductSetup', 'src': './static/images/menu/factoryRoute/productSpecification.png' };
                window.parent.iframeHeaderSet(vdata);

            });
         

        },




        run: function () {

            model.com.getBusinessUnit({}, function (resBZ) {
                if (resBZ && resBZ.list) {
                    $.each(resBZ.list, function (i, item) {
                        TypeSource_Level.BusinessUnitID.push({
                            name: item.Name,
                            value: item.ID,
                        });
                    });

                }
                model.com.refresh();
            });

        },

        com: {
            refresh: function () {

                model.com.getFPCProductType({BusinessUnitID: 0 }, function (resP) {
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


                        ////===========审核
                        //DataAllConfirmChange = [];
                        //for (var i = 0; i < DataAllConfirm.length; i++) {
                        //    if (DataAllConfirm[i].Status == 2 || (DataAllConfirm[i].Status == 3 && DataAllConfirm[i].Auditor == window.parent.User_Info.Name)) {
                        //        DataAllConfirmChange.push(DataAllConfirm[i]);
                        //    }
                        //}
                        //DataAllConfirmBasic = $com.util.Clone(DataAllConfirmChange);
                        //for (var j = 0; j < DataAllConfirmChange.length; j++) {
                        //    DataAllConfirmChange[j].WID = j + 1;
                        //}
                        //var _listC = $com.util.Clone(DataAllConfirmChange);
                        //$.each(_listC, function (i, item) {
                        //    for (var p in item) {
                        //        if (!FORMATTRT_Level[p])
                        //            continue;
                        //        item[p] = FORMATTRT_Level[p](item[p]);
                        //    }
                        //});
                        //DataAllSearch = $com.util.Clone(_listC);
                        //$("#femi-riskLevelAudit-tbody").html($com.util.template(_listC, HTML.TableMode));


                    }

                });
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
            //查询产品列表
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
            //保存产品列表
            postFPCProductType: function (data, fn, context) {
                var d = {
                    $URI: "/FPCProductType/Update",
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
                    $URI: "/FPCProductType/Audit",
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
                    $URI: "/FPCProductType/Active",
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