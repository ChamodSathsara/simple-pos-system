$("#homeDiv").css("display", "block");
$("#customerDiv").css("display", "none");
$("#itemDiv").css("display", "none");
$("#orderDiv").css("display", "none");

$("#customerLink").click(function () {
  $("#homeDiv").css("display", "none");
  $("#customerDiv").css("display", "block");
  $("#itemDiv").css("display", "none");
  $("#orderDiv").css("display", "none");
  $("#brandName").text("Customers");
});

$("#orderLink").click(function () {
  $("#homeDiv").css("display", "none");
  $("#customerDiv").css("display", "none");
  $("#itemDiv").css("display", "none");
  $("#orderDiv").css("display", "block");
  $("#brandName").text("Orders");
  setTextFeild();
  setOrderId();
});

$("#itemLink").click(function () {
  $("#homeDiv").css("display", "none");
  $("#customerDiv").css("display", "none");
  $("#itemDiv").css("display", "block");
  $("#orderDiv").css("display", "none");
  $("#brandName").text("Items");
});

$("#homeLink").click(function () {
  $("#homeDiv").css("display", "block");
  $("#customerDiv").css("display", "none");
  $("#itemDiv").css("display", "none");
  $("#orderDiv").css("display", "none");
  $("#brandName").text("Dashboard");
});
