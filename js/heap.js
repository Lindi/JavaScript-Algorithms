var Heap = (function(){
    var queue;
    var count = 0;
	var compare ;
    var heap = function Heap(size, fn) {
        queue = new Array(size + 1);
		compare = fn ;
    };
    
    heap.prototype = {
        isEmpty: function(){
            return count == 0;
        },
        isFull: function(){
            return count == queue.length - 1;
        },
        insert: function(item){
        
            //	Todo: Dynamically allocate more memory if we're inserting
            //	an item and the heap is full 
            if (count == queue.length - 1) {
                return false;
            }
            
            
            //	Increment the count value
            //	The count is the number of children currently in the heap
            var child = ++count;
            
            //	The parent node is at count / 2
            //	We have to take the floor here, because all
            //	numbers in JavaScript are 64-bit floating point numbers
            var parent = Math.floor(count / 2);
            
            //	While there is a parent
            while (parent != 0) {
            
                //	If the item being inserted is greater than
                //	the last leaf in level order, or it's greater
                //	than the current parent, insert it and return 
                if (item > queue[parent]) {
                    queue[child] = item;
                    return;
                }
                else {
                
                    //	Otherwise, the value in the parent node
                    //	should propagate downward to the child, and
                    //	the values of the current parent and current
                    //	child pointers should decrease
                    queue[child] = queue[parent];
                    child = parent;
                    parent = Math.floor(child / 2);
                }
            }
            
            queue[child] = item;
            
        },
        clear: function(){
            for (var i = 1; i <= queue.length-1; i++) {
                queue[i] = Number.MAX_VALUE;
            }
			count = 0 ;
        },
        find: function(item){
        
            if (queue[count] == item) {
                return count;
            }
            var child = count;
            var parent = Math.floor(child / 2);
            while (parent != 0) {
                if (queue[parent] <= item) {
                    var index = parent;
                    while (index <= child) {
                        if (queue[index] == item) {
                            return index;
                        }
						++index ;
                    }
                } else {
					child = parent ;
					parent = Math.floor( child / 2 );
				}
            }
			
			return -1 ;
            
        },
        decrease: function(item, index){
            //	index should be between 1 and count inclusive
            if (index < 1 || index > count) {
                return;
            }
			
			queue[index] = item ;
            
            var child = index;
            var parent = Math.floor(child / 2);
            while (parent != 0) {
                if (item > queue[parent]) {
                    queue[child] = item;
                    return;
                }
                
                queue[child] = queue[parent];
                child = parent;
                parent = Math.floor(child / 2);
            }
            queue[child] = item;
        },
        increase: function(item){
        
        },
        remove: function(){
        
            //	The item to remove will be at the top
            //	of the heap
            var item = queue[1];
            
            //	The item we're inserting is the last leaf
            //	in level order
            var insert = queue[count];
            
            //	We decrement the count since we're removing an
            //	item from the heap
            count--;
            
            //	We start from the top of the heap and
            //	bubble down while looking for the place
            //	to put the item we're inserting (insert)
            parent = 1;
            child = Math.floor(parent * 2);
            while (child <= count) {
                if (child < count) {
                    //	Figure out which child is smallest.  
                    //	In a min-heap this is the child you want to swap
                    //	with the item being inserted.  
                    
                    //	That way, the smallest value bubbles
                    //	to the top of the heap
                    if (queue[child + 1] < queue[child]) {
                        child++;
                    }
                }
                
                //	If the value of the child is greater
                //	than the value being inserted, place the value
                //	being inserted in the current list position (parent)
                //	and return (we've identified the place where
                //	all the children are greater than the current value)
                if (queue[child] >= insert) {
                    queue[parent] = insert;
                    return item;
                }
                else {
                
                    //	The value in the child should bubble up one level
                    //	since it's less than the value being inserted
                    queue[parent] = queue[child];
                    
                    //	Update the values of the current 
                    //	and the child
                    parent = child;
                    child = Math.floor(parent * 2);
                }
            }
            
            queue[parent] = insert;
            return item;
        }
    }
    
    return heap;
}());
