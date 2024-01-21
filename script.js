document.addEventListener('DOMContentLoaded', () => {
    let modalIsOpen = false;
    const modal1 = document.getElementById("modal1");
    const sendToBattleButton = document.getElementById("sendToBattleButton");
    const doSkillButton = document.getElementById("doSkillButton");
    const getEnemyButton = document.getElementById("getEnemyButton");
    const startBattleButton = document.getElementById("startBattleButton");
    const closeModalButton = modal1.getElementsByClassName("modal_close-button")[0];
    
    // Функция для получения случайного числа в диапазоне(необходима для реализации случайного фона в батле)
    function randomDigit(minDigit, maxDigit){
        return Math.floor(Math.random()*(maxDigit-minDigit+1) + minDigit);
    }

    function displayEnemyHero(hero) {
        document.getElementById("enemyHeroClass").innerHTML = gameClasses[hero.constructor.name];
        document.getElementById("enemyHeroName").innerHTML = hero.name;
        document.getElementById("enemyHeroLevel").innerHTML = hero.level;
        document.getElementById("enemyHeroHp").innerHTML = hero.healthPoints;
        document.getElementById("enemyHeroStrength").innerHTML = hero.stats.str;
        document.getElementById("enemyHeroIntelligence").innerHTML = hero.stats.int;
        document.getElementById("enemyHeroAgility").innerHTML = hero.stats.agi;

        hero.displayHero();
    }

    function displayPlayerHero(hero) {

        document.getElementById("playerHeroClass").innerHTML = gameClasses[hero.constructor.name];
        document.getElementById("playerHeroName").innerHTML = hero.name;
        document.getElementById("playerHeroLevel").innerHTML = hero.level;
        document.getElementById("playerHeroHp").innerHTML = hero.healthPoints;
        document.getElementById("playerHeroStrength").innerHTML = hero.stats.str;
        document.getElementById("playerHeroIntelligence").innerHTML = hero.stats.int;
        document.getElementById("playerHeroAgility").innerHTML = hero.stats.agi;

        hero.displayHero()
    }

    const gameParameters = {
        MAX_LEVEL: 10,
        MAX_STAT: 99,
        MIN_STAT: 10,
    }
    const gameClasses = {
        Mage: "Маг",
        Knight: "Рыцарь",
        Hero: "Класс"
    }
    function countStatsSum(hero) {
        let statsSum = 0;
        statsSum += hero.stats.str;
        statsSum += hero.stats.int;
        statsSum += hero.stats.agi;
        statsSum += hero.healthPoints;
        return statsSum;
    }


    function fight(firstHero, secondHero) {
        console.log(
            `Да начнётся танцевальный баттл между ${firstHero.name} и ${secondHero.name}!`
        );

        let winner = null;

        let fistHeroSum = countStatsSum(firstHero);
        let secondHeroSum = countStatsSum(secondHero);
        console.log("Оценка танцевальных навыков 1 героя: ", fistHeroSum);
        console.log("Оценка танцевальных навыков 2 героя: ", secondHeroSum);

        if (fistHeroSum > secondHeroSum) {
            winner = firstHero;
        } else if (fistHeroSum < secondHeroSum) {
            winner = secondHero;
        }
        if (winner) {
            console.log(`Ритмично чествуем победителя: ${winner.name}`);
            alert(`Ритмично чествуем победителя: ${winner.name}`);
        } else {
            console.log("В танцевальном баттле победила дружба!");
            alert("В танцевальном баттле победила дружба!");
        }
    }


    let playerHero = null;
    let enemyHero = null;



    closeModalButton.onclick = function () {
        modal1.classList.remove("modal_active");
        modalContent.classList.remove("modal_content_active");
        modalIsOpen = false;
    }

    sendToBattleButton.onclick = () => {
        modalIsOpen = true;

        const heroName = document.getElementById("name").value;
        if (heroName != "") {
            modal1.classList.add("modal_active");
            function randomDigit(minDigit, maxDigit){
                return Math.floor(Math.random()*(maxDigit-minDigit+1) + minDigit);
            }
            const modalContent = document.getElementById("modalContent");
            modalContent.classList.add("modal_content_active");


            modalContent.style.backgroundImage = `url("images/danse${randomDigit(1,6)}.webp")`;

            let heroLevel = document.getElementById("level").value;
            if (heroLevel > gameParameters.MAX_LEVEL) {
                heroLevel = gameParameters.MAX_LEVEL
            }
            const additionalAbility = document.querySelector('input[name="additionalAbility"]:checked').value;

            const additionalStat = document.getElementById("additionalStat").value;
            const heroStats = {};
            heroStats.str = Number(document.getElementById("strength").value)
            heroStats.int = Number(document.getElementById("intelligence").value)
            heroStats.agi = Number(document.getElementById("agility").value);

            heroStats.str = Number(document.getElementById("strength").value);
            if (heroStats.str > gameParameters.MAX_STAT) {
                heroStats.str = gameParameters.MAX_STAT
            }
            heroStats.int = Number(document.getElementById("intelligence").value);
            if (heroStats.int > gameParameters.MAX_STAT) {
                heroStats.int = gameParameters.MAX_STAT
            }
            heroStats.agi = Number(document.getElementById("agility").value);
            if (heroStats.agi > gameParameters.MAX_STAT) {
                heroStats.agi = gameParameters.MAX_STAT
            }

            const heroClass = document.querySelector('input[name="class"]:checked').value;
            if (heroClass === "Mage") {
                playerHero = new Mage(heroName, heroLevel, 100, heroStats, additionalAbility, additionalStat);
            } else if (heroClass === "Knight") {
                playerHero = new Knight(heroName, heroLevel, 100, heroStats, additionalAbility, additionalStat);
            } else {
                console.error("Упс! Произошла какая-то ошибка!")
                return;
            }


            displayPlayerHero(playerHero)
            getEnemyButton.removeAttribute("disabled");
            doSkillButton.removeAttribute("disabled");

        } else {
            alert("Добавьте герою имя!");
        }
    }
    doSkillButton.onclick = () => {

    }
    getEnemyButton.onclick = () => {
        fetch(`https://api-code.practicum-team.ru/heroes`)
            .then((response) => response.json())
            .then((data) => {


                let randomEnemy = data[Math.floor(Math.random() * data.length)];

                enemyHero = new Hero(
                    randomEnemy.title,
                    Math.floor(Math.random() * 10) + 1,
                    randomEnemy.hp,
                    {
                        str: randomEnemy.str,
                        int: randomEnemy.int,
                        agi: randomEnemy.agi,
                    }
                );

                displayEnemyHero(enemyHero)
            })
            .catch((error) => console.error("Ошибка:", error));
        startBattleButton.removeAttribute("disabled")
    }
    startBattleButton.onclick = () => {
        fight(playerHero, enemyHero);
    }
    window.addEventListener("keydown", function (e) {
        //закрытие окна по escape
        if (e.key == "Escape" && modalIsOpen) {
            modal1.classList.remove("modal_active");
            modalIsOpen = false;
            return;
        }
    })
})
