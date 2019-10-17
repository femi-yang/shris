require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base', '../static/utils/js/ganttUtil', '../static/utils/js/base/jquery.treeview'],
    function ($lin, $com, $gantt, $treeview) {
        var HTML,
            msTime,
            meTime,
            MESOrder,
            orderMESList_source,
            MESData_source,
            ALLPart,

            APSOrderList_source,
            APSData_source,
            ChangeList,
            APSChange_arr,
            wID,
            lID,

            GUD,
            workshop_source,
            TaskData,
            yAxisData,

            DEFAULT_VALUE_MESTime,
            KETWROD_LIST_MESTime,
            KETWROD_Template_MESTime,
            Formattrt_MESTime,
            TypeSource_MESTime,

            //订单查询
            DEFAULT_VALUE_MESChange,
            KETWROD_LIST_MESChange,
            KETWROD_Template_MESChange,
            Formattrt_MESChange,
            TypeSource_MESChange;

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

            OrderMESList: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                '<td style="min-width: 80px" data-title="OrderNo" data-value="{{OrderNo}}" >{{OrderNo}}</td>',
                '<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}" >{{WorkShopID}}</td>',
                '<td style="min-width: 50px" data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
                '<td style="min-width: 50px" data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
                '<tr>'
            ].join(""),

            OrderMESListAll: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="showID" data-value="{{showID}}" >{{showID}}</td>',
                '<td style="min-width: 80px" data-title="OrderNo" data-value="{{OrderNo}}" >{{OrderNo}}</td>',
                '<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}" >{{WorkShopID}}</td>',
                '<td style="min-width: 50px" data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
                '<td style="min-width: 50px" data-title="EntryID" data-value="{{EntryID}}" >{{EntryID}}</td>',
                '<td style="min-width: 80px" data-title="ProductNo" data-value="{{ProductNo}}" >{{ProductNo}}</td>',
                '<td style="min-width: 80px" data-title="PartName" data-value="{{PartName}}" >{{PartName}}</td>',
                '<td style="min-width: 80px" data-title="MaterialNo" data-value="{{MaterialNo}}" >{{MaterialNo}}</td>',
                '<td style="min-width: 80px" data-title="MaterialName" data-value="{{MaterialName}}" >{{MaterialName}}</td>',
                '<td style="min-width: 80px" data-title="FQTY" data-value="{{FQTY}}" >{{FQTY}}</td>',
                '<td style="min-width: 80px" data-title="FQTYDone" data-value="{{FQTYDone}}" >{{FQTYDone}}</td>',
                '<td style="min-width: 80px" data-title="FQTYFL" data-value="{{FQTYFL}}" >{{FQTYFL}}</td>',
                '<td style="min-width: 80px" data-title="StartDate" data-value="{{StartDate}}" >{{StartDate}}</td>',
                '<td style="min-width: 80px" data-title="FinishedDate" data-value="{{FinishedDate}}" >{{FinishedDate}}</td>',
                '<td style="min-width: 80px" data-title="BOMNo" data-value="{{BOMNo}}" >{{BOMNo}}</td>',
                '<td style="min-width: 80px" data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',
                '<td style="min-width: 80px" data-title="CreateDate" data-value="{{CreateDate}}" >{{CreateDate}}</td>',
                '<td style="min-width: 80px" data-title="Status" data-value="{{Status}}" >{{Status}}</td>',
                '<td style="min-width: 80px" data-title="OrderText" data-value="{{OrderText}}" >{{OrderText}}</td>',
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
        };

        GUD = {
            Data_Gantt: [],
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
                    value: 1
                },
                {
                    name: "关闭",
                    value: 0
                },
            ],
        };


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
        DEFAULT_VALUE_MESChange = {
            WorkShopID: 0,
            LineID: 0,
        };
        (function () {

            KETWROD_LIST_MESChange = [
                "WorkShopID|车间|ArrayOneControl",
                "LineID|产线|ArrayOneControl|WorkShopID",
            ];

            KETWROD_Template_MESChange = {};

            Formattrt_MESChange = {};

            TypeSource_MESChange = {
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

            $.each(KETWROD_LIST_MESChange, function (i, item) {
                var detail = item.split("|");
                KETWROD_Template_MESChange[detail[0]] = {
                    index: i,
                    name: detail[1],
                    type: detail.length > 2 ? detail[2] : undefined,
                    control: detail.length > 3 ? detail[3] : undefined
                };

                if (detail.length > 2) {
                    Formattrt_MESChange[detail[0]] = $com.util.getFormatter(TypeSource_MESChange, detail[0], detail[2]);
                }
            });
        })();

        model = $com.Model.create({
            name: 'MES订单',

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
                    var SelectData1 = $com.table.getSelectionData($(".lmvt-APSorder-body"), "ID", ChangeList);

                    var SelectData2 = $com.table.getSelectionData($(".lmvt-ALLAPSorder-body"), "showID", APSChange_arr);
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

                                $.each(APSChange_arr, function (i, item_i) {
                                    $.each(source, function (i, item_j) {
                                        if (item_j.Part == item_i.PartName) {
                                            item_i.StartTime = $com.util.format('yyyy-MM-dd hh:mm:ss', item_j.startDate);
                                            item_i.FinishedTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date(item_i.StartTime).getTime() + item_j.time * (24 * 3600000));
                                        }
                                    });

                                });
                                model.com.RenderOrder(obj1, APSChange_arr, obj2);
                            },
                        },
                        TaskData = [];

                    //对第一种数据类型进行判断
                    $.each(SelectData1, function (i, item_i) {
                        $.each(APSData_source, function (k, item_k) {
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

                    //GanttData = data;

                    position.Task.data = TaskData;
                    position.yAxis.data = yAxisData;

                    position.contextHight = (position.yAxis.data.length + 1) * 35;

                    $(".lmvt-container-count-drawing-gantt").css("height", position.contextHight + "px");

                    $gantt.install($('.lmvt-container-count-drawing-gantt'), position, fn);

                    $gantt.resfushCanvas(position.Task.data);

                    $(".lmvt-container-count-drawing").show();

                });
                //查询订单运算
                $("body").delegate("#lmvt-table-change-check", "click", function () {

                    $("body").append($com.modal.show(DEFAULT_VALUE_MESChange, KETWROD_Template_MESChange, "查询", function (rst) {
                        //调用修改函数
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        wID = Number(rst.WorkShopID);

                        lID = Number(rst.LineID);

                        model.com.refresh();

                    }, TypeSource_MESChange));
                });
                //双击订单调整
                $("body").delegate(".lmvt-APSorder-body tr", "dblclick", function () {
                    var $this = $(this),
                        id = $this.find("td[data-title=ID]").attr("data-value"),
                        OrderNo;
                    APSChange_arr = [];
                    $.each(ChangeList, function (i, item) {
                        if (item.ID == id)
                            OrderNo = item.OrderNo;
                    });
                    $.each(APSData_source, function (j, item_j) {
                        if (OrderNo == item_j.OrderNo) {
                            item_j.OrderType = "MES订单"
                            APSChange_arr.push(item_j);
                        }
                    });

                    model.com.GetPartName(APSChange_arr);
                    $.each(APSChange_arr, function (i, item) {
                        item.CreateDate = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
                        item.showID = i + 1;
                    });


                    $(".lmvt-container-count-table-basic").hide();
                    $(".lmvt-container-count-table-APSorder").show();

                    model.com.RenderOrder($(".lmvt-ALLAPSorder-body"), APSChange_arr, HTML.CountListAll);
                    //$(".lmvt-ALLAPSorder-body").html($com.util.template(APS_arr, HTML.CountListAll));

                });
                //返回订单调整
                $("body").delegate("#lmvt-APStable-back", "click", function () {
                    model.com.refresh();
                    $(".lmvt-container-count-table-basic").show();
                    $(".lmvt-container-count-table-APSorder").hide();
                });
                //返回MES订单
                $("body").delegate("#lmvt-MEStable-back", "click", function () {
                    model.com.refresh();
                    $(".lmvt-container-table-basic").show();
                    $(".lmvt-container-table-orderMES").hide();
                });
                //查询MES订单
                $("body").delegate("#lmvt-tableMES-check", "click", function () {

                    $("body").append($com.modal.show(DEFAULT_VALUE_MESTime, KETWROD_Template_MESTime, "查询", function (rst) {
                        //调用修改函数
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        msTime = $com.util.format('yyyy-MM-dd hh:mm:ss', rst.msTime);
                        meTime = $com.util.format('yyyy-MM-dd hh:mm:ss', rst.meTime);

                        model.com.refresh();

                    }, TypeSource_MESTime));
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
                    $(".lmvt-container-table-basic").hide();
                    $(".lmvt-container-table-orderMES").show();
                    $(".lmvt-orderMESALL-body").html($com.util.template(MES_Arr, HTML.OrderMESListAll));

                });
                //导出
                $("body").delegate("#lmvt-tableMES-out", "click", function () {

                    $(".lmvt-orderMESALLout-body").html($com.util.template(orderMESList_source, HTML.OrderMESListAll));

                    var $table = $(".orderMESALL"),
                        fileName = "MES订单.xls",
                        Title = "MES订单";
                    var params = $com.table.getExportParams($table, fileName, Title);

                    model.com.postExportExcel(params, function (res) {
                        var src = res.info.path;
                        window.open(src);
                    });
                });
                //激活MES订单
                $("body").delegate("#lmvt-tableMES-active", "click", function () {

                    var SelectData = $com.table.getSelectionData($(".lmvt-orderMES-body"), "ID", MESOrder);

                    if (!SelectData || !SelectData.length) {
                        alert("请先选择一行数据再试！")
                        return;
                    }
                    if (!confirm("已选择" + SelectData.length + "条订单，确定激活整个订单？")) {
                        return;
                    }

                    var dataSource = [];
                    $.each(SelectData, function (i, item_i) {
                        $.each(MESData_source, function (j, item_j) {
                            if (item_i.OrderNo == item_j.OrderNo)
                                dataSource.push(item_j);
                        });
                    });

                    $.each(dataSource, function (i, item) {
                        model.com.postMESOrderActive({
                            data: item
                        }, function (res) {
                            alert("激活成功！！");
                            model.com.refresh();
                        });
                    });

                });
                //关闭MES订单
                $("body").delegate("#lmvt-tableMES-forbidden", "click", function () {

                    var SelectData = $com.table.getSelectionData($(".lmvt-orderMES-body"), "ID", MESOrder);

                    if (!SelectData || !SelectData.length) {
                        alert("请先选择一行数据再试！")
                        return;
                    }
                    if (!confirm("已选择" + SelectData.length + "条订单，确定关闭整个订单？")) {
                        return;
                    }

                    var dataSource = [];
                    $.each(SelectData, function (i, item_i) {
                        $.each(MESData_source, function (j, item_j) {
                            if (item_i.OrderNo == item_j.OrderNo)
                                dataSource.push(item_j);
                        });
                    });

                    $.each(dataSource, function (i, item) {
                        model.com.postMESOrderDisable({
                            data: item
                        }, function (res) {
                            alert("关闭成功！！");
                            model.com.refresh();
                        });
                    });

                });
                //订单调整  
                $("body").delegate("#lmvt-tableMES-change", "click", function () {
                    model.com.refresh();
                    $(".lmvt-container-count").show();
                    $(".lmvt-container").hide();
                });
                //订单调整  
                $("body").delegate("#lmvt-MEStable-order", "click", function () {
                    $(".lmvt-container-count").hide();
                    $(".lmvt-container").show();
                });
                
            },
            run: function () {
                model.com.getAPSPartAll({}, function (res) {
                    if (!res)
                        return;
                    var list = res.list,
                        rst = [];
                    if (list) {
                        ALLPart = res.list;
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
                            TypeSource_MESChange.WorkShopID.push({
                                name: item_i.WorkShopName,
                                value: item_i.ID,
                            });
                            $.each(item_i.LineList, function (j, item_j) {
                                TypeSource_MESChange.LineID.push({
                                    name: item_j.ItemName,
                                    value: item_j.ID,
                                    far: item_i.ID
                                });

                            });
                        });
                    }
                });
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
            },
            com: {
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
                //激活
                postMESOrderActive: function (data, fn, context) {
                    var d = {
                        $URI: "/MESOrder/MESOrderActive",
                        $TYPE: "post"
                    };
                    function err() {
                        $com.app.tip('提交失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //关闭
                postMESOrderDisable: function (data, fn, context) {
                    var d = {
                        $URI: "/MESOrder/MESOrderDisable",
                        $TYPE: "post"
                    };
                    function err() {
                        $com.app.tip('提交失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //订单调整
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

                                M_arry[item.OrderNo].OrderNo = item.OrderNo;
                                M_arry[item.OrderNo].WorkShopID = item.WorkShopID;
                                M_arry[item.OrderNo].LineID = item.LineID;
                                M_arry[item.OrderNo].Active = item.Active;

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
                        $(".lmvt-orderMES-body").html($com.util.template(MESOrder, HTML.OrderMESList));
                    });
                    //订单调整
                    model.com.getAPSOrderAll({ WorkShopID: wID, LineID: lID }, function (res) {
                        if (!res)
                            return;
                        var list = res.list,
                            rst = [];
                        if (list) {
                            APSOrderList_source = res.list;

                            APSData_source = res.list;

                            APSOrderList_source = $com.util.Clone(APSOrderList_source);
                            //var Plan_source = [];

                            var arry = {};
                            ChangeList = [];

                            $.each(APSOrderList_source, function (i, item) {
                                item.OrderType = "MES订单";

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
                                ChangeList.push(item);
                            });
                            $.each(ChangeList, function (i, item) {
                                item.ID = i + 1;
                            });
                        }
                        $(".lmvt-APSorder-body").html($com.util.template(ChangeList, HTML.CountList));
                    });
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
                //工序段名称
                GetPartName: function (source) {
                    $.each(source, function (i, item_i) {
                        $.each(ALLPart, function (j, item_j) {
                            if (item_i.PartID == item_j.PartID)
                                item_i.PartName = item_j.PartName;
                        });
                    });
                },
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
                //订单状态
                GetOrderStatus: function (source) {
                    $.each(source, function (i, item_i) {
                        $.each(OrderStatus.Description, function (j, item_j) {
                            if (item_i.Status == item_j.value)
                                item_i.Status = item_j.name;
                        });
                        $.each(OrderStatus.Active, function (k, item_k) {
                            if (item_i.Active == item_k.value)
                                item_i.Active = item_k.name;
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
                //计算天数
                GetDays: function (startDate, endDate) {
                    var days;
                    days = (new Date(endDate) - new Date(startDate)) / 1000 / 60 / 60 / 24;
                    return days;
                },
            },
        });
        model.init();
    });