/**
 * Creates a virtually-rendered scrollable list.
 * @param {object} config
 * @constructor
 */
function VirtualList(config) {
  var width = (config && config.w + 'px') || '100%';
  var height = (config && config.h + 'px') || '100%';
  var itemHeight = this.itemHeight = config.itemHeight;

  this.items = config.items;
  this.generatorFn = config.generatorFn;
  this.totalRows = config.totalRows || (config.items && config.items.length);

  var scroller = VirtualList.createScroller(itemHeight * this.totalRows);
  this.container = VirtualList.createContainer(width, height);
  this.container.appendChild(scroller);

  var screenItemsLen = Math.ceil(config.h / itemHeight);
  // Cache 4 times the number of items that fit in the container viewport
  this.cachedItemsLen = screenItemsLen * 3;
  this._renderChunk(this.container, 0);

  var self = this;
  var lastRepaintY;
  var maxBuffer = screenItemsLen * itemHeight;
  var lastScrolled = 0;

  // As soon as scrolling has stopped, this interval asynchronouslyremoves all
  // the nodes that are not used anymore
  this.rmNodeInterval = setInterval(function() {
    if (Date.now() - lastScrolled > 100) {
      var badNodes = document.querySelectorAll('[data-rm="1"]');
      for (var i = 0, l = badNodes.length; i < l; i++) {
        self.container.removeChild(badNodes[i]);
      }
    }
  }, 300);

  function onScroll(e) {
	  e = e || window.event; //ie
	  var te = e.target || e.srcElement; //ie
    var scrollTop = te.scrollTop; // Triggers reflow
    if (!lastRepaintY || Math.abs(scrollTop - lastRepaintY) > maxBuffer) {
      var first = parseInt(scrollTop / itemHeight) - screenItemsLen;
      self._renderChunk(self.container, first < 0 ? 0 : first);
      lastRepaintY = scrollTop;
    }

    lastScrolled = Date.now();
    e.preventDefault && e.preventDefault();
  }

  if(this.container.attachEvent)
	  this.container.attachEvent('onscroll', onScroll);
  else
	  this.container.addEventListener('scroll', onScroll);
}

VirtualList.prototype.createRow = function(i) {
  var item;
  if (this.generatorFn)
    item = this.generatorFn(i);
  else if (this.items) {
    if (typeof this.items[i] === 'string') {
      var itemText = document.createTextNode(this.items[i]);
      item = document.createElement('div');
      item.style.height = this.itemHeight + 'px';
      item.appendChild(itemText);
    } else {
      item = this.items[i];
    }
  }

  item.classname='vrow';
  item.style.position = 'absolute';
  item.style.top = (i * this.itemHeight) + 'px';
  return item;
};

/**
 * Renders a particular, consecutive chunk of the total rows in the list. To
 * keep acceleration while scrolling, we mark the nodes that are candidate for
 * deletion instead of deleting them right away, which would suddenly stop the
 * acceleration. We delete them once scrolling has finished.
 *
 * @param {Node} node Parent node where we want to append the children chunk.
 * @param {Number} from Starting position, i.e. first children index.
 * @return {void}
 */
VirtualList.prototype._renderChunk = function(node, from) {
  var finalItem = from + this.cachedItemsLen;
  if (finalItem > this.totalRows)
    finalItem = this.totalRows;

  // Append all the new rows in a document fragment that we will later append to
  // the parent node
  var fragment = document.createDocumentFragment();
  for (var i = from; i < finalItem; i++) {
    fragment.appendChild(this.createRow(i));
  }

  // Hide and mark obsolete nodes for deletion.
  for (var j = 1, l = node.childNodes.length; j < l; j++) {
    node.childNodes[j].style.display = 'none';
    node.childNodes[j].setAttribute('data-rm', '1');
  }
  node.appendChild(fragment);
};

VirtualList.createContainer = function(w, h) {
  var c = document.createElement('div');
  c.style.width = w;
  c.style.height = h;
  c.style.overflow = 'auto';
  c.style.position = 'relative';
  c.style.padding = 0;
  c.style.border = '1px solid black';
  return c;
};

VirtualList.createScroller = function(h) {
  var scroller = document.createElement('div');
  scroller.style.opacity = 0;
  scroller.style.position = 'absolute';
  scroller.style.top = 0;
  scroller.style.left = 0;
  scroller.style.width = '1px';
  scroller.style.height = h + 'px';
  return scroller;
};


var list = new VirtualList({
		  w: 300,
		  h: 300,
		  itemHeight: 24,
		  totalRows: 1000000,
		  generatorFn: function(row) {
		    var el = document.createElement("div");
		    el.innerHTML = "ITEM " + row;
		    el.className='celda';
		    return el;
		  }
		});
		document.getElementById("container").appendChild(list.container);

	  
		var onClickFunct= function(e) {
		  e = e || window.event;
		  var te = e.target || e.srcElement;
		  if(this.old)
			  this.old.classList.remove("green_bg");
		  this.old=te;	  
		    if (te.tagName.toLowerCase() == "div") { 
		    	te.classList.add("green_bg");
		    }
		};
		
		document.getElementById("container").onclick =onClickFunct;