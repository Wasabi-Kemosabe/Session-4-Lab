var catalog = [];

function getCatalog() {
    $.ajax({
        type: "get",
        url: "http://restclass.azurewebsites.net/API/points",
        success: function (response) {
            console.log('Request succeeded', response);
            catalog = response;
            for (let i = 0; i < response.length; i++) {
                const element = response[i];
                if (element.user === 'Angelo') {
                    catalog.push(element);
                }
            }
            displayCatalog();
        },
        error: function (error) {
            console.error('Error on req ', error);
        }
    });
};

function displayCatalog() {
    // get the reference to ul
    var ul = $("#catalog");

    // for every item on the catalog array
    for (let i = 0; i < catalog.length; i++) {
        const item = catalog[i];
        displayItem(item)
    }
};

function search() {
    console.log('Searching...');
    var txtInput = $('#searchBar').val().toLowerCase();
    $("#catalog").html('');
    for (let i = 0; i < catalog.length; i++) {
        const element = catalog[i];
        if (element.title.toLowerCase().indexOf(txtInput) >= 0 || element.description.toLowerCase().indexOf(txtInput) >= 0) {
            displayItem(element);
        }
    }
}

function displayItem(item) {
    var ul = $("#catalog");
    var li = `<div class="card text-white bg-info mb-3" style="width: 18rem;">
    <img src="${item.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">${item.description}</p>
      <h6>${item.price}</h6>
      <a href="#" class="btn btn-primary">Add to cart</a>
    </div>
  </div>`;
    ul.append(li);
}

function init() {

    $('#searchBtn').click(search);
    $('#searchBar').keypress(function (args) {
        if (args.keyCode === 13) {
            search();
            args.preventDefault();
        }
    });
    $('.cat-filter').click(function (e) {
        e.preventDefault();
        var category = $(this).attr('catName');
        console.log('Filter by category', category);
    });

    getCatalog();
    displayCatalog();
}

window.onload = init;