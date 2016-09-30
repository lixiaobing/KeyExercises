"use strict";
cc._RFpush(module, 'dca0fj7sSNILLOm8yG3G6El', 'ArrayUtils');
// scripts\ArrayUtils.js

module.exports = {
    //删除数组里的元素
    remove: function remove(array, object) {
        for (var index = 0; index < array.length; index++) {
            if (array[index] === object) {
                //console.log("remove=",index);
                array.splice(index, 1);
            }
        }
    }

};

cc._RFpop();