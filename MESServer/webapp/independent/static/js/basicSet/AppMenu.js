require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base', '../static/utils/js/base/jquery.treeview'],
	function ($JQ, $com, Tree) {

	    var model, HTML;

	    var Group = [{ ID: 1, Name: "生产", Url: "./static/images/Admin.png", Active: 1 }, { ID: 2, Name: "计划", Url: "./static/images/Admin.png", Active: 1 }];
	    var Module = [{ ID: 1, GroupID: 1, Url: "./static/images/Admin.png", Name: "生产子一号", Active: 1 }, { ID: 2, GroupID: 1, Url: "./static/images/Admin.png", Name: "生产子二号", Active: 2 }, { ID: 3, GroupID: 2, Url: "./static/images/Admin.png", Name: "计划子一号", Active: 2 }, { ID: 4, GroupID: 2, Url: "./static/images/Admin.png", Name: "计划子二号", Active: 2 }];

	    HTML = {
	        TreeItemNode: ['<li style="font-size:15px" class="range-role-li" data-value = "{{Active}}" data-type = 1 data-key = "{{ID}}">',
                            '<span style="vertical-align:top;"><input type="checkbox" class="femi-tree-checkbox" style="margin: 1px 0px 1px"  value="{{FunctionID}}"  />{{Icon}}{{Name}}</span> ',
                            '<ul>{{Items}}</ul>',
                            '</li> ', ].join(""),
	        TreeItemSonNode: ['<li style="font-size:12px" class="range-role-li" data-value = "{{Active}}" data-type = 2 data-key = "{{ID}}">',
                            '<span style="vertical-align:top;"><input type="checkbox" class="femi-tree-checkbox" style="margin: 1px 0px 1px"  value="{{FunctionID}}"  />{{Icon}}{{Name}}</span> ',
                            '</li> ', ].join(""),
	        WebMenu: [
                '<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
				'<td data-title="ID" data-value="{{ID}}" >{{ID}}</td>',
                '<td data-title="Name" data-value="{{Name}}" >{{Name}}</td>',
				'<td data-title="Icon" >{{Icon}}</td>',
				'<td data-title="Url" data-value="{{Url}}" >{{Url}}</td>',
                '<td data-title="Active" data-value="{{Active}}" >{{Active}}</td>',
				'</tr>',
	        ].join(""),
	        PhotoMenu: [
                '<tr>',
				'<td><input type="checkbox" class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
				'<td data-title="PhotoName" data-value="{{PhotoName}}" >{{PhotoName}}</td>',
                '<td data-title="PhotoUrl" >{{PhotoUrl}}</td>',
				'</tr>',
	        ].join(""),
	    };

	    model = $com.Model.create({
	        name: 'iPlant.MES',

	        type: $com.Model.MAIN,

	        configure: function () {
	            this.run();

	        },

	        events: function () {

	            //树更新
	            $("body").delegate("#lmvt-tree-update", "click", function () {
	                $("#roleTree input[type=checkbox].femi-tree-checkbox").each(function (i, item) {

	                    if (!$(item).prop("checked")) {

	                        if (Number($(item).closest("li").attr("data-type")) == 1) {

	                            $.each(Group, function (i, item_g) {
	                                if (Number($(item).closest("li").attr("data-key")) == item_g.ID) {
	                                    item_g.Active = 2;
	                                }
	                            });

	                        }
	                        else
	                            $.each(Module, function (i, item_m) {
	                                if (Number($(item).closest("li").attr("data-key")) == item_m.ID) {
	                                    item_m.Active = 2;
	                                }
	                            });

	                    }
	                    else {
	                        if (Number($(item).closest("li").attr("data-type")) == 1) {

	                            $.each(Group, function (i, item_g) {
	                                if (Number($(item).closest("li").attr("data-key")) == item_g.ID) {
	                                    item_g.Active = 1;
	                                }
	                            });

	                        }
	                        else
	                            $.each(Module, function (i, item_m) {
	                                if (Number($(item).closest("li").attr("data-key")) == item_m.ID) {
	                                    item_m.Active = 1;
	                                }
	                            });
	                    }

	                });
	                model.com.renderTree(Group, Module);
	            });
	            //树的点击事件
	            $("body").delegate("#roleTree input[type=checkbox].femi-tree-checkbox", "click", function () {
	                var $this = $(this);
	                if (Number($this.closest("li").attr("data-type")) == 1) {
	                    if ($this.prop("checked")) {
	                        $this.parent().next().each(function (i, item) {
	                            $(item).find("input").prop("checked", true);
	                        });
	                    }
	                    else {
	                        $this.parent().next().each(function (i, item) {
	                            $(item).find("input").prop("checked", false);
	                        });
	                    }
	                }
	                else {
	                    if ($this.prop("checked")) {
	                        var count = 0;
	                        $this.closest('ul').find('li').each(function (i, item) {
	                            if ($(item).find('input').prop("checked")) {
	                                count++;
	                            }
	                        });
	                        if (count == 1)
	                            $this.closest('ul').prev().find('input').prop("checked", true);
	                    }

	                    else {
	                        var count = 0;
	                        $this.closest('ul').find('li').each(function (i, item) {
	                            if ($(item).find('input').prop("checked")) {
	                                count++;
	                            }
	                        });
	                        if (count == 0)
	                            $this.closest('ul').prev().find('input').prop("checked", false);
	                    }

	                }
	            });
	            //新增组
	            $("body").delegate("#lmvt-add-group", "click", function () {
	                var DEFAULT_VALUE = {
	                    GroupName: "",
	                    Url: ""
	                },
	                    KEYWORD_LIST = [
                            "GroupName|组名称",
                            "Url|组路径",
	                    ],
                        KEYWORD_LISTItem = {},
	                    FORMATTRT_LevelItem = {},
                        TypeSource = {

                        };
	                $.each(KEYWORD_LIST, function (i, item) {
	                    var detail = item.split("|");
	                    KEYWORD_LISTItem[detail[0]] = {
	                        index: i,
	                        name: detail[1],
	                        type: detail.length > 2 ? detail[2] : undefined,
	                        control: detail.length > 3 ? detail[3] : undefined
	                    };
	                    if (detail.length > 2) {
	                        FORMATTRT_LevelItem[detail[0]] = $com.util.getFormatter(TypeSource, detail[0], detail[2]);
	                    }
	                });
	                $("body").append($com.modal.show(DEFAULT_VALUE, KEYWORD_LISTItem, "菜单设置", function (rst) {
	                    //调用插入函数 
	                    if (!rst || $.isEmptyObject(rst))
	                        return;



	                }, TypeSource));
	                model.com.renderTree(Group, Module);
	            });
	            //新增子
	            $("body").delegate("#lmvt-add-module", "click", function () {
	                var DEFAULT_VALUE = {
	                    ModuleName: "",
	                    Url: "",
	                    GroupName: 0,
	                },
	                    KEYWORD_LIST = [
                            "ModuleName|菜单名称",
                            "Url|菜单路径",
                            "GroupName|所属组|ArrayOne"
	                    ],
                        KEYWORD_LISTItem = {},
	                    FORMATTRT_LevelItem = {},
                        TypeSource = {
                            GroupName: [],
                        };
	                $.each(KEYWORD_LIST, function (i, item) {
	                    var detail = item.split("|");
	                    KEYWORD_LISTItem[detail[0]] = {
	                        index: i,
	                        name: detail[1],
	                        type: detail.length > 2 ? detail[2] : undefined,
	                        control: detail.length > 3 ? detail[3] : undefined
	                    };
	                    if (detail.length > 2) {
	                        FORMATTRT_LevelItem[detail[0]] = $com.util.getFormatter(TypeSource, detail[0], detail[2]);
	                    }
	                });
	                $("body").append($com.modal.show(DEFAULT_VALUE, KEYWORD_LISTItem, "菜单设置", function (rst) {
	                    //调用插入函数 
	                    if (!rst || $.isEmptyObject(rst))
	                        return;



	                }, TypeSource));
	                model.com.renderTree(Group, Module);
	            });
	            //查看子菜单
	            $("body").delegate("#lmvt-see-module", "click", function () {
	                $(".lmvt-contain-right-table-module").show();
	                $(".lmvt-contain-right-table").hide();
	            });
	            //查看组菜单
	            $("body").delegate("#lmvt-see-group", "click", function () {
	                $(".lmvt-contain-right-table-module").hide();
	                $(".lmvt-contain-right-table").show();
	            });
	            //修改组
	            $("body").delegate("#lmvt-change-group", "click", function () {

	                var SelectData = $com.table.getSelectionData($(".lmvt-module-tbody"), "ID", DataAll);

	                if (!SelectData || !SelectData.length) {
	                    alert("请先选择一行数据再试！")
	                    return;
	                }
	                if (SelectData.length != 1) {
	                    alert("只能同时对一行数据操作！")
	                    return;
	                }

	                var DEFAULT_VALUE = {
	                    GroupName: "",
	                    Url: ""
	                },
	                    KEYWORD_LIST = [
                            "GroupName|组名称",
                            "Url|组路径",
	                    ],
                        KEYWORD_LISTItem = {},
	                    FORMATTRT_LevelItem = {},
                        TypeSource = {

                        };
	                $.each(KEYWORD_LIST, function (i, item) {
	                    var detail = item.split("|");
	                    KEYWORD_LISTItem[detail[0]] = {
	                        index: i,
	                        name: detail[1],
	                        type: detail.length > 2 ? detail[2] : undefined,
	                        control: detail.length > 3 ? detail[3] : undefined
	                    };
	                    if (detail.length > 2) {
	                        FORMATTRT_LevelItem[detail[0]] = $com.util.getFormatter(TypeSource, detail[0], detail[2]);
	                    }
	                });
	                $("body").append($com.modal.show(DEFAULT_VALUE, KEYWORD_LISTItem, "修改", function (rst) {
	                    //调用插入函数 
	                    if (!rst || $.isEmptyObject(rst))
	                        return;



	                }, TypeSource));
	                model.com.renderTree(Group, Module);
	            });
	            //修改子
	            $("body").delegate("#lmvt-change-module", "click", function () {

	                var SelectData = $com.table.getSelectionData($(".lmvt-module-tbody"), "ID", DataAll);

	                if (!SelectData || !SelectData.length) {
	                    alert("请先选择一行数据再试！")
	                    return;
	                }
	                if (SelectData.length != 1) {
	                    alert("只能同时对一行数据操作！")
	                    return;
	                }

	                var DEFAULT_VALUE = {
	                    GroupName: "",
	                    Url: ""
	                },
	                    KEYWORD_LIST = [
                            "GroupName|组名称",
                            "Url|组路径",
	                    ],
                        KEYWORD_LISTItem = {},
	                    FORMATTRT_LevelItem = {},
                        TypeSource = {

                        };
	                $.each(KEYWORD_LIST, function (i, item) {
	                    var detail = item.split("|");
	                    KEYWORD_LISTItem[detail[0]] = {
	                        index: i,
	                        name: detail[1],
	                        type: detail.length > 2 ? detail[2] : undefined,
	                        control: detail.length > 3 ? detail[3] : undefined
	                    };
	                    if (detail.length > 2) {
	                        FORMATTRT_LevelItem[detail[0]] = $com.util.getFormatter(TypeSource, detail[0], detail[2]);
	                    }
	                });
	                $("body").append($com.modal.show(DEFAULT_VALUE, KEYWORD_LISTItem, "修改", function (rst) {
	                    //调用插入函数 
	                    if (!rst || $.isEmptyObject(rst))
	                        return;



	                }, TypeSource));
	                model.com.renderTree(Group, Module);
	            });
	            //模糊组查询
	            $("body").delegate("#lmvt-search-group", "change", function () {

	                var $this = $(this),
                       value = $(this).val();
	                if (value == undefined || value == "" || value.trim().length < 1)
	                    $(".lmvt-group-tbody").children("tr").show();
	                else
	                    $com.table.filterByLikeString($(".lmvt-group-tbody"), DataAllFactorySearch, value, "ID");
	            });
	            //模糊子查询
	            $("body").delegate("#lmvt-search-module", "change", function () {

	                var $this = $(this),
                       value = $(this).val();
	                if (value == undefined || value == "" || value.trim().length < 1)
	                    $(".lmvt-menuModule-tbody").children("tr").show();
	                else
	                    $com.table.filterByLikeString($(".lmvt-menuModule-tbody"), DataAllFactorySearch, value, "ID");
	            });
	        },

	        run: function () {

	            //model.com.renderTree(Group, Module);

	            $.each(Group, function (i, item) {
	                item.Icon = ["<img src= \"", item.Url, "\" />"].join("");
	            });

	            $(".lmvt-group-tbody").html($com.util.template(Group, HTML.WebMenu));

	            //组菜单
	            model.com.getHomepageGroup_all({ type: 1 }, function (res) {
	                //项菜单
	                model.com.getHomepageModule_all({ type: 1 }, function (res) {



	                });

	            });
	        },

	        com: {
	            renderTree: function (GroupList, ModuleList) {

	                $.each(GroupList, function (i, item) {
	                    item.Items = '';
	                    $.each(ModuleList, function (j, item_j) {
	                        if (item_j.GroupID == item.ID) {

	                            item_j.Icon = ["<img src= \"", item_j.Url, "\" />"].join("");

	                            item.Items = item.Items + $com.util.template(item_j, HTML.TreeItemSonNode);
	                        }
	                    });
	                    item.Icon = ["<img src= \"", item.Url, "\" />"].join("");
	                });

	                $("#roleTree").html($com.util.template(GroupList, HTML.TreeItemNode));

	                $("#roleTree").treeview();

	                $("#roleTree input[type=checkbox].femi-tree-checkbox").each(function (i, item) {

	                    if ($(item).closest("li").attr("data-value") == 1)
	                        $(item).prop("checked", true);

	                });


	            },

	            //根据类型获取菜单组
	            getHomepageGroup_all: function (data, fn, context) {
	                var d = {
	                    $URI: "/homepage/group_all",
	                    $TYPE: "get"
	                };

	                function err() {
	                    $com.app.tip('获取失败，请检查网络');
	                }

	                $com.app.ajax($.extend(d, data), fn, err, context);
	            },
	            //根据类型获取菜单项
	            getHomepageModule_all: function (data, fn, context) {
	                var d = {
	                    $URI: "/homepage/module_all",
	                    $TYPE: "get"
	                };

	                function err() {
	                    $com.app.tip('获取失败，请检查网络');
	                }

	                $com.app.ajax($.extend(d, data), fn, err, context);
	            },
	        },

	    });

	    model.init();
	});