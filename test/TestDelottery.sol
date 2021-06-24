pragma solidity >=0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Delottery.sol";

contract TestDelottery {
  Delottery delotto = Delottery(DeployedAddresses.Delottery());

  address expectedAddress = 0xA832D93032aFD5aFC25638767C636cB35B3fBc9d;
  uint expectedLottoNum = 28;
  uint expectedAmount = 100;
  uint expectedLockBalance = 500; // ต้องหาร 10
  uint expectedWdBalance = 0;
  uint expectedTotalValue = 500;  // ต้องหาร 10
  uint setTotalValue = 500000;  // ต้องหาร 10
  uint goldenNum = 28;
  uint expectedgoldWdBalance = 4000000; // ต้องหาร 100
  uint miniNum = 28;
  uint expectedminiWdBalance = 1000000; // ต้องหาร 100
  uint expectedTotalValue2 = 0;  // ต้องหาร 10
  uint expectedMoveLockBalance = 0; // ต้องหาร 10
  uint expectedMoveWdBalance = 500; // ต้องหาร 10
  
  bool expectedResult = true;


  
  
  function testGetAddress() public  {
    address returnAddress  = delotto.getAddress();
    Assert.equal(returnAddress, expectedAddress, "getAddress of the expected Address should match what is returned.");
  }
  

  function testbookLotto() public  {
    bool returnResult  = delotto.bookLotto(expectedAddress,expectedLottoNum,expectedAmount);
    (address lottoBuyer,uint lottoAmount)  = delotto.getlottofortestbooking(expectedLottoNum);       
    (uint userWdBalance,uint userLockBalance) = delotto.getWallet(expectedAddress);       
    uint prizeValue = delotto.getTotalReward();

    Assert.equal(returnResult, expectedResult, "buyLotteryByID of the expected result should match what is returned.");
    Assert.equal(lottoBuyer, expectedAddress, "buyLotteryByID of the expected Address should match what is returned.");
    Assert.equal(lottoAmount, expectedAmount, "buyLotteryByID of the expected Amount should match what is returned.");
    Assert.equal(userWdBalance, expectedWdBalance, "buyLotteryByID of the expected WithDrawBalance should match what is returned.");
    Assert.equal(userLockBalance, expectedLockBalance, "buyLotteryByID of the expected LockBalance should match what is returned.");
    Assert.equal(prizeValue, expectedTotalValue, "buyLotteryByID of the expected TotalValue  should match what is returned.");
  }


  
  
  function testrewardGolden() public {
    delotto.setTotalPrice(setTotalValue);
    delotto.setWithdraw(expectedAddress,0);
    bool returnResult  = delotto.rewardGolden(goldenNum);
    (uint userWdBalance,uint userLockBalance) = delotto.getWallet(expectedAddress);
    uint prizeValue = delotto.getTotalReward();
    Assert.equal(returnResult, expectedResult, "buyLotteryByID of the expected result should match what is returned.");       
    Assert.equal(userWdBalance, expectedgoldWdBalance, "buyLotteryByID of the expected Address should match what is returned.");
    Assert.equal(prizeValue, expectedTotalValue2, "buyLotteryByID of the expected Address should match what is returned.");
  }
  

  function testrewardMini() public {
    delotto.setTotalPrice(setTotalValue);
    delotto.setWithdraw(expectedAddress,0);
    bool returnResult  = delotto.rewardMini(miniNum);
    (uint userWdBalance,uint userLockBalance) = delotto.getWallet(expectedAddress);
    uint prizeValue = delotto.getTotalReward();
    Assert.equal(returnResult, expectedResult, "buyLotteryByID of the expected result should match what is returned.");       
    Assert.equal(userWdBalance, expectedminiWdBalance, "buyLotteryByID of the expected Address should match what is returned.");
    Assert.equal(prizeValue, expectedTotalValue2, "buyLotteryByID of the expected Address should match what is returned.");
  }

  
  function testMoveBalance() public {
    delotto.setWithdraw(expectedAddress,0);
    delotto.setLock(expectedAddress,500);
    bool returnResult  = delotto.moveLocktoWithdraw();
    (uint userWdBalance,uint userLockBalance) = delotto.getWallet(expectedAddress);
    Assert.equal(returnResult, expectedResult, "buyLotteryByID of the expected result should match what is returned.");  
    Assert.equal(expectedMoveWdBalance, userWdBalance, "getBookingById of the expected WdBalance should match what is returned.");
    Assert.equal(expectedMoveLockBalance, userLockBalance, "getBookingById of the expected LockBalance should match what is returned.");
  } 

}
