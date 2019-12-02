function Player(hp, gold) {

	this.gold = 0;
	this.hp = hp;
	this.totalHp = hp;
	this.currentBlock = this.block;

	this.equipWeapon = function (weapon) {
		this.equip = weapon.name;
		this.minA = weapon.minA;
		this.maxA = weapon.maxA;
		this.miss = weapon.miss;
	}

	this.equipArmor = function (clothes) {
		this.armor = clothes.name;
		this.block = clothes.block;
		this.currentBlock = this.block;
		this.blockAdd = clothes.blockAdd;
	}

	this.setHp = function (hp) {
		this.hp = hp;
		if (this.hp <= 0) {
			this.hp = 0;
			SetSlaying(false);
		}
	}

	this.setGold = function (gold) {
		this.gold = gold;
	}

	this.setPower = function (power) {
		this.power = power;
	}

	this.resetBlock = function () {
		this.currentBlock = this.block;
	}

	this.hardscope = function(){
		this.power += 1;
		return Math.floor((Math.random() * this.maxA) + this.minA);

	}

	this.noscope = function() {
		this.power -= 2;
		return Math.floor(((Math.random() * 3 * this.minA) + this.maxA) + this.minA);

	}

	this.blockr = function() {
		this.power += 1;
		this.currentBlock = this.block + this.blockAdd;
		console.println("You brace for an attack of magnitude " + this.currentBlock + "!");
	}


	this.doAttack = async function(enemy, dam, miss, type) {
		if (!miss) {
			console.println("You " + type + " the " + enemy.name + " with your " + this.equip + " and do " + dam + " damage!");
			enemy.setHp(enemy.hp - dam);

		} else {
			console.println("You missed!");
			await getUserInput();
		}
	}

	this.attack = function (enemy) {	
		inputLoop = true;
		pmiss = false;
		missc = Math.random() * 100;
		if (missc < this.miss) {
			pmiss = true;
		}

		if (this.power > 2) {
			while (inputLoop) {
				inputLoop = false;
				fight = console.input("[H]ardscope, [B]lock or [N]oScope: ").toLowerCase();
				switch (fight) {
					case "hardscope":
						this.doAttack(enemy, this.hardscope(), pmiss, "hardscope");
					break;
					case "h":
						this.doAttack(enemy, this.hardscope(), pmiss, "hardscope");
					break;
					case "block":
						this.blockr();
					break;
					case "b":
						this.blockr();
					break;
					case "noscope":
						this.doAttack(enemy, this.noscope(), pmiss, "noscope");
					break;
					case "n":
						this.doAttack(enemy, this.noscope(), pmiss, "noscope");
					break;
					default:
					inputLoop = true;
					console.println("Invalid input!");
					break;
				}
			}
		} else {
			while (inputLoop) {
				inputLoop = false;
				fight = console.input("[H]ardscope or [B]lock: ").toLowerCase();
				switch (fight) {
					case "hardscope":
						this.doAttack(enemy, this.hardscope(), pmiss, "hardscope");
					break;
					case "h":
						this.doAttack(enemy, this.hardscope(), pmiss, "hardscope");
					break;;
					case "block":
						this.blockr();
					break;
					case "b":
						this.blockr();
					break;
					default:
					inputLoop = true;
					console.println("Invalid input!");
					break;
				}
			}
		}

	}
}
