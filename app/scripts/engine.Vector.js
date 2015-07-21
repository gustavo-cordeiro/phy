var engine = engine || {};

engine.Vector = function(initialPoint, finalPoint) {
	this.final = finalPoint;
	this.initial = initialPoint;
};

engine.Vector.prototype.add = function(otherVector) {
	return new vector(
		new Point(
			this.initial.x + otherVector.initial.x, this.initial.y + otherVector.initial.y
		),
		new Point(
			this.final.x + otherVector.final.x, this.final.y + otherVector.final.y
		)
	);
}

engine.Vector.prototype.multiply = function(scalar) {
	return new vector(
		new


		Point(
			this.initial.x * scalar, this.initial.y * scalar
		),
		new


		Point(
			this.final.x * scalar, this.final.y * scalar
		)
	);
}

// engine.Vector.prototype.subtract = function(otherVector) {
// 	return new vector(this.x - otherVector.x, this.y - otherVector.y);
// }

// engine.Vector.prototype.divide = function(scalar) {
// 	this.x = (this.x / scalar);
// 	this.y = (this.y / scalar);
// 	return new vector(this.x, this.y);
// }

// engine.Vector.prototype.normalise = function() {
// 	var magnitude = this.magnitude();

// 	return new vector(this.x * (1.0 / magnitude), this.y * (1.0 / magnitude));
// }

// engine.Vector.prototype.magnitude = function() {
// 	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
// }

// engine.Vector.prototype.dot = function(otherVector) {
// 	return ((this.x * otherVector.x) + (this.y * otherVector.y));
// }

engine.Vector.prototype.intersectionPoint(otherVector) {

	var point = undefined,
		det = (otherVector.initial.x - otherVector.final.x) * (this.final.y - this.initial.y) - (otherVector.final.y - otherVector.initial.y) * (this.final.x - this.initial.x);

	if (det != 0) {
		p = this.parametricEquation(s);
	}

	return p;
}

engine.Vector.prototype.parametricEquation = function(weight) {
	return new


	Point(
		this.initial.x * (1 - weight) + this.final.x * weight,
		this.initial.y * (1 - weight) + this.final.y * weight
	);
}