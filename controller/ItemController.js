// Crud Operations
// load all Item table for array

function loadAllItem() {
  $("#itemTableBody>tr").empty();
  let ticode;
  let tiname;
  let tiqty;
  let tiprice;

  for (let i = 0; i < ItemDb.length; i++) {
    ticode = ItemDb[i].code;
    tiname = ItemDb[i].name;
    tiqty = ItemDb[i].qty;
    tiprice = ItemDb[i].price;

    let code =
      "<tr> <td>" +
      ticode +
      "</td> <td>" +
      tiname +
      "</td> <td>" +
      tiqty +
      "</td> <td>" +
      tiprice +
      "</td> </tr>";

    $("#itemTableBody").append(code);
  }
}

// save Item
$("#btnAddItem").click(function (e) {
  $("#itemTableBody>tr").off();

  let itemCode = $("#itemCode").val();
  let itemName = $("#itemName").val();
  let itemQty = $("#itemQty").val();
  let itemPrice = $("#itemUnitPrice").val();

  //add to data in object
  let ItemObject = new Item(itemCode, itemName, itemQty, itemPrice);

  console.log(ItemObject);

  // add a array
  ItemDb.push(ItemObject);

  //call load all item function
  loadAllItem();
  clearAllItem();
});

// clear All Item fields
function clearAllItem() {
  $("#itemCode").val("");
  $("#itemName").val("");
  $("#itemQty").val("");
  $("#itemUnitPrice").val("");
}

// get find id
function getFinditemId(id) {
  for (let i = 0; i < ItemDb.length; i++) {
    if (ItemDb[i].code == id) {
      return ItemDb[i];
    }
  }
}

// search items
$("#btnGetAllItem").click(function (e) {
  let searchId = $("#itemCode").val();
  let response = getFinditemId(searchId);
  if (response) {
    $("#itemCode").val(response.code);
    $("#itemName").val(response.name);
    $("#itemQty").val(response.qty);
    $("#itemUnitPrice").val(response.price);
  } else {
    clearAllItem();
    alert("No result");
  }
});

//delete Item
$("#btnRemoveItem").click(function () {
  let deletedId = $("#itemCode").val();

  let isDo;
  for (let i = 0; i < ItemDb.length; i++) {
    if (ItemDb[i].code == deletedId) {
      ItemDb.splice(i, 1);
      isDo = false;
      loadAllItem();
      clearAllItem();
    } else {
      isDo = true;
    }
  }
  if (isDo) {
    alert("not do this");
  }
});

// clear all text
$("#btnClearAllItem").click(function (e) {
  clearAllItem();
});

// update item
$("#btnUpdateItem").click(function (e) {
  let updatedCode = $("#itemCode").val();
  let updatedName = $("#itemName").val();
  let updatedQty = $("#itemQty").val();
  let updatedPrice = $("#itemUnitPrice").val();

  let response = getFinditemId(updatedCode);

  if (response) {
    response.name = updatedName;
    response.qty = updatedQty;
    response.price = updatedPrice;
    loadAllItem();
    alert("Updated Item...");
  } else {
    alert("not a this Item Code");
  }
});
