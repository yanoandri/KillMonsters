new Vue({
    el: '#app',
    data : {
        isRunning : false,
        maxPlayerHealth : 100,
        maxMonsterHealth : 100,
        logs : []
    },
    methods : {
        startGame :  function(){
            this.isRunning = true;
            this.maxMonsterHealth = 100;
            this.maxPlayerHealth = 100;
            this.logs = [];
        },
        attackMove : function(){
            var damageMonster = this.monsterAttack();
            var damagePlayer = this.inflictDamage(3,10);
            this.maxPlayerHealth -= damageMonster;
            this.maxMonsterHealth -= damagePlayer;
            this.writeAttackLog(damagePlayer, damageMonster);
            this.checkWinner();
        },
        specialAttackMove : function(){
            var damageMonster = this.monsterAttack();
            var damagePlayer = this.inflictDamage(10,20);
            this.maxPlayerHealth -= damageMonster;
            this.maxMonsterHealth -= damagePlayer;
            this.writeAttackLog(damagePlayer, damageMonster);
            this.checkWinner();
        },
        giveUp : function(){
            if(confirm('Are you sure want to give up?')){
                this.isRunning = false;
                this.maxPlayerHealth = 100;
                this.maxMonsterHealth = 100;
            }
        },
        monsterAttack: function(){
            return this.inflictDamage(5,12);
        },
        heal: function(){
            if(this.maxPlayerHealth <= 90){
                this.maxPlayerHealth += 10;
                this.writeLog(true, 'The Player heal for 10 HP');
            }else{
                alert('You can\'t use heal right now!');
            }
        },
        inflictDamage: function(min, max){
            return Math.max(Math.floor((Math.random() * max) + 1),min);
        },
        checkWinner : function(){
            if(this.maxMonsterHealth <= 0){
                this.maxMonsterHealth = 0;
                alert('You win!');
                this.isRunning = false;
            }else if(this.maxPlayerHealth <= 0){
                this.maxPlayerHealth = 0;
                alert('You lose!');
                this.isRunning = false;
            }
        },
        writeLog: function(isPlayer, message){
            this.logs.unshift({isPlayer : isPlayer, message : message});
        },
        writeAttackLog : function(player, monster){
            this.writeLog(true, 'The Player deal ' + player + ' to monster');
            this.writeLog(false, 'The Monster deal ' + monster + ' to player');
        }
    }
});