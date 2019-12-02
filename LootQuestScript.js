/*(You can change the variables with a description 
//By the way over 2000 lines of code (Way over by now!)
var block = 0;
var power = 0;
var gold = 0;
var sword = " ";
//change the variable below to give you higher damage (This one is he higher one) 
var dam = 0;
//below is your starting hit points
var hp = 5;
var armor = "Meme Shirt";
//DON'T CHANGE THE VARIABLE BELOW
var win = 0;
//Below is your total hit points (Change to give you health to survive!)
var totalhp = 5;
//below is also damage think of it like 'this weapon does 2 to 1 damage usually the lower one
var dam2 = 1;
//Below is your starting gold edit to over 9000 and you're rich
var totalg = 100;*/

var level = 1;

let enemies = [];

var slaying = false;

//make player
let player = new Player(5, 100);

//make armor
let memeShirt = new Armor("Meme Shirt", 0, 1);

//make weapons
let woodenSword = new Weapon("Wooden Sword", 1, 3, 30);

/* name, level, hp, min attack, max attack, misschance% */
let slime = new Enemy("Slime", 0, 3, 1, 2, 35);
let aslime = new Enemy("Angry Slime", 1, 2, 4, 0, 45);

function AddEnemy(e) {
	enemies.push(e);
}

function SetSlaying(slaying) {
	this.slaying = slaying;
}

StartGame();
async function StartGame() {
	console.println("Welcome to the game. Here is some free loot");
	await getUserInput();
	var gold = Math.floor(Math.random() * 20 + 5);
	player.setGold(player.gold + gold);
	player.equipWeapon(woodenSword);
	player.equipArmor(memeShirt);
	player.equip
		console.println("You find a " + player.equip + ", a " + player.armor + " and " + gold + " gold");
	console.println(player.block);
	await getUserInput();
	console.cls();
	StartLevel(GenLevel(window.level), GenEnemies(0, 1), window.level);

}

function GenLevel(levelNum) {
	step = 4 + levelNum * 2;
	var levelStr = ["["];
	for (var i = 0; i < step; i++) {
		levelStr.push("_");
	}
	levelStr.push("]");
	move = [];
	for (var i = 0; i < step; i++) {
		levelStrTemp = levelStr.slice(0);
		levelStrTemp[i + 1] = "o/";
		stepStr = "";
		for (var j = 0; j < (levelStrTemp.length); j++) {
			stepStr += levelStrTemp[j];
		}
		move.push(stepStr);
	}
	return move
}

function GenEnemies(emin, emax) {
	en = [];
	for (let i = 0; i < enemies.length; i++) {
		if (emin <= enemies[i].level <= (emax+1)) {
			en.push(enemies[i]);
		}
	}
	return en;
}

async function StartLevel(move, en, level) {
	console.println("Welcome to the floor " + level + "!");
	await getUserInput();
levelLoop:
	for (var i = 0; i < (move.length); i++) {
		console.println(move[i]);
		await getUserInput();
		re = Math.floor((Math.random() * 5) + 1);
		if (re > 3) {
			console.println("Oh no a wild enemy!");
			await getUserInput();
			echoice = Math.floor(Math.random() * (en.length - 1));
			battle = false;
			for (let j = 0; j < en.length; j++) {
				if (echoice == j) {
					battle = true;
					console.println("Battle Start!");
					await Battle(move[i], Object.create(en[j]));
					break;
				}
			}
			if (!battle) {
				console.println("Enemy got scared and ran away!");
				await getUserInput();
			}
		}
		console.cls();
	}
	console.cls();
	console.println("Floor " + level + " complete!");
	await getUserInput();
	console.cls();
}

async function Win(enemy) {
	console.println("You did a killing headshot on the " + enemy.name);
	await getUserInput();
	await Loot();
}

async function GameOver() {
	console.println("YOU DIED");
	await getUserInput();
	console.cls();
	throw "game end"
}

async function Loot() {
	console.println("YOU WIN!");
	await getUserInput();
	console.println("Here is some loot...");
	//Random gold
	gold = Math.floor(Math.random() * 50 + 5);
	player.setGold(player.gold + gold);
	console.println("Your gold:  " + player.gold);
	await getUserInput();
	randomh = Math.floor(Math.random() * 2);
	//random heal
	if (randomh) {
		console.println("You heal!");
		player.setHp(player.hp + 2);
		if (player.hp > player.totalhp) {
			var hp = player.totalhp
				console.println("You healed to full heath")
				await getUserInput();
		} else {
			console.println("You heal + 2")
				console.println("Your heath:  " + player.hp)
				await getUserInput();
		}
	} else {
		console.println("No heal :(");
	}
	console.println("Time to move on...");
	await getUserInput();
	console.cls();
}

async function Battle(step, enemy) {
	//battle system
	/*This is you! Slaying is the loop for the battle system. you = if you miss
	  round = damage of hardscope round1 = damage of noscope total = total damage*/
	slaying = true;
	win = false;

	while (slaying) {
		console.cls();
		console.println(step);
		console.println("Your Health: " + player.hp);
		console.println(enemy.name + "'s Health: " + enemy.hp);
		player.attack(enemy);
		await getUserInput();
		if (!slaying) {
			win = true;
			break;
		}
		console.cls();
		console.println(step);
		console.println("Your Health: " + player.hp);
		console.println(enemy.name + "'s Health: " + enemy.hp);
		enemy.attack(player);
		await getUserInput();
		if (!slaying) {
			win = false;
			break;
		}
	}

	if(win) {
		await Win(enemy);
	} else {
		await GameOver();
	}
}

async function Game() {
	/* This code was soooooooooooooooooooooooooo annoying (like feener grade) it 
	   took me a while to figure out that I needed double break*/
	alert("Welcome to the random merchant!");
	var buyloop = true
		while (buyloop) {
			var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()
				//Loops it
				switch (buy) {

					case "hp":
						//checks your gold   
						if (totalg < 100) {

							confirm("You can't buy that")
								// if you want to leave or not (below)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You gained 2 hp")
								totalg -= 100
								totalhp += 2
								console.println("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}
					case "dam":
						if (totalg < 100) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You feel stronger!")
								totalg -= 100
								dam += 1
								console.println("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}

					case "heal":

						if (totalg < 45) {

							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break;
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You gained 2 hp")
								totalg -= 45
								var hp = totalhp;
							console.println("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}

					case "sw":
						//Gambling OMG
						confirm("Bid for steel sword!")
						// The bids
						var bid1 = Math.floor(Math.random() * 200 + 40)
						var bid2 = Math.floor(Math.random() * 200 + 40)
						var bid3 = Math.floor(Math.random() * 200 + 40)
						var bid4 = Math.floor(Math.random() * 200 + 40)
						console.println("Bids:")
						console.println(bid1)
						console.println(bid2)
						console.println(bid3)
						console.println(bid4)
						await getUserInput();
					var bid = console.input("Your bid?")
						if (bid > totalg) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}
					if (bid < bid1) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid2) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid3) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid4) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (sword === "Steel Sword") {
						confirm("You already have that sword!")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else {
						confirm("Here is your upgrade!")
							confirm("You found a Steel Sword")
							totalg -= bid
							dam += 2
							dam2 += 2
							console.println("Total gold: " + totalg)
							sword = "Steel Sword"
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					}



					case "1337":
						if (totalg < 2001) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You found... what?... I dont even know what this is...")
								totalg -= 2001
								dam += 10
								sword = "The Mlg"
								console.println("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}


					default:

					confirm("We don't sell anything like that.")
						var exit = prompt("Want to leave Y or N").toLowerCase()
						if (exit === "y") {
							buyloop = false
								break;
							break
						} else {
							break
								break
								var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

						}

				}
		}



	alert("Welcome to floor 2!")
		for (var i = 0; i < 7; i++) {
			var move = ["[o______]", "[_o_____]", "[__o____]", "[___o___]", "[____o__]", "[_____o_]", "[______o]"];
			var re = Math.floor(Math.random() * 5 + 1);

			if (re > 3) {
				alert("Oh no a wild enemy");
				var echoice = Math.floor(Math.random() * 3 + 1);
				if (echoice <= 1) {

					var em = Math.floor(Math.random() * 2);
					var enemy = Math.floor(Math.random() * 4 - block + 1);
					var ehp = 4;
					var emn = "Slime";
					var etotal = 0;

				} else if (echoice <= 2) {
					var em = Math.floor(Math.random() * 3);
					var enemy = Math.floor(Math.random() * 4 - block + 1);
					var ehp = 3;
					var emn = "Angry Slime";
					var etotal = 0;

				} else {
					var em = Math.floor(Math.random() * 2);
					var enemy = Math.floor(Math.random() * 5 - block + 2);
					var ehp = 3;
					var emn = "Sparta";
					var etotal = 0;

				}

				//battle system
				var slaying = true;
				var you = Math.floor(Math.random() * 3);
				var round = Math.floor(Math.random() * dam + dam2);
				var round1 = Math.floor(Math.random() * 5 + 2);
				var total = 0;



				while (slaying) {
					var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
						for (var j = 0; j < clear.length; j++) {
							console.log(clear[j])
						}
					console.log(move[i])
						console.log("Your Heath: " + hp);
					console.log(emn + " Heath: " + ehp);
					var block = 0;
					var win = 0;

					if (power > 2) {


						var fight = prompt("Hardscope, Block or NoScope").toLowerCase();

						switch (fight) {

							case "hardscope":
								power += 1;
							if (you) {
								confirm("You hardscoped the slime with your " + sword + " and did " + round + " damage!");
								ehp -= round;

								if (ehp <= 0) {
									confirm("You did a killing headshot on the " + emn);
									var win = 1
										slaying = false;
									break;

								} else {
									you = Math.floor(Math.random() * 3);
									break;
								}

							} else {

								confirm("You miss");
								you = Math.floor(Math.random() * 3);
								break;
							}

							case "noscope":
								power -= 2;
							if (you) {
								confirm("You noscoped the " + emn + " with your " + sword + " and did " + round1 + " damage!");
								ehp -= round1;

								if (ehp <= 0) {
									var win = 1;
									confirm("You did a killing headshot on the " + emn);
									slaying = false;
									break;


								} else {

									you = Math.floor(Math.random() * 3);
									break;
								}
							} else {
								confirm("You miss")
									you = Math.floor(Math.random() * 3);
								break;
							}

							default:
							var block = 1
								power += 1;
							break;
						}

					} else {

						var fight = prompt("Hardscope or Block").toLowerCase();

						switch (fight) {

							case "hardscope":
								power += 1
								if (you) {
									confirm("You hardscoped the " + emn + " with your " + sword + " and did " + round + " damage!");
									ehp -= round;

									if (ehp <= 0) {
										var win = 1;
										confirm("You did a killing headshot on the " + emn);
										slaying = false;
										break;


									} else {
										you = Math.floor(Math.random() * 3);
										break;
									}

								} else {
									confirm("You miss")
										you = Math.floor(Math.random() * 3);
									break;
								}
							default:
							var block = 1
								power += 1;
							break;
						}

					}
					if (win === 0) {
						if (em) {
							confirm("The " + emn + " hit you and did " + enemy + " damage!")
								hp -= enemy

								if (hp <= 0) {
									var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
										for (var j = 0; j < clear.length; j++) {
											console.log(clear[j])
										}
									console.log(move[i])
										console.log("Your Heath: 0");
									console.log(emn + " Heath: " + ehp);
									confirm("You died")
										slaying = false
										throw new Error("You Lose")
								} else {
									var em = Math.floor(Math.random() * 3);

								}
						} else {
							confirm(emn + " missed!")
								var em = Math.floor(Math.random() * 3);

						}
					} else {
						var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
							for (var j = 0; j < clear.length; j++) {
								console.log(clear[j])
							}
						console.log(move[i])
							console.log("Your Heath: " + hp);
						console.log(emn + " Heath: 0");
						alert("You win!")
							alert("Here is some loot.")

							var gold = Math.floor(Math.random() * 60 + 10);
						totalg += gold;
						alert("Your gold:  " + totalg);
						var randomh = Math.floor(Math.random() * 2);
						var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
							for (var j = 0; j < clear.length; j++) {
								console.log(clear[j])
							}
						console.log(move[i]);
						if (randomh) {
							alert("You heal!")
								hp += 2
								if (hp > totalhp) {
									var hp = totalhp
										alert("You healed to full heath")
								} else {
									alert("You heal + 2")
										alert("Your heath:  " + hp)
								}
						} else {}



					}
				}






			} else {
				alert("Move");
			}
			var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
				for (var j = 0; j < clear.length; j++) {
					console.log(clear[j])
				}
			console.log(move[i]);
		}

	alert("Welcome to the random merchant!");
	var buyloop = true
		while (buyloop) {
			var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

				switch (buy) {

					case "hp":

						if (totalg < 100) {

							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You gained 2 hp")
								totalg -= 100
								totalhp += 2
								console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}
					case "dam":
						if (totalg < 100) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You feel stronger!")
								totalg -= 100
								dam += 1
								console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}

					case "heal":

						if (totalg < 45) {

							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break;
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You gained 2 hp")
								totalg -= 45
								var hp = totalhp;
							console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}

					case "sw":
						confirm("Bid for Elastic Band Gun")
						var bid1 = Math.floor(Math.random() * 300 + 40)
						var bid2 = Math.floor(Math.random() * 300 + 40)
						var bid3 = Math.floor(Math.random() * 300 + 40)
						var bid4 = Math.floor(Math.random() * 167 + 40)
						console.log("Bids:")
						console.log(bid1)
						console.log(bid2)
						console.log(bid3)
						console.log("Brett's bid: " + bid4)
						var bid = prompt("Your bid?")
						if (bid > totalg) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}
					if (bid < bid1) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid2) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid3) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid4) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (sword === "Elastic Band Gun") {
						confirm("You already have that sword!")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else {
						confirm("Here is your upgrade!")
							confirm("You found a Elastic Band Gun")
							totalg -= bid
							if (sword === "Steel Sword") {
								dam += 2
									dam2 += 1
							} else {
								dam += 4
									dam2 += 3
							}
						console.log("Total gold: " + totalg)
							sword = "Elastic Band Gun"
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					}



					case "1337":
						if (totalg < 2001) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You found... what?... I dont even know what this is...")
								totalg -= 2001
								dam += 10
								dam2 += 2
								sword = "The Mlg"
								console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}


					default:

					confirm("We don't sell anything like that.")
						var exit = prompt("Want to leave Y or N").toLowerCase()
						if (exit === "y") {
							buyloop = false
								break;
							break
						} else {
							break
								break
								var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

						}

				}
		}




	alert("Welcome to floor 3!")
		for (var i = 0; i < 8; i++) {
			var move = ["[o_______]", "[_o______]", "[__o_____]", "[___o____]", "[____o___]", "[_____o__]", "[______o_]", "[_______o]"];
			var re = Math.floor(Math.random() * 5 + 1);

			if (re > 3) {
				alert("Oh no a wild enemy");
				var echoice = Math.floor(Math.random() * 6 + 1);
				if (echoice <= 1) {

					var em = Math.floor(Math.random() * 2);
					var enemy = Math.floor(Math.random() * 4 - block + 1);
					var ehp = 4;
					var emn = "Slime";
					var etotal = 0;

				} else if (echoice <= 3) {
					var em = Math.floor(Math.random() * 3);
					var enemy = Math.floor(Math.random() * 4 - block + 1);
					var ehp = 3;
					var emn = "Angry Slime";
					var etotal = 0;

				} else {
					var em = Math.floor(Math.random() * 3);
					var enemy = Math.floor(Math.random() * 5 - block + 2);
					var ehp = 5;
					var emn = "Doge";
					var etotal = 0;
				}

				//battle system
				var slaying = true;
				var you = Math.floor(Math.random() * 3);
				var round = Math.floor(Math.random() * dam + dam2);
				var round1 = Math.floor(Math.random() * 5 + 2);
				var total = 0;



				while (slaying) {
					var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
						for (var j = 0; j < clear.length; j++) {
							console.log(clear[j])
						}
					console.log(move[i])
						console.log("Your Heath: " + hp);
					console.log(emn + " Heath: " + ehp);
					var block = 0;
					var win = 0;

					if (power > 2) {


						var fight = prompt("Hardscope, Block or NoScope").toLowerCase();

						switch (fight) {

							case "hardscope":
								power += 1;
							if (you) {
								confirm("You hardscoped the slime with your " + sword + " and did " + round + " damage!");
								ehp -= round;

								if (ehp <= 0) {
									confirm("You did a killing headshot on the " + emn);
									var win = 1
										slaying = false;
									break;

								} else {
									you = Math.floor(Math.random() * 3);
									break;
								}

							} else {

								confirm("You miss");
								you = Math.floor(Math.random() * 3);
								break;
							}

							case "noscope":
								power -= 2;
							if (you) {
								confirm("You noscoped the " + emn + " with your " + sword + " and did " + round1 + " damage!");
								ehp -= round1;

								if (ehp <= 0) {
									var win = 1;
									confirm("You did a killing headshot on the " + emn);
									slaying = false;
									break;


								} else {

									you = Math.floor(Math.random() * 3);
									break;
								}
							} else {
								confirm("You miss")
									you = Math.floor(Math.random() * 3);
								break;
							}

							default:
							var block = 1
								power += 1;
							break;
						}

					} else {

						var fight = prompt("Hardscope or Block").toLowerCase();

						switch (fight) {

							case "hardscope":
								power += 1
								if (you) {
									confirm("You hardscoped the " + emn + " with your " + sword + " and did " + round + " damage!");
									ehp -= round;

									if (ehp <= 0) {
										var win = 1;
										confirm("You did a killing headshot on the " + emn);
										slaying = false;
										break;


									} else {
										you = Math.floor(Math.random() * 3);
										break;
									}

								} else {
									confirm("You miss")
										you = Math.floor(Math.random() * 3);
									break;
								}
							default:
							var block = 1
								power += 1;
							break;
						}

					}
					if (win === 0) {
						if (em) {
							confirm("The " + emn + " hit you and did " + enemy + " damage!")
								hp -= enemy

								if (hp <= 0) {
									var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
										for (var j = 0; j < clear.length; j++) {
											console.log(clear[j])
										}
									console.log(move[i])
										console.log("Your Heath: 0");
									console.log(emn + " Heath: " + ehp);
									confirm("You died")
										slaying = false
										throw new Error("You Lose")
								} else {
									var em = Math.floor(Math.random() * 3);

								}
						} else {
							confirm(emn + " missed!")
								var em = Math.floor(Math.random() * 3);

						}
					} else {
						var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
							for (var j = 0; j < clear.length; j++) {
								console.log(clear[j])
							}
						console.log(move[i])
							console.log("Your Heath: " + hp);
						console.log(emn + " Heath: 0");
						alert("You win!")
							alert("Here is some loot.")

							var gold = Math.floor(Math.random() * 70 + 15);
						totalg += gold;
						alert("Your gold:  " + totalg);
						var randomh = Math.floor(Math.random() * 2);
						var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
							for (var j = 0; j < clear.length; j++) {
								console.log(clear[j])
							}
						console.log(move[i]);
						if (randomh) {
							alert("You heal!")
								hp += 2
								if (hp > totalhp) {
									var hp = totalhp
										alert("You healed to full heath")
								} else {
									alert("You heal + 2")
										alert("Your heath:  " + hp)
								}
						} else {}



					}
				}






			} else {
				alert("Move");
			}
			var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
				for (var j = 0; j < clear.length; j++) {
					console.log(clear[j])
				}
			console.log(move[i]);
		}



	alert("Welcome to the random merchant!");
	var buyloop = true
		while (buyloop) {
			var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

				switch (buy) {

					case "hp":

						if (totalg < 100) {

							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You gained 2 hp")
								totalg -= 100
								totalhp += 2
								console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}
					case "dam":
						if (totalg < 100) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You feel stronger!")
								totalg -= 100
								dam += 1
								console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}

					case "heal":

						if (totalg < 45) {

							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break;
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You gained 2 hp")
								totalg -= 45
								var hp = totalhp;
							console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}

					case "sw":
						confirm("Bid for Dlc Gun")
						var bid1 = Math.floor(Math.random() * 400 + 40)
						var bid2 = Math.floor(Math.random() * 400 + 40)
						var bid3 = Math.floor(Math.random() * 400 + 40)
						var bid4 = Math.floor(Math.random() * 167 + 40)
						console.log("Bids:")
						console.log(bid1)
						console.log(bid2)
						console.log(bid3)
						console.log("Brett's bid: " + bid4)
						var bid = prompt("Your bid?")
						if (bid > totalg) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}
					if (bid < bid1) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid2) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid3) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid4) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (sword === "Dlc Gun") {
						confirm("You already have that sword!")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else {
						confirm("Here is your upgrade!")
							confirm("You found a Dlc Gun")
							totalg -= bid
							if (sword === "Steel Sword") {
								dam += 2
									dam2 += 2
							} else if (sword === "Elastic Band Gun") {
								dam + 1
									dam2 + 1
							} else {
								dam += 6
									dam2 += 5
							}

						console.log("Total gold: " + totalg)
							sword = "Dlc Gun"
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					}



					case "1337":
						if (totalg < 2001) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You found... what?... I dont even know what this is...")
								totalg -= 2001
								dam += 10
								dam2 += 2
								sword = "The Mlg"
								console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}


					default:

					confirm("We don't sell anything like that.")
						var exit = prompt("Want to leave Y or N").toLowerCase()
						if (exit === "y") {
							buyloop = false
								break;
							break
						} else {
							break
								break
								var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

						}

				}
		}






	alert("Welcome to floor 4!")
		for (var i = 0; i < 9; i++) {
			var move = ["[o________]", "[_o_______]", "[__o______]", "[___o_____]", "[____o____]", "[_____o___]", "[______o__]", "[_______o_]", "[________o]"];
			var re = Math.floor(Math.random() * 5 + 1);

			if (re > 3) {
				alert("Oh no a wild enemy");
				var echoice = Math.floor(Math.random() * 8 + 1);
				if (echoice <= 4) {
					var em = Math.floor(Math.random() * 3);
					var enemy = Math.floor(Math.random() * 6 - block + 3);
					var ehp = 7;
					var emn = "Pepe";
					var etotal = 0;


				} else if (echoice <= 1) {
					var em = Math.floor(Math.random() * 3);
					var enemy = Math.floor(Math.random() * 4 - block + 1);
					var ehp = 3;
					var emn = "Angry Slime";
					var etotal = 0;

				} else if (echoice <= 6) {
					var em = Math.floor(Math.random() * 4);
					var enemy = Math.floor(Math.random() * 10 - block + 1);
					var ehp = 8;
					var emn = "Troll Face";
					var etotal = 0;

				} else {
					var em = Math.floor(Math.random() * 3);
					var enemy = Math.floor(Math.random() * 5 - block + 2);
					var ehp = 5;
					var emn = "Doge";
					var etotal = 0;
				}

				//battle system
				var slaying = true;
				var you = Math.floor(Math.random() * 3);
				var round = Math.floor(Math.random() * dam + dam2);
				var round1 = Math.floor(Math.random() * 5 + 2);
				var total = 0;



				while (slaying) {
					var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
						for (var j = 0; j < clear.length; j++) {
							console.log(clear[j])
						}
					console.log(move[i])
						console.log("Your Heath: " + hp);
					console.log(emn + " Heath: " + ehp);
					var block = 0;
					var win = 0;

					if (power > 2) {


						var fight = prompt("Hardscope, Block or NoScope").toLowerCase();

						switch (fight) {

							case "hardscope":
								power += 1;
							if (you) {
								confirm("You hardscoped the slime with your " + sword + " and did " + round + " damage!");
								ehp -= round;

								if (ehp <= 0) {
									confirm("You did a killing headshot on the " + emn);
									var win = 1
										slaying = false;
									break;

								} else {
									you = Math.floor(Math.random() * 3);
									break;
								}

							} else {

								confirm("You miss");
								you = Math.floor(Math.random() * 3);
								break;
							}

							case "noscope":
								power -= 2;
							if (you) {
								confirm("You noscoped the " + emn + " with your " + sword + " and did " + round1 + " damage!");
								ehp -= round1;

								if (ehp <= 0) {
									var win = 1;
									confirm("You did a killing headshot on the " + emn);
									slaying = false;
									break;


								} else {

									you = Math.floor(Math.random() * 3);
									break;
								}
							} else {
								confirm("You miss")
									you = Math.floor(Math.random() * 3);
								break;
							}

							default:
							var block = 1
								power += 1;
							break;
						}

					} else {

						var fight = prompt("Hardscope or Block").toLowerCase();

						switch (fight) {

							case "hardscope":
								power += 1
								if (you) {
									confirm("You hardscoped the " + emn + " with your " + sword + " and did " + round + " damage!");
									ehp -= round;

									if (ehp <= 0) {
										var win = 1;
										confirm("You did a killing headshot on the " + emn);
										slaying = false;
										break;


									} else {
										you = Math.floor(Math.random() * 3);
										break;
									}

								} else {
									confirm("You miss")
										you = Math.floor(Math.random() * 3);
									break;
								}
							default:
							var block = 1
								power += 1;
							break;
						}

					}
					if (win === 0) {
						if (em) {
							confirm("The " + emn + " hit you and did " + enemy + " damage!")
								hp -= enemy

								if (hp <= 0) {
									var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
										for (var j = 0; j < clear.length; j++) {
											console.log(clear[j])
										}
									console.log(move[i])
										console.log("Your Heath: 0");
									console.log(emn + " Heath: " + ehp);
									confirm("You died")
										slaying = false
										throw new Error("You Lose")
								} else {
									var em = Math.floor(Math.random() * 3);

								}
						} else {
							confirm(emn + " missed!")
								var em = Math.floor(Math.random() * 3);

						}
					} else {
						var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
							for (var j = 0; j < clear.length; j++) {
								console.log(clear[j])
							}
						console.log(move[i])
							console.log("Your Heath: " + hp);
						console.log(emn + " Heath: 0");
						alert("You win!")
							alert("Here is some loot.")

							var gold = Math.floor(Math.random() * 80 + 20);
						totalg += gold;
						alert("Your gold:  " + totalg);
						var randomh = Math.floor(Math.random() * 2);
						var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
							for (var j = 0; j < clear.length; j++) {
								console.log(clear[j])
							}
						console.log(move[i]);
						if (randomh) {
							alert("You heal!")
								hp += 2
								if (hp > totalhp) {
									var hp = totalhp
										alert("You healed to full heath")
								} else {
									alert("You heal + 2")
										alert("Your heath:  " + hp)
								}
						} else {}



					}
				}






			} else {
				alert("Move");
			}
			var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
				for (var j = 0; j < clear.length; j++) {
					console.log(clear[j])
				}
			console.log(move[i]);
		}


	alert("Welcome to the random merchant!");
	var buyloop = true
		while (buyloop) {
			var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

				switch (buy) {

					case "hp":

						if (totalg < 100) {

							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You gained 2 hp")
								totalg -= 100
								totalhp += 2
								console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}
					case "dam":
						if (totalg < 100) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You feel stronger!")
								totalg -= 100
								dam += 1
								console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}

					case "heal":

						if (totalg < 45) {

							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break;
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You gained 2 hp")
								totalg -= 45
								var hp = totalhp;
							console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}

					case "sw":
						confirm("Bid for candy")
						var bid1 = Math.floor(Math.random() * 2 + 1)
						var bid2 = Math.floor(Math.random() * 2 + 1)
						var bid3 = Math.floor(Math.random() * 3 + 2)
						var bid4 = Math.floor(Math.random() * 1.67 + 1)
						console.log("Bids:")
						console.log(bid1)
						console.log(bid2)
						console.log(bid3)
						console.log("Brett's bid: " + bid4)
						var bid = prompt("Your bid?")
						if (bid > totalg) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N?").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}
					if (bid < bid1) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid2) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid3) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (bid < bid4) {
						confirm("Not a high enough bid")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else if (sword === "candy") {
						confirm("You already have that sword!")
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					} else {
						confirm("Here is your upgrade!")
							confirm("You found a candy")
							totalg -= bid
							dam += 0
							dam2 += 0
							console.log("Total gold: " + totalg)
							sword = "candy"
							var exit = prompt("Want to leave Y or N?").toLowerCase()
							if (exit === "y") {
								buyloop = false
									break;
								break
							} else {
								break
									break
									var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

							}
					}



					case "1337":
						if (totalg < 2001) {
							confirm("You can't buy that")
								var exit = prompt("Want to leave Y or N").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						} else {
							confirm("Here is your upgrade!")
								confirm("You found... what?... I dont even know what this is...")
								totalg -= 2001
								dam += 10
								dam2 += 2
								sword = "The Mlg"
								console.log("Total gold: " + totalg)
								var exit = prompt("Want to leave Y or N").toLowerCase()
								if (exit === "y") {
									buyloop = false
										break;
									break
								} else {
									break
										break
										var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

								}
						}


					default:

					confirm("We don't sell anything like that.")
						var exit = prompt("Want to leave Y or N").toLowerCase()
						if (exit === "y") {
							buyloop = false
								break;
							break
						} else {
							break
								break
								var buy = prompt("Type hp for heath upgrade $100 Type heal to heal wounds $45 Type dam for damage upgrade $100 Type sw to bid for a sword Type 1337 for a elite sword $2001 ").toLowerCase()

						}

				}
		}



	var win = 0
		var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
		for (var j = 0; j < clear.length; j++) {
			console.log(clear[j])
				alert("Welcome to floor 5")
				alert("Hi there, take a look in the console!")
				console.log(" \    /\ ")
				console.log("  )  ( ') < Hello")
				console.log("  (  /  ) ")
				console.log("   \(__)| ")
				alert("")

				var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
				for (var j = 0; j < clear.length; j++) {
					console.log(clear[j])
				}

			console.log(" \    /\ ")
				console.log("  )  ( ') < I am the boss of this tower!")
				console.log("  (  /  ) ")
				console.log("   \(__)| ")
				alert("")

				var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
				for (var j = 0; j < clear.length; j++) {
					console.log(clear[j])
				}

			console.log(" \    /\ ")
				console.log("  )  ( ') < Well, I guess I'm gunna have to kill you...")
				console.log("  (  /  ) ")
				console.log("   \(__)| ")
				alert("")

				var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
				for (var j = 0; j < clear.length; j++) {
					console.log(clear[j])
				}

			console.log(" \    /\ ")
				console.log("  )  ( ') < Prepare To get rekt!")
				console.log("  (  /  ) ")
				console.log("   \(__)| ")
				alert("")

				var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
				for (var j = 0; j < clear.length; j++) {
					console.log(clear[j])
				}

			console.log(" \    /\ ")
				console.log("  )  ( ') < Welcome to die!")
				console.log("  (  /  ) ")
				console.log("   \(__)| ")

				var slaying = true;
			var you = Math.floor(Math.random() * 3);
			var round = Math.floor(Math.random() * dam + dam2);
			var round1 = Math.floor(Math.random() * 5 + 2);
			var total = 0;
			var em = Math.floor(Math.random() * 3);
			var enemy = Math.floor(Math.random() * 10 - block + 3);
			var ehp = 20;
			var emn = "1337 Boss";
			var etotal = 0;


			while (slaying) {
				var clear = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", ]
					for (var j = 0; j < clear.length; j++) {
						console.log(clear[j])
					}
				block = 0


					if (power > 2) {


						var fight = prompt("Hardscope, Block or NoScope").toLowerCase();

						switch (fight) {

							case "hardscope":
								power += 1;
							if (you) {
								confirm("You hardscoped the slime with your " + sword + " and did " + round + " damage!");
								total += round;

								if (total >= ehp) {
									confirm("You did a killing headshot on the " + emn);
									slaying = false;
									break;

								} else {
									you = Math.floor(Math.random() * 3);
									break;
								}

							} else {

								confirm("You miss");
								you = Math.floor(Math.random() * 3);
								break;
							}

							case "noscope":
								power -= 2;
							if (you) {
								confirm("You noscoped the " + emn + " with your " + sword + " and did " + round + " damage!");
								total += round1;

								if (total >= ehp) {
									win += 1;
									confirm("You did a killing headshot on the " + emn);
									slaying = false;
									break;


								} else {

									you = Math.floor(Math.random() * 3);
									break;
								}

							}


							default:
							block += 1
								power += 1
								break;
						}

					} else {

						var fight = prompt("Hardscope or Block").toLowerCase();

						switch (fight) {

							case "hardscope":
								power += 1
								if (you) {
									confirm("You hardscoped the " + emn + " with your " + sword + " and did " + round + " damage!");
									total += round;

									if (total >= ehp) {
										win += 1;
										confirm("You did a killing headshot on the " + emn);
										slaying = false;
										break;


									} else {
										you = Math.floor(Math.random() * 3);
										break;
									}

								} else {
									confirm("You miss")
										you = Math.floor(Math.random() * 3);
									break;
								}
							default:
							block += 1
								power += 1
								break;
						}

					}
				if (win === 0) {
					if (em) {
						confirm("The " + emn + " hit you and did " + enemy + " damage!")
							etotal += enemy

							if (etotal >= hp) {
								confirm("You died")
									slaying = false
									throw new Error("You Lose")
							} else {
								var em = Math.floor(Math.random() * 3);

							}
					} else {
						console.println(emn + " missed!")
							await getUserInput();
						var em = Math.floor(Math.random() * 3);

					}
				} else {
					slaying = false
						break;
				}
			}
		}
}

function getUserInput() {
	document.getElementById("pause").focus();
	return new Promise((resolve, reject) => {
			$('#pause').keydown(function (e) {
				if (e.keyCode == 13) {
				const inputVal = $(this).val();
				resolve(inputVal);
				}
				});
			});
};
