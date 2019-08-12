// object constructor
function Item(title, description, price, category, image) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.category = category;
    this.image = image;
    this.user = 'Angelo';
}

function saveItem() {
    // get data
    var title = $("#inputTitle").val();
    var description = $("#inputDescription").val();
    var price = $("#inputPrice").val();
    var category = $(".form-check-input:checked").val();
    var image = $("#inputImage").val();

    // create object
    var newItem = new Item(title, description, price, category, image);

    // save object to back end
    $.ajax({
        type: "POST",
        url: "http://restclass.azurewebsites.net/API/points",
        data: JSON.stringify(newItem),
        contentType: "application/json",
        success: function (response) {
            console.log('Request succeeded', response);
        },
        error: function (error) {
            console.error('Error on req ', error);
        }
    });

    // Anything outside the $.ajax method will be executed before a response is even received.
}

function testAjax() {
    var myServerUrl = 'http://restclass.azurewebsites.net/API/test';
    $.ajax({
        url: myServerUrl,
        type: 'GET',
        success: function (res) {
            console.log('Request succeeded', res);
        },
        error: function (error) {
            console.error('Error on req ', error);
        }
    });
}

function init() {
    console.log('Init admin page');

    // initializations

    // events
    $("#btnSave").click(saveItem);
}

window.onload = init;