const screen = document.getElementById("screen");
const ctx = document.getElementById("screen").getContext("2d");
const scores = document.getElementById("scores");
var audioSoundTome = new Audio("./sounds/tome-rodrigo-faro_xDXKGwq.mp3");
var huhShit = new Audio("./sounds/huh-shitpost.mp3");
var gifTheRock = document.getElementById("gif");
var level = document.getElementById("level");
function gameSnake () {
	// Tamanho da cobrinha
	this.t = 10;
	// Velocidade da cobinha
	this.vel = 1;
	// Tamanho da maçã
	this.appleT = this.t + 1;
	// Posição x e y da cobrinha
	this.x = 5;
	this.y = 5;
	// Direção de movimento x e y
	this.nextX = 0;
	this.nextY = 0;

	// Tamanho da cauda
	this.tail = 10;

	// Rastro da cobrinha
	this.trail = [];

	// Posição x e y da fruta com valores randomicos
	this.appleX = Math.floor(Math.random() * screen.width);
	this.appleY = Math.floor(Math.random() * screen.height);
	this.drowApple =() =>{
		// Desenha a cobrinha na tela
		ctx.fillStyle = "red";
		ctx.fillRect(this.appleX, this.appleY, this.appleT,this.appleT);
	}

	this.drowSnake=()=> {

		ctx.clearRect(0,0,screen.width,screen.height)
		// Desenha a cobrinha na tela atravez dos rastros e do tamanho da cobrinha
		ctx.fillStyle = "white";
		for(var count = 0; count < this.trail.length; count++){
			ctx.fillRect(this.trail[count].x, this.trail[count].y, this.t,this.t);

			// Verifica se a cobrinha bateu na cauda dela mesma
			if(this.trail[count].x == this.x && this.trail[count].y == this.y){
				huhShit.play()
				gifTheRock.style.display = "block";
				setTimeout(()=>{
					window.location.reload();
				},1000)
			}
		}

		// Adiciona as posições no rastro
		this.trail.push({x: this.x, y: this.y});

		// Verifica se o tamanho do rastro é maior que a cauda da cobrinha, se for o primeiro valor é deletado do array
		while(game.trail.length > game.tail){
			game.trail.shift();
		}
		this.drowApple();

	}
	this.moveSnake = ()=> {
		this.x += this.nextX;
		this.y += this.nextY;

		if(this.x < 0) {
			this.x = screen.width -1;
		}else if(this.x > screen.width -1) {
			this.x = 0;
		}else if(this.y < 0) {
			this.y = screen.height -1;
		}else if(this.y > screen.height -1) {
			this.y = 0;
		}
		// Verifica se a cobrinha comeu a maçã
		if (this.x == this.appleX && this.y == this.appleY){
			scores.innerText++;
			this.tail+=10;
			if(Number(scores.innerText) > 50) {
				this.vel = 2;
				level.innerText = 2;
			}else if(Number(scores.innerText) > 100) {
				level.innerText = 3;
				this.vel = 5;
			}else if(Number(scores.innerText) > 150) {
				level.innerText = 4;
				this.vel = 10;
			}
			this.appleX = Math.floor(Math.random() * screen.width);
			this.appleY = Math.floor(Math.random() * screen.height);
			audioSoundTome.play()
		}
		this.drowSnake();
		}
	this.KeyPRESS = (event) => {
		if(event.key == "ArrowUp") {
			this.nextY = -this.vel;
			this.nextX = 0;
		}else if(event.key == "ArrowDown") {
			this.nextY = this.vel;
			this.nextX = 0;
		}else if(event.key == "ArrowLeft") {
			this.nextY = 0;
			this.nextX = -this.vel;
		}else if(event.key == "ArrowRight") {
			this.nextY = 0;
			this.nextX = this.vel;
		}
		this.moveSnake();
	}
}
const game = new gameSnake;

export { game };
