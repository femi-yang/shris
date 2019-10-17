require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'],
    function ($lin, $com) {

        var HTML,
            //所有地点信息
            StationList,
            //异常地点集合
            EXCStationSource,
            EXCStationList,
            //异常类型
            EXCTypeSource,
            EXCTypeList,
            //全局ID
            StationPointID,
            //人员信息
            UserAll,
            temp1,
            temp2,
            temp3,
            //类型
            Defaul_Value_Type,
            KETWROD_LIST_Type,
            KETWROD_Type,
            Formattrt_Type,
            TypeSource_Type,
            //规则
            Defaul_Value_Rule,
            KETWROD_LIST_Rule,
            KETWROD_Rule,
            Formattrt_Rule,
            TypeSource_Rule,
            partSource,

            KEYWORD_LIST_Alarm,
            DEFAULT_VALUE_Alarm,
            TypeSource_Alarm,
            KEYWORD_Alarm,
            FORMATTRT_Alarm;

        HTML = {
            EXCStationList: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                '<td style="min-width: 60px" data-title="AlarmCode" data-value="{{AlarmCode}}">{{AlarmCode}}</td>',
                '<td style="min-width: 60px" data-title="StationType" data-value="{{StationType}}">{{ StationType}}</td>',
                '<td style="min-width: 50px" data-title="StationNo" data-value="{{StationID}}" >{{ StationNo}}</td>',
                '<td style="min-width: 50px" data-title="RespondLevel" data-value="{{RespondLevel}}" >{{ RespondLevel}}</td>',
                '<td style="min-width: 50px" data-title="AlarmText" data-value="{{AlarmText}}" >{{ AlarmText}}</td>',
                '<td style="min-width: 50px" data-title="CreatorID" data-value="{{CreatorID}}" >{{ CreatorID}}</td>',
                '<td style="min-width: 80px" data-title="CreateTime" data-value="{{CreateTime}}" >{{ CreateTime}}</td>',
                '<td style="min-width: 80px" data-title="EditorID" data-value="{{EditorID}}" >{{ EditorID}}</td>',
                '<td style="min-width: 80px" data-title="EditTime" data-value="{{EditTime}}" >{{ EditTime}}</td>',
                '<td style="min-width: 50px" data-title="Active" data-value="{{Active}}" >{{ Active}}</td>',
                '<tr>'
            ].join(""),

            EXCStationTypeList: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                '<td style="min-width: 80px" data-title="ExceptionTypeList" data-value="{{ExceptionTypeList}}">{{ExceptionTypeList}}</td>',
                '</tr>',
            ].join(""),


        };

        //新增异常类型
        Defaul_Value_Type = {
            RespondLevel: 0,
            StationType: 0,
            Active: 1,
        };
        (function () {

            KETWROD_LIST_Type = [
                "RespondLevel|响应等级|ArrayOne",
                "StationType|地点类型|ArrayOne",
                "Active|状态|ArrayOne"
            ];

            KETWROD_Type = {};

            Formattrt_Type = {};

            TypeSource_Type = {
                RespondLevel: [
                {
                    name: "一般",
                    value: 1
                }, {
                    name: "紧急",
                    value: 2
                }, {
                    name: "严重",
                    value: 3
                }
                ],
                Active: [
                    {
                        name: "激活",
                        value: 1
                    },
                    {
                        name: "禁用",
                        value: 0
                    }
                ]
            };

            $.each(KETWROD_LIST_Type, function (i, item) {
                var detail = item.split("|");
                KETWROD_Type[detail[0]] = {
                    index: i,
                    name: detail[1],
                    type: detail.length > 2 ? detail[2] : undefined,
                    control: detail.length > 3 ? detail[3] : undefined
                };

                if (detail.length > 2) {
                    Formattrt_Type[detail[0]] = $com.util.getFormatter(TypeSource_Type, detail[0], detail[2]);
                }
            });
        })();


        DEFAULT_VALUE_Alarm = {
            AlarmCode: "",
            StationType: 0,
            StationID: 0,
            StationNo: 0,
            ExceptionTypeList: 0,
            RespondLevel: 0,
            AlarmText: "",
            Active: 1,
        };
        (function () {
            KEYWORD_LIST_Alarm = [
            "AlarmCode|报警代号|ArrayOne",
            "AlarmID|报警ID",
            "StationType|位置点类型|ArrayOneControl",
            "StationID|位置点编号|ArrayOneControl|StationType",
            "ExceptionTypeList|触发异常类型|Array",
            "RespondLevel|响应等级|ArrayOne",
            "AlarmText|内容显示文本",
            "Active|状态|ArrayOne",
            ];
            KEYWORD_Alarm = {};
            FORMATTRT_Alarm = {};

            TypeSource_Alarm = {
                Active: [
                  {
                      name: "激活",
                      value: 1
                  }, {
                      name: "禁用",
                      value: 0
                  }
                ],
                RespondLevel: [
                    {
                        name: "一般",
                        value: 1
                    }, {
                        name: "紧急",
                        value: 2
                    }, {
                        name: "严重",
                        value: 3
                    }
                ],
                ExceptionTypeList: [],
                StationID: [],
                StationType: [],
                AlarmCode:[]
            };

            $.each(KEYWORD_LIST_Alarm, function (i, item) {
                var detail = item.split("|");
                KEYWORD_Alarm[detail[0]] = {
                    index: i,
                    name: detail[1],
                    type: detail.length > 2 ? detail[2] : undefined,
                    control: detail.length > 3 ? detail[3] : undefined
                };
                if (detail.length > 2) {
                    FORMATTRT_Alarm[detail[0]] = $com.util.getFormatter(TypeSource_Alarm, detail[0], detail[2]);
                }
            });
        })();

        model = $com.Model.create({
            name: '异常报警',

            type: $com.Model.MAIN,

            configure: function () {
                this.run();
            },

            events: function () {
                ////表格行的点击事件 为点击事件做checked处理
                //$("body").delegate(".femi-tb-scroll table.table  tr", "click", function (e) {
                //    var $this = $(this),
                //        checkboxID = $this.find("td[data-title=ID]").attr("data-value");
                //    if ($this.children('th')[0]) {
                //        return true;
                //    }

                //    $(".femi-tb-scroll table.table  tr td input[type=checkbox].femi-tb-checkbox").each(function (i, item) {
                //        if (checkboxID == $(item).parent().next().attr("data-value"))
                //            return true;
                //        else
                //            $(item).prop("checked", false);
                //    })

                //});
                ////表格行的点击事件 为点击checked做处理
                //$("body").delegate(".femi-tb-scroll table.table tr td input[type=checkbox].femi-tb-checkbox", "click", function (e) {
                //    var $this = $(this),
                //        checkboxID = $this.parent().parent().find("td[data-title=ID]").attr("data-value");

                //    $(".femi-tb-scroll table.table  tr td input[type=checkbox].femi-tb-checkbox").each(function (i, item) {
                //        if (checkboxID == $(item).parent().next().attr("data-value"))
                //            return true;
                //        else
                //            $(item).prop("checked", false);
                //    })

                //});

                //异常出发类型查看
                $("body").delegate(".lmvt-encoding-body tr", "bdclick", function () {
                    var $this = $(this),
                        id = Number($this.find("td[data-title=ID]").attr("data-value"));
                    $.each(CodeList, function (i, item) {

                    });
                });
                ////双击地点名称
                //$("body").delegate(".lmvt-Station-body tr", "dblclick", function () {
                //    var $this = $(this),
                //        id = $this.find("td[data-title=ID]").attr("data-value"),
                //        StationPointID = id;
                //    model.com.RendarStationType(StationPointID);
                //});
                //查看触发异常
                $("body").delegate("#lmvt-station-type", "click", function () {

                    var SelectData = $com.table.getSelectionData($(".lmvt-Station-body"), "ID", EXCStationSource);

                    if (!SelectData || !SelectData.length) {
                        alert("请先选择一行数据再试！")
                        return;
                    }
                    if (SelectData.length != 1) {
                        alert("只能同时查看一条数据！")
                        return;
                    }
                    var renderSource = $com.util.Clone(SelectData[0].ExceptionTypeList);
                    model.com.render(renderSource);

                    $(".lmvt-container-main-exception").css("width", "70%");
                    $(".lmvt-container-main-exception").css("padding-right", "10px");
                    $(".lmvt-container-typt-exception").show();


                });

                ////查询
                //$("body").delegate("#lmvt-table-Search", "click", function () {
                //    $("body").append($com.modal.show(Defaul_Value_Type, KETWROD_Type, "查询", function (rst) {
                //        if (!rst || $.isEmptyObject(rst)) {
                //            return false;
                //        }

                //        var _data = {
                //            ID: 0,
                //            Name: rst.Name,
                //            RelevancyType: Number(rst.RelevancyType),
                //            Active: Number(rst.Active),
                //            CreateTime: new Date(),
                //            EditTime: new Date(),
                //        };

                //        model.com.postEXCStationTypeUpdate({
                //            data: _data,
                //        }, function (res) {
                //            alert("新增成功！！");
                //            model.com.refresh();
                //        });

                //    }, TypeSource_Type));
                //});
                //新增
                $("body").delegate("#lmvt-alarm-add", "click", function () {
                    $("body").append($com.modal.show(DEFAULT_VALUE_Alarm, KEYWORD_Alarm, "新增", function (rst) {
                        if (!rst || $.isEmptyObject(rst)) {
                            return false;
                        }

                        var _data = {
                            AlarmCode: rst.AlarmCode,
                            AlarmID: model.com.GetAlarmID(),
                            StationType: Number(rst.StationType),
                            StationNo: rst.StationNo,
                            StationID: model.com.GetStationID(rst.StationNo, rst.StationType),
                            ExceptionTypeList: rst.ExceptionTypeList,
                            RespondLevel: Number(rst.RespondLevel),
                            AlarmText: rst.AlarmText,
                            CreateTime: new Date(),
                            EditTime: new Date(),
                            Active: Number(rst.Active),
                        };

                        model.com.postEXCAlarmRuleUpdate({
                            data: _data,
                        }, function (res) {
                            alert("新增成功！！");
                            model.com.refresh();

                        });

                    }, TypeSource_Alarm));
                });
                //修改
                $("body").delegate("#lmvt-type-change", "click", function () {

                    var SelectData = $com.table.getSelectionData($(".lmvt-Station-body"), "ID", EXCStationSource);
                    if (!SelectData || !SelectData.length) {
                        alert("请先选择一行数据再试！")
                        return;
                    }
                    if (SelectData.length != 1) {
                        alert("只能同时对一行数据修改！")
                        return;
                    }
                    var default_value = {
                        AlarmCode: SelectData[0].AlarmCode,
                        StationType: SelectData[0].StationType,
                        StationID: SelectData[0].StationID,
                        ExceptionTypeList: SelectData[0].ExceptionTypeList,
                        RespondLevel: SelectData[0].RespondLevel,
                        AlarmText: SelectData[0].AlarmText,
                        Active: SelectData[0].Active,
                    };
                    $("body").append($com.modal.show(default_value, KEYWORD_Alarm, "修改", function (rst) {
                        //调用修改函数
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        SelectData[0].AlarmCode = Number(rst.AlarmCode);
                        SelectData[0].StationType = Number(rst.StationType);
                        SelectData[0].StationNo = FORMATTRT_Alarm["StationNo"](Number(rst.StationNo));
                        SelectData[0].ExceptionTypeList = rst.ExceptionTypeList;
                        SelectData[0].RespondLevel = Number(rst.RespondLevel);
                        SelectData[0].AlarmText = rst.AlarmText;
                        SelectData[0].Active = Number(rst.Active);
                        SelectData[0].StationID = Number(rst.StationNo);

                        model.com.postEXCAlarmRuleUpdate({
                            data: SelectData[0],
                        }, function (res) {
                            alert("修改成功！！");
                            model.com.refresh();
                            var renderSource = $com.util.Clone(res, info.ExceptionTypeList);
                            model.com.render(renderSource);
                        });

                    }, TypeSource_Alarm));

                });
                //激活
                $("body").delegate("#lmvt-type-active", "click", function () {

                    var SelectData = $com.table.getSelectionData($(".lmvt-Station-body"), "ID", EXCStationSource);
                    if (!SelectData || !SelectData.length) {
                        alert("请先选择一行数据再试！")
                        return;
                    }
                    if (!confirm("已选择" + SelectData.length + "条数据，确定将其激活？")) {
                        return;
                    }

                    model.com.postEXCAlarmRuleActive({
                        data: SelectData,
                        Active: 1
                    }, function (res) {
                        alert("激活成功！！");
                        model.com.refresh();
                    });
                });
                //冻结
                $("body").delegate("#lmvt-type-stop", "click", function () {

                    var SelectData = $com.table.getSelectionData($(".lmvt-Station-body"), "ID", EXCStationSource);
                    if (!SelectData || !SelectData.length) {
                        alert("请先选择一行数据再试！")
                        return;
                    }
                    if (!confirm("已选择" + SelectData.length + "条数据，确定将其冻结？")) {
                        return;
                    }

                    model.com.postEXCAlarmRuleActive({
                        data: SelectData,
                        Active: 0
                    }, function (res) {
                        alert("禁用成功！！");
                        model.com.refresh();
                    });
                });
                //返回
                $("body").delegate("#lmvt-type-back", "click", function () {
                    $(".lmvt-container-main-exception").css("width", "100%");
                    $(".lmvt-container-main-exception").css("padding-right", "0px");
                    $(".lmvt-container-typt-exception").hide();
                });
            },
            run: function () {
                UserAll = window.parent._UserAll;

                //地点
                model.com.getEXCStationAll({ RelevancyType: -1, RelevancyID: -1, StationType: -1, StationName: "", Active: -1 }, function (res) {
                    if (!res)
                        return;
                    var list = res.list,
                        rst = [];
                    if (list) {
                        StationList = $com.util.Clone(res.list);
                        var cate = {},
                            cab = {};
                        $.each(res.list, function (i, item) {

                            if (!cate[item.StationType]) {
                                cate[item.StationType] = {};
                                TypeSource_Alarm.StationType.push({
                                    name: item.StationType,
                                    value: item.StationType
                                });

                            }

                            $.each(TypeSource_Alarm.StationType, function (j, item_j) {
                                if (item_j.name == item.StationType && !cab[item.StationID]) {
                                    cab[item.StationID] = {};
                                    TypeSource_Alarm.StationID.push({
                                        name: item.StationNo,
                                        value: item.ID,
                                        far: item.StationType
                                    });
                                }
                            });

                        });
                        model.com.getEXCStationTypeAll({ RelevancyType: -1, Name: "", Active: -1 }, function (res) {
                            if (!res)
                                return;
                            var list = res.list,
                                rst = [];
                            if (list) {
                                $.each(res.list, function (i, item) {
                                    $.each(TypeSource_Alarm.StationType, function (j, item_j) {
                                        if (item_j.value == item.ID) {
                                            item_j.name = item.Name;
                                        }
                                    });
                                });
                                //model.com.refresh();
                                temp1 = true;
                                model.com.RanderRefresh();
                            }
                        });
                    }

                });
                //触发异常类型
                model.com.getEXCExceptionTypeAll({ RelevancyType: -1, StationType: -1, Name: "", Active: -1 }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        $.each(resP.list, function (i, item) {
                            TypeSource_Alarm.ExceptionTypeList.push({
                                name: item.Name,
                                value: item.ID
                            });
                        });
                        temp2 = true;
                        model.com.RanderRefresh();
                    }
                });
                //报警配置
                model.com.getEXCStationConfig({ }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        $.each(resP.list, function (i, item) {
                            TypeSource_Alarm.AlarmCode.push({
                                name: item.AlarmText,
                                value: item.AlarmID
                            })
                        });
                        temp3 = true;
                        model.com.RanderRefresh();
                    }
                });
            },
            com: {
                //获取所有岗位信息
                getBPMPositionAll: function (data, fn, context) {
                    var d = {
                        $URI: "/BPMPosition/All",
                        $TYPE: "get"
                    };

                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }

                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //获取异常报警
                getEXCAlarmRuleAll: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCAlarmRule/All",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //报警配置
                getEXCStationConfig: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCAlarmRule/Config",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //获取异常地点
                getEXCStationAll: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCStation/All",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //获取异常地点类型
                getEXCStationTypeInfo: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCStationType/Info",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //获取异常地点类型集合
                getEXCStationTypeAll: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCStationType/All",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //异常类型
                getEXCExceptionTypeAll: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCExceptionType/All",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //人员信息
                getUserAll: function (data, fn, context) {
                    var d = {
                        $URI: "/User/All",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //增加修改
                postEXCAlarmRuleUpdate: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCAlarmRule/Update",
                        $TYPE: "post"
                    };
                    function err() {
                        $com.app.tip('提交失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //激活关闭
                postEXCAlarmRuleActive: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCAlarmRule/Active",
                        $TYPE: "post"
                    };
                    function err() {
                        $com.app.tip('提交失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                refresh: function () {
                    //所有异常报警
                    model.com.getEXCAlarmRuleAll({ RespondLevel: -1, StationType: -1, Active: -1 }, function (res) {
                        if (!res)
                            return;
                        var list = res.list,
                            rst = [];
                        if (list) {
                            //CodeSource = res.list
                            EXCStationSource = $com.util.Clone(res.list);
                            //CodeList = res.list;
                            EXCStationList = $com.util.Clone(res.list);
                            $.each(EXCStationList, function (i, item) {
                                for (var p in item) {
                                    if (!FORMATTRT_Alarm[p])
                                        continue;
                                    item[p] = FORMATTRT_Alarm[p](item[p]);
                                }
                                item.CreatorID = model.com.GetUser(item.CreatorID);
                                item.EditorID = model.com.GetUser(item.EditorID);
                            });
                            $(".lmvt-Station-body").html($com.util.template(EXCStationList, HTML.EXCStationList));
                        }
                    });
                },
                render: function (source) {
                    var Rander = [];
                    $.each(source, function (i, item) {
                        Rander.push({
                            ID: i + 1,
                            ExceptionTypeList: item
                        });
                    });

                    $.each(Rander, function (i, item) {
                        for (var p in item) {
                            if (!FORMATTRT_Alarm[p])
                                continue;
                            item[p] = FORMATTRT_Alarm[p](item[p]);
                        }
                    });
                    $(".lmvt-type-body").html($com.util.template(Rander, HTML.EXCStationTypeList));
                },
                GetUser: function (id) {
                    var name;
                    $.each(UserAll, function (i, itme) {
                        if (id == itme.ID) {
                            name = itme.Name;
                            return name;
                        }
                    });
                    return name;
                },
                GetStationID: function (number, type) {
                    var StationID;
                    $.each(StationList, function (i, item) {
                        if (item.StationType == type && item.StationNo == number) {
                            StationID = item.ID;
                            return StationID;
                        }
                    });
                    return StationID;
                },
                GetAlarmID: function () {
                    var MaxID = 0;
                    if (EXCStationSource.length == 0)
                        MaxID = 0;
                    else
                        $.each(EXCStationSource, function (i, item) {
                            if (item.ID >= MaxID) {
                                MaxID = item.ID
                            }
                        });
                    return MaxID + 1;
                },
                RanderRefresh: function () {
                    if (temp1 && temp2 && temp3) {
                        model.com.refresh();
                        temp1 = temp2 = temp3 = false;
                    }
                },
            },
        });
        model.init();
    });