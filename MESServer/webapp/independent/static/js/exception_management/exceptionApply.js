require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'],
    function ($lin, $com) {

        var HTML,
            PhotoList,
            //查询时间
            StartTime,
            EndTime,
            //编码集合
            CodeList,
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
            //类型
            Defaul_Value_Type,
            KETWROD_LIST_Type,
            KETWROD_Type,
            Formattrt_Type,
            TypeSource_Type,
            //规则
            Defaul_Value_Search,
            KETWROD_LIST_Search,
            KETWROD_Search,
            Formattrt_Search,
            TypeSource_Search,
            partSource;

        HTML = {
            EXCTaskList: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                '<td style="min-width: 60px" data-title="StationNo" data-value="{{StationNo}}">{{StationNo}}</td>',
                '<td style="min-width: 60px" data-title="StationTypeName" data-value="{{StationTypeName}}">{{ StationTypeName}}</td>',
                // '<td style="min-width: 50px" data-title="ExceptionTypeName" data-value="{{ExceptionTypeName}}" >{{ ExceptionTypeName}}</td>',
                // '<td style="min-width: 50px" data-title="ReportTimes" data-value="{{ReportTimes}}" >{{ ReportTimes}}</td>',
                // '<td style="min-width: 50px" data-title="ForwardTimes" data-value="{{ForwardTimes}}" >{{ ForwardTimes}}</td>',
                '<td style="min-width: 80px" data-title="RespondLevel" data-value="{{RespondLevel}}" >{{ RespondLevel}}</td>',
                '<td style="min-width: 80px" data-title="DisplayBoard" data-value="{{DisplayBoard}}" >{{ DisplayBoard}}</td>',
                '<td style="min-width: 80px" data-title="OnSite" data-value="{{OnSite}}" >{{ OnSite}}</td>',
                '<td style="min-width: 80px" data-title="Comment" data-value="{{Comment}}" >{{ Comment}}</td>',
                '<td style="min-width: 50px" data-title="ApplicantTime" data-value="{{ApplicantTime}}" >{{ ApplicantTime}}</td>',
                '<td style="min-width: 60px" data-title="ApplicantID" data-value="{{ApplicantID}}">{{ApplicantID}}</td>',
                '<td style="min-width: 60px" data-title="ApproverID" data-value="{{ApproverID}}">{{ ApproverID}}</td>',
                '<td style="min-width: 50px" data-title="ApproverTime" data-value="{{ApproverTime}}" >{{ ApproverTime}}</td>',
                '<td style="min-width: 50px" data-title="ConfirmID" data-value="{{ConfirmID}}" >{{ ConfirmID}}</td>',
                '<td style="min-width: 50px" data-title="ConfirmTime" data-value="{{ConfirmTime}}" >{{ ConfirmTime}}</td>',
                '<td style="min-width: 80px" data-title="Status" data-value="{{Status}}" >{{ Status}}</td>',
                '<tr>'
            ].join(""),

            EXCStationTypeList: [
                '<tr>',
                '<td style="min-width: 3px"><input type="checkbox"class="femi-tb-checkbox" style="margin: 1px 0px 1px"value="{{functionID}}" /></th>',
                //'<td style="min-width: 50px" data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                '<td style="min-width: 80px" data-title="EXCTypeID" data-value="{{EXCTypeID}}">{{EXCTypeID}}</td>',
                '<td style="min-width: 50px" data-title="EXCTypeName" data-value="{{EXCTypeName}}">{{EXCTypeName}}</td>',
                '<td style="min-width: 80px" data-title="ConfirmID" data-value="{{ConfirmID}}">{{ConfirmID}}</td>',
                '</tr>',
            ].join(""),

            img: [
                '<img class="lmvt-img" data-type="false" style="display:none" />'
            ].join(""),

            CallItemNode: [
            '<li class="call-info-items a"data-type="{{type}}">',
            '<div class="call-info-items-list">',
            '<div class="call-info-time"><span>{{CreateTime}}</span></div>',
            '<div class="call-info-actiontype"><span>{{ActionType}}</span></div>',
            '<div class="call-info-operator"><span>{{OperatorID}}</span></div>',
            '<div type="button" class="btn dropdown-toggle"data-toggle="dropdown"data-type="{{type}}"data-dis="{{DisID}}"data-act="{{ActionID}}">',
            '<span class="icon icon-right "id="call-info-list"style="background:url(../static/images/icon-right.png) no-repeat center">',
            '</span>',
            '</div>',
            '</div>',
            '<ul id="" class="deal-info-items-last-down deal-info-items-last-down{{ActionID}} showcall-{{type}}"data-ctype="showcall-{{type}}">',
            '</ul>',
            '</li>',
            ].join(""),
            DealItemNode: [
                '<li class="deal-info-items">',
                '<div class="deal-info-items-list">',
                '<div class="deal-info-time"><span>{{CreateTime}}</span></div>',
                '<div class="deal-info-operator"><span>{{Operator}}</span></div>',
                '<div class="deal-info-status"><span>{{Status}}</span></div>',
                '<div class="deal-info-icon" id="deal-firstDown"><span class="icon icon-right deal-firstDown" data-value="deal-info-items-first-down{{DealID}}"style="background:url(../static/images/icon-right.png) no-repeat center"></span></div>',
                '</div>',
                ' <ul id="deal-info-items-first-down{{DealID}}" class="deal-info-items-first-down"></ul>',
                '</li>',
            ].join(""),
            TaskInfoItemNode: [
                '<ul class="call-info-lists" role="menu"aria-labelledby=""style="padding-left: 0px">',
                '<li class="call-info-item">',
                '<div class="call-info-item-title">异常地点类型</div>',
                '<div class="call-info-item-all">{{StationTypeName}}</div>',
                '</li>',
                '<li class="call-info-item">',
                '<div class="call-info-item-title">异常地点</div>',
                '<div class="call-info-item-all">{{StationNo}}</div>',
                '</li>',
                '<li class="call-info-item">',
                '<div class="call-info-item-title">异常类型</div>',
                '<div class="call-info-item-all">{{ExceptionTypeName}}</div>',
                '</li>',
                '<li class="call-info-item">',
                '<div class="call-info-item-title">异常响应级别</div>',
                '<div class="call-info-item-all">{{RespondLevel}}</div>',
                '</li>',
                '<li class="call-info-item">',
                '<div class="call-info-item-title">是否需要到场</div>',
                '<div class="call-info-item-all">{{OnSite}}</div>',
                '</li>',
                '<li class="call-info-item">',
                '<div class="call-info-item-title">是否在看板上显示</div>',
                '<div class="call-info-item-all">{{DisplayBoard}}</div>',
                '</li>',
                '<li class="call-info-item">',
                '<div class="call-info-item-title">内容备注</div>',
                '<div class="call-info-item-all">{{Comment}}</div>',
                '</li>',
                '<li class="call-info-item">',
                '<div class="call-info-item-title">照片</div>',
                '<div class="call-info-item-image">',
                '</div>',
                //'<img src="/upload/{{ImageList}}" alt="" class="image-show" data-source="{{ImageList}}" />',
                //'<img src="/upload/{{ImageList}}" alt=""class="image-show"data-source="{{ImageList}}" />',
                '</li>',
                '</ul>',
            ].join(""),
            CallInfoItemNode: [
                '<ul class="call-info-lists" role="menu"aria-labelledby=""style="padding-left: 0px">',
                '<li class="call-info-item">',
                '<div class="call-info-item-title">内容备注</div>',
                '<div class="call-info-item-all">{{CancelComment}}</div>',
                '</li>',
                '<li class="call-info-item">',
                '<div class="call-info-item-title">照片</div>',
                '<div class="call-info-item-image-cancel">',
                '</div>',
                //'<img src="/upload/{{CancelImageList}}" alt="" class="image-show"data-source="{{CancelImageList}}"/>',
                '</li>',
                '</ul>',
            ].join(""),

            Photo: [
                '<div class="lmvt-show-photo" style="position: fixed;z-index: 2001;top: 0;right: 0;left: 0;bottom: 0;background: rgba(0, 0, 0, 0.5);text-align: center">',
                '<svg t="1562913698052" class="lmvt-remove-photo" style="position:absolute;top:10;right:10" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2620" width="50" height="50"><path d="M684.642617 277.598412l-1.436722-1.467421c-12.489452-12.461823-32.730449-12.461823-45.159526 0L479.700991 434.510138l-158.286026-158.315702c-12.555967-12.524245-32.793894-12.524245-45.225017 0-12.555967 12.462846-12.555967 32.701796 0 45.223994l158.348448 158.317749L276.129573 638.049834c-12.495592 12.429077-12.495592 32.671097 0 45.163619l1.49812 1.434675c12.429077 12.494569 32.66905 12.494569 45.221948 0l158.287049-158.286026 158.283979 158.286026c12.491499 12.494569 32.731472 12.494569 45.220924 0 12.495592-12.493545 12.495592-32.731472 0-45.222971l-158.285003-158.285003 158.285003-158.314679C697.138209 310.299185 697.138209 290.060235 684.642617 277.598412" p-id="2621" fill="#e6e6e6"></path><path d="M818.88197 140.522454c-187.332573-187.363272-491.033479-187.363272-678.364005 0-187.329503 187.329503-187.329503 491.032456 0 678.362982 187.330526 187.392948 491.031433 187.392948 678.364005 0C1006.274918 631.55491 1006.274918 327.851956 818.88197 140.522454M773.656953 773.660418c-162.344458 162.343435-425.569512 162.407903-587.914994 0-162.40688-162.344458-162.40688-425.602258 0-587.914994 162.344458-162.40688 425.569512-162.40688 587.914994 0C936.063833 348.059184 936.000388 611.31596 773.656953 773.660418" p-id="2622" fill="#e6e6e6"></path></svg>',
                '<div data-index="0" class="lmvt-change-photo" style="position: fixed;top: 60px;right: 60px;left: 60px;bottom: 60px;background-size:auto 100%;width: auto;height: auto;">',
                '</div>',
                '<div class="lmvt-bottom">',
                '<div class="lmvt-bottom-left">',
                '<svg t="1562913570901" class="icon" style="float:left;margin-left:10px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1103" width="30" height="30">',
                '<path d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m0 896a384 384 0 1 1 384-384 384 384 0 0 1-384 384z" fill="#e6e6e6" p-id="1104"></path>',
                '<path d="M493.44 247.04a64 64 0 0 0-90.88 90.88L576 512l-173.44 174.08a64 64 0 0 0 90.88 90.88l219.52-219.52a64 64 0 0 0 0-90.88z" fill="#e6e6e6" p-id="1105"></path></svg>',
                '</div>',
                '<div class="lmvt-bottom-right">',
                '<svg t="1562912869524" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ',
                ' p-id="1469" width="30" style="float:right;margin-right:10px" height="30"><path d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m0 896a384 384 0 1 1 384-384 384 384 0 0 1-384 384z" ',
                ' fill="#e6e6e6" p-id="1470"></path><path d="M616.96 272.64a58.24 58.24 0 0 0-81.92 0l-198.4 198.4a58.88 58.88 0 0 0 0 81.92l198.4 198.4a58.24 58.24 0 1 0 81.92-81.92L459.52 512l157.44-157.44a58.24 58.24 0 0 0 0-81.92z" fill="#e6e6e6" p-id="1471"></path></svg>',
                '</div>',
                '</div>',
                '</div>',
            ].join(""),
        };

        //新增异常类型
        Defaul_Value_Type = {
            Name: "",
            RelevancyType: 0,
            Active: 0,
        };
        (function () {

            KETWROD_LIST_Type = [
                "Name|名称",
                "RelevancyType|关联类型|ArrayOne",
                "Active|状态|ArrayOne"
            ];

            KETWROD_Type = {};

            Formattrt_Type = {};

            TypeSource_Type = {
                RelevancyType: [
                    {
                        name: "默认",
                        value: 0
                    },
                    {
                        name: "事业部",
                        value: 1
                    },
                    {
                        name: "工厂",
                        value: 2
                    },
                    {
                        name: "车间",
                        value: 3
                    },
                    {
                        name: "产线",
                        value: 4
                    },
                    {
                        name: "工位",
                        value: 5
                    },
                    {
                        name: "仓库",
                        value: 6
                    },
                    {
                        name: "仓位",
                        value: 7
                    },
                    {
                        name: "设备",
                        value: 8
                    },
                    {
                        name: "备件",
                        value: 9
                    },
                ],
                Active: [
                    {
                        name: "激活",
                        value: 1
                    },
                    {
                        name: "冻结",
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

        //异常任务单查询
        Defaul_Value_Search = {
            StartTime: new Date(),
            EndTime: new Date(),
        };
        (function () {

            KETWROD_LIST_Search = [
                "StartTime|开始时间|Date",
                "EndTime|结束时间|Date",
                "DisplayBoard|是否显示|ArrayOne",
                "Status|状态|ArrayOne"
            ];

            KETWROD_Search = {};

            Formattrt_Search = {};

            TypeSource_Search = {
                DisplayBoard: [
                    {
                        name: "是",
                        value: true
                    },
                    {
                        name: "否",
                        value: false
                    },
                ],
                Status: [
                    {
                        name: "创建",
                        value: 1
                    },
                    {
                        name: "待审核",
                        value: 2
                    },
                    {
                        name: "已审核",
                        value: 3
                    },
                    {
                        name: "撤销审核",
                        value: 4
                    },
                    {
                        name: "已确认",
                        value: 5
                    },
                    {
                        name: "已转发",
                        value: 5
                    },
                ]
            };

            $.each(KETWROD_LIST_Search, function (i, item) {
                var detail = item.split("|");
                KETWROD_Search[detail[0]] = {
                    index: i,
                    name: detail[1],
                    type: detail.length > 2 ? detail[2] : undefined,
                    control: detail.length > 3 ? detail[3] : undefined
                };

                if (detail.length > 2) {
                    Formattrt_Search[detail[0]] = $com.util.getFormatter(TypeSource_Search, detail[0], detail[2]);
                }
            });
        })();
        model = $com.Model.create({
            name: '异常申请',

            type: $com.Model.MAIN,

            configure: function () {
                this.run();
            },

            events: function () {
                $("body").delegate(".lmvt-encoding-body tr", "bdclick", function () {
                    var $this = $(this),
                        id = Number($this.find("td[data-title=ID]").attr("data-value"));
                    $.each(EXCStationSource, function (i, item) {
                        if (id == item.ID) {
                            model.com.render(item.ApplyID);
                            return false;
                        }
                    });
                });

                //双击申请
                $("body").delegate(".lmvt-Station-body tr", "dblclick", function () {
                    var $this = $(this),
                        id = $this.find("td[data-title=ID]").attr("data-value");
                    $.each(EXCStationSource, function (i, item) {
                        if (id == item.ID) {
                            model.com.render(item.ExceptionTypeList);
                            return false;
                        }
                    });
                });
                //查看异常记录
                $("body").delegate("#lmvt-apply-record", "click", function () {

                    var SelectData = $com.table.getSelectionData($(".lmvt-Station-body"), "ID", EXCStationSource);

                    if (SelectData.length == 0) {
                        alert("请先选择一条数据后再试！")
                        return false;
                    }

                    if (SelectData.length != 1) {
                        alert("只能同是查看一条数据！")
                        return false;
                    }

                    $(".up-info").show();
                    $(".lmvt-container-main-exception").hide();
                    $(".lmvt-container-typt-exception").hide();

                    model.com.getEXCCallTaskAll({
                        ApplyID: SelectData[0].ID,
                        StationType: -1,
                        StationName: "",
                        StationID: -1,
                        RespondLevel: 0,
                        DisplayBoard: -1,
                        OnSite: -1,
                        Status: 0,
                        ApplicantID: -1,
                        OperatorID: -1,
                        ConfirmID: -1,
                        ShiftID: -1
                    }, function (data) {
                       
                        model.com.getTree({ TaskID: data.ID, TagValue: -1, DispatchID: -1 }, function (res) {
                            if (res && res.info) {
                                //var callRander = [];
                                //res.info.CallTask.OperatorID = model.com.GetUser(res.info.CallTask.OperatorID);
                                //res.info.CallTask.ActionType = "发起";
                                //callRander.push({
                                //    OperatorID: model.com.GetUser(res.info.CallTask.OperatorID),
                                //    ActionType: "发起",
                                //});
                                //$("#call-info-all").html($com.util.template(callRander, HTML.CallItemNode));

                                //$("#call-info-deal").html($com.util.template(res.info.CallDispatchList, HTML.DealItemNode));
                            }
                        });
                    });

                });
                $("body").delegate("#lmvt-table-hide", "click", function () {
                    $(".up-info").hide();
                    $(".lmvt-container-main-exception").show();
                });
                //申请图片查看
                $("body").delegate("#lmvt-apply-photo", "click", function () {
                    var SelectData = $com.table.getSelectionData($(".lmvt-Station-body"), "ID", EXCStationSource);

                    if (SelectData.length == 0) {
                        alert("请先选择一条数据后再试！")
                        return false;
                    }

                    if (SelectData.length != 1) {
                        alert("只能同是查看一条数据！")
                        return false;
                    }

                    $("body").append(HTML.Photo);

                    PhotoList = SelectData[0].ImageList;

                    $(".lmvt-change-photo").css("background", "url(" + "/upload/" + PhotoList[0] + ") " + "no-repeat center scroll");


                });

                //表格行的点击事件 为点击事件做checked处理
                $("body").delegate(".femi-tb-scroll table.table  tr", "click", function (e) {
                    var $this = $(this),
                        checkboxID = $this.find("td[data-title=ID]").attr("data-value");
                    if ($this.children('th')[0]) {
                        return true;
                    }

                    $(".femi-tb-scroll table.table  tr td input[type=checkbox].femi-tb-checkbox").each(function (i, item) {
                        if (checkboxID == $(item).parent().next().attr("data-value"))
                            return true;
                        else
                            $(item).prop("checked", false);
                    })

                });
                //表格行的点击事件 为点击checked做处理
                $("body").delegate(".femi-tb-scroll table.table tr td input[type=checkbox].femi-tb-checkbox", "click", function (e) {
                    var $this = $(this),
                        checkboxID = $this.parent().parent().find("td[data-title=ID]").attr("data-value");

                    $(".femi-tb-scroll table.table  tr td input[type=checkbox].femi-tb-checkbox").each(function (i, item) {
                        if (checkboxID == $(item).parent().next().attr("data-value"))
                            return true;
                        else
                            $(item).prop("checked", false);
                    })

                });

                //右看图片
                //移除photo
                $("body").delegate(".lmvt-remove-photo", "click", function () {
                    $(".lmvt-show-photo").remove();
                });
                $("body").delegate(".lmvt-bottom-left", "click", function () {
                    var index = Number($(".lmvt-change-photo").attr("data-index"));
                    if (PhotoList) {
                        if (index == PhotoList.length - 1) {
                            alert("这已经是最后一张照片了！！！")
                            return false;
                        }
                        else {
                            $(".lmvt-change-photo").css("background", "url(" + "/upload/" + PhotoList[index - 1] + ") " + "no-repeat center");
                            $(".lmvt-change-photo").attr("data-index", index + 1);
                        }
                    }
                });
                //左看图片
                $("body").delegate(".lmvt-bottom-right", "click", function () {
                    var index = Number($(".lmvt-change-photo").attr("data-index"));
                    if (PhotoList) {
                        if (index == 0) {
                            alert("这已经是第一张照片了！！！")
                            return false;
                        }
                        else {
                            $(".lmvt-change-photo").css("background", "url(" + "/upload/" + PhotoList[index - 1] + ") " + "no-repeat center");
                            $(".lmvt-change-photo").attr("data-index", index - 1);
                        }
                    }

                });
                //查看任务申请单
                $("body").delegate("#lmvt-exception-apply", "click", function () {
                    window.parent.iframeHeaderSet({ header: "异常任务", href: "./device_manage/exceptionApply.html", id: "ExceptionApply", src: "./static/images/menu/basicSet/workingProcess.png" });
                });

                //查询异常任务
                $("body").delegate("#lmvt-task-Search", "click", function () {
                    $("body").append($com.modal.show(Defaul_Value_Search, KETWROD_Search, "查询", function (rst) {
                        if (!rst || $.isEmptyObject(rst)) {
                            return false;
                        }

                        StartTime = $com.util.format("yyyy-MM-dd", rst.StartTime);
                        EndTime = $com.util.format("yyyy-MM-dd", rst.EndTime);

                        model.com.refresh();

                    }, TypeSource_Search));
                });
                //修改
                $("body").delegate("#lmvt-type-change", "click", function () {

                    var SelectData = $com.table.getSelectionData($(".lmvt-type-body"), "ID", EXCTypeSource);
                    if (!SelectData || !SelectData.length) {
                        alert("请先选择一行数据再试！")
                        return;
                    }
                    if (SelectData.length != 1) {
                        alert("只能同时对一行数据修改！")
                        return;
                    }
                    var default_value = {
                        Name: SelectData[0].Name,
                        RelevancyType: SelectData[0].RelevancyType,
                        Active: SelectData[0].Active,
                    };
                    $("body").append($com.modal.show(default_value, KETWROD_Type, "修改", function (rst) {
                        //调用修改函数
                        if (!rst || $.isEmptyObject(rst))
                            return;

                        SelectData[0].Name = rst.Name;
                        SelectData[0].RelevancyType = Number(rst.RelevancyType);
                        SelectData[0].Active = Number(rst.Active);
                        model.com.postEXCStationTypeUpdate({
                            data: SelectData[0],
                        }, function (res) {
                            alert("修改成功！！");
                            model.com.render();
                        });

                    }, TypeSource_Type));

                });
                //激活
                $("body").delegate("#lmvt-type-active", "click", function () {

                    var SelectData = $com.table.getSelectionData($(".lmvt-type-body"), "ID", EXCTypeSource);
                    if (!SelectData || !SelectData.length) {
                        alert("请先选择一行数据再试！")
                        return;
                    }
                    if (!confirm("已选择" + SelectData.length + "条数据，确定将其激活？")) {
                        return;
                    }
                    var default_value = {
                        Name: SelectData[0].Name,
                        RelevancyType: SelectData[0].RelevancyType,
                        Active: SelectData[0].Active,
                    };

                    model.com.postEXCStationTypeActive({
                        data: SelectData,
                        Active: 1
                    }, function (res) {
                        alert("激活成功！！");
                        model.com.render();
                    });
                });
                //冻结
                $("body").delegate("#lmvt-type-stop", "click", function () {

                    var SelectData = $com.table.getSelectionData($(".lmvt-type-body"), "ID", EXCTypeSource);
                    if (!SelectData || !SelectData.length) {
                        alert("请先选择一行数据再试！")
                        return;
                    }
                    if (!confirm("已选择" + SelectData.length + "条数据，确定将其冻结？")) {
                        return;
                    }
                    var default_value = {
                        Name: SelectData[0].Name,
                        RelevancyType: SelectData[0].RelevancyType,
                        Active: SelectData[0].Active,
                    };

                    model.com.postEXCStationTypeActive({
                        data: SelectData,
                        Active: 0
                    }, function (res) {
                        alert("冻结成功！！");
                        model.com.render();
                    });
                });
                //冻结
                $("body").delegate("#lmvt-type-back", "click", function () {

                    $(".lmvt-container-main-exception").css("width", "100%");
                    $(".lmvt-container-main-exception").css("padding-right", "0px");
                    $(".lmvt-container-typt-exception").hide();

                });
            },
            run: function () {
                model.com.getUserAll({ active: -1 }, function (res) {
                    if (!res)
                        return;
                    var list = res.list,
                        rst = [];
                    if (list) {
                        UserAll = $com.util.Clone(res.list);

                        StartTime = $com.util.format("yyyy-MM-dd", new Date());
                        EndTime = $com.util.format("yyyy-MM-dd", new Date().getTime() - 7 * 24 * 3600 * 1000);
                        model.com.refresh();
                    }
                });
            },
            com: {
                //得到处理树结构
                getTree: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCCallTask/Tree",
                        $TYPE: "get"
                    };

                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }

                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //获取异常申请单（自己）
                getEXCCallApplyInfo: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCCallApply/Info",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //获取异常申请单（集合）
                getEXCCallApplyAll: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCCallApply/All",
                        $TYPE: "get"
                    };
                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //获取异常任务单据 
                getEXCCallTaskAll: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCCallTask/All",
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
                postEXCStationTypeUpdate: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCStationType/Update",
                        $TYPE: "post"
                    };
                    function err() {
                        $com.app.tip('提交失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                //激活关闭
                postEXCStationTypeActive: function (data, fn, context) {
                    var d = {
                        $URI: "/EXCStationType/Active",
                        $TYPE: "post"
                    };
                    function err() {
                        $com.app.tip('提交失败，请检查网络');
                    }
                    $com.app.ajax($.extend(d, data), fn, err, context);
                },

                refresh: function () {
                    //任务单据
                    model.com.getEXCCallApplyAll({ ApplyID: -1, StationType: -1, StationName: "", StationID: -1, RespondLevel: -1, DisplayBoard: -1, OnSite: -1, Status: -1, ApplicantID: -1, OperatorID: -1, ConfirmID: -1, ShiftID: -1, StartTime: StartTime, EndTime: EndTime, OAGetType: -1 }, function (res) {
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
                                    if (!Formattrt_Search[p])
                                        continue;
                                    item[p] = Formattrt_Search[p](item[p]);
                                }
                                item.ApplicantID = model.com.GetUser(item.ApplicantID);
                                item.ConfirmID = model.com.GetUser(item.ConfirmID);
                                item.ApproverID = model.com.GetUser(item.ApproverID);

                                item.ApplicantTime = $com.util.format("yyyy-MM-dd", item.ApplicantTime);
                                item.ConfirmTime = $com.util.format("yyyy-MM-dd", item.ConfirmTime);
                                item.ApproverTime = $com.util.format("yyyy-MM-dd", item.ApproverTime);
                            });
                            $(".lmvt-Station-body").html($com.util.template(EXCStationList, HTML.EXCTaskList));
                        }

                    });

                },

                render: function (source) {

                    $(".lmvt-container-main-exception").css("width", "70%");
                    $(".lmvt-container-main-exception").css("padding-right", "10px");
                    $(".lmvt-container-typt-exception").show();

                    $.each(source, function (i, item) {
                        item.ConfirmID = model.com.GetUser(item.ConfirmID);
                        item.ID = i + 1;
                    });
                    $(".lmvt-type-body").html($com.util.template(source, HTML.EXCStationTypeList));
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
            },


        });
        model.init();
    });