require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($zace, $com) {

    var KEYWORD_Level_LIST,
        KEYWORD_Level,
        FORMATTRT_Level,
        DEFAULT_VALUE_Level,
        TypeSource_Level,

        KEYWORD_LevelItem_LIST,
        KEYWORD_LevelItem,
        FORMATTRT_LevelItem,
        DEFAULT_VALUE_LevelItem,
        TypeSource_LevelItem,
        mFunctionID,
        mModuleID,
		model,
        DataAll,
        DATABasic,
        DATABasicPro,
        DataAllPro,
        DataAllS,
        DataAllSPro,
        DataAllConfirmBasic,
        DataAllConfirmChange,
        DataAllConfirm,
        DataAllSearch,
         DATABasicItem,
         DataAllItem,
         DataModuleList,
        HTML;

    DATABasicItem = DataModuleList=[];
    DataAllItem = [];
    mFunctionID = 0;
    mModuleID = 0;
    DataAll = [];
    DataAllS = [];
    DATABasic = [];
    DataAllConfirmBasic = [];
    DataAllConfirmChange = [];
    DataAllConfirm = [];
    DataAllSearch=[];
    PositionTemp = {
        Auditor: window.parent.User_Info.Name,
        AuditorID: 0,
        AuditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        CreateTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Creator: window.parent.User_Info.Name,
        CreatorID: 0,
        ModuleID: 0,
        ModuleName: "",
        ID: 0,
        LineID: 0,
        LineName: "",
        Name: "",
        Status: 1,
        StatusText: "",
        Text: "",
        VersionText: "",
        WorkShopID: 0,
        WorkShopName: "",
        EventList :[],
    };

    PositionItemTemp = {
        Active :true,
        CreateTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        Creator: window.parent.User_Info.Name,
        CreatorID: 0,
        EventID: 0,
        EventName: "",
        FunctionID: 0,
        FunctionName :"",
        ModuleID: 0,
        ModuleName: "",
        ID: 0,      
    };

    ;
    HTML = {
        TableMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
                //'<td data-title="WID" data-value="{{WID}}" >{{WID}}</td>',
				'<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                	'<td data-title="WorkShopID" data-value="{{WorkShopID}}" >{{WorkShopID}}</td>',
				'<td data-title="LineID" data-value="{{LineID}}" >{{LineID}}</td>',
                '<td data-title="ModuleName" data-value="{{ModuleName}}" >{{ModuleName}}</td>',
				'<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
                '<td data-title="VersionText" data-value="{{VersionText}}" >{{VersionText}}</td>',			
               // '<td data-title="Text" data-value="{{Text}}" >{{Text}}</td>',
                '<td data-title="Status" data-value="{{Status}}" >{{Status}}</td>',
                '<td data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',
                 '<td data-title="CreateTime" data-value="{{CreateTime}}" >{{CreateTime}}</td>',
                '<td data-title="Auditor" data-value="{{Auditor}}" >{{Auditor}}</td>',
                 '<td data-title="AuditTime" data-value="{{AuditTime}}" >{{AuditTime}}</td>',
				'</tr>',
        ].join(""),

        TableItemMode: [
              '<tr>',
              '<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
              //'<td data-title="WID" data-value="{{WID}}" >{{WID}}</td>',
              '<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
              '<td data-title="FunctionName" data-value="{{FunctionName}}" >{{FunctionName}}</td>',
              '<td data-title="EventName" data-value="{{EventName}}" >{{EventName}}</td>',
              '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
              '<td data-title="Creator" data-value="{{Creator}}" >{{Creator}}</td>',
              '<td data-title="CreateTime" data-value="{{CreateTime}}" >{{CreateTime}}</td>',
              '</tr>',
        ].join(""),


    }
    $(function () {
        KEYWORD_Level_LIST = [
         "Name|组名称",
         "VersionText|组编码",
         "WorkShopID|车间|ArrayOne",
         "LineID|产线|ArrayOne",
         "ModuleID|职能类别|ArrayOne",         
         "Text|备注",
         "Status|状态|ArrayOne",
        ];
        KEYWORD_Level = {};
        FORMATTRT_Level = {};

        DEFAULT_VALUE_Level = {
            ModuleID: 0,
            LineID: 0,
            Name: "",
            //Status: 0,
           // Text: "",
            VersionText: "",
            WorkShopID: 0,
        };

        TypeSource_Level = {
            ModuleID: [
              //{
              //    name: "默认值",
              //    value: 0
              //}
            ],
            WorkShopID: [
             //{
             //    name: "无",
             //    value: 0,
             //    far: 0
             //}
            ],
            LineID: [
              //{
              //    name: "无",
              //    value: 0,
              //    far: 0
              //}
            ],
            Status: [
               //{
               //    name: "默认值",
               //    value: 0
               //},
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
           }, ],



        };

        $.each(KEYWORD_Level_LIST, function (i, item) {
            var detail = item.split("|");
            KEYWORD_Level[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_Level[detail[0]] = $com.util.getFormatter(TypeSource_Level, detail[0], detail[2]);
            }
        });
    });

    $(function () {
        KEYWORD_LevelItem_LIST = [
         "ModuleID|职能|ArrayOneControl",
         "FunctionID|职能分组|ArrayOne",
         "EventID|作业|ArrayOneControl|ModuleID",
         "Active|激活|ArrayOne",
        ];
        KEYWORD_LevelItem = {};
        FORMATTRT_LevelItem = {};

        DEFAULT_VALUE_LevelItem = {
           
            EventID: 0,           
           // Active: true,
        };

        TypeSource_LevelItem = {
            ModuleID: [             
            ],
            EventID: [
            ],
            FunctionID: [
            ],
            Active: [
           {
               name: "激活",
               value: true
           }, {
               name: "禁用",
               value: false
           } ],



        };

        $.each(KEYWORD_LevelItem_LIST, function (i, item) {
            var detail = item.split("|");
            KEYWORD_LevelItem[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_LevelItem[detail[0]] = $com.util.getFormatter(TypeSource_LevelItem, detail[0], detail[2]);
            }
        });
    });

    model = $com.Model.create({
        name: '岗位',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {

            //所有数据 岗位查询
            $("body").delegate("#zace-search-returnAllList", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevelApproval-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevelApproval-tbody"), DataAllSPro, value, "ID");



            });
            //所有 条件查询
            $("body").delegate("#zace-returnAllList-level", "click", function () {
                var default_value = {
                    ModuleID: 0,

                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.ModuleID = Number(rst.ModuleID);
                    $com.table.filterByConndition($("#femi-riskLevelApproval-tbody"), DATABasicPro, default_value, "ID");

                }, TypeSource_Level));


            });

            $("body").delegate("#zace-allList-level", "click", function () {
                $(".zzza").hide();
                $(".zzzb").hide();
                $(".zzzItem").hide();
                $(".zzzc").show();

            });
            //我的申请
            $("body").delegate("#zace-myApproval-level", "click", function () {
                $(".zzzItem").css("width", "0px");
                $(".zzza").css("margin-right", "0px");
                $(".zzza").show();
                $(".zzzb").hide();
                $(".zzzItem").hide();
                $(".zzzc").hide();

            });
            //我的审核
            $("body").delegate("#zace-myAudit-level", "click", function () {
               
                $(".zzza").hide();
                $(".zzzb").show();
                $(".zzzc").hide();
                $(".zzzItem").hide();

            });
            //申请 模糊查询
            $("body").delegate("#zace-search-level", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevel-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevel-tbody"), DataAllS, value, "ID");



            });
            //申请 条件查询
            $("body").delegate("#zace-searchZall-level", "click", function () {
                var default_value = {
                    ModuleID: 0,

                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.ModuleID = Number(rst.ModuleID);
                    $com.table.filterByConndition($("#femi-riskLevel-tbody"), DataAll, default_value, "ID");

                }, TypeSource_Level));


            });
            //岗位修改
            $("body").delegate("#zace-edit-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                if (SelectData[0].Status != 1) {
                    alert("数据选择有误！")
                    return;
                }
                var default_value = {
                    Name: SelectData[0].Name,
                    VersionText: SelectData[0].VersionText,
                   // Text: SelectData[0].Text,
                    ModuleID: SelectData[0].ModuleID,
                    WorkShopID: SelectData[0].WorkShopID,
                    LineID: SelectData[0].LineID,

                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    var wid = SelectData[0].ID;
                  
                    SelectData[0].VersionText = rst.VersionText;
                    //SelectData[0].Text = rst.Text;
                    SelectData[0].Name = rst.Name;
                    SelectData[0].ModuleID = Number(rst.ModuleID);
                    SelectData[0].WorkShopID = Number(rst.WorkShopID);
                    SelectData[0].LineID = Number(rst.LineID);

                    model.com.postPosition({
                        data: SelectData[0],
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                        //var $Tr = $('#femi-riskLevel-tbody tr td[data-title=WID][data-value=' + wid + ']').closest("tr");
                        //$Tr.replaceWith($com.util.template(DATABasic[wid - 1], HTML.TableMode));

                    })

                }, TypeSource_Level));


            });
            //岗位新增
            $("body").delegate("#zace-add-level", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_Level, KEYWORD_Level, "新增", function (rst) {
                    //调用插入函数 
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    PositionTemp.ModuleID = Number(rst.ModuleID);
                    PositionTemp.WorkShopID = Number(rst.WorkShopID);
                    PositionTemp.LineID = Number(rst.LineID);
                    PositionTemp.Name = rst.Name;
                    //PositionTemp.Status = Number(rst.Status);
                    //PositionTemp.Text = rst.Text;
                    PositionTemp.VersionText = rst.VersionText;

                    model.com.postPosition({
                        data: PositionTemp,
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })



                }, TypeSource_Level));


            });
            //岗位提交
            $("body").delegate("#zace-up-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 2 || SelectData[i].Status == 0) {
                        alert("有数据已被提交,请重新选择!!");
                        return;

                    }
                    else if (SelectData[i].Status == 3 || SelectData[i].Status == 4) {
                        alert("有数据已被审核,请重新选择!!");
                        return;
                    }

                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其提交？")) {
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {

                    //var wid = SelectData[i].WID;
                    SelectData[i].Status = 2;

                    model.com.postPosition({
                        data: SelectData[i],
                    }, function (res) {
                        alert("提交成功");
                        model.com.refresh();
                    })
                }
            });
            //岗位撤销
            $("body").delegate("#zace-return-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevel-tbody"), "ID", DataAll);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 1 || SelectData[i].Status == 0) {
                        alert("数据选择有误,请重新选择!");
                        return;

                    }
                    else if (SelectData[i].Status == 3 || SelectData[i].Status == 4) {
                        alert("有数据已被审核,请重新选择!");
                        return;
                    }

                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其撤回？")) {
                    return;
                }
                for (var i = 0; i < SelectData.length; i++) {

                    //var wid = SelectData[i].WID;
                    SelectData[i].Status = 1;

                    model.com.postPosition({
                        data: SelectData[i],
                    }, function (res) {
                        model.com.refresh();
                    })
                }



            });
           
           
            //岗位查询
            $("body").delegate("#zace-search-returnAudit", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-riskLevelAudit-tbody").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-riskLevelAudit-tbody"), DataAllSearch, value, "ID");



            });
            //审批 条件查询
            $("body").delegate("#zace-returnAudit-level", "click", function () {
                var default_value = {
                    ModuleID: 0,

                };
                $("body").append($com.modal.show(default_value, KEYWORD_Level, "查询", function (rst) {


                    if (!rst || $.isEmptyObject(rst))
                        return;

                    default_value.ModuleID = Number(rst.ModuleID);
                    $com.table.filterByConndition($("#femi-riskLevelAudit-tbody"), DataAllConfirm, default_value, "ID");

                }, TypeSource_Level));


            });

            //岗位审核
            $("body").delegate("#zace-audit-returnAudit", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevelAudit-tbody"), "ID", DataAllConfirmChange);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 1 || SelectData[i].Status == 0) {
                        alert("数据选择,请重新选择!!");
                        return;

                    }
                    else if (SelectData[i].Status == 3 || SelectData[i].Status == 4) {
                        alert("有数据已被审核,请重新选择!!");
                        return;
                    }

                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其审核？")) {
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {

                   // var wid = SelectData[i].WID;
                    SelectData[i].Status = 3;

                    model.com.postAudit({
                        data: SelectData[i],
                    }, function (res) {
                        alert("审核成功");
                        model.com.refresh();
                    })
                }
            });

            //岗位反审核
            $("body").delegate("#zace-fan-returnAudit", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevelAudit-tbody"), "ID", DataAllConfirmChange);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {
                    if (SelectData[i].Status == 2 || SelectData[i].Status == 1) {
                        alert("数据选择有误,请重新选择!!");
                        return;

                    }
                    else if (SelectData[i].Status == 0 || SelectData[i].Status == 4) {
                        alert("数据选择有误,请重新选择!!");
                        return;
                    }

                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其反审核？")) {
                    return;
                }

                for (var i = 0; i < SelectData.length; i++) {

                    //var wid = SelectData[i].WID;
                    SelectData[i].Status = 1;

                    model.com.postAudit({
                        data: SelectData[i],
                    }, function (res) {
                        alert("反审核成功");
                        model.com.refresh();
                    })
                }
            });
            $("body").delegate("#zace-PositionUserSetup-level", "click", function () {
                var vdata = { 'header': '岗位管理', 'href': './factory_model/PositionUserSetting.html', 'id': 'PositionUserSetup', 'src': './static/images/menu/basicSet/positionSet.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            $("body").delegate("#zace-WorkFlowSetup-level", "click", function () {
                var vdata = { 'header': '工作流程', 'href': './factory_model/WorkFlowSetting.html', 'id': 'WorkFlowSetup', 'src': './static/images/menu/basicSet/workingProcess.png' };
                window.parent.iframeHeaderSet(vdata);

            });
            $("body").delegate("#zace-SCHPositionSetup-level", "click", function () {
                var vdata = { 'header': '工位岗位模型', 'href': './factory_model/SCHPositionSetting.html', 'id': 'SCHPositionSetup', 'src': './static/images/menu/basicSet/workingProcess.png' };
                window.parent.iframeHeaderSet(vdata);

            });

            //双击.
            $("body").delegate("#femi-riskLevel-tbody tr", "dblclick", function () {

                var $this = $(this);
                var wID = Number($this.find('td[data-title=ID]').attr('data-value'));
                var wModuleName = $this.find('td[data-title=ModuleName]').attr('data-value');
                var wModuleID = 0;                  
                for (var i = 0; i < DataModuleList.length; i++) {
                    if (wModuleName == DataModuleList[i].ItemName) {
                        wModuleID = DataModuleList[i].ID;
                    }
                }               
                mFunctionID = wID;
                mModuleID = wModuleID;
                model.com.refresh();
              
                $(".zzzb").hide();
                //$(".zzza").css("width", "70%");
                //$(".zzzc").css("width", "29%");
                $(".zzzItem").css("width", "400px");
                $(".zzza").css("margin-right", "400px");
                $(".zzzItem").show();
                $(".zzza").show();
                $(".zzzc").hide();

            });
            $("body").delegate("#zace-closeItem-level", "click", function () {
                $(".zzzItem").css("width", "0px");
                $(".zzza").css("margin-right", "0px");
                $(".zzza").show();
                $(".zzzb").hide();
                $(".zzzc").hide();
                $(".zzzItem").hide();
            });
            //岗位事件修改
            $("body").delegate("#zace-editItem-level", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-riskLevelItem-tbody"), "ID", DataAllItem);

                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }               
                var default_value = {
                    EventID: SelectData[0].EventID,
                    Active: SelectData[0].Active,
                  

                };
                $("body").append($com.modal.show(default_value, KEYWORD_LevelItem, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;                                      
                    SelectData[0].EventID = Number(rst.EventID);
                    SelectData[0].Active = rst.Active;

                    model.com.postBPMEvent({
                        data: SelectData[0],
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                        //var $Tr = $('#femi-riskLevel-tbody tr td[data-title=WID][data-value=' + wid + ']').closest("tr");
                        //$Tr.replaceWith($com.util.template(DATABasic[wid - 1], HTML.TableMode));

                    })

                }, TypeSource_LevelItem));


            });
            //岗位事件添加
            $("body").delegate("#zace-addItem-level", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_LevelItem, KEYWORD_LevelItem, "新增", function (rst) {
                    //调用插入函数 
                    if (!rst || $.isEmptyObject(rst))
                        return;
                
                    PositionItemTemp.ModuleID = mModuleID;
                    PositionItemTemp.FunctionID = mFunctionID;
                    PositionItemTemp.EventID = Number(rst.EventID);
                   // PositionItemTemp.Active = rst.Active;

                    model.com.postBPMEvent({
                        data: PositionItemTemp,
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    })



                }, TypeSource_LevelItem));


            });
        },




        run: function () {

            model.com.getModuleAll({ module: 400001 }, function (resModule) {
                if (resModule && resModule.list) {
                    DataModuleList = resModule.list;
                    $.each(resModule.list, function (i, item) {
                        TypeSource_Level.ModuleID.push({
                            name: item.ItemName,
                            value: item.ID,
                            far: 0
                        })
                    });
                    TypeSource_LevelItem.ModuleID = TypeSource_Level.ModuleID;
                    model.com.getFMCLine({ FactoryID: 0, BusinessUnitID: 0, WorkShopID: 0 }, function (resW) {
                        if (resW && resW.list) {
                            //DataLinelist = resW.list;
                            $.each(resW.list, function (i, item) {
                                TypeSource_Level.LineID.push({
                                    name: item.Name,
                                    value: item.ID,
                                    far: 0
                                });
                            });

                        }
                        model.com.getFMCWorkShop({ FactoryID: 0, BusinessUnitID: 0 }, function (resW) {
                            if (resW && resW.list) {
                               // DataWorkShoplist = resW.list;
                                $.each(resW.list, function (i, item) {
                                    TypeSource_Level.WorkShopID.push({
                                        name: item.Name,
                                        value: item.ID,
                                        far: 0
                                    });
                                });

                            }
                            //model.com.getModuleAll({ module: 400003 }, function (resModule1) {
                            //    if (resModule1 && resModule1.list) {
                            //        $.each(resModule1.list, function (i, item) {
                            //            var module = parseInt(item.ID / 1000);
                            //            TypeSource_LevelItem.EventID.push({
                            //                name: item.ItemName,
                            //                value: item.ID,
                            //                far: module
                            //            })
                            //        });
                            //    }
                              model.com.refresh();
                            //});
                        });
                    });
                }
            });

        },

        com: {
            refresh: function () {

                model.com.getPosition({ workshopID: 0, lineID: 0 }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        //按照职能排序
                        var viewList = [];
                        viewList = model.com.getOrderList(resP.list);


                        DATABasic = $com.util.Clone(viewList);
                        var Grade = $com.util.Clone(viewList);

                        //审核数据
                        DataAllConfirm = $com.util.Clone(viewList);
                        for (var i = 0; i < Grade.length; i++) {
                            Grade[i].WID = i + 1;
                        }
                        DataAll = $com.util.Clone(Grade);

                        $.each(Grade, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Level[p])
                                    continue;
                                item[p] = FORMATTRT_Level[p](item[p]);
                            }
                        });
                        DataAllS = $com.util.Clone(Grade);
                        $("#femi-riskLevel-tbody").html($com.util.template(Grade, HTML.TableMode));


                        //===========审核
                        DataAllConfirmChange = $com.util.Clone(viewList);;
                        //for (var i = 0; i < DataAllConfirm.length; i++) {
                        //    if (DataAllConfirm[i].Status == 2 || (DataAllConfirm[i].Status == 3 && DataAllConfirm[i].Auditor == window.parent.User_Info.Name)) {
                        //        DataAllConfirmChange.push(DataAllConfirm[i]);
                        //    }
                        //}
                        DataAllConfirmBasic = $com.util.Clone(DataAllConfirmChange);
                        for (var j = 0; j < DataAllConfirmChange.length; j++) {
                            DataAllConfirmChange[j].WID = j + 1;
                        }
                        var _listC = $com.util.Clone(DataAllConfirmChange);
                        $.each(_listC, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Level[p])
                                    continue;
                                item[p] = FORMATTRT_Level[p](item[p]);
                            }
                        });
                        DataAllSearch = $com.util.Clone(_listC);
                        $("#femi-riskLevelAudit-tbody").html($com.util.template(_listC, HTML.TableMode));


                    }

                });
                model.com.getPosition({ workshopID: 0, lineID: 0 }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        //按照职能排序
                        var viewList = [];
                        viewList = model.com.getOrderList(resP.list);


                        DATABasicPro = $com.util.Clone(viewList);
                        var Grade = $com.util.Clone(viewList);
                    
                        for (var i = 0; i < Grade.length; i++) {
                            Grade[i].WID = i + 1;
                        }
                        DataAllPro = $com.util.Clone(Grade);

                        $.each(Grade, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Level[p])
                                    continue;
                                item[p] = FORMATTRT_Level[p](item[p]);
                            }
                        });
                        DataAllSPro = $com.util.Clone(Grade);
                        $("#femi-riskLevelApproval-tbody").html($com.util.template(Grade, HTML.TableMode));




                    }

                });

                model.com.getBPMEvent({ FunctionID:mFunctionID, }, function (resP) {
                    if (!resP)
                        return;
                    if (resP && resP.list) {
                        var GradeItem = $com.util.Clone(resP.list);
                        DATABasicItem = $com.util.Clone(resP.list);

                       
                        DataAllItem = $com.util.Clone(GradeItem);

                        $.each(GradeItem, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_LevelItem[p])
                                    continue;
                                item[p] = FORMATTRT_LevelItem[p](item[p]);
                            }
                        });

                        $("#femi-riskLevelItem-tbody").html($com.util.template(GradeItem, HTML.TableItemMode));

                        model.com.getModuleAll({ module: 400003 }, function (resModule1) {
                            TypeSource_LevelItem.EventID.splice(0, TypeSource_LevelItem.EventID.length);
                            if (resModule1 && resModule1.list) {
                                $.each(resModule1.list, function (i, item) {
                                    var module = parseInt(item.ID / 1000);
                                    if (module==mModuleID) {
                                        TypeSource_LevelItem.EventID.push({
                                            name: item.ItemName,
                                            value: item.ID,
                                            far: module
                                        })
                                    }
                                  
                                });
                            }                           
                        });
                    }

                });
            },

            //查询作业类型
            getBPMEvent: function (data, fn, context) {
                var d = {
                    $URI: "/BPMEvent/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //保存作业类型
            postBPMEvent: function (data, fn, context) {
                var d = {
                    $URI: "/BPMEvent/Update",
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
            //查询岗位列表
            getPosition: function (data, fn, context) {
                var d = {
                    $URI: "/BPMFunction/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //保存岗位列表
            postPosition: function (data, fn, context) {
                var d = {
                    $URI: "/BPMFunction/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //审核
            postAudit: function (data, fn, context) {
                var d = {
                    $URI: "/BPMFunction/Audit",
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
                        if (_source[i].RiskID == set_data[j].RiskID) {
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
            //得到ID
            GetMaxID: function (_source) {
                var id = 0;
                if (!_source)
                    _source = [];
                $.each(_source, function (i, item) {
                    if (item.ID > id)
                        id = item.ID;
                });
                return id + 1;

            },
            getOrderList: function (data) {
                var _list = [];
                for (var i = 0; i < DataModuleList.length; i++) {

                    for (var j = 0; j < data.length; j++) {
                        if (DataModuleList[i].ID == data[j].ModuleID) {

                            _list.push(data[j]);
                        }
                    }
                }
              
                return _list;


            },
        }
    }),

    model.init();


});