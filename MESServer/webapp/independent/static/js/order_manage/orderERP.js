require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base', '../static/utils/js/ganttUtil', '../static/utils/js/base/jquery.treeview'],
    function ($lin, $com, $gantt, $treeview) {

        var HTML,
            Start,
            orderERPList_source,
            Data_source,
            order,
            ALLPart,
            AllERPData,
            APSOrderList,
            workshop_source,
            GanttData,
            flag,
            countList,
            APS_arr,
            yAxisData,
            TaskData,

            orderERPMESList_source,
            ERPMESData_source,
            ERPMESOrder,
            arr,
            ERP_arr,

            orderMESList_source,
            MESData_source,
            MESOrder,
            msTime,
            meTime,
            GUD,
            ERPOrderPlanList_source,
            ERPOrderPlanData_source,

            orderNumber,
            productNumber,
            materialNumber,
            wID,
            lID,
            mID,
            sID,
            sTime,
            eTime,

            //ERP
            DEFAULT_VALUE_Time,
            KETWROD_LIST_Time,
            KETWROD_Template_Time,
            Formattrt_Time,
            TypeSource_Time,

            //ERPMES
            DEFAULT_VALUE_ERPMESTime,
            KETWROD_LIST_ERPMESTime,
            KETWROD_Template_ERPMESTime,
            Formattrt_ERPMESTime,
            TypeSource_ERPMESTime,

            //MES
            DEFAULT_VALUE_MESTime,
            KETWROD_LIST_MESTime,
            KETWROD_Template_MESTime,
            Formattrt_MESTime,
            TypeSource_MESTime,

            //订单运算
            DEFAULT_VALUE_MESCheck,
            KETWROD_LIST_MESCheck,
            KETWROD_Template_MESCheck,
            Formattrt_MESCheck,
            TypeSource_MESCheck,

            PartList;

        HTML = {
            TreeWorkshopItemNode: [
                '<li data-value="{{ID}}" data-title="ID" class="click-delegate work">',
                '<span style="vertical-align:top;"><input type="checkbox" class="femi-tree-checkbox" style="margin: 1px 0px 1px"  value="{{FunctionID}}"  />{{WorkShopName}}</span> ',
                '<ul>{{Items}}</ul>',
                '</li> ',
            ].join(""),
            TreeLineItemNode: [
                '<li data-value="{{ID}}" data-title="ID" class="click-delegate line">',
                '<span style="vertical-align:top;"><input type="checkbox" class="femi-tree-checkbox" style="margin: 1px 0px 1px"  value="{{FunctionID}}"  />{{ItemName}}</span> ',
                '<ul>{{Items}}</ul>',
                '</li> ',
            ].join(""),
            TreePartItemNode: [
                '<li data-value="{{PartID}}" data-title="PartID"  class="click-delegate part">',
                '<span style="vertical-align:top;"><input type="checkbox" class="femi-tree-checkbox" style="margin: 1px 0px 1px"  value="{{FunctionID}}"  />{{PartName}}</span> ',
                '</li> ',
            ].join(""),

            OrderERPList: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                '<td style="min-width: 80px" data-title="ERPOrderID" data-value="{{ERPOrderID}}" >{{ERPOrderID}}</td>',
                '<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}" >{{WorkShopID}}</td>',
                '<td style="min-width: 50px" data-title="ERPLineID" data-value="{{ERPLineID}}" >{{ERPLineID}}</td>',
                '<tr>'
            ].join(""),

            CountList: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                '<td style="min-width: 80px" data-title="OrderNo" data-value="{{OrderNo}}" >{{OrderNo}}</td>',
                '<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}" >{{WorkShopID}}</td>',
                '<td style="min-width: 50px" data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
                '<td style="min-width: 50px" data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
                '<td style="min-width: 50px" data-title="OrderType" data-value="{{OrderType}}" >{{OrderType}}</td>',
                '<td style="min-width: 50px" data-title="APSText" data-value="{{APSText}}" >{{APSText}}</td>',
                '<tr>'
            ].join(""),

            CountListAll: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="showID" data-value="{{showID}}" >{{showID}}</td>',
                '<td style="min-width: 80px" data-title="OrderNo" data-value="{{OrderNo}}" >{{OrderNo}}</td>',
                '<td style="min-width: 50px" data-title="OrderType" data-value="{{OrderType}}" >{{OrderType}}</td>',
                '<td style="min-width: 80px" data-title="ProductNo" data-value="{{ProductNo}}" >{{ProductNo}}</td>',
                '<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}" >{{WorkShopID}}</td>',
                '<td style="min-width: 50px" data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
                '<td style="min-width: 80px" data-title="PartName" data-value="{{PartName}}" >{{PartName}}</td>',
                '<td style="min-width: 80px" data-title="MaterialNo" data-value="{{MaterialNo}}" >{{MaterialNo}}</td>',
                '<td style="min-width: 80px" data-title="MaterialName" data-value="{{MaterialName}}" >{{MaterialName}}</td>',
                '<td style="min-width: 80px" data-title="FQTY" data-value="{{FQTY}}" >{{FQTY}}</td>',
                '<td style="min-width: 80px" data-title="StartTime" data-value="{{StartTime}}" >{{StartTime}}</td>',
                '<td style="min-width: 80px" data-title="FinishedTime" data-value="{{FinishedTime}}" >{{FinishedTime}}</td>',
                '<td style="min-width: 80px" data-title="BOMNo" data-value="{{BOMNo}}" >{{BOMNo}}</td>',
                '<td style="min-width: 80px" data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',
                '<td style="min-width: 80px" data-title="CreateTime" data-value="{{CreateTime}}" >{{CreateTime}}</td>',
                '<td style="min-width: 80px" data-title="APSText" data-value="{{APSText}}" >{{APSText}}</td>',
                '<tr>'
            ].join(""),

            OrderERPMESList: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                '<td style="min-width: 80px" data-title="OrderNo" data-value="{{OrderNo}}" >{{OrderNo}}</td>',
                '<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}" >{{WorkShopID}}</td>',
                '<td style="min-width: 50px" data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
                '<td style="min-width: 80px" data-title="Status" data-value="{{Status}}" >{{Status}}</td>',
                '<tr>'
            ].join(""),

            OrderERPListAll: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="showID" data-value="{{showID}}" >{{showID}}</td>',
                '<td style="min-width: 80px" data-title="ERPOrderID" data-value="{{ERPOrderID}}" >{{ERPOrderID}}</td>',
                '<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}" >{{WorkShopID}}</td>',
                '<td style="min-width: 50px" data-title="ERPLineID" data-value="{{ERPLineID}}" >{{ERPLineID}}</td>',
                '<td style="min-width: 80px" data-title="ProductNo" data-value="{{ProductNo}}" >{{ProductNo}}</td>',
                '<td style="min-width: 80px" data-title="PartName" data-value="{{PartName}}" >{{PartName}}</td>',
                '<td style="min-width: 80px" data-title="MaterialNo" data-value="{{MaterialNo}}" >{{MaterialNo}}</td>',
                '<td style="min-width: 80px" data-title="MaterialName" data-value="{{MaterialName}}" >{{MaterialName}}</td>',
                '<td style="min-width: 80px" data-title="FQTY" data-value="{{FQTY}}" >{{FQTY}}</td>',
                '<td style="min-width: 80px" data-title="StartDate" data-value="{{StartDate}}" >{{StartDate}}</td>',
                '<td style="min-width: 80px" data-title="FinishedDate" data-value="{{FinishedDate}}" >{{FinishedDate}}</td>',
                '<td style="min-width: 80px" data-title="ERPBOMNo" data-value="{{ERPBOMNo}}" >{{ERPBOMNo}}</td>',
                '<td style="min-width: 80px" data-title="MaterialNo" data-value="{{MaterialNo}}" >{{MaterialNo}}</td>',
                '<td style="min-width: 80px" data-title="CreateDate" data-value="{{CreateDate}}" >{{CreateDate}}</td>',
                '<td style="min-width: 80px" data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
                '<td style="min-width: 80px" data-title="ERPEntryID" data-value="{{ERPEntryID}}" >{{ERPEntryID}}</td>',
                '<tr>'
            ].join(""),

            OrderERPMESListAll: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="showID" data-value="{{showID}}" >{{showID}}</td>',
                '<td style="min-width: 80px" data-title="OrderNo" data-value="{{OrderNo}}" >{{OrderNo}}</td>',
                '<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}" >{{WorkShopID}}</td>',
                '<td style="min-width: 50px" data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
                '<td style="min-width: 80px" data-title="ProductNo" data-value="{{ProductNo}}" >{{ProductNo}}</td>',
                '<td style="min-width: 80px" data-title="PartName" data-value="{{PartName}}" >{{PartName}}</td>',
                '<td style="min-width: 80px" data-title="MaterialNo" data-value="{{MaterialNo}}" >{{MaterialNo}}</td>',
                '<td style="min-width: 80px" data-title="MaterialName" data-value="{{MaterialName}}" >{{MaterialName}}</td>',
                '<td style="min-width: 80px" data-title="FQTY" data-value="{{FQTY}}" >{{FQTY}}</td>',
                '<td style="min-width: 80px" data-title="StartDate" data-value="{{StartDate}}" >{{StartDate}}</td>',
                '<td style="min-width: 80px" data-title="FinishedDate" data-value="{{FinishedDate}}" >{{FinishedDate}}</td>',
                '<td style="min-width: 80px" data-title="BOMNo" data-value="{{BOMNo}}" >{{BOMNo}}</td>',
                '<td style="min-width: 80px" data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',
                '<td style="min-width: 80px" data-title="CreateDate" data-value="{{CreateDate}}" >{{CreateDate}}</td>',
                '<td style="min-width: 80px" data-title="Status" data-value="{{Status}}" >{{Status}}</td>',
                '<tr>'
            ].join(""),
        };

        GUD = {
            Data_Gantt: [],
        };
        PartList = {
            TaskDefault: 0,
            TaskOutCPM: 10,
            TaskOutC: 11,
            TaskOutCWD: 12,
            TaskOutJPM: 16,
            TaskOutXPM: 13,
            TaskOutX: 14,
            TaskOutJWD: 15,
            TaskOutJ: 17,
            TaskInnerCPM: 20,
            TaskInnerC: 21,
            TaskInnerCWD: 22,
            TaskInnerXPM: 23,
            TaskInnerX: 24,
            TaskInnerJWD: 25,
            TaskInnerJPM: 26,
            TaskInnerJ: 27,
            TaskZP: 30,
            TaskBCJ: 50
        };
        OrderStatus = {
            Description: [
                {
                    name: "未知",
                    value: 0
                },
                {
                    name: "保存",
                    value: 1
                },
                {
                    name: "下达",
                    value: 2
                },
                {
                    name: "开工",
                    value: 3
                },
                {
                    name: "完工",
                    value: 4
                },
                {
                    name: "终止",
                    value: 5
                },
                {
                    name: "暂停",
                    value: 6
                },
            ],
            Active: [
                {
                    name: "激活",
                    value: 2
                },
                {
                    name: "关闭",
                    value: 1
                },
            ],
        };

        countList = [];
        flag = 0;
        mID = 1;
        //时间
        DEFAULT_VALUE_Time = {
            startTime: new Date(new Date().getTime() - 86400000 * 500)
        };
        (function () {

            KETWROD_LIST_Time = [
                "startTime|开始时间|DateTime"
            ];

            KETWROD_Template_Time = {};

            Formattrt_Time = {};

            TypeSource_Time = {

            };

            $.each(KETWROD_LIST_Time, function (i, item) {
                var detail = item.split("|");
                KETWROD_Template_Time[detail[0]] = {
                    index: i,
                    name: detail[1],
                    type: detail.length > 2 ? detail[2] : undefined,
                    control: detail.length > 3 ? detail[3] : undefined
                };

                if (detail.length > 2) {
                    Formattrt_Time[detail[0]] = $com.util.getFormatter(TypeSource_Time, detail[0], detail[2]);
                }
            });
        })();
        //ERPMES时间
        DEFAULT_VALUE_ERPMESTime = {
            sTime: new Date(new Date().getTime() - 86400000 * 500),
            eTime: new Date()
        };
        (function () {

            KETWROD_LIST_ERPMESTime = [
                "sTime|开始时间|DateTime",
                "eTime|结束时间|DateTime"
            ];

            KETWROD_Template_ERPMESTime = {};

            Formattrt_ERPMESTime = {};

            TypeSource_ERPMESTime = {

            };

            $.each(KETWROD_LIST_ERPMESTime, function (i, item) {
                var detail = item.split("|");
                KETWROD_Template_ERPMESTime[detail[0]] = {
                    index: i,
                    name: detail[1],
                    type: detail.length > 2 ? detail[2] : undefined,
                    control: detail.length > 3 ? detail[3] : undefined
                };

                if (detail.length > 2) {
                    Formattrt_ERPMESTime[detail[0]] = $com.util.getFormatter(TypeSource_ERPMESTime, detail[0], detail[2]);
                }
            });
        })();
        //MES时间
        DEFAULT_VALUE_MESTime = {
            msTime: new Date(new Date().getTime() - 86400000 * 500),
            meTime: new Date()
        };
        (function () {

            KETWROD_LIST_MESTime = [
                "msTime|开始时间|DateTime",
                "meTime|结束时间|DateTime"
            ];

            KETWROD_Template_MESTime = {};

            Formattrt_MESTime = {};

            TypeSource_MESTime = {

            };

            $.each(KETWROD_LIST_MESTime, function (i, item) {
                var detail = item.split("|");
                KETWROD_Template_MESTime[detail[0]] = {
                    index: i,
                    name: detail[1],
                    type: detail.length > 2 ? detail[2] : undefined,
                    control: detail.length > 3 ? detail[3] : undefined
                };

                if (detail.length > 2) {
                    Formattrt_MESTime[detail[0]] = $com.util.getFormatter(TypeSource_MESTime, detail[0], detail[2]);
                }
            });
        })();
        //DRAWING订单 
        DEFAULT_VALUE_MESCheck = {
            Mode: "",
            WorkShopID: 0,
            LineID: 0,
        };
        (function () {

            KETWROD_LIST_MESCheck = [
                "Mode|运算方式|ArrayOne",
                "WorkShopID|车间|ArrayOneControl",
                "LineID|产线|ArrayOneControl|WorkShopID",
            ];

            KETWROD_Template_MESCheck = {};

            Formattrt_MESCheck = {};

            TypeSource_MESCheck = {
                Mode: [
                    {
                        name: "拉",
                        value: 1
                    },
                    {
                        name: "推",
                        value: 2
                    }
                ],
                WorkShopID: [
                    {
                        name: "全部",
                        value: 0
                    }
                ],
                LineID: [
                    {
                        name: "全部",
                        value: 0,
                        far: 0,
                    }
                ],
            };

            $.each(KETWROD_LIST_MESCheck, function (i, item) {
                var detail = item.split("|");
                KETWROD_Template_MESCheck[detail[0]] = {
                    index: i,
                    name: detail[1],
                    type: detail.length > 2 ? detail[2] : undefined,
                    control: detail.length > 3 ? detail[3] : undefined
                };

                if (detail.length > 2) {
                    Formattrt_MESCheck[detail[0]] = $com.util.getFormatter(TypeSource_MESCheck, detail[0], detail[2]);
                }
            });
        })();

        model = $com.Model.create({
            name: 'ERP订单',

            type: $com.Model.MAIN,

            configure: function () {
                this.run();
            },

            events: function () {
                //树图交互
                var CheckPart = function (source) {
                    var $PartInputs = $(".lmvt-Tree li.part .femi-tree-checkbox:checked"),
                        position = {
                            //天数间隔
                            spacePx: 25.0,
                            //左边菜单栏像素
                            freedomPx: 200,
                            //
                            contextHight: 0,
                            radius: 4,
                            LinePart: [],

                            tip: {
                                //提示条宽度，高度，行高
                                Text: { tipW: 150, tipH: 70, lineH: 15, titleH: 30 },
                                title: { text: '订单', prop: 'task', visible: true },
                                line: [
                                    { text: '开始时间', prop: 'startDate', visible: true },
                                    { text: '时长', prop: 'time', visible: true },
                                ]
                            },
                            series: {
                                data: [
                                    "2019-04-18",
                                    "2019-10-24",
                                ]
                            },
                            Task: {
                                data: [],
                                //    { task: "任务一", startDate: "2018-01-01", time: 2, color: "" },
                                //    { task: "任务二", startDate: "2018-01-07", time: 4, color: "DarkGreen" },
                                //    { task: "任务三", startDate: "2018.01.15", time: 5, color: "DarkKhaki" },
                                //    { task: "任务四", startDate: "2018.01.22", time: 4, color: "purple" },
                                //    { task: "任务五", startDate: "2018.02.01", time: 10, color: "Brown" },
                                //    { task: "任务六", startDate: "2018.02.12", time: 4, color: "black" },
                                //    { task: "任务七", startDate: "2018.02.19", time: 5, color: "Khaki" },
                                //    { task: "任务八", startDate: "2018.02.25", time: 3, color: "LightGray" },
                                //    { task: "任务九", startDate: "2018.03.01", time: 1, color: "LightGray" },
                                //]
                            },

                            yAxis: {
                                data: [],
                                //data: ['任务一', '任务二', '任务三', '任务四', '任务五', '任务六', '任务七', '任务8', '任务9']
                            },
                            fn: function (data, source) {
                            },
                        };

                    $PartInputs.each(function (i, item_i) {
                        var $Part = $(item_i).closest("li.part"),
                            $Line = $Part.closest("li.line"),
                            $WorkShop = $Line.closest("li.work"),
                            arry = [],
                            pID = $Part.attr("data-value"),
                            lID = $Line.attr("data-value"),
                            wID = $WorkShop.attr("data-value");
                        $.each(source, function (j, item_j) {
                            if (item_j.WorkShopID == wID && item_j.LineID == lID && item_j.PartID == pID) {
                                position.yAxis.data.push(item_j.ProductNo);

                                position.Task.data.push({
                                    task: item_j.OrderNo,
                                    startDate: item_j.StartTime,
                                    time: model.com.GetDays(item_j.StartTime, item_j.FinishedTime),
                                    color: "green",
                                    Line: item_j.LineName,
                                    Part: item_j.PartName,
                                })
                            }
                        });
                    });

                    position.contextHight = position.yAxis.data.length * 35;

                    $(".lmvt-container-count-drawing-gantt").css("height", (position.yAxis.data.length + 1) + "px");
                    $gantt.install($('.lmvt-container-count-drawing-gantt'), position, fn);
                    $gantt.resfushCanvas(position.Task.data);
                };

                function CheckTree($this) {
                    var $Siblings = $this.parent('span').parent('li').parent('ul').children('li').children('span').children(".femi-tree-checkbox")

                    var $parent_check = $this.parent('span').parent('li').parent('ul').prev('span').children(".femi-tree-checkbox");

                    if ($this[0].checked) {

                        var Is_all = true;
                        $Siblings.each(function (i, item) {
                            if (!item.checked)
                                Is_all = false;
                        });
                        if (Is_all) {
                            $parent_check.prop("checked", true);
                            $parent_check.prop("indeterminate", false);
                        } else {
                            $parent_check.prop("checked", false);
                            $parent_check.prop("indeterminate", true);
                        }
                    } else {

                        var Is_all = true;
                        $Siblings.each(function (i, item) {
                            if (item.checked || $(item).prop("indeterminate"))
                                Is_all = false;
                        });
                        $parent_check.prop("checked", false);
                        if (Is_all) {
                            $parent_check.prop("indeterminate", false);
                        } else {
                            $parent_check.prop("indeterminate", true);
                        }
                    }

                    if ($parent_check[0])
                        CheckTree($parent_check);
                }

                $("body").delegate(".lmvt-Tree .femi-tree-checkbox", "change", function () {

                    var $this = $(this);


                    var $own_check = $this.parent('span').next('ul').find(".femi-tree-checkbox");

                    $own_check.prop("indeterminate", false);

                    var $Siblings = $this.parent('span').parent('li').parent('ul').children('li').children('span').children(".femi-tree-checkbox")

                    var $parent_check = $this.parent('span').parent('li').parent('ul').prev('span').children(".femi-tree-checkbox");

                    if ($this[0].checked) {
                        $own_check.prop("checked", true);
                        var Is_all = true;
                        $Siblings.each(function (i, item) {
                            if (!item.checked)
                                Is_all = false;
                        });
                        if (Is_all) {
                            $parent_check.prop("checked", true);
                            $parent_check.prop("indeterminate", false);
                        } else {
                            $parent_check.prop("checked", false);
                            $parent_check.prop("indeterminate", true);
                        }
                    } else {
                        $own_check.prop("checked", false);
                        var Is_all = true;
                        $Siblings.each(function (i, item) {
                            if (item.checked || $(item).prop("indeterminate"))
                                Is_all = false;
                        });
                        $parent_check.prop("checked", false);
                        if (Is_all) {
                            $parent_check.prop("indeterminate", false);
                        } else {
                            $parent_check.prop("indeterminate", true);
                        }
                    }

                    if ($parent_check[0])
                        CheckTree($parent_check);

                    model.com.GetLineName(GUD.Data_Gantt);

                    CheckPart(GUD.Data_Gantt);
                });


                var fn = function (data, source) {

                };

                //甘特图
                $("body").delegate("#lmvt-table-gantt", "click", function () {
                    var SelectData1 = $com.table.getSelectionData($(".lmvt-APSorder-body"), "ID", countList);

                    var SelectData2 = $com.table.getSelectionData($(".lmvt-ALLAPSorder-body"), "showID", APS_arr);
                    var data = [],
                        //任务名称 
                        yAxisData = [],
                        position = {
                            //天数间隔
                            spacePx: 25.0,
                            //左边菜单栏像素
                            freedomPx: 200,
                            //
                            contextHight: 0,
                            radius: 4,
                            LinePart: [],

                            tip: {
                                //提示条宽度，高度，行高
                                Text: { tipW: 150, tipH: 70, lineH: 15, titleH: 30 },
                                title: { text: '订单', prop: 'task', visible: true },
                                line: [
                                    { text: '开始时间', prop: 'startDate', visible: true },
                                    { text: '时长', prop: 'time', visible: true },
                                ]
                            },
                            series: {
                                data: [
                                    "2019-04-18",
                                    "2019-10-24",
                                ]
                            },
                            Task: {

                            },

                            yAxis: {


                            },
                            fn: function (data, source) {
                                var obj1 = $(".lmvt-ALLAPSorder-body"),
                                    obj2 = HTML.CountListAll;

                                $.each(APS_arr, function (i, item_i) {
                                    $.each(source, function (i, item_j) {
                                        if (item_j.Part == item_i.PartName) {
                                            item_i.StartTime = $com.util.format('yyyy-MM-dd hh:mm:ss', item_j.startDate);
                                            item_i.FinishedTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date(item_i.StartTime).getTime() + item_j.time * (24 * 3600000));
                                        }
                                    });

                                });
                                model.com.RenderOrder(obj1, APS_arr, obj2);
                            },
                        },
                        TaskData = [];



                    //对第一种数据类型进行判断
                    $.each(SelectData1, function (i, item_i) {
                        if (item_i.OrderType == "插单")
                            $.each(ERPOrderPlanData_source, function (j, item_j) {
                                if (item_i.OrderNo == item_j.OrderNo)
                                    $.each(item_j.OrderList, function (k, item_k) {
                                        data.push(item_k);

                                    });
                            });
                        else
                            $.each(APSOrderList, function (k, item_k) {
                                if (item_i.OrderNo == item_k.OrderNo)

                                    data.push(item_k);
                            });
                    });
                    //对第二种数据类型进行判断
                    $.each(SelectData2, function (i, item_i) {

                        data.push(item_i);

                    });

                    model.com.GetLineName(data);

                    $.each(data, function (i, item) {
                        yAxisData.push(item.ProductNo);

                        TaskData.push({
                            task: item.OrderNo,
                            startDate: item.StartTime,
                            time: model.com.GetDays(item.StartTime, item.FinishedTime),
                            color: "green",
                            Line: item.LineName,
                            Part: item.PartName,
                        })
                    });

                    GanttData = data;

                    position.Task.data = TaskData;
                    position.yAxis.data = yAxisData;

                    position.contextHight = (position.yAxis.data.length + 1) * 35;
                    //if (position.contextHight < 300)
                    //    position.contextHight = 300;

                    $(".lmvt-container-count-drawing-gantt").css("height", position.contextHight + "px");

                    $gantt.install($('.lmvt-container-count-drawing-gantt'), position, fn);

                    $gantt.resfushCanvas(position.Task.data);

                    $(".lmvt-container-count-drawing").show();

                });
                //运算订单
                $("body").delegate("#lmvt-table-count-check", "click", function () {

                    $("body").append($com.modal.show(DEFAULT_VALUE_MESCheck, KETWROD_Template_MESCheck, "运算", function (rst) {
                        //调用修改函数
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        wID = Number(rst.WorkShopID);

                        lID = Number(rst.LineID);

                        mID = Number(rst.Mode);

                        model.com.refresh();

                    }, TypeSource_MESCheck));
                });
                //查询待选生产订单
                $("body").delegate("#lmvt-tableorderERPMES-check", "click", function () {

                    $("body").append($com.modal.show(DEFAULT_VALUE_ERPMESTime, KETWROD_Template_ERPMESTime, "查询时间内所有订单", function (rst) {
                        //调用修改函数
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        sTime = $com.util.format('yyyy-MM-dd hh:mm:ss', rst.sTime);
                        eTime = $com.util.format('yyyy-MM-dd hh:mm:ss', rst.eTime);

                        model.com.refresh();

                    }, TypeSource_ERPMESTime));
                });
                //删除候选订单
                $("body").delegate("#lmvt-tableorderERPMES-delete", "click", function () {

                    var SelectData1 = $com.table.getSelectionData($(".lmvt-orderERPMES-body"), "ID", ERPMESOrder);
                    var SelectData2 = $com.table.getSelectionData($(".lmvt-orderERPMESALL-body"), "showID", arr);



                    if (SelectData1.length > 0) {
                        if (!SelectData1 || !SelectData1.length) {
                            alert("请先选择一行数据再试！")
                            return;
                        }
                        if (!confirm("已选择" + SelectData1.length + "条订单，确定删除整个订单？")) {
                            return;
                        }

                        var dataSource = [];
                        $.each(SelectData1, function (i, item_i) {
                            $.each(ERPMESData_source, function (j, item_j) {
                                if (item_i.OrderNo == item_j.OrderNo)
                                    dataSource.push(item_j);
                            });
                        });


                    }
                    if (SelectData2.length > 0) {
                        if (!SelectData2 || !SelectData2.length) {
                            alert("请先选择一行数据再试！")
                            return;
                        }
                        if (!confirm("已选择" + SelectData1.length + "条订单，确定删除数据？")) {
                            return;
                        }
                        var dataSource = [],
                            nArry = [];
                        $.each(SelectData2, function (i, item_i) {
                            $.each(arr, function (j, item_j) {
                                if (item_i.showID == item_j.showID)
                                    nArry.push(item_i.ID);
                            });
                        });

                        $.each(ERPMESData_source, function (i, item_i) {
                            $.each(nArry, function (j, item_j) {
                                if (item_i.ID == item_j)
                                    dataSource.push(item_i);
                            });
                        });

                    }
                    $.each(dataSource, function (i, item_i) {
                        $.each(AllERPData, function (j, itme_j) {
                            if (item_i.OrderNo == itme_j.OrderNo) {
                                alert(item_i.OrderNo + "已存在于生产订单列表中")
                                return;
                            }
                        });
                    });

                    $.each(dataSource, function (i, item) {
                        model.com.postMESERPOrderDelete({
                            data: item
                        }, function (res) {
                            alert("删除成功！！");
                            model.com.refresh();
                        });
                    });

                });
                //ERP订单导入
                $("body").delegate("#lmvt-table-inERPMES", "click", function () {

                    var SelectData1 = $com.table.getSelectionData($(".lmvt-orderERP-body"), "ID", order);

                    if (!SelectData1 || !SelectData1.length) {
                        alert("请先选择一行数据再试！")
                        return;
                    }

                    var dataSource = [],
                        temp = false;

                    $.each(SelectData1, function (i, item_i) {
                        $.each(orderERPList_source, function (j, item_j) {
                            if (item_i.ERPOrderID == item_j.ERPOrderID)
                                dataSource.push(item_j);
                        });
                    });

                    var workArry = [];
                    $.each(SelectData1, function (i, item_i) {
                        $.each(order, function (j, item_j) {
                            if (item_i.ERPOrderID == item_j.ERPOrderID)
                                workArry.push(item_j);
                        });
                    });

                    $.each(dataSource, function (i, item_i) {
                        $.each(AllERPData, function (j, itme_j) {
                            if (item_i.ERPOrderID == itme_j.OrderNo) {
                                alert("订单号为" + item_i.ERPOrderID + "已存在于生产订单列表中");
                                temp = true;
                                return false;
                            }
                        });
                    });

                    $.each(dataSource, function (i, item) {
                        $.each(workArry, function (j, item_j) {
                            if (item.ERPOrderID == item_j.ERPOrderID)
                                item.WorkShopID = item_j.WorkShopID
                            if (item_j.Active == "激活")
                                item.Active = 2;
                            else
                                item.Active = 1;
                        });
                        item.OrderNo = item.ERPOrderID;
                        item.ERPLineID = item.LineID;
                        item.EntryID = item.ERPEntryID;
                        item.BOMNo = item.ERPBOMNo
                        item.Status = 2;
                    });

                    if (temp) {
                        return;
                    }

                    $.each(dataSource, function (i, item) {
                        model.com.postMESERPOrderSave({
                            data: item
                        }, function (res) {
                            alert("导入成功！！");
                            model.com.refresh();
                        });
                    });

                });
                //查询订单
                $("body").delegate("#lmvt-table-check", "click", function () {

                    $("body").append($com.modal.show(DEFAULT_VALUE_Time, KETWROD_Template_Time, "查询", function (rst) {
                        //调用修改函数
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        Start = $com.util.format('yyyy-MM-dd hh:mm:ss', rst.startTime);

                        model.com.refresh();

                    }, TypeSource_Time));
                });
                //查询MES订单
                $("body").delegate("#lmvt-tableorderMES-check", "click", function () {

                    $("body").append($com.modal.show(DEFAULT_VALUE_MESTime, KETWROD_Template_MESTime, "查询", function (rst) {
                        //调用修改函数
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        msTime = $com.util.format('yyyy-MM-dd hh:mm:ss', rst.msTime);
                        meTime = $com.util.format('yyyy-MM-dd hh:mm:ss', rst.meTime);

                        model.com.refresh();

                    }, TypeSource_MESTime));
                });
                //双击计划订单表
                $("body").delegate(".lmvt-APSorder-body tr", "dblclick", function () {
                    var $this = $(this),
                        id = $this.find("td[data-title=ID]").attr("data-value"),
                        OrderNo;
                    APS_arr = [];
                    $.each(countList, function (i, item) {
                        if (item.ID == id)
                            OrderNo = item.OrderNo;
                    });
                    $.each(ERPOrderPlanData_source, function (j, item_j) {
                        $.each(item_j.OrderList, function (k, item_k) {
                            if (OrderNo == item_k.OrderNo) {
                                item_k.OrderType = "插单"
                                APS_arr.push(item_k);
                            }
                        });
                    });
                    $.each(APSOrderList, function (j, item_j) {
                        if (OrderNo == item_j.OrderNo) {
                            item_j.OrderType = "MES订单"
                            APS_arr.push(item_j);
                        }
                    });



                    model.com.GetPartName(APS_arr);
                    $.each(APS_arr, function (i, item) {
                        item.CreateDate = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                        item.showID = i + 1;


                    });


                    $(".lmvt-container-count-table-basic").hide();
                    $(".lmvt-container-count-table-APSorder").show();

                    model.com.RenderOrder($(".lmvt-ALLAPSorder-body"), APS_arr, HTML.CountListAll);
                    //$(".lmvt-ALLAPSorder-body").html($com.util.template(APS_arr, HTML.CountListAll));

                });
                //双击ERP订单事件
                $("body").delegate(".lmvt-orderERP-body tr", "dblclick", function () {
                    var $this = $(this),
                        id = $this.find("td[data-title=ID]").attr("data-value"),
                        orderID;
                    ERP_arr = [];
                    $.each(order, function (i, item) {
                        if (item.ID == id)
                            orderID = item.ERPOrderID;

                    });
                    $.each(orderERPList_source, function (j, item_j) {
                        if (orderID == item_j.ERPOrderID)
                            ERP_arr.push(item_j);
                    });
                    $.each(ERP_arr, function (i, item) {
                        item.ID = i + 1;
                        item.Active = 2;
                        item.CreateDate = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                        item.showID = i + 1;
                    });
                    model.com.GetPartName(ERP_arr);
                    model.com.GetOrderStatus(ERP_arr);
                    $(".lmvt-container-table-basic").hide();
                    $(".lmvt-container-table-orderERPALL").show();
                    $(".lmvt-orderERPALL-body").html($com.util.template(ERP_arr, HTML.OrderERPListAll));

                });
                //双击ERPMES订单事件
                $("body").delegate(".lmvt-orderERPMES-body tr", "dblclick", function () {
                    var $this = $(this),
                        id = $this.find("td[data-title=ID]").attr("data-value"),
                        orderID;
                    arr = [];
                    $.each(ERPMESOrder, function (i, item) {
                        if (item.ID == id)
                            orderID = item.OrderNo;
                    });
                    $.each(ERPMESData_source, function (j, item_j) {
                        if (orderID == item_j.OrderNo)
                            arr.push(item_j);
                    });
                    $.each(arr, function (i, item) {
                        item.CreateDate = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                        item.showID = i + 1;
                    });
                    model.com.GetPartName(arr);
                    model.com.GetOrderStatus(arr);
                    $(".lmvt-container-orderERP-table-basic").hide();
                    $(".lmvt-container-table-orderERP-orderERPALL").show();
                    $(".lmvt-orderERPMESALL-body").html($com.util.template(arr, HTML.OrderERPMESListAll));

                });
                //双击MES订单事件
                $("body").delegate(".lmvt-orderMES-body tr", "dblclick", function () {
                    var $this = $(this),
                        id = $this.find("td[data-title=ID]").attr("data-value"),
                        orderID,
                        MES_Arr = [];
                    $.each(MESOrder, function (i, item) {
                        if (item.ID == id)
                            orderID = item.OrderNo;
                    });
                    $.each(MESData_source, function (j, item_j) {
                        if (orderID == item_j.OrderNo)
                            MES_Arr.push(item_j);
                    });
                    $.each(MES_Arr, function (i, item) {
                        item.CreateDate = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                        item.showID = i + 1;
                    });
                    model.com.GetPartName(MES_Arr);
                    model.com.GetOrderStatus(MES_Arr);
                    $(".lmvt-container-orderMES-table-basic").hide();
                    $(".lmvt-container-table-orderMES-orderERPALL").show();
                    $(".lmvt-orderMESALL-body").html($com.util.template(MES_Arr, HTML.OrderERPMESListAll));

                });
                //返回ERP订单
                $("body").delegate("#lmvt-back", "click", function () {
                    model.com.refresh();
                    $(".lmvt-container-table-basic").show();
                    $(".lmvt-container-table-orderERPALL").hide();
                });
                //返回ERPMES订单
                $("body").delegate("#lmvt-ERPMEStable-back", "click", function () {
                    model.com.refresh();
                    $(".lmvt-container-orderERP-table-basic").show();
                    $(".lmvt-container-table-orderERP-orderERPALL").hide();
                });
                //返回MES订单
                $("body").delegate("#lmvt-MEStable-back", "click", function () {
                    model.com.refresh();
                    $(".lmvt-container-orderMES-table-basic").show();
                    $(".lmvt-container-table-orderMES-orderERPALL").hide();
                });
                //返回计划订单
                $("body").delegate("#lmvt-APStable-back", "click", function () {
                    model.com.refresh();
                    $(".lmvt-container-count-table-basic").show();
                    $(".lmvt-container-count-table-APSorder").hide();
                });
                //导出ERP
                $("body").delegate("#lmvt-table-out", "click", function () {

                    $(".lmvt-ERP-body").html($com.util.template(orderERPList_source, HTML.OrderERPListAll));

                    var $table = $(".ERPtable"),
                        fileName = "ERP订单.xls",
                        Title = "ERP订单";
                    var params = $com.table.getExportParams($table, fileName, Title);

                    model.com.postExportExcel(params, function (res) {
                        var src = res.info.path;
                        window.open(src);
                    });
                });
                //导出ERPMES
                $("body").delegate("#lmvt-tableorderERPMES-out", "click", function () {

                    $(".lmvt-ERPMEStable-body").html($com.util.template(orderERPMESList_source, HTML.OrderERPMESListAll));

                    var $table = $(".ERPMEStable"),
                        fileName = "候选生产订单.xls",
                        Title = "候选生产订单";
                    var params = $com.table.getExportParams($table, fileName, Title);

                    model.com.postExportExcel(params, function (res) {
                        var src = res.info.path;
                        window.open(src);
                    });
                });
                //导出MES
                $("body").delegate("#lmvt-tableorderMES-out", "click", function () {

                    $(".lmvt-MEStable-body").html($com.util.template(orderMESList_source, HTML.OrderERPMESListAll));

                    var $table = $(".MEStable"),
                        fileName = "MES生产订单.xls",
                        Title = "MES生产订单";
                    var params = $com.table.getExportParams($table, fileName, Title);

                    model.com.postExportExcel(params, function (res) {
                        var src = res.info.path;
                        window.open(src);
                    });
                });
                //待选生产订单 
                $("body").delegate("#lmvt-orderERPMES", "click", function () {
                    $(".changeName").text("候选生产订单");
                    $(".lmvt-container-orderERP").show();
                    $(".lmvt-container-orderMES").hide();
                    $(".lmvt-container-count").hide();
                    $(".lmvt-container").hide();
                });
                //ERP订单
                $("body").delegate("#lmvt-orderERP", "click", function () {
                    $(".changeName").text("ERP订单");
                    $(".lmvt-container-orderERP").hide();
                    $(".lmvt-container-orderMES").hide();
                    $(".lmvt-container-count").hide();
                    $(".lmvt-container").show();
                });
                //生产订单
                $("body").delegate("#lmvt-orderMES", "click", function () {
                    $(".changeName").text("生产队列订单");
                    $(".lmvt-container-orderERP").hide();
                    $(".lmvt-container-orderMES").show();
                    $(".lmvt-container").hide();
                    $(".lmvt-container-count").hide();
                });
                //订单运算
                $("body").delegate("#lmvt-tableorderERPMES-count", "click", function () {
                    $(".lmvt-container-orderERP").hide();
                    $(".lmvt-container-count").show();
                });
            },
            run: function () {

                //获得车间产线
                model.com.getWorkShop({}, function (res) {
                    if (!res)
                        return;
                    var list = res.list,
                        rst = [];
                    if (list) {
                        workshop_source = res.list;
                        workshop_source = $com.util.Clone(workshop_source);
                    }
                    model.com.getPartName({}, function (Part_data) {
                        var Part_Source = Part_data.list;
                        $.each(workshop_source, function (l_i, l_item) {
                            //l_item workshop
                            $.each(l_item.LineList, function (p_i, p_item) {
                                //p_item Line
                                //获得当前Line的工序段列表
                                p_item.PartList = model.com.getPartList(l_item.ID, p_item.ID, Part_Source);
                            })
                        })
                        model.com.renderTree(workshop_source);
                    })
                });

                //APS订单
                model.com.getAPSOrderAll({ WorkshopID: 0 }, function (res) {
                    if (!res)
                        return;
                    var list = res.list,
                        rst = [];
                    if (list) {
                        APSOrderList = res.list;
                    }

                });

                //车间产线
                model.com.getWorkShop({}, function (res) {
                    if (!res)
                        return;
                    var list = res.list,
                        rst = [];
                    if (list) {
                        $.each(res.list, function (i, item_i) {
                            TypeSource_MESCheck.WorkShopID.push({
                                name: item_i.WorkShopName,
                                value: item_i.ID,
                            });
                            $.each(item_i.LineList, function (j, item_j) {
                                TypeSource_MESCheck.LineID.push({
                                    name: item_j.ItemName,
                                    value: item_j.ID,
                                    far: item_i.ID
                                });

                            });
                        });
                    }
                });

                //工序段
                model.com.getAPSPartAll({}, function (res) {
                    if (!res)
                        return;
                    var list = res.list,
                        rst = [];
                    if (list) {
                        ALLPart = res.list;
                    }
                });

                //所有MES订单  过去一年时间订单
                model.com.getMESOrderAll({ orderNo: "", productNo: "", materialNo: "", workShopID: 0, lineID: 0, partID: 0, status: 0, type: 0, active: 2, startTime: "2000-10-08 11:32:00", endTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()) }, function (res) {
                    if (!res)
                        return;
                    var list = res.list,
                        rst = [];
                    if (list) {
                        AllERPData = res.list;
                    }

                });
            },
            com: {
                //工序段
                getPartName: function (data, fn, context) {
                    var d = {
                        $URI: "/APSLine/ConfigAll",
                        $TYPE: "get"
                    };

                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }

                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //车间
                getWorkShop: function (data, fn, context) {
                    var d = {
                        $URI: "/WorkShop/All",
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
                        $com.app.tip('提交失败，请检查网络');
                    }

                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //ERP订单
                getERPOrderAll: function (data, fn, context) {
                    var d = {
                        $URI: "/ERPInterface/ERPOrderAll",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //ERPMES订单
                getERPMESOrderAll: function (data, fn, context) {
                    var d = {
                        $URI: "/MESOrder/MESERPOrderAll",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                postMESERPOrderDelete: function (data, fn, context) {
                    var d = {
                        $URI: "/MESOrder/MESERPOrderDelete",
                        $TYPE: "post"
                    };
                    function err() {
                        $com.app.tip('提交失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                postMESERPOrderSave: function (data, fn, context) {
                    var d = {
                        $URI: "/MESOrder/MESERPOrderSave",
                        $TYPE: "post"
                    };
                    function err() {
                        $com.app.tip('提交失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //MES订单
                getMESOrderAll: function (data, fn, context) {
                    var d = {
                        $URI: "/MESOrder/MESOrderAll",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //工序段
                getAPSPartAll: function (data, fn, context) {
                    var d = {
                        $URI: "/APSPart/All",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //运算订单
                getAPSOrderERPOrderPlan: function (data, fn, context) {
                    var d = {
                        $URI: "/APSOrder/ERPOrderPlan",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //Aps订单
                getAPSOrderAll: function (data, fn, context) {
                    var d = {
                        $URI: "/APSOrder/All",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },

                refresh: function () {
                    //运算订单
                    model.com.getAPSOrderERPOrderPlan({ WorkShopID: wID, LineID: lID, Mode: mID }, function (res) {
                        if (!res)
                            return;
                        var list = res.list,
                            rst = [];
                        if (list) {
                            ERPOrderPlanList_source = res.list;

                            ERPOrderPlanData_source = res.list;

                            ERPOrderPlanList_source = $com.util.Clone(ERPOrderPlanList_source);
                            var Plan_source = [];

                            $.each(ERPOrderPlanList_source, function (i, item) {
                                item.OrderType = "插单";
                                $.each(item.OrderList, function (j, item_j) {
                                    model.com.GetDays(item_j.StartTime, item_j.FinishedTime);
                                });
                            });

                            $.each(APSOrderList, function (i, item) {
                                if (wID == 0) {
                                    item.OrderType = "MES订单";
                                    Plan_source.push(item);
                                }
                                else
                                    if (item.LineID == lID && item.WorkShopID == wID) {
                                        item.OrderType = "MES订单";
                                        Plan_source.push(item);
                                    }
                            });

                            ERPOrderPlanList_source = ERPOrderPlanList_source.concat(Plan_source);

                            var arry = {};
                            $.each(ERPOrderPlanList_source, function (i, item) {
                                if (!arry[item.OrderNo]) {
                                    arry[item.OrderNo] = {};

                                    arry[item.OrderNo].OrderNo = item.OrderNo;
                                    arry[item.OrderNo].WorkShopID = item.WorkShopID;
                                    arry[item.OrderNo].LineID = item.LineID;
                                    arry[item.OrderNo].LineID = item.LineID;
                                    arry[item.OrderNo].OrderType = item.OrderType;
                                    arry[item.OrderNo].APSText = item.APSText;
                                    arry[item.OrderNo].ID;
                                }
                                GUD.Data_Gantt.push(item);
                            });

                            $.each(arry, function (i, item) {
                                countList.push(item);
                            });
                            $.each(countList, function (i, item) {
                                item.ID = i + 1;
                            });
                        }
                        $(".lmvt-APSorder-body").html($com.util.template(countList, HTML.CountList));
                    });
                    //ERP
                    model.com.getERPOrderAll({ StartTime: Start }, function (res) {
                        if (!res)
                            return;
                        var list = res.list,
                            rst = [];
                        if (list) {
                            orderERPList_source = res.list;

                            Data_source = res.list;

                            orderERPList_source = $com.util.Clone(orderERPList_source);
                            var arry = {};
                            order = [];
                            $.each(orderERPList_source, function (i, itme) {
                                if (!arry[itme.ERPOrderID]) {
                                    arry[itme.ERPOrderID] = {};
                                }
                                itme.CreateDate = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                                itme.Active = 2;
                                for (var k in PartList) {
                                    if (itme.PartID == PartList[k] == 50) {
                                        itme.WorkShopID = 3;
                                        itme.ERPLineID = 1;
                                    }
                                    if (itme.PartID == PartList[k] == 30) {
                                        itme.WorkShopID = 2;
                                        itme.ERPLineID = 1;
                                    }
                                    else
                                        itme.WorkShopID = 1;
                                }
                                itme.ID = i + 1;
                                arry[itme.ERPOrderID].ERPOrderID = itme.ERPOrderID;
                                arry[itme.ERPOrderID].WorkShopID = itme.WorkShopID;
                                arry[itme.ERPOrderID].ERPLineID = itme.ERPLineID;
                                arry[itme.ERPOrderID].ID;
                            });

                            $.each(arry, function (i, item) {
                                order.push(item);
                            });
                            $.each(order, function (i, item) {
                                item.ID = i + 1;
                            });
                            model.com.GetOrderStatus(orderERPList_source);
                            $(".lmvt-orderERP-body").html($com.util.template(order, HTML.OrderERPList));
                        }

                    });

                    //ERPMES
                    model.com.getERPMESOrderAll({ orderNo: "", productNo: "", materialNo: "", workShopID: 0, lineID: 0, partID: 0, status: 0, type: 0, active: 2, startTime: sTime, endTime: eTime }, function (res) {
                        var arry = {};
                        ERPMESOrder = [];
                        if (!res)
                            return;
                        var list = res.list,
                            rst = [];
                        if (list) {
                            orderERPMESList_source = res.list;

                            ERPMESData_source = res.list;

                            orderERPMESList_source = $com.util.Clone(orderERPMESList_source);

                            $.each(orderERPMESList_source, function (i, item) {
                                if (!arry[item.OrderNo])
                                    arry[item.OrderNo] = {};
                                //for (var p in arry) {
                                //    arry[item.OrderNo].OrderNo = p;
                                //    arry[item.OrderNo].WorkShopID = item.WorkShopID;
                                //    arry[item.OrderNo].LineID = item.LineID;
                                //    arry[item.OrderNo].Status = item.Status;
                                //}
                                arry[item.OrderNo].OrderNo = item.OrderNo;
                                arry[item.OrderNo].WorkShopID = item.WorkShopID;
                                arry[item.OrderNo].LineID = item.LineID;
                                arry[item.OrderNo].Status = item.Status;
                                item.showID = i + 1;
                                item.CreateDate = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                            });
                            model.com.GetPartName(orderERPMESList_source);
                            $.each(arry, function (i, item) {
                                ERPMESOrder.push(item);
                            });
                            $.each(ERPMESOrder, function (i, item) {
                                item.ID = i + 1;
                            });
                            model.com.GetOrderStatus(orderERPMESList_source);
                            model.com.GetOrderStatus(ERPMESOrder);
                        }
                        $(".lmvt-orderERPMES-body").html($com.util.template(ERPMESOrder, HTML.OrderERPMESList));
                    });
                    //MES
                    model.com.getMESOrderAll({ orderNo: "", productNo: "", materialNo: "", workShopID: 0, lineID: 0, partID: 0, status: 0, type: 0, active: 2, startTime: msTime, endTime: meTime }, function (res) {
                        var M_arry = {};
                        MESOrder = [];
                        if (!res)
                            return;
                        var list = res.list,
                            rst = [];
                        if (list) {
                            orderMESList_source = res.list;

                            MESData_source = res.list;

                            orderMESList_source = $com.util.Clone(orderMESList_source);

                            $.each(orderMESList_source, function (i, item) {
                                if (!M_arry[item.OrderNo])
                                    M_arry[item.OrderNo] = {};

                                //for (var p in M_arry) {
                                //    M_arry[p].OrderNo = p;
                                //    M_arry[p].WorkShopID = item.WorkShopID;
                                //    M_arry[p].LineID = item.LineID;
                                //    M_arry[p].Status = item.Status;
                                //}
                                M_arry[item.OrderNo].OrderNo = item.OrderNo;
                                M_arry[item.OrderNo].WorkShopID = item.WorkShopID;
                                M_arry[item.OrderNo].LineID = item.LineID;
                                M_arry[item.OrderNo].Status = item.Status;
                                item.showID = i + 1;
                                item.CreateDate = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                            });

                            model.com.GetPartName(orderMESList_source);
                            model.com.GetOrderStatus(orderMESList_source);

                            $.each(M_arry, function (i, item) {
                                MESOrder.push(item);
                            });
                            $.each(MESOrder, function (i, item) {
                                item.ID = i + 1;
                            });
                            model.com.GetOrderStatus(MESOrder);
                        }
                        $(".lmvt-orderMES-body").html($com.util.template(MESOrder, HTML.OrderERPMESList));
                    });

                },
                //得到数据
                GetSource: function (source) {
                    var arry = [];
                    $.each(source, function (i, item_i) {
                        $.each(countList, function (j, item_j) {
                            if (item_i.OrderNo == item_j.OrderNo)
                                arry.push(item_j);
                        });
                        $.each(APSOrderList, function (k, item_k) {
                            if (item_k.OrderNo == item_k.OrderNo)
                                arry.push(item_k);
                        });
                    });
                    return arry;
                },
                //车间产线树
                renderTree: function (list) {
                    model._treeData = list;
                    $.each(list, function (i, item) {
                        $.each(item.LineList, function (_i, _item) {
                            _item.Items = $com.util.template(_item.PartList, HTML.TreePartItemNode);
                        })
                        item.Items = $com.util.template(item.LineList, HTML.TreeLineItemNode);
                    })
                    workshop_source = list;
                    $(".lmvt-Tree").html($com.util.template(list, HTML.TreeWorkshopItemNode));
                    $(".lmvt-Tree").treeview();

                },
                //计算天数
                GetDays: function (startDate, endDate) {
                    var days;
                    days = (new Date(endDate) - new Date(startDate)) / 1000 / 60 / 60 / 24;
                    return days;
                },
                //工序段名称
                GetPartName: function (source) {
                    $.each(source, function (i, item_i) {
                        $.each(ALLPart, function (j, item_j) {
                            if (item_i.PartID == item_j.PartID)
                                item_i.PartName = item_j.PartName;
                        });
                    });
                    return source;
                },
                //产线名称
                GetLineName: function (source) {
                    $.each(workshop_source, function (i, item_i) {
                        $.each(source, function (j, item_j) {
                            if (item_j.WorkShopID == item_i.ID)
                                $.each(item_i.LineList, function (k, item_k) {
                                    if (item_j.LineID == item_k.ID)
                                        item_j.LineName = item_k.ItemName
                                });
                        });
                    });
                },
                //订单状态
                GetOrderStatus: function (source) {
                    $.each(source, function (i, item_i) {
                        $.each(OrderStatus.Description, function (j, item_j) {
                            if (item_i.Active == item_j.value)
                                item_i.Active = item_j.name;
                        });
                        $.each(OrderStatus.Active, function (k, item_k) {
                            if (item_i.Status == item_k.value)
                                item_i.Status = item_k.name;
                        });
                    });
                },
                //获得此LineID的工序段列表
                getPartList: function (_WorkShopID, _LineID, LineList) {
                    var PartList = [];
                    $.each(LineList, function (_i, _item) {
                        if (_item.LineID == _LineID && _item.WorkShopID == _WorkShopID) {
                            PartList = _item.PartList;
                        }
                    })
                    return PartList;
                },
                //第二个页面的渲染
                RenderOrder: function (obj1, source, obj2) {
                    obj1.html($com.util.template(source, obj2));
                },
                //接受来自gantt的数据渲染页面
                GetGanttSource: function (source, number) {
                    var arry = [],
                        obj1 = $(".lmvt-ALLAPSorder-body"),
                        obj2 = HTML.CountListAll;
                    $.each(GanttData, function (i, item_i) {
                        $.each(source, function (j, item_j) {

                            if (item_j.Part == item_i.PartName) {
                                //不拖动
                                if (number != 2) {
                                    //左边不动
                                    if (new Date(item_i.StartTime) == new Date(item_j.startDate)) {
                                        item_i.FinishedTime = $com.util.format('yyyy-MM-dd hh:mm:ss', ((new Date(item_i.StartTime) / 1000 / 60 / 60 / 24) + item_j.time));
                                    }
                                    //右边不动
                                    else if (new Date(item_i.FinishedTime) == new Date(item_j.FinishedTime)) {
                                        item_i.StartTime = $com.util.format('yyyy-MM-dd hh:mm:ss', ((new Date(item_i.FinishedTime) / 1000 / 60 / 60 / 24) - item_j.time));
                                    }
                                }
                                //拖动
                                else {
                                    item_i.StartTime = item_j.startDate;
                                    item_i.FinishedTime = $com.util.format('yyyy-MM-dd hh:mm:ss', ((new Date(item_i.StartTime) / 1000 / 60 / 60 / 24) + item_j.time));
                                }

                            }

                        });
                        arry.push(item_i);
                    });
                    model.com.RenderOrder(obj1, arry, obj2);
                },

            },
        });
        model.init();
    });