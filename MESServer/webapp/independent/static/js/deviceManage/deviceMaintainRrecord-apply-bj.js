﻿require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($yang, $com) {
    var KEYWORD_Device_LIST_Apply,
    KEYWORD_Device_Apply,
    FORMATTRT_Device_Apply,
    DEFAULT_VALUE_Device_Apply,
    TypeSource_Device_Apply,

    KEYWORD_Device_LIST_Item,
    KEYWORD_Device_Item,
    FORMATTRT_Device_Item,
    DEFAULT_VALUE_Device_Item,
    TypeSource_Device_Item,

    KEYWORD_Device_LIST_ApplyG,
    KEYWORD_Device_ApplyG,
    FORMATTRT_Device_ApplyG,
    DEFAULT_VALUE_Device_ApplyG,
    TypeSource_Device_ApplyG,


    wItemList_By,
    DateMItem,
    DateMType,
    TypeIDCustom = "",
    MaintainItemOptionsCustom = [],
    //TableAptitudeItemNode_task,
    //resApplyList,
    mDeviceID,
    model,
    item,
    HTML;

    HTML = {
        TableNode_Apply: [
            '<tr>',
            '<td style="width: 3px"><input type="checkbox"    ',
            'class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td> ',
            '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}">{{ID}}</td>',
            '<td style="min-width: 50px" data-title="ApplyNo" data-value="{{ApplyNo}}">{{ApplyNo}}</td>',
             '<td style="min-width: 50px" data-title="FactoryID" data-value="{{FactoryID}}">{{FactoryID}}</td>',
             '<td style="min-width: 50px" data-title="BusinessUnitID" data-value="{{BusinessUnitID}}">{{BusinessUnitID}}</td>',
             '<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}">{{WorkShopID}}</td>',
             '<td style="min-width: 50px" data-title="LineID" data-value="{{LineID}}">{{LineID}}</td>',
            '<td style="min-width: 50px" data-title="ModelID" data-value="{{ModelID}}"  >{{ModelID}}</td>',
            '<td style="min-width: 50px" data-title="LedgerID" data-value="{{LedgerID}}">{{LedgerID}}</td>',
            '<td style="min-width: 50px" data-title="TypeID" data-value="{{TypeID}}">{{TypeID}}</td>',
            //'<td style="min-width: 50px" data-title="MaintainItemOptions" data-value="{{MaintainItemOptions}}">{{MaintainItemOptions}}</td>',
            '<td style="min-width: 50px" data-title="ApplicantID" data-value="{{ApplicantID}}">{{ApplicantID}}</td>',
            '<td style="min-width: 50px" data-title="ApplicantTime" data-value="{{ApplicantTime}}">{{ApplicantTime}}</td>',
            '<td style="min-width: 50px" data-title="TaskTime" data-value="{{TaskTime}}">{{TaskTime}}</td>',
            '<td style="min-width: 50px" data-title="ApproverID" data-value="{{ApproverID}}">{{ApproverID}}</td>  ',
            '<td style="min-width: 50px" data-title="ApproverTime" data-value="{{ApproverTime}}">{{ApproverTime}}</td>  ',
            //'<td style="min-width: 50px" data-title="MaintainerID" data-value="{{MaintainerID}}">{{MaintainerID}}</td>  ',
            //'<td style="min-width: 50px" data-title="ConfirmTime" data-value="{{ConfirmTime}}">{{ConfirmTime}}</td>  ',
            //'<td style="min-width: 50px" data-title="ConfirmID" data-value="{{ConfirmID}}">{{ConfirmID}}</td>  ',
            '<td style="min-width: 50px" data-title="Status" data-value="{{Status}}">{{Status}}</td>  ',
            '<td style="min-width: 50px" data-title="Comment" data-value="{{Comment}}">{{Comment}}</td>  ',
            '<td style="min-width: 50px" data-title="Reason" data-value="{{Reason}}">{{Reason}}</td>  ',
//	        '<td style="min-width: 50px" data-title="DSType" data-value="{{DSType}}">{{DSType}}</td>  ',
            '</tr>',
        ].join(""),
        TableNode_Item: [
            '<tr>',
            '<td style="width: 3px"><input type="checkbox"    ',
            'class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td> ',
            '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}">{{ID}}</td>',
            '<td style="min-width: 50px" data-title="Name" data-value="{{Name}}">{{Name}}</td>',
            '<td style="min-width: 50px" data-title="CareItems" data-value="{{CareItems}}"  >{{CareItems}}</td>',
            '<td style="min-width: 50px" data-title="Comment" data-value="{{Comment}}">{{Comment}}</td>',

            '</tr>',
        ].join(""),
    }

    $(function () {
        KEYWORD_Device_LIST_Apply = [
         "ID|编号",
         "ApplyNo|申请单号",
         "FactoryID|工厂|ArrayOne",
         "BusinessUnitID|部门|ArrayOne",
         "WorkShopID|车间|ArrayOne",
         "LineID|产线|ArrayOne",
         "ModelID|备件型号|ArrayOneControl",
         "LedgerID|备件编码|ArrayOneControl|ModelID",
         "TypeID|保养模板|ArrayOneControl|ModelID",
         "TypeIDCustom|保养模板(自定义)",
         "MaintainItemOptions|保养项列表|Array",
         "MaintainItemOptionsCustom|保养项列表(自定义)|InputArray",
         "ApplicantID|申请人|ArrayOne",
         "ApplicantTime|申请时间|DateTime",
         "ApproverID|审批人|ArrayOne",
         "ApproverTime|审批时间|DateTime",
         "MaintainerID|保养人|ArrayOne",
         "ConfirmID|确认人|ArrayOne",
         "ConfirmTime|确认时间|DateTime",
         "Status|状态|ArrayOne",
         "Comment|申请备注",
         "TaskTime|任务时刻|DateTime",
         "Reason|理由",
//       "DSType|DSType",
         "BaseID|基地",
        ];
        KEYWORD_Device_Apply = {};
        FORMATTRT_Device_Apply = {};
        DEFAULT_VALUE_Device_Apply = {
            //ApplyNo:"",
            ModelID: 0,
            LedgerID: 0,
            TypeID: 0,
            TypeIDCustom: "",
            MaintainItemOptions: [],
            MaintainItemOptionsCustom: [],
            Comment: "",
            TaskTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
            BusinessUnitID: 0,
            WorkShopID: 0,
            LineID: 0,
        };

        TypeSource_Device_Apply = {
            Status: [{
                name: "默认",
                value: 0
            }, {
                name: "待审核",
                value: 1
            }, {
                name: "已撤销",
                value: 2
            }, {
                name: "已审核",
                value: 3
            }, {
                name: "已驳回",
                value: 4
            }, {
                name: "已确认",
                value: 5
            }],

            MaintainItemOptions: [],
            ModelID: [],
            LedgerID: [],
            TypeID: [
               {
                   name: "其他",
                   value: 0,
                   far: 0
               }
            ],

            ApplicantID: [],
            ApproverID: [],
            MaintainerID: [],
            ConfirmID: [],
            BusinessUnitID: [{
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
            }],
            FactoryID: [{
                name: "无",
                value: 0
            }]

        };


        $.each(KEYWORD_Device_LIST_Apply, function (i, item) {
            var detail = item.split("|");
            KEYWORD_Device_Apply[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_Device_Apply[detail[0]] = $com.util.getFormatter(TypeSource_Device_Apply, detail[0], detail[2]);
            }
        });
    });


    $(function () {
        KEYWORD_Device_LIST_ApplyG = [
        "ID|编号|Readonly",
         "ApplyNo|申请单号|Readonly",
          "FactoryID|工厂|Readonly",
         "BusinessUnitID|部门|Readonly",
         "WorkShopID|车间|Readonly",
         "LineID|产线|Readonly",
         "ModelID|备件型号|Readonly",
         "LedgerID|备件编码|Readonly",
         "TypeID|保养模板|Readonly",
         "MaintainItemOptions|保养项列表|Readonly",
         "ApplicantID|申请人|Readonly",
         "ApplicantTime|申请时间|Readonly",
         "ApproverID|审批人|Readonly",
         "ApproverTime|审批时间|Readonly",
         "MaintainerID|保养人|Readonly",
         "ConfirmID|确认人|Readonly",
         "ConfirmTime|确认时间|Readonly",
         "Status|状态|Readonly",
         "Comment|申请备注|Readonly",
         "TaskTime|任务时刻|Readonly",
         "Reason|理由|Readonly",
//       "DSType|DSType",
        ];
        KEYWORD_Device_ApplyG = {};
        FORMATTRT_Device_ApplyG = {};
        DEFAULT_VALUE_Device_ApplyG = {};

        TypeSource_Device_ApplyG = {};


        $.each(KEYWORD_Device_LIST_ApplyG, function (i, item) {
            var detail = item.split("|");
            KEYWORD_Device_ApplyG[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_Device_ApplyG[detail[0]] = $com.util.getFormatter(TypeSource_Device_ApplyG, detail[0], detail[2]);
            }
        });
    });

    $(function () {
        KEYWORD_Device_LIST_Item = [
         "ID|编号",
         "Name|保养名",
         "CareItems|注意事项",
         "Comment|保养项备注",

        ];
        KEYWORD_Device_Item = {};
        FORMATTRT_Device_Item = {};
        DEFAULT_VALUE_Device_Item = {};

        TypeSource_Device_Item = {};


        $.each(KEYWORD_Device_LIST_Item, function (i, item) {
            var detail = item.split("|");
            KEYWORD_Device_Item[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_Device_Item[detail[0]] = $com.util.getFormatter(TypeSource_Device_Item, detail[0], detail[2]);
            }
        });
    });




    model = $com.Model.create({
        name: '保养日志',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {


            //保养日志模糊查询（所有列表）
            $("body").delegate("#zace-search-Device-Apply", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-Device-tbody-Apply").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-Device-tbody-Apply"), DataAll_Apply, value, "ID");
            });

            //保养日志模糊查询（我的申请）
            $("body").delegate("#zace-search-Device-DSH", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-Device-tbody-DSH").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-Device-tbody-DSH"), DataAll_DSH, value, "ID");
            });

            //保养日志模糊查询（我的审批）
            $("body").delegate("#zace-search-Device-SP", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-Device-tbody-SP").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-Device-tbody-SP"), DataAll_SP, value, "ID");
            });
            //保养日志模糊查询（我的确认）
            $("body").delegate("#zace-search-Device-QR", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-Device-tbody-QR").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-Device-tbody-QR"), DataAll_QR, value, "ID");
            });

            //保养日志修改（我的申请）
            $("body").delegate("#zace-edit-Device-DSH", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-DSH"), "ID", DATABasic_DSH);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                var default_value = {
                    FactoryID: SelectData[0].FactoryID,
                    BusinessUnitID: SelectData[0].BusinessUnitID,
                    WorkShopID: SelectData[0].WorkShopID,
                    LineID: SelectData[0].LineID,
                    //Status: SelectData[0].Status,
                    Comment: SelectData[0].Comment,
                    //Reason: SelectData[0].Reason,
                    ModelID: SelectData[0].ModelID,
                    LedgerID: SelectData[0].LedgerID,
                    TypeID: SelectData[0].TypeID,
                    MaintainItemOptions: SelectData[0].MaintainItemOptions,
                    //ApplicantID: SelectData[0].ApplicantID,
                    //ApproverID: SelectData[0].ApproverID,
                    //MaintainerID: SelectData[0].MaintainerID,
                    TaskTime: SelectData[0].TaskTime,
                    //ConfirmID: SelectData[0].ConfirmID,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Device_Apply, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].FactoryID = Number(rst.FactoryID);
                    SelectData[0].BusinessUnitID = Number(rst.BusinessUnitID);
                    SelectData[0].WorkShopID = Number(rst.WorkShopID);
                    SelectData[0].LineID = Number(rst.LineID);
                    //SelectData[0].Status= rst.Status;
                    SelectData[0].Comment = rst.Comment;
                    //SelectData[0].Reason = rst.Reason;
                    SelectData[0].ModelID = Number(rst.ModelID);
                    SelectData[0].LedgerID = Number(rst.LedgerID);
                    SelectData[0].TypeID = Number(rst.TypeID);
                    SelectData[0].MaintainItemOptions = rst.MaintainItemOptions;
                    //SelectData[0].ApplicantID = Number(rst.ApplicantID);
                    //SelectData[0].ApproverID = Number(rst.ApproverID);
                    //SelectData[0].MaintainerID = Number(rst.MaintainerID);
                    SelectData[0].TaskTime = rst.TaskTime;
                    //SelectData[0].ConfirmID = rst.ConfirmID;
                    model.com.postDeviceMaintainApply({
                        data: SelectData[0]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                    })

                }, TypeSource_Device_Apply));


            });

            //查看保养项列表
            $("body").delegate("#zace-BYlist-DSH", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-DSH"), "ID", DATABasic_DSH);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                var wItemList = SelectData[0].MaintainItemOptions;
                wItemList_By = [];
                for (var i = 0; i < wItemList.length; i++) {
                    for (var j = 0; j < DateMItem.length; j++) {
                        if (wItemList[i] == DateMItem[j].ID) {
                            wItemList_By.push(DateMItem[j]);
                        }
                    }
                }
                $.each(wItemList_By, function (i, item) {
                    for (var p in item) {
                        if (!FORMATTRT_Device_Item[p])
                            continue;
                        item[p] = FORMATTRT_Device_Item[p](item[p]);
                    }
                });
                //var wItemList_ID = [];
                for (var i = 0; i < wItemList_By.length; i++) {
                    wItemList_By[i].ID = i + 1;
                }
                $("#femi-Device-tbody-BYlist").html($com.util.template(wItemList_By, HTML.TableNode_Item));

                $(".zzzc").css("margin-right", "400px");
                $(".zzzf").show();
                $(".zzzf").width("400px");
                $(".zzza").hide();
                $(".zzzb").hide();
                $(".zzzd").hide();
                $(".zzze").hide();

            })
            //保养项列表隐藏

            $("body").delegate("#zace-Device-YC", "click", function () {
                $(".zzzc").css("margin-right", "0px");
                $(".zzzf").hide();
                $(".zzzf").width("0px");
                $(".zzza").hide();
                $(".zzzb").hide();
                $(".zzzd").hide();
                $(".zzze").hide();
            })

            //待审核
            //$("body").delegate("#zace-DSH-Device-DSH", "click", function () {

            //    var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-DSH"), "ID", DATABasic_DSH);

            //    if (!SelectData || !SelectData.length) {
            //        alert("请先选择一行数据再试！")
            //        return;
            //    }
            //    if (SelectData.length != 1) {
            //        alert("只能同时对一行数据修改！")
            //        return;
            //    }
            //    SelectData[0].Status = 1;
            //    model.com.postDeviceMaintainApply({
            //        data: SelectData[0]
            //    }, function (res) {
            //        alert("待审核成功");
            //        model.com.refresh();
            //    })

            //});
            //已撤销
            $("body").delegate("#zace-chexiao-Device-DSH", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-DSH"), "ID", DATABasic_DSH);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                //SelectData[0].Status = 2;
                if (SelectData[0].Status == 1 || SelectData[0].Status == 4) {
                    SelectData[0].Status = 2;
                } else {
                    alert("该状态下无法操作！")
                    return;
                }
                model.com.postDeviceMaintainApply({
                    data: SelectData[0]
                }, function (res) {
                    alert("已撤销成功");
                    model.com.refresh();
                })

            });


            //已审核
            $("body").delegate("#zace-YSH-Device-SP", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-SP"), "ID", DATABasic_SP);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                //SelectData[0].Status = 3;
                if (SelectData[0].Status == 1 || SelectData[0].Status == 4) {
                    SelectData[0].Status = 3;
                } else {
                    alert("该状态下无法操作！")
                    return;
                }
                var Time = SelectData[0].ApplicantTime;
                var default_value = {
                    TaskTime: SelectData[0].TaskTime,
                    Reason: SelectData[0].Reason,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Device_Apply, "审核", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;

                    var TimeRW = $com.util.format('yyyy-MM-dd hh:mm:ss', rst.TaskTime);
                    if (TimeRW > Time) {
                        SelectData[0].TaskTime = rst.TaskTime;
                        SelectData[0].Reason = rst.Reason;
                    } else {
                        alert("输入的时间格式不正确！");
                        return false;
                    }
                    model.com.postDeviceMaintainApply({
                        data: SelectData[0]
                    }, function (res) {
                        alert("已审核成功");
                        model.com.refresh();
                    });

                }, TypeSource_Device_Apply));

            });

            //已驳回
            $("body").delegate("#zace-BH-Device-SP", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-SP"), "ID", DATABasic_SP);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                //SelectData[0].Status = 4;
                if (SelectData[0].Status == 1) {
                    SelectData[0].Status = 4;
                } else {
                    alert("该状态下无法操作！")
                    return;
                }
                var default_value = {
                    Reason: SelectData[0].Reason,
                };
                $("body").append($com.modal.show(default_value, KEYWORD_Device_Apply, "驳回", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    SelectData[0].Reason = rst.Reason;
                    model.com.postDeviceMaintainApply({
                        data: SelectData[0]
                    }, function (res) {
                        alert("已驳回成功");
                        model.com.refresh();
                    });

                }, TypeSource_Device_Apply));

            });
            //已确认
            $("body").delegate("#zace-Device-WDQR", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-QR"), "ID", DATABasic_QR);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                //SelectData[0].Status = 5;
                if (SelectData[0].Status == 3) {
                    SelectData[0].Status = 5;
                } else {
                    alert("该状态下无法操作！")
                    return;
                }
                model.com.postDeviceMaintainApply({
                    data: SelectData[0]
                }, function (res) {
                    alert("已确认成功");
                    model.com.refresh();
                })

            });
            $("body").delegate("#modal_select_TypeID", "change", function () {

                //小写字母开头（局部变量）  大写字母开头（全局变量） 驼峰式命名（wTypeObject）
                var wTypeValue = $("#modal_select_TypeID").val();

                var wTypeObject = {};
                //根据TypeID获取Type对象本身
                for (var i = 0; i < DateMType.length; i++) {
                    if (DateMType[i].ID == wTypeValue) {
                        wTypeObject = DateMType[i];
                    }
                }
                var wMaintainOptions = wTypeObject.MaintainOptions;


                //$("#modal_select_MaintainItemOptions option").each(function (i, item) {
                //    var $Option = $(item), 
                //获取Option的value值
                //        wValue = $Option.attr("value");
                //    //判断元素是否在数组
                //    if ($.inArray(wValue, wMaintainOptions))
                //    {
                //给selected属性加selected值
                //        $Option.attr("selected", "selected");
                //    }
                //});

                $("#modal_select_MaintainItemOptions").selectpicker("val", wMaintainOptions);
                $("#modal_select_MaintainItemOptions").selectpicker("refresh");
            });


            //保养日志新增（我的申请）

            $("body").delegate("#zace-add-Device-DSH", "click", function () {
                $("body").append($com.modal.show(DEFAULT_VALUE_Device_Apply, KEYWORD_Device_Apply, "新增", function (rst) {
                    //调用插入函数 

                    if (!rst || $.isEmptyObject(rst))
                        return;


                    //选择保养类型后保养项自动填充（保养类型下的所有保养项）
                    //保养可选项被ModelID控制
                    //判断重复 判断同ModelID下保养项是否重复

                    var ApplyTemp = {
                        ID: 0,
                        ApplyNo: "",
                        ModelID: Number(rst.ModelID),
                        LedgerID: Number(rst.LedgerID),
                        TypeID: Number(rst.TypeID),
                        MaintainItemOptions: rst.MaintainItemOptions,
                        ApplicantID: 0,
                        ApplicantTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
                        TaskTime: $com.util.format('yyyy-MM-dd hh:mm:ss', rst.TaskTime),
                        ApproverID: 0,
                        ApproverTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
                        MaintainerID: 0,
                        ConfirmID: 0,
                        ConfirmTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
                        Status: 1,
                        Comment: rst.Comment,
                        Reason: "",
                        DSType: 2,
                        BusinessUnitID: Number(rst.BusinessUnitID),
                        FactoryID: 1,
                        WorkShopID: Number(rst.WorkShopID),
                        LineID: Number(rst.LineID),
                        BaseID: 0,
                    };

                    if (rst.TypeIDCustom && rst.TypeIDCustom.trim().length > 0 && Number(rst.TypeID) > 0) {
                        alert("已选择保养类型，保养类型（自定义）不可填写！");
                        return false;
                    }

                    if (rst.MaintainItemOptions.length == 0 && rst.MaintainItemOptionsCustom.length <= 1 && rst.MaintainItemOptionsCustom[0] == "") {
                        alert("未选择保养项时，必须输入自定义保养项！即保养项不能为空！");
                        return false;
                    }

                    if (rst.MaintainItemOptionsCustom.length > 0) {
                        for (i = 0; i < DateMItem.length; i++) {
                            for (var j = 0; j < rst.MaintainItemOptionsCustom.length; j++) {
                                //if (DateMItem[i].ModelID == Number(rst.ModelID) && DateMItem[i].Name == rst.MaintainItemOptionsCustom[j]) {
                                if (DateMItem[i].Name == rst.MaintainItemOptionsCustom[j]) {
                                    alert("保养项出现重复！");
                                    return false;
                                }

                            }
                        }
                    }
                    if (rst.TypeIDCustom != "") {
                        for (var i = 0; i < DateMType.length; i++) {
                            if (DateMType[i].Name == rst.TypeIDCustom) {
                                alert("保养类型出现重复！");
                                return false;
                            }
                        }

                    }
                    model.com.postDeviceMaintainApply({
                        data: ApplyTemp,
                        Type: rst.TypeIDCustom,
                        Items: rst.MaintainItemOptionsCustom
                    }, function (res) {
                        model.com.refresh();
                        alert("新增成功");

                    })

                }, TypeSource_Device_Apply));


            });

            //保养日志导出（所有列表）
            $("body").delegate("#zace-export-Device-Apply", "click", function () {
                var $table = $("#deviceePart-All"),
                     fileName = "保养申请所有列表.xls",
                     Title = "保养申请所有列表";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });

            });



            //保养日志导出（我的申请）
            $("body").delegate("#zace-export-Device-DSH", "click", function () {
                var $table = $("#deviceePart-Apply"),
                     fileName = "保养申请我的申请单.xls",
                     Title = "保养申请我的申请单";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });

            });

            //保养日志导出（我的审批）
            $("body").delegate("#zace-export-Device-SP", "click", function () {
                var $table = $("#deviceePart-SP"),
                     fileName = "保养申请我的审批单.xls",
                     Title = "保养申请我的审批单";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });

            });


            //保养日志导出（我的确认）
            $("body").delegate("#zace-export-Device-QR", "click", function () {
                var $table = $(".table-part"),
                     fileName = "保养日志我的确认单.xls",
                     Title = "保养日志我的确认单";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });

            });

            //$("body").delegate("#zace-Device-Rrecord", "click", function () {
            //    var vdata = { 'header': '备件保养日志', 'href': './device_manage/deviceMaintainRrecord-task-bj.html', 'id': 'DeviceMaintainRrecord-task-bj', 'src': './static/images/menu/deviceManage/sparePartMaintainLog.png' };
            //    window.parent.iframeHeaderSet(vdata);
            //})




            //查看申请单详情
            $("body").delegate("#zace-XQ-DSH", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-Device-tbody-DSH"), "ID", DataAll_DSH);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                $(".zzza").hide();
                $(".zzzb").show();
                $(".zzzb").css("width", "350px");
                $(".zzzc").css("margin-right", "350px");
                $(".zzzd").hide();
                $(".zzze").hide();
                $(".zzzf").hide();
                var default_value = {
                    ID: SelectData[0].ID,
                    ApplyNo: SelectData[0].ApplyNo,
                    ModelID: SelectData[0].ModelID,
                    LedgerID: SelectData[0].LedgerID,
                    TypeID: SelectData[0].TypeID,
                    MaintainItemOptions: SelectData[0].MaintainItemOptions,
                    ApplicantID: SelectData[0].ApplicantID,
                    ApplicantTime: SelectData[0].ApplicantTime,
                    ApproverID: SelectData[0].ApproverID,
                    ApproverTime: SelectData[0].ApproverTime,
                    MaintainerID: SelectData[0].MaintainerID,
                    //ConfirmID: SelectData[0].ConfirmID,
                    //ConfirmTime: SelectData[0].ConfirmTime,
                    Status: SelectData[0].Status,
                    Comment: SelectData[0].Comment,
                    Reason: SelectData[0].Reason,
                };
                $("body").append($com.propertyGrid.show($(".Typetable-task1"), default_value, KEYWORD_Device_ApplyG, TypeSource_Device_ApplyG));

            });

            //隐藏
            $("body").delegate("#cby-ledger", "click", function () {
                $(".zzzc").css("margin-right", "0px");
                $(".zzzb").hide();
                $(".zzzc").show();
                $(".zzzb").width("0px");
                $(".zzza").hide();
                $(".zzzd").hide();
                $(".zzze").hide();
                $(".zzzf").hide();
            })

            //保养日志(从申请单到任务单)
            $("body").delegate("#zace-Device-task", "click", function () {
                var vdata = { 'header': '备件保养日志', 'href': './device_manage/deviceMaintainRrecord-task-bj.html', 'id': 'DeviceMaintainRrecord-task-bj', 'src': './static/images/menu/deviceManage/sparePartMaintainLog.png' };
                window.parent.iframeHeaderSet(vdata);
            })

            //查看所有列表
            $("body").delegate("#zace-All-Device-Apply", "click", function () {

                $(".zzza").show();
                $(".zzza").css("margin-right", "0px");
                $(".zzzb").hide();
                $(".zzzc").hide();
                $(".zzzd").hide();
                $(".zzze").hide();
                $(".zzzf").hide();
            });


            //我的申请单zace-SQ-Device-Apply
            //查看申请单详情
            $("body").delegate("#zace-SQ-Device-Apply", "click", function () {

                $(".zzza").hide();
                $(".zzzb").hide();
                $(".zzzc").show();
                $(".zzzc").css("margin-right", "0px");
                $(".zzzd").hide();
                $(".zzze").hide();
                $(".zzzf").hide();
            });
            //我的审批
            $("body").delegate("#zace-SP-Device-Apply", "click", function () {

                $(".zzza").hide();
                $(".zzzb").hide();
                $(".zzzc").hide();
                $(".zzzd").show();
                $(".zzzd").css("margin-right", "0px");
                $(".zzze").hide();
                $(".zzzf").hide();
            });

            //我的确认
            $("body").delegate("#zace-QR-Device-Apply", "click", function () {

                $(".zzza").hide();
                $(".zzzb").hide();
                $(".zzzc").hide();
                $(".zzzd").hide();
                $(".zzze").show();
                $(".zzze").css("margin-right", "0px");
                $(".zzzf").hide();
            });
            //刷新
            $("body").delegate("#zace-BYlist-refresh", "click", function () {
                model.com.load();
                alert("刷新成功");
            });

        },





        run: function () {
            DateMItem = [];
            DateMType = [];
            var wBusiness = window.parent._Business;
            var wFactory = window.parent._Factory;
            var wWorkShop = window.parent._WorkShop;
            var wLine = window.parent._Line;
            var wUser = window.parent._UserAll;
            var wDevice = window.parent._Device;

            model.com.getDeviceMaintainType({ ModelID: -1, Name: "", DSType: 2, Active: -1, StartTime: "2019-04-10 15:38:29", EndTime: "2029-05-10 15:38:29", BusinessUnitID: 0, BaseID: 0, FactoryID: 0, WorkShopID: 0, LineID: 0 }, function (res2) {
                DateMType = res2.list;
                $.each(res2.list, function (i, item) {
                    TypeSource_Device_Apply.TypeID.push({
                        name: item.Name,
                        value: item.ID,
                        far: item.ModelID
                    })
                });
                model.com.getSpareLedger({ ModelID: -1, WorkShopID: 0, LineID: 0, BusinessUnitID: 0, BaseID: 0, FactoryID: 0, Status: 0,DeviceLedgerID:0,ApplyID:0 }, function (res3) {
                    //var wLedger = [];
                    //for (i = 0; i < res3.list.length; i++) {
                    //    if (res3.list[i].Status == 1) {
                    //        wLedger.push(res3.list[i]);
                    //    }
                    //}
                    $.each(res3.list, function (i, item) {
                        TypeSource_Device_Apply.LedgerID.push({
                            name: item.SpareNo,
                            value: item.ID,
                            far: item.ModelID
                        })
                    });
 
                    $.each(wUser, function (i, item) {
                            TypeSource_Device_Apply.ApplicantID.push({
                                name: item.Name,
                                value: item.ID,
                                far: null
                            })
                        });

                    $.each(wUser, function (i, item) {
                            TypeSource_Device_Apply.ApproverID.push({
                                name: item.Name,
                                value: item.ID,
                                far: null
                            })
                        });
                    $.each(wUser, function (i, item) {
                            TypeSource_Device_Apply.MaintainerID.push({
                                name: item.Name,
                                value: item.ID,
                                far: null
                            })
                        });
                    $.each(wUser, function (i, item) {
                            TypeSource_Device_Apply.ConfirmID.push({
                                name: item.Name,
                                value: item.ID,
                                far: null
                            })
                    });
                    $.each(wBusiness, function (i, item) {
                        TypeSource_Device_Apply.BusinessUnitID.push({
                            name: item.Name,
                            value: item.ID,
                            far: null
                        })
                    });

                    $.each(wWorkShop, function (i, item) {
                        TypeSource_Device_Apply.WorkShopID.push({
                            name: item.Name,
                            value: item.ID,
                            far: null
                        })
                    });

                    $.each(wLine, function (i, item) {
                        TypeSource_Device_Apply.LineID.push({
                            name: item.Name,
                            value: item.ID,
                            far: null
                        })
                    });

                    $.each(wFactory, function (i, item) {
                        TypeSource_Device_Apply.FactoryID.push({
                            name: item.Name,
                            value: item.ID,
                            far: null
                        })
                    });
                        model.com.getSpareModel({ SpareWorkType: 0, SupplierID: 0, ModelPropertyID: 0, Active: -1, SupplierModelNo: "",StartTime: "2019-02-10 15:38:29", EndTime: "2029-05-10 15:38:29" }, function (res1) {
                            if (!res1)
                            return;
                            $.each(res1.list, function (i, item) {

                                TypeSource_Device_Apply.ModelID.push({
                                    name: item.ModelNo,
                                    value: item.ID,
                                    far: null
                                })
                            });
                            model.com.refresh();
                        });

                 
                });
            });

            model.com.getDeviceMaintainItem({ ModelID: -1, Name: "", DSType: 2, Active: -1, StartTime: "2019-04-26 19:15:19", EndTime: "2029-05-5 10:15:19" ,BusinessUnitID: 0, BaseID: 0, FactoryID: 0, WorkShopID: 0, LineID: 0  }, function (res1) {
                DateMItem = res1.list;
                $.each(res1.list, function (i, item) {
                    TypeSource_Device_Apply.MaintainItemOptions.push({
                        name: item.Name,
                        value: item.ID,
                        far: item.ModelID
                    })
                });
            });
        },

        com: {
            refresh: function () {
                model.com.getDeviceMaintainApply({ ModelID: -1, Name: "", TypeID: 0, DSType: 2, Status: 0, LedgerID: 0, ApplicantID: 0, ApproverID: 0, ConfirmID: 0, OAGetType: 0, StartTime: "2000-04-26 19:15:19", EndTime: "5029-05-5 10:15:19" }, function (resApply) {
                    if (!resApply)
                        return;
                    if (resApply && resApply.list) {
                        var Apply = $com.util.Clone(resApply.list);

                        DATABasic_Apply = $com.util.Clone(resApply.list);

                        $.each(Apply, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Device_Apply[p])
                                    continue;
                                item[p] = FORMATTRT_Device_Apply[p](item[p]);
                            }
                        });
                        DataAll_Apply = $com.util.Clone(Apply);
                        $("#femi-Device-tbody-Apply").html($com.util.template(Apply, HTML.TableNode_Apply));

                    }

                });

                model.com.getApply({
                    EventID: window._eventID ? window._eventID : 4002,
                    person_judge: window._person_judge ? window._person_judge : 1,
                    TagValue: 2,
                }, function (resDSH) {
                    if (!resDSH)
                        return;
                    if (resDSH && resDSH.list) {
                        var DataDSH = [];
                        for (var i = 0; i < resDSH.list.length; i++) {
                            if (resDSH.list[i].DSType == 2) {
                                DataDSH.push(resDSH.list[i]);
                            }
                        }

                        var DSH = $com.util.Clone(DataDSH);

                        DATABasic_DSH = $com.util.Clone(DataDSH);

                        $.each(DSH, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Device_Apply[p])
                                    continue;
                                item[p] = FORMATTRT_Device_Apply[p](item[p]);
                            }
                        });
                        DataAll_DSH = $com.util.Clone(DSH);
                        $("#femi-Device-tbody-DSH").html($com.util.template(DSH, HTML.TableNode_Apply));

                    }

                });

                model.com.getApply({
                    EventID: window._eventID ? window._eventID : 4002,
                    person_judge: window._person_judge ? window._person_judge : 1,
                    TagValue: 4,
                }, function (resSP) {
                    if (!resSP)
                        return;
                    if (resSP && resSP.list) {
                        var DataSP = [];
                        for (var i = 0; i < resSP.list.length; i++) {
                            if (resSP.list[i].DSType == 2) {
                                DataSP.push(resSP.list[i]);
                            }
                        }

                        var SP = $com.util.Clone(DataSP);
                        DATABasic_SP = $com.util.Clone(DataSP);

                        $.each(SP, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Device_Apply[p])
                                    continue;
                                item[p] = FORMATTRT_Device_Apply[p](item[p]);
                            }
                        });
                        DataAll_SP = $com.util.Clone(SP);
                        $("#femi-Device-tbody-SP").html($com.util.template(SP, HTML.TableNode_Apply));

                    }

                });

                model.com.getDeviceMaintainApply({ ModelID: -1, Name: "", TypeID: 0, DSType: 2, Status: 0, LedgerID: 0, ApplicantID: 0, ApproverID: 0, ConfirmID: 0, OAGetType: 3, StartTime: "2000-04-26 19:15:19", EndTime: "5029-05-5 10:15:19" }, function (resQR) {
                    if (!resQR)
                        return;
                    if (resQR && resQR.list) {
                        var QR = $com.util.Clone(resQR.list);

                        DATABasic_QR = $com.util.Clone(resQR.list);

                        $.each(QR, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Device_Apply[p])
                                    continue;
                                item[p] = FORMATTRT_Device_Apply[p](item[p]);
                            }
                        });
                        DataAll_QR = $com.util.Clone(QR);
                        $("#femi-Device-tbody-QR").html($com.util.template(QR, HTML.TableNode_Apply));

                    }

                });

            },
            load: function () {
                model.com.getDeviceMaintainType({ ModelID: -1, Name: "", DSType: 2, Active: -1, StartTime: "2019-04-10 15:38:29", EndTime: "2029-05-10 15:38:29", BusinessUnitID: 0, BaseID: 0, FactoryID: 0, WorkShopID: 0, LineID: 0 }, function (res2) {
                    DateMType = res2.list;
                    $.each(res2.list, function (i, item) {
                        TypeSource_Device_Apply.TypeID.push({
                            name: item.Name,
                            value: item.ID,
                            far: item.ModelID
                        })
                    });
                    model.com.refresh();
                });
            },
            getApply: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceMaintainApply/EmployeeAll",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //获取所有备件型号（台账）
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

            //获取所有设备/备件保养任务列表
            getDeviceMaintainTask: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceMaintainTask/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },


            //添加或修改设备/备件保养任务
            postDeviceMaintainTask: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceMaintainTask/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //获取所有设备/备件保养项列表
            getDeviceMaintainItem: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceMaintainItem/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //获取所有设备/备件保养类型列表
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
            //获取所有用户信息
            getUser: function (data, fn, context) {
                var d = {
                    $URI: "/User/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //获取所有备件台账
            getSpareLedger: function (data, fn, context) {
                var d = {
                    $URI: "/SpareLedger/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },



            //获取所有设备/备件保养申请列表
            getDeviceMaintainApply: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceMaintainApply/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },


            //添加或修改设备/备件保养申请
            postDeviceMaintainApply: function (data, fn, context) {
                var d = {
                    $URI: "/DeviceMaintainApply/Update",
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
                        if (_source[i].ID == set_data[j].ID) {
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

            //保存任务单
            postDevicetask: function (data, fn, context) {

                //保存到变量中
                fn();
            },
            //查询任务单   
            getDevicetask: function (data, fn, context) {
                fn(restaskList);
            },


            //保存记录单
            postDevicerecord: function (data, fn, context) {

                //保存到变量中
                fn();
            },
            //查询记录单   
            getDevicerecord: function (data, fn, context) {
                fn(restaskList);
            },

        }
    }),

model.init();

});