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
    },
  
    buylotto: function() {
        var lottoNum = ($('#LottoNumber').val());
        var amount = $('#Amount').val();
        var account = web3.eth.accounts[0];
        if (amount < 1000) {    // ต้องแก้ 1,000 เป็น balance
          if (amount > 0) {
            if (lottoNum <= 0)  {
              alert("หมายเลขสลาก ต้องอยู่ระหว่าง 00 ถึง 99");
            } 
            else if (lottoNum >= 99)  {
              alert("หมายเลขสลาก ต้องอยู่ระหว่าง 00 ถึง 99");
            }
            else {
              var result = false;
              // -------------------------------------CODE BOOKING-------------------------------------------------------------
              // บันทึกธุรกรรม
              // รับ ค่า result
              // if result = true ถึงจะ alert
             
              if (result == true){ 
              alert("การซื้อสลากหมายเลข"+ lottoNum + " จำนวน "+amount+" สำเร็จ");

               // --------------------------------------------------------------------------------------------------
              }
              else{
                alert("การซื้อสลากหมายเลข"+ lottoNum + " จำนวน "+amount+" ล้มเหลว");  
              }
            }

          }
          else {
              alert("จำนวนในการซื้อสลากต้องมากกว่า 0");
          }
      }
      else {
        alert("จำนวนเงินในกระเป๋าคุณไม่พอ");
      }
        
        
        
        

    },

    withdraw: function() {
        // ------------------------------------- CODE WITHDRAW -------------------------------------------------------------
        var result = false;
        var account = web3.eth.accounts[0];
        // get withdraw wallet value form getWallet(0xB167937e28C5B3D68D9f5Ab9F160A70FaCf3c5F9);S

        // tranfer  amount=withdraw wallet value form 0xB167937e28C5B3D68D9f5Ab9F160A70FaCf3c5F9(admin) to msg.sender 

        if (result == true){ 
          alert("การถอนสำเร็จ");

           // --------------------------------------------------------------------------------------------------
          }
          else{
            alert("การถอนล้มเหลว");  
        

        // ------------------------------------- CODE WITHDRAW -------------------------------------------------------------

    }
    
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
          $('#GoldenPrize').text(0.8*totalReward);
          $('#MiniPrize').text(0.2*totalReward);

          
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

        return delotteryInstance.getwdBalance(accounts).call();
        }).then(function (wdBalance)
        {
          $('#WithdrawBalance').text(wdBalance);

          
        }).catch(function (err) {
            console.log(err.message);
          });
        
        App.contracts.Delottery.deployed().then(function (instance) {     // get Balance in platform
            delotteryInstance = instance;

        return delotteryInstance.getlockBalance(accounts).call();
        }).then(function (lockBalance)
        {
          $('#WithdrawBalance').text(lockBalance);

          
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
  