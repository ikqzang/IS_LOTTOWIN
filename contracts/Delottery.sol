pragma solidity >=0.5.0;

contract Delottery {
    struct user {
        uint wdBalance;         // คูณ 10 อยู่เพราะ solidity ไม่มีจุดทศนิยม 
        uint lockBalance;       // คูณ 10 อยู่เพราะ solidity ไม่มีจุดทศนิยม 
    } 

    struct lotto {
        address[] buyer;
        uint[] amount;          // คูณ 1 อยู่เพราะ solidity ไม่มีจุดทศนิยม
    } 

    struct prize {
        uint value;             // คูณ 10 อยู่เพราะ solidity ไม่มีจุดทศนิยม  value=sum amount*0.5
        uint goldNumber;    
        uint miniNumber;
        uint goldPrize;         // คูณ 100 อยู่เพราะ solidity ไม่มีจุดทศนิยม   gold = value * 0.8
        uint miniPrize;         // คูณ 100 อยู่เพราะ solidity ไม่มีจุดทศนิยม   mini = value * 0.2
        uint goldWinner;
        uint miniWinner;


    } 



    mapping (address => user) userMap;
    address[] public userkey;
    mapping (uint => lotto) lottoMap;
    mapping (uint => prize) prizeMap;

    uint round = 1;

    function bookLotto(address playerAddress,uint _lottoNum,uint _amount) public returns (bool){            
        bool result = false;
        userkey.push(playerAddress);                                                                                          
        lottoMap[_lottoNum].buyer.push(playerAddress);
        lottoMap[_lottoNum].amount.push(_amount);
        userMap[playerAddress].lockBalance += 5  * _amount;
        prizeMap[round].value += 5  * _amount;
        result = true;
        return (result);                                                              
    }

    

    function rewardGolden(uint goldenDraw) public returns (bool){            
        bool result = false;
        lotto storage gWinner =lottoMap[goldenDraw];                                                                                                         
        prizeMap[round].goldWinner = gWinner.buyer.length;
        prizeMap[round].goldNumber = goldenDraw;

        uint i;
        uint sumGoldWinAmount = 0;
    
        for(i = 0; i < gWinner.amount.length; i++){     // หาผลรวม amount ทั้งหมดของคนที่ถูกรางวัล
            sumGoldWinAmount += gWinner.amount[i]; 
        }

        prizeMap[round].goldPrize = 8 * prizeMap[round].value;
        
        for(i = 0; i < gWinner.amount.length; i++){     // แจกรางวัลทั้งหมดลงใน wdBalance(withdraw wallet)
            uint reward;

            reward = (8 * prizeMap[round].value * gWinner.amount[i])/sumGoldWinAmount;  // 0.8 กำหนดจากการกำหนดของ admin

            address playerAddress = gWinner.buyer[i];

            userMap[playerAddress].wdBalance += reward;
        }
        prizeMap[round].value = 0 ;
        result = true;
        return (result);                                                              
    }

    function rewardMini(uint miniDraw) public returns (bool){            
        bool result = false;
        lotto storage mWinner =lottoMap[miniDraw];                                                                                                          
        prizeMap[round].miniWinner = mWinner.buyer.length;
        prizeMap[round].miniNumber = miniDraw;

        uint i;
        uint sumMiniWinAmount = 0;
    
        for(i = 0; i < mWinner.amount.length; i++){     // หาผลรวม amount ทั้งหมดของคนที่ถูกรางวัล
            sumMiniWinAmount += mWinner.amount[i]; 
        }

        prizeMap[round].miniPrize = 2 * prizeMap[round].value;
        
        for(i = 0; i < mWinner.amount.length; i++){     // แจกรางวัลทั้งหมดลงใน wdBalance(withdraw wallet)
            uint reward;

            reward = (2 * prizeMap[round].value * mWinner.amount[i])/sumMiniWinAmount;  // 0.2 กำหนดจากการกำหนดของ admin

            address playerAddress = mWinner.buyer[i];

            userMap[playerAddress].wdBalance += reward;
        }
        prizeMap[round].value = 0 ;
        result = true;
        return (result);  

    }
    
    function moveLocktoWithdraw() public returns (bool){
       
        bool result = false;
         uint i;
        for(i = 0; i < userkey.length; i++){
            address userAddress = userkey[i];
        //อ่านค่า lockwallet
            uint moveValue = userMap[userAddress].lockBalance;
        //บวก lockwallet ลง ใน wdwallet
            userMap[userAddress].wdBalance += moveValue;
        //ทำให้ lock wallet เป็น 0
            userMap[userAddress].lockBalance = 0;
        }
        result = true;
        return (result); 
        }



    function getAddress() public view returns (address){
        address useraddress = 0xA832D93032aFD5aFC25638767C636cB35B3fBc9d;
        return (useraddress);   

    }


    function getTotalReward() public view returns (uint) {    
        uint totalReward = prizeMap[round].value;
        return (totalReward);
    }

    function getgoldPrize() public view returns (uint) {    
        uint goldP = prizeMap[round].goldPrize;
        return (goldP);
    }

    function getminiPrize() public view returns (uint) {    
        uint miniP = prizeMap[round].miniPrize;
        return (miniP);
    }

    function getGoldWinner() public view returns (uint) {    
        uint goldW = prizeMap[round].goldWinner;
        return (goldW);
    }

    function getMiniWinner() public view returns (uint) {    
        uint miniW = prizeMap[round].miniWinner;
        return (miniW);
    }

    function getGoldNumber() public view returns (uint) {    
        uint goldN = prizeMap[round].goldNumber;
        return (goldN);
    }

    function getMiniNumber() public view returns (uint) {    
        uint miniN = prizeMap[round].miniNumber;
        return (miniN);
    }

    function getWallet(address playerAddress) public view returns (uint,uint) {    
        user memory thisuser = userMap[playerAddress];
        return (thisuser.wdBalance,thisuser.lockBalance);
    }

    // form TestDelottery.sol

    

    function getlottofortestbooking(uint lottoNum) public view returns (address,uint) {    
        // lotto.buyer , lotto.amount , user.lockbalance & prize.value ต้องเปลี่ยน
        address testBuyer = lottoMap[lottoNum].buyer[0];
        uint testAmount = lottoMap[lottoNum].amount[0];
        return (testBuyer,testAmount);
    }

    function setTotalPrice (uint setprize) public  {
        prizeMap[round].value = setprize ;
    }

    function setWithdraw (address testAddress,uint balance) public  {
        userMap[testAddress].wdBalance = balance ;
    }

    function setLock (address testAddress,uint balance) public  {
        userMap[testAddress].lockBalance = balance ;
    }

}