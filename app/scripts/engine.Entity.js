var engine = engine || {};

Entity = function(shape, type, solver, mass) {

	this.shape = shape;

	this.type = type || engine.ENTITIES_TYPES.KINEMATIC;

	this.reaction = solver || engine.ENTITIES_REACTIONS.BASIC;

	this.mass = mass || 1;

	this.restitution = 0.5;

	this.velocity = new Point(0, 0);
	this.aceleration = new Point(0, 0);
}




Entity.prototype.getForce = function() {
	return new Point(
		this.aceleration.x * this.mass,
		this.aceleration.y * this.mass
	);
}