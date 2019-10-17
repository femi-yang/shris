require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($zace, $com) {

    var KEYWORD_MeteringSetting_LIST_Price,
        KEYWORD_MeteringSetting_LIST_Package,
        KEYWORD_MeteringSetting_LIST_group,

        KEYWORD_MeteringSetting_Price,
        KEYWORD_MeteringSetting_Package,
        KEYWORD_MeteringSetting_group,

        FORMATTRT_MeteringSetting_Price,
        FORMATTRT_MeteringSetting_Package,
        FORMATTRT_MeteringSetting_group,

        DEFAULT_VALUE_MeteringSetting_Price,
        DEFAULT_VALUE_MeteringSetting_Package,
        DEFAULT_VALUE_MeteringSetting_group,

        TypeSource_MeteringSetting_Price,
        TypeSource_MeteringSetting_Package,
        TypeSource_MeteringSetting_group,

        DATABasic_group,
        DataAll_group,
        mPackageID,
        PackageActive,
        materialNoAll,
        resPackageList,
        changeName,
		model,
        DataAll_Price,
        Price,
        DATABasic_Price,
        DataAll_Package,
        DATABasic_Package,
        DATAMeteringSettingBasic,
        mMeteringSettingID,
        HTML;

    groupTemp = {
        Name: "",
        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        ID: 0,
        OperatorID: 0,
        ERPUnitGroupID: 0,
        Active: 0,
        //          Operator:window.parent.User_Info.Name,
    };
    UnitTemp = {
        Name: "",
        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        ID: 0,
        OperatorID: 0,
        ERPUnitID: 0,
        Active: 0,
        GroupID: 0,
        Operator: window.parent.User_Info.Name,
    };
    PackageTemp = {
        ID: 0,
        Name: "",
        MaterialNo: "",
        OperatorID: 0,
        Operator: "",
        UnitText: "",
        FQTY: 0,
        Active: 0,
        ERPPackageID: 0,
        UnitID: 0,
        EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
    };
    HTML = {
        //单位分组
        TableModegroup: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
				'<td data-title="WID" data-value="{{WID}}" >{{WID}}</td>',
				'<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
				'<td data-title="OperatorID" data-value="{{OperatorID}}" >{{OperatorID}}</td>',
              //'<td data-title="ERPUnitGroupID" data-value="{{ERPUnitGroupID}}" >{{ERPUnitGroupID}}</td>',
				'<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
				'<td data-title="EditTime" data-value="{{EditTime}}" >{{EditTime}}</td>',
				'</tr>',
        ].join(""),


        //单位
        TableMode: [
				'<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
				'<td data-title="WID" data-value="{{WID}}" >{{WID}}</td>',
				'<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
				'<td data-title="OperatorID" data-value="{{OperatorID}}" >{{OperatorID}}</td>',
				'<td data-title="ERPUnitID" data-value="{{ERPUnitID}}" >{{ERPUnitID}}</td>',
                '<td data-title="GroupID}" data-value="{{GroupID}}" >{{GroupID}}</td>',
				'<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
				'<td data-title="EditTime" data-value="{{EditTime}}" >{{EditTime}}</td>',
				'</tr>',
        ].join(""),
        TableModeOne: [
        //包装配置
               '<tr>',
               '<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" data-title="femi-tb-checkbox"/></td>',
               '<td data-title="WID" data-value="{{WID}}" >{{WID}}</td>',
               '<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
               '<td data-title="MaterialNo" data-value="{{MaterialNo}}" >{{MaterialNo}}</td>',
               '<td data-title="OperatorID" data-value="{{OperatorID}}" >{{OperatorID}}</td>',
               '<td data-title="FQTY" data-value="{{FQTY}}" >{{FQTY}}</td>',
               '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
             '<td data-title="ERPPackageID" data-value="{{ERPPackageID}}" >{{ERPPackageID}}</td>',
               '<td data-title="UnitID" data-value="{{UnitID}}" >{{UnitID}}</td>',
               '<td data-title="EditTime" data-value="{{EditTime}}" >{{EditTime}}</td>',
               '</tr>',
        ].join(""),


    }

    $(function () {
        KEYWORD_MeteringSetting_LIST_Price = [
        "WID|序号",
        "Name|单位名称",
        "Operator|操作员",
        "OperatorID|操作员|ArrayOne",
        "ERPUnitID|ERP单位",
        "GroupID|分组|ArrayOne",
        "Active|状态|ArrayOne",
        "EditTime|编辑时间|DateTime",
        ];
        KEYWORD_MeteringSetting_Price = {};
        FORMATTRT_MeteringSetting_Price = {};
        DEFAULT_VALUE_MeteringSetting_Price = {
            Name: "",
            GroupID: 0,
            ERPUnitID: 0,
        };

        TypeSource_MeteringSetting_Price = {
            Active: [{
                name: "激活",
                value: 1
            }, {
                name: "禁用",
                value: 0
            }],
            OperatorID: [{
                name: "无",
                value: 0
            }],
            GroupID: [{
                name: "无",
                value: 0
            }]
        };


        $.each(KEYWORD_MeteringSetting_LIST_Price, function (i, item) {
            var detail = item.split("|");
            KEYWORD_MeteringSetting_Price[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_MeteringSetting_Price[detail[0]] = $com.util.getFormatter(TypeSource_MeteringSetting_Price, detail[0], detail[2]);
            }
        });
    });

    $(function () {
        KEYWORD_MeteringSetting_LIST_Package = [
          "WID|序号",
          "ID|包装序号",
          "Name|包装名称",
          "OperatorID|操作员|ArrayOne",
          "MaterialNo|物料档案|ArrayOne",
          "EditTime|编辑时间|DateTime",
          "ERPPackageID|ERP包装",
          "FQTY|数量",
          "Active|状态|ArrayOne",
          "UnitID|单位|ArrayOne",
        ];

        KEYWORD_MeteringSetting_Package = {};
        FORMATTRT_MeteringSetting_Package = {};

        DEFAULT_VALUE_MeteringSetting_Package = {
            Name: "",
        };

        TypeSource_MeteringSetting_Package = {
            Active: [{
                name: "激活",
                value: 1
            }, {
                name: "禁用",
                value: 0
            }],
            UnitID: [{
                name: "全部",
                value: 0
            }],
            MaterialNo: [{
                name: "全部",
                value: 0
            }],
            OperatorID: [{
                name: "全部",
                value: 0
            }]
        };

        $.each(KEYWORD_MeteringSetting_LIST_Package, function (x, item1) {
            var detail = item1.split("|");
            KEYWORD_MeteringSetting_Package[detail[0]] = {
                index: x,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_MeteringSetting_Package[detail[0]] = $com.util.getFormatter(TypeSource_MeteringSetting_Package, detail[0], detail[2]);
            }
        });


    });

    $(function () {
        KEYWORD_MeteringSetting_LIST_group = [
          "WID|序号",
          "ID|分组号",
          "Name|分组名",
          "OperatorID|操作员|ArrayOne",
          "EditTime|编辑时间|DateTime",
          "ERPUnitGroupID|ERP单位分组",
          "Active|状态|ArrayOne",
        ];

        KEYWORD_MeteringSetting_group = {};
        FORMATTRT_MeteringSetting_group = {};

        DEFAULT_VALUE_MeteringSetting_group = {
            Name: "",
            //ERPUnitGroupID:0,
        };

        TypeSource_MeteringSetting_group = {
            Active: [{
                name: "激活",
                value: 1
            }, {
                name: "禁用",
                value: 0
            }],
            OperatorID: [{
                name: "admin",
                value: 1
            }]
        };

        $.each(KEYWORD_MeteringSetting_LIST_group, function (z, item1) {
            var detail = item1.split("|");
            KEYWORD_MeteringSetting_group[detail[0]] = {
                index: z,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_MeteringSetting_group[detail[0]] = $com.util.getFormatter(TypeSource_MeteringSetting_group, detail[0], detail[2]);
            }
        });


    });
    model = $com.Model.create({
        name: '计量设置',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {
            //计量设置修改(单位分组)
            $("body").delegate("#zace-edit-MeteringSetting-group", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-MeteringSetting-tbody-group"), "WID", group);

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
                };
                var Wid = SelectData[0].WID;
                $("body").append($com.modal.show(default_value, KEYWORD_MeteringSetting_group, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    DATABasic_group[Wid - 1].Name = rst.Name;
                    model.com.postUpdateGroup({
                        data: DATABasic_group[Wid - 1]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                    })

                }, TypeSource_MeteringSetting_group));


            });




            //计量设置查询(单位分组)
            $("body").delegate("#zace-search-MeteringSetting-group-", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-MeteringSetting-tbody-group").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-MeteringSetting-tbody-group"), DataAll_group, value, "WID");


            });
            //分组查询
            $("body").delegate("#zace-MeteringSetting-group", "click", function () {
                $('.zzzb').width("54%");
                $('.zzzc').show();
                $('.zzzc').width("45%");
            })


            //计量设置新增(单位分组)
            $("body").delegate("#zace-add-MeteringSetting-group", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_MeteringSetting_group, KEYWORD_MeteringSetting_group, "新增", function (rst) {
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    groupTemp.Name = rst.Name;
                    groupTemp.ERPUnitGroupID = Number(rst.ERPUnitGroupID);
                    model.com.postUpdateGroup({
                        data: groupTemp
                    }, function (res) {
                        model.com.refresh();
                        alert("新增成功");
                    })

                }, TypeSource_MeteringSetting_group))

            });


            $("body").delegate("#zace-back-MeteringSetting-group", "click", function () {
                $('.zzzb').show();
                $('.zzzb').css("width", "100%");
                $('.zzzc').hide();
            })

            //计量设置查询(单位)
            $("body").delegate("#zace-search-MeteringSetting_Price", "change", function () {

                var $this = $(this),
                   value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#femi-MeteringSetting-tbody_Price").children("tr").show();
                else
                    $com.table.filterByLikeString($("#femi-MeteringSetting-tbody_Price"), DataAll_Price, value, "WID");


            });
            // 禁用单位
            $("body").delegate("#zace-remove-MeteringSetting_Price", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-MeteringSetting-tbody_Price"), "WID", DataAll_Price);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                var list = [];
                for (var i = 0; i < SelectData.length; i++) {
                    var Wid = SelectData[i].WID;

                    list.push(DATABasic_Price[Wid - 1]);
                }

                model.com.PostActive({
                    data: list,
                    Active: 0
                }, function (res) {
                    alert("禁用成功");
                    model.com.refresh();
                })
            });

            //激活单位
            $("body").delegate("#zace-ok-MeteringSetting_Price", "click", function () {
                var SelectData = $com.table.getSelectionData($("#femi-MeteringSetting-tbody_Price"), "WID", DataAll_Price);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                var _list = [];
                for (var i = 0; i < SelectData.length; i++) {
                    var Wid = SelectData[i].WID;

                    _list.push(DATABasic_Price[Wid - 1]);
                }
                model.com.PostActive({
                    data: _list,
                    Active: 1
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();
                })
            });
            //计量设置修改(单位)
            $("body").delegate("#zace-edit-MeteringSetting_Price", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-MeteringSetting-tbody_Price"), "WID", DataAll_Price);

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
                    GroupID: SelectData[0].GroupID,
                    ERPUnitID: SelectData[0].ERPUnitID,
                };
                var Wid = SelectData[0].WID;
                $("body").append($com.modal.show(default_value, KEYWORD_MeteringSetting_Price, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    DATABasic_Price[Wid - 1].Name = rst.Name;
                    DATABasic_Price[Wid - 1].GroupID = Number(rst.GroupID);
                    DATABasic_Price[Wid - 1].ERPUnitID = Number(rst.ERPUnitID);
                    model.com.PostUpdate({
                        data: DATABasic_Price[Wid - 1]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                    })

                }, TypeSource_MeteringSetting_Price));


            });


            //计量设置新增(单位)
            $("body").delegate("#zace-add-MeteringSetting_Price", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_MeteringSetting_Price, KEYWORD_MeteringSetting_Price, "新增", function (rst) {
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    UnitTemp.Name = rst.Name;
                    //                 UnitTemp.ID =model.com.GetMaxID(DataAll_Price);
                    UnitTemp.GroupID = Number(rst.GroupID);
                    UnitTemp.ERPUnitID = Number(rst.ERPUnitID);

                    model.com.PostUpdate({
                        data: UnitTemp
                    }, function (res) {
                        model.com.refresh();
                        alert("新增成功");
                    })

                }, TypeSource_MeteringSetting_Price))

            });

            $("body").delegate("#zace-back-MeteringSetting-Unit", "click", function () {
                var vdata = { 'header': '单位转换', 'href': './product_standard/MeasureUnit.html', 'id': 'MeasureUnit', 'src': './static/images/menu/manageBOM.png' };
                window.parent.iframeHeaderSet(vdata);
            })


            //           //计量设置查询(包装配置)
            //          $("body").delegate("#zace-search-MeteringSetting_Package", "click", function () {
            //              var default_valueOne = {
            //                  //物料号
            //                  MaterialNo: "",
            //
            //              };
            //              $("body").append($com.modal.show(default_valueOne, KEYWORD_MeteringSetting_Package, "查询", function (rst) {
            //                  if (!rst || $.isEmptyObject(rst))
            //                      return;
            //
            //                  default_valueOne.MaterialNo = rst.MaterialNo;
            //                      model.com.getMaterialNo({material_no:"", material_name:"",type_id:0,status:0}, function (dataWl) {
            //                      materialNoAll = dataWl.list;
            //                      $.each(materialNoAll, function (i, item_i) {
            //                          if (rst.MaterialNo == item_i)
            //                              $.each(DataAll_Package, function (j, item_j) {
            //                                  if (item_j.MaterialNo == rst.MaterialNo) {
            //                                      DataAll_Package = item_j;
            //                                      return false;
            //                                  }
            //                              });
            //                      });
            //                  });
            //                 
            //                	  model.com.refresh();
            //                
            //              }, TypeSource_MeteringSetting_Package));
            //
            //
            //          });


            //计量设置新增(保存包装配置)
            $("body").delegate("#zace-add-MeteringSetting_Package", "click", function () {
                $("body").append($com.modal.show(DEFAULT_VALUE_MeteringSetting_Package, KEYWORD_MeteringSetting_Package, "新增", function (rst) {
                    //调用插入函数 

                    if (!rst || $.isEmptyObject(rst))
                        return;

                    PackageTemp.Name = rst.Name;
                    PackageTemp.FQTY = Number(rst.FQTY);
                    PackageTemp.Active = Number(rst.Active);
                    PackageTemp.UnitID = Number(rst.UnitID);
                    var _list = [];

                    _list.push(PackageTemp);

                    model.com.postMeteringSettingPackage({
                        data: _list[0],

                    }, function (res) {
                        model.com.refresh();
                        alert("新增成功");

                    })

                }, TypeSource_MeteringSetting_Package));


            });


            //计量设置导出(价格)
            $("body").delegate("#zace-export-MeteringSetting", "click", function () {
                var $table = $(".table-part"),
                     fileName = "计量设置.xls",
                     Title = "计量设置";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });

            });
            //单位装换导出(价格)
            $("body").delegate("#zace-export-UnitSetting", "click", function () {
                var $table = $(".unit-table"),
                     fileName = "单位转换.xls",
                     Title = "单位转换";
                var params = $com.table.getExportParams($table, fileName, Title);

                model.com.postExportExcel(params, function (res) {
                    var src = res.info.path;
                    window.open(src);
                });

            });
            //计量设置返回（价格）
            $("body").delegate("#zace-back-MeteringSetting_Price", "click", function () {
                $('.zzza').width("100%");
                $('.zzzb').hide();

            });

            //计量设置单位序号（包装配置）
            $("body").delegate("#femi-MeteringSetting-tbody_Package tr", "dblclick", function () {
                var $this = $(this);
                mMeteringSettingID = $this.find("td[data-title='WID']").attr("data-value");
                //              console.log(DATABasic_Package[mMeteringSettingID-1].UnitID);
                if ($this.children('th')[0]) {
                    return true;
                }
                $('.zzza').width("50%");
                $('.zzzb').show();


            });


            //计量设置双击名称
            $("body").delegate("#femi-MeteringSetting-tbody_Price td[data-title='Name']", "dblclick", function () {
                var $this = $(this);
                mID = $this.parent().find("td[data-title='WID']").attr("data-value");

                DataAll_Package[mMeteringSettingID - 1].UnitID = Number(DataAll_Price[mID - 1].ID);
                model.com.postMeteringSettingPackage({
                    data: DataAll_Package[mMeteringSettingID - 1]
                }, function (res) {
                    alert("修改成功");
                    model.com.refresh();

                });
                //              $.each(resPackageList, function (i, item) {
                //                  if (item.ID == mMeteringSettingID)
                //                      item.UnitID = changeName;
                //              });
                $('.zzza').width("100%");
                $('.zzzb').hide();
                model.com.refresh();
            });





            //禁用单位(包装配置)
            $("body").delegate("#zace-remove-MeteringSetting_Package", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-MeteringSetting-tbody_Package"), "ID", DataAll_Package);

                if (!SelectData || !SelectData.length) {
                    alert("至少选择一行数据！")
                    return;
                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其禁用？")) {
                    return;
                }

                model.com.postActive_Package({
                    data: SelectData,
                    active: 0
                }, function (res) {
                    alert("禁用成功");
                    model.com.refresh();
                })


            });


            //激活包装配置
            $("body").delegate("#zace-active-MeteringSetting_Package", "click", function () {


                var SelectData = $com.table.getSelectionData($("#femi-MeteringSetting-tbody_Package"), "ID", DataAll_Package);

                if (!SelectData || !SelectData.length) {
                    alert("至少选择一行数据！")
                    return;
                }
                if (!confirm("已选择" + SelectData.length + "条数据，确定将其激活？")) {
                    return;
                }
                model.com.postActive_Package({
                    data: SelectData,
                    active: 1
                }, function (res) {
                    alert("激活成功");
                    model.com.refresh();
                })
            });

            //修改包装配置
            $("body").delegate("#zace-edit-MeteringSetting_Package", "click", function () {

                var SelectData = $com.table.getSelectionData($("#femi-MeteringSetting-tbody_Package"), "ID", DataAll_Package);
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
                    FQTY: SelectData[0].FQTY,
                    Active: SelectData[0].Active,
                    UnitID: SelectData[0].UnitID,
                };

                $("body").append($com.modal.show(default_value, KEYWORD_MeteringSetting_Package, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;

                    SelectData[0].Name = rst.Name;
                    SelectData[0].FQTY = Number(rst.FQTY);
                    SelectData[0].Active = Number(rst.Active);
                    SelectData[0].UnitID = Number(rst.UnitID);



                    model.com.postMeteringSettingPackage({
                        data: SelectData[0]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                    })

                }, TypeSource_MeteringSetting_Package));
            });


        },





        run: function () {
            //          model.com.refresh();
            $('.zzza').hide();
            $('.zzzc').hide();

            model.com.getUnit({}, function (resPrice) {
                $.each(resPrice.list, function (i, item) {
                    TypeSource_MeteringSetting_Package.UnitID.push({
                        name: item.Name,
                        value: item.ID,
                        far: null
                    })
                });
                model.com.refresh();
            });

            model.com.GetUser({}, function (resUser) {
                $.each(resUser.list, function (i, item) {
                    TypeSource_MeteringSetting_Price.OperatorID.push({
                        name: item.Name,
                        value: item.ID,
                        far: null
                    })
                });
                model.com.refresh();
            });

            model.com.GetMaterialNo({ material_no: "", material_name: "", type_id: 0, status: 0 }, function (resNO) {
                $.each(resNO.list, function (i, item) {
                    TypeSource_MeteringSetting_Package.MaterialNo.push({
                        name: item.Name,
                        value: item.ID,
                        far: null
                    })
                });
                model.com.refresh();
            });

            model.com.getGroupAll({}, function (resGroup) {
                $.each(resGroup.list, function (i, item) {
                    TypeSource_MeteringSetting_Price.GroupID.push({
                        name: item.Name,
                        value: item.ID,
                        far: null
                    })
                });
                model.com.refresh();
            });
        },

        com: {
            refresh: function () {
                //计量设置(单位)
                model.com.getGroupAll({}, function (resgroup) {
                    if (!resgroup)
                        return;
                    if (resgroup && resgroup.list) {
                        group = $com.util.Clone(resgroup.list);
                        DATABasic_group = $com.util.Clone(resgroup.list);

                        $.each(group, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_MeteringSetting_group[p])
                                    continue;
                                item[p] = FORMATTRT_MeteringSetting_group[p](item[p]);
                            }
                        });

                        $.each(group, function (i, item) {
                            item.WID = i + 1;
                        });
                        DataAll_group = $com.util.Clone(group);
                        $("#femi-MeteringSetting-tbody-group").html($com.util.template(group, HTML.TableModegroup));

                    }
                });
                model.com.getUnit({}, function (resPrice) {
                    if (!resPrice)
                        return;
                    if (resPrice && resPrice.list) {
                        Price = $com.util.Clone(resPrice.list);
                        DATABasic_Price = $com.util.Clone(resPrice.list);

                        $.each(Price, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_MeteringSetting_Price[p])
                                    continue;
                                item[p] = FORMATTRT_MeteringSetting_Price[p](item[p]);
                            }
                        });

                        $.each(Price, function (i, item) {
                            item.WID = i + 1;
                        });
                        DataAll_Price = $com.util.Clone(Price);
                        $("#femi-MeteringSetting-tbody_Price").html($com.util.template(Price, HTML.TableMode));

                    }

                });




                //              $("#femi-MeteringSetting-tbody_Package").html($com.util.template(resPackageList, HTML.TableModeOne));
                // 查询包装配置
                model.com.getMeteringSettingPackage({ MaterialNo: "s2" }, function (resPackage) {
                    if (!resPackage)
                        return;
                    if (resPackage && resPackage.list) {
                        //                          var Package = $com.util.Clone(resPackage.list);
                        DATABasic_Package = $com.util.Clone(resPackage.list);
                        DataAll_Package = $com.util.Clone(resPackage.list);
                        $.each(DATABasic_Package, function (i, item) {
                            item.WID = i + 1;
                        });
                        $.each(DATABasic_Package, function (x, item1) {
                            for (var q in item1) {
                                if (!FORMATTRT_MeteringSetting_Package[q])

                                    continue;
                                item1[q] = FORMATTRT_MeteringSetting_Package[q](item1[q]);
                            }

                        });

                        $("#femi-MeteringSetting-tbody_Package").html($com.util.template(DATABasic_Package, HTML.TableModeOne));

                    }

                });


                //             model.com.getMeasureUnit({}, function (resUnit) {
                //                  if (!resUnit)
                //                      return;
                //                 
                //
                //              });



            },

            //查询单位组列表
            getGroupAll: function (data, fn, context) {
                var d = {
                    $URI: "/Unit/GroupAll",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //保存单位组列表
            postUpdateGroup: function (data, fn, context) {
                var d = {
                    $URI: "/Unit/UpdateGroup",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //查询单位
            getUnit: function (data, fn, context) {
                var d = {
                    $URI: "/Unit/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },


            //保存单位(参数data:{MSSUnit})
            PostUpdate: function (data, fn, context) {
                var d = {
                    $URI: "/Unit/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //激活单位(参数data:{MSSUnit[]}，active:{int})
            PostActive: function (data, fn, context) {
                var d = {
                    $URI: "/Unit/Active",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //用户表
            GetUser: function (data, fn, context) {
                var d = {
                    $URI: "/User/All",
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


            //计量设置(保存包装配置)
            //          postMeteringSettingPackage: function (data, fn, context) {
            //              
            //				//保存到变量中
            //              fn();
            //          },
            postMeteringSettingPackage: function (data, fn, context) {
                var d = {
                    $URI: "/Package/Save",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },


            //查询计量设置列表(查询包装配置)
            //          getMeteringSettingPackage: function (data, fn, context) {
            //              fn(resPackageList);
            //          },

            getMeteringSettingPackage: function (data, fn, context) {
                var d = {
                    $URI: "/Package/Get",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //物料号
            //Material_no：{String} ,material_name:{String} ,type_id:{int} ,status:{int}
            GetMaterialNo: function (data, fn, context) {
                var d = {
                    $URI: "/Material/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //激活单位(包装配置)
            postActive_Package: function (data, fn, context) {
                var d = {
                    $URI: "/Package/Active",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
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



        }
    }),

model.init();


});