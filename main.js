function func(){
(function(){

function Hamburger(_size, _stuffing) {   
    try{
        if(_size.name==="small" || _size.name==="large"){
            if(_stuffing.name==="cheese" || _stuffing.name==="salad" || _stuffing.name==="potato"){
                this.size=_size;
                this.stuffing=_stuffing;
                this.toppings=[];
                return this;
            }
        }else{
            throw new HamburgerException("неправильные параметры");
        }
    }catch(HamburgerException){
        return null;
    }
} 


Hamburger.SIZE_SMALL = {
    name:"small",
    price:50,
    cal:20
};
Hamburger.SIZE_LARGE = {
    name:"large",
    price:100,
    cal:40
};
Hamburger.STUFFING_CHEESE = {
    name:"cheese",
    price:10,
    cal:20
};
Hamburger.STUFFING_SALAD = {
    name:"salad",
    price:20,
    cal:5
};
Hamburger.STUFFING_POTATO = {
    name:"potato",
    price:15,
    cal:10
};
Hamburger.TOPPING_MAYO = {
    name:"mayo",
    price:20,
    cal:5
};
Hamburger.TOPPING_SPICE = {
    name:"spice",
    price:15,
    cal:0
};


function FindArr(item,arr){
    for (var i = 0; i < arr.length; i++) {
       if(arr[i]===item){
           return i;
       }
    }
    return -1;
}
Hamburger.prototype.addTopping = function (topping) {
    try{
        var found=FindArr(topping,this.toppings);
        if(found===-1){
            this.toppings.push(topping);
            return this.toppings;
        }else{
            throw new HamburgerException("такой топпинг уже есть");
        }
    }catch(HamburgerException){
        return null;
    }
}

Hamburger.prototype.removeTopping = function (topping) {
    try{
    var found=FindArr(topping,this.toppings);
        if(found!==-1){
            this.toppings.splice(found,1);
            return this.toppings;
        }else {
            throw new HamburgerException("такого топпинга еще нету");
        }
    }catch(HamburgerException){
        return null;
    }
}

Hamburger.prototype.getToppings = function (){
    return this.toppings;
} 

Hamburger.prototype.getSize = function () {
    return this.size;
}

Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}

Hamburger.prototype.calculatePrice = function () {
    var price = this.size.price + this.stuffing.price;
    for (var i = 0; i < this.toppings.length; i++) {
      price += this.toppings[i].price;
    }
    return price;
}

Hamburger.prototype.calculateCalories = function () {
    var cal = this.size.cal + this.stuffing.cal;
    for (var i = 0; i < this.toppings.length; i++) {
      cal += this.toppings[i].cal;
    }
    return cal;
}


function HamburgerException (_message) {
    this.message=_message;
    this.name="Hamburger exception";
    return console.error(this.name+": "+this.message);
}

//------------------------

Hamburger.prototype.changeSize=function(newsize){
    var temp=this.getSize();
    if(this.temp!==newsize){
        this.size=newsize;
    }
    temp=null;
    return this.getSize();
}
Hamburger.prototype.changeStuffing=function(newstuffing){
    var temp=this.getStuffing();
    if(temp!==newstuffing){
        this.stuffing=newstuffing;
    }
    temp=null;
    return this.getStuffing();
}
Hamburger.prototype.changeToppings=function(newtoppings){
    this.toppings.forEach(function(element) {
        this.removeTopping(element);
    }, this);
    this.newtoppings.forEach(function(element){
        this.addTopping(element);
    },this);
    return this.getToppings();
}

function formService(){
    var hamburger=new Hamburger(Hamburger.SIZE_LARGE,Hamburger.STUFFING_CHEESE);
    if(dsizes===Hamburger.SIZE_SMALL.name){
        hamburger.changeSize(Hamburger.SIZE_SMALL);
    }
    if(dstuffing!==Hamburger.STUFFING_CHEESE.name){
        if(dstuffing===Hamburger.STUFFING_POTATO){
            hamburger.changeStuffing(Hamburger.STUFFING_POTATO);
        }else{
            hamburger.changeStuffing(Hamburger.STUFFING_SALAD);
        }
    }
    if(dtoppings[0]){
        for(var i=0; i<dtoppings.length;i++){
            if(dtoppings[i]===Hamburger.TOPPING_MAYO.name){
                hamburger.addTopping(Hamburger.TOPPING_MAYO);
            }
            if(dtoppings[i]===Hamburger.TOPPING_SPICE.name){
                hamburger.addTopping(Hamburger.TOPPING_SPICE);
            }
        }
    }

    console.log(hamburger);
    return hamburger;
}

function formResponse(hamburger){
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    var name = dsizes +" hamburger with " + dstuffing + " and "+dtoppings ;
    var div = document.getElementById('order');
    div.innerHTML = "<br>You order:<br>"+name+"<br>Price: "+hamburger.calculatePrice()+ "$<br>"+"Сalories: "+hamburger.calculateCalories();
    
}

formResponse(formService());
}());
}

function getData(form){
    var checkedSize;
    if(form!==undefined)
    {for (var i = 0; i < form.length; i++) {
      if(form[i].checked){
        checkedSize = form[i].value;
      }
    }}
    return checkedSize;
}

function getDataT(form){
    var checkedSize=[];
    if(form!==undefined)
    {for (var i = 0; i < form.length; i++) {
      if(form[i].checked){
        checkedSize.push( form[i].value);
      }
    }}
    return checkedSize;
}
var dsizes;
var dstuffing;
var dtoppings;
function eventForm(e){
    e.preventDefault();
    sizes = document.getElementsByName('size');
    stuffing=document.getElementsByName('stuffing');
    toppings=document.getElementsByName('toppings');
    console.log( getData(sizes) );
    console.log( getData(stuffing) );
    console.log( getDataT(toppings) );
    dsizes=getData(sizes);
    dstuffing=getData(stuffing);
    dtoppings=getDataT(toppings);
    func();
}

form.addEventListener('submit', eventForm);
