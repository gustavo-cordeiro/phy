$(function() {
	main.init();
});

var size = 20;

var main = {
	init: function() {
		var gameObject,
			entities = [];

		for (var i = 20 - 1; i >= 0; i--) {
			gameObject = this.createGameObject();

			gameObject.entity.velocity.y = Math.random();
			gameObject.entity.velocity.x = Math.random() > 0.5 ? -Math.random() * 10 : Math.random() * 10;

			this.gameObjects.push(gameObject);
			entities.push(gameObject.entity);

		};
		// Ground
		gameObject = this.createGameObject(
			size,
			window.innerWidth,
			new Point(0, window.innerHeight - size),
			engine.ENTITIES_TYPES.KINEMATIC
		);

		this.gameObjects.push(gameObject);
		entities.push(gameObject.entity);

		//Wall L
		gameObject = this.createGameObject(
			window.innerHeight,
			size,
			new Point(0, 0),
			engine.ENTITIES_TYPES.KINEMATIC
		);

		this.gameObjects.push(gameObject);
		entities.push(gameObject.entity);

		//Wall R
		gameObject = this.createGameObject(
			window.innerHeight,
			size,
			new Point(window.innerWidth - size, 0),
			engine.ENTITIES_TYPES.KINEMATIC
		);

		this.gameObjects.push(gameObject);
		entities.push(gameObject.entity);

		engine.init(entities);

		this.loop();
	},

	gameObjects: [],

	createGameObject: function(height, width, position, type) {
		return {
			entity: new Entity(
				this.createShape(height, width, position),
				type || engine.ENTITIES_TYPES.DYNAMIC
			),
			graph: $('<div>').appendTo('body'),
			render: function() {
				this.graph
					.css(
						'transform',
						'translate(' + this.entity.shape.position.x + 'px,' + this.entity.shape.position.y + 'px)'
				).css(
					'width',
					this.entity.shape.width + 'px'
				).css(
					'height',
					this.entity.shape.heigth + 'px'
				)
			}
		};
	},

	createShape: function(height, width, position) {
		return new Shape(
			width || size,
			height || size,
			position || new Point(
				Math.random() * (window.innerWidth - 50),
				Math.random() * (window.innerHeight - 50)
			)
		);
	},

	loop: function() {
		engine.main();

		for (var i = main.gameObjects.length - 1; i >= 0; i--) {
			main.gameObjects[i].render();
		};

		requestAnimationFrame(main.loop);
	}

};