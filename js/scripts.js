// BUSINESS LOGIC //
function Pizza(name, size){
  this.name = name;
  this.size = size;
  this.toppings = [];
  this.price = 0;
}

Pizza.prototype.getPriceForSize = function() {
  if (this.size === "small") {
    this.price += 8;
  } else if (this.size === "medium") {
    this.price += 9.75;
  } else {
    this.price += 11.50;
  }
  });
}

var toppingsPrice = function(pizza) {
  pizza.toppings.forEach(function(topping) {
    pizza.price += 2;
  });
}


// USER INTERFACE LOGIC //
$(function() {
  $("#add-topping").click(function() {
    $(".all-toppings").append('<div class="form-group">' +
                                '<div class="new-topping">' +
                                  '<label for="new-toppings">What other toppings would you like?</label>' +
                                    '<select class="form-control" id="new-toppings">' +
                                      '<option>Pepperoni</option>' +
                                      '<option>Mushrooms</option>' +
                                      '<option>Onions</option>' +
                                      '<option>Sausage</option>' +
                                      '<option>Bacon</option>' +
                                      '<option>Extra Cheese</option>' +
                                      '<option>Black Olives</option>' +
                                      '<option>Green Peppers</option>' +
                                      '<option>Pineapple</option>' +
                                      '<option>Ham</option>' +
                                    '</select>' +
                                  '</div>' +
                                '</div>');
  });

  $("#pizza-options").submit(function(event) {
    event.preventDefault();

    var nameInput = $("#name").val();
    var sizeInput = $("#size").val().toLowerCase();
    var newPizza = new Pizza(nameInput, sizeInput);

    $(".new-topping").each(function() {
      var toppingInput = $(this).find("#new-toppings").val();
      newPizza.toppings.push(toppingInput);
    });

    newPizza.getPriceForSize();
    toppingsPrice(newPizza);

    $("#pizza-options").hide();

    $(".total-price-text").append("<h3>Hi " + newPizza.name + ", your <span class='toppings'></span> delicious looking " + newPizza.size + " pizza will come to a total of <strong>$" + newPizza.price + "</strong>. Would you like to have it delivered?");

    $(".total-price").fadeIn();

    

  });
});
