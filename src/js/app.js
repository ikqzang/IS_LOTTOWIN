App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Delottery.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var DelotteryArtifact = data;
      App.contracts.Delottery = TruffleContract(DelotteryArtifact);

      // Set the provider for our contract.
      App.contracts.Delottery.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getData();
    });

    return App.bindEvents();
  },
  

    bindEvents: function() {
        $(document).on('click', '#BuyButton', App.buylotto);
        $(document).on('click', '#WithdrawButton', App.withdraw);
        $(document).on('click', '#GoldButton', App.goldenReward);
        $(document).on('click', '#MiniButton', App.miniReward);
        $(document).on('click', '#UnlockButton', App.unlockWallet);
        $(document).on('click', '#set1Button', App.setwdbal);
        $(document).on('click', '#set2Button', App.setlockbal);
        $(document).on('click', '#set3Button', App.settotal);
        
    },
  
    buylotto: function() {
      var lottoNum = ($('#LottoNumber').val());
      var amount = $('#Amount').val();
      var account = web3.eth.accounts[0];
      var delotteryInstance;

      App.contracts.Delottery.deployed().then(function (instance) {     // get GoldWinner
        delotteryInstance = instance;

      return delotteryInstance.getBalance.call();}).then(function (userbalance)
      { var playerbalance = userbalance * 0.000000000000000001
        
          
          if (amount > 0) {
            if (lottoNum <= 0)  {
              alert("หมายเลขสลาก ต้องอยู่ระหว่าง 00 ถึง 99");
            } 
            else if (lottoNum >= 99)  {
              alert("หมายเลขสลาก ต้องอยู่ระหว่าง 00 ถึง 99");
            }
            else {
              var delotteryInstance;
              /*

              web3.personal.unlockAccount(addr, pass);
              const toAddress = "0xeF288DFeF967856d1858554594818F95B1683D12"; // Address of the recipient
              const amountToSend = web3.toWei(amount, "ether"); // Convert to wei value
              var send = web3.eth.sendTransaction({ from:addr,to:toAddress, value:amountToSend });

              */
            App.contracts.Delottery.deployed().then(function (instance) {     
                delotteryInstance = instance;

            return delotteryInstance.bookLotto(account,lottoNum,amount,{from: account});
            }).then(function (result)
            {
                
                alert("การซื้อสลากหมายเลข"+ lottoNum + " จำนวน "+amount+" สำเร็จ");
                
            }).catch(function (err) {
                console.log(err.message);
            });

              
            }

          }
          else {
              alert("จำนวนในการซื้อสลากต้องมากกว่า 0");
          }


        
      }).catch(function (err) {
        console.log(err.message);
      });

          
    },

    withdraw: function() {
        // ------------------------------------- CODE WITHDRAW -------------------------------------------------------------
        var wdbal = 0;
  var account = web3.eth.accounts[0];

  var delotteryInstance;

  App.contracts.Delottery.deployed().then(function (instance) {
    delotteryInstance = instance;

    return delotteryInstance.setWithdraw(account,wdbal, { from: account });
  }).then(function (result) {   

  alert("การถอนสำเร็จ");

}).catch(function (err) {
    console.log(err.message);
});
  
          
        // ------------------------------------- CODE WITHDRAW -------------------------------------------------------------

    
    
  },

  goldenReward: function() {
    // ------------------------------------- CODE  goldenReward -------------------------------------------------------------
    var goldNumberInput = ($('#InputGoldNumber').val());
    var account = web3.eth.accounts[0];
    var delotteryInstance;
    
    App.contracts.Delottery.deployed().then(function (instance) {     
      delotteryInstance = instance;

  return delotteryInstance.rewardGolden(goldNumberInput,{from: account});
  }).then(function (result)
  {
      
    alert("การแจกรางวัลสำเร็จ");
      
  }).catch(function (err) {
      console.log(err.message);
  });
  


    // ------------------------------------- CODE  goldenReward -------------------------------------------------------------

   

},

miniReward: function() {
  // ------------------------------------- CODE miniReward -------------------------------------------------------------
  var miniNumberInput = ($('#InputMiniNumber').val());
  var account = web3.eth.accounts[0];
  var delotteryInstance;
    App.contracts.Delottery.deployed().then(function (instance) {     
      delotteryInstance = instance;

  return delotteryInstance.rewardMini(miniNumberInput,{from: account});
  }).then(function (result)
  {
      
    alert("การแจกรางวัลสำเร็จ");
      
  }).catch(function (err) {
      console.log(err.message);
  });
  
  // ------------------------------------- CODE miniReward -------------------------------------------------------------



},

unlockWallet: function() {
  // ------------------------------------- CODE unlockWallet -------------------------------------------------------------
  var delotteryInstance;
  var account = web3.eth.accounts[0];
  App.contracts.Delottery.deployed().then(function (instance) {     
    delotteryInstance = instance;

return delotteryInstance.moveLocktoWithdraw({from: account});
}).then(function (result)
{
    
  alert("การปลดล็อกสำเร็จ");
    
}).catch(function (err) {
    console.log(err.message);
});
  



  // ------------------------------------- CODE unlockWallet -------------------------------------------------------------

},
setwdbal: function() {
  var wdbal = ($('#Inputset1').val());
  var account = web3.eth.accounts[0];

  var delotteryInstance;

  App.contracts.Delottery.deployed().then(function (instance) {
    delotteryInstance = instance;

    return delotteryInstance.setWithdraw(account,wdbal, { from: account });
  }).then(function (result) {   

  alert("เปลี่ยนเงินที่ถอนได้เป็น " +wdbal);

}).catch(function (err) {
    console.log(err.message);
});
  
  

},
setlockbal: function() {
  var lockbal = ($('#Inputset2').val());
  var account = web3.eth.accounts[0];

  var delotteryInstance;

  App.contracts.Delottery.deployed().then(function (instance) {
    delotteryInstance = instance;

    return delotteryInstance.setLock(account,lockbal, { from: account });
  }).then(function (result) {   

    alert("เปลี่ยนเงินที่ล็อกเป็น " +lockbal);

}).catch(function (err) {
    console.log(err.message);
});
  


},
settotal: function() {
  var totalval = 10*($('#Inputset3').val());
  var account = web3.eth.accounts[0];
  var delotteryInstance;

  App.contracts.Delottery.deployed().then(function (instance) {
    delotteryInstance = instance;

    return delotteryInstance.setTotalPrice(totalval, { from: account });
  }).then(function (result) {   

    alert("เปลี่ยนเงินรางวัลรวม " + totalval);

}).catch(function (err) {
    console.log(err.message);
});
  


},
    
    getData: function() {
            var account = web3.eth.accounts[0];
            var accounts = account.slice(0,6)+'...'+account.slice(-4,account.length); // cut long address to short address
            
            $('#WalletAddress').text(accounts);
            
            

            var delotteryInstance;

            App.contracts.Delottery.deployed().then(function (instance) {     // get Wallet Balanace
                delotteryInstance = instance;

            return delotteryInstance.getBalance.call();
            }).then(function (userbalance)
            {
              var playerbalance = userbalance * 0.000000000000000001
              $('#WalletBalanace').text(playerbalance);
            
            }).catch(function (err) {
                console.log(err.message);
            });

          App.contracts.Delottery.deployed().then(function (instance) {     // get gold & mini reward
            delotteryInstance = instance;

        return delotteryInstance.getTotalReward.call();
        }).then(function (totalReward)
        {
          var totalprize = 0.1*totalReward;
          $('#TotalReward').text(totalprize);
          

          
        }).catch(function (err) {
            console.log(err.message);
          });
          
          App.contracts.Delottery.deployed().then(function (instance) {     // get gold & mini reward
            delotteryInstance = instance;

        return delotteryInstance.getGoldPrize.call();
        }).then(function (goldP)
        {
          var goldPrize = 0.01*goldP;
          $('#GoldenPrize').text(goldPrize);
          

          
        }).catch(function (err) {
            console.log(err.message);
          });

          App.contracts.Delottery.deployed().then(function (instance) {     // get gold & mini reward
            delotteryInstance = instance;

        return delotteryInstance.getMiniPrize.call();
        }).then(function (miniP)
        {
          var miniPrize = 0.01*miniP;
          $('#MiniPrize').text(miniPrize);

          
        }).catch(function (err) {
            console.log(err.message);
          });
          
          App.contracts.Delottery.deployed().then(function (instance) {     // get GoldWinner
            delotteryInstance = instance;

        return delotteryInstance.getGoldWinner.call();
        }).then(function (goldW)
        {
          $('#GoldenWinner').text(goldW);
          
        }).catch(function (err) {
            console.log(err.message);
          });
          
        App.contracts.Delottery.deployed().then(function (instance) {     // get MiniWinner
            delotteryInstance = instance;

        return delotteryInstance.getMiniWinner.call();
        }).then(function (miniW)
        {
          $('#MiniWinner').text(miniW);
          
        }).catch(function (err) {
            console.log(err.message);
          });
        
          App.contracts.Delottery.deployed().then(function (instance) {     // get GoldNumber
            delotteryInstance = instance;

        return delotteryInstance.getGoldNumber.call();
        }).then(function (goldN)
        {
          $('#GoldenNumber').text(goldN);
          $('#GoldenNumber2').text(goldN);
          
        }).catch(function (err) {
            console.log(err.message);
          });
          
        App.contracts.Delottery.deployed().then(function (instance) {     // get MiniNumber
            delotteryInstance = instance;

        return delotteryInstance.getMiniNumber.call();
        }).then(function (miniN)
        {
          $('#MiniNumber').text(miniN);
          $('#MiniNumber2').text(miniN);
          
        }).catch(function (err) {
            console.log(err.message);
          });

        App.contracts.Delottery.deployed().then(function (instance) {     // get Balance in platform
            delotteryInstance = instance;
            var account1 = web3.eth.accounts[0];

        return delotteryInstance.getwdBalance(account1).call();
        }).then(function (wdBalance)
        {
          $('#WithdrawBalance').text(wdBalance);

          
        }).catch(function (err) {
            console.log(err.message);
          });
        
        App.contracts.Delottery.deployed().then(function (instance) {     // get Balance in platform
            delotteryInstance = instance;
            var account1 = web3.eth.accounts[0];
        return delotteryInstance.getlockBalance(account1).call(); 
        }).then(function (lockBalance)
        {
          $('#LockBalance').text(lockBalance);

          
        }).catch(function (err) {
            console.log(err.message);
          });
    }

};

  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  