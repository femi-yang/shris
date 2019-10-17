require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($yang, $com) {

    var HTML,
        model,
        PropertyField,
        KEYWORD,
        KEYWORD_PROPERTY,
        KEYWORD_LIST,
        KEYWORD_LIST_PROPERTY,
        DEFAULT_VALUE,
        DEFAULT_VALUE_PROPERTY,
        KETWROD_Template_Arrange,
        TypeSource_Arrange,
        TypeSource,
        TypeSource_PROPERTY,
        FORMATTRT,
        FORMATTRT_PROPERTY,
        DMSDeviceSource,
        DMSDevicePropertySource,
        Formattrt_Arrange,
        DATA,
        DataAll,
        DEFAULT_VALUE_Status,
        DataAll2,
        AllUser,
        Vague1,
        Vague2,
        AllBusinessUnit,
        AllFactory,
        AllWorkShop,
        AllLine,
        AllDeviceLedger,
        AllModelID,
        AllApply,
        SpareLedgerID,
        AllDeviceModel,
        DataAllOriginal,
        BOOL;
    BOOL = false;
    TIME = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());
    Formattrt_Arrange = [];
    HTML = {
        MouduleTemplate: [
            '<tr>',
            '<td style="width: 3px"><input type="checkbox"',
            'class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td> ',
            '<td style="min-width: 50px" data-title="ID" data-value="{{ID}}">{{ID}}</td> ',
            //'<td style="min-width: 50px" data-title="BalancePlateNO" data-value="{{BalancePlateNO}}">{{BalancePlateNO}}</td> ',
            '<td style="min-width: 50px" data-title="ModuleNo" data-value="{{ModuleNo}}">{{ModuleNo}}</td> ',
            '<td style="min-width: 50px" data-title="CasketOne" data-value="{{CasketOne}}">{{CasketOne}}</td> ',
            '<td style="min-width: 50px" data-title="CasketTwo" data-value="{{CasketTwo}}">{{CasketTwo}}</td> ',
            '<td style="min-width: 50px" data-title="CasketThree" data-value="{{CasketThree}}">{{CasketThree}}</td> ',
            '<td style="min-width: 50px" data-title="ProductNo" data-value="{{ProductNo}}">{{ProductNo}}</td> ',
            '<td style="min-width: 50px" data-title="ACResistance  " data-value="{{ACResistance}}">{{ACResistance  }}</td>    ',
            '<td style="min-width: 50px" data-title="DCResistance  " data-value="{{DCResistance}}">{{DCResistance  }}</td>   ',
            '<td style="min-width: 50px" data-title="Capacity " data-value="{Capacity }}">{{Capacity }}</td>  ',
            '<td style="min-width: 50px" data-title="SelfDischarge" data-value="{{SelfDischarge}}">{{SelfDischarge}}</td>   ',
            '<td style="min-width: 50px" data-title="Gears" data-value="{{Gears}}">{{Gears}}</td>    ',
            //'<td style="min-width: 50px" data-title="GroupingPeople" data-value="{{GroupingPeople}}">{{GroupingPeople}}</td>   ',
            //'<td style="min-width: 50px" data-title="GroupingDate" data-value="{GroupingDate}}">{{GroupingDate}}</td>  ',
            //'<td style="min-width: 50px" data-title="IncomingBatches" data-value="{{IncomingBatches}}">{{IncomingBatches}}</td>   ',
            //'<td style="min-width: 50px" data-title="Remark" data-value="{Remark}}">{{Remark}}</td>  ',
            '<td style="min-width: 50px" data-title="ImportTime  " data-value="{ImportTime}}">{{ImportTime}}</td>  ',
            //'<td style="min-width: 50px" data-title="Active" data-value="{Active}}">{{Active}}</td>  ',
            '<td style="min-width: 50px" data-title="UpdateTime" data-value="{UpdateTime}}">{{UpdateTime}}</td>  ',
            '</tr>',
        ].join(""),
        ActiveCode: [
         '<tr>',
         '<td style="width: 3px"><input type="checkbox"',
         'class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td> ',
         '<td style="min-width: 50px" data-title="ID " data-value="{{ID }}">{{ID }}</td> ',
         //'<td style="min-width: 50px" data-title="SerialNo " data-value="{{SerialNo }}">{{SerialNo }}</td>   ',
         '<td style="min-width: 50px" data-title="BalancePlateNo" data-value="{{BalancePlateNo}}">{{BalancePlateNo}}</td>   ',
         '<td style="min-width: 50px" data-title="ModuleNo" data-value="{ModuleNo }}">{{ModuleNo }}</td>  ',
         //'<td style="min-width: 50px" data-title="RepeatType " data-value="{RepeatType }}">{{RepeatType }}</td>  ',
         //'<td style="min-width: 50px" data-title="Active  " data-value="{{Active  }}">{{Active  }}</td> ',
         '<td style="min-width: 50px" data-title="ImportTime  " data-value="{{ImportTim}}">{{ImportTime  }}</td>   ',
         '<td style="min-width: 50px" data-title="UpdateTime  " data-value="{{UpdateTime   }}">{{UpdateTime   }}</td> ',
         '</tr>',
        ].join(""),
    };
    (function () {
        KEYWORD_Point_LIST = [
          //"StartTime|开始时间|Date",
          //"EndTime|结束时间|Date",
          "BalancePlateNo|平衡板号|",
          "ModuleNo|模组号|",
          "ProductNo|产品型号|",
        
        ];
        KEYWORD_Point_LIST1 = [
        "Name|类型名称|",
        "Active|状态|ArrayOne",

        ];
       
        FORMATTRT = {};
        KEYWORD = {};
        KEYWORD1 = {};
       
        DEFAULT_VALUE = {
           
        };
        DEFAULT_VALUE1 = {
          
        };
     
        TypeSource_Point = {
            Active: [{
                name: "禁用",
                value: 1
            },
        {
            name: "激活",
            value: 0
        },
             {
                 name: "全部",
                 value: -1
             }, ],
            ModelPropertyID: [
                 {
                     name: "无",
                     value: 0,
                     far: 0
                 }
            ],
            SI: [
                {
                    name: "无",
                    value: 0,
                    far: 0
                }
            ],
            OperatorID: [],
            SpareWorkType: [
                 {
                     name: "无",
                     value: 0,
                     far: 0
                 }
            ],
        };
        TypeSource_Point1 = {

            Active: [{
                name: "禁用",
                value: 1
            },
         {
             name: "激活",
             value: 0
         },

            ],
            OperatorID: []

        };
    
        $.each(KEYWORD_Point_LIST, function (i, item) {
            var detail = item.split("|");
            KEYWORD[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT[detail[0]] = $com.util.getFormatter(TypeSource_Point, detail[0], detail[2]);
            }
        });

        $.each(KEYWORD_Point_LIST1, function (i, item) {
            var detail = item.split("|");
            KEYWORD1[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT[detail[0]] = $com.util.getFormatter(TypeSource_Point1, detail[0], detail[2]);
            }
        });
     
    })();
    model = $com.Model.create({
        name: '设备台账方案',
        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {
       
            $("body").delegate("#lmvt-table-basic-add-templet", "click", function () {
                $("#input-file").val("");
                $("#input-file").click();

            });
            $("body").delegate("#active", "click", function () {
                $("#input-file1").val("");
                $("#input-file1").click();

            });
            //导入
            $("body").delegate("#input-file", "change", function () {
                //alert()
                var $this = $(this);

                if (this.files.length == 0)
                    return;
                var fileData = this.files[0];

                var form = new FormData();
                form.append("file", fileData);
                model.com.importResultExcel(form, function (res) {
                    if (res.list.length > 0) {
                        var list = res.list;
                        DataAll2 = list;
                        Vague1 = DataAll2;
                        $(".lmvt-device-body").html($com.util.template(list, HTML.MouduleTemplate));
                        alert("导入成功，如需保存请点击保存按钮！");
                    } else {
                        alert("导入表格有误，请检查后重新导入！");
                    }
                });
            });
            //导入出货码
            $("body").delegate("#input-file1", "change", function () {
                //alert()
                var $this = $(this);

                if (this.files.length == 0)
                    return;
                var fileData = this.files[0];

                var form = new FormData();
                form.append("file", fileData);
                model.com.importShipmentExcel(form, function (res) {
                    if (res.list.length > 0) {
                    var list = res.list;
                    DataAll = list;
                    Vague2 = DataAll;
                    $(".lmvt-supplier-body").html($com.util.template(list, HTML.ActiveCode));
                    alert("导入成功，如需保存请点击保存按钮！");
                    } else {
                        alert("导入表格有误，请检查后重新导入！");
                    }
                });
            });
            //模糊查询
            $("body").delegate("#femi-search-text-ledger", "change", function () {
                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $(".lmvt-device-body").children("tr").show();
                else
                    $com.table.filterByLikeString($(".lmvt-device-body"), Vague1, value, "ID");
            });
            //模糊查询出货码
            $("body").delegate("#femi-search-text-ledger2", "change", function () {
                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $(".lmvt-supplier-body").children("tr").show();
                else
                    $com.table.filterByLikeString($(".lmvt-supplier-body"), Vague2, value, "ID");
            });
            //条件查询
            $("body").delegate("#lmvt-left-check", "click", function () {
                var default_value = {
                    StartTime: new Date(),
                    EndTime:new Date(),
                    BalancePlateNo: "",
                    ModuleNo: "",
                    ProductNo: "",
                }
                $("body").append($com.modal.show(default_value, KEYWORD, "查询", function (rst) {
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    model.com.getResultAll({
                        StartTime: rst.StartTime, EndTime: rst.EndTime,
                        BalancePlateNo: rst.BalancePlateNo, ModuleNo: rst.ModuleNo, ProductNo: rst.ProductNo,
                        Active: -1
                    }, function (data) {
                        $(".lmvt-device-body").html($com.util.template(data.list, HTML.MouduleTemplate));
                    });
                }, TypeSource_Point));
            });
            //条件查询出货码
            $("body").delegate("#lmvt-left-check2", "click", function () {
                var default_value = {
                    StartTime: new Date(),
                    EndTime:new Date(),
                    BalancePlateNo: "",
                    ModuleNo: "",
                    //ProductNo: "",
                }
                $("body").append($com.modal.show(default_value, KEYWORD, "查询", function (rst) {
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    model.com.getMouleAll({
                        StartTime: rst.StartTime, EndTime: rst.EndTime,
                        BalancePlateNo: rst.BalancePlateNo, ModuleNo: rst.ModuleNo, 
                        Active: -1
                    }, function (data) {
                        $(".lmvt-supplier-body").html($com.util.template(data.list, HTML.ActiveCode));
                    });
                }, TypeSource_Point));
            
            });
            //相关申请
            $("body").delegate("#out_code", "click", function () {
               // $("#lmvt-header-title1").text("申请单(" + data.AllApply + ")");
                $(".iplant-tool-right").css("width", "550px");
                $(".lmvt-container-device").css("margin-right", "550px");
                $(".iplant-tool-right").show();
                model.com.refresh1();
            });
            //保存出货嘛
            $("body").delegate("#active2", "click", function () {
                if (DataAll && DataAll.length > 0) {
                    model.com.checkShipment({
                        data: DataAll
                    }, function (data) {
                        if (data.info == true) {
                            confirm("出货码有重复，确认继续保存吗？", function (bool) {
                                if (bool == true) {
                                    model.com.saveShipment({
                                        data: DataAll
                                    }, function (data) {
                                        model.com.refresh1();
                                    });
                                } else {
                                    return false;
                                }
                            });
                           
                        } else {
                            model.com.saveShipment({
                                data: DataAll
                            }, function (data) {
                                model.com.refresh1();
                            });
                        }
                    });
                } else {
                    alert("请先导入再保存！！！");
                }
            });
            //保存匹配结果
            $("body").delegate("#tzj-sava", "click", function () {
                if (DataAll2 && DataAll2.length > 0) {
                    model.com.checkResult({
                        data: DataAll2
                    }, function (data) {
                        if (data.info == true) {
                            confirm("匹配结果有重复，确认继续保存吗？", function (bool) {
                                if (bool == true) {
                                    model.com.saveResult({
                                        data: DataAll2
                                    }, function (data) {
                                        model.com.refresh();
                                    });
                                } else {
                                    return false;
                                }
                            });
                           
                        } else {
                            model.com.saveResult({
                                data: DataAll2
                            }, function (data) {
                                model.com.refresh();
                            });
                        }
                    });
                } else {
                    alert("请先导入再保存！！！");
                }
            });
            //隐藏
            $("body").delegate("#active3", "click", function () {
             
                $(".lmvt-container-device").css("margin-right", "0px");
                $(".iplant-tool-right").hide();
              
            });
        },

        run: function () {
            model.com.refresh();
        },

        com: {
            refresh: function () {
                model.com.getResultAll({
                    StartTime: "2010-01-01", EndTime: "2039-01-01",
                    BalancePlateNo: "", ModuleNo: "",ProductNo:"",
                    Active: -1
                }, function (data) {
                    Vague1 = data.list;
                    $(".lmvt-device-body").html($com.util.template(data.list, HTML.MouduleTemplate));
                });
            },
            refresh1:function(){
                model.com.getMouleAll({
                    StartTime:"2010-01-01",EndTime:"2039-01-01",
                    BalancePlateNo:"",ModuleNo:"",
                    Active:-1
                }, function (data) {
                    Vague2 = data.list;
                    $(".lmvt-supplier-body").html($com.util.template(data.list, HTML.ActiveCode));
                });
            },
            getMouleAll: function (data, fn, context) {
                var d = {
                    $URI: "/ModuleInformation/ModuleAll",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            getResultAll: function (data, fn, context) {
                var d = {
                    $URI: "/ModuleInformation/ResultAll",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            saveResult: function (data, fn, context) {
                var d = {
                    $URI: "/ModuleInformation/SaveResult",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            saveShipment: function (data, fn, context) {
                var d = {
                    $URI: "/ModuleInformation/SaveShipment",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }
                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            checkShipment: function (data, fn, context) {
                var d = {
                    $URI: "/ModuleInformation/CheckShipment",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            checkResult: function (data, fn, context) {
                var d = {
                    $URI: "/ModuleInformation/CheckResult",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }
                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            importShipmentExcel: function (data, fn, context) {
                var d = {
                    $URI: "/ModuleInformation/ImportShipmentExcel",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }
                $com.app.ajax_load(data ? $.extend(data, d) : $.extend(d, data), fn, err, context);
            },
            importResultExcel: function (data, fn, context) {
                var d = {
                    $URI: "/ModuleInformation/ImportResultExcel",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }
                $com.app.ajax_load(data ? $.extend(data, d) : $.extend(d, data), fn, err, context);
            },
        }
    });

    model.init();


});