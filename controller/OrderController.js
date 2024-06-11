// Crud Operations

// load all order table for array
function loadAllOrders() {
  $("#orderTableBody>tr").empty();
  let icode;
  let iname;
  let iuprice;
  let iqty;
  let tprice;

  //   for (let i = 0; i < OrderDb.length; i++) {
  //     let cust = $("#orderCustomerId").val();

  //     if (cust == OrderDb[i].Customer.id) {
  //       for (let k = 0; k < OrderDb.OrderDetails.length; k++) {
  //         icode = OrderDb[i].OrderDetails[k].code;
  //         iname = OrderDb[i].OrderDetails[k].name;
  //         iuprice = OrderDb[i].OrderDetails[k].uPrice;
  //         iqty = OrderDb[i].OrderDetails[k].orderQty;
  //         tprice = OrderDb[i].OrderDetails[k].total;

  //         let code =
  //           "<tr> <td>" +
  //           icode +
  //           "</td> <td>" +
  //           iname +
  //           "</td> <td>" +
  //           iuprice +
  //           "</td> <td>" +
  //           iqty +
  //           "</td> <td>" +
  //           tprice +
  //           "</td> </tr>";

  //         $("#orderTableBody").append(code);
  //       }
  //     }

  for (let i = 0; i < OrderDetailsDb.length; i++) {
    icode = OrderDetailsDb[i].code;
    iname = OrderDetailsDb[i].name;
    iuprice = OrderDetailsDb[i].uPrice;
    iqty = OrderDetailsDb[i].orderQty;
    tprice = OrderDetailsDb[i].total;

    let code =
      "<tr> <td>" +
      icode +
      "</td> <td>" +
      iname +
      "</td> <td>" +
      iuprice +
      "</td> <td>" +
      iqty +
      "</td> <td>" +
      tprice +
      "</td> </tr>";

    $("#orderTableBody").append(code);
  }
}

// set textfield in customer and orders
function setTextFeild() {
  $("#customerList").empty();
  $("#itemList").empty();

  for (let i = 0; i < CustomerDb.length; i++) {
    let code = "<option>" + CustomerDb[i].id + "</option>";
    $("#customerList").append(code);
  }

  //set another details in customer
  $("#customerList").change(function () {
    var value = $("#customerList").val();
    for (let i = 0; i < CustomerDb.length; i++) {
      if (value == CustomerDb[i].id) {
        $("#orderCustomerId").val(CustomerDb[i].id);
        $("#orderCustomerName").val(CustomerDb[i].name);
        $("#orderCustomerSalary").val(CustomerDb[i].salary);
        $("#orderCustomerAddress").val(CustomerDb[i].address);
      }
    }
  });

  //set item details
  for (let i = 0; i < ItemDb.length; i++) {
    let icode = "<option>" + ItemDb[i].code + "</option>";
    $("#itemList").append(icode);
  }
  //set another detail in item
  $("#itemList").change(function () {
    var value = $("#itemList").val();
    console.log("Click");
    console.log(value);
    for (let i = 0; i < ItemDb.length; i++) {
      if (value == ItemDb[i].code) {
        $("#orderItemCode").val(ItemDb[i].code);
        $("#orderItemName").val(ItemDb[i].name);
        $("#orderItemPrice").val(ItemDb[i].price);
        $("#orderItemQty").val(ItemDb[i].qty);
      }
    }
  });
}

// save order
$("#btnAddOrder").click(function (e) {
  let itemCode;
  let itemName;
  let itemUPrice;
  let itemQty;
  let orderQty;

  itemCode = $("#orderItemCode").val();
  itemName = $("#orderItemName").val();
  itemUPrice = $("#orderItemPrice").val();
  itemQty = $("#orderItemQty").val();
  orderQty = $("#orderQty").val();
  //   ..........................................................................

  //   set total
  let total = itemUPrice * orderQty;

  //create method
  let orderDetail = new OrderDetailF(
    itemCode,
    itemName,
    itemUPrice,
    itemQty,
    orderQty,
    total
  );

  console.log(orderDetail);

  //add to array order
  OrderDetailsDb.push(orderDetail);

  loadAllOrders();
  let ftotal = 0;
  for (let i = 0; i < OrderDetailsDb.length; i++) {
    ftotal = ftotal + OrderDetailsDb[i].total;
  }

  $("#total").text(ftotal);
  $("#subTotal").text(ftotal);
});

//purchase button
$("#btnPurchase").click(function (e) {
  let orderId;
  let date;
  let orderQty;
  let orderedCustomer;

  orderId = $("#orderId").val();
  date = $("#orderDate").val();

  //find sutable customer
  let cid = $("#orderCustomerId").val();
  for (let i = 0; i < CustomerDb.length; i++) {
    if (cid == CustomerDb[i].id) {
      orderedCustomer = CustomerDb[i];
    }
  }

  let order = new Order(orderId, date, orderedCustomer, OrderDetailsDb);

  OrderDb.push(order);

  let cash = $("#orderCash").val();
  let total = 0;
  for (let i = 0; i < OrderDetailsDb.length; i++) {
    total = total + OrderDetailsDb[i].total;
  }
  let balance = cash - total;
  $("#orderDiscount").val("0%");
  $("#orderBalance").val(balance);

  //find sutable item

  for (let k = 0; k < OrderDetailsDb.length; k++) {
    let iid = OrderDetailsDb[k].code;
    for (let i = 0; i < ItemDb.length; i++) {
      if (iid == ItemDb[i].code) {
        orderedItem = ItemDb[i];
        let uqty = ItemDb[i].qty;
        ItemDb[i].qty = uqty - OrderDetailsDb[k].orderQty;
        loadAllItem();
      }
    }
  }

  clearOrderTexts();
});

//set new order Id
function setOrderId() {
  if (OrderDb.length < 1) {
    $("#orderId").val("O00-001");
  } else {
    let newId = OrderDb.length + 1;
    $("#orderId").val("O00-00" + newId);
  }
}

// clear text
function clearOrderTexts() {
  $("#orderDate").val("");
  $("#orderCustomerId").val("");
  $("#orderCustomerName").val("");
  $("#orderCustomerSalary").val("");
  $("#orderCustomerAddress").val("");

  $("#orderItemCode").val("");
  $("#orderItemName").val("");
  $("#orderItemPrice").val("");
  $("#orderItemQty").val("");
  $("#orderQty").val("");

  $("#orderDiscount").val("");

  alart(" Balance is " + $("#orderBalance").val(""));
  $("#orderBalance").val("");
  $("#orderCash").val("");

  $("#total").text("");
  $("#subTotal").text("");

  $("#orderTableBody").empty();
  setOrderId();
}
