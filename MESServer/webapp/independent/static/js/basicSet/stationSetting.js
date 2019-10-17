require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($yang, $com) {
    var HTML,
        modal,
        StationField,
        KEYWORD,
        KEYWORD_STATION,
		KEYWORD_LIST,
        KEYWORD_LIST_STATION,
		DEFAULT_VALUE,
        DEFAULT_VALUE_STATION,
		TypeSource,
        TypeSource_STATION,
		FORMATTRT,
        FORMATTRT_STATION,
		ProcessSource,
        ProcessSource_STATION,
        SelectedData = 0,
		ProcessData,
        SelectedWorkShop = 1;
    HTML = {
        TableProcessItemNode: [
			'<tr>',
            '<td style="width: 3px"><input type="checkbox"    ',
			'	class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td> ',
			'<td style="min-width: 50px" data-title="ID" data-value="{{ID}}"  >{{ID}}</td>	     ',
			'<td style="min-width: 50px" data-title="WorkShopID" data-value="{{WorkShopID}}"  >{{WorkShopID}}</td>  ',
			'<td style="min-width: 50px" data-title="LineID" data-value="{{LineID}}"  >{{LineID}}</td> ',
			'<td style="min-width: 50px" data-title="PartName" data-value="{{PartName}}"  >{{PartName}}</td>   ',
			'<td style="min-width: 50px" data-title="PartPointName" data-value="{{PartPointName}}"  >{{PartPointName}}</td>  ',
			'</tr>',
        ].join(""),
        TableStationItemNode: [
			'<tr>',
            '<td style="width: 3px"><input type="checkbox"    ',
			'	class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td> ',
			'<td style="min-width: 50px" data-title="ID" data-value="{{ID}}">{{ID}}</td> ',
			'<td style="min-width: 50px" data-title="PartPointID" data-value="{{PartPointID}}"  >{{PartPointID}}</td>  ',
            '<td style="min-width: 50px" data-title="PartID" data-value="{{PartID}}"  >{{PartID}}</td>   ',
            '<td style="min-width: 50px" data-title="DeviceID" data-value="{{DeviceID}}">{{DeviceID}}</td>  ',
            '<td style="min-width: 50px" data-title="StationName" data-value="{{StationName}}">{{StationName}}</td>  ',
            '<td style="min-width: 50px" data-title="Active" data-value="{{Active}}">{{Active}}</td>  ',
			'</tr>',
        ].join(""),
        Select_WorkShop: [
             '<li class="aptitude_status" data-status="1"  data-value="{{value}}">',
             ' <a href="javascript:;">',
             '<span class="glyphicon glyphicon-ok workshop-select-item" aria-hidden="true"  >{{name}}</span>',
             ' </a>',
             '</li>',
        ].join(""),
    };
    ProcessSource = [];
    StationSource = [];
    (function () {
        KEYWORD_LIST = [
			"WorkShopID|车间|ArrayOne",
			"LineID|产线|ArrayOne|workShopID",
        ];
        FORMATTRT = {};
        KEYWORD = {};
        DEFAULT_VALUE = {
            WorkShopID: 0,
            LineID: 0,
            PartID: 0,
            PartPointID: 0,
        };

        TypeSource = {
            WorkShopID: [{
                name: "全部",
                value: 0
            }],
            LineID: [{
                name: "全部",
                value: 0,
                far: 0
            }],
            PartID: [{
                name: "全部",
                value: 0,
                far: 0
            }],
            PartPointID: [{
                name: "全部",
                value: 0,
                far: 0
            }]
        };
        $.each(KEYWORD_LIST, function (i, item) {
            var detail = item.split("|");
            KEYWORD[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT[detail[0]] = $com.util.getFormatter(TypeSource, detail[0], detail[2]);
            }

        });
    })();

    (function () {
        KEYWORD_LIST_STATION = [
            "PartPointID|工序|ArrayOne",
            "PartID|工序段|ArrayOne",
            "DeviceID|设备名称|ArrayOne",
            "StationName|工位名称",
			"Active|状态|ArrayOne",
			"WorkShopID|车间|ArrayOne",
			"LineID|产线|ArrayOne|WorkShopID"
        ];
        FORMATTRT_STATION = {};
        KEYWORD_STATION = {};
        DEFAULT_VALUE_STATION = {
            WorkShopID: 0,
            LineID: 0,
            DeviceID: 0,
            Active: true
        };

        TypeSource_STATION = {
            PartID: [{
                name: "全部",
                value: 0,
                far: 0
            }],
            PartPointID: [{
                name: "全部",
                value: 0,
                far: 0
            }],
            DeviceID: [{
                name: "暂无",
                value: 0,
                far: 0
            }],
            StationName: [{
                name: "暂无",
                value: 0,
                far: 0
            }],
            Active: [{
                name: "激活",
                value: 1
            }, {
                name: "冻结",
                value: 0
            }],
        };
        $.each(KEYWORD_LIST_STATION, function (i, item) {
            var detail = item.split("|");
            KEYWORD_STATION[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_STATION[detail[0]] = $com.util.getFormatter(TypeSource_STATION, detail[0], detail[2]);
            }

        });
    })();

    model = $com.Model.create({
        name: 'iPlant.MES',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },
        events: function () {
            //单击事件
            $("body").delegate(".workshop-items>li", "click", function () {
                var $this = $(this);
                SelectedWorkShop = Number($this.attr("data-value"));
                $("#workShopChoose").html(FORMATTRT.WorkShopID(SelectedWorkShop));
                model.com.refresh();
            })
            //双击事件
            $("body").delegate("#cby-ledger-tbody>tr", "dblclick", function () {
                var $this = $(this),
                $td = $this.find('td[data-title=ID]'),
                ID = $td.attr("data-value"),
                _Index = $com.util.findIndex(ProcessData, function (pi_item) {
                    return Number(ID) == pi_item.ID;
                });
                if (_Index < 0) {
                    alert("未匹配到数据！");
                    return;
                }
                SelectedData = ProcessData[_Index];
                $(".cby-bd-half-left").css("width", '60%');
                $(".cby-bd-half-right").show();
                model.com.refreshStation(SelectedData.PartPointID);
            });
            //查询
            $("body").delegate("#cby-search-text-ledger", "change", function () {
                var $this = $(this),
					value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#cby-ledger-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#cby-ledger-tbody"), ProcessSource, value, "ID", FORMATTRT);
            });
            $("body").delegate("#cby-search-ledger", "click", function () {

                var default_value = {
                    WorkShopID: 0,
                    LineID: 0,
                    PartID: 0,
                    PartPointID: 0
                };

                $("body").append($com.modal.show(default_value, KEYWORD, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.WorkShopID = Number(rst.WorkShopID);
                    default_value.WorkShopName = FORMATTRT.WorkShopID(Number(rst.WorkShopID));
                    default_value.LineID = Number(rst.LineID);
                    default_value.LineName = FORMATTRT.LineID(Number(rst.LineID));
                    default_value.PartID = Number(rst.PartID);
                    default_value.PartName = FORMATTRT.PartID(Number(rst.PartID));
                    default_value.PartPointID = Number(rst.PartPointID);
                    default_value.PartPointName = FORMATTRT.PartPointID(Number(rst.PartPointID));

                    $com.table.filterByConndition($("#cby-ledger-tbody"), ProcessSource, default_value, "ID");

                }, TypeSource));

            });

            //新增数据
            $("body").delegate("#cby-add-station", "click", function () {


                //将Json数据中的数据值改成对应默认值，然后传入进去
                $("body").append($com.modal.show(DEFAULT_VALUE_STATION, KEYWORD_STATION, "新增", function (rst) {
                    //调用插入函数 
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    var _data = {
                        ID: 0,
                        PartID: SelectedData.PartID,
                        PartName: FORMATTRT_STATION["PartID"](SelectedData.PartID),
                        PartPointID: SelectedData.PartPointID,
                        PartPointName: FORMATTRT_STATION["PartPointID"](SelectedData.PartPointID),
                        DeviceID: Number(rst.DeviceID),
                        DeviceName: FORMATTRT_STATION.DeviceID(Number(rst.DeviceID)),
                        StationName: FORMATTRT_STATION.DeviceID(Number(rst.DeviceID)),
                        Active: Number(rst.Active),
                        LineID: SelectedData.LineID,
                        LineName: SelectedData.LineName,
                        OperateTime: SelectedData.OperateTime,
                        Operator: SelectedData.Operator,
                        WorkShopID: SelectedData.WorkShopID,
                        WorkShopName: SelectedData.WorkShopName
                    };
                    model.com.addStation({
                        data: _data
                    }, function (res) {
                        alert("新增成功");
                        model.com.refreshStation(SelectedData.PartPointID);
                    })

                }, TypeSource_STATION));

            });
            //状态更改
            $("body").delegate(".device_station_status", "click", function () {
                var $this = $(this),
					status = $this.attr("data-status"),
					text = $this.children().text().trim(),
					SelectData = $com.table.getSelectionData($("#cby-ledger-station-tbody"), 'ID', StationSource);

                if (!SelectData || !SelectData.length) {
                    alert("至少选择一行数据！")
                    return;
                }

                if (!confirm("已选择" + SelectData.length + "条数据，确定将其改为" + text + "？")) {
                    return;
                }

                model.com.changeStatus({
                    data: SelectData,
                    status: status
                }, [function (res) {
                    alert(text + "成功");
                    model.com.refreshStation(SelectedData.PartPointID);
                },
                ])
            });

            //导出Excel
            $("body").delegate("#cby-export-station", "click", function () {
                var $this = $(this),
                    $stationTable = $('table.' + $this.attr('data-table')),
                    title = $.trim($('.' + $this.attr('data-table-title')).text()),
                    fileName = title + ".xls",
                    params = $com.table.getExportParams($stationTable, fileName, title);

                model.com.exportExcel(params, function (res) {
                    //res.info.path:文件路径
                    var src = res.info.path;
                    window.open(src);
                });
            })
        },
        run: function () {
            model.com.getWorkShop({}, function (data) {
                //获取车间
                $.each(data.list, function (i, item) {
                    TypeSource.WorkShopID.push({
                        name: item.WorkShopName,
                        value: item.ID,
                        far: null
                    })
                    //获取产线
                    $.each(item.LineList, function (l_i, l_item) {
                        TypeSource.LineID.push({
                            name: l_item.ItemName,
                            value: l_item.ID,
                            far: item.ID
                        })
                    });

                });
                //设置默认值
                $("#workShopChoose").html(FORMATTRT.WorkShopID(SelectedWorkShop));
                //填充li
                $(".workshop-items").html($com.util.template(TypeSource.WorkShopID, HTML.Select_WorkShop));

                TypeSource_STATION.WorkShopID = TypeSource.WorkShopID;
                TypeSource_STATION.LineID = TypeSource.LineID;
                model.com.refresh();
            });

            model.com.getDeviceAll({}, function (data) {
                TypeSource_STATION.DeviceID = TypeSource_STATION.DeviceID.concat($com.table.getTypeSource(data.list, "ID", "DeviceName"));
            });

        },
        com: {
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

            getDeviceAll: function (data, fn, context) {
                var d = {
                    $URI: "/Device/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
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

            getPart: function (data, fn, context) {
                var d = {
                    $URI: "/APSLine/ConfigAll",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            getStation: function (data, fn, context) {
                var d = {
                    $URI: "/WorkStation/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            addStation: function (data, fn, context) {
                var d = {
                    $URI: "/WorkStation/update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('提交失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            changeStatus: function (data, fn, context) {
                var d = {
                    $URI: "/WorkStation/active",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('提交失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            exportExcel: function (data, fn, context) {
                var d = {
                    $URI: "/Upload/ExportExcel",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('提交失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            refresh: function () {
                TypeSource.PartID.splice(1, TypeSource.PartID.length - 1);
                TypeSource.PartPointID.splice(1, TypeSource.PartPointID.length - 1);

                model.com.getPart({}, function (data_Part) {
                    var _data = [];
                    $.each(data_Part.list, function (p_i, p_item) {

                        TypeSource.PartID = TypeSource.PartID.concat($com.table.getTypeSource(p_item.PartList, "PartID", "PartName"));

                        if (p_item.PartPointList && p_item.PartPointList.length > 0) {

                            TypeSource.PartPointID = TypeSource.PartPointID.concat($com.table.getTypeSource(p_item.PartPointList, "PartPointID", "PartPointName", undefined, "PartID"));

                            _data = _data.concat(p_item.PartPointList);

                        }

                        $.each(p_item.PartList, function (pp_i, pp_item) {

                            TypeSource.PartPointID = TypeSource.PartPointID.concat($com.table.getTypeSource(pp_item.PartPointList, "PartPointID", "PartPointName", undefined, "PartID"));
                            _data = _data.concat(pp_item.PartPointList);
                        });
                    });

                    TypeSource_STATION.PartID = TypeSource.PartID;
                    TypeSource_STATION.PartPointID = TypeSource.PartPointID;


                    for (var i = 0; i < _data.length; i++) {

                        _data[i].ID = i + 1;
                    }
                    ProcessData = _data;
                    model.com.render(_data);
                });
            },
            refreshStation: function (id) {
                model.com.getStation({ PartPointID: id }, function (data) {
                    StationSource = data.list;
                    model.com.renderStation(data.list);
                });

            },
            render: function (list) {
                var _list = $com.util.Clone(list),
                    _data = [];
                $.each(_list, function (i, item) {

                    if (SelectedWorkShop && item.WorkShopID != SelectedWorkShop)
                        return true;
  
                    for (var p in item) {
                        if (!FORMATTRT[p])
                            continue;
                        item[p] = FORMATTRT[p](item[p]);
                    }
                    _data.push(item);
                });
                ProcessSource = _data
                $("#cby-ledger-tbody").html($com.util.template(_data, HTML.TableProcessItemNode));
            },
            renderStation: function (list) {
                var _list = $com.util.Clone(list);
                $.each(_list, function (i, item) {
                    for (var p in item) {
                        if (!FORMATTRT_STATION[p])
                            continue;
                        item[p] = FORMATTRT_STATION[p](item[p]);
                    }
                });
                $("#cby-ledger-station-tbody").html($com.util.template(_list, HTML.TableStationItemNode));
            }
        }
    })
    model.init();

})();
