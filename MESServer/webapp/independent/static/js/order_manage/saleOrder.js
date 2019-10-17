require(['../static/utils/js/jquery-3.1.1', '../static/utils/js/base/base'], function ($zace, $com) {

    var HTML,
        model,
        mOrderId,
        mWID,//订单序号
        RoleUserList,
        OrderItemSourceBasic,
        OrderItemSourceChange,
        OrderItemSourceChangeS,
        OrderSourceBasic,
        OrderSourceChange,
        OrderSourceChangeS,

        KEYWORD_LIST_Order,
        KEYWORD_Order,
        FORMATTRT_Order,
        DEFAULT_VALUE_Order,
        TypeSource_Order,
        CustomerList,
        BOMlistAll,
        MaterialList,

        KEYWORD_LIST_OrderItem,
        KEYWORD_OrderItem,
        FORMATTRT_OrderItem,
        DEFAULT_VALUE_OrderItem,
        TypeSource_OrderItem;

       mOrderId = mWID = 1;
       BOMlistAll=RoleUserList = [];
       MaterialList=OrderItemSourceBasic = [];
       OrderItemSourceChange=[];
       OrderSourceBasic = [];
       OrderSourceChange = [];
    //模糊查询data
        OrderItemSourceChangeS = [];
        OrderSourceChangeS = [];
  
        OrderListTemp = {
            ID: 0,
            OrderNo: "",
            CustomerID: 0, //window.parent.User_Info.Name, $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
            CustomerCode: "",
            TaxCode: "",
            CustomerName: "",
            CustomerMan: "",
            LinkPhone: "",
            SaleOrderItemList: [],
            Status: 3,        
            Description: "",
            Priority: 0,
            UnitID: 0,
            ContractAmount: 0.0,
            AmountReceived: 0.0,
            ContractFile: "",
            Active: 1,
            ImportTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
            Editor: window.parent.User_Info.Name,
            EditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
            //AuditorID:1
        }
    OrderItemListTemp = {
        ID: 0,
        OrderID: 0,
        BOMID:0,
        ItemID: 0, //window.parent.User_Info.Name, $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
        ItemName: "",
        ItemCode: "",
        FQTY: 0.0,
        Price: 0.0,
        UnitID:0,
        Address: "",
        LinkMan: "",
        Phone: "",
        Status: 3,
        Description: "",
        Active: 1,
        FQTYDelivery: 0,
        AuditTime: $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
    }

    HTML = {
        OrderList: [
           '<tr>',
           '<td style="width: 3px"><input type="checkbox"',
           'class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
           '<td style="min-width: 50px" data-title="WID" data-value="{{WID}}">{{WID}}</td>',
           '<td style="min-width: 50px" data-title="OrderNo" data-value="{{OrderNo}}">{{OrderNo}}</td>',
           '<td style="min-width: 50px" data-title="CustomerID" data-value="{{CustomerID}}">{{CustomerID}}</td>',   
           '<td style="min-width: 50px" data-title="Description" data-value="{{Description}}">{{Description}}</td> ',
           //'<td style="min-width: 50px" data-title="Priority" data-value="{{Priority}}">{{Priority}}</td>',
           //'<td style="min-width: 50px" data-title="UnitID" data-value="{{UnitID}}">{{UnitID}}</td>',
           '<td style="min-width: 50px" data-title="ContractAmount" data-value="{ContractAmount}}">{{ContractAmount}}</td>',
           '<td style="min-width: 50px" data-title="AmountReceived" data-value="{AmountReceived}}">{{AmountReceived}}</td>',          
           '<td style="min-width: 50px" data-title="CustomerMan" data-value="{CustomerMan}}">{{CustomerMan}}</td>',
           '<td style="min-width: 50px" data-title="LinkPhone" data-value="{LinkPhone}}">{{LinkPhone}}</td>',
           //'<td style="min-width: 50px" data-title="Status" data-value="{{Status}}">{{Status}}</td>',
           '<td style="min-width: 50px" data-title="Active" data-value="{Active}}">{{Active}}</td>',
           '<td style="min-width: 50px" data-title="Editor" data-value="{Editor}}">{{Editor}}</td>',
            '<td style="min-width: 50px" data-title="EditTime" data-value="{EditTime}}">{{EditTime}}</td>',
           '</tr>',
        ].join(""),

        OrderItemList: [
            '<tr>',
            '<td style="width: 3px"><input type="checkbox"',
            'class="femi-tb-checkbox" style="margin: 1px 0px 1px" /></td>',
            '<td  data-title="WID" data-value="{{WID}}">{{WID}}</td>',
            '<td  data-title="OrderID" data-value="{{OrderID}}">{{OrderID}}</td>',
             '<td data-title="BOMID" data-value="{{BOMID}}">{{BOMID}}</td>',
            '<td style="min-width: 50px" data-title="ItemID" data-value="{{ItemID}}">{{ItemID}}</td>',
            //'<td style="min-width: 50px" data-title="ItemName" data-value="{{ItemName}}">{{ItemName}}</td>',
            '<td  data-title="ItemCode" data-value="{{ItemCode}}">{{ItemCode}}</td> ',
            '<td  data-title="FQTY" data-value="{{FQTY}}">{{FQTY}}</td>',
            '<td  data-title="Price" data-value="{{Price}}">{{Price}}</td>',
            '<td  data-title="UnitID" data-value="{UnitID}}">{{UnitID}}</td>',
            '<td  data-title="Address" data-value="{Address}}">{{Address}}</td>',
            '<td  data-title="LinkMan" data-value="{LinkMan}}">{{LinkMan}}</td>',
            '<td  data-title="Phone" data-value="{Phone}}">{{Phone}}</td>',
            //'<td  data-title="Status" data-value="{Status}}">{{Status}}</td>',
            '<td  data-title="Description" data-value="{Description}}">{{Description}}</td>',
            '<td data-title="Active" data-value="{Active}}">{{Active}}</td>',
             //'<td  data-title="FQTYDelivery" data-value="{FQTYDelivery}}">{{FQTYDelivery}}</td>',
            '</tr>',
        ].join(""),
    } 
   
    //销售订单
    $(function () {
        KEYWORD_LIST_Order = [ 
            "OrderNo|订单号",
            "Description|描述",
            "CustomerID|顾客|ArrayOneControl",
            "CustomerMan|联系人|ArrayOneControl|CustomerID",
            "Priority|数量",
            "UnitID|单位",
            "ContractAmount|合同总额",
            "AmountReceived|已支付总额",          
            //"CustomerMan|顾客",
            "LinkPhone|电话",
            "Status|状态",         
            "Active|激活|ArrayOne",
            

        ];
        FORMATTRT_Order = {};
        KEYWORD_Order = {};
        DEFAULT_VALUE_Order = {          
            OrderNo: "",
            CustomerID: 0, //window.parent.User_Info.Name, $com.util.format('yyyy-MM-dd hh:mm:ss', new Date()),
            //Status: 0,
            Description: "",             
            CustomerMan: "",
            //LinkPhone: "",
            //Active: 1,
          
        };

        TypeSource_Order = {
            Active: [{
                name: "禁用",
                value: 0
            }, {
                name: "激活",
                value: 1
            }],
            CustomerID: [],
            CustomerMan: [],
        };
        $.each(KEYWORD_LIST_Order, function (i, item) {
            var detail = item.split("|");
            KEYWORD_Order[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_Order[detail[0]] = $com.util.getFormatter(TypeSource_Order, detail[0], detail[2]);
            }

        });

    });
    //订单详细
    $(function () {
        KEYWORD_LIST_OrderItem = [         
            "OrderID|订单号",
            "BOMID|Bom名称|ArrayOne",
            "ItemID|物料名称|ArrayOne",
            //"ItemName|物料名称",
            //"ItemName|zzz",
            "ItemCode|物料编码",
            "FQTY|数量",
            "Price|价格",
            "UnitID|单位|ArrayOne",
            "Address|地址",
            "LinkMan|联系人",
            "Phone|电话",
            "Status|状态",
            "Description|描述",
            "Active|激活|ArrayOne",
            "FQTYDelivery|交付数量",
          
        ];
        FORMATTRT_OrderItem = {};
        KEYWORD_OrderItem = {};
        DEFAULT_VALUE_OrderItem = {
            BOMID:0,
            FQTY: 0.0,
            Price: 0.0,           
            Address: "",        
            Description: "",
           // Active: 1,

        };

        TypeSource_OrderItem = {
            Active: [{
                name: "禁用",
                value: 0
            }, {
                name: "激活",
                value: 1
            }],
            BOMID: [{
                name: "无",
                value: 0
            }],
            ItemID: [{
                name: "无",
                value: 0
            }],
            UnitID: [{
                name: "无",
                value: 0
            }],

        };
        $.each(KEYWORD_LIST_OrderItem, function (i, item) {
            var detail = item.split("|");
            KEYWORD_OrderItem[detail[0]] = {
                index: i,
                name: detail[1],
                type: detail.length > 2 ? detail[2] : undefined,
                control: detail.length > 3 ? detail[3] : undefined
            };
            if (detail.length > 2) {
                FORMATTRT_OrderItem[detail[0]] = $com.util.getFormatter(TypeSource_OrderItem, detail[0], detail[2]);
            }

        });

    });

   

    model = $com.Model.create({
        name: '设备信息',

        type: $com.Model.MAIN,

        configure: function () {
            this.run();

        },

        events: function () {

            //双击
            $("body").delegate("#zace-Saleorder-body tr", "dblclick", function () {
                $(".zace-orderOne").hide();
                $(".zace-orderItem").show();
                var $this = $(this);
                mWID = Number($this.find('td[data-title=WID]').attr('data-value'));
                mOrderId = OrderSourceBasic[mWID - 1].ID;

                model.com.refresh();
            
            });
            //激活 order
            $("body").delegate("#zace-active-Saleorder", "click", function () {
                var SelectData = $com.table.getSelectionData($("#zace-Saleorder-body"), "WID", OrderSourceChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                var list = [];
                for (var i = 0; i < SelectData.length; i++) {
                    var Wid = SelectData[i].WID;

                    list.push(OrderSourceBasic[Wid - 1]);
                }

                model.com.activeOrder({
                    data: list,
                    active: 1
                }, function (res1) {
                    alert("激活成功");
                    model.com.refresh();
                })
            });
            //禁用 order
            $("body").delegate("#zace-disable-Saleorder", "click", function () {
                var SelectData = $com.table.getSelectionData($("#zace-Saleorder-body"), "WID", OrderSourceChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                //if (SelectData.length != 1) {
                //    alert("只能同时对一行数据操作！")
                //    return;
                //}
                var list = [];
                for (var i = 0; i < SelectData.length; i++) {
                    var Wid = SelectData[i].WID;

                    list.push(OrderSourceBasic[Wid - 1]);
                }
                model.com.activeOrder({
                    data: list,
                    active: 0
                }, function (res1) {
                    alert("禁用成功");
                    model.com.refresh();
                })
            });
            //新增 订单
            $("body").delegate("#zace-order-add", "click", function () {
            
                $("body").append($com.modal.show(DEFAULT_VALUE_Order, KEYWORD_Order, "新增", function (rst) {
                    if (!rst || $.isEmptyObject(rst))
                        return;

                    var temp = $com.util.Clone(OrderListTemp);
                    temp.OrderNo = rst.OrderNo;
                    temp.CustomerMan = rst.CustomerMan;
                    //temp.Status = Number(rst.Status);
                    temp.Description = rst.Description;                  
                    temp.CustomerID = Number(rst.CustomerID);
                   

                    for (var i = 0; i < CustomerList.length; i++) {
                        if (temp.CustomerID == CustomerList[i].ID) {
                            temp.CustomerCode = CustomerList[i].CustomerCode;
                            temp.TaxCode = CustomerList[i].TaxCode;
                            temp.CustomerName = CustomerList[i].CustomerName;
                        }
                    }
                    for (var j = 0; j < LinkManCustomerList.length; j++) {
                        if (temp.CustomerID == LinkManCustomerList[j].CustomerID && temp.CustomerMan == LinkManCustomerList[j].Name) {
                            temp.LinkPhone = LinkManCustomerList[j].MobilePhone;
                        }
                    }
                    model.com.postOrder({
                        data: temp
                    }, function (res) {
                        alert("新增成功");
                        model.com.refresh();
                    });

                }, TypeSource_Order));
            });
            //修改 订单
            $("body").delegate("#zace-order-update", "click", function () {
                var SelectData = $com.table.getSelectionData($("#zace-Saleorder-body"), "WID", OrderSourceChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                var default_value = {
                    CustomerID: SelectData[0].CustomerID,
                    CustomerMan: SelectData[0].CustomerMan,
                    AmountReceived: SelectData[0].AmountReceived,
                    Description: SelectData[0].Description,
                    //Status: SelectData[0].Status,
                };
                var Wid = SelectData[0].WID;
                $("body").append($com.modal.show(default_value, KEYWORD_Order, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;
                    if (Number(rst.AmountReceived) > SelectData[0].ContractAmount) {
                        alert("数据输入有误!")
                        return;
                    }
                      
                    OrderSourceBasic[Wid - 1].CustomerID = Number(rst.CustomerID);
                    OrderSourceBasic[Wid - 1].CustomerMan = rst.CustomerMan;
                    OrderSourceBasic[Wid - 1].Description = rst.Description;
                    //OrderSourceBasic[Wid - 1].Status = Number(rst.Status);
                    OrderSourceBasic[Wid - 1].AmountReceived = Number(rst.AmountReceived);
                    for (var i = 0; i < CustomerList.length; i++) {
                        if (OrderSourceBasic[Wid - 1].CustomerID == CustomerList[i].ID) {
                            OrderSourceBasic[Wid - 1].CustomerCode = CustomerList[i].CustomerCode;
                            OrderSourceBasic[Wid - 1].TaxCode = CustomerList[i].TaxCode;
                            OrderSourceBasic[Wid - 1].CustomerName = CustomerList[i].CustomerName;
                        }
                    }
                    for (var j = 0; j < LinkManCustomerList.length; j++) {
                        if (OrderSourceBasic[Wid - 1].CustomerID == LinkManCustomerList[j].CustomerID && OrderSourceBasic[Wid - 1].CustomerMan == LinkManCustomerList[j].Name) {
                            OrderSourceBasic[Wid - 1].LinkPhone = LinkManCustomerList[j].MobilePhone;
                        }
                    }
                    model.com.postOrder({
                        data: OrderSourceBasic[Wid - 1]
                    }, function (res) {
                        alert("修改成功");
                        model.com.refresh();
                    })

                }, TypeSource_Order));
            });
            //返回
            $("body").delegate("#zace-return-orderOne", "click", function () {

                $(".zace-orderOne").show();
                $(".zace-orderItem").hide();

            });
            //订单模糊查询
            $("body").delegate("#femi-search-text-order", "change", function () {
                var $this = $(this),
					value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#zace-Saleorder-body").children("tr").show();
                else
                    $com.table.filterByLikeString($("#zace-Saleorder-body"), OrderSourceChangeS, value, "WID");
            });

            //订单详细模糊查询
            $("body").delegate("#femi-search-text-orderItem", "change", function () {
                var $this = $(this),
					value = $(this).val();
                if (value == undefined || value == "" || value.trim().length < 1)
                    $("#zace-SaleorderItem-body").children("tr").show();
                else
                    $com.table.filterByLikeString($("#zace-SaleorderItem-body"), OrderItemSourceChangeS, value, "WID");
            });
            //新增 订单详细
            $("body").delegate("#zace-orderItem-add", "click", function () {

                $("body").append($com.modal.show(DEFAULT_VALUE_OrderItem, KEYWORD_OrderItem, "新增", function (rst) {
                    if (!rst || $.isEmptyObject(rst))
                        return;                                     
                    var temp = $com.util.Clone(OrderItemListTemp);
                    //temp.ItemID = Number(rst.ItemID);
                    temp.Address = rst.Address;
                    temp.FQTY = Number(rst.FQTY);
                    temp.Description = rst.Description;
                    temp.Price = Number(rst.Price);
                    temp.BOMID = Number(rst.BOMID);
                    temp.LinkMan = OrderSourceBasic[mWID - 1].CustomerMan;
                    temp.Phone = OrderSourceBasic[mWID - 1].LinkPhone;
                    
                    temp.Status = OrderSourceBasic[mWID - 1].Status;
                   // temp.Active = Number(rst.Active);
                    temp.OrderID = OrderSourceBasic[mWID - 1].ID;
                    for (var i = 0; i < BOMlistAll.length; i++) {
                        if (temp.BOMID == BOMlistAll[i].ID) {
                            temp.ItemID = BOMlistAll[i].MaterialID;

                        }
                    }
                    for (var j = 0; j < MaterialList.length; j++) {
                        if (temp.ItemID == MaterialList[j].ID) {
                            temp.ItemName = MaterialList[j].MaterialName;
                            temp.ItemCode = MaterialList[j].MaterialNo;
                            temp.UnitID = MaterialList[j].CYUnitID;
                        }
                    }

                    model.com.postOrderItem({
                        data: temp
                    }, function (res) {
                        alert("新增成功");
                        OrderSourceBasic[mWID - 1].ContractAmount = 0;
                        for (var i = 0; i < OrderItemSourceBasic.length; i++) {
                            if (OrderItemSourceBasic[i].Active==1) {
                                OrderSourceBasic[mWID - 1].ContractAmount += (OrderItemSourceBasic[i].Price) * (OrderItemSourceBasic[i].FQTY);
                            }

                        }
                        if (temp.Active == 1) {
                            OrderSourceBasic[mWID - 1].ContractAmount += temp.Price * temp.FQTY;

                        }
                        OrderSourceBasic[mWID - 1].ContractAmount = Number(OrderSourceBasic[mWID - 1].ContractAmount.toFixed(2));
                        model.com.postOrder({
                            data: OrderSourceBasic[mWID - 1]
                        }, function (res) {                          
                            model.com.refresh();
                        })
                        
                    });

                }, TypeSource_OrderItem));
            });
            //修改 订单详细
            $("body").delegate("#zace-orderItem-update", "click", function () {
                var SelectData = $com.table.getSelectionData($("#zace-SaleorderItem-body"), "WID", OrderItemSourceChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择一行数据再试！")
                    return;
                }
                if (SelectData.length != 1) {
                    alert("只能同时对一行数据修改！")
                    return;
                }
                var default_value = {
                    BOMID: SelectData[0].BOMID,
                    Address: SelectData[0].Address,
                    Status: SelectData[0].Status,
                    //FQTYDelivery: SelectData[0].FQTYDelivery,
                };
                var Wid = SelectData[0].WID;
                $("body").append($com.modal.show(default_value, KEYWORD_OrderItem, "修改", function (rst) {
                    //调用修改函数
                    if (!rst || $.isEmptyObject(rst))
                        return;

                    OrderItemSourceBasic[Wid - 1].Address = rst.Address;
                    OrderItemSourceBasic[Wid - 1].Status = Number(rst.Status);
                  //  OrderItemSourceBasic[Wid - 1].FQTYDelivery = Number(rst.FQTYDelivery);
                    OrderItemSourceBasic[Wid - 1].BOMID = Number(rst.BOMID);
                    OrderItemSourceBasic[Wid - 1].AuditTime = $com.util.format('yyyy-MM-dd hh:mm:ss', new Date());               

                    for (var i = 0; i < BOMlistAll.length; i++) {
                        if (OrderItemSourceBasic[Wid - 1].BOMID == BOMlistAll[i].ID) {
                            OrderItemSourceBasic[Wid - 1].ItemID = BOMlistAll[i].MaterialID;

                        }
                    }
                    for (var j = 0; j < MaterialList.length; j++) {
                        if (OrderItemSourceBasic[Wid - 1].ItemID == MaterialList[j].ID) {
                            OrderItemSourceBasic[Wid - 1].ItemName = MaterialList[j].MaterialName;
                            OrderItemSourceBasic[Wid - 1].ItemCode = MaterialList[j].MaterialNo;
                            OrderItemSourceBasic[Wid - 1].UnitID = MaterialList[j].CYUnitID;
                        }
                    }


                    model.com.postOrderItem({
                        data: OrderItemSourceBasic[Wid - 1]
                    }, function (res) {
                        alert("修改成功");

                        OrderSourceBasic[mWID - 1].ContractAmount = 0;
                        var plist = $com.util.Clone(OrderItemSourceBasic);
                        //plist = plist.splice(Wid - 1, 1)   返回删除的项
                        plist.splice(Wid - 1, 1);
                        for (var i = 0; i < plist.length; i++) {
                            if (plist[i].Active == 1) {
                                OrderSourceBasic[mWID - 1].ContractAmount += (plist[i].Price) * (plist[i].FQTY);
                            }

                        }
                        if (OrderItemSourceBasic[Wid - 1].Active == 1) {
                            OrderSourceBasic[mWID - 1].ContractAmount += OrderItemSourceBasic[Wid - 1].Price * OrderItemSourceBasic[Wid - 1].FQTY;

                        }
                        OrderSourceBasic[mWID - 1].ContractAmount = Number(OrderSourceBasic[mWID - 1].ContractAmount.toFixed(2));
                        model.com.postOrder({
                            data: OrderSourceBasic[mWID - 1]
                        }, function (res) {
                            model.com.refresh();
                        })
                      
                    })

                }, TypeSource_OrderItem));
            });
            //激活 orderItem
            $("body").delegate("#zace-active-SaleorderItem", "click", function () {
                var SelectData = $com.table.getSelectionData($("#zace-SaleorderItem-body"), "WID", OrderItemSourceChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择至少一行数据再试！")
                    return;
                }
                for (var j = 0; j < SelectData.length; j++) {
                    if (SelectData[j].Active == 1) {
                        alert("有数据已被激活!")                        
                        return;
                        break;
                    }
                }
                var list = [];
                for (var i = 0; i < SelectData.length; i++) {
                    var Wid = SelectData[i].WID;

                    list.push(OrderItemSourceBasic[Wid - 1]);
                }

                model.com.activeOrderItem({
                    data: list,
                    active: 1
                }, function (res1) {
                    alert("激活成功");
                    OrderSourceBasic[mWID - 1].ContractAmount = 0;
                    for (var i = 0; i < OrderItemSourceBasic.length; i++) {
                        if (OrderItemSourceBasic[i].Active == 1) {
                            OrderSourceBasic[mWID - 1].ContractAmount += (OrderItemSourceBasic[i].Price) * (OrderItemSourceBasic[i].FQTY);
                        }

                    }
                    for (var n = 0; n < SelectData.length; n++) {
                        OrderSourceBasic[mWID - 1].ContractAmount += SelectData[n].Price * SelectData[n].FQTY;
                    }
                   
                    OrderSourceBasic[mWID - 1].ContractAmount = Number(OrderSourceBasic[mWID - 1].ContractAmount.toFixed(2));
                    model.com.postOrder({
                        data: OrderSourceBasic[mWID - 1]
                    }, function (res) {
                        model.com.refresh();
                    })
                })
            });
            //禁用 OrderItem
            $("body").delegate("#zace-disable-SaleorderItem", "click", function () {
                var SelectData = $com.table.getSelectionData($("#zace-SaleorderItem-body"), "WID", OrderItemSourceChange);
                if (!SelectData || !SelectData.length) {
                    alert("请先选择至少一行数据再试！")
                    return;
                }
                for (var j = 0; j < SelectData.length; j++) {
                    if (SelectData[j].Active == 0) {
                        alert("有数据已被禁用!")
                        return;
                        break;
                    }
                }
                var list = [];
                for (var i = 0; i < SelectData.length; i++) {
                    var Wid = SelectData[i].WID;

                    list.push(OrderItemSourceBasic[Wid - 1]);
                }

                model.com.activeOrderItem({
                    data: list,
                    active: 0
                }, function (res1) {
                    alert("禁用成功");
                    OrderSourceBasic[mWID - 1].ContractAmount = 0;
                    for (var i = 0; i < OrderItemSourceBasic.length; i++) {
                        if (OrderItemSourceBasic[i].Active == 1) {
                            OrderSourceBasic[mWID - 1].ContractAmount += (OrderItemSourceBasic[i].Price) * (OrderItemSourceBasic[i].FQTY);
                        }

                    }
                    for (var n = 0; n < SelectData.length; n++) {
                        OrderSourceBasic[mWID - 1].ContractAmount -= SelectData[n].Price * SelectData[n].FQTY;
                    }

                    OrderSourceBasic[mWID - 1].ContractAmount = Number(OrderSourceBasic[mWID - 1].ContractAmount.toFixed(2));
                    model.com.postOrder({
                        data: OrderSourceBasic[mWID - 1]
                    }, function (res) {
                        model.com.refresh();
                    })
                })
            });
        },

        run: function () {
            $(".zace-orderOne").show();
            $(".zace-orderItem").hide();
            model.com.getRoleUser({ founctionid:100305}, function (resU) {
                if (resU && resU.list) {
                    RoleUserList = $com.util.Clone(resU.list);


                }
                model.com.getCustomer({}, function (res1) {
                    if (res1 && res1.list) {
                        CustomerList = $com.util.Clone(res1.list);
                        $.each(res1.list, function (i, item) {
                            TypeSource_Order.CustomerID.push({
                                name: item.CustomerName,
                                //value: item.ID,
                                value: item.ID,
                                far: null
                            })
                        });
                    }
                    model.com.getLinkManCustomer({ customer_id: 0, active: 2 }, function (resS) {
                        LinkManCustomerList = $com.util.Clone(resS.list);
                        $.each(resS.list, function (i, item) {
                            TypeSource_Order.CustomerMan.push({
                                name: item.Name,
                                //value: item.ID,
                                value: item.Name,
                                far: item.CustomerID
                            })
                        });
                        model.com.getMaterialList({ material_no: "", material_name: "", type_id: 0, status: 0 }, function (res) {
                            $.each(res.list, function (i, item) {
                                MaterialList = res.list;
                                TypeSource_OrderItem.ItemID.push({
                                    name: item.MaterialName,
                                    value: item.ID,
                                    far: null
                                })
                                
                            });                     
                                model.com.getMeteringSettingprice({}, function (resPrice) {
                                    $.each(resPrice.list, function (i, item) {
                                        TypeSource_OrderItem.UnitID.push({
                                            name: item.Name,
                                            value: item.ID,
                                            far: null
                                        })
                                    });
                                    model.com.getBomList({ bom_no: "", bom_name: "", workshop_id: 0, type_id: 0, status: 0 }, function (resBom) {
                                        if (resBom && resBom.list) {
                                            BOMlistAll = resBom.list;
                                            $.each(resBom.list, function (i, item) {
                                                TypeSource_OrderItem.BOMID.push({
                                                    name: item.BOMName,
                                                    value: item.ID,
                                                    far: null
                                                })
                                            });
                                         
                                        }
                                        model.com.refresh();
                                    });

                                
                            });

                        });
                    });
                });
                
            });
            
        },

        com: {
            //获取bom列表
            getBomList: function (data, fn, context) {
                var d = {
                    $URI: "/Bom/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //获取物料号列表
            getMaterialList: function (data, fn, context) {
                var d = {
                    $URI: "/Material/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //单位
            getMeteringSettingprice: function (data, fn, context) {
                var d = {
                    $URI: "/Unit/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //查询顾客联系人列表
            getLinkManCustomer: function (data, fn, context) {
                var d = {
                    $URI: "/LinkManCustomer/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //查询顾客信息
            getCustomer: function (data, fn, context) {
                var d = {
                    $URI: "/Customer/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            //导入
            postImportExcel: function (data, fn, context) {
                var d = {
                    $URI: "/Upload/ImportExcel",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('导入失败，请检查网络');
                }

                $com.app.ajax_load(data ? $.extend(data, d) : $.extend(d, data), fn, err, context);
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

            //role
            getRoleUser: function (data, fn, context) {
                var d = {
                    $URI: "/Role/UserAllByFunctionID",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },

            //所有订单信息
            getOrderAll: function (data, fn, context) {
                var d = {
                    $URI: "/CRMSaleOrder/All",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            postOrder: function (data, fn, context) {
                var d = {
                    $URI: "/CRMSaleOrder/Update",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);              
            },
            //激活
            activeOrder: function (data, fn, context) {
                var d = {
                    $URI: "/CRMSaleOrder/Active",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
          
            //订单详细信息
            getOrderItem: function (data, fn, context) {
                var d = {
                    $URI: "/CRMSaleOrder/CRMItemAll",
                    $TYPE: "get"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            postOrderItem: function (data, fn, context) {
                var d = {
                    $URI: "/CRMSaleOrder/UpdateItem",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            activeOrderItem: function (data, fn, context) {
                var d = {
                    $URI: "/CRMSaleOrder/ActiveItem",
                    $TYPE: "post"
                };

                function err() {
                    $com.app.tip('获取失败，请检查网络');
                }

                $com.app.ajax($.extend(d, data), fn, err, context);
            },
            refresh: function () {

                model.com.getOrderAll({ customerid: 0, status: 0, starttime: "2017-01-01 08:00:00", endtime: "2020-01-01 08:00:00" }, function (res) {
                    if (res && res.list) {

                        OrderSourceBasic = res.list;
                        OrderSourceChange = $com.util.Clone(res.list);
                                              
                        $.each(OrderSourceChange, function (i, item) {
                            item.WID = i + 1;
                        });

                        var _list = $com.util.Clone(OrderSourceChange);
                        $.each(_list, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_Order[p])
                                    continue;
                                item[p] = FORMATTRT_Order[p](item[p]);
                            }
                        });
                        OrderSourceChangeS = $com.util.Clone(_list);
                        $("#zace-Saleorder-body").html($com.util.template(_list, HTML.OrderList));
                    }
                   
                });

                model.com.getOrderItem({ orderid: mOrderId}, function (resO) {
                    if (resO && resO.list) {

                        OrderItemSourceBasic = resO.list;
                        OrderItemSourceChange = $com.util.Clone(resO.list);

                        $.each(OrderItemSourceChange, function (i, item) {
                            item.WID = i + 1;
                        });

                        var _listz = $com.util.Clone(OrderItemSourceChange);
                        $.each(_listz, function (i, item) {
                            for (var p in item) {
                                if (!FORMATTRT_OrderItem[p])
                                    continue;
                                item[p] = FORMATTRT_OrderItem[p](item[p]);
                            }
                        });
                        OrderItemSourceChangeS = $com.util.Clone(_listz);
                        $("#zace-SaleorderItem-body").html($com.util.template(_listz, HTML.OrderItemList));
                    }

                });

            
                
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
    });

    model.init();


});