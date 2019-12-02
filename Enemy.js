function Enemy(name, level, hp, minA, maxA, miss) {
    this.name = name;
    this.hp = hp;
	this.totalHp = hp;
    this.minA = minA;
    this.maxA = maxA;
    this.miss = miss;
    this.level = level;

    AddEnemy(this);

    this.setHp = function(hp) {
        this.hp = hp;
        if (this.hp <= 0) {
			this.hp = 0;
			SetSlaying(false);
        }
    }

    this.doAttack = async function (player, attack, miss) {
        if (!miss) {
            console.println("The " + this.name + " hit you and did " + attack + " damage!")
            await getUserInput();
            player.setHp(player.hp - attack);

        } else {
            console.println(this.name + " missed!")
            await getUserInput();
        }
        player.resetBlock();
    }

    this.attack = function(player) {
        emiss = false;
        missc = Math.random() * 100;
        if(missc < this.miss) {
            emiss = true;
        }
        eattack = Math.floor((Math.random() * maxA) + minA) - player.currentBlock;
        if(eattack <= 0) {
            eattack = 0;
        }
        this.doAttack(player, eattack, emiss);
    }
}
