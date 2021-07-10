App = {
  web3Provider: null,
  contracts: {},

  initWeb3: async function() {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Delottery.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var Artifact = data;
      App.contracts.Delottery = TruffleContract(Artifact);

      // Set the provider for our contract
      App.contracts.Delottery.setProvider(App.web3Provider);

      
    });
    return App.bindEvents(),App.bindEvents2();;
  },

  bindEvents: function() {
    $(document).on('click', '#bookingButton', App.bookingLotto);
  },


  bookingLotto: function(event) {
    var result
    var lottoNum = $('#lottoNum').val();
    var amount = $('#amount').val();

    var delotteryInstance;

    web3.eth.getAccounts(function (error,accounts){
      if (error){
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Delottery.deployed().then(function(instance){
        delotteryInstance = instance;
  
        return delotteryInstance.bookLotto(account,lottoNum,amount).send();
    }).then(function(result)  {
      if (result == true){
        $('#bookingResult').text('การจองสำเร็จ');
      } else{
        $('#bookingResult').text('error');
      }
    });
    
  });
},


bindEvents2: function() {
  $(document).on('click', '#checkButton', App.getBooking);
  },

getBooking: function() {
  var delotteryInstance;
  var returnLottoNum
  var returnAmount

  web3.eth.getAccounts(function (error,accounts){
    if (error){
      console.log(error);
    }

    var account = accounts[0];

    App.contracts.Delottery.deployed().then(function(instance){
      delotteryInstance = instance;
      (returnLottoNum,returnAmount) = delotteryInstance.getBooking(account).call();
      return returnLottoNum,returnAmount;
  }).then(function(returnLottoNum,returnAmount)  {
    $('#bookingIdText').text('ท่านจองสลากหมายเลข');
    $('#bookingAmountText').text('จำนวน');
    $('#bookingId').text(returnLottoNum);
    $('#bookingAmount').text(returnAmount);
  
    
  });
  
});
  
}

}

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
});


