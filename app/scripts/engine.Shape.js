Shape = function(width, heigth, position) {
	this.width = width || 0;
	this.heigth = heigth || 0;
	this.halfWidth = this.width / 2;
	this.halfHeight = this.heigth / 2;
	this.position = position || new Point(0, 0);
}

Shape.prototype.getCenter = function() {
	return new Point(
		this.halfWidth + this.position.x,
		this.halfHeight + this.position.y
	);
}
Shape.prototype.getTop = function() {
	return this.position.y;
}

Shape.prototype.getRight = function() {
	return this.position.x + this.width;
}

Shape.prototype.getBottom = function() {
	return this.position.y + this.heigth;
}

Shape.prototype.getLeft = function() {
	return this.position.x;
}