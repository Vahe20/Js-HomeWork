let arr = [1, 2, 3, 4];

Array.prototype.myForEach = function(callback) {
    for (let i = 0; i < this.length; ++i) {
        callback(this[i], i, this);
    }
}

function foo(e, i) {
    console.log(i + "-" + (e + 1));
}

function isEven(e) {
    return e % 2 === 0;
}



Array.prototype.myMap = function(callback) {
    let arr = [];
    for (let i = 0; i < this.length; ++i) {
        arr.push(callback(this[i], i, this));
    }
    
    return arr;
}

Array.prototype.myFilter = function(callback) {
    let arr = [];
    for (let i = 0; i < this.length; ++i) {
        if (callback(this[i], i, this)) {
            arr.push(this[i]);
        }
    }
    
    return arr;
}

Array.prototype.mySome = function(callback) {
    for (let i = 0; i < this.length; ++i) {
        if (callback(this[i], i, this)) {
            return true;
        }
    }

    return false;
}

Array.prototype.myEvery = function(callback) {
    for (let i = 0; i < this.length; ++i) {
        if (!callback(this[i], i, this)) {
            return false;
        }
    }

    return true;
}

Array.prototype.myIndexOf = function(callback) {
    for (let i = 0; i < this.length; ++i) {
        if(this[i] == callback) {
            return i;
        }
    }

    return -1;
}

arr.myForEach(foo);
console.log(arr.myMap(foo));
console.log(arr.myFilter(isEven));
console.log(arr.mySome(isEven));
console.log(arr.myEvery(isEven));
console.log(arr.myIndexOf(2));