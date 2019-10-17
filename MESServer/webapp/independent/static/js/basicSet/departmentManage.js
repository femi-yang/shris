require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base', '../static/utils/js/base/html2canvas', '../static/utils/js/base/jquery.orgchart'],
    function ($lin, $com, $l_html2canvas, $l_orgchart) {

        var HTML,
            AllDepartment,
            ALLPosition,
            Department_LIST,
            Position_LIST,
            KEYWORD_department,
            KEYWORD_position,
            Columns_department,
            Columns_position,
            KEYWORD_position_LIST,
            KEYWORD_department_LIST,
            Formattrt_department,
            Formattrt_position,

            model,
            DEFAULT_VALUE_D,
            DEFAULT_VALUE_P,
            TypeSource_department,
            TypeSource_position;

        HTML = {

            TablePosition: [
                '<tr>',
                '<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
                '<td style="width: 200px" data-title="ID" data-value="{{ID}}">{{ID}}</td>',
                '<td style="min-width: 50px" data-title="Name" data-value="{{Name}}">{{Name}}</td>',
                '<td style="min-width: 50px" data-title="ParentID" data-value="{{ParentID}}">{{ParentID}}</td>',
                '<td style="min-width: 50px" data-title="DepartmentID" data-value="{{DepartmentID}}">{{DepartmentID}}</td>',
                '<td style="min-width: 50px" data-title="DutyID" data-value="{{DutyID}}">{{DutyID}}</td>',
                '<td style="width: 200px" data-title="Active" data-value="{{Active}}">{{Active}}</td>',
                '</tr>',
            ].join(""),

            TableDepartment: [
                '<tr>',
                '<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
                '<td style="width: 250px" data-title="ID" data-value="{{ID}}">{{ID}}</td>',
                '<td style="min-width: 50px" data-title="Name" data-value="{{Name}}">{{Name}}</td>',
                '<td style="min-width: 50px" data-title="ParentID" data-value="{{ParentID}}">{{ParentID}}</td>',
                '<td style="width: auto" data-title="Active" data-value="{{Active}}">{{Active}}</td>',
                '</tr>',
            ].join(""),
        };
        Position_LIST = [];
        Department_LIST = [];
        Formattrt_department = {};
        Formattrt_position = {};
        DEFAULT_VALUE_D = {
            Name: "",
            ParentID: 0,
            Active: 1
        };
        DEFAULT_VALUE_P = {
            Name: "",
            DepartmentID: 0,
            ParentID: 0,
            DutyID: 0,
            Active: 1
        };
        (function () {
            KEYWORD_department_LIST = [
                "ID|部门编号",
                "Name|部门名称",
                "ParentID|上级部门|ArrayOne",
                "Active|状态|ArrayOne",
            ];


            KEYWORD_department = {};
            Columns_department = [];

            TypeSource_department = {
                Active: [{
                    name: "激活",
                    value: 1
                }, {
                    name: "禁用",
                    value: 0
                }],
                ParentID: [{
                    name: "无",
                    value: 0
                }],
            };

            $.each(KEYWORD_department_LIST, function (i, item) {
                var detail = item.split("|");
                KEYWORD_department[detail[0]] = {
                    index: i,
                    name: detail[1],
                    type: detail.length > 2 ? detail[2] : undefined
                };
                var _column = {
                    field: detail[0],
                    title: detail[1],
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                };
                if (detail.length > 2) {
                    Formattrt_department[detail[0]] = $com.util.getFormatter(TypeSource_department, detail[0], detail[2]);
                }
            });
        })();
        (function () {

            KEYWORD_position_LIST = [
                "ID|岗位编号",
                "Name|岗位名称",
                "DepartmentID|部门名称|ArrayOneControl",
                "ParentID|上级岗位|ArrayOneControl|DepartmentID",
                "DutyID|岗位职责|ArrayOne",
                "Active|状态|ArrayOne",
            ];

            KEYWORD_position = {};

            //Columns_position = [];


            TypeSource_position = {
                Active: [{
                    name: "激活",
                    value: 1
                }, {
                    name: "禁用",
                    value: 0
                }],
                ParentID: [{
                    name: "无",
                    value: 0,
                    far: 0
                }],
                DepartmentID: [{
                    name: "无",
                    value: 0,
                    far: 0
                }],
                DutyID: [{
                    name: "无",
                    value: 0
                },
                {
                    name: "生产员",
                    value: 1001
                },
                {
                    name: "电修工",
                    value: 2001
                },
                {
                    name: "机修工",
                    value: 3001
                },
                {
                    name: "计量员",
                    value: 4001
                },
                {
                    name: "巡检员",
                    value: 5001
                },
                {
                    name: "入库检验员",
                    value: 5002
                },
                {
                    name: "工艺员",
                    value: 6001
                },
                {
                    name: "配料员",
                    value: 7001
                },
                {
                    name: "收料员",
                    value: 7002
                },
                {
                    name: "仓库管理员",
                    value: 7003
                },
                {
                    name: "辅料员",
                    value: 7004
                },
                {
                    name: "操作员",
                    value: 8001
                },
                {
                    name: "管理",
                    value: 10001
                }],
            };
            $.each(KEYWORD_position_LIST, function (i, item) {
                var detail = item.split("|");
                KEYWORD_position[detail[0]] = {
                    index: i,
                    name: detail[1],
                    type: detail.length > 2 ? detail[2] : undefined,
                    control: detail.length > 3 ? detail[3] : undefined
                };
                var _column = {
                    field: detail[0],
                    title: detail[1],
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                };
                if (detail.length > 2) {
                    Formattrt_position[detail[0]] = $com.util.getFormatter(TypeSource_position, detail[0], detail[2]);
                }
            });

        })();

        model = $com.Model.create({
            name: '部门管理',

            type: $com.Model.MAIN,

            configure: function () {
                this.run();
            },

            events: function () {
                (function () {
                    //展开部门
                    $("body").delegate("li.femi-department-show", "click", function () {
                        $(".l-containe-canvas-table-position").hide();
                        $(".l-containe-canvas-table-department").show();

                    });
                    //展开岗位
                    $("body").delegate("li.femi-position-show", "click", function () {
                        $(".l-containe-canvas-table-department").hide();
                        $(".l-containe-canvas-table-position").show();
                    });
                    //显示结构图
                    $("body").delegate("li.femi-canvas-show", "click", function () {

                        $(".l-containe-canvas-table").css("height", "60%");
                        $(".l-container-canvas").show();
                    });
                    //隐藏结构图
                    $("body").delegate("li.femi-canvas-hide", "click", function () {

                        $(".l-containe-canvas-table").css("height", "100%");
                        $(".l-container-canvas").hide();
                    });

                })();

                //岗位导航栏按钮
                (function () {
                    $("body").delegate("#l-add-position", "click", function () {

                        //将Json数据中的数据值改成对应默认值，然后传入进去
                        $("body").append($com.modal.show(DEFAULT_VALUE_P, KEYWORD_position, "新增岗位", function (rst) {
                            //调用插入函数然后用load刷新数据源 
                            if (!rst || $.isEmptyObject(rst))
                                return false;
                            var _data = {
                                ID: GetMaxID(Position_LIST),
                                Active: Number(rst.Active),
                                Name: rst.Name,
                                DepartmentID: Number(rst.DepartmentID),
                                ParentID: Number(rst.ParentID),
                                DutyID: Number(rst.DutyID),
                                SonList: [],
                            };
                            if (_data.ParentID > 0) {
                                _data.DepartmentID = GetDepartmentID(model._data.source_posn, _data.ParentID);
                            }

                            //_data.iD=
                            if (_data.ParentID > 0) {
                                model._data.source_posn = SetSourceItem_P(model._data.source_posn, _data);
                            } else {
                                if (!model._data.source_posn)
                                    model._data.source_posn = [];
                                model._data.source_posn.push(_data);
                            }
                            model.com.postPosition({
                                data: model._data.source_posn
                            }, function (res) {
                                alert("新增成功！！");
                                //Refresh("getPosition");
                                model.com.refresh();
                            });
                            return false;
                        }, TypeSource_position));
                    });

                    $("body").delegate("#l-revise-position", "click", function () {

                        var SelectData = $com.table.getSelectionData($(".l-containe-canvas-table .l-position-body"), "ID", AllPosition);
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
                            ParentID: SelectData[0].ParentID,
                            DutyID: SelectData[0].DutyID,
                            Active: SelectData[0].Active,
                            DepartmentID : SelectData[0].DepartmentID,
                        };

                        var TypeMo = $com.util.Clone(TypeSource_position),
                            count;

                        $.each(TypeMo.ParentID, function (i, item) {
                            if (item.value == SelectData[0].ID) {
                                count = i;
                                return false;
                            }

                        });
                        TypeMo.ParentID.splice(count, 1);

                        $("body").append($com.modal.show(default_value, KEYWORD_position, "修改", function (rst) {
                            //调用修改函数
                            if (!rst || $.isEmptyObject(rst))
                                return;

                            if (Number(rst.ParentID) && Number(rst.ParentID) != SelectData[0].ParentID
                                && SelectData[0].SonList
                                && GetContainID(SelectData[0].SonList, Number(rst.ParentID)) == 1) {
                                alert("上级不能改为原上级本身的下级子集！！");
                                return;
                            }

                            //存在上级岗位且修改部门名称
                            if (SelectData[0].ParentID != 0 && default_value.DepartmentID != Number(rst.DepartmentID)) {
                                alert("该岗位存在上级岗位，无法做更改！");
                                return false;
                            }
                            //存在上级岗位且但不修改部门名称
                            if (SelectData[0].ParentID != 0 && default_value.DepartmentID == Number(rst.DepartmentID)) {

                                SelectData[0].Name = rst.Name;
                                SelectData[0].ParentID = Number(rst.ParentID);
                                SelectData[0].DutyID = Number(rst.DutyID);
                                SelectData[0].Active = Number(rst.Active);


                                if (SelectData[0].ParentID <= 0 && SelectData[0].DepartmentID != SelectData[0].DepartmentID) {
                                    model._data.source_posn = SetDepartmentID(model._data.source_posn, SelectData[0].ID, SelectData[0].DepartmentID);
                                }

                                model._data.source_posn = DeleteSourceItem(model._data.source_posn, SelectData[0]);
                                // model._data.source_posn.push(_data);

                                model.com.postPosition({
                                    data: model._data.source_posn
                                }, function (res) {
                                    alert("修改成功！！");
                                    //Refresh("getPosition");
                                    model.com.refresh();
                                });
                            }
                            //不存在上级岗位且修改部门名称
                            if (SelectData[0].ParentID == 0 && default_value.DepartmentID != Number(rst.DepartmentID)) {

                                var wID = SelectData[0].DepartmentID;
                                $.each(model._data.source_posn, function (i, item) {
                                    if (item.DepartmentID == wID)
                                        item.DepartmentID = Number(rst.DepartmentID);
                                });

                                SelectData[0].Name = rst.Name;
                                SelectData[0].ParentID = Number(rst.ParentID);
                                SelectData[0].DutyID = Number(rst.DutyID);
                                SelectData[0].Active = Number(rst.Active);
                                SelectData[0].DepartmentID = Number(rst.DepartmentID);


                                if (SelectData[0].ParentID <= 0 && SelectData[0].DepartmentID != SelectData[0].DepartmentID) {
                                    model._data.source_posn = SetDepartmentID(model._data.source_posn, SelectData[0].ID, SelectData[0].DepartmentID);
                                }

                                model._data.source_posn = DeleteSourceItem(model._data.source_posn, SelectData[0]);
                                // model._data.source_posn.push(_data);

                                model.com.postPosition({
                                    data: model._data.source_posn
                                }, function (res) {
                                    alert("修改成功！！");
                                    //Refresh("getPosition");
                                    model.com.refresh();
                                });
                            }
                            //不存在上级岗位且不修改部门名称
                            if (SelectData[0].ParentID == 0 && default_value.DepartmentID == Number(rst.DepartmentID)) {

                                SelectData[0].Name = rst.Name;
                                SelectData[0].ParentID = Number(rst.ParentID);
                                SelectData[0].DutyID = Number(rst.DutyID);
                                SelectData[0].Active = Number(rst.Active);
                                SelectData[0].DepartmentID = Number(rst.DepartmentID);


                                if (SelectData[0].ParentID <= 0 && SelectData[0].DepartmentID != SelectData[0].DepartmentID) {
                                    model._data.source_posn = SetDepartmentID(model._data.source_posn, SelectData[0].ID, SelectData[0].DepartmentID);
                                }

                                model._data.source_posn = DeleteSourceItem(model._data.source_posn, SelectData[0]);
                                // model._data.source_posn.push(_data);

                                model.com.postPosition({
                                    data: model._data.source_posn
                                }, function (res) {
                                    alert("修改成功！！");
                                    //Refresh("getPosition");
                                    model.com.refresh();
                                });
                            }
                            // var _data = {
                            //     ID: SelectData[0].ID,
                            //     Active: Number(rst.Active),
                            //     Name: rst.Name,
                            //     ParentID: Number(rst.ParentID),
                            //     DepartmentID: SelectData[0].ParentID <= 0 ? Number(rst.DepartmentID) : SelectData[0].DepartmentID,
                            //     DutyID: Number(rst.DutyID),
                            //     SonList: SelectData[0].SonList
                            // };


                        }, TypeMo));
                    });
                    $("body").delegate("#l-delete-position", "click", function () {

                        var SelectData = $com.table.getSelectionData($(".l-containe-canvas-table .l-position-body"), "ID", Position_LIST);
                        if (!SelectData || !SelectData.length) {
                            alert("至少选择一行数据再试！")
                            return;
                        }
                        if (!confirm("已选择" + SelectData.length + "条数据，确定将其删除？")) {
                            return;
                        }

                        model._data.source_posn = DeleteSourceItem(model._data.source_posn, SelectData);
                        model.com.postPosition({
                            data: model._data.source_posn
                        }, function (res) {
                            alert("删除成功！！");
                            model.com.refresh();
                            //Refresh("getPosition");
                        });
                        //调用删除函数然后用load刷新数据源  
                    });
                    $("body").delegate("#l-freshen-position", "click", function () {

                        //Refresh("getPosition");
                        model.com.refresh();
                    });
                    $("body").delegate("#l-forbidder-position", "click", function () {

                        var SelectData = $com.table.getSelectionData($(".l-containe-canvas-table .l-position-body"), "ID", Position_LIST);
                        if (!SelectData || !SelectData.length) {
                            alert("请先选择一行数据再试！")
                            return;
                        }
                        if (!confirm("已选择" + SelectData.length + "条数据，确定将其禁用？")) {
                            return;
                        }
                        model._data.source_posn = ActiveSourceItem(model._data.source_posn, SelectData, 0);
                        model.com.postPosition({
                            data: model._data.source_posn,
                        }, function (res) {
                            alert("禁用成功！！");
                            model.com.refresh();
                            //Refresh("getPosition");
                        });
                        //调用删除函数然后用load刷新数据源 
                    });
                    $("body").delegate("#l-active-position", "click", function () {

                        var SelectData = $com.table.getSelectionData($(".l-containe-canvas-table .l-position-body"), "ID", Position_LIST);
                        if (!SelectData || !SelectData.length) {
                            alert("请先选择一行数据再试！")
                            return;
                        }
                        if (!confirm("已选择" + SelectData.length + "条数据，确定将其激活？")) {
                            return;
                        }
                        model._data.source_posn = ActiveSourceItem(model._data.source_posn, SelectData, 1);
                        model.com.postPosition({
                            data: model._data.source_posn
                        }, function (res) {
                            alert("激活成功！！");
                            model.com.refresh();
                            //Refresh("getPosition");
                        });

                    });
                })();

                function GetDepartmentID(_source, item_id) {
                    var id = 0;
                    if (!_source)
                        _source = [];
                    $.each(_source, function (i, item) {
                        if (item.ID == item_id)
                            id = item.DepartmentID;
                    });
                    return id;
                }
                //岗位列表中部门ID设置
                function SetDepartmentID(_source, item_id, d_id) {
                    if (!_source)
                        _source = [];
                    $.each(_source, function (i, item) {
                        if (item.ID == item_id) {
                            item.DepartmentID = d_id;
                            if (item.SonList)
                                item.SonList = _Set_DepartmentID(item.SonList, d_id);
                        } else if (item.SonList)
                            item.SonList = SetDepartmentID(item.SonList, item_id, d_id);
                    });
                    return _source;
                }
                //设置岗位子项部门ID
                function _Set_DepartmentID(_source, d_id) {
                    if (!_source)
                        _source = [];
                    $.each(_source, function (i, item) {

                        item.DepartmentID = d_id;
                        if (item.SonList && item.SonList)
                            item.SonList = _Set_DepartmentID(item.SonList, d_id);

                    });
                    return _source;
                }
                function GetMaxID(_source) {
                    var id = 0;
                    if (!_source)
                        _source = [];
                    $.each(_source, function (i, item) {
                        if (item.ID > id)
                            id = item.ID;
                    });
                    return id + 1;
                }
                function SetSourceItem_D(_source, set_data) {
                    if (!_source || !_source.length) {
                        _source = [set_data];
                        return _source;
                    }

                    $.each(_source, function (i, item) {

                        if (item.ID == set_data.ParentID) {
                            if (!item.SonList)
                                item.SonList = [];
                            item.SonList.push(set_data);
                        } else if (item.SonList && item.SonList.length) {
                            item.SonList = SetSourceItem_D(item.SonList, set_data);
                        }
                    });
                    return _source;
                }
                function DeleteSourceItem(_source, set_data) {
                    if (!_source)
                        _source = [];
                    if (!set_data)
                        set_data = [];
                    var rst = [];
                    $.each(_source, function (i, item) {
                        var NotOWn = true;
                        $.each(set_data, function (m, item_m) {
                            if (item.ID == item_m.ID)
                                NotOWn = false;
                        });
                        if (NotOWn && item.SonList) {

                            item.SonList = DeleteSourceItem(item.SonList, set_data);

                        }
                        if (NotOWn)
                            rst.push(item);
                    });
                    return rst;
                }
                function ActiveSourceItem(_source, set_data, active) {
                    if (!_source)
                        _source = [];
                    if (!set_data)
                        set_data = [];

                    $.each(_source, function (i, item) {

                        $.each(set_data, function (m, item_m) {
                            if (item.ID == item_m.ID) {
                                item.Active = active;
                            }
                        });
                        if (item.SonList) {

                            item.SonList = ActiveSourceItem(item.SonList, set_data, active);

                        }
                    });
                    return _source;
                }

                function SetSourceItem_P(_source, set_data) {
                    if (!_source || !_source.length) {
                        _source = [set_data];
                        return _source;
                    }

                    $.each(_source, function (i, item) {

                        if (item.ID == set_data.ParentID) {
                            if (!item.SonList || !item.SonList)
                                item.SonList = [];
                            item.SonList.push(set_data);
                        } else if (item.SonList && item.SonList.length) {
                            item.SonList = SetSourceItem_P(item.SonList, set_data);

                        }
                    });
                    return _source;
                }

                function GetContainID(list, item_id) {
                    $.each(list, function (i, item) {

                        if (item.ID == item_id) {
                            return 1;
                        } else {
                            if (item.SonList) {
                                if (GetContainID(item.SonList, item_id) == 1)
                                    return 1;
                            }
                        }
                    });
                    return 0;
                }

                function Refresh(fnNmae) {
                    model.com[fnNmae]({}, model.com.responseHandler[fnNmae]);
                }
                //部门导航栏按钮
                (function () {
                    $("body").delegate("#l-add-department", "click", function () {
                        //将Json数据中的数据值改成对应默认值，然后传入进去
                        $("body").append($com.modal.show(DEFAULT_VALUE_D, KEYWORD_department, "新增部门", function (rst) {
                            //调用插入函数然后用load刷新数据源 

                            if (!rst || $.isEmptyObject(rst))
                                return false;
                            var _data = {
                                ID: GetMaxID(Department_LIST),
                                Active: Number(rst.Active),
                                Name: rst.Name,
                                ParentID: Number(rst.ParentID),
                                SonList: []
                            };

                            if (_data.ParentID > 0) {
                                model._data.source_deps = SetSourceItem_D(model._data.source_deps, _data);
                            } else {
                                if (!model._data.source_deps)
                                    model._data.source_deps = [];
                                model._data.source_deps.push(_data);
                            }
                            model.com.postDepartment({
                                data: model._data.source_deps
                            }, function (res) {
                                alert("新增成功！！");
                                model.com.refresh();
                                //Refresh("getDepartment");
                            });
                        }, TypeSource_department));
                    });
                    $("body").delegate("#l-revise-department", "click", function () {

                        var SelectData = $com.table.getSelectionData($(".l-containe-canvas-table .l-department-body"), "ID", AllDepartment);
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
                            ParentID: SelectData[0].ParentID,
                            //Active: SelectData[0].Active,
                        };

                        var TypeMo = $com.util.Clone(TypeSource_department),
                            count;

                        $.each(TypeMo.ParentID, function (i, item) {
                            if (item.ID == SelectData[0].ID) {
                                count = i;
                                return false;
                            }

                        });
                        TypeMo.ParentID.splice(count, 1);

                        $("body").append($com.modal.show(default_value, KEYWORD_department, "修改", function (rst) {
                            //调用修改函数
                            if (!rst || $.isEmptyObject(rst))
                                return;

                            if (SelectData[0].SonList &&
                                GetContainID(SelectData[0].SonList, Number(rst.ParentID)) == 1) {
                                alert("上级不能改为原上级本身的下级子集！！");
                                return;
                            }

                            // var _data = {
                            //     ID: SelectData[0].ID,
                            //     //iDSpecified:true,
                            //     Active: Number(rst.Active),
                            //     //activeSpecified:true,
                            //     Name: rst.Name,
                            //     //nameSpecified:true,
                            //     ParentID: Number(rst.ParentID),
                            //     //parentIDSpecified:true,
                            //     SonList: SelectData[0].SonList
                            //     //sonListSpecified:true,
                            // };

                            SelectData[0].Name = rst.Name;
                            SelectData[0].ParentID = Number(rst.ParentID);

                            model._data.source_deps = SetDepartmentID(model._data.source_deps, SelectData[0].ID, SelectData[0].ParentID);

                            model._data.source_deps = DeleteSourceItem(model._data.source_deps, SelectData[0]);

                            //model._data.source_deps.push(_data);

                            model.com.postDepartment({
                                data: model._data.source_deps
                            }, function (res) {
                                alert("修改成功！！");
                                model.com.refresh();
                                //Refresh("getDepartment");
                            });

                        }, TypeMo));
                    });
                    $("body").delegate("#l-delete-department", "click", function () {

                        var SelectData = $com.table.getSelectionData($(".l-containe-canvas-table .l-department-body"), "ID", Department_LIST);
                        if (!SelectData || !SelectData.length) {
                            alert("至少选择一行数据再试！")
                            return;
                        }

                        if (!confirm("已选择" + SelectData.length + "条数据，确定将其删除？")) {
                            return;
                        }

                        model._data.source_deps = DeleteSourceItem(model._data.source_deps, SelectData);
                        model.com.postDepartment({
                            data: model._data.source_deps
                        }, function (res) {
                            alert("删除成功！！");
                            model.com.refresh();
                            //Refresh("getDepartment");
                        });
                        //调用删除函数然后用load刷新数据源 

                    });
                    $("body").delegate("#l-freshen-department", "click", function () {
                        model.com.refresh();
                        //Refresh("getDepartment");
                    });
                    $("body").delegate("#l-forbidder-department", "click", function () {

                        var SelectData = $com.table.getSelectionData($(".l-containe-canvas-table .l-department-body"), "ID", Department_LIST);
                        if (!SelectData || !SelectData.length) {
                            alert("请先选择一行数据再试！")
                            return;
                        }
                        if (!confirm("已选择" + SelectData.length + "条数据，确定将其禁用？")) {
                            return;
                        }
                        model._data.source_deps = ActiveSourceItem(model._data.source_deps, SelectData, 0);
                        model.com.postDepartment({
                            data: model._data.source_deps
                        }, function (res) {
                            alert("禁用成功！！");
                            model.com.refresh();
                            //Refresh("getDepartment");
                        });
                        //调用删除函数然后用load刷新数据源 

                    });
                    $("body").delegate("#l-active-department", "click", function () {

                        var SelectData = $com.table.getSelectionData($(".l-containe-canvas-table .l-department-body"), "ID", Department_LIST);
                        if (!SelectData || !SelectData.length) {
                            alert("请先选择一行数据再试！")
                            return;
                        }
                        if (!confirm("已选择" + SelectData.length + "条数据，确定将其激活？")) {
                            return;
                        }
                        model._data.source_deps = ActiveSourceItem(model._data.source_deps, SelectData, 1);
                        model.com.postDepartment({
                            data: model._data.source_deps
                        }, function (res) {
                            alert("激活成功！！");
                            //Refresh("getDepartment");
                            model.com.refresh();
                        });
                        //调用删除函数然后用load刷新数据源 

                    });
                })();


            },

            run: function () {

                $(function () {
                    model._data = {};
                    $('.l-containe-canvas-table-position').hide();
                    $('.l-container-canvas').hide();
                    model.com.refresh();
                });


            },

            com: {
                getDepartment: function (data, fn, context) {
                    var d = {
                        $URI: "/Department/AllDepartment",
                        $TYPE: "get"
                    };

                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }

                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                getPosition: function (data, fn, context) {
                    var d = {
                        $URI: "/Department/AllPosition",
                        $TYPE: "get"
                    };

                    function err() {
                        $com.app.tip('获取失败，请检查网络');
                    }

                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                postDepartment: function (data, fn, context) {
                    var d = {
                        $URI: "/Department/UpdateDepartment",
                        $TYPE: "post"
                    };

                    function err() {
                        $com.app.tip('提交失败，请检查网络');
                    }

                    $com.app.ajax($.extend(d, data), fn, err, context);
                },
                postPosition: function (data, fn, context) {
                    var d = {
                        $URI: "/Department/UpdatePosition",
                        $TYPE: "post"
                    };

                    function err() {
                        $com.app.tip('提交失败，请检查网络');
                    }

                    $com.app.ajax($.extend(d, data), fn, err, context);
                },

                refresh: function () {

                    model.com.getDepartment({}, function (res) {
                        if (!res)
                            return;
                        var list = res.list,
                            rst = [];
                        if (list) {
                            rst = model.com.utils.getSon(list);
                        }
                        if (TypeSource_department.ParentID.length > 1)
                            TypeSource_department.ParentID.splice(1, TypeSource_department.ParentID.length - 1);

                        // TypeSource_position.DepartmentID =
                        //     TypeSource_department.ParentID = TypeSource_department.ParentID.concat(model.com.utils.getSource(rst));

                        if (TypeSource_position.DepartmentID.length > 1)
                            TypeSource_position.DepartmentID.splice(1, TypeSource_position.DepartmentID.length - 1);

                        $.each(rst, function (i, item) {
                            TypeSource_department.ParentID.push({
                                value: item.ID,
                                name: item.Name
                            });
                        });

                        $.each(rst, function (i, item) {
                            TypeSource_position.DepartmentID.push({
                                value: item.ID,
                                name: item.Name
                            });
                        });

                        if (res && res.list) {
                            model._data.source_deps = res.list;

                            AllDepartment = model.com.utils.getSon(res.list);

                            Department_LIST = model.com.utils.getSon(res.list);

                            Department_LIST = $com.util.Clone(Department_LIST);

                            $.each(Department_LIST, function (i, item) {
                                for (var p in TypeSource_department) {
                                    if (!Formattrt_department[p])
                                        continue;
                                    item[p] = Formattrt_department[p](item[p]);
                                }
                            });
                            var _dataSource = model.com.utils.getCanvasSource_Item(res.list, true);
                            //需不需要清除
                            $(".l-container-canvas .l-canvas-in").html("");
                            if (_dataSource && _dataSource.length) {
                                $.each(_dataSource, function (m_i, m_item) {
                                    $(".l-container-canvas .l-canvas-in").orgchart({
                                        'data': m_item,
                                        'nodeTitle': 'name',
                                        'depth': 999,
                                        'nodeChildren': 'children'
                                    });
                                });
                            }
                            model.com.getPosition({}, function (res) {

                                if (!res)
                                    return;
                                var list = res.list,
                                    rst = [];
                                if (list) {
                                    rst = model.com.utils.getSon(list);
                                }

                                if (TypeSource_position.ParentID.length > 1)
                                    TypeSource_position.ParentID.splice(1, TypeSource_position.ParentID.length - 1);

                             
                                //TypeSource_position.ParentID = TypeSource_position.ParentID.concat(model.com.utils.getSource(rst));

                                $.each(rst, function (i, item) {
                                    TypeSource_position.ParentID.push({
                                        value: item.ID,
                                        name: item.Name,
                                        far: item.DepartmentID
                                    })
                                });

                                if (res && res.list) {
                                    model._data.source_posn = res.list;

                                    AllPosition = model.com.utils.getSon(res.list);

                                    Position_LIST = model.com.utils.getSon(res.list);

                                    Position_LIST = $com.util.Clone(Position_LIST);
                                    // $('.tb_users').bootstrapTable('load', res.list);
                                    $.each(Position_LIST, function (i, item) {
                                        for (var p in TypeSource_position) {
                                            if (!Formattrt_position[p])
                                                continue;
                                            item[p] = Formattrt_position[p](item[p]);
                                        }
                                    });
                                }
                                $(".l-position-body").html($com.util.template(Position_LIST, HTML.TablePosition));
                            });
                        }
                        $(".l-department-body").html($com.util.template(Department_LIST, HTML.TableDepartment));



                    });


                },

                utils: {
                    getSon: function (list) {
                        var _rst = [];
                        $.each(list, function (i, item) {
                            _rst.push(item);
                            if (item.SonList) {
                                var _arr = model.com.utils.getSon(item.SonList);
                                _rst = _rst.concat(_arr);
                            }

                        });
                        return _rst;
                    },

                    getSource: function (list) {
                        var _rst = [];
                        $.each(list, function (i, item) {
                            if (item.Active)
                                _rst.push({
                                    value: item.ID,
                                    name: item.Name,
                                    far: item.ParentID
                                });
                        });
                        return _rst;
                    },

                    getCanvasSource_Item: function (data, top) {
                        var _rst = [];
                        if (!(data && data.length)) {
                            return _rst;
                        }
                        $.each(data, function (i, item) {
                            var p_item = {
                                'name': item.Name,
                                'relationship': {
                                    'children_num': ((item.SonList && item.SonList) ? item.SonList.length : 0),
                                    'parent_num': top ? 0 : 1,
                                    'sibling_num': data.length - 1,
                                },
                                'children': model.com.utils.getCanvasSource_Item(item.SonList, false)
                            };
                            _rst.push(p_item);
                        });

                        return _rst;
                    }
                },
            }
        });

        model.init();

    });