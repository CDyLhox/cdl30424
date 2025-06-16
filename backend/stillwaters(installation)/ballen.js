const assets = ['assets/images/playground/basketball.webp'];

class BouncingBall {
	constructor(width, weight) {
		this.width = width;
		this.weight = weight;
		this.xpos = Math.random() * window.innerWidth;
		this.ypos = Math.random() * window.innerHeight;
		this.dx = 1;
		this.dy = 1;
		this.ball = null;
	}

	createBall() {
		this.ball = document.createElement('img');
		this.ball.src = assets[Math.floor(Math.random() * assets.length)];
		this.ball.width = this.width;
		this.ball.height = this.width;
		this.ball.style.position = 'fixed';
		this.ball.style.left = this.xpos + 'px';
		this.ball.style.top = this.ypos + 'px';
		this.ball.style.zIndex = 9999;
		document.body.append(this.ball);
	}

	moveBall() {
		this.xpos += this.dx;
		this.ypos += this.dy;

		const winWidth = window.innerWidth;
		const winHeight = window.innerHeight;

		// Bounce off window
		if (this.xpos <= 0 || this.xpos + this.width >= winWidth) {
			this.dx *= -1;
		}

		if (this.ypos <= 0 || this.ypos + this.width >= winHeight) {
			this.dy *= -1;
		}

		// Check for collision with other elements
		const ballRect = this.ball.getBoundingClientRect();
		const elements = document.querySelectorAll('div, p, img, section, article, span');

		for (const element of elements) {
			if (element === this.ball) {
				continue;
			}

			const rect = element.getBoundingClientRect();

			if (
				ballRect.left < rect.right
				&& ballRect.right > rect.left
				&& ballRect.top < rect.bottom
				&& ballRect.bottom > rect.top
			) {
				// Reverse direction
				this.dx = -this.dx;
				this.dy = -this.dy;

				// Push the ball out of the element to avoid getting stuck
				this.xpos = this.dx > 0 ? rect.left - this.width : rect.right;

				this.ypos = this.dy > 0 ? rect.top - this.width : rect.bottom;

				// Apply the updated position
				this.ball.style.left = this.xpos + 'px';
				this.ball.style.top = this.ypos + 'px';
			}
		}

		// Apply movement
		this.ball.style.left = this.xpos + 'px';
		this.ball.style.top = this.ypos + 'px';
	}
}

const ball = new BouncingBall(10, 10);
ball.createBall();

setInterval(() => {
	ball.moveBall();
}, 5);
