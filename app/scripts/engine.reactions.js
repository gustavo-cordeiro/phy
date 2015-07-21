var engine = engine || {};

engine.reactions = {};

(function(reactions, types) {
	reactions[types.BASIC] = function(collider, bumped) {
		var bMidllePoint = bumped.shape.getCenter(),
			cMidllePoint = collider.shape.getCenter();

		var normalized = new Point(
			(cMidllePoint.x - bMidllePoint.x) / collider.shape.halfWidth, (cMidllePoint.y - bMidllePoint.y) / collider.shape.halfHeight
		);

		var absolute = new Point(
			Math.abs(normalized.x),
			Math.abs(normalized.y)
		);

		var collision = {
			inX: false,
			inY: false,
		}

		if (Math.abs(absolute.x - absolute.y) < 0.1) {
			collision.inX = collision.inY = false;
		} else if (absolute.x > absolute.y) {
			collision.inX = true;
		} else {
			collision.inY = true;
		}

		if (collision.inX) {
			if (normalized.x >= 1) {
				bumped.shape.position.x = collider.shape.getLeft() - bumped.shape.heigth;
				bumped.velocity.x = -bumped.velocity.x * bumped.restitution;
			} else {
				bumped.shape.position.x = collider.shape.getRight();
				bumped.velocity.x = bumped.velocity.x * bumped.restitution;
			}
		}

		if (collision.inY) {
			if (normalized.y >= 1) {
				bumped.shape.position.y = collider.shape.getTop() - bumped.shape.heigth;
				bumped.velocity.y = -bumped.velocity.y * bumped.restitution;
			} else {
				bumped.shape.position.y = collider.shape.getBottom();
				bumped.velocity.y = bumped.velocity.y * bumped.restitution;
			}
		}

		// if (normalized.y >= 1) {
		// 	bumped.shape.position.y = collider.shape.getTop() - bumped.shape.heigth;
		// 	bumped.velocity.y = -bumped.velocity.y * bumped.restitution;
		// } else {
		// 	bumped.shape.position.y = collider.shape.getBottom();
		// 	bumped.velocity.y = bumped.velocity.y * bumped.restitution;
		// }
	};

})(engine.reactions, engine.ENTITIES_REACTIONS);