var engine = engine || {};

engine = {

	entities: {},

	gravity: {
		x: 0,
		y: -0.1
	},

	tile: 20,

	/**
	 * Inicia os dados da engine
	 */

	init: function(entities) {
		this.entities[this.ENTITIES_TYPES.KINEMATIC] = [];
		this.entities[this.ENTITIES_TYPES.DYNAMIC] = [];

		for (var i = entities.length - 1; i >= 0; i--) {
			if (entities[i].type === this.ENTITIES_TYPES.KINEMATIC) {
				this.entities[this.ENTITIES_TYPES.KINEMATIC].push(entities[i]);
			} else {
				this.entities[this.ENTITIES_TYPES.DYNAMIC].push(entities[i]);
			}
		};
	},

	/**
	 * Atualiza as posições
	 */

	updateEntity: function(entity, useGravity) {
		entity.velocity.x += useGravity ? entity.aceleration.x - this.gravity.x : entity.aceleration.x;
		entity.velocity.y += useGravity ? entity.aceleration.y - this.gravity.y : entity.aceleration.y;

		if (entity.velocity.y > engine.tile / 2) {
			entity.velocity.y = engine.tile / 2;
		}

		if (entity.velocity.x > engine.tile / 2) {
			entity.velocity.x = engine.tile / 2;
		}


		entity.shape.position.x += entity.velocity.x;
		entity.shape.position.y += entity.velocity.y;
	},

	/**
	 * Verificar colisões
	 */

	detectCollision: function(collider, bumped) {
		var collision = true;
		var l1 = collider.shape.getLeft();
		var t1 = collider.shape.getTop();
		var r1 = collider.shape.getRight();
		var b1 = collider.shape.getBottom();

		var l2 = bumped.shape.getLeft();
		var t2 = bumped.shape.getTop();
		var r2 = bumped.shape.getRight();
		var b2 = bumped.shape.getBottom();

		if (b1 < t2 || t1 > b2 || r1 < l2 || l1 > r2) {
			collision = false;
		}

		return collision;
	},

	/**
	 * Aplica reações devido colisoões
	 */

	reactToCollision: function(collider, bumped) {
		engine.reactions[collider.reaction](collider, bumped);
	},

	main: function() {
		var collider,
			bumped;

		for (var i = this.entities[this.ENTITIES_TYPES.DYNAMIC].length - 1; i >= 0; i--) {
			bumped = this.entities[this.ENTITIES_TYPES.DYNAMIC][i];

			this.updateEntity(bumped, true);

			for (var j = this.entities[this.ENTITIES_TYPES.KINEMATIC].length - 1; j >= 0; j--) {
				collider = this.entities[this.ENTITIES_TYPES.KINEMATIC][j];

				if (this.detectCollision(collider, bumped)) {
					this.reactToCollision(collider, bumped);
				}
			}


			for (var z = this.entities[this.ENTITIES_TYPES.DYNAMIC].length - 1; z >= 0; z--) {
				collider = this.entities[this.ENTITIES_TYPES.DYNAMIC][z];

				if (collider != bumped && this.detectCollision(collider, bumped)) {
					this.reactToCollision(collider, bumped);
				}
			};

			// this.updateEntity(bumped);
		}

	},

	ENTITIES_TYPES: {
		/**
		 * O Ambiente não exerce alterações
		 */

		KINEMATIC: 'kinematic',

		/**
		 * O Ambiente exerce alterações
		 */

		DYNAMIC: 'dynamic'
	},

	ENTITIES_REACTIONS: {
		ELASTIC: 'elastic',
		BASIC: 'basic'
	}
}