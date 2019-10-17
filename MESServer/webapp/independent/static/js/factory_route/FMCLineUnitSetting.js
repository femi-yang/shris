require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base', '../static/utils/js/base/jquery.treeview', ], function ($zace, $com, $tree) {

    var model,
        DATAChange,
        DATA,
        DATAITEM,
        DATAITEMChange,
        mLineID,
        MaterialList,
        KEYWORD_BOMItem_LIST,
        KEYWORD_BOMItem,
        FORMATTRT_BOMItem,
        TypeSource_BOMItem,
        DataMaterialList,
        DATAItemSearch,
        DataMateialBasic,
        DATASearch,
        mID,
        DataLineList,
        DATAAllBasic,
        mItemID,
        DATATree,
        HTML;

    mLineID = 1;
    mID = 0;
    DATAITEMChange = DATAItemSearch = DATASearch = [];
    MaterialList = DataLineList = [];
    DATAITEM = DATAAllBasic = [];
    DATAChange = [];
    DATA = [];


    BOMItemTemp = {
        Active: true,
        Auditor: window.parent.User_Info.Name,
        AuditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        AuditorID: 0,
        Code: "",
        Creator: window.parent.User_Info.Name,
        CreateTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        CreatorID: 0,
        Editor: window.parent.User_Info.Name,
        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        EditorID: 0,
        ID: 0,
        LevelID: 0,
        LevelName: "",
        LineID: 0,
        Name: "",
        OrderID: 0,
        ParentUnitID: 0,
        Status:1,
        StatusText: "",
        UnitID: 0,
        UnitList: [],
        ShiftDays: 0,
        TechPeriod: 0,
        QTPeriod: 0,
        WorkHour: 0,
    };
    HTML = {
        TableBOMItemMode: [
              '<tr>',
              '<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
               '<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
               '<td data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
               '<td data-title="LevelID" data-value="{{LevelID}}" >{{LevelID}}</td>',
              '<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
               '<td data-title="Code" data-value="{{Code}}" >{{Code}}</td>',
              //'<td data-title="UnitID" data-value="{{UnitID}}" >{{UnitID}}</td>',
              //'<td data-title="ParentUnitID" data-value="{{ParentUnitID}}" >{{ParentUnitID}}</td>',
               '<td data-title="OrderID" data-value="{{OrderID}}" >{{OrderID}}</td>',
                 '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
                '<td data-title="ShiftDays" data-value="{{ShiftDays}}" >{{ShiftDays}}</td>',
                '<td data-title="TechPeriod" data-value="{{TechPeriod}}" >{{TechPeriod}}</td>',
                '<td data-title="QTPeriod" data-value="{{QTPeriod}}" >{{QTPeriod}}</td>',
              
              //'<td data-title="Status" data-value="{{Status}}" >{{Status}}</td>',
              '<td data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',
              '<td data-title="CreateTime" data-value="{{CreateTime}}" >{{CreateTime}}</td>',
              '<td data-title="Editor" data-value="{{Editor}}" >{{Editor}}</td>',
              '<td data-title="EditTime" data-value="{{EditTime}}" >{{EditTime}}</td>',
              // '<td data-title="Auditor" data-value="{{Auditor}}" >{{Auditor}}</td>',
              //'<td data-title="AuditTime" data-value="{{AuditTime}}" >{{AuditTime}}</td>',
              '</tr>',
        ].join(""),

        TreeItemNode: [
            '<li data-titie="{{ID}}"  data-value="{{ID}}" >',
            '<span style="vertical-align:top;" data-value="{{ID}}"}" >{{Name}}</span> ',
            '<ul>{{Items}}',
            '</ul>',
            '</li>',
        ].join(""),

    }
    // Item
    $(function () {
        KEYWORD_BOMItem_LIST = [
             "LineID|产线|ArrayOne",
             "PartID|工序|ArrayOne",
             "PartPointID|工步|ArrayOne",
             "StationID|工位|ArrayOne",
             "UnitID|工ID",
             "ParentUnitID|父级",
             "OrderID|顺序",
             "ShiftDays|工序排程间隔(天)",
             "TechPeriod|工艺巡检周期(min)",
             "QTPeriod|工步巡检周期(min)",
             "WorkHour|顺序",
             "Active|激活|ArrayOne",//Status
              "Status|状态|ArrayOne",
               "LevelID|层级|ArrayOne",

        ];
        KEYWORD_BOMItem = {};
        FORMATTRT_BOMItem = {};


        TypeSource_BOMItem = {
            Active: [{
                name: "禁用",
                value: 0
            }, {
                name: "激活",
                value: 1
            }],

            LevelID: [
             //{
             //    name: "产线级",
             //    value: 1
             //},
              {
                 name: "全部",
                 value: 0
             },
             {
                 name: "工序级",
                 value: 2
             }, {
                 name: "工步级",
                 value: 3
             }, {
                 name: "工位级",
                 value: 4
             }, ],
            LineID: [],
            PartID: [],
            PartPointID: [],
            StationID: [],
            //ParentUnitID: [],
            Status: [
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
             },
            ],

        };

        $.each(KEYWORD_BOMItem_LIST, function (i, item) {
            var detail = item.split("|");
            KEYWORD_BOMItem[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_BOMItem[detail[0]] = $com.util.getFormatter(TypeSource_BOMItem, detail[0], detail[2]);
            }
        });
    });

    model = $com.Model.create({
        name: '产线配置',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {
            //新增 Item
            $("body").delegate("#zace-add-bomItem", "click", function () {
                var wlevelId = 0;
                var _list = [];
                for (var i = 0; i < DATAAllBasic.length; i++) {
                    if (mID == DATAAllBasic[i].ID) {
                        _list.push(DATAAllBasic[i]);
                    }
                }

                if (mID == 0) {
                    DEFAULT_VALUE_BOMItem = {
                        PartID: 0,
                        ShiftDays: 0,
                        TechPeriod: 0,
                        // OrderID: 0
                    };
                    $("body").append($com.modal.show(DEFAULT_VALUE_BOMItem, KEYWORD_BOMItem, "新增", function (rst) {
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        var _temp = $com.util.Clone(BOMItemTemp);
                        _temp.LineID = mLineID;
                        _temp.UnitID = Number(rst.PartID);
                        _temp.ShiftDays = Number(rst.ShiftDays);
                        _temp.TechPeriod = Number(rst.TechPeriod);
                        _temp.ParentUnitID = mLineID;
                        _temp.LevelID = 2;
                        _temp.OrderID = model.com.GetMaxIDPro(DATAITEMChange);

                        model.com.postItem({
                            data: _temp
                        }, function (res) {
                            alert("新增成功");
                            model.com.refreshc();
                        })

                    }, TypeSource_BOMItem));
                } else if (_list[0].LevelID == 2) {

                    DEFAULT_VALUE_BOMItemPP = {
                        PartPointID: 0,
                        QTPeriod: 0,
                        //OrderID: 0,

                    };
                    $("body").append($com.modal.show(DEFAULT_VALUE_BOMItemPP, KEYWORD_BOMItem, "新增", function (rst) {
                        if (!rst || $.isEmptyObject(rst))
                            return;


                        var _temp = $com.util.Clone(BOMItemTemp);
                        _temp.LineID = mLineID;
                        _temp.UnitID = Number(rst.PartPointID);
                        _temp.QTPeriod = Number(rst.QTPeriod);
                        _temp.ParentUnitID = _list[0].UnitID;
                        _temp.LevelID = 3;
                        // _temp.OrderID = Number(rst.OrderID);
                        _temp.OrderID = model.com.GetMaxID(DATAITEMChange);

                        model.com.postItem({
                            data: _temp
                        }, function (res) {
                            alert("新增成功");
                            model.com.refreshc();
                        })

                    }, TypeSource_BOMItem));
                } else if (_list[0].LevelID == 3) {
                    DEFAULT_VALUE_BOMItemPS = {
                        StationID: 0,
                        // OrderID: 0,
                    };
                    $("body").append($com.modal.show(DEFAULT_VALUE_BOMItemPS, KEYWORD_BOMItem, "新增", function (rst) {
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        var _temp = $com.util.Clone(BOMItemTemp);
                        _temp.LineID = mLineID;
                        _temp.UnitID = Number(rst.StationID);
                        _temp.ParentUnitID = _list[0].UnitID;
                        _temp.LevelID = 4;
                        //_temp.OrderID = Number(rst.OrderID);
                        _temp.OrderID = model.com.GetMaxID(DATAITEMChange);

                        model.com.postItem({
                            data: _temp
                        }, function (res) {
                            alert("新增成功");
                            model.com.refreshc();
                        })

                    }, TypeSource_BOMItem));

                } else {
                    alert("工位无添加项!")
                }
            });
            //修改 Item
            $("body").delegate("#zace-edit-bomItem", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-bomItem-tbody"), "ID", DATAITEMChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                if (SelectData[0].LevelID==2) {
                    var default_value = {
                        ShiftDays: SelectData[0].ShiftDays,
                        TechPeriod: SelectData[0].TechPeriod,
                    };
                    $("body").append($com.modal.show(default_value, KEYWORD_BOMItem, "修改", function (rst) {
                        //调用修改函数
                        if (!rst || $.isEmptyObject(rst))
                            return;
                        SelectData[0].ShiftDays = Number(rst.ShiftDays);
                        SelectData[0].TechPeriod = Number(rst.TechPeriod);
                        model.com.postItem({
                            data: SelectData[0]
                        }, function (res) {
                            alert("修改成功");
                            model.com.refreshc();
                        })

                    }, TypeSource_BOMItem));
                } else if (SelectData[0].LevelID == 3) {

                  var default_value = {
                      QTPeriod: SelectData[0].QTPeriod,
                   // Status: SelectData[0].Status,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_BOMItem, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].QTPeriod = Number(rst.QTPeriod);
                   // SelectData[0].Status = Number(rst.Status);
                    model.com.postItem({
                        data: SelectData[0]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refreshc();
                    })

                }, TypeSource_BOMItem));
                } else {
                    alert("无可修改项");
                    return false;
                }
            });


            //新增子项 BOMItem  Son
            $("body").delegate("#zace-add-bomItemSon", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-bomItem-tbody"), "ID", DATAITEMChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能选择一行增加！")
                    return;
                }
                if (SelectData[0].LevelID == 2) {

                    DEFAULT_VALUE_BOMItemPP = {
                        PartPointID: 0,
                        OrderID: 0,

                    };
                    $("body").append($com.modal.show(DEFAULT_VALUE_BOMItemPP, KEYWORD_BOMItem, "新增", function (rst) {
                        if (!rst || $.isEmptyObject(rst))
                            return;


                        var _temp = $com.util.Clone(BOMItemTemp);
                        _temp.LineID = mLineID;
                        _temp.UnitID = Number(rst.PartPointID);
                        _temp.ParentUnitID = SelectData[0].UnitID;
                        _temp.LevelID = 3;
                        _temp.OrderID = Number(rst.OrderID);


                        model.com.postItem({
                            data: _temp
                        }, function (res) {
                            alert("新增子项成功");
                            model.com.refreshc();
                        })

                    }, TypeSource_BOMItem));
                } else if (SelectData[0].LevelID == 3) {
                    DEFAULT_VALUE_BOMItemPS = {
                        StationID: 0,
                        OrderID: 0,
                    };
                    $("body").append($com.modal.show(DEFAULT_VALUE_BOMItemPS, KEYWORD_BOMItem, "新增", function (rst) {
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        var _temp = $com.util.Clone(BOMItemTemp);
                        _temp.LineID = mLineID;
                        _temp.UnitID = Number(rst.StationID);
                        _temp.ParentUnitID = SelectData[0].UnitID;
                        _temp.LevelID = 4;
                        _temp.OrderID = Number(rst.OrderID);


                        model.com.postItem({
                            data: _temp
                        }, function (res) {
                            alert("新增子项成功");
                            model.com.refreshc();
                        })

                    }, TypeSource_BOMItem));

                } else {
                    alert("工位无添加项!")
                }

            });
            //激活 BOMItem
            $("body").delegate("#zace-active-bomItem", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-bomItem-tbody"), "ID", DATAITEMChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                //if (SelectData.length != 1) {
                //    alert("只能同时对一行数据修改！")
                //    return;
                //}
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其激活吗？")) {
                    return;
                }

                model.com.activeItem({
                    data: SelectData,
                    Active: 1
                }, function (res1) {
                    alert("激活成功");
                    model.com.refreshc();
                })
            });
            //禁用 BOMItem
            $("body").delegate("#zace-disable-bomItem", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-bomItem-tbody"), "ID", DATAITEMChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                //if (SelectData.length != 1) {
                //    alert("只能同时对一行数据操作！")
                //    return;
                //}
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其禁用吗？")) {
                    return;
                }
                model.com.activeItem({
                    data: SelectData,
                    Active: 0
                }, function (res1) {
                    alert("禁用成功");
                    model.com.refreshc();
                })
            });

            //查询
            $("body").delegate("#zace-search-bomItem", "click", function () {
                var default_value = {
                    LineID: 0,

                };

                $("body").append($com.modal.show(default_value, KEYWORD_BOMItem, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;
                    var name;
                    mLineID = Number(rst.LineID);
                    mID = 0;
                    $("#zace-add-bomItemSon").show();
                    $("#zace-open-close").show();
                    $("#zace-shaixuan-bomItem").show();
                    model.com.refresh();

                }, TypeSource_BOMItem));



            });

            //////审核 BOMItem
            //$("body").delegate("#zace-delete-bomItem", "click", function () {


            //    model.com.auditItem({                    
            //        LineID: mLineID
            //    }, function (res1) {
            //        alert("审核成功");
            //        model.com.refresh();
            //    })
            //});
            // 删除 BOMItem
            $("body").delegate("#zace-delete-bomItem", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-bomItem-tbody"), "ID", DATAITEMChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其删除？")) {
                    return false;
                }
                //for (var i = 0; i < SelectData.length; i++) {
                //    if (SelectData[i].Status != 1) {
                //        alert("状态不对");
                //        return false;
                //    }
                //}
                var a = 0;

                $com.app.loading();

                var WhileAdd = function () {

                    model.com.deleteItem({
                        data: SelectData[a],
                    }, function (res) {
                        a++;

                        if (a == SelectData.length) {
                            $com.app.loaded();

                            alert("删除成功");
                            model.com.refreshc();
                        } else {
                            WhileAdd();
                        }
                    });

                }
                if (SelectData.length <= 0) {
                    alert("删除数据为空！！！");
                } else {
                    WhileAdd();
                }


                //model.com.deleteItem({
                //    data: SelectData[0],
                //}, function (res1) {
                //    alert("删除成功");
                //    model.com.refreshc();
                //})



            });

            $("body").delegate("#areaTree li span", "click", function () {
                $("#zace-add-bomItemSon").hide();
                $("#zace-open-close").hide();
                $("#zace-shaixuan-bomItem").hide();

                var $this = $(this);
                mID = Number($this.attr("data-value"));
                //alert(id);
                var _list = [];
                for (var i = 0; i < DATAAllBasic.length; i++) {
                    if (mID == DATAAllBasic[i].ID) {
                        _list.push(DATAAllBasic[i]);
                    }
                }
                if (_list[0].LevelID == 4) {
                    alert("工位无子集!");
                    return false;
                } else {
                    model.com.refreshc();
                }
                return false;
            });
            $("body").delegate("#zace-tree-part", "click", function () {
                $("#zace-add-bomItemSon").show();
                $("#zace-open-close").show();
                $("#zace-shaixuan-bomItem").show();
                //zace-open-close zace-shaixuan-bomItem
                mID = 0;
                model.com.refresh();
            });
            $("body").delegate("#zace-shaixuan-bomItem", "click", function () {
               
                var default_value = {
                    LevelID: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_BOMItem, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.LevelID = Number(rst.LevelID);
                    if (default_value.LevelID==0) {
                        $("#zace-tree-part").click();
                    } else {
                        $com.table.filterByConndition($("#femi-bomItem-tbody"), DATAITEM, default_value, "ID");
                    }
                   

                }, TypeSource_BOMItem));
            });
        },

        run: function () {



            model.com.getFMCLine({ FactoryID: 0, BusinessUnitID: 0, WorkShopID: 0 }, function (resW) {
                if (resW && resW.list) {
                    DataLineList = resW.list;
                    $.each(resW.list, function (i, item) {
                        TypeSource_BOMItem.LineID.push({
                            name: item.Name,
                            value: item.ID,
                            //  far:item.WorkShopID
                        });
                    });

                }
                model.com.getFPCPart({ FactoryID: 0, BusinessUnitID: 0 }, function (resP) {
                    $.each(resP.list, function (i, item) {
                        TypeSource_BOMItem.PartID.push({
                            name: item.Name,
                            value: item.ID,
                            far: null
                        })
                    });
                    model.com.getFPCPartPoint({ FactoryID: 0, BusinessUnitID: 0, ProductTypeID: 0 }, function (resP) {
                        $.each(resP.list, function (i, item) {
                            TypeSource_BOMItem.PartPointID.push({
                                name: item.Name,
                                value: item.ID,
                                far: null
                            })
                        });
                        model.com.getFMCStation({ LineID: 0 }, function (resP) {
                            $.each(resP.list, function (i, item) {
                                TypeSource_BOMItem.StationID.push({
                                    name: item.Name,
                                    value: item.ID,
                                    far: null
                                })
                            });
                            model.com.refresh();
                        });
                    });
                });

            });




        },

        com: {

            refresh: function () {

                model.com.getItemList({ LineID: mLineID, ID: 0 }, function (resBomItem) {
                    //bom_id:{int} 
                    var name = FORMATTRT_BOMItem["LineID"](mLineID)
                    $("#zace-spanTextChange").html(name + "详情");

                    if (resBomItem && resBomItem.list) {

                        var ItemList = $com.util.Clone(resBomItem.list);

                        DATAITEM = $com.util.Clone(resBomItem.list);

                        DATAITEMChange = $com.util.Clone(ItemList);
                        $.each(ItemList, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_BOMItem[p])
                                    continue;
                                item[p] = FORMATTRT_BOMItem[p](item[p]);
                            }
                        });
                        DATAItemSearch = $com.util.Clone(ItemList);
                        //model.com.renderTree(ItemList);
                        $("#femi-bomItem-tbody").html($com.util.template(ItemList, HTML.TableBOMItemMode));
                    }
                });
                model.com.getItemTree({ LineID: mLineID, ID: 0 }, function (resBomItem1) {
                    //bom_id:{int} 
                    if (resBomItem1 && resBomItem1.list) {
                        DATATree = $com.util.Clone(resBomItem1.list);
                        var ItemList = $com.util.Clone(resBomItem1.list);
                        model.com.renderTree(ItemList);
                    }
                });
                //所有数据 
                model.com.getItemList({ LineID: mLineID, ID: 0 }, function (resBomItem) {
                    //bom_id:{int} 
                    if (resBomItem && resBomItem.list) {
                        DATAAllBasic = $com.util.Clone(resBomItem.list);
                    }

                });
            },
            refreshc: function () {
                //渲染树 Tree
                model.com.getItemTree({ LineID: mLineID, ID: 0 }, function (resBomItem1) {
                    //bom_id:{int} 
                    if (resBomItem1 && resBomItem1.list) {
                        DATATree = $com.util.Clone(resBomItem1.list);
                        var ItemList = $com.util.Clone(resBomItem1.list);
                        model.com.renderTree(ItemList);
                    }
                });

                if (mID > 0) {
                    model.com.getItemTree({ LineID: mLineID, ID: mID }, function (resBomItem1) {
                        //bom_id:{int} 
                        var name = FORMATTRT_BOMItem["LineID"](mLineID)
                        $("#zace-spanTextChange").html(name + "详情");

                        if (resBomItem1 && resBomItem1.list) {

                            var ItemList = $com.util.Clone(resBomItem1.list);
                            DATAITEM = $com.util.Clone(resBomItem1.list);

                            DATAITEMChange = $com.util.Clone(ItemList);
                            $.each(ItemList, function (i, item) {
                                for (var p in item) {
                                    if (!FORMATTRT_BOMItem[p])
                                        continue;
                                    item[p] = FORMATTRT_BOMItem[p](item[p]);
                                }
                            });

                            $("#femi-bomItem-tbody").html($com.util.template(ItemList, HTML.TableBOMItemMode));
                        }
                    });

                } else {

                    model.com.getItemList({ LineID: mLineID, ID: 0 }, function (resBomItem) {
                        //bom_id:{int} 
                        var name = FORMATTRT_BOMItem["LineID"](mLineID)
                        $("#zace-spanTextChange").html(name + "详情");

                        if (resBomItem && resBomItem.list) {

                            var ItemList = $com.util.Clone(resBomItem.list);

                            DATAITEM = $com.util.Clone(resBomItem.list);

                            DATAITEMChange = $com.util.Clone(ItemList);
                            $.each(ItemList, function (i, item) {
                                for (var p in item) {
                                    if (!FORMATTRT_BOMItem[p])
                                        continue;
                                    item[p] = FORMATTRT_BOMItem[p](item[p]);
                                }
                            });
                            DATAItemSearch = $com.util.Clone(ItemList);
                            //model.com.renderTree(ItemList);
                            $("#femi-bomItem-tbody").html($com.util.template(ItemList, HTML.TableBOMItemMode));
                        }
                    });
                }
               
                //所有数据 
                model.com.getItemList({ LineID: mLineID, ID: 0 }, function (resBomItem) {
                    //bom_id:{int} 
                    if (resBomItem && resBomItem.list) {
                        DATAAllBasic = $com.util.Clone(resBomItem.list);
                    }

                });



            },
            renderTree: function (list) {
                //list  ： Type List

                model.com.fullItems(list);

                $("#areaTree").html($com.util.template(list, HTML.TreeItemNode));
                $("#areaTree").treeview();
            },
            fullItems: function (list) {

                $.each(list, function (i, item) {

                    model.com.fullItems(item.UnitList);

                    item.Items = $com.util.template(item.UnitList, HTML.TreeItemNode);


                });
            },

            //查询工序库列表
            getFPCPart: function (data, fn, context) {
                var d = {
                    $URI: "/FPCPart/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询工步列表
            getFPCPartPoint: function (data, fn, context) {
                var d = {
                    $URI: "/FPCPartPoint/All",
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
            //获取列表
            getItemList: function (data, fn, context) {
                var d = {
                    $URI: "/FMCLineUnit/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //获取树形
            getItemTree: function (data, fn, context) {
                var d = {
                    $URI: "/FMCLineUnit/Tree",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //Update 新增
            postItem: function (data, fn, context) {
                var d = {
                    $URI: "/FMCLineUnit/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //激活
            activeItem: function (data, fn, context) {
                var d = {
                    $URI: "/FMCLineUnit/Active",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //审核
            auditItem: function (data, fn, context) {
                var d = {
                    $URI: "/FMCLineUnit/Audit",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //删除
            deleteItem: function (data, fn, context) {
                var d = {
                    $URI: "/FMCLineUnit/Remove",
                    $TYPE: "post"
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
            //工序
            getConfigAll: function (data, fn, context) {
                var d = {
                    $URI: "/APSLine/ConfigAll",
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
            //得到ID
            GetMaxID: function (_source) {
                var id = 0;
                if (!_source)
                    _source = [];
                $.each(_source, function (i, item) {
                    if (item.OrderID > id)
                        id = item.OrderID;
                });
                return id + 1;

            },
            //得到ID
            GetMaxIDPro: function (_source) {
                var id = 0;
                if (!_source)
                    _source = [];
                $.each(_source, function (i, item) {
                    if (item.LevelID==2&&item.OrderID > id)
                        id = item.OrderID;
                });
                return id + 1;

            },
        }
    });

    model.init();


});