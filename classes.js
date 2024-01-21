class Hero {
    constructor(name, level, healthPoints, stats) {
        this.name = name;
        
        this.level = level;
        this.healthPoints = healthPoints;

        this.stats = stats;
    }

    displayHero() {
        const heroInfo =
            `Имя: ${this.name}` +
            `\nУровень: ${this.level}` +
            `\nЗдоровье: ${this.healthPoints}`+
            `\nИнтелект: ${this.stats.int}` +
            `\nЛовкость: ${this.stats.agi}`+
            `\nСила: ${this.stats.str}`;
        console.log(heroInfo);
    }
}

class Knight extends Hero {
    constructor(name,  level, healthPoints, stats, isSwordsDance, energy) {
        super(name, level, healthPoints, stats);
        this.energy = energy;
        this.isSwordsDance = isSwordsDance;
        
    }

    displayHero(){
        super.displayHero();
        console.log(`Энергия: ${this.energy}`);

        if(this.isSwordsDance === "true") {
            console.log("Этот герой танцуент \"Танец мечей\"");
            
        }

    }
}

class Mage extends Hero {
    constructor(name,level, healthPoints, stats,  isAvadacedavraDance,mana) {
        super(name, level, healthPoints, stats);
        this.mana = mana;
        this.isAvadacedavraDance = isAvadacedavraDance;
    }

    displayHero(){
        super.displayHero();
        console.log(`Мана: ${this.mana}`);

        if(this.isAvadacedavraDance === "true") {
            console.log("Этот герой танцуент танец \"Авадакедавра\"");
        } 

}
}