var PriorityQueue = (function () {
	var heap ;
	var priorityQueue = function ( size, compare ) {
		heap = new Heap(size, compare);
	}
	priorityQueue.prototype = {
        isEmpty: function(){
            return heap.isEmpty() ;
        },
        isFull: function(){
            return heap.isFull();
        }
	}
	return priorityQueue ;
}())
