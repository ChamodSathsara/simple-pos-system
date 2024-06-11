// crude orerations

// load all customer table for array

function loadAllCustomer() {
  let tid;
  let tname;
  let taddress;
  let tsalary;
  $("#tableBody>tr").empty();
  for (let i = 0; i < CustomerDb.length; i++) {
    tid = CustomerDb[i].id;
    tname = CustomerDb[i].name;
    taddress = CustomerDb[i].address;
    tsalary = CustomerDb[i].salary;

    let code =
      "<tr> <td>" +
      tid +
      "</td> <td>" +
      tname +
      "</td> <td>" +
      taddress +
      "</td> <td>" +
      tsalary +
      "</td> </tr>";

    $("#tableBody").append(code);
  }
}

// save customer
$("#btnCustomerSave").click(function (e) {
  $("#tableBody>tr").off();

  let customerId = $("#customerId").val();
  let customerName = $("#customerName").val();
  let customerAddress = $("#customerAddress").val();
  let customerSalary = $("#customerSalary").val();

  //add to data in object
  let CustomerObject = new Customer(
    customerId,
    customerName,
    customerAddress,
    customerSalary
  );

  // add a array
  CustomerDb.push(CustomerObject);

  //call load all customer function
  loadAllCustomer();
  clearAll();
});

// clear All customers
function clearAll() {
  $("#customerId").val("");
  $("#customerName").val("");
  $("#customerAddress").val("");
  $("#customerSalary").val("");
}

// get find id
function getFind(id) {
  for (let i = 0; i < CustomerDb.length; i++) {
    if (CustomerDb[i].id == id) {
      return CustomerDb[i];
    }
  }
}

// search customer
$("#btnCustomerGetAll").click(function (e) {
  let searchId = $("#customerId").val();
  let response = getFind(searchId);
  if (response) {
    $("#customerId").val(response.id);
    $("#customerName").val(response.name);
    $("#customerAddress").val(response.address);
    $("#customerSalary").val(response.salary);
  } else {
    clearAll();
    alert("No result");
  }
});

//delete customer
$("#btnCustomerRemove").click(function () {
  let deletedId = $("#customerId").val();

  let isDo;
  for (let i = 0; i < CustomerDb.length; i++) {
    if (CustomerDb[i].id == deletedId) {
      CustomerDb.splice(i, 1);
      isDo = false;
      loadAllCustomer();
    } else {
      isDo = true;
    }
  }
  if (isDo) {
    alert("not do this");
  }
});

// clear all text
$("#btnCustomerClearAll").click(function (e) {
  clearAll();
});

// update customer
$("#btnCustomerUpdate").click(function (e) {
  let updatedId = $("#customerId").val();
  let updatedName = $("#customerName").val();
  let updatedAddress = $("#customerAddress").val();
  let updatedSalary = $("#customerSalary").val();

  let response = getFind(updatedId);

  if (response) {
    response.name = updatedName;
    response.address = updatedAddress;
    response.salary = updatedSalary;
    loadAllCustomer();
    alert("Updated Customer...");
  } else {
    alert("not a this Customer Id");
  }
});

// validations

// Id verification
function setId(id) {
  for (let i = 0; i < CustomerDb.length; i++) {
    if (id == CustomerDb[i].id) {
      alert("this id is alreddy Used!!!");
    } else {
      return id;
    }
  }
}
