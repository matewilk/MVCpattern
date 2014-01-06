/**
 * author: Mateusz Wilk
 * 
 */

function Model(){
    this.subscribers = [];
    this.items = [];
    this.counter = 0;
}

Model.prototype = {
    
    addItem: function(itemObj){
        //dodaj item
        this.items.push(itemObj);
        this.counter += 1;
        this.notifyObservers(this.counter);
    },
    
    removeItem: function(index){
        //usun item
        this.items.splice(index, 1);
        this.counter -= 1;
        this.notifyObservers(this.counter);
    },
    
    getItems: function(){
        return this.items;
    },
    
    subscribeObserver: function(observer){
        if(this.subscribers.indexOf(observer) == -1)
            this.subscribers.push(observer);
    },
    
    notifyObservers: function(args){
        for(var i = 0; i < this.subscribers.length; i += 1)
            this.subscribers[i].update(args);
    }
}

function View(model){
    this.model = model; 
    this.model.subscribeObserver(this);
}

View.prototype = {
    
    update: function(counter){
        var count = document.getElementById("counter");
        count.innerHTML = counter == 0 ? "" : counter+" items in list";
        var list = document.getElementById("itemslist");
        list.innerHTML = '';
        var items = this.model.getItems();
        for(var i = 0; i < items.length; i += 1){
            var item = this.createListElement(items[i].name, i);
            list.insertBefore(item, item.nextSibling);
        }
    },
    
    createListElement: function(elem, id){
        var item = document.createElement('li');
        var btn = document.createElement('button');
        var btntext = document.createTextNode("Delete");
        btn.appendChild(btntext);
        btn.className = 'removebtn';
        btn.setAttribute('id', id);
        item.innerHTML = elem;
        item.appendChild(btn);
        return item;
    }
    
}

function Controller(view, model){
    this.view = view;
    this.model = model;
}

Controller.prototype = {
    
    init: function(){
        var self = this;
        document.getElementById('addbtn').onclick = function(){self.addItem();};
        var list = document.getElementById('itemslist')
        list.addEventListener('click', function(e){
            var src
        
            e = e || window.event;
            src = e.target || e.src.Element
            
            self.removeItem(src.id);
        }, false)
    },
    
    addItem: function(){
        var iteminput = document.getElementById('iteminput');
        var inputvalue = iteminput.value;
        if(inputvalue)
            this.model.addItem({name: inputvalue});
        iteminput.value = null;
    },
    
    removeItem: function(id){
        this.model.removeItem(id);
    }
}