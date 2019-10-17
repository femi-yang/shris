﻿require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($yang, $com) {
    var
     KEYWORD_Device_LIST_Regular,
    KEYWORD_Device_Regular,
    FORMATTRT_Device_Regular,
    DEFAULT_VALUE_Device_Regular,
    TypeSource_Device_Regular,


    KEYWORD_Device_LIST_time,
    KEYWORD_Device_time,
    FORMATTRT_Device_time,
    DEFAULT_VALUE_Device_time,
    TypeSource_Device_time,

    BJBYRule,
    DataBasic,
    BYTyperule,
    mID,
    DataAll,
    model,
    item,
    HTML;
    mID = 0;

    ItemTemp_SH = {
        CycleRatioList: [],
        PartsRatioList: [],
    };

    TimeTemp = {
        LeftTimes: 0,
        RightTimes: 0,
        Ratio: 0,
    };

    HTML = {

        TableNode_Regular: [
              '<tr>',
              '<td style="width: 3px"><input type="checkbox"',
          'class="femi-tb-checkbox" style="margin: 1px 0px 1px"/></td> ',
         '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}">{{ID}}</td>',
        '<td style="min-width: 50px" data-title="Name" data-value="{{Name}}">{{Name}}</td>',
        '<td style="min-width: 50px" data-title="FactoryID" data-value="{{FactoryID}}">{{FactoryID}}</td>',
        '<td style="min-width: 50px" data-title="BusinessUnitID" data-value="{{BusinessUnitID}}">{{BusinessUnitID}}</td>',
        '<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}">{{WorkShopID}}</td>',
        '<td style="min-width: 50px" data-title="LineID" data-value="{{LineID}}">{{LineID}}</td>',
        '<td style="min-width: 50px" data-title="ModelID" data-value="{{ModelID}}">{{ModelID}}</td>',
        '<td style="min-width: 50px" data-title="TypeID" data-value="{{TypeID}}">{{TypeID}}</td>',
	    '<td style="min-width: 50px" data-title="PDTimeC" data-value="{{PDTimeC}}">{{PDTimeC}}</td>',
	    '<td style="min-width: 50px" data-title="PDNumC" data-value="{{PDNumC}}">{{PDNumC}}</td>',
//	    '<td style="min-width: 50px" data-title="CycleRatioList" data-value="{{CycleRatioList}}">{{CycleRatioList}}</td>',
//	    '<td style="min-width: 50px" data-title="PartsRatioList" data-value="{{PartsRatioList}}">{{PartsRatioList}}</td>',
	    '<td style="min-width: 50px" data-title="ModeOptions" data-value="{{ModeOptions}}">{{ModeOptions}}</td>',
	    '<td style="min-width: 50px" data-title="Comment" data-value="{{Comment}}">{{Comment}}</td>',
	    '<td style="min-width: 50px" data-title="OperatorID" data-value="{{OperatorID}}">{{OperatorID}}</td>',
	    '<td style="min-width: 50px" data-title="OperatorTime" data-value="{{OperatorTime}}">{{OperatorTime}}</td>',
	    '<td style="min-width: 50px" data-title="EditorID" data-value="{{EditorID}}">{{EditorID}}</td>',
	    '<td style="min-width: 50px" data-title="EditTime" data-value="{{EditTime}}">{{EditTime}}</td>',
	    '<td style="min-width: 50px" data-title="Active" data-value="{{Active}}">{{Active}}</td>',
            //'<td style="min-width: 50px" data-title="BaseID " data-value="{{BaseID }}">{{BaseID }}</td>',
          '</tr>',
        ].join(""),

        TableNode_time: [
            '<tr>',
            '<td style="width: 3px"><input type="checkbox"',
		    'class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td> ',
	        '<td style="min-width: 50px" data-title="LeftTimes" data-value="{{LeftTimes}}">{{LeftTimes}}</td>',
            '<td style="min-width: 50px" data-title="RightTimes" data-value="{{RightTimes}}">{{RightTimes}}</td>',
            '<td style="min-width: 50px" data-title="Ratio" data-value="{{Ratio}}" >{{Ratio}}</td>',
			'</tr>',
        ].join(""),
    }


    $(function () {
        KEYWORD_Device_LIST_Regular = [
         "ID|序号",
         "Name|名称",
         "FactoryID|工厂|ArrayOne",
         "BusinessUnitID|部门|ArrayOne",
         "WorkShopID|车间|ArrayOne",
         "LineID|产线|ArrayOne",
         "ModelID|备件型号|ArrayOneControl",
         "TypeID|模板|ArrayOneControl|ModelID",
         "PDTimeC|加工周期",
         "PDNumC|加工个数",
         "ModeOptions|模式列表|Array",
         "Comment|备注",
         "Times|次数",
         "CycleRatioList|周期倍率",
         "PartsRatioList|加工个数倍率",
         "OperatorID|录入人|ArrayOne",
         "OperatorTime|录入时间|DateTime",
         "EditorID|修改人|ArrayOne",
         "EditTime|修改时间|DateTime",
         "Active|状态|ArrayOne",
         //"BaseID|基地",
        ];
        KEYWORD_Device_Regular = {};
        FORMATTRT_Device_Regular = {};
        DEFAULT_VALUE_Device_Regular = {
            Name: "",
            TypeID: 0,
            ModelID: 0,
            PDTimeC: 0,
            PDNumC: 0,
            ModeOptions: [],
            Comment: "",
            Active: 0,
            BusinessUnitID: 0,
            //FactoryID: 0,
            WorkShopID: 0,
            LineID: 0,
        };
        TypeSource_Device_Regular = {
            ModeOptions: [{
                name: "开机保养",
                value: 1
            }, {
                name: "周期保养",
                value: 2
            }, {
                name: "加工次数保养",
                value: 3
            }, {
                name: "关机前保养",
                value: 4
            }],
            Active: [{
                name: "激活",
                value: 1
            }, {
                name: "禁用",
                value: 0
            }],
            ModelID: [{
                name: "无",
                value: 0
            }],
            TypeID: [{
                name: "无",
                value: 0
            }],
            EditorID: [{
                name: "无",
                value: 0
            }],
            OperatorID: [{
                name: "无",
                value: 0
            }],
            BusinessUnitID: [{
                name: "无",
                value: 0
            }],
            FactoryID: [{
                name: "无",
                value: 0
            }],
            WorkShopID: [{
                name: "无",
                value: 0
            }],
            LineID: [{
                name: "无",
                value: 0
            }]
        };


        $.each(KEYWORD_Device_LIST_Regular, function (i, item) {
            var detail = item.split("|");
            KEYWORD_Device_Regular[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_Device_Regular[detail[0]] = $com.util.getFormatter(TypeSource_Device_Regular, detail[0], detail[2]);
            }
        });
    });

    $(function () {
        KEYWORD_Device_LIST_RegularG = [
        "ID|序号|Readonly",
         "Name|名称|Readonly",
         "FactoryID|工厂|Readonly",
         "BusinessUnitID|部门|Readonly",
         "WorkShopID|车间|Readonly",
         "LineID|产线|Readonly",
          "ModelID|设备型号|Readonly",
         "TypeID|模板|Readonly",
         "PDTimeC|加工周期|Readonly",
         "PDNumC|加工个数|Readonly",
         "ModeOptions|模式列表|Readonly",
         "Comment|备注|Readonly",
         "CycleRatioList|周期倍率|Readonly",
         "PartsRatioList|加工个数倍率|Readonly",
         "OperatorID|录入人|Readonly",
         "OperatorTime|录入时间|Readonly",
         "EditorID|修改人|Readonly",
         "EditTime|修改时间|Readonly",
         "Active|状态|Readonly",
         //"BaseID|基地|Readonly",
        ];
        KEYWORD_Device_RegularG = {};
        FORMATTRT_Device_RegularG = {};
        DEFAULT_VALUE_Device_RegularG = {};
        TypeSource_Device_RegularG = {};


        $.each(KEYWORD_Device_LIST_RegularG, function (i, item) {
            var detail = item.split("|");
            KEYWORD_Device_RegularG[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_Device_RegularG[detail[0]] = $com.util.getFormatter(TypeSource_Device_RegularG, detail[0], detail[2]);
            }
        });
    });

    $(function () {
        KEYWORD_Device_LIST_time = [
         "LeftTimes|左次数范围",
         "RightTimes|右次数范围",
         "Ratio|比率",
        ];
        KEYWORD_Device_time = {};
        FORMATTRT_Device_time = {};
        DEFAULT_VALUE_Device_time = {
            LeftTimes: 0,
            RightTimes: 0,
            Ratio: 0,
        };

        TypeSource_Device_time = {};


        $.each(KEYWORD_Device_LIST_time, function (x, item) {
            var detail = item.split("|");
            KEYWORD_Device_time[detail[0]] = {
                index: x,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_Device_time[detail[0]] = $com.util.getFormatter(TypeSource_Device_time, detail[0], detail[2]);
            }
        });
    });
    model = $com.Model.create({
        name: '设备保养',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {

            //设备保养新增(保养规则)
            $("body").delegate("#zace-add-Device-Regular", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_Device_Regular, KEYWORD_Device_Regular, "新增", function (rst) {
                    //调用插入函数 

                    var RuleTemp = {
                        ID: 0,
                        Name: rst.Name,
                        TypeID: Number(rst.TypeID),
                        ModelID: Number(rst.ModelID),
                        PDTimeC: Number(rst.PDTimeC),
                        PDNumC: Number(rst.PDNumC),
                        CycleRatioList: [],
                        PartsRatioList: [],
                        ModeOptions: [],
                        Comment: rst.Comment,
                        Times: 0,
                        OperatorID: 0,
                        OperatorTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
                        EditorID: 0,
                        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
                        Active: Number(rst.Active),
                        DSType: 2,
                        BusinessUnitID: Number(rst.BusinessUnitID),
                        FactoryID: 1,
                        WorkShopID: Number(rst.WorkShopID),
                        LineID: Number(rst.LineID),
                        BaseID: 0,
                    };

                    RuleTemp.ModeOptions = [];
                    for (var i = 0; i < rst.ModeOptions.length; i++) {
                        RuleTemp.ModeOptions.push(Number(rst.ModeOptions[i]));
                    }
                    if (RuleTemp.ModeOptions.length == 0) {
                        alert("保养模式列表不能为空，请选择保养模式列表！");
                        return false;
                    }
                    for (var i = 0; i < BJBYRule.length; i++) {
                        for (var j = 0; j < BYTyperule.length; j++) {
                            if (BJBYRule[i].Name == rst.Name && BYTyperule[j].ID == Number(rst.TypeID)) {
                                alert("保养规则重复！");
                                return false;
                            }
                        }
                    }


                    model.com.postDeviceMaintainRule({
                        data: RuleTemp
                    }, function (res) {
                        model.com.refresh();
                        alert("新增成功");

                    })

                }, TypeSource_Device_Regular));


            });

            //        //设备保养删除(保养规则)
            //          $("body").delegate("#zace-delete-Device-Regular", "click", function () {
            //
            //              var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-Regular"), "ID", resRegularList);
            //
            //              if (!SelectData || !SelectData.length) {
            //                  alert("请先选择至少一行数据再试！")
            //                  return;
            //              }
            //              var list1 = model.com.getNewList(resRegularList, SelectData);
            //
            //              model.com.postDeviceRegular({
            //                  data: list1,
            //              }, function (res) {
            //                  alert("删除成功");
            //                  model.com.refresh();
            //                  $("#femi-Device-tbody-Regular").html($com.util.template(list1, HTML.TableAptitudeItemNode_Regular));
            //              })
            //
            //          });

            //设备保养激活(规则表)
            $("body").delegate("#zace-active-Device-Regular", "click", function () {

                // var SelectData = $('.tb_users').bootstrapTable('getSelections');
                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-Regular"), "ID", DATABasic);

                if (!SelectData || !SelectData.length) {
                    alert("至少选择一行数据！")
                    return;
                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其激活？")) {
                    return;
                }
                model.com.postActive({
                    data: SelectData,
                    Active: 1
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();
                })
            });

            //          //设备保养禁用(规则表)           
            $("body").delegate("#zace-remove-Device-Regular", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-Regular"), "ID", DATABasic);

                if (!SelectData || !SelectData.length) {
                    alert("至少选择一行数据！")
                    return;
                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其禁用？")) {
                    return;
                }
                model.com.postActive({
                    data: SelectData,
                    Active: 0
                }, function (res) {
                    alert("禁用成功");
                    model.com.refresh();
                })
            });

            //设备保养修改(保养规则)
            $("body").delegate("#zace-edit-Device-Regular", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-Regular"), "ID", DATABasic);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                var default_valueFive = {
                    Name: SelectData[0].Name,
                    ModelID: SelectData[0].ModelID,
                    TypeID: SelectData[0].TypeID,
                    Comment: SelectData[0].Comment,
                    PDTimeC: SelectData[0].PDTimeC,
                    PDNumC: SelectData[0].PDNumC,
                    ModeOptions: SelectData[0].ModeOptions,
                    //Active: SelectData[0].Active,
                    BusinessUnitID: SelectData[0].BusinessUnitID,
                    FactoryID: SelectData[0].FactoryID,
                    WorkShopID: SelectData[0].WorkShopID,
                    LineID: SelectData[0].LineID,
                };
                $("body").append($com.modal.show(default_valueFive, KEYWORD_Device_Regular, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].Name = rst.Name;
                    SelectData[0].ModelID = rst.ModelID;
                    SelectData[0].TypeID = Number(rst.TypeID);
                    SelectData[0].PDTimeC = Number(rst.PDTimeC);
                    SelectData[0].PDNumC = Number(rst.PDNumC);
                    SelectData[0].ModeOptions = rst.ModeOptions;
                    SelectData[0].Comment = rst.Comment;
                    //SelectData[0].Active = Number(rst.Active);
                    SelectData[0].BusinessUnitID = Number(rst.BusinessUnitID);
                    SelectData[0].FactoryID = Number(rst.FactoryID);
                    SelectData[0].WorkShopID = Number(rst.WorkShopID);
                    SelectData[0].LineID = Number(rst.LineID);
                    var _list = [];
                    for (var i = 0; i < BJBYRule.length; i++) {
                        if (SelectData[0].ID != BJBYRule[i].ID) {
                            _list.push(BJBYRule[i]);
                        }
                    }

                    for (var j = 0; j < _list.length; j++) {
                        if (_list[j].Name == rst.Name && _list[j].TypeID == Number(rst.TypeID)) {
                            alert("保养计划重复！");
                            return false;
                        }
                    }
                    //for (var k = 0; k < _list.length; k++) {
                    //    if (_list[k].ModelID == rst.ModelID && _list[k].TypeID == Number(rst.TypeID)) {
                    //        alert("保养模板重复！");
                    //        return false;
                    //    }
                    //}
                    model.com.postDeviceMaintainRule({
                        data: SelectData[0]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                    })

                }, TypeSource_Device_Regular));


            });


            //设备保养(保养规则表)模糊查询
            $("body").delegate("#zace-search-Device-Regular", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-Device-tbody-Regular").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-Device-tbody-Regular"), DataAll, value, "ID");
            });

            //设备保养导出(规则表)
            $("body").delegate("#zace-export-Device-Regular", "click", function () {
                var $table = $(".table-part"),
                     fileName = "设备保养规则表.xls",
                     Title = "设备保养规则表";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });

            });


            $("body").delegate("#cby-edit-XQ", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-Regular"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }

                $(".zzza").css("margin-right", "350px");
                $(".zzzb").css("width", "350px");
                $(".zzzb").show();
                $(".zzzc").hide();

                var default_value = {
                    ID: SelectData[0].ID,
                    Name: SelectData[0].Name,
                    TypeID: SelectData[0].TypeID,
                    ModelID: SelectData[0].ModelID,
                    Comment: SelectData[0].Comment,
                    PDTimeC: SelectData[0].PDTimeC,
                    PDNumC: SelectData[0].PDNumC,
                    ModeOptions: SelectData[0].ModeOptions,
                    //CycleRatioList: SelectData[0].CycleRatioList,
                    //PartsRatioList: SelectData[0].PartsRatioList,
                    OperatorID: SelectData[0].OperatorID,
                    OperatorTime: SelectData[0].OperatorTime,
                    EditorID: SelectData[0].EditorID,
                    EditTime: SelectData[0].EditTime,
                    Active: SelectData[0].Active,
                    BusinessUnitID: SelectData[0].BusinessUnitID,
                    FactoryID: SelectData[0].FactoryID,
                    WorkShopID: SelectData[0].WorkShopID,
                    LineID: SelectData[0].LineID,
                };
                $("body").append($com.propertyGrid.show($(".Typetable"), default_value, KEYWORD_Device_RegularG, TypeSource_Device_RegularG));

            });
            $("body").delegate("#cby-edit-ledger", "click", function () {

                $(".zzza").css("margin-right", "0px");
                $(".zzzb").hide();
                $(".zzzc").hide();
                $(".zzzb").width("0px");
            })

            $("body").delegate("#zace-type-search-Regular", "click", function () {
                var vdata = { 'header': '备件保养模板', 'href': './device_manage/deviceMaintain-type-bj.html', 'id': 'DeviceMaintenance-type-bj', 'src': './static/images/menu/deviceManage/sparePartMaintainType.png' };
                window.parent.iframeHeaderSet(vdata);
            });



            //维修配置
            $("body").delegate("#zace-WX-Device-Regular", "click", function () {
                var vdata = { 'header': '设备维修配置', 'href': './device_manage/deviceRepair-rule.html', 'id': 'DeviceRepair-rule', 'src': './static/images/menu/deviceManage/deviceRepair.png' };
                window.parent.iframeHeaderSet(vdata);
            });
            //点检配置
            $("body").delegate("#zace-DJ-Device-Regular", "click", function () {
                var vdata = { 'header': '设备点检配置', 'href': './device_manage/devicePointCheck-rule.html', 'id': 'DevicePointCheck', 'src': './static/images/menu/deviceManage/deviceMaintainSet.png' };
                window.parent.iframeHeaderSet(vdata);
            });

            //保养配置
            $("body").delegate("#zace-BY-Device-Regular", "click", function () {
                var vdata = { 'header': '设备保养配置', 'href': './device_manage/deviceMaintain-rule.html', 'id': 'DeviceMaintenance', 'src': './static/images/menu/deviceManage/deviceMaintainSet.png' };
                window.parent.iframeHeaderSet(vdata);
            });

            //备件维修配置
            $("body").delegate("#zace-BJWX-Device-Regular", "click", function () {
                var vdata = { 'header': '备件维修配置', 'href': './device_manage/deviceRepair-rule-bj.html', 'id': 'DeviceRepair-rule-bj', 'src': './static/images/menu/deviceManage/deviceRepair.png' };
                window.parent.iframeHeaderSet(vdata);
            });

            //设备保养规则到加工个数倍率         
            $("body").delegate("#zace-edit-Device-JG", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-Regular"), "ID", DATABasic);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                DataSH = $com.util.Clone(SelectData[0].PartsRatioList);
                $("#femi-Device-tbody-time").html($com.util.template(DataSH, HTML.TableNode_time));
                mID = SelectData[0].ID;
                $("body").delegate("#zace-Device-addsh", "click", function () {

                    $("body").append($com.modal.show(DEFAULT_VALUE_Device_time, KEYWORD_Device_time, "新增", function (rst) {
                        //调用插入函数 

                        if (!rst || $.isEmptyObject(rst))
                            return;
                        TimeTemp.LeftTimes = Number(rst.LeftTimes);
                        TimeTemp.RightTimes = Number(rst.RightTimes);
                        TimeTemp.Ratio = Number(rst.Ratio);

                        SelectData[0].CycleRatioList.push(TimeTemp);
                        SelectData[0].PartsRatioList.push(TimeTemp);

                        model.com.postDeviceMaintainRule({
                            data: SelectData[0]
                        }, function (res) {
                            model.com.refresh();
                            alert("新增成功");

                        })

                    }, TypeSource_Device_time));


                });

                $(".zzza").css("margin-right", "400px");
                $(".zzzb").hide();
                $(".zzzc").show();
                $(".zzzc").width("400px");
                $("#Sub-Tb-title").html("加工个数倍率");
            });

            //设备保养规则到周期倍率         
            $("body").delegate("#zace-add-Device-ZQ", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-Regular"), "ID", DATABasic);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                DataSH = $com.util.Clone(SelectData[0].CycleRatioList);
                $("#femi-Device-tbody-time").html($com.util.template(DataSH, HTML.TableNode_time));
                mID = SelectData[0].ID;
                $("body").delegate("#zace-Device-addsh", "click", function () {

                    $("body").append($com.modal.show(DEFAULT_VALUE_Device_time, KEYWORD_Device_time, "新增", function (rst) {
                        //调用插入函数 

                        if (!rst || $.isEmptyObject(rst))
                            return;
                        TimeTemp.LeftTimes = Number(rst.LeftTimes);
                        TimeTemp.RightTimes = Number(rst.RightTimes);
                        TimeTemp.Ratio = Number(rst.Ratio);

                        SelectData[0].CycleRatioList.push(TimeTemp);
                        SelectData[0].PartsRatioList.push(TimeTemp);

                        model.com.postDeviceMaintainRule({
                            data: SelectData[0]
                        }, function (res) {
                            model.com.refresh();
                            alert("新增成功");

                        })

                    }, TypeSource_Device_time));


                });

                $(".zzza").css("margin-right", "400px");
                $(".zzzc").show();
                $(".zzzb").hide();
                $(".zzzc").width("400px");
                $("#Sub-Tb-title").html("周期倍率");
            });


            //倍率隐藏
            $("body").delegate("#zace-Device-yinc", "click", function () {
                $(".zzza").css("margin-right", "0px");
                $(".zzzb").hide();
                $(".zzzc").hide();
                $(".zzzb").width("0px");
                $(".zzzc").width("0px");
            })


        },





        run: function () {
            var wUser = window.parent._UserAll;
            var wBusiness = window.parent._Business;
            var wFactory = window.parent._Factory;
            var wWorkShop = window.parent._WorkShop;
            var wLine = window.parent._Line;
            BYTyperule = [];
            model.com.getDeviceMaintainType({ ModelID: -1, Name: "", DSType: 2, Active: -1, StartTime: "2019-04-10 15:38:29", EndTime: "2029-05-10 15:38:29", BusinessUnitID: 0, BaseID: 0, FactoryID: 0, WorkShopID: 0, LineID: 0 }, function (res1) {
                BYTyperule = res1.list;
                $.each(res1.list, function (i, item) {
                    TypeSource_Device_Regular.TypeID.push({
                        name: item.Name,
                        value: item.ID,
                        far: item.ModelID
                    })
                });
                $.each(wUser, function (i, item) {
                    TypeSource_Device_Regular.OperatorID.push({
                        name: item.Name,
                        value: item.ID,
                        far: null
                    })
                });
                
                $.each(wUser, function (i, item) {
                    TypeSource_Device_Regular.EditorID.push({
                        name: item.Name,
                        value: item.ID,
                        far: null
                    })
                });

                    model.com.getSpareModel({ SpareWorkType: 0, SupplierID: 0, ModelPropertyID: 0, Active: -1, SupplierModelNo: "", StartTime: "2019-02-10 15:38:29", EndTime: "2029-05-10 15:38:29" }, function (res1) {
                        //if (!res1)
                        //return;
                        $.each(res1.list, function (i, item) {

                            TypeSource_Device_Regular.ModelID.push({
                                name: item.ModelNo,
                                value: item.ID,
                                far: null
                            })
                        });
                        $.each(wBusiness, function (i, item) {
                            TypeSource_Device_Regular.BusinessUnitID.push({
                                name: item.Name,
                                value: item.ID,
                                far: null
                            })
                        });

                        $.each(wWorkShop, function (i, item) {
                            TypeSource_Device_Regular.WorkShopID.push({
                                name: item.Name,
                                value: item.ID,
                                far: null
                            })
                        });
                        $.each(wLine, function (i, item) {
                            TypeSource_Device_Regular.LineID.push({
                                name: item.Name,
                                value: item.ID,
                                far: null
                            })
                        });

                        $.each(wFactory, function (i, item) {
                            TypeSource_Device_Regular.FactoryID.push({
                                name: item.Name,
                                value: item.ID,
                                far: null
                            })
                        });
                        model.com.refresh();
                        model.com.setType();
                    });
                });
        },

        com: {
            refresh: function () {

                model.com.getDeviceMaintainRule({ ModelID: -1, Name: "", TypeID: 0, DSType: 2, Active: -1, BusinessUnitID: 0, BaseID: 0, FactoryID: 0, WorkShopID: 0, LineID: 0 }, function (resRule) {
                    if (!resRule)
                        return;
                    if (resRule && resRule.list) {
                        var Rule = $com.util.Clone(resRule.list);
                        BJBYRule = $com.util.Clone(resRule.list);
                        DATABasic = $com.util.Clone(resRule.list);

                        $.each(Rule, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Device_Regular[p])
                                    continue;
                                item[p] = FORMATTRT_Device_Regular[p](item[p]);
                            }
                        });
                        DataAll = $com.util.Clone(Rule);
                        $("#femi-Device-tbody-Regular").html($com.util.template(Rule, HTML.TableNode_Regular));

                        if (mID > 0) {
                            var Dlist = [];
                            for (var i = 0; i < DATABasic.length; i++) {
                                if (mID == DATABasic[i].ID) {
                                    Dlist.push(DATABasic[i]);
                                    break;
                                }
                            }
                            $("#femi-Device-tbody-time").html($com.util.template(Dlist[0].CycleRatioList, HTML.TableNode_time));
                            $("#femi-Device-tbody-time").html($com.util.template(Dlist[0].PartsRatioList, HTML.TableNode_time));
                        }


                    }

                });
            },
            setType: function () {
                setTimeout(function () {
                    if (window.parent.BJBY_Type == 1) {
                        model.com.getDeviceMaintainType({ ModelID: -1, Name: "", DSType: 2, Active: -1, StartTime: "2019-04-10 15:38:29", EndTime: "2029-05-10 15:38:29", BusinessUnitID: 0, BaseID: 0, FactoryID: 0, WorkShopID: 0, LineID: 0 }, function (res1) {
                            TypeSource_Device_Regular.TypeID.splice(1, TypeSource_Device_Regular.TypeID.length - 1);
                            $.each(res1.list, function (i, item) {
                                TypeSource_Device_Regular.TypeID.push({
                                    name: item.Name,
                                    value: item.ID,
                                    far: item.ModelID
                                })
                            });
                            window.parent.BJBY_Type = 0;
                        });
                    }
                    model.com.setType();
                }, 500);
            },
            //获取所有设备型号（台账）
            getSpareModel: function (data, fn, context) {
                var d = {
                    $URI: "/SpareModel/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },


            //激活
            postActive: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceMaintainRule/Active",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //获取所有设备
            getDeviceMaintainRule: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceMaintainRule/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //添加或修改设备
            postDeviceMaintainRule: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceMaintainRule/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //获取所有设备/备件保养模板列表
            getDeviceMaintainType: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceMaintainType/All",
                    $TYPE: "get"
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
            //导入
            postImportExcel: function (data, fn, context) {
                var d = {
                    $URI: "/Upload/ImportExcel",
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