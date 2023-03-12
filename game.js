const screen = document.getElementById("screen");
const ctx = document.getElementById("screen").getContext("2d");
const scores = document.getElementById("scores");
var audioSoundTome = new Audio("./sounds/tome-rodrigo-faro_xDXKGwq.mp3");
var huhShit = new Audio("./sounds/huh-shitpost.mp3");
var gifTheRock = document.getElementById("gif");
function gameSnake () {
	// Tamanho da cobrinha
	this.t = 2;
	// Posição x e y da cobrinha
	this.x = 5;
	this.y = 5;

	// Direção de movimento x e y
	this.nextX = 0;
	this.nextY = 0;

	// Tamanho da cauda
	this.tail = 5;

	// Rastro da cobrinha
	this.trail = [];

	// Posição x e y da fruta com valores randomicos
	this.appleX = Math.floor(Math.random() * 80);
	this.appleY = Math.floor(Math.random() * 80);
	this.drowApple =() =>{
		// Desenha a cobrinha na tela
		ctx.fillStyle = "red";
		ctx.fillRect(this.appleX, this.appleY, this.t,this.t);
	}

	this.drowSnake=()=> {

		ctx.clearRect(0,0,100,100)
		// Desenha a cobrinha na tela atravez dos rastros e do tamanho da cobrinha
		ctx.fillStyle = "yellow";
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
			this.tail+=5;
			this.appleX = Math.floor(Math.random() * 80);
			this.appleY = Math.floor(Math.random() * 80);
			audioSoundTome.play()
		}
		this.drowSnake();
	}
	this.KeyPRESS = (event) => {
		if(event.key == "ArrowUp") {
			this.nextY = -1;
			this.nextX = 0;
		}else if(event.key == "ArrowDown") {
			this.nextY = 1;
			this.nextX = 0;
		}else if(event.key == "ArrowLeft") {
			this.nextY = 0;
			this.nextX = -1;
		}else if(event.key == "ArrowRight") {
			this.nextY = 0;
			this.nextX = 1;
		}
		this.moveSnake();
	}
}
const game = new gameSnake;

export { game };