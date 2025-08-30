function newItem(name) {
	exports[name] = (() => {
		let myItem = extend(Item, name, {});
		return myItem;
	})();
}
newItem("钴")
newItem("铀")
newItem("铁")
newItem("钢")
newItem("贫铀")
newItem("暗金属")
newItem("暗能钢")
newItem("洛德合金")
newItem("空间节点")
newItem("钴钢")