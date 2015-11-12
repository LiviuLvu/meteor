if (Meteor.isClient) {

   $(document).ready(function() {
      //calculate total
      var inputs1 = $('.typeE input[type=radio]').on('change', function() {
         var total = 0;
         inputs1.filter(':checked').each(function() {
            total += +this.value;
         });
         $('#totalE').text(total);
      });
      var inputs2 = $('.typeI input[type=radio]').on('change', function() {
         var total = 0;
         inputs2.filter(':checked').each(function() {
            total += +this.value;
         });
         $('#totalI').text(total);
      });
      var inputs3 = $('.typeS input[type=radio]').on('change', function() {
         var total = 0;
         inputs3.filter(':checked').each(function() {
            total += +this.value;
         });
         $('#totalS').text(total);
      });
      var inputs4 = $('.typeN input[type=radio]').on('change', function() {
         var total = 0;
         inputs4.filter(':checked').each(function() {
            total += +this.value;
         });
         $('#totalN').text(total);
      });
      var inputs5 = $('.typeT input[type=radio]').on('change', function() {
         var total = 0;
         inputs5.filter(':checked').each(function() {
            total += +this.value;
         });
         $('#totalT').text(total);
      });
      var inputs6 = $('.typeF input[type=radio]').on('change', function() {
         var total = 0;
         inputs6.filter(':checked').each(function() {
            total += +this.value;
         });
         $('#totalF').text(total);
      });
      var inputs7 = $('.typeJ input[type=radio]').on('change', function() {
         var total = 0;
         inputs7.filter(':checked').each(function() {
            total += +this.value;
         });
         $('#totalJ').text(total);
      });
      var inputs8 = $('.typeP input[type=radio]').on('change', function() {
         var total = 0;
         inputs8.filter(':checked').each(function() {
            total += +this.value;
         });
         $('#totalP').text(total);
      });

      $('.calculate').on('click', function() {
         var totalE = +$('#totalE').text();
         var totalI = +$('#totalI').text();

         var totalS = +$('#totalS').text();
         var totalN = +$('#totalN').text();

         var totalT = +$('#totalT').text();
         var totalF = +$('#totalF').text();

         var totalJ = +$('#totalJ').text();
         var totalP = +$('#totalP').text();

         if (totalE > totalI) {
            $('#compareEI').text('E');
         } else if (totalE === totalI) {
            $('#compareEI').text('E=I');
         } else {
            $('#compareEI').text('I');
         }
         if (totalS > totalN) {
            $('#compareSN').text('S');
         } else if (totalS === totalN) {
            $('#compareSN').text('S=N');
         } else {
            $('#compareSN').text('N');
         }
         if (totalT > totalF) {
            $('#compareTF').text('T');
         } else if (totalT === totalF) {
            $('#compareTF').text('T=F');
         } else {
            $('#compareTF').text('F');
         }
         if (totalJ > totalP) {
            $('#compareJP').text('J');
         } else if (totalJ === totalP) {
            $('#compareJP').text('J=P');
         } else {
            $('#compareJP').text('P');
         }

      });

   });


   // Template.hello.helpers({
   //   counter: function () {
   //     return Session.get('counter');
   //   }
   // });

   // Template.hello.events({
   //   'click button': function () {
   //     // increment the counter when button is clicked
   //     Session.set('counter', Session.get('counter') + 1);
   //   }
   // });
}

if (Meteor.isServer) {
   Meteor.startup(function() {
      // code to run on server at startup
   });
}
