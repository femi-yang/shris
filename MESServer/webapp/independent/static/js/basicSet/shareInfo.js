require([ '../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base' ],
	function($yang, $com) {

		var KEYWORD,
			Columns,
			KEYWORD_LIST,
			model,
			DEFAULT_VALUE,
			TypeSource;

		KEYWORD_LIST = [
			"name|姓名",
			"loginName|用户名",
			"departmentID|部门|ArrayOne",
			"position|岗位|ArrayOne",
			"manager|职位|ArrayOne",
			//"grad|学历|ArrayOne",
			"createDate|创建时间|DateTime",
			"operator|操作员",
			"phone|电话号码",
			"weiXin|微信",
			"email|邮箱",
			"phoneMAC|MAC地址",
			"active|状态|ArrayOne",
			"departureDate|离职时间|DateTime"
		];

		KEYWORD = {};
		Columns = [];
		DEFAULT_VALUE = {
			name : "姓名",
			departmentID : 0,
			position : 0,
			manager : 0,
			phone : "189xxxxxxxx",
			weiXin : "wechat",
			email : "xxx@xx.com",
			phoneMAC : 0,
			active : "禁用"
		};
		TypeSource = {
			active : [ {
				name : "激活",
				value : 1
			}, {
				name : "禁用",
				value : 0
			} ],
			departmentID : [ {
				name : "无",
				value : 0
			} ],
			position : [ {
				name : "无",
				value : 0
			} ],
			manager : [ {
				name : "职员",
				value : 0
			}, {
				name : "经理",
				value : 1
			}, {
				name : "学徒工",
				value : 2
			} ],
		};
		Columns.push({
			checkbox : true,
			formatter : function(value, row, index) {
				return index + 1;
			}
		});

		$.each(KEYWORD_LIST, function(i, item) {
			var detail = item.split("|");
			KEYWORD[detail[0]] = {
				index : i,
				name : detail[1],
				type : detail.length > 2 ? detail[2] : undefined,
				control : detail.length > 3 ? detail[3] : undefined
			};
			var _column = {
				field : detail[0],
				title : detail[1],
				align : 'center',
				valign : 'middle',
				sortable : true,
			};
			if (detail.length > 2) {
				_column.formatter = $com.modal.formatter[detail[2]];
				if (!_column.formatter) {
					if (TypeSource[detail[0]]) {
						_column.formatter = function(value, row, index) {
							var d_array = [];
							$.each(TypeSource[detail[0]], function(d_i, d_item) {
								if (value instanceof Array) {
									var d_m = value.indexOf(d_item.value);
									if (d_m < 0) {
										return true;
									}
									d_array.push(d_item.name);
								}

								if (value == d_item.value) {
									value = [ value ];
									d_array = [ d_item.name ];
									return false;
								}
							});

							var html = ('<span title="' + (value instanceof Array ? value.join(",") : value) + '">' + d_array.join(",") + '</span>');
							return html;
						}
					}
				}
			}
			Columns.push(_column);
		});
		model = $com.Model.create({
			name : 'iPlant.MES',

			type : $com.Model.MAIN,

			configure : function() {
				this.run();

			},

			events : function() {



				$("body").delegate(".btn_add", "click", function() {

					//将Json数据中的数据值改成对应默认值，然后传入进去
					$("body").append($com.modal.show(DEFAULT_VALUE, KEYWORD, "新增", function(rst) {
						//调用插入函数 

						if (!rst || $.isEmptyObject(rst))
							return;
						var _data = {
							name : rst.name,
							departmentID : Number(rst.departmentID),
							position : Number(rst.position),
							manager : Number(rst.manager),
							phone : rst.phone,
							weiXin : rst.weiXin,
							email : rst.email,
							phoneMAC : Number(rst.phoneMAC),
							active : Number(rst.active),
						};
						model.com.add({
							data : _data
						}, function(res) {
							alert("新增成功");
							model.com.refresh();
						})

					}, TypeSource));

				});
				$("body").delegate(".btn_edit", "click", function() {

					var SelectData = $('.tb_users').bootstrapTable('getSelections');
					if (!SelectData || !SelectData.length) {
						alert("请先选择一行数据再试！")
						return;
					}
					if (SelectData.length != 1) {
						alert("只能同时对一行数据修改！")
						return;
					}

					var default_value = {
						name : SelectData[0].name,
						departmentID : SelectData[0].departmentID,
						position : SelectData[0].position,
						manager : SelectData[0].manager,
						phone : SelectData[0].phone,
						weiXin : SelectData[0].weiXin,
						email : SelectData[0].email,
						phoneMAC : SelectData[0].phoneMAC,
						active : SelectData[0].active
					};

					$("body").append($com.modal.show(default_value, KEYWORD, "修改", function(rst) {
						//调用修改函数
						if (!rst || $.isEmptyObject(rst))
							return;

						SelectData[0].name = rst.name;
						SelectData[0].departmentID = Number(rst.departmentID);
						SelectData[0].position = Number(rst.position);
						SelectData[0].manager = Number(rst.manager);
						SelectData[0].phone = rst.phone;
						SelectData[0].weiXin = rst.weiXin;
						SelectData[0].email = rst.email;
						SelectData[0].phoneMAC = Number(rst.phoneMAC);
						SelectData[0].active = Number(rst.active);


						model.com.add({
							data : SelectData[0]
						}, function(res) {
							alert("修改成功");
							model.com.refresh();
						})

					}, TypeSource));
				});

				$("body").delegate(".btn_refresh", "click", function() {

					model.com.refresh();
				});
				$("body").delegate(".btn_disable", "click", function() {

					var SelectData = $('.tb_users').bootstrapTable('getSelections');
					if (!SelectData || !SelectData.length) {
						alert("至少选择一行数据！")
						return;
					}
					if (!confirm("已选择" + SelectData.length + "条数据，确定将其禁用？")) {
						return;
					}

					model.com.active({
						data : SelectData,
						active : 0
					}, function(res) {
						alert("禁用成功");
						model.com.refresh();
					})


				});
				$("body").delegate(".btn_active", "click", function() {

					var SelectData = $('.tb_users').bootstrapTable('getSelections');
					if (!SelectData || !SelectData.length) {
						alert("至少选择一行数据！")
						return;
					}
					if (!confirm("已选择" + SelectData.length + "条数据，确定将其激活？")) {
						return;
					}
					model.com.active({
						data : SelectData,
						active : 0
					}, function(res) {
						alert("激活成功");
						model.com.refresh();
					})
				});


			},

			run : function() {


				//调用部门岗位所有信息
				model.com.getDepartment({}, function(res) {
					if (!res)
						return;
					var list = res.list,
						rst = [];
					if (list) {
						rst = model.com.utils.getSon(list);
					}

					if (TypeSource.departmentID.length > 1)
						TypeSource.departmentID.splice(1, TypeSource.departmentID.length - 1);
					TypeSource.departmentID = TypeSource.departmentID.concat(model.com.utils.getSource(rst));


				});
				model.com.getPosition({}, function(res) {
					if (!res)
						return;
					var list = res.list,
						rst = [];
					if (list) {
						rst = model.com.utils.getSon(list);
					}

					if (TypeSource.position.length > 1)
						TypeSource.position.splice(1, TypeSource.position.length - 1);
					TypeSource.position = TypeSource.position.concat(model.com.utils.getSource(rst));

				});


				$(function() {

					$(".femi-table-toolbar").find(".btn_delete").remove();
					$(".femi-table-toolbar").find(".femi-excel-dropdown").remove();
					var TableInit = function() {
						var oTableInit = new Object();
						//初始化Table
						oTableInit.Init = function() {
							$('.tb_users').bootstrapTable({
								toolbar : '.femi-table-toolbar', //工具按钮用哪个容器
								striped : true, //是否显示行间隔色
								cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
								pagination : true, //是否显示分页（*）
								sortable : false, //是否启用排序
								sortOrder : "asc", //排序方式
								queryParams : oTableInit.queryParams, //传递参数（*）
								sidePagination : "client", //分页方式：client客户端分页，server服务端分页（*） 
								search : true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
								strictSearch : false,
								searchTimeOut : 5000,
								pageSize : 50,
								pageList : [ 50, 100, "All" ],
								undefinedText : "",
								showColumns : true, //是否显示所有的列
								showRefresh : false, //是否显示刷新按钮
								minimumCountColumns : 2, //最少允许的列数
								clickToSelect : true, //是否启用点击选中行
								height : "auto", //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度 
								showToggle : false, //是否显示详细视图和列表视图的切换按钮 
								detailView : true, //是否显示父子表
								maintainSelected : true,
								silentSort : false,
								columns : Columns,
							});
						};

						//得到查询的参数
						oTableInit.queryParams = function(params) {
							var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
								limit : params.limit, //页面大小
								offset : params.offset, //页码

							};
							return temp;
						};
						return oTableInit;
					};

					var ButtonInit = function() {
						var oInit = new Object();
						var postdata = {};

						oInit.Init = function() {
							//初始化页面上面的按钮事件
						};

						return oInit;
					};

					//1.初始化Table
					var oTable = new TableInit();
					oTable.Init();

					//2.初始化Button的点击事件
					var oButtonInit = new ButtonInit();
					oButtonInit.Init();


					model.com.refresh();

				});


			},

			com : {
				get : function(data, fn, context) {
					var d = {
						$URI : "/user/all",
						$TYPE : "get"
					};

					function err() {
						$com.app.tip('获取失败，请检查网络');
					}

					$com.app.ajax($.extend(d, data), fn, err, context);
				},
				getDepartment : function(data, fn, context) {
					var d = {
						$URI : "/department/all_dep",
						$TYPE : "get"
					};

					function err() {
						$com.app.tip('获取失败，请检查网络');
					}

					$com.app.ajax($.extend(d, data), fn, err, context);
				},

				getPosition : function(data, fn, context) {
					var d = {
						$URI : "/department/all_pos",
						$TYPE : "get"
					};

					function err() {
						$com.app.tip('获取失败，请检查网络');
					}

					$com.app.ajax($.extend(d, data), fn, err, context);
				},
				refresh : function() {
					model.com.get({}, function(res) {
						if (res && res.list)
							$('.tb_users').bootstrapTable('load', res.list);
					});
				},
				add : function(data, fn, context) {
					var d = {
						$URI : "/user/update",
						$TYPE : "post"
					};

					function err() {
						$com.app.tip('提交失败，请检查网络');
					}

					$com.app.ajax($.extend(d, data), fn, err, context);
				},
				active : function(data, fn, context) {
					var d = {
						$URI : "/user/active",
						$TYPE : "post"
					};

					function err() {
						$com.app.tip('提交失败，请检查网络');
					}

					$com.app.ajax($.extend(d, data), fn, err, context);
				},
				utils : {
					getSon : function(list) {
						var _rst = [];
						$.each(list, function(i, item) {
							_rst.push({
								iD : item.iD,
								name : item.name,
								active : item.active,
								parentID : item.parentID
							});
							if (item.sonList && item.sonList.bMSDepartment) {
								var _arr = model.com.utils.getSon(item.sonList.bMSDepartment);
								_rst = _rst.concat(_arr);
							}

						});
						return _rst;
					},
					getSource : function(list) {
						var _rst = [];
						$.each(list, function(i, item) {
							if (item.active)
								_rst.push({
									value : item.iD,
									name : item.name,
								});
						});
						return _rst;
					}
				}
			}
		});

		model.init();


	});