//===============//
// BUSINESS LOGIC //
//===============//

//Pizza Object and Price Prototypes
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
}

Pizza.prototype.toppingPrice = function(newPizza) {
  newPizza.toppings.forEach(function(topping) {
    newPizza.price += 2;
  });
}

// Address Object and Sentence Prototype
function Address(street, city, state){
  this.street = street;
  this.city = city;
  this.state = state;
}

Address.prototype.sentence = function(){
  return this.street + ", " + this.city + ", " + this.state;
}

//========================//
// USER INTERFACE LOGIC //
//========================//

$(function() {
  $("#add-topping").click(function() {
    $(".all-toppings").append('<div class="form-group">' +
                                '<div class="new-topping">' +
                                  '<label for="new-toppings">What other <span class="red-text">toppings</span> would you like?</label>' +
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
    newPizza.toppingPrice(newPizza);

    $("#pizza-options").hide();
    $(".total-price-text").append("<h3>Hi <span class='red-text'>" + newPizza.name + "</span>, your delicious looking <span class='red-text'>" + newPizza.size + "</span>-sized pizza will come to a total of <span class='red-text'>$" + newPizza.price + "</span>. Would you like to have it delivered?</h3>");
    $(".total-price").fadeIn();

    $("#add-delivery").click(function() {
      $(".total-price").hide();
      $(".address-form").fadeIn();
    });

    $("#finish-order").click(function() {
      $(".total-price-text").hide();
      $(".last-buttons").hide();
      $(".final-text").append("<h3>Your " + newPizza.size + " pizza will be ready for pickup in 30 minutes. Please have $" + newPizza.price + " ready for payment.");
    });

    $("#address").submit(function(event) {
      event.preventDefault();

      var street = $("#street").val();
      var city = $("#city").val();
      var state = $("#state").val();

      var newAddress = new Address(street, city, state);

      $(".address-form").hide();
      $(".order-finish").append("<p>Thank you " + newPizza.name + ". Your " + newPizza.size + " pizza will be delivered to " + newAddress.sentence() + ". Please have your payment of <span class='red-text'>$" + newPizza.price + "</span> ready.</p>");
      $(".order-finish").fadeIn();
    });
  });
});
