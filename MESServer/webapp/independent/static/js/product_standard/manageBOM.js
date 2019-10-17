require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base', '../static/utils/js/base/jquery.treeview', ], function ($zace, $com, $tree) {

    var model,
        DATAChange,
        DATA,
        DATAITEM,
        DATAITEMChange,
        mBomId,
        KEYWORD_BOM_LIST,
        KEYWORD_BOM,
        FORMATTRT_BOM,
        TypeSource_BOM,
        MaterialList,
        PartList,
        PartPointList,
        BOMTemp,
        TypeList,
        DataLinelist,
        DataWorkShoplist,
        KEYWORD_BOMItem_LIST,
        KEYWORD_BOMItem,
        FORMATTRT_BOMItem,
        TypeSource_BOMItem,
        DataMaterialList,
        TreeList,
        DATAItemSearch,
        DataMateialBasic,
        DATASearch,
        mID,
        DataZZZ,
        mItemID,
        DataZaItem,
        boolImport,
        HTML;
    boolImport = true;
    mBomId = 0;
    DATAITEMChange = DATAItemSearch = DATASearch = [];
    MaterialList = [];
    DATAITEM = [];
    DATAChange =DataZaItem= [];
    DATA = TreeList=[];


    BOMItemTemp = {
        Active: 1,
        Auditor: window.parent.User_Info.Name,
        AuditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Author: window.parent.User_Info.Name,
        BOMID: 0,
        DeviceNo: "",
        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        ID: 0,
        LossRatio: 0,
        MaterialID: 0,
        MaterialName: "",
        MaterialNo: "",
        PartPointName: "",
        Type: "",
        MaterialUnit: 0,
        MaterialUnitRatio: 0,
        PartPointID: 0,
        TypeID: 0,
        ParentID: 0,
        GradeID: 1,
        ItemList: [],
        UnitID: 0,
        UnitText: "",

    };

    BOMListTemp = {
        AuditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Auditor: window.parent.User_Info.Name,
        Author: window.parent.User_Info.Name,
        BOMItemList: [],
        BOMName: "",
        BOMNo: "",
        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        ID: 0,
        LineID: 0,
        LineName: "",
        MaterialID: 0,
        MaterialName: "",
        MaterialNo: "",
        PartID: 0,
        PartName: "",
        Status: 3,
        StatusText: "",
        Type: "",
        TypeID: 0,
        WorkShop: "",
        WorkShopID: 0
    }

    HTML = {
        TableBOMMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',

                '<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                '<td data-title="BOMNo" data-value="{{BOMNo}}" >{{BOMNo}}</td>',
				'<td data-title="BOMName" data-value="{{BOMName}}" >{{BOMName}}</td>',
				'<td data-title="MaterialID" data-value="{{MaterialID}}" >{{MaterialID}}</td>',
                '<td data-title="TypeID" data-value="{{TypeID}}" >{{TypeID}}</td>',
                '<td data-title="WorkShopID" data-value="{{WorkShopID}}" >{{WorkShopID}}</td>',
				'<td data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
				'<td data-title="PartID" data-value="{{PartID}}" >{{PartID}}</td>',
                //'<td data-title="Status" data-value="{{Status}}" >{{Status}}</td>',
                '<td data-title="Auditor" data-value="{{Auditor}}" >{{Auditor}}</td>',
                '<td data-title="EditTime" data-value="{{EditTime}}" >{{EditTime}}</td>',

				'</tr>',
        ].join(""),
        TableBOMItemMode: [
              '<tr>',
              '<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',

               '<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                 //'<td data-title="ParentID" data-value="{{ParentID}}" >{{ParentID}}</td>',
                  '<td data-title="GradeID" data-value="{{GradeID}}" >{{GradeID}}</td>',
              //'<td data-title="BOMID" data-value="{{BOMID}}" >{{BOMID}}</td>',
              '<td data-title="MaterialID" data-value="{{MaterialID}}" >{{MaterialID}}</td>',
               '<td data-title="MaterialName" data-value="{{MaterialName}}" >{{MaterialName}}</td>',
              '<td data-title="TypeID" data-value="{{TypeID}}" >{{TypeID}}</td>',
               '<td data-title="MaterialUnit" data-value="{{MaterialUnit}}" >{{MaterialUnit}}</td>',
              '<td data-title="MaterialUnitRatio" data-value="{{MaterialUnitRatio}}" >{{MaterialUnitRatio}}</td>',
              '<td data-title="UnitID" data-value="{{UnitID}}" >{{UnitID}}</td>',
              '<td data-title="PartPointID" data-value="{{PartPointID}}" >{{PartPointID}}</td>',
              //'<td data-title="DeviceNo" data-value="{{DeviceNo}}" >{{DeviceNo}}</td>',
              '<td data-title="LossRatio" data-value="{{LossRatio}}" >{{LossRatio}}</td>',
             '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
              '<td  style="display:none" data-title="WID" data-value="{{WID}}" >{{WID}}</td>',


              '</tr>',
        ].join(""),

        TableMaterialMode: [
             '<tr>',
             '<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
             '<td data-title="WID" data-value="{{WID}}" >{{WID}}</td>',
             '<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
             '<td data-title="MaterialNo" data-value="{{MaterialNo}}" >{{MaterialNo}}</td>',
             '<td data-title="MaterialName" data-value="{{MaterialName}}" >{{MaterialName}}</td>',
             '</tr>',
        ].join(""),

        TreeItemNode: [
            '<li data-titie="{{MaterialID}}"  data-value="{{MaterialID}}" >',
            '<span style="vertical-align:top;" data-value="{{ID}}"}" >{{MaterialName}}</span> ',
            '<ul>{{Items}}',
            '</ul>',
            '</li>',
        ].join(""),
         
    }
    // Bom
    $(function () {
        KEYWORD_BOM_LIST = [
         "BOMNo|BOM编码",
         "BOMName|BOM名称",
         //"MaterialID|物料No",
         "MaterialID|物料No|ArrayOne",
          "TypeID|类型|ArrayOne",
         "WorkShopID|车间|ArrayOne",
         "LineID|产线|ArrayOne",
         "PartID|工序|ArrayOne",
         "Status|状态|ArrayOne",
         "EditTime|编辑时间|DateTime",


        ];
        KEYWORD_BOM = {};
        FORMATTRT_BOM = {};
        DEFAULT_VALUE_BOM = {

        };
        TypeSource_BOM = {
            Status: [{
                name: "默认",
                value: 0
            }, {
                name: "创建",
                value: 1
            }, {
                name: "待审核",
                value: 2
            }, {
                name: "已审核",
                value: 3
            }, {
                name: "审核撤销",
                value: 4
            }],
            WorkShopID: [],
            LineID: [],
            PartID: [],
            MaterialID: [],
            TypeID: [],


        };

        $.each(KEYWORD_BOM_LIST, function (i, item) {
            var detail = item.split("|");
            KEYWORD_BOM[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_BOM[detail[0]] = $com.util.getFormatter(TypeSource_BOM, detail[0], detail[2]);
            }
        });
    });

    // BomItem
    $(function () {
        KEYWORD_BOMItem_LIST = [
             "MaterialID|物料号|ArrayOne",
              "TypeID|类型|ArrayOne",
               "MaterialUnit|用量:分子",
             "MaterialUnitRatio|用量:分母",
            
             "UnitID|物料单位|ArrayOne",
             "DeviceNo|设备号",
             "ParentID|ParentID",
             "GradeID|GradeID",
             "PartPointID|工步|ArrayOne",
             "LossRatio|损耗率",
             "Active|状态|ArrayOne",
        ];
        KEYWORD_BOMItem = {};
        FORMATTRT_BOMItem = {};
        DEFAULT_VALUE_BOMItem = {

        };
        TypeSource_BOMItem = {
            Active: [{
                name: "禁用",
                value: 0
            }, {
                name: "激活",
                value: 1
            }],
            PartPointID: [],
            MaterialID: [],
            UnitID: [{
                name: "无",
                value: 0
            }],
            TypeID: [{
                name: "无",
                value: 0
            }],


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
        name: 'BOM管理',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {
            //双击显示子项
            $("body").delegate("#femi-bom-tbody tr", "dblclick", function () {
                $(".zace-BomItem").show();
                $(".zace-Bom").hide();
                var $this = $(this);
                var WName = $this.find('td[data-title=BOMName]').attr('data-value');
                mBomId = Number($this.find('td[data-title=ID]').attr('data-value'));
                $("#zace-spanTextChange").html(WName + "子项");
                if (mBomId > 0) {
                    $(".zace-zace-show").show();
                   
                    model.com.refreshAAAItem();

                } else {
                    $(".zace-zace-show").hide();
                    $(".zace-BomItem").show();
                    $(".zace-Bom").hide();
                    //DataZaItem = _plistItem;
                    $("#femi-bomItem-tbody").html($com.util.template(DataZaItem, HTML.TableBOMItemMode));
                }
               
            });

            //返回
            $("body").delegate("#zace-close-bomItem", "click", function () {
                $(".zace-BomItem").hide();
                $(".zace-Bom").show();

            });

            //新增 BOM
            $("body").delegate("#zace-add-bom", "click", function () {

                var default_value = {
                    BOMName: "",
                    BOMNo: "",
                    LineID: 0,
                    MaterialID: 0,
                    PartID: 0,
                    // Status: 0,
                    WorkShopID: 0
                };
                $("body").append($com.modal.show(default_value, KEYWORD_BOM, "新增", function (rst) {
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    var _data = {
                        BOMName: rst.BOMName,
                        BOMNo: rst.BOMNo,
                        LineID: Number(rst.LineID),
                        MaterialID: Number(rst.MaterialID),
                        PartID: Number(rst.PartID),
                        //Status: Number(rst.Status),
                        WorkShopID: Number(rst.WorkShopID),
                    };
                    var _temp = $com.util.Clone(BOMListTemp);
                    _temp.BOMName = _data.BOMName;
                    _temp.BOMNo = _data.BOMNo;
                    _temp.LineID = _data.LineID;
                    _temp.MaterialID = _data.MaterialID;
                    _temp.WorkShopID = _data.WorkShopID;
                    _temp.PartID = _data.PartID;

                    for (var i = 0; i < MaterialList.length; i++) {
                        if (_temp.MaterialID == MaterialList[i].ID) {
                            _temp.TypeID = MaterialList[i].TypeID;
                        }

                    }                  
                    model.com.postBom({
                        data: _temp
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                        boolImport = true;
                    })

                }, TypeSource_BOM));

            });
            //修改 BOM
            $("body").delegate("#zace-edit-bom", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-bom-tbody"), "ID", DATAChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                var default_value = {
                    BOMNo: SelectData[0].BOMNo,
                    BOMName: SelectData[0].BOMName,
                    // MaterialID: SelectData[0].MaterialID,
                    // WorkShopID: SelectData[0].WorkShopID,
                    // LineID: SelectData[0].LineID,
                    // PartID: SelectData[0].PartID,
                    // Status: SelectData[0].Status,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_BOM, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].BOMNo = rst.BOMNo;
                    SelectData[0].BOMName = rst.BOMName;
                    //DATA[Wid - 1].MaterialID = Number(rst.MaterialID);
                    //SelectData[0].WorkShopID = Number(rst.WorkShopID);
                    //SelectData[0].LineID = Number(rst.LineID);
                    //SelectData[0].PartID = Number(rst.PartID);
                    //SelectData[0].Status = Number(rst.Status);
                    SelectData[0].EditTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                    SelectData[0].Auditor = window.parent.User_Info.Name;
                    //for (var i = 0; i < MaterialList.length; i++) {
                    //    if (DATA[Wid - 1].MaterialID == MaterialList[i].ID) {
                    //        DATA[Wid - 1].TypeID = MaterialList[i].TypeID;
                    //    }

                    //}

                    model.com.postBom({
                        data: SelectData[0]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                        boolImport = true;
                    })

                }, TypeSource_BOM));

            });
            //删除 BOM
            $("body").delegate("#zace-delete-bom", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-bom-tbody"), "ID", DATAChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("一次只能删一个Bom主项！")
                    return;
                }
                if (!confirm("确定将其删除？")) {
                    return;
                }

                model.com.deleteBom({
                    data: SelectData[0]
                }, function (res1) {
                    var pid = SelectData[0].ID;
                    model.com.refreshDeleteBom(pid);
                })
            });
            //条件查询
            $("body").delegate("#zace-search-bom", "click", function () {
                var default_value = {
                    WorkShopID: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_BOM, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.WorkShopID = Number(rst.WorkShopID);
                    //default_value.Position = Number(rst.Position);
                    $com.table.filterByConndition($("#femi-bom-tbody"), DATAChange, default_value, "ID");

                }, TypeSource_BOM));


            });

            //模糊查询
            $("body").delegate("#femi-search-text-ledger", "change", function () {
                var $this = $(this),
					value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-bom-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-bom-tbody"), DATASearch, value, "ID");
            });
            //新增 BOMItem
            $("body").delegate("#zace-add-bomItem", "click", function () {
                var default_value = {
                    MaterialID: 0,
                    LossRatio: 0,
                    //DeviceNo: "",
                    MaterialUnit: 0,
                    MaterialUnitRatio: 0,
                    PartPointID: 0,
                    //ParentID: 0,
                    //GradeID:0,
                    // Active: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_BOMItem, "新增", function (rst) {
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    var _data = {
                        MaterialID: Number(rst.MaterialID),
                        LossRatio: Number(rst.LossRatio),
                        //DeviceNo: rst.DeviceNo,
                        MaterialUnit: Number(rst.MaterialUnit),
                        MaterialUnitRatio: Number(rst.MaterialUnitRatio),
                        PartPointID: Number(rst.PartPointID),
                        //ParentID: Number(rst.ParentID),
                        //GradeID: Number(rst.GradeID),
                    };
                    var _list = [];
                    var _temp = $com.util.Clone(BOMItemTemp);
                    _temp.MaterialID = _data.MaterialID;
                    //_temp.DeviceNo = _data.DeviceNo;
                    _temp.LossRatio = _data.LossRatio;
                    _temp.MaterialUnit = _data.MaterialUnit;
                    _temp.MaterialUnitRatio = _data.MaterialUnitRatio;
                    _temp.PartPointID = _data.PartPointID;
                    _temp.MaterialUnitRatio = _data.MaterialUnitRatio;
                    _temp.BOMID = mBomId;
                    for (var i = 0; i < MaterialList.length; i++) {
                        if (_temp.MaterialID == MaterialList[i].ID) {
                            _temp.TypeID = MaterialList[i].TypeID;
                            _temp.UnitID = MaterialList[i].CYUnitID;
                            _temp.MaterialName = MaterialList[i].MaterialName;
                            _temp.MaterialNo = MaterialList[i].MaterialNo;
                        }

                    }
                    _list.push(_temp);


                    model.com.postBomItem({
                        data: _list[0]
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                        boolImport = true;
                    })

                }, TypeSource_BOMItem));
            });
            //修改 BOMItem
            $("body").delegate("#zace-edit-bomItem", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-bomItem-tbody"), "WID", DATAITEMChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                var default_value = {
                    LossRatio: SelectData[0].LossRatio,
                    Active: SelectData[0].Active,
                    MaterialUnitRatio: SelectData[0].MaterialUnitRatio,
                    MaterialID: SelectData[0].MaterialID,
                    MaterialUnit: SelectData[0].MaterialUnit,
                    //ParentID: SelectData[0].ParentID,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_BOMItem, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].MaterialUnit = Number(rst.MaterialUnit);
                    //SelectData[0].ParentID = Number(rst.ParentID);
                    SelectData[0].LossRatio = Number(rst.LossRatio);
                    SelectData[0].Active = Number(rst.Active);
                    SelectData[0].MaterialUnitRatio = Number(rst.MaterialUnitRatio);
                    SelectData[0].EditTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                    SelectData[0].Auditor = window.parent.User_Info.Name;
                    SelectData[0].MaterialID = Number(rst.MaterialID);
                    // DATAITEM[Wid - 1].ItemList.push(DATAITEM[3]);
                    for (var i = 0; i < MaterialList.length; i++) {
                        if (SelectData[0].MaterialID == MaterialList[i].ID) {
                            SelectData[0].TypeID = MaterialList[i].TypeID;
                            SelectData[0].UnitID = MaterialList[i].CYUnitID;
                            SelectData[0].MaterialName = MaterialList[i].MaterialName;
                            SelectData[0].MaterialNo = MaterialList[i].MaterialNo;
                        }

                    }

                    model.com.postBomItem({
                        data: SelectData[0]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                        boolImport = true;
                    })

                }, TypeSource_BOMItem));
            });
            //删除 BOMItem
            $("body").delegate("#zace-delete-bomItem", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-bomItem-tbody"), "WID", DATAITEMChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其删除？")) {
                    return;
                }
                var a = 0;
                $com.app.loading();
                var WhileAdd = function () {

                    model.com.deleteBomItem({
                        data: SelectData[a],
                    }, function (res) {
                        a++;

                        if (a == SelectData.length) {
                            $com.app.loaded();        

                            model.com.refresh();
                            boolImport = true;

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
            });
            //新增子项 BOMItem  Son
            $("body").delegate("#zace-add-bomItemSon", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-bomItem-tbody"), "WID", DATAITEMChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能选择一行增加！")
                    return;
                }

                var default_value = {
                    MaterialID: 0,
                    LossRatio: 0,
                    //DeviceNo: "",
                    MaterialUnit: 0,
                    MaterialUnitRatio: 0,
                    PartPointID: 0,
                    //ParentID: 0,
                    //GradeID:0,
                    // Active: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_BOMItem, "新增", function (rst) {
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    var _data = {
                        MaterialID: Number(rst.MaterialID),
                        LossRatio: Number(rst.LossRatio),
                        //DeviceNo: rst.DeviceNo,
                        MaterialUnit: Number(rst.MaterialUnit),
                        MaterialUnitRatio: Number(rst.MaterialUnitRatio),
                        PartPointID: Number(rst.PartPointID),
                        //ParentID: Number(rst.ParentID),
                        //GradeID: Number(rst.GradeID),
                    };

                    var _temp = $com.util.Clone(BOMItemTemp);
                    _temp.MaterialID = _data.MaterialID;
                    //_temp.DeviceNo = _data.DeviceNo;
                    _temp.LossRatio = _data.LossRatio;
                    _temp.MaterialUnit = _data.MaterialUnit;
                    _temp.MaterialUnitRatio = _data.MaterialUnitRatio;
                    _temp.PartPointID = _data.PartPointID;
                    _temp.MaterialUnitRatio = _data.MaterialUnitRatio;
                    _temp.ParentID = SelectData[0].ID;
                    _temp.GradeID = SelectData[0].GradeID + 1;
                    _temp.BOMID = mBomId;
                    for (var i = 0; i < MaterialList.length; i++) {
                        if (_temp.MaterialID == MaterialList[i].ID) {
                            _temp.TypeID = MaterialList[i].TypeID;
                            _temp.UnitID = MaterialList[i].CYUnitID;
                            _temp.MaterialName = MaterialList[i].MaterialName;
                            _temp.MaterialNo = MaterialList[i].MaterialNo;
                        }

                    }

                    model.com.postBomItem({
                        data: _temp
                    }, function (res) {
                        alert("新增子项成功");
                        model.com.refresh();
                        boolImport = true;
                    })

                }, TypeSource_BOMItem));
            });
            //激活 BOMItem
            $("body").delegate("#zace-active-bomItem", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-bomItem-tbody"), "WID", DATAITEMChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                model.com.activeBomItem({
                    data: SelectData,
                    active: 1
                }, function (res1) {
                    alert("激活成功");
                    model.com.refresh();
                    boolImport = true;
                })
            });
            //禁用 BOMItem
            $("body").delegate("#zace-disable-bomItem", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-bomItem-tbody"), "WID", DATAITEMChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                //if (SelectData.length != 1) {
                //    alert("只能同时对一行数据操作！")
                //    return;
                //}

                model.com.activeBomItem({
                    data: SelectData,
                    active: 0
                }, function (res1) {
                    alert("禁用成功");
                    model.com.refresh();
                    boolImport = true;
                })
            });

            //条件查询
            $("body").delegate("#zace-search-bomItem", "click", function () {
                var default_value = {
                    ParentID: 0,
                    GradeID: 0,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_BOMItem, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.ParentID = Number(rst.ParentID);
                    default_value.GradeID = Number(rst.GradeID);
                    $com.table.filterByConndition($("#femi-bomItem-tbody"), DATAITEMChange, default_value, "WID");

                }, TypeSource_BOMItem));


            });
            //刷新
            $("body").delegate("#zace-refresh-bom", "click", function () {

                model.com.refresh();
                boolImport = true;
            });
            //导入
            $("body").delegate("#zace-import-bom", "click", function () {
                if (boolImport) {
                    $("#input-file").val("");
                    $("#input-file").click();
                } else {
                    alert("请把导入数据操作完！！！");
                    return false;
                }
               

            });
            $("body").delegate("#input-file", "change", function () {
                var $this = $(this);

                if (this.files.length == 0)
                    return;
                var fileData = this.files[0];

                var form = new FormData();
                form.append("file", fileData);

                model.com.postImportExcel(form, function (res) {
                    if (!res)
                        return;
                    var list = res.list;
                    var listInfo = res.info;

                    var _temp = $com.util.Clone(BOMListTemp);
                    _temp.BOMName = list.BOMName;
                    _temp.BOMNo = list.BOMNo;
                    _temp.LineName = list.LineName;
                    _temp.MaterialNo = list.MaterialNo;
                    _temp.PartName = list.PartName;
                    _temp.Type = list.Type;
                    _temp.WorkShop = list.WorkShop;
                  
                    var workBool=false;
                    for (var i = 0; i < DataWorkShoplist.length; i++) {
                        if (_temp.WorkShop==DataWorkShoplist[i].Name) {
                            _temp.WorkShopID = DataWorkShoplist[i].ID;
                            workBool=true;
                        }
                    }
                    if (!workBool) {
                        alert("车间名称输入有误！")
                        return false;
                    }
                    var lineBool=false;
                    for (var i = 0; i < DataLinelist.length; i++) {
                        if (_temp.LineName==DataLinelist[i].Name) {
                            _temp.LineID = DataLinelist[i].ID;
                            lineBool=true;
                        }
                    }
                    if (!lineBool) {
                        alert("产线名称输入有误！")
                        return false;
                    }

                    //var typeBool=false;
                    //for (var i = 0; i < TypeList.length; i++) {
                    //    if (_temp.Type==TypeList[i].ItemName) {
                    //        _temp.TypeID = TypeList[i].ID;
                    //        typeBool=true;
                    //    }
                    //}
                    //if (!typeBool) {
                    //    alert("类型名称输入有误！")
                    //    return false;
                    //}

                    var partBool=false;
                    for (var i = 0; i < PartList.length; i++) {
                        if (_temp.PartName==PartList[i].Name) {
                            _temp.PartID = PartList[i].ID;
                            partBool=true;
                        }
                    }
                    if (!partBool) {
                        alert("工序名称输入有误！")
                        return false;
                    }

                    var materBool=false;
                    for (var i = 0; i < MaterialList.length; i++) {
                        if (_temp.MaterialNo == MaterialList[i].MaterialNo) {
                            _temp.MaterialID = MaterialList[i].ID;
                            _temp.MaterialName = MaterialList[i].MaterialName;
                            _temp.TypeID = MaterialList[i].TypeID;
                            materBool = true;
                        }
                    }
                    if (!materBool) {
                        alert("物料号输入有误！")
                        return false;
                    }
                    //主BOM
                    DATA.push(_temp);
                    BOMTemp = _temp;
                    var _list = $com.util.Clone(DATA);
                    DATAChange = $com.util.Clone(DATA);
                    $.each(_list, function (i, item) {
                        for (var p in item) {
                            if (!FORMATTRT_BOM[p])
                                continue;
                            item[p] = FORMATTRT_BOM[p](item[p]);
                        }
                    });
                    $("#femi-bom-tbody").html($com.util.template(_list, HTML.TableBOMMode));


                    //子项
                    var _listItemz = [];
                    for (var i = 0; i < list.BOMItemList.length; i++) {
                        var _tempItema = model.com.getBomItemOne(list.BOMItemList[i]);
                        if (!_tempItema) {
                            return false;
                        }
                        if (list.BOMItemList[i].ItemList && list.BOMItemList[i].ItemList.length > 0) {
                            var dataI = list.BOMItemList[i].ItemList;
                            for (var m = 0; m < dataI.length; m++) {
                                var _tempItemb = model.com.getBomItemOne(dataI[m]);
                                if (!_tempItemb) {
                                    return false;
                                }
                                _tempItema.ItemList.push(_tempItemb);
                            }
                        }
                        _listItemz.push(_tempItema);

                        //    GradeID: 1
                        //ItemList: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
                        //LossRatio: 0.1
                        //MaterialName: "模组通用件"
                        //MaterialNo: "C0.01.00.02"
                        //MaterialUnit: 2
                        //MaterialUnitRatio: 1
                        //PartPointName: "检测电容包上料"
                        //Type: "自制"
                        //UnitName: "EA"


                    }
                    //树形结构
                    DataZZZ = $com.util.Clone(_listItemz);
                    model.com.renderTree(DataZZZ);

                    var _plistItem = [];
                    for (var i = 0; i < _listItemz.length; i++) {
                        _plistItem.push(_listItemz[i]);
                        if (_listItemz[i].ItemList && _listItemz[i].ItemList.length > 0) {
                            var zNewItem = _listItemz[i].ItemList;
                            for (var m = 0; m < zNewItem.length; m++) {
                                _plistItem.push(zNewItem[m]);


                            }
                        }
                    }
                    $.each(_plistItem, function (i, item) {
                        for (var p in item) {
                            if (!FORMATTRT_BOMItem[p])
                                continue;
                            item[p] = FORMATTRT_BOMItem[p](item[p]);
                        }
                    });                   
                    DataZaItem = _plistItem;
                    boolImport = false;
                    $("#femi-bomItem-tbody").html($com.util.template(_plistItem, HTML.TableBOMItemMode));
                });
            });
            //$("body").delegate("#areaTree li span", "click", function () {
            //    var $this = $(this);
            //    var id = Number($this.attr("data-value"));
            //    alert(id);
            //    return false;
            //});
            $("body").delegate("#zace-save-bomAll", "click", function () {
                if (BOMTemp) {
                    model.com.postBom({
                        data: BOMTemp
                    }, function (res) {
                        //alert("保存成功");
                        model.com.refreshBom();
                        
                       


                    })
                } else {
                    alert("请先导入数据！！！");
                }
               
                

            });
        },

        run: function () {

            //获取车间 产线信息
            var WWorkShopList = window.parent._WorkShop;
            var WLineList = window.parent._Line;

           
            model.com.getFPCRoutePart({ RouteID: 0 }, function (resR1) {
                if (resR1 && resR1.list) {
                    PartList = resR1.list;
                    $.each(resR1.list, function (i, item) {
                        TypeSource_BOM.PartID.push({
                            name: item.Name,
                            value: item.ID,
                        });
                    });
                }
                model.com.getFPCPartPoint({ FactoryID: 0, BusinessUnitID: 0, ProductTypeID: 0 }, function (resR2) {
                    if (resR2 && resR2.list) {
                        PartPointList = resR2.list;
                        $.each(resR2.list, function (i, item) {
                            TypeSource_BOMItem.PartPointID.push({
                                name: item.Name,
                                value: item.ID,
                            });
                        });
                    }
                });
                model.com.getMaterialList({ material_no: "", material_name: "", type_id: 0, status: 0 }, function (res) {
                    $.each(res.list, function (i, item) {
                        MaterialList = res.list;
                        TypeSource_BOM.MaterialID.push({
                            name: item.MaterialNo,
                            value: item.ID,
                            far: null
                        })
                        TypeSource_BOMItem.MaterialID = TypeSource_BOM.MaterialID;
                    });

                    model.com.getModuleAll({ module: 100003 }, function (resModule) {
                        if (resModule && resModule.list) {
                            TypeList = resModule.list;
                            $.each(resModule.list, function (i, item) {
                                TypeSource_BOM.TypeID.push({
                                    name: item.ItemName,
                                    value: item.ID,
                                    far: null
                                })
                            });
                            TypeSource_BOMItem.TypeID = TypeSource_BOM.TypeID;
                        }

                        model.com.getMeteringSettingprice({}, function (resPrice) {
                            $.each(resPrice.list, function (i, item) {
                                TypeSource_BOMItem.UnitID.push({
                                    name: item.Name,
                                    value: item.ID,
                                    far: null
                                })
                            });
                            //产线
                            DataLinelist = WLineList;
                            $.each(WLineList, function (i, item) {
                                TypeSource_BOM.LineID.push({
                                    name: item.Name,
                                    value: item.ID,
                                    far: 0
                                });
                            });

                            //车间
                            DataWorkShoplist = WWorkShopList;
                            $.each(DataWorkShoplist, function (i, item) {
                                TypeSource_BOM.WorkShopID.push({
                                    name: item.Name,
                                    value: item.ID,
                                    far: 0
                                });
                            });
                            model.com.setMMM();
                            model.com.refresh();

                        });
                    });

                });


            });




        },

        com: {
            setMMM: function () {
                setTimeout(function () {

                    if (window.parent._zaceLineSet && window.parent._zaceLineSet == 1) {
                        model.com.getFMCLine({ FactoryID: 0, BusinessUnitID: 0, WorkShopID: 0 }, function (resW) {
                            if (!resW)
                                return;
                            if (resW && resW.list) {
                                DataLinelist = resW.list;
                                //TypeSource_Level.AuditorID.splice(1, TypeSource_Level.AuditorID.length - 1);
                                TypeSource_BOM.LineID = [];
                                $.each(resW.list, function (i, item) {
                                    TypeSource_BOM.LineID.push({
                                        name: item.Name,
                                        value: item.ID,
                                        far: 0
                                    });
                                });
                            }
                            window.parent._zaceLineSet = 0;
                        });

                    }

                    if (window.parent._zaceWorkShop && window.parent._zaceWorkShop == 1) {
                        model.com.getFMCWorkShop({ FactoryID: 0, BusinessUnitID: 0 }, function (resW) {
                            if (!resW)
                                return;
                            if (resW && resW.list) {
                                DataWorkShoplist = resW.list;
                                //TypeSource_Level.AuditorID.splice(1, TypeSource_Level.AuditorID.length - 1);
                                TypeSource_BOM.WorkShopID = [];
                                $.each(DataWorkShoplist, function (i, item) {
                                    TypeSource_BOM.WorkShopID.push({
                                        name: item.Name,
                                        value: item.ID,
                                        far: 0
                                    });
                                });
                                
                            }
                            window.parent._zaceWorkShop = 0;
                        });

                    }

                    if (window.parent._zaceMaterialRecord && window.parent._zaceMaterialRecord == 1) {
                        model.com.getMaterialList({ material_no: "", material_name: "", type_id: 0, status: 0 }, function (resW) {
                            if (!resW)
                                return;
                            if (resW && resW.list) {
                                MaterialList = resW.list;
                                TypeSource_BOM.MaterialID = [];

                               //TypeSource_materialRecord.SupplierID.splice(1, TypeSource_materialRecord.SupplierID.length - 1);
                                $.each(resW.list, function (i, item) {                                  
                                   TypeSource_BOM.MaterialID.push({
                                        name: item.MaterialNo,
                                        value: item.ID,
                                        far: null
                                    })
                                    TypeSource_BOMItem.MaterialID = TypeSource_BOM.MaterialID;
                                });
                            }
                            window.parent._zaceMaterialRecord = 0;
                        });

                    }
                    if (window.parent._zacePartPointSet && window.parent._zacePartPointSet == 1) {
                        model.com.getFPCPartPoint({ FactoryID: 0, BusinessUnitID: 0, ProductTypeID: 0 }, function (resW) {
                            if (!resW)
                                return;
                            if (resW && resW.list) {
                                PartPointList = resW.list;
                                //TypeSource_Level.AuditorID.splice(1, TypeSource_Level.AuditorID.length - 1);
                                TypeSource_BOMItem.PartPointID = [];
                                TypeSource_BOMItem.PartPointID.push({
                                    name: item.Name,
                                    value: item.ID,
                                });
                            }
                            window.parent._zacePartPointSet = 0;
                        });

                    }
                    if (window.parent._zaceRoutePartSet && window.parent._zaceRoutePartSet == 1) {
                        model.com.getFPCRoutePart({ RouteID: 0 }, function (resR1) {
                            if (!resR1)
                                return;
                            if (resR1 && resR1.list) {
                                //TypeSource_Level.AuditorID.splice(1, TypeSource_Level.AuditorID.length - 1);
                                TypeSource_BOM.PartID = [];
                                PartList = resR1.list;
                                $.each(resR1.list, function (i, item) {
                                    TypeSource_BOM.PartID.push({
                                        name: item.Name,
                                        value: item.ID,
                                    });
                                });
                            }
                            window.parent._zaceRoutePartSet = 0;
                        });

                    }

                    model.com.setMMM();
                }, 500);

            },
            refresh: function () {
                // bom_no:{String} , bom_name:{String} ,workshop_id:{int} ,type_id:{int} ,status:{int}
                model.com.getBomList({ bom_no: "", bom_name: "", workshop_id: 0, type_id: 0, status: 0 }, function (resBom) {
                    if (resBom && resBom.list) {

                        var _list = $com.util.Clone(resBom.list);

                        DATA = $com.util.Clone(resBom.list);


                        DATAChange = $com.util.Clone(_list);

                        $.each(_list, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_BOM[p])
                                    continue;
                                item[p] = FORMATTRT_BOM[p](item[p]);
                            }
                        });
                        DATASearch = $com.util.Clone(_list);

                        $("#femi-bom-tbody").html($com.util.template(_list, HTML.TableBOMMode));
                    }
                });



                model.com.getBomItemList({ bom_id: mBomId, IsList: true }, function (resBomItem) {
                    //bom_id:{int} 
                    if (resBomItem && resBomItem.list) {

                        var ItemList = $com.util.Clone(resBomItem.list);

                        DATAITEM = $com.util.Clone(resBomItem.list);
                        for (var i = 0; i < ItemList.length; i++) {
                            ItemList[i].WID = i + 1;
                        }
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
                model.com.getBomItemList({ bom_id: mBomId, IsList: false }, function (resBomItem1) {
                    //bom_id:{int} 
                    if (resBomItem1 && resBomItem1.list) {
                        TreeList = $com.util.Clone(resBomItem1.list);
                        var ItemList = $com.util.Clone(resBomItem1.list);
                        model.com.renderTree(ItemList);
                    }
                });



            },
            refreshAAAItem: function () {
                model.com.getBomItemList({ bom_id: mBomId, IsList: true }, function (resBomItem) {
                    //bom_id:{int} 
                    if (resBomItem && resBomItem.list) {

                        var ItemList = $com.util.Clone(resBomItem.list);

                        DATAITEM = $com.util.Clone(resBomItem.list);
                        for (var i = 0; i < ItemList.length; i++) {
                            ItemList[i].WID = i + 1;
                        }
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
                model.com.getBomItemList({ bom_id: mBomId, IsList: false }, function (resBomItem1) {
                    //bom_id:{int} 
                    if (resBomItem1 && resBomItem1.list) {
                        TreeList = $com.util.Clone(resBomItem1.list);
                        var ItemList = $com.util.Clone(resBomItem1.list);
                        model.com.renderTree(ItemList);
                    }
                });
            },
            refreshBom: function () {
                // bom_no:{String} , bom_name:{String} ,workshop_id:{int} ,type_id:{int} ,status:{int}
                model.com.getBomList({ bom_no: "", bom_name: "", workshop_id: 0, type_id: 0, status: 0 }, function (resBom) {
                    if (resBom && resBom.list) {
                        var _list = $com.util.Clone(resBom.list);
                        DATA = $com.util.Clone(resBom.list);
                        DATAChange = $com.util.Clone(_list);

                        var WBid = DATAChange[DATAChange.length - 1].ID;
                        for (var i = 0; i < DataZZZ.length; i++) {
                            DataZZZ[i].BOMID = WBid;
                        }

                        //导入层级为1的数据
                        var a = 0;

                        $com.app.loading();
                        var WhileAdd = function () {

                            model.com.postBomItem({
                                data: DataZZZ[a],
                            }, function (res) {
                                a++;

                                if (a == DataZZZ.length) {
                                   // $com.app.loaded();        
                                    mBomId = WBid;
                                    model.com.refreshBomItem();
                                  
                                } else {
                                    WhileAdd();
                                }
                            });

                        }
                        if (DataZZZ.length <= 0) {
                            alert("导入数据为空！！！");
                        } else {
                            WhileAdd();
                        }
                       
                    }
                });
            },
            refreshBomItem: function () {
                            
                model.com.getBomItemList({ bom_id: mBomId, IsList: false }, function (resBomItem1) {
                    //bom_id:{int} 
                    if (resBomItem1 && resBomItem1.list) {
                        TreeList = $com.util.Clone(resBomItem1.list);
                        
                        //层级为2所有数据
                        var _listBomItemAll = [];
                        for (var m = 0; m < TreeList.length; m++) {
                            if (DataZZZ[m].ItemList && DataZZZ[m].ItemList.length > 0) {

                                for (var n = 0; n < DataZZZ[m].ItemList.length; n++) {
                                    DataZZZ[m].ItemList[n].ParentID = TreeList[m].ID;
                                    DataZZZ[m].ItemList[n].BOMID = mBomId;
                                    _listBomItemAll.push(DataZZZ[m].ItemList[n]);


                                }
                            }
                        }

                        var p = 0;

                        //$com.app.loading();
                        var WhileAddz = function () {

                            model.com.postBomItem({
                                data: _listBomItemAll[p],
                            }, function (res) {
                                p++;

                                if (p == _listBomItemAll.length) {
                                    $com.app.loaded();

                                    alert("导入成功");
                                    model.com.refresh();
                                    boolImport = true;
                                } else {
                                    WhileAddz();
                                }
                            });

                        }
                        if (_listBomItemAll.length <= 0) {
                            alert("导入数据为空！！！");
                        } else {
                            WhileAddz();
                        }
                        
                    }
                });



            },
            refreshDeleteBom: function (id) {
                model.com.getBomItemList({ bom_id: id, IsList: true }, function (resBomItem) {
                    //bom_id:{int} 
                    if (resBomItem && resBomItem.list) {

                        var ItemList = $com.util.Clone(resBomItem.list);

                        if (ItemList.length>0) {
                            var a = 0;

                            $com.app.loading();
                            var WhileAdd = function () {

                                model.com.deleteBomItem({
                                    data: ItemList[a],
                                }, function (res) {
                                    a++;

                                    if (a == ItemList.length) {
                                        $com.app.loaded();

                                        model.com.refresh();
                                        boolImport = true;

                                    } else {
                                        WhileAdd();
                                    }
                                });

                            }
                            if (ItemList.length <= 0) {
                                alert("删除数据为空！！！");
                            } else {
                                WhileAdd();
                            }
                        } else {
                            model.com.refresh();
                            boolImport = true;
                        }
                      

                      
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

                    model.com.fullItems(item.ItemList);

                    item.Items = $com.util.template(item.ItemList, HTML.TreeItemNode);


                });
            },

            //单位
            getMeteringSettingprice: function (data, fn, context) {
                var d = {
                    $URI: "/Unit/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询产品路线工序段
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
            //查询工序
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
            //导入
            postImportExcel: function (data, fn, context) {
                var d = {
                    $URI: "/Upload/ImportBomExcel",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax_load(data ? $.extend(data, d) : $.extend(d, data), fn, err, context);
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
            //获取bom列表
            getBomList: function (data, fn, context) {
                var d = {
                    $URI: "/Bom/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //获取物料号列表
            getMaterialList: function (data, fn, context) {
                var d = {
                    $URI: "/Material/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //获取bom
            getBom: function (data, fn, context) {
                var d = {
                    $URI: "/Bom/Info",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //更新/新增bom
            postBom: function (data, fn, context) {
                var d = {
                    $URI: "/Bom/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //删除bom
            deleteBom: function (data, fn, context) {
                var d = {
                    $URI: "/Bom/Delete",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },


            //获取BOM子项列表
            getBomItemList: function (data, fn, context) {
                var d = {
                    $URI: "/BomItem/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //获取BOM子项
            getBomItem: function (data, fn, context) {
                var d = {
                    $URI: "/BomItem/Info",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //Update 新增
            postBomItem: function (data, fn, context) {
                var d = {
                    $URI: "/BomItem/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //删除
            deleteBomItem: function (data, fn, context) {
                var d = {
                    $URI: "/BomItem/Delete",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //激活
            activeBomItem: function (data, fn, context) {
                var d = {
                    $URI: "/BomItem/Active",
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
            //bom
            createPart: function () {
                var _list = [];
                var _temp = $com.util.Clone(BOMListTemp);
                _list.push(_temp);

                return _list;
            },
            //bomItem
            createPart1: function () {
                var _list = [];
                var _temp = $com.util.Clone(BOMItemTemp);
                _list.push(_temp);

                return _list;
            },
            getBomItemOne: function (data) {
                var _tempItema = $com.util.Clone(BOMItemTemp);
                _tempItema.GradeID = data.GradeID;
                _tempItema.LossRatio = data.LossRatio;
                _tempItema.MaterialNo = data.MaterialNo;
                //_tempItema.MaterialName = listInfo.BOMItemList[i].MaterialName;
                _tempItema.MaterialUnit = data.MaterialUnit;
                _tempItema.MaterialUnitRatio = data.MaterialUnitRatio;
                _tempItema.PartPointName = data.PartPointName;
                _tempItema.Type = data.Type;
                _tempItema.UnitName = data.UnitName;
                _tempItema.ItemList =[];
                var partPointBool = false;
                for (var i = 0; i < PartPointList.length; i++) {
                    if (_tempItema.PartPointName == PartPointList[i].Name) {
                        _tempItema.PartPointID = PartPointList[i].ID;
                        partPointBool = true;
                    }
                }
                if (!partPointBool) {
                    alert("工步名称输入有误！")
                    return false;
                }

                var materItemBool = false;
                for (var i = 0; i < MaterialList.length; i++) {
                    if (_tempItema.MaterialNo == MaterialList[i].MaterialNo) {
                        _tempItema.MaterialID = MaterialList[i].ID;
                        _tempItema.MaterialName = MaterialList[i].MaterialName;
                        _tempItema.TypeID = MaterialList[i].TypeID;
                        _tempItema.UnitID = MaterialList[i].CYUnitID;
                        materItemBool = true;
                    }
                }
                if (!materItemBool) {
                    alert("子项物料号输入有误！")
                    return false;
                }

                return _tempItema;

            },
        }
    });

    model.init();


});